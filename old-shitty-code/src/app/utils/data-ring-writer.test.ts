// data-ring.test.ts
// Run with: bun test
import { describe, it, expect } from "bun:test";
import { DataRingWriter } from "./data-ring"; // adjust path

const dec = new TextDecoder();

function make(cap: number) {
  const buf = new Uint8Array(cap);
  const ring = new DataRingWriter(buf);
  return { buf, ring };
}

describe("DataRing", () => {
  it("at() normalizes offset into [0, cap)", () => {
    const { ring } = make(8);

    ring.at(0);
    expect(ring.offset).toBe(0);

    ring.at(8);
    expect(ring.offset).toBe(0);

    ring.at(9);
    expect(ring.offset).toBe(1);

    ring.at(-1);
    expect(ring.offset).toBe(7);

    ring.at(-9);
    expect(ring.offset).toBe(7);
  });

  it("writeByte writes a single byte and advances offset", () => {
    const { buf, ring } = make(8);

    ring.at(0).writeByte(0xaa);
    expect(buf[0]).toBe(0xaa);
    expect(ring.offset).toBe(1);

    ring.writeByte(0xbb);
    expect(buf[1]).toBe(0xbb);
    expect(ring.offset).toBe(2);
  });

  it("writeByte wraps around at end", () => {
    const { buf, ring } = make(4);

    ring.at(3).writeByte(0x11);
    expect(buf[3]).toBe(0x11);
    expect(ring.offset).toBe(0);

    ring.writeByte(0x22);
    expect(buf[0]).toBe(0x22);
    expect(ring.offset).toBe(1);
  });

  it("writeBytes writes [len][payload] contiguously and advances offset", () => {
    const { buf, ring } = make(16);

    ring.at(2).writeBytes(new Uint8Array([1, 2, 3]));
    expect(buf[2]).toBe(3); // length
    expect(Array.from(buf.subarray(4, 7))).toEqual([1, 2, 3]);
    expect(ring.offset).toBe(7);
  });

  it("writeBytes wraps payload across end", () => {
    const { buf, ring } = make(8);

    // Start at 6, write len=3 + 3 bytes => total 5 bytes.
    // Layout:
    // buf[6] = 3 (len)
    // payload: 9 at 7, 8 at 0, 7 at 1
    ring.at(6).writeBytes(new Uint8Array([9, 8, 7]));

    expect(buf[6]).toBe(3);
    expect(buf[0]).toBe(9);
    expect(buf[1]).toBe(8);
    expect(buf[2]).toBe(7);
    expect(ring.offset).toBe(3);
  });

  it("writeString wraps across end", () => {
    const { buf, ring } = make(16);

    // "abcd" => len=4, total written = 1+4 = 5 bytes
    // Start at 14:
    // buf[14]=4, payload at 15='a', 0='b',1='c',2='d'
    ring.at(14).writeString("abcd");

    expect(buf[14]).toBe(4);
    expect(buf[0]).toBe("a".charCodeAt(0));
    expect(buf[1]).toBe("b".charCodeAt(0));
    expect(buf[2]).toBe("c".charCodeAt(0));
    expect(buf[3]).toBe("d".charCodeAt(0));
    expect(ring.offset).toBe(4);
  });

  it("writeFloat64 writes IEEE754 little-endian and wraps correctly", () => {
    const { buf, ring } = make(16);

    const num = Math.PI;

    // Put it near the end so it wraps: start at 12, 8 bytes => wraps 4 bytes
    ring.at(12).writeFloat64(num);

    // Reconstruct contiguous bytes to verify value
    const tmp = new Uint8Array(8);
    tmp.set(buf.subarray(12, 16), 0);
    tmp.set(buf.subarray(0, 4), 4);

    const dv = new DataView(tmp.buffer);
    const got = dv.getFloat64(0, true);

    expect(got).toBeCloseTo(num, 12);
    expect(ring.offset).toBe(4);
  });

  it("writeBytes works if payload length > 255", () => {
    const { ring } = make(1024 * 1024);
    const big = new Uint8Array(256);
    expect(() => ring.writeBytes(big)).not.toThrow();
  });

  it("writeBytes throws if payload length >= 256*256", () => {
    const { ring } = make(1024 * 1024);
    const huge = new Uint8Array(256 * 256);
    expect(() => ring.writeBytes(huge)).toThrow();
  });
});

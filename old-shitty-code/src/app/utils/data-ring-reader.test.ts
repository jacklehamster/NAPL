// DataRingReader.test.ts
// Run: bun test
import { describe, it, expect } from "bun:test";
import { DataRingWriter } from "././data-ring"; // adjust paths
import { DataRingReader } from "././data-ring";

function make(cap: number) {
  const buf = new Uint8Array(cap);
  return {
    buf,
    w: new DataRingWriter(buf),
    r: new DataRingReader(buf),
  };
}

describe("DataRingReader", () => {
  it("readByte reads what writeByte wrote (no wrap)", () => {
    const { w, r } = make(16);
    w.at(0).writeByte(0x12);
    w.writeByte(0xab);

    r.at(0);
    expect(r.readByte()).toBe(0x12);
    expect(r.readByte()).toBe(0xab);
  });

  it("readByte reads across wrap", () => {
    const { w, r, buf } = make(4);

    w.at(3).writeByte(0x11); // writes at 3, wraps offset to 0
    w.writeByte(0x22); // writes at 0

    // sanity buffer state
    expect(buf[3]).toBe(0x11);
    expect(buf[0]).toBe(0x22);

    r.at(3);
    expect(r.readByte()).toBe(0x11);
    expect(r.readByte()).toBe(0x22);
  });

  it("readBytes reads [len][payload] contiguously", () => {
    const { w, r } = make(32);

    const payload = new Uint8Array([1, 2, 3, 4, 5]);
    w.at(5).writeBytes(payload);

    r.at(5);
    const got = r.readBytes();
    expect(Array.from(got)).toEqual([1, 2, 3, 4, 5]);
  });

  it("readBytes reads payload that wraps across end", () => {
    const { w, r } = make(8);

    // Start at 6, write len=3 + payload 9,8,7 -> wraps
    w.at(6).writeBytes(new Uint8Array([9, 8, 7]));

    r.at(6);
    const got = r.readBytes();
    expect(Array.from(got)).toEqual([9, 8, 7]);

    // After consuming: offset should be (6 + 2 + 3) % 8 = 3
    expect(r.offset).toBe(3);
  });

  it("readString round-trips ASCII (no wrap)", () => {
    const { w, r } = make(64);

    w.at(0).writeString("hello world");
    r.at(0);
    expect(r.readString()).toBe("hello world");
  });

  it("readString round-trips non-ASCII (no wrap)", () => {
    const { w, r } = make(128);

    const s = "hé🙂漢字";
    w.at(10).writeString(s);

    r.at(10);
    expect(r.readString()).toBe(s);
  });

  it("readString round-trips across wrap", () => {
    const { w, r } = make(16);

    // "abcd" => [4][a b c d] total 5 bytes; start at 14 wraps
    w.at(14).writeString("abcd");

    r.at(14);
    expect(r.readString()).toBe("abcd");
    expect(r.offset).toBe(4); // (14 + 6) % 16
  });

  it("readFloat64 reads what writeFloat64 wrote (no wrap)", () => {
    const { w, r } = make(64);

    const x = Math.PI;
    w.at(8).writeFloat64(x);

    r.at(8);
    expect(r.readFloat64()).toBeCloseTo(x, 12);
  });

  it("readFloat64 reads what writeFloat64 wrote (wrap)", () => {
    const { w, r } = make(16);

    const x = -12345.6789;
    // start near end so float64 wraps (8 bytes)
    w.at(12).writeFloat64(x);

    r.at(12);
    expect(r.readFloat64()).toBeCloseTo(x, 10);
    expect(r.offset).toBe(4); // (12 + 8) % 16
  });

  it("mixed round-trip: byte -> bytes -> string -> float64", () => {
    const { w, r } = make(256);

    w.at(0);
    w.writeByte(0x7f);
    w.writeBytes(new Uint8Array([10, 20, 30]));
    w.writeString("ok");
    w.writeFloat64(42.5);

    r.at(0);
    expect(r.readByte()).toBe(0x7f);
    expect(Array.from(r.readBytes())).toEqual([10, 20, 30]);
    expect(r.readString()).toBe("ok");
    expect(r.readFloat64()).toBeCloseTo(42.5, 12);
  });

  it("readBytes returns a view; reading is immediate (does not allocate per read in contiguous case)", () => {
    const { w, r, buf } = make(32);

    w.at(0).writeBytes(new Uint8Array([1, 2, 3]));
    r.at(0);
    const got = r.readBytes();

    // In contiguous case, it should be a subarray view over the same underlying buffer
    expect(got.buffer).toBe(buf.buffer);
    expect(Array.from(got)).toEqual([1, 2, 3]);
  });

  it("reads booleans", () => {
    const { w, r } = make(1024);
    function generateBooleans() {
      const booleans = [];
      for (let i = 0; i < 500; i++) {
        booleans[i] = Math.random() < 0.5;
      }
      return booleans;
    }
    const booleans: boolean[] = [
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
    ];
    w.writeBooleans(...booleans);
    expect(r.readBooleans(booleans.length)).toEqual(booleans);
  });

  it("reads booleans random", () => {
    const { w, r } = make(1024);
    function generateBooleans() {
      const booleans = [];
      for (let i = 0; i < 500; i++) {
        booleans[i] = Math.random() < 0.5;
      }
      return booleans;
    }
    const booleans: boolean[] = generateBooleans();
    w.writeBooleans(...booleans);
    expect(r.readBooleans(booleans.length)).toEqual(booleans);
  });
});

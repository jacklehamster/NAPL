export interface IDataWriter {
  at(offset: number): IDataWriter;
  writeByte(byte: number): void;
  writeBytes(bytes: Uint8Array): void; // writes [u8 len][len bytes]
  writeString(str: string): void; // writes as writeBytes(utf8)
  writeFloat64(num: number): void; // IEEE754, little-endian
  readonly offset: number;
}

export class DataRingWriter implements IDataWriter {
  offset = 0;

  private cap: number;
  private enc = new TextEncoder();

  // scratch buffers (non-shared ok even if underlying ring is shared)
  private scratch = new Uint8Array(64);
  private floatScratch = new Uint8Array(8);
  private floatDV = new DataView(this.floatScratch.buffer);

  constructor(private data: Uint8Array) {
    this.cap = data.length;
    if (this.cap <= 0) throw new Error("DataRing: data length must be > 0");
  }

  at(offset: number) {
    // normalize in [0, cap)
    this.offset = ((offset % this.cap) + this.cap) % this.cap;
    return this;
  }

  // ---- core ring copy helpers ----

  private advance(n: number) {
    const x = this.offset + n;
    this.offset = x >= this.cap ? x % this.cap : x;
  }

  private writeU8(v: number) {
    this.data[this.offset] = v & 0xff;
    this.advance(1);
  }

  /** write src bytes to ring, handling wrap */
  private writeRawBytes(src: Uint8Array) {
    const n = src.length;
    if (n === 0) return;

    const end = this.offset + n;
    if (end <= this.cap) {
      this.data.set(src, this.offset);
      this.offset = end === this.cap ? 0 : end;
      return;
    }

    const first = this.cap - this.offset;
    this.data.set(src.subarray(0, first), this.offset);
    const second = n - first;
    this.data.set(src.subarray(first), 0);
    this.offset = second; // wrapped
  }

  // ---- public API ----

  writeByte(byte: number) {
    this.writeU8(byte);
  }

  /** Writes [u8 len][len bytes]. len must be <= 255. */
  writeBytes(bytes: Uint8Array) {
    if (bytes.length > 255) {
      throw new Error(
        `writeBytes: length ${bytes.length} > 255 (u8 length prefix)`
      );
    }
    this.writeU8(bytes.length);
    this.writeRawBytes(bytes);
  }

  writeString(str: string) {
    // Ensure scratch big enough for worst-case UTF-8 length.
    // (UTF-8 max is 4 bytes per code point; using 4*str.length is a safe upper bound in JS.)
    const needed = Math.min(255, str.length * 4); // because we store len as u8 anyway
    if (this.scratch.length < needed) {
      this.scratch = new Uint8Array(Math.max(needed, this.scratch.length * 2));
    }

    const { written, read } = this.enc.encodeInto(str, this.scratch);

    // If not all chars fit (read < str.length) OR written > 255, you need a different length prefix.
    if (read < str.length || written > 255) {
      // simplest: fall back to encode() which allocates, or upgrade to u16 length prefix
      const bytes = this.enc.encode(str);
      if (bytes.length > 255)
        throw new Error(`writeString: encoded length ${bytes.length} > 255`);
      this.writeBytes(bytes);
      return;
    }

    this.writeBytes(this.scratch.subarray(0, written));
  }

  writeFloat64(num: number) {
    // write into temp 8-byte buffer (little-endian) then ring-copy
    this.floatDV.setFloat64(0, num, true);
    this.writeRawBytes(this.floatScratch);
  }
}

export interface IDataReader {
  at(offset: number): IDataReader;
  readByte(): number;
  readBytes(): Uint8Array; // reads [u8 len][len bytes] and returns payload (view or scratch)
  readString(): string; // reads bytes then decodes UTF-8
  readFloat64(): number; // IEEE754, little-endian
  readonly offset: number;
}

export class DataRingReader implements IDataReader {
  offset = 0;

  private cap: number;
  private dec = new TextDecoder();

  // scratch for wrapped reads (reused)
  private scratch = new Uint8Array(64);
  private floatScratch = new Uint8Array(8);
  private floatDV = new DataView(this.floatScratch.buffer);

  constructor(private data: Uint8Array) {
    this.cap = data.length;
    if (this.cap <= 0) throw new Error("DataRing: data length must be > 0");
  }

  at(offset: number) {
    this.offset = ((offset % this.cap) + this.cap) % this.cap;
    return this;
  }

  // ---- core ring helpers ----

  private advance(n: number) {
    const x = this.offset + n;
    this.offset = x >= this.cap ? x % this.cap : x;
  }

  private readU8(): number {
    const v = this.data[this.offset];
    this.advance(1);
    return v;
  }

  /** Reads n bytes; returns a view if contiguous, otherwise copies into scratch and returns scratch.subarray(0,n). */
  private readRawBytes(n: number): Uint8Array {
    if (n <= 0) return this.data.subarray(0, 0);

    const end = this.offset + n;
    if (end <= this.cap) {
      const view = this.data.subarray(this.offset, end);
      this.offset = end === this.cap ? 0 : end;
      return view;
    }

    // wrapped: copy tail + head into scratch
    if (this.scratch.length < n) {
      this.scratch = new Uint8Array(Math.max(n, this.scratch.length * 2));
    }

    const first = this.cap - this.offset;
    this.scratch.set(this.data.subarray(this.offset, this.cap), 0);
    const second = n - first;
    this.scratch.set(this.data.subarray(0, second), first);
    this.offset = second;

    return this.scratch.subarray(0, n);
  }

  // ---- public API ----

  readByte(): number {
    return this.readU8();
  }

  readBytes(): Uint8Array {
    const len = this.readU8(); // u8 length prefix
    return this.readRawBytes(len); // payload
  }

  readString(): string {
    const bytes = this.readBytes();

    // If underlying buffer is SharedArrayBuffer, TextDecoder.decode refuses shared views.
    // If we got a contiguous view into shared memory, copy it. If we got scratch, it's already non-shared.
    const needsCopy = bytes.buffer instanceof SharedArrayBuffer;

    if (needsCopy) {
      // copy to non-shared and decode
      if (this.scratch.length < bytes.length) {
        this.scratch = new Uint8Array(
          Math.max(bytes.length, this.scratch.length * 2)
        );
      }
      this.scratch.set(bytes, 0);
      return this.dec.decode(this.scratch.subarray(0, bytes.length));
    }

    return this.dec.decode(bytes);
  }

  readFloat64(): number {
    // Read 8 bytes into temp (handles wrap), then interpret little-endian float64
    const b = this.readRawBytes(8);
    if (b.byteLength !== 8) throw new Error("readFloat64: expected 8 bytes");

    // If b is a view into the ring, it may be shared or not contiguous elsewhere later; copy into floatScratch.
    // If b is scratch already, this copy is still cheap and keeps floatDV simple.
    this.floatScratch.set(b);
    return this.floatDV.getFloat64(0, true);
  }
}

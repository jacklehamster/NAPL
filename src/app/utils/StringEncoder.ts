export function hookStringEncoder() {
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  let scratch = new Uint8Array(64);
  function decodeToString(data: Uint8Array, w: number): [string, number] {
    let offset = w;
    const byteLength = data[offset++];
    if (!byteLength) {
      return ["", offset];
    }
    if (scratch.byteLength < byteLength) {
      scratch = new Uint8Array(
        Math.max(data.byteLength, scratch.byteLength * 2)
      );
    }
    scratch.set(data.subarray(offset, offset + byteLength));
    const str = dec.decode(scratch.subarray(0, byteLength));
    offset += byteLength;
    return [str, offset];
  }

  function encodeString(str: string, data: Uint8Array, w: number) {
    let offset = w;
    if (!str.length) {
      data[offset++] = 0;
      return offset;
    }
    const result = enc.encodeInto(str, scratch);
    data[offset++] = result.written;
    data.set(scratch.subarray(0, result.written), offset);
    offset += result.written;
    return offset;
  }

  function encodeStrings(str: string[], data: Uint8Array) {}

  function decodeStrings(data: Uint8Array) {}

  return { encodeString, decodeToString };
}

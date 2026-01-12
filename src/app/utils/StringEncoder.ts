export function hookStringEncoder() {
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  let scratch = new Uint8Array(64);
  function decodeToString(data: Uint8Array): [string, number] {
    let offset = 0;
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

  function encodeString(str: string, data: Uint8Array) {
    let offset = 0;
    if (!str.length) {
      data[offset++] = 0;
      return offset;
    }
    const bytes = enc.encode(str);
    data[offset++] = bytes.length;
    data.set(bytes, offset);
    offset += bytes.length;
    return offset;
  }

  function encodeStrings(str: string[], data: Uint8Array) {}

  function decodeStrings(data: Uint8Array) {}

  return { encodeString, decodeToString };
}

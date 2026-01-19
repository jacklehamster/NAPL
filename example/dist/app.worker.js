// ../src/cycles/data-update/data-update.ts
function filterArray(array, cond) {
  let size = 0;
  for (let i = 0;i < array.length; i++) {
    array[size] = array[i];
    if (cond(array[i])) {
      size++;
    }
  }
  array.length = size;
}
function commitUpdates({ root, incomingUpdates, outgoingUpdates, properties }, updatedPaths, consolidate) {
  if (consolidate) {
    consolidateUpdates(incomingUpdates, outgoingUpdates);
  }
  if (!incomingUpdates.length) {
    return;
  }
  incomingUpdates.forEach((update) => {
    if (!update.confirmed) {
      return;
    }
    const parts = update.path.split("/");
    const leaf = getLeafObject(root, parts, 1, true, properties, updatedPaths, update.confirmed);
    const prop = parts[parts.length - 1];
    const value = translateValue(update.value, properties);
    if (value === undefined) {
      delete leaf[prop];
      updatedPaths.set(parts.slice(0, parts.length).join("/"), {
        value: undefined,
        confirmed: update.confirmed
      });
      updatedPaths.set(parts.slice(0, parts.length - 1).join("/"), {
        value: leaf,
        confirmed: update.confirmed,
        isParent: true
      });
      cleanupRoot(root, parts, 0, updatedPaths, update.confirmed);
    } else {
      if (typeof leaf[prop] === undefined) {
        updatedPaths.set(parts.slice(0, parts.length).join("/"), {
          value: leaf,
          confirmed: update.confirmed,
          isParent: true
        });
      }
      leaf[prop] = value;
    }
    updatedPaths.set(update.path, {
      value: leaf[prop],
      confirmed: update.confirmed
    });
  });
  filterArray(incomingUpdates, (update) => !update.confirmed);
}
function cleanupRoot(root, parts, index, updatedPaths, confirmed) {
  if (!root || typeof root !== "object" || Array.isArray(root)) {
    return false;
  }
  if (cleanupRoot(root[parts[index]], parts, index + 1, updatedPaths, confirmed)) {
    delete root[parts[index]];
    const leafPath = parts.slice(0, index + 1);
    updatedPaths.set(leafPath.join("/"), {
      value: undefined,
      confirmed
    });
    leafPath.pop();
    updatedPaths.set(leafPath.join("/"), {
      value: root,
      confirmed
    });
  }
  return Object.keys(root).length === 0;
}
function compareUpdates(a, b) {
  if (a.confirmed !== b.confirmed) {
    return a.confirmed - b.confirmed;
  }
  return a.path.localeCompare(b.path);
}
var _map = new Map;
function consolidateUpdates(incoming, outgoing) {
  if (!incoming.length && !outgoing.length) {
    return;
  }
  _map.clear();
  for (let i = 0;i < incoming.length; i++) {
    const update = incoming[i];
    if (update.confirmed) {
      const existingUpdate = _map.get(update.path);
      if (!existingUpdate || compareUpdates(existingUpdate, update) < 0) {
        _map.set(update.path, update);
      }
    }
  }
  for (let i = 0;i < outgoing.length; i++) {
    const update = outgoing[i];
    if (update.confirmed) {
      const existingUpdate = _map.get(update.path);
      if (!existingUpdate || compareUpdates(existingUpdate, update) < 0) {
        _map.set(update.path, update);
      }
    }
  }
  filterArray(incoming, (update) => !update.confirmed || _map.get(update.path) === update);
  filterArray(outgoing, (update) => !update.confirmed || _map.get(update.path) === update);
  _map.clear();
}
function getLeafObject(obj, parts, offset, autoCreate, properties, updatedPaths, confirmed) {
  let current = obj;
  for (let i = 0;i < parts.length - offset; i++) {
    const prop = parts[i];
    const value = translateProp(current, prop, properties, autoCreate, updatedPaths, parts.slice(0, i + 1).join("/"), confirmed);
    if (!value) {
      return value;
    }
    current = value;
  }
  return current;
}
function translateValue(value, properties) {
  if (typeof value !== "string") {
    return value;
  }
  if (value.startsWith("~{") && value.endsWith("}")) {
    switch (value) {
      default:
        const group = value.match(/~\{([^}]+)\}/);
        if (group) {
          return properties[group[1]];
        }
    }
  }
  return value;
}
function translateProp(obj, prop, properties, autoCreate = false, updatedPaths, path, confirmed) {
  const theProp = translateValue(prop, properties);
  let value = obj[theProp];
  if (value === undefined && autoCreate) {
    value = obj[theProp] = {};
    if (updatedPaths && path && confirmed) {
      updatedPaths.set(path, {
        value,
        confirmed
      });
    }
  }
  return value;
}
// ../node_modules/@msgpack/msgpack/dist.esm/utils/utf8.mjs
function utf8Count(str) {
  const strLength = str.length;
  let byteLength = 0;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      byteLength++;
      continue;
    } else if ((value & 4294965248) === 0) {
      byteLength += 2;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        byteLength += 3;
      } else {
        byteLength += 4;
      }
    }
  }
  return byteLength;
}
function utf8EncodeJs(str, output, outputOffset) {
  const strLength = str.length;
  let offset = outputOffset;
  let pos = 0;
  while (pos < strLength) {
    let value = str.charCodeAt(pos++);
    if ((value & 4294967168) === 0) {
      output[offset++] = value;
      continue;
    } else if ((value & 4294965248) === 0) {
      output[offset++] = value >> 6 & 31 | 192;
    } else {
      if (value >= 55296 && value <= 56319) {
        if (pos < strLength) {
          const extra = str.charCodeAt(pos);
          if ((extra & 64512) === 56320) {
            ++pos;
            value = ((value & 1023) << 10) + (extra & 1023) + 65536;
          }
        }
      }
      if ((value & 4294901760) === 0) {
        output[offset++] = value >> 12 & 15 | 224;
        output[offset++] = value >> 6 & 63 | 128;
      } else {
        output[offset++] = value >> 18 & 7 | 240;
        output[offset++] = value >> 12 & 63 | 128;
        output[offset++] = value >> 6 & 63 | 128;
      }
    }
    output[offset++] = value & 63 | 128;
  }
}
var sharedTextEncoder = new TextEncoder;
var TEXT_ENCODER_THRESHOLD = 50;
function utf8EncodeTE(str, output, outputOffset) {
  sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
}
function utf8Encode(str, output, outputOffset) {
  if (str.length > TEXT_ENCODER_THRESHOLD) {
    utf8EncodeTE(str, output, outputOffset);
  } else {
    utf8EncodeJs(str, output, outputOffset);
  }
}
var CHUNK_SIZE = 4096;
function utf8DecodeJs(bytes, inputOffset, byteLength) {
  let offset = inputOffset;
  const end = offset + byteLength;
  const units = [];
  let result = "";
  while (offset < end) {
    const byte1 = bytes[offset++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = bytes[offset++] & 63;
      const byte3 = bytes[offset++] & 63;
      const byte4 = bytes[offset++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= CHUNK_SIZE) {
      result += String.fromCharCode(...units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += String.fromCharCode(...units);
  }
  return result;
}
var sharedTextDecoder = new TextDecoder;
var TEXT_DECODER_THRESHOLD = 200;
function utf8DecodeTD(bytes, inputOffset, byteLength) {
  const stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
  return sharedTextDecoder.decode(stringBytes);
}
function utf8Decode(bytes, inputOffset, byteLength) {
  if (byteLength > TEXT_DECODER_THRESHOLD) {
    return utf8DecodeTD(bytes, inputOffset, byteLength);
  } else {
    return utf8DecodeJs(bytes, inputOffset, byteLength);
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/ExtData.mjs
class ExtData {
  type;
  data;
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/DecodeError.mjs
class DecodeError extends Error {
  constructor(message) {
    super(message);
    const proto = Object.create(DecodeError.prototype);
    Object.setPrototypeOf(this, proto);
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: DecodeError.name
    });
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/utils/int.mjs
var UINT32_MAX = 4294967295;
function setUint64(view, offset, value) {
  const high = value / 4294967296;
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function setInt64(view, offset, value) {
  const high = Math.floor(value / 4294967296);
  const low = value;
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}
function getInt64(view, offset) {
  const high = view.getInt32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}
function getUint64(view, offset) {
  const high = view.getUint32(offset);
  const low = view.getUint32(offset + 4);
  return high * 4294967296 + low;
}

// ../node_modules/@msgpack/msgpack/dist.esm/timestamp.mjs
var EXT_TIMESTAMP = -1;
var TIMESTAMP32_MAX_SEC = 4294967296 - 1;
var TIMESTAMP64_MAX_SEC = 17179869184 - 1;
function encodeTimeSpecToTimestamp({ sec, nsec }) {
  if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
    if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
      const rv = new Uint8Array(4);
      const view = new DataView(rv.buffer);
      view.setUint32(0, sec);
      return rv;
    } else {
      const secHigh = sec / 4294967296;
      const secLow = sec & 4294967295;
      const rv = new Uint8Array(8);
      const view = new DataView(rv.buffer);
      view.setUint32(0, nsec << 2 | secHigh & 3);
      view.setUint32(4, secLow);
      return rv;
    }
  } else {
    const rv = new Uint8Array(12);
    const view = new DataView(rv.buffer);
    view.setUint32(0, nsec);
    setInt64(view, 4, sec);
    return rv;
  }
}
function encodeDateToTimeSpec(date) {
  const msec = date.getTime();
  const sec = Math.floor(msec / 1000);
  const nsec = (msec - sec * 1000) * 1e6;
  const nsecInSec = Math.floor(nsec / 1e9);
  return {
    sec: sec + nsecInSec,
    nsec: nsec - nsecInSec * 1e9
  };
}
function encodeTimestampExtension(object) {
  if (object instanceof Date) {
    const timeSpec = encodeDateToTimeSpec(object);
    return encodeTimeSpecToTimestamp(timeSpec);
  } else {
    return null;
  }
}
function decodeTimestampToTimeSpec(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  switch (data.byteLength) {
    case 4: {
      const sec = view.getUint32(0);
      const nsec = 0;
      return { sec, nsec };
    }
    case 8: {
      const nsec30AndSecHigh2 = view.getUint32(0);
      const secLow32 = view.getUint32(4);
      const sec = (nsec30AndSecHigh2 & 3) * 4294967296 + secLow32;
      const nsec = nsec30AndSecHigh2 >>> 2;
      return { sec, nsec };
    }
    case 12: {
      const sec = getInt64(view, 4);
      const nsec = view.getUint32(0);
      return { sec, nsec };
    }
    default:
      throw new DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${data.length}`);
  }
}
function decodeTimestampExtension(data) {
  const timeSpec = decodeTimestampToTimeSpec(data);
  return new Date(timeSpec.sec * 1000 + timeSpec.nsec / 1e6);
}
var timestampExtension = {
  type: EXT_TIMESTAMP,
  encode: encodeTimestampExtension,
  decode: decodeTimestampExtension
};

// ../node_modules/@msgpack/msgpack/dist.esm/ExtensionCodec.mjs
class ExtensionCodec {
  static defaultCodec = new ExtensionCodec;
  __brand;
  builtInEncoders = [];
  builtInDecoders = [];
  encoders = [];
  decoders = [];
  constructor() {
    this.register(timestampExtension);
  }
  register({ type, encode, decode }) {
    if (type >= 0) {
      this.encoders[type] = encode;
      this.decoders[type] = decode;
    } else {
      const index = -1 - type;
      this.builtInEncoders[index] = encode;
      this.builtInDecoders[index] = decode;
    }
  }
  tryToEncode(object, context) {
    for (let i = 0;i < this.builtInEncoders.length; i++) {
      const encodeExt = this.builtInEncoders[i];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = -1 - i;
          return new ExtData(type, data);
        }
      }
    }
    for (let i = 0;i < this.encoders.length; i++) {
      const encodeExt = this.encoders[i];
      if (encodeExt != null) {
        const data = encodeExt(object, context);
        if (data != null) {
          const type = i;
          return new ExtData(type, data);
        }
      }
    }
    if (object instanceof ExtData) {
      return object;
    }
    return null;
  }
  decode(data, type, context) {
    const decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
    if (decodeExt) {
      return decodeExt(data, type, context);
    } else {
      return new ExtData(type, data);
    }
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/utils/typedArrays.mjs
function isArrayBufferLike(buffer) {
  return buffer instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && buffer instanceof SharedArrayBuffer;
}
function ensureUint8Array(buffer) {
  if (buffer instanceof Uint8Array) {
    return buffer;
  } else if (ArrayBuffer.isView(buffer)) {
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (isArrayBufferLike(buffer)) {
    return new Uint8Array(buffer);
  } else {
    return Uint8Array.from(buffer);
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/Encoder.mjs
var DEFAULT_MAX_DEPTH = 100;
var DEFAULT_INITIAL_BUFFER_SIZE = 2048;

class Encoder {
  extensionCodec;
  context;
  useBigInt64;
  maxDepth;
  initialBufferSize;
  sortKeys;
  forceFloat32;
  ignoreUndefined;
  forceIntegerToFloat;
  pos;
  view;
  bytes;
  entered = false;
  constructor(options) {
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.maxDepth = options?.maxDepth ?? DEFAULT_MAX_DEPTH;
    this.initialBufferSize = options?.initialBufferSize ?? DEFAULT_INITIAL_BUFFER_SIZE;
    this.sortKeys = options?.sortKeys ?? false;
    this.forceFloat32 = options?.forceFloat32 ?? false;
    this.ignoreUndefined = options?.ignoreUndefined ?? false;
    this.forceIntegerToFloat = options?.forceIntegerToFloat ?? false;
    this.pos = 0;
    this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
    this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new Encoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      maxDepth: this.maxDepth,
      initialBufferSize: this.initialBufferSize,
      sortKeys: this.sortKeys,
      forceFloat32: this.forceFloat32,
      ignoreUndefined: this.ignoreUndefined,
      forceIntegerToFloat: this.forceIntegerToFloat
    });
  }
  reinitializeState() {
    this.pos = 0;
  }
  encodeSharedRef(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encodeSharedRef(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.subarray(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  encode(object) {
    if (this.entered) {
      const instance = this.clone();
      return instance.encode(object);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.doEncode(object, 1);
      return this.bytes.slice(0, this.pos);
    } finally {
      this.entered = false;
    }
  }
  doEncode(object, depth) {
    if (depth > this.maxDepth) {
      throw new Error(`Too deep objects in depth ${depth}`);
    }
    if (object == null) {
      this.encodeNil();
    } else if (typeof object === "boolean") {
      this.encodeBoolean(object);
    } else if (typeof object === "number") {
      if (!this.forceIntegerToFloat) {
        this.encodeNumber(object);
      } else {
        this.encodeNumberAsFloat(object);
      }
    } else if (typeof object === "string") {
      this.encodeString(object);
    } else if (this.useBigInt64 && typeof object === "bigint") {
      this.encodeBigInt64(object);
    } else {
      this.encodeObject(object, depth);
    }
  }
  ensureBufferSizeToWrite(sizeToWrite) {
    const requiredSize = this.pos + sizeToWrite;
    if (this.view.byteLength < requiredSize) {
      this.resizeBuffer(requiredSize * 2);
    }
  }
  resizeBuffer(newSize) {
    const newBuffer = new ArrayBuffer(newSize);
    const newBytes = new Uint8Array(newBuffer);
    const newView = new DataView(newBuffer);
    newBytes.set(this.bytes);
    this.view = newView;
    this.bytes = newBytes;
  }
  encodeNil() {
    this.writeU8(192);
  }
  encodeBoolean(object) {
    if (object === false) {
      this.writeU8(194);
    } else {
      this.writeU8(195);
    }
  }
  encodeNumber(object) {
    if (!this.forceIntegerToFloat && Number.isSafeInteger(object)) {
      if (object >= 0) {
        if (object < 128) {
          this.writeU8(object);
        } else if (object < 256) {
          this.writeU8(204);
          this.writeU8(object);
        } else if (object < 65536) {
          this.writeU8(205);
          this.writeU16(object);
        } else if (object < 4294967296) {
          this.writeU8(206);
          this.writeU32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(207);
          this.writeU64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      } else {
        if (object >= -32) {
          this.writeU8(224 | object + 32);
        } else if (object >= -128) {
          this.writeU8(208);
          this.writeI8(object);
        } else if (object >= -32768) {
          this.writeU8(209);
          this.writeI16(object);
        } else if (object >= -2147483648) {
          this.writeU8(210);
          this.writeI32(object);
        } else if (!this.useBigInt64) {
          this.writeU8(211);
          this.writeI64(object);
        } else {
          this.encodeNumberAsFloat(object);
        }
      }
    } else {
      this.encodeNumberAsFloat(object);
    }
  }
  encodeNumberAsFloat(object) {
    if (this.forceFloat32) {
      this.writeU8(202);
      this.writeF32(object);
    } else {
      this.writeU8(203);
      this.writeF64(object);
    }
  }
  encodeBigInt64(object) {
    if (object >= BigInt(0)) {
      this.writeU8(207);
      this.writeBigUint64(object);
    } else {
      this.writeU8(211);
      this.writeBigInt64(object);
    }
  }
  writeStringHeader(byteLength) {
    if (byteLength < 32) {
      this.writeU8(160 + byteLength);
    } else if (byteLength < 256) {
      this.writeU8(217);
      this.writeU8(byteLength);
    } else if (byteLength < 65536) {
      this.writeU8(218);
      this.writeU16(byteLength);
    } else if (byteLength < 4294967296) {
      this.writeU8(219);
      this.writeU32(byteLength);
    } else {
      throw new Error(`Too long string: ${byteLength} bytes in UTF-8`);
    }
  }
  encodeString(object) {
    const maxHeaderSize = 1 + 4;
    const byteLength = utf8Count(object);
    this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
    this.writeStringHeader(byteLength);
    utf8Encode(object, this.bytes, this.pos);
    this.pos += byteLength;
  }
  encodeObject(object, depth) {
    const ext = this.extensionCodec.tryToEncode(object, this.context);
    if (ext != null) {
      this.encodeExtension(ext);
    } else if (Array.isArray(object)) {
      this.encodeArray(object, depth);
    } else if (ArrayBuffer.isView(object)) {
      this.encodeBinary(object);
    } else if (typeof object === "object") {
      this.encodeMap(object, depth);
    } else {
      throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(object)}`);
    }
  }
  encodeBinary(object) {
    const size = object.byteLength;
    if (size < 256) {
      this.writeU8(196);
      this.writeU8(size);
    } else if (size < 65536) {
      this.writeU8(197);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(198);
      this.writeU32(size);
    } else {
      throw new Error(`Too large binary: ${size}`);
    }
    const bytes = ensureUint8Array(object);
    this.writeU8a(bytes);
  }
  encodeArray(object, depth) {
    const size = object.length;
    if (size < 16) {
      this.writeU8(144 + size);
    } else if (size < 65536) {
      this.writeU8(220);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(221);
      this.writeU32(size);
    } else {
      throw new Error(`Too large array: ${size}`);
    }
    for (const item of object) {
      this.doEncode(item, depth + 1);
    }
  }
  countWithoutUndefined(object, keys) {
    let count = 0;
    for (const key of keys) {
      if (object[key] !== undefined) {
        count++;
      }
    }
    return count;
  }
  encodeMap(object, depth) {
    const keys = Object.keys(object);
    if (this.sortKeys) {
      keys.sort();
    }
    const size = this.ignoreUndefined ? this.countWithoutUndefined(object, keys) : keys.length;
    if (size < 16) {
      this.writeU8(128 + size);
    } else if (size < 65536) {
      this.writeU8(222);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(223);
      this.writeU32(size);
    } else {
      throw new Error(`Too large map object: ${size}`);
    }
    for (const key of keys) {
      const value = object[key];
      if (!(this.ignoreUndefined && value === undefined)) {
        this.encodeString(key);
        this.doEncode(value, depth + 1);
      }
    }
  }
  encodeExtension(ext) {
    if (typeof ext.data === "function") {
      const data = ext.data(this.pos + 6);
      const size2 = data.length;
      if (size2 >= 4294967296) {
        throw new Error(`Too large extension object: ${size2}`);
      }
      this.writeU8(201);
      this.writeU32(size2);
      this.writeI8(ext.type);
      this.writeU8a(data);
      return;
    }
    const size = ext.data.length;
    if (size === 1) {
      this.writeU8(212);
    } else if (size === 2) {
      this.writeU8(213);
    } else if (size === 4) {
      this.writeU8(214);
    } else if (size === 8) {
      this.writeU8(215);
    } else if (size === 16) {
      this.writeU8(216);
    } else if (size < 256) {
      this.writeU8(199);
      this.writeU8(size);
    } else if (size < 65536) {
      this.writeU8(200);
      this.writeU16(size);
    } else if (size < 4294967296) {
      this.writeU8(201);
      this.writeU32(size);
    } else {
      throw new Error(`Too large extension object: ${size}`);
    }
    this.writeI8(ext.type);
    this.writeU8a(ext.data);
  }
  writeU8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setUint8(this.pos, value);
    this.pos++;
  }
  writeU8a(values) {
    const size = values.length;
    this.ensureBufferSizeToWrite(size);
    this.bytes.set(values, this.pos);
    this.pos += size;
  }
  writeI8(value) {
    this.ensureBufferSizeToWrite(1);
    this.view.setInt8(this.pos, value);
    this.pos++;
  }
  writeU16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setUint16(this.pos, value);
    this.pos += 2;
  }
  writeI16(value) {
    this.ensureBufferSizeToWrite(2);
    this.view.setInt16(this.pos, value);
    this.pos += 2;
  }
  writeU32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setUint32(this.pos, value);
    this.pos += 4;
  }
  writeI32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setInt32(this.pos, value);
    this.pos += 4;
  }
  writeF32(value) {
    this.ensureBufferSizeToWrite(4);
    this.view.setFloat32(this.pos, value);
    this.pos += 4;
  }
  writeF64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setFloat64(this.pos, value);
    this.pos += 8;
  }
  writeU64(value) {
    this.ensureBufferSizeToWrite(8);
    setUint64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeI64(value) {
    this.ensureBufferSizeToWrite(8);
    setInt64(this.view, this.pos, value);
    this.pos += 8;
  }
  writeBigUint64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigUint64(this.pos, value);
    this.pos += 8;
  }
  writeBigInt64(value) {
    this.ensureBufferSizeToWrite(8);
    this.view.setBigInt64(this.pos, value);
    this.pos += 8;
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/encode.mjs
function encode(value, options) {
  const encoder = new Encoder(options);
  return encoder.encodeSharedRef(value);
}

// ../node_modules/@msgpack/msgpack/dist.esm/utils/prettyByte.mjs
function prettyByte(byte) {
  return `${byte < 0 ? "-" : ""}0x${Math.abs(byte).toString(16).padStart(2, "0")}`;
}

// ../node_modules/@msgpack/msgpack/dist.esm/CachedKeyDecoder.mjs
var DEFAULT_MAX_KEY_LENGTH = 16;
var DEFAULT_MAX_LENGTH_PER_KEY = 16;

class CachedKeyDecoder {
  hit = 0;
  miss = 0;
  caches;
  maxKeyLength;
  maxLengthPerKey;
  constructor(maxKeyLength = DEFAULT_MAX_KEY_LENGTH, maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY) {
    this.maxKeyLength = maxKeyLength;
    this.maxLengthPerKey = maxLengthPerKey;
    this.caches = [];
    for (let i = 0;i < this.maxKeyLength; i++) {
      this.caches.push([]);
    }
  }
  canBeCached(byteLength) {
    return byteLength > 0 && byteLength <= this.maxKeyLength;
  }
  find(bytes, inputOffset, byteLength) {
    const records = this.caches[byteLength - 1];
    FIND_CHUNK:
      for (const record of records) {
        const recordBytes = record.bytes;
        for (let j = 0;j < byteLength; j++) {
          if (recordBytes[j] !== bytes[inputOffset + j]) {
            continue FIND_CHUNK;
          }
        }
        return record.str;
      }
    return null;
  }
  store(bytes, value) {
    const records = this.caches[bytes.length - 1];
    const record = { bytes, str: value };
    if (records.length >= this.maxLengthPerKey) {
      records[Math.random() * records.length | 0] = record;
    } else {
      records.push(record);
    }
  }
  decode(bytes, inputOffset, byteLength) {
    const cachedValue = this.find(bytes, inputOffset, byteLength);
    if (cachedValue != null) {
      this.hit++;
      return cachedValue;
    }
    this.miss++;
    const str = utf8DecodeJs(bytes, inputOffset, byteLength);
    const slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
    this.store(slicedCopyOfBytes, str);
    return str;
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/Decoder.mjs
var STATE_ARRAY = "array";
var STATE_MAP_KEY = "map_key";
var STATE_MAP_VALUE = "map_value";
var mapKeyConverter = (key) => {
  if (typeof key === "string" || typeof key === "number") {
    return key;
  }
  throw new DecodeError("The type of key must be string or number but " + typeof key);
};

class StackPool {
  stack = [];
  stackHeadPosition = -1;
  get length() {
    return this.stackHeadPosition + 1;
  }
  top() {
    return this.stack[this.stackHeadPosition];
  }
  pushArrayState(size) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_ARRAY;
    state.position = 0;
    state.size = size;
    state.array = new Array(size);
  }
  pushMapState(size) {
    const state = this.getUninitializedStateFromPool();
    state.type = STATE_MAP_KEY;
    state.readCount = 0;
    state.size = size;
    state.map = {};
  }
  getUninitializedStateFromPool() {
    this.stackHeadPosition++;
    if (this.stackHeadPosition === this.stack.length) {
      const partialState = {
        type: undefined,
        size: 0,
        array: undefined,
        position: 0,
        readCount: 0,
        map: undefined,
        key: null
      };
      this.stack.push(partialState);
    }
    return this.stack[this.stackHeadPosition];
  }
  release(state) {
    const topStackState = this.stack[this.stackHeadPosition];
    if (topStackState !== state) {
      throw new Error("Invalid stack state. Released state is not on top of the stack.");
    }
    if (state.type === STATE_ARRAY) {
      const partialState = state;
      partialState.size = 0;
      partialState.array = undefined;
      partialState.position = 0;
      partialState.type = undefined;
    }
    if (state.type === STATE_MAP_KEY || state.type === STATE_MAP_VALUE) {
      const partialState = state;
      partialState.size = 0;
      partialState.map = undefined;
      partialState.readCount = 0;
      partialState.type = undefined;
    }
    this.stackHeadPosition--;
  }
  reset() {
    this.stack.length = 0;
    this.stackHeadPosition = -1;
  }
}
var HEAD_BYTE_REQUIRED = -1;
var EMPTY_VIEW = new DataView(new ArrayBuffer(0));
var EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
try {
  EMPTY_VIEW.getInt8(0);
} catch (e) {
  if (!(e instanceof RangeError)) {
    throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
  }
}
var MORE_DATA = new RangeError("Insufficient data");
var sharedCachedKeyDecoder = new CachedKeyDecoder;

class Decoder {
  extensionCodec;
  context;
  useBigInt64;
  rawStrings;
  maxStrLength;
  maxBinLength;
  maxArrayLength;
  maxMapLength;
  maxExtLength;
  keyDecoder;
  mapKeyConverter;
  totalPos = 0;
  pos = 0;
  view = EMPTY_VIEW;
  bytes = EMPTY_BYTES;
  headByte = HEAD_BYTE_REQUIRED;
  stack = new StackPool;
  entered = false;
  constructor(options) {
    this.extensionCodec = options?.extensionCodec ?? ExtensionCodec.defaultCodec;
    this.context = options?.context;
    this.useBigInt64 = options?.useBigInt64 ?? false;
    this.rawStrings = options?.rawStrings ?? false;
    this.maxStrLength = options?.maxStrLength ?? UINT32_MAX;
    this.maxBinLength = options?.maxBinLength ?? UINT32_MAX;
    this.maxArrayLength = options?.maxArrayLength ?? UINT32_MAX;
    this.maxMapLength = options?.maxMapLength ?? UINT32_MAX;
    this.maxExtLength = options?.maxExtLength ?? UINT32_MAX;
    this.keyDecoder = options?.keyDecoder !== undefined ? options.keyDecoder : sharedCachedKeyDecoder;
    this.mapKeyConverter = options?.mapKeyConverter ?? mapKeyConverter;
  }
  clone() {
    return new Decoder({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      rawStrings: this.rawStrings,
      maxStrLength: this.maxStrLength,
      maxBinLength: this.maxBinLength,
      maxArrayLength: this.maxArrayLength,
      maxMapLength: this.maxMapLength,
      maxExtLength: this.maxExtLength,
      keyDecoder: this.keyDecoder
    });
  }
  reinitializeState() {
    this.totalPos = 0;
    this.headByte = HEAD_BYTE_REQUIRED;
    this.stack.reset();
  }
  setBuffer(buffer) {
    const bytes = ensureUint8Array(buffer);
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.pos = 0;
  }
  appendBuffer(buffer) {
    if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
      this.setBuffer(buffer);
    } else {
      const remainingData = this.bytes.subarray(this.pos);
      const newData = ensureUint8Array(buffer);
      const newBuffer = new Uint8Array(remainingData.length + newData.length);
      newBuffer.set(remainingData);
      newBuffer.set(newData, remainingData.length);
      this.setBuffer(newBuffer);
    }
  }
  hasRemaining(size) {
    return this.view.byteLength - this.pos >= size;
  }
  createExtraByteError(posToShow) {
    const { view, pos } = this;
    return new RangeError(`Extra ${view.byteLength - pos} of ${view.byteLength} byte(s) found at buffer[${posToShow}]`);
  }
  decode(buffer) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decode(buffer);
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      const object = this.doDecodeSync();
      if (this.hasRemaining(1)) {
        throw this.createExtraByteError(this.pos);
      }
      return object;
    } finally {
      this.entered = false;
    }
  }
  *decodeMulti(buffer) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMulti(buffer);
      return;
    }
    try {
      this.entered = true;
      this.reinitializeState();
      this.setBuffer(buffer);
      while (this.hasRemaining(1)) {
        yield this.doDecodeSync();
      }
    } finally {
      this.entered = false;
    }
  }
  async decodeAsync(stream) {
    if (this.entered) {
      const instance = this.clone();
      return instance.decodeAsync(stream);
    }
    try {
      this.entered = true;
      let decoded = false;
      let object;
      for await (const buffer of stream) {
        if (decoded) {
          this.entered = false;
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        try {
          object = this.doDecodeSync();
          decoded = true;
        } catch (e) {
          if (!(e instanceof RangeError)) {
            throw e;
          }
        }
        this.totalPos += this.pos;
      }
      if (decoded) {
        if (this.hasRemaining(1)) {
          throw this.createExtraByteError(this.totalPos);
        }
        return object;
      }
      const { headByte, pos, totalPos } = this;
      throw new RangeError(`Insufficient data in parsing ${prettyByte(headByte)} at ${totalPos} (${pos} in the current buffer)`);
    } finally {
      this.entered = false;
    }
  }
  decodeArrayStream(stream) {
    return this.decodeMultiAsync(stream, true);
  }
  decodeStream(stream) {
    return this.decodeMultiAsync(stream, false);
  }
  async* decodeMultiAsync(stream, isArray) {
    if (this.entered) {
      const instance = this.clone();
      yield* instance.decodeMultiAsync(stream, isArray);
      return;
    }
    try {
      this.entered = true;
      let isArrayHeaderRequired = isArray;
      let arrayItemsLeft = -1;
      for await (const buffer of stream) {
        if (isArray && arrayItemsLeft === 0) {
          throw this.createExtraByteError(this.totalPos);
        }
        this.appendBuffer(buffer);
        if (isArrayHeaderRequired) {
          arrayItemsLeft = this.readArraySize();
          isArrayHeaderRequired = false;
          this.complete();
        }
        try {
          while (true) {
            yield this.doDecodeSync();
            if (--arrayItemsLeft === 0) {
              break;
            }
          }
        } catch (e) {
          if (!(e instanceof RangeError)) {
            throw e;
          }
        }
        this.totalPos += this.pos;
      }
    } finally {
      this.entered = false;
    }
  }
  doDecodeSync() {
    DECODE:
      while (true) {
        const headByte = this.readHeadByte();
        let object;
        if (headByte >= 224) {
          object = headByte - 256;
        } else if (headByte < 192) {
          if (headByte < 128) {
            object = headByte;
          } else if (headByte < 144) {
            const size = headByte - 128;
            if (size !== 0) {
              this.pushMapState(size);
              this.complete();
              continue DECODE;
            } else {
              object = {};
            }
          } else if (headByte < 160) {
            const size = headByte - 144;
            if (size !== 0) {
              this.pushArrayState(size);
              this.complete();
              continue DECODE;
            } else {
              object = [];
            }
          } else {
            const byteLength = headByte - 160;
            object = this.decodeString(byteLength, 0);
          }
        } else if (headByte === 192) {
          object = null;
        } else if (headByte === 194) {
          object = false;
        } else if (headByte === 195) {
          object = true;
        } else if (headByte === 202) {
          object = this.readF32();
        } else if (headByte === 203) {
          object = this.readF64();
        } else if (headByte === 204) {
          object = this.readU8();
        } else if (headByte === 205) {
          object = this.readU16();
        } else if (headByte === 206) {
          object = this.readU32();
        } else if (headByte === 207) {
          if (this.useBigInt64) {
            object = this.readU64AsBigInt();
          } else {
            object = this.readU64();
          }
        } else if (headByte === 208) {
          object = this.readI8();
        } else if (headByte === 209) {
          object = this.readI16();
        } else if (headByte === 210) {
          object = this.readI32();
        } else if (headByte === 211) {
          if (this.useBigInt64) {
            object = this.readI64AsBigInt();
          } else {
            object = this.readI64();
          }
        } else if (headByte === 217) {
          const byteLength = this.lookU8();
          object = this.decodeString(byteLength, 1);
        } else if (headByte === 218) {
          const byteLength = this.lookU16();
          object = this.decodeString(byteLength, 2);
        } else if (headByte === 219) {
          const byteLength = this.lookU32();
          object = this.decodeString(byteLength, 4);
        } else if (headByte === 220) {
          const size = this.readU16();
          if (size !== 0) {
            this.pushArrayState(size);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else if (headByte === 221) {
          const size = this.readU32();
          if (size !== 0) {
            this.pushArrayState(size);
            this.complete();
            continue DECODE;
          } else {
            object = [];
          }
        } else if (headByte === 222) {
          const size = this.readU16();
          if (size !== 0) {
            this.pushMapState(size);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte === 223) {
          const size = this.readU32();
          if (size !== 0) {
            this.pushMapState(size);
            this.complete();
            continue DECODE;
          } else {
            object = {};
          }
        } else if (headByte === 196) {
          const size = this.lookU8();
          object = this.decodeBinary(size, 1);
        } else if (headByte === 197) {
          const size = this.lookU16();
          object = this.decodeBinary(size, 2);
        } else if (headByte === 198) {
          const size = this.lookU32();
          object = this.decodeBinary(size, 4);
        } else if (headByte === 212) {
          object = this.decodeExtension(1, 0);
        } else if (headByte === 213) {
          object = this.decodeExtension(2, 0);
        } else if (headByte === 214) {
          object = this.decodeExtension(4, 0);
        } else if (headByte === 215) {
          object = this.decodeExtension(8, 0);
        } else if (headByte === 216) {
          object = this.decodeExtension(16, 0);
        } else if (headByte === 199) {
          const size = this.lookU8();
          object = this.decodeExtension(size, 1);
        } else if (headByte === 200) {
          const size = this.lookU16();
          object = this.decodeExtension(size, 2);
        } else if (headByte === 201) {
          const size = this.lookU32();
          object = this.decodeExtension(size, 4);
        } else {
          throw new DecodeError(`Unrecognized type byte: ${prettyByte(headByte)}`);
        }
        this.complete();
        const stack = this.stack;
        while (stack.length > 0) {
          const state = stack.top();
          if (state.type === STATE_ARRAY) {
            state.array[state.position] = object;
            state.position++;
            if (state.position === state.size) {
              object = state.array;
              stack.release(state);
            } else {
              continue DECODE;
            }
          } else if (state.type === STATE_MAP_KEY) {
            if (object === "__proto__") {
              throw new DecodeError("The key __proto__ is not allowed");
            }
            state.key = this.mapKeyConverter(object);
            state.type = STATE_MAP_VALUE;
            continue DECODE;
          } else {
            state.map[state.key] = object;
            state.readCount++;
            if (state.readCount === state.size) {
              object = state.map;
              stack.release(state);
            } else {
              state.key = null;
              state.type = STATE_MAP_KEY;
              continue DECODE;
            }
          }
        }
        return object;
      }
  }
  readHeadByte() {
    if (this.headByte === HEAD_BYTE_REQUIRED) {
      this.headByte = this.readU8();
    }
    return this.headByte;
  }
  complete() {
    this.headByte = HEAD_BYTE_REQUIRED;
  }
  readArraySize() {
    const headByte = this.readHeadByte();
    switch (headByte) {
      case 220:
        return this.readU16();
      case 221:
        return this.readU32();
      default: {
        if (headByte < 160) {
          return headByte - 144;
        } else {
          throw new DecodeError(`Unrecognized array type byte: ${prettyByte(headByte)}`);
        }
      }
    }
  }
  pushMapState(size) {
    if (size > this.maxMapLength) {
      throw new DecodeError(`Max length exceeded: map length (${size}) > maxMapLengthLength (${this.maxMapLength})`);
    }
    this.stack.pushMapState(size);
  }
  pushArrayState(size) {
    if (size > this.maxArrayLength) {
      throw new DecodeError(`Max length exceeded: array length (${size}) > maxArrayLength (${this.maxArrayLength})`);
    }
    this.stack.pushArrayState(size);
  }
  decodeString(byteLength, headerOffset) {
    if (!this.rawStrings || this.stateIsMapKey()) {
      return this.decodeUtf8String(byteLength, headerOffset);
    }
    return this.decodeBinary(byteLength, headerOffset);
  }
  decodeUtf8String(byteLength, headerOffset) {
    if (byteLength > this.maxStrLength) {
      throw new DecodeError(`Max length exceeded: UTF-8 byte length (${byteLength}) > maxStrLength (${this.maxStrLength})`);
    }
    if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
      throw MORE_DATA;
    }
    const offset = this.pos + headerOffset;
    let object;
    if (this.stateIsMapKey() && this.keyDecoder?.canBeCached(byteLength)) {
      object = this.keyDecoder.decode(this.bytes, offset, byteLength);
    } else {
      object = utf8Decode(this.bytes, offset, byteLength);
    }
    this.pos += headerOffset + byteLength;
    return object;
  }
  stateIsMapKey() {
    if (this.stack.length > 0) {
      const state = this.stack.top();
      return state.type === STATE_MAP_KEY;
    }
    return false;
  }
  decodeBinary(byteLength, headOffset) {
    if (byteLength > this.maxBinLength) {
      throw new DecodeError(`Max length exceeded: bin length (${byteLength}) > maxBinLength (${this.maxBinLength})`);
    }
    if (!this.hasRemaining(byteLength + headOffset)) {
      throw MORE_DATA;
    }
    const offset = this.pos + headOffset;
    const object = this.bytes.subarray(offset, offset + byteLength);
    this.pos += headOffset + byteLength;
    return object;
  }
  decodeExtension(size, headOffset) {
    if (size > this.maxExtLength) {
      throw new DecodeError(`Max length exceeded: ext length (${size}) > maxExtLength (${this.maxExtLength})`);
    }
    const extType = this.view.getInt8(this.pos + headOffset);
    const data = this.decodeBinary(size, headOffset + 1);
    return this.extensionCodec.decode(data, extType, this.context);
  }
  lookU8() {
    return this.view.getUint8(this.pos);
  }
  lookU16() {
    return this.view.getUint16(this.pos);
  }
  lookU32() {
    return this.view.getUint32(this.pos);
  }
  readU8() {
    const value = this.view.getUint8(this.pos);
    this.pos++;
    return value;
  }
  readI8() {
    const value = this.view.getInt8(this.pos);
    this.pos++;
    return value;
  }
  readU16() {
    const value = this.view.getUint16(this.pos);
    this.pos += 2;
    return value;
  }
  readI16() {
    const value = this.view.getInt16(this.pos);
    this.pos += 2;
    return value;
  }
  readU32() {
    const value = this.view.getUint32(this.pos);
    this.pos += 4;
    return value;
  }
  readI32() {
    const value = this.view.getInt32(this.pos);
    this.pos += 4;
    return value;
  }
  readU64() {
    const value = getUint64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readI64() {
    const value = getInt64(this.view, this.pos);
    this.pos += 8;
    return value;
  }
  readU64AsBigInt() {
    const value = this.view.getBigUint64(this.pos);
    this.pos += 8;
    return value;
  }
  readI64AsBigInt() {
    const value = this.view.getBigInt64(this.pos);
    this.pos += 8;
    return value;
  }
  readF32() {
    const value = this.view.getFloat32(this.pos);
    this.pos += 4;
    return value;
  }
  readF64() {
    const value = this.view.getFloat64(this.pos);
    this.pos += 8;
    return value;
  }
}

// ../node_modules/@msgpack/msgpack/dist.esm/decode.mjs
function decode(buffer, options) {
  const decoder = new Decoder(options);
  return decoder.decode(buffer);
}

// ../src/core/Processor.ts
class Processor {
  outingCom = new Set;
  connectComm(comm) {
    this.outingCom.add(comm);
    return () => {
      this.outingCom.delete(comm);
    };
  }
  performCycle(context, updatedPaths) {
    consolidateUpdates(context.incomingUpdates, context.outgoingUpdates);
    this.sendOutgoingUpdate(context);
    commitUpdates(context, updatedPaths);
  }
  receivedData(data, context) {
    const payload = decode(data);
    if (!payload.updates?.length)
      return;
    context.incomingUpdates.push(...payload.updates);
  }
  sendOutgoingUpdate(context) {
    if (!context.outgoingUpdates.length)
      return;
    context.outgoingUpdates.forEach((update) => {
      update.path = this.fixPath(update.path, context);
    });
    context.outgoingUpdates.forEach((update) => {
      if (update.confirmed) {
        context.incomingUpdates.push(update);
      }
    });
    const peerSet = new Set;
    context.outgoingUpdates.forEach((update) => peerSet.add(update.peer));
    peerSet.forEach((peer) => {
      this.outingCom.forEach((comm) => {
        comm.send(encode({
          updates: context.outgoingUpdates.filter((update) => update.peer === peer)
        }), peer);
      });
    });
    context.outgoingUpdates.length = 0;
  }
  fixPath(path, context) {
    const split = path.split("/");
    return split.map((part) => translateValue(part, context.properties)).join("/");
  }
}
// ../src/cycles/data-update/data-manager.ts
var NO_OBJ = {};
function getData(root, path, properties) {
  const parts = path.split("/");
  return getLeafObject(root, parts, 0, false, properties);
}
function setData(now, outgoingUpdates, path, value, options = NO_OBJ) {
  const update = { path, value, confirmed: 0 };
  if (options.peer)
    update.peer = options.peer;
  if (options.active) {
    update.confirmed = now;
  }
  outgoingUpdates.push(update);
}
// ../src/observer/Observer.ts
class Observer {
  paths;
  observerManagger;
  multiValues;
  #partsArrays;
  #previousValues = [];
  #changeCallbacks = new Set;
  #addedElementsCallback = new Set;
  #deletedElementsCallback = new Set;
  initialized = false;
  constructor(paths, observerManagger, multiValues = false) {
    this.paths = paths;
    this.observerManagger = observerManagger;
    this.multiValues = multiValues;
    this.#partsArrays = paths.map((p) => p === undefined ? [] : p.split("/"));
    this.#previousValues = paths.map(() => {
      return;
    });
  }
  onChange(callback) {
    this.#changeCallbacks.add(callback);
    return this;
  }
  onElementsAdded(callback) {
    this.#addedElementsCallback.add(callback);
    return this;
  }
  onElementsDeleted(callback) {
    this.#deletedElementsCallback.add(callback);
    return this;
  }
  #valuesChanged(context, updates) {
    const newValues = this.paths.map((path, index) => updates?.has(path) ? updates.get(path).value : getLeafObject(context.root, this.#partsArrays[index], 0, false, context.properties));
    if (this.#previousValues.every((prev, index) => {
      const newValue = newValues[index];
      if (prev === newValue && typeof newValue !== "object") {
        return true;
      }
      if (Array.isArray(prev) && Array.isArray(newValue) && prev.length === newValue.length && prev.every((elem, idx) => elem === newValue[idx])) {
        return true;
      }
      return false;
    })) {
      return null;
    }
    return newValues;
  }
  triggerIfChanged(context, updates) {
    const newValues = !this.paths.length ? undefined : this.#valuesChanged(context, this.initialized ? updates : undefined);
    if (!newValues) {
      return;
    }
    const previousValues = this.#previousValues;
    this.#previousValues = newValues;
    this.#changeCallbacks.forEach((callback) => callback(this.multiValues ? newValues : newValues[0], this.multiValues ? previousValues : previousValues[0]));
    if (this.#addedElementsCallback && newValues.some((val) => Array.isArray(val))) {
      let hasNewElements = false;
      const newElementsArray = newValues.map((val, index) => {
        if (Array.isArray(val)) {
          const previousSet = new Set(Array.isArray(previousValues[index]) ? previousValues[index] : []);
          const newElements = val.filter((clientId) => !previousSet.has(clientId));
          if (newElements.length) {
            hasNewElements = true;
          }
          return newElements;
        }
      });
      if (hasNewElements) {
        this.#addedElementsCallback.forEach((callback) => callback(this.multiValues ? newElementsArray : newElementsArray[0]));
      }
    }
    if (this.#deletedElementsCallback && previousValues.some((val) => Array.isArray(val))) {
      let hasDeletedElements = false;
      const deletedElementsArray = previousValues.map((prev, index) => {
        if (Array.isArray(prev)) {
          const currentSet = new Set(Array.isArray(newValues[index]) ? newValues[index] : []);
          const deletedElements = prev.filter((clientId) => !currentSet.has(clientId));
          if (deletedElements.length) {
            hasDeletedElements = true;
          }
          return deletedElements;
        }
      });
      if (hasDeletedElements) {
        this.#deletedElementsCallback.forEach((callback) => callback(this.multiValues ? deletedElementsArray : deletedElementsArray[0]));
      }
    }
    this.initialized = true;
  }
  close() {
    this.observerManagger.removeObserver(this);
  }
}
// ../src/observer/ObserverManager.ts
class ObserverManager {
  observers = new Map;
  ensurePath(path) {
    const obsSet = this.observers.get(path);
    if (obsSet) {
      return obsSet;
    }
    const observerSet = new Set;
    this.observers.set(path, observerSet);
    return observerSet;
  }
  observe(paths, multi) {
    const observer = new Observer(paths, this, multi);
    paths.forEach((path) => {
      const obsSet = this.ensurePath(path);
      obsSet.add(observer);
    });
    return observer;
  }
  #tempObsTriggered = new Set;
  triggerObservers(context, updates) {
    updates.keys().forEach((path) => {
      this.observers.get(path)?.forEach((observer) => this.#tempObsTriggered.add(observer));
    });
    this.#tempObsTriggered.forEach((o) => o.triggerIfChanged(context, updates));
    this.#tempObsTriggered.clear();
  }
  removeObserver(observer) {
    observer.paths.forEach((path) => {
      const obsSet = this.observers.get(path);
      obsSet?.delete(observer);
      if (!obsSet?.size) {
        this.observers.delete(path);
      }
    });
  }
  close() {
    this.observers.forEach((obsSet) => obsSet.forEach((o) => o.close()));
    this.observers.clear();
  }
}
// ../src/clients/CommInterfaceHook.ts
function deepShareData(context, obj, peerProps, pathParts = [], now = Date.now()) {
  const shouldGoDeeper = typeof obj === "object" && obj && !(obj instanceof ArrayBuffer) && Object.values(obj).length;
  if (shouldGoDeeper) {
    for (let key in obj) {
      const value = Array.isArray(obj) ? obj[Number(key)] : obj[key];
      deepShareData(context, value, peerProps, [...pathParts, key], now);
    }
  } else {
    setData(now, context.outgoingUpdates, pathParts.join("/"), obj, peerProps);
  }
}
function hookCommInterface(context, comm, processor) {
  const removeOnMessage = comm.onMessage((buffer) => {
    processor.receivedData(buffer, context);
    context.onReceivedIncomingUpdates?.();
  });
  const removeOnNewClient = comm.onNewClient((peer) => {
    deepShareData(context, context.root, { active: true, peer });
  });
  const disconnectComm = processor.connectComm(comm);
  return {
    disconnect: () => {
      removeOnMessage();
      removeOnNewClient();
      disconnectComm();
    }
  };
}

// ../src/attachments/comm/CommAux.ts
class CommAux {
  comm;
  context;
  processor = new Processor;
  disconnect;
  constructor(comm, context) {
    this.comm = comm;
    this.context = context;
    const { disconnect } = hookCommInterface(context, this.comm, this.processor);
    this.disconnect = disconnect;
  }
  _updates = new Map;
  performCycle() {
    this._updates.clear();
    this.processor.performCycle(this.context, this._updates);
    if (this._updates.size) {
      return this._updates;
    }
  }
}

// ../src/core/Program.ts
class Program {
  appId;
  userId;
  root;
  incomingUpdates = [];
  outgoingUpdates = [];
  properties;
  commAux;
  observerManager = new ObserverManager;
  constructor({
    appId,
    userId,
    root,
    properties,
    onDataCycle,
    comm,
    onReceivedIncomingUpdates
  }) {
    this.appId = appId;
    this.userId = userId;
    this.root = root ?? {};
    this.properties = properties ?? {};
    this.properties.self = userId;
    this.onDataCycle = onDataCycle;
    this.commAux = new CommAux(comm, this);
    this.onReceivedIncomingUpdates = onReceivedIncomingUpdates;
  }
  performCycle() {
    const updates = this.commAux.performCycle();
    if (updates) {
      this.observerManager.triggerObservers(this, updates);
      this.onDataCycle?.();
    }
  }
  observe(paths) {
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    return this.observerManager.observe(pathArray, multi);
  }
  static ACTIVE = { active: true };
  setData(path, value) {
    setData(Date.now(), this.outgoingUpdates, path, value, Program.ACTIVE);
  }
  getData(path) {
    return getData(this.root, path, this.properties);
  }
  close() {
    this.commAux.disconnect();
  }
}
// ../src/app/utils/data-ring.ts
class DataRingWriter {
  data;
  offset = 0;
  cap;
  enc = new TextEncoder;
  scratch = new Uint8Array(64);
  floatScratch = new Uint8Array(8);
  floatDV = new DataView(this.floatScratch.buffer);
  intScratch = new Uint8Array(4);
  intDV = new DataView(this.intScratch.buffer);
  constructor(data) {
    this.data = data;
    this.cap = data.length;
    if (this.cap <= 0)
      throw new Error("DataRing: data length must be > 0");
  }
  at(offset) {
    this.offset = (offset % this.cap + this.cap) % this.cap;
    return this;
  }
  advance(n) {
    const x = this.offset + n;
    this.offset = x >= this.cap ? x % this.cap : x;
  }
  writeU8(v) {
    this.data[this.offset] = v & 255;
    this.advance(1);
  }
  writeRawBytes(src) {
    const n = src.length;
    if (n === 0)
      return;
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
    this.offset = second;
  }
  writeByte(byte) {
    this.writeU8(byte);
  }
  writeBooleans(...bools) {
    let bits = 0;
    for (let i = 0;i < bools.length; i++) {
      const index = i % 8;
      if (i && index === 0) {
        this.writeByte(bits);
        bits = 0;
      }
      bits |= bools[i] ? 1 << index : 0;
    }
    this.writeByte(bits);
  }
  writeBytes(bytes) {
    if (bytes.length > 255) {
      throw new Error(`writeBytes: length ${bytes.length} > 255 (u8 length prefix)`);
    }
    this.writeU8(bytes.length);
    this.writeRawBytes(bytes);
  }
  writeString(str) {
    const needed = Math.min(255, str.length * 4);
    if (this.scratch.length < needed) {
      this.scratch = new Uint8Array(Math.max(needed, this.scratch.length * 2));
    }
    const { written, read } = this.enc.encodeInto(str, this.scratch);
    if (read < str.length || written > 255) {
      const bytes = this.enc.encode(str);
      if (bytes.length > 255)
        throw new Error(`writeString: encoded length ${bytes.length} > 255`);
      this.writeBytes(bytes);
      return;
    }
    this.writeBytes(this.scratch.subarray(0, written));
  }
  clampInt16(v) {
    if (v > 32767)
      return 32767;
    if (v < -32768)
      return -32768;
    return v | 0;
  }
  writeInt16(v) {
    this.floatDV.setInt16(0, this.clampInt16(v), true);
    this.writeRawBytes(this.floatScratch.subarray(0, 2));
  }
  writeInt32(v) {
    this.floatDV.setInt32(0, v | 0, true);
    this.writeRawBytes(this.floatScratch.subarray(0, 4));
  }
  writeFloat64(num) {
    this.floatDV.setFloat64(0, num, true);
    this.writeRawBytes(this.floatScratch);
  }
}

class DataRingReader {
  data;
  offset = 0;
  cap;
  dec = new TextDecoder;
  scratch = new Uint8Array(64);
  floatScratch = new Uint8Array(8);
  floatDV = new DataView(this.floatScratch.buffer);
  boolScratch = [];
  constructor(data) {
    this.data = data;
    this.cap = data.length;
    if (this.cap <= 0)
      throw new Error("DataRing: data length must be > 0");
  }
  at(offset) {
    this.offset = (offset % this.cap + this.cap) % this.cap;
    return this;
  }
  advance(n) {
    const x = this.offset + n;
    this.offset = x >= this.cap ? x % this.cap : x;
  }
  readU8() {
    const v = this.data[this.offset];
    this.advance(1);
    return v;
  }
  readRawBytes(n) {
    if (n <= 0)
      return this.data.subarray(0, 0);
    const end = this.offset + n;
    if (end <= this.cap) {
      const view = this.data.subarray(this.offset, end);
      this.offset = end === this.cap ? 0 : end;
      return view;
    }
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
  readByte() {
    return this.readU8();
  }
  readBytes() {
    const len = this.readU8();
    return this.readRawBytes(len);
  }
  readString() {
    const bytes = this.readBytes();
    const needsCopy = bytes.buffer instanceof SharedArrayBuffer;
    if (needsCopy) {
      if (this.scratch.length < bytes.length) {
        this.scratch = new Uint8Array(Math.max(bytes.length, this.scratch.length * 2));
      }
      this.scratch.set(bytes, 0);
      return this.dec.decode(this.scratch.subarray(0, bytes.length));
    }
    return this.dec.decode(bytes);
  }
  readInt16() {
    const b = this.readRawBytes(2);
    if (b.byteLength !== 2)
      throw new Error("readInt16: expected 2 bytes");
    this.floatScratch[0] = b[0];
    this.floatScratch[1] = b[1];
    return this.floatDV.getInt16(0, true);
  }
  readInt32() {
    const b = this.readRawBytes(4);
    if (b.byteLength !== 4)
      throw new Error("readInt32: expected 4 bytes");
    this.floatScratch.set(b.subarray(0, 4), 0);
    return this.floatDV.getInt32(0, true);
  }
  readFloat64() {
    const b = this.readRawBytes(8);
    if (b.byteLength !== 8)
      throw new Error("readFloat64: expected 8 bytes");
    this.floatScratch.set(b);
    return this.floatDV.getFloat64(0, true);
  }
  readBooleans(count) {
    const bools = this.boolScratch;
    bools.length = 0;
    let bits = 0;
    do {
      const index = bools.length % 8;
      if (index === 0) {
        bits = this.readByte();
      }
      bools.push((bits & 1 << index) !== 0);
    } while (bools.length < count);
    return bools;
  }
}

// ../src/app/utils/loop.ts
function processLoop(ctrl, callback) {
  let lastWrite = Atomics.load(ctrl, WRITE);
  async function tick() {
    const result = Atomics.waitAsync(ctrl, WRITE, lastWrite, 16);
    await result.value;
    const writeNow = Atomics.load(ctrl, WRITE);
    if (writeNow === lastWrite)
      return;
    lastWrite = writeNow;
    callback();
  }
  let looping = true;
  async function start() {
    while (looping) {
      await tick();
    }
  }
  start();
  return () => {
    looping = false;
  };
}

// ../src/app/MessageType.ts
var MessageType;
((MessageType2) => {
  MessageType2[MessageType2["KEY_DOWN"] = 0] = "KEY_DOWN";
  MessageType2[MessageType2["KEY_UP"] = 1] = "KEY_UP";
  MessageType2[MessageType2["ON_USER_UPDATE"] = 2] = "ON_USER_UPDATE";
  MessageType2[MessageType2["ON_MESSAGE"] = 3] = "ON_MESSAGE";
  MessageType2[MessageType2["MOUSE_MOVE"] = 4] = "MOUSE_MOVE";
  MessageType2[MessageType2["MOUSE_DOWN"] = 5] = "MOUSE_DOWN";
  MessageType2[MessageType2["MOUSE_UP"] = 6] = "MOUSE_UP";
  MessageType2[MessageType2["WHEEL"] = 7] = "WHEEL";
  MessageType2[MessageType2["POINTER_LOCK"] = 8] = "POINTER_LOCK";
  MessageType2[MessageType2["PING"] = 9] = "PING";
  MessageType2[MessageType2["LINE"] = 10] = "LINE";
})(MessageType ||= {});

// ../src/app/utils/serializers.ts
function hookSerializers() {
  const keySerializer = {
    serialize: (_type, msg, data) => {
      data.writeString(msg.key);
      data.writeBooleans(msg.altKey, msg.ctrlKey, msg.metaKey, msg.shiftKey, msg.repeat);
    },
    deserialize: (data, type) => {
      const key = data.readString();
      const [altKey, ctrlKey, metaKey, shiftKey, repeat] = data.readBooleans(5);
      return {
        type,
        key,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
        repeat
      };
    }
  };
  const mouseSerializer = {
    serialize(type, msg, data) {
      data.writeInt16(msg.movementX);
      data.writeInt16(msg.movementY);
      data.writeBooleans(msg.altKey, msg.ctrlKey, msg.metaKey, msg.shiftKey);
      data.writeByte(msg.buttons);
      data.writeInt16(msg.clientX);
      data.writeInt16(msg.clientY);
      if (type !== 4 /* MOUSE_MOVE */) {
        data.writeByte(msg.button);
      }
    },
    deserialize(data, type) {
      const movementX = data.readInt16();
      const movementY = data.readInt16();
      const [altKey, ctrlKey, metaKey, shiftKey] = data.readBooleans(4);
      const buttons = data.readByte();
      const clientX = data.readInt16();
      const clientY = data.readInt16();
      const button = type !== 4 /* MOUSE_MOVE */ ? data.readByte() : -1;
      return {
        type,
        movementX,
        movementY,
        clientX,
        clientY,
        button,
        buttons,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey
      };
    }
  };
  const serializers = [
    [0 /* KEY_DOWN */, keySerializer],
    [1 /* KEY_UP */, keySerializer],
    [
      9 /* PING */,
      {
        serialize(_type, msg, data) {
          data.writeFloat64(msg.now);
        },
        deserialize(data) {
          const now = data.readFloat64();
          return { type: 9 /* PING */, now };
        }
      }
    ],
    [
      2 /* ON_USER_UPDATE */,
      {
        serialize(_type, msg, data) {
          data.writeString(msg.user);
          data.writeByte(msg.action === "join" ? 1 : 0);
          for (const user of msg.users) {
            data.writeString(user);
          }
          data.writeString("");
        },
        deserialize(data) {
          const user = data.readString();
          const action = data.readByte() === 1 ? "join" : "leave";
          const users = [];
          do {
            const usr = data.readString();
            users.push(usr);
          } while (users[users.length - 1].length);
          users.pop();
          return {
            type: 2 /* ON_USER_UPDATE */,
            user,
            action,
            users
          };
        }
      }
    ],
    [5 /* MOUSE_DOWN */, mouseSerializer],
    [6 /* MOUSE_UP */, mouseSerializer],
    [4 /* MOUSE_MOVE */, mouseSerializer],
    [
      7 /* WHEEL */,
      {
        serialize(_type, msg, data) {
          data.writeInt16(msg.deltaX * 256);
          data.writeInt16(msg.deltaY * 256);
          data.writeInt16(msg.deltaZ * 256);
          data.writeByte(msg.deltaMode);
          data.writeBooleans(msg.altKey, msg.ctrlKey, msg.metaKey, msg.shiftKey);
        },
        deserialize(data, type) {
          const deltaX = data.readInt16() / 256;
          const deltaY = data.readInt16() / 256;
          const deltaZ = data.readInt16() / 256;
          const deltaMode = data.readByte();
          const [altKey, ctrlKey, metaKey, shiftKey] = data.readBooleans(4);
          return {
            type,
            deltaX,
            deltaY,
            deltaZ,
            deltaMode,
            altKey,
            ctrlKey,
            metaKey,
            shiftKey
          };
        }
      }
    ],
    [
      8 /* POINTER_LOCK */,
      {
        serialize(_type, msg, data) {
          data.writeBooleans(msg.enter);
        },
        deserialize(data, type) {
          const [enter] = data.readBooleans(1);
          return { type, enter };
        }
      }
    ],
    [
      10 /* LINE */,
      {
        serialize(_type, msg, data) {
          data.writeInt16(msg.from.x);
          data.writeInt16(msg.from.y);
          data.writeInt16(msg.to.x);
          data.writeInt16(msg.to.y);
          data.writeString(msg.color);
          data.writeByte(msg.lineWidth);
        },
        deserialize(data, type) {
          const from = {
            x: data.readInt16(),
            y: data.readInt16()
          };
          const to = {
            x: data.readInt16(),
            y: data.readInt16()
          };
          const color = data.readString();
          const lineWidth = data.readByte();
          return {
            type,
            from,
            to,
            color,
            lineWidth
          };
        }
      }
    ]
  ];
  const serializerMap = new Map(serializers);
  function serialize(type, message, data) {
    const serializer = serializerMap.get(type);
    if (!serializer) {
      return 0;
    }
    data.writeByte(type);
    serializer.serialize(type, message, data);
  }
  function deserialize(data) {
    const type = data.readByte();
    return serializerMap.get(type)?.deserialize(data, type);
  }
  return {
    serialize,
    deserialize
  };
}

// ../src/app/utils/listener.ts
function hookMsgListener() {
  const { deserialize } = hookSerializers();
  function listen(ctrl, data, onMessage) {
    const stop = processLoop(ctrl, () => {
      const msg = drain(ctrl, data);
      if (msg) {
        onMessage(msg);
      }
    });
    return () => {
      stop();
    };
  }
  function drain(ctrl, data) {
    const r = Atomics.load(ctrl, READ2);
    const w = Atomics.load(ctrl, WRITE);
    if (r === w) {
      return;
    }
    const msg = deserialize(data);
    if (r !== data.offset) {
      Atomics.store(ctrl, READ2, data.offset);
    }
    return msg;
  }
  return { listen };
}

// ../src/app/core/messenger.ts
var WRITE = 0;
var READ2 = 1;
function hookMessenger(ctrl, data) {
  const { serialize } = hookSerializers();
  function sendMessage(type, msg) {
    const w0 = Atomics.load(ctrl, WRITE);
    serialize(type, msg, data);
    if (w0 !== data.offset) {
      Atomics.store(ctrl, WRITE, data.offset);
      Atomics.notify(ctrl, WRITE);
    }
  }
  return {
    sendMessage
  };
}

// ../src/worker/CommInterface.worker.ts
function initialize() {
  let sendMessage;
  let canvas;
  let cursor = {
    x: 0,
    y: 0,
    needsReset: true
  };
  function generateRandomHexColor() {
    let randomNum = Math.floor(Math.random() * 16777215);
    let hexColor = randomNum.toString(16);
    let fullHexColor = hexColor.padStart(6, "0");
    return `#${fullHexColor.toUpperCase()}`;
  }
  const { listen } = hookMsgListener();
  self.addEventListener("message", (e) => {
    const msg = e.data;
    if (msg.sabToWorker) {
      const sab = msg.sabToWorker;
      const ctrl = new Int32Array(sab, 0, 8);
      const data = new DataRingReader(new Uint8Array(sab, 32));
      listen(ctrl, data, (msg2) => {
        console.log({
          ...msg2,
          type: MessageType[msg2.type]
        });
        if (msg2.type === 8 /* POINTER_LOCK */) {
          cursor.needsReset = true;
        }
        if (msg2.type === 4 /* MOUSE_MOVE */) {
          if (cursor.needsReset) {
            cursor.x = msg2.clientX * 2;
            cursor.y = msg2.clientY * 2;
            cursor.needsReset = false;
          }
          const ctx = canvas?.getContext("2d");
          if (ctx) {
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(cursor.x, cursor.y);
            const from = { x: cursor.x, y: cursor.y };
            cursor.x += msg2.movementX;
            cursor.y += msg2.movementY;
            cursor.x = Math.max(0, Math.min(ctx.canvas.width, cursor.x));
            cursor.y = Math.max(0, Math.min(ctx.canvas.height, cursor.y));
            ctx.strokeStyle = generateRandomHexColor();
            ctx.lineTo(cursor.x, cursor.y);
            ctx.stroke();
            sendMessage(10 /* LINE */, {
              from,
              to: { x: cursor.x, y: cursor.y },
              color: ctx.strokeStyle,
              lineWidth: ctx.lineWidth
            });
          }
        }
        if (msg2.type === 9 /* PING */) {
          sendMessage(9 /* PING */, { now: msg2.now });
        }
      });
    }
    if (msg.sabFromWorker) {
      const sab = msg.sabFromWorker;
      const ctrl = new Int32Array(sab, 0, 8);
      const data = new DataRingWriter(new Uint8Array(sab, 32));
      const result = hookMessenger(ctrl, data);
      sendMessage = result.sendMessage;
    }
    if (msg.canvas) {
      canvas = msg.canvas;
      const { width, height, dpr } = msg;
      if (width && height) {
        canvas.width = width * (dpr ?? 1);
        canvas.height = height * (dpr ?? 1);
      }
    }
    if (msg.type === "resize") {
      if (canvas) {
        const dpr = msg.dpr ?? 1;
        canvas.width = msg.width * dpr;
        canvas.height = msg.height * dpr;
        return;
      }
    }
  });
}
// src/worker-room/app.worker.ts
initialize();

//# debugId=81E7142983261FB664756E2164756E21
//# sourceMappingURL=app.worker.js.map

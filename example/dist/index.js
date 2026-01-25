var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// ../node_modules/lodash/lodash.js
var require_lodash = __commonJS((exports, module) => {
  (function() {
    var undefined2;
    var VERSION = "4.17.21";
    var LARGE_ARRAY_SIZE = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
      ["ary", WRAP_ARY_FLAG],
      ["bind", WRAP_BIND_FLAG],
      ["bindKey", WRAP_BIND_KEY_FLAG],
      ["curry", WRAP_CURRY_FLAG],
      ["curryRight", WRAP_CURRY_RIGHT_FLAG],
      ["flip", WRAP_FLIP_FLAG],
      ["partial", WRAP_PARTIAL_FLAG],
      ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
      ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
    var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([
      rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
      rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
      rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
      rsUpper + "+" + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var deburredLetters = {
      "À": "A",
      "Á": "A",
      "Â": "A",
      "Ã": "A",
      "Ä": "A",
      "Å": "A",
      "à": "a",
      "á": "a",
      "â": "a",
      "ã": "a",
      "ä": "a",
      "å": "a",
      "Ç": "C",
      "ç": "c",
      "Ð": "D",
      "ð": "d",
      "È": "E",
      "É": "E",
      "Ê": "E",
      "Ë": "E",
      "è": "e",
      "é": "e",
      "ê": "e",
      "ë": "e",
      "Ì": "I",
      "Í": "I",
      "Î": "I",
      "Ï": "I",
      "ì": "i",
      "í": "i",
      "î": "i",
      "ï": "i",
      "Ñ": "N",
      "ñ": "n",
      "Ò": "O",
      "Ó": "O",
      "Ô": "O",
      "Õ": "O",
      "Ö": "O",
      "Ø": "O",
      "ò": "o",
      "ó": "o",
      "ô": "o",
      "õ": "o",
      "ö": "o",
      "ø": "o",
      "Ù": "U",
      "Ú": "U",
      "Û": "U",
      "Ü": "U",
      "ù": "u",
      "ú": "u",
      "û": "u",
      "ü": "u",
      "Ý": "Y",
      "ý": "y",
      "ÿ": "y",
      "Æ": "Ae",
      "æ": "ae",
      "Þ": "Th",
      "þ": "th",
      "ß": "ss",
      "Ā": "A",
      "Ă": "A",
      "Ą": "A",
      "ā": "a",
      "ă": "a",
      "ą": "a",
      "Ć": "C",
      "Ĉ": "C",
      "Ċ": "C",
      "Č": "C",
      "ć": "c",
      "ĉ": "c",
      "ċ": "c",
      "č": "c",
      "Ď": "D",
      "Đ": "D",
      "ď": "d",
      "đ": "d",
      "Ē": "E",
      "Ĕ": "E",
      "Ė": "E",
      "Ę": "E",
      "Ě": "E",
      "ē": "e",
      "ĕ": "e",
      "ė": "e",
      "ę": "e",
      "ě": "e",
      "Ĝ": "G",
      "Ğ": "G",
      "Ġ": "G",
      "Ģ": "G",
      "ĝ": "g",
      "ğ": "g",
      "ġ": "g",
      "ģ": "g",
      "Ĥ": "H",
      "Ħ": "H",
      "ĥ": "h",
      "ħ": "h",
      "Ĩ": "I",
      "Ī": "I",
      "Ĭ": "I",
      "Į": "I",
      "İ": "I",
      "ĩ": "i",
      "ī": "i",
      "ĭ": "i",
      "į": "i",
      "ı": "i",
      "Ĵ": "J",
      "ĵ": "j",
      "Ķ": "K",
      "ķ": "k",
      "ĸ": "k",
      "Ĺ": "L",
      "Ļ": "L",
      "Ľ": "L",
      "Ŀ": "L",
      "Ł": "L",
      "ĺ": "l",
      "ļ": "l",
      "ľ": "l",
      "ŀ": "l",
      "ł": "l",
      "Ń": "N",
      "Ņ": "N",
      "Ň": "N",
      "Ŋ": "N",
      "ń": "n",
      "ņ": "n",
      "ň": "n",
      "ŋ": "n",
      "Ō": "O",
      "Ŏ": "O",
      "Ő": "O",
      "ō": "o",
      "ŏ": "o",
      "ő": "o",
      "Ŕ": "R",
      "Ŗ": "R",
      "Ř": "R",
      "ŕ": "r",
      "ŗ": "r",
      "ř": "r",
      "Ś": "S",
      "Ŝ": "S",
      "Ş": "S",
      "Š": "S",
      "ś": "s",
      "ŝ": "s",
      "ş": "s",
      "š": "s",
      "Ţ": "T",
      "Ť": "T",
      "Ŧ": "T",
      "ţ": "t",
      "ť": "t",
      "ŧ": "t",
      "Ũ": "U",
      "Ū": "U",
      "Ŭ": "U",
      "Ů": "U",
      "Ű": "U",
      "Ų": "U",
      "ũ": "u",
      "ū": "u",
      "ŭ": "u",
      "ů": "u",
      "ű": "u",
      "ų": "u",
      "Ŵ": "W",
      "ŵ": "w",
      "Ŷ": "Y",
      "ŷ": "y",
      "Ÿ": "Y",
      "Ź": "Z",
      "Ż": "Z",
      "Ž": "Z",
      "ź": "z",
      "ż": "z",
      "ž": "z",
      "Ĳ": "IJ",
      "ĳ": "ij",
      "Œ": "Oe",
      "œ": "oe",
      "ŉ": "'n",
      "ſ": "s"
    };
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var htmlUnescapes = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };
    var stringEscapes = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {}
    }();
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;
      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEvery(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    var asciiSize = baseProperty("length");
    function asciiToArray(string) {
      return string.split("");
    }
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function(value, key, collection2) {
        if (predicate(value, key, collection2)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? baseSum(array, iteratee) / length : NAN;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined2 : object[key];
      };
    }
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined2 : object[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
      });
      return accumulator;
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseSum(array, iteratee) {
      var result, index = -1, length = array.length;
      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined2) {
          result = result === undefined2 ? current : result + current;
        }
      }
      return result;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseToPairs(object, props) {
      return arrayMap(props, function(key) {
        return [key, object[key]];
      });
    }
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }
    function countHolders(array, placeholder) {
      var length = array.length, result = 0;
      while (length--) {
        if (array[length] === placeholder) {
          ++result;
        }
      }
      return result;
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function escapeStringChar(chr) {
      return "\\" + stringEscapes[chr];
    }
    function getValue(object, key) {
      return object == null ? undefined2 : object[key];
    }
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    function iteratorToArray(iterator) {
      var data, result = [];
      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function replaceHolders(array, placeholder) {
      var index = -1, length = array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    function setToPairs(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {}
      return index;
    }
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    var runInContext = function runInContext(context) {
      context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
      var { Array: Array2, Date: Date2, Error: Error2, Function: Function2, Math: Math2, Object: Object2, RegExp: RegExp2, String: String2, TypeError: TypeError2 } = context;
      var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
      var coreJsData = context["__core-js_shared__"];
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var idCounter = 0;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object2);
      var oldDash = root._;
      var reIsNative = RegExp2("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Buffer = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
      var defineProperty = function() {
        try {
          var func = getNative(Object2, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {}
      }();
      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
      var { ceil: nativeCeil, floor: nativeFloor } = Math2, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
      var DataView2 = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
      var metaMap = WeakMap2 && new WeakMap2;
      var realNames = {};
      var dataViewCtorString = toSource(DataView2), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
      var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
      function lodash(value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty.call(value, "__wrapped__")) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = function() {
        function object() {}
        return function(proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result2 = new object;
          object.prototype = undefined2;
          return result2;
        };
      }();
      function baseLodash() {}
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined2;
      }
      lodash.templateSettings = {
        escape: reEscape,
        evaluate: reEvaluate,
        interpolate: reInterpolate,
        variable: "",
        imports: {
          _: lodash
        }
      };
      lodash.prototype = baseLodash.prototype;
      lodash.prototype.constructor = lodash;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result2 = new LazyWrapper(this.__wrapped__);
        result2.__actions__ = copyArray(this.__actions__);
        result2.__dir__ = this.__dir__;
        result2.__filtered__ = this.__filtered__;
        result2.__iteratees__ = copyArray(this.__iteratees__);
        result2.__takeCount__ = this.__takeCount__;
        result2.__views__ = copyArray(this.__views__);
        return result2;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result2 = new LazyWrapper(this);
          result2.__dir__ = -1;
          result2.__filtered__ = true;
        } else {
          result2 = this.clone();
          result2.__dir__ *= -1;
        }
        return result2;
      }
      function lazyValue() {
        var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length && takeCount == length) {
          return baseWrapperValue(array, this.__actions__);
        }
        var result2 = [];
        outer:
          while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1, value = array[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result2[resIndex++] = value;
          }
        return result2;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result2 = this.has(key) && delete this.__data__[key];
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result2 = data[key];
          return result2 === HASH_UNDEFINED ? undefined2 : result2;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined2;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? undefined2 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          hash: new Hash,
          map: new (Map2 || ListCache),
          string: new Hash
        };
      }
      function mapCacheDelete(key) {
        var result2 = getMapData(this, key)["delete"](key);
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values2) {
        var index = -1, length = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache;
        while (++index < length) {
          this.add(values2[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      function stackClear() {
        this.__data__ = new ListCache;
        this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__, result2 = data["delete"](key);
        this.size = data.size;
        return result2;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined2;
      }
      function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
      }
      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }
      function assignMergeValue(object, key, value) {
        if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseAggregator(collection, setter, iteratee2, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee2(value), collection2);
        });
        return accumulator;
      }
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        } else {
          object[key] = value;
        }
      }
      function baseAt(object, paths) {
        var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
        while (++index < length) {
          result2[index] = skip ? undefined2 : get(object, paths[index]);
        }
        return result2;
      }
      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined2) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined2) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
      }
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result2 = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result2 !== undefined2) {
          return result2;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result2 = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result2);
          }
        } else {
          var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result2 = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result2 = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack);
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result2);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? undefined2 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result2;
      }
      function baseConforms(source) {
        var props = keys(source);
        return function(object) {
          return baseConformsTo(object, source, props);
        };
      }
      function baseConformsTo(object, source, props) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (length--) {
          var key = props[length], predicate = source[key], value = object[key];
          if (value === undefined2 && !(key in object) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return setTimeout2(function() {
          func.apply(undefined2, args);
        }, wait);
      }
      function baseDifference(array, values2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
        if (!length) {
          return result2;
        }
        if (iteratee2) {
          values2 = arrayMap(values2, baseUnary(iteratee2));
        }
        if (comparator) {
          includes2 = arrayIncludesWith;
          isCommon = false;
        } else if (values2.length >= LARGE_ARRAY_SIZE) {
          includes2 = cacheHas;
          isCommon = false;
          values2 = new SetCache(values2);
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values2[valuesIndex] === computed) {
                  continue outer;
                }
              }
              result2.push(value);
            } else if (!includes2(values2, computed, comparator)) {
              result2.push(value);
            }
          }
        return result2;
      }
      var baseEach = createBaseEach(baseForOwn);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result2 = true;
        baseEach(collection, function(value, index, collection2) {
          result2 = !!predicate(value, index, collection2);
          return result2;
        });
        return result2;
      }
      function baseExtremum(array, iteratee2, comparator) {
        var index = -1, length = array.length;
        while (++index < length) {
          var value = array[index], current = iteratee2(value);
          if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
            var computed = current, result2 = value;
          }
        }
        return result2;
      }
      function baseFill(array, value, start, end) {
        var length = array.length;
        start = toInteger(start);
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end === undefined2 || end > length ? length : toInteger(end);
        if (end < 0) {
          end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array[start++] = value;
        }
        return array;
      }
      function baseFilter(collection, predicate) {
        var result2 = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result2.push(value);
          }
        });
        return result2;
      }
      function baseFlatten(array, depth, predicate, isStrict, result2) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result2 || (result2 = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result2);
            } else {
              arrayPush(result2, value);
            }
          } else if (!isStrict) {
            result2[result2.length] = value;
          }
        }
        return result2;
      }
      var baseFor = createBaseFor();
      var baseForRight = createBaseFor(true);
      function baseForOwn(object, iteratee2) {
        return object && baseFor(object, iteratee2, keys);
      }
      function baseForOwnRight(object, iteratee2) {
        return object && baseForRight(object, iteratee2, keys);
      }
      function baseFunctions(object, props) {
        return arrayFilter(props, function(key) {
          return isFunction(object[key]);
        });
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : undefined2;
      }
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result2 = keysFunc(object);
        return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined2 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }
      function baseHasIn(object, key) {
        return object != null && key in Object2(object);
      }
      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee2, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee2) {
            array = arrayMap(array, baseUnary(iteratee2));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
        }
        array = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length && result2.length < maxLength) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache = caches[othIndex];
                if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseInverter(object, setter, iteratee2, accumulator) {
        baseForOwn(object, function(value, key, object2) {
          setter(accumulator, iteratee2(value), key, object2);
        });
        return accumulator;
      }
      function baseInvoke(object, path, args) {
        path = castPath(path, object);
        object = parent(object, path);
        var func = object == null ? object : object[toKey(last(path))];
        return func == null ? undefined2 : apply(func, object, args);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }
      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack);
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack);
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack);
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined2 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack;
            if (customizer) {
              var result2 = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result2 = [];
        for (var key in Object2(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result2 = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee2) {
        var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result2[++index] = iteratee2(value, key, collection2);
        });
        return result2;
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack || (stack = new Stack);
          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
            if (newValue === undefined2) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
        var isCommon = newValue === undefined2;
        if (isCommon) {
          var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      function baseNth(array, n) {
        var length = array.length;
        if (!length) {
          return;
        }
        n += n < 0 ? length : 0;
        return isIndex(n, length) ? array[n] : undefined2;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function(iteratee2) {
            if (isArray(iteratee2)) {
              return function(value) {
                return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
              };
            }
            return iteratee2;
          });
        } else {
          iteratees = [identity];
        }
        var index = -1;
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        var result2 = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap(iteratees, function(iteratee2) {
            return iteratee2(value);
          });
          return { criteria, index: ++index, value };
        });
        return baseSortBy(result2, function(object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      function basePick(object, paths) {
        return basePickBy(object, paths, function(value, path) {
          return hasIn(object, path);
        });
      }
      function basePickBy(object, paths, predicate) {
        var index = -1, length = paths.length, result2 = {};
        while (++index < length) {
          var path = paths[index], value = baseGet(object, path);
          if (predicate(value, path)) {
            baseSet(result2, castPath(path, object), value);
          }
        }
        return result2;
      }
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      function basePullAll(array, values2, iteratee2, comparator) {
        var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
        if (array === values2) {
          values2 = copyArray(values2);
        }
        if (iteratee2) {
          seen = arrayMap(array, baseUnary(iteratee2));
        }
        while (++index < length) {
          var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
          while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
              splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
          }
        }
        return array;
      }
      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0, lastIndex = length - 1;
        while (length--) {
          var index = indexes[length];
          if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }
        return array;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
        while (length--) {
          result2[fromRight ? length : ++index] = start;
          start += step;
        }
        return result2;
      }
      function baseRepeat(string, n) {
        var result2 = "";
        if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
          return result2;
        }
        do {
          if (n % 2) {
            result2 += string;
          }
          n = nativeFloor(n / 2);
          if (n) {
            string += string;
          }
        } while (n);
        return result2;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n, 0, array.length));
      }
      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }
        path = castPath(path, object);
        var index = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index < length) {
          var key = toKey(path[index]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined2;
            if (newValue === undefined2) {
              newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      var baseSetData = !metaMap ? identity : function(func, data) {
        metaMap.set(func, data);
        return func;
      };
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          configurable: true,
          enumerable: false,
          value: constant(string),
          writable: true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result2 = Array2(length);
        while (++index < length) {
          result2[index] = array[index + start];
        }
        return result2;
      }
      function baseSome(collection, predicate) {
        var result2;
        baseEach(collection, function(value, index, collection2) {
          result2 = predicate(value, index, collection2);
          return !result2;
        });
        return !!result2;
      }
      function baseSortedIndex(array, value, retHighest) {
        var low = 0, high = array == null ? low : array.length;
        if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1, computed = array[mid];
            if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array, value, identity, retHighest);
      }
      function baseSortedIndexBy(array, value, iteratee2, retHighest) {
        var low = 0, high = array == null ? 0 : array.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee2(value);
        var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array, iteratee2) {
        var index = -1, length = array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
          if (!index || !eq(computed, seen)) {
            var seen = computed;
            result2[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result2;
      }
      function baseToNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function baseUniq(array, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set2 = iteratee2 ? null : createSet(array);
          if (set2) {
            return setToArray(set2);
          }
          isCommon = false;
          includes2 = cacheHas;
          seen = new SetCache;
        } else {
          seen = iteratee2 ? [] : result2;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee2) {
                seen.push(computed);
              }
              result2.push(value);
            } else if (!includes2(seen, computed, comparator)) {
              if (seen !== result2) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseUnset(object, path) {
        path = castPath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
      }
      function baseUpdate(object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
      }
      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length, index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
      }
      function baseWrapperValue(value, actions) {
        var result2 = value;
        if (result2 instanceof LazyWrapper) {
          result2 = result2.value();
        }
        return arrayReduce(actions, function(result3, action) {
          return action.func.apply(action.thisArg, arrayPush([result3], action.args));
        }, result2);
      }
      function baseXor(arrays, iteratee2, comparator) {
        var length = arrays.length;
        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1, result2 = Array2(length);
        while (++index < length) {
          var array = arrays[index], othIndex = -1;
          while (++othIndex < length) {
            if (othIndex != index) {
              result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
      }
      function baseZipObject(props, values2, assignFunc) {
        var index = -1, length = props.length, valsLength = values2.length, result2 = {};
        while (++index < length) {
          var value = index < valsLength ? values2[index] : undefined2;
          assignFunc(result2, props[index], value);
        }
        return result2;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      var castRest = baseRest;
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined2 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var clearTimeout2 = ctxClearTimeout || function(id) {
        return root.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result2);
        return result2;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
        return result2;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp) {
        var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result2.lastIndex = regexp.lastIndex;
        return result2;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
          var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object, other, orders) {
        var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
        while (++index < length) {
          var result2 = compareAscending(objCriteria[index], othCriteria[index]);
          if (result2) {
            if (index >= ordersLength) {
              return result2;
            }
            var order = orders[index];
            return result2 * (order == "desc" ? -1 : 1);
          }
        }
        return object.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result2[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result2[leftIndex++] = args[argsIndex++];
        }
        return result2;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result2[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result2[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result2;
      }
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array2(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
          if (newValue === undefined2) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee2) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined2 : customizer;
            length = 1;
          }
          object = Object2(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee2) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee2);
          }
          var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee2(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee2, keysFunc) {
          var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee2(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst(methodName) {
        return function(string) {
          string = toString(string);
          var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
          var chr = strSymbols ? strSymbols[0] : string.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder(callback) {
        return function(string) {
          return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
        };
      }
      function createCtor(Ctor) {
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor;
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
          return isObject(result2) ? result2 : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length -= holders.length;
          if (length < arity) {
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined2, args, holders, undefined2, undefined2, arity - length);
          }
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object2(collection);
          if (!isArrayLike(collection)) {
            var iteratee2 = getIteratee(predicate, 3);
            collection = keys(collection);
            predicate = function(key) {
              return iteratee2(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == "wrapper") {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length;
          while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func), data = funcName == "wrapper" ? getData2(func) : undefined2;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray(value)) {
              return wrapper.plant(value).value();
            }
            var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
            while (++index2 < length) {
              result2 = funcs[index2].call(this, result2);
            }
            return result2;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length -= holdersCount;
          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
          }
          var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
          length = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }
          if (isAry && ary2 < length) {
            args.length = ary2;
          }
          if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function(object, iteratee2) {
          return baseInverter(object, setter, toIteratee(iteratee2), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result2;
          if (value === undefined2 && other === undefined2) {
            return defaultValue;
          }
          if (value !== undefined2) {
            result2 = value;
          }
          if (other !== undefined2) {
            if (result2 === undefined2) {
              return other;
            }
            if (typeof value == "string" || typeof other == "string") {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result2 = operator(value, other);
          }
          return result2;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee2) {
              return apply(iteratee2, thisArg, args);
            });
          });
        });
      }
      function createPadding(length, chars) {
        chars = chars === undefined2 ? " " : baseToString(chars);
        var charsLength = chars.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
        return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = undefined2;
          }
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == "string" && typeof other == "string")) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func,
          bitmask,
          thisArg,
          newPartials,
          newHolders,
          newPartialsRight,
          newHoldersRight,
          argPos,
          ary2,
          arity
        ];
        var result2 = wrapFunc.apply(undefined2, newData);
        if (isLaziable(func)) {
          setData2(result2, newData);
        }
        result2.placeholder = placeholder;
        return setWrapToString(result2, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math2[methodName];
        return function(number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number)) {
            var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
            pair = (toString(value) + "e").split("e");
            return +(pair[0] + "e" + (+pair[1] - precision));
          }
          return func(number);
        };
      }
      var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
        return new Set2(values2);
      };
      function createToPairs(keysFunc) {
        return function(object) {
          var tag = getTag(object);
          if (tag == mapTag) {
            return mapToArray(object);
          }
          if (tag == setTag) {
            return setToPairs(object);
          }
          return baseToPairs(object, keysFunc(object));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var length = partials ? partials.length : 0;
        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined2;
        }
        ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
        arity = arity === undefined2 ? arity : toInteger(arity);
        length -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials, holdersRight = holders;
          partials = holders = undefined2;
        }
        var data = isBindKey ? undefined2 : getData2(func);
        var newData = [
          func,
          bitmask,
          thisArg,
          partials,
          holders,
          partialsRight,
          holdersRight,
          argPos,
          ary2,
          arity
        ];
        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result2 = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result2 = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result2 = createPartial(func, bitmask, thisArg, partials);
        } else {
          result2 = createHybrid.apply(undefined2, newData);
        }
        var setter = data ? baseSetData : setData2;
        return setWrapToString(setter(result2, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
        if (isObject(objValue) && isObject(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
          stack["delete"](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject(value) ? undefined2 : value;
      }
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache : undefined2;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== undefined2) {
            if (compared) {
              continue;
            }
            result2 = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result2 = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result2 = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result2;
      }
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result2;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result2 = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result2 = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result2 && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && (("constructor" in object) && ("constructor" in other)) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result2 = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result2;
      }
      function flatRest(func) {
        return setToString(overRest(func, undefined2, flatten), func + "");
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      var getData2 = !metaMap ? noop : function(func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
        while (length--) {
          var data = array[length], otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result2;
      }
      function getHolder(func) {
        var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
        return object.placeholder;
      }
      function getIteratee() {
        var result2 = lodash.iteratee || iteratee;
        result2 = result2 === iteratee ? baseIteratee : result2;
        return arguments.length ? result2(arguments[0], arguments[1]) : result2;
      }
      function getMapData(map2, key) {
        var data = map2.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getMatchData(object) {
        var result2 = keys(object), length = result2.length;
        while (length--) {
          var key = result2[length], value = object[key];
          result2[length] = [key, value, isStrictComparable(value)];
        }
        return result2;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined2;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = undefined2;
          var unmasked = true;
        } catch (e) {}
        var result2 = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result2;
      }
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object2(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result2 = [];
        while (object) {
          arrayPush(result2, getSymbols(object));
          object = getPrototype(object);
        }
        return result2;
      };
      var getTag = baseGetTag;
      if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2) != setTag || WeakMap2 && getTag(new WeakMap2) != weakMapTag) {
        getTag = function(value) {
          var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result2;
        };
      }
      function getView(start, end, transforms) {
        var index = -1, length = transforms.length;
        while (++index < length) {
          var data = transforms[index], size2 = data.size;
          switch (data.type) {
            case "drop":
              start += size2;
              break;
            case "dropRight":
              end -= size2;
              break;
            case "take":
              end = nativeMin(end, start + size2);
              break;
            case "takeRight":
              start = nativeMax(start, end - size2);
              break;
          }
        }
        return { start, end };
      }
      function getWrapDetails(source) {
        var match = source.match(reWrapDetails);
        return match ? match[1].split(reSplitDetails) : [];
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result2 = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result2 = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result2 || ++index != length) {
          return result2;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      function initCloneArray(array) {
        var length = array.length, result2 = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
          result2.index = array.index;
          result2.input = array.input;
        }
        return result2;
      }
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor;
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor;
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      function insertWrapDetails(source, details) {
        var length = details.length;
        if (!length) {
          return source;
        }
        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
        details = details.join(length > 2 ? ", " : " ");
        return source.replace(reWrapComment, `{
/* [wrapped with ` + details + `] */
`);
      }
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && (index in object)) {
          return eq(object[index], value);
        }
        return false;
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func), other = lodash[funcName];
        if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData2(other);
        return !!data && func === data[0];
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var isMaskable = coreJsData ? isFunction : stubFalse;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== undefined2 || (key in Object2(object)));
        };
      }
      function memoizeCapped(func) {
        var result2 = memoize(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result2.cache;
        return result2;
      }
      function mergeData(data, source) {
        var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        }
        value = source[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        }
        value = source[7];
        if (value) {
          data[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        }
        if (data[9] == null) {
          data[9] = source[9];
        }
        data[0] = source[0];
        data[1] = newBitmask;
        return data;
      }
      function nativeKeysIn(object) {
        var result2 = [];
        if (object != null) {
          for (var key in Object2(object)) {
            result2.push(key);
          }
        }
        return result2;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform2) {
        start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array2(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }
      function reorder(array, indexes) {
        var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
        }
        return array;
      }
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      var setData2 = shortOut(baseSetData);
      var setTimeout2 = ctxSetTimeout || function(func, wait) {
        return root.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + "";
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined2, arguments);
        };
      }
      function shuffleSelf(array, size2) {
        var index = -1, length = array.length, lastIndex = length - 1;
        size2 = size2 === undefined2 ? length : size2;
        while (++index < size2) {
          var rand = baseRandom(index, lastIndex), value = array[rand];
          array[rand] = array[index];
          array[index] = value;
        }
        array.length = size2;
        return array;
      }
      var stringToPath = memoizeCapped(function(string) {
        var result2 = [];
        if (string.charCodeAt(0) === 46) {
          result2.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result2;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {}
          try {
            return func + "";
          } catch (e) {}
        }
        return "";
      }
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = "_." + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result2.__actions__ = copyArray(wrapper.__actions__);
        result2.__index__ = wrapper.__index__;
        result2.__values__ = wrapper.__values__;
        return result2;
      }
      function chunk(array, size2, guard) {
        if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
          size2 = 1;
        } else {
          size2 = nativeMax(toInteger(size2), 0);
        }
        var length = array == null ? 0 : array.length;
        if (!length || size2 < 1) {
          return [];
        }
        var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
        while (index < length) {
          result2[resIndex++] = baseSlice(array, index, index += size2);
        }
        return result2;
      }
      function compact(array) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result2[resIndex++] = value;
          }
        }
        return result2;
      }
      function concat() {
        var length = arguments.length;
        if (!length) {
          return [];
        }
        var args = Array2(length - 1), array = arguments[0], index = length;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }
      var difference = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function(array, values2) {
        var iteratee2 = last(values2);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined2;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
      });
      var differenceWith = baseRest(function(array, values2) {
        var comparator = last(values2);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined2;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
      });
      function drop(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function dropRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function dropRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
      }
      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }
        return baseFill(array, value, start, end);
      }
      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length - 1;
        if (fromIndex !== undefined2) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        depth = depth === undefined2 ? 1 : toInteger(depth);
        return baseFlatten(array, depth);
      }
      function fromPairs(pairs) {
        var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
        while (++index < length) {
          var pair = pairs[index];
          result2[pair[0]] = pair[1];
        }
        return result2;
      }
      function head(array) {
        return array && array.length ? array[0] : undefined2;
      }
      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseIndexOf(array, value, index);
      }
      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        if (iteratee2 === last(mapped)) {
          iteratee2 = undefined2;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
      });
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        comparator = typeof comparator == "function" ? comparator : undefined2;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
      });
      function join(array, separator) {
        return array == null ? "" : nativeJoin.call(array, separator);
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined2;
      }
      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length;
        if (fromIndex !== undefined2) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
      }
      function nth(array, n) {
        return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
      }
      var pull = baseRest(pullAll);
      function pullAll(array, values2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
      }
      function pullAllBy(array, values2, iteratee2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
      }
      function pullAllWith(array, values2, comparator) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
      }
      var pullAt = flatRest(function(array, indexes) {
        var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
        basePullAt(array, arrayMap(indexes, function(index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));
        return result2;
      });
      function remove(array, predicate) {
        var result2 = [];
        if (!(array && array.length)) {
          return result2;
        }
        var index = -1, indexes = [], length = array.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result2.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array, indexes);
        return result2;
      }
      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      function slice(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined2 ? length : toInteger(end);
        }
        return baseSlice(array, start, end);
      }
      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }
      function sortedIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
      }
      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value);
          if (index < length && eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }
      function sortedLastIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
      }
      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;
          if (eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array) {
        return array && array.length ? baseSortedUniq(array) : [];
      }
      function sortedUniqBy(array, iteratee2) {
        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      function take(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function takeRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function takeRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined2;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
      });
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined2;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
      });
      function uniq(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      function uniqBy(array, iteratee2) {
        return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function uniqWith(array, comparator) {
        comparator = typeof comparator == "function" ? comparator : undefined2;
        return array && array.length ? baseUniq(array, undefined2, comparator) : [];
      }
      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }
        var length = 0;
        array = arrayFilter(array, function(group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function(index) {
          return arrayMap(array, baseProperty(index));
        });
      }
      function unzipWith(array, iteratee2) {
        if (!(array && array.length)) {
          return [];
        }
        var result2 = unzip(array);
        if (iteratee2 == null) {
          return result2;
        }
        return arrayMap(result2, function(group) {
          return apply(iteratee2, undefined2, group);
        });
      }
      var without = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
      });
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined2;
        }
        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
      });
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined2;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values2) {
        return baseZipObject(props || [], values2 || [], assignValue);
      }
      function zipObjectDeep(props, values2) {
        return baseZipObject(props || [], values2 || [], baseSet);
      }
      var zipWith = baseRest(function(arrays) {
        var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
        iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
        return unzipWith(arrays, iteratee2);
      });
      function chain(value) {
        var result2 = lodash(value);
        result2.__chain__ = true;
        return result2;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function(paths) {
        var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
          return baseAt(object, paths);
        };
        if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length ? 1 : 0));
        value.__actions__.push({
          func: thru,
          args: [interceptor],
          thisArg: undefined2
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array) {
          if (length && !array.length) {
            array.push(undefined2);
          }
          return array;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined2) {
          this.__values__ = toArray(this.value());
        }
        var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
        return { done, value };
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result2, parent2 = this;
        while (parent2 instanceof baseLodash) {
          var clone2 = wrapperClone(parent2);
          clone2.__index__ = 0;
          clone2.__values__ = undefined2;
          if (result2) {
            previous.__wrapped__ = clone2;
          } else {
            result2 = clone2;
          }
          var previous = clone2;
          parent2 = parent2.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result2;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            func: thru,
            args: [reverse],
            thisArg: undefined2
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          ++result2[key];
        } else {
          baseAssignValue(result2, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined2;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), 1);
      }
      function flatMapDeep(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), INFINITY);
      }
      function flatMapDepth(collection, iteratee2, depth) {
        depth = depth === undefined2 ? 1 : toInteger(depth);
        return baseFlatten(map(collection, iteratee2), depth);
      }
      function forEach(collection, iteratee2) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function forEachRight(collection, iteratee2) {
        var func = isArray(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee2, 3));
      }
      var groupBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          result2[key].push(value);
        } else {
          baseAssignValue(result2, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function(collection, path, args) {
        var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value) {
          result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result2;
      });
      var keyBy = createAggregator(function(result2, value, key) {
        baseAssignValue(result2, key, value);
      });
      function map(collection, iteratee2) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined2 : orders;
        if (!isArray(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function(result2, value, key) {
        result2[key ? 0 : 1].push(value);
      }, function() {
        return [[], []];
      });
      function reduce(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n, guard) {
        if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n);
      }
      function shuffle(collection) {
        var func = isArray(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag(collection);
        if (tag == mapTag || tag == setTag) {
          return collection.size;
        }
        return baseKeys(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray(collection) ? arraySome : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined2;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function() {
        return root.Date.now();
      };
      function after(n, func) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n, guard) {
        n = guard ? undefined2 : n;
        n = func && n == null ? func.length : n;
        return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
      }
      function before(n, func) {
        var result2;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n > 0) {
            result2 = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = undefined2;
          }
          return result2;
        };
      }
      var bind = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function(object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined2 : arity;
        var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
        result2.placeholder = curry.placeholder;
        return result2;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined2 : arity;
        var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
        result2.placeholder = curryRight.placeholder;
        return result2;
      }
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = undefined2;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout2(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout2(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined2;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined2;
          return result2;
        }
        function cancel() {
          if (timerId !== undefined2) {
            clearTimeout2(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined2;
        }
        function flush() {
          return timerId === undefined2 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined2) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout2(timerId);
              timerId = setTimeout2(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined2) {
            timerId = setTimeout2(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result2 = func.apply(this, args);
          memoized.cache = cache.set(key, result2) || cache;
          return result2;
        };
        memoized.cache = new (memoize.Cache || MapCache);
        return memoized;
      }
      memoize.Cache = MapCache;
      function negate(predicate) {
        if (typeof predicate != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once(func) {
        return before(2, func);
      }
      var overArgs = castRest(function(func, transforms) {
        transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1, length = nativeMin(args.length, funcsLength);
          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
      });
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
      });
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
      });
      function rest(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start === undefined2 ? start : toInteger(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function(args) {
          var array = args[start], otherArgs = castSlice(args, 0, start);
          if (array) {
            arrayPush(otherArgs, array);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          leading,
          maxWait: wait,
          trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray(value) ? value : [value];
      }
      function clone(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object, source) {
        return source == null || baseConformsTo(object, source, keys(source));
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt = createRelationalOperation(baseGt);
      var gte = createRelationalOperation(function(value, other) {
        return value >= other;
      });
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array2.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isBoolean(value) {
        return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
      }
      var isBuffer = nativeIsBuffer || stubFalse;
      var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }
        var tag = getTag(value);
        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        var result2 = customizer ? customizer(value, other) : undefined2;
        return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
      }
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
      }
      function isFinite(value) {
        return typeof value == "number" && nativeIsFinite(value);
      }
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isInteger(value) {
        return typeof value == "number" && value == toInteger(value);
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      function isMatch(object, source) {
        return object === source || baseIsMatch(object, source, getMatchData(source));
      }
      function isMatchWith(object, source, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return baseIsMatch(object, source, getMatchData(source), customizer);
      }
      function isNaN(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error2(CORE_ERROR_TEXT);
        }
        return baseIsNative(value);
      }
      function isNull(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber(value) {
        return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      function isString(value) {
        return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function isUndefined(value) {
        return value === undefined2;
      }
      function isWeakMap(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }
      function isWeakSet(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }
      var lt = createRelationalOperation(baseLt);
      var lte = createRelationalOperation(function(value, other) {
        return value <= other;
      });
      function toArray(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike(value)) {
          return isString(value) ? stringToArray(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result2 = toFinite(value), remainder = result2 % 1;
        return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var assign = createAssigner(function(object, source) {
        if (isPrototype(source) || isArrayLike(source)) {
          copyObject(source, keys(source), object);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            assignValue(object, key, source[key]);
          }
        }
      });
      var assignIn = createAssigner(function(object, source) {
        copyObject(source, keysIn(source), object);
      });
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keys(source), object, customizer);
      });
      var at = flatRest(baseAt);
      function create(prototype, properties) {
        var result2 = baseCreate(prototype);
        return properties == null ? result2 : baseAssign(result2, properties);
      }
      var defaults = baseRest(function(object, sources) {
        object = Object2(object);
        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined2;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;
          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object[key];
            if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              object[key] = source[key];
            }
          }
        }
        return object;
      });
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined2, customDefaultsMerge);
        return apply(mergeWith, undefined2, args);
      });
      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }
      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object, iteratee2) {
        return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forInRight(object, iteratee2) {
        return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forOwn(object, iteratee2) {
        return object && baseForOwn(object, getIteratee(iteratee2, 3));
      }
      function forOwnRight(object, iteratee2) {
        return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
      }
      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys(object));
      }
      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }
      function get(object, path, defaultValue) {
        var result2 = object == null ? undefined2 : baseGet(object, path);
        return result2 === undefined2 ? defaultValue : result2;
      }
      function has(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var invert = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        result2[value] = key;
      }, constant(identity));
      var invertBy = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        if (hasOwnProperty.call(result2, value)) {
          result2[value].push(key);
        } else {
          result2[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function mapKeys(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, iteratee2(value, key, object2), value);
        });
        return result2;
      }
      function mapValues(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, key, iteratee2(value, key, object2));
        });
        return result2;
      }
      var merge = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
        baseMerge(object, source, srcIndex, customizer);
      });
      var omit = flatRest(function(object, paths) {
        var result2 = {};
        if (object == null) {
          return result2;
        }
        var isDeep = false;
        paths = arrayMap(paths, function(path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result2);
        if (isDeep) {
          result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result2, paths[length]);
        }
        return result2;
      });
      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }
      var pick = flatRest(function(object, paths) {
        return object == null ? {} : basePick(object, paths);
      });
      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }
        var props = arrayMap(getAllKeysIn(object), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function(value, path) {
          return predicate(value, path[0]);
        });
      }
      function result(object, path, defaultValue) {
        path = castPath(path, object);
        var index = -1, length = path.length;
        if (!length) {
          length = 1;
          object = undefined2;
        }
        while (++index < length) {
          var value = object == null ? undefined2 : object[toKey(path[index])];
          if (value === undefined2) {
            index = length;
            value = defaultValue;
          }
          object = isFunction(value) ? value.call(object) : value;
        }
        return object;
      }
      function set(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      function setWith(object, path, value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return object == null ? object : baseSet(object, path, value, customizer);
      }
      var toPairs = createToPairs(keys);
      var toPairsIn = createToPairs(keysIn);
      function transform(object, iteratee2, accumulator) {
        var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
        iteratee2 = getIteratee(iteratee2, 4);
        if (accumulator == null) {
          var Ctor = object && object.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor : [];
          } else if (isObject(object)) {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
          return iteratee2(accumulator, value, index, object2);
        });
        return accumulator;
      }
      function unset(object, path) {
        return object == null ? true : baseUnset(object, path);
      }
      function update(object, path, updater) {
        return object == null ? object : baseUpdate(object, path, castFunction(updater));
      }
      function updateWith(object, path, updater, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
      }
      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }
      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }
      function clamp(number, lower, upper) {
        if (upper === undefined2) {
          upper = lower;
          lower = undefined2;
        }
        if (upper !== undefined2) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined2) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number), lower, upper);
      }
      function inRange(number, start, end) {
        start = toFinite(start);
        if (end === undefined2) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number = toNumber(number);
        return baseInRange(number, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined2;
        }
        if (floating === undefined2) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = undefined2;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = undefined2;
          }
        }
        if (lower === undefined2 && upper === undefined2) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined2) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase = createCompounder(function(result2, word, index) {
        word = word.toLowerCase();
        return result2 + (index ? capitalize(word) : word);
      });
      function capitalize(string) {
        return upperFirst(toString(string).toLowerCase());
      }
      function deburr(string) {
        string = toString(string);
        return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
      }
      function endsWith(string, target, position) {
        string = toString(string);
        target = baseToString(target);
        var length = string.length;
        position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
        var end = position;
        position -= target.length;
        return position >= 0 && string.slice(position, end) == target;
      }
      function escape(string) {
        string = toString(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      function escapeRegExp(string) {
        string = toString(string);
        return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
      }
      var kebabCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "-" : "") + word.toLowerCase();
      });
      var lowerCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst("toLowerCase");
      function pad(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        if (!length || strLength >= length) {
          return string;
        }
        var mid = (length - strLength) / 2;
        return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
      }
      function padEnd(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
      }
      function padStart(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
      }
      function parseInt2(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
      }
      function repeat(string, n, guard) {
        if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        return baseRepeat(toString(string), n);
      }
      function replace() {
        var args = arguments, string = toString(args[0]);
        return args.length < 3 ? string : string.replace(args[1], args[2]);
      }
      var snakeCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "_" : "") + word.toLowerCase();
      });
      function split(string, separator, limit) {
        if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
          separator = limit = undefined2;
        }
        limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string = toString(string);
        if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
          separator = baseToString(separator);
          if (!separator && hasUnicode(string)) {
            return castSlice(stringToArray(string), 0, limit);
          }
        }
        return string.split(separator, limit);
      }
      var startCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + upperFirst(word);
      });
      function startsWith(string, target, position) {
        string = toString(string);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
        target = baseToString(target);
        return string.slice(position, position + target.length) == target;
      }
      function template(string, options, guard) {
        var settings = lodash.templateSettings;
        if (guard && isIterateeCall(string, options, guard)) {
          options = undefined2;
        }
        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
        var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + `
`;
        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += `' +
__e(` + escapeValue + `) +
'`;
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += `';
` + evaluateValue + `;
__p += '`;
          }
          if (interpolateValue) {
            source += `' +
((__t = (` + interpolateValue + `)) == null ? '' : __t) +
'`;
          }
          index = offset + match.length;
          return match;
        });
        source += `';
`;
        var variable = hasOwnProperty.call(options, "variable") && options.variable;
        if (!variable) {
          source = `with (obj) {
` + source + `
}
`;
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + `) {
` + (variable ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? `, __j = Array.prototype.join;
` + `function print() { __p += __j.call(arguments, '') }
` : `;
`) + source + `return __p
}`;
        var result2 = attempt(function() {
          return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
        });
        result2.source = source;
        if (isError(result2)) {
          throw result2;
        }
        return result2;
      }
      function toLower(value) {
        return toString(value).toLowerCase();
      }
      function toUpper(value) {
        return toString(value).toUpperCase();
      }
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined2)) {
          return baseTrim(string);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      function trimEnd(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined2)) {
          return string.slice(0, trimmedEndIndex(string) + 1);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
        return castSlice(strSymbols, 0, end).join("");
      }
      function trimStart(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined2)) {
          return string.replace(reTrimStart, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
        return castSlice(strSymbols, start).join("");
      }
      function truncate(string, options) {
        var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
        if (isObject(options)) {
          var separator = "separator" in options ? options.separator : separator;
          length = "length" in options ? toInteger(options.length) : length;
          omission = "omission" in options ? baseToString(options.omission) : omission;
        }
        string = toString(string);
        var strLength = string.length;
        if (hasUnicode(string)) {
          var strSymbols = stringToArray(string);
          strLength = strSymbols.length;
        }
        if (length >= strLength) {
          return string;
        }
        var end = length - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
        if (separator === undefined2) {
          return result2 + omission;
        }
        if (strSymbols) {
          end += result2.length - end;
        }
        if (isRegExp(separator)) {
          if (string.slice(end).search(separator)) {
            var match, substring = result2;
            if (!separator.global) {
              separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
            }
            separator.lastIndex = 0;
            while (match = separator.exec(substring)) {
              var newEnd = match.index;
            }
            result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
          }
        } else if (string.indexOf(baseToString(separator), end) != end) {
          var index = result2.lastIndexOf(separator);
          if (index > -1) {
            result2 = result2.slice(0, index);
          }
        }
        return result2 + omission;
      }
      function unescape(string) {
        string = toString(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
      }
      var upperCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toUpperCase();
      });
      var upperFirst = createCaseFirst("toUpperCase");
      function words(string, pattern, guard) {
        string = toString(string);
        pattern = guard ? undefined2 : pattern;
        if (pattern === undefined2) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }
        return string.match(pattern) || [];
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined2, args);
        } catch (e) {
          return isError(e) ? e : new Error2(e);
        }
      });
      var bindAll = flatRest(function(object, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey(key);
          baseAssignValue(object, key, bind(object[key], object));
        });
        return object;
      });
      function cond(pairs) {
        var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
        pairs = !length ? [] : arrayMap(pairs, function(pair) {
          if (typeof pair[1] != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function(args) {
          var index = -1;
          while (++index < length) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source) {
        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
      }
      function matches(source) {
        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function(path, args) {
        return function(object) {
          return baseInvoke(object, path, args);
        };
      });
      var methodOf = baseRest(function(object, args) {
        return function(path) {
          return baseInvoke(object, path, args);
        };
      });
      function mixin(object, source, options) {
        var props = keys(source), methodNames = baseFunctions(source, props);
        if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object;
          object = this;
          methodNames = baseFunctions(source, keys(source));
        }
        var chain2 = !(isObject(options) && ("chain" in options)) || !!options.chain, isFunc = isFunction(object);
        arrayEach(methodNames, function(methodName) {
          var func = source[methodName];
          object[methodName] = func;
          if (isFunc) {
            object.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain2 || chainAll) {
                var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                actions.push({ func, args: arguments, thisArg: object });
                result2.__chain__ = chainAll;
                return result2;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });
        return object;
      }
      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }
        return this;
      }
      function noop() {}
      function nthArg(n) {
        n = toInteger(n);
        return baseRest(function(args) {
          return baseNth(args, n);
        });
      }
      var over = createOver(arrayMap);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome);
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      function propertyOf(object) {
        return function(path) {
          return object == null ? undefined2 : baseGet(object, path);
        };
      }
      var range = createRange();
      var rangeRight = createRange(true);
      function stubArray() {
        return [];
      }
      function stubFalse() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return "";
      }
      function stubTrue() {
        return true;
      }
      function times(n, iteratee2) {
        n = toInteger(n);
        if (n < 1 || n > MAX_SAFE_INTEGER) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
        iteratee2 = getIteratee(iteratee2);
        n -= MAX_ARRAY_LENGTH;
        var result2 = baseTimes(length, iteratee2);
        while (++index < n) {
          iteratee2(index);
        }
        return result2;
      }
      function toPath(value) {
        if (isArray(value)) {
          return arrayMap(value, toKey);
        }
        return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString(prefix) + id;
      }
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound("ceil");
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor = createRound("floor");
      function max(array) {
        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
      }
      function maxBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
      }
      function mean(array) {
        return baseMean(array, identity);
      }
      function meanBy(array, iteratee2) {
        return baseMean(array, getIteratee(iteratee2, 2));
      }
      function min(array) {
        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
      }
      function minBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
      }
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound("round");
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array) {
        return array && array.length ? baseSum(array, identity) : 0;
      }
      function sumBy(array, iteratee2) {
        return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
      }
      lodash.after = after;
      lodash.ary = ary;
      lodash.assign = assign;
      lodash.assignIn = assignIn;
      lodash.assignInWith = assignInWith;
      lodash.assignWith = assignWith;
      lodash.at = at;
      lodash.before = before;
      lodash.bind = bind;
      lodash.bindAll = bindAll;
      lodash.bindKey = bindKey;
      lodash.castArray = castArray;
      lodash.chain = chain;
      lodash.chunk = chunk;
      lodash.compact = compact;
      lodash.concat = concat;
      lodash.cond = cond;
      lodash.conforms = conforms;
      lodash.constant = constant;
      lodash.countBy = countBy;
      lodash.create = create;
      lodash.curry = curry;
      lodash.curryRight = curryRight;
      lodash.debounce = debounce;
      lodash.defaults = defaults;
      lodash.defaultsDeep = defaultsDeep;
      lodash.defer = defer;
      lodash.delay = delay;
      lodash.difference = difference;
      lodash.differenceBy = differenceBy;
      lodash.differenceWith = differenceWith;
      lodash.drop = drop;
      lodash.dropRight = dropRight;
      lodash.dropRightWhile = dropRightWhile;
      lodash.dropWhile = dropWhile;
      lodash.fill = fill;
      lodash.filter = filter;
      lodash.flatMap = flatMap;
      lodash.flatMapDeep = flatMapDeep;
      lodash.flatMapDepth = flatMapDepth;
      lodash.flatten = flatten;
      lodash.flattenDeep = flattenDeep;
      lodash.flattenDepth = flattenDepth;
      lodash.flip = flip;
      lodash.flow = flow;
      lodash.flowRight = flowRight;
      lodash.fromPairs = fromPairs;
      lodash.functions = functions;
      lodash.functionsIn = functionsIn;
      lodash.groupBy = groupBy;
      lodash.initial = initial;
      lodash.intersection = intersection;
      lodash.intersectionBy = intersectionBy;
      lodash.intersectionWith = intersectionWith;
      lodash.invert = invert;
      lodash.invertBy = invertBy;
      lodash.invokeMap = invokeMap;
      lodash.iteratee = iteratee;
      lodash.keyBy = keyBy;
      lodash.keys = keys;
      lodash.keysIn = keysIn;
      lodash.map = map;
      lodash.mapKeys = mapKeys;
      lodash.mapValues = mapValues;
      lodash.matches = matches;
      lodash.matchesProperty = matchesProperty;
      lodash.memoize = memoize;
      lodash.merge = merge;
      lodash.mergeWith = mergeWith;
      lodash.method = method;
      lodash.methodOf = methodOf;
      lodash.mixin = mixin;
      lodash.negate = negate;
      lodash.nthArg = nthArg;
      lodash.omit = omit;
      lodash.omitBy = omitBy;
      lodash.once = once;
      lodash.orderBy = orderBy;
      lodash.over = over;
      lodash.overArgs = overArgs;
      lodash.overEvery = overEvery;
      lodash.overSome = overSome;
      lodash.partial = partial;
      lodash.partialRight = partialRight;
      lodash.partition = partition;
      lodash.pick = pick;
      lodash.pickBy = pickBy;
      lodash.property = property;
      lodash.propertyOf = propertyOf;
      lodash.pull = pull;
      lodash.pullAll = pullAll;
      lodash.pullAllBy = pullAllBy;
      lodash.pullAllWith = pullAllWith;
      lodash.pullAt = pullAt;
      lodash.range = range;
      lodash.rangeRight = rangeRight;
      lodash.rearg = rearg;
      lodash.reject = reject;
      lodash.remove = remove;
      lodash.rest = rest;
      lodash.reverse = reverse;
      lodash.sampleSize = sampleSize;
      lodash.set = set;
      lodash.setWith = setWith;
      lodash.shuffle = shuffle;
      lodash.slice = slice;
      lodash.sortBy = sortBy;
      lodash.sortedUniq = sortedUniq;
      lodash.sortedUniqBy = sortedUniqBy;
      lodash.split = split;
      lodash.spread = spread;
      lodash.tail = tail;
      lodash.take = take;
      lodash.takeRight = takeRight;
      lodash.takeRightWhile = takeRightWhile;
      lodash.takeWhile = takeWhile;
      lodash.tap = tap;
      lodash.throttle = throttle;
      lodash.thru = thru;
      lodash.toArray = toArray;
      lodash.toPairs = toPairs;
      lodash.toPairsIn = toPairsIn;
      lodash.toPath = toPath;
      lodash.toPlainObject = toPlainObject;
      lodash.transform = transform;
      lodash.unary = unary;
      lodash.union = union;
      lodash.unionBy = unionBy;
      lodash.unionWith = unionWith;
      lodash.uniq = uniq;
      lodash.uniqBy = uniqBy;
      lodash.uniqWith = uniqWith;
      lodash.unset = unset;
      lodash.unzip = unzip;
      lodash.unzipWith = unzipWith;
      lodash.update = update;
      lodash.updateWith = updateWith;
      lodash.values = values;
      lodash.valuesIn = valuesIn;
      lodash.without = without;
      lodash.words = words;
      lodash.wrap = wrap;
      lodash.xor = xor;
      lodash.xorBy = xorBy;
      lodash.xorWith = xorWith;
      lodash.zip = zip;
      lodash.zipObject = zipObject;
      lodash.zipObjectDeep = zipObjectDeep;
      lodash.zipWith = zipWith;
      lodash.entries = toPairs;
      lodash.entriesIn = toPairsIn;
      lodash.extend = assignIn;
      lodash.extendWith = assignInWith;
      mixin(lodash, lodash);
      lodash.add = add;
      lodash.attempt = attempt;
      lodash.camelCase = camelCase;
      lodash.capitalize = capitalize;
      lodash.ceil = ceil;
      lodash.clamp = clamp;
      lodash.clone = clone;
      lodash.cloneDeep = cloneDeep;
      lodash.cloneDeepWith = cloneDeepWith;
      lodash.cloneWith = cloneWith;
      lodash.conformsTo = conformsTo;
      lodash.deburr = deburr;
      lodash.defaultTo = defaultTo;
      lodash.divide = divide;
      lodash.endsWith = endsWith;
      lodash.eq = eq;
      lodash.escape = escape;
      lodash.escapeRegExp = escapeRegExp;
      lodash.every = every;
      lodash.find = find;
      lodash.findIndex = findIndex;
      lodash.findKey = findKey;
      lodash.findLast = findLast;
      lodash.findLastIndex = findLastIndex;
      lodash.findLastKey = findLastKey;
      lodash.floor = floor;
      lodash.forEach = forEach;
      lodash.forEachRight = forEachRight;
      lodash.forIn = forIn;
      lodash.forInRight = forInRight;
      lodash.forOwn = forOwn;
      lodash.forOwnRight = forOwnRight;
      lodash.get = get;
      lodash.gt = gt;
      lodash.gte = gte;
      lodash.has = has;
      lodash.hasIn = hasIn;
      lodash.head = head;
      lodash.identity = identity;
      lodash.includes = includes;
      lodash.indexOf = indexOf;
      lodash.inRange = inRange;
      lodash.invoke = invoke;
      lodash.isArguments = isArguments;
      lodash.isArray = isArray;
      lodash.isArrayBuffer = isArrayBuffer;
      lodash.isArrayLike = isArrayLike;
      lodash.isArrayLikeObject = isArrayLikeObject;
      lodash.isBoolean = isBoolean;
      lodash.isBuffer = isBuffer;
      lodash.isDate = isDate;
      lodash.isElement = isElement;
      lodash.isEmpty = isEmpty;
      lodash.isEqual = isEqual;
      lodash.isEqualWith = isEqualWith;
      lodash.isError = isError;
      lodash.isFinite = isFinite;
      lodash.isFunction = isFunction;
      lodash.isInteger = isInteger;
      lodash.isLength = isLength;
      lodash.isMap = isMap;
      lodash.isMatch = isMatch;
      lodash.isMatchWith = isMatchWith;
      lodash.isNaN = isNaN;
      lodash.isNative = isNative;
      lodash.isNil = isNil;
      lodash.isNull = isNull;
      lodash.isNumber = isNumber;
      lodash.isObject = isObject;
      lodash.isObjectLike = isObjectLike;
      lodash.isPlainObject = isPlainObject;
      lodash.isRegExp = isRegExp;
      lodash.isSafeInteger = isSafeInteger;
      lodash.isSet = isSet;
      lodash.isString = isString;
      lodash.isSymbol = isSymbol;
      lodash.isTypedArray = isTypedArray;
      lodash.isUndefined = isUndefined;
      lodash.isWeakMap = isWeakMap;
      lodash.isWeakSet = isWeakSet;
      lodash.join = join;
      lodash.kebabCase = kebabCase;
      lodash.last = last;
      lodash.lastIndexOf = lastIndexOf;
      lodash.lowerCase = lowerCase;
      lodash.lowerFirst = lowerFirst;
      lodash.lt = lt;
      lodash.lte = lte;
      lodash.max = max;
      lodash.maxBy = maxBy;
      lodash.mean = mean;
      lodash.meanBy = meanBy;
      lodash.min = min;
      lodash.minBy = minBy;
      lodash.stubArray = stubArray;
      lodash.stubFalse = stubFalse;
      lodash.stubObject = stubObject;
      lodash.stubString = stubString;
      lodash.stubTrue = stubTrue;
      lodash.multiply = multiply;
      lodash.nth = nth;
      lodash.noConflict = noConflict;
      lodash.noop = noop;
      lodash.now = now;
      lodash.pad = pad;
      lodash.padEnd = padEnd;
      lodash.padStart = padStart;
      lodash.parseInt = parseInt2;
      lodash.random = random;
      lodash.reduce = reduce;
      lodash.reduceRight = reduceRight;
      lodash.repeat = repeat;
      lodash.replace = replace;
      lodash.result = result;
      lodash.round = round;
      lodash.runInContext = runInContext;
      lodash.sample = sample;
      lodash.size = size;
      lodash.snakeCase = snakeCase;
      lodash.some = some;
      lodash.sortedIndex = sortedIndex;
      lodash.sortedIndexBy = sortedIndexBy;
      lodash.sortedIndexOf = sortedIndexOf;
      lodash.sortedLastIndex = sortedLastIndex;
      lodash.sortedLastIndexBy = sortedLastIndexBy;
      lodash.sortedLastIndexOf = sortedLastIndexOf;
      lodash.startCase = startCase;
      lodash.startsWith = startsWith;
      lodash.subtract = subtract;
      lodash.sum = sum;
      lodash.sumBy = sumBy;
      lodash.template = template;
      lodash.times = times;
      lodash.toFinite = toFinite;
      lodash.toInteger = toInteger;
      lodash.toLength = toLength;
      lodash.toLower = toLower;
      lodash.toNumber = toNumber;
      lodash.toSafeInteger = toSafeInteger;
      lodash.toString = toString;
      lodash.toUpper = toUpper;
      lodash.trim = trim;
      lodash.trimEnd = trimEnd;
      lodash.trimStart = trimStart;
      lodash.truncate = truncate;
      lodash.unescape = unescape;
      lodash.uniqueId = uniqueId;
      lodash.upperCase = upperCase;
      lodash.upperFirst = upperFirst;
      lodash.each = forEach;
      lodash.eachRight = forEachRight;
      lodash.first = head;
      mixin(lodash, function() {
        var source = {};
        baseForOwn(lodash, function(func, methodName) {
          if (!hasOwnProperty.call(lodash.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), { chain: false });
      lodash.VERSION = VERSION;
      arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
        lodash[methodName].placeholder = lodash;
      });
      arrayEach(["drop", "take"], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n) {
          n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
          var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result2.__filtered__) {
            result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
          } else {
            result2.__views__.push({
              size: nativeMin(n, MAX_ARRAY_LENGTH),
              type: methodName + (result2.__dir__ < 0 ? "Right" : "")
            });
          }
          return result2;
        };
        LazyWrapper.prototype[methodName + "Right"] = function(n) {
          return this.reverse()[methodName](n).reverse();
        };
      });
      arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function(iteratee2) {
          var result2 = this.clone();
          result2.__iteratees__.push({
            iteratee: getIteratee(iteratee2, 3),
            type
          });
          result2.__filtered__ = result2.__filtered__ || isFilter;
          return result2;
        };
      });
      arrayEach(["head", "last"], function(methodName, index) {
        var takeName = "take" + (index ? "Right" : "");
        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(["initial", "tail"], function(methodName, index) {
        var dropName = "drop" + (index ? "" : "Right");
        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function() {
        return this.filter(identity);
      };
      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
        if (typeof path == "function") {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path, args);
        });
      });
      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger(start);
        var result2 = this;
        if (result2.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result2);
        }
        if (start < 0) {
          result2 = result2.takeRight(-start);
        } else if (start) {
          result2 = result2.drop(start);
        }
        if (end !== undefined2) {
          end = toInteger(end);
          result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
        }
        return result2;
      };
      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash.prototype[methodName] = function() {
          var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
          var interceptor = function(value2) {
            var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
            return isTaker && chainAll ? result3[0] : result3;
          };
          if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result2 = func.apply(value, args);
            result2.__actions__.push({ func: thru, args: [interceptor], thisArg: undefined2 });
            return new LodashWrapper(result2, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result2 = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
        };
      });
      arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
        var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
          }
          return this[chainName](function(value2) {
            return func.apply(isArray(value2) ? value2 : [], args);
          });
        };
      });
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + "";
          if (!hasOwnProperty.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({ name: methodName, func: lodashFunc });
        }
      });
      realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
        name: "wrapper",
        func: undefined2
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash.prototype.at = wrapperAt;
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.commit = wrapperCommit;
      lodash.prototype.next = wrapperNext;
      lodash.prototype.plant = wrapperPlant;
      lodash.prototype.reverse = wrapperReverse;
      lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
      lodash.prototype.first = lodash.prototype.head;
      if (symIterator) {
        lodash.prototype[symIterator] = wrapperToIterator;
      }
      return lodash;
    };
    var _ = runInContext();
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
      root._ = _;
      define(function() {
        return _;
      });
    } else if (freeModule) {
      (freeModule.exports = _)._ = _;
      freeExports._ = _;
    } else {
      root._ = _;
    }
  }).call(exports);
});

// node_modules/generate-random-emoji/index.js
var require_generate_random_emoji = __commonJS((exports, module) => {
  var emojis = [
    {
      code: "U+1F600",
      name: "grinning face",
      image: "\uD83D\uDE00",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F603",
      name: "grinning face with big eyes",
      image: "\uD83D\uDE03",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F604",
      name: "grinning face with smiling eyes",
      image: "\uD83D\uDE04",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F601",
      name: "beaming face with smiling eyes",
      image: "\uD83D\uDE01",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F606",
      name: "grinning squinting face",
      image: "\uD83D\uDE06",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F605",
      name: "grinning face with sweat",
      image: "\uD83D\uDE05",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F923",
      name: "rolling on the floor laughing",
      image: "\uD83E\uDD23",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F602",
      name: "face with tears of joy",
      image: "\uD83D\uDE02",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F642",
      name: "slightly smiling face",
      image: "\uD83D\uDE42",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F643",
      name: "upside-down face",
      image: "\uD83D\uDE43",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE0",
      name: "melting face",
      image: "\uD83E\uDEE0",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F609",
      name: "winking face",
      image: "\uD83D\uDE09",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60A",
      name: "smiling face with smiling eyes",
      image: "\uD83D\uDE0A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F607",
      name: "smiling face with halo",
      image: "\uD83D\uDE07",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F970",
      name: "smiling face with hearts",
      image: "\uD83E\uDD70",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60D",
      name: "smiling face with heart-eyes",
      image: "\uD83D\uDE0D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F929",
      name: "star-struck",
      image: "\uD83E\uDD29",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F618",
      name: "face blowing a kiss",
      image: "\uD83D\uDE18",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F617",
      name: "kissing face",
      image: "\uD83D\uDE17",
      category: "Smileys & Emotion"
    },
    {
      code: "U+263A",
      name: "smiling face",
      image: "☺",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61A",
      name: "kissing face with closed eyes",
      image: "\uD83D\uDE1A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F619",
      name: "kissing face with smiling eyes",
      image: "\uD83D\uDE19",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F972",
      name: "smiling face with tear",
      image: "\uD83E\uDD72",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60B",
      name: "face savoring food",
      image: "\uD83D\uDE0B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61B",
      name: "face with tongue",
      image: "\uD83D\uDE1B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61C",
      name: "winking face with tongue",
      image: "\uD83D\uDE1C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92A",
      name: "zany face",
      image: "\uD83E\uDD2A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61D",
      name: "squinting face with tongue",
      image: "\uD83D\uDE1D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F911",
      name: "money-mouth face",
      image: "\uD83E\uDD11",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F917",
      name: "smiling face with open hands",
      image: "\uD83E\uDD17",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92D",
      name: "face with hand over mouth",
      image: "\uD83E\uDD2D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE2",
      name: "face with open eyes and hand over mouth",
      image: "\uD83E\uDEE2",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE3",
      name: "face with peeking eye",
      image: "\uD83E\uDEE3",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92B",
      name: "shushing face",
      image: "\uD83E\uDD2B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F914",
      name: "thinking face",
      image: "\uD83E\uDD14",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE1",
      name: "saluting face",
      image: "\uD83E\uDEE1",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F910",
      name: "zipper-mouth face",
      image: "\uD83E\uDD10",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F928",
      name: "face with raised eyebrow",
      image: "\uD83E\uDD28",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F610",
      name: "neutral face",
      image: "\uD83D\uDE10",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F611",
      name: "expressionless face",
      image: "\uD83D\uDE11",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F636",
      name: "face without mouth",
      image: "\uD83D\uDE36",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE5",
      name: "dotted line face",
      image: "\uD83E\uDEE5",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F636 U+200D U+1F32B U+FE0F",
      name: "face in clouds",
      image: "\uD83D\uDE36‍\uD83C\uDF2B️",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60F",
      name: "smirking face",
      image: "\uD83D\uDE0F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F612",
      name: "unamused face",
      image: "\uD83D\uDE12",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F644",
      name: "face with rolling eyes",
      image: "\uD83D\uDE44",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62C",
      name: "grimacing face",
      image: "\uD83D\uDE2C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62E U+200D U+1F4A8",
      name: "face exhaling",
      image: "\uD83D\uDE2E‍\uD83D\uDCA8",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F925",
      name: "lying face",
      image: "\uD83E\uDD25",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60C",
      name: "relieved face",
      image: "\uD83D\uDE0C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F614",
      name: "pensive face",
      image: "\uD83D\uDE14",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62A",
      name: "sleepy face",
      image: "\uD83D\uDE2A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F924",
      name: "drooling face",
      image: "\uD83E\uDD24",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F634",
      name: "sleeping face",
      image: "\uD83D\uDE34",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F637",
      name: "face with medical mask",
      image: "\uD83D\uDE37",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F912",
      name: "face with thermometer",
      image: "\uD83E\uDD12",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F915",
      name: "face with head-bandage",
      image: "\uD83E\uDD15",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F922",
      name: "nauseated face",
      image: "\uD83E\uDD22",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92E",
      name: "face vomiting",
      image: "\uD83E\uDD2E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F927",
      name: "sneezing face",
      image: "\uD83E\uDD27",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F975",
      name: "hot face",
      image: "\uD83E\uDD75",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F976",
      name: "cold face",
      image: "\uD83E\uDD76",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F974",
      name: "woozy face",
      image: "\uD83E\uDD74",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F635",
      name: "face with crossed-out eyes",
      image: "\uD83D\uDE35",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F635 U+200D U+1F4AB",
      name: "face with spiral eyes",
      image: "\uD83D\uDE35‍\uD83D\uDCAB",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92F",
      name: "exploding head",
      image: "\uD83E\uDD2F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F920",
      name: "cowboy hat face",
      image: "\uD83E\uDD20",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F973",
      name: "partying face",
      image: "\uD83E\uDD73",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F978",
      name: "disguised face",
      image: "\uD83E\uDD78",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F60E",
      name: "smiling face with sunglasses",
      image: "\uD83D\uDE0E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F913",
      name: "nerd face",
      image: "\uD83E\uDD13",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F9D0",
      name: "face with monocle",
      image: "\uD83E\uDDD0",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F615",
      name: "confused face",
      image: "\uD83D\uDE15",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1FAE4",
      name: "face with diagonal mouth",
      image: "\uD83E\uDEE4",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61F",
      name: "worried face",
      image: "\uD83D\uDE1F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F641",
      name: "slightly frowning face",
      image: "\uD83D\uDE41",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2639",
      name: "frowning face",
      image: "☹",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62E",
      name: "face with open mouth",
      image: "\uD83D\uDE2E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62F",
      name: "hushed face",
      image: "\uD83D\uDE2F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F632",
      name: "astonished face",
      image: "\uD83D\uDE32",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F633",
      name: "flushed face",
      image: "\uD83D\uDE33",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F97A",
      name: "pleading face",
      image: "\uD83E\uDD7A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F979",
      name: "face holding back tears",
      image: "\uD83E\uDD79",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F626",
      name: "frowning face with open mouth",
      image: "\uD83D\uDE26",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F627",
      name: "anguished face",
      image: "\uD83D\uDE27",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F628",
      name: "fearful face",
      image: "\uD83D\uDE28",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F630",
      name: "anxious face with sweat",
      image: "\uD83D\uDE30",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F625",
      name: "sad but relieved face",
      image: "\uD83D\uDE25",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F622",
      name: "crying face",
      image: "\uD83D\uDE22",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62D",
      name: "loudly crying face",
      image: "\uD83D\uDE2D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F631",
      name: "face screaming in fear",
      image: "\uD83D\uDE31",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F616",
      name: "confounded face",
      image: "\uD83D\uDE16",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F623",
      name: "persevering face",
      image: "\uD83D\uDE23",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F61E",
      name: "disappointed face",
      image: "\uD83D\uDE1E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F613",
      name: "downcast face with sweat",
      image: "\uD83D\uDE13",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F629",
      name: "weary face",
      image: "\uD83D\uDE29",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F62B",
      name: "tired face",
      image: "\uD83D\uDE2B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F971",
      name: "yawning face",
      image: "\uD83E\uDD71",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F624",
      name: "face with steam from nose",
      image: "\uD83D\uDE24",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F621",
      name: "enraged face",
      image: "\uD83D\uDE21",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F620",
      name: "angry face",
      image: "\uD83D\uDE20",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F92C",
      name: "face with symbols on mouth",
      image: "\uD83E\uDD2C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F608",
      name: "smiling face with horns",
      image: "\uD83D\uDE08",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47F",
      name: "angry face with horns",
      image: "\uD83D\uDC7F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F480",
      name: "skull",
      image: "\uD83D\uDC80",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2620",
      name: "skull and crossbones",
      image: "☠",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A9",
      name: "pile of poo",
      image: "\uD83D\uDCA9",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F921",
      name: "clown face",
      image: "\uD83E\uDD21",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F479",
      name: "ogre",
      image: "\uD83D\uDC79",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47A",
      name: "goblin",
      image: "\uD83D\uDC7A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47B",
      name: "ghost",
      image: "\uD83D\uDC7B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47D",
      name: "alien",
      image: "\uD83D\uDC7D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F47E",
      name: "alien monster",
      image: "\uD83D\uDC7E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F916",
      name: "robot",
      image: "\uD83E\uDD16",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63A",
      name: "grinning cat",
      image: "\uD83D\uDE3A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F638",
      name: "grinning cat with smiling eyes",
      image: "\uD83D\uDE38",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F639",
      name: "cat with tears of joy",
      image: "\uD83D\uDE39",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63B",
      name: "smiling cat with heart-eyes",
      image: "\uD83D\uDE3B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63C",
      name: "cat with wry smile",
      image: "\uD83D\uDE3C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63D",
      name: "kissing cat",
      image: "\uD83D\uDE3D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F640",
      name: "weary cat",
      image: "\uD83D\uDE40",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63F",
      name: "crying cat",
      image: "\uD83D\uDE3F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F63E",
      name: "pouting cat",
      image: "\uD83D\uDE3E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F648",
      name: "see-no-evil monkey",
      image: "\uD83D\uDE48",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F649",
      name: "hear-no-evil monkey",
      image: "\uD83D\uDE49",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F64A",
      name: "speak-no-evil monkey",
      image: "\uD83D\uDE4A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F48C",
      name: "love letter",
      image: "\uD83D\uDC8C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F498",
      name: "heart with arrow",
      image: "\uD83D\uDC98",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49D",
      name: "heart with ribbon",
      image: "\uD83D\uDC9D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F496",
      name: "sparkling heart",
      image: "\uD83D\uDC96",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F497",
      name: "growing heart",
      image: "\uD83D\uDC97",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F493",
      name: "beating heart",
      image: "\uD83D\uDC93",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49E",
      name: "revolving hearts",
      image: "\uD83D\uDC9E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F495",
      name: "two hearts",
      image: "\uD83D\uDC95",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49F",
      name: "heart decoration",
      image: "\uD83D\uDC9F",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2763",
      name: "heart exclamation",
      image: "❣",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F494",
      name: "broken heart",
      image: "\uD83D\uDC94",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2764 U+FE0F U+200D U+1F525",
      name: "heart on fire",
      image: "❤️‍\uD83D\uDD25",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2764 U+FE0F U+200D U+1FA79",
      name: "mending heart",
      image: "❤️‍\uD83E\uDE79",
      category: "Smileys & Emotion"
    },
    {
      code: "U+2764",
      name: "red heart",
      image: "❤",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F9E1",
      name: "orange heart",
      image: "\uD83E\uDDE1",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49B",
      name: "yellow heart",
      image: "\uD83D\uDC9B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49A",
      name: "green heart",
      image: "\uD83D\uDC9A",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F499",
      name: "blue heart",
      image: "\uD83D\uDC99",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F49C",
      name: "purple heart",
      image: "\uD83D\uDC9C",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F90E",
      name: "brown heart",
      image: "\uD83E\uDD0E",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F5A4",
      name: "black heart",
      image: "\uD83D\uDDA4",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F90D",
      name: "white heart",
      image: "\uD83E\uDD0D",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F48B",
      name: "kiss mark",
      image: "\uD83D\uDC8B",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4AF",
      name: "hundred points",
      image: "\uD83D\uDCAF",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A2",
      name: "anger symbol",
      image: "\uD83D\uDCA2",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A5",
      name: "collision",
      image: "\uD83D\uDCA5",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4AB",
      name: "dizzy",
      image: "\uD83D\uDCAB",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A6",
      name: "sweat droplets",
      image: "\uD83D\uDCA6",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A8",
      name: "dashing away",
      image: "\uD83D\uDCA8",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F573",
      name: "hole",
      image: "\uD83D\uDD73",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4AC",
      name: "speech balloon",
      image: "\uD83D\uDCAC",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F441 U+FE0F U+200D U+1F5E8 U+FE0F",
      name: "eye in speech bubble",
      image: "\uD83D\uDC41️‍\uD83D\uDDE8️",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F5E8",
      name: "left speech bubble",
      image: "\uD83D\uDDE8",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F5EF",
      name: "right anger bubble",
      image: "\uD83D\uDDEF",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4AD",
      name: "thought balloon",
      image: "\uD83D\uDCAD",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F4A4",
      name: "ZZZ",
      image: "\uD83D\uDCA4",
      category: "Smileys & Emotion"
    },
    {
      code: "U+1F44B",
      name: "waving hand",
      image: "\uD83D\uDC4B",
      category: "People & Body"
    },
    {
      code: "U+1F91A",
      name: "raised back of hand",
      image: "\uD83E\uDD1A",
      category: "People & Body"
    },
    {
      code: "U+1F590",
      name: "hand with fingers splayed",
      image: "\uD83D\uDD90",
      category: "People & Body"
    },
    {
      code: "U+270B",
      name: "raised hand",
      image: "✋",
      category: "People & Body"
    },
    {
      code: "U+1F596",
      name: "vulcan salute",
      image: "\uD83D\uDD96",
      category: "People & Body"
    },
    {
      code: "U+1FAF1",
      name: "rightwards hand",
      image: "\uD83E\uDEF1",
      category: "People & Body"
    },
    {
      code: "U+1FAF2",
      name: "leftwards hand",
      image: "\uD83E\uDEF2",
      category: "People & Body"
    },
    {
      code: "U+1FAF3",
      name: "palm down hand",
      image: "\uD83E\uDEF3",
      category: "People & Body"
    },
    {
      code: "U+1FAF4",
      name: "palm up hand",
      image: "\uD83E\uDEF4",
      category: "People & Body"
    },
    {
      code: "U+1F44C",
      name: "OK hand",
      image: "\uD83D\uDC4C",
      category: "People & Body"
    },
    {
      code: "U+1F90C",
      name: "pinched fingers",
      image: "\uD83E\uDD0C",
      category: "People & Body"
    },
    {
      code: "U+1F90F",
      name: "pinching hand",
      image: "\uD83E\uDD0F",
      category: "People & Body"
    },
    {
      code: "U+270C",
      name: "victory hand",
      image: "✌",
      category: "People & Body"
    },
    {
      code: "U+1F91E",
      name: "crossed fingers",
      image: "\uD83E\uDD1E",
      category: "People & Body"
    },
    {
      code: "U+1FAF0",
      name: "hand with index finger and thumb crossed",
      image: "\uD83E\uDEF0",
      category: "People & Body"
    },
    {
      code: "U+1F91F",
      name: "love-you gesture",
      image: "\uD83E\uDD1F",
      category: "People & Body"
    },
    {
      code: "U+1F918",
      name: "sign of the horns",
      image: "\uD83E\uDD18",
      category: "People & Body"
    },
    {
      code: "U+1F919",
      name: "call me hand",
      image: "\uD83E\uDD19",
      category: "People & Body"
    },
    {
      code: "U+1F448",
      name: "backhand index pointing left",
      image: "\uD83D\uDC48",
      category: "People & Body"
    },
    {
      code: "U+1F449",
      name: "backhand index pointing right",
      image: "\uD83D\uDC49",
      category: "People & Body"
    },
    {
      code: "U+1F446",
      name: "backhand index pointing up",
      image: "\uD83D\uDC46",
      category: "People & Body"
    },
    {
      code: "U+1F595",
      name: "middle finger",
      image: "\uD83D\uDD95",
      category: "People & Body"
    },
    {
      code: "U+1F447",
      name: "backhand index pointing down",
      image: "\uD83D\uDC47",
      category: "People & Body"
    },
    {
      code: "U+261D",
      name: "index pointing up",
      image: "☝",
      category: "People & Body"
    },
    {
      code: "U+1FAF5",
      name: "index pointing at the viewer",
      image: "\uD83E\uDEF5",
      category: "People & Body"
    },
    {
      code: "U+1F44D",
      name: "thumbs up",
      image: "\uD83D\uDC4D",
      category: "People & Body"
    },
    {
      code: "U+1F44E",
      name: "thumbs down",
      image: "\uD83D\uDC4E",
      category: "People & Body"
    },
    {
      code: "U+270A",
      name: "raised fist",
      image: "✊",
      category: "People & Body"
    },
    {
      code: "U+1F44A",
      name: "oncoming fist",
      image: "\uD83D\uDC4A",
      category: "People & Body"
    },
    {
      code: "U+1F91B",
      name: "left-facing fist",
      image: "\uD83E\uDD1B",
      category: "People & Body"
    },
    {
      code: "U+1F91C",
      name: "right-facing fist",
      image: "\uD83E\uDD1C",
      category: "People & Body"
    },
    {
      code: "U+1F44F",
      name: "clapping hands",
      image: "\uD83D\uDC4F",
      category: "People & Body"
    },
    {
      code: "U+1F64C",
      name: "raising hands",
      image: "\uD83D\uDE4C",
      category: "People & Body"
    },
    {
      code: "U+1FAF6",
      name: "heart hands",
      image: "\uD83E\uDEF6",
      category: "People & Body"
    },
    {
      code: "U+1F450",
      name: "open hands",
      image: "\uD83D\uDC50",
      category: "People & Body"
    },
    {
      code: "U+1F932",
      name: "palms up together",
      image: "\uD83E\uDD32",
      category: "People & Body"
    },
    {
      code: "U+1F91D",
      name: "handshake",
      image: "\uD83E\uDD1D",
      category: "People & Body"
    },
    {
      code: "U+1F64F",
      name: "folded hands",
      image: "\uD83D\uDE4F",
      category: "People & Body"
    },
    {
      code: "U+270D",
      name: "writing hand",
      image: "✍",
      category: "People & Body"
    },
    {
      code: "U+1F485",
      name: "nail polish",
      image: "\uD83D\uDC85",
      category: "People & Body"
    },
    {
      code: "U+1F933",
      name: "selfie",
      image: "\uD83E\uDD33",
      category: "People & Body"
    },
    {
      code: "U+1F4AA",
      name: "flexed biceps",
      image: "\uD83D\uDCAA",
      category: "People & Body"
    },
    {
      code: "U+1F9BE",
      name: "mechanical arm",
      image: "\uD83E\uDDBE",
      category: "People & Body"
    },
    {
      code: "U+1F9BF",
      name: "mechanical leg",
      image: "\uD83E\uDDBF",
      category: "People & Body"
    },
    {
      code: "U+1F9B5",
      name: "leg",
      image: "\uD83E\uDDB5",
      category: "People & Body"
    },
    {
      code: "U+1F9B6",
      name: "foot",
      image: "\uD83E\uDDB6",
      category: "People & Body"
    },
    {
      code: "U+1F442",
      name: "ear",
      image: "\uD83D\uDC42",
      category: "People & Body"
    },
    {
      code: "U+1F9BB",
      name: "ear with hearing aid",
      image: "\uD83E\uDDBB",
      category: "People & Body"
    },
    {
      code: "U+1F443",
      name: "nose",
      image: "\uD83D\uDC43",
      category: "People & Body"
    },
    {
      code: "U+1F9E0",
      name: "brain",
      image: "\uD83E\uDDE0",
      category: "People & Body"
    },
    {
      code: "U+1FAC0",
      name: "anatomical heart",
      image: "\uD83E\uDEC0",
      category: "People & Body"
    },
    {
      code: "U+1FAC1",
      name: "lungs",
      image: "\uD83E\uDEC1",
      category: "People & Body"
    },
    {
      code: "U+1F9B7",
      name: "tooth",
      image: "\uD83E\uDDB7",
      category: "People & Body"
    },
    {
      code: "U+1F9B4",
      name: "bone",
      image: "\uD83E\uDDB4",
      category: "People & Body"
    },
    {
      code: "U+1F440",
      name: "eyes",
      image: "\uD83D\uDC40",
      category: "People & Body"
    },
    {
      code: "U+1F441",
      name: "eye",
      image: "\uD83D\uDC41",
      category: "People & Body"
    },
    {
      code: "U+1F445",
      name: "tongue",
      image: "\uD83D\uDC45",
      category: "People & Body"
    },
    {
      code: "U+1F444",
      name: "mouth",
      image: "\uD83D\uDC44",
      category: "People & Body"
    },
    {
      code: "U+1FAE6",
      name: "biting lip",
      image: "\uD83E\uDEE6",
      category: "People & Body"
    },
    {
      code: "U+1F476",
      name: "baby",
      image: "\uD83D\uDC76",
      category: "People & Body"
    },
    {
      code: "U+1F9D2",
      name: "child",
      image: "\uD83E\uDDD2",
      category: "People & Body"
    },
    {
      code: "U+1F466",
      name: "boy",
      image: "\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F467",
      name: "girl",
      image: "\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F9D1",
      name: "person",
      image: "\uD83E\uDDD1",
      category: "People & Body"
    },
    {
      code: "U+1F471",
      name: "person: blond hair",
      image: "\uD83D\uDC71",
      category: "People & Body"
    },
    {
      code: "U+1F468",
      name: "man",
      image: "\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F9D4",
      name: "person: beard",
      image: "\uD83E\uDDD4",
      category: "People & Body"
    },
    {
      code: "U+1F9D4 U+200D U+2642 U+FE0F",
      name: "man: beard",
      image: "\uD83E\uDDD4‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D4 U+200D U+2640 U+FE0F",
      name: "woman: beard",
      image: "\uD83E\uDDD4‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9B0",
      name: "man: red hair",
      image: "\uD83D\uDC68‍\uD83E\uDDB0",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9B1",
      name: "man: curly hair",
      image: "\uD83D\uDC68‍\uD83E\uDDB1",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9B3",
      name: "man: white hair",
      image: "\uD83D\uDC68‍\uD83E\uDDB3",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9B2",
      name: "man: bald",
      image: "\uD83D\uDC68‍\uD83E\uDDB2",
      category: "People & Body"
    },
    {
      code: "U+1F469",
      name: "woman",
      image: "\uD83D\uDC69",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9B0",
      name: "woman: red hair",
      image: "\uD83D\uDC69‍\uD83E\uDDB0",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9B0",
      name: "person: red hair",
      image: "\uD83E\uDDD1‍\uD83E\uDDB0",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9B1",
      name: "woman: curly hair",
      image: "\uD83D\uDC69‍\uD83E\uDDB1",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9B1",
      name: "person: curly hair",
      image: "\uD83E\uDDD1‍\uD83E\uDDB1",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9B3",
      name: "woman: white hair",
      image: "\uD83D\uDC69‍\uD83E\uDDB3",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9B3",
      name: "person: white hair",
      image: "\uD83E\uDDD1‍\uD83E\uDDB3",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9B2",
      name: "woman: bald",
      image: "\uD83D\uDC69‍\uD83E\uDDB2",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9B2",
      name: "person: bald",
      image: "\uD83E\uDDD1‍\uD83E\uDDB2",
      category: "People & Body"
    },
    {
      code: "U+1F471 U+200D U+2640 U+FE0F",
      name: "woman: blond hair",
      image: "\uD83D\uDC71‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F471 U+200D U+2642 U+FE0F",
      name: "man: blond hair",
      image: "\uD83D\uDC71‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D3",
      name: "older person",
      image: "\uD83E\uDDD3",
      category: "People & Body"
    },
    {
      code: "U+1F474",
      name: "old man",
      image: "\uD83D\uDC74",
      category: "People & Body"
    },
    {
      code: "U+1F475",
      name: "old woman",
      image: "\uD83D\uDC75",
      category: "People & Body"
    },
    {
      code: "U+1F64D",
      name: "person frowning",
      image: "\uD83D\uDE4D",
      category: "People & Body"
    },
    {
      code: "U+1F64D U+200D U+2642 U+FE0F",
      name: "man frowning",
      image: "\uD83D\uDE4D‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F64D U+200D U+2640 U+FE0F",
      name: "woman frowning",
      image: "\uD83D\uDE4D‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F64E",
      name: "person pouting",
      image: "\uD83D\uDE4E",
      category: "People & Body"
    },
    {
      code: "U+1F64E U+200D U+2642 U+FE0F",
      name: "man pouting",
      image: "\uD83D\uDE4E‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F64E U+200D U+2640 U+FE0F",
      name: "woman pouting",
      image: "\uD83D\uDE4E‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F645",
      name: "person gesturing NO",
      image: "\uD83D\uDE45",
      category: "People & Body"
    },
    {
      code: "U+1F645 U+200D U+2642 U+FE0F",
      name: "man gesturing NO",
      image: "\uD83D\uDE45‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F645 U+200D U+2640 U+FE0F",
      name: "woman gesturing NO",
      image: "\uD83D\uDE45‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F646",
      name: "person gesturing OK",
      image: "\uD83D\uDE46",
      category: "People & Body"
    },
    {
      code: "U+1F646 U+200D U+2642 U+FE0F",
      name: "man gesturing OK",
      image: "\uD83D\uDE46‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F646 U+200D U+2640 U+FE0F",
      name: "woman gesturing OK",
      image: "\uD83D\uDE46‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F481",
      name: "person tipping hand",
      image: "\uD83D\uDC81",
      category: "People & Body"
    },
    {
      code: "U+1F481 U+200D U+2642 U+FE0F",
      name: "man tipping hand",
      image: "\uD83D\uDC81‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F481 U+200D U+2640 U+FE0F",
      name: "woman tipping hand",
      image: "\uD83D\uDC81‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F64B",
      name: "person raising hand",
      image: "\uD83D\uDE4B",
      category: "People & Body"
    },
    {
      code: "U+1F64B U+200D U+2642 U+FE0F",
      name: "man raising hand",
      image: "\uD83D\uDE4B‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F64B U+200D U+2640 U+FE0F",
      name: "woman raising hand",
      image: "\uD83D\uDE4B‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9CF",
      name: "deaf person",
      image: "\uD83E\uDDCF",
      category: "People & Body"
    },
    {
      code: "U+1F9CF U+200D U+2642 U+FE0F",
      name: "deaf man",
      image: "\uD83E\uDDCF‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9CF U+200D U+2640 U+FE0F",
      name: "deaf woman",
      image: "\uD83E\uDDCF‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F647",
      name: "person bowing",
      image: "\uD83D\uDE47",
      category: "People & Body"
    },
    {
      code: "U+1F647 U+200D U+2642 U+FE0F",
      name: "man bowing",
      image: "\uD83D\uDE47‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F647 U+200D U+2640 U+FE0F",
      name: "woman bowing",
      image: "\uD83D\uDE47‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F926",
      name: "person facepalming",
      image: "\uD83E\uDD26",
      category: "People & Body"
    },
    {
      code: "U+1F926 U+200D U+2642 U+FE0F",
      name: "man facepalming",
      image: "\uD83E\uDD26‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F926 U+200D U+2640 U+FE0F",
      name: "woman facepalming",
      image: "\uD83E\uDD26‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F937",
      name: "person shrugging",
      image: "\uD83E\uDD37",
      category: "People & Body"
    },
    {
      code: "U+1F937 U+200D U+2642 U+FE0F",
      name: "man shrugging",
      image: "\uD83E\uDD37‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F937 U+200D U+2640 U+FE0F",
      name: "woman shrugging",
      image: "\uD83E\uDD37‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+2695 U+FE0F",
      name: "health worker",
      image: "\uD83E\uDDD1‍⚕️",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2695 U+FE0F",
      name: "man health worker",
      image: "\uD83D\uDC68‍⚕️",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2695 U+FE0F",
      name: "woman health worker",
      image: "\uD83D\uDC69‍⚕️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F393",
      name: "student",
      image: "\uD83E\uDDD1‍\uD83C\uDF93",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F393",
      name: "man student",
      image: "\uD83D\uDC68‍\uD83C\uDF93",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F393",
      name: "woman student",
      image: "\uD83D\uDC69‍\uD83C\uDF93",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F3EB",
      name: "teacher",
      image: "\uD83E\uDDD1‍\uD83C\uDFEB",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F3EB",
      name: "man teacher",
      image: "\uD83D\uDC68‍\uD83C\uDFEB",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F3EB",
      name: "woman teacher",
      image: "\uD83D\uDC69‍\uD83C\uDFEB",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+2696 U+FE0F",
      name: "judge",
      image: "\uD83E\uDDD1‍⚖️",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2696 U+FE0F",
      name: "man judge",
      image: "\uD83D\uDC68‍⚖️",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2696 U+FE0F",
      name: "woman judge",
      image: "\uD83D\uDC69‍⚖️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F33E",
      name: "farmer",
      image: "\uD83E\uDDD1‍\uD83C\uDF3E",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F33E",
      name: "man farmer",
      image: "\uD83D\uDC68‍\uD83C\uDF3E",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F33E",
      name: "woman farmer",
      image: "\uD83D\uDC69‍\uD83C\uDF3E",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F373",
      name: "cook",
      image: "\uD83E\uDDD1‍\uD83C\uDF73",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F373",
      name: "man cook",
      image: "\uD83D\uDC68‍\uD83C\uDF73",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F373",
      name: "woman cook",
      image: "\uD83D\uDC69‍\uD83C\uDF73",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F527",
      name: "mechanic",
      image: "\uD83E\uDDD1‍\uD83D\uDD27",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F527",
      name: "man mechanic",
      image: "\uD83D\uDC68‍\uD83D\uDD27",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F527",
      name: "woman mechanic",
      image: "\uD83D\uDC69‍\uD83D\uDD27",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F3ED",
      name: "factory worker",
      image: "\uD83E\uDDD1‍\uD83C\uDFED",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F3ED",
      name: "man factory worker",
      image: "\uD83D\uDC68‍\uD83C\uDFED",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F3ED",
      name: "woman factory worker",
      image: "\uD83D\uDC69‍\uD83C\uDFED",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F4BC",
      name: "office worker",
      image: "\uD83E\uDDD1‍\uD83D\uDCBC",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F4BC",
      name: "man office worker",
      image: "\uD83D\uDC68‍\uD83D\uDCBC",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F4BC",
      name: "woman office worker",
      image: "\uD83D\uDC69‍\uD83D\uDCBC",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F52C",
      name: "scientist",
      image: "\uD83E\uDDD1‍\uD83D\uDD2C",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F52C",
      name: "man scientist",
      image: "\uD83D\uDC68‍\uD83D\uDD2C",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F52C",
      name: "woman scientist",
      image: "\uD83D\uDC69‍\uD83D\uDD2C",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F4BB",
      name: "technologist",
      image: "\uD83E\uDDD1‍\uD83D\uDCBB",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F4BB",
      name: "man technologist",
      image: "\uD83D\uDC68‍\uD83D\uDCBB",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F4BB",
      name: "woman technologist",
      image: "\uD83D\uDC69‍\uD83D\uDCBB",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F3A4",
      name: "singer",
      image: "\uD83E\uDDD1‍\uD83C\uDFA4",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F3A4",
      name: "man singer",
      image: "\uD83D\uDC68‍\uD83C\uDFA4",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F3A4",
      name: "woman singer",
      image: "\uD83D\uDC69‍\uD83C\uDFA4",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F3A8",
      name: "artist",
      image: "\uD83E\uDDD1‍\uD83C\uDFA8",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F3A8",
      name: "man artist",
      image: "\uD83D\uDC68‍\uD83C\uDFA8",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F3A8",
      name: "woman artist",
      image: "\uD83D\uDC69‍\uD83C\uDFA8",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+2708 U+FE0F",
      name: "pilot",
      image: "\uD83E\uDDD1‍✈️",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2708 U+FE0F",
      name: "man pilot",
      image: "\uD83D\uDC68‍✈️",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2708 U+FE0F",
      name: "woman pilot",
      image: "\uD83D\uDC69‍✈️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F680",
      name: "astronaut",
      image: "\uD83E\uDDD1‍\uD83D\uDE80",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F680",
      name: "man astronaut",
      image: "\uD83D\uDC68‍\uD83D\uDE80",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F680",
      name: "woman astronaut",
      image: "\uD83D\uDC69‍\uD83D\uDE80",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F692",
      name: "firefighter",
      image: "\uD83E\uDDD1‍\uD83D\uDE92",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F692",
      name: "man firefighter",
      image: "\uD83D\uDC68‍\uD83D\uDE92",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F692",
      name: "woman firefighter",
      image: "\uD83D\uDC69‍\uD83D\uDE92",
      category: "People & Body"
    },
    {
      code: "U+1F46E",
      name: "police officer",
      image: "\uD83D\uDC6E",
      category: "People & Body"
    },
    {
      code: "U+1F46E U+200D U+2642 U+FE0F",
      name: "man police officer",
      image: "\uD83D\uDC6E‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F46E U+200D U+2640 U+FE0F",
      name: "woman police officer",
      image: "\uD83D\uDC6E‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F575",
      name: "detective",
      image: "\uD83D\uDD75",
      category: "People & Body"
    },
    {
      code: "U+1F575 U+FE0F U+200D U+2642 U+FE0F",
      name: "man detective",
      image: "\uD83D\uDD75️‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F575 U+FE0F U+200D U+2640 U+FE0F",
      name: "woman detective",
      image: "\uD83D\uDD75️‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F482",
      name: "guard",
      image: "\uD83D\uDC82",
      category: "People & Body"
    },
    {
      code: "U+1F482 U+200D U+2642 U+FE0F",
      name: "man guard",
      image: "\uD83D\uDC82‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F482 U+200D U+2640 U+FE0F",
      name: "woman guard",
      image: "\uD83D\uDC82‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F977",
      name: "ninja",
      image: "\uD83E\uDD77",
      category: "People & Body"
    },
    {
      code: "U+1F477",
      name: "construction worker",
      image: "\uD83D\uDC77",
      category: "People & Body"
    },
    {
      code: "U+1F477 U+200D U+2642 U+FE0F",
      name: "man construction worker",
      image: "\uD83D\uDC77‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F477 U+200D U+2640 U+FE0F",
      name: "woman construction worker",
      image: "\uD83D\uDC77‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1FAC5",
      name: "person with crown",
      image: "\uD83E\uDEC5",
      category: "People & Body"
    },
    {
      code: "U+1F934",
      name: "prince",
      image: "\uD83E\uDD34",
      category: "People & Body"
    },
    {
      code: "U+1F478",
      name: "princess",
      image: "\uD83D\uDC78",
      category: "People & Body"
    },
    {
      code: "U+1F473",
      name: "person wearing turban",
      image: "\uD83D\uDC73",
      category: "People & Body"
    },
    {
      code: "U+1F473 U+200D U+2642 U+FE0F",
      name: "man wearing turban",
      image: "\uD83D\uDC73‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F473 U+200D U+2640 U+FE0F",
      name: "woman wearing turban",
      image: "\uD83D\uDC73‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F472",
      name: "person with skullcap",
      image: "\uD83D\uDC72",
      category: "People & Body"
    },
    {
      code: "U+1F9D5",
      name: "woman with headscarf",
      image: "\uD83E\uDDD5",
      category: "People & Body"
    },
    {
      code: "U+1F935",
      name: "person in tuxedo",
      image: "\uD83E\uDD35",
      category: "People & Body"
    },
    {
      code: "U+1F935 U+200D U+2642 U+FE0F",
      name: "man in tuxedo",
      image: "\uD83E\uDD35‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F935 U+200D U+2640 U+FE0F",
      name: "woman in tuxedo",
      image: "\uD83E\uDD35‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F470",
      name: "person with veil",
      image: "\uD83D\uDC70",
      category: "People & Body"
    },
    {
      code: "U+1F470 U+200D U+2642 U+FE0F",
      name: "man with veil",
      image: "\uD83D\uDC70‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F470 U+200D U+2640 U+FE0F",
      name: "woman with veil",
      image: "\uD83D\uDC70‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F930",
      name: "pregnant woman",
      image: "\uD83E\uDD30",
      category: "People & Body"
    },
    {
      code: "U+1FAC3",
      name: "pregnant man",
      image: "\uD83E\uDEC3",
      category: "People & Body"
    },
    {
      code: "U+1FAC4",
      name: "pregnant person",
      image: "\uD83E\uDEC4",
      category: "People & Body"
    },
    {
      code: "U+1F931",
      name: "breast-feeding",
      image: "\uD83E\uDD31",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F37C",
      name: "woman feeding baby",
      image: "\uD83D\uDC69‍\uD83C\uDF7C",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F37C",
      name: "man feeding baby",
      image: "\uD83D\uDC68‍\uD83C\uDF7C",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F37C",
      name: "person feeding baby",
      image: "\uD83E\uDDD1‍\uD83C\uDF7C",
      category: "People & Body"
    },
    {
      code: "U+1F47C",
      name: "baby angel",
      image: "\uD83D\uDC7C",
      category: "People & Body"
    },
    {
      code: "U+1F385",
      name: "Santa Claus",
      image: "\uD83C\uDF85",
      category: "People & Body"
    },
    {
      code: "U+1F936",
      name: "Mrs. Claus",
      image: "\uD83E\uDD36",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F384",
      name: "mx claus",
      image: "\uD83E\uDDD1‍\uD83C\uDF84",
      category: "People & Body"
    },
    {
      code: "U+1F9B8",
      name: "superhero",
      image: "\uD83E\uDDB8",
      category: "People & Body"
    },
    {
      code: "U+1F9B8 U+200D U+2642 U+FE0F",
      name: "man superhero",
      image: "\uD83E\uDDB8‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9B8 U+200D U+2640 U+FE0F",
      name: "woman superhero",
      image: "\uD83E\uDDB8‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9B9",
      name: "supervillain",
      image: "\uD83E\uDDB9",
      category: "People & Body"
    },
    {
      code: "U+1F9B9 U+200D U+2642 U+FE0F",
      name: "man supervillain",
      image: "\uD83E\uDDB9‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9B9 U+200D U+2640 U+FE0F",
      name: "woman supervillain",
      image: "\uD83E\uDDB9‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D9",
      name: "mage",
      image: "\uD83E\uDDD9",
      category: "People & Body"
    },
    {
      code: "U+1F9D9 U+200D U+2642 U+FE0F",
      name: "man mage",
      image: "\uD83E\uDDD9‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D9 U+200D U+2640 U+FE0F",
      name: "woman mage",
      image: "\uD83E\uDDD9‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DA",
      name: "fairy",
      image: "\uD83E\uDDDA",
      category: "People & Body"
    },
    {
      code: "U+1F9DA U+200D U+2642 U+FE0F",
      name: "man fairy",
      image: "\uD83E\uDDDA‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DA U+200D U+2640 U+FE0F",
      name: "woman fairy",
      image: "\uD83E\uDDDA‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DB",
      name: "vampire",
      image: "\uD83E\uDDDB",
      category: "People & Body"
    },
    {
      code: "U+1F9DB U+200D U+2642 U+FE0F",
      name: "man vampire",
      image: "\uD83E\uDDDB‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DB U+200D U+2640 U+FE0F",
      name: "woman vampire",
      image: "\uD83E\uDDDB‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DC",
      name: "merperson",
      image: "\uD83E\uDDDC",
      category: "People & Body"
    },
    {
      code: "U+1F9DC U+200D U+2642 U+FE0F",
      name: "merman",
      image: "\uD83E\uDDDC‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DC U+200D U+2640 U+FE0F",
      name: "mermaid",
      image: "\uD83E\uDDDC‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DD",
      name: "elf",
      image: "\uD83E\uDDDD",
      category: "People & Body"
    },
    {
      code: "U+1F9DD U+200D U+2642 U+FE0F",
      name: "man elf",
      image: "\uD83E\uDDDD‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DD U+200D U+2640 U+FE0F",
      name: "woman elf",
      image: "\uD83E\uDDDD‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DE",
      name: "genie",
      image: "\uD83E\uDDDE",
      category: "People & Body"
    },
    {
      code: "U+1F9DE U+200D U+2642 U+FE0F",
      name: "man genie",
      image: "\uD83E\uDDDE‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DE U+200D U+2640 U+FE0F",
      name: "woman genie",
      image: "\uD83E\uDDDE‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9DF",
      name: "zombie",
      image: "\uD83E\uDDDF",
      category: "People & Body"
    },
    {
      code: "U+1F9DF U+200D U+2642 U+FE0F",
      name: "man zombie",
      image: "\uD83E\uDDDF‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9DF U+200D U+2640 U+FE0F",
      name: "woman zombie",
      image: "\uD83E\uDDDF‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9CC",
      name: "troll",
      image: "\uD83E\uDDCC",
      category: "People & Body"
    },
    {
      code: "U+1F486",
      name: "person getting massage",
      image: "\uD83D\uDC86",
      category: "People & Body"
    },
    {
      code: "U+1F486 U+200D U+2642 U+FE0F",
      name: "man getting massage",
      image: "\uD83D\uDC86‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F486 U+200D U+2640 U+FE0F",
      name: "woman getting massage",
      image: "\uD83D\uDC86‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F487",
      name: "person getting haircut",
      image: "\uD83D\uDC87",
      category: "People & Body"
    },
    {
      code: "U+1F487 U+200D U+2642 U+FE0F",
      name: "man getting haircut",
      image: "\uD83D\uDC87‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F487 U+200D U+2640 U+FE0F",
      name: "woman getting haircut",
      image: "\uD83D\uDC87‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6B6",
      name: "person walking",
      image: "\uD83D\uDEB6",
      category: "People & Body"
    },
    {
      code: "U+1F6B6 U+200D U+2642 U+FE0F",
      name: "man walking",
      image: "\uD83D\uDEB6‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F6B6 U+200D U+2640 U+FE0F",
      name: "woman walking",
      image: "\uD83D\uDEB6‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9CD",
      name: "person standing",
      image: "\uD83E\uDDCD",
      category: "People & Body"
    },
    {
      code: "U+1F9CD U+200D U+2642 U+FE0F",
      name: "man standing",
      image: "\uD83E\uDDCD‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9CD U+200D U+2640 U+FE0F",
      name: "woman standing",
      image: "\uD83E\uDDCD‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9CE",
      name: "person kneeling",
      image: "\uD83E\uDDCE",
      category: "People & Body"
    },
    {
      code: "U+1F9CE U+200D U+2642 U+FE0F",
      name: "man kneeling",
      image: "\uD83E\uDDCE‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9CE U+200D U+2640 U+FE0F",
      name: "woman kneeling",
      image: "\uD83E\uDDCE‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9AF",
      name: "person with white cane",
      image: "\uD83E\uDDD1‍\uD83E\uDDAF",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9AF",
      name: "man with white cane",
      image: "\uD83D\uDC68‍\uD83E\uDDAF",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9AF",
      name: "woman with white cane",
      image: "\uD83D\uDC69‍\uD83E\uDDAF",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9BC",
      name: "person in motorized wheelchair",
      image: "\uD83E\uDDD1‍\uD83E\uDDBC",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9BC",
      name: "man in motorized wheelchair",
      image: "\uD83D\uDC68‍\uD83E\uDDBC",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9BC",
      name: "woman in motorized wheelchair",
      image: "\uD83D\uDC69‍\uD83E\uDDBC",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F9BD",
      name: "person in manual wheelchair",
      image: "\uD83E\uDDD1‍\uD83E\uDDBD",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F9BD",
      name: "man in manual wheelchair",
      image: "\uD83D\uDC68‍\uD83E\uDDBD",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F9BD",
      name: "woman in manual wheelchair",
      image: "\uD83D\uDC69‍\uD83E\uDDBD",
      category: "People & Body"
    },
    {
      code: "U+1F3C3",
      name: "person running",
      image: "\uD83C\uDFC3",
      category: "People & Body"
    },
    {
      code: "U+1F3C3 U+200D U+2642 U+FE0F",
      name: "man running",
      image: "\uD83C\uDFC3‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3C3 U+200D U+2640 U+FE0F",
      name: "woman running",
      image: "\uD83C\uDFC3‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F483",
      name: "woman dancing",
      image: "\uD83D\uDC83",
      category: "People & Body"
    },
    {
      code: "U+1F57A",
      name: "man dancing",
      image: "\uD83D\uDD7A",
      category: "People & Body"
    },
    {
      code: "U+1F574",
      name: "person in suit levitating",
      image: "\uD83D\uDD74",
      category: "People & Body"
    },
    {
      code: "U+1F46F",
      name: "people with bunny ears",
      image: "\uD83D\uDC6F",
      category: "People & Body"
    },
    {
      code: "U+1F46F U+200D U+2642 U+FE0F",
      name: "men with bunny ears",
      image: "\uD83D\uDC6F‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F46F U+200D U+2640 U+FE0F",
      name: "women with bunny ears",
      image: "\uD83D\uDC6F‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D6",
      name: "person in steamy room",
      image: "\uD83E\uDDD6",
      category: "People & Body"
    },
    {
      code: "U+1F9D6 U+200D U+2642 U+FE0F",
      name: "man in steamy room",
      image: "\uD83E\uDDD6‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D6 U+200D U+2640 U+FE0F",
      name: "woman in steamy room",
      image: "\uD83E\uDDD6‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D7",
      name: "person climbing",
      image: "\uD83E\uDDD7",
      category: "People & Body"
    },
    {
      code: "U+1F9D7 U+200D U+2642 U+FE0F",
      name: "man climbing",
      image: "\uD83E\uDDD7‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D7 U+200D U+2640 U+FE0F",
      name: "woman climbing",
      image: "\uD83E\uDDD7‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F93A",
      name: "person fencing",
      image: "\uD83E\uDD3A",
      category: "People & Body"
    },
    {
      code: "U+1F3C7",
      name: "horse racing",
      image: "\uD83C\uDFC7",
      category: "People & Body"
    },
    {
      code: "U+26F7",
      name: "skier",
      image: "⛷",
      category: "People & Body"
    },
    {
      code: "U+1F3C2",
      name: "snowboarder",
      image: "\uD83C\uDFC2",
      category: "People & Body"
    },
    {
      code: "U+1F3CC",
      name: "person golfing",
      image: "\uD83C\uDFCC",
      category: "People & Body"
    },
    {
      code: "U+1F3CC U+FE0F U+200D U+2642 U+FE0F",
      name: "man golfing",
      image: "\uD83C\uDFCC️‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3CC U+FE0F U+200D U+2640 U+FE0F",
      name: "woman golfing",
      image: "\uD83C\uDFCC️‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F3C4",
      name: "person surfing",
      image: "\uD83C\uDFC4",
      category: "People & Body"
    },
    {
      code: "U+1F3C4 U+200D U+2642 U+FE0F",
      name: "man surfing",
      image: "\uD83C\uDFC4‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3C4 U+200D U+2640 U+FE0F",
      name: "woman surfing",
      image: "\uD83C\uDFC4‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6A3",
      name: "person rowing boat",
      image: "\uD83D\uDEA3",
      category: "People & Body"
    },
    {
      code: "U+1F6A3 U+200D U+2642 U+FE0F",
      name: "man rowing boat",
      image: "\uD83D\uDEA3‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F6A3 U+200D U+2640 U+FE0F",
      name: "woman rowing boat",
      image: "\uD83D\uDEA3‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F3CA",
      name: "person swimming",
      image: "\uD83C\uDFCA",
      category: "People & Body"
    },
    {
      code: "U+1F3CA U+200D U+2642 U+FE0F",
      name: "man swimming",
      image: "\uD83C\uDFCA‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3CA U+200D U+2640 U+FE0F",
      name: "woman swimming",
      image: "\uD83C\uDFCA‍♀️",
      category: "People & Body"
    },
    {
      code: "U+26F9",
      name: "person bouncing ball",
      image: "⛹",
      category: "People & Body"
    },
    {
      code: "U+26F9 U+FE0F U+200D U+2642 U+FE0F",
      name: "man bouncing ball",
      image: "⛹️‍♂️",
      category: "People & Body"
    },
    {
      code: "U+26F9 U+FE0F U+200D U+2640 U+FE0F",
      name: "woman bouncing ball",
      image: "⛹️‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F3CB",
      name: "person lifting weights",
      image: "\uD83C\uDFCB",
      category: "People & Body"
    },
    {
      code: "U+1F3CB U+FE0F U+200D U+2642 U+FE0F",
      name: "man lifting weights",
      image: "\uD83C\uDFCB️‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F3CB U+FE0F U+200D U+2640 U+FE0F",
      name: "woman lifting weights",
      image: "\uD83C\uDFCB️‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6B4",
      name: "person biking",
      image: "\uD83D\uDEB4",
      category: "People & Body"
    },
    {
      code: "U+1F6B4 U+200D U+2642 U+FE0F",
      name: "man biking",
      image: "\uD83D\uDEB4‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F6B4 U+200D U+2640 U+FE0F",
      name: "woman biking",
      image: "\uD83D\uDEB4‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6B5",
      name: "person mountain biking",
      image: "\uD83D\uDEB5",
      category: "People & Body"
    },
    {
      code: "U+1F6B5 U+200D U+2642 U+FE0F",
      name: "man mountain biking",
      image: "\uD83D\uDEB5‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F6B5 U+200D U+2640 U+FE0F",
      name: "woman mountain biking",
      image: "\uD83D\uDEB5‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F938",
      name: "person cartwheeling",
      image: "\uD83E\uDD38",
      category: "People & Body"
    },
    {
      code: "U+1F938 U+200D U+2642 U+FE0F",
      name: "man cartwheeling",
      image: "\uD83E\uDD38‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F938 U+200D U+2640 U+FE0F",
      name: "woman cartwheeling",
      image: "\uD83E\uDD38‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F93C",
      name: "people wrestling",
      image: "\uD83E\uDD3C",
      category: "People & Body"
    },
    {
      code: "U+1F93C U+200D U+2642 U+FE0F",
      name: "men wrestling",
      image: "\uD83E\uDD3C‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F93C U+200D U+2640 U+FE0F",
      name: "women wrestling",
      image: "\uD83E\uDD3C‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F93D",
      name: "person playing water polo",
      image: "\uD83E\uDD3D",
      category: "People & Body"
    },
    {
      code: "U+1F93D U+200D U+2642 U+FE0F",
      name: "man playing water polo",
      image: "\uD83E\uDD3D‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F93D U+200D U+2640 U+FE0F",
      name: "woman playing water polo",
      image: "\uD83E\uDD3D‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F93E",
      name: "person playing handball",
      image: "\uD83E\uDD3E",
      category: "People & Body"
    },
    {
      code: "U+1F93E U+200D U+2642 U+FE0F",
      name: "man playing handball",
      image: "\uD83E\uDD3E‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F93E U+200D U+2640 U+FE0F",
      name: "woman playing handball",
      image: "\uD83E\uDD3E‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F939",
      name: "person juggling",
      image: "\uD83E\uDD39",
      category: "People & Body"
    },
    {
      code: "U+1F939 U+200D U+2642 U+FE0F",
      name: "man juggling",
      image: "\uD83E\uDD39‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F939 U+200D U+2640 U+FE0F",
      name: "woman juggling",
      image: "\uD83E\uDD39‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F9D8",
      name: "person in lotus position",
      image: "\uD83E\uDDD8",
      category: "People & Body"
    },
    {
      code: "U+1F9D8 U+200D U+2642 U+FE0F",
      name: "man in lotus position",
      image: "\uD83E\uDDD8‍♂️",
      category: "People & Body"
    },
    {
      code: "U+1F9D8 U+200D U+2640 U+FE0F",
      name: "woman in lotus position",
      image: "\uD83E\uDDD8‍♀️",
      category: "People & Body"
    },
    {
      code: "U+1F6C0",
      name: "person taking bath",
      image: "\uD83D\uDEC0",
      category: "People & Body"
    },
    {
      code: "U+1F6CC",
      name: "person in bed",
      image: "\uD83D\uDECC",
      category: "People & Body"
    },
    {
      code: "U+1F9D1 U+200D U+1F91D U+200D U+1F9D1",
      name: "people holding hands",
      image: "\uD83E\uDDD1‍\uD83E\uDD1D‍\uD83E\uDDD1",
      category: "People & Body"
    },
    {
      code: "U+1F46D",
      name: "women holding hands",
      image: "\uD83D\uDC6D",
      category: "People & Body"
    },
    {
      code: "U+1F46B",
      name: "woman and man holding hands",
      image: "\uD83D\uDC6B",
      category: "People & Body"
    },
    {
      code: "U+1F46C",
      name: "men holding hands",
      image: "\uD83D\uDC6C",
      category: "People & Body"
    },
    {
      code: "U+1F48F",
      name: "kiss",
      image: "\uD83D\uDC8F",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2764 U+FE0F U+200D U+1F48B U+200D U+1F468",
      name: "kiss: woman, man",
      image: "\uD83D\uDC69‍❤️‍\uD83D\uDC8B‍\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2764 U+FE0F U+200D U+1F48B U+200D U+1F468",
      name: "kiss: man, man",
      image: "\uD83D\uDC68‍❤️‍\uD83D\uDC8B‍\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2764 U+FE0F U+200D U+1F48B U+200D U+1F469",
      name: "kiss: woman, woman",
      image: "\uD83D\uDC69‍❤️‍\uD83D\uDC8B‍\uD83D\uDC69",
      category: "People & Body"
    },
    {
      code: "U+1F491",
      name: "couple with heart",
      image: "\uD83D\uDC91",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2764 U+FE0F U+200D U+1F468",
      name: "couple with heart: woman, man",
      image: "\uD83D\uDC69‍❤️‍\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+2764 U+FE0F U+200D U+1F468",
      name: "couple with heart: man, man",
      image: "\uD83D\uDC68‍❤️‍\uD83D\uDC68",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+2764 U+FE0F U+200D U+1F469",
      name: "couple with heart: woman, woman",
      image: "\uD83D\uDC69‍❤️‍\uD83D\uDC69",
      category: "People & Body"
    },
    {
      code: "U+1F46A",
      name: "family",
      image: "\uD83D\uDC6A",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F466",
      name: "family: man, woman, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F467",
      name: "family: man, woman, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F467 U+200D U+1F466",
      name: "family: man, woman, girl, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F466 U+200D U+1F466",
      name: "family: man, woman, boy, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F469 U+200D U+1F467 U+200D U+1F467",
      name: "family: man, woman, girl, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F466",
      name: "family: man, man, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F467",
      name: "family: man, man, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F467 U+200D U+1F466",
      name: "family: man, man, girl, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F466 U+200D U+1F466",
      name: "family: man, man, boy, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F468 U+200D U+1F467 U+200D U+1F467",
      name: "family: man, man, girl, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F466",
      name: "family: woman, woman, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F467",
      name: "family: woman, woman, girl",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F467 U+200D U+1F466",
      name: "family: woman, woman, girl, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F466 U+200D U+1F466",
      name: "family: woman, woman, boy, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F469 U+200D U+1F467 U+200D U+1F467",
      name: "family: woman, woman, girl, girl",
      image: "\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F466",
      name: "family: man, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F466 U+200D U+1F466",
      name: "family: man, boy, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F467",
      name: "family: man, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F467 U+200D U+1F466",
      name: "family: man, girl, boy",
      image: "\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F468 U+200D U+1F467 U+200D U+1F467",
      name: "family: man, girl, girl",
      image: "\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F466",
      name: "family: woman, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F466 U+200D U+1F466",
      name: "family: woman, boy, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC66‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F467",
      name: "family: woman, girl",
      image: "\uD83D\uDC69‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F467 U+200D U+1F466",
      name: "family: woman, girl, boy",
      image: "\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66",
      category: "People & Body"
    },
    {
      code: "U+1F469 U+200D U+1F467 U+200D U+1F467",
      name: "family: woman, girl, girl",
      image: "\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC67",
      category: "People & Body"
    },
    {
      code: "U+1F5E3",
      name: "speaking head",
      image: "\uD83D\uDDE3",
      category: "People & Body"
    },
    {
      code: "U+1F464",
      name: "bust in silhouette",
      image: "\uD83D\uDC64",
      category: "People & Body"
    },
    {
      code: "U+1F465",
      name: "busts in silhouette",
      image: "\uD83D\uDC65",
      category: "People & Body"
    },
    {
      code: "U+1FAC2",
      name: "people hugging",
      image: "\uD83E\uDEC2",
      category: "People & Body"
    },
    {
      code: "U+1F463",
      name: "footprints",
      image: "\uD83D\uDC63",
      category: "People & Body"
    },
    {
      code: "U+1F9B0",
      name: "red hair",
      image: "\uD83E\uDDB0",
      category: "People & Body"
    },
    {
      code: "U+1F9B1",
      name: "curly hair",
      image: "\uD83E\uDDB1",
      category: "People & Body"
    },
    {
      code: "U+1F9B3",
      name: "white hair",
      image: "\uD83E\uDDB3",
      category: "People & Body"
    },
    {
      code: "U+1F9B2",
      name: "bald",
      image: "\uD83E\uDDB2",
      category: "People & Body"
    },
    {
      code: "U+1F435",
      name: "monkey face",
      image: "\uD83D\uDC35",
      category: "Animals & Nature"
    },
    {
      code: "U+1F412",
      name: "monkey",
      image: "\uD83D\uDC12",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98D",
      name: "gorilla",
      image: "\uD83E\uDD8D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A7",
      name: "orangutan",
      image: "\uD83E\uDDA7",
      category: "Animals & Nature"
    },
    {
      code: "U+1F436",
      name: "dog face",
      image: "\uD83D\uDC36",
      category: "Animals & Nature"
    },
    {
      code: "U+1F415",
      name: "dog",
      image: "\uD83D\uDC15",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9AE",
      name: "guide dog",
      image: "\uD83E\uDDAE",
      category: "Animals & Nature"
    },
    {
      code: "U+1F415 U+200D U+1F9BA",
      name: "service dog",
      image: "\uD83D\uDC15‍\uD83E\uDDBA",
      category: "Animals & Nature"
    },
    {
      code: "U+1F429",
      name: "poodle",
      image: "\uD83D\uDC29",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43A",
      name: "wolf",
      image: "\uD83D\uDC3A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98A",
      name: "fox",
      image: "\uD83E\uDD8A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99D",
      name: "raccoon",
      image: "\uD83E\uDD9D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F431",
      name: "cat face",
      image: "\uD83D\uDC31",
      category: "Animals & Nature"
    },
    {
      code: "U+1F408",
      name: "cat",
      image: "\uD83D\uDC08",
      category: "Animals & Nature"
    },
    {
      code: "U+1F408 U+200D U+2B1B",
      name: "black cat",
      image: "\uD83D\uDC08‍⬛",
      category: "Animals & Nature"
    },
    {
      code: "U+1F981",
      name: "lion",
      image: "\uD83E\uDD81",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42F",
      name: "tiger face",
      image: "\uD83D\uDC2F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F405",
      name: "tiger",
      image: "\uD83D\uDC05",
      category: "Animals & Nature"
    },
    {
      code: "U+1F406",
      name: "leopard",
      image: "\uD83D\uDC06",
      category: "Animals & Nature"
    },
    {
      code: "U+1F434",
      name: "horse face",
      image: "\uD83D\uDC34",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40E",
      name: "horse",
      image: "\uD83D\uDC0E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F984",
      name: "unicorn",
      image: "\uD83E\uDD84",
      category: "Animals & Nature"
    },
    {
      code: "U+1F993",
      name: "zebra",
      image: "\uD83E\uDD93",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98C",
      name: "deer",
      image: "\uD83E\uDD8C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9AC",
      name: "bison",
      image: "\uD83E\uDDAC",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42E",
      name: "cow face",
      image: "\uD83D\uDC2E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F402",
      name: "ox",
      image: "\uD83D\uDC02",
      category: "Animals & Nature"
    },
    {
      code: "U+1F403",
      name: "water buffalo",
      image: "\uD83D\uDC03",
      category: "Animals & Nature"
    },
    {
      code: "U+1F404",
      name: "cow",
      image: "\uD83D\uDC04",
      category: "Animals & Nature"
    },
    {
      code: "U+1F437",
      name: "pig face",
      image: "\uD83D\uDC37",
      category: "Animals & Nature"
    },
    {
      code: "U+1F416",
      name: "pig",
      image: "\uD83D\uDC16",
      category: "Animals & Nature"
    },
    {
      code: "U+1F417",
      name: "boar",
      image: "\uD83D\uDC17",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43D",
      name: "pig nose",
      image: "\uD83D\uDC3D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40F",
      name: "ram",
      image: "\uD83D\uDC0F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F411",
      name: "ewe",
      image: "\uD83D\uDC11",
      category: "Animals & Nature"
    },
    {
      code: "U+1F410",
      name: "goat",
      image: "\uD83D\uDC10",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42A",
      name: "camel",
      image: "\uD83D\uDC2A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42B",
      name: "two-hump camel",
      image: "\uD83D\uDC2B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F999",
      name: "llama",
      image: "\uD83E\uDD99",
      category: "Animals & Nature"
    },
    {
      code: "U+1F992",
      name: "giraffe",
      image: "\uD83E\uDD92",
      category: "Animals & Nature"
    },
    {
      code: "U+1F418",
      name: "elephant",
      image: "\uD83D\uDC18",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A3",
      name: "mammoth",
      image: "\uD83E\uDDA3",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98F",
      name: "rhinoceros",
      image: "\uD83E\uDD8F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99B",
      name: "hippopotamus",
      image: "\uD83E\uDD9B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42D",
      name: "mouse face",
      image: "\uD83D\uDC2D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F401",
      name: "mouse",
      image: "\uD83D\uDC01",
      category: "Animals & Nature"
    },
    {
      code: "U+1F400",
      name: "rat",
      image: "\uD83D\uDC00",
      category: "Animals & Nature"
    },
    {
      code: "U+1F439",
      name: "hamster",
      image: "\uD83D\uDC39",
      category: "Animals & Nature"
    },
    {
      code: "U+1F430",
      name: "rabbit face",
      image: "\uD83D\uDC30",
      category: "Animals & Nature"
    },
    {
      code: "U+1F407",
      name: "rabbit",
      image: "\uD83D\uDC07",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43F",
      name: "chipmunk",
      image: "\uD83D\uDC3F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9AB",
      name: "beaver",
      image: "\uD83E\uDDAB",
      category: "Animals & Nature"
    },
    {
      code: "U+1F994",
      name: "hedgehog",
      image: "\uD83E\uDD94",
      category: "Animals & Nature"
    },
    {
      code: "U+1F987",
      name: "bat",
      image: "\uD83E\uDD87",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43B",
      name: "bear",
      image: "\uD83D\uDC3B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43B U+200D U+2744 U+FE0F",
      name: "polar bear",
      image: "\uD83D\uDC3B‍❄️",
      category: "Animals & Nature"
    },
    {
      code: "U+1F428",
      name: "koala",
      image: "\uD83D\uDC28",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43C",
      name: "panda",
      image: "\uD83D\uDC3C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A5",
      name: "sloth",
      image: "\uD83E\uDDA5",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A6",
      name: "otter",
      image: "\uD83E\uDDA6",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A8",
      name: "skunk",
      image: "\uD83E\uDDA8",
      category: "Animals & Nature"
    },
    {
      code: "U+1F998",
      name: "kangaroo",
      image: "\uD83E\uDD98",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A1",
      name: "badger",
      image: "\uD83E\uDDA1",
      category: "Animals & Nature"
    },
    {
      code: "U+1F43E",
      name: "paw prints",
      image: "\uD83D\uDC3E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F983",
      name: "turkey",
      image: "\uD83E\uDD83",
      category: "Animals & Nature"
    },
    {
      code: "U+1F414",
      name: "chicken",
      image: "\uD83D\uDC14",
      category: "Animals & Nature"
    },
    {
      code: "U+1F413",
      name: "rooster",
      image: "\uD83D\uDC13",
      category: "Animals & Nature"
    },
    {
      code: "U+1F423",
      name: "hatching chick",
      image: "\uD83D\uDC23",
      category: "Animals & Nature"
    },
    {
      code: "U+1F424",
      name: "baby chick",
      image: "\uD83D\uDC24",
      category: "Animals & Nature"
    },
    {
      code: "U+1F425",
      name: "front-facing baby chick",
      image: "\uD83D\uDC25",
      category: "Animals & Nature"
    },
    {
      code: "U+1F426",
      name: "bird",
      image: "\uD83D\uDC26",
      category: "Animals & Nature"
    },
    {
      code: "U+1F427",
      name: "penguin",
      image: "\uD83D\uDC27",
      category: "Animals & Nature"
    },
    {
      code: "U+1F54A",
      name: "dove",
      image: "\uD83D\uDD4A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F985",
      name: "eagle",
      image: "\uD83E\uDD85",
      category: "Animals & Nature"
    },
    {
      code: "U+1F986",
      name: "duck",
      image: "\uD83E\uDD86",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A2",
      name: "swan",
      image: "\uD83E\uDDA2",
      category: "Animals & Nature"
    },
    {
      code: "U+1F989",
      name: "owl",
      image: "\uD83E\uDD89",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A4",
      name: "dodo",
      image: "\uD83E\uDDA4",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB6",
      name: "feather",
      image: "\uD83E\uDEB6",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A9",
      name: "flamingo",
      image: "\uD83E\uDDA9",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99A",
      name: "peacock",
      image: "\uD83E\uDD9A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99C",
      name: "parrot",
      image: "\uD83E\uDD9C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F438",
      name: "frog",
      image: "\uD83D\uDC38",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40A",
      name: "crocodile",
      image: "\uD83D\uDC0A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F422",
      name: "turtle",
      image: "\uD83D\uDC22",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98E",
      name: "lizard",
      image: "\uD83E\uDD8E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40D",
      name: "snake",
      image: "\uD83D\uDC0D",
      category: "Animals & Nature"
    },
    {
      code: "U+1F432",
      name: "dragon face",
      image: "\uD83D\uDC32",
      category: "Animals & Nature"
    },
    {
      code: "U+1F409",
      name: "dragon",
      image: "\uD83D\uDC09",
      category: "Animals & Nature"
    },
    {
      code: "U+1F995",
      name: "sauropod",
      image: "\uD83E\uDD95",
      category: "Animals & Nature"
    },
    {
      code: "U+1F996",
      name: "T-Rex",
      image: "\uD83E\uDD96",
      category: "Animals & Nature"
    },
    {
      code: "U+1F433",
      name: "spouting whale",
      image: "\uD83D\uDC33",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40B",
      name: "whale",
      image: "\uD83D\uDC0B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F42C",
      name: "dolphin",
      image: "\uD83D\uDC2C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9AD",
      name: "seal",
      image: "\uD83E\uDDAD",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41F",
      name: "fish",
      image: "\uD83D\uDC1F",
      category: "Animals & Nature"
    },
    {
      code: "U+1F420",
      name: "tropical fish",
      image: "\uD83D\uDC20",
      category: "Animals & Nature"
    },
    {
      code: "U+1F421",
      name: "blowfish",
      image: "\uD83D\uDC21",
      category: "Animals & Nature"
    },
    {
      code: "U+1F988",
      name: "shark",
      image: "\uD83E\uDD88",
      category: "Animals & Nature"
    },
    {
      code: "U+1F419",
      name: "octopus",
      image: "\uD83D\uDC19",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41A",
      name: "spiral shell",
      image: "\uD83D\uDC1A",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB8",
      name: "coral",
      image: "\uD83E\uDEB8",
      category: "Animals & Nature"
    },
    {
      code: "U+1F40C",
      name: "snail",
      image: "\uD83D\uDC0C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F98B",
      name: "butterfly",
      image: "\uD83E\uDD8B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41B",
      name: "bug",
      image: "\uD83D\uDC1B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41C",
      name: "ant",
      image: "\uD83D\uDC1C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41D",
      name: "honeybee",
      image: "\uD83D\uDC1D",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB2",
      name: "beetle",
      image: "\uD83E\uDEB2",
      category: "Animals & Nature"
    },
    {
      code: "U+1F41E",
      name: "lady beetle",
      image: "\uD83D\uDC1E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F997",
      name: "cricket",
      image: "\uD83E\uDD97",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB3",
      name: "cockroach",
      image: "\uD83E\uDEB3",
      category: "Animals & Nature"
    },
    {
      code: "U+1F577",
      name: "spider",
      image: "\uD83D\uDD77",
      category: "Animals & Nature"
    },
    {
      code: "U+1F578",
      name: "spider web",
      image: "\uD83D\uDD78",
      category: "Animals & Nature"
    },
    {
      code: "U+1F982",
      name: "scorpion",
      image: "\uD83E\uDD82",
      category: "Animals & Nature"
    },
    {
      code: "U+1F99F",
      name: "mosquito",
      image: "\uD83E\uDD9F",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB0",
      name: "fly",
      image: "\uD83E\uDEB0",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB1",
      name: "worm",
      image: "\uD83E\uDEB1",
      category: "Animals & Nature"
    },
    {
      code: "U+1F9A0",
      name: "microbe",
      image: "\uD83E\uDDA0",
      category: "Animals & Nature"
    },
    {
      code: "U+1F490",
      name: "bouquet",
      image: "\uD83D\uDC90",
      category: "Animals & Nature"
    },
    {
      code: "U+1F338",
      name: "cherry blossom",
      image: "\uD83C\uDF38",
      category: "Animals & Nature"
    },
    {
      code: "U+1F4AE",
      name: "white flower",
      image: "\uD83D\uDCAE",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB7",
      name: "lotus",
      image: "\uD83E\uDEB7",
      category: "Animals & Nature"
    },
    {
      code: "U+1F3F5",
      name: "rosette",
      image: "\uD83C\uDFF5",
      category: "Animals & Nature"
    },
    {
      code: "U+1F339",
      name: "rose",
      image: "\uD83C\uDF39",
      category: "Animals & Nature"
    },
    {
      code: "U+1F940",
      name: "wilted flower",
      image: "\uD83E\uDD40",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33A",
      name: "hibiscus",
      image: "\uD83C\uDF3A",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33B",
      name: "sunflower",
      image: "\uD83C\uDF3B",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33C",
      name: "blossom",
      image: "\uD83C\uDF3C",
      category: "Animals & Nature"
    },
    {
      code: "U+1F337",
      name: "tulip",
      image: "\uD83C\uDF37",
      category: "Animals & Nature"
    },
    {
      code: "U+1F331",
      name: "seedling",
      image: "\uD83C\uDF31",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB4",
      name: "potted plant",
      image: "\uD83E\uDEB4",
      category: "Animals & Nature"
    },
    {
      code: "U+1F332",
      name: "evergreen tree",
      image: "\uD83C\uDF32",
      category: "Animals & Nature"
    },
    {
      code: "U+1F333",
      name: "deciduous tree",
      image: "\uD83C\uDF33",
      category: "Animals & Nature"
    },
    {
      code: "U+1F334",
      name: "palm tree",
      image: "\uD83C\uDF34",
      category: "Animals & Nature"
    },
    {
      code: "U+1F335",
      name: "cactus",
      image: "\uD83C\uDF35",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33E",
      name: "sheaf of rice",
      image: "\uD83C\uDF3E",
      category: "Animals & Nature"
    },
    {
      code: "U+1F33F",
      name: "herb",
      image: "\uD83C\uDF3F",
      category: "Animals & Nature"
    },
    {
      code: "U+2618",
      name: "shamrock",
      image: "☘",
      category: "Animals & Nature"
    },
    {
      code: "U+1F340",
      name: "four leaf clover",
      image: "\uD83C\uDF40",
      category: "Animals & Nature"
    },
    {
      code: "U+1F341",
      name: "maple leaf",
      image: "\uD83C\uDF41",
      category: "Animals & Nature"
    },
    {
      code: "U+1F342",
      name: "fallen leaf",
      image: "\uD83C\uDF42",
      category: "Animals & Nature"
    },
    {
      code: "U+1F343",
      name: "leaf fluttering in wind",
      image: "\uD83C\uDF43",
      category: "Animals & Nature"
    },
    {
      code: "U+1FAB9",
      name: "empty nest",
      image: "\uD83E\uDEB9",
      category: "Animals & Nature"
    },
    {
      code: "U+1FABA",
      name: "nest with eggs",
      image: "\uD83E\uDEBA",
      category: "Animals & Nature"
    },
    {
      code: "U+1F344",
      name: "mushroom",
      image: "\uD83C\uDF44",
      category: "Animals & Nature"
    },
    {
      code: "U+1F347",
      name: "grapes",
      image: "\uD83C\uDF47",
      category: "Food & Drink"
    },
    {
      code: "U+1F348",
      name: "melon",
      image: "\uD83C\uDF48",
      category: "Food & Drink"
    },
    {
      code: "U+1F349",
      name: "watermelon",
      image: "\uD83C\uDF49",
      category: "Food & Drink"
    },
    {
      code: "U+1F34A",
      name: "tangerine",
      image: "\uD83C\uDF4A",
      category: "Food & Drink"
    },
    {
      code: "U+1F34B",
      name: "lemon",
      image: "\uD83C\uDF4B",
      category: "Food & Drink"
    },
    {
      code: "U+1F34C",
      name: "banana",
      image: "\uD83C\uDF4C",
      category: "Food & Drink"
    },
    {
      code: "U+1F34D",
      name: "pineapple",
      image: "\uD83C\uDF4D",
      category: "Food & Drink"
    },
    {
      code: "U+1F96D",
      name: "mango",
      image: "\uD83E\uDD6D",
      category: "Food & Drink"
    },
    {
      code: "U+1F34E",
      name: "red apple",
      image: "\uD83C\uDF4E",
      category: "Food & Drink"
    },
    {
      code: "U+1F34F",
      name: "green apple",
      image: "\uD83C\uDF4F",
      category: "Food & Drink"
    },
    {
      code: "U+1F350",
      name: "pear",
      image: "\uD83C\uDF50",
      category: "Food & Drink"
    },
    {
      code: "U+1F351",
      name: "peach",
      image: "\uD83C\uDF51",
      category: "Food & Drink"
    },
    {
      code: "U+1F352",
      name: "cherries",
      image: "\uD83C\uDF52",
      category: "Food & Drink"
    },
    {
      code: "U+1F353",
      name: "strawberry",
      image: "\uD83C\uDF53",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD0",
      name: "blueberries",
      image: "\uD83E\uDED0",
      category: "Food & Drink"
    },
    {
      code: "U+1F95D",
      name: "kiwi fruit",
      image: "\uD83E\uDD5D",
      category: "Food & Drink"
    },
    {
      code: "U+1F345",
      name: "tomato",
      image: "\uD83C\uDF45",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD2",
      name: "olive",
      image: "\uD83E\uDED2",
      category: "Food & Drink"
    },
    {
      code: "U+1F965",
      name: "coconut",
      image: "\uD83E\uDD65",
      category: "Food & Drink"
    },
    {
      code: "U+1F951",
      name: "avocado",
      image: "\uD83E\uDD51",
      category: "Food & Drink"
    },
    {
      code: "U+1F346",
      name: "eggplant",
      image: "\uD83C\uDF46",
      category: "Food & Drink"
    },
    {
      code: "U+1F954",
      name: "potato",
      image: "\uD83E\uDD54",
      category: "Food & Drink"
    },
    {
      code: "U+1F955",
      name: "carrot",
      image: "\uD83E\uDD55",
      category: "Food & Drink"
    },
    {
      code: "U+1F33D",
      name: "ear of corn",
      image: "\uD83C\uDF3D",
      category: "Food & Drink"
    },
    {
      code: "U+1F336",
      name: "hot pepper",
      image: "\uD83C\uDF36",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD1",
      name: "bell pepper",
      image: "\uD83E\uDED1",
      category: "Food & Drink"
    },
    {
      code: "U+1F952",
      name: "cucumber",
      image: "\uD83E\uDD52",
      category: "Food & Drink"
    },
    {
      code: "U+1F96C",
      name: "leafy green",
      image: "\uD83E\uDD6C",
      category: "Food & Drink"
    },
    {
      code: "U+1F966",
      name: "broccoli",
      image: "\uD83E\uDD66",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C4",
      name: "garlic",
      image: "\uD83E\uDDC4",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C5",
      name: "onion",
      image: "\uD83E\uDDC5",
      category: "Food & Drink"
    },
    {
      code: "U+1F95C",
      name: "peanuts",
      image: "\uD83E\uDD5C",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD8",
      name: "beans",
      image: "\uD83E\uDED8",
      category: "Food & Drink"
    },
    {
      code: "U+1F330",
      name: "chestnut",
      image: "\uD83C\uDF30",
      category: "Food & Drink"
    },
    {
      code: "U+1F35E",
      name: "bread",
      image: "\uD83C\uDF5E",
      category: "Food & Drink"
    },
    {
      code: "U+1F950",
      name: "croissant",
      image: "\uD83E\uDD50",
      category: "Food & Drink"
    },
    {
      code: "U+1F956",
      name: "baguette bread",
      image: "\uD83E\uDD56",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD3",
      name: "flatbread",
      image: "\uD83E\uDED3",
      category: "Food & Drink"
    },
    {
      code: "U+1F968",
      name: "pretzel",
      image: "\uD83E\uDD68",
      category: "Food & Drink"
    },
    {
      code: "U+1F96F",
      name: "bagel",
      image: "\uD83E\uDD6F",
      category: "Food & Drink"
    },
    {
      code: "U+1F95E",
      name: "pancakes",
      image: "\uD83E\uDD5E",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C7",
      name: "waffle",
      image: "\uD83E\uDDC7",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C0",
      name: "cheese wedge",
      image: "\uD83E\uDDC0",
      category: "Food & Drink"
    },
    {
      code: "U+1F356",
      name: "meat on bone",
      image: "\uD83C\uDF56",
      category: "Food & Drink"
    },
    {
      code: "U+1F357",
      name: "poultry leg",
      image: "\uD83C\uDF57",
      category: "Food & Drink"
    },
    {
      code: "U+1F969",
      name: "cut of meat",
      image: "\uD83E\uDD69",
      category: "Food & Drink"
    },
    {
      code: "U+1F953",
      name: "bacon",
      image: "\uD83E\uDD53",
      category: "Food & Drink"
    },
    {
      code: "U+1F354",
      name: "hamburger",
      image: "\uD83C\uDF54",
      category: "Food & Drink"
    },
    {
      code: "U+1F35F",
      name: "french fries",
      image: "\uD83C\uDF5F",
      category: "Food & Drink"
    },
    {
      code: "U+1F355",
      name: "pizza",
      image: "\uD83C\uDF55",
      category: "Food & Drink"
    },
    {
      code: "U+1F32D",
      name: "hot dog",
      image: "\uD83C\uDF2D",
      category: "Food & Drink"
    },
    {
      code: "U+1F96A",
      name: "sandwich",
      image: "\uD83E\uDD6A",
      category: "Food & Drink"
    },
    {
      code: "U+1F32E",
      name: "taco",
      image: "\uD83C\uDF2E",
      category: "Food & Drink"
    },
    {
      code: "U+1F32F",
      name: "burrito",
      image: "\uD83C\uDF2F",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD4",
      name: "tamale",
      image: "\uD83E\uDED4",
      category: "Food & Drink"
    },
    {
      code: "U+1F959",
      name: "stuffed flatbread",
      image: "\uD83E\uDD59",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C6",
      name: "falafel",
      image: "\uD83E\uDDC6",
      category: "Food & Drink"
    },
    {
      code: "U+1F95A",
      name: "egg",
      image: "\uD83E\uDD5A",
      category: "Food & Drink"
    },
    {
      code: "U+1F373",
      name: "cooking",
      image: "\uD83C\uDF73",
      category: "Food & Drink"
    },
    {
      code: "U+1F958",
      name: "shallow pan of food",
      image: "\uD83E\uDD58",
      category: "Food & Drink"
    },
    {
      code: "U+1F372",
      name: "pot of food",
      image: "\uD83C\uDF72",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD5",
      name: "fondue",
      image: "\uD83E\uDED5",
      category: "Food & Drink"
    },
    {
      code: "U+1F963",
      name: "bowl with spoon",
      image: "\uD83E\uDD63",
      category: "Food & Drink"
    },
    {
      code: "U+1F957",
      name: "green salad",
      image: "\uD83E\uDD57",
      category: "Food & Drink"
    },
    {
      code: "U+1F37F",
      name: "popcorn",
      image: "\uD83C\uDF7F",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C8",
      name: "butter",
      image: "\uD83E\uDDC8",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C2",
      name: "salt",
      image: "\uD83E\uDDC2",
      category: "Food & Drink"
    },
    {
      code: "U+1F96B",
      name: "canned food",
      image: "\uD83E\uDD6B",
      category: "Food & Drink"
    },
    {
      code: "U+1F371",
      name: "bento box",
      image: "\uD83C\uDF71",
      category: "Food & Drink"
    },
    {
      code: "U+1F358",
      name: "rice cracker",
      image: "\uD83C\uDF58",
      category: "Food & Drink"
    },
    {
      code: "U+1F359",
      name: "rice ball",
      image: "\uD83C\uDF59",
      category: "Food & Drink"
    },
    {
      code: "U+1F35A",
      name: "cooked rice",
      image: "\uD83C\uDF5A",
      category: "Food & Drink"
    },
    {
      code: "U+1F35B",
      name: "curry rice",
      image: "\uD83C\uDF5B",
      category: "Food & Drink"
    },
    {
      code: "U+1F35C",
      name: "steaming bowl",
      image: "\uD83C\uDF5C",
      category: "Food & Drink"
    },
    {
      code: "U+1F35D",
      name: "spaghetti",
      image: "\uD83C\uDF5D",
      category: "Food & Drink"
    },
    {
      code: "U+1F360",
      name: "roasted sweet potato",
      image: "\uD83C\uDF60",
      category: "Food & Drink"
    },
    {
      code: "U+1F362",
      name: "oden",
      image: "\uD83C\uDF62",
      category: "Food & Drink"
    },
    {
      code: "U+1F363",
      name: "sushi",
      image: "\uD83C\uDF63",
      category: "Food & Drink"
    },
    {
      code: "U+1F364",
      name: "fried shrimp",
      image: "\uD83C\uDF64",
      category: "Food & Drink"
    },
    {
      code: "U+1F365",
      name: "fish cake with swirl",
      image: "\uD83C\uDF65",
      category: "Food & Drink"
    },
    {
      code: "U+1F96E",
      name: "moon cake",
      image: "\uD83E\uDD6E",
      category: "Food & Drink"
    },
    {
      code: "U+1F361",
      name: "dango",
      image: "\uD83C\uDF61",
      category: "Food & Drink"
    },
    {
      code: "U+1F95F",
      name: "dumpling",
      image: "\uD83E\uDD5F",
      category: "Food & Drink"
    },
    {
      code: "U+1F960",
      name: "fortune cookie",
      image: "\uD83E\uDD60",
      category: "Food & Drink"
    },
    {
      code: "U+1F961",
      name: "takeout box",
      image: "\uD83E\uDD61",
      category: "Food & Drink"
    },
    {
      code: "U+1F980",
      name: "crab",
      image: "\uD83E\uDD80",
      category: "Food & Drink"
    },
    {
      code: "U+1F99E",
      name: "lobster",
      image: "\uD83E\uDD9E",
      category: "Food & Drink"
    },
    {
      code: "U+1F990",
      name: "shrimp",
      image: "\uD83E\uDD90",
      category: "Food & Drink"
    },
    {
      code: "U+1F991",
      name: "squid",
      image: "\uD83E\uDD91",
      category: "Food & Drink"
    },
    {
      code: "U+1F9AA",
      name: "oyster",
      image: "\uD83E\uDDAA",
      category: "Food & Drink"
    },
    {
      code: "U+1F366",
      name: "soft ice cream",
      image: "\uD83C\uDF66",
      category: "Food & Drink"
    },
    {
      code: "U+1F367",
      name: "shaved ice",
      image: "\uD83C\uDF67",
      category: "Food & Drink"
    },
    {
      code: "U+1F368",
      name: "ice cream",
      image: "\uD83C\uDF68",
      category: "Food & Drink"
    },
    {
      code: "U+1F369",
      name: "doughnut",
      image: "\uD83C\uDF69",
      category: "Food & Drink"
    },
    {
      code: "U+1F36A",
      name: "cookie",
      image: "\uD83C\uDF6A",
      category: "Food & Drink"
    },
    {
      code: "U+1F382",
      name: "birthday cake",
      image: "\uD83C\uDF82",
      category: "Food & Drink"
    },
    {
      code: "U+1F370",
      name: "shortcake",
      image: "\uD83C\uDF70",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C1",
      name: "cupcake",
      image: "\uD83E\uDDC1",
      category: "Food & Drink"
    },
    {
      code: "U+1F967",
      name: "pie",
      image: "\uD83E\uDD67",
      category: "Food & Drink"
    },
    {
      code: "U+1F36B",
      name: "chocolate bar",
      image: "\uD83C\uDF6B",
      category: "Food & Drink"
    },
    {
      code: "U+1F36C",
      name: "candy",
      image: "\uD83C\uDF6C",
      category: "Food & Drink"
    },
    {
      code: "U+1F36D",
      name: "lollipop",
      image: "\uD83C\uDF6D",
      category: "Food & Drink"
    },
    {
      code: "U+1F36E",
      name: "custard",
      image: "\uD83C\uDF6E",
      category: "Food & Drink"
    },
    {
      code: "U+1F36F",
      name: "honey pot",
      image: "\uD83C\uDF6F",
      category: "Food & Drink"
    },
    {
      code: "U+1F37C",
      name: "baby bottle",
      image: "\uD83C\uDF7C",
      category: "Food & Drink"
    },
    {
      code: "U+1F95B",
      name: "glass of milk",
      image: "\uD83E\uDD5B",
      category: "Food & Drink"
    },
    {
      code: "U+2615",
      name: "hot beverage",
      image: "☕",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD6",
      name: "teapot",
      image: "\uD83E\uDED6",
      category: "Food & Drink"
    },
    {
      code: "U+1F375",
      name: "teacup without handle",
      image: "\uD83C\uDF75",
      category: "Food & Drink"
    },
    {
      code: "U+1F376",
      name: "sake",
      image: "\uD83C\uDF76",
      category: "Food & Drink"
    },
    {
      code: "U+1F37E",
      name: "bottle with popping cork",
      image: "\uD83C\uDF7E",
      category: "Food & Drink"
    },
    {
      code: "U+1F377",
      name: "wine glass",
      image: "\uD83C\uDF77",
      category: "Food & Drink"
    },
    {
      code: "U+1F378",
      name: "cocktail glass",
      image: "\uD83C\uDF78",
      category: "Food & Drink"
    },
    {
      code: "U+1F379",
      name: "tropical drink",
      image: "\uD83C\uDF79",
      category: "Food & Drink"
    },
    {
      code: "U+1F37A",
      name: "beer mug",
      image: "\uD83C\uDF7A",
      category: "Food & Drink"
    },
    {
      code: "U+1F37B",
      name: "clinking beer mugs",
      image: "\uD83C\uDF7B",
      category: "Food & Drink"
    },
    {
      code: "U+1F942",
      name: "clinking glasses",
      image: "\uD83E\uDD42",
      category: "Food & Drink"
    },
    {
      code: "U+1F943",
      name: "tumbler glass",
      image: "\uD83E\uDD43",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD7",
      name: "pouring liquid",
      image: "\uD83E\uDED7",
      category: "Food & Drink"
    },
    {
      code: "U+1F964",
      name: "cup with straw",
      image: "\uD83E\uDD64",
      category: "Food & Drink"
    },
    {
      code: "U+1F9CB",
      name: "bubble tea",
      image: "\uD83E\uDDCB",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C3",
      name: "beverage box",
      image: "\uD83E\uDDC3",
      category: "Food & Drink"
    },
    {
      code: "U+1F9C9",
      name: "mate",
      image: "\uD83E\uDDC9",
      category: "Food & Drink"
    },
    {
      code: "U+1F9CA",
      name: "ice",
      image: "\uD83E\uDDCA",
      category: "Food & Drink"
    },
    {
      code: "U+1F962",
      name: "chopsticks",
      image: "\uD83E\uDD62",
      category: "Food & Drink"
    },
    {
      code: "U+1F37D",
      name: "fork and knife with plate",
      image: "\uD83C\uDF7D",
      category: "Food & Drink"
    },
    {
      code: "U+1F374",
      name: "fork and knife",
      image: "\uD83C\uDF74",
      category: "Food & Drink"
    },
    {
      code: "U+1F944",
      name: "spoon",
      image: "\uD83E\uDD44",
      category: "Food & Drink"
    },
    {
      code: "U+1F52A",
      name: "kitchen knife",
      image: "\uD83D\uDD2A",
      category: "Food & Drink"
    },
    {
      code: "U+1FAD9",
      name: "jar",
      image: "\uD83E\uDED9",
      category: "Food & Drink"
    },
    {
      code: "U+1F3FA",
      name: "amphora",
      image: "\uD83C\uDFFA",
      category: "Food & Drink"
    },
    {
      code: "U+1F30D",
      name: "globe showing Europe-Africa",
      image: "\uD83C\uDF0D",
      category: "Travel & Places"
    },
    {
      code: "U+1F30E",
      name: "globe showing Americas",
      image: "\uD83C\uDF0E",
      category: "Travel & Places"
    },
    {
      code: "U+1F30F",
      name: "globe showing Asia-Australia",
      image: "\uD83C\uDF0F",
      category: "Travel & Places"
    },
    {
      code: "U+1F310",
      name: "globe with meridians",
      image: "\uD83C\uDF10",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FA",
      name: "world map",
      image: "\uD83D\uDDFA",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FE",
      name: "map of Japan",
      image: "\uD83D\uDDFE",
      category: "Travel & Places"
    },
    {
      code: "U+1F9ED",
      name: "compass",
      image: "\uD83E\uDDED",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D4",
      name: "snow-capped mountain",
      image: "\uD83C\uDFD4",
      category: "Travel & Places"
    },
    {
      code: "U+26F0",
      name: "mountain",
      image: "⛰",
      category: "Travel & Places"
    },
    {
      code: "U+1F30B",
      name: "volcano",
      image: "\uD83C\uDF0B",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FB",
      name: "mount fuji",
      image: "\uD83D\uDDFB",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D5",
      name: "camping",
      image: "\uD83C\uDFD5",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D6",
      name: "beach with umbrella",
      image: "\uD83C\uDFD6",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DC",
      name: "desert",
      image: "\uD83C\uDFDC",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DD",
      name: "desert island",
      image: "\uD83C\uDFDD",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DE",
      name: "national park",
      image: "\uD83C\uDFDE",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DF",
      name: "stadium",
      image: "\uD83C\uDFDF",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DB",
      name: "classical building",
      image: "\uD83C\uDFDB",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D7",
      name: "building construction",
      image: "\uD83C\uDFD7",
      category: "Travel & Places"
    },
    {
      code: "U+1F9F1",
      name: "brick",
      image: "\uD83E\uDDF1",
      category: "Travel & Places"
    },
    {
      code: "U+1FAA8",
      name: "rock",
      image: "\uD83E\uDEA8",
      category: "Travel & Places"
    },
    {
      code: "U+1FAB5",
      name: "wood",
      image: "\uD83E\uDEB5",
      category: "Travel & Places"
    },
    {
      code: "U+1F6D6",
      name: "hut",
      image: "\uD83D\uDED6",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D8",
      name: "houses",
      image: "\uD83C\uDFD8",
      category: "Travel & Places"
    },
    {
      code: "U+1F3DA",
      name: "derelict house",
      image: "\uD83C\uDFDA",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E0",
      name: "house",
      image: "\uD83C\uDFE0",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E1",
      name: "house with garden",
      image: "\uD83C\uDFE1",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E2",
      name: "office building",
      image: "\uD83C\uDFE2",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E3",
      name: "Japanese post office",
      image: "\uD83C\uDFE3",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E4",
      name: "post office",
      image: "\uD83C\uDFE4",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E5",
      name: "hospital",
      image: "\uD83C\uDFE5",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E6",
      name: "bank",
      image: "\uD83C\uDFE6",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E8",
      name: "hotel",
      image: "\uD83C\uDFE8",
      category: "Travel & Places"
    },
    {
      code: "U+1F3E9",
      name: "love hotel",
      image: "\uD83C\uDFE9",
      category: "Travel & Places"
    },
    {
      code: "U+1F3EA",
      name: "convenience store",
      image: "\uD83C\uDFEA",
      category: "Travel & Places"
    },
    {
      code: "U+1F3EB",
      name: "school",
      image: "\uD83C\uDFEB",
      category: "Travel & Places"
    },
    {
      code: "U+1F3EC",
      name: "department store",
      image: "\uD83C\uDFEC",
      category: "Travel & Places"
    },
    {
      code: "U+1F3ED",
      name: "factory",
      image: "\uD83C\uDFED",
      category: "Travel & Places"
    },
    {
      code: "U+1F3EF",
      name: "Japanese castle",
      image: "\uD83C\uDFEF",
      category: "Travel & Places"
    },
    {
      code: "U+1F3F0",
      name: "castle",
      image: "\uD83C\uDFF0",
      category: "Travel & Places"
    },
    {
      code: "U+1F492",
      name: "wedding",
      image: "\uD83D\uDC92",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FC",
      name: "Tokyo tower",
      image: "\uD83D\uDDFC",
      category: "Travel & Places"
    },
    {
      code: "U+1F5FD",
      name: "Statue of Liberty",
      image: "\uD83D\uDDFD",
      category: "Travel & Places"
    },
    {
      code: "U+26EA",
      name: "church",
      image: "⛪",
      category: "Travel & Places"
    },
    {
      code: "U+1F54C",
      name: "mosque",
      image: "\uD83D\uDD4C",
      category: "Travel & Places"
    },
    {
      code: "U+1F6D5",
      name: "hindu temple",
      image: "\uD83D\uDED5",
      category: "Travel & Places"
    },
    {
      code: "U+1F54D",
      name: "synagogue",
      image: "\uD83D\uDD4D",
      category: "Travel & Places"
    },
    {
      code: "U+26E9",
      name: "shinto shrine",
      image: "⛩",
      category: "Travel & Places"
    },
    {
      code: "U+1F54B",
      name: "kaaba",
      image: "\uD83D\uDD4B",
      category: "Travel & Places"
    },
    {
      code: "U+26F2",
      name: "fountain",
      image: "⛲",
      category: "Travel & Places"
    },
    {
      code: "U+26FA",
      name: "tent",
      image: "⛺",
      category: "Travel & Places"
    },
    {
      code: "U+1F301",
      name: "foggy",
      image: "\uD83C\uDF01",
      category: "Travel & Places"
    },
    {
      code: "U+1F303",
      name: "night with stars",
      image: "\uD83C\uDF03",
      category: "Travel & Places"
    },
    {
      code: "U+1F3D9",
      name: "cityscape",
      image: "\uD83C\uDFD9",
      category: "Travel & Places"
    },
    {
      code: "U+1F304",
      name: "sunrise over mountains",
      image: "\uD83C\uDF04",
      category: "Travel & Places"
    },
    {
      code: "U+1F305",
      name: "sunrise",
      image: "\uD83C\uDF05",
      category: "Travel & Places"
    },
    {
      code: "U+1F306",
      name: "cityscape at dusk",
      image: "\uD83C\uDF06",
      category: "Travel & Places"
    },
    {
      code: "U+1F307",
      name: "sunset",
      image: "\uD83C\uDF07",
      category: "Travel & Places"
    },
    {
      code: "U+1F309",
      name: "bridge at night",
      image: "\uD83C\uDF09",
      category: "Travel & Places"
    },
    {
      code: "U+2668",
      name: "hot springs",
      image: "♨",
      category: "Travel & Places"
    },
    {
      code: "U+1F3A0",
      name: "carousel horse",
      image: "\uD83C\uDFA0",
      category: "Travel & Places"
    },
    {
      code: "U+1F6DD",
      name: "playground slide",
      image: "\uD83D\uDEDD",
      category: "Travel & Places"
    },
    {
      code: "U+1F3A1",
      name: "ferris wheel",
      image: "\uD83C\uDFA1",
      category: "Travel & Places"
    },
    {
      code: "U+1F3A2",
      name: "roller coaster",
      image: "\uD83C\uDFA2",
      category: "Travel & Places"
    },
    {
      code: "U+1F488",
      name: "barber pole",
      image: "\uD83D\uDC88",
      category: "Travel & Places"
    },
    {
      code: "U+1F3AA",
      name: "circus tent",
      image: "\uD83C\uDFAA",
      category: "Travel & Places"
    },
    {
      code: "U+1F682",
      name: "locomotive",
      image: "\uD83D\uDE82",
      category: "Travel & Places"
    },
    {
      code: "U+1F683",
      name: "railway car",
      image: "\uD83D\uDE83",
      category: "Travel & Places"
    },
    {
      code: "U+1F684",
      name: "high-speed train",
      image: "\uD83D\uDE84",
      category: "Travel & Places"
    },
    {
      code: "U+1F685",
      name: "bullet train",
      image: "\uD83D\uDE85",
      category: "Travel & Places"
    },
    {
      code: "U+1F686",
      name: "train",
      image: "\uD83D\uDE86",
      category: "Travel & Places"
    },
    {
      code: "U+1F687",
      name: "metro",
      image: "\uD83D\uDE87",
      category: "Travel & Places"
    },
    {
      code: "U+1F688",
      name: "light rail",
      image: "\uD83D\uDE88",
      category: "Travel & Places"
    },
    {
      code: "U+1F689",
      name: "station",
      image: "\uD83D\uDE89",
      category: "Travel & Places"
    },
    {
      code: "U+1F68A",
      name: "tram",
      image: "\uD83D\uDE8A",
      category: "Travel & Places"
    },
    {
      code: "U+1F69D",
      name: "monorail",
      image: "\uD83D\uDE9D",
      category: "Travel & Places"
    },
    {
      code: "U+1F69E",
      name: "mountain railway",
      image: "\uD83D\uDE9E",
      category: "Travel & Places"
    },
    {
      code: "U+1F68B",
      name: "tram car",
      image: "\uD83D\uDE8B",
      category: "Travel & Places"
    },
    {
      code: "U+1F68C",
      name: "bus",
      image: "\uD83D\uDE8C",
      category: "Travel & Places"
    },
    {
      code: "U+1F68D",
      name: "oncoming bus",
      image: "\uD83D\uDE8D",
      category: "Travel & Places"
    },
    {
      code: "U+1F68E",
      name: "trolleybus",
      image: "\uD83D\uDE8E",
      category: "Travel & Places"
    },
    {
      code: "U+1F690",
      name: "minibus",
      image: "\uD83D\uDE90",
      category: "Travel & Places"
    },
    {
      code: "U+1F691",
      name: "ambulance",
      image: "\uD83D\uDE91",
      category: "Travel & Places"
    },
    {
      code: "U+1F692",
      name: "fire engine",
      image: "\uD83D\uDE92",
      category: "Travel & Places"
    },
    {
      code: "U+1F693",
      name: "police car",
      image: "\uD83D\uDE93",
      category: "Travel & Places"
    },
    {
      code: "U+1F694",
      name: "oncoming police car",
      image: "\uD83D\uDE94",
      category: "Travel & Places"
    },
    {
      code: "U+1F695",
      name: "taxi",
      image: "\uD83D\uDE95",
      category: "Travel & Places"
    },
    {
      code: "U+1F696",
      name: "oncoming taxi",
      image: "\uD83D\uDE96",
      category: "Travel & Places"
    },
    {
      code: "U+1F697",
      name: "automobile",
      image: "\uD83D\uDE97",
      category: "Travel & Places"
    },
    {
      code: "U+1F698",
      name: "oncoming automobile",
      image: "\uD83D\uDE98",
      category: "Travel & Places"
    },
    {
      code: "U+1F699",
      name: "sport utility vehicle",
      image: "\uD83D\uDE99",
      category: "Travel & Places"
    },
    {
      code: "U+1F6FB",
      name: "pickup truck",
      image: "\uD83D\uDEFB",
      category: "Travel & Places"
    },
    {
      code: "U+1F69A",
      name: "delivery truck",
      image: "\uD83D\uDE9A",
      category: "Travel & Places"
    },
    {
      code: "U+1F69B",
      name: "articulated lorry",
      image: "\uD83D\uDE9B",
      category: "Travel & Places"
    },
    {
      code: "U+1F69C",
      name: "tractor",
      image: "\uD83D\uDE9C",
      category: "Travel & Places"
    },
    {
      code: "U+1F3CE",
      name: "racing car",
      image: "\uD83C\uDFCE",
      category: "Travel & Places"
    },
    {
      code: "U+1F3CD",
      name: "motorcycle",
      image: "\uD83C\uDFCD",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F5",
      name: "motor scooter",
      image: "\uD83D\uDEF5",
      category: "Travel & Places"
    },
    {
      code: "U+1F9BD",
      name: "manual wheelchair",
      image: "\uD83E\uDDBD",
      category: "Travel & Places"
    },
    {
      code: "U+1F9BC",
      name: "motorized wheelchair",
      image: "\uD83E\uDDBC",
      category: "Travel & Places"
    },
    {
      code: "U+1F6FA",
      name: "auto rickshaw",
      image: "\uD83D\uDEFA",
      category: "Travel & Places"
    },
    {
      code: "U+1F6B2",
      name: "bicycle",
      image: "\uD83D\uDEB2",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F4",
      name: "kick scooter",
      image: "\uD83D\uDEF4",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F9",
      name: "skateboard",
      image: "\uD83D\uDEF9",
      category: "Travel & Places"
    },
    {
      code: "U+1F6FC",
      name: "roller skate",
      image: "\uD83D\uDEFC",
      category: "Travel & Places"
    },
    {
      code: "U+1F68F",
      name: "bus stop",
      image: "\uD83D\uDE8F",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E3",
      name: "motorway",
      image: "\uD83D\uDEE3",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E4",
      name: "railway track",
      image: "\uD83D\uDEE4",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E2",
      name: "oil drum",
      image: "\uD83D\uDEE2",
      category: "Travel & Places"
    },
    {
      code: "U+26FD",
      name: "fuel pump",
      image: "⛽",
      category: "Travel & Places"
    },
    {
      code: "U+1F6DE",
      name: "wheel",
      image: "\uD83D\uDEDE",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A8",
      name: "police car light",
      image: "\uD83D\uDEA8",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A5",
      name: "horizontal traffic light",
      image: "\uD83D\uDEA5",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A6",
      name: "vertical traffic light",
      image: "\uD83D\uDEA6",
      category: "Travel & Places"
    },
    {
      code: "U+1F6D1",
      name: "stop sign",
      image: "\uD83D\uDED1",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A7",
      name: "construction",
      image: "\uD83D\uDEA7",
      category: "Travel & Places"
    },
    {
      code: "U+2693",
      name: "anchor",
      image: "⚓",
      category: "Travel & Places"
    },
    {
      code: "U+1F6DF",
      name: "ring buoy",
      image: "\uD83D\uDEDF",
      category: "Travel & Places"
    },
    {
      code: "U+26F5",
      name: "sailboat",
      image: "⛵",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F6",
      name: "canoe",
      image: "\uD83D\uDEF6",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A4",
      name: "speedboat",
      image: "\uD83D\uDEA4",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F3",
      name: "passenger ship",
      image: "\uD83D\uDEF3",
      category: "Travel & Places"
    },
    {
      code: "U+26F4",
      name: "ferry",
      image: "⛴",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E5",
      name: "motor boat",
      image: "\uD83D\uDEE5",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A2",
      name: "ship",
      image: "\uD83D\uDEA2",
      category: "Travel & Places"
    },
    {
      code: "U+2708",
      name: "airplane",
      image: "✈",
      category: "Travel & Places"
    },
    {
      code: "U+1F6E9",
      name: "small airplane",
      image: "\uD83D\uDEE9",
      category: "Travel & Places"
    },
    {
      code: "U+1F6EB",
      name: "airplane departure",
      image: "\uD83D\uDEEB",
      category: "Travel & Places"
    },
    {
      code: "U+1F6EC",
      name: "airplane arrival",
      image: "\uD83D\uDEEC",
      category: "Travel & Places"
    },
    {
      code: "U+1FA82",
      name: "parachute",
      image: "\uD83E\uDE82",
      category: "Travel & Places"
    },
    {
      code: "U+1F4BA",
      name: "seat",
      image: "\uD83D\uDCBA",
      category: "Travel & Places"
    },
    {
      code: "U+1F681",
      name: "helicopter",
      image: "\uD83D\uDE81",
      category: "Travel & Places"
    },
    {
      code: "U+1F69F",
      name: "suspension railway",
      image: "\uD83D\uDE9F",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A0",
      name: "mountain cableway",
      image: "\uD83D\uDEA0",
      category: "Travel & Places"
    },
    {
      code: "U+1F6A1",
      name: "aerial tramway",
      image: "\uD83D\uDEA1",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F0",
      name: "satellite",
      image: "\uD83D\uDEF0",
      category: "Travel & Places"
    },
    {
      code: "U+1F680",
      name: "rocket",
      image: "\uD83D\uDE80",
      category: "Travel & Places"
    },
    {
      code: "U+1F6F8",
      name: "flying saucer",
      image: "\uD83D\uDEF8",
      category: "Travel & Places"
    },
    {
      code: "U+1F6CE",
      name: "bellhop bell",
      image: "\uD83D\uDECE",
      category: "Travel & Places"
    },
    {
      code: "U+1F9F3",
      name: "luggage",
      image: "\uD83E\uDDF3",
      category: "Travel & Places"
    },
    {
      code: "U+231B",
      name: "hourglass done",
      image: "⌛",
      category: "Travel & Places"
    },
    {
      code: "U+23F3",
      name: "hourglass not done",
      image: "⏳",
      category: "Travel & Places"
    },
    {
      code: "U+231A",
      name: "watch",
      image: "⌚",
      category: "Travel & Places"
    },
    {
      code: "U+23F0",
      name: "alarm clock",
      image: "⏰",
      category: "Travel & Places"
    },
    {
      code: "U+23F1",
      name: "stopwatch",
      image: "⏱",
      category: "Travel & Places"
    },
    {
      code: "U+23F2",
      name: "timer clock",
      image: "⏲",
      category: "Travel & Places"
    },
    {
      code: "U+1F570",
      name: "mantelpiece clock",
      image: "\uD83D\uDD70",
      category: "Travel & Places"
    },
    {
      code: "U+1F55B",
      name: "twelve o’clock",
      image: "\uD83D\uDD5B",
      category: "Travel & Places"
    },
    {
      code: "U+1F567",
      name: "twelve-thirty",
      image: "\uD83D\uDD67",
      category: "Travel & Places"
    },
    {
      code: "U+1F550",
      name: "one o’clock",
      image: "\uD83D\uDD50",
      category: "Travel & Places"
    },
    {
      code: "U+1F55C",
      name: "one-thirty",
      image: "\uD83D\uDD5C",
      category: "Travel & Places"
    },
    {
      code: "U+1F551",
      name: "two o’clock",
      image: "\uD83D\uDD51",
      category: "Travel & Places"
    },
    {
      code: "U+1F55D",
      name: "two-thirty",
      image: "\uD83D\uDD5D",
      category: "Travel & Places"
    },
    {
      code: "U+1F552",
      name: "three o’clock",
      image: "\uD83D\uDD52",
      category: "Travel & Places"
    },
    {
      code: "U+1F55E",
      name: "three-thirty",
      image: "\uD83D\uDD5E",
      category: "Travel & Places"
    },
    {
      code: "U+1F553",
      name: "four o’clock",
      image: "\uD83D\uDD53",
      category: "Travel & Places"
    },
    {
      code: "U+1F55F",
      name: "four-thirty",
      image: "\uD83D\uDD5F",
      category: "Travel & Places"
    },
    {
      code: "U+1F554",
      name: "five o’clock",
      image: "\uD83D\uDD54",
      category: "Travel & Places"
    },
    {
      code: "U+1F560",
      name: "five-thirty",
      image: "\uD83D\uDD60",
      category: "Travel & Places"
    },
    {
      code: "U+1F555",
      name: "six o’clock",
      image: "\uD83D\uDD55",
      category: "Travel & Places"
    },
    {
      code: "U+1F561",
      name: "six-thirty",
      image: "\uD83D\uDD61",
      category: "Travel & Places"
    },
    {
      code: "U+1F556",
      name: "seven o’clock",
      image: "\uD83D\uDD56",
      category: "Travel & Places"
    },
    {
      code: "U+1F562",
      name: "seven-thirty",
      image: "\uD83D\uDD62",
      category: "Travel & Places"
    },
    {
      code: "U+1F557",
      name: "eight o’clock",
      image: "\uD83D\uDD57",
      category: "Travel & Places"
    },
    {
      code: "U+1F563",
      name: "eight-thirty",
      image: "\uD83D\uDD63",
      category: "Travel & Places"
    },
    {
      code: "U+1F558",
      name: "nine o’clock",
      image: "\uD83D\uDD58",
      category: "Travel & Places"
    },
    {
      code: "U+1F564",
      name: "nine-thirty",
      image: "\uD83D\uDD64",
      category: "Travel & Places"
    },
    {
      code: "U+1F559",
      name: "ten o’clock",
      image: "\uD83D\uDD59",
      category: "Travel & Places"
    },
    {
      code: "U+1F565",
      name: "ten-thirty",
      image: "\uD83D\uDD65",
      category: "Travel & Places"
    },
    {
      code: "U+1F55A",
      name: "eleven o’clock",
      image: "\uD83D\uDD5A",
      category: "Travel & Places"
    },
    {
      code: "U+1F566",
      name: "eleven-thirty",
      image: "\uD83D\uDD66",
      category: "Travel & Places"
    },
    {
      code: "U+1F311",
      name: "new moon",
      image: "\uD83C\uDF11",
      category: "Travel & Places"
    },
    {
      code: "U+1F312",
      name: "waxing crescent moon",
      image: "\uD83C\uDF12",
      category: "Travel & Places"
    },
    {
      code: "U+1F313",
      name: "first quarter moon",
      image: "\uD83C\uDF13",
      category: "Travel & Places"
    },
    {
      code: "U+1F314",
      name: "waxing gibbous moon",
      image: "\uD83C\uDF14",
      category: "Travel & Places"
    },
    {
      code: "U+1F315",
      name: "full moon",
      image: "\uD83C\uDF15",
      category: "Travel & Places"
    },
    {
      code: "U+1F316",
      name: "waning gibbous moon",
      image: "\uD83C\uDF16",
      category: "Travel & Places"
    },
    {
      code: "U+1F317",
      name: "last quarter moon",
      image: "\uD83C\uDF17",
      category: "Travel & Places"
    },
    {
      code: "U+1F318",
      name: "waning crescent moon",
      image: "\uD83C\uDF18",
      category: "Travel & Places"
    },
    {
      code: "U+1F319",
      name: "crescent moon",
      image: "\uD83C\uDF19",
      category: "Travel & Places"
    },
    {
      code: "U+1F31A",
      name: "new moon face",
      image: "\uD83C\uDF1A",
      category: "Travel & Places"
    },
    {
      code: "U+1F31B",
      name: "first quarter moon face",
      image: "\uD83C\uDF1B",
      category: "Travel & Places"
    },
    {
      code: "U+1F31C",
      name: "last quarter moon face",
      image: "\uD83C\uDF1C",
      category: "Travel & Places"
    },
    {
      code: "U+1F321",
      name: "thermometer",
      image: "\uD83C\uDF21",
      category: "Travel & Places"
    },
    {
      code: "U+2600",
      name: "sun",
      image: "☀",
      category: "Travel & Places"
    },
    {
      code: "U+1F31D",
      name: "full moon face",
      image: "\uD83C\uDF1D",
      category: "Travel & Places"
    },
    {
      code: "U+1F31E",
      name: "sun with face",
      image: "\uD83C\uDF1E",
      category: "Travel & Places"
    },
    {
      code: "U+1FA90",
      name: "ringed planet",
      image: "\uD83E\uDE90",
      category: "Travel & Places"
    },
    {
      code: "U+2B50",
      name: "star",
      image: "⭐",
      category: "Travel & Places"
    },
    {
      code: "U+1F31F",
      name: "glowing star",
      image: "\uD83C\uDF1F",
      category: "Travel & Places"
    },
    {
      code: "U+1F320",
      name: "shooting star",
      image: "\uD83C\uDF20",
      category: "Travel & Places"
    },
    {
      code: "U+1F30C",
      name: "milky way",
      image: "\uD83C\uDF0C",
      category: "Travel & Places"
    },
    {
      code: "U+2601",
      name: "cloud",
      image: "☁",
      category: "Travel & Places"
    },
    {
      code: "U+26C5",
      name: "sun behind cloud",
      image: "⛅",
      category: "Travel & Places"
    },
    {
      code: "U+26C8",
      name: "cloud with lightning and rain",
      image: "⛈",
      category: "Travel & Places"
    },
    {
      code: "U+1F324",
      name: "sun behind small cloud",
      image: "\uD83C\uDF24",
      category: "Travel & Places"
    },
    {
      code: "U+1F325",
      name: "sun behind large cloud",
      image: "\uD83C\uDF25",
      category: "Travel & Places"
    },
    {
      code: "U+1F326",
      name: "sun behind rain cloud",
      image: "\uD83C\uDF26",
      category: "Travel & Places"
    },
    {
      code: "U+1F327",
      name: "cloud with rain",
      image: "\uD83C\uDF27",
      category: "Travel & Places"
    },
    {
      code: "U+1F328",
      name: "cloud with snow",
      image: "\uD83C\uDF28",
      category: "Travel & Places"
    },
    {
      code: "U+1F329",
      name: "cloud with lightning",
      image: "\uD83C\uDF29",
      category: "Travel & Places"
    },
    {
      code: "U+1F32A",
      name: "tornado",
      image: "\uD83C\uDF2A",
      category: "Travel & Places"
    },
    {
      code: "U+1F32B",
      name: "fog",
      image: "\uD83C\uDF2B",
      category: "Travel & Places"
    },
    {
      code: "U+1F32C",
      name: "wind face",
      image: "\uD83C\uDF2C",
      category: "Travel & Places"
    },
    {
      code: "U+1F300",
      name: "cyclone",
      image: "\uD83C\uDF00",
      category: "Travel & Places"
    },
    {
      code: "U+1F308",
      name: "rainbow",
      image: "\uD83C\uDF08",
      category: "Travel & Places"
    },
    {
      code: "U+1F302",
      name: "closed umbrella",
      image: "\uD83C\uDF02",
      category: "Travel & Places"
    },
    {
      code: "U+2602",
      name: "umbrella",
      image: "☂",
      category: "Travel & Places"
    },
    {
      code: "U+2614",
      name: "umbrella with rain drops",
      image: "☔",
      category: "Travel & Places"
    },
    {
      code: "U+26F1",
      name: "umbrella on ground",
      image: "⛱",
      category: "Travel & Places"
    },
    {
      code: "U+26A1",
      name: "high voltage",
      image: "⚡",
      category: "Travel & Places"
    },
    {
      code: "U+2744",
      name: "snowflake",
      image: "❄",
      category: "Travel & Places"
    },
    {
      code: "U+2603",
      name: "snowman",
      image: "☃",
      category: "Travel & Places"
    },
    {
      code: "U+26C4",
      name: "snowman without snow",
      image: "⛄",
      category: "Travel & Places"
    },
    {
      code: "U+2604",
      name: "comet",
      image: "☄",
      category: "Travel & Places"
    },
    {
      code: "U+1F525",
      name: "fire",
      image: "\uD83D\uDD25",
      category: "Travel & Places"
    },
    {
      code: "U+1F4A7",
      name: "droplet",
      image: "\uD83D\uDCA7",
      category: "Travel & Places"
    },
    {
      code: "U+1F30A",
      name: "water wave",
      image: "\uD83C\uDF0A",
      category: "Travel & Places"
    },
    {
      code: "U+1F383",
      name: "jack-o-lantern",
      image: "\uD83C\uDF83",
      category: "Activities"
    },
    {
      code: "U+1F384",
      name: "Christmas tree",
      image: "\uD83C\uDF84",
      category: "Activities"
    },
    {
      code: "U+1F386",
      name: "fireworks",
      image: "\uD83C\uDF86",
      category: "Activities"
    },
    {
      code: "U+1F387",
      name: "sparkler",
      image: "\uD83C\uDF87",
      category: "Activities"
    },
    {
      code: "U+1F9E8",
      name: "firecracker",
      image: "\uD83E\uDDE8",
      category: "Activities"
    },
    {
      code: "U+2728",
      name: "sparkles",
      image: "✨",
      category: "Activities"
    },
    {
      code: "U+1F388",
      name: "balloon",
      image: "\uD83C\uDF88",
      category: "Activities"
    },
    {
      code: "U+1F389",
      name: "party popper",
      image: "\uD83C\uDF89",
      category: "Activities"
    },
    {
      code: "U+1F38A",
      name: "confetti ball",
      image: "\uD83C\uDF8A",
      category: "Activities"
    },
    {
      code: "U+1F38B",
      name: "tanabata tree",
      image: "\uD83C\uDF8B",
      category: "Activities"
    },
    {
      code: "U+1F38D",
      name: "pine decoration",
      image: "\uD83C\uDF8D",
      category: "Activities"
    },
    {
      code: "U+1F38E",
      name: "Japanese dolls",
      image: "\uD83C\uDF8E",
      category: "Activities"
    },
    {
      code: "U+1F38F",
      name: "carp streamer",
      image: "\uD83C\uDF8F",
      category: "Activities"
    },
    {
      code: "U+1F390",
      name: "wind chime",
      image: "\uD83C\uDF90",
      category: "Activities"
    },
    {
      code: "U+1F391",
      name: "moon viewing ceremony",
      image: "\uD83C\uDF91",
      category: "Activities"
    },
    {
      code: "U+1F9E7",
      name: "red envelope",
      image: "\uD83E\uDDE7",
      category: "Activities"
    },
    {
      code: "U+1F380",
      name: "ribbon",
      image: "\uD83C\uDF80",
      category: "Activities"
    },
    {
      code: "U+1F381",
      name: "wrapped gift",
      image: "\uD83C\uDF81",
      category: "Activities"
    },
    {
      code: "U+1F397",
      name: "reminder ribbon",
      image: "\uD83C\uDF97",
      category: "Activities"
    },
    {
      code: "U+1F39F",
      name: "admission tickets",
      image: "\uD83C\uDF9F",
      category: "Activities"
    },
    {
      code: "U+1F3AB",
      name: "ticket",
      image: "\uD83C\uDFAB",
      category: "Activities"
    },
    {
      code: "U+1F396",
      name: "military medal",
      image: "\uD83C\uDF96",
      category: "Activities"
    },
    {
      code: "U+1F3C6",
      name: "trophy",
      image: "\uD83C\uDFC6",
      category: "Activities"
    },
    {
      code: "U+1F3C5",
      name: "sports medal",
      image: "\uD83C\uDFC5",
      category: "Activities"
    },
    {
      code: "U+1F947",
      name: "1st place medal",
      image: "\uD83E\uDD47",
      category: "Activities"
    },
    {
      code: "U+1F948",
      name: "2nd place medal",
      image: "\uD83E\uDD48",
      category: "Activities"
    },
    {
      code: "U+1F949",
      name: "3rd place medal",
      image: "\uD83E\uDD49",
      category: "Activities"
    },
    {
      code: "U+26BD",
      name: "soccer ball",
      image: "⚽",
      category: "Activities"
    },
    {
      code: "U+26BE",
      name: "baseball",
      image: "⚾",
      category: "Activities"
    },
    {
      code: "U+1F94E",
      name: "softball",
      image: "\uD83E\uDD4E",
      category: "Activities"
    },
    {
      code: "U+1F3C0",
      name: "basketball",
      image: "\uD83C\uDFC0",
      category: "Activities"
    },
    {
      code: "U+1F3D0",
      name: "volleyball",
      image: "\uD83C\uDFD0",
      category: "Activities"
    },
    {
      code: "U+1F3C8",
      name: "american football",
      image: "\uD83C\uDFC8",
      category: "Activities"
    },
    {
      code: "U+1F3C9",
      name: "rugby football",
      image: "\uD83C\uDFC9",
      category: "Activities"
    },
    {
      code: "U+1F3BE",
      name: "tennis",
      image: "\uD83C\uDFBE",
      category: "Activities"
    },
    {
      code: "U+1F94F",
      name: "flying disc",
      image: "\uD83E\uDD4F",
      category: "Activities"
    },
    {
      code: "U+1F3B3",
      name: "bowling",
      image: "\uD83C\uDFB3",
      category: "Activities"
    },
    {
      code: "U+1F3CF",
      name: "cricket game",
      image: "\uD83C\uDFCF",
      category: "Activities"
    },
    {
      code: "U+1F3D1",
      name: "field hockey",
      image: "\uD83C\uDFD1",
      category: "Activities"
    },
    {
      code: "U+1F3D2",
      name: "ice hockey",
      image: "\uD83C\uDFD2",
      category: "Activities"
    },
    {
      code: "U+1F94D",
      name: "lacrosse",
      image: "\uD83E\uDD4D",
      category: "Activities"
    },
    {
      code: "U+1F3D3",
      name: "ping pong",
      image: "\uD83C\uDFD3",
      category: "Activities"
    },
    {
      code: "U+1F3F8",
      name: "badminton",
      image: "\uD83C\uDFF8",
      category: "Activities"
    },
    {
      code: "U+1F94A",
      name: "boxing glove",
      image: "\uD83E\uDD4A",
      category: "Activities"
    },
    {
      code: "U+1F94B",
      name: "martial arts uniform",
      image: "\uD83E\uDD4B",
      category: "Activities"
    },
    {
      code: "U+1F945",
      name: "goal net",
      image: "\uD83E\uDD45",
      category: "Activities"
    },
    {
      code: "U+26F3",
      name: "flag in hole",
      image: "⛳",
      category: "Activities"
    },
    {
      code: "U+26F8",
      name: "ice skate",
      image: "⛸",
      category: "Activities"
    },
    {
      code: "U+1F3A3",
      name: "fishing pole",
      image: "\uD83C\uDFA3",
      category: "Activities"
    },
    {
      code: "U+1F93F",
      name: "diving mask",
      image: "\uD83E\uDD3F",
      category: "Activities"
    },
    {
      code: "U+1F3BD",
      name: "running shirt",
      image: "\uD83C\uDFBD",
      category: "Activities"
    },
    {
      code: "U+1F3BF",
      name: "skis",
      image: "\uD83C\uDFBF",
      category: "Activities"
    },
    {
      code: "U+1F6F7",
      name: "sled",
      image: "\uD83D\uDEF7",
      category: "Activities"
    },
    {
      code: "U+1F94C",
      name: "curling stone",
      image: "\uD83E\uDD4C",
      category: "Activities"
    },
    {
      code: "U+1F3AF",
      name: "bullseye",
      image: "\uD83C\uDFAF",
      category: "Activities"
    },
    {
      code: "U+1FA80",
      name: "yo-yo",
      image: "\uD83E\uDE80",
      category: "Activities"
    },
    {
      code: "U+1FA81",
      name: "kite",
      image: "\uD83E\uDE81",
      category: "Activities"
    },
    {
      code: "U+1F52B",
      name: "water pistol",
      image: "\uD83D\uDD2B",
      category: "Activities"
    },
    {
      code: "U+1F3B1",
      name: "pool 8 ball",
      image: "\uD83C\uDFB1",
      category: "Activities"
    },
    {
      code: "U+1F52E",
      name: "crystal ball",
      image: "\uD83D\uDD2E",
      category: "Activities"
    },
    {
      code: "U+1FA84",
      name: "magic wand",
      image: "\uD83E\uDE84",
      category: "Activities"
    },
    {
      code: "U+1F3AE",
      name: "video game",
      image: "\uD83C\uDFAE",
      category: "Activities"
    },
    {
      code: "U+1F579",
      name: "joystick",
      image: "\uD83D\uDD79",
      category: "Activities"
    },
    {
      code: "U+1F3B0",
      name: "slot machine",
      image: "\uD83C\uDFB0",
      category: "Activities"
    },
    {
      code: "U+1F3B2",
      name: "game die",
      image: "\uD83C\uDFB2",
      category: "Activities"
    },
    {
      code: "U+1F9E9",
      name: "puzzle piece",
      image: "\uD83E\uDDE9",
      category: "Activities"
    },
    {
      code: "U+1F9F8",
      name: "teddy bear",
      image: "\uD83E\uDDF8",
      category: "Activities"
    },
    {
      code: "U+1FA85",
      name: "piñata",
      image: "\uD83E\uDE85",
      category: "Activities"
    },
    {
      code: "U+1FAA9",
      name: "mirror ball",
      image: "\uD83E\uDEA9",
      category: "Activities"
    },
    {
      code: "U+1FA86",
      name: "nesting dolls",
      image: "\uD83E\uDE86",
      category: "Activities"
    },
    {
      code: "U+2660",
      name: "spade suit",
      image: "♠",
      category: "Activities"
    },
    {
      code: "U+2665",
      name: "heart suit",
      image: "♥",
      category: "Activities"
    },
    {
      code: "U+2666",
      name: "diamond suit",
      image: "♦",
      category: "Activities"
    },
    {
      code: "U+2663",
      name: "club suit",
      image: "♣",
      category: "Activities"
    },
    {
      code: "U+265F",
      name: "chess pawn",
      image: "♟",
      category: "Activities"
    },
    {
      code: "U+1F0CF",
      name: "joker",
      image: "\uD83C\uDCCF",
      category: "Activities"
    },
    {
      code: "U+1F004",
      name: "mahjong red dragon",
      image: "\uD83C\uDC04",
      category: "Activities"
    },
    {
      code: "U+1F3B4",
      name: "flower playing cards",
      image: "\uD83C\uDFB4",
      category: "Activities"
    },
    {
      code: "U+1F3AD",
      name: "performing arts",
      image: "\uD83C\uDFAD",
      category: "Activities"
    },
    {
      code: "U+1F5BC",
      name: "framed picture",
      image: "\uD83D\uDDBC",
      category: "Activities"
    },
    {
      code: "U+1F3A8",
      name: "artist palette",
      image: "\uD83C\uDFA8",
      category: "Activities"
    },
    {
      code: "U+1F9F5",
      name: "thread",
      image: "\uD83E\uDDF5",
      category: "Activities"
    },
    {
      code: "U+1FAA1",
      name: "sewing needle",
      image: "\uD83E\uDEA1",
      category: "Activities"
    },
    {
      code: "U+1F9F6",
      name: "yarn",
      image: "\uD83E\uDDF6",
      category: "Activities"
    },
    {
      code: "U+1FAA2",
      name: "knot",
      image: "\uD83E\uDEA2",
      category: "Activities"
    },
    {
      code: "U+1F453",
      name: "glasses",
      image: "\uD83D\uDC53",
      category: "Objects"
    },
    {
      code: "U+1F576",
      name: "sunglasses",
      image: "\uD83D\uDD76",
      category: "Objects"
    },
    {
      code: "U+1F97D",
      name: "goggles",
      image: "\uD83E\uDD7D",
      category: "Objects"
    },
    {
      code: "U+1F97C",
      name: "lab coat",
      image: "\uD83E\uDD7C",
      category: "Objects"
    },
    {
      code: "U+1F9BA",
      name: "safety vest",
      image: "\uD83E\uDDBA",
      category: "Objects"
    },
    {
      code: "U+1F454",
      name: "necktie",
      image: "\uD83D\uDC54",
      category: "Objects"
    },
    {
      code: "U+1F455",
      name: "t-shirt",
      image: "\uD83D\uDC55",
      category: "Objects"
    },
    {
      code: "U+1F456",
      name: "jeans",
      image: "\uD83D\uDC56",
      category: "Objects"
    },
    {
      code: "U+1F9E3",
      name: "scarf",
      image: "\uD83E\uDDE3",
      category: "Objects"
    },
    {
      code: "U+1F9E4",
      name: "gloves",
      image: "\uD83E\uDDE4",
      category: "Objects"
    },
    {
      code: "U+1F9E5",
      name: "coat",
      image: "\uD83E\uDDE5",
      category: "Objects"
    },
    {
      code: "U+1F9E6",
      name: "socks",
      image: "\uD83E\uDDE6",
      category: "Objects"
    },
    {
      code: "U+1F457",
      name: "dress",
      image: "\uD83D\uDC57",
      category: "Objects"
    },
    {
      code: "U+1F458",
      name: "kimono",
      image: "\uD83D\uDC58",
      category: "Objects"
    },
    {
      code: "U+1F97B",
      name: "sari",
      image: "\uD83E\uDD7B",
      category: "Objects"
    },
    {
      code: "U+1FA71",
      name: "one-piece swimsuit",
      image: "\uD83E\uDE71",
      category: "Objects"
    },
    {
      code: "U+1FA72",
      name: "briefs",
      image: "\uD83E\uDE72",
      category: "Objects"
    },
    {
      code: "U+1FA73",
      name: "shorts",
      image: "\uD83E\uDE73",
      category: "Objects"
    },
    {
      code: "U+1F459",
      name: "bikini",
      image: "\uD83D\uDC59",
      category: "Objects"
    },
    {
      code: "U+1F45A",
      name: "woman’s clothes",
      image: "\uD83D\uDC5A",
      category: "Objects"
    },
    {
      code: "U+1F45B",
      name: "purse",
      image: "\uD83D\uDC5B",
      category: "Objects"
    },
    {
      code: "U+1F45C",
      name: "handbag",
      image: "\uD83D\uDC5C",
      category: "Objects"
    },
    {
      code: "U+1F45D",
      name: "clutch bag",
      image: "\uD83D\uDC5D",
      category: "Objects"
    },
    {
      code: "U+1F6CD",
      name: "shopping bags",
      image: "\uD83D\uDECD",
      category: "Objects"
    },
    {
      code: "U+1F392",
      name: "backpack",
      image: "\uD83C\uDF92",
      category: "Objects"
    },
    {
      code: "U+1FA74",
      name: "thong sandal",
      image: "\uD83E\uDE74",
      category: "Objects"
    },
    {
      code: "U+1F45E",
      name: "man’s shoe",
      image: "\uD83D\uDC5E",
      category: "Objects"
    },
    {
      code: "U+1F45F",
      name: "running shoe",
      image: "\uD83D\uDC5F",
      category: "Objects"
    },
    {
      code: "U+1F97E",
      name: "hiking boot",
      image: "\uD83E\uDD7E",
      category: "Objects"
    },
    {
      code: "U+1F97F",
      name: "flat shoe",
      image: "\uD83E\uDD7F",
      category: "Objects"
    },
    {
      code: "U+1F460",
      name: "high-heeled shoe",
      image: "\uD83D\uDC60",
      category: "Objects"
    },
    {
      code: "U+1F461",
      name: "woman’s sandal",
      image: "\uD83D\uDC61",
      category: "Objects"
    },
    {
      code: "U+1FA70",
      name: "ballet shoes",
      image: "\uD83E\uDE70",
      category: "Objects"
    },
    {
      code: "U+1F462",
      name: "woman’s boot",
      image: "\uD83D\uDC62",
      category: "Objects"
    },
    {
      code: "U+1F451",
      name: "crown",
      image: "\uD83D\uDC51",
      category: "Objects"
    },
    {
      code: "U+1F452",
      name: "woman’s hat",
      image: "\uD83D\uDC52",
      category: "Objects"
    },
    {
      code: "U+1F3A9",
      name: "top hat",
      image: "\uD83C\uDFA9",
      category: "Objects"
    },
    {
      code: "U+1F393",
      name: "graduation cap",
      image: "\uD83C\uDF93",
      category: "Objects"
    },
    {
      code: "U+1F9E2",
      name: "billed cap",
      image: "\uD83E\uDDE2",
      category: "Objects"
    },
    {
      code: "U+1FA96",
      name: "military helmet",
      image: "\uD83E\uDE96",
      category: "Objects"
    },
    {
      code: "U+26D1",
      name: "rescue worker’s helmet",
      image: "⛑",
      category: "Objects"
    },
    {
      code: "U+1F4FF",
      name: "prayer beads",
      image: "\uD83D\uDCFF",
      category: "Objects"
    },
    {
      code: "U+1F484",
      name: "lipstick",
      image: "\uD83D\uDC84",
      category: "Objects"
    },
    {
      code: "U+1F48D",
      name: "ring",
      image: "\uD83D\uDC8D",
      category: "Objects"
    },
    {
      code: "U+1F48E",
      name: "gem stone",
      image: "\uD83D\uDC8E",
      category: "Objects"
    },
    {
      code: "U+1F507",
      name: "muted speaker",
      image: "\uD83D\uDD07",
      category: "Objects"
    },
    {
      code: "U+1F508",
      name: "speaker low volume",
      image: "\uD83D\uDD08",
      category: "Objects"
    },
    {
      code: "U+1F509",
      name: "speaker medium volume",
      image: "\uD83D\uDD09",
      category: "Objects"
    },
    {
      code: "U+1F50A",
      name: "speaker high volume",
      image: "\uD83D\uDD0A",
      category: "Objects"
    },
    {
      code: "U+1F4E2",
      name: "loudspeaker",
      image: "\uD83D\uDCE2",
      category: "Objects"
    },
    {
      code: "U+1F4E3",
      name: "megaphone",
      image: "\uD83D\uDCE3",
      category: "Objects"
    },
    {
      code: "U+1F4EF",
      name: "postal horn",
      image: "\uD83D\uDCEF",
      category: "Objects"
    },
    {
      code: "U+1F514",
      name: "bell",
      image: "\uD83D\uDD14",
      category: "Objects"
    },
    {
      code: "U+1F515",
      name: "bell with slash",
      image: "\uD83D\uDD15",
      category: "Objects"
    },
    {
      code: "U+1F3BC",
      name: "musical score",
      image: "\uD83C\uDFBC",
      category: "Objects"
    },
    {
      code: "U+1F3B5",
      name: "musical note",
      image: "\uD83C\uDFB5",
      category: "Objects"
    },
    {
      code: "U+1F3B6",
      name: "musical notes",
      image: "\uD83C\uDFB6",
      category: "Objects"
    },
    {
      code: "U+1F399",
      name: "studio microphone",
      image: "\uD83C\uDF99",
      category: "Objects"
    },
    {
      code: "U+1F39A",
      name: "level slider",
      image: "\uD83C\uDF9A",
      category: "Objects"
    },
    {
      code: "U+1F39B",
      name: "control knobs",
      image: "\uD83C\uDF9B",
      category: "Objects"
    },
    {
      code: "U+1F3A4",
      name: "microphone",
      image: "\uD83C\uDFA4",
      category: "Objects"
    },
    {
      code: "U+1F3A7",
      name: "headphone",
      image: "\uD83C\uDFA7",
      category: "Objects"
    },
    {
      code: "U+1F4FB",
      name: "radio",
      image: "\uD83D\uDCFB",
      category: "Objects"
    },
    {
      code: "U+1F3B7",
      name: "saxophone",
      image: "\uD83C\uDFB7",
      category: "Objects"
    },
    {
      code: "U+1FA97",
      name: "accordion",
      image: "\uD83E\uDE97",
      category: "Objects"
    },
    {
      code: "U+1F3B8",
      name: "guitar",
      image: "\uD83C\uDFB8",
      category: "Objects"
    },
    {
      code: "U+1F3B9",
      name: "musical keyboard",
      image: "\uD83C\uDFB9",
      category: "Objects"
    },
    {
      code: "U+1F3BA",
      name: "trumpet",
      image: "\uD83C\uDFBA",
      category: "Objects"
    },
    {
      code: "U+1F3BB",
      name: "violin",
      image: "\uD83C\uDFBB",
      category: "Objects"
    },
    {
      code: "U+1FA95",
      name: "banjo",
      image: "\uD83E\uDE95",
      category: "Objects"
    },
    {
      code: "U+1F941",
      name: "drum",
      image: "\uD83E\uDD41",
      category: "Objects"
    },
    {
      code: "U+1FA98",
      name: "long drum",
      image: "\uD83E\uDE98",
      category: "Objects"
    },
    {
      code: "U+1F4F1",
      name: "mobile phone",
      image: "\uD83D\uDCF1",
      category: "Objects"
    },
    {
      code: "U+1F4F2",
      name: "mobile phone with arrow",
      image: "\uD83D\uDCF2",
      category: "Objects"
    },
    {
      code: "U+260E",
      name: "telephone",
      image: "☎",
      category: "Objects"
    },
    {
      code: "U+1F4DE",
      name: "telephone receiver",
      image: "\uD83D\uDCDE",
      category: "Objects"
    },
    {
      code: "U+1F4DF",
      name: "pager",
      image: "\uD83D\uDCDF",
      category: "Objects"
    },
    {
      code: "U+1F4E0",
      name: "fax machine",
      image: "\uD83D\uDCE0",
      category: "Objects"
    },
    {
      code: "U+1F50B",
      name: "battery",
      image: "\uD83D\uDD0B",
      category: "Objects"
    },
    {
      code: "U+1FAAB",
      name: "low battery",
      image: "\uD83E\uDEAB",
      category: "Objects"
    },
    {
      code: "U+1F50C",
      name: "electric plug",
      image: "\uD83D\uDD0C",
      category: "Objects"
    },
    {
      code: "U+1F4BB",
      name: "laptop",
      image: "\uD83D\uDCBB",
      category: "Objects"
    },
    {
      code: "U+1F5A5",
      name: "desktop computer",
      image: "\uD83D\uDDA5",
      category: "Objects"
    },
    {
      code: "U+1F5A8",
      name: "printer",
      image: "\uD83D\uDDA8",
      category: "Objects"
    },
    {
      code: "U+2328",
      name: "keyboard",
      image: "⌨",
      category: "Objects"
    },
    {
      code: "U+1F5B1",
      name: "computer mouse",
      image: "\uD83D\uDDB1",
      category: "Objects"
    },
    {
      code: "U+1F5B2",
      name: "trackball",
      image: "\uD83D\uDDB2",
      category: "Objects"
    },
    {
      code: "U+1F4BD",
      name: "computer disk",
      image: "\uD83D\uDCBD",
      category: "Objects"
    },
    {
      code: "U+1F4BE",
      name: "floppy disk",
      image: "\uD83D\uDCBE",
      category: "Objects"
    },
    {
      code: "U+1F4BF",
      name: "optical disk",
      image: "\uD83D\uDCBF",
      category: "Objects"
    },
    {
      code: "U+1F4C0",
      name: "dvd",
      image: "\uD83D\uDCC0",
      category: "Objects"
    },
    {
      code: "U+1F9EE",
      name: "abacus",
      image: "\uD83E\uDDEE",
      category: "Objects"
    },
    {
      code: "U+1F3A5",
      name: "movie camera",
      image: "\uD83C\uDFA5",
      category: "Objects"
    },
    {
      code: "U+1F39E",
      name: "film frames",
      image: "\uD83C\uDF9E",
      category: "Objects"
    },
    {
      code: "U+1F4FD",
      name: "film projector",
      image: "\uD83D\uDCFD",
      category: "Objects"
    },
    {
      code: "U+1F3AC",
      name: "clapper board",
      image: "\uD83C\uDFAC",
      category: "Objects"
    },
    {
      code: "U+1F4FA",
      name: "television",
      image: "\uD83D\uDCFA",
      category: "Objects"
    },
    {
      code: "U+1F4F7",
      name: "camera",
      image: "\uD83D\uDCF7",
      category: "Objects"
    },
    {
      code: "U+1F4F8",
      name: "camera with flash",
      image: "\uD83D\uDCF8",
      category: "Objects"
    },
    {
      code: "U+1F4F9",
      name: "video camera",
      image: "\uD83D\uDCF9",
      category: "Objects"
    },
    {
      code: "U+1F4FC",
      name: "videocassette",
      image: "\uD83D\uDCFC",
      category: "Objects"
    },
    {
      code: "U+1F50D",
      name: "magnifying glass tilted left",
      image: "\uD83D\uDD0D",
      category: "Objects"
    },
    {
      code: "U+1F50E",
      name: "magnifying glass tilted right",
      image: "\uD83D\uDD0E",
      category: "Objects"
    },
    {
      code: "U+1F56F",
      name: "candle",
      image: "\uD83D\uDD6F",
      category: "Objects"
    },
    {
      code: "U+1F4A1",
      name: "light bulb",
      image: "\uD83D\uDCA1",
      category: "Objects"
    },
    {
      code: "U+1F526",
      name: "flashlight",
      image: "\uD83D\uDD26",
      category: "Objects"
    },
    {
      code: "U+1F3EE",
      name: "red paper lantern",
      image: "\uD83C\uDFEE",
      category: "Objects"
    },
    {
      code: "U+1FA94",
      name: "diya lamp",
      image: "\uD83E\uDE94",
      category: "Objects"
    },
    {
      code: "U+1F4D4",
      name: "notebook with decorative cover",
      image: "\uD83D\uDCD4",
      category: "Objects"
    },
    {
      code: "U+1F4D5",
      name: "closed book",
      image: "\uD83D\uDCD5",
      category: "Objects"
    },
    {
      code: "U+1F4D6",
      name: "open book",
      image: "\uD83D\uDCD6",
      category: "Objects"
    },
    {
      code: "U+1F4D7",
      name: "green book",
      image: "\uD83D\uDCD7",
      category: "Objects"
    },
    {
      code: "U+1F4D8",
      name: "blue book",
      image: "\uD83D\uDCD8",
      category: "Objects"
    },
    {
      code: "U+1F4D9",
      name: "orange book",
      image: "\uD83D\uDCD9",
      category: "Objects"
    },
    {
      code: "U+1F4DA",
      name: "books",
      image: "\uD83D\uDCDA",
      category: "Objects"
    },
    {
      code: "U+1F4D3",
      name: "notebook",
      image: "\uD83D\uDCD3",
      category: "Objects"
    },
    {
      code: "U+1F4D2",
      name: "ledger",
      image: "\uD83D\uDCD2",
      category: "Objects"
    },
    {
      code: "U+1F4C3",
      name: "page with curl",
      image: "\uD83D\uDCC3",
      category: "Objects"
    },
    {
      code: "U+1F4DC",
      name: "scroll",
      image: "\uD83D\uDCDC",
      category: "Objects"
    },
    {
      code: "U+1F4C4",
      name: "page facing up",
      image: "\uD83D\uDCC4",
      category: "Objects"
    },
    {
      code: "U+1F4F0",
      name: "newspaper",
      image: "\uD83D\uDCF0",
      category: "Objects"
    },
    {
      code: "U+1F5DE",
      name: "rolled-up newspaper",
      image: "\uD83D\uDDDE",
      category: "Objects"
    },
    {
      code: "U+1F4D1",
      name: "bookmark tabs",
      image: "\uD83D\uDCD1",
      category: "Objects"
    },
    {
      code: "U+1F516",
      name: "bookmark",
      image: "\uD83D\uDD16",
      category: "Objects"
    },
    {
      code: "U+1F3F7",
      name: "label",
      image: "\uD83C\uDFF7",
      category: "Objects"
    },
    {
      code: "U+1F4B0",
      name: "money bag",
      image: "\uD83D\uDCB0",
      category: "Objects"
    },
    {
      code: "U+1FA99",
      name: "coin",
      image: "\uD83E\uDE99",
      category: "Objects"
    },
    {
      code: "U+1F4B4",
      name: "yen banknote",
      image: "\uD83D\uDCB4",
      category: "Objects"
    },
    {
      code: "U+1F4B5",
      name: "dollar banknote",
      image: "\uD83D\uDCB5",
      category: "Objects"
    },
    {
      code: "U+1F4B6",
      name: "euro banknote",
      image: "\uD83D\uDCB6",
      category: "Objects"
    },
    {
      code: "U+1F4B7",
      name: "pound banknote",
      image: "\uD83D\uDCB7",
      category: "Objects"
    },
    {
      code: "U+1F4B8",
      name: "money with wings",
      image: "\uD83D\uDCB8",
      category: "Objects"
    },
    {
      code: "U+1F4B3",
      name: "credit card",
      image: "\uD83D\uDCB3",
      category: "Objects"
    },
    {
      code: "U+1F9FE",
      name: "receipt",
      image: "\uD83E\uDDFE",
      category: "Objects"
    },
    {
      code: "U+1F4B9",
      name: "chart increasing with yen",
      image: "\uD83D\uDCB9",
      category: "Objects"
    },
    {
      code: "U+2709",
      name: "envelope",
      image: "✉",
      category: "Objects"
    },
    {
      code: "U+1F4E7",
      name: "e-mail",
      image: "\uD83D\uDCE7",
      category: "Objects"
    },
    {
      code: "U+1F4E8",
      name: "incoming envelope",
      image: "\uD83D\uDCE8",
      category: "Objects"
    },
    {
      code: "U+1F4E9",
      name: "envelope with arrow",
      image: "\uD83D\uDCE9",
      category: "Objects"
    },
    {
      code: "U+1F4E4",
      name: "outbox tray",
      image: "\uD83D\uDCE4",
      category: "Objects"
    },
    {
      code: "U+1F4E5",
      name: "inbox tray",
      image: "\uD83D\uDCE5",
      category: "Objects"
    },
    {
      code: "U+1F4E6",
      name: "package",
      image: "\uD83D\uDCE6",
      category: "Objects"
    },
    {
      code: "U+1F4EB",
      name: "closed mailbox with raised flag",
      image: "\uD83D\uDCEB",
      category: "Objects"
    },
    {
      code: "U+1F4EA",
      name: "closed mailbox with lowered flag",
      image: "\uD83D\uDCEA",
      category: "Objects"
    },
    {
      code: "U+1F4EC",
      name: "open mailbox with raised flag",
      image: "\uD83D\uDCEC",
      category: "Objects"
    },
    {
      code: "U+1F4ED",
      name: "open mailbox with lowered flag",
      image: "\uD83D\uDCED",
      category: "Objects"
    },
    {
      code: "U+1F4EE",
      name: "postbox",
      image: "\uD83D\uDCEE",
      category: "Objects"
    },
    {
      code: "U+1F5F3",
      name: "ballot box with ballot",
      image: "\uD83D\uDDF3",
      category: "Objects"
    },
    {
      code: "U+270F",
      name: "pencil",
      image: "✏",
      category: "Objects"
    },
    {
      code: "U+2712",
      name: "black nib",
      image: "✒",
      category: "Objects"
    },
    {
      code: "U+1F58B",
      name: "fountain pen",
      image: "\uD83D\uDD8B",
      category: "Objects"
    },
    {
      code: "U+1F58A",
      name: "pen",
      image: "\uD83D\uDD8A",
      category: "Objects"
    },
    {
      code: "U+1F58C",
      name: "paintbrush",
      image: "\uD83D\uDD8C",
      category: "Objects"
    },
    {
      code: "U+1F58D",
      name: "crayon",
      image: "\uD83D\uDD8D",
      category: "Objects"
    },
    {
      code: "U+1F4DD",
      name: "memo",
      image: "\uD83D\uDCDD",
      category: "Objects"
    },
    {
      code: "U+1F4BC",
      name: "briefcase",
      image: "\uD83D\uDCBC",
      category: "Objects"
    },
    {
      code: "U+1F4C1",
      name: "file folder",
      image: "\uD83D\uDCC1",
      category: "Objects"
    },
    {
      code: "U+1F4C2",
      name: "open file folder",
      image: "\uD83D\uDCC2",
      category: "Objects"
    },
    {
      code: "U+1F5C2",
      name: "card index dividers",
      image: "\uD83D\uDDC2",
      category: "Objects"
    },
    {
      code: "U+1F4C5",
      name: "calendar",
      image: "\uD83D\uDCC5",
      category: "Objects"
    },
    {
      code: "U+1F4C6",
      name: "tear-off calendar",
      image: "\uD83D\uDCC6",
      category: "Objects"
    },
    {
      code: "U+1F5D2",
      name: "spiral notepad",
      image: "\uD83D\uDDD2",
      category: "Objects"
    },
    {
      code: "U+1F5D3",
      name: "spiral calendar",
      image: "\uD83D\uDDD3",
      category: "Objects"
    },
    {
      code: "U+1F4C7",
      name: "card index",
      image: "\uD83D\uDCC7",
      category: "Objects"
    },
    {
      code: "U+1F4C8",
      name: "chart increasing",
      image: "\uD83D\uDCC8",
      category: "Objects"
    },
    {
      code: "U+1F4C9",
      name: "chart decreasing",
      image: "\uD83D\uDCC9",
      category: "Objects"
    },
    {
      code: "U+1F4CA",
      name: "bar chart",
      image: "\uD83D\uDCCA",
      category: "Objects"
    },
    {
      code: "U+1F4CB",
      name: "clipboard",
      image: "\uD83D\uDCCB",
      category: "Objects"
    },
    {
      code: "U+1F4CC",
      name: "pushpin",
      image: "\uD83D\uDCCC",
      category: "Objects"
    },
    {
      code: "U+1F4CD",
      name: "round pushpin",
      image: "\uD83D\uDCCD",
      category: "Objects"
    },
    {
      code: "U+1F4CE",
      name: "paperclip",
      image: "\uD83D\uDCCE",
      category: "Objects"
    },
    {
      code: "U+1F587",
      name: "linked paperclips",
      image: "\uD83D\uDD87",
      category: "Objects"
    },
    {
      code: "U+1F4CF",
      name: "straight ruler",
      image: "\uD83D\uDCCF",
      category: "Objects"
    },
    {
      code: "U+1F4D0",
      name: "triangular ruler",
      image: "\uD83D\uDCD0",
      category: "Objects"
    },
    {
      code: "U+2702",
      name: "scissors",
      image: "✂",
      category: "Objects"
    },
    {
      code: "U+1F5C3",
      name: "card file box",
      image: "\uD83D\uDDC3",
      category: "Objects"
    },
    {
      code: "U+1F5C4",
      name: "file cabinet",
      image: "\uD83D\uDDC4",
      category: "Objects"
    },
    {
      code: "U+1F5D1",
      name: "wastebasket",
      image: "\uD83D\uDDD1",
      category: "Objects"
    },
    {
      code: "U+1F512",
      name: "locked",
      image: "\uD83D\uDD12",
      category: "Objects"
    },
    {
      code: "U+1F513",
      name: "unlocked",
      image: "\uD83D\uDD13",
      category: "Objects"
    },
    {
      code: "U+1F50F",
      name: "locked with pen",
      image: "\uD83D\uDD0F",
      category: "Objects"
    },
    {
      code: "U+1F510",
      name: "locked with key",
      image: "\uD83D\uDD10",
      category: "Objects"
    },
    {
      code: "U+1F511",
      name: "key",
      image: "\uD83D\uDD11",
      category: "Objects"
    },
    {
      code: "U+1F5DD",
      name: "old key",
      image: "\uD83D\uDDDD",
      category: "Objects"
    },
    {
      code: "U+1F528",
      name: "hammer",
      image: "\uD83D\uDD28",
      category: "Objects"
    },
    {
      code: "U+1FA93",
      name: "axe",
      image: "\uD83E\uDE93",
      category: "Objects"
    },
    {
      code: "U+26CF",
      name: "pick",
      image: "⛏",
      category: "Objects"
    },
    {
      code: "U+2692",
      name: "hammer and pick",
      image: "⚒",
      category: "Objects"
    },
    {
      code: "U+1F6E0",
      name: "hammer and wrench",
      image: "\uD83D\uDEE0",
      category: "Objects"
    },
    {
      code: "U+1F5E1",
      name: "dagger",
      image: "\uD83D\uDDE1",
      category: "Objects"
    },
    {
      code: "U+2694",
      name: "crossed swords",
      image: "⚔",
      category: "Objects"
    },
    {
      code: "U+1F4A3",
      name: "bomb",
      image: "\uD83D\uDCA3",
      category: "Objects"
    },
    {
      code: "U+1FA83",
      name: "boomerang",
      image: "\uD83E\uDE83",
      category: "Objects"
    },
    {
      code: "U+1F3F9",
      name: "bow and arrow",
      image: "\uD83C\uDFF9",
      category: "Objects"
    },
    {
      code: "U+1F6E1",
      name: "shield",
      image: "\uD83D\uDEE1",
      category: "Objects"
    },
    {
      code: "U+1FA9A",
      name: "carpentry saw",
      image: "\uD83E\uDE9A",
      category: "Objects"
    },
    {
      code: "U+1F527",
      name: "wrench",
      image: "\uD83D\uDD27",
      category: "Objects"
    },
    {
      code: "U+1FA9B",
      name: "screwdriver",
      image: "\uD83E\uDE9B",
      category: "Objects"
    },
    {
      code: "U+1F529",
      name: "nut and bolt",
      image: "\uD83D\uDD29",
      category: "Objects"
    },
    {
      code: "U+2699",
      name: "gear",
      image: "⚙",
      category: "Objects"
    },
    {
      code: "U+1F5DC",
      name: "clamp",
      image: "\uD83D\uDDDC",
      category: "Objects"
    },
    {
      code: "U+2696",
      name: "balance scale",
      image: "⚖",
      category: "Objects"
    },
    {
      code: "U+1F9AF",
      name: "white cane",
      image: "\uD83E\uDDAF",
      category: "Objects"
    },
    {
      code: "U+1F517",
      name: "link",
      image: "\uD83D\uDD17",
      category: "Objects"
    },
    {
      code: "U+26D3",
      name: "chains",
      image: "⛓",
      category: "Objects"
    },
    {
      code: "U+1FA9D",
      name: "hook",
      image: "\uD83E\uDE9D",
      category: "Objects"
    },
    {
      code: "U+1F9F0",
      name: "toolbox",
      image: "\uD83E\uDDF0",
      category: "Objects"
    },
    {
      code: "U+1F9F2",
      name: "magnet",
      image: "\uD83E\uDDF2",
      category: "Objects"
    },
    {
      code: "U+1FA9C",
      name: "ladder",
      image: "\uD83E\uDE9C",
      category: "Objects"
    },
    {
      code: "U+2697",
      name: "alembic",
      image: "⚗",
      category: "Objects"
    },
    {
      code: "U+1F9EA",
      name: "test tube",
      image: "\uD83E\uDDEA",
      category: "Objects"
    },
    {
      code: "U+1F9EB",
      name: "petri dish",
      image: "\uD83E\uDDEB",
      category: "Objects"
    },
    {
      code: "U+1F9EC",
      name: "dna",
      image: "\uD83E\uDDEC",
      category: "Objects"
    },
    {
      code: "U+1F52C",
      name: "microscope",
      image: "\uD83D\uDD2C",
      category: "Objects"
    },
    {
      code: "U+1F52D",
      name: "telescope",
      image: "\uD83D\uDD2D",
      category: "Objects"
    },
    {
      code: "U+1F4E1",
      name: "satellite antenna",
      image: "\uD83D\uDCE1",
      category: "Objects"
    },
    {
      code: "U+1F489",
      name: "syringe",
      image: "\uD83D\uDC89",
      category: "Objects"
    },
    {
      code: "U+1FA78",
      name: "drop of blood",
      image: "\uD83E\uDE78",
      category: "Objects"
    },
    {
      code: "U+1F48A",
      name: "pill",
      image: "\uD83D\uDC8A",
      category: "Objects"
    },
    {
      code: "U+1FA79",
      name: "adhesive bandage",
      image: "\uD83E\uDE79",
      category: "Objects"
    },
    {
      code: "U+1FA7C",
      name: "crutch",
      image: "\uD83E\uDE7C",
      category: "Objects"
    },
    {
      code: "U+1FA7A",
      name: "stethoscope",
      image: "\uD83E\uDE7A",
      category: "Objects"
    },
    {
      code: "U+1FA7B",
      name: "x-ray",
      image: "\uD83E\uDE7B",
      category: "Objects"
    },
    {
      code: "U+1F6AA",
      name: "door",
      image: "\uD83D\uDEAA",
      category: "Objects"
    },
    {
      code: "U+1F6D7",
      name: "elevator",
      image: "\uD83D\uDED7",
      category: "Objects"
    },
    {
      code: "U+1FA9E",
      name: "mirror",
      image: "\uD83E\uDE9E",
      category: "Objects"
    },
    {
      code: "U+1FA9F",
      name: "window",
      image: "\uD83E\uDE9F",
      category: "Objects"
    },
    {
      code: "U+1F6CF",
      name: "bed",
      image: "\uD83D\uDECF",
      category: "Objects"
    },
    {
      code: "U+1F6CB",
      name: "couch and lamp",
      image: "\uD83D\uDECB",
      category: "Objects"
    },
    {
      code: "U+1FA91",
      name: "chair",
      image: "\uD83E\uDE91",
      category: "Objects"
    },
    {
      code: "U+1F6BD",
      name: "toilet",
      image: "\uD83D\uDEBD",
      category: "Objects"
    },
    {
      code: "U+1FAA0",
      name: "plunger",
      image: "\uD83E\uDEA0",
      category: "Objects"
    },
    {
      code: "U+1F6BF",
      name: "shower",
      image: "\uD83D\uDEBF",
      category: "Objects"
    },
    {
      code: "U+1F6C1",
      name: "bathtub",
      image: "\uD83D\uDEC1",
      category: "Objects"
    },
    {
      code: "U+1FAA4",
      name: "mouse trap",
      image: "\uD83E\uDEA4",
      category: "Objects"
    },
    {
      code: "U+1FA92",
      name: "razor",
      image: "\uD83E\uDE92",
      category: "Objects"
    },
    {
      code: "U+1F9F4",
      name: "lotion bottle",
      image: "\uD83E\uDDF4",
      category: "Objects"
    },
    {
      code: "U+1F9F7",
      name: "safety pin",
      image: "\uD83E\uDDF7",
      category: "Objects"
    },
    {
      code: "U+1F9F9",
      name: "broom",
      image: "\uD83E\uDDF9",
      category: "Objects"
    },
    {
      code: "U+1F9FA",
      name: "basket",
      image: "\uD83E\uDDFA",
      category: "Objects"
    },
    {
      code: "U+1F9FB",
      name: "roll of paper",
      image: "\uD83E\uDDFB",
      category: "Objects"
    },
    {
      code: "U+1FAA3",
      name: "bucket",
      image: "\uD83E\uDEA3",
      category: "Objects"
    },
    {
      code: "U+1F9FC",
      name: "soap",
      image: "\uD83E\uDDFC",
      category: "Objects"
    },
    {
      code: "U+1FAE7",
      name: "bubbles",
      image: "\uD83E\uDEE7",
      category: "Objects"
    },
    {
      code: "U+1FAA5",
      name: "toothbrush",
      image: "\uD83E\uDEA5",
      category: "Objects"
    },
    {
      code: "U+1F9FD",
      name: "sponge",
      image: "\uD83E\uDDFD",
      category: "Objects"
    },
    {
      code: "U+1F9EF",
      name: "fire extinguisher",
      image: "\uD83E\uDDEF",
      category: "Objects"
    },
    {
      code: "U+1F6D2",
      name: "shopping cart",
      image: "\uD83D\uDED2",
      category: "Objects"
    },
    {
      code: "U+1F6AC",
      name: "cigarette",
      image: "\uD83D\uDEAC",
      category: "Objects"
    },
    {
      code: "U+26B0",
      name: "coffin",
      image: "⚰",
      category: "Objects"
    },
    {
      code: "U+1FAA6",
      name: "headstone",
      image: "\uD83E\uDEA6",
      category: "Objects"
    },
    {
      code: "U+26B1",
      name: "funeral urn",
      image: "⚱",
      category: "Objects"
    },
    {
      code: "U+1F9FF",
      name: "nazar amulet",
      image: "\uD83E\uDDFF",
      category: "Objects"
    },
    {
      code: "U+1FAAC",
      name: "hamsa",
      image: "\uD83E\uDEAC",
      category: "Objects"
    },
    {
      code: "U+1F5FF",
      name: "moai",
      image: "\uD83D\uDDFF",
      category: "Objects"
    },
    {
      code: "U+1FAA7",
      name: "placard",
      image: "\uD83E\uDEA7",
      category: "Objects"
    },
    {
      code: "U+1FAAA",
      name: "identification card",
      image: "\uD83E\uDEAA",
      category: "Objects"
    },
    {
      code: "U+1F3E7",
      name: "ATM sign",
      image: "\uD83C\uDFE7",
      category: "Symbols"
    },
    {
      code: "U+1F6AE",
      name: "litter in bin sign",
      image: "\uD83D\uDEAE",
      category: "Symbols"
    },
    {
      code: "U+1F6B0",
      name: "potable water",
      image: "\uD83D\uDEB0",
      category: "Symbols"
    },
    {
      code: "U+267F",
      name: "wheelchair symbol",
      image: "♿",
      category: "Symbols"
    },
    {
      code: "U+1F6B9",
      name: "men’s room",
      image: "\uD83D\uDEB9",
      category: "Symbols"
    },
    {
      code: "U+1F6BA",
      name: "women’s room",
      image: "\uD83D\uDEBA",
      category: "Symbols"
    },
    {
      code: "U+1F6BB",
      name: "restroom",
      image: "\uD83D\uDEBB",
      category: "Symbols"
    },
    {
      code: "U+1F6BC",
      name: "baby symbol",
      image: "\uD83D\uDEBC",
      category: "Symbols"
    },
    {
      code: "U+1F6BE",
      name: "water closet",
      image: "\uD83D\uDEBE",
      category: "Symbols"
    },
    {
      code: "U+1F6C2",
      name: "passport control",
      image: "\uD83D\uDEC2",
      category: "Symbols"
    },
    {
      code: "U+1F6C3",
      name: "customs",
      image: "\uD83D\uDEC3",
      category: "Symbols"
    },
    {
      code: "U+1F6C4",
      name: "baggage claim",
      image: "\uD83D\uDEC4",
      category: "Symbols"
    },
    {
      code: "U+1F6C5",
      name: "left luggage",
      image: "\uD83D\uDEC5",
      category: "Symbols"
    },
    {
      code: "U+26A0",
      name: "warning",
      image: "⚠",
      category: "Symbols"
    },
    {
      code: "U+1F6B8",
      name: "children crossing",
      image: "\uD83D\uDEB8",
      category: "Symbols"
    },
    {
      code: "U+26D4",
      name: "no entry",
      image: "⛔",
      category: "Symbols"
    },
    {
      code: "U+1F6AB",
      name: "prohibited",
      image: "\uD83D\uDEAB",
      category: "Symbols"
    },
    {
      code: "U+1F6B3",
      name: "no bicycles",
      image: "\uD83D\uDEB3",
      category: "Symbols"
    },
    {
      code: "U+1F6AD",
      name: "no smoking",
      image: "\uD83D\uDEAD",
      category: "Symbols"
    },
    {
      code: "U+1F6AF",
      name: "no littering",
      image: "\uD83D\uDEAF",
      category: "Symbols"
    },
    {
      code: "U+1F6B1",
      name: "non-potable water",
      image: "\uD83D\uDEB1",
      category: "Symbols"
    },
    {
      code: "U+1F6B7",
      name: "no pedestrians",
      image: "\uD83D\uDEB7",
      category: "Symbols"
    },
    {
      code: "U+1F4F5",
      name: "no mobile phones",
      image: "\uD83D\uDCF5",
      category: "Symbols"
    },
    {
      code: "U+1F51E",
      name: "no one under eighteen",
      image: "\uD83D\uDD1E",
      category: "Symbols"
    },
    {
      code: "U+2622",
      name: "radioactive",
      image: "☢",
      category: "Symbols"
    },
    {
      code: "U+2623",
      name: "biohazard",
      image: "☣",
      category: "Symbols"
    },
    {
      code: "U+2B06",
      name: "up arrow",
      image: "⬆",
      category: "Symbols"
    },
    {
      code: "U+2197",
      name: "up-right arrow",
      image: "↗",
      category: "Symbols"
    },
    {
      code: "U+27A1",
      name: "right arrow",
      image: "➡",
      category: "Symbols"
    },
    {
      code: "U+2198",
      name: "down-right arrow",
      image: "↘",
      category: "Symbols"
    },
    {
      code: "U+2B07",
      name: "down arrow",
      image: "⬇",
      category: "Symbols"
    },
    {
      code: "U+2199",
      name: "down-left arrow",
      image: "↙",
      category: "Symbols"
    },
    {
      code: "U+2B05",
      name: "left arrow",
      image: "⬅",
      category: "Symbols"
    },
    {
      code: "U+2196",
      name: "up-left arrow",
      image: "↖",
      category: "Symbols"
    },
    {
      code: "U+2195",
      name: "up-down arrow",
      image: "↕",
      category: "Symbols"
    },
    {
      code: "U+2194",
      name: "left-right arrow",
      image: "↔",
      category: "Symbols"
    },
    {
      code: "U+21A9",
      name: "right arrow curving left",
      image: "↩",
      category: "Symbols"
    },
    {
      code: "U+21AA",
      name: "left arrow curving right",
      image: "↪",
      category: "Symbols"
    },
    {
      code: "U+2934",
      name: "right arrow curving up",
      image: "⤴",
      category: "Symbols"
    },
    {
      code: "U+2935",
      name: "right arrow curving down",
      image: "⤵",
      category: "Symbols"
    },
    {
      code: "U+1F503",
      name: "clockwise vertical arrows",
      image: "\uD83D\uDD03",
      category: "Symbols"
    },
    {
      code: "U+1F504",
      name: "counterclockwise arrows button",
      image: "\uD83D\uDD04",
      category: "Symbols"
    },
    {
      code: "U+1F519",
      name: "BACK arrow",
      image: "\uD83D\uDD19",
      category: "Symbols"
    },
    {
      code: "U+1F51A",
      name: "END arrow",
      image: "\uD83D\uDD1A",
      category: "Symbols"
    },
    {
      code: "U+1F51B",
      name: "ON! arrow",
      image: "\uD83D\uDD1B",
      category: "Symbols"
    },
    {
      code: "U+1F51C",
      name: "SOON arrow",
      image: "\uD83D\uDD1C",
      category: "Symbols"
    },
    {
      code: "U+1F51D",
      name: "TOP arrow",
      image: "\uD83D\uDD1D",
      category: "Symbols"
    },
    {
      code: "U+1F6D0",
      name: "place of worship",
      image: "\uD83D\uDED0",
      category: "Symbols"
    },
    {
      code: "U+269B",
      name: "atom symbol",
      image: "⚛",
      category: "Symbols"
    },
    {
      code: "U+1F549",
      name: "om",
      image: "\uD83D\uDD49",
      category: "Symbols"
    },
    {
      code: "U+2721",
      name: "star of David",
      image: "✡",
      category: "Symbols"
    },
    {
      code: "U+2638",
      name: "wheel of dharma",
      image: "☸",
      category: "Symbols"
    },
    {
      code: "U+262F",
      name: "yin yang",
      image: "☯",
      category: "Symbols"
    },
    {
      code: "U+271D",
      name: "latin cross",
      image: "✝",
      category: "Symbols"
    },
    {
      code: "U+2626",
      name: "orthodox cross",
      image: "☦",
      category: "Symbols"
    },
    {
      code: "U+262A",
      name: "star and crescent",
      image: "☪",
      category: "Symbols"
    },
    {
      code: "U+262E",
      name: "peace symbol",
      image: "☮",
      category: "Symbols"
    },
    {
      code: "U+1F54E",
      name: "menorah",
      image: "\uD83D\uDD4E",
      category: "Symbols"
    },
    {
      code: "U+1F52F",
      name: "dotted six-pointed star",
      image: "\uD83D\uDD2F",
      category: "Symbols"
    },
    {
      code: "U+2648",
      name: "Aries",
      image: "♈",
      category: "Symbols"
    },
    {
      code: "U+2649",
      name: "Taurus",
      image: "♉",
      category: "Symbols"
    },
    {
      code: "U+264A",
      name: "Gemini",
      image: "♊",
      category: "Symbols"
    },
    {
      code: "U+264B",
      name: "Cancer",
      image: "♋",
      category: "Symbols"
    },
    {
      code: "U+264C",
      name: "Leo",
      image: "♌",
      category: "Symbols"
    },
    {
      code: "U+264D",
      name: "Virgo",
      image: "♍",
      category: "Symbols"
    },
    {
      code: "U+264E",
      name: "Libra",
      image: "♎",
      category: "Symbols"
    },
    {
      code: "U+264F",
      name: "Scorpio",
      image: "♏",
      category: "Symbols"
    },
    {
      code: "U+2650",
      name: "Sagittarius",
      image: "♐",
      category: "Symbols"
    },
    {
      code: "U+2651",
      name: "Capricorn",
      image: "♑",
      category: "Symbols"
    },
    {
      code: "U+2652",
      name: "Aquarius",
      image: "♒",
      category: "Symbols"
    },
    {
      code: "U+2653",
      name: "Pisces",
      image: "♓",
      category: "Symbols"
    },
    {
      code: "U+26CE",
      name: "Ophiuchus",
      image: "⛎",
      category: "Symbols"
    },
    {
      code: "U+1F500",
      name: "shuffle tracks button",
      image: "\uD83D\uDD00",
      category: "Symbols"
    },
    {
      code: "U+1F501",
      name: "repeat button",
      image: "\uD83D\uDD01",
      category: "Symbols"
    },
    {
      code: "U+1F502",
      name: "repeat single button",
      image: "\uD83D\uDD02",
      category: "Symbols"
    },
    {
      code: "U+25B6",
      name: "play button",
      image: "▶",
      category: "Symbols"
    },
    {
      code: "U+23E9",
      name: "fast-forward button",
      image: "⏩",
      category: "Symbols"
    },
    {
      code: "U+23ED",
      name: "next track button",
      image: "⏭",
      category: "Symbols"
    },
    {
      code: "U+23EF",
      name: "play or pause button",
      image: "⏯",
      category: "Symbols"
    },
    {
      code: "U+25C0",
      name: "reverse button",
      image: "◀",
      category: "Symbols"
    },
    {
      code: "U+23EA",
      name: "fast reverse button",
      image: "⏪",
      category: "Symbols"
    },
    {
      code: "U+23EE",
      name: "last track button",
      image: "⏮",
      category: "Symbols"
    },
    {
      code: "U+1F53C",
      name: "upwards button",
      image: "\uD83D\uDD3C",
      category: "Symbols"
    },
    {
      code: "U+23EB",
      name: "fast up button",
      image: "⏫",
      category: "Symbols"
    },
    {
      code: "U+1F53D",
      name: "downwards button",
      image: "\uD83D\uDD3D",
      category: "Symbols"
    },
    {
      code: "U+23EC",
      name: "fast down button",
      image: "⏬",
      category: "Symbols"
    },
    {
      code: "U+23F8",
      name: "pause button",
      image: "⏸",
      category: "Symbols"
    },
    {
      code: "U+23F9",
      name: "stop button",
      image: "⏹",
      category: "Symbols"
    },
    {
      code: "U+23FA",
      name: "record button",
      image: "⏺",
      category: "Symbols"
    },
    {
      code: "U+23CF",
      name: "eject button",
      image: "⏏",
      category: "Symbols"
    },
    {
      code: "U+1F3A6",
      name: "cinema",
      image: "\uD83C\uDFA6",
      category: "Symbols"
    },
    {
      code: "U+1F505",
      name: "dim button",
      image: "\uD83D\uDD05",
      category: "Symbols"
    },
    {
      code: "U+1F506",
      name: "bright button",
      image: "\uD83D\uDD06",
      category: "Symbols"
    },
    {
      code: "U+1F4F6",
      name: "antenna bars",
      image: "\uD83D\uDCF6",
      category: "Symbols"
    },
    {
      code: "U+1F4F3",
      name: "vibration mode",
      image: "\uD83D\uDCF3",
      category: "Symbols"
    },
    {
      code: "U+1F4F4",
      name: "mobile phone off",
      image: "\uD83D\uDCF4",
      category: "Symbols"
    },
    {
      code: "U+2640",
      name: "female sign",
      image: "♀",
      category: "Symbols"
    },
    {
      code: "U+2642",
      name: "male sign",
      image: "♂",
      category: "Symbols"
    },
    {
      code: "U+26A7",
      name: "transgender symbol",
      image: "⚧",
      category: "Symbols"
    },
    {
      code: "U+2716",
      name: "multiply",
      image: "✖",
      category: "Symbols"
    },
    {
      code: "U+2795",
      name: "plus",
      image: "➕",
      category: "Symbols"
    },
    {
      code: "U+2796",
      name: "minus",
      image: "➖",
      category: "Symbols"
    },
    {
      code: "U+2797",
      name: "divide",
      image: "➗",
      category: "Symbols"
    },
    {
      code: "U+1F7F0",
      name: "heavy equals sign",
      image: "\uD83D\uDFF0",
      category: "Symbols"
    },
    {
      code: "U+267E",
      name: "infinity",
      image: "♾",
      category: "Symbols"
    },
    {
      code: "U+203C",
      name: "double exclamation mark",
      image: "‼",
      category: "Symbols"
    },
    {
      code: "U+2049",
      name: "exclamation question mark",
      image: "⁉",
      category: "Symbols"
    },
    {
      code: "U+2753",
      name: "red question mark",
      image: "❓",
      category: "Symbols"
    },
    {
      code: "U+2754",
      name: "white question mark",
      image: "❔",
      category: "Symbols"
    },
    {
      code: "U+2755",
      name: "white exclamation mark",
      image: "❕",
      category: "Symbols"
    },
    {
      code: "U+2757",
      name: "red exclamation mark",
      image: "❗",
      category: "Symbols"
    },
    {
      code: "U+3030",
      name: "wavy dash",
      image: "〰",
      category: "Symbols"
    },
    {
      code: "U+1F4B1",
      name: "currency exchange",
      image: "\uD83D\uDCB1",
      category: "Symbols"
    },
    {
      code: "U+1F4B2",
      name: "heavy dollar sign",
      image: "\uD83D\uDCB2",
      category: "Symbols"
    },
    {
      code: "U+2695",
      name: "medical symbol",
      image: "⚕",
      category: "Symbols"
    },
    {
      code: "U+267B",
      name: "recycling symbol",
      image: "♻",
      category: "Symbols"
    },
    {
      code: "U+269C",
      name: "fleur-de-lis",
      image: "⚜",
      category: "Symbols"
    },
    {
      code: "U+1F531",
      name: "trident emblem",
      image: "\uD83D\uDD31",
      category: "Symbols"
    },
    {
      code: "U+1F4DB",
      name: "name badge",
      image: "\uD83D\uDCDB",
      category: "Symbols"
    },
    {
      code: "U+1F530",
      name: "Japanese symbol for beginner",
      image: "\uD83D\uDD30",
      category: "Symbols"
    },
    {
      code: "U+2B55",
      name: "hollow red circle",
      image: "⭕",
      category: "Symbols"
    },
    {
      code: "U+2705",
      name: "check mark button",
      image: "✅",
      category: "Symbols"
    },
    {
      code: "U+2611",
      name: "check box with check",
      image: "☑",
      category: "Symbols"
    },
    {
      code: "U+2714",
      name: "check mark",
      image: "✔",
      category: "Symbols"
    },
    {
      code: "U+274C",
      name: "cross mark",
      image: "❌",
      category: "Symbols"
    },
    {
      code: "U+274E",
      name: "cross mark button",
      image: "❎",
      category: "Symbols"
    },
    {
      code: "U+27B0",
      name: "curly loop",
      image: "➰",
      category: "Symbols"
    },
    {
      code: "U+27BF",
      name: "double curly loop",
      image: "➿",
      category: "Symbols"
    },
    {
      code: "U+303D",
      name: "part alternation mark",
      image: "〽",
      category: "Symbols"
    },
    {
      code: "U+2733",
      name: "eight-spoked asterisk",
      image: "✳",
      category: "Symbols"
    },
    {
      code: "U+2734",
      name: "eight-pointed star",
      image: "✴",
      category: "Symbols"
    },
    {
      code: "U+2747",
      name: "sparkle",
      image: "❇",
      category: "Symbols"
    },
    {
      code: "U+00A9",
      name: "copyright",
      image: "©",
      category: "Symbols"
    },
    {
      code: "U+00AE",
      name: "registered",
      image: "®",
      category: "Symbols"
    },
    {
      code: "U+2122",
      name: "trade mark",
      image: "™",
      category: "Symbols"
    },
    {
      code: "U+0023 U+FE0F U+20E3",
      name: "keycap: #",
      image: "#️⃣",
      category: "Symbols"
    },
    {
      code: "U+002A U+FE0F U+20E3",
      name: "keycap: *",
      image: "*️⃣",
      category: "Symbols"
    },
    {
      code: "U+0030 U+FE0F U+20E3",
      name: "keycap: 0",
      image: "0️⃣",
      category: "Symbols"
    },
    {
      code: "U+0031 U+FE0F U+20E3",
      name: "keycap: 1",
      image: "1️⃣",
      category: "Symbols"
    },
    {
      code: "U+0032 U+FE0F U+20E3",
      name: "keycap: 2",
      image: "2️⃣",
      category: "Symbols"
    },
    {
      code: "U+0033 U+FE0F U+20E3",
      name: "keycap: 3",
      image: "3️⃣",
      category: "Symbols"
    },
    {
      code: "U+0034 U+FE0F U+20E3",
      name: "keycap: 4",
      image: "4️⃣",
      category: "Symbols"
    },
    {
      code: "U+0035 U+FE0F U+20E3",
      name: "keycap: 5",
      image: "5️⃣",
      category: "Symbols"
    },
    {
      code: "U+0036 U+FE0F U+20E3",
      name: "keycap: 6",
      image: "6️⃣",
      category: "Symbols"
    },
    {
      code: "U+0037 U+FE0F U+20E3",
      name: "keycap: 7",
      image: "7️⃣",
      category: "Symbols"
    },
    {
      code: "U+0038 U+FE0F U+20E3",
      name: "keycap: 8",
      image: "8️⃣",
      category: "Symbols"
    },
    {
      code: "U+0039 U+FE0F U+20E3",
      name: "keycap: 9",
      image: "9️⃣",
      category: "Symbols"
    },
    {
      code: "U+1F51F",
      name: "keycap: 10",
      image: "\uD83D\uDD1F",
      category: "Symbols"
    },
    {
      code: "U+1F520",
      name: "input latin uppercase",
      image: "\uD83D\uDD20",
      category: "Symbols"
    },
    {
      code: "U+1F521",
      name: "input latin lowercase",
      image: "\uD83D\uDD21",
      category: "Symbols"
    },
    {
      code: "U+1F522",
      name: "input numbers",
      image: "\uD83D\uDD22",
      category: "Symbols"
    },
    {
      code: "U+1F523",
      name: "input symbols",
      image: "\uD83D\uDD23",
      category: "Symbols"
    },
    {
      code: "U+1F524",
      name: "input latin letters",
      image: "\uD83D\uDD24",
      category: "Symbols"
    },
    {
      code: "U+1F170",
      name: "A button (blood type)",
      image: "\uD83C\uDD70",
      category: "Symbols"
    },
    {
      code: "U+1F18E",
      name: "AB button (blood type)",
      image: "\uD83C\uDD8E",
      category: "Symbols"
    },
    {
      code: "U+1F171",
      name: "B button (blood type)",
      image: "\uD83C\uDD71",
      category: "Symbols"
    },
    {
      code: "U+1F191",
      name: "CL button",
      image: "\uD83C\uDD91",
      category: "Symbols"
    },
    {
      code: "U+1F192",
      name: "COOL button",
      image: "\uD83C\uDD92",
      category: "Symbols"
    },
    {
      code: "U+1F193",
      name: "FREE button",
      image: "\uD83C\uDD93",
      category: "Symbols"
    },
    {
      code: "U+2139",
      name: "information",
      image: "ℹ",
      category: "Symbols"
    },
    {
      code: "U+1F194",
      name: "ID button",
      image: "\uD83C\uDD94",
      category: "Symbols"
    },
    {
      code: "U+24C2",
      name: "circled M",
      image: "Ⓜ",
      category: "Symbols"
    },
    {
      code: "U+1F195",
      name: "NEW button",
      image: "\uD83C\uDD95",
      category: "Symbols"
    },
    {
      code: "U+1F196",
      name: "NG button",
      image: "\uD83C\uDD96",
      category: "Symbols"
    },
    {
      code: "U+1F17E",
      name: "O button (blood type)",
      image: "\uD83C\uDD7E",
      category: "Symbols"
    },
    {
      code: "U+1F197",
      name: "OK button",
      image: "\uD83C\uDD97",
      category: "Symbols"
    },
    {
      code: "U+1F17F",
      name: "P button",
      image: "\uD83C\uDD7F",
      category: "Symbols"
    },
    {
      code: "U+1F198",
      name: "SOS button",
      image: "\uD83C\uDD98",
      category: "Symbols"
    },
    {
      code: "U+1F199",
      name: "UP! button",
      image: "\uD83C\uDD99",
      category: "Symbols"
    },
    {
      code: "U+1F19A",
      name: "VS button",
      image: "\uD83C\uDD9A",
      category: "Symbols"
    },
    {
      code: "U+1F201",
      name: "Japanese “here” button",
      image: "\uD83C\uDE01",
      category: "Symbols"
    },
    {
      code: "U+1F202",
      name: "Japanese “service charge” button",
      image: "\uD83C\uDE02",
      category: "Symbols"
    },
    {
      code: "U+1F237",
      name: "Japanese “monthly amount” button",
      image: "\uD83C\uDE37",
      category: "Symbols"
    },
    {
      code: "U+1F236",
      name: "Japanese “not free of charge” button",
      image: "\uD83C\uDE36",
      category: "Symbols"
    },
    {
      code: "U+1F22F",
      name: "Japanese “reserved” button",
      image: "\uD83C\uDE2F",
      category: "Symbols"
    },
    {
      code: "U+1F250",
      name: "Japanese “bargain” button",
      image: "\uD83C\uDE50",
      category: "Symbols"
    },
    {
      code: "U+1F239",
      name: "Japanese “discount” button",
      image: "\uD83C\uDE39",
      category: "Symbols"
    },
    {
      code: "U+1F21A",
      name: "Japanese “free of charge” button",
      image: "\uD83C\uDE1A",
      category: "Symbols"
    },
    {
      code: "U+1F232",
      name: "Japanese “prohibited” button",
      image: "\uD83C\uDE32",
      category: "Symbols"
    },
    {
      code: "U+1F251",
      name: "Japanese “acceptable” button",
      image: "\uD83C\uDE51",
      category: "Symbols"
    },
    {
      code: "U+1F238",
      name: "Japanese “application” button",
      image: "\uD83C\uDE38",
      category: "Symbols"
    },
    {
      code: "U+1F234",
      name: "Japanese “passing grade” button",
      image: "\uD83C\uDE34",
      category: "Symbols"
    },
    {
      code: "U+1F233",
      name: "Japanese “vacancy” button",
      image: "\uD83C\uDE33",
      category: "Symbols"
    },
    {
      code: "U+3297",
      name: "Japanese “congratulations” button",
      image: "㊗",
      category: "Symbols"
    },
    {
      code: "U+3299",
      name: "Japanese “secret” button",
      image: "㊙",
      category: "Symbols"
    },
    {
      code: "U+1F23A",
      name: "Japanese “open for business” button",
      image: "\uD83C\uDE3A",
      category: "Symbols"
    },
    {
      code: "U+1F235",
      name: "Japanese “no vacancy” button",
      image: "\uD83C\uDE35",
      category: "Symbols"
    },
    {
      code: "U+1F534",
      name: "red circle",
      image: "\uD83D\uDD34",
      category: "Symbols"
    },
    {
      code: "U+1F7E0",
      name: "orange circle",
      image: "\uD83D\uDFE0",
      category: "Symbols"
    },
    {
      code: "U+1F7E1",
      name: "yellow circle",
      image: "\uD83D\uDFE1",
      category: "Symbols"
    },
    {
      code: "U+1F7E2",
      name: "green circle",
      image: "\uD83D\uDFE2",
      category: "Symbols"
    },
    {
      code: "U+1F535",
      name: "blue circle",
      image: "\uD83D\uDD35",
      category: "Symbols"
    },
    {
      code: "U+1F7E3",
      name: "purple circle",
      image: "\uD83D\uDFE3",
      category: "Symbols"
    },
    {
      code: "U+1F7E4",
      name: "brown circle",
      image: "\uD83D\uDFE4",
      category: "Symbols"
    },
    {
      code: "U+26AB",
      name: "black circle",
      image: "⚫",
      category: "Symbols"
    },
    {
      code: "U+26AA",
      name: "white circle",
      image: "⚪",
      category: "Symbols"
    },
    {
      code: "U+1F7E5",
      name: "red square",
      image: "\uD83D\uDFE5",
      category: "Symbols"
    },
    {
      code: "U+1F7E7",
      name: "orange square",
      image: "\uD83D\uDFE7",
      category: "Symbols"
    },
    {
      code: "U+1F7E8",
      name: "yellow square",
      image: "\uD83D\uDFE8",
      category: "Symbols"
    },
    {
      code: "U+1F7E9",
      name: "green square",
      image: "\uD83D\uDFE9",
      category: "Symbols"
    },
    {
      code: "U+1F7E6",
      name: "blue square",
      image: "\uD83D\uDFE6",
      category: "Symbols"
    },
    {
      code: "U+1F7EA",
      name: "purple square",
      image: "\uD83D\uDFEA",
      category: "Symbols"
    },
    {
      code: "U+1F7EB",
      name: "brown square",
      image: "\uD83D\uDFEB",
      category: "Symbols"
    },
    {
      code: "U+2B1B",
      name: "black large square",
      image: "⬛",
      category: "Symbols"
    },
    {
      code: "U+2B1C",
      name: "white large square",
      image: "⬜",
      category: "Symbols"
    },
    {
      code: "U+25FC",
      name: "black medium square",
      image: "◼",
      category: "Symbols"
    },
    {
      code: "U+25FB",
      name: "white medium square",
      image: "◻",
      category: "Symbols"
    },
    {
      code: "U+25FE",
      name: "black medium-small square",
      image: "◾",
      category: "Symbols"
    },
    {
      code: "U+25FD",
      name: "white medium-small square",
      image: "◽",
      category: "Symbols"
    },
    {
      code: "U+25AA",
      name: "black small square",
      image: "▪",
      category: "Symbols"
    },
    {
      code: "U+25AB",
      name: "white small square",
      image: "▫",
      category: "Symbols"
    },
    {
      code: "U+1F536",
      name: "large orange diamond",
      image: "\uD83D\uDD36",
      category: "Symbols"
    },
    {
      code: "U+1F537",
      name: "large blue diamond",
      image: "\uD83D\uDD37",
      category: "Symbols"
    },
    {
      code: "U+1F538",
      name: "small orange diamond",
      image: "\uD83D\uDD38",
      category: "Symbols"
    },
    {
      code: "U+1F539",
      name: "small blue diamond",
      image: "\uD83D\uDD39",
      category: "Symbols"
    },
    {
      code: "U+1F53A",
      name: "red triangle pointed up",
      image: "\uD83D\uDD3A",
      category: "Symbols"
    },
    {
      code: "U+1F53B",
      name: "red triangle pointed down",
      image: "\uD83D\uDD3B",
      category: "Symbols"
    },
    {
      code: "U+1F4A0",
      name: "diamond with a dot",
      image: "\uD83D\uDCA0",
      category: "Symbols"
    },
    {
      code: "U+1F518",
      name: "radio button",
      image: "\uD83D\uDD18",
      category: "Symbols"
    },
    {
      code: "U+1F533",
      name: "white square button",
      image: "\uD83D\uDD33",
      category: "Symbols"
    },
    {
      code: "U+1F532",
      name: "black square button",
      image: "\uD83D\uDD32",
      category: "Symbols"
    },
    {
      code: "U+1F3C1",
      name: "chequered flag",
      image: "\uD83C\uDFC1",
      category: "Flags"
    },
    {
      code: "U+1F6A9",
      name: "triangular flag",
      image: "\uD83D\uDEA9",
      category: "Flags"
    },
    {
      code: "U+1F38C",
      name: "crossed flags",
      image: "\uD83C\uDF8C",
      category: "Flags"
    },
    {
      code: "U+1F3F4",
      name: "black flag",
      image: "\uD83C\uDFF4",
      category: "Flags"
    },
    {
      code: "U+1F3F3",
      name: "white flag",
      image: "\uD83C\uDFF3",
      category: "Flags"
    },
    {
      code: "U+1F3F3 U+FE0F U+200D U+1F308",
      name: "rainbow flag",
      image: "\uD83C\uDFF3️‍\uD83C\uDF08",
      category: "Flags"
    },
    {
      code: "U+1F3F3 U+FE0F U+200D U+26A7 U+FE0F",
      name: "transgender flag",
      image: "\uD83C\uDFF3️‍⚧️",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+200D U+2620 U+FE0F",
      name: "pirate flag",
      image: "\uD83C\uDFF4‍☠️",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1E8",
      name: "flag: Ascension Island",
      image: "\uD83C\uDDE6\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1E9",
      name: "flag: Andorra",
      image: "\uD83C\uDDE6\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EA",
      name: "flag: United Arab Emirates",
      image: "\uD83C\uDDE6\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EB",
      name: "flag: Afghanistan",
      image: "\uD83C\uDDE6\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EC",
      name: "flag: Antigua & Barbuda",
      image: "\uD83C\uDDE6\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EE",
      name: "flag: Anguilla",
      image: "\uD83C\uDDE6\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F1",
      name: "flag: Albania",
      image: "\uD83C\uDDE6\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F2",
      name: "flag: Armenia",
      image: "\uD83C\uDDE6\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F4",
      name: "flag: Angola",
      image: "\uD83C\uDDE6\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F6",
      name: "flag: Antarctica",
      image: "\uD83C\uDDE6\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F7",
      name: "flag: Argentina",
      image: "\uD83C\uDDE6\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F8",
      name: "flag: American Samoa",
      image: "\uD83C\uDDE6\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F9",
      name: "flag: Austria",
      image: "\uD83C\uDDE6\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FA",
      name: "flag: Australia",
      image: "\uD83C\uDDE6\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FC",
      name: "flag: Aruba",
      image: "\uD83C\uDDE6\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FD",
      name: "flag: Åland Islands",
      image: "\uD83C\uDDE6\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FF",
      name: "flag: Azerbaijan",
      image: "\uD83C\uDDE6\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E6",
      name: "flag: Bosnia & Herzegovina",
      image: "\uD83C\uDDE7\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E7",
      name: "flag: Barbados",
      image: "\uD83C\uDDE7\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E9",
      name: "flag: Bangladesh",
      image: "\uD83C\uDDE7\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EA",
      name: "flag: Belgium",
      image: "\uD83C\uDDE7\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EB",
      name: "flag: Burkina Faso",
      image: "\uD83C\uDDE7\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EC",
      name: "flag: Bulgaria",
      image: "\uD83C\uDDE7\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1ED",
      name: "flag: Bahrain",
      image: "\uD83C\uDDE7\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EE",
      name: "flag: Burundi",
      image: "\uD83C\uDDE7\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EF",
      name: "flag: Benin",
      image: "\uD83C\uDDE7\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F1",
      name: "flag: St. Barthélemy",
      image: "\uD83C\uDDE7\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F2",
      name: "flag: Bermuda",
      image: "\uD83C\uDDE7\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F3",
      name: "flag: Brunei",
      image: "\uD83C\uDDE7\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F4",
      name: "flag: Bolivia",
      image: "\uD83C\uDDE7\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F6",
      name: "flag: Caribbean Netherlands",
      image: "\uD83C\uDDE7\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F7",
      name: "flag: Brazil",
      image: "\uD83C\uDDE7\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F8",
      name: "flag: Bahamas",
      image: "\uD83C\uDDE7\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F9",
      name: "flag: Bhutan",
      image: "\uD83C\uDDE7\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FB",
      name: "flag: Bouvet Island",
      image: "\uD83C\uDDE7\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FC",
      name: "flag: Botswana",
      image: "\uD83C\uDDE7\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FE",
      name: "flag: Belarus",
      image: "\uD83C\uDDE7\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FF",
      name: "flag: Belize",
      image: "\uD83C\uDDE7\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E6",
      name: "flag: Canada",
      image: "\uD83C\uDDE8\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E8",
      name: "flag: Cocos (Keeling) Islands",
      image: "\uD83C\uDDE8\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E9",
      name: "flag: Congo - Kinshasa",
      image: "\uD83C\uDDE8\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EB",
      name: "flag: Central African Republic",
      image: "\uD83C\uDDE8\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EC",
      name: "flag: Congo - Brazzaville",
      image: "\uD83C\uDDE8\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1ED",
      name: "flag: Switzerland",
      image: "\uD83C\uDDE8\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EE",
      name: "flag: Côte d’Ivoire",
      image: "\uD83C\uDDE8\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F0",
      name: "flag: Cook Islands",
      image: "\uD83C\uDDE8\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F1",
      name: "flag: Chile",
      image: "\uD83C\uDDE8\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F2",
      name: "flag: Cameroon",
      image: "\uD83C\uDDE8\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F3",
      name: "flag: China",
      image: "\uD83C\uDDE8\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F4",
      name: "flag: Colombia",
      image: "\uD83C\uDDE8\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F5",
      name: "flag: Clipperton Island",
      image: "\uD83C\uDDE8\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F7",
      name: "flag: Costa Rica",
      image: "\uD83C\uDDE8\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FA",
      name: "flag: Cuba",
      image: "\uD83C\uDDE8\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FB",
      name: "flag: Cape Verde",
      image: "\uD83C\uDDE8\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FC",
      name: "flag: Curaçao",
      image: "\uD83C\uDDE8\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FD",
      name: "flag: Christmas Island",
      image: "\uD83C\uDDE8\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FE",
      name: "flag: Cyprus",
      image: "\uD83C\uDDE8\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FF",
      name: "flag: Czechia",
      image: "\uD83C\uDDE8\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EA",
      name: "flag: Germany",
      image: "\uD83C\uDDE9\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EC",
      name: "flag: Diego Garcia",
      image: "\uD83C\uDDE9\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EF",
      name: "flag: Djibouti",
      image: "\uD83C\uDDE9\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F0",
      name: "flag: Denmark",
      image: "\uD83C\uDDE9\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F2",
      name: "flag: Dominica",
      image: "\uD83C\uDDE9\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F4",
      name: "flag: Dominican Republic",
      image: "\uD83C\uDDE9\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1FF",
      name: "flag: Algeria",
      image: "\uD83C\uDDE9\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1E6",
      name: "flag: Ceuta & Melilla",
      image: "\uD83C\uDDEA\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1E8",
      name: "flag: Ecuador",
      image: "\uD83C\uDDEA\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1EA",
      name: "flag: Estonia",
      image: "\uD83C\uDDEA\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1EC",
      name: "flag: Egypt",
      image: "\uD83C\uDDEA\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1ED",
      name: "flag: Western Sahara",
      image: "\uD83C\uDDEA\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F7",
      name: "flag: Eritrea",
      image: "\uD83C\uDDEA\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F8",
      name: "flag: Spain",
      image: "\uD83C\uDDEA\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F9",
      name: "flag: Ethiopia",
      image: "\uD83C\uDDEA\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1FA",
      name: "flag: European Union",
      image: "\uD83C\uDDEA\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1EE",
      name: "flag: Finland",
      image: "\uD83C\uDDEB\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1EF",
      name: "flag: Fiji",
      image: "\uD83C\uDDEB\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F0",
      name: "flag: Falkland Islands",
      image: "\uD83C\uDDEB\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F2",
      name: "flag: Micronesia",
      image: "\uD83C\uDDEB\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F4",
      name: "flag: Faroe Islands",
      image: "\uD83C\uDDEB\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F7",
      name: "flag: France",
      image: "\uD83C\uDDEB\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E6",
      name: "flag: Gabon",
      image: "\uD83C\uDDEC\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E7",
      name: "flag: United Kingdom",
      image: "\uD83C\uDDEC\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E9",
      name: "flag: Grenada",
      image: "\uD83C\uDDEC\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EA",
      name: "flag: Georgia",
      image: "\uD83C\uDDEC\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EB",
      name: "flag: French Guiana",
      image: "\uD83C\uDDEC\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EC",
      name: "flag: Guernsey",
      image: "\uD83C\uDDEC\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1ED",
      name: "flag: Ghana",
      image: "\uD83C\uDDEC\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EE",
      name: "flag: Gibraltar",
      image: "\uD83C\uDDEC\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F1",
      name: "flag: Greenland",
      image: "\uD83C\uDDEC\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F2",
      name: "flag: Gambia",
      image: "\uD83C\uDDEC\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F3",
      name: "flag: Guinea",
      image: "\uD83C\uDDEC\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F5",
      name: "flag: Guadeloupe",
      image: "\uD83C\uDDEC\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F6",
      name: "flag: Equatorial Guinea",
      image: "\uD83C\uDDEC\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F7",
      name: "flag: Greece",
      image: "\uD83C\uDDEC\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F8",
      name: "flag: South Georgia & South Sandwich Islands",
      image: "\uD83C\uDDEC\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F9",
      name: "flag: Guatemala",
      image: "\uD83C\uDDEC\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FA",
      name: "flag: Guam",
      image: "\uD83C\uDDEC\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FC",
      name: "flag: Guinea-Bissau",
      image: "\uD83C\uDDEC\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FE",
      name: "flag: Guyana",
      image: "\uD83C\uDDEC\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F0",
      name: "flag: Hong Kong SAR China",
      image: "\uD83C\uDDED\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F2",
      name: "flag: Heard & McDonald Islands",
      image: "\uD83C\uDDED\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F3",
      name: "flag: Honduras",
      image: "\uD83C\uDDED\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F7",
      name: "flag: Croatia",
      image: "\uD83C\uDDED\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F9",
      name: "flag: Haiti",
      image: "\uD83C\uDDED\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1FA",
      name: "flag: Hungary",
      image: "\uD83C\uDDED\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1E8",
      name: "flag: Canary Islands",
      image: "\uD83C\uDDEE\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1E9",
      name: "flag: Indonesia",
      image: "\uD83C\uDDEE\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1EA",
      name: "flag: Ireland",
      image: "\uD83C\uDDEE\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F1",
      name: "flag: Israel",
      image: "\uD83C\uDDEE\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F2",
      name: "flag: Isle of Man",
      image: "\uD83C\uDDEE\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F3",
      name: "flag: India",
      image: "\uD83C\uDDEE\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F4",
      name: "flag: British Indian Ocean Territory",
      image: "\uD83C\uDDEE\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F6",
      name: "flag: Iraq",
      image: "\uD83C\uDDEE\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F7",
      name: "flag: Iran",
      image: "\uD83C\uDDEE\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F8",
      name: "flag: Iceland",
      image: "\uD83C\uDDEE\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F9",
      name: "flag: Italy",
      image: "\uD83C\uDDEE\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1EA",
      name: "flag: Jersey",
      image: "\uD83C\uDDEF\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F2",
      name: "flag: Jamaica",
      image: "\uD83C\uDDEF\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F4",
      name: "flag: Jordan",
      image: "\uD83C\uDDEF\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F5",
      name: "flag: Japan",
      image: "\uD83C\uDDEF\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EA",
      name: "flag: Kenya",
      image: "\uD83C\uDDF0\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EC",
      name: "flag: Kyrgyzstan",
      image: "\uD83C\uDDF0\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1ED",
      name: "flag: Cambodia",
      image: "\uD83C\uDDF0\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EE",
      name: "flag: Kiribati",
      image: "\uD83C\uDDF0\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F2",
      name: "flag: Comoros",
      image: "\uD83C\uDDF0\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F3",
      name: "flag: St. Kitts & Nevis",
      image: "\uD83C\uDDF0\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F5",
      name: "flag: North Korea",
      image: "\uD83C\uDDF0\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F7",
      name: "flag: South Korea",
      image: "\uD83C\uDDF0\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FC",
      name: "flag: Kuwait",
      image: "\uD83C\uDDF0\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FE",
      name: "flag: Cayman Islands",
      image: "\uD83C\uDDF0\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FF",
      name: "flag: Kazakhstan",
      image: "\uD83C\uDDF0\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E6",
      name: "flag: Laos",
      image: "\uD83C\uDDF1\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E7",
      name: "flag: Lebanon",
      image: "\uD83C\uDDF1\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E8",
      name: "flag: St. Lucia",
      image: "\uD83C\uDDF1\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1EE",
      name: "flag: Liechtenstein",
      image: "\uD83C\uDDF1\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F0",
      name: "flag: Sri Lanka",
      image: "\uD83C\uDDF1\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F7",
      name: "flag: Liberia",
      image: "\uD83C\uDDF1\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F8",
      name: "flag: Lesotho",
      image: "\uD83C\uDDF1\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F9",
      name: "flag: Lithuania",
      image: "\uD83C\uDDF1\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FA",
      name: "flag: Luxembourg",
      image: "\uD83C\uDDF1\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FB",
      name: "flag: Latvia",
      image: "\uD83C\uDDF1\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FE",
      name: "flag: Libya",
      image: "\uD83C\uDDF1\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E6",
      name: "flag: Morocco",
      image: "\uD83C\uDDF2\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E8",
      name: "flag: Monaco",
      image: "\uD83C\uDDF2\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E9",
      name: "flag: Moldova",
      image: "\uD83C\uDDF2\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EA",
      name: "flag: Montenegro",
      image: "\uD83C\uDDF2\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EB",
      name: "flag: St. Martin",
      image: "\uD83C\uDDF2\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EC",
      name: "flag: Madagascar",
      image: "\uD83C\uDDF2\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1ED",
      name: "flag: Marshall Islands",
      image: "\uD83C\uDDF2\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F0",
      name: "flag: North Macedonia",
      image: "\uD83C\uDDF2\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F1",
      name: "flag: Mali",
      image: "\uD83C\uDDF2\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F2",
      name: "flag: Myanmar (Burma)",
      image: "\uD83C\uDDF2\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F3",
      name: "flag: Mongolia",
      image: "\uD83C\uDDF2\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F4",
      name: "flag: Macao SAR China",
      image: "\uD83C\uDDF2\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F5",
      name: "flag: Northern Mariana Islands",
      image: "\uD83C\uDDF2\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F6",
      name: "flag: Martinique",
      image: "\uD83C\uDDF2\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F7",
      name: "flag: Mauritania",
      image: "\uD83C\uDDF2\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F8",
      name: "flag: Montserrat",
      image: "\uD83C\uDDF2\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F9",
      name: "flag: Malta",
      image: "\uD83C\uDDF2\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FA",
      name: "flag: Mauritius",
      image: "\uD83C\uDDF2\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FB",
      name: "flag: Maldives",
      image: "\uD83C\uDDF2\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FC",
      name: "flag: Malawi",
      image: "\uD83C\uDDF2\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FD",
      name: "flag: Mexico",
      image: "\uD83C\uDDF2\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FE",
      name: "flag: Malaysia",
      image: "\uD83C\uDDF2\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FF",
      name: "flag: Mozambique",
      image: "\uD83C\uDDF2\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1E6",
      name: "flag: Namibia",
      image: "\uD83C\uDDF3\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1E8",
      name: "flag: New Caledonia",
      image: "\uD83C\uDDF3\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EA",
      name: "flag: Niger",
      image: "\uD83C\uDDF3\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EB",
      name: "flag: Norfolk Island",
      image: "\uD83C\uDDF3\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EC",
      name: "flag: Nigeria",
      image: "\uD83C\uDDF3\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EE",
      name: "flag: Nicaragua",
      image: "\uD83C\uDDF3\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F1",
      name: "flag: Netherlands",
      image: "\uD83C\uDDF3\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F4",
      name: "flag: Norway",
      image: "\uD83C\uDDF3\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F5",
      name: "flag: Nepal",
      image: "\uD83C\uDDF3\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F7",
      name: "flag: Nauru",
      image: "\uD83C\uDDF3\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1FA",
      name: "flag: Niue",
      image: "\uD83C\uDDF3\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1FF",
      name: "flag: New Zealand",
      image: "\uD83C\uDDF3\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F4 U+1F1F2",
      name: "flag: Oman",
      image: "\uD83C\uDDF4\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1E6",
      name: "flag: Panama",
      image: "\uD83C\uDDF5\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EA",
      name: "flag: Peru",
      image: "\uD83C\uDDF5\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EB",
      name: "flag: French Polynesia",
      image: "\uD83C\uDDF5\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EC",
      name: "flag: Papua New Guinea",
      image: "\uD83C\uDDF5\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1ED",
      name: "flag: Philippines",
      image: "\uD83C\uDDF5\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F0",
      name: "flag: Pakistan",
      image: "\uD83C\uDDF5\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F1",
      name: "flag: Poland",
      image: "\uD83C\uDDF5\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F2",
      name: "flag: St. Pierre & Miquelon",
      image: "\uD83C\uDDF5\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F3",
      name: "flag: Pitcairn Islands",
      image: "\uD83C\uDDF5\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F7",
      name: "flag: Puerto Rico",
      image: "\uD83C\uDDF5\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F8",
      name: "flag: Palestinian Territories",
      image: "\uD83C\uDDF5\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F9",
      name: "flag: Portugal",
      image: "\uD83C\uDDF5\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1FC",
      name: "flag: Palau",
      image: "\uD83C\uDDF5\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1FE",
      name: "flag: Paraguay",
      image: "\uD83C\uDDF5\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F6 U+1F1E6",
      name: "flag: Qatar",
      image: "\uD83C\uDDF6\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1EA",
      name: "flag: Réunion",
      image: "\uD83C\uDDF7\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1F4",
      name: "flag: Romania",
      image: "\uD83C\uDDF7\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1F8",
      name: "flag: Serbia",
      image: "\uD83C\uDDF7\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1FA",
      name: "flag: Russia",
      image: "\uD83C\uDDF7\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1FC",
      name: "flag: Rwanda",
      image: "\uD83C\uDDF7\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E6",
      name: "flag: Saudi Arabia",
      image: "\uD83C\uDDF8\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E7",
      name: "flag: Solomon Islands",
      image: "\uD83C\uDDF8\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E8",
      name: "flag: Seychelles",
      image: "\uD83C\uDDF8\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E9",
      name: "flag: Sudan",
      image: "\uD83C\uDDF8\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EA",
      name: "flag: Sweden",
      image: "\uD83C\uDDF8\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EC",
      name: "flag: Singapore",
      image: "\uD83C\uDDF8\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1ED",
      name: "flag: St. Helena",
      image: "\uD83C\uDDF8\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EE",
      name: "flag: Slovenia",
      image: "\uD83C\uDDF8\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EF",
      name: "flag: Svalbard & Jan Mayen",
      image: "\uD83C\uDDF8\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F0",
      name: "flag: Slovakia",
      image: "\uD83C\uDDF8\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F1",
      name: "flag: Sierra Leone",
      image: "\uD83C\uDDF8\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F2",
      name: "flag: San Marino",
      image: "\uD83C\uDDF8\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F3",
      name: "flag: Senegal",
      image: "\uD83C\uDDF8\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F4",
      name: "flag: Somalia",
      image: "\uD83C\uDDF8\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F7",
      name: "flag: Suriname",
      image: "\uD83C\uDDF8\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F8",
      name: "flag: South Sudan",
      image: "\uD83C\uDDF8\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F9",
      name: "flag: São Tomé & Príncipe",
      image: "\uD83C\uDDF8\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FB",
      name: "flag: El Salvador",
      image: "\uD83C\uDDF8\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FD",
      name: "flag: Sint Maarten",
      image: "\uD83C\uDDF8\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FE",
      name: "flag: Syria",
      image: "\uD83C\uDDF8\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FF",
      name: "flag: Eswatini",
      image: "\uD83C\uDDF8\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E6",
      name: "flag: Tristan da Cunha",
      image: "\uD83C\uDDF9\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E8",
      name: "flag: Turks & Caicos Islands",
      image: "\uD83C\uDDF9\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E9",
      name: "flag: Chad",
      image: "\uD83C\uDDF9\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EB",
      name: "flag: French Southern Territories",
      image: "\uD83C\uDDF9\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EC",
      name: "flag: Togo",
      image: "\uD83C\uDDF9\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1ED",
      name: "flag: Thailand",
      image: "\uD83C\uDDF9\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EF",
      name: "flag: Tajikistan",
      image: "\uD83C\uDDF9\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F0",
      name: "flag: Tokelau",
      image: "\uD83C\uDDF9\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F1",
      name: "flag: Timor-Leste",
      image: "\uD83C\uDDF9\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F2",
      name: "flag: Turkmenistan",
      image: "\uD83C\uDDF9\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F3",
      name: "flag: Tunisia",
      image: "\uD83C\uDDF9\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F4",
      name: "flag: Tonga",
      image: "\uD83C\uDDF9\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F7",
      name: "flag: Turkey",
      image: "\uD83C\uDDF9\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F9",
      name: "flag: Trinidad & Tobago",
      image: "\uD83C\uDDF9\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FB",
      name: "flag: Tuvalu",
      image: "\uD83C\uDDF9\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FC",
      name: "flag: Taiwan",
      image: "\uD83C\uDDF9\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FF",
      name: "flag: Tanzania",
      image: "\uD83C\uDDF9\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1E6",
      name: "flag: Ukraine",
      image: "\uD83C\uDDFA\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1EC",
      name: "flag: Uganda",
      image: "\uD83C\uDDFA\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F2",
      name: "flag: U.S. Outlying Islands",
      image: "\uD83C\uDDFA\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F3",
      name: "flag: United Nations",
      image: "\uD83C\uDDFA\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F8",
      name: "flag: United States",
      image: "\uD83C\uDDFA\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1FE",
      name: "flag: Uruguay",
      image: "\uD83C\uDDFA\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1FF",
      name: "flag: Uzbekistan",
      image: "\uD83C\uDDFA\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1E6",
      name: "flag: Vatican City",
      image: "\uD83C\uDDFB\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1E8",
      name: "flag: St. Vincent & Grenadines",
      image: "\uD83C\uDDFB\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EA",
      name: "flag: Venezuela",
      image: "\uD83C\uDDFB\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EC",
      name: "flag: British Virgin Islands",
      image: "\uD83C\uDDFB\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EE",
      name: "flag: U.S. Virgin Islands",
      image: "\uD83C\uDDFB\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1F3",
      name: "flag: Vietnam",
      image: "\uD83C\uDDFB\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1FA",
      name: "flag: Vanuatu",
      image: "\uD83C\uDDFB\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1FC U+1F1EB",
      name: "flag: Wallis & Futuna",
      image: "\uD83C\uDDFC\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1FC U+1F1F8",
      name: "flag: Samoa",
      image: "\uD83C\uDDFC\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1FD U+1F1F0",
      name: "flag: Kosovo",
      image: "\uD83C\uDDFD\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1FE U+1F1EA",
      name: "flag: Yemen",
      image: "\uD83C\uDDFE\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1FE U+1F1F9",
      name: "flag: Mayotte",
      image: "\uD83C\uDDFE\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1E6",
      name: "flag: South Africa",
      image: "\uD83C\uDDFF\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1F2",
      name: "flag: Zambia",
      image: "\uD83C\uDDFF\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1FC",
      name: "flag: Zimbabwe",
      image: "\uD83C\uDDFF\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F",
      name: "flag: England",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F",
      name: "flag: Scotland",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0077 U+E006C U+E0073 U+E007F",
      name: "flag: Wales",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3C1",
      name: "chequered flag",
      image: "\uD83C\uDFC1",
      category: "Flags"
    },
    {
      code: "U+1F6A9",
      name: "triangular flag",
      image: "\uD83D\uDEA9",
      category: "Flags"
    },
    {
      code: "U+1F38C",
      name: "crossed flags",
      image: "\uD83C\uDF8C",
      category: "Flags"
    },
    {
      code: "U+1F3F4",
      name: "black flag",
      image: "\uD83C\uDFF4",
      category: "Flags"
    },
    {
      code: "U+1F3F3",
      name: "white flag",
      image: "\uD83C\uDFF3",
      category: "Flags"
    },
    {
      code: "U+1F3F3 U+FE0F U+200D U+1F308",
      name: "rainbow flag",
      image: "\uD83C\uDFF3️‍\uD83C\uDF08",
      category: "Flags"
    },
    {
      code: "U+1F3F3 U+FE0F U+200D U+26A7 U+FE0F",
      name: "transgender flag",
      image: "\uD83C\uDFF3️‍⚧️",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+200D U+2620 U+FE0F",
      name: "pirate flag",
      image: "\uD83C\uDFF4‍☠️",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1E8",
      name: "flag: Ascension Island",
      image: "\uD83C\uDDE6\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1E9",
      name: "flag: Andorra",
      image: "\uD83C\uDDE6\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EA",
      name: "flag: United Arab Emirates",
      image: "\uD83C\uDDE6\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EB",
      name: "flag: Afghanistan",
      image: "\uD83C\uDDE6\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EC",
      name: "flag: Antigua & Barbuda",
      image: "\uD83C\uDDE6\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1EE",
      name: "flag: Anguilla",
      image: "\uD83C\uDDE6\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F1",
      name: "flag: Albania",
      image: "\uD83C\uDDE6\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F2",
      name: "flag: Armenia",
      image: "\uD83C\uDDE6\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F4",
      name: "flag: Angola",
      image: "\uD83C\uDDE6\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F6",
      name: "flag: Antarctica",
      image: "\uD83C\uDDE6\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F7",
      name: "flag: Argentina",
      image: "\uD83C\uDDE6\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F8",
      name: "flag: American Samoa",
      image: "\uD83C\uDDE6\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1F9",
      name: "flag: Austria",
      image: "\uD83C\uDDE6\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FA",
      name: "flag: Australia",
      image: "\uD83C\uDDE6\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FC",
      name: "flag: Aruba",
      image: "\uD83C\uDDE6\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FD",
      name: "flag: Åland Islands",
      image: "\uD83C\uDDE6\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1E6 U+1F1FF",
      name: "flag: Azerbaijan",
      image: "\uD83C\uDDE6\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E6",
      name: "flag: Bosnia & Herzegovina",
      image: "\uD83C\uDDE7\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E7",
      name: "flag: Barbados",
      image: "\uD83C\uDDE7\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1E9",
      name: "flag: Bangladesh",
      image: "\uD83C\uDDE7\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EA",
      name: "flag: Belgium",
      image: "\uD83C\uDDE7\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EB",
      name: "flag: Burkina Faso",
      image: "\uD83C\uDDE7\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EC",
      name: "flag: Bulgaria",
      image: "\uD83C\uDDE7\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1ED",
      name: "flag: Bahrain",
      image: "\uD83C\uDDE7\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EE",
      name: "flag: Burundi",
      image: "\uD83C\uDDE7\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1EF",
      name: "flag: Benin",
      image: "\uD83C\uDDE7\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F1",
      name: "flag: St. Barthélemy",
      image: "\uD83C\uDDE7\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F2",
      name: "flag: Bermuda",
      image: "\uD83C\uDDE7\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F3",
      name: "flag: Brunei",
      image: "\uD83C\uDDE7\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F4",
      name: "flag: Bolivia",
      image: "\uD83C\uDDE7\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F6",
      name: "flag: Caribbean Netherlands",
      image: "\uD83C\uDDE7\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F7",
      name: "flag: Brazil",
      image: "\uD83C\uDDE7\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F8",
      name: "flag: Bahamas",
      image: "\uD83C\uDDE7\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1F9",
      name: "flag: Bhutan",
      image: "\uD83C\uDDE7\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FB",
      name: "flag: Bouvet Island",
      image: "\uD83C\uDDE7\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FC",
      name: "flag: Botswana",
      image: "\uD83C\uDDE7\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FE",
      name: "flag: Belarus",
      image: "\uD83C\uDDE7\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1E7 U+1F1FF",
      name: "flag: Belize",
      image: "\uD83C\uDDE7\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E6",
      name: "flag: Canada",
      image: "\uD83C\uDDE8\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E8",
      name: "flag: Cocos (Keeling) Islands",
      image: "\uD83C\uDDE8\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1E9",
      name: "flag: Congo - Kinshasa",
      image: "\uD83C\uDDE8\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EB",
      name: "flag: Central African Republic",
      image: "\uD83C\uDDE8\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EC",
      name: "flag: Congo - Brazzaville",
      image: "\uD83C\uDDE8\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1ED",
      name: "flag: Switzerland",
      image: "\uD83C\uDDE8\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1EE",
      name: "flag: Côte d’Ivoire",
      image: "\uD83C\uDDE8\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F0",
      name: "flag: Cook Islands",
      image: "\uD83C\uDDE8\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F1",
      name: "flag: Chile",
      image: "\uD83C\uDDE8\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F2",
      name: "flag: Cameroon",
      image: "\uD83C\uDDE8\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F3",
      name: "flag: China",
      image: "\uD83C\uDDE8\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F4",
      name: "flag: Colombia",
      image: "\uD83C\uDDE8\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F5",
      name: "flag: Clipperton Island",
      image: "\uD83C\uDDE8\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1F7",
      name: "flag: Costa Rica",
      image: "\uD83C\uDDE8\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FA",
      name: "flag: Cuba",
      image: "\uD83C\uDDE8\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FB",
      name: "flag: Cape Verde",
      image: "\uD83C\uDDE8\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FC",
      name: "flag: Curaçao",
      image: "\uD83C\uDDE8\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FD",
      name: "flag: Christmas Island",
      image: "\uD83C\uDDE8\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FE",
      name: "flag: Cyprus",
      image: "\uD83C\uDDE8\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1E8 U+1F1FF",
      name: "flag: Czechia",
      image: "\uD83C\uDDE8\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EA",
      name: "flag: Germany",
      image: "\uD83C\uDDE9\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EC",
      name: "flag: Diego Garcia",
      image: "\uD83C\uDDE9\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1EF",
      name: "flag: Djibouti",
      image: "\uD83C\uDDE9\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F0",
      name: "flag: Denmark",
      image: "\uD83C\uDDE9\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F2",
      name: "flag: Dominica",
      image: "\uD83C\uDDE9\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1F4",
      name: "flag: Dominican Republic",
      image: "\uD83C\uDDE9\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1E9 U+1F1FF",
      name: "flag: Algeria",
      image: "\uD83C\uDDE9\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1E6",
      name: "flag: Ceuta & Melilla",
      image: "\uD83C\uDDEA\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1E8",
      name: "flag: Ecuador",
      image: "\uD83C\uDDEA\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1EA",
      name: "flag: Estonia",
      image: "\uD83C\uDDEA\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1EC",
      name: "flag: Egypt",
      image: "\uD83C\uDDEA\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1ED",
      name: "flag: Western Sahara",
      image: "\uD83C\uDDEA\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F7",
      name: "flag: Eritrea",
      image: "\uD83C\uDDEA\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F8",
      name: "flag: Spain",
      image: "\uD83C\uDDEA\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1F9",
      name: "flag: Ethiopia",
      image: "\uD83C\uDDEA\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EA U+1F1FA",
      name: "flag: European Union",
      image: "\uD83C\uDDEA\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1EE",
      name: "flag: Finland",
      image: "\uD83C\uDDEB\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1EF",
      name: "flag: Fiji",
      image: "\uD83C\uDDEB\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F0",
      name: "flag: Falkland Islands",
      image: "\uD83C\uDDEB\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F2",
      name: "flag: Micronesia",
      image: "\uD83C\uDDEB\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F4",
      name: "flag: Faroe Islands",
      image: "\uD83C\uDDEB\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EB U+1F1F7",
      name: "flag: France",
      image: "\uD83C\uDDEB\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E6",
      name: "flag: Gabon",
      image: "\uD83C\uDDEC\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E7",
      name: "flag: United Kingdom",
      image: "\uD83C\uDDEC\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1E9",
      name: "flag: Grenada",
      image: "\uD83C\uDDEC\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EA",
      name: "flag: Georgia",
      image: "\uD83C\uDDEC\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EB",
      name: "flag: French Guiana",
      image: "\uD83C\uDDEC\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EC",
      name: "flag: Guernsey",
      image: "\uD83C\uDDEC\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1ED",
      name: "flag: Ghana",
      image: "\uD83C\uDDEC\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1EE",
      name: "flag: Gibraltar",
      image: "\uD83C\uDDEC\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F1",
      name: "flag: Greenland",
      image: "\uD83C\uDDEC\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F2",
      name: "flag: Gambia",
      image: "\uD83C\uDDEC\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F3",
      name: "flag: Guinea",
      image: "\uD83C\uDDEC\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F5",
      name: "flag: Guadeloupe",
      image: "\uD83C\uDDEC\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F6",
      name: "flag: Equatorial Guinea",
      image: "\uD83C\uDDEC\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F7",
      name: "flag: Greece",
      image: "\uD83C\uDDEC\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F8",
      name: "flag: South Georgia & South Sandwich Islands",
      image: "\uD83C\uDDEC\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1F9",
      name: "flag: Guatemala",
      image: "\uD83C\uDDEC\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FA",
      name: "flag: Guam",
      image: "\uD83C\uDDEC\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FC",
      name: "flag: Guinea-Bissau",
      image: "\uD83C\uDDEC\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1EC U+1F1FE",
      name: "flag: Guyana",
      image: "\uD83C\uDDEC\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F0",
      name: "flag: Hong Kong SAR China",
      image: "\uD83C\uDDED\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F2",
      name: "flag: Heard & McDonald Islands",
      image: "\uD83C\uDDED\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F3",
      name: "flag: Honduras",
      image: "\uD83C\uDDED\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F7",
      name: "flag: Croatia",
      image: "\uD83C\uDDED\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1F9",
      name: "flag: Haiti",
      image: "\uD83C\uDDED\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1ED U+1F1FA",
      name: "flag: Hungary",
      image: "\uD83C\uDDED\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1E8",
      name: "flag: Canary Islands",
      image: "\uD83C\uDDEE\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1E9",
      name: "flag: Indonesia",
      image: "\uD83C\uDDEE\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1EA",
      name: "flag: Ireland",
      image: "\uD83C\uDDEE\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F1",
      name: "flag: Israel",
      image: "\uD83C\uDDEE\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F2",
      name: "flag: Isle of Man",
      image: "\uD83C\uDDEE\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F3",
      name: "flag: India",
      image: "\uD83C\uDDEE\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F4",
      name: "flag: British Indian Ocean Territory",
      image: "\uD83C\uDDEE\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F6",
      name: "flag: Iraq",
      image: "\uD83C\uDDEE\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F7",
      name: "flag: Iran",
      image: "\uD83C\uDDEE\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F8",
      name: "flag: Iceland",
      image: "\uD83C\uDDEE\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1EE U+1F1F9",
      name: "flag: Italy",
      image: "\uD83C\uDDEE\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1EA",
      name: "flag: Jersey",
      image: "\uD83C\uDDEF\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F2",
      name: "flag: Jamaica",
      image: "\uD83C\uDDEF\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F4",
      name: "flag: Jordan",
      image: "\uD83C\uDDEF\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1EF U+1F1F5",
      name: "flag: Japan",
      image: "\uD83C\uDDEF\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EA",
      name: "flag: Kenya",
      image: "\uD83C\uDDF0\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EC",
      name: "flag: Kyrgyzstan",
      image: "\uD83C\uDDF0\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1ED",
      name: "flag: Cambodia",
      image: "\uD83C\uDDF0\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1EE",
      name: "flag: Kiribati",
      image: "\uD83C\uDDF0\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F2",
      name: "flag: Comoros",
      image: "\uD83C\uDDF0\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F3",
      name: "flag: St. Kitts & Nevis",
      image: "\uD83C\uDDF0\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F5",
      name: "flag: North Korea",
      image: "\uD83C\uDDF0\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1F7",
      name: "flag: South Korea",
      image: "\uD83C\uDDF0\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FC",
      name: "flag: Kuwait",
      image: "\uD83C\uDDF0\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FE",
      name: "flag: Cayman Islands",
      image: "\uD83C\uDDF0\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F0 U+1F1FF",
      name: "flag: Kazakhstan",
      image: "\uD83C\uDDF0\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E6",
      name: "flag: Laos",
      image: "\uD83C\uDDF1\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E7",
      name: "flag: Lebanon",
      image: "\uD83C\uDDF1\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1E8",
      name: "flag: St. Lucia",
      image: "\uD83C\uDDF1\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1EE",
      name: "flag: Liechtenstein",
      image: "\uD83C\uDDF1\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F0",
      name: "flag: Sri Lanka",
      image: "\uD83C\uDDF1\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F7",
      name: "flag: Liberia",
      image: "\uD83C\uDDF1\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F8",
      name: "flag: Lesotho",
      image: "\uD83C\uDDF1\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1F9",
      name: "flag: Lithuania",
      image: "\uD83C\uDDF1\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FA",
      name: "flag: Luxembourg",
      image: "\uD83C\uDDF1\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FB",
      name: "flag: Latvia",
      image: "\uD83C\uDDF1\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F1 U+1F1FE",
      name: "flag: Libya",
      image: "\uD83C\uDDF1\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E6",
      name: "flag: Morocco",
      image: "\uD83C\uDDF2\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E8",
      name: "flag: Monaco",
      image: "\uD83C\uDDF2\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1E9",
      name: "flag: Moldova",
      image: "\uD83C\uDDF2\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EA",
      name: "flag: Montenegro",
      image: "\uD83C\uDDF2\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EB",
      name: "flag: St. Martin",
      image: "\uD83C\uDDF2\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1EC",
      name: "flag: Madagascar",
      image: "\uD83C\uDDF2\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1ED",
      name: "flag: Marshall Islands",
      image: "\uD83C\uDDF2\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F0",
      name: "flag: North Macedonia",
      image: "\uD83C\uDDF2\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F1",
      name: "flag: Mali",
      image: "\uD83C\uDDF2\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F2",
      name: "flag: Myanmar (Burma)",
      image: "\uD83C\uDDF2\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F3",
      name: "flag: Mongolia",
      image: "\uD83C\uDDF2\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F4",
      name: "flag: Macao SAR China",
      image: "\uD83C\uDDF2\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F5",
      name: "flag: Northern Mariana Islands",
      image: "\uD83C\uDDF2\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F6",
      name: "flag: Martinique",
      image: "\uD83C\uDDF2\uD83C\uDDF6",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F7",
      name: "flag: Mauritania",
      image: "\uD83C\uDDF2\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F8",
      name: "flag: Montserrat",
      image: "\uD83C\uDDF2\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1F9",
      name: "flag: Malta",
      image: "\uD83C\uDDF2\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FA",
      name: "flag: Mauritius",
      image: "\uD83C\uDDF2\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FB",
      name: "flag: Maldives",
      image: "\uD83C\uDDF2\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FC",
      name: "flag: Malawi",
      image: "\uD83C\uDDF2\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FD",
      name: "flag: Mexico",
      image: "\uD83C\uDDF2\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FE",
      name: "flag: Malaysia",
      image: "\uD83C\uDDF2\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F2 U+1F1FF",
      name: "flag: Mozambique",
      image: "\uD83C\uDDF2\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1E6",
      name: "flag: Namibia",
      image: "\uD83C\uDDF3\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1E8",
      name: "flag: New Caledonia",
      image: "\uD83C\uDDF3\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EA",
      name: "flag: Niger",
      image: "\uD83C\uDDF3\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EB",
      name: "flag: Norfolk Island",
      image: "\uD83C\uDDF3\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EC",
      name: "flag: Nigeria",
      image: "\uD83C\uDDF3\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1EE",
      name: "flag: Nicaragua",
      image: "\uD83C\uDDF3\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F1",
      name: "flag: Netherlands",
      image: "\uD83C\uDDF3\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F4",
      name: "flag: Norway",
      image: "\uD83C\uDDF3\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F5",
      name: "flag: Nepal",
      image: "\uD83C\uDDF3\uD83C\uDDF5",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1F7",
      name: "flag: Nauru",
      image: "\uD83C\uDDF3\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1FA",
      name: "flag: Niue",
      image: "\uD83C\uDDF3\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F3 U+1F1FF",
      name: "flag: New Zealand",
      image: "\uD83C\uDDF3\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F4 U+1F1F2",
      name: "flag: Oman",
      image: "\uD83C\uDDF4\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1E6",
      name: "flag: Panama",
      image: "\uD83C\uDDF5\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EA",
      name: "flag: Peru",
      image: "\uD83C\uDDF5\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EB",
      name: "flag: French Polynesia",
      image: "\uD83C\uDDF5\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1EC",
      name: "flag: Papua New Guinea",
      image: "\uD83C\uDDF5\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1ED",
      name: "flag: Philippines",
      image: "\uD83C\uDDF5\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F0",
      name: "flag: Pakistan",
      image: "\uD83C\uDDF5\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F1",
      name: "flag: Poland",
      image: "\uD83C\uDDF5\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F2",
      name: "flag: St. Pierre & Miquelon",
      image: "\uD83C\uDDF5\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F3",
      name: "flag: Pitcairn Islands",
      image: "\uD83C\uDDF5\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F7",
      name: "flag: Puerto Rico",
      image: "\uD83C\uDDF5\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F8",
      name: "flag: Palestinian Territories",
      image: "\uD83C\uDDF5\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1F9",
      name: "flag: Portugal",
      image: "\uD83C\uDDF5\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1FC",
      name: "flag: Palau",
      image: "\uD83C\uDDF5\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F5 U+1F1FE",
      name: "flag: Paraguay",
      image: "\uD83C\uDDF5\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F6 U+1F1E6",
      name: "flag: Qatar",
      image: "\uD83C\uDDF6\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1EA",
      name: "flag: Réunion",
      image: "\uD83C\uDDF7\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1F4",
      name: "flag: Romania",
      image: "\uD83C\uDDF7\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1F8",
      name: "flag: Serbia",
      image: "\uD83C\uDDF7\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1FA",
      name: "flag: Russia",
      image: "\uD83C\uDDF7\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1F7 U+1F1FC",
      name: "flag: Rwanda",
      image: "\uD83C\uDDF7\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E6",
      name: "flag: Saudi Arabia",
      image: "\uD83C\uDDF8\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E7",
      name: "flag: Solomon Islands",
      image: "\uD83C\uDDF8\uD83C\uDDE7",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E8",
      name: "flag: Seychelles",
      image: "\uD83C\uDDF8\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1E9",
      name: "flag: Sudan",
      image: "\uD83C\uDDF8\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EA",
      name: "flag: Sweden",
      image: "\uD83C\uDDF8\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EC",
      name: "flag: Singapore",
      image: "\uD83C\uDDF8\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1ED",
      name: "flag: St. Helena",
      image: "\uD83C\uDDF8\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EE",
      name: "flag: Slovenia",
      image: "\uD83C\uDDF8\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1EF",
      name: "flag: Svalbard & Jan Mayen",
      image: "\uD83C\uDDF8\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F0",
      name: "flag: Slovakia",
      image: "\uD83C\uDDF8\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F1",
      name: "flag: Sierra Leone",
      image: "\uD83C\uDDF8\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F2",
      name: "flag: San Marino",
      image: "\uD83C\uDDF8\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F3",
      name: "flag: Senegal",
      image: "\uD83C\uDDF8\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F4",
      name: "flag: Somalia",
      image: "\uD83C\uDDF8\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F7",
      name: "flag: Suriname",
      image: "\uD83C\uDDF8\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F8",
      name: "flag: South Sudan",
      image: "\uD83C\uDDF8\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1F9",
      name: "flag: São Tomé & Príncipe",
      image: "\uD83C\uDDF8\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FB",
      name: "flag: El Salvador",
      image: "\uD83C\uDDF8\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FD",
      name: "flag: Sint Maarten",
      image: "\uD83C\uDDF8\uD83C\uDDFD",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FE",
      name: "flag: Syria",
      image: "\uD83C\uDDF8\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1F8 U+1F1FF",
      name: "flag: Eswatini",
      image: "\uD83C\uDDF8\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E6",
      name: "flag: Tristan da Cunha",
      image: "\uD83C\uDDF9\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E8",
      name: "flag: Turks & Caicos Islands",
      image: "\uD83C\uDDF9\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1E9",
      name: "flag: Chad",
      image: "\uD83C\uDDF9\uD83C\uDDE9",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EB",
      name: "flag: French Southern Territories",
      image: "\uD83C\uDDF9\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EC",
      name: "flag: Togo",
      image: "\uD83C\uDDF9\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1ED",
      name: "flag: Thailand",
      image: "\uD83C\uDDF9\uD83C\uDDED",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1EF",
      name: "flag: Tajikistan",
      image: "\uD83C\uDDF9\uD83C\uDDEF",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F0",
      name: "flag: Tokelau",
      image: "\uD83C\uDDF9\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F1",
      name: "flag: Timor-Leste",
      image: "\uD83C\uDDF9\uD83C\uDDF1",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F2",
      name: "flag: Turkmenistan",
      image: "\uD83C\uDDF9\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F3",
      name: "flag: Tunisia",
      image: "\uD83C\uDDF9\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F4",
      name: "flag: Tonga",
      image: "\uD83C\uDDF9\uD83C\uDDF4",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F7",
      name: "flag: Turkey",
      image: "\uD83C\uDDF9\uD83C\uDDF7",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1F9",
      name: "flag: Trinidad & Tobago",
      image: "\uD83C\uDDF9\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FB",
      name: "flag: Tuvalu",
      image: "\uD83C\uDDF9\uD83C\uDDFB",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FC",
      name: "flag: Taiwan",
      image: "\uD83C\uDDF9\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F1F9 U+1F1FF",
      name: "flag: Tanzania",
      image: "\uD83C\uDDF9\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1E6",
      name: "flag: Ukraine",
      image: "\uD83C\uDDFA\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1EC",
      name: "flag: Uganda",
      image: "\uD83C\uDDFA\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F2",
      name: "flag: U.S. Outlying Islands",
      image: "\uD83C\uDDFA\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F3",
      name: "flag: United Nations",
      image: "\uD83C\uDDFA\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1F8",
      name: "flag: United States",
      image: "\uD83C\uDDFA\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1FE",
      name: "flag: Uruguay",
      image: "\uD83C\uDDFA\uD83C\uDDFE",
      category: "Flags"
    },
    {
      code: "U+1F1FA U+1F1FF",
      name: "flag: Uzbekistan",
      image: "\uD83C\uDDFA\uD83C\uDDFF",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1E6",
      name: "flag: Vatican City",
      image: "\uD83C\uDDFB\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1E8",
      name: "flag: St. Vincent & Grenadines",
      image: "\uD83C\uDDFB\uD83C\uDDE8",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EA",
      name: "flag: Venezuela",
      image: "\uD83C\uDDFB\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EC",
      name: "flag: British Virgin Islands",
      image: "\uD83C\uDDFB\uD83C\uDDEC",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1EE",
      name: "flag: U.S. Virgin Islands",
      image: "\uD83C\uDDFB\uD83C\uDDEE",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1F3",
      name: "flag: Vietnam",
      image: "\uD83C\uDDFB\uD83C\uDDF3",
      category: "Flags"
    },
    {
      code: "U+1F1FB U+1F1FA",
      name: "flag: Vanuatu",
      image: "\uD83C\uDDFB\uD83C\uDDFA",
      category: "Flags"
    },
    {
      code: "U+1F1FC U+1F1EB",
      name: "flag: Wallis & Futuna",
      image: "\uD83C\uDDFC\uD83C\uDDEB",
      category: "Flags"
    },
    {
      code: "U+1F1FC U+1F1F8",
      name: "flag: Samoa",
      image: "\uD83C\uDDFC\uD83C\uDDF8",
      category: "Flags"
    },
    {
      code: "U+1F1FD U+1F1F0",
      name: "flag: Kosovo",
      image: "\uD83C\uDDFD\uD83C\uDDF0",
      category: "Flags"
    },
    {
      code: "U+1F1FE U+1F1EA",
      name: "flag: Yemen",
      image: "\uD83C\uDDFE\uD83C\uDDEA",
      category: "Flags"
    },
    {
      code: "U+1F1FE U+1F1F9",
      name: "flag: Mayotte",
      image: "\uD83C\uDDFE\uD83C\uDDF9",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1E6",
      name: "flag: South Africa",
      image: "\uD83C\uDDFF\uD83C\uDDE6",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1F2",
      name: "flag: Zambia",
      image: "\uD83C\uDDFF\uD83C\uDDF2",
      category: "Flags"
    },
    {
      code: "U+1F1FF U+1F1FC",
      name: "flag: Zimbabwe",
      image: "\uD83C\uDDFF\uD83C\uDDFC",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F",
      name: "flag: England",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F",
      name: "flag: Scotland",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F",
      category: "Flags"
    },
    {
      code: "U+1F3F4 U+E0067 U+E0062 U+E0077 U+E006C U+E0073 U+E007F",
      name: "flag: Wales",
      image: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F",
      category: "Flags"
    }
  ];
  emojis.forEach;
  function generateEmojis(count) {
    const emojiList = [];
    for (let i3 = 0;i3 < count; i3++) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      const emoji = emojis[randomIndex];
      emojiList.push(emoji);
    }
    return emojiList;
  }
  module.exports = {
    generateEmojis
  };
});

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
// ../node_modules/@dobuki/hello-worker/dist/index.js
function y(F) {
  let { userId: z, worldId: R, room: j, host: P, autoRejoin: O = true, logLine: f } = F, N = false, S = 0, q, k, _ = true, B = new Map, E = `wss://${P}/room/${R}/${j}?userId=${encodeURIComponent(z)}`, Y = [], K = 0;
  function n(G, Z, Q) {
    if (!q)
      return false;
    if (N || q.readyState !== WebSocket.OPEN)
      return false;
    let D = { type: G, to: Z, payload: Q };
    return Y.push(D), f?.("\uD83D\uDC64 ➡️ \uD83D\uDDA5️", D), clearTimeout(K), K = setTimeout(() => {
      q.send(JSON.stringify(Y)), Y.length = 0;
    }), true;
  }
  function C() {
    if (N)
      return;
    q = new WebSocket(E), q.onopen = () => {
      if (_)
        F.onOpen?.(), _ = false;
      S = 0;
    }, q.onmessage = (G) => {
      try {
        let Z = JSON.parse(G.data);
        (Array.isArray(Z) ? Z : [Z]).forEach((D) => {
          if (f?.("\uD83D\uDDA5️ ➡️ \uD83D\uDC64", D), D.type === "peer-joined" || D.type === "peer-left")
            J(D.users);
          else if (D.type === "ice-server")
            F.onIceUrl?.(D.url, D.expiration);
          else if (D.userId)
            F.onMessage(D.type, D.payload, { userId: D.userId, receive: ($, A) => n($, D.userId, A) });
        });
      } catch {
        f?.("⚠️ ERROR", { error: "invalid-json" });
      }
    }, q.onclose = (G) => {
      let Q = [1001, 1006, 1011, 1012, 1013].includes(G.code);
      if (O && !N && Q) {
        let D = Math.min(Math.pow(2, S) * 1000, 30000), $ = Math.random() * 1000, A = D + $;
        f?.("\uD83D\uDD04 RECONNECTING", { attempt: S + 1, delayMs: Math.round(A) }), S++, k = setTimeout(C, A);
      } else
        F.onClose?.({ code: G.code, reason: G.reason, wasClean: G.wasClean });
    }, q.onerror = (G) => {
      console.error("WS Error", G), F.onError?.();
    };
  }
  function J(G) {
    let Z = [], Q = [], D = new Set;
    G.forEach(({ userId: $ }) => {
      if ($ === z)
        return;
      if (!B.has(z)) {
        let A = { userId: $, receive: (v, b) => n(v, $, b) };
        B.set(z, A), Z.push(A);
      }
      D.add(z);
    });
    for (let $ of B.keys())
      if (!D.has($))
        B.delete($), Q.push({ userId: $ });
    if (Z.length)
      F.onPeerJoined(Z);
    if (Q.length)
      F.onPeerLeft(Q);
  }
  return C(), { sendToServer(G, Z) {
    n(G, "server", Z);
  }, exitRoom: () => {
    N = true, clearTimeout(k), q.close();
  } };
}
function c({ userId: F, worldId: z, room: R, host: j, autoRejoin: P = true, onOpen: O, onClose: f, onError: N, onPeerJoined: S, onPeerLeft: q, onIceUrl: k, onMessage: _, logLine: B, workerUrl: E }) {
  if (!E)
    return console.warn("Warning: enterRoom called without workerUrl; this may cause issues in some environments. You should pass workerUrl explicitly. Use:", "https://cdn.jsdelivr.net/npm/@dobuki/hello-worker/dist/signal-room.worker.min.js"), y({ userId: F, worldId: z, room: R, host: j, autoRejoin: P, onOpen: O, onClose: f, onError: N, onPeerJoined: S, onPeerLeft: q, onIceUrl: k, onMessage: _ });
  let Y = new Worker(E, { type: "module" }), K = false;
  function n({ userId: J }) {
    return { userId: J, receive: (G, Z) => {
      if (K)
        return false;
      return Y.postMessage({ cmd: "send", toUserId: J, host: j, room: R, type: G, payload: Z }), true;
    } };
  }
  let C = (J) => {
    let G = J.data;
    if (G.kind === "open")
      O?.();
    else if (G.kind === "close")
      Y.terminate(), f?.(G.ev);
    else if (G.kind === "error")
      N?.();
    else if (G.kind === "peer-joined")
      S(G.users.map((Z) => n({ userId: Z.userId })));
    else if (G.kind === "peer-left")
      q(G.users);
    else if (G.kind === "ice-server")
      k?.(G.url, G.expiration);
    else if (G.kind === "message")
      _(G.type, G.payload, n({ userId: G.fromUserId }));
    else if (G.kind === "log")
      B?.(G.direction, G.obj);
  };
  return Y.addEventListener("message", C), Y.postMessage({ cmd: "enter", userId: F, worldId: z, room: R, host: j, autoRejoin: P }), { exitRoom: () => {
    K = true, Y.removeEventListener("message", C), Y.postMessage({ cmd: "exit" });
  }, sendToServer: (J, G) => {
    Y.postMessage({ cmd: "send", toUserId: "server", host: j, room: R, type: J, payload: G });
  } };
}
var m = c;
function i({ worldId: F, receivePeerConnection: z, peerlessUserExpiration: R = 5000, fallbackRtcConfig: j = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }, enterRoomFunction: P = m, logLine: O = console.debug, onLeaveUser: f, workerUrl: N, onRoomReady: S, onRoomClose: q, onBroadcastMessage: k }) {
  let _ = `user-${crypto.randomUUID()}`, B = new Map, E = undefined, Y = { ...j, timestamp: Date.now() }, K = new Map;
  async function n(Q) {
    if (Q)
      try {
        let D = await fetch(Q);
        if (!D.ok)
          throw Error(`ICE endpoint failed: ${D.status}`);
        Y = await D.json();
      } catch (D) {
        console.warn("Using fallback rtcConfig:", D);
      }
    return Y;
  }
  function C(Q) {
    f?.(Q);
    let D = B.get(Q);
    if (!D)
      return;
    try {
      D.pc?.close();
    } catch {}
    B.delete(Q);
  }
  async function J(Q) {
    if (!Q.pc?.remoteDescription)
      return;
    let D = Q.pendingRemoteIce;
    Q.pendingRemoteIce = [];
    for (let $ of D)
      try {
        await Q.pc.addIceCandidate($);
      } catch (A) {
        O("⚠️ ERROR", { error: "add-ice-failed", userId: Q.userId, detail: String(A) });
      }
  }
  function G({ room: Q, host: D }) {
    let $ = `${D}/room/${Q}`, A = K.get($);
    if (A)
      A.exitRoom(), K.delete($);
  }
  function Z({ room: Q, host: D }) {
    return new Promise(async ($, A) => {
      async function v(V) {
        let W = !E || E.expiration - Date.now() < 2000 ? await x() : E;
        return V.pc = new RTCPeerConnection(Date.now() - (Y?.timestamp ?? 0) < 1e4 ? Y : await n(W.url)), V.pc.onicecandidate = (H) => {
          if (!H.candidate)
            return;
          V.peer.receive("ice", H.candidate.toJSON());
        }, V.pc.onconnectionstatechange = () => {
          O("\uD83D\uDCAC", { event: "pc-state", userId: V.userId, state: V.pc?.connectionState });
        }, V.pc;
      }
      async function b(V) {
        let W = B.get(V.userId), H = false;
        if (!W) {
          let T = { userId: V.userId, pendingRemoteIce: [], peer: V };
          B.set(V.userId, T), await v(T), W = T, B.set(W.userId, W), H = true;
        } else if (W)
          clearTimeout(W.expirationTimeout), W.expirationTimeout = 0;
        if (!W.pc)
          await v(W);
        return W.peer = V, [W, H];
      }
      async function X(V) {
        let [W] = await b(V), H = W.pc, T = await H?.createOffer();
        await H?.setLocalDescription(T), V.receive("offer", H?.localDescription?.toJSON());
      }
      let M;
      async function x() {
        let V = await new Promise((W) => {
          M = W, g("request-ice");
        });
        return M = undefined, V;
      }
      let { exitRoom: h, sendToServer: g } = P({ userId: _, worldId: F, room: Q, host: D, logLine: O, workerUrl: N, autoRejoin: true, onOpen() {
        S?.({ room: Q, host: D }), $();
      }, onError() {
        console.error("onError"), A();
      }, onClose(V) {
        q?.({ room: Q, host: D, ev: V });
      }, onPeerJoined(V) {
        V.forEach(async (W) => {
          let [H, T] = await b(W);
          if (!T)
            return;
          let L = H.pc;
          if (!L)
            return;
          async function w() {
            await x();
            let U = B.get(W.userId);
            if (U) {
              U.pc = undefined;
              let I = await v(U);
              z({ pc: I, userId: W.userId, initiator: true, restart: w }), await new Promise((d) => setTimeout(d, 3000)), X(W);
            }
          }
          z({ pc: L, userId: W.userId, initiator: true, restart: w }), X(W);
        });
      }, onPeerLeft(V) {
        V.forEach(({ userId: W }) => {
          let H = B.get(W);
          if (!H)
            return;
          H.expirationTimeout = setTimeout(() => C(W), R ?? 0);
        });
      }, onIceUrl(V, W) {
        E = { url: V, expiration: W }, M?.(E);
      }, async onMessage(V, W, H) {
        let [T] = await b(H), L = T.pc;
        if (!L)
          return;
        if (V === "offer") {
          z({ pc: L, userId: H.userId, initiator: false, restart() {
            T.pc = undefined;
          } }), await L.setRemoteDescription(W);
          let w = await L.createAnswer();
          await L.setLocalDescription(w), H.receive("answer", L.localDescription?.toJSON()), await J(T);
          return;
        }
        if (V === "answer") {
          await L.setRemoteDescription(W), await J(T);
          return;
        }
        if (V === "ice") {
          let w = W;
          if (!L.remoteDescription) {
            T.pendingRemoteIce.push(w);
            return;
          }
          try {
            await L.addIceCandidate(w);
          } catch (U) {
            O("⚠️ ERROR", { error: "add-ice-failed", userId: T.userId, detail: String(U) });
          }
          return;
        }
        if (V === "broadcast")
          k?.(W, H.userId);
      } });
      K.set(`${D}/room/${Q}`, { exitRoom: h, room: Q, host: D, broadcast: (V) => {
        g("broadcast", V);
      } });
    });
  }
  return { userId: _, enterRoom: Z, exitRoom: G, leaveUser: C, broadcast(Q) {
    K.forEach((D) => D.broadcast(Q));
  }, end() {
    K.forEach(({ exitRoom: Q }) => Q()), K.clear(), B.forEach(({ userId: Q }) => C(Q)), B.clear();
  } };
}
function l({ worldId: F, logLine: z = console.debug, enterRoomFunction: R = c, peerlessUserExpiration: j, workerUrl: P, onRoomReady: O, onRoomClose: f, dataChannelOptions: N }) {
  let S = [], q = new Set;
  function k(b, X, M, x) {
    if (M) {
      let h = b.createDataChannel("data", N);
      B(X, h, x), E.set(X, h);
    } else {
      let h = function(g) {
        let V = g.channel;
        B(X, V, x), E.set(X, V);
      };
      return b.addEventListener("datachannel", h), () => {
        b.removeEventListener("datachannel", h);
      };
    }
  }
  function _(b, X) {
    q.forEach((M) => M(b, X));
  }
  function B(b, X, M) {
    X.onopen = () => {
      z("\uD83D\uDCAC", { event: "dc-open", userId: b }), S.push(b), Y.forEach((h) => h(b, "join", S));
    };
    let x = ({ data: h }) => {
      _(h, b), z("\uD83D\uDCAC", { event: "dc-message", userId: b, data: h });
    };
    X.addEventListener("message", x), X.addEventListener("close", () => {
      z("\uD83D\uDCAC", { event: "dc-close", userId: b }), S.splice(S.indexOf(b), 1), Y.forEach((h) => h(b, "leave", S)), X.removeEventListener("message", x), M?.();
    }), X.onerror = () => z("⚠️ ERROR", { error: "dc-error", userId: b });
  }
  let E = new Map, Y = new Set, { userId: K, enterRoom: n, exitRoom: C, leaveUser: J, broadcast: G, end: Z } = i({ worldId: F, enterRoomFunction: R, logLine: z, workerUrl: P, peerlessUserExpiration: j, onRoomReady: O, onRoomClose: f, onLeaveUser(b) {
    let X = E.get(b);
    try {
      X?.close();
    } catch {}
    E.delete(b);
  }, receivePeerConnection({ pc: b, userId: X, initiator: M, restart: x }) {
    k(b, X, M, x);
  }, onBroadcastMessage(b, X) {
    _(b, X), z("\uD83D\uDCE2", { event: "broadcast", userId: K, data: b });
  } });
  function Q(b, X) {
    E.forEach((M, x) => {
      if (X && x !== X)
        return;
      if (M.readyState === "open")
        M.send(b);
    });
  }
  function D(b) {
    q.delete(b);
  }
  function $(b) {
    return q.add(b), () => {
      D(b);
    };
  }
  function A(b) {
    Y.delete(b);
  }
  function v(b) {
    return Y.add(b), () => {
      A(b);
    };
  }
  return { userId: K, send: Q, broadcast: G, enterRoom: n, exitRoom: C, leaveUser: J, getUsers: () => S, addMessageListener: $, removeMessageListener: D, addUserListener: v, removeUserListener: A, end() {
    E.forEach((b) => {
      try {
        b.close();
      } catch {}
    }), E.clear(), Z(), Y.clear(), S.length = 0;
  } };
}

// ../src/app/App.ts
function createApp({
  appId,
  onDataCycle,
  onUsersJoined,
  onUsersLeft,
  onReceivedIncomingUpdates,
  workerUrl
}) {
  const { userId, send, enterRoom, addMessageListener, addUserListener, end } = l({ worldId: appId, workerUrl });
  function setData2(path, data) {
    program.setData(path, data);
  }
  const comm = {
    onMessage: addMessageListener,
    onNewClient: (listener) => {
      const removeListener = addUserListener((user, action, users) => {
        if (action === "join") {
          listener(user);
          onUsersJoined?.(user, users);
        } else if (action === "leave") {
          setData2(`users/${user}`, undefined);
          onUsersLeft?.(user, users);
        }
      });
      return () => {
        removeListener();
      };
    },
    send,
    close: end
  };
  const program = new Program({
    appId,
    userId,
    onDataCycle,
    comm,
    onReceivedIncomingUpdates
  });
  return { userId, enterRoom, program };
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
    for (let i2 = 0;i2 < bools.length; i2++) {
      const index = i2 % 8;
      if (i2 && index === 0) {
        this.writeByte(bits);
        bits = 0;
      }
      bits |= bools[i2] ? 1 << index : 0;
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
          data.writeFloat64(msg.lineWidth);
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
          const lineWidth = data.readFloat64();
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
      const msgs = drain(ctrl, data);
      msgs.forEach((msg) => {
        if (msg) {
          onMessage(msg);
        }
      });
    });
    return () => {
      stop();
    };
  }
  const _msgs = [];
  function drain(ctrl, data) {
    const r = Atomics.load(ctrl, READ);
    const w = Atomics.load(ctrl, WRITE);
    if (r === w) {
      return _msgs;
    }
    _msgs.length = 0;
    while (data.offset !== w) {
      _msgs.push(deserialize(data));
    }
    Atomics.store(ctrl, READ, data.offset);
    return _msgs;
  }
  return { listen };
}

// ../src/app/core/messenger.ts
var import_lodash = __toESM(require_lodash(), 1);
var WRITE = 0;
var READ = 1;
function hookMessenger(ctrl, data) {
  const { serialize } = hookSerializers();
  const notify = import_lodash.default.throttle(() => {
    Atomics.notify(ctrl, WRITE);
  }, 0, { leading: false, trailing: true });
  function sendMessage(type, msg) {
    const w0 = Atomics.load(ctrl, WRITE);
    serialize(type, msg, data);
    if (w0 !== data.offset) {
      Atomics.store(ctrl, WRITE, data.offset);
      notify();
    }
  }
  return {
    sendMessage
  };
}
function setupMessenger(worker, onMessage) {
  const BYTES = 1024 * 1024;
  const sabToWorker = new SharedArrayBuffer(BYTES);
  const sabFromWorker = new SharedArrayBuffer(BYTES);
  const { listen } = hookMsgListener();
  worker.postMessage({ sabToWorker, sabFromWorker });
  const unlisten = listen(new Int32Array(sabFromWorker, 0, 8), new DataRingReader(new Uint8Array(sabFromWorker, 32)), onMessage);
  const { sendMessage } = hookMessenger(new Int32Array(sabToWorker, 0, 8), new DataRingWriter(new Uint8Array(sabToWorker, 32)));
  return {
    sendMessage,
    close: () => {
      unlisten();
    }
  };
}
// ../src/app/core/graphics.ts
function setupGraphics(worker) {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage({ canvas: offscreen, width, height, dpr: window.devicePixelRatio }, [offscreen]);
  function sendSize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width2 = Math.max(1, Math.floor(rect.width));
    const height2 = Math.max(1, Math.floor(rect.height));
    worker.postMessage({ type: "resize", width: width2, height: height2, dpr });
  }
  const observer = new ResizeObserver(sendSize);
  observer.observe(canvas);
  window.addEventListener("resize", sendSize);
  function unhook() {
    window.removeEventListener("resize", sendSize);
    observer.unobserve(canvas);
    observer.disconnect();
    document.body.removeChild(canvas);
  }
  return { unhook };
}

// ../src/app/utils/pointer-lock-hook.ts
function hookPointerLock(onHook) {
  const TIME_DELAY = 1400;
  let exitedPointerLockTime = -TIME_DELAY;
  let timeout;
  function ensureFocus() {
    if (!document.activeElement) {
      document.body.focus();
      exitedPointerLockTime = performance.now();
      return true;
    }
    return false;
  }
  async function waitForPointerLockExit() {
    const timeSinceExited = performance.now() - exitedPointerLockTime;
    clearTimeout(timeout);
    if (timeSinceExited < TIME_DELAY) {
      let detectExit = function() {
        hasExited = true;
      };
      let hasExited = false;
      document.body.addEventListener("mouseleave", detectExit, { once: true });
      await new Promise((resolve) => timeout = setTimeout(resolve, TIME_DELAY - timeSinceExited));
      timeout = undefined;
      document.body.removeEventListener("mouseleave", detectExit);
      if (hasExited) {
        return false;
      }
    }
    return true;
  }
  async function enterPointerLock() {
    if (ensureFocus()) {
      return;
    }
    if (timeout)
      return;
    document.body.style.cursor = "none";
    const unhook = onHook();
    const restore = () => {
      unhook();
      document.body.style.cursor = "auto";
      exitedPointerLockTime = performance.now();
    };
    const shouldContinue = await waitForPointerLockExit();
    if (!shouldContinue) {
      restore();
      return;
    }
    try {
      await document.body.requestPointerLock();
    } catch (e) {
      console.warn(e);
      restore();
      return;
    }
    function onPointerLockChange() {
      if (document.pointerLockElement)
        return;
      restore();
      document.removeEventListener("pointerlockchange", onPointerLockChange);
    }
    document.addEventListener("pointerlockchange", onPointerLockChange);
    document.body.style.cursor = "auto";
  }
  return { enterPointerLock };
}

// ../src/app/core/controls.ts
function setupControl({
  sendMessage
}) {
  const { enterPointerLock } = hookPointerLock(() => {
    function onKeyDown(e) {
      sendMessage(0 /* KEY_DOWN */, e);
    }
    function onKeyUp(e) {
      sendMessage(1 /* KEY_UP */, e);
    }
    function onMouseMove(e) {
      sendMessage(4 /* MOUSE_MOVE */, e);
    }
    function onMouseDown(e) {
      sendMessage(5 /* MOUSE_DOWN */, e);
      document.exitPointerLock();
    }
    function onMouseUp(e) {
      sendMessage(6 /* MOUSE_UP */, e);
    }
    function onWheel(e) {
      e.preventDefault();
      sendMessage(7 /* WHEEL */, e);
    }
    function handleContextMenu(e) {
      e.preventDefault();
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    sendMessage(8 /* POINTER_LOCK */, { enter: true });
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      sendMessage(8 /* POINTER_LOCK */, { enter: false });
    };
  });
  document.addEventListener("mousedown", enterPointerLock);
  function close() {
    document.removeEventListener("mousedown", enterPointerLock);
  }
  return { close };
}

// ../src/app/WorkerApp.ts
function createWorkerApp({
  worldId,
  signalWorkerUrl,
  programWorkerUrl,
  lobby
}) {
  if (!self.crossOriginIsolated) {
    console.error(`This feature can't run in your current browser context.
      It requires Cross-Origin Isolation (COOP/COEP) to enable high-performance shared memory.
      Please reload from the official site / correct environment, or contact your admin.`);
  }
  const {
    userId,
    send: sendAcross,
    enterRoom,
    exitRoom,
    addMessageListener,
    addUserListener,
    end
  } = l({ worldId, workerUrl: signalWorkerUrl });
  const worker = new Worker(programWorkerUrl, { type: "module" });
  const { sendMessage: sendToWorker, close: closeMessenger } = setupMessenger(worker, (msg) => {
    if (msg.type === 9 /* PING */) {
      console.log("Ping", (performance.now() - msg.now).toFixed(2) + "ms");
    }
    if (msg.type === 10 /* LINE */) {
      sendAcross(JSON.stringify(msg));
    }
  });
  const { unhook: unhookGraphics } = setupGraphics(worker);
  const { close: closeControls } = setupControl({ sendMessage: sendToWorker });
  const removeUserListener = addUserListener((user, action, users) => {
    sendToWorker(2 /* ON_USER_UPDATE */, {
      user,
      action,
      users
    });
  });
  const removeMessageListener = addMessageListener((data, from) => {
    if (typeof data === "string") {
      const obj = JSON.parse(data);
      sendToWorker(obj.type, obj);
      return;
    }
    sendToWorker(3 /* ON_MESSAGE */, {
      data,
      from
    });
  });
  setTimeout(() => {
    const now = performance.now();
    sendToWorker(9 /* PING */, { now });
  }, 1000);
  if (lobby) {
    enterRoom(lobby);
  }
  return {
    close() {
      removeUserListener();
      removeMessageListener();
      closeControls();
      unhookGraphics();
      closeMessenger();
      end();
      if (lobby) {
        exitRoom(lobby);
      }
    }
  };
}
// node_modules/unique-names-generator/dist/index.m.js
var a = (a2) => {
  a2 = 1831565813 + (a2 |= 0) | 0;
  let e = Math.imul(a2 ^ a2 >>> 15, 1 | a2);
  return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
};

class e {
  constructor(a2) {
    this.dictionaries = undefined, this.length = undefined, this.separator = undefined, this.style = undefined, this.seed = undefined;
    const { length: e2, separator: i2, dictionaries: n, style: l2, seed: r } = a2;
    this.dictionaries = n, this.separator = i2, this.length = e2, this.style = l2, this.seed = r;
  }
  generate() {
    if (!this.dictionaries)
      throw new Error('Cannot find any dictionary. Please provide at least one, or leave the "dictionary" field empty in the config object');
    if (this.length <= 0)
      throw new Error("Invalid length provided");
    if (this.length > this.dictionaries.length)
      throw new Error(`The length cannot be bigger than the number of dictionaries.
Length provided: ${this.length}. Number of dictionaries provided: ${this.dictionaries.length}`);
    let e2 = this.seed;
    return this.dictionaries.slice(0, this.length).reduce((i2, n) => {
      let l2;
      e2 ? (l2 = ((e3) => {
        if (typeof e3 == "string") {
          const i3 = e3.split("").map((a2) => a2.charCodeAt(0)).reduce((a2, e4) => a2 + e4, 1), n2 = Math.floor(Number(i3));
          return a(n2);
        }
        return a(e3);
      })(e2), e2 = 4294967296 * l2) : l2 = Math.random();
      let r = n[Math.floor(l2 * n.length)] || "";
      if (this.style === "lowerCase")
        r = r.toLowerCase();
      else if (this.style === "capital") {
        const [a2, ...e3] = r.split("");
        r = a2.toUpperCase() + e3.join("");
      } else
        this.style === "upperCase" && (r = r.toUpperCase());
      return i2 ? `${i2}${this.separator}${r}` : `${r}`;
    }, "");
  }
}
var i2 = { separator: "_", dictionaries: [] };
var n = (a2) => {
  const n2 = [...a2 && a2.dictionaries || i2.dictionaries], l2 = { ...i2, ...a2, length: a2 && a2.length || n2.length, dictionaries: n2 };
  if (!a2 || !a2.dictionaries || !a2.dictionaries.length)
    throw new Error('A "dictionaries" array must be provided. This is a breaking change introduced starting from Unique Name Generator v4. Read more about the breaking change here: https://github.com/andreasonny83/unique-names-generator#migration-guide');
  return new e(l2).generate();
};
var l2 = ["able", "above", "absent", "absolute", "abstract", "abundant", "academic", "acceptable", "accepted", "accessible", "accurate", "accused", "active", "actual", "acute", "added", "additional", "adequate", "adjacent", "administrative", "adorable", "advanced", "adverse", "advisory", "aesthetic", "afraid", "aggregate", "aggressive", "agreeable", "agreed", "agricultural", "alert", "alive", "alleged", "allied", "alone", "alright", "alternative", "amateur", "amazing", "ambitious", "amused", "ancient", "angry", "annoyed", "annual", "anonymous", "anxious", "appalling", "apparent", "applicable", "appropriate", "arbitrary", "architectural", "armed", "arrogant", "artificial", "artistic", "ashamed", "asleep", "assistant", "associated", "atomic", "attractive", "automatic", "autonomous", "available", "average", "awake", "aware", "awful", "awkward", "back", "bad", "balanced", "bare", "basic", "beautiful", "beneficial", "better", "bewildered", "big", "binding", "biological", "bitter", "bizarre", "blank", "blind", "blonde", "bloody", "blushing", "boiling", "bold", "bored", "boring", "bottom", "brainy", "brave", "breakable", "breezy", "brief", "bright", "brilliant", "broad", "broken", "bumpy", "burning", "busy", "calm", "capable", "capitalist", "careful", "casual", "causal", "cautious", "central", "certain", "changing", "characteristic", "charming", "cheap", "cheerful", "chemical", "chief", "chilly", "chosen", "christian", "chronic", "chubby", "circular", "civic", "civil", "civilian", "classic", "classical", "clean", "clear", "clever", "clinical", "close", "closed", "cloudy", "clumsy", "coastal", "cognitive", "coherent", "cold", "collective", "colonial", "colorful", "colossal", "coloured", "colourful", "combative", "combined", "comfortable", "coming", "commercial", "common", "communist", "compact", "comparable", "comparative", "compatible", "competent", "competitive", "complete", "complex", "complicated", "comprehensive", "compulsory", "conceptual", "concerned", "concrete", "condemned", "confident", "confidential", "confused", "conscious", "conservation", "conservative", "considerable", "consistent", "constant", "constitutional", "contemporary", "content", "continental", "continued", "continuing", "continuous", "controlled", "controversial", "convenient", "conventional", "convinced", "convincing", "cooing", "cool", "cooperative", "corporate", "correct", "corresponding", "costly", "courageous", "crazy", "creative", "creepy", "criminal", "critical", "crooked", "crowded", "crucial", "crude", "cruel", "cuddly", "cultural", "curious", "curly", "current", "curved", "cute", "daily", "damaged", "damp", "dangerous", "dark", "dead", "deaf", "deafening", "dear", "decent", "decisive", "deep", "defeated", "defensive", "defiant", "definite", "deliberate", "delicate", "delicious", "delighted", "delightful", "democratic", "dependent", "depressed", "desirable", "desperate", "detailed", "determined", "developed", "developing", "devoted", "different", "difficult", "digital", "diplomatic", "direct", "dirty", "disabled", "disappointed", "disastrous", "disciplinary", "disgusted", "distant", "distinct", "distinctive", "distinguished", "disturbed", "disturbing", "diverse", "divine", "dizzy", "domestic", "dominant", "double", "doubtful", "drab", "dramatic", "dreadful", "driving", "drunk", "dry", "dual", "due", "dull", "dusty", "dutch", "dying", "dynamic", "eager", "early", "eastern", "easy", "economic", "educational", "eerie", "effective", "efficient", "elaborate", "elated", "elderly", "eldest", "electoral", "electric", "electrical", "electronic", "elegant", "eligible", "embarrassed", "embarrassing", "emotional", "empirical", "empty", "enchanting", "encouraging", "endless", "energetic", "enormous", "enthusiastic", "entire", "entitled", "envious", "environmental", "equal", "equivalent", "essential", "established", "estimated", "ethical", "ethnic", "eventual", "everyday", "evident", "evil", "evolutionary", "exact", "excellent", "exceptional", "excess", "excessive", "excited", "exciting", "exclusive", "existing", "exotic", "expected", "expensive", "experienced", "experimental", "explicit", "extended", "extensive", "external", "extra", "extraordinary", "extreme", "exuberant", "faint", "fair", "faithful", "familiar", "famous", "fancy", "fantastic", "far", "fascinating", "fashionable", "fast", "fat", "fatal", "favourable", "favourite", "federal", "fellow", "female", "feminist", "few", "fierce", "filthy", "final", "financial", "fine", "firm", "fiscal", "fit", "fixed", "flaky", "flat", "flexible", "fluffy", "fluttering", "flying", "following", "fond", "foolish", "foreign", "formal", "formidable", "forthcoming", "fortunate", "forward", "fragile", "frail", "frantic", "free", "frequent", "fresh", "friendly", "frightened", "front", "frozen", "full", "fun", "functional", "fundamental", "funny", "furious", "future", "fuzzy", "gastric", "gay", "general", "generous", "genetic", "gentle", "genuine", "geographical", "giant", "gigantic", "given", "glad", "glamorous", "gleaming", "global", "glorious", "golden", "good", "gorgeous", "gothic", "governing", "graceful", "gradual", "grand", "grateful", "greasy", "great", "grieving", "grim", "gross", "grotesque", "growing", "grubby", "grumpy", "guilty", "handicapped", "handsome", "happy", "hard", "harsh", "head", "healthy", "heavy", "helpful", "helpless", "hidden", "high", "hilarious", "hissing", "historic", "historical", "hollow", "holy", "homeless", "homely", "hon", "honest", "horizontal", "horrible", "hostile", "hot", "huge", "human", "hungry", "hurt", "hushed", "husky", "icy", "ideal", "identical", "ideological", "ill", "illegal", "imaginative", "immediate", "immense", "imperial", "implicit", "important", "impossible", "impressed", "impressive", "improved", "inadequate", "inappropriate", "inc", "inclined", "increased", "increasing", "incredible", "independent", "indirect", "individual", "industrial", "inevitable", "influential", "informal", "inherent", "initial", "injured", "inland", "inner", "innocent", "innovative", "inquisitive", "instant", "institutional", "insufficient", "intact", "integral", "integrated", "intellectual", "intelligent", "intense", "intensive", "interested", "interesting", "interim", "interior", "intermediate", "internal", "international", "intimate", "invisible", "involved", "irrelevant", "isolated", "itchy", "jealous", "jittery", "joint", "jolly", "joyous", "judicial", "juicy", "junior", "just", "keen", "key", "kind", "known", "labour", "large", "late", "latin", "lazy", "leading", "left", "legal", "legislative", "legitimate", "lengthy", "lesser", "level", "lexical", "liable", "liberal", "light", "like", "likely", "limited", "linear", "linguistic", "liquid", "literary", "little", "live", "lively", "living", "local", "logical", "lonely", "long", "loose", "lost", "loud", "lovely", "low", "loyal", "ltd", "lucky", "mad", "magic", "magnetic", "magnificent", "main", "major", "male", "mammoth", "managerial", "managing", "manual", "many", "marginal", "marine", "marked", "married", "marvellous", "marxist", "mass", "massive", "mathematical", "mature", "maximum", "mean", "meaningful", "mechanical", "medical", "medieval", "melodic", "melted", "mental", "mere", "metropolitan", "mid", "middle", "mighty", "mild", "military", "miniature", "minimal", "minimum", "ministerial", "minor", "miserable", "misleading", "missing", "misty", "mixed", "moaning", "mobile", "moderate", "modern", "modest", "molecular", "monetary", "monthly", "moral", "motionless", "muddy", "multiple", "mushy", "musical", "mute", "mutual", "mysterious", "naked", "narrow", "nasty", "national", "native", "natural", "naughty", "naval", "near", "nearby", "neat", "necessary", "negative", "neighbouring", "nervous", "net", "neutral", "new", "nice", "noble", "noisy", "normal", "northern", "nosy", "notable", "novel", "nuclear", "numerous", "nursing", "nutritious", "nutty", "obedient", "objective", "obliged", "obnoxious", "obvious", "occasional", "occupational", "odd", "official", "ok", "okay", "old", "olympic", "only", "open", "operational", "opposite", "optimistic", "oral", "ordinary", "organic", "organisational", "original", "orthodox", "other", "outdoor", "outer", "outrageous", "outside", "outstanding", "overall", "overseas", "overwhelming", "painful", "pale", "panicky", "parallel", "parental", "parliamentary", "partial", "particular", "passing", "passive", "past", "patient", "payable", "peaceful", "peculiar", "perfect", "permanent", "persistent", "personal", "petite", "philosophical", "physical", "plain", "planned", "plastic", "pleasant", "pleased", "poised", "polite", "political", "poor", "popular", "positive", "possible", "potential", "powerful", "practical", "precious", "precise", "preferred", "pregnant", "preliminary", "premier", "prepared", "present", "presidential", "pretty", "previous", "prickly", "primary", "prime", "primitive", "principal", "printed", "prior", "private", "probable", "productive", "professional", "profitable", "profound", "progressive", "prominent", "promising", "proper", "proposed", "prospective", "protective", "protestant", "proud", "provincial", "psychiatric", "psychological", "public", "puny", "pure", "purring", "puzzled", "quaint", "qualified", "quarrelsome", "querulous", "quick", "quickest", "quiet", "quintessential", "quixotic", "racial", "radical", "rainy", "random", "rapid", "rare", "raspy", "rational", "ratty", "raw", "ready", "real", "realistic", "rear", "reasonable", "recent", "reduced", "redundant", "regional", "registered", "regular", "regulatory", "related", "relative", "relaxed", "relevant", "reliable", "relieved", "religious", "reluctant", "remaining", "remarkable", "remote", "renewed", "representative", "repulsive", "required", "resident", "residential", "resonant", "respectable", "respective", "responsible", "resulting", "retail", "retired", "revolutionary", "rich", "ridiculous", "right", "rigid", "ripe", "rising", "rival", "roasted", "robust", "rolling", "romantic", "rotten", "rough", "round", "royal", "rubber", "rude", "ruling", "running", "rural", "sacred", "sad", "safe", "salty", "satisfactory", "satisfied", "scared", "scary", "scattered", "scientific", "scornful", "scrawny", "screeching", "secondary", "secret", "secure", "select", "selected", "selective", "selfish", "semantic", "senior", "sensible", "sensitive", "separate", "serious", "severe", "sexual", "shaggy", "shaky", "shallow", "shared", "sharp", "sheer", "shiny", "shivering", "shocked", "short", "shrill", "shy", "sick", "significant", "silent", "silky", "silly", "similar", "simple", "single", "skilled", "skinny", "sleepy", "slight", "slim", "slimy", "slippery", "slow", "small", "smart", "smiling", "smoggy", "smooth", "social", "socialist", "soft", "solar", "sole", "solid", "sophisticated", "sore", "sorry", "sound", "sour", "southern", "soviet", "spare", "sparkling", "spatial", "special", "specific", "specified", "spectacular", "spicy", "spiritual", "splendid", "spontaneous", "sporting", "spotless", "spotty", "square", "squealing", "stable", "stale", "standard", "static", "statistical", "statutory", "steady", "steep", "sticky", "stiff", "still", "stingy", "stormy", "straight", "straightforward", "strange", "strategic", "strict", "striking", "striped", "strong", "structural", "stuck", "stupid", "subjective", "subsequent", "substantial", "subtle", "successful", "successive", "sudden", "sufficient", "suitable", "sunny", "super", "superb", "superior", "supporting", "supposed", "supreme", "sure", "surprised", "surprising", "surrounding", "surviving", "suspicious", "sweet", "swift", "symbolic", "sympathetic", "systematic", "tall", "tame", "tart", "tasteless", "tasty", "technical", "technological", "teenage", "temporary", "tender", "tense", "terrible", "territorial", "testy", "then", "theoretical", "thick", "thin", "thirsty", "thorough", "thoughtful", "thoughtless", "thundering", "tight", "tiny", "tired", "top", "tory", "total", "tough", "toxic", "traditional", "tragic", "tremendous", "tricky", "tropical", "troubled", "typical", "ugliest", "ugly", "ultimate", "unable", "unacceptable", "unaware", "uncertain", "unchanged", "uncomfortable", "unconscious", "underground", "underlying", "unemployed", "uneven", "unexpected", "unfair", "unfortunate", "unhappy", "uniform", "uninterested", "unique", "united", "universal", "unknown", "unlikely", "unnecessary", "unpleasant", "unsightly", "unusual", "unwilling", "upper", "upset", "uptight", "urban", "urgent", "used", "useful", "useless", "usual", "vague", "valid", "valuable", "variable", "varied", "various", "varying", "vast", "verbal", "vertical", "very", "vicarious", "vicious", "victorious", "violent", "visible", "visiting", "visual", "vital", "vitreous", "vivacious", "vivid", "vocal", "vocational", "voiceless", "voluminous", "voluntary", "vulnerable", "wandering", "warm", "wasteful", "watery", "weak", "wealthy", "weary", "wee", "weekly", "weird", "welcome", "well", "western", "wet", "whispering", "whole", "wicked", "wide", "widespread", "wild", "wilful", "willing", "willowy", "wily", "wise", "wispy", "wittering", "witty", "wonderful", "wooden", "working", "worldwide", "worried", "worrying", "worthwhile", "worthy", "written", "wrong", "xenacious", "xenial", "xenogeneic", "xenophobic", "xeric", "xerothermic", "yabbering", "yammering", "yappiest", "yappy", "yawning", "yearling", "yearning", "yeasty", "yelling", "yelping", "yielding", "yodelling", "young", "youngest", "youthful", "ytterbic", "yucky", "yummy", "zany", "zealous", "zeroth", "zestful", "zesty", "zippy", "zonal", "zoophagous", "zygomorphic", "zygotic"];
var r = ["aardvark", "aardwolf", "albatross", "alligator", "alpaca", "amphibian", "anaconda", "angelfish", "anglerfish", "ant", "anteater", "antelope", "antlion", "ape", "aphid", "armadillo", "asp", "baboon", "badger", "bandicoot", "barnacle", "barracuda", "basilisk", "bass", "bat", "bear", "beaver", "bedbug", "bee", "beetle", "bird", "bison", "blackbird", "boa", "boar", "bobcat", "bobolink", "bonobo", "booby", "bovid", "bug", "butterfly", "buzzard", "camel", "canid", "canidae", "capybara", "cardinal", "caribou", "carp", "cat", "caterpillar", "catfish", "catshark", "cattle", "centipede", "cephalopod", "chameleon", "cheetah", "chickadee", "chicken", "chimpanzee", "chinchilla", "chipmunk", "cicada", "clam", "clownfish", "cobra", "cockroach", "cod", "condor", "constrictor", "coral", "cougar", "cow", "coyote", "crab", "crane", "crawdad", "crayfish", "cricket", "crocodile", "crow", "cuckoo", "damselfly", "deer", "dingo", "dinosaur", "dog", "dolphin", "donkey", "dormouse", "dove", "dragon", "dragonfly", "duck", "eagle", "earthworm", "earwig", "echidna", "eel", "egret", "elephant", "elk", "emu", "ermine", "falcon", "felidae", "ferret", "finch", "firefly", "fish", "flamingo", "flea", "fly", "flyingfish", "fowl", "fox", "frog", "galliform", "gamefowl", "gayal", "gazelle", "gecko", "gerbil", "gibbon", "giraffe", "goat", "goldfish", "goose", "gopher", "gorilla", "grasshopper", "grouse", "guan", "guanaco", "guineafowl", "gull", "guppy", "haddock", "halibut", "hamster", "hare", "harrier", "hawk", "hedgehog", "heron", "herring", "hippopotamus", "hookworm", "hornet", "horse", "hoverfly", "hummingbird", "hyena", "iguana", "impala", "jackal", "jaguar", "jay", "jellyfish", "junglefowl", "kangaroo", "kingfisher", "kite", "kiwi", "koala", "koi", "krill", "ladybug", "lamprey", "landfowl", "lark", "leech", "lemming", "lemur", "leopard", "leopon", "limpet", "lion", "lizard", "llama", "lobster", "locust", "loon", "louse", "lungfish", "lynx", "macaw", "mackerel", "magpie", "mammal", "manatee", "mandrill", "marlin", "marmoset", "marmot", "marsupial", "marten", "mastodon", "meadowlark", "meerkat", "mink", "minnow", "mite", "mockingbird", "mole", "mollusk", "mongoose", "monkey", "moose", "mosquito", "moth", "mouse", "mule", "muskox", "narwhal", "newt", "nightingale", "ocelot", "octopus", "opossum", "orangutan", "orca", "ostrich", "otter", "owl", "ox", "panda", "panther", "parakeet", "parrot", "parrotfish", "partridge", "peacock", "peafowl", "pelican", "penguin", "perch", "pheasant", "pig", "pigeon", "pike", "pinniped", "piranha", "planarian", "platypus", "pony", "porcupine", "porpoise", "possum", "prawn", "primate", "ptarmigan", "puffin", "puma", "python", "quail", "quelea", "quokka", "rabbit", "raccoon", "rat", "rattlesnake", "raven", "reindeer", "reptile", "rhinoceros", "roadrunner", "rodent", "rook", "rooster", "roundworm", "sailfish", "salamander", "salmon", "sawfish", "scallop", "scorpion", "seahorse", "shark", "sheep", "shrew", "shrimp", "silkworm", "silverfish", "skink", "skunk", "sloth", "slug", "smelt", "snail", "snake", "snipe", "sole", "sparrow", "spider", "spoonbill", "squid", "squirrel", "starfish", "stingray", "stoat", "stork", "sturgeon", "swallow", "swan", "swift", "swordfish", "swordtail", "tahr", "takin", "tapir", "tarantula", "tarsier", "termite", "tern", "thrush", "tick", "tiger", "tiglon", "toad", "tortoise", "toucan", "trout", "tuna", "turkey", "turtle", "tyrannosaurus", "unicorn", "urial", "vicuna", "viper", "vole", "vulture", "wallaby", "walrus", "warbler", "wasp", "weasel", "whale", "whippet", "whitefish", "wildcat", "wildebeest", "wildfowl", "wolf", "wolverine", "wombat", "woodpecker", "worm", "wren", "xerinae", "yak", "zebra"];
var t = ["amaranth", "amber", "amethyst", "apricot", "aqua", "aquamarine", "azure", "beige", "black", "blue", "blush", "bronze", "brown", "chocolate", "coffee", "copper", "coral", "crimson", "cyan", "emerald", "fuchsia", "gold", "gray", "green", "harlequin", "indigo", "ivory", "jade", "lavender", "lime", "magenta", "maroon", "moccasin", "olive", "orange", "peach", "pink", "plum", "purple", "red", "rose", "salmon", "sapphire", "scarlet", "silver", "tan", "teal", "tomato", "turquoise", "violet", "white", "yellow"];

// src/test-room/index.ts
var { generateEmojis } = require_generate_random_emoji();
function setupApp() {
  const urlVars = new URLSearchParams(location.search);
  const room = urlVars.get("room");
  let userList = [];
  const { userId, enterRoom, program } = createApp({
    appId: "napl-test",
    onDataCycle: refreshData,
    onReceivedIncomingUpdates: refreshData,
    onUsersJoined: (_2, users) => {
      userList = users;
      refreshData();
    },
    onUsersLeft: (user, users) => {
      program.setData(`users/${user}`, undefined);
      userList = users;
      refreshData();
    },
    workerUrl: new URL("./signal-room.worker.js", import.meta.url)
  });
  enterRoom({ room: room ?? "test-room", host: "hello.dobuki.net" });
  const randomName = n({
    dictionaries: [l2, t, r]
  });
  program.observe("abc").onChange((value) => console.log(value));
  program.observe("users").onChange((users) => {
    console.log("USERS", users);
  });
  program.setData("users/~{self}/name", randomName);
  program.setData("users/~{self}/emoji", generateEmojis(1)[0].image);
  addEventListener("mousemove", (e2) => {
    const linked = program.getData("users/~{self}/linked") ?? true;
    if (linked) {
      program.setData("cursor/pos", { x: e2.pageX, y: e2.pageY });
      program.setData("cursor/emoji", program.getData("users/~{self}/emoji"));
      program.setData("cursor/user", userId);
    }
  });
  program.observe(["cursor/pos", "cursor/emoji", "cursor/user"]).onChange(([pos, emoji, user]) => {
    const div = document.querySelector("#div-emoji");
    if (div) {
      const offset = user === userId ? [2, 2] : [-div.offsetWidth / 2, -div.offsetHeight / 2];
      div.style.left = `${pos.x + offset[0]}px`;
      div.style.top = `${pos.y + offset[1]}px`;
      div.textContent = emoji;
    }
  });
  function refreshData() {
    const div = document.querySelector("#log-div") ?? document.body.appendChild(document.createElement("div"));
    div.id = "log-div";
    div.style.whiteSpace = "pre";
    div.style.fontFamily = "monospace";
    div.style.fontSize = "16px";
    div.textContent = JSON.stringify(program.root, null, 2) + `
Last update: ${new Date().toISOString()}
`;
    const divSplit = document.querySelector("#log-block") ?? document.body.appendChild(document.createElement("div"));
    divSplit.style.display = "flex";
    divSplit.style.flexDirection = "row";
    const divOut = document.querySelector("#log-div-out") ?? divSplit.appendChild(document.createElement("div"));
    divOut.id = "log-div-out";
    divOut.style.flex = "1";
    divOut.style.whiteSpace = "pre";
    divOut.style.fontFamily = "monospace";
    divOut.style.fontSize = "12px";
    divOut.textContent = program.outgoingUpdates.length ? `OUT
` + JSON.stringify(program.outgoingUpdates, null, 2) : "";
    const divIn = document.querySelector("#log-div-in") ?? divSplit.appendChild(document.createElement("div"));
    divIn.id = "log-div-in";
    divIn.style.flex = "1";
    divIn.style.whiteSpace = "pre";
    divIn.style.fontFamily = "monospace";
    divIn.style.fontSize = "12px";
    divIn.textContent = program.incomingUpdates.length ? `IN
` + JSON.stringify(program.incomingUpdates, null, 2) : "";
    const usrs = program.root.users;
    const allUsers = [userId, ...userList].map((userId2) => [
      usrs?.[userId2],
      userId2
    ]);
    const divUsers = document.querySelector("#log-div-users") ?? document.body.appendChild(document.createElement("div"));
    divUsers.id = "log-div-users";
    divUsers.style.flex = "1";
    divUsers.style.whiteSpace = "pre";
    divUsers.style.fontFamily = "monospace";
    divUsers.style.fontSize = "12px";
    divUsers.style.position = "absolute";
    divUsers.style.top = "5px";
    divUsers.style.right = "5px";
    divUsers.style.padding = "5px";
    divUsers.style.border = "1px solid black";
    divUsers.style.backgroundColor = "#ffffffaa";
    divUsers.style.display = "flex";
    divUsers.style.flexDirection = "column";
    divUsers.innerHTML = "";
    allUsers.forEach(([user, id]) => {
      const group = divUsers.appendChild(document.createElement("div"));
      group.style.display = "flex";
      group.style.flexDirection = "row";
      const emoji = group.appendChild(document.createElement("div"));
      emoji.style.width = "20px";
      emoji.style.textAlign = "center";
      emoji.textContent = user?.emoji ?? "";
      emoji.style.cursor = "pointer";
      emoji.addEventListener("mousedown", () => {
        const newEmoji = generateEmojis(1)[0].image;
        program.setData(`users/${id}/emoji`, newEmoji);
        if (program.getData("cursor/user") === id) {
          program.setData("cursor/emoji", newEmoji);
        }
        refreshData();
      });
      const name = group.appendChild(document.createElement("div"));
      name.textContent = user?.name ?? "";
      name.style.width = "200px";
      const link = group.appendChild(document.createElement("div"));
      const linked = program.getData(`users/${id}/linked`) ?? true;
      link.textContent = linked ? "\uD83D\uDD17" : "\uD83D\uDEAB";
      link.style.cursor = "pointer";
      link.addEventListener("mousedown", () => {
        program.setData(`users/${id}/linked`, !linked);
        refreshData();
      });
    });
    const divEmoji = document.querySelector("#div-emoji") ?? document.body.appendChild(document.createElement("div"));
    divEmoji.id = "div-emoji";
    divEmoji.style.position = "absolute";
    divEmoji.style.fontSize = "20pt";
    divEmoji.style.opacity = ".5";
  }
  function setupGamePlayer() {
    let paused = false;
    const updateButtons = new Set;
    function resetButtons() {
      updateButtons.forEach((callback) => callback());
    }
    function startLoop() {
      paused = false;
      let rafId = 0;
      function loop() {
        rafId = requestAnimationFrame(loop);
        program.performCycle();
      }
      rafId = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(rafId);
        paused = true;
      };
    }
    {
      let stop;
      const button = document.body.appendChild(document.createElement("button"));
      button.textContent = "⏸️";
      button.addEventListener("mousedown", () => {
        if (paused) {
          stop = startLoop();
        } else {
          stop?.();
          stop = undefined;
        }
        resetButtons();
      });
      updateButtons.add(() => {
        button.textContent = paused ? "▶️" : "⏸️";
      });
      stop = startLoop();
    }
    {
      const button = document.body.appendChild(document.createElement("button"));
      button.textContent = "⏯️";
      button.addEventListener("mousedown", () => program.performCycle());
      updateButtons.add(() => {
        button.disabled = !paused;
      });
    }
    {
      const button = document.body.appendChild(document.createElement("button"));
      button.textContent = "\uD83D\uDD04";
      button.addEventListener("mousedown", () => {
        program.setData(`abc`, Math.random());
        refreshData();
      });
    }
    resetButtons();
  }
  setupGamePlayer();
}
// src/worker-room/index.ts
function setupWorkerApp() {
  return createWorkerApp({
    worldId: "worker-test",
    signalWorkerUrl: new URL("./signal-room.worker.js", import.meta.url),
    programWorkerUrl: new URL("./app.worker.js", import.meta.url),
    lobby: {
      room: "worker-test-room",
      host: "hello.dobuki.net"
    }
  });
}
export {
  setupWorkerApp,
  setupApp
};

//# debugId=BF229B1782F6D23664756E2164756E21

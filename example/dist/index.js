// node_modules/@dobuki/syncopath/dist/index.js
var KEYS = "~{keys}";
var VALUES = "~{values}";
var REGEX = /~\{([^}]+)\}/;
function commitUpdates(root, properties, updatedPaths = {}) {
  if (!root || !root.updates?.length) {
    return updatedPaths;
  }
  sortUpdates(root.updates);
  root.updates?.forEach((update) => {
    if (!update.confirmed) {
      return;
    }
    const parts = update.path.split("/");
    const leaf = getLeafObject(root, parts, 1, true);
    const prop = parts[parts.length - 1];
    const value = translateValue(update.value, properties);
    if (update.append) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop], value];
    } else if ((update.insert ?? -1) >= 0) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop].slice(0, update.insert ?? -1), value, ...leaf[prop].slice(update.insert)];
    } else if ((update.delete ?? -1) >= 0) {
      if (Array.isArray(leaf[prop])) {
        leaf[prop] = [...leaf[prop].slice(0, update.delete), ...leaf[prop].slice((update.delete ?? -1) + 1)];
      }
    } else if (value === undefined) {
      delete leaf[prop];
      cleanupRoot(root, parts, 0);
    } else {
      leaf[prop] = value;
    }
    updatedPaths[update.path] = leaf[prop];
  });
  clearUpdates(root, updatedPaths);
  return updatedPaths;
}
function cleanupRoot(root, parts, index) {
  if (!root || typeof root !== "object" || Array.isArray(root)) {
    return false;
  }
  if (cleanupRoot(root[parts[index]], parts, index + 1)) {
    delete root[parts[index]];
  }
  return Object.keys(root).length === 0;
}
function clearUpdates(root, updatedPaths) {
  root.updates = root.updates?.filter((update) => !(update.path in updatedPaths));
  if (!root.updates?.length) {
    delete root.updates;
  }
}
function sortUpdates(updates) {
  updates?.sort((a, b) => {
    const confirmedA = a.confirmed ?? 0;
    const confirmedB = b.confirmed ?? 0;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    return a.path.localeCompare(b.path);
  });
}
function getLeafObject(obj, parts, offset, autoCreate, properties = {}) {
  let current = obj;
  for (let i = 0;i < parts.length - offset; i++) {
    const prop = parts[i];
    const value = translateProp(current, prop, properties, autoCreate);
    if (value === undefined) {
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
        const group = value.match(REGEX);
        if (group) {
          return properties[group[1]];
        }
    }
  }
  return value;
}
function translateProp(obj, prop, properties, autoCreate) {
  let value;
  if (typeof prop !== "string") {
    value = obj[prop];
  } else if (prop.startsWith("~{") && prop.endsWith("}")) {
    switch (prop) {
      case KEYS:
        return Object.keys(obj ?? {});
      case VALUES:
        return Object.values(obj ?? {});
      default:
        return obj[translateValue(prop, properties)];
    }
  } else {
    value = obj[prop];
  }
  if (value === undefined && autoCreate) {
    value = obj[prop] = {};
  }
  return value;
}
function markUpdateConfirmed(update, now) {
  if (!update.confirmed) {
    update.confirmed = now;
  }
}
var Yn = Object.create;
var { defineProperty: Rt, getPrototypeOf: En, getOwnPropertyNames: In } = Object;
var Nn = Object.prototype.hasOwnProperty;
var xn = (n, t, i) => {
  i = n != null ? Yn(En(n)) : {};
  let r = t || !n || !n.__esModule ? Rt(i, "default", { value: n, enumerable: true }) : i;
  for (let m of In(n))
    if (!Nn.call(r, m))
      Rt(r, m, { get: () => n[m], enumerable: true });
  return r;
};
var b = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports);
var jn = b((n, t) => {
  var i = function(x) {
    throw { name: "SyntaxError", message: x, at: g, text: N };
  }, r = function(x) {
    if (x && x !== h)
      i("Expected '" + x + "' instead of '" + h + "'");
    return h = N.charAt(g), g += 1, h;
  }, m = function() {
    var x, v = "";
    if (h === "-")
      v = "-", r("-");
    while (h >= "0" && h <= "9")
      v += h, r();
    if (h === ".") {
      v += ".";
      while (r() && h >= "0" && h <= "9")
        v += h;
    }
    if (h === "e" || h === "E") {
      if (v += h, r(), h === "-" || h === "+")
        v += h, r();
      while (h >= "0" && h <= "9")
        v += h, r();
    }
    if (x = Number(v), !isFinite(x))
      i("Bad number");
    return x;
  }, c = function() {
    var x, v, j = "", S;
    if (h === '"')
      while (r())
        if (h === '"')
          return r(), j;
        else if (h === "\\")
          if (r(), h === "u") {
            S = 0;
            for (v = 0;v < 4; v += 1) {
              if (x = parseInt(r(), 16), !isFinite(x))
                break;
              S = S * 16 + x;
            }
            j += String.fromCharCode(S);
          } else if (typeof Y[h] === "string")
            j += Y[h];
          else
            break;
        else
          j += h;
    i("Bad string");
  }, u = function() {
    while (h && h <= " ")
      r();
  }, I = function() {
    switch (h) {
      case "t":
        return r("t"), r("r"), r("u"), r("e"), true;
      case "f":
        return r("f"), r("a"), r("l"), r("s"), r("e"), false;
      case "n":
        return r("n"), r("u"), r("l"), r("l"), null;
      default:
        i("Unexpected '" + h + "'");
    }
  }, s = function() {
    var x = [];
    if (h === "[") {
      if (r("["), u(), h === "]")
        return r("]"), x;
      while (h) {
        if (x.push(E()), u(), h === "]")
          return r("]"), x;
        r(","), u();
      }
    }
    i("Bad array");
  }, e = function() {
    var x, v = {};
    if (h === "{") {
      if (r("{"), u(), h === "}")
        return r("}"), v;
      while (h) {
        if (x = c(), u(), r(":"), Object.prototype.hasOwnProperty.call(v, x))
          i('Duplicate key "' + x + '"');
        if (v[x] = E(), u(), h === "}")
          return r("}"), v;
        r(","), u();
      }
    }
    i("Bad object");
  }, E = function() {
    switch (u(), h) {
      case "{":
        return e();
      case "[":
        return s();
      case '"':
        return c();
      case "-":
        return m();
      default:
        return h >= "0" && h <= "9" ? m() : I();
    }
  }, g, h, Y = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, N;
  t.exports = function(x, v) {
    var j;
    if (N = x, g = 0, h = " ", j = E(), u(), h)
      i("Syntax error");
    return typeof v === "function" ? function S(A, T) {
      var d, R, P = A[T];
      if (P && typeof P === "object") {
        for (d in E)
          if (Object.prototype.hasOwnProperty.call(P, d))
            if (R = S(P, d), typeof R === "undefined")
              delete P[d];
            else
              P[d] = R;
      }
      return v.call(A, T, P);
    }({ "": j }, "") : j;
  };
});
var vn = b((n, t) => {
  var i = function(e) {
    return m.lastIndex = 0, m.test(e) ? '"' + e.replace(m, function(E) {
      var g = I[E];
      return typeof g === "string" ? g : "\\u" + ("0000" + E.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + e + '"';
  }, r = function(e, E) {
    var g, h, Y, N, x = c, v, j = E[e];
    if (j && typeof j === "object" && typeof j.toJSON === "function")
      j = j.toJSON(e);
    if (typeof s === "function")
      j = s.call(E, e, j);
    switch (typeof j) {
      case "string":
        return i(j);
      case "number":
        return isFinite(j) ? String(j) : "null";
      case "boolean":
      case "null":
        return String(j);
      case "object":
        if (!j)
          return "null";
        if (c += u, v = [], Object.prototype.toString.apply(j) === "[object Array]") {
          N = j.length;
          for (g = 0;g < N; g += 1)
            v[g] = r(g, j) || "null";
          return Y = v.length === 0 ? "[]" : c ? `[
` + c + v.join(`,
` + c) + `
` + x + "]" : "[" + v.join(",") + "]", c = x, Y;
        }
        if (s && typeof s === "object") {
          N = s.length;
          for (g = 0;g < N; g += 1)
            if (h = s[g], typeof h === "string") {
              if (Y = r(h, j), Y)
                v.push(i(h) + (c ? ": " : ":") + Y);
            }
        } else
          for (h in j)
            if (Object.prototype.hasOwnProperty.call(j, h)) {
              if (Y = r(h, j), Y)
                v.push(i(h) + (c ? ": " : ":") + Y);
            }
        return Y = v.length === 0 ? "{}" : c ? `{
` + c + v.join(`,
` + c) + `
` + x + "}" : "{" + v.join(",") + "}", c = x, Y;
      default:
    }
  }, m = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c, u, I = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, s;
  t.exports = function(e, E, g) {
    var h;
    if (c = "", u = "", typeof g === "number")
      for (h = 0;h < g; h += 1)
        u += " ";
    else if (typeof g === "string")
      u = g;
    if (s = E, E && typeof E !== "function" && (typeof E !== "object" || typeof E.length !== "number"))
      throw new Error("JSON.stringify");
    return r("", { "": e });
  };
});
var $n = b((n) => {
  n.parse = jn(), n.stringify = vn();
});
var Pn = b((n, t) => {
  var i = {}.toString;
  t.exports = Array.isArray || function(r) {
    return i.call(r) == "[object Array]";
  };
});
var Vt = b((n, t) => {
  var i = Object.prototype.toString;
  t.exports = function r(m) {
    var c = i.call(m), u = c === "[object Arguments]";
    if (!u)
      u = c !== "[object Array]" && m !== null && typeof m === "object" && typeof m.length === "number" && m.length >= 0 && i.call(m.callee) === "[object Function]";
    return u;
  };
});
var Sn = b((n, t) => {
  var i;
  if (!Object.keys)
    r = Object.prototype.hasOwnProperty, m = Object.prototype.toString, c = Vt(), u = Object.prototype.propertyIsEnumerable, I = !u.call({ toString: null }, "toString"), s = u.call(function() {}, "prototype"), e = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], E = function(N) {
      var x = N.constructor;
      return x && x.prototype === N;
    }, g = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, h = function() {
      if (typeof window === "undefined")
        return false;
      for (var N in window)
        try {
          if (!g["$" + N] && r.call(window, N) && window[N] !== null && typeof window[N] === "object")
            try {
              E(window[N]);
            } catch (x) {
              return true;
            }
        } catch (x) {
          return true;
        }
      return false;
    }(), Y = function(N) {
      if (typeof window === "undefined" || !h)
        return E(N);
      try {
        return E(N);
      } catch (x) {
        return false;
      }
    }, i = function N(x) {
      var v = x !== null && typeof x === "object", j = m.call(x) === "[object Function]", S = c(x), A = v && m.call(x) === "[object String]", T = [];
      if (!v && !j && !S)
        throw new TypeError("Object.keys called on a non-object");
      var d = s && j;
      if (A && x.length > 0 && !r.call(x, 0))
        for (var R = 0;R < x.length; ++R)
          T.push(String(R));
      if (S && x.length > 0)
        for (var P = 0;P < x.length; ++P)
          T.push(String(P));
      else
        for (var H in x)
          if (!(d && H === "prototype") && r.call(x, H))
            T.push(String(H));
      if (I) {
        var U = Y(x);
        for (var a = 0;a < e.length; ++a)
          if (!(U && e[a] === "constructor") && r.call(x, e[a]))
            T.push(e[a]);
      }
      return T;
    };
  var r, m, c, u, I, s, e, E, g, h, Y;
  t.exports = i;
});
var Tn = b((n, t) => {
  var i = Array.prototype.slice, r = Vt(), m = Object.keys, c = m ? function I(s) {
    return m(s);
  } : Sn(), u = Object.keys;
  c.shim = function I() {
    if (Object.keys) {
      var s = function() {
        var e = Object.keys(arguments);
        return e && e.length === arguments.length;
      }(1, 2);
      if (!s)
        Object.keys = function e(E) {
          if (r(E))
            return u(i.call(E));
          return u(E);
        };
    } else
      Object.keys = c;
    return Object.keys || c;
  }, t.exports = c;
});
var An = b((n, t) => {
  var i = "Function.prototype.bind called on incompatible ", r = Object.prototype.toString, m = Math.max, c = "[object Function]", u = function e(E, g) {
    var h = [];
    for (var Y = 0;Y < E.length; Y += 1)
      h[Y] = E[Y];
    for (var N = 0;N < g.length; N += 1)
      h[N + E.length] = g[N];
    return h;
  }, I = function e(E, g) {
    var h = [];
    for (var Y = g || 0, N = 0;Y < E.length; Y += 1, N += 1)
      h[N] = E[Y];
    return h;
  }, s = function(e, E) {
    var g = "";
    for (var h = 0;h < e.length; h += 1)
      if (g += e[h], h + 1 < e.length)
        g += E;
    return g;
  };
  t.exports = function e(E) {
    var g = this;
    if (typeof g !== "function" || r.apply(g) !== c)
      throw new TypeError(i + g);
    var h = I(arguments, 1), Y, N = function() {
      if (this instanceof Y) {
        var A = g.apply(this, u(h, arguments));
        if (Object(A) === A)
          return A;
        return this;
      }
      return g.apply(E, u(h, arguments));
    }, x = m(0, g.length - h.length), v = [];
    for (var j = 0;j < x; j++)
      v[j] = "$" + j;
    if (Y = Function("binder", "return function (" + s(v, ",") + "){ return binder.apply(this,arguments); }")(N), g.prototype) {
      var S = function A() {};
      S.prototype = g.prototype, Y.prototype = new S, S.prototype = null;
    }
    return Y;
  };
});
var vt = b((n, t) => {
  var i = An();
  t.exports = Function.prototype.bind || i;
});
var kn = b((n, t) => {
  t.exports = Error;
});
var bn = b((n, t) => {
  t.exports = EvalError;
});
var dn = b((n, t) => {
  t.exports = RangeError;
});
var Cn = b((n, t) => {
  t.exports = ReferenceError;
});
var Ut = b((n, t) => {
  t.exports = SyntaxError;
});
var $t = b((n, t) => {
  t.exports = TypeError;
});
var On = b((n, t) => {
  t.exports = URIError;
});
var Rn = b((n, t) => {
  t.exports = function i() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var r = {}, m = Symbol("test"), c = Object(m);
    if (typeof m === "string")
      return false;
    if (Object.prototype.toString.call(m) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(c) !== "[object Symbol]")
      return false;
    var u = 42;
    r[m] = u;
    for (m in r)
      return false;
    if (typeof Object.keys === "function" && Object.keys(r).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(r).length !== 0)
      return false;
    var I = Object.getOwnPropertySymbols(r);
    if (I.length !== 1 || I[0] !== m)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(r, m))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var s = Object.getOwnPropertyDescriptor(r, m);
      if (s.value !== u || s.enumerable !== true)
        return false;
    }
    return true;
  };
});
var Gt = b((n, t) => {
  var i = typeof Symbol !== "undefined" && Symbol, r = Rn();
  t.exports = function m() {
    if (typeof i !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof i("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return r();
  };
});
var Zt = b((n, t) => {
  var i = { foo: {} }, r = Object;
  t.exports = function m() {
    return { __proto__: i }.foo === i.foo && !({ __proto__: null } instanceof r);
  };
});
var at = b((n, t) => {
  var i = Function.prototype.call, r = Object.prototype.hasOwnProperty, m = vt();
  t.exports = m.call(i, r);
});
var Pt = b((n, t) => {
  var i, r = kn(), m = bn(), c = dn(), u = Cn(), I = Ut(), s = $t(), e = On(), E = Function, g = function(D) {
    try {
      return E('"use strict"; return (' + D + ").constructor;")();
    } catch (C) {}
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch (D) {
      h = null;
    }
  var Y = function() {
    throw new s;
  }, N = h ? function() {
    try {
      return arguments.callee, Y;
    } catch (D) {
      try {
        return h(arguments, "callee").get;
      } catch (C) {
        return Y;
      }
    }
  }() : Y, x = Gt()(), v = Zt()(), j = Object.getPrototypeOf || (v ? function(D) {
    return D.__proto__;
  } : null), S = {}, A = typeof Uint8Array === "undefined" || !j ? i : j(Uint8Array), T = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? i : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? i : ArrayBuffer, "%ArrayIteratorPrototype%": x && j ? j([][Symbol.iterator]()) : i, "%AsyncFromSyncIteratorPrototype%": i, "%AsyncFunction%": S, "%AsyncGenerator%": S, "%AsyncGeneratorFunction%": S, "%AsyncIteratorPrototype%": S, "%Atomics%": typeof Atomics === "undefined" ? i : Atomics, "%BigInt%": typeof BigInt === "undefined" ? i : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? i : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": r, "%eval%": eval, "%EvalError%": m, "%Float32Array%": typeof Float32Array === "undefined" ? i : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? i : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? i : FinalizationRegistry, "%Function%": E, "%GeneratorFunction%": S, "%Int8Array%": typeof Int8Array === "undefined" ? i : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? i : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": x && j ? j(j([][Symbol.iterator]())) : i, "%JSON%": typeof JSON === "object" ? JSON : i, "%Map%": typeof Map === "undefined" ? i : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !x || !j ? i : j(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? i : Promise, "%Proxy%": typeof Proxy === "undefined" ? i : Proxy, "%RangeError%": c, "%ReferenceError%": u, "%Reflect%": typeof Reflect === "undefined" ? i : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? i : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !x || !j ? i : j(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": x && j ? j(""[Symbol.iterator]()) : i, "%Symbol%": x ? Symbol : i, "%SyntaxError%": I, "%ThrowTypeError%": N, "%TypedArray%": A, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? i : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? i : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? i : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? i : Uint32Array, "%URIError%": e, "%WeakMap%": typeof WeakMap === "undefined" ? i : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? i : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? i : WeakSet };
  if (j)
    try {
      null.error;
    } catch (D) {
      d = j(j(D)), T["%Error.prototype%"] = d;
    }
  var d, R = function D(C) {
    var k;
    if (C === "%AsyncFunction%")
      k = g("async function () {}");
    else if (C === "%GeneratorFunction%")
      k = g("function* () {}");
    else if (C === "%AsyncGeneratorFunction%")
      k = g("async function* () {}");
    else if (C === "%AsyncGenerator%") {
      var p = D("%AsyncGeneratorFunction%");
      if (p)
        k = p.prototype;
    } else if (C === "%AsyncIteratorPrototype%") {
      var f = D("%AsyncGenerator%");
      if (f && j)
        k = j(f.prototype);
    }
    return T[C] = k, k;
  }, P = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, H = vt(), U = at(), a = H.call(Function.call, Array.prototype.concat), G = H.call(Function.apply, Array.prototype.splice), rt = H.call(Function.call, String.prototype.replace), X = H.call(Function.call, String.prototype.slice), L = H.call(Function.call, RegExp.prototype.exec), O = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, M = /\\(\\)?/g, W = function D(C) {
    var k = X(C, 0, 1), p = X(C, -1);
    if (k === "%" && p !== "%")
      throw new I("invalid intrinsic syntax, expected closing `%`");
    else if (p === "%" && k !== "%")
      throw new I("invalid intrinsic syntax, expected opening `%`");
    var f = [];
    return rt(C, O, function(V, Z, o, z) {
      f[f.length] = o ? rt(z, M, "$1") : Z || V;
    }), f;
  }, l = function D(C, k) {
    var p = C, f;
    if (U(P, p))
      f = P[p], p = "%" + f[0] + "%";
    if (U(T, p)) {
      var V = T[p];
      if (V === S)
        V = R(p);
      if (typeof V === "undefined" && !k)
        throw new s("intrinsic " + C + " exists, but is not available. Please file an issue!");
      return { alias: f, name: p, value: V };
    }
    throw new I("intrinsic " + C + " does not exist!");
  };
  t.exports = function D(C, k) {
    if (typeof C !== "string" || C.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof k !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (L(/^%?[^%]*%?$/, C) === null)
      throw new I("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var p = W(C), f = p.length > 0 ? p[0] : "", V = l("%" + f + "%", k), Z = V.name, o = V.value, z = false, nt = V.alias;
    if (nt)
      f = nt[0], G(p, a([0, 1], nt));
    for (var _ = 1, ct = true;_ < p.length; _ += 1) {
      var J = p[_], Yt = X(J, 0, 1), Et = X(J, -1);
      if ((Yt === '"' || Yt === "'" || Yt === "`" || (Et === '"' || Et === "'" || Et === "`")) && Yt !== Et)
        throw new I("property names with quotes must have matching quotes");
      if (J === "constructor" || !ct)
        z = true;
      if (f += "." + J, Z = "%" + f + "%", U(T, Z))
        o = T[Z];
      else if (o != null) {
        if (!(J in o)) {
          if (!k)
            throw new s("base intrinsic for " + C + " exists, but the property is not available.");
          return;
        }
        if (h && _ + 1 >= p.length) {
          var It = h(o, J);
          if (ct = !!It, ct && "get" in It && !("originalValue" in It.get))
            o = It.get;
          else
            o = o[J];
        } else
          ct = U(o, J), o = o[J];
        if (ct && !z)
          T[Z] = o;
      }
    }
    return o;
  };
});
var At = b((n, t) => {
  var i = Pt(), r = i("%Object.defineProperty%", true) || false;
  if (r)
    try {
      r({}, "a", { value: 1 });
    } catch (m) {
      r = false;
    }
  t.exports = r;
});
var pn = b((n, t) => {
  var i, r = SyntaxError, m = Function, c = TypeError, u = function(L) {
    try {
      return m('"use strict"; return (' + L + ").constructor;")();
    } catch (O) {}
  }, I = Object.getOwnPropertyDescriptor;
  if (I)
    try {
      I({}, "");
    } catch (L) {
      I = null;
    }
  var s = function() {
    throw new c;
  }, e = I ? function() {
    try {
      return arguments.callee, s;
    } catch (L) {
      try {
        return I(arguments, "callee").get;
      } catch (O) {
        return s;
      }
    }
  }() : s, E = Gt()(), g = Zt()(), h = Object.getPrototypeOf || (g ? function(L) {
    return L.__proto__;
  } : null), Y = {}, N = typeof Uint8Array === "undefined" || !h ? i : h(Uint8Array), x = { "%AggregateError%": typeof AggregateError === "undefined" ? i : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? i : ArrayBuffer, "%ArrayIteratorPrototype%": E && h ? h([][Symbol.iterator]()) : i, "%AsyncFromSyncIteratorPrototype%": i, "%AsyncFunction%": Y, "%AsyncGenerator%": Y, "%AsyncGeneratorFunction%": Y, "%AsyncIteratorPrototype%": Y, "%Atomics%": typeof Atomics === "undefined" ? i : Atomics, "%BigInt%": typeof BigInt === "undefined" ? i : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? i : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? i : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? i : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? i : FinalizationRegistry, "%Function%": m, "%GeneratorFunction%": Y, "%Int8Array%": typeof Int8Array === "undefined" ? i : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? i : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": E && h ? h(h([][Symbol.iterator]())) : i, "%JSON%": typeof JSON === "object" ? JSON : i, "%Map%": typeof Map === "undefined" ? i : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !E || !h ? i : h(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? i : Promise, "%Proxy%": typeof Proxy === "undefined" ? i : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? i : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? i : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !E || !h ? i : h(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": E && h ? h(""[Symbol.iterator]()) : i, "%Symbol%": E ? Symbol : i, "%SyntaxError%": r, "%ThrowTypeError%": e, "%TypedArray%": N, "%TypeError%": c, "%Uint8Array%": typeof Uint8Array === "undefined" ? i : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? i : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? i : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? i : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? i : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? i : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? i : WeakSet };
  if (h)
    try {
      null.error;
    } catch (L) {
      v = h(h(L)), x["%Error.prototype%"] = v;
    }
  var v, j = function L(O) {
    var M;
    if (O === "%AsyncFunction%")
      M = u("async function () {}");
    else if (O === "%GeneratorFunction%")
      M = u("function* () {}");
    else if (O === "%AsyncGeneratorFunction%")
      M = u("async function* () {}");
    else if (O === "%AsyncGenerator%") {
      var W = L("%AsyncGeneratorFunction%");
      if (W)
        M = W.prototype;
    } else if (O === "%AsyncIteratorPrototype%") {
      var l = L("%AsyncGenerator%");
      if (l && h)
        M = h(l.prototype);
    }
    return x[O] = M, M;
  }, S = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, A = vt(), T = at(), d = A.call(Function.call, Array.prototype.concat), R = A.call(Function.apply, Array.prototype.splice), P = A.call(Function.call, String.prototype.replace), H = A.call(Function.call, String.prototype.slice), U = A.call(Function.call, RegExp.prototype.exec), a = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, G = /\\(\\)?/g, rt = function L(O) {
    var M = H(O, 0, 1), W = H(O, -1);
    if (M === "%" && W !== "%")
      throw new r("invalid intrinsic syntax, expected closing `%`");
    else if (W === "%" && M !== "%")
      throw new r("invalid intrinsic syntax, expected opening `%`");
    var l = [];
    return P(O, a, function(D, C, k, p) {
      l[l.length] = k ? P(p, G, "$1") : C || D;
    }), l;
  }, X = function L(O, M) {
    var W = O, l;
    if (T(S, W))
      l = S[W], W = "%" + l[0] + "%";
    if (T(x, W)) {
      var D = x[W];
      if (D === Y)
        D = j(W);
      if (typeof D === "undefined" && !M)
        throw new c("intrinsic " + O + " exists, but is not available. Please file an issue!");
      return { alias: l, name: W, value: D };
    }
    throw new r("intrinsic " + O + " does not exist!");
  };
  t.exports = function L(O, M) {
    if (typeof O !== "string" || O.length === 0)
      throw new c("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof M !== "boolean")
      throw new c('"allowMissing" argument must be a boolean');
    if (U(/^%?[^%]*%?$/, O) === null)
      throw new r("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var W = rt(O), l = W.length > 0 ? W[0] : "", D = X("%" + l + "%", M), C = D.name, k = D.value, p = false, f = D.alias;
    if (f)
      l = f[0], R(W, d([0, 1], f));
    for (var V = 1, Z = true;V < W.length; V += 1) {
      var o = W[V], z = H(o, 0, 1), nt = H(o, -1);
      if ((z === '"' || z === "'" || z === "`" || (nt === '"' || nt === "'" || nt === "`")) && z !== nt)
        throw new r("property names with quotes must have matching quotes");
      if (o === "constructor" || !Z)
        p = true;
      if (l += "." + o, C = "%" + l + "%", T(x, C))
        k = x[C];
      else if (k != null) {
        if (!(o in k)) {
          if (!M)
            throw new c("base intrinsic for " + O + " exists, but the property is not available.");
          return;
        }
        if (I && V + 1 >= W.length) {
          var _ = I(k, o);
          if (Z = !!_, Z && "get" in _ && !("originalValue" in _.get))
            k = _.get;
          else
            k = k[o];
        } else
          Z = T(k, o), k = k[o];
        if (Z && !p)
          x[C] = k;
      }
    }
    return k;
  };
});
var Ft = b((n, t) => {
  var i = pn(), r = i("%Object.getOwnPropertyDescriptor%", true);
  if (r)
    try {
      r([], "length");
    } catch (m) {
      r = null;
    }
  t.exports = r;
});
var Dn = b((n, t) => {
  var i = At(), r = Ut(), m = $t(), c = Ft();
  t.exports = function u(I, s, e) {
    if (!I || typeof I !== "object" && typeof I !== "function")
      throw new m("`obj` must be an object or a function`");
    if (typeof s !== "string" && typeof s !== "symbol")
      throw new m("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new m("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new m("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new m("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new m("`loose`, if provided, must be a boolean");
    var E = arguments.length > 3 ? arguments[3] : null, g = arguments.length > 4 ? arguments[4] : null, h = arguments.length > 5 ? arguments[5] : null, Y = arguments.length > 6 ? arguments[6] : false, N = !!c && c(I, s);
    if (i)
      i(I, s, { configurable: h === null && N ? N.configurable : !h, enumerable: E === null && N ? N.enumerable : !E, value: e, writable: g === null && N ? N.writable : !g });
    else if (Y || !E && !g && !h)
      I[s] = e;
    else
      throw new r("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var on = b((n, t) => {
  var i = At(), r = function m() {
    return !!i;
  };
  r.hasArrayLengthDefineBug = function m() {
    if (!i)
      return null;
    try {
      return i([], "length", { value: 1 }).length !== 1;
    } catch (c) {
      return true;
    }
  }, t.exports = r;
});
var Wn = b((n, t) => {
  var i = Pt(), r = Dn(), m = on()(), c = Ft(), u = $t(), I = i("%Math.floor%");
  t.exports = function s(e, E) {
    if (typeof e !== "function")
      throw new u("`fn` is not a function");
    if (typeof E !== "number" || E < 0 || E > 4294967295 || I(E) !== E)
      throw new u("`length` must be a positive 32-bit integer");
    var g = arguments.length > 2 && !!arguments[2], h = true, Y = true;
    if ("length" in e && c) {
      var N = c(e, "length");
      if (N && !N.configurable)
        h = false;
      if (N && !N.writable)
        Y = false;
    }
    if (h || Y || !g)
      if (m)
        r(e, "length", E, true, true);
      else
        r(e, "length", E);
    return e;
  };
});
var Bt = b((n, t) => {
  var i = vt(), r = Pt(), m = Wn(), c = $t(), u = r("%Function.prototype.apply%"), I = r("%Function.prototype.call%"), s = r("%Reflect.apply%", true) || i.call(I, u), e = At(), E = r("%Math.max%");
  t.exports = function h(Y) {
    if (typeof Y !== "function")
      throw new c("a function is required");
    var N = s(i, I, arguments);
    return m(N, 1 + E(0, Y.length - (arguments.length - 1)), true);
  };
  var g = function h() {
    return s(i, u, arguments);
  };
  if (e)
    e(t.exports, "apply", { value: g });
  else
    t.exports.apply = g;
});
var Ln = b((n, t) => {
  var i = Pt(), r = Bt(), m = r(i("String.prototype.indexOf"));
  t.exports = function c(u, I) {
    var s = i(u, !!I);
    if (typeof s === "function" && m(u, ".prototype.") > -1)
      return r(s);
    return s;
  };
});
var Mn = b((n, t) => {
  var i = (typeof JSON !== "undefined" ? JSON : $n()).stringify, r = Pn(), m = Tn(), c = Bt(), u = Ln(), I = u("Array.prototype.join"), s = u("Array.prototype.push"), e = function g(h, Y) {
    var N = "";
    for (var x = 0;x < h; x += 1)
      N += Y;
    return N;
  }, E = function(g, h, Y) {
    return Y;
  };
  t.exports = function g(h) {
    var Y = arguments.length > 1 ? arguments[1] : undefined, N = Y && Y.space || "";
    if (typeof N === "number")
      N = e(N, " ");
    var x = !!Y && typeof Y.cycles === "boolean" && Y.cycles, v = Y && Y.replacer ? c(Y.replacer) : E, j = typeof Y === "function" ? Y : Y && Y.cmp, S = j && function(T) {
      var d = j.length > 2 && function R(P) {
        return T[P];
      };
      return function(R, P) {
        return j({ key: R, value: T[R] }, { key: P, value: T[P] }, d ? { __proto__: null, get: d } : undefined);
      };
    }, A = [];
    return function T(d, R, P, H) {
      var U = N ? `
` + e(H, N) : "", a = N ? ": " : ":";
      if (P && P.toJSON && typeof P.toJSON === "function")
        P = P.toJSON();
      if (P = v(d, R, P), P === undefined)
        return;
      if (typeof P !== "object" || P === null)
        return i(P);
      if (r(P)) {
        var L = [];
        for (var G = 0;G < P.length; G++) {
          var rt = T(P, G, P[G], H + 1) || i(null);
          s(L, U + N + rt);
        }
        return "[" + I(L, ",") + U + "]";
      }
      if (A.indexOf(P) !== -1) {
        if (x)
          return i("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        s(A, P);
      var X = m(P).sort(S && S(P)), L = [];
      for (var G = 0;G < X.length; G++) {
        var R = X[G], O = T(P, R, P[R], H + 1);
        if (!O)
          continue;
        var M = i(R) + a + O;
        s(L, U + N + M);
      }
      return A.splice(A.indexOf(P), 1), "{" + I(L, ",") + U + "}";
    }({ "": h }, "", h, 0);
  };
});
var pt = xn(Mn(), 1);
var Dt = function(n, t, i, r) {
  let m, c, u, I = t || [0], s = (i = i || 0) >>> 3, e = r === -1 ? 3 : 0;
  for (m = 0;m < n.length; m += 1)
    u = m + s, c = u >>> 2, I.length <= c && I.push(0), I[c] |= n[m] << 8 * (e + r * (u % 4));
  return { value: I, binLen: 8 * n.length + i };
};
var ht = function(n, t, i) {
  switch (t) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (n) {
    case "HEX":
      return function(r, m, c) {
        return function(u, I, s, e) {
          let E, g, h, Y;
          if (u.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          let N = I || [0], x = (s = s || 0) >>> 3, v = e === -1 ? 3 : 0;
          for (E = 0;E < u.length; E += 2) {
            if (g = parseInt(u.substr(E, 2), 16), isNaN(g))
              throw new Error("String of HEX type contains invalid characters");
            for (Y = (E >>> 1) + x, h = Y >>> 2;N.length <= h; )
              N.push(0);
            N[h] |= g << 8 * (v + e * (Y % 4));
          }
          return { value: N, binLen: 4 * u.length + s };
        }(r, m, c, i);
      };
    case "TEXT":
      return function(r, m, c) {
        return function(u, I, s, e, E) {
          let g, h, Y, N, x, v, j, S, A = 0, T = s || [0], d = (e = e || 0) >>> 3;
          if (I === "UTF8")
            for (j = E === -1 ? 3 : 0, Y = 0;Y < u.length; Y += 1)
              for (g = u.charCodeAt(Y), h = [], 128 > g ? h.push(g) : 2048 > g ? (h.push(192 | g >>> 6), h.push(128 | 63 & g)) : 55296 > g || 57344 <= g ? h.push(224 | g >>> 12, 128 | g >>> 6 & 63, 128 | 63 & g) : (Y += 1, g = 65536 + ((1023 & g) << 10 | 1023 & u.charCodeAt(Y)), h.push(240 | g >>> 18, 128 | g >>> 12 & 63, 128 | g >>> 6 & 63, 128 | 63 & g)), N = 0;N < h.length; N += 1) {
                for (v = A + d, x = v >>> 2;T.length <= x; )
                  T.push(0);
                T[x] |= h[N] << 8 * (j + E * (v % 4)), A += 1;
              }
          else
            for (j = E === -1 ? 2 : 0, S = I === "UTF16LE" && E !== 1 || I !== "UTF16LE" && E === 1, Y = 0;Y < u.length; Y += 1) {
              for (g = u.charCodeAt(Y), S === true && (N = 255 & g, g = N << 8 | g >>> 8), v = A + d, x = v >>> 2;T.length <= x; )
                T.push(0);
              T[x] |= g << 8 * (j + E * (v % 4)), A += 2;
            }
          return { value: T, binLen: 8 * A + e };
        }(r, t, m, c, i);
      };
    case "B64":
      return function(r, m, c) {
        return function(u, I, s, e) {
          let E, g, h, Y, N, x, v, j = 0, S = I || [0], A = (s = s || 0) >>> 3, T = e === -1 ? 3 : 0, d = u.indexOf("=");
          if (u.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (u = u.replace(/=/g, ""), d !== -1 && d < u.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (g = 0;g < u.length; g += 4) {
            for (N = u.substr(g, 4), Y = 0, h = 0;h < N.length; h += 1)
              E = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(N.charAt(h)), Y |= E << 18 - 6 * h;
            for (h = 0;h < N.length - 1; h += 1) {
              for (v = j + A, x = v >>> 2;S.length <= x; )
                S.push(0);
              S[x] |= (Y >>> 16 - 8 * h & 255) << 8 * (T + e * (v % 4)), j += 1;
            }
          }
          return { value: S, binLen: 8 * j + s };
        }(r, m, c, i);
      };
    case "BYTES":
      return function(r, m, c) {
        return function(u, I, s, e) {
          let E, g, h, Y, N = I || [0], x = (s = s || 0) >>> 3, v = e === -1 ? 3 : 0;
          for (g = 0;g < u.length; g += 1)
            E = u.charCodeAt(g), Y = g + x, h = Y >>> 2, N.length <= h && N.push(0), N[h] |= E << 8 * (v + e * (Y % 4));
          return { value: N, binLen: 8 * u.length + s };
        }(r, m, c, i);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (r) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(r, m, c) {
        return function(u, I, s, e) {
          return Dt(new Uint8Array(u), I, s, e);
        }(r, m, c, i);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (r) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(r, m, c) {
        return Dt(r, m, c, i);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var ot = function(n, t, i, r) {
  switch (n) {
    case "HEX":
      return function(m) {
        return function(c, u, I, s) {
          let e, E, g = "", h = u / 8, Y = I === -1 ? 3 : 0;
          for (e = 0;e < h; e += 1)
            E = c[e >>> 2] >>> 8 * (Y + I * (e % 4)), g += "0123456789abcdef".charAt(E >>> 4 & 15) + "0123456789abcdef".charAt(15 & E);
          return s.outputUpper ? g.toUpperCase() : g;
        }(m, t, i, r);
      };
    case "B64":
      return function(m) {
        return function(c, u, I, s) {
          let e, E, g, h, Y, N = "", x = u / 8, v = I === -1 ? 3 : 0;
          for (e = 0;e < x; e += 3)
            for (h = e + 1 < x ? c[e + 1 >>> 2] : 0, Y = e + 2 < x ? c[e + 2 >>> 2] : 0, g = (c[e >>> 2] >>> 8 * (v + I * (e % 4)) & 255) << 16 | (h >>> 8 * (v + I * ((e + 1) % 4)) & 255) << 8 | Y >>> 8 * (v + I * ((e + 2) % 4)) & 255, E = 0;E < 4; E += 1)
              N += 8 * e + 6 * E <= u ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >>> 6 * (3 - E) & 63) : s.b64Pad;
          return N;
        }(m, t, i, r);
      };
    case "BYTES":
      return function(m) {
        return function(c, u, I) {
          let s, e, E = "", g = u / 8, h = I === -1 ? 3 : 0;
          for (s = 0;s < g; s += 1)
            e = c[s >>> 2] >>> 8 * (h + I * (s % 4)) & 255, E += String.fromCharCode(e);
          return E;
        }(m, t, i);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (m) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(m) {
        return function(c, u, I) {
          let s, e = u / 8, E = new ArrayBuffer(e), g = new Uint8Array(E), h = I === -1 ? 3 : 0;
          for (s = 0;s < e; s += 1)
            g[s] = c[s >>> 2] >>> 8 * (h + I * (s % 4)) & 255;
          return E;
        }(m, t, i);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (m) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(m) {
        return function(c, u, I) {
          let s, e = u / 8, E = I === -1 ? 3 : 0, g = new Uint8Array(e);
          for (s = 0;s < e; s += 1)
            g[s] = c[s >>> 2] >>> 8 * (E + I * (s % 4)) & 255;
          return g;
        }(m, t, i);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var jt = function(n, t) {
  let i, r, m = n.binLen >>> 3, c = t.binLen >>> 3, u = m << 3, I = 4 - m << 3;
  if (m % 4 != 0) {
    for (i = 0;i < c; i += 4)
      r = m + i >>> 2, n.value[r] |= t.value[i >>> 2] << u, n.value.push(0), n.value[r + 1] |= t.value[i >>> 2] >>> I;
    return (n.value.length << 2) - 4 >= c + m && n.value.pop(), { value: n.value, binLen: n.binLen + t.binLen };
  }
  return { value: n.value.concat(t.value), binLen: n.binLen + t.binLen };
};
var Wt = function(n) {
  let t = { outputUpper: false, b64Pad: "=", outputLen: -1 }, i = n || {};
  if (t.outputUpper = i.outputUpper || false, i.b64Pad && (t.b64Pad = i.b64Pad), i.outputLen) {
    if (i.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    t.outputLen = i.outputLen;
  } else if (i.shakeLen) {
    if (i.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    t.outputLen = i.shakeLen;
  }
  if (typeof t.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof t.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return t;
};
var it = function(n, t, i, r) {
  let m = n + " must include a value and format";
  if (!t) {
    if (!r)
      throw new Error(m);
    return r;
  }
  if (t.value === undefined || !t.format)
    throw new Error(m);
  return ht(t.format, t.encoding || "UTF8", i)(t.value);
};
var mt = function(n, t) {
  return n << t | n >>> 32 - t;
};
var B = function(n, t) {
  return n >>> t | n << 32 - t;
};
var Qt = function(n, t) {
  return n >>> t;
};
var Lt = function(n, t, i) {
  return n ^ t ^ i;
};
var Xt = function(n, t, i) {
  return n & t ^ ~n & i;
};
var zt = function(n, t, i) {
  return n & t ^ n & i ^ t & i;
};
var fn = function(n) {
  return B(n, 2) ^ B(n, 13) ^ B(n, 22);
};
var K = function(n, t) {
  let i = (65535 & n) + (65535 & t);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16)) << 16 | 65535 & i;
};
var Hn = function(n, t, i, r) {
  let m = (65535 & n) + (65535 & t) + (65535 & i) + (65535 & r);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16) + (r >>> 16) + (m >>> 16)) << 16 | 65535 & m;
};
var ut = function(n, t, i, r, m) {
  let c = (65535 & n) + (65535 & t) + (65535 & i) + (65535 & r) + (65535 & m);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16) + (r >>> 16) + (m >>> 16) + (c >>> 16)) << 16 | 65535 & c;
};
var ln = function(n) {
  return B(n, 7) ^ B(n, 18) ^ Qt(n, 3);
};
var yn = function(n) {
  return B(n, 6) ^ B(n, 11) ^ B(n, 25);
};
var Kn = function(n) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var _t = function(n, t) {
  let i, r, m, c, u, I, s, e = [];
  for (i = t[0], r = t[1], m = t[2], c = t[3], u = t[4], s = 0;s < 80; s += 1)
    e[s] = s < 16 ? n[s] : mt(e[s - 3] ^ e[s - 8] ^ e[s - 14] ^ e[s - 16], 1), I = s < 20 ? ut(mt(i, 5), Xt(r, m, c), u, 1518500249, e[s]) : s < 40 ? ut(mt(i, 5), Lt(r, m, c), u, 1859775393, e[s]) : s < 60 ? ut(mt(i, 5), zt(r, m, c), u, 2400959708, e[s]) : ut(mt(i, 5), Lt(r, m, c), u, 3395469782, e[s]), u = c, c = m, m = mt(r, 30), r = i, i = I;
  return t[0] = K(i, t[0]), t[1] = K(r, t[1]), t[2] = K(m, t[2]), t[3] = K(c, t[3]), t[4] = K(u, t[4]), t;
};
var Vn = function(n, t, i, r) {
  let m, c = 15 + (t + 65 >>> 9 << 4), u = t + i;
  for (;n.length <= c; )
    n.push(0);
  for (n[t >>> 5] |= 128 << 24 - t % 32, n[c] = 4294967295 & u, n[c - 1] = u / st | 0, m = 0;m < n.length; m += 16)
    r = _t(n.slice(m, m + 16), r);
  return r;
};
var Mt = function(n) {
  let t;
  return t = n == "SHA-224" ? q.slice() : tt.slice(), t;
};
var ft = function(n, t) {
  let i, r, m, c, u, I, s, e, E, g, h, Y = [];
  for (i = t[0], r = t[1], m = t[2], c = t[3], u = t[4], I = t[5], s = t[6], e = t[7], h = 0;h < 64; h += 1)
    Y[h] = h < 16 ? n[h] : Hn(B(N = Y[h - 2], 17) ^ B(N, 19) ^ Qt(N, 10), Y[h - 7], ln(Y[h - 15]), Y[h - 16]), E = ut(e, yn(u), Xt(u, I, s), $[h], Y[h]), g = K(fn(i), zt(i, r, m)), e = s, s = I, I = u, u = K(c, E), c = m, m = r, r = i, i = K(E, g);
  var N;
  return t[0] = K(i, t[0]), t[1] = K(r, t[1]), t[2] = K(m, t[2]), t[3] = K(c, t[3]), t[4] = K(u, t[4]), t[5] = K(I, t[5]), t[6] = K(s, t[6]), t[7] = K(e, t[7]), t;
};
var Ht = function(n, t) {
  let i;
  return t > 32 ? (i = 64 - t, new w(n.I << t | n.N >>> i, n.N << t | n.I >>> i)) : t !== 0 ? (i = 32 - t, new w(n.N << t | n.I >>> i, n.I << t | n.N >>> i)) : n;
};
var Q = function(n, t) {
  let i;
  return t < 32 ? (i = 32 - t, new w(n.N >>> t | n.I << i, n.I >>> t | n.N << i)) : (i = 64 - t, new w(n.I >>> t | n.N << i, n.N >>> t | n.I << i));
};
var Jt = function(n, t) {
  return new w(n.N >>> t, n.I >>> t | n.N << 32 - t);
};
var Un = function(n, t, i) {
  return new w(n.N & t.N ^ n.N & i.N ^ t.N & i.N, n.I & t.I ^ n.I & i.I ^ t.I & i.I);
};
var Gn = function(n) {
  let t = Q(n, 28), i = Q(n, 34), r = Q(n, 39);
  return new w(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var F = function(n, t) {
  let i, r;
  i = (65535 & n.I) + (65535 & t.I), r = (n.I >>> 16) + (t.I >>> 16) + (i >>> 16);
  let m = (65535 & r) << 16 | 65535 & i;
  return i = (65535 & n.N) + (65535 & t.N) + (r >>> 16), r = (n.N >>> 16) + (t.N >>> 16) + (i >>> 16), new w((65535 & r) << 16 | 65535 & i, m);
};
var Zn = function(n, t, i, r) {
  let m, c;
  m = (65535 & n.I) + (65535 & t.I) + (65535 & i.I) + (65535 & r.I), c = (n.I >>> 16) + (t.I >>> 16) + (i.I >>> 16) + (r.I >>> 16) + (m >>> 16);
  let u = (65535 & c) << 16 | 65535 & m;
  return m = (65535 & n.N) + (65535 & t.N) + (65535 & i.N) + (65535 & r.N) + (c >>> 16), c = (n.N >>> 16) + (t.N >>> 16) + (i.N >>> 16) + (r.N >>> 16) + (m >>> 16), new w((65535 & c) << 16 | 65535 & m, u);
};
var an = function(n, t, i, r, m) {
  let c, u;
  c = (65535 & n.I) + (65535 & t.I) + (65535 & i.I) + (65535 & r.I) + (65535 & m.I), u = (n.I >>> 16) + (t.I >>> 16) + (i.I >>> 16) + (r.I >>> 16) + (m.I >>> 16) + (c >>> 16);
  let I = (65535 & u) << 16 | 65535 & c;
  return c = (65535 & n.N) + (65535 & t.N) + (65535 & i.N) + (65535 & r.N) + (65535 & m.N) + (u >>> 16), u = (n.N >>> 16) + (t.N >>> 16) + (i.N >>> 16) + (r.N >>> 16) + (m.N >>> 16) + (c >>> 16), new w((65535 & u) << 16 | 65535 & c, I);
};
var gt = function(n, t) {
  return new w(n.N ^ t.N, n.I ^ t.I);
};
var Fn = function(n) {
  let t = Q(n, 19), i = Q(n, 61), r = Jt(n, 6);
  return new w(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var Bn = function(n) {
  let t = Q(n, 1), i = Q(n, 8), r = Jt(n, 7);
  return new w(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var Qn = function(n) {
  let t = Q(n, 14), i = Q(n, 18), r = Q(n, 41);
  return new w(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var lt = function(n) {
  return n === "SHA-384" ? [new w(3418070365, q[0]), new w(1654270250, q[1]), new w(2438529370, q[2]), new w(355462360, q[3]), new w(1731405415, q[4]), new w(41048885895, q[5]), new w(3675008525, q[6]), new w(1203062813, q[7])] : [new w(tt[0], 4089235720), new w(tt[1], 2227873595), new w(tt[2], 4271175723), new w(tt[3], 1595750129), new w(tt[4], 2917565137), new w(tt[5], 725511199), new w(tt[6], 4215389547), new w(tt[7], 327033209)];
};
var yt = function(n, t) {
  let i, r, m, c, u, I, s, e, E, g, h, Y, N = [];
  for (i = t[0], r = t[1], m = t[2], c = t[3], u = t[4], I = t[5], s = t[6], e = t[7], h = 0;h < 80; h += 1)
    h < 16 ? (Y = 2 * h, N[h] = new w(n[Y], n[Y + 1])) : N[h] = Zn(Fn(N[h - 2]), N[h - 7], Bn(N[h - 15]), N[h - 16]), E = an(e, Qn(u), (v = I, j = s, new w((x = u).N & v.N ^ ~x.N & j.N, x.I & v.I ^ ~x.I & j.I)), Jn[h], N[h]), g = F(Gn(i), Un(i, r, m)), e = s, s = I, I = u, u = F(c, E), c = m, m = r, r = i, i = F(E, g);
  var x, v, j;
  return t[0] = F(i, t[0]), t[1] = F(r, t[1]), t[2] = F(m, t[2]), t[3] = F(c, t[3]), t[4] = F(u, t[4]), t[5] = F(I, t[5]), t[6] = F(s, t[6]), t[7] = F(e, t[7]), t;
};
var Tt = function(n) {
  let t, i = [];
  for (t = 0;t < 5; t += 1)
    i[t] = [new w(0, 0), new w(0, 0), new w(0, 0), new w(0, 0), new w(0, 0)];
  return i;
};
var Xn = function(n) {
  let t, i = [];
  for (t = 0;t < 5; t += 1)
    i[t] = n[t].slice();
  return i;
};
var Nt = function(n, t) {
  let i, r, m, c, u = [], I = [];
  if (n !== null)
    for (r = 0;r < n.length; r += 2)
      t[(r >>> 1) % 5][(r >>> 1) / 5 | 0] = gt(t[(r >>> 1) % 5][(r >>> 1) / 5 | 0], new w(n[r + 1], n[r]));
  for (i = 0;i < 24; i += 1) {
    for (c = Tt(), r = 0;r < 5; r += 1)
      u[r] = (s = t[r][0], e = t[r][1], E = t[r][2], g = t[r][3], h = t[r][4], new w(s.N ^ e.N ^ E.N ^ g.N ^ h.N, s.I ^ e.I ^ E.I ^ g.I ^ h.I));
    for (r = 0;r < 5; r += 1)
      I[r] = gt(u[(r + 4) % 5], Ht(u[(r + 1) % 5], 1));
    for (r = 0;r < 5; r += 1)
      for (m = 0;m < 5; m += 1)
        t[r][m] = gt(t[r][m], I[r]);
    for (r = 0;r < 5; r += 1)
      for (m = 0;m < 5; m += 1)
        c[m][(2 * r + 3 * m) % 5] = Ht(t[r][m], ni[r][m]);
    for (r = 0;r < 5; r += 1)
      for (m = 0;m < 5; m += 1)
        t[r][m] = gt(c[r][m], new w(~c[(r + 1) % 5][m].N & c[(r + 2) % 5][m].N, ~c[(r + 1) % 5][m].I & c[(r + 2) % 5][m].I));
    t[0][0] = gt(t[0][0], ti[i]);
  }
  var s, e, E, g, h;
  return t;
};
var qt = function(n) {
  let t, i, r = 0, m = [0, 0], c = [4294967295 & n, n / st & 2097151];
  for (t = 6;t >= 0; t--)
    i = c[t >> 2] >>> 8 * t & 255, i === 0 && r === 0 || (m[r + 1 >> 2] |= i << 8 * (r + 1), r += 1);
  return r = r !== 0 ? r : 1, m[0] |= r, { value: r + 1 > 4 ? m : [m[0]], binLen: 8 + 8 * r };
};
var St = function(n) {
  return jt(qt(n.binLen), n);
};
var Kt = function(n, t) {
  let i, r = qt(t);
  r = jt(r, n);
  let m = t >>> 2, c = (m - r.value.length % m) % m;
  for (i = 0;i < c; i++)
    r.value.push(0);
  return r.value;
};
var st = 4294967296;
var $ = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var q = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var tt = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var wt = "Chosen SHA variant is not supported";
var tn = "Cannot set numRounds with MAC";

class et {
  constructor(n, t, i) {
    let r = i || {};
    if (this.t = t, this.i = r.encoding || "UTF8", this.numRounds = r.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = n, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(n) {
    let t, i = 0, r = this.m >>> 5, m = this.C(n, this.h, this.u), c = m.binLen, u = m.value, I = c >>> 5;
    for (t = 0;t < I; t += r)
      i + this.m <= c && (this.U = this.v(u.slice(t, t + r), this.U), i += this.m);
    return this.A += i, this.h = u.slice(i >>> 5), this.u = c % this.m, this.l = true, this;
  }
  getHash(n, t) {
    let i, r, m = this.R, c = Wt(t);
    if (this.K) {
      if (c.outputLen === -1)
        throw new Error("Output length must be specified in options");
      m = c.outputLen;
    }
    let u = ot(n, m, this.T, c);
    if (this.H && this.g)
      return u(this.g(c));
    for (r = this.F(this.h.slice(), this.u, this.A, this.L(this.U), m), i = 1;i < this.numRounds; i += 1)
      this.K && m % 32 != 0 && (r[r.length - 1] &= 16777215 >>> 24 - m % 32), r = this.F(r, m, 0, this.B(this.o), m);
    return u(r);
  }
  setHMACKey(n, t, i) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    let r = ht(t, (i || {}).encoding || "UTF8", this.T);
    this.k(r(n));
  }
  k(n) {
    let t = this.m >>> 3, i = t / 4 - 1, r;
    if (this.numRounds !== 1)
      throw new Error(tn);
    if (this.H)
      throw new Error("MAC key already set");
    for (t < n.binLen / 8 && (n.value = this.F(n.value, n.binLen, 0, this.B(this.o), this.R));n.value.length <= i; )
      n.value.push(0);
    for (r = 0;r <= i; r += 1)
      this.S[r] = 909522486 ^ n.value[r], this.p[r] = 1549556828 ^ n.value[r];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(n, t) {
    let i = Wt(t);
    return ot(n, this.R, this.T, i)(this.Y());
  }
  Y() {
    let n;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    let t = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return n = this.v(this.p, this.B(this.o)), n = this.F(t, this.R, this.m, n, this.R), n;
  }
}
var zn = class extends et {
  constructor(n, t, i) {
    if (n !== "SHA-1")
      throw new Error(wt);
    super(n, t, i);
    let r = i || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = ht(this.t, this.i, this.T), this.v = _t, this.L = function(m) {
      return m.slice();
    }, this.B = Kn, this.F = Vn, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, r.hmacKey && this.k(it("hmacKey", r.hmacKey, this.T));
  }
};
var _n = class extends et {
  constructor(n, t, i) {
    if (n !== "SHA-224" && n !== "SHA-256")
      throw new Error(wt);
    super(n, t, i);
    let r = i || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = ht(this.t, this.i, this.T), this.v = ft, this.L = function(m) {
      return m.slice();
    }, this.B = Mt, this.F = function(m, c, u, I) {
      return function(s, e, E, g, h) {
        let Y, N, x = 15 + (e + 65 >>> 9 << 4), v = e + E;
        for (;s.length <= x; )
          s.push(0);
        for (s[e >>> 5] |= 128 << 24 - e % 32, s[x] = 4294967295 & v, s[x - 1] = v / st | 0, Y = 0;Y < s.length; Y += 16)
          g = ft(s.slice(Y, Y + 16), g);
        return N = h === "SHA-224" ? [g[0], g[1], g[2], g[3], g[4], g[5], g[6]] : g, N;
      }(m, c, u, I, n);
    }, this.U = Mt(n), this.m = 512, this.R = n === "SHA-224" ? 224 : 256, this.K = false, r.hmacKey && this.k(it("hmacKey", r.hmacKey, this.T));
  }
};

class w {
  constructor(n, t) {
    this.N = n, this.I = t;
  }
}
var Jn = [new w($[0], 3609767458), new w($[1], 602891725), new w($[2], 3964484399), new w($[3], 2173295548), new w($[4], 4081628472), new w($[5], 3053834265), new w($[6], 2937671579), new w($[7], 3664609560), new w($[8], 2734883394), new w($[9], 1164996542), new w($[10], 1323610764), new w($[11], 3590304994), new w($[12], 4068182383), new w($[13], 991336113), new w($[14], 633803317), new w($[15], 3479774868), new w($[16], 2666613458), new w($[17], 944711139), new w($[18], 2341262773), new w($[19], 2007800933), new w($[20], 1495990901), new w($[21], 1856431235), new w($[22], 3175218132), new w($[23], 2198950837), new w($[24], 3999719339), new w($[25], 766784016), new w($[26], 2566594879), new w($[27], 3203337956), new w($[28], 1034457026), new w($[29], 2466948901), new w($[30], 3758326383), new w($[31], 168717936), new w($[32], 1188179964), new w($[33], 1546045734), new w($[34], 1522805485), new w($[35], 2643833823), new w($[36], 2343527390), new w($[37], 1014477480), new w($[38], 1206759142), new w($[39], 344077627), new w($[40], 1290863460), new w($[41], 3158454273), new w($[42], 3505952657), new w($[43], 106217008), new w($[44], 3606008344), new w($[45], 1432725776), new w($[46], 1467031594), new w($[47], 851169720), new w($[48], 3100823752), new w($[49], 1363258195), new w($[50], 3750685593), new w($[51], 3785050280), new w($[52], 3318307427), new w($[53], 3812723403), new w($[54], 2003034995), new w($[55], 3602036899), new w($[56], 1575990012), new w($[57], 1125592928), new w($[58], 2716904306), new w($[59], 442776044), new w($[60], 593698344), new w($[61], 3733110249), new w($[62], 2999351573), new w($[63], 3815920427), new w(3391569614, 3928383900), new w(3515267271, 566280711), new w(3940187606, 3454069534), new w(4118630271, 4000239992), new w(116418474, 1914138554), new w(174292421, 2731055270), new w(289380356, 3203993006), new w(460393269, 320620315), new w(685471733, 587496836), new w(852142971, 1086792851), new w(1017036298, 365543100), new w(1126000580, 2618297676), new w(1288033470, 3409855158), new w(1501505948, 4234509866), new w(1607167915, 987167468), new w(1816402316, 1246189591)];
var qn = class extends et {
  constructor(n, t, i) {
    if (n !== "SHA-384" && n !== "SHA-512")
      throw new Error(wt);
    super(n, t, i);
    let r = i || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = ht(this.t, this.i, this.T), this.v = yt, this.L = function(m) {
      return m.slice();
    }, this.B = lt, this.F = function(m, c, u, I) {
      return function(s, e, E, g, h) {
        let Y, N, x = 31 + (e + 129 >>> 10 << 5), v = e + E;
        for (;s.length <= x; )
          s.push(0);
        for (s[e >>> 5] |= 128 << 24 - e % 32, s[x] = 4294967295 & v, s[x - 1] = v / st | 0, Y = 0;Y < s.length; Y += 32)
          g = yt(s.slice(Y, Y + 32), g);
        return N = h === "SHA-384" ? [g[0].N, g[0].I, g[1].N, g[1].I, g[2].N, g[2].I, g[3].N, g[3].I, g[4].N, g[4].I, g[5].N, g[5].I] : [g[0].N, g[0].I, g[1].N, g[1].I, g[2].N, g[2].I, g[3].N, g[3].I, g[4].N, g[4].I, g[5].N, g[5].I, g[6].N, g[6].I, g[7].N, g[7].I], N;
      }(m, c, u, I, n);
    }, this.U = lt(n), this.m = 1024, this.R = n === "SHA-384" ? 384 : 512, this.K = false, r.hmacKey && this.k(it("hmacKey", r.hmacKey, this.T));
  }
};
var ti = [new w(0, 1), new w(0, 32898), new w(2147483648, 32906), new w(2147483648, 2147516416), new w(0, 32907), new w(0, 2147483649), new w(2147483648, 2147516545), new w(2147483648, 32777), new w(0, 138), new w(0, 136), new w(0, 2147516425), new w(0, 2147483658), new w(0, 2147516555), new w(2147483648, 139), new w(2147483648, 32905), new w(2147483648, 32771), new w(2147483648, 32770), new w(2147483648, 128), new w(0, 32778), new w(2147483648, 2147483658), new w(2147483648, 2147516545), new w(2147483648, 32896), new w(0, 2147483649), new w(2147483648, 2147516424)];
var ni = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var ii = class extends et {
  constructor(n, t, i) {
    let r = 6, m = 0;
    super(n, t, i);
    let c = i || {};
    if (this.numRounds !== 1) {
      if (c.kmacKey || c.hmacKey)
        throw new Error(tn);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = ht(this.t, this.i, this.T), this.v = Nt, this.L = Xn, this.B = Tt, this.U = Tt(), this.K = false, n) {
      case "SHA3-224":
        this.m = m = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = m = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = m = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = m = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        r = 31, this.m = m = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        r = 31, this.m = m = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        r = 4, this.m = m = 1344, this.X(i), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        r = 4, this.m = m = 1088, this.X(i), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = m = 1344, r = this.O(i), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = m = 1088, r = this.O(i), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(wt);
    }
    this.F = function(u, I, s, e, E) {
      return function(g, h, Y, N, x, v, j) {
        let S, A, T = 0, d = [], R = x >>> 5, P = h >>> 5;
        for (S = 0;S < P && h >= x; S += R)
          N = Nt(g.slice(S, S + R), N), h -= x;
        for (g = g.slice(S), h %= x;g.length < R; )
          g.push(0);
        for (S = h >>> 3, g[S >> 2] ^= v << S % 4 * 8, g[R - 1] ^= 2147483648, N = Nt(g, N);32 * d.length < j && (A = N[T % 5][T / 5 | 0], d.push(A.I), !(32 * d.length >= j)); )
          d.push(A.N), T += 1, 64 * T % x == 0 && (Nt(null, N), T = 0);
        return d;
      }(u, I, 0, e, m, r, E);
    }, c.hmacKey && this.k(it("hmacKey", c.hmacKey, this.T));
  }
  O(n, t) {
    let i = function(m) {
      let c = m || {};
      return { funcName: it("funcName", c.funcName, 1, { value: [], binLen: 0 }), customization: it("Customization", c.customization, 1, { value: [], binLen: 0 }) };
    }(n || {});
    t && (i.funcName = t);
    let r = jt(St(i.funcName), St(i.customization));
    if (i.customization.binLen !== 0 || i.funcName.binLen !== 0) {
      let m = Kt(r, this.m >>> 3);
      for (let c = 0;c < m.length; c += this.m >>> 5)
        this.U = this.v(m.slice(c, c + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(n) {
    let t = function(r) {
      let m = r || {};
      return { kmacKey: it("kmacKey", m.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: it("Customization", m.customization, 1, { value: [], binLen: 0 }) };
    }(n || {});
    this.O(n, t.funcName);
    let i = Kt(St(t.kmacKey), this.m >>> 3);
    for (let r = 0;r < i.length; r += this.m >>> 5)
      this.U = this.v(i.slice(r, r + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(n) {
    let t = jt({ value: this.h.slice(), binLen: this.u }, function(i) {
      let r, m, c = 0, u = [0, 0], I = [4294967295 & i, i / st & 2097151];
      for (r = 6;r >= 0; r--)
        m = I[r >> 2] >>> 8 * r & 255, m === 0 && c === 0 || (u[c >> 2] |= m << 8 * c, c += 1);
      return c = c !== 0 ? c : 1, u[c >> 2] |= c << 8 * c, { value: c + 1 > 4 ? u : [u[0]], binLen: 8 + 8 * c };
    }(n.outputLen));
    return this.F(t.value, t.binLen, this.A, this.L(this.U), n.outputLen);
  }
};

class nn {
  constructor(n, t, i) {
    if (n == "SHA-1")
      this.P = new zn(n, t, i);
    else if (n == "SHA-224" || n == "SHA-256")
      this.P = new _n(n, t, i);
    else if (n == "SHA-384" || n == "SHA-512")
      this.P = new qn(n, t, i);
    else {
      if (n != "SHA3-224" && n != "SHA3-256" && n != "SHA3-384" && n != "SHA3-512" && n != "SHAKE128" && n != "SHAKE256" && n != "CSHAKE128" && n != "CSHAKE256" && n != "KMAC128" && n != "KMAC256")
        throw new Error(wt);
      this.P = new ii(n, t, i);
    }
  }
  update(n) {
    return this.P.update(n), this;
  }
  getHash(n, t) {
    return this.P.getHash(n, t);
  }
  setHMACKey(n, t, i) {
    this.P.setHMACKey(n, t, i);
  }
  getHMAC(n, t) {
    return this.P.getHMAC(n, t);
  }
}
var xt = function(n, t, i = 0) {
  let r = pt.default({ ...n, signature: undefined }), m = t.noTimeWindow ? 0 : Math.floor(Date.now() / (t.timeWindow ?? hn)) + i;
  return new nn("SHA-256", "TEXT", { encoding: "UTF8" }).update(r).update(pt.default(t)).update(`${m}`).getHash("B64");
};
function rn(n, t = {}) {
  return { ...n, signature: xt(n, t) };
}
var hn = 5000;

class kt {
  data = [];
  #t = new TextEncoder;
  static payload(n, t, i) {
    return new kt().payload(n, t, i);
  }
  static blob(n, t) {
    return new kt().blob(n, t);
  }
  #n(n) {
    let t = this.#t.encode(n), i = new Uint8Array([t.byteLength]);
    this.data.push(i.buffer), this.data.push(t.buffer);
  }
  payload(n, t, i) {
    this.#n(n);
    let r = new Uint8Array([1]);
    this.data.push(r.buffer);
    let m = JSON.stringify(i ? rn(t, { secret: i }) : t), c = this.#t.encode(m), u = new Uint32Array([c.byteLength]);
    return this.data.push(u.buffer), this.data.push(c.buffer), this;
  }
  blob(n, t) {
    this.#n(n);
    let i = new Uint8Array([2]);
    this.data.push(i.buffer);
    let r = new Uint32Array([t.size]);
    return this.data.push(r.buffer), this.data.push(t), this;
  }
  build() {
    return new Blob(this.data);
  }
}
var y = [];
for (let n = 0;n < 256; ++n)
  y.push((n + 256).toString(16).slice(1));
function cn(n, t = 0) {
  return (y[n[t + 0]] + y[n[t + 1]] + y[n[t + 2]] + y[n[t + 3]] + "-" + y[n[t + 4]] + y[n[t + 5]] + "-" + y[n[t + 6]] + y[n[t + 7]] + "-" + y[n[t + 8]] + y[n[t + 9]] + "-" + y[n[t + 10]] + y[n[t + 11]] + y[n[t + 12]] + y[n[t + 13]] + y[n[t + 14]] + y[n[t + 15]]).toLowerCase();
}
var bt;
var mi = new Uint8Array(16);
function dt() {
  if (!bt) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    bt = crypto.getRandomValues.bind(crypto);
  }
  return bt(mi);
}
var hi = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var Ct = { randomUUID: hi };
function ci(n, t, i) {
  if (Ct.randomUUID && !t && !n)
    return Ct.randomUUID();
  n = n || {};
  let r = n.random ?? n.rng?.() ?? dt();
  if (r.length < 16)
    throw new Error("Random bytes length must be >= 16");
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    if (i = i || 0, i < 0 || i + 16 > t.length)
      throw new RangeError(`UUID byte range ${i}:${i + 15} is out of buffer bounds`);
    for (let m = 0;m < 16; ++m)
      t[i + m] = r[m];
    return t;
  }
  return cn(r);
}
var Ot = ci;
var sn = new TextDecoder;
function gi(n, t) {
  let [i, r] = en(n, t);
  return [sn.decode(new Uint8Array(n, r, i)), r + i];
}
function ui(n, t) {
  let [i, r] = wn(n, t);
  return [sn.decode(new Uint8Array(n, r, i)), r + i];
}
function si(n, t) {
  let [i, r] = wn(n, t);
  return [new Blob([new Uint8Array(n, r, i)], { type: "application/octet-stream" }), r + i];
}
function wn(n, t) {
  return [new Uint32Array(n.slice(t, t + Uint32Array.BYTES_PER_ELEMENT), 0, 1)[0], t + Uint32Array.BYTES_PER_ELEMENT];
}
function en(n, t) {
  return [new Uint8Array(n, t, 1)[0], t + Uint8Array.BYTES_PER_ELEMENT];
}
async function oi(n) {
  let t = {}, i = {}, r = 0, m;
  while (r < n.size) {
    m = m ?? await n.arrayBuffer();
    let [c, u] = gi(m, r);
    r = u;
    let [I, s] = en(m, r);
    switch (r = s, I) {
      case 1:
        let [e, E] = ui(m, r);
        r = E;
        try {
          t[c] = JSON.parse(e);
        } catch (Y) {
          console.error(`Error parsing JSON for key "${c}":`, Y);
        }
        break;
      case 2:
        let [g, h] = si(m, r);
        r = h, i[c] = g;
        break;
    }
  }
  return { ...t, ...i };
}
function gn(n, t) {
  if (typeof n === "object" && n instanceof Blob) {
    let r = `{blob:${Ot()}}`;
    return t[r] = n, r;
  }
  let i = n;
  if (Array.isArray(n))
    n.forEach((r, m) => {
      let c = gn(r, t);
      if (c !== n[m]) {
        if (n === i)
          n = [...n];
        n[m] = c;
      }
    });
  else if (typeof n === "object" && n)
    Object.entries(n).forEach(([r, m]) => {
      let c = gn(m, t);
      if (c !== n[r]) {
        if (n === i)
          n = { ...n };
        n[r] = c;
      }
    });
  return n;
}
function un(n, t) {
  if (typeof n === "string" && n.startsWith("{blobUrl:"))
    return URL.createObjectURL(t[n]);
  if (typeof n === "string" && n.startsWith("{blob:"))
    return t[n];
  let i = n;
  if (Array.isArray(n))
    n.forEach((r, m) => {
      let c = un(r, t);
      if (c !== r) {
        if (n === i)
          n = [...n];
        n[m] = c;
      }
    });
  else if (typeof n === "object" && n)
    Object.entries(n).forEach(([r, m]) => {
      let c = un(m, t);
      if (c !== m) {
        if (n === i)
          n = { ...n };
        n[r] = c;
      }
    });
  return n;
}
function packageUpdates(updates, blobs, secret) {
  const blobBuilder = kt.payload("payload", { updates }, secret);
  const addedBlob = new Set;
  for (let key in blobs) {
    if (!addedBlob.has(key)) {
      blobBuilder.blob(key, blobs[key]);
      addedBlob.add(key);
    }
  }
  return blobBuilder.build();
}
async function receiveBlob(blob) {
  const { payload, ...blobs } = await oi(blob);
  return { payload, blobs };
}
var KEYS2 = "~{keys}";
var VALUES2 = "~{values}";
var REGEX2 = /~\{([^}]+)\}/;
function commitUpdates2(root, properties, updatedPaths = {}) {
  if (!root || !root.updates?.length) {
    return updatedPaths;
  }
  sortUpdates2(root.updates);
  root.updates?.forEach((update) => {
    if (!update.confirmed) {
      return;
    }
    const parts = update.path.split("/");
    const leaf = getLeafObject2(root, parts, 1, true);
    const prop = parts[parts.length - 1];
    const value = translateValue2(update.value, properties);
    if (update.append) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop], value];
    } else if ((update.insert ?? -1) >= 0) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop].slice(0, update.insert ?? -1), value, ...leaf[prop].slice(update.insert)];
    } else if ((update.delete ?? -1) >= 0) {
      if (Array.isArray(leaf[prop])) {
        leaf[prop] = [...leaf[prop].slice(0, update.delete), ...leaf[prop].slice((update.delete ?? -1) + 1)];
      }
    } else if (value === undefined) {
      delete leaf[prop];
      cleanupRoot2(root, parts, 0);
    } else {
      leaf[prop] = value;
    }
    updatedPaths[update.path] = leaf[prop];
  });
  clearUpdates2(root, updatedPaths);
  return updatedPaths;
}
function cleanupRoot2(root, parts, index) {
  if (!root || typeof root !== "object" || Array.isArray(root)) {
    return false;
  }
  if (cleanupRoot2(root[parts[index]], parts, index + 1)) {
    delete root[parts[index]];
  }
  return Object.keys(root).length === 0;
}
function clearUpdates2(root, updatedPaths) {
  root.updates = root.updates?.filter((update) => !(update.path in updatedPaths));
  if (!root.updates?.length) {
    delete root.updates;
  }
}
function sortUpdates2(updates) {
  updates?.sort((a, b2) => {
    const confirmedA = a.confirmed ?? 0;
    const confirmedB = b2.confirmed ?? 0;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    return a.path.localeCompare(b2.path);
  });
}
function getLeafObject2(obj, parts, offset, autoCreate, properties = {}) {
  let current = obj;
  for (let i = 0;i < parts.length - offset; i++) {
    const prop = parts[i];
    const value = translateProp2(current, prop, properties, autoCreate);
    if (value === undefined) {
      return value;
    }
    current = value;
  }
  return current;
}
function translateValue2(value, properties) {
  if (typeof value !== "string") {
    return value;
  }
  if (value.startsWith("~{") && value.endsWith("}")) {
    switch (value) {
      default:
        const group = value.match(REGEX2);
        if (group) {
          return properties[group[1]];
        }
    }
  }
  return value;
}
function translateProp2(obj, prop, properties, autoCreate) {
  let value;
  if (typeof prop !== "string") {
    value = obj[prop];
  } else if (prop.startsWith("~{") && prop.endsWith("}")) {
    switch (prop) {
      case KEYS2:
        return Object.keys(obj ?? {});
      case VALUES2:
        return Object.values(obj ?? {});
      default:
        return obj[translateValue2(prop, properties)];
    }
  } else {
    value = obj[prop];
  }
  if (value === undefined && autoCreate) {
    value = obj[prop] = {};
  }
  return value;
}
var gt2 = Object.create;
var { defineProperty: Rn2, getPrototypeOf: Yt, getOwnPropertyNames: wt2 } = Object;
var Et = Object.prototype.hasOwnProperty;
var Nt2 = (t, n, h) => {
  h = t != null ? gt2(Yt(t)) : {};
  let c = n || !t || !t.__esModule ? Rn2(h, "default", { value: t, enumerable: true }) : h;
  for (let i of wt2(t))
    if (!Et.call(c, i))
      Rn2(c, i, { get: () => t[i], enumerable: true });
  return c;
};
var R = (t, n) => () => (n || t((n = { exports: {} }).exports, n), n.exports);
var jt2 = R((t, n) => {
  var h = function(S) {
    throw { name: "SyntaxError", message: S, at: Y, text: P };
  }, c = function(S) {
    if (S && S !== m)
      h("Expected '" + S + "' instead of '" + m + "'");
    return m = P.charAt(Y), Y += 1, m;
  }, i = function() {
    var S, T = "";
    if (m === "-")
      T = "-", c("-");
    while (m >= "0" && m <= "9")
      T += m, c();
    if (m === ".") {
      T += ".";
      while (c() && m >= "0" && m <= "9")
        T += m;
    }
    if (m === "e" || m === "E") {
      if (T += m, c(), m === "-" || m === "+")
        T += m, c();
      while (m >= "0" && m <= "9")
        T += m, c();
    }
    if (S = Number(T), !isFinite(S))
      h("Bad number");
    return S;
  }, g = function() {
    var S, T, v = "", x;
    if (m === '"')
      while (c())
        if (m === '"')
          return c(), v;
        else if (m === "\\")
          if (c(), m === "u") {
            x = 0;
            for (T = 0;T < 4; T += 1) {
              if (S = parseInt(c(), 16), !isFinite(S))
                break;
              x = x * 16 + S;
            }
            v += String.fromCharCode(x);
          } else if (typeof s[m] === "string")
            v += s[m];
          else
            break;
        else
          v += m;
    h("Bad string");
  }, w2 = function() {
    while (m && m <= " ")
      c();
  }, I = function() {
    switch (m) {
      case "t":
        return c("t"), c("r"), c("u"), c("e"), true;
      case "f":
        return c("f"), c("a"), c("l"), c("s"), c("e"), false;
      case "n":
        return c("n"), c("u"), c("l"), c("l"), null;
      default:
        h("Unexpected '" + m + "'");
    }
  }, E = function() {
    var S = [];
    if (m === "[") {
      if (c("["), w2(), m === "]")
        return c("]"), S;
      while (m) {
        if (S.push($2()), w2(), m === "]")
          return c("]"), S;
        c(","), w2();
      }
    }
    h("Bad array");
  }, j = function() {
    var S, T = {};
    if (m === "{") {
      if (c("{"), w2(), m === "}")
        return c("}"), T;
      while (m) {
        if (S = g(), w2(), c(":"), Object.prototype.hasOwnProperty.call(T, S))
          h('Duplicate key "' + S + '"');
        if (T[S] = $2(), w2(), m === "}")
          return c("}"), T;
        c(","), w2();
      }
    }
    h("Bad object");
  }, $2 = function() {
    switch (w2(), m) {
      case "{":
        return j();
      case "[":
        return E();
      case '"':
        return g();
      case "-":
        return i();
      default:
        return m >= "0" && m <= "9" ? i() : I();
    }
  }, Y, m, s = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, P;
  n.exports = function(S, T) {
    var v;
    if (P = S, Y = 0, m = " ", v = $2(), w2(), m)
      h("Syntax error");
    return typeof T === "function" ? function x(O, C) {
      var D, b2, k = O[C];
      if (k && typeof k === "object") {
        for (D in $2)
          if (Object.prototype.hasOwnProperty.call(k, D))
            if (b2 = x(k, D), typeof b2 === "undefined")
              delete k[D];
            else
              k[D] = b2;
      }
      return T.call(O, C, k);
    }({ "": v }, "") : v;
  };
});
var $t2 = R((t, n) => {
  var h = function(j) {
    return i.lastIndex = 0, i.test(j) ? '"' + j.replace(i, function($2) {
      var Y = I[$2];
      return typeof Y === "string" ? Y : "\\u" + ("0000" + $2.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + j + '"';
  }, c = function(j, $2) {
    var Y, m, s, P, S = g, T, v = $2[j];
    if (v && typeof v === "object" && typeof v.toJSON === "function")
      v = v.toJSON(j);
    if (typeof E === "function")
      v = E.call($2, j, v);
    switch (typeof v) {
      case "string":
        return h(v);
      case "number":
        return isFinite(v) ? String(v) : "null";
      case "boolean":
      case "null":
        return String(v);
      case "object":
        if (!v)
          return "null";
        if (g += w2, T = [], Object.prototype.toString.apply(v) === "[object Array]") {
          P = v.length;
          for (Y = 0;Y < P; Y += 1)
            T[Y] = c(Y, v) || "null";
          return s = T.length === 0 ? "[]" : g ? `[
` + g + T.join(`,
` + g) + `
` + S + "]" : "[" + T.join(",") + "]", g = S, s;
        }
        if (E && typeof E === "object") {
          P = E.length;
          for (Y = 0;Y < P; Y += 1)
            if (m = E[Y], typeof m === "string") {
              if (s = c(m, v), s)
                T.push(h(m) + (g ? ": " : ":") + s);
            }
        } else
          for (m in v)
            if (Object.prototype.hasOwnProperty.call(v, m)) {
              if (s = c(m, v), s)
                T.push(h(m) + (g ? ": " : ":") + s);
            }
        return s = T.length === 0 ? "{}" : g ? `{
` + g + T.join(`,
` + g) + `
` + S + "}" : "{" + T.join(",") + "}", g = S, s;
      default:
    }
  }, i = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, g, w2, I = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, E;
  n.exports = function(j, $2, Y) {
    var m;
    if (g = "", w2 = "", typeof Y === "number")
      for (m = 0;m < Y; m += 1)
        w2 += " ";
    else if (typeof Y === "string")
      w2 = Y;
    if (E = $2, $2 && typeof $2 !== "function" && (typeof $2 !== "object" || typeof $2.length !== "number"))
      throw new Error("JSON.stringify");
    return c("", { "": j });
  };
});
var st2 = R((t) => {
  t.parse = jt2(), t.stringify = $t2();
});
var It = R((t, n) => {
  var h = {}.toString;
  n.exports = Array.isArray || function(c) {
    return h.call(c) == "[object Array]";
  };
});
var fn2 = R((t, n) => {
  var h = Object.prototype.toString;
  n.exports = function c(i) {
    var g = h.call(i), w2 = g === "[object Arguments]";
    if (!w2)
      w2 = g !== "[object Array]" && i !== null && typeof i === "object" && typeof i.length === "number" && i.length >= 0 && h.call(i.callee) === "[object Function]";
    return w2;
  };
});
var Pt2 = R((t, n) => {
  var h;
  if (!Object.keys)
    c = Object.prototype.hasOwnProperty, i = Object.prototype.toString, g = fn2(), w2 = Object.prototype.propertyIsEnumerable, I = !w2.call({ toString: null }, "toString"), E = w2.call(function() {}, "prototype"), j = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], $2 = function(P) {
      var S = P.constructor;
      return S && S.prototype === P;
    }, Y = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, m = function() {
      if (typeof window === "undefined")
        return false;
      for (var P in window)
        try {
          if (!Y["$" + P] && c.call(window, P) && window[P] !== null && typeof window[P] === "object")
            try {
              $2(window[P]);
            } catch (S) {
              return true;
            }
        } catch (S) {
          return true;
        }
      return false;
    }(), s = function(P) {
      if (typeof window === "undefined" || !m)
        return $2(P);
      try {
        return $2(P);
      } catch (S) {
        return false;
      }
    }, h = function P(S) {
      var T = S !== null && typeof S === "object", v = i.call(S) === "[object Function]", x = g(S), O = T && i.call(S) === "[object String]", C = [];
      if (!T && !v && !x)
        throw new TypeError("Object.keys called on a non-object");
      var D = E && v;
      if (O && S.length > 0 && !c.call(S, 0))
        for (var b2 = 0;b2 < S.length; ++b2)
          C.push(String(b2));
      if (x && S.length > 0)
        for (var k = 0;k < S.length; ++k)
          C.push(String(k));
      else
        for (var f in S)
          if (!(D && f === "prototype") && c.call(S, f))
            C.push(String(f));
      if (I) {
        var G = s(S);
        for (var U = 0;U < j.length; ++U)
          if (!(G && j[U] === "constructor") && c.call(S, j[U]))
            C.push(j[U]);
      }
      return C;
    };
  var c, i, g, w2, I, E, j, $2, Y, m, s;
  n.exports = h;
});
var St2 = R((t, n) => {
  var h = Array.prototype.slice, c = fn2(), i = Object.keys, g = i ? function I(E) {
    return i(E);
  } : Pt2(), w2 = Object.keys;
  g.shim = function I() {
    if (Object.keys) {
      var E = function() {
        var j = Object.keys(arguments);
        return j && j.length === arguments.length;
      }(1, 2);
      if (!E)
        Object.keys = function j($2) {
          if (c($2))
            return w2(h.call($2));
          return w2($2);
        };
    } else
      Object.keys = g;
    return Object.keys || g;
  }, n.exports = g;
});
var vt2 = R((t, n) => {
  var h = "Function.prototype.bind called on incompatible ", c = Object.prototype.toString, i = Math.max, g = "[object Function]", w2 = function j($2, Y) {
    var m = [];
    for (var s = 0;s < $2.length; s += 1)
      m[s] = $2[s];
    for (var P = 0;P < Y.length; P += 1)
      m[P + $2.length] = Y[P];
    return m;
  }, I = function j($2, Y) {
    var m = [];
    for (var s = Y || 0, P = 0;s < $2.length; s += 1, P += 1)
      m[P] = $2[s];
    return m;
  }, E = function(j, $2) {
    var Y = "";
    for (var m = 0;m < j.length; m += 1)
      if (Y += j[m], m + 1 < j.length)
        Y += $2;
    return Y;
  };
  n.exports = function j($2) {
    var Y = this;
    if (typeof Y !== "function" || c.apply(Y) !== g)
      throw new TypeError(h + Y);
    var m = I(arguments, 1), s, P = function() {
      if (this instanceof s) {
        var O = Y.apply(this, w2(m, arguments));
        if (Object(O) === O)
          return O;
        return this;
      }
      return Y.apply($2, w2(m, arguments));
    }, S = i(0, Y.length - m.length), T = [];
    for (var v = 0;v < S; v++)
      T[v] = "$" + v;
    if (s = Function("binder", "return function (" + E(T, ",") + "){ return binder.apply(this,arguments); }")(P), Y.prototype) {
      var x = function O() {};
      x.prototype = Y.prototype, s.prototype = new x, x.prototype = null;
    }
    return s;
  };
});
var Tn2 = R((t, n) => {
  var h = vt2();
  n.exports = Function.prototype.bind || h;
});
var Tt2 = R((t, n) => {
  n.exports = Error;
});
var At2 = R((t, n) => {
  n.exports = EvalError;
});
var kt2 = R((t, n) => {
  n.exports = RangeError;
});
var xt2 = R((t, n) => {
  n.exports = ReferenceError;
});
var Vn2 = R((t, n) => {
  n.exports = SyntaxError;
});
var An2 = R((t, n) => {
  n.exports = TypeError;
});
var Ct2 = R((t, n) => {
  n.exports = URIError;
});
var Ot2 = R((t, n) => {
  n.exports = function h() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var c = {}, i = Symbol("test"), g = Object(i);
    if (typeof i === "string")
      return false;
    if (Object.prototype.toString.call(i) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(g) !== "[object Symbol]")
      return false;
    var w2 = 42;
    c[i] = w2;
    for (i in c)
      return false;
    if (typeof Object.keys === "function" && Object.keys(c).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(c).length !== 0)
      return false;
    var I = Object.getOwnPropertySymbols(c);
    if (I.length !== 1 || I[0] !== i)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(c, i))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var E = Object.getOwnPropertyDescriptor(c, i);
      if (E.value !== w2 || E.enumerable !== true)
        return false;
    }
    return true;
  };
});
var yn2 = R((t, n) => {
  var h = typeof Symbol !== "undefined" && Symbol, c = Ot2();
  n.exports = function i() {
    if (typeof h !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof h("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return c();
  };
});
var on2 = R((t, n) => {
  var h = { foo: {} }, c = Object;
  n.exports = function i() {
    return { __proto__: h }.foo === h.foo && !({ __proto__: null } instanceof c);
  };
});
var Gn2 = R((t, n) => {
  var h = Function.prototype.call, c = Object.prototype.hasOwnProperty, i = Tn2();
  n.exports = i.call(h, c);
});
var kn2 = R((t, n) => {
  var h, c = Tt2(), i = At2(), g = kt2(), w2 = xt2(), I = Vn2(), E = An2(), j = Ct2(), $2 = Function, Y = function(M) {
    try {
      return $2('"use strict"; return (' + M + ").constructor;")();
    } catch (r) {}
  }, m = Object.getOwnPropertyDescriptor;
  if (m)
    try {
      m({}, "");
    } catch (M) {
      m = null;
    }
  var s = function() {
    throw new E;
  }, P = m ? function() {
    try {
      return arguments.callee, s;
    } catch (M) {
      try {
        return m(arguments, "callee").get;
      } catch (r) {
        return s;
      }
    }
  }() : s, S = yn2()(), T = on2()(), v = Object.getPrototypeOf || (T ? function(M) {
    return M.__proto__;
  } : null), x = {}, O = typeof Uint8Array === "undefined" || !v ? h : v(Uint8Array), C = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? h : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? h : ArrayBuffer, "%ArrayIteratorPrototype%": S && v ? v([][Symbol.iterator]()) : h, "%AsyncFromSyncIteratorPrototype%": h, "%AsyncFunction%": x, "%AsyncGenerator%": x, "%AsyncGeneratorFunction%": x, "%AsyncIteratorPrototype%": x, "%Atomics%": typeof Atomics === "undefined" ? h : Atomics, "%BigInt%": typeof BigInt === "undefined" ? h : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? h : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? h : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? h : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": c, "%eval%": eval, "%EvalError%": i, "%Float32Array%": typeof Float32Array === "undefined" ? h : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? h : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? h : FinalizationRegistry, "%Function%": $2, "%GeneratorFunction%": x, "%Int8Array%": typeof Int8Array === "undefined" ? h : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? h : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? h : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": S && v ? v(v([][Symbol.iterator]())) : h, "%JSON%": typeof JSON === "object" ? JSON : h, "%Map%": typeof Map === "undefined" ? h : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !S || !v ? h : v(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? h : Promise, "%Proxy%": typeof Proxy === "undefined" ? h : Proxy, "%RangeError%": g, "%ReferenceError%": w2, "%Reflect%": typeof Reflect === "undefined" ? h : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? h : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !S || !v ? h : v(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? h : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": S && v ? v(""[Symbol.iterator]()) : h, "%Symbol%": S ? Symbol : h, "%SyntaxError%": I, "%ThrowTypeError%": P, "%TypedArray%": O, "%TypeError%": E, "%Uint8Array%": typeof Uint8Array === "undefined" ? h : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? h : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? h : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? h : Uint32Array, "%URIError%": j, "%WeakMap%": typeof WeakMap === "undefined" ? h : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? h : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? h : WeakSet };
  if (v)
    try {
      null.error;
    } catch (M) {
      D = v(v(M)), C["%Error.prototype%"] = D;
    }
  var D, b2 = function M(r) {
    var u;
    if (r === "%AsyncFunction%")
      u = Y("async function () {}");
    else if (r === "%GeneratorFunction%")
      u = Y("function* () {}");
    else if (r === "%AsyncGeneratorFunction%")
      u = Y("async function* () {}");
    else if (r === "%AsyncGenerator%") {
      var L = M("%AsyncGeneratorFunction%");
      if (L)
        u = L.prototype;
    } else if (r === "%AsyncIteratorPrototype%") {
      var e = M("%AsyncGenerator%");
      if (e && v)
        u = v(e.prototype);
    }
    return C[r] = u, u;
  }, k = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, f = Tn2(), G = Gn2(), U = f.call(Function.call, Array.prototype.concat), l = f.call(Function.apply, Array.prototype.splice), hn2 = f.call(Function.call, String.prototype.replace), a = f.call(Function.call, String.prototype.slice), K2 = f.call(Function.call, RegExp.prototype.exec), W = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, d = /\\(\\)?/g, p = function M(r) {
    var u = a(r, 0, 1), L = a(r, -1);
    if (u === "%" && L !== "%")
      throw new I("invalid intrinsic syntax, expected closing `%`");
    else if (L === "%" && u !== "%")
      throw new I("invalid intrinsic syntax, expected opening `%`");
    var e = [];
    return hn2(r, W, function(o, Z, H, X) {
      e[e.length] = H ? hn2(X, d, "$1") : Z || o;
    }), e;
  }, V = function M(r, u) {
    var L = r, e;
    if (G(k, L))
      e = k[L], L = "%" + e[0] + "%";
    if (G(C, L)) {
      var o = C[L];
      if (o === x)
        o = b2(L);
      if (typeof o === "undefined" && !u)
        throw new E("intrinsic " + r + " exists, but is not available. Please file an issue!");
      return { alias: e, name: L, value: o };
    }
    throw new I("intrinsic " + r + " does not exist!");
  };
  n.exports = function M(r, u) {
    if (typeof r !== "string" || r.length === 0)
      throw new E("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof u !== "boolean")
      throw new E('"allowMissing" argument must be a boolean');
    if (K2(/^%?[^%]*%?$/, r) === null)
      throw new I("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var L = p(r), e = L.length > 0 ? L[0] : "", o = V("%" + e + "%", u), Z = o.name, H = o.value, X = false, nn2 = o.alias;
    if (nn2)
      e = nn2[0], l(L, U([0, 1], nn2));
    for (var z = 1, gn2 = true;z < L.length; z += 1) {
      var _ = L[z], $n2 = a(_, 0, 1), sn2 = a(_, -1);
      if (($n2 === '"' || $n2 === "'" || $n2 === "`" || (sn2 === '"' || sn2 === "'" || sn2 === "`")) && $n2 !== sn2)
        throw new I("property names with quotes must have matching quotes");
      if (_ === "constructor" || !gn2)
        X = true;
      if (e += "." + _, Z = "%" + e + "%", G(C, Z))
        H = C[Z];
      else if (H != null) {
        if (!(_ in H)) {
          if (!u)
            throw new E("base intrinsic for " + r + " exists, but the property is not available.");
          return;
        }
        if (m && z + 1 >= L.length) {
          var In2 = m(H, _);
          if (gn2 = !!In2, gn2 && "get" in In2 && !("originalValue" in In2.get))
            H = In2.get;
          else
            H = H[_];
        } else
          gn2 = G(H, _), H = H[_];
        if (gn2 && !X)
          C[Z] = H;
      }
    }
    return H;
  };
});
var On2 = R((t, n) => {
  var h = kn2(), c = h("%Object.defineProperty%", true) || false;
  if (c)
    try {
      c({}, "a", { value: 1 });
    } catch (i) {
      c = false;
    }
  n.exports = c;
});
var ut2 = R((t, n) => {
  var h, c = SyntaxError, i = Function, g = TypeError, w2 = function(K2) {
    try {
      return i('"use strict"; return (' + K2 + ").constructor;")();
    } catch (W) {}
  }, I = Object.getOwnPropertyDescriptor;
  if (I)
    try {
      I({}, "");
    } catch (K2) {
      I = null;
    }
  var E = function() {
    throw new g;
  }, j = I ? function() {
    try {
      return arguments.callee, E;
    } catch (K2) {
      try {
        return I(arguments, "callee").get;
      } catch (W) {
        return E;
      }
    }
  }() : E, $2 = yn2()(), Y = on2()(), m = Object.getPrototypeOf || (Y ? function(K2) {
    return K2.__proto__;
  } : null), s = {}, P = typeof Uint8Array === "undefined" || !m ? h : m(Uint8Array), S = { "%AggregateError%": typeof AggregateError === "undefined" ? h : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? h : ArrayBuffer, "%ArrayIteratorPrototype%": $2 && m ? m([][Symbol.iterator]()) : h, "%AsyncFromSyncIteratorPrototype%": h, "%AsyncFunction%": s, "%AsyncGenerator%": s, "%AsyncGeneratorFunction%": s, "%AsyncIteratorPrototype%": s, "%Atomics%": typeof Atomics === "undefined" ? h : Atomics, "%BigInt%": typeof BigInt === "undefined" ? h : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? h : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? h : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? h : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? h : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? h : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? h : FinalizationRegistry, "%Function%": i, "%GeneratorFunction%": s, "%Int8Array%": typeof Int8Array === "undefined" ? h : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? h : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? h : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": $2 && m ? m(m([][Symbol.iterator]())) : h, "%JSON%": typeof JSON === "object" ? JSON : h, "%Map%": typeof Map === "undefined" ? h : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !$2 || !m ? h : m(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? h : Promise, "%Proxy%": typeof Proxy === "undefined" ? h : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? h : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? h : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !$2 || !m ? h : m(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? h : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": $2 && m ? m(""[Symbol.iterator]()) : h, "%Symbol%": $2 ? Symbol : h, "%SyntaxError%": c, "%ThrowTypeError%": j, "%TypedArray%": P, "%TypeError%": g, "%Uint8Array%": typeof Uint8Array === "undefined" ? h : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? h : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? h : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? h : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? h : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? h : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? h : WeakSet };
  if (m)
    try {
      null.error;
    } catch (K2) {
      T = m(m(K2)), S["%Error.prototype%"] = T;
    }
  var T, v = function K(W) {
    var d;
    if (W === "%AsyncFunction%")
      d = w2("async function () {}");
    else if (W === "%GeneratorFunction%")
      d = w2("function* () {}");
    else if (W === "%AsyncGeneratorFunction%")
      d = w2("async function* () {}");
    else if (W === "%AsyncGenerator%") {
      var p = K("%AsyncGeneratorFunction%");
      if (p)
        d = p.prototype;
    } else if (W === "%AsyncIteratorPrototype%") {
      var V = K("%AsyncGenerator%");
      if (V && m)
        d = m(V.prototype);
    }
    return S[W] = d, d;
  }, x = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, O = Tn2(), C = Gn2(), D = O.call(Function.call, Array.prototype.concat), b2 = O.call(Function.apply, Array.prototype.splice), k = O.call(Function.call, String.prototype.replace), f = O.call(Function.call, String.prototype.slice), G = O.call(Function.call, RegExp.prototype.exec), U = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, l = /\\(\\)?/g, hn2 = function K(W) {
    var d = f(W, 0, 1), p = f(W, -1);
    if (d === "%" && p !== "%")
      throw new c("invalid intrinsic syntax, expected closing `%`");
    else if (p === "%" && d !== "%")
      throw new c("invalid intrinsic syntax, expected opening `%`");
    var V = [];
    return k(W, U, function(M, r, u, L) {
      V[V.length] = u ? k(L, l, "$1") : r || M;
    }), V;
  }, a = function K(W, d) {
    var p = W, V;
    if (C(x, p))
      V = x[p], p = "%" + V[0] + "%";
    if (C(S, p)) {
      var M = S[p];
      if (M === s)
        M = v(p);
      if (typeof M === "undefined" && !d)
        throw new g("intrinsic " + W + " exists, but is not available. Please file an issue!");
      return { alias: V, name: p, value: M };
    }
    throw new c("intrinsic " + W + " does not exist!");
  };
  n.exports = function K(W, d) {
    if (typeof W !== "string" || W.length === 0)
      throw new g("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof d !== "boolean")
      throw new g('"allowMissing" argument must be a boolean');
    if (G(/^%?[^%]*%?$/, W) === null)
      throw new c("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var p = hn2(W), V = p.length > 0 ? p[0] : "", M = a("%" + V + "%", d), r = M.name, u = M.value, L = false, e = M.alias;
    if (e)
      V = e[0], b2(p, D([0, 1], e));
    for (var o = 1, Z = true;o < p.length; o += 1) {
      var H = p[o], X = f(H, 0, 1), nn2 = f(H, -1);
      if ((X === '"' || X === "'" || X === "`" || (nn2 === '"' || nn2 === "'" || nn2 === "`")) && X !== nn2)
        throw new c("property names with quotes must have matching quotes");
      if (H === "constructor" || !Z)
        L = true;
      if (V += "." + H, r = "%" + V + "%", C(S, r))
        u = S[r];
      else if (u != null) {
        if (!(H in u)) {
          if (!d)
            throw new g("base intrinsic for " + W + " exists, but the property is not available.");
          return;
        }
        if (I && o + 1 >= p.length) {
          var z = I(u, H);
          if (Z = !!z, Z && "get" in z && !("originalValue" in z.get))
            u = z.get;
          else
            u = u[H];
        } else
          Z = C(u, H), u = u[H];
        if (Z && !L)
          S[r] = u;
      }
    }
    return u;
  };
});
var ln2 = R((t, n) => {
  var h = ut2(), c = h("%Object.getOwnPropertyDescriptor%", true);
  if (c)
    try {
      c([], "length");
    } catch (i) {
      c = null;
    }
  n.exports = c;
});
var Rt2 = R((t, n) => {
  var h = On2(), c = Vn2(), i = An2(), g = ln2();
  n.exports = function w(I, E, j) {
    if (!I || typeof I !== "object" && typeof I !== "function")
      throw new i("`obj` must be an object or a function`");
    if (typeof E !== "string" && typeof E !== "symbol")
      throw new i("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new i("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new i("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new i("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new i("`loose`, if provided, must be a boolean");
    var $2 = arguments.length > 3 ? arguments[3] : null, Y = arguments.length > 4 ? arguments[4] : null, m = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : false, P = !!g && g(I, E);
    if (h)
      h(I, E, { configurable: m === null && P ? P.configurable : !m, enumerable: $2 === null && P ? P.enumerable : !$2, value: j, writable: Y === null && P ? P.writable : !Y });
    else if (s || !$2 && !Y && !m)
      I[E] = j;
    else
      throw new c("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Dt2 = R((t, n) => {
  var h = On2(), c = function i() {
    return !!h;
  };
  c.hasArrayLengthDefineBug = function i() {
    if (!h)
      return null;
    try {
      return h([], "length", { value: 1 }).length !== 1;
    } catch (g) {
      return true;
    }
  }, n.exports = c;
});
var rt = R((t, n) => {
  var h = kn2(), c = Rt2(), i = Dt2()(), g = ln2(), w2 = An2(), I = h("%Math.floor%");
  n.exports = function E(j, $2) {
    if (typeof j !== "function")
      throw new w2("`fn` is not a function");
    if (typeof $2 !== "number" || $2 < 0 || $2 > 4294967295 || I($2) !== $2)
      throw new w2("`length` must be a positive 32-bit integer");
    var Y = arguments.length > 2 && !!arguments[2], m = true, s = true;
    if ("length" in j && g) {
      var P = g(j, "length");
      if (P && !P.configurable)
        m = false;
      if (P && !P.writable)
        s = false;
    }
    if (m || s || !Y)
      if (i)
        c(j, "length", $2, true, true);
      else
        c(j, "length", $2);
    return j;
  };
});
var Zn2 = R((t, n) => {
  var h = Tn2(), c = kn2(), i = rt(), g = An2(), w2 = c("%Function.prototype.apply%"), I = c("%Function.prototype.call%"), E = c("%Reflect.apply%", true) || h.call(I, w2), j = On2(), $2 = c("%Math.max%");
  n.exports = function m(s) {
    if (typeof s !== "function")
      throw new g("a function is required");
    var P = E(h, I, arguments);
    return i(P, 1 + $2(0, s.length - (arguments.length - 1)), true);
  };
  var Y = function m() {
    return E(h, w2, arguments);
  };
  if (j)
    j(n.exports, "apply", { value: Y });
  else
    n.exports.apply = Y;
});
var Wt2 = R((t, n) => {
  var h = kn2(), c = Zn2(), i = c(h("String.prototype.indexOf"));
  n.exports = function g(w2, I) {
    var E = h(w2, !!I);
    if (typeof E === "function" && i(w2, ".prototype.") > -1)
      return c(E);
    return E;
  };
});
var bt2 = R((t, n) => {
  var h = (typeof JSON !== "undefined" ? JSON : st2()).stringify, c = It(), i = St2(), g = Zn2(), w2 = Wt2(), I = w2("Array.prototype.join"), E = w2("Array.prototype.push"), j = function Y(m, s) {
    var P = "";
    for (var S = 0;S < m; S += 1)
      P += s;
    return P;
  }, $2 = function(Y, m, s) {
    return s;
  };
  n.exports = function Y(m) {
    var s = arguments.length > 1 ? arguments[1] : undefined, P = s && s.space || "";
    if (typeof P === "number")
      P = j(P, " ");
    var S = !!s && typeof s.cycles === "boolean" && s.cycles, T = s && s.replacer ? g(s.replacer) : $2, v = typeof s === "function" ? s : s && s.cmp, x = v && function(C) {
      var D = v.length > 2 && function b(k) {
        return C[k];
      };
      return function(b2, k) {
        return v({ key: b2, value: C[b2] }, { key: k, value: C[k] }, D ? { __proto__: null, get: D } : undefined);
      };
    }, O = [];
    return function C(D, b2, k, f) {
      var G = P ? `
` + j(f, P) : "", U = P ? ": " : ":";
      if (k && k.toJSON && typeof k.toJSON === "function")
        k = k.toJSON();
      if (k = T(D, b2, k), k === undefined)
        return;
      if (typeof k !== "object" || k === null)
        return h(k);
      if (c(k)) {
        var K2 = [];
        for (var l = 0;l < k.length; l++) {
          var hn2 = C(k, l, k[l], f + 1) || h(null);
          E(K2, G + P + hn2);
        }
        return "[" + I(K2, ",") + G + "]";
      }
      if (O.indexOf(k) !== -1) {
        if (S)
          return h("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        E(O, k);
      var a = i(k).sort(x && x(k)), K2 = [];
      for (var l = 0;l < a.length; l++) {
        var b2 = a[l], W = C(k, b2, k[b2], f + 1);
        if (!W)
          continue;
        var d = h(b2) + U + W;
        E(K2, G + P + d);
      }
      return O.splice(O.indexOf(k), 1), "{" + I(K2, ",") + G + "}";
    }({ "": m }, "", m, 0);
  };
});
var Dn2 = Nt2(bt2(), 1);
var rn2 = function(t, n, h, c) {
  let i, g, w2, I = n || [0], E = (h = h || 0) >>> 3, j = c === -1 ? 3 : 0;
  for (i = 0;i < t.length; i += 1)
    w2 = i + E, g = w2 >>> 2, I.length <= g && I.push(0), I[g] |= t[i] << 8 * (j + c * (w2 % 4));
  return { value: I, binLen: 8 * t.length + h };
};
var mn = function(t, n, h) {
  switch (n) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (t) {
    case "HEX":
      return function(c, i, g) {
        return function(w2, I, E, j) {
          let $2, Y, m, s;
          if (w2.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          let P = I || [0], S = (E = E || 0) >>> 3, T = j === -1 ? 3 : 0;
          for ($2 = 0;$2 < w2.length; $2 += 2) {
            if (Y = parseInt(w2.substr($2, 2), 16), isNaN(Y))
              throw new Error("String of HEX type contains invalid characters");
            for (s = ($2 >>> 1) + S, m = s >>> 2;P.length <= m; )
              P.push(0);
            P[m] |= Y << 8 * (T + j * (s % 4));
          }
          return { value: P, binLen: 4 * w2.length + E };
        }(c, i, g, h);
      };
    case "TEXT":
      return function(c, i, g) {
        return function(w2, I, E, j, $2) {
          let Y, m, s, P, S, T, v, x, O = 0, C = E || [0], D = (j = j || 0) >>> 3;
          if (I === "UTF8")
            for (v = $2 === -1 ? 3 : 0, s = 0;s < w2.length; s += 1)
              for (Y = w2.charCodeAt(s), m = [], 128 > Y ? m.push(Y) : 2048 > Y ? (m.push(192 | Y >>> 6), m.push(128 | 63 & Y)) : 55296 > Y || 57344 <= Y ? m.push(224 | Y >>> 12, 128 | Y >>> 6 & 63, 128 | 63 & Y) : (s += 1, Y = 65536 + ((1023 & Y) << 10 | 1023 & w2.charCodeAt(s)), m.push(240 | Y >>> 18, 128 | Y >>> 12 & 63, 128 | Y >>> 6 & 63, 128 | 63 & Y)), P = 0;P < m.length; P += 1) {
                for (T = O + D, S = T >>> 2;C.length <= S; )
                  C.push(0);
                C[S] |= m[P] << 8 * (v + $2 * (T % 4)), O += 1;
              }
          else
            for (v = $2 === -1 ? 2 : 0, x = I === "UTF16LE" && $2 !== 1 || I !== "UTF16LE" && $2 === 1, s = 0;s < w2.length; s += 1) {
              for (Y = w2.charCodeAt(s), x === true && (P = 255 & Y, Y = P << 8 | Y >>> 8), T = O + D, S = T >>> 2;C.length <= S; )
                C.push(0);
              C[S] |= Y << 8 * (v + $2 * (T % 4)), O += 2;
            }
          return { value: C, binLen: 8 * O + j };
        }(c, n, i, g, h);
      };
    case "B64":
      return function(c, i, g) {
        return function(w2, I, E, j) {
          let $2, Y, m, s, P, S, T, v = 0, x = I || [0], O = (E = E || 0) >>> 3, C = j === -1 ? 3 : 0, D = w2.indexOf("=");
          if (w2.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (w2 = w2.replace(/=/g, ""), D !== -1 && D < w2.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (Y = 0;Y < w2.length; Y += 4) {
            for (P = w2.substr(Y, 4), s = 0, m = 0;m < P.length; m += 1)
              $2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(P.charAt(m)), s |= $2 << 18 - 6 * m;
            for (m = 0;m < P.length - 1; m += 1) {
              for (T = v + O, S = T >>> 2;x.length <= S; )
                x.push(0);
              x[S] |= (s >>> 16 - 8 * m & 255) << 8 * (C + j * (T % 4)), v += 1;
            }
          }
          return { value: x, binLen: 8 * v + E };
        }(c, i, g, h);
      };
    case "BYTES":
      return function(c, i, g) {
        return function(w2, I, E, j) {
          let $2, Y, m, s, P = I || [0], S = (E = E || 0) >>> 3, T = j === -1 ? 3 : 0;
          for (Y = 0;Y < w2.length; Y += 1)
            $2 = w2.charCodeAt(Y), s = Y + S, m = s >>> 2, P.length <= m && P.push(0), P[m] |= $2 << 8 * (T + j * (s % 4));
          return { value: P, binLen: 8 * w2.length + E };
        }(c, i, g, h);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (c) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(c, i, g) {
        return function(w2, I, E, j) {
          return rn2(new Uint8Array(w2), I, E, j);
        }(c, i, g, h);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (c) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(c, i, g) {
        return rn2(c, i, g, h);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var Wn2 = function(t, n, h, c) {
  switch (t) {
    case "HEX":
      return function(i) {
        return function(g, w2, I, E) {
          let j, $2, Y = "", m = w2 / 8, s = I === -1 ? 3 : 0;
          for (j = 0;j < m; j += 1)
            $2 = g[j >>> 2] >>> 8 * (s + I * (j % 4)), Y += "0123456789abcdef".charAt($2 >>> 4 & 15) + "0123456789abcdef".charAt(15 & $2);
          return E.outputUpper ? Y.toUpperCase() : Y;
        }(i, n, h, c);
      };
    case "B64":
      return function(i) {
        return function(g, w2, I, E) {
          let j, $2, Y, m, s, P = "", S = w2 / 8, T = I === -1 ? 3 : 0;
          for (j = 0;j < S; j += 3)
            for (m = j + 1 < S ? g[j + 1 >>> 2] : 0, s = j + 2 < S ? g[j + 2 >>> 2] : 0, Y = (g[j >>> 2] >>> 8 * (T + I * (j % 4)) & 255) << 16 | (m >>> 8 * (T + I * ((j + 1) % 4)) & 255) << 8 | s >>> 8 * (T + I * ((j + 2) % 4)) & 255, $2 = 0;$2 < 4; $2 += 1)
              P += 8 * j + 6 * $2 <= w2 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(Y >>> 6 * (3 - $2) & 63) : E.b64Pad;
          return P;
        }(i, n, h, c);
      };
    case "BYTES":
      return function(i) {
        return function(g, w2, I) {
          let E, j, $2 = "", Y = w2 / 8, m = I === -1 ? 3 : 0;
          for (E = 0;E < Y; E += 1)
            j = g[E >>> 2] >>> 8 * (m + I * (E % 4)) & 255, $2 += String.fromCharCode(j);
          return $2;
        }(i, n, h);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (i) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(i) {
        return function(g, w2, I) {
          let E, j = w2 / 8, $2 = new ArrayBuffer(j), Y = new Uint8Array($2), m = I === -1 ? 3 : 0;
          for (E = 0;E < j; E += 1)
            Y[E] = g[E >>> 2] >>> 8 * (m + I * (E % 4)) & 255;
          return $2;
        }(i, n, h);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (i) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(i) {
        return function(g, w2, I) {
          let E, j = w2 / 8, $2 = I === -1 ? 3 : 0, Y = new Uint8Array(j);
          for (E = 0;E < j; E += 1)
            Y[E] = g[E >>> 2] >>> 8 * ($2 + I * (E % 4)) & 255;
          return Y;
        }(i, n, h);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var vn2 = function(t, n) {
  let h, c, i = t.binLen >>> 3, g = n.binLen >>> 3, w2 = i << 3, I = 4 - i << 3;
  if (i % 4 != 0) {
    for (h = 0;h < g; h += 4)
      c = i + h >>> 2, t.value[c] |= n.value[h >>> 2] << w2, t.value.push(0), t.value[c + 1] |= n.value[h >>> 2] >>> I;
    return (t.value.length << 2) - 4 >= g + i && t.value.pop(), { value: t.value, binLen: t.binLen + n.binLen };
  }
  return { value: t.value.concat(n.value), binLen: t.binLen + n.binLen };
};
var bn2 = function(t) {
  let n = { outputUpper: false, b64Pad: "=", outputLen: -1 }, h = t || {};
  if (n.outputUpper = h.outputUpper || false, h.b64Pad && (n.b64Pad = h.b64Pad), h.outputLen) {
    if (h.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    n.outputLen = h.outputLen;
  } else if (h.shakeLen) {
    if (h.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    n.outputLen = h.shakeLen;
  }
  if (typeof n.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof n.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return n;
};
var tn2 = function(t, n, h, c) {
  let i = t + " must include a value and format";
  if (!n) {
    if (!c)
      throw new Error(i);
    return c;
  }
  if (n.value === undefined || !n.format)
    throw new Error(i);
  return mn(n.format, n.encoding || "UTF8", h)(n.value);
};
var cn2 = function(t, n) {
  return t << n | t >>> 32 - n;
};
var B2 = function(t, n) {
  return t >>> n | t << 32 - n;
};
var Un2 = function(t, n) {
  return t >>> n;
};
var Ln2 = function(t, n, h) {
  return t ^ n ^ h;
};
var Fn2 = function(t, n, h) {
  return t & n ^ ~t & h;
};
var Bn2 = function(t, n, h) {
  return t & n ^ t & h ^ n & h;
};
var Lt2 = function(t) {
  return B2(t, 2) ^ B2(t, 13) ^ B2(t, 22);
};
var y2 = function(t, n) {
  let h = (65535 & t) + (65535 & n);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16)) << 16 | 65535 & h;
};
var Mt2 = function(t, n, h, c) {
  let i = (65535 & t) + (65535 & n) + (65535 & h) + (65535 & c);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16) + (c >>> 16) + (i >>> 16)) << 16 | 65535 & i;
};
var wn2 = function(t, n, h, c, i) {
  let g = (65535 & t) + (65535 & n) + (65535 & h) + (65535 & c) + (65535 & i);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16) + (c >>> 16) + (i >>> 16) + (g >>> 16)) << 16 | 65535 & g;
};
var Ht2 = function(t) {
  return B2(t, 7) ^ B2(t, 18) ^ Un2(t, 3);
};
var pt2 = function(t) {
  return B2(t, 6) ^ B2(t, 11) ^ B2(t, 25);
};
var Kt2 = function(t) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var Qn2 = function(t, n) {
  let h, c, i, g, w2, I, E, j = [];
  for (h = n[0], c = n[1], i = n[2], g = n[3], w2 = n[4], E = 0;E < 80; E += 1)
    j[E] = E < 16 ? t[E] : cn2(j[E - 3] ^ j[E - 8] ^ j[E - 14] ^ j[E - 16], 1), I = E < 20 ? wn2(cn2(h, 5), Fn2(c, i, g), w2, 1518500249, j[E]) : E < 40 ? wn2(cn2(h, 5), Ln2(c, i, g), w2, 1859775393, j[E]) : E < 60 ? wn2(cn2(h, 5), Bn2(c, i, g), w2, 2400959708, j[E]) : wn2(cn2(h, 5), Ln2(c, i, g), w2, 3395469782, j[E]), w2 = g, g = i, i = cn2(c, 30), c = h, h = I;
  return n[0] = y2(h, n[0]), n[1] = y2(c, n[1]), n[2] = y2(i, n[2]), n[3] = y2(g, n[3]), n[4] = y2(w2, n[4]), n;
};
var dt2 = function(t, n, h, c) {
  let i, g = 15 + (n + 65 >>> 9 << 4), w2 = n + h;
  for (;t.length <= g; )
    t.push(0);
  for (t[n >>> 5] |= 128 << 24 - n % 32, t[g] = 4294967295 & w2, t[g - 1] = w2 / En2 | 0, i = 0;i < t.length; i += 16)
    c = Qn2(t.slice(i, i + 16), c);
  return c;
};
var Mn2 = function(t) {
  let n;
  return n = t == "SHA-224" ? J.slice() : q2.slice(), n;
};
var Hn2 = function(t, n) {
  let h, c, i, g, w2, I, E, j, $2, Y, m, s = [];
  for (h = n[0], c = n[1], i = n[2], g = n[3], w2 = n[4], I = n[5], E = n[6], j = n[7], m = 0;m < 64; m += 1)
    s[m] = m < 16 ? t[m] : Mt2(B2(P = s[m - 2], 17) ^ B2(P, 19) ^ Un2(P, 10), s[m - 7], Ht2(s[m - 15]), s[m - 16]), $2 = wn2(j, pt2(w2), Fn2(w2, I, E), A[m], s[m]), Y = y2(Lt2(h), Bn2(h, c, i)), j = E, E = I, I = w2, w2 = y2(g, $2), g = i, i = c, c = h, h = y2($2, Y);
  var P;
  return n[0] = y2(h, n[0]), n[1] = y2(c, n[1]), n[2] = y2(i, n[2]), n[3] = y2(g, n[3]), n[4] = y2(w2, n[4]), n[5] = y2(I, n[5]), n[6] = y2(E, n[6]), n[7] = y2(j, n[7]), n;
};
var pn2 = function(t, n) {
  let h;
  return n > 32 ? (h = 64 - n, new N(t.I << n | t.N >>> h, t.N << n | t.I >>> h)) : n !== 0 ? (h = 32 - n, new N(t.N << n | t.I >>> h, t.I << n | t.N >>> h)) : t;
};
var Q2 = function(t, n) {
  let h;
  return n < 32 ? (h = 32 - n, new N(t.N >>> n | t.I << h, t.I >>> n | t.N << h)) : (h = 64 - n, new N(t.I >>> n | t.N << h, t.N >>> n | t.I << h));
};
var an2 = function(t, n) {
  return new N(t.N >>> n, t.I >>> n | t.N << 32 - n);
};
var et2 = function(t, n, h) {
  return new N(t.N & n.N ^ t.N & h.N ^ n.N & h.N, t.I & n.I ^ t.I & h.I ^ n.I & h.I);
};
var ft2 = function(t) {
  let n = Q2(t, 28), h = Q2(t, 34), c = Q2(t, 39);
  return new N(n.N ^ h.N ^ c.N, n.I ^ h.I ^ c.I);
};
var F2 = function(t, n) {
  let h, c;
  h = (65535 & t.I) + (65535 & n.I), c = (t.I >>> 16) + (n.I >>> 16) + (h >>> 16);
  let i = (65535 & c) << 16 | 65535 & h;
  return h = (65535 & t.N) + (65535 & n.N) + (c >>> 16), c = (t.N >>> 16) + (n.N >>> 16) + (h >>> 16), new N((65535 & c) << 16 | 65535 & h, i);
};
var Vt2 = function(t, n, h, c) {
  let i, g;
  i = (65535 & t.I) + (65535 & n.I) + (65535 & h.I) + (65535 & c.I), g = (t.I >>> 16) + (n.I >>> 16) + (h.I >>> 16) + (c.I >>> 16) + (i >>> 16);
  let w2 = (65535 & g) << 16 | 65535 & i;
  return i = (65535 & t.N) + (65535 & n.N) + (65535 & h.N) + (65535 & c.N) + (g >>> 16), g = (t.N >>> 16) + (n.N >>> 16) + (h.N >>> 16) + (c.N >>> 16) + (i >>> 16), new N((65535 & g) << 16 | 65535 & i, w2);
};
var yt2 = function(t, n, h, c, i) {
  let g, w2;
  g = (65535 & t.I) + (65535 & n.I) + (65535 & h.I) + (65535 & c.I) + (65535 & i.I), w2 = (t.I >>> 16) + (n.I >>> 16) + (h.I >>> 16) + (c.I >>> 16) + (i.I >>> 16) + (g >>> 16);
  let I = (65535 & w2) << 16 | 65535 & g;
  return g = (65535 & t.N) + (65535 & n.N) + (65535 & h.N) + (65535 & c.N) + (65535 & i.N) + (w2 >>> 16), w2 = (t.N >>> 16) + (n.N >>> 16) + (h.N >>> 16) + (c.N >>> 16) + (i.N >>> 16) + (g >>> 16), new N((65535 & w2) << 16 | 65535 & g, I);
};
var Yn2 = function(t, n) {
  return new N(t.N ^ n.N, t.I ^ n.I);
};
var ot2 = function(t) {
  let n = Q2(t, 19), h = Q2(t, 61), c = an2(t, 6);
  return new N(n.N ^ h.N ^ c.N, n.I ^ h.I ^ c.I);
};
var Gt2 = function(t) {
  let n = Q2(t, 1), h = Q2(t, 8), c = an2(t, 7);
  return new N(n.N ^ h.N ^ c.N, n.I ^ h.I ^ c.I);
};
var lt2 = function(t) {
  let n = Q2(t, 14), h = Q2(t, 18), c = Q2(t, 41);
  return new N(n.N ^ h.N ^ c.N, n.I ^ h.I ^ c.I);
};
var Kn2 = function(t) {
  return t === "SHA-384" ? [new N(3418070365, J[0]), new N(1654270250, J[1]), new N(2438529370, J[2]), new N(355462360, J[3]), new N(1731405415, J[4]), new N(41048885895, J[5]), new N(3675008525, J[6]), new N(1203062813, J[7])] : [new N(q2[0], 4089235720), new N(q2[1], 2227873595), new N(q2[2], 4271175723), new N(q2[3], 1595750129), new N(q2[4], 2917565137), new N(q2[5], 725511199), new N(q2[6], 4215389547), new N(q2[7], 327033209)];
};
var dn2 = function(t, n) {
  let h, c, i, g, w2, I, E, j, $2, Y, m, s, P = [];
  for (h = n[0], c = n[1], i = n[2], g = n[3], w2 = n[4], I = n[5], E = n[6], j = n[7], m = 0;m < 80; m += 1)
    m < 16 ? (s = 2 * m, P[m] = new N(t[s], t[s + 1])) : P[m] = Vt2(ot2(P[m - 2]), P[m - 7], Gt2(P[m - 15]), P[m - 16]), $2 = yt2(j, lt2(w2), (T = I, v = E, new N((S = w2).N & T.N ^ ~S.N & v.N, S.I & T.I ^ ~S.I & v.I)), Bt2[m], P[m]), Y = F2(ft2(h), et2(h, c, i)), j = E, E = I, I = w2, w2 = F2(g, $2), g = i, i = c, c = h, h = F2($2, Y);
  var S, T, v;
  return n[0] = F2(h, n[0]), n[1] = F2(c, n[1]), n[2] = F2(i, n[2]), n[3] = F2(g, n[3]), n[4] = F2(w2, n[4]), n[5] = F2(I, n[5]), n[6] = F2(E, n[6]), n[7] = F2(j, n[7]), n;
};
var Cn2 = function(t) {
  let n, h = [];
  for (n = 0;n < 5; n += 1)
    h[n] = [new N(0, 0), new N(0, 0), new N(0, 0), new N(0, 0), new N(0, 0)];
  return h;
};
var Zt2 = function(t) {
  let n, h = [];
  for (n = 0;n < 5; n += 1)
    h[n] = t[n].slice();
  return h;
};
var Pn2 = function(t, n) {
  let h, c, i, g, w2 = [], I = [];
  if (t !== null)
    for (c = 0;c < t.length; c += 2)
      n[(c >>> 1) % 5][(c >>> 1) / 5 | 0] = Yn2(n[(c >>> 1) % 5][(c >>> 1) / 5 | 0], new N(t[c + 1], t[c]));
  for (h = 0;h < 24; h += 1) {
    for (g = Cn2(), c = 0;c < 5; c += 1)
      w2[c] = (E = n[c][0], j = n[c][1], $2 = n[c][2], Y = n[c][3], m = n[c][4], new N(E.N ^ j.N ^ $2.N ^ Y.N ^ m.N, E.I ^ j.I ^ $2.I ^ Y.I ^ m.I));
    for (c = 0;c < 5; c += 1)
      I[c] = Yn2(w2[(c + 4) % 5], pn2(w2[(c + 1) % 5], 1));
    for (c = 0;c < 5; c += 1)
      for (i = 0;i < 5; i += 1)
        n[c][i] = Yn2(n[c][i], I[c]);
    for (c = 0;c < 5; c += 1)
      for (i = 0;i < 5; i += 1)
        g[i][(2 * c + 3 * i) % 5] = pn2(n[c][i], Xt2[c][i]);
    for (c = 0;c < 5; c += 1)
      for (i = 0;i < 5; i += 1)
        n[c][i] = Yn2(g[c][i], new N(~g[(c + 1) % 5][i].N & g[(c + 2) % 5][i].N, ~g[(c + 1) % 5][i].I & g[(c + 2) % 5][i].I));
    n[0][0] = Yn2(n[0][0], at2[h]);
  }
  var E, j, $2, Y, m;
  return n;
};
var Xn2 = function(t) {
  let n, h, c = 0, i = [0, 0], g = [4294967295 & t, t / En2 & 2097151];
  for (n = 6;n >= 0; n--)
    h = g[n >> 2] >>> 8 * n & 255, h === 0 && c === 0 || (i[c + 1 >> 2] |= h << 8 * (c + 1), c += 1);
  return c = c !== 0 ? c : 1, i[0] |= c, { value: c + 1 > 4 ? i : [i[0]], binLen: 8 + 8 * c };
};
var xn2 = function(t) {
  return vn2(Xn2(t.binLen), t);
};
var en2 = function(t, n) {
  let h, c = Xn2(n);
  c = vn2(c, t);
  let i = n >>> 2, g = (i - c.value.length % i) % i;
  for (h = 0;h < g; h++)
    c.value.push(0);
  return c.value;
};
var En2 = 4294967296;
var A = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var J = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var q2 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var Nn2 = "Chosen SHA variant is not supported";
var zn2 = "Cannot set numRounds with MAC";

class jn2 {
  constructor(t, n, h) {
    let c = h || {};
    if (this.t = n, this.i = c.encoding || "UTF8", this.numRounds = c.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = t, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(t) {
    let n, h = 0, c = this.m >>> 5, i = this.C(t, this.h, this.u), g = i.binLen, w2 = i.value, I = g >>> 5;
    for (n = 0;n < I; n += c)
      h + this.m <= g && (this.U = this.v(w2.slice(n, n + c), this.U), h += this.m);
    return this.A += h, this.h = w2.slice(h >>> 5), this.u = g % this.m, this.l = true, this;
  }
  getHash(t, n) {
    let h, c, i = this.R, g = bn2(n);
    if (this.K) {
      if (g.outputLen === -1)
        throw new Error("Output length must be specified in options");
      i = g.outputLen;
    }
    let w2 = Wn2(t, i, this.T, g);
    if (this.H && this.g)
      return w2(this.g(g));
    for (c = this.F(this.h.slice(), this.u, this.A, this.L(this.U), i), h = 1;h < this.numRounds; h += 1)
      this.K && i % 32 != 0 && (c[c.length - 1] &= 16777215 >>> 24 - i % 32), c = this.F(c, i, 0, this.B(this.o), i);
    return w2(c);
  }
  setHMACKey(t, n, h) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    let c = mn(n, (h || {}).encoding || "UTF8", this.T);
    this.k(c(t));
  }
  k(t) {
    let n = this.m >>> 3, h = n / 4 - 1, c;
    if (this.numRounds !== 1)
      throw new Error(zn2);
    if (this.H)
      throw new Error("MAC key already set");
    for (n < t.binLen / 8 && (t.value = this.F(t.value, t.binLen, 0, this.B(this.o), this.R));t.value.length <= h; )
      t.value.push(0);
    for (c = 0;c <= h; c += 1)
      this.S[c] = 909522486 ^ t.value[c], this.p[c] = 1549556828 ^ t.value[c];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(t, n) {
    let h = bn2(n);
    return Wn2(t, this.R, this.T, h)(this.Y());
  }
  Y() {
    let t;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    let n = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return t = this.v(this.p, this.B(this.o)), t = this.F(n, this.R, this.m, t, this.R), t;
  }
}
var Ut2 = class extends jn2 {
  constructor(t, n, h) {
    if (t !== "SHA-1")
      throw new Error(Nn2);
    super(t, n, h);
    let c = h || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = mn(this.t, this.i, this.T), this.v = Qn2, this.L = function(i) {
      return i.slice();
    }, this.B = Kt2, this.F = dt2, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, c.hmacKey && this.k(tn2("hmacKey", c.hmacKey, this.T));
  }
};
var Ft2 = class extends jn2 {
  constructor(t, n, h) {
    if (t !== "SHA-224" && t !== "SHA-256")
      throw new Error(Nn2);
    super(t, n, h);
    let c = h || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = mn(this.t, this.i, this.T), this.v = Hn2, this.L = function(i) {
      return i.slice();
    }, this.B = Mn2, this.F = function(i, g, w2, I) {
      return function(E, j, $2, Y, m) {
        let s, P, S = 15 + (j + 65 >>> 9 << 4), T = j + $2;
        for (;E.length <= S; )
          E.push(0);
        for (E[j >>> 5] |= 128 << 24 - j % 32, E[S] = 4294967295 & T, E[S - 1] = T / En2 | 0, s = 0;s < E.length; s += 16)
          Y = Hn2(E.slice(s, s + 16), Y);
        return P = m === "SHA-224" ? [Y[0], Y[1], Y[2], Y[3], Y[4], Y[5], Y[6]] : Y, P;
      }(i, g, w2, I, t);
    }, this.U = Mn2(t), this.m = 512, this.R = t === "SHA-224" ? 224 : 256, this.K = false, c.hmacKey && this.k(tn2("hmacKey", c.hmacKey, this.T));
  }
};

class N {
  constructor(t, n) {
    this.N = t, this.I = n;
  }
}
var Bt2 = [new N(A[0], 3609767458), new N(A[1], 602891725), new N(A[2], 3964484399), new N(A[3], 2173295548), new N(A[4], 4081628472), new N(A[5], 3053834265), new N(A[6], 2937671579), new N(A[7], 3664609560), new N(A[8], 2734883394), new N(A[9], 1164996542), new N(A[10], 1323610764), new N(A[11], 3590304994), new N(A[12], 4068182383), new N(A[13], 991336113), new N(A[14], 633803317), new N(A[15], 3479774868), new N(A[16], 2666613458), new N(A[17], 944711139), new N(A[18], 2341262773), new N(A[19], 2007800933), new N(A[20], 1495990901), new N(A[21], 1856431235), new N(A[22], 3175218132), new N(A[23], 2198950837), new N(A[24], 3999719339), new N(A[25], 766784016), new N(A[26], 2566594879), new N(A[27], 3203337956), new N(A[28], 1034457026), new N(A[29], 2466948901), new N(A[30], 3758326383), new N(A[31], 168717936), new N(A[32], 1188179964), new N(A[33], 1546045734), new N(A[34], 1522805485), new N(A[35], 2643833823), new N(A[36], 2343527390), new N(A[37], 1014477480), new N(A[38], 1206759142), new N(A[39], 344077627), new N(A[40], 1290863460), new N(A[41], 3158454273), new N(A[42], 3505952657), new N(A[43], 106217008), new N(A[44], 3606008344), new N(A[45], 1432725776), new N(A[46], 1467031594), new N(A[47], 851169720), new N(A[48], 3100823752), new N(A[49], 1363258195), new N(A[50], 3750685593), new N(A[51], 3785050280), new N(A[52], 3318307427), new N(A[53], 3812723403), new N(A[54], 2003034995), new N(A[55], 3602036899), new N(A[56], 1575990012), new N(A[57], 1125592928), new N(A[58], 2716904306), new N(A[59], 442776044), new N(A[60], 593698344), new N(A[61], 3733110249), new N(A[62], 2999351573), new N(A[63], 3815920427), new N(3391569614, 3928383900), new N(3515267271, 566280711), new N(3940187606, 3454069534), new N(4118630271, 4000239992), new N(116418474, 1914138554), new N(174292421, 2731055270), new N(289380356, 3203993006), new N(460393269, 320620315), new N(685471733, 587496836), new N(852142971, 1086792851), new N(1017036298, 365543100), new N(1126000580, 2618297676), new N(1288033470, 3409855158), new N(1501505948, 4234509866), new N(1607167915, 987167468), new N(1816402316, 1246189591)];
var Qt2 = class extends jn2 {
  constructor(t, n, h) {
    if (t !== "SHA-384" && t !== "SHA-512")
      throw new Error(Nn2);
    super(t, n, h);
    let c = h || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = mn(this.t, this.i, this.T), this.v = dn2, this.L = function(i) {
      return i.slice();
    }, this.B = Kn2, this.F = function(i, g, w2, I) {
      return function(E, j, $2, Y, m) {
        let s, P, S = 31 + (j + 129 >>> 10 << 5), T = j + $2;
        for (;E.length <= S; )
          E.push(0);
        for (E[j >>> 5] |= 128 << 24 - j % 32, E[S] = 4294967295 & T, E[S - 1] = T / En2 | 0, s = 0;s < E.length; s += 32)
          Y = dn2(E.slice(s, s + 32), Y);
        return P = m === "SHA-384" ? [Y[0].N, Y[0].I, Y[1].N, Y[1].I, Y[2].N, Y[2].I, Y[3].N, Y[3].I, Y[4].N, Y[4].I, Y[5].N, Y[5].I] : [Y[0].N, Y[0].I, Y[1].N, Y[1].I, Y[2].N, Y[2].I, Y[3].N, Y[3].I, Y[4].N, Y[4].I, Y[5].N, Y[5].I, Y[6].N, Y[6].I, Y[7].N, Y[7].I], P;
      }(i, g, w2, I, t);
    }, this.U = Kn2(t), this.m = 1024, this.R = t === "SHA-384" ? 384 : 512, this.K = false, c.hmacKey && this.k(tn2("hmacKey", c.hmacKey, this.T));
  }
};
var at2 = [new N(0, 1), new N(0, 32898), new N(2147483648, 32906), new N(2147483648, 2147516416), new N(0, 32907), new N(0, 2147483649), new N(2147483648, 2147516545), new N(2147483648, 32777), new N(0, 138), new N(0, 136), new N(0, 2147516425), new N(0, 2147483658), new N(0, 2147516555), new N(2147483648, 139), new N(2147483648, 32905), new N(2147483648, 32771), new N(2147483648, 32770), new N(2147483648, 128), new N(0, 32778), new N(2147483648, 2147483658), new N(2147483648, 2147516545), new N(2147483648, 32896), new N(0, 2147483649), new N(2147483648, 2147516424)];
var Xt2 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var zt2 = class extends jn2 {
  constructor(t, n, h) {
    let c = 6, i = 0;
    super(t, n, h);
    let g = h || {};
    if (this.numRounds !== 1) {
      if (g.kmacKey || g.hmacKey)
        throw new Error(zn2);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = mn(this.t, this.i, this.T), this.v = Pn2, this.L = Zt2, this.B = Cn2, this.U = Cn2(), this.K = false, t) {
      case "SHA3-224":
        this.m = i = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = i = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = i = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = i = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        c = 31, this.m = i = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        c = 31, this.m = i = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        c = 4, this.m = i = 1344, this.X(h), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        c = 4, this.m = i = 1088, this.X(h), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = i = 1344, c = this.O(h), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = i = 1088, c = this.O(h), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(Nn2);
    }
    this.F = function(w2, I, E, j, $2) {
      return function(Y, m, s, P, S, T, v) {
        let x, O, C = 0, D = [], b2 = S >>> 5, k = m >>> 5;
        for (x = 0;x < k && m >= S; x += b2)
          P = Pn2(Y.slice(x, x + b2), P), m -= S;
        for (Y = Y.slice(x), m %= S;Y.length < b2; )
          Y.push(0);
        for (x = m >>> 3, Y[x >> 2] ^= T << x % 4 * 8, Y[b2 - 1] ^= 2147483648, P = Pn2(Y, P);32 * D.length < v && (O = P[C % 5][C / 5 | 0], D.push(O.I), !(32 * D.length >= v)); )
          D.push(O.N), C += 1, 64 * C % S == 0 && (Pn2(null, P), C = 0);
        return D;
      }(w2, I, 0, j, i, c, $2);
    }, g.hmacKey && this.k(tn2("hmacKey", g.hmacKey, this.T));
  }
  O(t, n) {
    let h = function(i) {
      let g = i || {};
      return { funcName: tn2("funcName", g.funcName, 1, { value: [], binLen: 0 }), customization: tn2("Customization", g.customization, 1, { value: [], binLen: 0 }) };
    }(t || {});
    n && (h.funcName = n);
    let c = vn2(xn2(h.funcName), xn2(h.customization));
    if (h.customization.binLen !== 0 || h.funcName.binLen !== 0) {
      let i = en2(c, this.m >>> 3);
      for (let g = 0;g < i.length; g += this.m >>> 5)
        this.U = this.v(i.slice(g, g + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(t) {
    let n = function(c) {
      let i = c || {};
      return { kmacKey: tn2("kmacKey", i.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: tn2("Customization", i.customization, 1, { value: [], binLen: 0 }) };
    }(t || {});
    this.O(t, n.funcName);
    let h = en2(xn2(n.kmacKey), this.m >>> 3);
    for (let c = 0;c < h.length; c += this.m >>> 5)
      this.U = this.v(h.slice(c, c + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(t) {
    let n = vn2({ value: this.h.slice(), binLen: this.u }, function(h) {
      let c, i, g = 0, w2 = [0, 0], I = [4294967295 & h, h / En2 & 2097151];
      for (c = 6;c >= 0; c--)
        i = I[c >> 2] >>> 8 * c & 255, i === 0 && g === 0 || (w2[g >> 2] |= i << 8 * g, g += 1);
      return g = g !== 0 ? g : 1, w2[g >> 2] |= g << 8 * g, { value: g + 1 > 4 ? w2 : [w2[0]], binLen: 8 + 8 * g };
    }(t.outputLen));
    return this.F(n.value, n.binLen, this.A, this.L(this.U), t.outputLen);
  }
};

class _n2 {
  constructor(t, n, h) {
    if (t == "SHA-1")
      this.P = new Ut2(t, n, h);
    else if (t == "SHA-224" || t == "SHA-256")
      this.P = new Ft2(t, n, h);
    else if (t == "SHA-384" || t == "SHA-512")
      this.P = new Qt2(t, n, h);
    else {
      if (t != "SHA3-224" && t != "SHA3-256" && t != "SHA3-384" && t != "SHA3-512" && t != "SHAKE128" && t != "SHAKE256" && t != "CSHAKE128" && t != "CSHAKE256" && t != "KMAC128" && t != "KMAC256")
        throw new Error(Nn2);
      this.P = new zt2(t, n, h);
    }
  }
  update(t) {
    return this.P.update(t), this;
  }
  getHash(t, n) {
    return this.P.getHash(t, n);
  }
  setHMACKey(t, n, h) {
    this.P.setHMACKey(t, n, h);
  }
  getHMAC(t, n) {
    return this.P.getHMAC(t, n);
  }
}
var Sn2 = function(t, n, h = 0) {
  let c = Dn2.default({ ...t, signature: undefined }), i = n.noTimeWindow ? 0 : Math.floor(Date.now() / (n.timeWindow ?? nt)) + h;
  return new _n2("SHA-256", "TEXT", { encoding: "UTF8" }).update(c).update(Dn2.default(n)).update(`${i}`).getHash("B64");
};
function Jn2(t, n = {}) {
  return { ...t, signature: Sn2(t, n) };
}
var nt = 5000;

class un2 {
  data = [];
  #n = new TextEncoder;
  static payload(t, n, h) {
    return new un2().payload(t, n, h);
  }
  static blob(t, n) {
    return new un2().blob(t, n);
  }
  #t(t) {
    let n = this.#n.encode(t), h = new Uint8Array([n.byteLength]);
    this.data.push(h.buffer), this.data.push(n.buffer);
  }
  payload(t, n, h) {
    this.#t(t);
    let c = new Uint8Array([1]);
    this.data.push(c.buffer);
    let i = JSON.stringify(h ? Jn2(n, { secret: h }) : n), g = this.#n.encode(i), w2 = new Uint32Array([g.byteLength]);
    return this.data.push(w2.buffer), this.data.push(g.buffer), this;
  }
  blob(t, n) {
    this.#t(t);
    let h = new Uint8Array([2]);
    this.data.push(h.buffer);
    let c = new Uint32Array([n.size]);
    return this.data.push(c.buffer), this.data.push(n), this;
  }
  build() {
    return new Blob(this.data);
  }
}
var ct = new TextDecoder;
function Jt2(t, n) {
  let [h, c] = mt2(t, n);
  return [ct.decode(new Uint8Array(t, c, h)), c + h];
}
function qt2(t, n) {
  let [h, c] = it2(t, n);
  return [ct.decode(new Uint8Array(t, c, h)), c + h];
}
function n8(t, n) {
  let [h, c] = it2(t, n);
  return [new Blob([new Uint8Array(t, c, h)], { type: "application/octet-stream" }), c + h];
}
function it2(t, n) {
  return [new Uint32Array(t.slice(n, n + Uint32Array.BYTES_PER_ELEMENT), 0, 1)[0], n + Uint32Array.BYTES_PER_ELEMENT];
}
function mt2(t, n) {
  return [new Uint8Array(t, n, 1)[0], n + Uint8Array.BYTES_PER_ELEMENT];
}
async function I8(t) {
  let n = {}, h = {}, c = 0, i;
  while (c < t.size) {
    i = i ?? await t.arrayBuffer();
    let [g, w2] = Jt2(i, c);
    c = w2;
    let [I, E] = mt2(i, c);
    switch (c = E, I) {
      case 1:
        let [j, $2] = qt2(i, c);
        c = $2;
        try {
          n[g] = JSON.parse(j);
        } catch (s) {
          console.error(`Error parsing JSON for key "${g}":`, s);
        }
        break;
      case 2:
        let [Y, m] = n8(i, c);
        c = m, h[g] = Y;
        break;
    }
  }
  return { ...n, ...h };
}
async function t8(t) {
  let h = Math.ceil(t.size / 65536), c = await crypto.subtle.digest("SHA-256", new Uint8Array(0));
  for (let w2 = 0;w2 < h; w2++) {
    let E = await t.slice(w2 * 65536, (w2 + 1) * 65536).arrayBuffer(), j = await crypto.subtle.digest("SHA-256", E), $2 = new Uint8Array(c.byteLength + j.byteLength);
    $2.set(new Uint8Array(c), 0), $2.set(new Uint8Array(j), c.byteLength), c = await crypto.subtle.digest("SHA-256", $2.buffer);
  }
  return Array.from(new Uint8Array(c)).map((w2) => w2.toString(16).padStart(2, "0")).join("");
}
async function tt2(t, n, h = t8) {
  if (typeof t === "string" && t.startsWith("blob:")) {
    let i = await fetch(t).then((w2) => w2.blob());
    URL.revokeObjectURL(t);
    let g = `{blobUrl:${await h(i)}}`;
    return n[g] = i, g;
  }
  if (typeof t === "object" && t instanceof Blob) {
    let i = `{blob:${await h(t)}}`;
    return n[i] = t, i;
  }
  let c = t;
  if (Array.isArray(t))
    await Promise.all(t.map(async (i, g) => {
      let w2 = await tt2(i, n, h);
      if (w2 !== t[g]) {
        if (t === c)
          t = [...t];
        t[g] = w2;
      }
    }));
  else if (typeof t === "object" && t)
    await Promise.all(Object.entries(t).map(async ([i, g]) => {
      let w2 = await tt2(g, n, h);
      if (w2 !== t[i]) {
        if (t === c)
          t = { ...t };
        t[i] = w2;
      }
    }));
  return t;
}
function ht2(t, n) {
  if (typeof t === "string" && t.startsWith("{blobUrl:"))
    return URL.createObjectURL(n[t]);
  if (typeof t === "string" && t.startsWith("{blob:"))
    return n[t];
  let h = t;
  if (Array.isArray(t))
    t.forEach((c, i) => {
      let g = ht2(c, n);
      if (g !== c) {
        if (t === h)
          t = [...t];
        t[i] = g;
      }
    });
  else if (typeof t === "object" && t)
    Object.entries(t).forEach(([c, i]) => {
      let g = ht2(i, n);
      if (g !== i) {
        if (t === h)
          t = { ...t };
        t[c] = g;
      }
    });
  return t;
}
function packageUpdates2(updates, blobs, secret) {
  const blobBuilder = un2.payload("payload", { updates }, secret);
  const addedBlob = new Set;
  for (let key in blobs) {
    if (!addedBlob.has(key)) {
      blobBuilder.blob(key, blobs[key]);
      addedBlob.add(key);
    }
  }
  return blobBuilder.build();
}
async function receiveBlob2(blob) {
  const { payload, ...blobs } = await I8(blob);
  return { payload, blobs };
}
var zJ = Object.create;
var { defineProperty: Q0, getPrototypeOf: QJ, getOwnPropertyNames: ZJ } = Object;
var UJ = Object.prototype.hasOwnProperty;
var XJ = (J2, q22, _) => {
  _ = J2 != null ? zJ(QJ(J2)) : {};
  const z = q22 || !J2 || !J2.__esModule ? Q0(_, "default", { value: J2, enumerable: true }) : _;
  for (let Q22 of ZJ(J2))
    if (!UJ.call(z, Q22))
      Q0(z, Q22, { get: () => J2[Q22], enumerable: true });
  return z;
};
var T = (J2, q22) => () => (q22 || J2((q22 = { exports: {} }).exports, q22), q22.exports);
var F0 = T((p3, G0) => {
  var p = function(J2) {
    throw { name: "SyntaxError", message: J2, at: M1, text: w1 };
  }, x = function(J2) {
    if (J2 && J2 !== R2)
      p("Expected '" + J2 + "' instead of '" + R2 + "'");
    return R2 = w1.charAt(M1), M1 += 1, R2;
  }, U0 = function() {
    var J2, q22 = "";
    if (R2 === "-")
      q22 = "-", x("-");
    while (R2 >= "0" && R2 <= "9")
      q22 += R2, x();
    if (R2 === ".") {
      q22 += ".";
      while (x() && R2 >= "0" && R2 <= "9")
        q22 += R2;
    }
    if (R2 === "e" || R2 === "E") {
      if (q22 += R2, x(), R2 === "-" || R2 === "+")
        q22 += R2, x();
      while (R2 >= "0" && R2 <= "9")
        q22 += R2, x();
    }
    if (J2 = Number(q22), !isFinite(J2))
      p("Bad number");
    return J2;
  }, X0 = function() {
    var J2, q22, _ = "", z;
    if (R2 === '"')
      while (x())
        if (R2 === '"')
          return x(), _;
        else if (R2 === "\\")
          if (x(), R2 === "u") {
            z = 0;
            for (q22 = 0;q22 < 4; q22 += 1) {
              if (J2 = parseInt(x(), 16), !isFinite(J2))
                break;
              z = z * 16 + J2;
            }
            _ += String.fromCharCode(z);
          } else if (typeof Z0[R2] === "string")
            _ += Z0[R2];
          else
            break;
        else
          _ += R2;
    p("Bad string");
  }, y22 = function() {
    while (R2 && R2 <= " ")
      x();
  }, GJ = function() {
    switch (R2) {
      case "t":
        return x("t"), x("r"), x("u"), x("e"), true;
      case "f":
        return x("f"), x("a"), x("l"), x("s"), x("e"), false;
      case "n":
        return x("n"), x("u"), x("l"), x("l"), null;
      default:
        p("Unexpected '" + R2 + "'");
    }
  }, FJ = function() {
    var J2 = [];
    if (R2 === "[") {
      if (x("["), y22(), R2 === "]")
        return x("]"), J2;
      while (R2) {
        if (J2.push(D1()), y22(), R2 === "]")
          return x("]"), J2;
        x(","), y22();
      }
    }
    p("Bad array");
  }, BJ = function() {
    var J2, q22 = {};
    if (R2 === "{") {
      if (x("{"), y22(), R2 === "}")
        return x("}"), q22;
      while (R2) {
        if (J2 = X0(), y22(), x(":"), Object.prototype.hasOwnProperty.call(q22, J2))
          p('Duplicate key "' + J2 + '"');
        if (q22[J2] = D1(), y22(), R2 === "}")
          return x("}"), q22;
        x(","), y22();
      }
    }
    p("Bad object");
  }, D1 = function() {
    switch (y22(), R2) {
      case "{":
        return BJ();
      case "[":
        return FJ();
      case '"':
        return X0();
      case "-":
        return U0();
      default:
        return R2 >= "0" && R2 <= "9" ? U0() : GJ();
    }
  }, M1, R2, Z0 = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, w1;
  G0.exports = function(J2, q22) {
    var _;
    if (w1 = J2, M1 = 0, R2 = " ", _ = D1(), y22(), R2)
      p("Syntax error");
    return typeof q22 === "function" ? function z(Q22, Z) {
      var G, V, U = Q22[Z];
      if (U && typeof U === "object") {
        for (G in D1)
          if (Object.prototype.hasOwnProperty.call(U, G))
            if (V = z(U, G), typeof V === "undefined")
              delete U[G];
            else
              U[G] = V;
      }
      return q22.call(Q22, Z, U);
    }({ "": _ }, "") : _;
  };
});
var V0 = T((c3, B0) => {
  var m1 = function(J2) {
    return y1.lastIndex = 0, y1.test(J2) ? '"' + J2.replace(y1, function(q22) {
      var _ = VJ[q22];
      return typeof _ === "string" ? _ : "\\u" + ("0000" + q22.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + J2 + '"';
  }, O1 = function(J2, q22) {
    var _, z, Q22, Z, G = b2, V, U = q22[J2];
    if (U && typeof U === "object" && typeof U.toJSON === "function")
      U = U.toJSON(J2);
    if (typeof u === "function")
      U = u.call(q22, J2, U);
    switch (typeof U) {
      case "string":
        return m1(U);
      case "number":
        return isFinite(U) ? String(U) : "null";
      case "boolean":
      case "null":
        return String(U);
      case "object":
        if (!U)
          return "null";
        if (b2 += R1, V = [], Object.prototype.toString.apply(U) === "[object Array]") {
          Z = U.length;
          for (_ = 0;_ < Z; _ += 1)
            V[_] = O1(_, U) || "null";
          return Q22 = V.length === 0 ? "[]" : b2 ? `[
` + b2 + V.join(`,
` + b2) + `
` + G + "]" : "[" + V.join(",") + "]", b2 = G, Q22;
        }
        if (u && typeof u === "object") {
          Z = u.length;
          for (_ = 0;_ < Z; _ += 1)
            if (z = u[_], typeof z === "string") {
              if (Q22 = O1(z, U), Q22)
                V.push(m1(z) + (b2 ? ": " : ":") + Q22);
            }
        } else
          for (z in U)
            if (Object.prototype.hasOwnProperty.call(U, z)) {
              if (Q22 = O1(z, U), Q22)
                V.push(m1(z) + (b2 ? ": " : ":") + Q22);
            }
        return Q22 = V.length === 0 ? "{}" : b2 ? `{
` + b2 + V.join(`,
` + b2) + `
` + G + "}" : "{" + V.join(",") + "}", b2 = G, Q22;
      default:
    }
  }, y1 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b2, R1, VJ = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, u;
  B0.exports = function(J2, q22, _) {
    var z;
    if (b2 = "", R1 = "", typeof _ === "number")
      for (z = 0;z < _; z += 1)
        R1 += " ";
    else if (typeof _ === "string")
      R1 = _;
    if (u = q22, q22 && typeof q22 !== "function" && (typeof q22 !== "object" || typeof q22.length !== "number"))
      throw new Error("JSON.stringify");
    return O1("", { "": J2 });
  };
});
var K0 = T((KJ) => {
  KJ.parse = F0();
  KJ.stringify = V0();
});
var L0 = T((h3, H0) => {
  var WJ = {}.toString;
  H0.exports = Array.isArray || function(J2) {
    return WJ.call(J2) == "[object Array]";
  };
});
var g1 = T((Y3, M0) => {
  var W0 = Object.prototype.toString;
  M0.exports = function J(q22) {
    var _ = W0.call(q22), z = _ === "[object Arguments]";
    if (!z)
      z = _ !== "[object Array]" && q22 !== null && typeof q22 === "object" && typeof q22.length === "number" && q22.length >= 0 && W0.call(q22.callee) === "[object Function]";
    return z;
  };
});
var j0 = T((d3, N0) => {
  var T0;
  if (!Object.keys)
    z1 = Object.prototype.hasOwnProperty, p1 = Object.prototype.toString, D0 = g1(), c1 = Object.prototype.propertyIsEnumerable, R0 = !c1.call({ toString: null }, "toString"), O0 = c1.call(function() {}, "prototype"), Q1 = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], A1 = function(J2) {
      var q22 = J2.constructor;
      return q22 && q22.prototype === J2;
    }, A0 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, C0 = function() {
      if (typeof window === "undefined")
        return false;
      for (var J2 in window)
        try {
          if (!A0["$" + J2] && z1.call(window, J2) && window[J2] !== null && typeof window[J2] === "object")
            try {
              A1(window[J2]);
            } catch (q22) {
              return true;
            }
        } catch (q22) {
          return true;
        }
      return false;
    }(), x0 = function(J2) {
      if (typeof window === "undefined" || !C0)
        return A1(J2);
      try {
        return A1(J2);
      } catch (q22) {
        return false;
      }
    }, T0 = function J(q22) {
      var _ = q22 !== null && typeof q22 === "object", z = p1.call(q22) === "[object Function]", Q22 = D0(q22), Z = _ && p1.call(q22) === "[object String]", G = [];
      if (!_ && !z && !Q22)
        throw new TypeError("Object.keys called on a non-object");
      var V = O0 && z;
      if (Z && q22.length > 0 && !z1.call(q22, 0))
        for (var U = 0;U < q22.length; ++U)
          G.push(String(U));
      if (Q22 && q22.length > 0)
        for (var K2 = 0;K2 < q22.length; ++K2)
          G.push(String(K2));
      else
        for (var H in q22)
          if (!(V && H === "prototype") && z1.call(q22, H))
            G.push(String(H));
      if (R0) {
        var F22 = x0(q22);
        for (var B22 = 0;B22 < Q1.length; ++B22)
          if (!(F22 && Q1[B22] === "constructor") && z1.call(q22, Q1[B22]))
            G.push(Q1[B22]);
      }
      return G;
    };
  var z1, p1, D0, c1, R0, O0, Q1, A1, A0, C0, x0;
  N0.exports = T0;
});
var S0 = T((l3, v0) => {
  var MJ = Array.prototype.slice, DJ = g1(), k0 = Object.keys, C1 = k0 ? function J(q22) {
    return k0(q22);
  } : j0(), I0 = Object.keys;
  C1.shim = function J() {
    if (Object.keys) {
      var q22 = function() {
        var _ = Object.keys(arguments);
        return _ && _.length === arguments.length;
      }(1, 2);
      if (!q22)
        Object.keys = function _(z) {
          if (DJ(z))
            return I0(MJ.call(z));
          return I0(z);
        };
    } else
      Object.keys = C1;
    return Object.keys || C1;
  };
  v0.exports = C1;
});
var b0 = T((o3, P0) => {
  var RJ = "Function.prototype.bind called on incompatible ", OJ = Object.prototype.toString, AJ = Math.max, CJ = "[object Function]", $0 = function J(q22, _) {
    var z = [];
    for (var Q22 = 0;Q22 < q22.length; Q22 += 1)
      z[Q22] = q22[Q22];
    for (var Z = 0;Z < _.length; Z += 1)
      z[Z + q22.length] = _[Z];
    return z;
  }, xJ = function J(q22, _) {
    var z = [];
    for (var Q22 = _ || 0, Z = 0;Q22 < q22.length; Q22 += 1, Z += 1)
      z[Z] = q22[Q22];
    return z;
  }, TJ = function(J2, q22) {
    var _ = "";
    for (var z = 0;z < J2.length; z += 1)
      if (_ += J2[z], z + 1 < J2.length)
        _ += q22;
    return _;
  };
  P0.exports = function J(q22) {
    var _ = this;
    if (typeof _ !== "function" || OJ.apply(_) !== CJ)
      throw new TypeError(RJ + _);
    var z = xJ(arguments, 1), Q22, Z = function() {
      if (this instanceof Q22) {
        var H = _.apply(this, $0(z, arguments));
        if (Object(H) === H)
          return H;
        return this;
      }
      return _.apply(q22, $0(z, arguments));
    }, G = AJ(0, _.length - z.length), V = [];
    for (var U = 0;U < G; U++)
      V[U] = "$" + U;
    if (Q22 = Function("binder", "return function (" + TJ(V, ",") + "){ return binder.apply(this,arguments); }")(Z), _.prototype) {
      var K2 = function H() {};
      K2.prototype = _.prototype, Q22.prototype = new K2, K2.prototype = null;
    }
    return Q22;
  };
});
var Z1 = T((a3, E0) => {
  var NJ = b0();
  E0.exports = Function.prototype.bind || NJ;
});
var w0 = T((s3, f0) => {
  f0.exports = Error;
});
var m0 = T((i3, y0) => {
  y0.exports = EvalError;
});
var p0 = T((r3, g0) => {
  g0.exports = RangeError;
});
var u0 = T((t3, c0) => {
  c0.exports = ReferenceError;
});
var u1 = T((n3, h0) => {
  h0.exports = SyntaxError;
});
var U1 = T((e3, Y0) => {
  Y0.exports = TypeError;
});
var l0 = T((q5, d0) => {
  d0.exports = URIError;
});
var a0 = T((J5, o0) => {
  o0.exports = function J() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var q22 = {}, _ = Symbol("test"), z = Object(_);
    if (typeof _ === "string")
      return false;
    if (Object.prototype.toString.call(_) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(z) !== "[object Symbol]")
      return false;
    var Q22 = 42;
    q22[_] = Q22;
    for (_ in q22)
      return false;
    if (typeof Object.keys === "function" && Object.keys(q22).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(q22).length !== 0)
      return false;
    var Z = Object.getOwnPropertySymbols(q22);
    if (Z.length !== 1 || Z[0] !== _)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(q22, _))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var G = Object.getOwnPropertyDescriptor(q22, _);
      if (G.value !== Q22 || G.enumerable !== true)
        return false;
    }
    return true;
  };
});
var h1 = T((_5, i0) => {
  var s0 = typeof Symbol !== "undefined" && Symbol, jJ = a0();
  i0.exports = function J() {
    if (typeof s0 !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof s0("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return jJ();
  };
});
var Y1 = T((z5, t0) => {
  var r0 = { foo: {} }, kJ = Object;
  t0.exports = function J() {
    return { __proto__: r0 }.foo === r0.foo && !({ __proto__: null } instanceof kJ);
  };
});
var d1 = T((Q5, n0) => {
  var IJ = Function.prototype.call, vJ = Object.prototype.hasOwnProperty, SJ = Z1();
  n0.exports = SJ.call(IJ, vJ);
});
var G1 = T((Z5, zq) => {
  var A2, $J = w0(), PJ = m0(), bJ = p0(), EJ = u0(), i = u1(), s = U1(), fJ = l0(), _q = Function, l1 = function(J2) {
    try {
      return _q('"use strict"; return (' + J2 + ").constructor;")();
    } catch (q22) {}
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch (J2) {
      h = null;
    }
  var o1 = function() {
    throw new s;
  }, wJ = h ? function() {
    try {
      return arguments.callee, o1;
    } catch (J2) {
      try {
        return h(arguments, "callee").get;
      } catch (q22) {
        return o1;
      }
    }
  }() : o1, o = h1()(), yJ = Y1()(), k = Object.getPrototypeOf || (yJ ? function(J2) {
    return J2.__proto__;
  } : null), a = {}, mJ = typeof Uint8Array === "undefined" || !k ? A2 : k(Uint8Array), Y = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? A2 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? A2 : ArrayBuffer, "%ArrayIteratorPrototype%": o && k ? k([][Symbol.iterator]()) : A2, "%AsyncFromSyncIteratorPrototype%": A2, "%AsyncFunction%": a, "%AsyncGenerator%": a, "%AsyncGeneratorFunction%": a, "%AsyncIteratorPrototype%": a, "%Atomics%": typeof Atomics === "undefined" ? A2 : Atomics, "%BigInt%": typeof BigInt === "undefined" ? A2 : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? A2 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? A2 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? A2 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": $J, "%eval%": eval, "%EvalError%": PJ, "%Float32Array%": typeof Float32Array === "undefined" ? A2 : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? A2 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? A2 : FinalizationRegistry, "%Function%": _q, "%GeneratorFunction%": a, "%Int8Array%": typeof Int8Array === "undefined" ? A2 : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? A2 : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? A2 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": o && k ? k(k([][Symbol.iterator]())) : A2, "%JSON%": typeof JSON === "object" ? JSON : A2, "%Map%": typeof Map === "undefined" ? A2 : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !o || !k ? A2 : k(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? A2 : Promise, "%Proxy%": typeof Proxy === "undefined" ? A2 : Proxy, "%RangeError%": bJ, "%ReferenceError%": EJ, "%Reflect%": typeof Reflect === "undefined" ? A2 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? A2 : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !o || !k ? A2 : k(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? A2 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": o && k ? k(""[Symbol.iterator]()) : A2, "%Symbol%": o ? Symbol : A2, "%SyntaxError%": i, "%ThrowTypeError%": wJ, "%TypedArray%": mJ, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? A2 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? A2 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? A2 : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? A2 : Uint32Array, "%URIError%": fJ, "%WeakMap%": typeof WeakMap === "undefined" ? A2 : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? A2 : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? A2 : WeakSet };
  if (k)
    try {
      null.error;
    } catch (J2) {
      e0 = k(k(J2)), Y["%Error.prototype%"] = e0;
    }
  var e0, gJ = function J(q22) {
    var _;
    if (q22 === "%AsyncFunction%")
      _ = l1("async function () {}");
    else if (q22 === "%GeneratorFunction%")
      _ = l1("function* () {}");
    else if (q22 === "%AsyncGeneratorFunction%")
      _ = l1("async function* () {}");
    else if (q22 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q22 === "%AsyncIteratorPrototype%") {
      var Q22 = J("%AsyncGenerator%");
      if (Q22 && k)
        _ = k(Q22.prototype);
    }
    return Y[q22] = _, _;
  }, qq = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, X1 = Z1(), x1 = d1(), pJ = X1.call(Function.call, Array.prototype.concat), cJ = X1.call(Function.apply, Array.prototype.splice), Jq = X1.call(Function.call, String.prototype.replace), T1 = X1.call(Function.call, String.prototype.slice), uJ = X1.call(Function.call, RegExp.prototype.exec), hJ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, YJ = /\\(\\)?/g, dJ = function J(q22) {
    var _ = T1(q22, 0, 1), z = T1(q22, -1);
    if (_ === "%" && z !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var Q22 = [];
    return Jq(q22, hJ, function(Z, G, V, U) {
      Q22[Q22.length] = V ? Jq(U, YJ, "$1") : G || Z;
    }), Q22;
  }, lJ = function J(q22, _) {
    var z = q22, Q22;
    if (x1(qq, z))
      Q22 = qq[z], z = "%" + Q22[0] + "%";
    if (x1(Y, z)) {
      var Z = Y[z];
      if (Z === a)
        Z = gJ(z);
      if (typeof Z === "undefined" && !_)
        throw new s("intrinsic " + q22 + " exists, but is not available. Please file an issue!");
      return { alias: Q22, name: z, value: Z };
    }
    throw new i("intrinsic " + q22 + " does not exist!");
  };
  zq.exports = function J(q22, _) {
    if (typeof q22 !== "string" || q22.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (uJ(/^%?[^%]*%?$/, q22) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = dJ(q22), Q22 = z.length > 0 ? z[0] : "", Z = lJ("%" + Q22 + "%", _), G = Z.name, V = Z.value, U = false, K2 = Z.alias;
    if (K2)
      Q22 = K2[0], cJ(z, pJ([0, 1], K2));
    for (var H = 1, F22 = true;H < z.length; H += 1) {
      var B22 = z[H], W = T1(B22, 0, 1), L = T1(B22, -1);
      if ((W === '"' || W === "'" || W === "`" || (L === '"' || L === "'" || L === "`")) && W !== L)
        throw new i("property names with quotes must have matching quotes");
      if (B22 === "constructor" || !F22)
        U = true;
      if (Q22 += "." + B22, G = "%" + Q22 + "%", x1(Y, G))
        V = Y[G];
      else if (V != null) {
        if (!(B22 in V)) {
          if (!_)
            throw new s("base intrinsic for " + q22 + " exists, but the property is not available.");
          return;
        }
        if (h && H + 1 >= z.length) {
          var D = h(V, B22);
          if (F22 = !!D, F22 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B22];
        } else
          F22 = x1(V, B22), V = V[B22];
        if (F22 && !U)
          Y[G] = V;
      }
    }
    return V;
  };
});
var j1 = T((U5, Qq) => {
  var oJ = G1(), N1 = oJ("%Object.defineProperty%", true) || false;
  if (N1)
    try {
      N1({}, "a", { value: 1 });
    } catch (J2) {
      N1 = false;
    }
  Qq.exports = N1;
});
var Bq = T((X5, Fq) => {
  var C, e = SyntaxError, Gq = Function, n = TypeError, a1 = function(J2) {
    try {
      return Gq('"use strict"; return (' + J2 + ").constructor;")();
    } catch (q22) {}
  }, d = Object.getOwnPropertyDescriptor;
  if (d)
    try {
      d({}, "");
    } catch (J2) {
      d = null;
    }
  var s1 = function() {
    throw new n;
  }, aJ = d ? function() {
    try {
      return arguments.callee, s1;
    } catch (J2) {
      try {
        return d(arguments, "callee").get;
      } catch (q22) {
        return s1;
      }
    }
  }() : s1, r = h1()(), sJ = Y1()(), I = Object.getPrototypeOf || (sJ ? function(J2) {
    return J2.__proto__;
  } : null), t = {}, iJ = typeof Uint8Array === "undefined" || !I ? C : I(Uint8Array), l = { "%AggregateError%": typeof AggregateError === "undefined" ? C : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? C : ArrayBuffer, "%ArrayIteratorPrototype%": r && I ? I([][Symbol.iterator]()) : C, "%AsyncFromSyncIteratorPrototype%": C, "%AsyncFunction%": t, "%AsyncGenerator%": t, "%AsyncGeneratorFunction%": t, "%AsyncIteratorPrototype%": t, "%Atomics%": typeof Atomics === "undefined" ? C : Atomics, "%BigInt%": typeof BigInt === "undefined" ? C : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? C : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? C : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? C : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? C : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? C : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? C : FinalizationRegistry, "%Function%": Gq, "%GeneratorFunction%": t, "%Int8Array%": typeof Int8Array === "undefined" ? C : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? C : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? C : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": r && I ? I(I([][Symbol.iterator]())) : C, "%JSON%": typeof JSON === "object" ? JSON : C, "%Map%": typeof Map === "undefined" ? C : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !r || !I ? C : I(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? C : Promise, "%Proxy%": typeof Proxy === "undefined" ? C : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? C : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? C : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !r || !I ? C : I(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? C : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": r && I ? I(""[Symbol.iterator]()) : C, "%Symbol%": r ? Symbol : C, "%SyntaxError%": e, "%ThrowTypeError%": aJ, "%TypedArray%": iJ, "%TypeError%": n, "%Uint8Array%": typeof Uint8Array === "undefined" ? C : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? C : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? C : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? C : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? C : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? C : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? C : WeakSet };
  if (I)
    try {
      null.error;
    } catch (J2) {
      Zq = I(I(J2)), l["%Error.prototype%"] = Zq;
    }
  var Zq, rJ = function J(q22) {
    var _;
    if (q22 === "%AsyncFunction%")
      _ = a1("async function () {}");
    else if (q22 === "%GeneratorFunction%")
      _ = a1("function* () {}");
    else if (q22 === "%AsyncGeneratorFunction%")
      _ = a1("async function* () {}");
    else if (q22 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q22 === "%AsyncIteratorPrototype%") {
      var Q22 = J("%AsyncGenerator%");
      if (Q22 && I)
        _ = I(Q22.prototype);
    }
    return l[q22] = _, _;
  }, Uq = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, F1 = Z1(), k1 = d1(), tJ = F1.call(Function.call, Array.prototype.concat), nJ = F1.call(Function.apply, Array.prototype.splice), Xq = F1.call(Function.call, String.prototype.replace), I1 = F1.call(Function.call, String.prototype.slice), eJ = F1.call(Function.call, RegExp.prototype.exec), q3 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, J3 = /\\(\\)?/g, _3 = function J(q22) {
    var _ = I1(q22, 0, 1), z = I1(q22, -1);
    if (_ === "%" && z !== "%")
      throw new e("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new e("invalid intrinsic syntax, expected opening `%`");
    var Q22 = [];
    return Xq(q22, q3, function(Z, G, V, U) {
      Q22[Q22.length] = V ? Xq(U, J3, "$1") : G || Z;
    }), Q22;
  }, z3 = function J(q22, _) {
    var z = q22, Q22;
    if (k1(Uq, z))
      Q22 = Uq[z], z = "%" + Q22[0] + "%";
    if (k1(l, z)) {
      var Z = l[z];
      if (Z === t)
        Z = rJ(z);
      if (typeof Z === "undefined" && !_)
        throw new n("intrinsic " + q22 + " exists, but is not available. Please file an issue!");
      return { alias: Q22, name: z, value: Z };
    }
    throw new e("intrinsic " + q22 + " does not exist!");
  };
  Fq.exports = function J(q22, _) {
    if (typeof q22 !== "string" || q22.length === 0)
      throw new n("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new n('"allowMissing" argument must be a boolean');
    if (eJ(/^%?[^%]*%?$/, q22) === null)
      throw new e("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = _3(q22), Q22 = z.length > 0 ? z[0] : "", Z = z3("%" + Q22 + "%", _), G = Z.name, V = Z.value, U = false, K2 = Z.alias;
    if (K2)
      Q22 = K2[0], nJ(z, tJ([0, 1], K2));
    for (var H = 1, F22 = true;H < z.length; H += 1) {
      var B22 = z[H], W = I1(B22, 0, 1), L = I1(B22, -1);
      if ((W === '"' || W === "'" || W === "`" || (L === '"' || L === "'" || L === "`")) && W !== L)
        throw new e("property names with quotes must have matching quotes");
      if (B22 === "constructor" || !F22)
        U = true;
      if (Q22 += "." + B22, G = "%" + Q22 + "%", k1(l, G))
        V = l[G];
      else if (V != null) {
        if (!(B22 in V)) {
          if (!_)
            throw new n("base intrinsic for " + q22 + " exists, but the property is not available.");
          return;
        }
        if (d && H + 1 >= z.length) {
          var D = d(V, B22);
          if (F22 = !!D, F22 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B22];
        } else
          F22 = k1(V, B22), V = V[B22];
        if (F22 && !U)
          l[G] = V;
      }
    }
    return V;
  };
});
var i1 = T((G5, Vq) => {
  var Q3 = Bq(), v1 = Q3("%Object.getOwnPropertyDescriptor%", true);
  if (v1)
    try {
      v1([], "length");
    } catch (J2) {
      v1 = null;
    }
  Vq.exports = v1;
});
var Wq = T((F5, Lq) => {
  var Kq = j1(), Z3 = u1(), q1 = U1(), Hq = i1();
  Lq.exports = function J(q22, _, z) {
    if (!q22 || typeof q22 !== "object" && typeof q22 !== "function")
      throw new q1("`obj` must be an object or a function`");
    if (typeof _ !== "string" && typeof _ !== "symbol")
      throw new q1("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new q1("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new q1("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new q1("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new q1("`loose`, if provided, must be a boolean");
    var Q22 = arguments.length > 3 ? arguments[3] : null, Z = arguments.length > 4 ? arguments[4] : null, G = arguments.length > 5 ? arguments[5] : null, V = arguments.length > 6 ? arguments[6] : false, U = !!Hq && Hq(q22, _);
    if (Kq)
      Kq(q22, _, { configurable: G === null && U ? U.configurable : !G, enumerable: Q22 === null && U ? U.enumerable : !Q22, value: z, writable: Z === null && U ? U.writable : !Z });
    else if (V || !Q22 && !Z && !G)
      q22[_] = z;
    else
      throw new Z3("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Rq = T((B5, Dq) => {
  var r1 = j1(), Mq = function J() {
    return !!r1;
  };
  Mq.hasArrayLengthDefineBug = function J() {
    if (!r1)
      return null;
    try {
      return r1([], "length", { value: 1 }).length !== 1;
    } catch (q22) {
      return true;
    }
  };
  Dq.exports = Mq;
});
var Tq = T((V5, xq) => {
  var U3 = G1(), Oq = Wq(), X3 = Rq()(), Aq = i1(), Cq = U1(), G3 = U3("%Math.floor%");
  xq.exports = function J(q22, _) {
    if (typeof q22 !== "function")
      throw new Cq("`fn` is not a function");
    if (typeof _ !== "number" || _ < 0 || _ > 4294967295 || G3(_) !== _)
      throw new Cq("`length` must be a positive 32-bit integer");
    var z = arguments.length > 2 && !!arguments[2], Q22 = true, Z = true;
    if ("length" in q22 && Aq) {
      var G = Aq(q22, "length");
      if (G && !G.configurable)
        Q22 = false;
      if (G && !G.writable)
        Z = false;
    }
    if (Q22 || Z || !z)
      if (X3)
        Oq(q22, "length", _, true, true);
      else
        Oq(q22, "length", _);
    return q22;
  };
});
var n1 = T((K5, S1) => {
  var t1 = Z1(), $1 = G1(), F3 = Tq(), B3 = U1(), kq = $1("%Function.prototype.apply%"), Iq = $1("%Function.prototype.call%"), vq = $1("%Reflect.apply%", true) || t1.call(Iq, kq), Nq = j1(), V3 = $1("%Math.max%");
  S1.exports = function J(q22) {
    if (typeof q22 !== "function")
      throw new B3("a function is required");
    var _ = vq(t1, Iq, arguments);
    return F3(_, 1 + V3(0, q22.length - (arguments.length - 1)), true);
  };
  var jq = function J() {
    return vq(t1, kq, arguments);
  };
  if (Nq)
    Nq(S1.exports, "apply", { value: jq });
  else
    S1.exports.apply = jq;
});
var bq = T((H5, Pq) => {
  var Sq = G1(), $q = n1(), K3 = $q(Sq("String.prototype.indexOf"));
  Pq.exports = function J(q22, _) {
    var z = Sq(q22, !!_);
    if (typeof z === "function" && K3(q22, ".prototype.") > -1)
      return $q(z);
    return z;
  };
});
var mq = T((L5, yq) => {
  var P1 = (typeof JSON !== "undefined" ? JSON : K0()).stringify, H3 = L0(), L3 = S0(), W3 = n1(), wq = bq(), Eq = wq("Array.prototype.join"), e1 = wq("Array.prototype.push"), fq = function J(q22, _) {
    var z = "";
    for (var Q22 = 0;Q22 < q22; Q22 += 1)
      z += _;
    return z;
  }, M3 = function(J2, q22, _) {
    return _;
  };
  yq.exports = function J(q22) {
    var _ = arguments.length > 1 ? arguments[1] : undefined, z = _ && _.space || "";
    if (typeof z === "number")
      z = fq(z, " ");
    var Q22 = !!_ && typeof _.cycles === "boolean" && _.cycles, Z = _ && _.replacer ? W3(_.replacer) : M3, G = typeof _ === "function" ? _ : _ && _.cmp, V = G && function(K2) {
      var H = G.length > 2 && function F(B22) {
        return K2[B22];
      };
      return function(F22, B22) {
        return G({ key: F22, value: K2[F22] }, { key: B22, value: K2[B22] }, H ? { __proto__: null, get: H } : undefined);
      };
    }, U = [];
    return function K(H, F22, B22, W) {
      var L = z ? `
` + fq(W, z) : "", D = z ? ": " : ":";
      if (B22 && B22.toJSON && typeof B22.toJSON === "function")
        B22 = B22.toJSON();
      if (B22 = Z(H, F22, B22), B22 === undefined)
        return;
      if (typeof B22 !== "object" || B22 === null)
        return P1(B22);
      if (H3(B22)) {
        var S = [];
        for (var O = 0;O < B22.length; O++) {
          var v = K(B22, O, B22[O], W + 1) || P1(null);
          e1(S, L + z + v);
        }
        return "[" + Eq(S, ",") + L + "]";
      }
      if (U.indexOf(B22) !== -1) {
        if (Q22)
          return P1("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        e1(U, B22);
      var N2 = L3(B22).sort(V && V(B22)), S = [];
      for (var O = 0;O < N2.length; O++) {
        var F22 = N2[O], j = K(B22, F22, B22[F22], W + 1);
        if (!j)
          continue;
        var P = P1(F22) + D + j;
        e1(S, L + z + P);
      }
      return U.splice(U.indexOf(B22), 1), "{" + Eq(S, ",") + L + "}";
    }({ "": q22 }, "", q22, 0);
  };
});
var z0 = XJ(mq(), 1);
var gq = function(J2, q22, _, z) {
  let Q22, Z, G;
  const V = q22 || [0], U = (_ = _ || 0) >>> 3, K2 = z === -1 ? 3 : 0;
  for (Q22 = 0;Q22 < J2.length; Q22 += 1)
    G = Q22 + U, Z = G >>> 2, V.length <= Z && V.push(0), V[Z] |= J2[Q22] << 8 * (K2 + z * (G % 4));
  return { value: V, binLen: 8 * J2.length + _ };
};
var _1 = function(J2, q22, _) {
  switch (q22) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (J2) {
    case "HEX":
      return function(z, Q22, Z) {
        return function(G, V, U, K2) {
          let H, F22, B22, W;
          if (G.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          const L = V || [0], D = (U = U || 0) >>> 3, O = K2 === -1 ? 3 : 0;
          for (H = 0;H < G.length; H += 2) {
            if (F22 = parseInt(G.substr(H, 2), 16), isNaN(F22))
              throw new Error("String of HEX type contains invalid characters");
            for (W = (H >>> 1) + D, B22 = W >>> 2;L.length <= B22; )
              L.push(0);
            L[B22] |= F22 << 8 * (O + K2 * (W % 4));
          }
          return { value: L, binLen: 4 * G.length + U };
        }(z, Q22, Z, _);
      };
    case "TEXT":
      return function(z, Q22, Z) {
        return function(G, V, U, K2, H) {
          let F22, B22, W, L, D, O, v, N2, S = 0;
          const j = U || [0], P = (K2 = K2 || 0) >>> 3;
          if (V === "UTF8")
            for (v = H === -1 ? 3 : 0, W = 0;W < G.length; W += 1)
              for (F22 = G.charCodeAt(W), B22 = [], 128 > F22 ? B22.push(F22) : 2048 > F22 ? (B22.push(192 | F22 >>> 6), B22.push(128 | 63 & F22)) : 55296 > F22 || 57344 <= F22 ? B22.push(224 | F22 >>> 12, 128 | F22 >>> 6 & 63, 128 | 63 & F22) : (W += 1, F22 = 65536 + ((1023 & F22) << 10 | 1023 & G.charCodeAt(W)), B22.push(240 | F22 >>> 18, 128 | F22 >>> 12 & 63, 128 | F22 >>> 6 & 63, 128 | 63 & F22)), L = 0;L < B22.length; L += 1) {
                for (O = S + P, D = O >>> 2;j.length <= D; )
                  j.push(0);
                j[D] |= B22[L] << 8 * (v + H * (O % 4)), S += 1;
              }
          else
            for (v = H === -1 ? 2 : 0, N2 = V === "UTF16LE" && H !== 1 || V !== "UTF16LE" && H === 1, W = 0;W < G.length; W += 1) {
              for (F22 = G.charCodeAt(W), N2 === true && (L = 255 & F22, F22 = L << 8 | F22 >>> 8), O = S + P, D = O >>> 2;j.length <= D; )
                j.push(0);
              j[D] |= F22 << 8 * (v + H * (O % 4)), S += 2;
            }
          return { value: j, binLen: 8 * S + K2 };
        }(z, q22, Q22, Z, _);
      };
    case "B64":
      return function(z, Q22, Z) {
        return function(G, V, U, K2) {
          let H, F22, B22, W, L, D, O, v = 0;
          const N2 = V || [0], S = (U = U || 0) >>> 3, j = K2 === -1 ? 3 : 0, P = G.indexOf("=");
          if (G.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (G = G.replace(/=/g, ""), P !== -1 && P < G.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (F22 = 0;F22 < G.length; F22 += 4) {
            for (L = G.substr(F22, 4), W = 0, B22 = 0;B22 < L.length; B22 += 1)
              H = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(L.charAt(B22)), W |= H << 18 - 6 * B22;
            for (B22 = 0;B22 < L.length - 1; B22 += 1) {
              for (O = v + S, D = O >>> 2;N2.length <= D; )
                N2.push(0);
              N2[D] |= (W >>> 16 - 8 * B22 & 255) << 8 * (j + K2 * (O % 4)), v += 1;
            }
          }
          return { value: N2, binLen: 8 * v + U };
        }(z, Q22, Z, _);
      };
    case "BYTES":
      return function(z, Q22, Z) {
        return function(G, V, U, K2) {
          let H, F22, B22, W;
          const L = V || [0], D = (U = U || 0) >>> 3, O = K2 === -1 ? 3 : 0;
          for (F22 = 0;F22 < G.length; F22 += 1)
            H = G.charCodeAt(F22), W = F22 + D, B22 = W >>> 2, L.length <= B22 && L.push(0), L[B22] |= H << 8 * (O + K2 * (W % 4));
          return { value: L, binLen: 8 * G.length + U };
        }(z, Q22, Z, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (z) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(z, Q22, Z) {
        return function(G, V, U, K2) {
          return gq(new Uint8Array(G), V, U, K2);
        }(z, Q22, Z, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (z) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(z, Q22, Z) {
        return gq(z, Q22, Z, _);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var pq = function(J2, q22, _, z) {
  switch (J2) {
    case "HEX":
      return function(Q22) {
        return function(Z, G, V, U) {
          let H, F22, B22 = "";
          const W = G / 8, L = V === -1 ? 3 : 0;
          for (H = 0;H < W; H += 1)
            F22 = Z[H >>> 2] >>> 8 * (L + V * (H % 4)), B22 += "0123456789abcdef".charAt(F22 >>> 4 & 15) + "0123456789abcdef".charAt(15 & F22);
          return U.outputUpper ? B22.toUpperCase() : B22;
        }(Q22, q22, _, z);
      };
    case "B64":
      return function(Q22) {
        return function(Z, G, V, U) {
          let K2, H, F22, B22, W, L = "";
          const D = G / 8, O = V === -1 ? 3 : 0;
          for (K2 = 0;K2 < D; K2 += 3)
            for (B22 = K2 + 1 < D ? Z[K2 + 1 >>> 2] : 0, W = K2 + 2 < D ? Z[K2 + 2 >>> 2] : 0, F22 = (Z[K2 >>> 2] >>> 8 * (O + V * (K2 % 4)) & 255) << 16 | (B22 >>> 8 * (O + V * ((K2 + 1) % 4)) & 255) << 8 | W >>> 8 * (O + V * ((K2 + 2) % 4)) & 255, H = 0;H < 4; H += 1)
              L += 8 * K2 + 6 * H <= G ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(F22 >>> 6 * (3 - H) & 63) : U.b64Pad;
          return L;
        }(Q22, q22, _, z);
      };
    case "BYTES":
      return function(Q22) {
        return function(Z, G, V) {
          let U, K2, H = "";
          const F22 = G / 8, B22 = V === -1 ? 3 : 0;
          for (U = 0;U < F22; U += 1)
            K2 = Z[U >>> 2] >>> 8 * (B22 + V * (U % 4)) & 255, H += String.fromCharCode(K2);
          return H;
        }(Q22, q22, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (Q22) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(Q22) {
        return function(Z, G, V) {
          let U;
          const K2 = G / 8, H = new ArrayBuffer(K2), F22 = new Uint8Array(H), B22 = V === -1 ? 3 : 0;
          for (U = 0;U < K2; U += 1)
            F22[U] = Z[U >>> 2] >>> 8 * (B22 + V * (U % 4)) & 255;
          return H;
        }(Q22, q22, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (Q22) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(Q22) {
        return function(Z, G, V) {
          let U;
          const K2 = G / 8, H = V === -1 ? 3 : 0, F22 = new Uint8Array(K2);
          for (U = 0;U < K2; U += 1)
            F22[U] = Z[U >>> 2] >>> 8 * (H + V * (U % 4)) & 255;
          return F22;
        }(Q22, q22, _);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var E1 = function(J2, q22) {
  let _, z;
  const Q22 = J2.binLen >>> 3, Z = q22.binLen >>> 3, G = Q22 << 3, V = 4 - Q22 << 3;
  if (Q22 % 4 != 0) {
    for (_ = 0;_ < Z; _ += 4)
      z = Q22 + _ >>> 2, J2.value[z] |= q22.value[_ >>> 2] << G, J2.value.push(0), J2.value[z + 1] |= q22.value[_ >>> 2] >>> V;
    return (J2.value.length << 2) - 4 >= Z + Q22 && J2.value.pop(), { value: J2.value, binLen: J2.binLen + q22.binLen };
  }
  return { value: J2.value.concat(q22.value), binLen: J2.binLen + q22.binLen };
};
var cq = function(J2) {
  const q22 = { outputUpper: false, b64Pad: "=", outputLen: -1 }, _ = J2 || {};
  if (q22.outputUpper = _.outputUpper || false, _.b64Pad && (q22.b64Pad = _.b64Pad), _.outputLen) {
    if (_.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q22.outputLen = _.outputLen;
  } else if (_.shakeLen) {
    if (_.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q22.outputLen = _.shakeLen;
  }
  if (typeof q22.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof q22.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return q22;
};
var c = function(J2, q22, _, z) {
  const Q22 = J2 + " must include a value and format";
  if (!q22) {
    if (!z)
      throw new Error(Q22);
    return z;
  }
  if (q22.value === undefined || !q22.format)
    throw new Error(Q22);
  return _1(q22.format, q22.encoding || "UTF8", _)(q22.value);
};
var J1 = function(J2, q22) {
  return J2 << q22 | J2 >>> 32 - q22;
};
var f = function(J2, q22) {
  return J2 >>> q22 | J2 << 32 - q22;
};
var iq = function(J2, q22) {
  return J2 >>> q22;
};
var uq = function(J2, q22, _) {
  return J2 ^ q22 ^ _;
};
var rq = function(J2, q22, _) {
  return J2 & q22 ^ ~J2 & _;
};
var tq = function(J2, q22, _) {
  return J2 & q22 ^ J2 & _ ^ q22 & _;
};
var D3 = function(J2) {
  return f(J2, 2) ^ f(J2, 13) ^ f(J2, 22);
};
var $2 = function(J2, q22) {
  const _ = (65535 & J2) + (65535 & q22);
  return (65535 & (J2 >>> 16) + (q22 >>> 16) + (_ >>> 16)) << 16 | 65535 & _;
};
var R3 = function(J2, q22, _, z) {
  const Q22 = (65535 & J2) + (65535 & q22) + (65535 & _) + (65535 & z);
  return (65535 & (J2 >>> 16) + (q22 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q22 >>> 16)) << 16 | 65535 & Q22;
};
var V1 = function(J2, q22, _, z, Q22) {
  const Z = (65535 & J2) + (65535 & q22) + (65535 & _) + (65535 & z) + (65535 & Q22);
  return (65535 & (J2 >>> 16) + (q22 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q22 >>> 16) + (Z >>> 16)) << 16 | 65535 & Z;
};
var O3 = function(J2) {
  return f(J2, 7) ^ f(J2, 18) ^ iq(J2, 3);
};
var A3 = function(J2) {
  return f(J2, 6) ^ f(J2, 11) ^ f(J2, 25);
};
var C3 = function(J2) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var nq = function(J2, q22) {
  let _, z, Q22, Z, G, V, U;
  const K2 = [];
  for (_ = q22[0], z = q22[1], Q22 = q22[2], Z = q22[3], G = q22[4], U = 0;U < 80; U += 1)
    K2[U] = U < 16 ? J2[U] : J1(K2[U - 3] ^ K2[U - 8] ^ K2[U - 14] ^ K2[U - 16], 1), V = U < 20 ? V1(J1(_, 5), rq(z, Q22, Z), G, 1518500249, K2[U]) : U < 40 ? V1(J1(_, 5), uq(z, Q22, Z), G, 1859775393, K2[U]) : U < 60 ? V1(J1(_, 5), tq(z, Q22, Z), G, 2400959708, K2[U]) : V1(J1(_, 5), uq(z, Q22, Z), G, 3395469782, K2[U]), G = Z, Z = Q22, Q22 = J1(z, 30), z = _, _ = V;
  return q22[0] = $2(_, q22[0]), q22[1] = $2(z, q22[1]), q22[2] = $2(Q22, q22[2]), q22[3] = $2(Z, q22[3]), q22[4] = $2(G, q22[4]), q22;
};
var x3 = function(J2, q22, _, z) {
  let Q22;
  const Z = 15 + (q22 + 65 >>> 9 << 4), G = q22 + _;
  for (;J2.length <= Z; )
    J2.push(0);
  for (J2[q22 >>> 5] |= 128 << 24 - q22 % 32, J2[Z] = 4294967295 & G, J2[Z - 1] = G / K1 | 0, Q22 = 0;Q22 < J2.length; Q22 += 16)
    z = nq(J2.slice(Q22, Q22 + 16), z);
  return z;
};
var hq = function(J2) {
  let q22;
  return q22 = J2 == "SHA-224" ? m.slice() : g.slice(), q22;
};
var Yq = function(J2, q22) {
  let _, z, Q22, Z, G, V, U, K2, H, F22, B22;
  const W = [];
  for (_ = q22[0], z = q22[1], Q22 = q22[2], Z = q22[3], G = q22[4], V = q22[5], U = q22[6], K2 = q22[7], B22 = 0;B22 < 64; B22 += 1)
    W[B22] = B22 < 16 ? J2[B22] : R3(f(L = W[B22 - 2], 17) ^ f(L, 19) ^ iq(L, 10), W[B22 - 7], O3(W[B22 - 15]), W[B22 - 16]), H = V1(K2, A3(G), rq(G, V, U), M[B22], W[B22]), F22 = $2(D3(_), tq(_, z, Q22)), K2 = U, U = V, V = G, G = $2(Z, H), Z = Q22, Q22 = z, z = _, _ = $2(H, F22);
  var L;
  return q22[0] = $2(_, q22[0]), q22[1] = $2(z, q22[1]), q22[2] = $2(Q22, q22[2]), q22[3] = $2(Z, q22[3]), q22[4] = $2(G, q22[4]), q22[5] = $2(V, q22[5]), q22[6] = $2(U, q22[6]), q22[7] = $2(K2, q22[7]), q22;
};
var dq = function(J2, q22) {
  let _;
  return q22 > 32 ? (_ = 64 - q22, new X(J2.I << q22 | J2.N >>> _, J2.N << q22 | J2.I >>> _)) : q22 !== 0 ? (_ = 32 - q22, new X(J2.N << q22 | J2.I >>> _, J2.I << q22 | J2.N >>> _)) : J2;
};
var w2 = function(J2, q22) {
  let _;
  return q22 < 32 ? (_ = 32 - q22, new X(J2.N >>> q22 | J2.I << _, J2.I >>> q22 | J2.N << _)) : (_ = 64 - q22, new X(J2.I >>> q22 | J2.N << _, J2.N >>> q22 | J2.I << _));
};
var eq = function(J2, q22) {
  return new X(J2.N >>> q22, J2.I >>> q22 | J2.N << 32 - q22);
};
var j3 = function(J2, q22, _) {
  return new X(J2.N & q22.N ^ J2.N & _.N ^ q22.N & _.N, J2.I & q22.I ^ J2.I & _.I ^ q22.I & _.I);
};
var k3 = function(J2) {
  const q22 = w2(J2, 28), _ = w2(J2, 34), z = w2(J2, 39);
  return new X(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var E = function(J2, q22) {
  let _, z;
  _ = (65535 & J2.I) + (65535 & q22.I), z = (J2.I >>> 16) + (q22.I >>> 16) + (_ >>> 16);
  const Q22 = (65535 & z) << 16 | 65535 & _;
  return _ = (65535 & J2.N) + (65535 & q22.N) + (z >>> 16), z = (J2.N >>> 16) + (q22.N >>> 16) + (_ >>> 16), new X((65535 & z) << 16 | 65535 & _, Q22);
};
var I3 = function(J2, q22, _, z) {
  let Q22, Z;
  Q22 = (65535 & J2.I) + (65535 & q22.I) + (65535 & _.I) + (65535 & z.I), Z = (J2.I >>> 16) + (q22.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q22 >>> 16);
  const G = (65535 & Z) << 16 | 65535 & Q22;
  return Q22 = (65535 & J2.N) + (65535 & q22.N) + (65535 & _.N) + (65535 & z.N) + (Z >>> 16), Z = (J2.N >>> 16) + (q22.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q22 >>> 16), new X((65535 & Z) << 16 | 65535 & Q22, G);
};
var v3 = function(J2, q22, _, z, Q22) {
  let Z, G;
  Z = (65535 & J2.I) + (65535 & q22.I) + (65535 & _.I) + (65535 & z.I) + (65535 & Q22.I), G = (J2.I >>> 16) + (q22.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q22.I >>> 16) + (Z >>> 16);
  const V = (65535 & G) << 16 | 65535 & Z;
  return Z = (65535 & J2.N) + (65535 & q22.N) + (65535 & _.N) + (65535 & z.N) + (65535 & Q22.N) + (G >>> 16), G = (J2.N >>> 16) + (q22.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q22.N >>> 16) + (Z >>> 16), new X((65535 & G) << 16 | 65535 & Z, V);
};
var B1 = function(J2, q22) {
  return new X(J2.N ^ q22.N, J2.I ^ q22.I);
};
var S3 = function(J2) {
  const q22 = w2(J2, 19), _ = w2(J2, 61), z = eq(J2, 6);
  return new X(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var $3 = function(J2) {
  const q22 = w2(J2, 1), _ = w2(J2, 8), z = eq(J2, 7);
  return new X(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var P3 = function(J2) {
  const q22 = w2(J2, 14), _ = w2(J2, 18), z = w2(J2, 41);
  return new X(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var lq = function(J2) {
  return J2 === "SHA-384" ? [new X(3418070365, m[0]), new X(1654270250, m[1]), new X(2438529370, m[2]), new X(355462360, m[3]), new X(1731405415, m[4]), new X(41048885895, m[5]), new X(3675008525, m[6]), new X(1203062813, m[7])] : [new X(g[0], 4089235720), new X(g[1], 2227873595), new X(g[2], 4271175723), new X(g[3], 1595750129), new X(g[4], 2917565137), new X(g[5], 725511199), new X(g[6], 4215389547), new X(g[7], 327033209)];
};
var oq = function(J2, q22) {
  let _, z, Q22, Z, G, V, U, K2, H, F22, B22, W;
  const L = [];
  for (_ = q22[0], z = q22[1], Q22 = q22[2], Z = q22[3], G = q22[4], V = q22[5], U = q22[6], K2 = q22[7], B22 = 0;B22 < 80; B22 += 1)
    B22 < 16 ? (W = 2 * B22, L[B22] = new X(J2[W], J2[W + 1])) : L[B22] = I3(S3(L[B22 - 2]), L[B22 - 7], $3(L[B22 - 15]), L[B22 - 16]), H = v3(K2, P3(G), (O = V, v = U, new X((D = G).N & O.N ^ ~D.N & v.N, D.I & O.I ^ ~D.I & v.I)), b3[B22], L[B22]), F22 = E(k3(_), j3(_, z, Q22)), K2 = U, U = V, V = G, G = E(Z, H), Z = Q22, Q22 = z, z = _, _ = E(H, F22);
  var D, O, v;
  return q22[0] = E(_, q22[0]), q22[1] = E(z, q22[1]), q22[2] = E(Q22, q22[2]), q22[3] = E(Z, q22[3]), q22[4] = E(G, q22[4]), q22[5] = E(V, q22[5]), q22[6] = E(U, q22[6]), q22[7] = E(K2, q22[7]), q22;
};
var J0 = function(J2) {
  let q22;
  const _ = [];
  for (q22 = 0;q22 < 5; q22 += 1)
    _[q22] = [new X(0, 0), new X(0, 0), new X(0, 0), new X(0, 0), new X(0, 0)];
  return _;
};
var y3 = function(J2) {
  let q22;
  const _ = [];
  for (q22 = 0;q22 < 5; q22 += 1)
    _[q22] = J2[q22].slice();
  return _;
};
var b1 = function(J2, q22) {
  let _, z, Q22, Z;
  const G = [], V = [];
  if (J2 !== null)
    for (z = 0;z < J2.length; z += 2)
      q22[(z >>> 1) % 5][(z >>> 1) / 5 | 0] = B1(q22[(z >>> 1) % 5][(z >>> 1) / 5 | 0], new X(J2[z + 1], J2[z]));
  for (_ = 0;_ < 24; _ += 1) {
    for (Z = J0(), z = 0;z < 5; z += 1)
      G[z] = (U = q22[z][0], K2 = q22[z][1], H = q22[z][2], F22 = q22[z][3], B22 = q22[z][4], new X(U.N ^ K2.N ^ H.N ^ F22.N ^ B22.N, U.I ^ K2.I ^ H.I ^ F22.I ^ B22.I));
    for (z = 0;z < 5; z += 1)
      V[z] = B1(G[(z + 4) % 5], dq(G[(z + 1) % 5], 1));
    for (z = 0;z < 5; z += 1)
      for (Q22 = 0;Q22 < 5; Q22 += 1)
        q22[z][Q22] = B1(q22[z][Q22], V[z]);
    for (z = 0;z < 5; z += 1)
      for (Q22 = 0;Q22 < 5; Q22 += 1)
        Z[Q22][(2 * z + 3 * Q22) % 5] = dq(q22[z][Q22], w3[z][Q22]);
    for (z = 0;z < 5; z += 1)
      for (Q22 = 0;Q22 < 5; Q22 += 1)
        q22[z][Q22] = B1(Z[z][Q22], new X(~Z[(z + 1) % 5][Q22].N & Z[(z + 2) % 5][Q22].N, ~Z[(z + 1) % 5][Q22].I & Z[(z + 2) % 5][Q22].I));
    q22[0][0] = B1(q22[0][0], f3[_]);
  }
  var U, K2, H, F22, B22;
  return q22;
};
var qJ = function(J2) {
  let q22, _, z = 0;
  const Q22 = [0, 0], Z = [4294967295 & J2, J2 / K1 & 2097151];
  for (q22 = 6;q22 >= 0; q22--)
    _ = Z[q22 >> 2] >>> 8 * q22 & 255, _ === 0 && z === 0 || (Q22[z + 1 >> 2] |= _ << 8 * (z + 1), z += 1);
  return z = z !== 0 ? z : 1, Q22[0] |= z, { value: z + 1 > 4 ? Q22 : [Q22[0]], binLen: 8 + 8 * z };
};
var q0 = function(J2) {
  return E1(qJ(J2.binLen), J2);
};
var aq = function(J2, q22) {
  let _, z = qJ(q22);
  z = E1(z, J2);
  const Q22 = q22 >>> 2, Z = (Q22 - z.value.length % Q22) % Q22;
  for (_ = 0;_ < Z; _++)
    z.value.push(0);
  return z.value;
};
var K1 = 4294967296;
var M = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var m = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var g = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var H1 = "Chosen SHA variant is not supported";
var sq = "Cannot set numRounds with MAC";

class L1 {
  constructor(J2, q22, _) {
    const z = _ || {};
    if (this.t = q22, this.i = z.encoding || "UTF8", this.numRounds = z.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = J2, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(J2) {
    let q22, _ = 0;
    const z = this.m >>> 5, Q22 = this.C(J2, this.h, this.u), Z = Q22.binLen, G = Q22.value, V = Z >>> 5;
    for (q22 = 0;q22 < V; q22 += z)
      _ + this.m <= Z && (this.U = this.v(G.slice(q22, q22 + z), this.U), _ += this.m);
    return this.A += _, this.h = G.slice(_ >>> 5), this.u = Z % this.m, this.l = true, this;
  }
  getHash(J2, q22) {
    let _, z, Q22 = this.R;
    const Z = cq(q22);
    if (this.K) {
      if (Z.outputLen === -1)
        throw new Error("Output length must be specified in options");
      Q22 = Z.outputLen;
    }
    const G = pq(J2, Q22, this.T, Z);
    if (this.H && this.g)
      return G(this.g(Z));
    for (z = this.F(this.h.slice(), this.u, this.A, this.L(this.U), Q22), _ = 1;_ < this.numRounds; _ += 1)
      this.K && Q22 % 32 != 0 && (z[z.length - 1] &= 16777215 >>> 24 - Q22 % 32), z = this.F(z, Q22, 0, this.B(this.o), Q22);
    return G(z);
  }
  setHMACKey(J2, q22, _) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    const z = _1(q22, (_ || {}).encoding || "UTF8", this.T);
    this.k(z(J2));
  }
  k(J2) {
    const q22 = this.m >>> 3, _ = q22 / 4 - 1;
    let z;
    if (this.numRounds !== 1)
      throw new Error(sq);
    if (this.H)
      throw new Error("MAC key already set");
    for (q22 < J2.binLen / 8 && (J2.value = this.F(J2.value, J2.binLen, 0, this.B(this.o), this.R));J2.value.length <= _; )
      J2.value.push(0);
    for (z = 0;z <= _; z += 1)
      this.S[z] = 909522486 ^ J2.value[z], this.p[z] = 1549556828 ^ J2.value[z];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(J2, q22) {
    const _ = cq(q22);
    return pq(J2, this.R, this.T, _)(this.Y());
  }
  Y() {
    let J2;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    const q22 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return J2 = this.v(this.p, this.B(this.o)), J2 = this.F(q22, this.R, this.m, J2, this.R), J2;
  }
}
var T3 = class extends L1 {
  constructor(J2, q22, _) {
    if (J2 !== "SHA-1")
      throw new Error(H1);
    super(J2, q22, _);
    const z = _ || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = _1(this.t, this.i, this.T), this.v = nq, this.L = function(Q22) {
      return Q22.slice();
    }, this.B = C3, this.F = x3, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, z.hmacKey && this.k(c("hmacKey", z.hmacKey, this.T));
  }
};
var N3 = class extends L1 {
  constructor(J2, q22, _) {
    if (J2 !== "SHA-224" && J2 !== "SHA-256")
      throw new Error(H1);
    super(J2, q22, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _1(this.t, this.i, this.T), this.v = Yq, this.L = function(Q22) {
      return Q22.slice();
    }, this.B = hq, this.F = function(Q22, Z, G, V) {
      return function(U, K2, H, F22, B22) {
        let W, L;
        const D = 15 + (K2 + 65 >>> 9 << 4), O = K2 + H;
        for (;U.length <= D; )
          U.push(0);
        for (U[K2 >>> 5] |= 128 << 24 - K2 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K1 | 0, W = 0;W < U.length; W += 16)
          F22 = Yq(U.slice(W, W + 16), F22);
        return L = B22 === "SHA-224" ? [F22[0], F22[1], F22[2], F22[3], F22[4], F22[5], F22[6]] : F22, L;
      }(Q22, Z, G, V, J2);
    }, this.U = hq(J2), this.m = 512, this.R = J2 === "SHA-224" ? 224 : 256, this.K = false, z.hmacKey && this.k(c("hmacKey", z.hmacKey, this.T));
  }
};

class X {
  constructor(J2, q22) {
    this.N = J2, this.I = q22;
  }
}
var b3 = [new X(M[0], 3609767458), new X(M[1], 602891725), new X(M[2], 3964484399), new X(M[3], 2173295548), new X(M[4], 4081628472), new X(M[5], 3053834265), new X(M[6], 2937671579), new X(M[7], 3664609560), new X(M[8], 2734883394), new X(M[9], 1164996542), new X(M[10], 1323610764), new X(M[11], 3590304994), new X(M[12], 4068182383), new X(M[13], 991336113), new X(M[14], 633803317), new X(M[15], 3479774868), new X(M[16], 2666613458), new X(M[17], 944711139), new X(M[18], 2341262773), new X(M[19], 2007800933), new X(M[20], 1495990901), new X(M[21], 1856431235), new X(M[22], 3175218132), new X(M[23], 2198950837), new X(M[24], 3999719339), new X(M[25], 766784016), new X(M[26], 2566594879), new X(M[27], 3203337956), new X(M[28], 1034457026), new X(M[29], 2466948901), new X(M[30], 3758326383), new X(M[31], 168717936), new X(M[32], 1188179964), new X(M[33], 1546045734), new X(M[34], 1522805485), new X(M[35], 2643833823), new X(M[36], 2343527390), new X(M[37], 1014477480), new X(M[38], 1206759142), new X(M[39], 344077627), new X(M[40], 1290863460), new X(M[41], 3158454273), new X(M[42], 3505952657), new X(M[43], 106217008), new X(M[44], 3606008344), new X(M[45], 1432725776), new X(M[46], 1467031594), new X(M[47], 851169720), new X(M[48], 3100823752), new X(M[49], 1363258195), new X(M[50], 3750685593), new X(M[51], 3785050280), new X(M[52], 3318307427), new X(M[53], 3812723403), new X(M[54], 2003034995), new X(M[55], 3602036899), new X(M[56], 1575990012), new X(M[57], 1125592928), new X(M[58], 2716904306), new X(M[59], 442776044), new X(M[60], 593698344), new X(M[61], 3733110249), new X(M[62], 2999351573), new X(M[63], 3815920427), new X(3391569614, 3928383900), new X(3515267271, 566280711), new X(3940187606, 3454069534), new X(4118630271, 4000239992), new X(116418474, 1914138554), new X(174292421, 2731055270), new X(289380356, 3203993006), new X(460393269, 320620315), new X(685471733, 587496836), new X(852142971, 1086792851), new X(1017036298, 365543100), new X(1126000580, 2618297676), new X(1288033470, 3409855158), new X(1501505948, 4234509866), new X(1607167915, 987167468), new X(1816402316, 1246189591)];
var E3 = class extends L1 {
  constructor(J2, q22, _) {
    if (J2 !== "SHA-384" && J2 !== "SHA-512")
      throw new Error(H1);
    super(J2, q22, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _1(this.t, this.i, this.T), this.v = oq, this.L = function(Q22) {
      return Q22.slice();
    }, this.B = lq, this.F = function(Q22, Z, G, V) {
      return function(U, K2, H, F22, B22) {
        let W, L;
        const D = 31 + (K2 + 129 >>> 10 << 5), O = K2 + H;
        for (;U.length <= D; )
          U.push(0);
        for (U[K2 >>> 5] |= 128 << 24 - K2 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K1 | 0, W = 0;W < U.length; W += 32)
          F22 = oq(U.slice(W, W + 32), F22);
        return L = B22 === "SHA-384" ? [F22[0].N, F22[0].I, F22[1].N, F22[1].I, F22[2].N, F22[2].I, F22[3].N, F22[3].I, F22[4].N, F22[4].I, F22[5].N, F22[5].I] : [F22[0].N, F22[0].I, F22[1].N, F22[1].I, F22[2].N, F22[2].I, F22[3].N, F22[3].I, F22[4].N, F22[4].I, F22[5].N, F22[5].I, F22[6].N, F22[6].I, F22[7].N, F22[7].I], L;
      }(Q22, Z, G, V, J2);
    }, this.U = lq(J2), this.m = 1024, this.R = J2 === "SHA-384" ? 384 : 512, this.K = false, z.hmacKey && this.k(c("hmacKey", z.hmacKey, this.T));
  }
};
var f3 = [new X(0, 1), new X(0, 32898), new X(2147483648, 32906), new X(2147483648, 2147516416), new X(0, 32907), new X(0, 2147483649), new X(2147483648, 2147516545), new X(2147483648, 32777), new X(0, 138), new X(0, 136), new X(0, 2147516425), new X(0, 2147483658), new X(0, 2147516555), new X(2147483648, 139), new X(2147483648, 32905), new X(2147483648, 32771), new X(2147483648, 32770), new X(2147483648, 128), new X(0, 32778), new X(2147483648, 2147483658), new X(2147483648, 2147516545), new X(2147483648, 32896), new X(0, 2147483649), new X(2147483648, 2147516424)];
var w3 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var m3 = class extends L1 {
  constructor(J2, q22, _) {
    let z = 6, Q22 = 0;
    super(J2, q22, _);
    const Z = _ || {};
    if (this.numRounds !== 1) {
      if (Z.kmacKey || Z.hmacKey)
        throw new Error(sq);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = _1(this.t, this.i, this.T), this.v = b1, this.L = y3, this.B = J0, this.U = J0(), this.K = false, J2) {
      case "SHA3-224":
        this.m = Q22 = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = Q22 = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = Q22 = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = Q22 = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        z = 31, this.m = Q22 = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        z = 31, this.m = Q22 = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        z = 4, this.m = Q22 = 1344, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        z = 4, this.m = Q22 = 1088, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = Q22 = 1344, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = Q22 = 1088, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(H1);
    }
    this.F = function(G, V, U, K2, H) {
      return function(F22, B22, W, L, D, O, v) {
        let N2, S, j = 0;
        const P = [], W1 = D >>> 5, _J = B22 >>> 5;
        for (N2 = 0;N2 < _J && B22 >= D; N2 += W1)
          L = b1(F22.slice(N2, N2 + W1), L), B22 -= D;
        for (F22 = F22.slice(N2), B22 %= D;F22.length < W1; )
          F22.push(0);
        for (N2 = B22 >>> 3, F22[N2 >> 2] ^= O << N2 % 4 * 8, F22[W1 - 1] ^= 2147483648, L = b1(F22, L);32 * P.length < v && (S = L[j % 5][j / 5 | 0], P.push(S.I), !(32 * P.length >= v)); )
          P.push(S.N), j += 1, 64 * j % D == 0 && (b1(null, L), j = 0);
        return P;
      }(G, V, 0, K2, Q22, z, H);
    }, Z.hmacKey && this.k(c("hmacKey", Z.hmacKey, this.T));
  }
  O(J2, q22) {
    const _ = function(Q22) {
      const Z = Q22 || {};
      return { funcName: c("funcName", Z.funcName, 1, { value: [], binLen: 0 }), customization: c("Customization", Z.customization, 1, { value: [], binLen: 0 }) };
    }(J2 || {});
    q22 && (_.funcName = q22);
    const z = E1(q0(_.funcName), q0(_.customization));
    if (_.customization.binLen !== 0 || _.funcName.binLen !== 0) {
      const Q22 = aq(z, this.m >>> 3);
      for (let Z = 0;Z < Q22.length; Z += this.m >>> 5)
        this.U = this.v(Q22.slice(Z, Z + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(J2) {
    const q22 = function(z) {
      const Q22 = z || {};
      return { kmacKey: c("kmacKey", Q22.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: c("Customization", Q22.customization, 1, { value: [], binLen: 0 }) };
    }(J2 || {});
    this.O(J2, q22.funcName);
    const _ = aq(q0(q22.kmacKey), this.m >>> 3);
    for (let z = 0;z < _.length; z += this.m >>> 5)
      this.U = this.v(_.slice(z, z + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(J2) {
    const q22 = E1({ value: this.h.slice(), binLen: this.u }, function(_) {
      let z, Q22, Z = 0;
      const G = [0, 0], V = [4294967295 & _, _ / K1 & 2097151];
      for (z = 6;z >= 0; z--)
        Q22 = V[z >> 2] >>> 8 * z & 255, Q22 === 0 && Z === 0 || (G[Z >> 2] |= Q22 << 8 * Z, Z += 1);
      return Z = Z !== 0 ? Z : 1, G[Z >> 2] |= Z << 8 * Z, { value: Z + 1 > 4 ? G : [G[0]], binLen: 8 + 8 * Z };
    }(J2.outputLen));
    return this.F(q22.value, q22.binLen, this.A, this.L(this.U), J2.outputLen);
  }
};

class _0 {
  constructor(J2, q22, _) {
    if (J2 == "SHA-1")
      this.P = new T3(J2, q22, _);
    else if (J2 == "SHA-224" || J2 == "SHA-256")
      this.P = new N3(J2, q22, _);
    else if (J2 == "SHA-384" || J2 == "SHA-512")
      this.P = new E3(J2, q22, _);
    else {
      if (J2 != "SHA3-224" && J2 != "SHA3-256" && J2 != "SHA3-384" && J2 != "SHA3-512" && J2 != "SHAKE128" && J2 != "SHAKE256" && J2 != "CSHAKE128" && J2 != "CSHAKE256" && J2 != "KMAC128" && J2 != "KMAC256")
        throw new Error(H1);
      this.P = new m3(J2, q22, _);
    }
  }
  update(J2) {
    return this.P.update(J2), this;
  }
  getHash(J2, q22) {
    return this.P.getHash(J2, q22);
  }
  setHMACKey(J2, q22, _) {
    this.P.setHMACKey(J2, q22, _);
  }
  getHMAC(J2, q22) {
    return this.P.getHMAC(J2, q22);
  }
}
var f1 = function(J2, q22, _ = 0) {
  const z = z0.default({ ...J2, signature: undefined }), Q22 = q22.noTimeWindow ? 0 : Math.floor(Date.now() / (q22.timeWindow ?? JJ)) + _;
  return new _0("SHA-256", "TEXT", { encoding: "UTF8" }).update(z).update(z0.default(q22)).update(`${Q22}`).getHash("B64");
};
function x5(J2, q22) {
  return (q22.noTimeWindow ? 0 : q22.timeWindow ?? JJ) ? J2.signature === f1(J2, q22) || J2.signature === f1(J2, q22, -1) : J2.signature === f1(J2, q22);
}
var JJ = 5000;

class Processor {
  sendUpdate;
  constructor(sendUpdate) {
    this.sendUpdate = sendUpdate;
  }
  performCycle(context) {
    this.sendUpdateBlob(context);
    return commitUpdates2(context.root, context.properties);
  }
  async sendUpdateBlob(context) {
    const blobs = {};
    const outgoingUpdates = context.outgoingUpdates;
    context.outgoingUpdates = [];
    if (outgoingUpdates?.length) {
      for (let update of outgoingUpdates) {
        update.path = this.#fixPath(update.path, context);
        const previous = getLeafObject2(context.root, update.path.split("/"), 0, false);
        update.value = typeof update.value === "function" ? update.value(previous) : update.value;
      }
      const confirmedUpdates = outgoingUpdates.filter((update) => update.confirmed).map((update) => ({ ...update }));
      this.#addIncomingUpdates(confirmedUpdates, context);
      for (let update of outgoingUpdates) {
        update.value = await tt2(update.value, blobs);
      }
      if (outgoingUpdates.length) {
        const blob = packageUpdates2(outgoingUpdates, blobs, context.secret);
        this.sendUpdate(blob, context);
      }
    }
  }
  async processBlob(data, context) {
    const { payload, blobs } = data instanceof Blob ? await receiveBlob2(data) : { payload: typeof data === "string" ? JSON.parse(data) : data, blobs: {} };
    const secret = context.secret ?? payload.secret;
    if (secret) {
      if (!context.skipValidation && !x5(payload, { secret })) {
        console.error("Invalid signature");
        return;
      }
      context.secret = secret;
    }
    const hasBlobs = blobs && Object.keys(blobs).length > 0;
    if (payload?.globalTime) {
      context.localTimeOffset = payload.globalTime - Date.now();
    }
    if (payload?.myClientId) {
      context.clientId = payload.myClientId;
    }
    if (payload?.updates) {
      if (hasBlobs) {
        payload.updates.forEach((update) => {
          update.value = ht2(update.value, blobs);
        });
      }
      this.#addIncomingUpdates(payload.updates, context);
    }
  }
  #addIncomingUpdates(updates, context) {
    context.root.updates = context.root.updates ?? [];
    context.root.updates.push(...updates);
  }
  #fixPath(path, context) {
    const split = path.split("/");
    return split.map((part) => translateValue2(part, {
      self: context.clientId
    })).join("/");
  }
}

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
    const newValues = this.paths.map((path, index) => updates && (path in updates) ? updates[path] : getLeafObject2(context.root, this.#partsArrays[index], 0, false, context.properties));
    if (this.#previousValues.every((prev, index) => {
      const newValue = newValues[index];
      if (prev === newValue) {
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
    const newValues = !this.paths.length ? [] : this.#valuesChanged(context, this.initialized ? updates : {});
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

class ObserverManager {
  #observers = new Set;
  observe(paths, multi) {
    const observer = new Observer(paths, this, multi);
    this.#observers.add(observer);
    return observer;
  }
  triggerObservers(context, updates) {
    this.#observers.forEach((o) => o.triggerIfChanged(context, updates));
  }
  removeObserver(observer) {
    this.#observers.delete(observer);
  }
  close() {
    this.#observers.forEach((o) => o.close());
  }
}
var zJ2 = Object.create;
var { defineProperty: Q02, getPrototypeOf: QJ2, getOwnPropertyNames: ZJ2 } = Object;
var UJ2 = Object.prototype.hasOwnProperty;
var XJ2 = (J2, q3, _) => {
  _ = J2 != null ? zJ2(QJ2(J2)) : {};
  const z = q3 || !J2 || !J2.__esModule ? Q02(_, "default", { value: J2, enumerable: true }) : _;
  for (let Q3 of ZJ2(J2))
    if (!UJ2.call(z, Q3))
      Q02(z, Q3, { get: () => J2[Q3], enumerable: true });
  return z;
};
var T2 = (J2, q3) => () => (q3 || J2((q3 = { exports: {} }).exports, q3), q3.exports);
var F02 = T2((p3, G0) => {
  var p = function(J2) {
    throw { name: "SyntaxError", message: J2, at: M1, text: w1 };
  }, x = function(J2) {
    if (J2 && J2 !== R2)
      p("Expected '" + J2 + "' instead of '" + R2 + "'");
    return R2 = w1.charAt(M1), M1 += 1, R2;
  }, U0 = function() {
    var J2, q3 = "";
    if (R2 === "-")
      q3 = "-", x("-");
    while (R2 >= "0" && R2 <= "9")
      q3 += R2, x();
    if (R2 === ".") {
      q3 += ".";
      while (x() && R2 >= "0" && R2 <= "9")
        q3 += R2;
    }
    if (R2 === "e" || R2 === "E") {
      if (q3 += R2, x(), R2 === "-" || R2 === "+")
        q3 += R2, x();
      while (R2 >= "0" && R2 <= "9")
        q3 += R2, x();
    }
    if (J2 = Number(q3), !isFinite(J2))
      p("Bad number");
    return J2;
  }, X0 = function() {
    var J2, q3, _ = "", z;
    if (R2 === '"')
      while (x())
        if (R2 === '"')
          return x(), _;
        else if (R2 === "\\")
          if (x(), R2 === "u") {
            z = 0;
            for (q3 = 0;q3 < 4; q3 += 1) {
              if (J2 = parseInt(x(), 16), !isFinite(J2))
                break;
              z = z * 16 + J2;
            }
            _ += String.fromCharCode(z);
          } else if (typeof Z0[R2] === "string")
            _ += Z0[R2];
          else
            break;
        else
          _ += R2;
    p("Bad string");
  }, y4 = function() {
    while (R2 && R2 <= " ")
      x();
  }, GJ = function() {
    switch (R2) {
      case "t":
        return x("t"), x("r"), x("u"), x("e"), true;
      case "f":
        return x("f"), x("a"), x("l"), x("s"), x("e"), false;
      case "n":
        return x("n"), x("u"), x("l"), x("l"), null;
      default:
        p("Unexpected '" + R2 + "'");
    }
  }, FJ = function() {
    var J2 = [];
    if (R2 === "[") {
      if (x("["), y4(), R2 === "]")
        return x("]"), J2;
      while (R2) {
        if (J2.push(D1()), y4(), R2 === "]")
          return x("]"), J2;
        x(","), y4();
      }
    }
    p("Bad array");
  }, BJ = function() {
    var J2, q3 = {};
    if (R2 === "{") {
      if (x("{"), y4(), R2 === "}")
        return x("}"), q3;
      while (R2) {
        if (J2 = X0(), y4(), x(":"), Object.prototype.hasOwnProperty.call(q3, J2))
          p('Duplicate key "' + J2 + '"');
        if (q3[J2] = D1(), y4(), R2 === "}")
          return x("}"), q3;
        x(","), y4();
      }
    }
    p("Bad object");
  }, D1 = function() {
    switch (y4(), R2) {
      case "{":
        return BJ();
      case "[":
        return FJ();
      case '"':
        return X0();
      case "-":
        return U0();
      default:
        return R2 >= "0" && R2 <= "9" ? U0() : GJ();
    }
  }, M1, R2, Z0 = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, w1;
  G0.exports = function(J2, q3) {
    var _;
    if (w1 = J2, M1 = 0, R2 = " ", _ = D1(), y4(), R2)
      p("Syntax error");
    return typeof q3 === "function" ? function z(Q3, Z) {
      var G, V, U = Q3[Z];
      if (U && typeof U === "object") {
        for (G in D1)
          if (Object.prototype.hasOwnProperty.call(U, G))
            if (V = z(U, G), typeof V === "undefined")
              delete U[G];
            else
              U[G] = V;
      }
      return q3.call(Q3, Z, U);
    }({ "": _ }, "") : _;
  };
});
var V02 = T2((c3, B0) => {
  var m1 = function(J2) {
    return y1.lastIndex = 0, y1.test(J2) ? '"' + J2.replace(y1, function(q3) {
      var _ = VJ[q3];
      return typeof _ === "string" ? _ : "\\u" + ("0000" + q3.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + J2 + '"';
  }, O1 = function(J2, q3) {
    var _, z, Q3, Z, G = b2, V, U = q3[J2];
    if (U && typeof U === "object" && typeof U.toJSON === "function")
      U = U.toJSON(J2);
    if (typeof u === "function")
      U = u.call(q3, J2, U);
    switch (typeof U) {
      case "string":
        return m1(U);
      case "number":
        return isFinite(U) ? String(U) : "null";
      case "boolean":
      case "null":
        return String(U);
      case "object":
        if (!U)
          return "null";
        if (b2 += R1, V = [], Object.prototype.toString.apply(U) === "[object Array]") {
          Z = U.length;
          for (_ = 0;_ < Z; _ += 1)
            V[_] = O1(_, U) || "null";
          return Q3 = V.length === 0 ? "[]" : b2 ? `[
` + b2 + V.join(`,
` + b2) + `
` + G + "]" : "[" + V.join(",") + "]", b2 = G, Q3;
        }
        if (u && typeof u === "object") {
          Z = u.length;
          for (_ = 0;_ < Z; _ += 1)
            if (z = u[_], typeof z === "string") {
              if (Q3 = O1(z, U), Q3)
                V.push(m1(z) + (b2 ? ": " : ":") + Q3);
            }
        } else
          for (z in U)
            if (Object.prototype.hasOwnProperty.call(U, z)) {
              if (Q3 = O1(z, U), Q3)
                V.push(m1(z) + (b2 ? ": " : ":") + Q3);
            }
        return Q3 = V.length === 0 ? "{}" : b2 ? `{
` + b2 + V.join(`,
` + b2) + `
` + G + "}" : "{" + V.join(",") + "}", b2 = G, Q3;
      default:
    }
  }, y1 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b2, R1, VJ = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, u;
  B0.exports = function(J2, q3, _) {
    var z;
    if (b2 = "", R1 = "", typeof _ === "number")
      for (z = 0;z < _; z += 1)
        R1 += " ";
    else if (typeof _ === "string")
      R1 = _;
    if (u = q3, q3 && typeof q3 !== "function" && (typeof q3 !== "object" || typeof q3.length !== "number"))
      throw new Error("JSON.stringify");
    return O1("", { "": J2 });
  };
});
var K02 = T2((KJ) => {
  KJ.parse = F02();
  KJ.stringify = V02();
});
var L02 = T2((h3, H0) => {
  var WJ = {}.toString;
  H0.exports = Array.isArray || function(J2) {
    return WJ.call(J2) == "[object Array]";
  };
});
var g12 = T2((Y3, M0) => {
  var W0 = Object.prototype.toString;
  M0.exports = function J(q3) {
    var _ = W0.call(q3), z = _ === "[object Arguments]";
    if (!z)
      z = _ !== "[object Array]" && q3 !== null && typeof q3 === "object" && typeof q3.length === "number" && q3.length >= 0 && W0.call(q3.callee) === "[object Function]";
    return z;
  };
});
var j02 = T2((d3, N0) => {
  var T0;
  if (!Object.keys)
    z1 = Object.prototype.hasOwnProperty, p1 = Object.prototype.toString, D0 = g12(), c1 = Object.prototype.propertyIsEnumerable, R0 = !c1.call({ toString: null }, "toString"), O0 = c1.call(function() {}, "prototype"), Q1 = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], A1 = function(J2) {
      var q3 = J2.constructor;
      return q3 && q3.prototype === J2;
    }, A0 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, C0 = function() {
      if (typeof window === "undefined")
        return false;
      for (var J2 in window)
        try {
          if (!A0["$" + J2] && z1.call(window, J2) && window[J2] !== null && typeof window[J2] === "object")
            try {
              A1(window[J2]);
            } catch (q3) {
              return true;
            }
        } catch (q3) {
          return true;
        }
      return false;
    }(), x0 = function(J2) {
      if (typeof window === "undefined" || !C0)
        return A1(J2);
      try {
        return A1(J2);
      } catch (q3) {
        return false;
      }
    }, T0 = function J(q3) {
      var _ = q3 !== null && typeof q3 === "object", z = p1.call(q3) === "[object Function]", Q3 = D0(q3), Z = _ && p1.call(q3) === "[object String]", G = [];
      if (!_ && !z && !Q3)
        throw new TypeError("Object.keys called on a non-object");
      var V = O0 && z;
      if (Z && q3.length > 0 && !z1.call(q3, 0))
        for (var U = 0;U < q3.length; ++U)
          G.push(String(U));
      if (Q3 && q3.length > 0)
        for (var K2 = 0;K2 < q3.length; ++K2)
          G.push(String(K2));
      else
        for (var H in q3)
          if (!(V && H === "prototype") && z1.call(q3, H))
            G.push(String(H));
      if (R0) {
        var F3 = x0(q3);
        for (var B3 = 0;B3 < Q1.length; ++B3)
          if (!(F3 && Q1[B3] === "constructor") && z1.call(q3, Q1[B3]))
            G.push(Q1[B3]);
      }
      return G;
    };
  var z1, p1, D0, c1, R0, O0, Q1, A1, A0, C0, x0;
  N0.exports = T0;
});
var S02 = T2((l3, v0) => {
  var MJ = Array.prototype.slice, DJ = g12(), k0 = Object.keys, C1 = k0 ? function J(q3) {
    return k0(q3);
  } : j02(), I0 = Object.keys;
  C1.shim = function J() {
    if (Object.keys) {
      var q3 = function() {
        var _ = Object.keys(arguments);
        return _ && _.length === arguments.length;
      }(1, 2);
      if (!q3)
        Object.keys = function _(z) {
          if (DJ(z))
            return I0(MJ.call(z));
          return I0(z);
        };
    } else
      Object.keys = C1;
    return Object.keys || C1;
  };
  v0.exports = C1;
});
var b02 = T2((o3, P0) => {
  var RJ = "Function.prototype.bind called on incompatible ", OJ = Object.prototype.toString, AJ = Math.max, CJ = "[object Function]", $0 = function J(q3, _) {
    var z = [];
    for (var Q3 = 0;Q3 < q3.length; Q3 += 1)
      z[Q3] = q3[Q3];
    for (var Z = 0;Z < _.length; Z += 1)
      z[Z + q3.length] = _[Z];
    return z;
  }, xJ = function J(q3, _) {
    var z = [];
    for (var Q3 = _ || 0, Z = 0;Q3 < q3.length; Q3 += 1, Z += 1)
      z[Z] = q3[Q3];
    return z;
  }, TJ = function(J2, q3) {
    var _ = "";
    for (var z = 0;z < J2.length; z += 1)
      if (_ += J2[z], z + 1 < J2.length)
        _ += q3;
    return _;
  };
  P0.exports = function J(q3) {
    var _ = this;
    if (typeof _ !== "function" || OJ.apply(_) !== CJ)
      throw new TypeError(RJ + _);
    var z = xJ(arguments, 1), Q3, Z = function() {
      if (this instanceof Q3) {
        var H = _.apply(this, $0(z, arguments));
        if (Object(H) === H)
          return H;
        return this;
      }
      return _.apply(q3, $0(z, arguments));
    }, G = AJ(0, _.length - z.length), V = [];
    for (var U = 0;U < G; U++)
      V[U] = "$" + U;
    if (Q3 = Function("binder", "return function (" + TJ(V, ",") + "){ return binder.apply(this,arguments); }")(Z), _.prototype) {
      var K2 = function H() {};
      K2.prototype = _.prototype, Q3.prototype = new K2, K2.prototype = null;
    }
    return Q3;
  };
});
var Z12 = T2((a3, E0) => {
  var NJ = b02();
  E0.exports = Function.prototype.bind || NJ;
});
var w02 = T2((s3, f0) => {
  f0.exports = Error;
});
var m02 = T2((i3, y0) => {
  y0.exports = EvalError;
});
var p02 = T2((r3, g0) => {
  g0.exports = RangeError;
});
var u02 = T2((t3, c0) => {
  c0.exports = ReferenceError;
});
var u12 = T2((n3, h0) => {
  h0.exports = SyntaxError;
});
var U12 = T2((e3, Y0) => {
  Y0.exports = TypeError;
});
var l02 = T2((q5, d0) => {
  d0.exports = URIError;
});
var a02 = T2((J5, o0) => {
  o0.exports = function J() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var q3 = {}, _ = Symbol("test"), z = Object(_);
    if (typeof _ === "string")
      return false;
    if (Object.prototype.toString.call(_) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(z) !== "[object Symbol]")
      return false;
    var Q3 = 42;
    q3[_] = Q3;
    for (_ in q3)
      return false;
    if (typeof Object.keys === "function" && Object.keys(q3).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(q3).length !== 0)
      return false;
    var Z = Object.getOwnPropertySymbols(q3);
    if (Z.length !== 1 || Z[0] !== _)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(q3, _))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var G = Object.getOwnPropertyDescriptor(q3, _);
      if (G.value !== Q3 || G.enumerable !== true)
        return false;
    }
    return true;
  };
});
var h12 = T2((_5, i0) => {
  var s0 = typeof Symbol !== "undefined" && Symbol, jJ = a02();
  i0.exports = function J() {
    if (typeof s0 !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof s0("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return jJ();
  };
});
var Y12 = T2((z5, t0) => {
  var r0 = { foo: {} }, kJ = Object;
  t0.exports = function J() {
    return { __proto__: r0 }.foo === r0.foo && !({ __proto__: null } instanceof kJ);
  };
});
var d12 = T2((Q5, n0) => {
  var IJ = Function.prototype.call, vJ = Object.prototype.hasOwnProperty, SJ = Z12();
  n0.exports = SJ.call(IJ, vJ);
});
var G12 = T2((Z5, zq) => {
  var A2, $J = w02(), PJ = m02(), bJ = p02(), EJ = u02(), i = u12(), s = U12(), fJ = l02(), _q = Function, l1 = function(J2) {
    try {
      return _q('"use strict"; return (' + J2 + ").constructor;")();
    } catch (q3) {}
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch (J2) {
      h = null;
    }
  var o1 = function() {
    throw new s;
  }, wJ = h ? function() {
    try {
      return arguments.callee, o1;
    } catch (J2) {
      try {
        return h(arguments, "callee").get;
      } catch (q3) {
        return o1;
      }
    }
  }() : o1, o = h12()(), yJ = Y12()(), k = Object.getPrototypeOf || (yJ ? function(J2) {
    return J2.__proto__;
  } : null), a = {}, mJ = typeof Uint8Array === "undefined" || !k ? A2 : k(Uint8Array), Y = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? A2 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? A2 : ArrayBuffer, "%ArrayIteratorPrototype%": o && k ? k([][Symbol.iterator]()) : A2, "%AsyncFromSyncIteratorPrototype%": A2, "%AsyncFunction%": a, "%AsyncGenerator%": a, "%AsyncGeneratorFunction%": a, "%AsyncIteratorPrototype%": a, "%Atomics%": typeof Atomics === "undefined" ? A2 : Atomics, "%BigInt%": typeof BigInt === "undefined" ? A2 : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? A2 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? A2 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? A2 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": $J, "%eval%": eval, "%EvalError%": PJ, "%Float32Array%": typeof Float32Array === "undefined" ? A2 : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? A2 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? A2 : FinalizationRegistry, "%Function%": _q, "%GeneratorFunction%": a, "%Int8Array%": typeof Int8Array === "undefined" ? A2 : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? A2 : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? A2 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": o && k ? k(k([][Symbol.iterator]())) : A2, "%JSON%": typeof JSON === "object" ? JSON : A2, "%Map%": typeof Map === "undefined" ? A2 : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !o || !k ? A2 : k(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? A2 : Promise, "%Proxy%": typeof Proxy === "undefined" ? A2 : Proxy, "%RangeError%": bJ, "%ReferenceError%": EJ, "%Reflect%": typeof Reflect === "undefined" ? A2 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? A2 : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !o || !k ? A2 : k(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? A2 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": o && k ? k(""[Symbol.iterator]()) : A2, "%Symbol%": o ? Symbol : A2, "%SyntaxError%": i, "%ThrowTypeError%": wJ, "%TypedArray%": mJ, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? A2 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? A2 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? A2 : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? A2 : Uint32Array, "%URIError%": fJ, "%WeakMap%": typeof WeakMap === "undefined" ? A2 : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? A2 : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? A2 : WeakSet };
  if (k)
    try {
      null.error;
    } catch (J2) {
      e0 = k(k(J2)), Y["%Error.prototype%"] = e0;
    }
  var e0, gJ = function J(q3) {
    var _;
    if (q3 === "%AsyncFunction%")
      _ = l1("async function () {}");
    else if (q3 === "%GeneratorFunction%")
      _ = l1("function* () {}");
    else if (q3 === "%AsyncGeneratorFunction%")
      _ = l1("async function* () {}");
    else if (q3 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q3 === "%AsyncIteratorPrototype%") {
      var Q3 = J("%AsyncGenerator%");
      if (Q3 && k)
        _ = k(Q3.prototype);
    }
    return Y[q3] = _, _;
  }, qq = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, X1 = Z12(), x1 = d12(), pJ = X1.call(Function.call, Array.prototype.concat), cJ = X1.call(Function.apply, Array.prototype.splice), Jq = X1.call(Function.call, String.prototype.replace), T1 = X1.call(Function.call, String.prototype.slice), uJ = X1.call(Function.call, RegExp.prototype.exec), hJ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, YJ = /\\(\\)?/g, dJ = function J(q3) {
    var _ = T1(q3, 0, 1), z = T1(q3, -1);
    if (_ === "%" && z !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var Q3 = [];
    return Jq(q3, hJ, function(Z, G, V, U) {
      Q3[Q3.length] = V ? Jq(U, YJ, "$1") : G || Z;
    }), Q3;
  }, lJ = function J(q3, _) {
    var z = q3, Q3;
    if (x1(qq, z))
      Q3 = qq[z], z = "%" + Q3[0] + "%";
    if (x1(Y, z)) {
      var Z = Y[z];
      if (Z === a)
        Z = gJ(z);
      if (typeof Z === "undefined" && !_)
        throw new s("intrinsic " + q3 + " exists, but is not available. Please file an issue!");
      return { alias: Q3, name: z, value: Z };
    }
    throw new i("intrinsic " + q3 + " does not exist!");
  };
  zq.exports = function J(q3, _) {
    if (typeof q3 !== "string" || q3.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (uJ(/^%?[^%]*%?$/, q3) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = dJ(q3), Q3 = z.length > 0 ? z[0] : "", Z = lJ("%" + Q3 + "%", _), G = Z.name, V = Z.value, U = false, K2 = Z.alias;
    if (K2)
      Q3 = K2[0], cJ(z, pJ([0, 1], K2));
    for (var H = 1, F3 = true;H < z.length; H += 1) {
      var B3 = z[H], W = T1(B3, 0, 1), L = T1(B3, -1);
      if ((W === '"' || W === "'" || W === "`" || (L === '"' || L === "'" || L === "`")) && W !== L)
        throw new i("property names with quotes must have matching quotes");
      if (B3 === "constructor" || !F3)
        U = true;
      if (Q3 += "." + B3, G = "%" + Q3 + "%", x1(Y, G))
        V = Y[G];
      else if (V != null) {
        if (!(B3 in V)) {
          if (!_)
            throw new s("base intrinsic for " + q3 + " exists, but the property is not available.");
          return;
        }
        if (h && H + 1 >= z.length) {
          var D = h(V, B3);
          if (F3 = !!D, F3 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B3];
        } else
          F3 = x1(V, B3), V = V[B3];
        if (F3 && !U)
          Y[G] = V;
      }
    }
    return V;
  };
});
var j12 = T2((U5, Qq) => {
  var oJ = G12(), N1 = oJ("%Object.defineProperty%", true) || false;
  if (N1)
    try {
      N1({}, "a", { value: 1 });
    } catch (J2) {
      N1 = false;
    }
  Qq.exports = N1;
});
var Bq2 = T2((X5, Fq) => {
  var C, e = SyntaxError, Gq = Function, n = TypeError, a1 = function(J2) {
    try {
      return Gq('"use strict"; return (' + J2 + ").constructor;")();
    } catch (q4) {}
  }, d = Object.getOwnPropertyDescriptor;
  if (d)
    try {
      d({}, "");
    } catch (J2) {
      d = null;
    }
  var s1 = function() {
    throw new n;
  }, aJ = d ? function() {
    try {
      return arguments.callee, s1;
    } catch (J2) {
      try {
        return d(arguments, "callee").get;
      } catch (q4) {
        return s1;
      }
    }
  }() : s1, r = h12()(), sJ = Y12()(), I = Object.getPrototypeOf || (sJ ? function(J2) {
    return J2.__proto__;
  } : null), t = {}, iJ = typeof Uint8Array === "undefined" || !I ? C : I(Uint8Array), l = { "%AggregateError%": typeof AggregateError === "undefined" ? C : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? C : ArrayBuffer, "%ArrayIteratorPrototype%": r && I ? I([][Symbol.iterator]()) : C, "%AsyncFromSyncIteratorPrototype%": C, "%AsyncFunction%": t, "%AsyncGenerator%": t, "%AsyncGeneratorFunction%": t, "%AsyncIteratorPrototype%": t, "%Atomics%": typeof Atomics === "undefined" ? C : Atomics, "%BigInt%": typeof BigInt === "undefined" ? C : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? C : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? C : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? C : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? C : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? C : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? C : FinalizationRegistry, "%Function%": Gq, "%GeneratorFunction%": t, "%Int8Array%": typeof Int8Array === "undefined" ? C : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? C : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? C : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": r && I ? I(I([][Symbol.iterator]())) : C, "%JSON%": typeof JSON === "object" ? JSON : C, "%Map%": typeof Map === "undefined" ? C : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !r || !I ? C : I(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? C : Promise, "%Proxy%": typeof Proxy === "undefined" ? C : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? C : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? C : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !r || !I ? C : I(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? C : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": r && I ? I(""[Symbol.iterator]()) : C, "%Symbol%": r ? Symbol : C, "%SyntaxError%": e, "%ThrowTypeError%": aJ, "%TypedArray%": iJ, "%TypeError%": n, "%Uint8Array%": typeof Uint8Array === "undefined" ? C : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? C : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? C : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? C : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? C : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? C : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? C : WeakSet };
  if (I)
    try {
      null.error;
    } catch (J2) {
      Zq = I(I(J2)), l["%Error.prototype%"] = Zq;
    }
  var Zq, rJ = function J(q4) {
    var _;
    if (q4 === "%AsyncFunction%")
      _ = a1("async function () {}");
    else if (q4 === "%GeneratorFunction%")
      _ = a1("function* () {}");
    else if (q4 === "%AsyncGeneratorFunction%")
      _ = a1("async function* () {}");
    else if (q4 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q4 === "%AsyncIteratorPrototype%") {
      var Q3 = J("%AsyncGenerator%");
      if (Q3 && I)
        _ = I(Q3.prototype);
    }
    return l[q4] = _, _;
  }, Uq = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, F1 = Z12(), k1 = d12(), tJ = F1.call(Function.call, Array.prototype.concat), nJ = F1.call(Function.apply, Array.prototype.splice), Xq = F1.call(Function.call, String.prototype.replace), I1 = F1.call(Function.call, String.prototype.slice), eJ = F1.call(Function.call, RegExp.prototype.exec), q3 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, J3 = /\\(\\)?/g, _3 = function J(q4) {
    var _ = I1(q4, 0, 1), z = I1(q4, -1);
    if (_ === "%" && z !== "%")
      throw new e("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new e("invalid intrinsic syntax, expected opening `%`");
    var Q3 = [];
    return Xq(q4, q3, function(Z, G, V, U) {
      Q3[Q3.length] = V ? Xq(U, J3, "$1") : G || Z;
    }), Q3;
  }, z3 = function J(q4, _) {
    var z = q4, Q3;
    if (k1(Uq, z))
      Q3 = Uq[z], z = "%" + Q3[0] + "%";
    if (k1(l, z)) {
      var Z = l[z];
      if (Z === t)
        Z = rJ(z);
      if (typeof Z === "undefined" && !_)
        throw new n("intrinsic " + q4 + " exists, but is not available. Please file an issue!");
      return { alias: Q3, name: z, value: Z };
    }
    throw new e("intrinsic " + q4 + " does not exist!");
  };
  Fq.exports = function J(q4, _) {
    if (typeof q4 !== "string" || q4.length === 0)
      throw new n("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new n('"allowMissing" argument must be a boolean');
    if (eJ(/^%?[^%]*%?$/, q4) === null)
      throw new e("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = _3(q4), Q3 = z.length > 0 ? z[0] : "", Z = z3("%" + Q3 + "%", _), G = Z.name, V = Z.value, U = false, K2 = Z.alias;
    if (K2)
      Q3 = K2[0], nJ(z, tJ([0, 1], K2));
    for (var H = 1, F3 = true;H < z.length; H += 1) {
      var B3 = z[H], W = I1(B3, 0, 1), L = I1(B3, -1);
      if ((W === '"' || W === "'" || W === "`" || (L === '"' || L === "'" || L === "`")) && W !== L)
        throw new e("property names with quotes must have matching quotes");
      if (B3 === "constructor" || !F3)
        U = true;
      if (Q3 += "." + B3, G = "%" + Q3 + "%", k1(l, G))
        V = l[G];
      else if (V != null) {
        if (!(B3 in V)) {
          if (!_)
            throw new n("base intrinsic for " + q4 + " exists, but the property is not available.");
          return;
        }
        if (d && H + 1 >= z.length) {
          var D = d(V, B3);
          if (F3 = !!D, F3 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B3];
        } else
          F3 = k1(V, B3), V = V[B3];
        if (F3 && !U)
          l[G] = V;
      }
    }
    return V;
  };
});
var i12 = T2((G5, Vq) => {
  var Q3 = Bq2(), v1 = Q3("%Object.getOwnPropertyDescriptor%", true);
  if (v1)
    try {
      v1([], "length");
    } catch (J2) {
      v1 = null;
    }
  Vq.exports = v1;
});
var Wq2 = T2((F5, Lq) => {
  var Kq = j12(), Z3 = u12(), q1 = U12(), Hq = i12();
  Lq.exports = function J(q3, _, z) {
    if (!q3 || typeof q3 !== "object" && typeof q3 !== "function")
      throw new q1("`obj` must be an object or a function`");
    if (typeof _ !== "string" && typeof _ !== "symbol")
      throw new q1("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new q1("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new q1("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new q1("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new q1("`loose`, if provided, must be a boolean");
    var Q3 = arguments.length > 3 ? arguments[3] : null, Z = arguments.length > 4 ? arguments[4] : null, G = arguments.length > 5 ? arguments[5] : null, V = arguments.length > 6 ? arguments[6] : false, U = !!Hq && Hq(q3, _);
    if (Kq)
      Kq(q3, _, { configurable: G === null && U ? U.configurable : !G, enumerable: Q3 === null && U ? U.enumerable : !Q3, value: z, writable: Z === null && U ? U.writable : !Z });
    else if (V || !Q3 && !Z && !G)
      q3[_] = z;
    else
      throw new Z3("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Rq2 = T2((B5, Dq) => {
  var r1 = j12(), Mq = function J() {
    return !!r1;
  };
  Mq.hasArrayLengthDefineBug = function J() {
    if (!r1)
      return null;
    try {
      return r1([], "length", { value: 1 }).length !== 1;
    } catch (q3) {
      return true;
    }
  };
  Dq.exports = Mq;
});
var Tq2 = T2((V5, xq) => {
  var U3 = G12(), Oq = Wq2(), X3 = Rq2()(), Aq = i12(), Cq = U12(), G3 = U3("%Math.floor%");
  xq.exports = function J(q3, _) {
    if (typeof q3 !== "function")
      throw new Cq("`fn` is not a function");
    if (typeof _ !== "number" || _ < 0 || _ > 4294967295 || G3(_) !== _)
      throw new Cq("`length` must be a positive 32-bit integer");
    var z = arguments.length > 2 && !!arguments[2], Q3 = true, Z = true;
    if ("length" in q3 && Aq) {
      var G = Aq(q3, "length");
      if (G && !G.configurable)
        Q3 = false;
      if (G && !G.writable)
        Z = false;
    }
    if (Q3 || Z || !z)
      if (X3)
        Oq(q3, "length", _, true, true);
      else
        Oq(q3, "length", _);
    return q3;
  };
});
var n12 = T2((K5, S1) => {
  var t1 = Z12(), $1 = G12(), F3 = Tq2(), B3 = U12(), kq = $1("%Function.prototype.apply%"), Iq = $1("%Function.prototype.call%"), vq = $1("%Reflect.apply%", true) || t1.call(Iq, kq), Nq = j12(), V3 = $1("%Math.max%");
  S1.exports = function J(q3) {
    if (typeof q3 !== "function")
      throw new B3("a function is required");
    var _ = vq(t1, Iq, arguments);
    return F3(_, 1 + V3(0, q3.length - (arguments.length - 1)), true);
  };
  var jq = function J() {
    return vq(t1, kq, arguments);
  };
  if (Nq)
    Nq(S1.exports, "apply", { value: jq });
  else
    S1.exports.apply = jq;
});
var bq2 = T2((H5, Pq) => {
  var Sq = G12(), $q = n12(), K3 = $q(Sq("String.prototype.indexOf"));
  Pq.exports = function J(q3, _) {
    var z = Sq(q3, !!_);
    if (typeof z === "function" && K3(q3, ".prototype.") > -1)
      return $q(z);
    return z;
  };
});
var mq2 = T2((L5, yq) => {
  var P1 = (typeof JSON !== "undefined" ? JSON : K02()).stringify, H3 = L02(), L3 = S02(), W3 = n12(), wq = bq2(), Eq = wq("Array.prototype.join"), e1 = wq("Array.prototype.push"), fq = function J(q3, _) {
    var z = "";
    for (var Q3 = 0;Q3 < q3; Q3 += 1)
      z += _;
    return z;
  }, M3 = function(J2, q3, _) {
    return _;
  };
  yq.exports = function J(q3) {
    var _ = arguments.length > 1 ? arguments[1] : undefined, z = _ && _.space || "";
    if (typeof z === "number")
      z = fq(z, " ");
    var Q3 = !!_ && typeof _.cycles === "boolean" && _.cycles, Z = _ && _.replacer ? W3(_.replacer) : M3, G = typeof _ === "function" ? _ : _ && _.cmp, V = G && function(K2) {
      var H = G.length > 2 && function F(B3) {
        return K2[B3];
      };
      return function(F3, B3) {
        return G({ key: F3, value: K2[F3] }, { key: B3, value: K2[B3] }, H ? { __proto__: null, get: H } : undefined);
      };
    }, U = [];
    return function K(H, F3, B3, W) {
      var L = z ? `
` + fq(W, z) : "", D = z ? ": " : ":";
      if (B3 && B3.toJSON && typeof B3.toJSON === "function")
        B3 = B3.toJSON();
      if (B3 = Z(H, F3, B3), B3 === undefined)
        return;
      if (typeof B3 !== "object" || B3 === null)
        return P1(B3);
      if (H3(B3)) {
        var S = [];
        for (var O = 0;O < B3.length; O++) {
          var v = K(B3, O, B3[O], W + 1) || P1(null);
          e1(S, L + z + v);
        }
        return "[" + Eq(S, ",") + L + "]";
      }
      if (U.indexOf(B3) !== -1) {
        if (Q3)
          return P1("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        e1(U, B3);
      var N2 = L3(B3).sort(V && V(B3)), S = [];
      for (var O = 0;O < N2.length; O++) {
        var F3 = N2[O], j = K(B3, F3, B3[F3], W + 1);
        if (!j)
          continue;
        var P = P1(F3) + D + j;
        e1(S, L + z + P);
      }
      return U.splice(U.indexOf(B3), 1), "{" + Eq(S, ",") + L + "}";
    }({ "": q3 }, "", q3, 0);
  };
});
var z02 = XJ2(mq2(), 1);
var gq2 = function(J2, q3, _, z) {
  let Q3, Z, G;
  const V = q3 || [0], U = (_ = _ || 0) >>> 3, K2 = z === -1 ? 3 : 0;
  for (Q3 = 0;Q3 < J2.length; Q3 += 1)
    G = Q3 + U, Z = G >>> 2, V.length <= Z && V.push(0), V[Z] |= J2[Q3] << 8 * (K2 + z * (G % 4));
  return { value: V, binLen: 8 * J2.length + _ };
};
var _12 = function(J2, q3, _) {
  switch (q3) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (J2) {
    case "HEX":
      return function(z, Q3, Z) {
        return function(G, V, U, K2) {
          let H, F3, B3, W;
          if (G.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          const L = V || [0], D = (U = U || 0) >>> 3, O = K2 === -1 ? 3 : 0;
          for (H = 0;H < G.length; H += 2) {
            if (F3 = parseInt(G.substr(H, 2), 16), isNaN(F3))
              throw new Error("String of HEX type contains invalid characters");
            for (W = (H >>> 1) + D, B3 = W >>> 2;L.length <= B3; )
              L.push(0);
            L[B3] |= F3 << 8 * (O + K2 * (W % 4));
          }
          return { value: L, binLen: 4 * G.length + U };
        }(z, Q3, Z, _);
      };
    case "TEXT":
      return function(z, Q3, Z) {
        return function(G, V, U, K2, H) {
          let F3, B3, W, L, D, O, v, N2, S = 0;
          const j = U || [0], P = (K2 = K2 || 0) >>> 3;
          if (V === "UTF8")
            for (v = H === -1 ? 3 : 0, W = 0;W < G.length; W += 1)
              for (F3 = G.charCodeAt(W), B3 = [], 128 > F3 ? B3.push(F3) : 2048 > F3 ? (B3.push(192 | F3 >>> 6), B3.push(128 | 63 & F3)) : 55296 > F3 || 57344 <= F3 ? B3.push(224 | F3 >>> 12, 128 | F3 >>> 6 & 63, 128 | 63 & F3) : (W += 1, F3 = 65536 + ((1023 & F3) << 10 | 1023 & G.charCodeAt(W)), B3.push(240 | F3 >>> 18, 128 | F3 >>> 12 & 63, 128 | F3 >>> 6 & 63, 128 | 63 & F3)), L = 0;L < B3.length; L += 1) {
                for (O = S + P, D = O >>> 2;j.length <= D; )
                  j.push(0);
                j[D] |= B3[L] << 8 * (v + H * (O % 4)), S += 1;
              }
          else
            for (v = H === -1 ? 2 : 0, N2 = V === "UTF16LE" && H !== 1 || V !== "UTF16LE" && H === 1, W = 0;W < G.length; W += 1) {
              for (F3 = G.charCodeAt(W), N2 === true && (L = 255 & F3, F3 = L << 8 | F3 >>> 8), O = S + P, D = O >>> 2;j.length <= D; )
                j.push(0);
              j[D] |= F3 << 8 * (v + H * (O % 4)), S += 2;
            }
          return { value: j, binLen: 8 * S + K2 };
        }(z, q3, Q3, Z, _);
      };
    case "B64":
      return function(z, Q3, Z) {
        return function(G, V, U, K2) {
          let H, F3, B3, W, L, D, O, v = 0;
          const N2 = V || [0], S = (U = U || 0) >>> 3, j = K2 === -1 ? 3 : 0, P = G.indexOf("=");
          if (G.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (G = G.replace(/=/g, ""), P !== -1 && P < G.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (F3 = 0;F3 < G.length; F3 += 4) {
            for (L = G.substr(F3, 4), W = 0, B3 = 0;B3 < L.length; B3 += 1)
              H = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(L.charAt(B3)), W |= H << 18 - 6 * B3;
            for (B3 = 0;B3 < L.length - 1; B3 += 1) {
              for (O = v + S, D = O >>> 2;N2.length <= D; )
                N2.push(0);
              N2[D] |= (W >>> 16 - 8 * B3 & 255) << 8 * (j + K2 * (O % 4)), v += 1;
            }
          }
          return { value: N2, binLen: 8 * v + U };
        }(z, Q3, Z, _);
      };
    case "BYTES":
      return function(z, Q3, Z) {
        return function(G, V, U, K2) {
          let H, F3, B3, W;
          const L = V || [0], D = (U = U || 0) >>> 3, O = K2 === -1 ? 3 : 0;
          for (F3 = 0;F3 < G.length; F3 += 1)
            H = G.charCodeAt(F3), W = F3 + D, B3 = W >>> 2, L.length <= B3 && L.push(0), L[B3] |= H << 8 * (O + K2 * (W % 4));
          return { value: L, binLen: 8 * G.length + U };
        }(z, Q3, Z, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (z) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(z, Q3, Z) {
        return function(G, V, U, K2) {
          return gq2(new Uint8Array(G), V, U, K2);
        }(z, Q3, Z, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (z) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(z, Q3, Z) {
        return gq2(z, Q3, Z, _);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var pq2 = function(J2, q3, _, z) {
  switch (J2) {
    case "HEX":
      return function(Q3) {
        return function(Z, G, V, U) {
          let H, F3, B3 = "";
          const W = G / 8, L = V === -1 ? 3 : 0;
          for (H = 0;H < W; H += 1)
            F3 = Z[H >>> 2] >>> 8 * (L + V * (H % 4)), B3 += "0123456789abcdef".charAt(F3 >>> 4 & 15) + "0123456789abcdef".charAt(15 & F3);
          return U.outputUpper ? B3.toUpperCase() : B3;
        }(Q3, q3, _, z);
      };
    case "B64":
      return function(Q3) {
        return function(Z, G, V, U) {
          let K2, H, F3, B3, W, L = "";
          const D = G / 8, O = V === -1 ? 3 : 0;
          for (K2 = 0;K2 < D; K2 += 3)
            for (B3 = K2 + 1 < D ? Z[K2 + 1 >>> 2] : 0, W = K2 + 2 < D ? Z[K2 + 2 >>> 2] : 0, F3 = (Z[K2 >>> 2] >>> 8 * (O + V * (K2 % 4)) & 255) << 16 | (B3 >>> 8 * (O + V * ((K2 + 1) % 4)) & 255) << 8 | W >>> 8 * (O + V * ((K2 + 2) % 4)) & 255, H = 0;H < 4; H += 1)
              L += 8 * K2 + 6 * H <= G ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(F3 >>> 6 * (3 - H) & 63) : U.b64Pad;
          return L;
        }(Q3, q3, _, z);
      };
    case "BYTES":
      return function(Q3) {
        return function(Z, G, V) {
          let U, K2, H = "";
          const F3 = G / 8, B3 = V === -1 ? 3 : 0;
          for (U = 0;U < F3; U += 1)
            K2 = Z[U >>> 2] >>> 8 * (B3 + V * (U % 4)) & 255, H += String.fromCharCode(K2);
          return H;
        }(Q3, q3, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (Q3) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(Q3) {
        return function(Z, G, V) {
          let U;
          const K2 = G / 8, H = new ArrayBuffer(K2), F3 = new Uint8Array(H), B3 = V === -1 ? 3 : 0;
          for (U = 0;U < K2; U += 1)
            F3[U] = Z[U >>> 2] >>> 8 * (B3 + V * (U % 4)) & 255;
          return H;
        }(Q3, q3, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (Q3) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(Q3) {
        return function(Z, G, V) {
          let U;
          const K2 = G / 8, H = V === -1 ? 3 : 0, F3 = new Uint8Array(K2);
          for (U = 0;U < K2; U += 1)
            F3[U] = Z[U >>> 2] >>> 8 * (H + V * (U % 4)) & 255;
          return F3;
        }(Q3, q3, _);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var E12 = function(J2, q3) {
  let _, z;
  const Q3 = J2.binLen >>> 3, Z = q3.binLen >>> 3, G = Q3 << 3, V = 4 - Q3 << 3;
  if (Q3 % 4 != 0) {
    for (_ = 0;_ < Z; _ += 4)
      z = Q3 + _ >>> 2, J2.value[z] |= q3.value[_ >>> 2] << G, J2.value.push(0), J2.value[z + 1] |= q3.value[_ >>> 2] >>> V;
    return (J2.value.length << 2) - 4 >= Z + Q3 && J2.value.pop(), { value: J2.value, binLen: J2.binLen + q3.binLen };
  }
  return { value: J2.value.concat(q3.value), binLen: J2.binLen + q3.binLen };
};
var cq2 = function(J2) {
  const q3 = { outputUpper: false, b64Pad: "=", outputLen: -1 }, _ = J2 || {};
  if (q3.outputUpper = _.outputUpper || false, _.b64Pad && (q3.b64Pad = _.b64Pad), _.outputLen) {
    if (_.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q3.outputLen = _.outputLen;
  } else if (_.shakeLen) {
    if (_.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q3.outputLen = _.shakeLen;
  }
  if (typeof q3.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof q3.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return q3;
};
var c2 = function(J2, q3, _, z) {
  const Q3 = J2 + " must include a value and format";
  if (!q3) {
    if (!z)
      throw new Error(Q3);
    return z;
  }
  if (q3.value === undefined || !q3.format)
    throw new Error(Q3);
  return _12(q3.format, q3.encoding || "UTF8", _)(q3.value);
};
var J12 = function(J2, q3) {
  return J2 << q3 | J2 >>> 32 - q3;
};
var f2 = function(J2, q3) {
  return J2 >>> q3 | J2 << 32 - q3;
};
var iq2 = function(J2, q3) {
  return J2 >>> q3;
};
var uq2 = function(J2, q3, _) {
  return J2 ^ q3 ^ _;
};
var rq2 = function(J2, q3, _) {
  return J2 & q3 ^ ~J2 & _;
};
var tq2 = function(J2, q3, _) {
  return J2 & q3 ^ J2 & _ ^ q3 & _;
};
var D32 = function(J2) {
  return f2(J2, 2) ^ f2(J2, 13) ^ f2(J2, 22);
};
var $4 = function(J2, q3) {
  const _ = (65535 & J2) + (65535 & q3);
  return (65535 & (J2 >>> 16) + (q3 >>> 16) + (_ >>> 16)) << 16 | 65535 & _;
};
var R32 = function(J2, q3, _, z) {
  const Q3 = (65535 & J2) + (65535 & q3) + (65535 & _) + (65535 & z);
  return (65535 & (J2 >>> 16) + (q3 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q3 >>> 16)) << 16 | 65535 & Q3;
};
var V12 = function(J2, q3, _, z, Q3) {
  const Z = (65535 & J2) + (65535 & q3) + (65535 & _) + (65535 & z) + (65535 & Q3);
  return (65535 & (J2 >>> 16) + (q3 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q3 >>> 16) + (Z >>> 16)) << 16 | 65535 & Z;
};
var O32 = function(J2) {
  return f2(J2, 7) ^ f2(J2, 18) ^ iq2(J2, 3);
};
var A32 = function(J2) {
  return f2(J2, 6) ^ f2(J2, 11) ^ f2(J2, 25);
};
var C32 = function(J2) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var nq2 = function(J2, q3) {
  let _, z, Q3, Z, G, V, U;
  const K2 = [];
  for (_ = q3[0], z = q3[1], Q3 = q3[2], Z = q3[3], G = q3[4], U = 0;U < 80; U += 1)
    K2[U] = U < 16 ? J2[U] : J12(K2[U - 3] ^ K2[U - 8] ^ K2[U - 14] ^ K2[U - 16], 1), V = U < 20 ? V12(J12(_, 5), rq2(z, Q3, Z), G, 1518500249, K2[U]) : U < 40 ? V12(J12(_, 5), uq2(z, Q3, Z), G, 1859775393, K2[U]) : U < 60 ? V12(J12(_, 5), tq2(z, Q3, Z), G, 2400959708, K2[U]) : V12(J12(_, 5), uq2(z, Q3, Z), G, 3395469782, K2[U]), G = Z, Z = Q3, Q3 = J12(z, 30), z = _, _ = V;
  return q3[0] = $4(_, q3[0]), q3[1] = $4(z, q3[1]), q3[2] = $4(Q3, q3[2]), q3[3] = $4(Z, q3[3]), q3[4] = $4(G, q3[4]), q3;
};
var x32 = function(J2, q3, _, z) {
  let Q3;
  const Z = 15 + (q3 + 65 >>> 9 << 4), G = q3 + _;
  for (;J2.length <= Z; )
    J2.push(0);
  for (J2[q3 >>> 5] |= 128 << 24 - q3 % 32, J2[Z] = 4294967295 & G, J2[Z - 1] = G / K12 | 0, Q3 = 0;Q3 < J2.length; Q3 += 16)
    z = nq2(J2.slice(Q3, Q3 + 16), z);
  return z;
};
var hq2 = function(J2) {
  let q3;
  return q3 = J2 == "SHA-224" ? m2.slice() : g2.slice(), q3;
};
var Yq2 = function(J2, q3) {
  let _, z, Q3, Z, G, V, U, K2, H, F3, B3;
  const W = [];
  for (_ = q3[0], z = q3[1], Q3 = q3[2], Z = q3[3], G = q3[4], V = q3[5], U = q3[6], K2 = q3[7], B3 = 0;B3 < 64; B3 += 1)
    W[B3] = B3 < 16 ? J2[B3] : R32(f2(L = W[B3 - 2], 17) ^ f2(L, 19) ^ iq2(L, 10), W[B3 - 7], O32(W[B3 - 15]), W[B3 - 16]), H = V12(K2, A32(G), rq2(G, V, U), M2[B3], W[B3]), F3 = $4(D32(_), tq2(_, z, Q3)), K2 = U, U = V, V = G, G = $4(Z, H), Z = Q3, Q3 = z, z = _, _ = $4(H, F3);
  var L;
  return q3[0] = $4(_, q3[0]), q3[1] = $4(z, q3[1]), q3[2] = $4(Q3, q3[2]), q3[3] = $4(Z, q3[3]), q3[4] = $4(G, q3[4]), q3[5] = $4(V, q3[5]), q3[6] = $4(U, q3[6]), q3[7] = $4(K2, q3[7]), q3;
};
var dq2 = function(J2, q3) {
  let _;
  return q3 > 32 ? (_ = 64 - q3, new X2(J2.I << q3 | J2.N >>> _, J2.N << q3 | J2.I >>> _)) : q3 !== 0 ? (_ = 32 - q3, new X2(J2.N << q3 | J2.I >>> _, J2.I << q3 | J2.N >>> _)) : J2;
};
var w4 = function(J2, q3) {
  let _;
  return q3 < 32 ? (_ = 32 - q3, new X2(J2.N >>> q3 | J2.I << _, J2.I >>> q3 | J2.N << _)) : (_ = 64 - q3, new X2(J2.I >>> q3 | J2.N << _, J2.N >>> q3 | J2.I << _));
};
var eq2 = function(J2, q3) {
  return new X2(J2.N >>> q3, J2.I >>> q3 | J2.N << 32 - q3);
};
var j32 = function(J2, q3, _) {
  return new X2(J2.N & q3.N ^ J2.N & _.N ^ q3.N & _.N, J2.I & q3.I ^ J2.I & _.I ^ q3.I & _.I);
};
var k32 = function(J2) {
  const q3 = w4(J2, 28), _ = w4(J2, 34), z = w4(J2, 39);
  return new X2(q3.N ^ _.N ^ z.N, q3.I ^ _.I ^ z.I);
};
var E2 = function(J2, q3) {
  let _, z;
  _ = (65535 & J2.I) + (65535 & q3.I), z = (J2.I >>> 16) + (q3.I >>> 16) + (_ >>> 16);
  const Q3 = (65535 & z) << 16 | 65535 & _;
  return _ = (65535 & J2.N) + (65535 & q3.N) + (z >>> 16), z = (J2.N >>> 16) + (q3.N >>> 16) + (_ >>> 16), new X2((65535 & z) << 16 | 65535 & _, Q3);
};
var I32 = function(J2, q3, _, z) {
  let Q3, Z;
  Q3 = (65535 & J2.I) + (65535 & q3.I) + (65535 & _.I) + (65535 & z.I), Z = (J2.I >>> 16) + (q3.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q3 >>> 16);
  const G = (65535 & Z) << 16 | 65535 & Q3;
  return Q3 = (65535 & J2.N) + (65535 & q3.N) + (65535 & _.N) + (65535 & z.N) + (Z >>> 16), Z = (J2.N >>> 16) + (q3.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q3 >>> 16), new X2((65535 & Z) << 16 | 65535 & Q3, G);
};
var v32 = function(J2, q3, _, z, Q3) {
  let Z, G;
  Z = (65535 & J2.I) + (65535 & q3.I) + (65535 & _.I) + (65535 & z.I) + (65535 & Q3.I), G = (J2.I >>> 16) + (q3.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q3.I >>> 16) + (Z >>> 16);
  const V = (65535 & G) << 16 | 65535 & Z;
  return Z = (65535 & J2.N) + (65535 & q3.N) + (65535 & _.N) + (65535 & z.N) + (65535 & Q3.N) + (G >>> 16), G = (J2.N >>> 16) + (q3.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q3.N >>> 16) + (Z >>> 16), new X2((65535 & G) << 16 | 65535 & Z, V);
};
var B12 = function(J2, q3) {
  return new X2(J2.N ^ q3.N, J2.I ^ q3.I);
};
var S32 = function(J2) {
  const q3 = w4(J2, 19), _ = w4(J2, 61), z = eq2(J2, 6);
  return new X2(q3.N ^ _.N ^ z.N, q3.I ^ _.I ^ z.I);
};
var $32 = function(J2) {
  const q3 = w4(J2, 1), _ = w4(J2, 8), z = eq2(J2, 7);
  return new X2(q3.N ^ _.N ^ z.N, q3.I ^ _.I ^ z.I);
};
var P32 = function(J2) {
  const q3 = w4(J2, 14), _ = w4(J2, 18), z = w4(J2, 41);
  return new X2(q3.N ^ _.N ^ z.N, q3.I ^ _.I ^ z.I);
};
var lq2 = function(J2) {
  return J2 === "SHA-384" ? [new X2(3418070365, m2[0]), new X2(1654270250, m2[1]), new X2(2438529370, m2[2]), new X2(355462360, m2[3]), new X2(1731405415, m2[4]), new X2(41048885895, m2[5]), new X2(3675008525, m2[6]), new X2(1203062813, m2[7])] : [new X2(g2[0], 4089235720), new X2(g2[1], 2227873595), new X2(g2[2], 4271175723), new X2(g2[3], 1595750129), new X2(g2[4], 2917565137), new X2(g2[5], 725511199), new X2(g2[6], 4215389547), new X2(g2[7], 327033209)];
};
var oq2 = function(J2, q3) {
  let _, z, Q3, Z, G, V, U, K2, H, F3, B3, W;
  const L = [];
  for (_ = q3[0], z = q3[1], Q3 = q3[2], Z = q3[3], G = q3[4], V = q3[5], U = q3[6], K2 = q3[7], B3 = 0;B3 < 80; B3 += 1)
    B3 < 16 ? (W = 2 * B3, L[B3] = new X2(J2[W], J2[W + 1])) : L[B3] = I32(S32(L[B3 - 2]), L[B3 - 7], $32(L[B3 - 15]), L[B3 - 16]), H = v32(K2, P32(G), (O = V, v = U, new X2((D = G).N & O.N ^ ~D.N & v.N, D.I & O.I ^ ~D.I & v.I)), b32[B3], L[B3]), F3 = E2(k32(_), j32(_, z, Q3)), K2 = U, U = V, V = G, G = E2(Z, H), Z = Q3, Q3 = z, z = _, _ = E2(H, F3);
  var D, O, v;
  return q3[0] = E2(_, q3[0]), q3[1] = E2(z, q3[1]), q3[2] = E2(Q3, q3[2]), q3[3] = E2(Z, q3[3]), q3[4] = E2(G, q3[4]), q3[5] = E2(V, q3[5]), q3[6] = E2(U, q3[6]), q3[7] = E2(K2, q3[7]), q3;
};
var J02 = function(J2) {
  let q3;
  const _ = [];
  for (q3 = 0;q3 < 5; q3 += 1)
    _[q3] = [new X2(0, 0), new X2(0, 0), new X2(0, 0), new X2(0, 0), new X2(0, 0)];
  return _;
};
var y32 = function(J2) {
  let q3;
  const _ = [];
  for (q3 = 0;q3 < 5; q3 += 1)
    _[q3] = J2[q3].slice();
  return _;
};
var b12 = function(J2, q3) {
  let _, z, Q3, Z;
  const G = [], V = [];
  if (J2 !== null)
    for (z = 0;z < J2.length; z += 2)
      q3[(z >>> 1) % 5][(z >>> 1) / 5 | 0] = B12(q3[(z >>> 1) % 5][(z >>> 1) / 5 | 0], new X2(J2[z + 1], J2[z]));
  for (_ = 0;_ < 24; _ += 1) {
    for (Z = J02(), z = 0;z < 5; z += 1)
      G[z] = (U = q3[z][0], K2 = q3[z][1], H = q3[z][2], F3 = q3[z][3], B3 = q3[z][4], new X2(U.N ^ K2.N ^ H.N ^ F3.N ^ B3.N, U.I ^ K2.I ^ H.I ^ F3.I ^ B3.I));
    for (z = 0;z < 5; z += 1)
      V[z] = B12(G[(z + 4) % 5], dq2(G[(z + 1) % 5], 1));
    for (z = 0;z < 5; z += 1)
      for (Q3 = 0;Q3 < 5; Q3 += 1)
        q3[z][Q3] = B12(q3[z][Q3], V[z]);
    for (z = 0;z < 5; z += 1)
      for (Q3 = 0;Q3 < 5; Q3 += 1)
        Z[Q3][(2 * z + 3 * Q3) % 5] = dq2(q3[z][Q3], w32[z][Q3]);
    for (z = 0;z < 5; z += 1)
      for (Q3 = 0;Q3 < 5; Q3 += 1)
        q3[z][Q3] = B12(Z[z][Q3], new X2(~Z[(z + 1) % 5][Q3].N & Z[(z + 2) % 5][Q3].N, ~Z[(z + 1) % 5][Q3].I & Z[(z + 2) % 5][Q3].I));
    q3[0][0] = B12(q3[0][0], f32[_]);
  }
  var U, K2, H, F3, B3;
  return q3;
};
var qJ2 = function(J2) {
  let q3, _, z = 0;
  const Q3 = [0, 0], Z = [4294967295 & J2, J2 / K12 & 2097151];
  for (q3 = 6;q3 >= 0; q3--)
    _ = Z[q3 >> 2] >>> 8 * q3 & 255, _ === 0 && z === 0 || (Q3[z + 1 >> 2] |= _ << 8 * (z + 1), z += 1);
  return z = z !== 0 ? z : 1, Q3[0] |= z, { value: z + 1 > 4 ? Q3 : [Q3[0]], binLen: 8 + 8 * z };
};
var q02 = function(J2) {
  return E12(qJ2(J2.binLen), J2);
};
var aq2 = function(J2, q3) {
  let _, z = qJ2(q3);
  z = E12(z, J2);
  const Q3 = q3 >>> 2, Z = (Q3 - z.value.length % Q3) % Q3;
  for (_ = 0;_ < Z; _++)
    z.value.push(0);
  return z.value;
};
var K12 = 4294967296;
var M2 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var m2 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var g2 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var H12 = "Chosen SHA variant is not supported";
var sq2 = "Cannot set numRounds with MAC";

class L12 {
  constructor(J2, q3, _) {
    const z = _ || {};
    if (this.t = q3, this.i = z.encoding || "UTF8", this.numRounds = z.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = J2, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(J2) {
    let q3, _ = 0;
    const z = this.m >>> 5, Q3 = this.C(J2, this.h, this.u), Z = Q3.binLen, G = Q3.value, V = Z >>> 5;
    for (q3 = 0;q3 < V; q3 += z)
      _ + this.m <= Z && (this.U = this.v(G.slice(q3, q3 + z), this.U), _ += this.m);
    return this.A += _, this.h = G.slice(_ >>> 5), this.u = Z % this.m, this.l = true, this;
  }
  getHash(J2, q3) {
    let _, z, Q3 = this.R;
    const Z = cq2(q3);
    if (this.K) {
      if (Z.outputLen === -1)
        throw new Error("Output length must be specified in options");
      Q3 = Z.outputLen;
    }
    const G = pq2(J2, Q3, this.T, Z);
    if (this.H && this.g)
      return G(this.g(Z));
    for (z = this.F(this.h.slice(), this.u, this.A, this.L(this.U), Q3), _ = 1;_ < this.numRounds; _ += 1)
      this.K && Q3 % 32 != 0 && (z[z.length - 1] &= 16777215 >>> 24 - Q3 % 32), z = this.F(z, Q3, 0, this.B(this.o), Q3);
    return G(z);
  }
  setHMACKey(J2, q3, _) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    const z = _12(q3, (_ || {}).encoding || "UTF8", this.T);
    this.k(z(J2));
  }
  k(J2) {
    const q3 = this.m >>> 3, _ = q3 / 4 - 1;
    let z;
    if (this.numRounds !== 1)
      throw new Error(sq2);
    if (this.H)
      throw new Error("MAC key already set");
    for (q3 < J2.binLen / 8 && (J2.value = this.F(J2.value, J2.binLen, 0, this.B(this.o), this.R));J2.value.length <= _; )
      J2.value.push(0);
    for (z = 0;z <= _; z += 1)
      this.S[z] = 909522486 ^ J2.value[z], this.p[z] = 1549556828 ^ J2.value[z];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(J2, q3) {
    const _ = cq2(q3);
    return pq2(J2, this.R, this.T, _)(this.Y());
  }
  Y() {
    let J2;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    const q3 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return J2 = this.v(this.p, this.B(this.o)), J2 = this.F(q3, this.R, this.m, J2, this.R), J2;
  }
}
var T32 = class extends L12 {
  constructor(J2, q3, _) {
    if (J2 !== "SHA-1")
      throw new Error(H12);
    super(J2, q3, _);
    const z = _ || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = _12(this.t, this.i, this.T), this.v = nq2, this.L = function(Q3) {
      return Q3.slice();
    }, this.B = C32, this.F = x32, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, z.hmacKey && this.k(c2("hmacKey", z.hmacKey, this.T));
  }
};
var N32 = class extends L12 {
  constructor(J2, q3, _) {
    if (J2 !== "SHA-224" && J2 !== "SHA-256")
      throw new Error(H12);
    super(J2, q3, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _12(this.t, this.i, this.T), this.v = Yq2, this.L = function(Q3) {
      return Q3.slice();
    }, this.B = hq2, this.F = function(Q3, Z, G, V) {
      return function(U, K2, H, F3, B3) {
        let W, L;
        const D = 15 + (K2 + 65 >>> 9 << 4), O = K2 + H;
        for (;U.length <= D; )
          U.push(0);
        for (U[K2 >>> 5] |= 128 << 24 - K2 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K12 | 0, W = 0;W < U.length; W += 16)
          F3 = Yq2(U.slice(W, W + 16), F3);
        return L = B3 === "SHA-224" ? [F3[0], F3[1], F3[2], F3[3], F3[4], F3[5], F3[6]] : F3, L;
      }(Q3, Z, G, V, J2);
    }, this.U = hq2(J2), this.m = 512, this.R = J2 === "SHA-224" ? 224 : 256, this.K = false, z.hmacKey && this.k(c2("hmacKey", z.hmacKey, this.T));
  }
};

class X2 {
  constructor(J2, q3) {
    this.N = J2, this.I = q3;
  }
}
var b32 = [new X2(M2[0], 3609767458), new X2(M2[1], 602891725), new X2(M2[2], 3964484399), new X2(M2[3], 2173295548), new X2(M2[4], 4081628472), new X2(M2[5], 3053834265), new X2(M2[6], 2937671579), new X2(M2[7], 3664609560), new X2(M2[8], 2734883394), new X2(M2[9], 1164996542), new X2(M2[10], 1323610764), new X2(M2[11], 3590304994), new X2(M2[12], 4068182383), new X2(M2[13], 991336113), new X2(M2[14], 633803317), new X2(M2[15], 3479774868), new X2(M2[16], 2666613458), new X2(M2[17], 944711139), new X2(M2[18], 2341262773), new X2(M2[19], 2007800933), new X2(M2[20], 1495990901), new X2(M2[21], 1856431235), new X2(M2[22], 3175218132), new X2(M2[23], 2198950837), new X2(M2[24], 3999719339), new X2(M2[25], 766784016), new X2(M2[26], 2566594879), new X2(M2[27], 3203337956), new X2(M2[28], 1034457026), new X2(M2[29], 2466948901), new X2(M2[30], 3758326383), new X2(M2[31], 168717936), new X2(M2[32], 1188179964), new X2(M2[33], 1546045734), new X2(M2[34], 1522805485), new X2(M2[35], 2643833823), new X2(M2[36], 2343527390), new X2(M2[37], 1014477480), new X2(M2[38], 1206759142), new X2(M2[39], 344077627), new X2(M2[40], 1290863460), new X2(M2[41], 3158454273), new X2(M2[42], 3505952657), new X2(M2[43], 106217008), new X2(M2[44], 3606008344), new X2(M2[45], 1432725776), new X2(M2[46], 1467031594), new X2(M2[47], 851169720), new X2(M2[48], 3100823752), new X2(M2[49], 1363258195), new X2(M2[50], 3750685593), new X2(M2[51], 3785050280), new X2(M2[52], 3318307427), new X2(M2[53], 3812723403), new X2(M2[54], 2003034995), new X2(M2[55], 3602036899), new X2(M2[56], 1575990012), new X2(M2[57], 1125592928), new X2(M2[58], 2716904306), new X2(M2[59], 442776044), new X2(M2[60], 593698344), new X2(M2[61], 3733110249), new X2(M2[62], 2999351573), new X2(M2[63], 3815920427), new X2(3391569614, 3928383900), new X2(3515267271, 566280711), new X2(3940187606, 3454069534), new X2(4118630271, 4000239992), new X2(116418474, 1914138554), new X2(174292421, 2731055270), new X2(289380356, 3203993006), new X2(460393269, 320620315), new X2(685471733, 587496836), new X2(852142971, 1086792851), new X2(1017036298, 365543100), new X2(1126000580, 2618297676), new X2(1288033470, 3409855158), new X2(1501505948, 4234509866), new X2(1607167915, 987167468), new X2(1816402316, 1246189591)];
var E32 = class extends L12 {
  constructor(J2, q3, _) {
    if (J2 !== "SHA-384" && J2 !== "SHA-512")
      throw new Error(H12);
    super(J2, q3, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _12(this.t, this.i, this.T), this.v = oq2, this.L = function(Q3) {
      return Q3.slice();
    }, this.B = lq2, this.F = function(Q3, Z, G, V) {
      return function(U, K2, H, F3, B3) {
        let W, L;
        const D = 31 + (K2 + 129 >>> 10 << 5), O = K2 + H;
        for (;U.length <= D; )
          U.push(0);
        for (U[K2 >>> 5] |= 128 << 24 - K2 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K12 | 0, W = 0;W < U.length; W += 32)
          F3 = oq2(U.slice(W, W + 32), F3);
        return L = B3 === "SHA-384" ? [F3[0].N, F3[0].I, F3[1].N, F3[1].I, F3[2].N, F3[2].I, F3[3].N, F3[3].I, F3[4].N, F3[4].I, F3[5].N, F3[5].I] : [F3[0].N, F3[0].I, F3[1].N, F3[1].I, F3[2].N, F3[2].I, F3[3].N, F3[3].I, F3[4].N, F3[4].I, F3[5].N, F3[5].I, F3[6].N, F3[6].I, F3[7].N, F3[7].I], L;
      }(Q3, Z, G, V, J2);
    }, this.U = lq2(J2), this.m = 1024, this.R = J2 === "SHA-384" ? 384 : 512, this.K = false, z.hmacKey && this.k(c2("hmacKey", z.hmacKey, this.T));
  }
};
var f32 = [new X2(0, 1), new X2(0, 32898), new X2(2147483648, 32906), new X2(2147483648, 2147516416), new X2(0, 32907), new X2(0, 2147483649), new X2(2147483648, 2147516545), new X2(2147483648, 32777), new X2(0, 138), new X2(0, 136), new X2(0, 2147516425), new X2(0, 2147483658), new X2(0, 2147516555), new X2(2147483648, 139), new X2(2147483648, 32905), new X2(2147483648, 32771), new X2(2147483648, 32770), new X2(2147483648, 128), new X2(0, 32778), new X2(2147483648, 2147483658), new X2(2147483648, 2147516545), new X2(2147483648, 32896), new X2(0, 2147483649), new X2(2147483648, 2147516424)];
var w32 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var m32 = class extends L12 {
  constructor(J2, q3, _) {
    let z = 6, Q3 = 0;
    super(J2, q3, _);
    const Z = _ || {};
    if (this.numRounds !== 1) {
      if (Z.kmacKey || Z.hmacKey)
        throw new Error(sq2);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = _12(this.t, this.i, this.T), this.v = b12, this.L = y32, this.B = J02, this.U = J02(), this.K = false, J2) {
      case "SHA3-224":
        this.m = Q3 = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = Q3 = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = Q3 = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = Q3 = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        z = 31, this.m = Q3 = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        z = 31, this.m = Q3 = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        z = 4, this.m = Q3 = 1344, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        z = 4, this.m = Q3 = 1088, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = Q3 = 1344, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = Q3 = 1088, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(H12);
    }
    this.F = function(G, V, U, K2, H) {
      return function(F3, B3, W, L, D, O, v) {
        let N2, S, j = 0;
        const P = [], W1 = D >>> 5, _J = B3 >>> 5;
        for (N2 = 0;N2 < _J && B3 >= D; N2 += W1)
          L = b12(F3.slice(N2, N2 + W1), L), B3 -= D;
        for (F3 = F3.slice(N2), B3 %= D;F3.length < W1; )
          F3.push(0);
        for (N2 = B3 >>> 3, F3[N2 >> 2] ^= O << N2 % 4 * 8, F3[W1 - 1] ^= 2147483648, L = b12(F3, L);32 * P.length < v && (S = L[j % 5][j / 5 | 0], P.push(S.I), !(32 * P.length >= v)); )
          P.push(S.N), j += 1, 64 * j % D == 0 && (b12(null, L), j = 0);
        return P;
      }(G, V, 0, K2, Q3, z, H);
    }, Z.hmacKey && this.k(c2("hmacKey", Z.hmacKey, this.T));
  }
  O(J2, q3) {
    const _ = function(Q3) {
      const Z = Q3 || {};
      return { funcName: c2("funcName", Z.funcName, 1, { value: [], binLen: 0 }), customization: c2("Customization", Z.customization, 1, { value: [], binLen: 0 }) };
    }(J2 || {});
    q3 && (_.funcName = q3);
    const z = E12(q02(_.funcName), q02(_.customization));
    if (_.customization.binLen !== 0 || _.funcName.binLen !== 0) {
      const Q3 = aq2(z, this.m >>> 3);
      for (let Z = 0;Z < Q3.length; Z += this.m >>> 5)
        this.U = this.v(Q3.slice(Z, Z + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(J2) {
    const q3 = function(z) {
      const Q3 = z || {};
      return { kmacKey: c2("kmacKey", Q3.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: c2("Customization", Q3.customization, 1, { value: [], binLen: 0 }) };
    }(J2 || {});
    this.O(J2, q3.funcName);
    const _ = aq2(q02(q3.kmacKey), this.m >>> 3);
    for (let z = 0;z < _.length; z += this.m >>> 5)
      this.U = this.v(_.slice(z, z + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(J2) {
    const q3 = E12({ value: this.h.slice(), binLen: this.u }, function(_) {
      let z, Q3, Z = 0;
      const G = [0, 0], V = [4294967295 & _, _ / K12 & 2097151];
      for (z = 6;z >= 0; z--)
        Q3 = V[z >> 2] >>> 8 * z & 255, Q3 === 0 && Z === 0 || (G[Z >> 2] |= Q3 << 8 * Z, Z += 1);
      return Z = Z !== 0 ? Z : 1, G[Z >> 2] |= Z << 8 * Z, { value: Z + 1 > 4 ? G : [G[0]], binLen: 8 + 8 * Z };
    }(J2.outputLen));
    return this.F(q3.value, q3.binLen, this.A, this.L(this.U), J2.outputLen);
  }
};

class _02 {
  constructor(J2, q3, _) {
    if (J2 == "SHA-1")
      this.P = new T32(J2, q3, _);
    else if (J2 == "SHA-224" || J2 == "SHA-256")
      this.P = new N32(J2, q3, _);
    else if (J2 == "SHA-384" || J2 == "SHA-512")
      this.P = new E32(J2, q3, _);
    else {
      if (J2 != "SHA3-224" && J2 != "SHA3-256" && J2 != "SHA3-384" && J2 != "SHA3-512" && J2 != "SHAKE128" && J2 != "SHAKE256" && J2 != "CSHAKE128" && J2 != "CSHAKE256" && J2 != "KMAC128" && J2 != "KMAC256")
        throw new Error(H12);
      this.P = new m32(J2, q3, _);
    }
  }
  update(J2) {
    return this.P.update(J2), this;
  }
  getHash(J2, q3) {
    return this.P.getHash(J2, q3);
  }
  setHMACKey(J2, q3, _) {
    this.P.setHMACKey(J2, q3, _);
  }
  getHMAC(J2, q3) {
    return this.P.getHMAC(J2, q3);
  }
}
var f12 = function(J2, q3, _ = 0) {
  const z = z02.default({ ...J2, signature: undefined }), Q3 = q3.noTimeWindow ? 0 : Math.floor(Date.now() / (q3.timeWindow ?? JJ2)) + _;
  return new _02("SHA-256", "TEXT", { encoding: "UTF8" }).update(z).update(z02.default(q3)).update(`${Q3}`).getHash("B64");
};
function x52(J2, q3) {
  return (q3.noTimeWindow ? 0 : q3.timeWindow ?? JJ2) ? J2.signature === f12(J2, q3) || J2.signature === f12(J2, q3, -1) : J2.signature === f12(J2, q3);
}
var JJ2 = 5000;

class Processor2 {
  sendUpdate;
  #observerManager = new ObserverManager;
  constructor(sendUpdate) {
    this.sendUpdate = sendUpdate;
  }
  observe(paths) {
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    return this.#observerManager.observe(pathArray, multi);
  }
  removeObserver(observer) {
    this.#observerManager.removeObserver(observer);
  }
  performCycle(context) {
    this.sendUpdateBlob(context);
    const updates = commitUpdates(context.root, context.properties);
    this.#observerManager.triggerObservers(context, updates);
    return updates;
  }
  sendUpdateBlob(context) {
    if (context.outgoingUpdates?.length) {
      context.outgoingUpdates.forEach((update) => {
        update.path = this.#fixPath(update.path, context);
        const previous = getLeafObject(context.root, update.path.split("/"), 0, false);
        update.value = typeof update.value === "function" ? update.value(previous) : update.value;
      });
      const confirmedUpdates = context.outgoingUpdates.filter(({ confirmed }) => confirmed).map((update) => ({ ...update }));
      this.#addIncomingUpdates(confirmedUpdates, context);
      const blobs = {};
      context.outgoingUpdates.forEach((update) => update.value = gn(update.value, blobs));
      this.sendUpdate(packageUpdates(context.outgoingUpdates, blobs, context.secret), context);
    }
    context.outgoingUpdates.length = 0;
  }
  async receivedBlob(data, context) {
    const { payload, blobs } = data instanceof Blob ? await receiveBlob(data) : { payload: typeof data === "string" ? JSON.parse(data) : data, blobs: {} };
    const secret = context.secret ?? payload.secret;
    if (secret) {
      if (!context.skipValidation && !x52(payload, { secret })) {
        console.error("Invalid signature", payload);
        return;
      }
      context.secret = secret;
    }
    const hasBlobs = blobs && Object.keys(blobs).length > 0;
    if (payload?.globalTime) {
      context.localTimeOffset = payload.globalTime - Date.now();
    }
    if (payload?.myClientId) {
      context.clientId = payload.myClientId;
    }
    if (payload?.updates) {
      if (hasBlobs) {
        payload.updates.forEach((update) => {
          update.value = un(update.value, blobs);
        });
      }
      this.#addIncomingUpdates(payload.updates, context);
    }
  }
  #addIncomingUpdates(updates, context) {
    context.root.updates = context.root.updates ?? [];
    context.root.updates.push(...updates);
  }
  #fixPath(path, context) {
    const split = path.split("/");
    return split.map((part) => translateValue(part, {
      self: context.clientId
    })).join("/");
  }
}
function getData(context, path = "") {
  const parts = path.split("/");
  return getLeafObject(context.root, parts, 0, false, context.properties);
}
function pushData(root, now, outgoingUpdates, path, value, options = {}) {
  processDataUpdate(root, now, outgoingUpdates, {
    path,
    value,
    append: true
  }, options);
}
function setData(root, now, outgoingUpdates, path, value, options = {}) {
  processDataUpdate(root, now, outgoingUpdates, {
    path,
    value,
    append: options.append,
    insert: options.insert
  }, options);
}
function processDataUpdate(root, now, outgoingUpdates, update, options = {}) {
  if (options.active ?? root.config?.activeUpdates) {
    markUpdateConfirmed(update, now);
  }
  outgoingUpdates.push(update);
}
var Yn3 = Object.create;
var { defineProperty: Rt3, getPrototypeOf: En3, getOwnPropertyNames: In2 } = Object;
var Nn3 = Object.prototype.hasOwnProperty;
var xn3 = (n, t, i) => {
  i = n != null ? Yn3(En3(n)) : {};
  let r = t || !n || !n.__esModule ? Rt3(i, "default", { value: n, enumerable: true }) : i;
  for (let m4 of In2(n))
    if (!Nn3.call(r, m4))
      Rt3(r, m4, { get: () => n[m4], enumerable: true });
  return r;
};
var b2 = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports);
var jn3 = b2((n, t) => {
  var i = function(x) {
    throw { name: "SyntaxError", message: x, at: g3, text: N2 };
  }, r = function(x) {
    if (x && x !== h)
      i("Expected '" + x + "' instead of '" + h + "'");
    return h = N2.charAt(g3), g3 += 1, h;
  }, m4 = function() {
    var x, v = "";
    if (h === "-")
      v = "-", r("-");
    while (h >= "0" && h <= "9")
      v += h, r();
    if (h === ".") {
      v += ".";
      while (r() && h >= "0" && h <= "9")
        v += h;
    }
    if (h === "e" || h === "E") {
      if (v += h, r(), h === "-" || h === "+")
        v += h, r();
      while (h >= "0" && h <= "9")
        v += h, r();
    }
    if (x = Number(v), !isFinite(x))
      i("Bad number");
    return x;
  }, c3 = function() {
    var x, v, j = "", S;
    if (h === '"')
      while (r())
        if (h === '"')
          return r(), j;
        else if (h === "\\")
          if (r(), h === "u") {
            S = 0;
            for (v = 0;v < 4; v += 1) {
              if (x = parseInt(r(), 16), !isFinite(x))
                break;
              S = S * 16 + x;
            }
            j += String.fromCharCode(S);
          } else if (typeof Y[h] === "string")
            j += Y[h];
          else
            break;
        else
          j += h;
    i("Bad string");
  }, u = function() {
    while (h && h <= " ")
      r();
  }, I = function() {
    switch (h) {
      case "t":
        return r("t"), r("r"), r("u"), r("e"), true;
      case "f":
        return r("f"), r("a"), r("l"), r("s"), r("e"), false;
      case "n":
        return r("n"), r("u"), r("l"), r("l"), null;
      default:
        i("Unexpected '" + h + "'");
    }
  }, s = function() {
    var x = [];
    if (h === "[") {
      if (r("["), u(), h === "]")
        return r("]"), x;
      while (h) {
        if (x.push(E4()), u(), h === "]")
          return r("]"), x;
        r(","), u();
      }
    }
    i("Bad array");
  }, e = function() {
    var x, v = {};
    if (h === "{") {
      if (r("{"), u(), h === "}")
        return r("}"), v;
      while (h) {
        if (x = c3(), u(), r(":"), Object.prototype.hasOwnProperty.call(v, x))
          i('Duplicate key "' + x + '"');
        if (v[x] = E4(), u(), h === "}")
          return r("}"), v;
        r(","), u();
      }
    }
    i("Bad object");
  }, E4 = function() {
    switch (u(), h) {
      case "{":
        return e();
      case "[":
        return s();
      case '"':
        return c3();
      case "-":
        return m4();
      default:
        return h >= "0" && h <= "9" ? m4() : I();
    }
  }, g3, h, Y = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, N2;
  t.exports = function(x, v) {
    var j;
    if (N2 = x, g3 = 0, h = " ", j = E4(), u(), h)
      i("Syntax error");
    return typeof v === "function" ? function S(A2, T4) {
      var d, R2, P = A2[T4];
      if (P && typeof P === "object") {
        for (d in E4)
          if (Object.prototype.hasOwnProperty.call(P, d))
            if (R2 = S(P, d), typeof R2 === "undefined")
              delete P[d];
            else
              P[d] = R2;
      }
      return v.call(A2, T4, P);
    }({ "": j }, "") : j;
  };
});
var vn3 = b2((n, t) => {
  var i = function(e) {
    return m4.lastIndex = 0, m4.test(e) ? '"' + e.replace(m4, function(E4) {
      var g3 = I[E4];
      return typeof g3 === "string" ? g3 : "\\u" + ("0000" + E4.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + e + '"';
  }, r = function(e, E4) {
    var g3, h, Y, N2, x = c3, v, j = E4[e];
    if (j && typeof j === "object" && typeof j.toJSON === "function")
      j = j.toJSON(e);
    if (typeof s === "function")
      j = s.call(E4, e, j);
    switch (typeof j) {
      case "string":
        return i(j);
      case "number":
        return isFinite(j) ? String(j) : "null";
      case "boolean":
      case "null":
        return String(j);
      case "object":
        if (!j)
          return "null";
        if (c3 += u, v = [], Object.prototype.toString.apply(j) === "[object Array]") {
          N2 = j.length;
          for (g3 = 0;g3 < N2; g3 += 1)
            v[g3] = r(g3, j) || "null";
          return Y = v.length === 0 ? "[]" : c3 ? `[
` + c3 + v.join(`,
` + c3) + `
` + x + "]" : "[" + v.join(",") + "]", c3 = x, Y;
        }
        if (s && typeof s === "object") {
          N2 = s.length;
          for (g3 = 0;g3 < N2; g3 += 1)
            if (h = s[g3], typeof h === "string") {
              if (Y = r(h, j), Y)
                v.push(i(h) + (c3 ? ": " : ":") + Y);
            }
        } else
          for (h in j)
            if (Object.prototype.hasOwnProperty.call(j, h)) {
              if (Y = r(h, j), Y)
                v.push(i(h) + (c3 ? ": " : ":") + Y);
            }
        return Y = v.length === 0 ? "{}" : c3 ? `{
` + c3 + v.join(`,
` + c3) + `
` + x + "}" : "{" + v.join(",") + "}", c3 = x, Y;
      default:
    }
  }, m4 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c3, u, I = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, s;
  t.exports = function(e, E4, g3) {
    var h;
    if (c3 = "", u = "", typeof g3 === "number")
      for (h = 0;h < g3; h += 1)
        u += " ";
    else if (typeof g3 === "string")
      u = g3;
    if (s = E4, E4 && typeof E4 !== "function" && (typeof E4 !== "object" || typeof E4.length !== "number"))
      throw new Error("JSON.stringify");
    return r("", { "": e });
  };
});
var $n2 = b2((n) => {
  n.parse = jn3(), n.stringify = vn3();
});
var Pn3 = b2((n, t) => {
  var i = {}.toString;
  t.exports = Array.isArray || function(r) {
    return i.call(r) == "[object Array]";
  };
});
var Vt3 = b2((n, t) => {
  var i = Object.prototype.toString;
  t.exports = function r(m4) {
    var c3 = i.call(m4), u = c3 === "[object Arguments]";
    if (!u)
      u = c3 !== "[object Array]" && m4 !== null && typeof m4 === "object" && typeof m4.length === "number" && m4.length >= 0 && i.call(m4.callee) === "[object Function]";
    return u;
  };
});
var Sn3 = b2((n, t) => {
  var i;
  if (!Object.keys)
    r = Object.prototype.hasOwnProperty, m4 = Object.prototype.toString, c3 = Vt3(), u = Object.prototype.propertyIsEnumerable, I = !u.call({ toString: null }, "toString"), s = u.call(function() {}, "prototype"), e = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], E4 = function(N2) {
      var x = N2.constructor;
      return x && x.prototype === N2;
    }, g3 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, h = function() {
      if (typeof window === "undefined")
        return false;
      for (var N2 in window)
        try {
          if (!g3["$" + N2] && r.call(window, N2) && window[N2] !== null && typeof window[N2] === "object")
            try {
              E4(window[N2]);
            } catch (x) {
              return true;
            }
        } catch (x) {
          return true;
        }
      return false;
    }(), Y = function(N2) {
      if (typeof window === "undefined" || !h)
        return E4(N2);
      try {
        return E4(N2);
      } catch (x) {
        return false;
      }
    }, i = function N(x) {
      var v = x !== null && typeof x === "object", j = m4.call(x) === "[object Function]", S = c3(x), A2 = v && m4.call(x) === "[object String]", T4 = [];
      if (!v && !j && !S)
        throw new TypeError("Object.keys called on a non-object");
      var d = s && j;
      if (A2 && x.length > 0 && !r.call(x, 0))
        for (var R2 = 0;R2 < x.length; ++R2)
          T4.push(String(R2));
      if (S && x.length > 0)
        for (var P = 0;P < x.length; ++P)
          T4.push(String(P));
      else
        for (var H in x)
          if (!(d && H === "prototype") && r.call(x, H))
            T4.push(String(H));
      if (I) {
        var U = Y(x);
        for (var a = 0;a < e.length; ++a)
          if (!(U && e[a] === "constructor") && r.call(x, e[a]))
            T4.push(e[a]);
      }
      return T4;
    };
  var r, m4, c3, u, I, s, e, E4, g3, h, Y;
  t.exports = i;
});
var Tn3 = b2((n, t) => {
  var i = Array.prototype.slice, r = Vt3(), m4 = Object.keys, c3 = m4 ? function I(s) {
    return m4(s);
  } : Sn3(), u = Object.keys;
  c3.shim = function I() {
    if (Object.keys) {
      var s = function() {
        var e = Object.keys(arguments);
        return e && e.length === arguments.length;
      }(1, 2);
      if (!s)
        Object.keys = function e(E4) {
          if (r(E4))
            return u(i.call(E4));
          return u(E4);
        };
    } else
      Object.keys = c3;
    return Object.keys || c3;
  }, t.exports = c3;
});
var An3 = b2((n, t) => {
  var i = "Function.prototype.bind called on incompatible ", r = Object.prototype.toString, m4 = Math.max, c3 = "[object Function]", u = function e(E4, g3) {
    var h = [];
    for (var Y = 0;Y < E4.length; Y += 1)
      h[Y] = E4[Y];
    for (var N2 = 0;N2 < g3.length; N2 += 1)
      h[N2 + E4.length] = g3[N2];
    return h;
  }, I = function e(E4, g3) {
    var h = [];
    for (var Y = g3 || 0, N2 = 0;Y < E4.length; Y += 1, N2 += 1)
      h[N2] = E4[Y];
    return h;
  }, s = function(e, E4) {
    var g3 = "";
    for (var h = 0;h < e.length; h += 1)
      if (g3 += e[h], h + 1 < e.length)
        g3 += E4;
    return g3;
  };
  t.exports = function e(E4) {
    var g3 = this;
    if (typeof g3 !== "function" || r.apply(g3) !== c3)
      throw new TypeError(i + g3);
    var h = I(arguments, 1), Y, N2 = function() {
      if (this instanceof Y) {
        var A2 = g3.apply(this, u(h, arguments));
        if (Object(A2) === A2)
          return A2;
        return this;
      }
      return g3.apply(E4, u(h, arguments));
    }, x = m4(0, g3.length - h.length), v = [];
    for (var j = 0;j < x; j++)
      v[j] = "$" + j;
    if (Y = Function("binder", "return function (" + s(v, ",") + "){ return binder.apply(this,arguments); }")(N2), g3.prototype) {
      var S = function A() {};
      S.prototype = g3.prototype, Y.prototype = new S, S.prototype = null;
    }
    return Y;
  };
});
var vt3 = b2((n, t) => {
  var i = An3();
  t.exports = Function.prototype.bind || i;
});
var kn3 = b2((n, t) => {
  t.exports = Error;
});
var bn3 = b2((n, t) => {
  t.exports = EvalError;
});
var dn3 = b2((n, t) => {
  t.exports = RangeError;
});
var Cn3 = b2((n, t) => {
  t.exports = ReferenceError;
});
var Ut3 = b2((n, t) => {
  t.exports = SyntaxError;
});
var $t3 = b2((n, t) => {
  t.exports = TypeError;
});
var On3 = b2((n, t) => {
  t.exports = URIError;
});
var Rn3 = b2((n, t) => {
  t.exports = function i() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var r = {}, m4 = Symbol("test"), c3 = Object(m4);
    if (typeof m4 === "string")
      return false;
    if (Object.prototype.toString.call(m4) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(c3) !== "[object Symbol]")
      return false;
    var u = 42;
    r[m4] = u;
    for (m4 in r)
      return false;
    if (typeof Object.keys === "function" && Object.keys(r).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(r).length !== 0)
      return false;
    var I = Object.getOwnPropertySymbols(r);
    if (I.length !== 1 || I[0] !== m4)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(r, m4))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var s = Object.getOwnPropertyDescriptor(r, m4);
      if (s.value !== u || s.enumerable !== true)
        return false;
    }
    return true;
  };
});
var Gt3 = b2((n, t) => {
  var i = typeof Symbol !== "undefined" && Symbol, r = Rn3();
  t.exports = function m() {
    if (typeof i !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof i("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return r();
  };
});
var Zt3 = b2((n, t) => {
  var i = { foo: {} }, r = Object;
  t.exports = function m() {
    return { __proto__: i }.foo === i.foo && !({ __proto__: null } instanceof r);
  };
});
var at3 = b2((n, t) => {
  var i = Function.prototype.call, r = Object.prototype.hasOwnProperty, m4 = vt3();
  t.exports = m4.call(i, r);
});
var Pt3 = b2((n, t) => {
  var i, r = kn3(), m4 = bn3(), c3 = dn3(), u = Cn3(), I = Ut3(), s = $t3(), e = On3(), E4 = Function, g3 = function(D) {
    try {
      return E4('"use strict"; return (' + D + ").constructor;")();
    } catch (C) {}
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch (D) {
      h = null;
    }
  var Y = function() {
    throw new s;
  }, N2 = h ? function() {
    try {
      return arguments.callee, Y;
    } catch (D) {
      try {
        return h(arguments, "callee").get;
      } catch (C) {
        return Y;
      }
    }
  }() : Y, x = Gt3()(), v = Zt3()(), j = Object.getPrototypeOf || (v ? function(D) {
    return D.__proto__;
  } : null), S = {}, A2 = typeof Uint8Array === "undefined" || !j ? i : j(Uint8Array), T4 = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? i : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? i : ArrayBuffer, "%ArrayIteratorPrototype%": x && j ? j([][Symbol.iterator]()) : i, "%AsyncFromSyncIteratorPrototype%": i, "%AsyncFunction%": S, "%AsyncGenerator%": S, "%AsyncGeneratorFunction%": S, "%AsyncIteratorPrototype%": S, "%Atomics%": typeof Atomics === "undefined" ? i : Atomics, "%BigInt%": typeof BigInt === "undefined" ? i : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? i : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": r, "%eval%": eval, "%EvalError%": m4, "%Float32Array%": typeof Float32Array === "undefined" ? i : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? i : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? i : FinalizationRegistry, "%Function%": E4, "%GeneratorFunction%": S, "%Int8Array%": typeof Int8Array === "undefined" ? i : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? i : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": x && j ? j(j([][Symbol.iterator]())) : i, "%JSON%": typeof JSON === "object" ? JSON : i, "%Map%": typeof Map === "undefined" ? i : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !x || !j ? i : j(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? i : Promise, "%Proxy%": typeof Proxy === "undefined" ? i : Proxy, "%RangeError%": c3, "%ReferenceError%": u, "%Reflect%": typeof Reflect === "undefined" ? i : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? i : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !x || !j ? i : j(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": x && j ? j(""[Symbol.iterator]()) : i, "%Symbol%": x ? Symbol : i, "%SyntaxError%": I, "%ThrowTypeError%": N2, "%TypedArray%": A2, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? i : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? i : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? i : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? i : Uint32Array, "%URIError%": e, "%WeakMap%": typeof WeakMap === "undefined" ? i : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? i : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? i : WeakSet };
  if (j)
    try {
      null.error;
    } catch (D) {
      d = j(j(D)), T4["%Error.prototype%"] = d;
    }
  var d, R2 = function D(C) {
    var k;
    if (C === "%AsyncFunction%")
      k = g3("async function () {}");
    else if (C === "%GeneratorFunction%")
      k = g3("function* () {}");
    else if (C === "%AsyncGeneratorFunction%")
      k = g3("async function* () {}");
    else if (C === "%AsyncGenerator%") {
      var p = D("%AsyncGeneratorFunction%");
      if (p)
        k = p.prototype;
    } else if (C === "%AsyncIteratorPrototype%") {
      var f4 = D("%AsyncGenerator%");
      if (f4 && j)
        k = j(f4.prototype);
    }
    return T4[C] = k, k;
  }, P = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, H = vt3(), U = at3(), a = H.call(Function.call, Array.prototype.concat), G = H.call(Function.apply, Array.prototype.splice), rt2 = H.call(Function.call, String.prototype.replace), X3 = H.call(Function.call, String.prototype.slice), L = H.call(Function.call, RegExp.prototype.exec), O = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, M3 = /\\(\\)?/g, W = function D(C) {
    var k = X3(C, 0, 1), p = X3(C, -1);
    if (k === "%" && p !== "%")
      throw new I("invalid intrinsic syntax, expected closing `%`");
    else if (p === "%" && k !== "%")
      throw new I("invalid intrinsic syntax, expected opening `%`");
    var f4 = [];
    return rt2(C, O, function(V, Z, o, z) {
      f4[f4.length] = o ? rt2(z, M3, "$1") : Z || V;
    }), f4;
  }, l = function D(C, k) {
    var p = C, f4;
    if (U(P, p))
      f4 = P[p], p = "%" + f4[0] + "%";
    if (U(T4, p)) {
      var V = T4[p];
      if (V === S)
        V = R2(p);
      if (typeof V === "undefined" && !k)
        throw new s("intrinsic " + C + " exists, but is not available. Please file an issue!");
      return { alias: f4, name: p, value: V };
    }
    throw new I("intrinsic " + C + " does not exist!");
  };
  t.exports = function D(C, k) {
    if (typeof C !== "string" || C.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof k !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (L(/^%?[^%]*%?$/, C) === null)
      throw new I("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var p = W(C), f4 = p.length > 0 ? p[0] : "", V = l("%" + f4 + "%", k), Z = V.name, o = V.value, z = false, nt2 = V.alias;
    if (nt2)
      f4 = nt2[0], G(p, a([0, 1], nt2));
    for (var _ = 1, ct2 = true;_ < p.length; _ += 1) {
      var J2 = p[_], Yt2 = X3(J2, 0, 1), Et2 = X3(J2, -1);
      if ((Yt2 === '"' || Yt2 === "'" || Yt2 === "`" || (Et2 === '"' || Et2 === "'" || Et2 === "`")) && Yt2 !== Et2)
        throw new I("property names with quotes must have matching quotes");
      if (J2 === "constructor" || !ct2)
        z = true;
      if (f4 += "." + J2, Z = "%" + f4 + "%", U(T4, Z))
        o = T4[Z];
      else if (o != null) {
        if (!(J2 in o)) {
          if (!k)
            throw new s("base intrinsic for " + C + " exists, but the property is not available.");
          return;
        }
        if (h && _ + 1 >= p.length) {
          var It2 = h(o, J2);
          if (ct2 = !!It2, ct2 && "get" in It2 && !("originalValue" in It2.get))
            o = It2.get;
          else
            o = o[J2];
        } else
          ct2 = U(o, J2), o = o[J2];
        if (ct2 && !z)
          T4[Z] = o;
      }
    }
    return o;
  };
});
var At3 = b2((n, t) => {
  var i = Pt3(), r = i("%Object.defineProperty%", true) || false;
  if (r)
    try {
      r({}, "a", { value: 1 });
    } catch (m4) {
      r = false;
    }
  t.exports = r;
});
var pn3 = b2((n, t) => {
  var i, r = SyntaxError, m4 = Function, c3 = TypeError, u = function(L) {
    try {
      return m4('"use strict"; return (' + L + ").constructor;")();
    } catch (O) {}
  }, I = Object.getOwnPropertyDescriptor;
  if (I)
    try {
      I({}, "");
    } catch (L) {
      I = null;
    }
  var s = function() {
    throw new c3;
  }, e = I ? function() {
    try {
      return arguments.callee, s;
    } catch (L) {
      try {
        return I(arguments, "callee").get;
      } catch (O) {
        return s;
      }
    }
  }() : s, E4 = Gt3()(), g3 = Zt3()(), h = Object.getPrototypeOf || (g3 ? function(L) {
    return L.__proto__;
  } : null), Y = {}, N2 = typeof Uint8Array === "undefined" || !h ? i : h(Uint8Array), x = { "%AggregateError%": typeof AggregateError === "undefined" ? i : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? i : ArrayBuffer, "%ArrayIteratorPrototype%": E4 && h ? h([][Symbol.iterator]()) : i, "%AsyncFromSyncIteratorPrototype%": i, "%AsyncFunction%": Y, "%AsyncGenerator%": Y, "%AsyncGeneratorFunction%": Y, "%AsyncIteratorPrototype%": Y, "%Atomics%": typeof Atomics === "undefined" ? i : Atomics, "%BigInt%": typeof BigInt === "undefined" ? i : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? i : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? i : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? i : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? i : FinalizationRegistry, "%Function%": m4, "%GeneratorFunction%": Y, "%Int8Array%": typeof Int8Array === "undefined" ? i : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? i : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": E4 && h ? h(h([][Symbol.iterator]())) : i, "%JSON%": typeof JSON === "object" ? JSON : i, "%Map%": typeof Map === "undefined" ? i : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !E4 || !h ? i : h(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? i : Promise, "%Proxy%": typeof Proxy === "undefined" ? i : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? i : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? i : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !E4 || !h ? i : h(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": E4 && h ? h(""[Symbol.iterator]()) : i, "%Symbol%": E4 ? Symbol : i, "%SyntaxError%": r, "%ThrowTypeError%": e, "%TypedArray%": N2, "%TypeError%": c3, "%Uint8Array%": typeof Uint8Array === "undefined" ? i : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? i : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? i : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? i : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? i : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? i : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? i : WeakSet };
  if (h)
    try {
      null.error;
    } catch (L) {
      v = h(h(L)), x["%Error.prototype%"] = v;
    }
  var v, j = function L(O) {
    var M3;
    if (O === "%AsyncFunction%")
      M3 = u("async function () {}");
    else if (O === "%GeneratorFunction%")
      M3 = u("function* () {}");
    else if (O === "%AsyncGeneratorFunction%")
      M3 = u("async function* () {}");
    else if (O === "%AsyncGenerator%") {
      var W = L("%AsyncGeneratorFunction%");
      if (W)
        M3 = W.prototype;
    } else if (O === "%AsyncIteratorPrototype%") {
      var l = L("%AsyncGenerator%");
      if (l && h)
        M3 = h(l.prototype);
    }
    return x[O] = M3, M3;
  }, S = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, A2 = vt3(), T4 = at3(), d = A2.call(Function.call, Array.prototype.concat), R2 = A2.call(Function.apply, Array.prototype.splice), P = A2.call(Function.call, String.prototype.replace), H = A2.call(Function.call, String.prototype.slice), U = A2.call(Function.call, RegExp.prototype.exec), a = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, G = /\\(\\)?/g, rt2 = function L(O) {
    var M3 = H(O, 0, 1), W = H(O, -1);
    if (M3 === "%" && W !== "%")
      throw new r("invalid intrinsic syntax, expected closing `%`");
    else if (W === "%" && M3 !== "%")
      throw new r("invalid intrinsic syntax, expected opening `%`");
    var l = [];
    return P(O, a, function(D, C, k, p) {
      l[l.length] = k ? P(p, G, "$1") : C || D;
    }), l;
  }, X3 = function L(O, M3) {
    var W = O, l;
    if (T4(S, W))
      l = S[W], W = "%" + l[0] + "%";
    if (T4(x, W)) {
      var D = x[W];
      if (D === Y)
        D = j(W);
      if (typeof D === "undefined" && !M3)
        throw new c3("intrinsic " + O + " exists, but is not available. Please file an issue!");
      return { alias: l, name: W, value: D };
    }
    throw new r("intrinsic " + O + " does not exist!");
  };
  t.exports = function L(O, M3) {
    if (typeof O !== "string" || O.length === 0)
      throw new c3("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof M3 !== "boolean")
      throw new c3('"allowMissing" argument must be a boolean');
    if (U(/^%?[^%]*%?$/, O) === null)
      throw new r("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var W = rt2(O), l = W.length > 0 ? W[0] : "", D = X3("%" + l + "%", M3), C = D.name, k = D.value, p = false, f4 = D.alias;
    if (f4)
      l = f4[0], R2(W, d([0, 1], f4));
    for (var V = 1, Z = true;V < W.length; V += 1) {
      var o = W[V], z = H(o, 0, 1), nt2 = H(o, -1);
      if ((z === '"' || z === "'" || z === "`" || (nt2 === '"' || nt2 === "'" || nt2 === "`")) && z !== nt2)
        throw new r("property names with quotes must have matching quotes");
      if (o === "constructor" || !Z)
        p = true;
      if (l += "." + o, C = "%" + l + "%", T4(x, C))
        k = x[C];
      else if (k != null) {
        if (!(o in k)) {
          if (!M3)
            throw new c3("base intrinsic for " + O + " exists, but the property is not available.");
          return;
        }
        if (I && V + 1 >= W.length) {
          var _ = I(k, o);
          if (Z = !!_, Z && "get" in _ && !("originalValue" in _.get))
            k = _.get;
          else
            k = k[o];
        } else
          Z = T4(k, o), k = k[o];
        if (Z && !p)
          x[C] = k;
      }
    }
    return k;
  };
});
var Ft3 = b2((n, t) => {
  var i = pn3(), r = i("%Object.getOwnPropertyDescriptor%", true);
  if (r)
    try {
      r([], "length");
    } catch (m4) {
      r = null;
    }
  t.exports = r;
});
var Dn3 = b2((n, t) => {
  var i = At3(), r = Ut3(), m4 = $t3(), c3 = Ft3();
  t.exports = function u(I, s, e) {
    if (!I || typeof I !== "object" && typeof I !== "function")
      throw new m4("`obj` must be an object or a function`");
    if (typeof s !== "string" && typeof s !== "symbol")
      throw new m4("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new m4("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new m4("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new m4("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new m4("`loose`, if provided, must be a boolean");
    var E4 = arguments.length > 3 ? arguments[3] : null, g3 = arguments.length > 4 ? arguments[4] : null, h = arguments.length > 5 ? arguments[5] : null, Y = arguments.length > 6 ? arguments[6] : false, N2 = !!c3 && c3(I, s);
    if (i)
      i(I, s, { configurable: h === null && N2 ? N2.configurable : !h, enumerable: E4 === null && N2 ? N2.enumerable : !E4, value: e, writable: g3 === null && N2 ? N2.writable : !g3 });
    else if (Y || !E4 && !g3 && !h)
      I[s] = e;
    else
      throw new r("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var on3 = b2((n, t) => {
  var i = At3(), r = function m() {
    return !!i;
  };
  r.hasArrayLengthDefineBug = function m() {
    if (!i)
      return null;
    try {
      return i([], "length", { value: 1 }).length !== 1;
    } catch (c3) {
      return true;
    }
  }, t.exports = r;
});
var Wn3 = b2((n, t) => {
  var i = Pt3(), r = Dn3(), m4 = on3()(), c3 = Ft3(), u = $t3(), I = i("%Math.floor%");
  t.exports = function s(e, E4) {
    if (typeof e !== "function")
      throw new u("`fn` is not a function");
    if (typeof E4 !== "number" || E4 < 0 || E4 > 4294967295 || I(E4) !== E4)
      throw new u("`length` must be a positive 32-bit integer");
    var g3 = arguments.length > 2 && !!arguments[2], h = true, Y = true;
    if ("length" in e && c3) {
      var N2 = c3(e, "length");
      if (N2 && !N2.configurable)
        h = false;
      if (N2 && !N2.writable)
        Y = false;
    }
    if (h || Y || !g3)
      if (m4)
        r(e, "length", E4, true, true);
      else
        r(e, "length", E4);
    return e;
  };
});
var Bt3 = b2((n, t) => {
  var i = vt3(), r = Pt3(), m4 = Wn3(), c3 = $t3(), u = r("%Function.prototype.apply%"), I = r("%Function.prototype.call%"), s = r("%Reflect.apply%", true) || i.call(I, u), e = At3(), E4 = r("%Math.max%");
  t.exports = function h(Y) {
    if (typeof Y !== "function")
      throw new c3("a function is required");
    var N2 = s(i, I, arguments);
    return m4(N2, 1 + E4(0, Y.length - (arguments.length - 1)), true);
  };
  var g3 = function h() {
    return s(i, u, arguments);
  };
  if (e)
    e(t.exports, "apply", { value: g3 });
  else
    t.exports.apply = g3;
});
var Ln3 = b2((n, t) => {
  var i = Pt3(), r = Bt3(), m4 = r(i("String.prototype.indexOf"));
  t.exports = function c(u, I) {
    var s = i(u, !!I);
    if (typeof s === "function" && m4(u, ".prototype.") > -1)
      return r(s);
    return s;
  };
});
var Mn3 = b2((n, t) => {
  var i = (typeof JSON !== "undefined" ? JSON : $n2()).stringify, r = Pn3(), m4 = Tn3(), c3 = Bt3(), u = Ln3(), I = u("Array.prototype.join"), s = u("Array.prototype.push"), e = function g(h, Y) {
    var N2 = "";
    for (var x = 0;x < h; x += 1)
      N2 += Y;
    return N2;
  }, E4 = function(g3, h, Y) {
    return Y;
  };
  t.exports = function g(h) {
    var Y = arguments.length > 1 ? arguments[1] : undefined, N2 = Y && Y.space || "";
    if (typeof N2 === "number")
      N2 = e(N2, " ");
    var x = !!Y && typeof Y.cycles === "boolean" && Y.cycles, v = Y && Y.replacer ? c3(Y.replacer) : E4, j = typeof Y === "function" ? Y : Y && Y.cmp, S = j && function(T4) {
      var d = j.length > 2 && function R(P) {
        return T4[P];
      };
      return function(R2, P) {
        return j({ key: R2, value: T4[R2] }, { key: P, value: T4[P] }, d ? { __proto__: null, get: d } : undefined);
      };
    }, A2 = [];
    return function T(d, R2, P, H) {
      var U = N2 ? `
` + e(H, N2) : "", a = N2 ? ": " : ":";
      if (P && P.toJSON && typeof P.toJSON === "function")
        P = P.toJSON();
      if (P = v(d, R2, P), P === undefined)
        return;
      if (typeof P !== "object" || P === null)
        return i(P);
      if (r(P)) {
        var L = [];
        for (var G = 0;G < P.length; G++) {
          var rt2 = T(P, G, P[G], H + 1) || i(null);
          s(L, U + N2 + rt2);
        }
        return "[" + I(L, ",") + U + "]";
      }
      if (A2.indexOf(P) !== -1) {
        if (x)
          return i("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        s(A2, P);
      var X3 = m4(P).sort(S && S(P)), L = [];
      for (var G = 0;G < X3.length; G++) {
        var R2 = X3[G], O = T(P, R2, P[R2], H + 1);
        if (!O)
          continue;
        var M3 = i(R2) + a + O;
        s(L, U + N2 + M3);
      }
      return A2.splice(A2.indexOf(P), 1), "{" + I(L, ",") + U + "}";
    }({ "": h }, "", h, 0);
  };
});
var pt3 = xn3(Mn3(), 1);
var Dt3 = function(n, t, i, r) {
  let m4, c3, u, I = t || [0], s = (i = i || 0) >>> 3, e = r === -1 ? 3 : 0;
  for (m4 = 0;m4 < n.length; m4 += 1)
    u = m4 + s, c3 = u >>> 2, I.length <= c3 && I.push(0), I[c3] |= n[m4] << 8 * (e + r * (u % 4));
  return { value: I, binLen: 8 * n.length + i };
};
var ht3 = function(n, t, i) {
  switch (t) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (n) {
    case "HEX":
      return function(r, m4, c3) {
        return function(u, I, s, e) {
          let E4, g3, h, Y;
          if (u.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          let N2 = I || [0], x = (s = s || 0) >>> 3, v = e === -1 ? 3 : 0;
          for (E4 = 0;E4 < u.length; E4 += 2) {
            if (g3 = parseInt(u.substr(E4, 2), 16), isNaN(g3))
              throw new Error("String of HEX type contains invalid characters");
            for (Y = (E4 >>> 1) + x, h = Y >>> 2;N2.length <= h; )
              N2.push(0);
            N2[h] |= g3 << 8 * (v + e * (Y % 4));
          }
          return { value: N2, binLen: 4 * u.length + s };
        }(r, m4, c3, i);
      };
    case "TEXT":
      return function(r, m4, c3) {
        return function(u, I, s, e, E4) {
          let g3, h, Y, N2, x, v, j, S, A2 = 0, T4 = s || [0], d = (e = e || 0) >>> 3;
          if (I === "UTF8")
            for (j = E4 === -1 ? 3 : 0, Y = 0;Y < u.length; Y += 1)
              for (g3 = u.charCodeAt(Y), h = [], 128 > g3 ? h.push(g3) : 2048 > g3 ? (h.push(192 | g3 >>> 6), h.push(128 | 63 & g3)) : 55296 > g3 || 57344 <= g3 ? h.push(224 | g3 >>> 12, 128 | g3 >>> 6 & 63, 128 | 63 & g3) : (Y += 1, g3 = 65536 + ((1023 & g3) << 10 | 1023 & u.charCodeAt(Y)), h.push(240 | g3 >>> 18, 128 | g3 >>> 12 & 63, 128 | g3 >>> 6 & 63, 128 | 63 & g3)), N2 = 0;N2 < h.length; N2 += 1) {
                for (v = A2 + d, x = v >>> 2;T4.length <= x; )
                  T4.push(0);
                T4[x] |= h[N2] << 8 * (j + E4 * (v % 4)), A2 += 1;
              }
          else
            for (j = E4 === -1 ? 2 : 0, S = I === "UTF16LE" && E4 !== 1 || I !== "UTF16LE" && E4 === 1, Y = 0;Y < u.length; Y += 1) {
              for (g3 = u.charCodeAt(Y), S === true && (N2 = 255 & g3, g3 = N2 << 8 | g3 >>> 8), v = A2 + d, x = v >>> 2;T4.length <= x; )
                T4.push(0);
              T4[x] |= g3 << 8 * (j + E4 * (v % 4)), A2 += 2;
            }
          return { value: T4, binLen: 8 * A2 + e };
        }(r, t, m4, c3, i);
      };
    case "B64":
      return function(r, m4, c3) {
        return function(u, I, s, e) {
          let E4, g3, h, Y, N2, x, v, j = 0, S = I || [0], A2 = (s = s || 0) >>> 3, T4 = e === -1 ? 3 : 0, d = u.indexOf("=");
          if (u.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (u = u.replace(/=/g, ""), d !== -1 && d < u.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (g3 = 0;g3 < u.length; g3 += 4) {
            for (N2 = u.substr(g3, 4), Y = 0, h = 0;h < N2.length; h += 1)
              E4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(N2.charAt(h)), Y |= E4 << 18 - 6 * h;
            for (h = 0;h < N2.length - 1; h += 1) {
              for (v = j + A2, x = v >>> 2;S.length <= x; )
                S.push(0);
              S[x] |= (Y >>> 16 - 8 * h & 255) << 8 * (T4 + e * (v % 4)), j += 1;
            }
          }
          return { value: S, binLen: 8 * j + s };
        }(r, m4, c3, i);
      };
    case "BYTES":
      return function(r, m4, c3) {
        return function(u, I, s, e) {
          let E4, g3, h, Y, N2 = I || [0], x = (s = s || 0) >>> 3, v = e === -1 ? 3 : 0;
          for (g3 = 0;g3 < u.length; g3 += 1)
            E4 = u.charCodeAt(g3), Y = g3 + x, h = Y >>> 2, N2.length <= h && N2.push(0), N2[h] |= E4 << 8 * (v + e * (Y % 4));
          return { value: N2, binLen: 8 * u.length + s };
        }(r, m4, c3, i);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (r) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(r, m4, c3) {
        return function(u, I, s, e) {
          return Dt3(new Uint8Array(u), I, s, e);
        }(r, m4, c3, i);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (r) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(r, m4, c3) {
        return Dt3(r, m4, c3, i);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var ot3 = function(n, t, i, r) {
  switch (n) {
    case "HEX":
      return function(m4) {
        return function(c3, u, I, s) {
          let e, E4, g3 = "", h = u / 8, Y = I === -1 ? 3 : 0;
          for (e = 0;e < h; e += 1)
            E4 = c3[e >>> 2] >>> 8 * (Y + I * (e % 4)), g3 += "0123456789abcdef".charAt(E4 >>> 4 & 15) + "0123456789abcdef".charAt(15 & E4);
          return s.outputUpper ? g3.toUpperCase() : g3;
        }(m4, t, i, r);
      };
    case "B64":
      return function(m4) {
        return function(c3, u, I, s) {
          let e, E4, g3, h, Y, N2 = "", x = u / 8, v = I === -1 ? 3 : 0;
          for (e = 0;e < x; e += 3)
            for (h = e + 1 < x ? c3[e + 1 >>> 2] : 0, Y = e + 2 < x ? c3[e + 2 >>> 2] : 0, g3 = (c3[e >>> 2] >>> 8 * (v + I * (e % 4)) & 255) << 16 | (h >>> 8 * (v + I * ((e + 1) % 4)) & 255) << 8 | Y >>> 8 * (v + I * ((e + 2) % 4)) & 255, E4 = 0;E4 < 4; E4 += 1)
              N2 += 8 * e + 6 * E4 <= u ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g3 >>> 6 * (3 - E4) & 63) : s.b64Pad;
          return N2;
        }(m4, t, i, r);
      };
    case "BYTES":
      return function(m4) {
        return function(c3, u, I) {
          let s, e, E4 = "", g3 = u / 8, h = I === -1 ? 3 : 0;
          for (s = 0;s < g3; s += 1)
            e = c3[s >>> 2] >>> 8 * (h + I * (s % 4)) & 255, E4 += String.fromCharCode(e);
          return E4;
        }(m4, t, i);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (m4) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(m4) {
        return function(c3, u, I) {
          let s, e = u / 8, E4 = new ArrayBuffer(e), g3 = new Uint8Array(E4), h = I === -1 ? 3 : 0;
          for (s = 0;s < e; s += 1)
            g3[s] = c3[s >>> 2] >>> 8 * (h + I * (s % 4)) & 255;
          return E4;
        }(m4, t, i);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (m4) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(m4) {
        return function(c3, u, I) {
          let s, e = u / 8, E4 = I === -1 ? 3 : 0, g3 = new Uint8Array(e);
          for (s = 0;s < e; s += 1)
            g3[s] = c3[s >>> 2] >>> 8 * (E4 + I * (s % 4)) & 255;
          return g3;
        }(m4, t, i);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var jt3 = function(n, t) {
  let i, r, m4 = n.binLen >>> 3, c3 = t.binLen >>> 3, u = m4 << 3, I = 4 - m4 << 3;
  if (m4 % 4 != 0) {
    for (i = 0;i < c3; i += 4)
      r = m4 + i >>> 2, n.value[r] |= t.value[i >>> 2] << u, n.value.push(0), n.value[r + 1] |= t.value[i >>> 2] >>> I;
    return (n.value.length << 2) - 4 >= c3 + m4 && n.value.pop(), { value: n.value, binLen: n.binLen + t.binLen };
  }
  return { value: n.value.concat(t.value), binLen: n.binLen + t.binLen };
};
var Wt3 = function(n) {
  let t = { outputUpper: false, b64Pad: "=", outputLen: -1 }, i = n || {};
  if (t.outputUpper = i.outputUpper || false, i.b64Pad && (t.b64Pad = i.b64Pad), i.outputLen) {
    if (i.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    t.outputLen = i.outputLen;
  } else if (i.shakeLen) {
    if (i.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    t.outputLen = i.shakeLen;
  }
  if (typeof t.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof t.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return t;
};
var it3 = function(n, t, i, r) {
  let m4 = n + " must include a value and format";
  if (!t) {
    if (!r)
      throw new Error(m4);
    return r;
  }
  if (t.value === undefined || !t.format)
    throw new Error(m4);
  return ht3(t.format, t.encoding || "UTF8", i)(t.value);
};
var mt3 = function(n, t) {
  return n << t | n >>> 32 - t;
};
var B3 = function(n, t) {
  return n >>> t | n << 32 - t;
};
var Qt3 = function(n, t) {
  return n >>> t;
};
var Lt3 = function(n, t, i) {
  return n ^ t ^ i;
};
var Xt3 = function(n, t, i) {
  return n & t ^ ~n & i;
};
var zt3 = function(n, t, i) {
  return n & t ^ n & i ^ t & i;
};
var fn3 = function(n) {
  return B3(n, 2) ^ B3(n, 13) ^ B3(n, 22);
};
var K2 = function(n, t) {
  let i = (65535 & n) + (65535 & t);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16)) << 16 | 65535 & i;
};
var Hn3 = function(n, t, i, r) {
  let m4 = (65535 & n) + (65535 & t) + (65535 & i) + (65535 & r);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16) + (r >>> 16) + (m4 >>> 16)) << 16 | 65535 & m4;
};
var ut3 = function(n, t, i, r, m4) {
  let c3 = (65535 & n) + (65535 & t) + (65535 & i) + (65535 & r) + (65535 & m4);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16) + (r >>> 16) + (m4 >>> 16) + (c3 >>> 16)) << 16 | 65535 & c3;
};
var ln3 = function(n) {
  return B3(n, 7) ^ B3(n, 18) ^ Qt3(n, 3);
};
var yn3 = function(n) {
  return B3(n, 6) ^ B3(n, 11) ^ B3(n, 25);
};
var Kn3 = function(n) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var _t2 = function(n, t) {
  let i, r, m4, c3, u, I, s, e = [];
  for (i = t[0], r = t[1], m4 = t[2], c3 = t[3], u = t[4], s = 0;s < 80; s += 1)
    e[s] = s < 16 ? n[s] : mt3(e[s - 3] ^ e[s - 8] ^ e[s - 14] ^ e[s - 16], 1), I = s < 20 ? ut3(mt3(i, 5), Xt3(r, m4, c3), u, 1518500249, e[s]) : s < 40 ? ut3(mt3(i, 5), Lt3(r, m4, c3), u, 1859775393, e[s]) : s < 60 ? ut3(mt3(i, 5), zt3(r, m4, c3), u, 2400959708, e[s]) : ut3(mt3(i, 5), Lt3(r, m4, c3), u, 3395469782, e[s]), u = c3, c3 = m4, m4 = mt3(r, 30), r = i, i = I;
  return t[0] = K2(i, t[0]), t[1] = K2(r, t[1]), t[2] = K2(m4, t[2]), t[3] = K2(c3, t[3]), t[4] = K2(u, t[4]), t;
};
var Vn3 = function(n, t, i, r) {
  let m4, c3 = 15 + (t + 65 >>> 9 << 4), u = t + i;
  for (;n.length <= c3; )
    n.push(0);
  for (n[t >>> 5] |= 128 << 24 - t % 32, n[c3] = 4294967295 & u, n[c3 - 1] = u / st3 | 0, m4 = 0;m4 < n.length; m4 += 16)
    r = _t2(n.slice(m4, m4 + 16), r);
  return r;
};
var Mt3 = function(n) {
  let t;
  return t = n == "SHA-224" ? q3.slice() : tt3.slice(), t;
};
var ft3 = function(n, t) {
  let i, r, m4, c3, u, I, s, e, E4, g3, h, Y = [];
  for (i = t[0], r = t[1], m4 = t[2], c3 = t[3], u = t[4], I = t[5], s = t[6], e = t[7], h = 0;h < 64; h += 1)
    Y[h] = h < 16 ? n[h] : Hn3(B3(N2 = Y[h - 2], 17) ^ B3(N2, 19) ^ Qt3(N2, 10), Y[h - 7], ln3(Y[h - 15]), Y[h - 16]), E4 = ut3(e, yn3(u), Xt3(u, I, s), $6[h], Y[h]), g3 = K2(fn3(i), zt3(i, r, m4)), e = s, s = I, I = u, u = K2(c3, E4), c3 = m4, m4 = r, r = i, i = K2(E4, g3);
  var N2;
  return t[0] = K2(i, t[0]), t[1] = K2(r, t[1]), t[2] = K2(m4, t[2]), t[3] = K2(c3, t[3]), t[4] = K2(u, t[4]), t[5] = K2(I, t[5]), t[6] = K2(s, t[6]), t[7] = K2(e, t[7]), t;
};
var Ht3 = function(n, t) {
  let i;
  return t > 32 ? (i = 64 - t, new w6(n.I << t | n.N >>> i, n.N << t | n.I >>> i)) : t !== 0 ? (i = 32 - t, new w6(n.N << t | n.I >>> i, n.I << t | n.N >>> i)) : n;
};
var Q3 = function(n, t) {
  let i;
  return t < 32 ? (i = 32 - t, new w6(n.N >>> t | n.I << i, n.I >>> t | n.N << i)) : (i = 64 - t, new w6(n.I >>> t | n.N << i, n.N >>> t | n.I << i));
};
var Jt3 = function(n, t) {
  return new w6(n.N >>> t, n.I >>> t | n.N << 32 - t);
};
var Un3 = function(n, t, i) {
  return new w6(n.N & t.N ^ n.N & i.N ^ t.N & i.N, n.I & t.I ^ n.I & i.I ^ t.I & i.I);
};
var Gn3 = function(n) {
  let t = Q3(n, 28), i = Q3(n, 34), r = Q3(n, 39);
  return new w6(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var F3 = function(n, t) {
  let i, r;
  i = (65535 & n.I) + (65535 & t.I), r = (n.I >>> 16) + (t.I >>> 16) + (i >>> 16);
  let m4 = (65535 & r) << 16 | 65535 & i;
  return i = (65535 & n.N) + (65535 & t.N) + (r >>> 16), r = (n.N >>> 16) + (t.N >>> 16) + (i >>> 16), new w6((65535 & r) << 16 | 65535 & i, m4);
};
var Zn3 = function(n, t, i, r) {
  let m4, c3;
  m4 = (65535 & n.I) + (65535 & t.I) + (65535 & i.I) + (65535 & r.I), c3 = (n.I >>> 16) + (t.I >>> 16) + (i.I >>> 16) + (r.I >>> 16) + (m4 >>> 16);
  let u = (65535 & c3) << 16 | 65535 & m4;
  return m4 = (65535 & n.N) + (65535 & t.N) + (65535 & i.N) + (65535 & r.N) + (c3 >>> 16), c3 = (n.N >>> 16) + (t.N >>> 16) + (i.N >>> 16) + (r.N >>> 16) + (m4 >>> 16), new w6((65535 & c3) << 16 | 65535 & m4, u);
};
var an3 = function(n, t, i, r, m4) {
  let c3, u;
  c3 = (65535 & n.I) + (65535 & t.I) + (65535 & i.I) + (65535 & r.I) + (65535 & m4.I), u = (n.I >>> 16) + (t.I >>> 16) + (i.I >>> 16) + (r.I >>> 16) + (m4.I >>> 16) + (c3 >>> 16);
  let I = (65535 & u) << 16 | 65535 & c3;
  return c3 = (65535 & n.N) + (65535 & t.N) + (65535 & i.N) + (65535 & r.N) + (65535 & m4.N) + (u >>> 16), u = (n.N >>> 16) + (t.N >>> 16) + (i.N >>> 16) + (r.N >>> 16) + (m4.N >>> 16) + (c3 >>> 16), new w6((65535 & u) << 16 | 65535 & c3, I);
};
var gt3 = function(n, t) {
  return new w6(n.N ^ t.N, n.I ^ t.I);
};
var Fn3 = function(n) {
  let t = Q3(n, 19), i = Q3(n, 61), r = Jt3(n, 6);
  return new w6(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var Bn3 = function(n) {
  let t = Q3(n, 1), i = Q3(n, 8), r = Jt3(n, 7);
  return new w6(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var Qn3 = function(n) {
  let t = Q3(n, 14), i = Q3(n, 18), r = Q3(n, 41);
  return new w6(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var lt3 = function(n) {
  return n === "SHA-384" ? [new w6(3418070365, q3[0]), new w6(1654270250, q3[1]), new w6(2438529370, q3[2]), new w6(355462360, q3[3]), new w6(1731405415, q3[4]), new w6(41048885895, q3[5]), new w6(3675008525, q3[6]), new w6(1203062813, q3[7])] : [new w6(tt3[0], 4089235720), new w6(tt3[1], 2227873595), new w6(tt3[2], 4271175723), new w6(tt3[3], 1595750129), new w6(tt3[4], 2917565137), new w6(tt3[5], 725511199), new w6(tt3[6], 4215389547), new w6(tt3[7], 327033209)];
};
var yt3 = function(n, t) {
  let i, r, m4, c3, u, I, s, e, E4, g3, h, Y, N2 = [];
  for (i = t[0], r = t[1], m4 = t[2], c3 = t[3], u = t[4], I = t[5], s = t[6], e = t[7], h = 0;h < 80; h += 1)
    h < 16 ? (Y = 2 * h, N2[h] = new w6(n[Y], n[Y + 1])) : N2[h] = Zn3(Fn3(N2[h - 2]), N2[h - 7], Bn3(N2[h - 15]), N2[h - 16]), E4 = an3(e, Qn3(u), (v = I, j = s, new w6((x = u).N & v.N ^ ~x.N & j.N, x.I & v.I ^ ~x.I & j.I)), Jn3[h], N2[h]), g3 = F3(Gn3(i), Un3(i, r, m4)), e = s, s = I, I = u, u = F3(c3, E4), c3 = m4, m4 = r, r = i, i = F3(E4, g3);
  var x, v, j;
  return t[0] = F3(i, t[0]), t[1] = F3(r, t[1]), t[2] = F3(m4, t[2]), t[3] = F3(c3, t[3]), t[4] = F3(u, t[4]), t[5] = F3(I, t[5]), t[6] = F3(s, t[6]), t[7] = F3(e, t[7]), t;
};
var Tt3 = function(n) {
  let t, i = [];
  for (t = 0;t < 5; t += 1)
    i[t] = [new w6(0, 0), new w6(0, 0), new w6(0, 0), new w6(0, 0), new w6(0, 0)];
  return i;
};
var Xn3 = function(n) {
  let t, i = [];
  for (t = 0;t < 5; t += 1)
    i[t] = n[t].slice();
  return i;
};
var Nt3 = function(n, t) {
  let i, r, m4, c3, u = [], I = [];
  if (n !== null)
    for (r = 0;r < n.length; r += 2)
      t[(r >>> 1) % 5][(r >>> 1) / 5 | 0] = gt3(t[(r >>> 1) % 5][(r >>> 1) / 5 | 0], new w6(n[r + 1], n[r]));
  for (i = 0;i < 24; i += 1) {
    for (c3 = Tt3(), r = 0;r < 5; r += 1)
      u[r] = (s = t[r][0], e = t[r][1], E4 = t[r][2], g3 = t[r][3], h = t[r][4], new w6(s.N ^ e.N ^ E4.N ^ g3.N ^ h.N, s.I ^ e.I ^ E4.I ^ g3.I ^ h.I));
    for (r = 0;r < 5; r += 1)
      I[r] = gt3(u[(r + 4) % 5], Ht3(u[(r + 1) % 5], 1));
    for (r = 0;r < 5; r += 1)
      for (m4 = 0;m4 < 5; m4 += 1)
        t[r][m4] = gt3(t[r][m4], I[r]);
    for (r = 0;r < 5; r += 1)
      for (m4 = 0;m4 < 5; m4 += 1)
        c3[m4][(2 * r + 3 * m4) % 5] = Ht3(t[r][m4], ni2[r][m4]);
    for (r = 0;r < 5; r += 1)
      for (m4 = 0;m4 < 5; m4 += 1)
        t[r][m4] = gt3(c3[r][m4], new w6(~c3[(r + 1) % 5][m4].N & c3[(r + 2) % 5][m4].N, ~c3[(r + 1) % 5][m4].I & c3[(r + 2) % 5][m4].I));
    t[0][0] = gt3(t[0][0], ti2[i]);
  }
  var s, e, E4, g3, h;
  return t;
};
var qt3 = function(n) {
  let t, i, r = 0, m4 = [0, 0], c3 = [4294967295 & n, n / st3 & 2097151];
  for (t = 6;t >= 0; t--)
    i = c3[t >> 2] >>> 8 * t & 255, i === 0 && r === 0 || (m4[r + 1 >> 2] |= i << 8 * (r + 1), r += 1);
  return r = r !== 0 ? r : 1, m4[0] |= r, { value: r + 1 > 4 ? m4 : [m4[0]], binLen: 8 + 8 * r };
};
var St3 = function(n) {
  return jt3(qt3(n.binLen), n);
};
var Kt3 = function(n, t) {
  let i, r = qt3(t);
  r = jt3(r, n);
  let m4 = t >>> 2, c3 = (m4 - r.value.length % m4) % m4;
  for (i = 0;i < c3; i++)
    r.value.push(0);
  return r.value;
};
var st3 = 4294967296;
var $6 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var q3 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var tt3 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var wt3 = "Chosen SHA variant is not supported";
var tn3 = "Cannot set numRounds with MAC";

class et3 {
  constructor(n, t, i) {
    let r = i || {};
    if (this.t = t, this.i = r.encoding || "UTF8", this.numRounds = r.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = n, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(n) {
    let t, i = 0, r = this.m >>> 5, m4 = this.C(n, this.h, this.u), c3 = m4.binLen, u = m4.value, I = c3 >>> 5;
    for (t = 0;t < I; t += r)
      i + this.m <= c3 && (this.U = this.v(u.slice(t, t + r), this.U), i += this.m);
    return this.A += i, this.h = u.slice(i >>> 5), this.u = c3 % this.m, this.l = true, this;
  }
  getHash(n, t) {
    let i, r, m4 = this.R, c3 = Wt3(t);
    if (this.K) {
      if (c3.outputLen === -1)
        throw new Error("Output length must be specified in options");
      m4 = c3.outputLen;
    }
    let u = ot3(n, m4, this.T, c3);
    if (this.H && this.g)
      return u(this.g(c3));
    for (r = this.F(this.h.slice(), this.u, this.A, this.L(this.U), m4), i = 1;i < this.numRounds; i += 1)
      this.K && m4 % 32 != 0 && (r[r.length - 1] &= 16777215 >>> 24 - m4 % 32), r = this.F(r, m4, 0, this.B(this.o), m4);
    return u(r);
  }
  setHMACKey(n, t, i) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    let r = ht3(t, (i || {}).encoding || "UTF8", this.T);
    this.k(r(n));
  }
  k(n) {
    let t = this.m >>> 3, i = t / 4 - 1, r;
    if (this.numRounds !== 1)
      throw new Error(tn3);
    if (this.H)
      throw new Error("MAC key already set");
    for (t < n.binLen / 8 && (n.value = this.F(n.value, n.binLen, 0, this.B(this.o), this.R));n.value.length <= i; )
      n.value.push(0);
    for (r = 0;r <= i; r += 1)
      this.S[r] = 909522486 ^ n.value[r], this.p[r] = 1549556828 ^ n.value[r];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(n, t) {
    let i = Wt3(t);
    return ot3(n, this.R, this.T, i)(this.Y());
  }
  Y() {
    let n;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    let t = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return n = this.v(this.p, this.B(this.o)), n = this.F(t, this.R, this.m, n, this.R), n;
  }
}
var zn3 = class extends et3 {
  constructor(n, t, i) {
    if (n !== "SHA-1")
      throw new Error(wt3);
    super(n, t, i);
    let r = i || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = ht3(this.t, this.i, this.T), this.v = _t2, this.L = function(m4) {
      return m4.slice();
    }, this.B = Kn3, this.F = Vn3, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, r.hmacKey && this.k(it3("hmacKey", r.hmacKey, this.T));
  }
};
var _n3 = class extends et3 {
  constructor(n, t, i) {
    if (n !== "SHA-224" && n !== "SHA-256")
      throw new Error(wt3);
    super(n, t, i);
    let r = i || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = ht3(this.t, this.i, this.T), this.v = ft3, this.L = function(m4) {
      return m4.slice();
    }, this.B = Mt3, this.F = function(m4, c3, u, I) {
      return function(s, e, E4, g3, h) {
        let Y, N2, x = 15 + (e + 65 >>> 9 << 4), v = e + E4;
        for (;s.length <= x; )
          s.push(0);
        for (s[e >>> 5] |= 128 << 24 - e % 32, s[x] = 4294967295 & v, s[x - 1] = v / st3 | 0, Y = 0;Y < s.length; Y += 16)
          g3 = ft3(s.slice(Y, Y + 16), g3);
        return N2 = h === "SHA-224" ? [g3[0], g3[1], g3[2], g3[3], g3[4], g3[5], g3[6]] : g3, N2;
      }(m4, c3, u, I, n);
    }, this.U = Mt3(n), this.m = 512, this.R = n === "SHA-224" ? 224 : 256, this.K = false, r.hmacKey && this.k(it3("hmacKey", r.hmacKey, this.T));
  }
};

class w6 {
  constructor(n, t) {
    this.N = n, this.I = t;
  }
}
var Jn3 = [new w6($6[0], 3609767458), new w6($6[1], 602891725), new w6($6[2], 3964484399), new w6($6[3], 2173295548), new w6($6[4], 4081628472), new w6($6[5], 3053834265), new w6($6[6], 2937671579), new w6($6[7], 3664609560), new w6($6[8], 2734883394), new w6($6[9], 1164996542), new w6($6[10], 1323610764), new w6($6[11], 3590304994), new w6($6[12], 4068182383), new w6($6[13], 991336113), new w6($6[14], 633803317), new w6($6[15], 3479774868), new w6($6[16], 2666613458), new w6($6[17], 944711139), new w6($6[18], 2341262773), new w6($6[19], 2007800933), new w6($6[20], 1495990901), new w6($6[21], 1856431235), new w6($6[22], 3175218132), new w6($6[23], 2198950837), new w6($6[24], 3999719339), new w6($6[25], 766784016), new w6($6[26], 2566594879), new w6($6[27], 3203337956), new w6($6[28], 1034457026), new w6($6[29], 2466948901), new w6($6[30], 3758326383), new w6($6[31], 168717936), new w6($6[32], 1188179964), new w6($6[33], 1546045734), new w6($6[34], 1522805485), new w6($6[35], 2643833823), new w6($6[36], 2343527390), new w6($6[37], 1014477480), new w6($6[38], 1206759142), new w6($6[39], 344077627), new w6($6[40], 1290863460), new w6($6[41], 3158454273), new w6($6[42], 3505952657), new w6($6[43], 106217008), new w6($6[44], 3606008344), new w6($6[45], 1432725776), new w6($6[46], 1467031594), new w6($6[47], 851169720), new w6($6[48], 3100823752), new w6($6[49], 1363258195), new w6($6[50], 3750685593), new w6($6[51], 3785050280), new w6($6[52], 3318307427), new w6($6[53], 3812723403), new w6($6[54], 2003034995), new w6($6[55], 3602036899), new w6($6[56], 1575990012), new w6($6[57], 1125592928), new w6($6[58], 2716904306), new w6($6[59], 442776044), new w6($6[60], 593698344), new w6($6[61], 3733110249), new w6($6[62], 2999351573), new w6($6[63], 3815920427), new w6(3391569614, 3928383900), new w6(3515267271, 566280711), new w6(3940187606, 3454069534), new w6(4118630271, 4000239992), new w6(116418474, 1914138554), new w6(174292421, 2731055270), new w6(289380356, 3203993006), new w6(460393269, 320620315), new w6(685471733, 587496836), new w6(852142971, 1086792851), new w6(1017036298, 365543100), new w6(1126000580, 2618297676), new w6(1288033470, 3409855158), new w6(1501505948, 4234509866), new w6(1607167915, 987167468), new w6(1816402316, 1246189591)];
var qn2 = class extends et3 {
  constructor(n, t, i) {
    if (n !== "SHA-384" && n !== "SHA-512")
      throw new Error(wt3);
    super(n, t, i);
    let r = i || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = ht3(this.t, this.i, this.T), this.v = yt3, this.L = function(m4) {
      return m4.slice();
    }, this.B = lt3, this.F = function(m4, c3, u, I) {
      return function(s, e, E4, g3, h) {
        let Y, N2, x = 31 + (e + 129 >>> 10 << 5), v = e + E4;
        for (;s.length <= x; )
          s.push(0);
        for (s[e >>> 5] |= 128 << 24 - e % 32, s[x] = 4294967295 & v, s[x - 1] = v / st3 | 0, Y = 0;Y < s.length; Y += 32)
          g3 = yt3(s.slice(Y, Y + 32), g3);
        return N2 = h === "SHA-384" ? [g3[0].N, g3[0].I, g3[1].N, g3[1].I, g3[2].N, g3[2].I, g3[3].N, g3[3].I, g3[4].N, g3[4].I, g3[5].N, g3[5].I] : [g3[0].N, g3[0].I, g3[1].N, g3[1].I, g3[2].N, g3[2].I, g3[3].N, g3[3].I, g3[4].N, g3[4].I, g3[5].N, g3[5].I, g3[6].N, g3[6].I, g3[7].N, g3[7].I], N2;
      }(m4, c3, u, I, n);
    }, this.U = lt3(n), this.m = 1024, this.R = n === "SHA-384" ? 384 : 512, this.K = false, r.hmacKey && this.k(it3("hmacKey", r.hmacKey, this.T));
  }
};
var ti2 = [new w6(0, 1), new w6(0, 32898), new w6(2147483648, 32906), new w6(2147483648, 2147516416), new w6(0, 32907), new w6(0, 2147483649), new w6(2147483648, 2147516545), new w6(2147483648, 32777), new w6(0, 138), new w6(0, 136), new w6(0, 2147516425), new w6(0, 2147483658), new w6(0, 2147516555), new w6(2147483648, 139), new w6(2147483648, 32905), new w6(2147483648, 32771), new w6(2147483648, 32770), new w6(2147483648, 128), new w6(0, 32778), new w6(2147483648, 2147483658), new w6(2147483648, 2147516545), new w6(2147483648, 32896), new w6(0, 2147483649), new w6(2147483648, 2147516424)];
var ni2 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var ii2 = class extends et3 {
  constructor(n, t, i) {
    let r = 6, m4 = 0;
    super(n, t, i);
    let c3 = i || {};
    if (this.numRounds !== 1) {
      if (c3.kmacKey || c3.hmacKey)
        throw new Error(tn3);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = ht3(this.t, this.i, this.T), this.v = Nt3, this.L = Xn3, this.B = Tt3, this.U = Tt3(), this.K = false, n) {
      case "SHA3-224":
        this.m = m4 = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = m4 = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = m4 = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = m4 = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        r = 31, this.m = m4 = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        r = 31, this.m = m4 = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        r = 4, this.m = m4 = 1344, this.X(i), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        r = 4, this.m = m4 = 1088, this.X(i), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = m4 = 1344, r = this.O(i), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = m4 = 1088, r = this.O(i), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(wt3);
    }
    this.F = function(u, I, s, e, E4) {
      return function(g3, h, Y, N2, x, v, j) {
        let S, A2, T4 = 0, d = [], R2 = x >>> 5, P = h >>> 5;
        for (S = 0;S < P && h >= x; S += R2)
          N2 = Nt3(g3.slice(S, S + R2), N2), h -= x;
        for (g3 = g3.slice(S), h %= x;g3.length < R2; )
          g3.push(0);
        for (S = h >>> 3, g3[S >> 2] ^= v << S % 4 * 8, g3[R2 - 1] ^= 2147483648, N2 = Nt3(g3, N2);32 * d.length < j && (A2 = N2[T4 % 5][T4 / 5 | 0], d.push(A2.I), !(32 * d.length >= j)); )
          d.push(A2.N), T4 += 1, 64 * T4 % x == 0 && (Nt3(null, N2), T4 = 0);
        return d;
      }(u, I, 0, e, m4, r, E4);
    }, c3.hmacKey && this.k(it3("hmacKey", c3.hmacKey, this.T));
  }
  O(n, t) {
    let i = function(m4) {
      let c3 = m4 || {};
      return { funcName: it3("funcName", c3.funcName, 1, { value: [], binLen: 0 }), customization: it3("Customization", c3.customization, 1, { value: [], binLen: 0 }) };
    }(n || {});
    t && (i.funcName = t);
    let r = jt3(St3(i.funcName), St3(i.customization));
    if (i.customization.binLen !== 0 || i.funcName.binLen !== 0) {
      let m4 = Kt3(r, this.m >>> 3);
      for (let c3 = 0;c3 < m4.length; c3 += this.m >>> 5)
        this.U = this.v(m4.slice(c3, c3 + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(n) {
    let t = function(r) {
      let m4 = r || {};
      return { kmacKey: it3("kmacKey", m4.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: it3("Customization", m4.customization, 1, { value: [], binLen: 0 }) };
    }(n || {});
    this.O(n, t.funcName);
    let i = Kt3(St3(t.kmacKey), this.m >>> 3);
    for (let r = 0;r < i.length; r += this.m >>> 5)
      this.U = this.v(i.slice(r, r + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(n) {
    let t = jt3({ value: this.h.slice(), binLen: this.u }, function(i) {
      let r, m4, c3 = 0, u = [0, 0], I = [4294967295 & i, i / st3 & 2097151];
      for (r = 6;r >= 0; r--)
        m4 = I[r >> 2] >>> 8 * r & 255, m4 === 0 && c3 === 0 || (u[c3 >> 2] |= m4 << 8 * c3, c3 += 1);
      return c3 = c3 !== 0 ? c3 : 1, u[c3 >> 2] |= c3 << 8 * c3, { value: c3 + 1 > 4 ? u : [u[0]], binLen: 8 + 8 * c3 };
    }(n.outputLen));
    return this.F(t.value, t.binLen, this.A, this.L(this.U), n.outputLen);
  }
};

class nn2 {
  constructor(n, t, i) {
    if (n == "SHA-1")
      this.P = new zn3(n, t, i);
    else if (n == "SHA-224" || n == "SHA-256")
      this.P = new _n3(n, t, i);
    else if (n == "SHA-384" || n == "SHA-512")
      this.P = new qn2(n, t, i);
    else {
      if (n != "SHA3-224" && n != "SHA3-256" && n != "SHA3-384" && n != "SHA3-512" && n != "SHAKE128" && n != "SHAKE256" && n != "CSHAKE128" && n != "CSHAKE256" && n != "KMAC128" && n != "KMAC256")
        throw new Error(wt3);
      this.P = new ii2(n, t, i);
    }
  }
  update(n) {
    return this.P.update(n), this;
  }
  getHash(n, t) {
    return this.P.getHash(n, t);
  }
  setHMACKey(n, t, i) {
    this.P.setHMACKey(n, t, i);
  }
  getHMAC(n, t) {
    return this.P.getHMAC(n, t);
  }
}
var xt3 = function(n, t, i = 0) {
  let r = pt3.default({ ...n, signature: undefined }), m4 = t.noTimeWindow ? 0 : Math.floor(Date.now() / (t.timeWindow ?? hn2)) + i;
  return new nn2("SHA-256", "TEXT", { encoding: "UTF8" }).update(r).update(pt3.default(t)).update(`${m4}`).getHash("B64");
};
function rn3(n, t = {}) {
  return { ...n, signature: xt3(n, t) };
}
function mn2(n, t) {
  return (t.noTimeWindow ? 0 : t.timeWindow ?? hn2) ? n.signature === xt3(n, t) || n.signature === xt3(n, t, -1) : n.signature === xt3(n, t);
}
var hn2 = 5000;

class kt3 {
  data = [];
  #t = new TextEncoder;
  static payload(n, t, i) {
    return new kt3().payload(n, t, i);
  }
  static blob(n, t) {
    return new kt3().blob(n, t);
  }
  #n(n) {
    let t = this.#t.encode(n), i = new Uint8Array([t.byteLength]);
    this.data.push(i.buffer), this.data.push(t.buffer);
  }
  payload(n, t, i) {
    this.#n(n);
    let r = new Uint8Array([1]);
    this.data.push(r.buffer);
    let m4 = JSON.stringify(i ? rn3(t, { secret: i }) : t), c3 = this.#t.encode(m4), u = new Uint32Array([c3.byteLength]);
    return this.data.push(u.buffer), this.data.push(c3.buffer), this;
  }
  blob(n, t) {
    this.#n(n);
    let i = new Uint8Array([2]);
    this.data.push(i.buffer);
    let r = new Uint32Array([t.size]);
    return this.data.push(r.buffer), this.data.push(t), this;
  }
  build() {
    return new Blob(this.data);
  }
}
var y4 = [];
for (let n = 0;n < 256; ++n)
  y4.push((n + 256).toString(16).slice(1));
function cn3(n, t = 0) {
  return (y4[n[t + 0]] + y4[n[t + 1]] + y4[n[t + 2]] + y4[n[t + 3]] + "-" + y4[n[t + 4]] + y4[n[t + 5]] + "-" + y4[n[t + 6]] + y4[n[t + 7]] + "-" + y4[n[t + 8]] + y4[n[t + 9]] + "-" + y4[n[t + 10]] + y4[n[t + 11]] + y4[n[t + 12]] + y4[n[t + 13]] + y4[n[t + 14]] + y4[n[t + 15]]).toLowerCase();
}
var bt3;
var mi2 = new Uint8Array(16);
function dt3() {
  if (!bt3) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    bt3 = crypto.getRandomValues.bind(crypto);
  }
  return bt3(mi2);
}
var hi2 = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var Ct3 = { randomUUID: hi2 };
function ci2(n, t, i) {
  if (Ct3.randomUUID && !t && !n)
    return Ct3.randomUUID();
  n = n || {};
  let r = n.random ?? n.rng?.() ?? dt3();
  if (r.length < 16)
    throw new Error("Random bytes length must be >= 16");
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    if (i = i || 0, i < 0 || i + 16 > t.length)
      throw new RangeError(`UUID byte range ${i}:${i + 15} is out of buffer bounds`);
    for (let m4 = 0;m4 < 16; ++m4)
      t[i + m4] = r[m4];
    return t;
  }
  return cn3(r);
}
var Ot3 = ci2;
var sn2 = new TextDecoder;
function gi2(n, t) {
  let [i, r] = en3(n, t);
  return [sn2.decode(new Uint8Array(n, r, i)), r + i];
}
function ui2(n, t) {
  let [i, r] = wn3(n, t);
  return [sn2.decode(new Uint8Array(n, r, i)), r + i];
}
function si2(n, t) {
  let [i, r] = wn3(n, t);
  return [new Blob([new Uint8Array(n, r, i)], { type: "application/octet-stream" }), r + i];
}
function wn3(n, t) {
  return [new Uint32Array(n.slice(t, t + Uint32Array.BYTES_PER_ELEMENT), 0, 1)[0], t + Uint32Array.BYTES_PER_ELEMENT];
}
function en3(n, t) {
  return [new Uint8Array(n, t, 1)[0], t + Uint8Array.BYTES_PER_ELEMENT];
}
function Di(n, t) {
  return mn2(n, { secret: t });
}
async function oi2(n) {
  let t = {}, i = {}, r = 0, m4;
  while (r < n.size) {
    m4 = m4 ?? await n.arrayBuffer();
    let [c3, u] = gi2(m4, r);
    r = u;
    let [I, s] = en3(m4, r);
    switch (r = s, I) {
      case 1:
        let [e, E4] = ui2(m4, r);
        r = E4;
        try {
          t[c3] = JSON.parse(e);
        } catch (Y) {
          console.error(`Error parsing JSON for key "${c3}":`, Y);
        }
        break;
      case 2:
        let [g3, h] = si2(m4, r);
        r = h, i[c3] = g3;
        break;
    }
  }
  return { ...t, ...i };
}
function gn2(n, t) {
  if (typeof n === "object" && n instanceof Blob) {
    let r = `{blob:${Ot3()}}`;
    return t[r] = n, r;
  }
  let i = n;
  if (Array.isArray(n))
    n.forEach((r, m4) => {
      let c3 = gn2(r, t);
      if (c3 !== n[m4]) {
        if (n === i)
          n = [...n];
        n[m4] = c3;
      }
    });
  else if (typeof n === "object" && n)
    Object.entries(n).forEach(([r, m4]) => {
      let c3 = gn2(m4, t);
      if (c3 !== n[r]) {
        if (n === i)
          n = { ...n };
        n[r] = c3;
      }
    });
  return n;
}
function un3(n, t) {
  if (typeof n === "string" && n.startsWith("{blobUrl:"))
    return URL.createObjectURL(t[n]);
  if (typeof n === "string" && n.startsWith("{blob:"))
    return t[n];
  let i = n;
  if (Array.isArray(n))
    n.forEach((r, m4) => {
      let c3 = un3(r, t);
      if (c3 !== r) {
        if (n === i)
          n = [...n];
        n[m4] = c3;
      }
    });
  else if (typeof n === "object" && n)
    Object.entries(n).forEach(([r, m4]) => {
      let c3 = un3(m4, t);
      if (c3 !== m4) {
        if (n === i)
          n = { ...n };
        n[r] = c3;
      }
    });
  return n;
}
function addMessageReceiver(socket, payloadReceived) {
  socket.on("message", async (message, binary) => {
    if (binary) {
      const blob = new Blob([message]);
      const { payload, ...blobs } = await oi2(blob);
      if (payload) {
        payloadReceived(payload, blobs);
      }
    } else {
      const payload = JSON.parse(message);
      payloadReceived(payload, {});
    }
  });
}
function removeRestrictedData(state, clientId) {
  const newState = {
    ...state,
    peer: { ...state.peer },
    updates: undefined
  };
  for (const key in newState.peer) {
    const clients = key.split(":");
    if (clients.length < 2 || clients[0] !== clientId && clients[1] !== clientId) {
      delete newState.peer[key];
    }
  }
  if (!Object.keys(newState.peer ?? {}).length) {
    delete newState.peer;
  }
  return newState;
}
function removeRestrictedPeersFromUpdates(updates, clientId) {
  return updates.filter((update) => {
    const parts = update.path.split("/");
    if (parts[0] === "peer") {
      const clients = parts[1].split(":");
      return clients.length >= 2 && (clients[0] === clientId || clients[1] === clientId);
    }
    return true;
  });
}
function restrictedPath(path, clientId) {
  const pathSplit = path.split("/");
  switch (pathSplit[0]) {
    case "clients":
      if (pathSplit[1] === clientId) {
        return false;
      }
      return true;
    case "peer":
      const tag = pathSplit[1];
      const clientIds = tag.split(":");
      if (clientIds.length >= 2 && clientId && clientIds.includes(clientId)) {
        return false;
      }
      return true;
  }
  return false;
}
var CODEPEN_ROOM = /^codepen/i;
function configureRoom(room, state) {
  if (CODEPEN_ROOM.test(room)) {
    state.config = {
      ...state.config,
      autoReconnect: true,
      signPayloads: false
    };
  }
}
var nextClientId = 1;

class SyncRoom {
  room;
  #sockets = new Map;
  state = {};
  #onRoomChange = new Set;
  #secret = crypto.randomUUID();
  constructor(room) {
    this.room = room;
    configureRoom(room, this.state);
  }
  addRoomChangeListener(callback) {
    this.#onRoomChange.add(callback);
  }
  async welcomeClient(client) {
    const now = Date.now();
    const clientId = `user-${nextClientId++}`;
    const clientPath = `clients/${clientId}`;
    const clientState = {
      joined: now
    };
    this.#sockets.set(client, clientId);
    const newUpdates = [{
      path: clientPath,
      value: clientState,
      confirmed: now
    }];
    this.#shareUpdates(newUpdates, client);
    addMessageReceiver(client, (payload2, blobs2) => {
      if (this.#secret && this.state.config?.signPayloads !== false && !Di(payload2, this.#secret)) {
        console.error("Invalid payload received", payload2);
        return;
      }
      payload2.updates?.forEach((update) => {
        const newValue = un3(update.value, blobs2);
        if (newValue !== undefined) {
          update.value = newValue;
        }
      });
      payload2.updates = payload2.updates?.filter((update) => !restrictedPath(update.path, clientId));
      this.#shareUpdates(payload2.updates, client);
    });
    client.on("close", () => {
      this.#sockets.delete(client);
      this.#shareUpdates([{
        path: clientPath,
        value: undefined,
        confirmed: Date.now()
      }]);
      for (let key in this.state.peer) {
        const clientIds = key.split(":");
        if (clientIds.includes(clientId)) {
          this.#shareUpdates([{
            path: `peer/${key}`,
            value: undefined,
            confirmed: Date.now()
          }]);
        }
      }
      console.log(`client ${clientId} disconnected from room ${this.room}`);
      this.#onRoomChange.forEach((callback) => callback(this.state));
    });
    commitUpdates(this.state, {
      now
    });
    const blobs = {};
    const payload = await gn2(removeRestrictedData({ ...this.state }, clientId), blobs);
    const updates = [];
    for (let key in payload) {
      updates.push({
        path: key,
        value: this.state[key],
        confirmed: now
      });
    }
    const welcomeBlobBuilder = kt3.payload("payload", {
      myClientId: clientId,
      updates,
      globalTime: now,
      secret: this.#secret
    }, this.#secret);
    Object.entries(blobs).forEach(([key, blob]) => welcomeBlobBuilder.blob(key, blob));
    client.send(await welcomeBlobBuilder.build().arrayBuffer());
    return { clientId };
  }
  #cleanupPeers() {
    for (let k in this.state.peer) {
      const clients = k.split(":");
      if (clients.length < 2 || !this.state.clients?.[clients[0]] && !this.state.clients?.[clients[1]]) {
        this.#shareUpdates([{
          path: `peer/${k}`,
          value: undefined,
          confirmed: Date.now()
        }]);
      }
    }
  }
  #shareUpdates(newUpdates, sender) {
    if (!newUpdates?.length) {
      return;
    }
    const updatesForSender = newUpdates.filter((update) => !update.confirmed);
    const now = Date.now();
    newUpdates.forEach((update) => markUpdateConfirmed(update, now));
    this.state.updates = this.state.updates ?? [];
    this.state.updates.push(...newUpdates);
    commitUpdates(this.state, {
      now: Date.now()
    });
    this.#broadcastUpdates(newUpdates, (client) => client !== sender);
    this.#broadcastUpdates(updatesForSender, (client) => client === sender);
    this.#cleanupPeers();
  }
  #broadcastUpdates(newUpdates, senderFilter) {
    if (!newUpdates?.length) {
      return;
    }
    this.#sockets.entries().forEach(async ([client, clientId]) => {
      if (senderFilter && !senderFilter(client)) {
        return;
      }
      const clientUpdates = removeRestrictedPeersFromUpdates(newUpdates, clientId);
      if (clientUpdates?.length) {
        const blobs = {};
        for (let update of clientUpdates) {
          update.value = await gn2(update.value, blobs);
        }
        const blob = packageUpdates(clientUpdates, blobs, this.#secret);
        const buffer = await blob.arrayBuffer();
        client.send(buffer);
      }
    });
  }
}

class SyncSocket {
  #rooms = {};
  constructor(server) {
    if (server) {
      this.#hookupSocketServer(server);
    }
  }
  #hookupSocketServer(websocketServer) {
    websocketServer.on("listening", () => {
      const address = websocketServer.address();
      if (typeof address === "string") {
        console.log(`WebSocket server listening on ${address}`);
      } else if (address && typeof address === "object") {
        const host = address.address === "::" ? "localhost" : address.address;
        console.log(`WebSocket server listening on ws://${host}:${address.port}`);
      }
    });
    websocketServer.on("connection", async (socket, req) => {
      await this.#handleWebSocket(socket, new URLSearchParams(req.url?.split("?")[1]));
    });
  }
  async#handleWebSocket(socket, parameters) {
    const roomName = parameters.get("room") ?? "default";
    const room = this.#getRoom(roomName);
    const { clientId } = await room.welcomeClient(socket);
    console.log(`client ${clientId} connected in room ${roomName}.`);
  }
  #getRoom(roomName) {
    if (!this.#rooms[roomName]) {
      this.#rooms[roomName] = new SyncRoom(roomName);
      this.#rooms[roomName].addRoomChangeListener((roomState) => {
        setTimeout(() => {
          if (this.#rooms[roomName] && !Object.values(roomState.clients ?? {}).length) {
            console.log("closing room", roomName);
            delete this.#rooms[roomName];
          }
        }, 1e4);
      });
    }
    return this.#rooms[roomName];
  }
}

class ClientData {
  syncClient;
  clientId = "";
  constructor(syncClient) {
    this.syncClient = syncClient;
  }
  #getAbsolutePath(path) {
    return path.length ? `clients/~{self}/${path}` : "clients/~{self}";
  }
  getData(path) {
    return this.syncClient.getData(this.#getAbsolutePath(path));
  }
  observe(paths) {
    return this.syncClient.observe(paths === undefined ? undefined : Array.isArray(paths) ? paths.map((p) => this.#getAbsolutePath(p)) : this.#getAbsolutePath(paths));
  }
  removeObserver(observer) {
    this.syncClient.removeObserver(observer);
  }
  setData(path, value, options) {
    return this.syncClient.setData(this.#getAbsolutePath(path), value, options);
  }
  pushData(path, value, options) {
    return this.syncClient.pushData(this.#getAbsolutePath(path), value, options);
  }
  get state() {
    return this.syncClient.state.clients?.[this.clientId] ?? {};
  }
}

class SubData {
  path;
  syncClient;
  #parts = [];
  #observers = new Set;
  constructor(path, syncClient) {
    this.path = path;
    this.syncClient = syncClient;
    this.#parts = path.split("/").map((v) => {
      return isNaN(Number(v)) ? v : Number(v);
    });
  }
  getData(path) {
    return this.syncClient.getData(this.#getAbsolutePath(path));
  }
  get clientId() {
    return this.syncClient.clientId;
  }
  #getAbsolutePath(path) {
    return path.length ? `${this.path}/${path}` : this.path;
  }
  observe(paths) {
    const observer = this.syncClient.observe(paths === undefined ? undefined : Array.isArray(paths) ? paths.map((p) => this.#getAbsolutePath(p)) : this.#getAbsolutePath(paths));
    this.#observers.add(observer);
    return observer;
  }
  removeObserver(observer) {
    this.#observers.delete(observer);
    this.syncClient.removeObserver(observer);
  }
  setData(path, value, options) {
    return this.syncClient.setData(this.#getAbsolutePath(path), value, options);
  }
  pushData(path, value, options) {
    return this.syncClient.pushData(this.#getAbsolutePath(path), value, options);
  }
  get state() {
    return getLeafObject(this.syncClient.state, this.#parts, 0, false, {
      self: this.syncClient.clientId
    }) ?? {};
  }
  close() {
    this.#observers.forEach((o) => this.removeObserver(o));
    this.syncClient.removeChildData(this.path);
  }
}

class PeerManager {
  #peerConnection;
  #dataChannel;
  #onData;
  #onClose;
  #onReady;
  connected = false;
  ready = false;
  processor = new Processor2((blob) => this.#send(blob));
  constructor({ onData, onIce, onClose, onReady }) {
    this.#onData = onData;
    this.#onClose = onClose;
    this.#onReady = onReady;
    this.#peerConnection = new RTCPeerConnection;
    this.#peerConnection.ondatachannel = (event) => {
      this.#dataChannel = event.channel;
      this.#setupDataChannel();
    };
    this.#peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        onIce(event.candidate);
      }
    };
  }
  addIceCandidate(ice) {
    this.#peerConnection.addIceCandidate(ice);
  }
  async createOffer() {
    this.#dataChannel = this.#peerConnection.createDataChannel("data");
    this.#setupDataChannel();
    return this.#peerConnection.createOffer().then((offer) => {
      this.#peerConnection.setLocalDescription(offer);
      return offer;
    });
  }
  async acceptOffer(offer) {
    this.#peerConnection.setRemoteDescription(offer);
    this.connected = true;
    return this.#peerConnection.createAnswer().then((answer) => {
      this.#peerConnection.setLocalDescription(answer);
      return answer;
    });
  }
  async acceptAnswer(answer) {
    this.connected = true;
    await this.#peerConnection.setRemoteDescription(answer);
  }
  #send(data) {
    if (data instanceof Blob) {
      this.#dataChannel?.send(data);
    } else {
      this.#dataChannel?.send(JSON.stringify(data));
    }
  }
  #setupDataChannel() {
    if (!this.#dataChannel)
      return;
    this.#dataChannel.onopen = () => {
      this.#send({ msg: "hello" });
    };
    this.#dataChannel.onmessage = async (event) => {
      const obj = typeof event.data === "string" ? JSON.parse(event.data) : event.data instanceof ArrayBuffer ? new Blob([event.data]) : event.data;
      if (obj.msg === "hello") {
        this.ready = true;
        this.#onReady();
        return;
      }
      this.#onData(obj);
    };
    this.#dataChannel.onclose = this.#onClose;
  }
  close() {
    this.#dataChannel?.close();
    this.#peerConnection.close();
  }
}
var WEB_RTC = "webRTC";
var DELAY_TO_DISCONNECT_WEBSOCKET_AFTER_PEER = 3000;
var PEER_OPTIONS = {
  active: true
};
function checkPeerConnections(syncClient) {
  for (const k in syncClient.state.peer) {
    const clients = k.split(":");
    const clientTag = `${clients[0]}:${clients[1]}`;
    if (clients[0] === syncClient.clientId) {
      if (clients.length >= 2 && !syncClient.state.peer[`${clientTag}:${WEB_RTC}`]?.[clients[0]]?.offer) {
        if (!syncClient.peerManagers[clients[1]]) {
          createPeerManager(syncClient, clientTag, clients[1]);
          syncClient.peerManagers[clients[1]].createOffer().then((offer) => {
            syncClient.setData(`peer/${clientTag}:${WEB_RTC}/${clients[0]}/offer`, offer, PEER_OPTIONS);
          });
        }
      }
      if (syncClient.state.peer[`${clientTag}:${WEB_RTC}`]?.[clients[1]]?.answer) {
        if (!syncClient.peerManagers[clients[1]].connected) {
          syncClient.peerManagers[clients[1]].acceptAnswer(syncClient.state.peer[`${clientTag}:${WEB_RTC}`]?.[clients[1]]?.answer).then(() => {
            console.log("Peer connected", clientTag);
          });
          syncClient.observe(`peer/${clientTag}:${WEB_RTC}/${clients[1]}/ice/~{keys}`).onElementsAdded((candidates) => {
            candidates?.forEach((candidateName) => {
              const candidate = syncClient.state.peer?.[`${clientTag}:${WEB_RTC}`]?.[clients[1]]?.ice?.[candidateName];
              syncClient.peerManagers[clients[1]].addIceCandidate(candidate);
              syncClient.setData(`peer/${clientTag}:${WEB_RTC}/${clients[1]}/ice/${candidateName}`, undefined, PEER_OPTIONS);
            });
          });
          syncClient.setData(`peer/${clientTag}:${WEB_RTC}/${clients[1]}/answer`, undefined, PEER_OPTIONS);
        }
      }
    } else if (clients[1] === syncClient.clientId) {
      if (syncClient.state.peer[`${clientTag}:${WEB_RTC}`]?.[clients[0]]?.offer) {
        if (!syncClient.peerManagers[clients[0]]) {
          createPeerManager(syncClient, clientTag, clients[0]);
          syncClient.peerManagers[clients[0]].acceptOffer(syncClient.state.peer[`${clientTag}:${WEB_RTC}`]?.[clients[0]]?.offer).then((answer) => {
            syncClient.setData(`peer/${clientTag}:${WEB_RTC}/${clients[1]}/answer`, answer, PEER_OPTIONS);
            syncClient.observe(`peer/${clientTag}:${WEB_RTC}/${clients[0]}/ice/~{keys}`).onElementsAdded((candidates) => {
              candidates?.forEach((candidateName) => {
                const candidate = syncClient.state.peer?.[`${clientTag}:${WEB_RTC}`]?.[clients[0]]?.ice?.[candidateName];
                syncClient.peerManagers[clients[0]].addIceCandidate(candidate);
                console.log("~=>> delete", `peer/${clientTag}:${WEB_RTC}/${clients[0]}/ice/${candidateName}`);
                syncClient.setData(`peer/${clientTag}:${WEB_RTC}/${clients[0]}/ice/${candidateName}`, undefined, PEER_OPTIONS);
              });
            });
          });
          syncClient.setData(`peer/${clientTag}:${WEB_RTC}/${clients[0]}/offer`, undefined, PEER_OPTIONS);
        }
      }
    }
  }
}
function createPeerManager(syncClient, tag, peerId) {
  console.log("Creating peer manager");
  syncClient.peerManagers[peerId] = new PeerManager({
    onData(data) {
      if (data instanceof Blob) {
        syncClient.onMessageBlob(data, true);
      }
    },
    onIce(ice) {
      const candidate = ice.candidate.split(" ")[0];
      syncClient.setData(`peer/${tag}:${WEB_RTC}/${syncClient.clientId}/ice/${candidate}`, ice, PEER_OPTIONS);
    },
    onClose() {
      syncClient.peerManagers[peerId]?.close();
      delete syncClient.peerManagers[peerId];
      for (let key in syncClient.state.peer) {
        const clients = key.split(":");
        if (clients.includes(peerId)) {
          syncClient.setData(`peer/${key}`, undefined, PEER_OPTIONS);
        }
      }
      console.log("Peer closed: ", `${syncClient.clientId}↔️${peerId}`);
    },
    onReady() {
      if (syncClient.state.config?.peerOnly) {
        setTimeout(() => syncClient.close(), DELAY_TO_DISCONNECT_WEBSOCKET_AFTER_PEER);
      }
    }
  });
}

class SyncClient {
  socketProvider;
  state;
  #children = new Map;
  #socket;
  #connectionPromise;
  #selfData = new ClientData(this);
  peerManagers = {};
  #localTimeOffset = 0;
  #nextFrameInProcess = false;
  #secret;
  #processor = new Processor2((blob) => {
    if (blob.size > 1024 * 1024 * 10) {
      console.error(`Blob too large: ${blob.size / 1024 / 1024} MB`);
      return;
    }
    this.#socket?.send(blob);
  });
  #outgoingUpdates = [];
  #closeListener = () => {};
  constructor(socketProvider, initialState = {}) {
    this.socketProvider = socketProvider;
    this.state = initialState;
    this.#connect();
    globalThis.addEventListener("focus", () => {
      if (!this.#socket) {
        const autoReconnect = this.state.config?.autoReconnect ?? true;
        if (autoReconnect) {
          this.#connect().catch((e) => {
            console.warn("Failed to reconnect");
          });
        }
      }
    });
    this.#children.set(`clients/~{self}`, this.#selfData);
  }
  onClose(listener) {
    this.#closeListener = listener;
    return this;
  }
  getData(path) {
    const context = {
      root: this.state,
      secret: this.#secret,
      clientId: this.clientId,
      localTimeOffset: this.#localTimeOffset,
      properties: {
        self: this.clientId,
        now: this.now
      }
    };
    return getData(context, path);
  }
  pushData(path, value, options = {}) {
    pushData(this.state, this.now, this.#outgoingUpdates, path, value, options);
    this.#prepareNextFrame();
  }
  setData(path, value, options = {}) {
    setData(this.state, this.now, this.#outgoingUpdates, path, value, options);
    this.#prepareNextFrame();
  }
  get clientId() {
    return this.#selfData.clientId;
  }
  get self() {
    return this.#selfData;
  }
  access(path) {
    const childData = this.#children.get(path);
    if (childData) {
      return childData;
    }
    const subData = new SubData(path, this);
    this.#children.set(path, subData);
    return subData;
  }
  peerData(peerId) {
    const peerTag = [this.clientId, peerId].sort().join(":");
    return this.access(`peer/${peerTag}`);
  }
  removeChildData(path) {
    this.#children.delete(path);
  }
  observe(paths) {
    return this.#processor.observe(paths);
  }
  removeObserver(observer) {
    this.#processor.removeObserver(observer);
  }
  async#waitForConnection() {
    if (!this.#socket) {
      this.#connect();
    }
    return this.#connectionPromise;
  }
  async#connect() {
    const socket = this.#socket = await this.socketProvider();
    return this.#connectionPromise = new Promise((resolve, reject) => {
      socket.onError((event) => {
        console.error("SyncClient connection error", event);
        reject(event);
      });
      socket.onMessage(async (data) => {
        const preClientId = this.clientId;
        await this.onMessageBlob(data);
        if (!preClientId && this.clientId) {
          resolve();
        }
      });
      socket.onClose(() => {
        this.#socket = undefined;
        this.#closeListener();
      });
    });
  }
  close() {
    this.#socket?.close();
  }
  async onMessageBlob(blob, skipValidation = false) {
    const context = {
      root: this.state,
      secret: this.#secret,
      clientId: this.clientId,
      localTimeOffset: this.#localTimeOffset,
      properties: {
        self: this.clientId,
        now: this.now
      },
      skipValidation: skipValidation || this.state.config?.signPayloads === false
    };
    await this.#processor.receivedBlob(blob, context);
    this.#localTimeOffset = context.localTimeOffset;
    this.#secret = context.secret;
    this.#selfData.clientId = context.clientId;
    this.#prepareNextFrame();
  }
  get now() {
    return Date.now() + this.#localTimeOffset;
  }
  #prepareNextFrame() {
    if (this.#nextFrameInProcess) {
      return;
    }
    this.#nextFrameInProcess = true;
    requestAnimationFrame(() => {
      this.#nextFrameInProcess = false;
      this.#processNextFrame();
    });
  }
  async#processNextFrame() {
    if (this.#outgoingUpdates.some((update) => !update?.path.startsWith("peer/"))) {
      await this.#waitForConnection();
    }
    this.#outgoingUpdates.forEach((update, index) => {
      if (update?.path.startsWith("peer/")) {
        const tag = update.path.split("/")[1];
        const clientIds = tag.split(":");
        if (clientIds.length === 2) {
          const peerId = clientIds[0] === this.clientId ? clientIds[1] : clientIds[0];
          if (this.peerManagers[peerId]?.ready) {
            this.#outgoingUpdates[index] = undefined;
            update.confirmed = this.now;
            const context2 = {
              root: this.state,
              secret: this.#secret,
              clientId: this.clientId,
              localTimeOffset: this.#localTimeOffset,
              properties: {
                self: this.clientId,
                now: this.now
              },
              outgoingUpdates: [update],
              skipValidation: true
            };
            this.peerManagers[peerId].processor.sendUpdateBlob(context2);
          }
        }
      }
    });
    let j = 0;
    for (let i = 0;i < this.#outgoingUpdates.length; i++) {
      this.#outgoingUpdates[j] = this.#outgoingUpdates[i];
      if (this.#outgoingUpdates[j]) {
        j++;
      }
    }
    this.#outgoingUpdates.length = j;
    const context = {
      root: this.state,
      secret: this.#secret,
      clientId: this.clientId,
      localTimeOffset: this.#localTimeOffset,
      properties: {
        self: this.clientId,
        now: this.now
      },
      outgoingUpdates: this.#outgoingUpdates,
      skipValidation: this.state.config?.signPayloads === false
    };
    this.#processor.performCycle(context);
    if (context.clientId) {
      this.#selfData.clientId = context.clientId;
    }
    if (context.localTimeOffset) {
      this.#localTimeOffset = context.localTimeOffset;
    }
    this.#secret = context.secret;
    checkPeerConnections(this);
  }
}
function provideSocketClient({ host, room }, state = {}) {
  const prefix = host.startsWith("ws://") || host.startsWith("wss://") ? "" : globalThis.location.protocol === "https:" ? "wss://" : "ws://";
  const connectionUrl = `${prefix}${host}${room ? `?room=${room}` : ""}`;
  const socketProvider = async () => {
    const websocket = new WebSocket(connectionUrl);
    websocket.addEventListener("open", () => {
      console.log("SyncClient connection opened");
    });
    return {
      send(data) {
        websocket.send(data);
      },
      onMessage(listener) {
        websocket.addEventListener("message", (event) => {
          listener(event.data);
        });
      },
      onError(listener) {
        websocket.addEventListener("error", listener);
      },
      onClose(listener) {
        websocket.addEventListener("close", listener);
      },
      close() {
        websocket.close();
      },
      supportBlob: true
    };
  };
  return new SyncClient(socketProvider, state);
}
var EMOJIS = [
  "\uD83D\uDC35",
  "\uD83D\uDC12",
  "\uD83E\uDD8D",
  "\uD83E\uDDA7",
  "\uD83D\uDC36",
  "\uD83D\uDC15",
  "\uD83E\uDDAE",
  "\uD83D\uDC15‍\uD83E\uDDBA",
  "\uD83D\uDC29",
  "\uD83D\uDC3A",
  "\uD83E\uDD8A",
  "\uD83E\uDD9D",
  "\uD83D\uDC31",
  "\uD83D\uDC08",
  "\uD83D\uDC08‍⬛",
  "\uD83E\uDD81",
  "\uD83D\uDC2F",
  "\uD83D\uDC05",
  "\uD83D\uDC06",
  "\uD83D\uDC34",
  "\uD83E\uDECE",
  "\uD83E\uDECF",
  "\uD83D\uDC0E",
  "\uD83E\uDD84",
  "\uD83E\uDD93",
  "\uD83E\uDD8C",
  "\uD83E\uDDAC",
  "\uD83D\uDC2E",
  "\uD83D\uDC02",
  "\uD83D\uDC03",
  "\uD83D\uDC04",
  "\uD83D\uDC37",
  "\uD83D\uDC16",
  "\uD83D\uDC17",
  "\uD83D\uDC3D",
  "\uD83D\uDC0F",
  "\uD83D\uDC11",
  "\uD83D\uDC10",
  "\uD83D\uDC2A",
  "\uD83D\uDC2B",
  "\uD83E\uDD99",
  "\uD83E\uDD92",
  "\uD83D\uDC18",
  "\uD83E\uDDA3",
  "\uD83E\uDD8F",
  "\uD83E\uDD9B",
  "\uD83D\uDC2D",
  "\uD83D\uDC01",
  "\uD83D\uDC00",
  "\uD83D\uDC39",
  "\uD83D\uDC30",
  "\uD83D\uDC07",
  "\uD83D\uDC3F️",
  "\uD83E\uDDAB",
  "\uD83E\uDD94",
  "\uD83E\uDD87",
  "\uD83D\uDC3B",
  "\uD83D\uDC3B‍❄️",
  "\uD83D\uDC28",
  "\uD83D\uDC3C",
  "\uD83E\uDDA5",
  "\uD83E\uDDA6",
  "\uD83E\uDDA8",
  "\uD83E\uDD98",
  "\uD83E\uDDA1",
  "\uD83D\uDC3E",
  "\uD83E\uDD83",
  "\uD83D\uDC14",
  "\uD83D\uDC13",
  "\uD83D\uDC23",
  "\uD83D\uDC24",
  "\uD83D\uDC25",
  "\uD83D\uDC26",
  "\uD83D\uDC27",
  "\uD83D\uDD4A️",
  "\uD83E\uDD85",
  "\uD83E\uDD86",
  "\uD83E\uDDA2",
  "\uD83E\uDD89",
  "\uD83E\uDDA4",
  "\uD83E\uDEB6",
  "\uD83E\uDDA9",
  "\uD83E\uDD9A",
  "\uD83E\uDD9C",
  "\uD83E\uDEBD",
  "\uD83D\uDC26‍⬛",
  "\uD83E\uDEBF",
  "\uD83D\uDC26‍\uD83D\uDD25",
  "\uD83E\uDEB9",
  "\uD83E\uDEBA",
  "\uD83D\uDC38",
  "\uD83D\uDC0A",
  "\uD83D\uDC22",
  "\uD83E\uDD8E",
  "\uD83D\uDC0D",
  "\uD83D\uDC32",
  "\uD83D\uDC09",
  "\uD83E\uDD95",
  "\uD83E\uDD96",
  "\uD83D\uDC33",
  "\uD83D\uDC0B",
  "\uD83D\uDC2C",
  "\uD83E\uDDAD",
  "\uD83D\uDC1F",
  "\uD83D\uDC20",
  "\uD83D\uDC21",
  "\uD83E\uDD88",
  "\uD83D\uDC19",
  "\uD83D\uDC1A",
  "\uD83E\uDEB8",
  "\uD83E\uDEBC",
  "\uD83E\uDD80",
  "\uD83E\uDD9E",
  "\uD83E\uDD90",
  "\uD83E\uDD91",
  "\uD83E\uDDAA",
  "\uD83D\uDC0C",
  "\uD83E\uDD8B",
  "\uD83D\uDC1B",
  "\uD83D\uDC1C",
  "\uD83D\uDC1D",
  "\uD83E\uDEB2",
  "\uD83D\uDC1E",
  "\uD83E\uDD97",
  "\uD83E\uDEB3",
  "\uD83D\uDD77️",
  "\uD83D\uDD78️",
  "\uD83E\uDD82",
  "\uD83E\uDD9F",
  "\uD83E\uDEB0",
  "\uD83E\uDEB1",
  "\uD83E\uDDA0",
  "\uD83D\uDC90",
  "\uD83C\uDF38",
  "\uD83D\uDCAE",
  "\uD83E\uDEB7",
  "\uD83C\uDFF5️",
  "\uD83C\uDF39",
  "\uD83E\uDD40",
  "\uD83C\uDF3A",
  "\uD83C\uDF3B",
  "\uD83C\uDF3C",
  "\uD83C\uDF37",
  "\uD83E\uDEBB",
  "\uD83C\uDF31",
  "\uD83E\uDEB4",
  "\uD83C\uDF32",
  "\uD83C\uDF33",
  "\uD83C\uDF34",
  "\uD83C\uDF35",
  "\uD83C\uDF3E",
  "\uD83C\uDF3F",
  "☘️",
  "\uD83C\uDF40",
  "\uD83C\uDF41",
  "\uD83C\uDF42",
  "\uD83C\uDF43",
  "\uD83C\uDF44",
  "\uD83E\uDEA8",
  "\uD83E\uDEB5"
];
function handleUsersChanged(syncClient) {
  const userAddedSet = new Set;
  const userRemovedSet = new Set;
  syncClient.observe("clients/~{keys}").onElementsAdded((clientIds) => {
    clientIds?.forEach((clientId) => {
      const isSelf = clientId === syncClient.clientId;
      const observers = new Set;
      userAddedSet.forEach((userAdded) => userAdded(clientId, isSelf, observers));
      observers.add(syncClient.observe(`clients/${clientId}`).onChange((client) => {
        if (client === undefined) {
          observers.forEach((observer) => observer.close());
        }
      }));
    });
  }).onElementsDeleted((clientIds) => {
    clientIds.forEach((clientId) => userRemovedSet.forEach((userRemoved) => userRemoved(clientId)));
  });
  const returnValue = {
    onUserAdded: (callback) => {
      if (callback) {
        userAddedSet.add(callback);
      }
      return returnValue;
    },
    onUserRemoved: (callback) => {
      if (callback) {
        userRemovedSet.add(callback);
      }
      return returnValue;
    }
  };
  return returnValue;
}
function displayUsers(syncClient, userDiv) {
  userDiv = userDiv ?? document.body.appendChild(document.createElement("div"));
  userDiv.classList.add("syncousers");
  handleUsersChanged(syncClient).onUserAdded?.((clientId, isSelf, observers) => {
    console.log("added", clientId);
    getOrCreateClientBox(syncClient, userDiv, observers, clientId, isSelf);
  }).onUserRemoved?.((clientId) => {
    console.log("removed", clientId);
    const client = document.querySelector(`#div-${clientId}`);
    if (client) {
      client.style.transition = "opacity 0.3s";
      client.style.opacity = "0";
      setTimeout(() => {
        client.remove();
      }, 300);
    }
  });
  introduceName(syncClient);
}
function introduceName(syncClient) {
  syncClient.self.setData("name", randomName());
  syncClient.self.setData("emoji", randomEmoji());
}
var name;
function randomName() {
  return name ?? (name = "guest-" + Math.random().toString(36).substring(8));
}
var emoji;
function randomEmoji(forceRandom) {
  return (forceRandom ? null : emoji) ?? (emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
}
function getOrCreateClientBox(syncClient, container, observers, clientId, isSelf) {
  const box = document.querySelector(`#client-${clientId}`);
  if (box) {
    return box;
  }
  const clientBox = document.createElement("div");
  clientBox.id = `client-${clientId}`;
  clientBox.classList.add("client-box");
  clientBox.style.backgroundColor = isSelf ? "yellow" : "";
  clientBox.style.fontWeight = isSelf ? "bold" : "normal";
  clientBox.style.display = "flex";
  clientBox.style.flexDirection = "row";
  const emojiDiv = clientBox.appendChild(document.createElement("span"));
  emojiDiv.style.marginRight = "5px";
  if (isSelf) {
    emojiDiv.style.cursor = "pointer";
    emojiDiv.addEventListener("click", () => {
      syncClient.setData(`clients/~{self}/emoji`, randomEmoji(true));
    });
  }
  const nameDiv = clientBox.appendChild(document.createElement("div"));
  nameDiv.id = `name-${clientId}`;
  nameDiv.style.width = "calc(100% - 10px)";
  observers.add(syncClient.observe([
    `clients/${clientId}/emoji`,
    `clients/${clientId}/name`
  ]).onChange(([emoji2, name2]) => {
    emojiDiv.textContent = emoji2;
    nameDiv.textContent = name2;
  }));
  if (isSelf) {
    container.prepend(clientBox);
  } else {
    container.appendChild(clientBox);
  }
  return clientBox;
}

// ../src/cycles/data-update/data-update.ts
var KEYS3 = "~{keys}";
var VALUES3 = "~{values}";
var REGEX3 = /~\{([^}]+)\}/;
function commitUpdates3(root, properties, updatedPaths = {}) {
  if (!root || !root.updates?.length) {
    return updatedPaths;
  }
  sortUpdates3(root.updates);
  root.updates?.forEach((update) => {
    if (!update.confirmed) {
      return;
    }
    const parts = update.path.split("/");
    const leaf = getLeafObject3(root, parts, 1, true);
    const prop = parts[parts.length - 1];
    const value = translateValue3(update.value, properties);
    if (update.append) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop], value];
    } else if ((update.insert ?? -1) >= 0) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop].slice(0, update.insert ?? -1), value, ...leaf[prop].slice(update.insert)];
    } else if ((update.delete ?? -1) >= 0) {
      if (Array.isArray(leaf[prop])) {
        leaf[prop] = [...leaf[prop].slice(0, update.delete), ...leaf[prop].slice((update.delete ?? -1) + 1)];
      }
    } else if (value === undefined) {
      delete leaf[prop];
      cleanupRoot3(root, parts, 0);
    } else {
      leaf[prop] = value;
    }
    updatedPaths[update.path] = leaf[prop];
  });
  clearUpdates3(root, updatedPaths);
  return updatedPaths;
}
function cleanupRoot3(root, parts, index) {
  if (!root || typeof root !== "object" || Array.isArray(root)) {
    return false;
  }
  if (cleanupRoot3(root[parts[index]], parts, index + 1)) {
    delete root[parts[index]];
  }
  return Object.keys(root).length === 0;
}
function clearUpdates3(root, updatedPaths) {
  root.updates = root.updates?.filter((update) => !(update.path in updatedPaths));
  if (!root.updates?.length) {
    delete root.updates;
  }
}
function sortUpdates3(updates) {
  updates?.sort((a, b4) => {
    const confirmedA = a.confirmed ?? 0;
    const confirmedB = b4.confirmed ?? 0;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    return a.path.localeCompare(b4.path);
  });
}
function getLeafObject3(obj, parts, offset, autoCreate, properties = {}) {
  let current = obj;
  for (let i = 0;i < parts.length - offset; i++) {
    const prop = parts[i];
    const value = translateProp3(current, prop, properties, autoCreate);
    if (value === undefined) {
      return value;
    }
    current = value;
  }
  return current;
}
function translateValue3(value, properties) {
  if (typeof value !== "string") {
    return value;
  }
  if (value.startsWith("~{") && value.endsWith("}")) {
    switch (value) {
      default:
        const group = value.match(REGEX3);
        if (group) {
          return properties[group[1]];
        }
    }
  }
  return value;
}
function translateProp3(obj, prop, properties, autoCreate) {
  let value;
  if (typeof prop !== "string") {
    value = obj[prop];
  } else if (prop.startsWith("~{") && prop.endsWith("}")) {
    switch (prop) {
      case KEYS3:
        return Object.keys(obj ?? {});
      case VALUES3:
        return Object.values(obj ?? {});
      default:
        return obj[translateValue3(prop, properties)];
    }
  } else {
    value = obj[prop];
  }
  if (value === undefined && autoCreate) {
    value = obj[prop] = {};
  }
  return value;
}
// ../node_modules/@dobuki/data-blob/dist/index.js
var Yn4 = Object.create;
var { defineProperty: Rt4, getPrototypeOf: En4, getOwnPropertyNames: In3 } = Object;
var Nn4 = Object.prototype.hasOwnProperty;
var xn4 = (n, t, i) => {
  i = n != null ? Yn4(En4(n)) : {};
  let r = t || !n || !n.__esModule ? Rt4(i, "default", { value: n, enumerable: true }) : i;
  for (let m4 of In3(n))
    if (!Nn4.call(r, m4))
      Rt4(r, m4, { get: () => n[m4], enumerable: true });
  return r;
};
var b4 = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports);
var jn4 = b4((n, t) => {
  var i = function(x) {
    throw { name: "SyntaxError", message: x, at: g3, text: N2 };
  }, r = function(x) {
    if (x && x !== h)
      i("Expected '" + x + "' instead of '" + h + "'");
    return h = N2.charAt(g3), g3 += 1, h;
  }, m4 = function() {
    var x, v = "";
    if (h === "-")
      v = "-", r("-");
    while (h >= "0" && h <= "9")
      v += h, r();
    if (h === ".") {
      v += ".";
      while (r() && h >= "0" && h <= "9")
        v += h;
    }
    if (h === "e" || h === "E") {
      if (v += h, r(), h === "-" || h === "+")
        v += h, r();
      while (h >= "0" && h <= "9")
        v += h, r();
    }
    if (x = Number(v), !isFinite(x))
      i("Bad number");
    return x;
  }, c3 = function() {
    var x, v, j = "", S;
    if (h === '"')
      while (r())
        if (h === '"')
          return r(), j;
        else if (h === "\\")
          if (r(), h === "u") {
            S = 0;
            for (v = 0;v < 4; v += 1) {
              if (x = parseInt(r(), 16), !isFinite(x))
                break;
              S = S * 16 + x;
            }
            j += String.fromCharCode(S);
          } else if (typeof Y[h] === "string")
            j += Y[h];
          else
            break;
        else
          j += h;
    i("Bad string");
  }, u = function() {
    while (h && h <= " ")
      r();
  }, I = function() {
    switch (h) {
      case "t":
        return r("t"), r("r"), r("u"), r("e"), true;
      case "f":
        return r("f"), r("a"), r("l"), r("s"), r("e"), false;
      case "n":
        return r("n"), r("u"), r("l"), r("l"), null;
      default:
        i("Unexpected '" + h + "'");
    }
  }, s = function() {
    var x = [];
    if (h === "[") {
      if (r("["), u(), h === "]")
        return r("]"), x;
      while (h) {
        if (x.push(E4()), u(), h === "]")
          return r("]"), x;
        r(","), u();
      }
    }
    i("Bad array");
  }, e = function() {
    var x, v = {};
    if (h === "{") {
      if (r("{"), u(), h === "}")
        return r("}"), v;
      while (h) {
        if (x = c3(), u(), r(":"), Object.prototype.hasOwnProperty.call(v, x))
          i('Duplicate key "' + x + '"');
        if (v[x] = E4(), u(), h === "}")
          return r("}"), v;
        r(","), u();
      }
    }
    i("Bad object");
  }, E4 = function() {
    switch (u(), h) {
      case "{":
        return e();
      case "[":
        return s();
      case '"':
        return c3();
      case "-":
        return m4();
      default:
        return h >= "0" && h <= "9" ? m4() : I();
    }
  }, g3, h, Y = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, N2;
  t.exports = function(x, v) {
    var j;
    if (N2 = x, g3 = 0, h = " ", j = E4(), u(), h)
      i("Syntax error");
    return typeof v === "function" ? function S(A2, T4) {
      var d, R2, P = A2[T4];
      if (P && typeof P === "object") {
        for (d in E4)
          if (Object.prototype.hasOwnProperty.call(P, d))
            if (R2 = S(P, d), typeof R2 === "undefined")
              delete P[d];
            else
              P[d] = R2;
      }
      return v.call(A2, T4, P);
    }({ "": j }, "") : j;
  };
});
var vn4 = b4((n, t) => {
  var i = function(e) {
    return m4.lastIndex = 0, m4.test(e) ? '"' + e.replace(m4, function(E4) {
      var g3 = I[E4];
      return typeof g3 === "string" ? g3 : "\\u" + ("0000" + E4.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + e + '"';
  }, r = function(e, E4) {
    var g3, h, Y, N2, x = c3, v, j = E4[e];
    if (j && typeof j === "object" && typeof j.toJSON === "function")
      j = j.toJSON(e);
    if (typeof s === "function")
      j = s.call(E4, e, j);
    switch (typeof j) {
      case "string":
        return i(j);
      case "number":
        return isFinite(j) ? String(j) : "null";
      case "boolean":
      case "null":
        return String(j);
      case "object":
        if (!j)
          return "null";
        if (c3 += u, v = [], Object.prototype.toString.apply(j) === "[object Array]") {
          N2 = j.length;
          for (g3 = 0;g3 < N2; g3 += 1)
            v[g3] = r(g3, j) || "null";
          return Y = v.length === 0 ? "[]" : c3 ? `[
` + c3 + v.join(`,
` + c3) + `
` + x + "]" : "[" + v.join(",") + "]", c3 = x, Y;
        }
        if (s && typeof s === "object") {
          N2 = s.length;
          for (g3 = 0;g3 < N2; g3 += 1)
            if (h = s[g3], typeof h === "string") {
              if (Y = r(h, j), Y)
                v.push(i(h) + (c3 ? ": " : ":") + Y);
            }
        } else
          for (h in j)
            if (Object.prototype.hasOwnProperty.call(j, h)) {
              if (Y = r(h, j), Y)
                v.push(i(h) + (c3 ? ": " : ":") + Y);
            }
        return Y = v.length === 0 ? "{}" : c3 ? `{
` + c3 + v.join(`,
` + c3) + `
` + x + "}" : "{" + v.join(",") + "}", c3 = x, Y;
      default:
    }
  }, m4 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c3, u, I = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, s;
  t.exports = function(e, E4, g3) {
    var h;
    if (c3 = "", u = "", typeof g3 === "number")
      for (h = 0;h < g3; h += 1)
        u += " ";
    else if (typeof g3 === "string")
      u = g3;
    if (s = E4, E4 && typeof E4 !== "function" && (typeof E4 !== "object" || typeof E4.length !== "number"))
      throw new Error("JSON.stringify");
    return r("", { "": e });
  };
});
var $n3 = b4((n) => {
  n.parse = jn4(), n.stringify = vn4();
});
var Pn4 = b4((n, t) => {
  var i = {}.toString;
  t.exports = Array.isArray || function(r) {
    return i.call(r) == "[object Array]";
  };
});
var Vt4 = b4((n, t) => {
  var i = Object.prototype.toString;
  t.exports = function r(m4) {
    var c3 = i.call(m4), u = c3 === "[object Arguments]";
    if (!u)
      u = c3 !== "[object Array]" && m4 !== null && typeof m4 === "object" && typeof m4.length === "number" && m4.length >= 0 && i.call(m4.callee) === "[object Function]";
    return u;
  };
});
var Sn4 = b4((n, t) => {
  var i;
  if (!Object.keys)
    r = Object.prototype.hasOwnProperty, m4 = Object.prototype.toString, c3 = Vt4(), u = Object.prototype.propertyIsEnumerable, I = !u.call({ toString: null }, "toString"), s = u.call(function() {}, "prototype"), e = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], E4 = function(N2) {
      var x = N2.constructor;
      return x && x.prototype === N2;
    }, g3 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, h = function() {
      if (typeof window === "undefined")
        return false;
      for (var N2 in window)
        try {
          if (!g3["$" + N2] && r.call(window, N2) && window[N2] !== null && typeof window[N2] === "object")
            try {
              E4(window[N2]);
            } catch (x) {
              return true;
            }
        } catch (x) {
          return true;
        }
      return false;
    }(), Y = function(N2) {
      if (typeof window === "undefined" || !h)
        return E4(N2);
      try {
        return E4(N2);
      } catch (x) {
        return false;
      }
    }, i = function N(x) {
      var v = x !== null && typeof x === "object", j = m4.call(x) === "[object Function]", S = c3(x), A2 = v && m4.call(x) === "[object String]", T4 = [];
      if (!v && !j && !S)
        throw new TypeError("Object.keys called on a non-object");
      var d = s && j;
      if (A2 && x.length > 0 && !r.call(x, 0))
        for (var R2 = 0;R2 < x.length; ++R2)
          T4.push(String(R2));
      if (S && x.length > 0)
        for (var P = 0;P < x.length; ++P)
          T4.push(String(P));
      else
        for (var H in x)
          if (!(d && H === "prototype") && r.call(x, H))
            T4.push(String(H));
      if (I) {
        var U = Y(x);
        for (var a = 0;a < e.length; ++a)
          if (!(U && e[a] === "constructor") && r.call(x, e[a]))
            T4.push(e[a]);
      }
      return T4;
    };
  var r, m4, c3, u, I, s, e, E4, g3, h, Y;
  t.exports = i;
});
var Tn4 = b4((n, t) => {
  var i = Array.prototype.slice, r = Vt4(), m4 = Object.keys, c3 = m4 ? function I(s) {
    return m4(s);
  } : Sn4(), u = Object.keys;
  c3.shim = function I() {
    if (Object.keys) {
      var s = function() {
        var e = Object.keys(arguments);
        return e && e.length === arguments.length;
      }(1, 2);
      if (!s)
        Object.keys = function e(E4) {
          if (r(E4))
            return u(i.call(E4));
          return u(E4);
        };
    } else
      Object.keys = c3;
    return Object.keys || c3;
  }, t.exports = c3;
});
var An4 = b4((n, t) => {
  var i = "Function.prototype.bind called on incompatible ", r = Object.prototype.toString, m4 = Math.max, c3 = "[object Function]", u = function e(E4, g3) {
    var h = [];
    for (var Y = 0;Y < E4.length; Y += 1)
      h[Y] = E4[Y];
    for (var N2 = 0;N2 < g3.length; N2 += 1)
      h[N2 + E4.length] = g3[N2];
    return h;
  }, I = function e(E4, g3) {
    var h = [];
    for (var Y = g3 || 0, N2 = 0;Y < E4.length; Y += 1, N2 += 1)
      h[N2] = E4[Y];
    return h;
  }, s = function(e, E4) {
    var g3 = "";
    for (var h = 0;h < e.length; h += 1)
      if (g3 += e[h], h + 1 < e.length)
        g3 += E4;
    return g3;
  };
  t.exports = function e(E4) {
    var g3 = this;
    if (typeof g3 !== "function" || r.apply(g3) !== c3)
      throw new TypeError(i + g3);
    var h = I(arguments, 1), Y, N2 = function() {
      if (this instanceof Y) {
        var A2 = g3.apply(this, u(h, arguments));
        if (Object(A2) === A2)
          return A2;
        return this;
      }
      return g3.apply(E4, u(h, arguments));
    }, x = m4(0, g3.length - h.length), v = [];
    for (var j = 0;j < x; j++)
      v[j] = "$" + j;
    if (Y = Function("binder", "return function (" + s(v, ",") + "){ return binder.apply(this,arguments); }")(N2), g3.prototype) {
      var S = function A() {};
      S.prototype = g3.prototype, Y.prototype = new S, S.prototype = null;
    }
    return Y;
  };
});
var vt4 = b4((n, t) => {
  var i = An4();
  t.exports = Function.prototype.bind || i;
});
var kn4 = b4((n, t) => {
  t.exports = Error;
});
var bn4 = b4((n, t) => {
  t.exports = EvalError;
});
var dn4 = b4((n, t) => {
  t.exports = RangeError;
});
var Cn4 = b4((n, t) => {
  t.exports = ReferenceError;
});
var Ut4 = b4((n, t) => {
  t.exports = SyntaxError;
});
var $t4 = b4((n, t) => {
  t.exports = TypeError;
});
var On4 = b4((n, t) => {
  t.exports = URIError;
});
var Rn4 = b4((n, t) => {
  t.exports = function i() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var r = {}, m4 = Symbol("test"), c3 = Object(m4);
    if (typeof m4 === "string")
      return false;
    if (Object.prototype.toString.call(m4) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(c3) !== "[object Symbol]")
      return false;
    var u = 42;
    r[m4] = u;
    for (m4 in r)
      return false;
    if (typeof Object.keys === "function" && Object.keys(r).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(r).length !== 0)
      return false;
    var I = Object.getOwnPropertySymbols(r);
    if (I.length !== 1 || I[0] !== m4)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(r, m4))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var s = Object.getOwnPropertyDescriptor(r, m4);
      if (s.value !== u || s.enumerable !== true)
        return false;
    }
    return true;
  };
});
var Gt4 = b4((n, t) => {
  var i = typeof Symbol !== "undefined" && Symbol, r = Rn4();
  t.exports = function m() {
    if (typeof i !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof i("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return r();
  };
});
var Zt4 = b4((n, t) => {
  var i = { foo: {} }, r = Object;
  t.exports = function m() {
    return { __proto__: i }.foo === i.foo && !({ __proto__: null } instanceof r);
  };
});
var at4 = b4((n, t) => {
  var i = Function.prototype.call, r = Object.prototype.hasOwnProperty, m4 = vt4();
  t.exports = m4.call(i, r);
});
var Pt4 = b4((n, t) => {
  var i, r = kn4(), m4 = bn4(), c3 = dn4(), u = Cn4(), I = Ut4(), s = $t4(), e = On4(), E4 = Function, g3 = function(D) {
    try {
      return E4('"use strict"; return (' + D + ").constructor;")();
    } catch (C) {}
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch (D) {
      h = null;
    }
  var Y = function() {
    throw new s;
  }, N2 = h ? function() {
    try {
      return arguments.callee, Y;
    } catch (D) {
      try {
        return h(arguments, "callee").get;
      } catch (C) {
        return Y;
      }
    }
  }() : Y, x = Gt4()(), v = Zt4()(), j = Object.getPrototypeOf || (v ? function(D) {
    return D.__proto__;
  } : null), S = {}, A2 = typeof Uint8Array === "undefined" || !j ? i : j(Uint8Array), T4 = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? i : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? i : ArrayBuffer, "%ArrayIteratorPrototype%": x && j ? j([][Symbol.iterator]()) : i, "%AsyncFromSyncIteratorPrototype%": i, "%AsyncFunction%": S, "%AsyncGenerator%": S, "%AsyncGeneratorFunction%": S, "%AsyncIteratorPrototype%": S, "%Atomics%": typeof Atomics === "undefined" ? i : Atomics, "%BigInt%": typeof BigInt === "undefined" ? i : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? i : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": r, "%eval%": eval, "%EvalError%": m4, "%Float32Array%": typeof Float32Array === "undefined" ? i : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? i : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? i : FinalizationRegistry, "%Function%": E4, "%GeneratorFunction%": S, "%Int8Array%": typeof Int8Array === "undefined" ? i : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? i : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": x && j ? j(j([][Symbol.iterator]())) : i, "%JSON%": typeof JSON === "object" ? JSON : i, "%Map%": typeof Map === "undefined" ? i : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !x || !j ? i : j(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? i : Promise, "%Proxy%": typeof Proxy === "undefined" ? i : Proxy, "%RangeError%": c3, "%ReferenceError%": u, "%Reflect%": typeof Reflect === "undefined" ? i : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? i : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !x || !j ? i : j(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": x && j ? j(""[Symbol.iterator]()) : i, "%Symbol%": x ? Symbol : i, "%SyntaxError%": I, "%ThrowTypeError%": N2, "%TypedArray%": A2, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? i : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? i : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? i : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? i : Uint32Array, "%URIError%": e, "%WeakMap%": typeof WeakMap === "undefined" ? i : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? i : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? i : WeakSet };
  if (j)
    try {
      null.error;
    } catch (D) {
      d = j(j(D)), T4["%Error.prototype%"] = d;
    }
  var d, R2 = function D(C) {
    var k;
    if (C === "%AsyncFunction%")
      k = g3("async function () {}");
    else if (C === "%GeneratorFunction%")
      k = g3("function* () {}");
    else if (C === "%AsyncGeneratorFunction%")
      k = g3("async function* () {}");
    else if (C === "%AsyncGenerator%") {
      var p = D("%AsyncGeneratorFunction%");
      if (p)
        k = p.prototype;
    } else if (C === "%AsyncIteratorPrototype%") {
      var f4 = D("%AsyncGenerator%");
      if (f4 && j)
        k = j(f4.prototype);
    }
    return T4[C] = k, k;
  }, P = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, H = vt4(), U = at4(), a = H.call(Function.call, Array.prototype.concat), G = H.call(Function.apply, Array.prototype.splice), rt2 = H.call(Function.call, String.prototype.replace), X3 = H.call(Function.call, String.prototype.slice), L = H.call(Function.call, RegExp.prototype.exec), O = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, M3 = /\\(\\)?/g, W = function D(C) {
    var k = X3(C, 0, 1), p = X3(C, -1);
    if (k === "%" && p !== "%")
      throw new I("invalid intrinsic syntax, expected closing `%`");
    else if (p === "%" && k !== "%")
      throw new I("invalid intrinsic syntax, expected opening `%`");
    var f4 = [];
    return rt2(C, O, function(V, Z, o, z) {
      f4[f4.length] = o ? rt2(z, M3, "$1") : Z || V;
    }), f4;
  }, l = function D(C, k) {
    var p = C, f4;
    if (U(P, p))
      f4 = P[p], p = "%" + f4[0] + "%";
    if (U(T4, p)) {
      var V = T4[p];
      if (V === S)
        V = R2(p);
      if (typeof V === "undefined" && !k)
        throw new s("intrinsic " + C + " exists, but is not available. Please file an issue!");
      return { alias: f4, name: p, value: V };
    }
    throw new I("intrinsic " + C + " does not exist!");
  };
  t.exports = function D(C, k) {
    if (typeof C !== "string" || C.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof k !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (L(/^%?[^%]*%?$/, C) === null)
      throw new I("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var p = W(C), f4 = p.length > 0 ? p[0] : "", V = l("%" + f4 + "%", k), Z = V.name, o = V.value, z = false, nt2 = V.alias;
    if (nt2)
      f4 = nt2[0], G(p, a([0, 1], nt2));
    for (var _ = 1, ct2 = true;_ < p.length; _ += 1) {
      var J2 = p[_], Yt2 = X3(J2, 0, 1), Et2 = X3(J2, -1);
      if ((Yt2 === '"' || Yt2 === "'" || Yt2 === "`" || (Et2 === '"' || Et2 === "'" || Et2 === "`")) && Yt2 !== Et2)
        throw new I("property names with quotes must have matching quotes");
      if (J2 === "constructor" || !ct2)
        z = true;
      if (f4 += "." + J2, Z = "%" + f4 + "%", U(T4, Z))
        o = T4[Z];
      else if (o != null) {
        if (!(J2 in o)) {
          if (!k)
            throw new s("base intrinsic for " + C + " exists, but the property is not available.");
          return;
        }
        if (h && _ + 1 >= p.length) {
          var It2 = h(o, J2);
          if (ct2 = !!It2, ct2 && "get" in It2 && !("originalValue" in It2.get))
            o = It2.get;
          else
            o = o[J2];
        } else
          ct2 = U(o, J2), o = o[J2];
        if (ct2 && !z)
          T4[Z] = o;
      }
    }
    return o;
  };
});
var At4 = b4((n, t) => {
  var i = Pt4(), r = i("%Object.defineProperty%", true) || false;
  if (r)
    try {
      r({}, "a", { value: 1 });
    } catch (m4) {
      r = false;
    }
  t.exports = r;
});
var pn4 = b4((n, t) => {
  var i, r = SyntaxError, m4 = Function, c3 = TypeError, u = function(L) {
    try {
      return m4('"use strict"; return (' + L + ").constructor;")();
    } catch (O) {}
  }, I = Object.getOwnPropertyDescriptor;
  if (I)
    try {
      I({}, "");
    } catch (L) {
      I = null;
    }
  var s = function() {
    throw new c3;
  }, e = I ? function() {
    try {
      return arguments.callee, s;
    } catch (L) {
      try {
        return I(arguments, "callee").get;
      } catch (O) {
        return s;
      }
    }
  }() : s, E4 = Gt4()(), g3 = Zt4()(), h = Object.getPrototypeOf || (g3 ? function(L) {
    return L.__proto__;
  } : null), Y = {}, N2 = typeof Uint8Array === "undefined" || !h ? i : h(Uint8Array), x = { "%AggregateError%": typeof AggregateError === "undefined" ? i : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? i : ArrayBuffer, "%ArrayIteratorPrototype%": E4 && h ? h([][Symbol.iterator]()) : i, "%AsyncFromSyncIteratorPrototype%": i, "%AsyncFunction%": Y, "%AsyncGenerator%": Y, "%AsyncGeneratorFunction%": Y, "%AsyncIteratorPrototype%": Y, "%Atomics%": typeof Atomics === "undefined" ? i : Atomics, "%BigInt%": typeof BigInt === "undefined" ? i : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? i : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? i : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? i : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? i : FinalizationRegistry, "%Function%": m4, "%GeneratorFunction%": Y, "%Int8Array%": typeof Int8Array === "undefined" ? i : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? i : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": E4 && h ? h(h([][Symbol.iterator]())) : i, "%JSON%": typeof JSON === "object" ? JSON : i, "%Map%": typeof Map === "undefined" ? i : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !E4 || !h ? i : h(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? i : Promise, "%Proxy%": typeof Proxy === "undefined" ? i : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? i : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? i : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !E4 || !h ? i : h(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": E4 && h ? h(""[Symbol.iterator]()) : i, "%Symbol%": E4 ? Symbol : i, "%SyntaxError%": r, "%ThrowTypeError%": e, "%TypedArray%": N2, "%TypeError%": c3, "%Uint8Array%": typeof Uint8Array === "undefined" ? i : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? i : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? i : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? i : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? i : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? i : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? i : WeakSet };
  if (h)
    try {
      null.error;
    } catch (L) {
      v = h(h(L)), x["%Error.prototype%"] = v;
    }
  var v, j = function L(O) {
    var M3;
    if (O === "%AsyncFunction%")
      M3 = u("async function () {}");
    else if (O === "%GeneratorFunction%")
      M3 = u("function* () {}");
    else if (O === "%AsyncGeneratorFunction%")
      M3 = u("async function* () {}");
    else if (O === "%AsyncGenerator%") {
      var W = L("%AsyncGeneratorFunction%");
      if (W)
        M3 = W.prototype;
    } else if (O === "%AsyncIteratorPrototype%") {
      var l = L("%AsyncGenerator%");
      if (l && h)
        M3 = h(l.prototype);
    }
    return x[O] = M3, M3;
  }, S = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, A2 = vt4(), T4 = at4(), d = A2.call(Function.call, Array.prototype.concat), R2 = A2.call(Function.apply, Array.prototype.splice), P = A2.call(Function.call, String.prototype.replace), H = A2.call(Function.call, String.prototype.slice), U = A2.call(Function.call, RegExp.prototype.exec), a = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, G = /\\(\\)?/g, rt2 = function L(O) {
    var M3 = H(O, 0, 1), W = H(O, -1);
    if (M3 === "%" && W !== "%")
      throw new r("invalid intrinsic syntax, expected closing `%`");
    else if (W === "%" && M3 !== "%")
      throw new r("invalid intrinsic syntax, expected opening `%`");
    var l = [];
    return P(O, a, function(D, C, k, p) {
      l[l.length] = k ? P(p, G, "$1") : C || D;
    }), l;
  }, X3 = function L(O, M3) {
    var W = O, l;
    if (T4(S, W))
      l = S[W], W = "%" + l[0] + "%";
    if (T4(x, W)) {
      var D = x[W];
      if (D === Y)
        D = j(W);
      if (typeof D === "undefined" && !M3)
        throw new c3("intrinsic " + O + " exists, but is not available. Please file an issue!");
      return { alias: l, name: W, value: D };
    }
    throw new r("intrinsic " + O + " does not exist!");
  };
  t.exports = function L(O, M3) {
    if (typeof O !== "string" || O.length === 0)
      throw new c3("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof M3 !== "boolean")
      throw new c3('"allowMissing" argument must be a boolean');
    if (U(/^%?[^%]*%?$/, O) === null)
      throw new r("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var W = rt2(O), l = W.length > 0 ? W[0] : "", D = X3("%" + l + "%", M3), C = D.name, k = D.value, p = false, f4 = D.alias;
    if (f4)
      l = f4[0], R2(W, d([0, 1], f4));
    for (var V = 1, Z = true;V < W.length; V += 1) {
      var o = W[V], z = H(o, 0, 1), nt2 = H(o, -1);
      if ((z === '"' || z === "'" || z === "`" || (nt2 === '"' || nt2 === "'" || nt2 === "`")) && z !== nt2)
        throw new r("property names with quotes must have matching quotes");
      if (o === "constructor" || !Z)
        p = true;
      if (l += "." + o, C = "%" + l + "%", T4(x, C))
        k = x[C];
      else if (k != null) {
        if (!(o in k)) {
          if (!M3)
            throw new c3("base intrinsic for " + O + " exists, but the property is not available.");
          return;
        }
        if (I && V + 1 >= W.length) {
          var _ = I(k, o);
          if (Z = !!_, Z && "get" in _ && !("originalValue" in _.get))
            k = _.get;
          else
            k = k[o];
        } else
          Z = T4(k, o), k = k[o];
        if (Z && !p)
          x[C] = k;
      }
    }
    return k;
  };
});
var Ft4 = b4((n, t) => {
  var i = pn4(), r = i("%Object.getOwnPropertyDescriptor%", true);
  if (r)
    try {
      r([], "length");
    } catch (m4) {
      r = null;
    }
  t.exports = r;
});
var Dn4 = b4((n, t) => {
  var i = At4(), r = Ut4(), m4 = $t4(), c3 = Ft4();
  t.exports = function u(I, s, e) {
    if (!I || typeof I !== "object" && typeof I !== "function")
      throw new m4("`obj` must be an object or a function`");
    if (typeof s !== "string" && typeof s !== "symbol")
      throw new m4("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new m4("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new m4("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new m4("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new m4("`loose`, if provided, must be a boolean");
    var E4 = arguments.length > 3 ? arguments[3] : null, g3 = arguments.length > 4 ? arguments[4] : null, h = arguments.length > 5 ? arguments[5] : null, Y = arguments.length > 6 ? arguments[6] : false, N2 = !!c3 && c3(I, s);
    if (i)
      i(I, s, { configurable: h === null && N2 ? N2.configurable : !h, enumerable: E4 === null && N2 ? N2.enumerable : !E4, value: e, writable: g3 === null && N2 ? N2.writable : !g3 });
    else if (Y || !E4 && !g3 && !h)
      I[s] = e;
    else
      throw new r("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var on4 = b4((n, t) => {
  var i = At4(), r = function m() {
    return !!i;
  };
  r.hasArrayLengthDefineBug = function m() {
    if (!i)
      return null;
    try {
      return i([], "length", { value: 1 }).length !== 1;
    } catch (c3) {
      return true;
    }
  }, t.exports = r;
});
var Wn4 = b4((n, t) => {
  var i = Pt4(), r = Dn4(), m4 = on4()(), c3 = Ft4(), u = $t4(), I = i("%Math.floor%");
  t.exports = function s(e, E4) {
    if (typeof e !== "function")
      throw new u("`fn` is not a function");
    if (typeof E4 !== "number" || E4 < 0 || E4 > 4294967295 || I(E4) !== E4)
      throw new u("`length` must be a positive 32-bit integer");
    var g3 = arguments.length > 2 && !!arguments[2], h = true, Y = true;
    if ("length" in e && c3) {
      var N2 = c3(e, "length");
      if (N2 && !N2.configurable)
        h = false;
      if (N2 && !N2.writable)
        Y = false;
    }
    if (h || Y || !g3)
      if (m4)
        r(e, "length", E4, true, true);
      else
        r(e, "length", E4);
    return e;
  };
});
var Bt4 = b4((n, t) => {
  var i = vt4(), r = Pt4(), m4 = Wn4(), c3 = $t4(), u = r("%Function.prototype.apply%"), I = r("%Function.prototype.call%"), s = r("%Reflect.apply%", true) || i.call(I, u), e = At4(), E4 = r("%Math.max%");
  t.exports = function h(Y) {
    if (typeof Y !== "function")
      throw new c3("a function is required");
    var N2 = s(i, I, arguments);
    return m4(N2, 1 + E4(0, Y.length - (arguments.length - 1)), true);
  };
  var g3 = function h() {
    return s(i, u, arguments);
  };
  if (e)
    e(t.exports, "apply", { value: g3 });
  else
    t.exports.apply = g3;
});
var Ln4 = b4((n, t) => {
  var i = Pt4(), r = Bt4(), m4 = r(i("String.prototype.indexOf"));
  t.exports = function c(u, I) {
    var s = i(u, !!I);
    if (typeof s === "function" && m4(u, ".prototype.") > -1)
      return r(s);
    return s;
  };
});
var Mn4 = b4((n, t) => {
  var i = (typeof JSON !== "undefined" ? JSON : $n3()).stringify, r = Pn4(), m4 = Tn4(), c3 = Bt4(), u = Ln4(), I = u("Array.prototype.join"), s = u("Array.prototype.push"), e = function g(h, Y) {
    var N2 = "";
    for (var x = 0;x < h; x += 1)
      N2 += Y;
    return N2;
  }, E4 = function(g3, h, Y) {
    return Y;
  };
  t.exports = function g(h) {
    var Y = arguments.length > 1 ? arguments[1] : undefined, N2 = Y && Y.space || "";
    if (typeof N2 === "number")
      N2 = e(N2, " ");
    var x = !!Y && typeof Y.cycles === "boolean" && Y.cycles, v = Y && Y.replacer ? c3(Y.replacer) : E4, j = typeof Y === "function" ? Y : Y && Y.cmp, S = j && function(T4) {
      var d = j.length > 2 && function R(P) {
        return T4[P];
      };
      return function(R2, P) {
        return j({ key: R2, value: T4[R2] }, { key: P, value: T4[P] }, d ? { __proto__: null, get: d } : undefined);
      };
    }, A2 = [];
    return function T(d, R2, P, H) {
      var U = N2 ? `
` + e(H, N2) : "", a = N2 ? ": " : ":";
      if (P && P.toJSON && typeof P.toJSON === "function")
        P = P.toJSON();
      if (P = v(d, R2, P), P === undefined)
        return;
      if (typeof P !== "object" || P === null)
        return i(P);
      if (r(P)) {
        var L = [];
        for (var G = 0;G < P.length; G++) {
          var rt2 = T(P, G, P[G], H + 1) || i(null);
          s(L, U + N2 + rt2);
        }
        return "[" + I(L, ",") + U + "]";
      }
      if (A2.indexOf(P) !== -1) {
        if (x)
          return i("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        s(A2, P);
      var X3 = m4(P).sort(S && S(P)), L = [];
      for (var G = 0;G < X3.length; G++) {
        var R2 = X3[G], O = T(P, R2, P[R2], H + 1);
        if (!O)
          continue;
        var M3 = i(R2) + a + O;
        s(L, U + N2 + M3);
      }
      return A2.splice(A2.indexOf(P), 1), "{" + I(L, ",") + U + "}";
    }({ "": h }, "", h, 0);
  };
});
var pt4 = xn4(Mn4(), 1);
var Dt4 = function(n, t, i, r) {
  let m4, c3, u, I = t || [0], s = (i = i || 0) >>> 3, e = r === -1 ? 3 : 0;
  for (m4 = 0;m4 < n.length; m4 += 1)
    u = m4 + s, c3 = u >>> 2, I.length <= c3 && I.push(0), I[c3] |= n[m4] << 8 * (e + r * (u % 4));
  return { value: I, binLen: 8 * n.length + i };
};
var ht4 = function(n, t, i) {
  switch (t) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (n) {
    case "HEX":
      return function(r, m4, c3) {
        return function(u, I, s, e) {
          let E4, g3, h, Y;
          if (u.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          let N2 = I || [0], x = (s = s || 0) >>> 3, v = e === -1 ? 3 : 0;
          for (E4 = 0;E4 < u.length; E4 += 2) {
            if (g3 = parseInt(u.substr(E4, 2), 16), isNaN(g3))
              throw new Error("String of HEX type contains invalid characters");
            for (Y = (E4 >>> 1) + x, h = Y >>> 2;N2.length <= h; )
              N2.push(0);
            N2[h] |= g3 << 8 * (v + e * (Y % 4));
          }
          return { value: N2, binLen: 4 * u.length + s };
        }(r, m4, c3, i);
      };
    case "TEXT":
      return function(r, m4, c3) {
        return function(u, I, s, e, E4) {
          let g3, h, Y, N2, x, v, j, S, A2 = 0, T4 = s || [0], d = (e = e || 0) >>> 3;
          if (I === "UTF8")
            for (j = E4 === -1 ? 3 : 0, Y = 0;Y < u.length; Y += 1)
              for (g3 = u.charCodeAt(Y), h = [], 128 > g3 ? h.push(g3) : 2048 > g3 ? (h.push(192 | g3 >>> 6), h.push(128 | 63 & g3)) : 55296 > g3 || 57344 <= g3 ? h.push(224 | g3 >>> 12, 128 | g3 >>> 6 & 63, 128 | 63 & g3) : (Y += 1, g3 = 65536 + ((1023 & g3) << 10 | 1023 & u.charCodeAt(Y)), h.push(240 | g3 >>> 18, 128 | g3 >>> 12 & 63, 128 | g3 >>> 6 & 63, 128 | 63 & g3)), N2 = 0;N2 < h.length; N2 += 1) {
                for (v = A2 + d, x = v >>> 2;T4.length <= x; )
                  T4.push(0);
                T4[x] |= h[N2] << 8 * (j + E4 * (v % 4)), A2 += 1;
              }
          else
            for (j = E4 === -1 ? 2 : 0, S = I === "UTF16LE" && E4 !== 1 || I !== "UTF16LE" && E4 === 1, Y = 0;Y < u.length; Y += 1) {
              for (g3 = u.charCodeAt(Y), S === true && (N2 = 255 & g3, g3 = N2 << 8 | g3 >>> 8), v = A2 + d, x = v >>> 2;T4.length <= x; )
                T4.push(0);
              T4[x] |= g3 << 8 * (j + E4 * (v % 4)), A2 += 2;
            }
          return { value: T4, binLen: 8 * A2 + e };
        }(r, t, m4, c3, i);
      };
    case "B64":
      return function(r, m4, c3) {
        return function(u, I, s, e) {
          let E4, g3, h, Y, N2, x, v, j = 0, S = I || [0], A2 = (s = s || 0) >>> 3, T4 = e === -1 ? 3 : 0, d = u.indexOf("=");
          if (u.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (u = u.replace(/=/g, ""), d !== -1 && d < u.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (g3 = 0;g3 < u.length; g3 += 4) {
            for (N2 = u.substr(g3, 4), Y = 0, h = 0;h < N2.length; h += 1)
              E4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(N2.charAt(h)), Y |= E4 << 18 - 6 * h;
            for (h = 0;h < N2.length - 1; h += 1) {
              for (v = j + A2, x = v >>> 2;S.length <= x; )
                S.push(0);
              S[x] |= (Y >>> 16 - 8 * h & 255) << 8 * (T4 + e * (v % 4)), j += 1;
            }
          }
          return { value: S, binLen: 8 * j + s };
        }(r, m4, c3, i);
      };
    case "BYTES":
      return function(r, m4, c3) {
        return function(u, I, s, e) {
          let E4, g3, h, Y, N2 = I || [0], x = (s = s || 0) >>> 3, v = e === -1 ? 3 : 0;
          for (g3 = 0;g3 < u.length; g3 += 1)
            E4 = u.charCodeAt(g3), Y = g3 + x, h = Y >>> 2, N2.length <= h && N2.push(0), N2[h] |= E4 << 8 * (v + e * (Y % 4));
          return { value: N2, binLen: 8 * u.length + s };
        }(r, m4, c3, i);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (r) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(r, m4, c3) {
        return function(u, I, s, e) {
          return Dt4(new Uint8Array(u), I, s, e);
        }(r, m4, c3, i);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (r) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(r, m4, c3) {
        return Dt4(r, m4, c3, i);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var ot4 = function(n, t, i, r) {
  switch (n) {
    case "HEX":
      return function(m4) {
        return function(c3, u, I, s) {
          let e, E4, g3 = "", h = u / 8, Y = I === -1 ? 3 : 0;
          for (e = 0;e < h; e += 1)
            E4 = c3[e >>> 2] >>> 8 * (Y + I * (e % 4)), g3 += "0123456789abcdef".charAt(E4 >>> 4 & 15) + "0123456789abcdef".charAt(15 & E4);
          return s.outputUpper ? g3.toUpperCase() : g3;
        }(m4, t, i, r);
      };
    case "B64":
      return function(m4) {
        return function(c3, u, I, s) {
          let e, E4, g3, h, Y, N2 = "", x = u / 8, v = I === -1 ? 3 : 0;
          for (e = 0;e < x; e += 3)
            for (h = e + 1 < x ? c3[e + 1 >>> 2] : 0, Y = e + 2 < x ? c3[e + 2 >>> 2] : 0, g3 = (c3[e >>> 2] >>> 8 * (v + I * (e % 4)) & 255) << 16 | (h >>> 8 * (v + I * ((e + 1) % 4)) & 255) << 8 | Y >>> 8 * (v + I * ((e + 2) % 4)) & 255, E4 = 0;E4 < 4; E4 += 1)
              N2 += 8 * e + 6 * E4 <= u ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g3 >>> 6 * (3 - E4) & 63) : s.b64Pad;
          return N2;
        }(m4, t, i, r);
      };
    case "BYTES":
      return function(m4) {
        return function(c3, u, I) {
          let s, e, E4 = "", g3 = u / 8, h = I === -1 ? 3 : 0;
          for (s = 0;s < g3; s += 1)
            e = c3[s >>> 2] >>> 8 * (h + I * (s % 4)) & 255, E4 += String.fromCharCode(e);
          return E4;
        }(m4, t, i);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (m4) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(m4) {
        return function(c3, u, I) {
          let s, e = u / 8, E4 = new ArrayBuffer(e), g3 = new Uint8Array(E4), h = I === -1 ? 3 : 0;
          for (s = 0;s < e; s += 1)
            g3[s] = c3[s >>> 2] >>> 8 * (h + I * (s % 4)) & 255;
          return E4;
        }(m4, t, i);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (m4) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(m4) {
        return function(c3, u, I) {
          let s, e = u / 8, E4 = I === -1 ? 3 : 0, g3 = new Uint8Array(e);
          for (s = 0;s < e; s += 1)
            g3[s] = c3[s >>> 2] >>> 8 * (E4 + I * (s % 4)) & 255;
          return g3;
        }(m4, t, i);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var jt4 = function(n, t) {
  let i, r, m4 = n.binLen >>> 3, c3 = t.binLen >>> 3, u = m4 << 3, I = 4 - m4 << 3;
  if (m4 % 4 != 0) {
    for (i = 0;i < c3; i += 4)
      r = m4 + i >>> 2, n.value[r] |= t.value[i >>> 2] << u, n.value.push(0), n.value[r + 1] |= t.value[i >>> 2] >>> I;
    return (n.value.length << 2) - 4 >= c3 + m4 && n.value.pop(), { value: n.value, binLen: n.binLen + t.binLen };
  }
  return { value: n.value.concat(t.value), binLen: n.binLen + t.binLen };
};
var Wt4 = function(n) {
  let t = { outputUpper: false, b64Pad: "=", outputLen: -1 }, i = n || {};
  if (t.outputUpper = i.outputUpper || false, i.b64Pad && (t.b64Pad = i.b64Pad), i.outputLen) {
    if (i.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    t.outputLen = i.outputLen;
  } else if (i.shakeLen) {
    if (i.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    t.outputLen = i.shakeLen;
  }
  if (typeof t.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof t.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return t;
};
var it4 = function(n, t, i, r) {
  let m4 = n + " must include a value and format";
  if (!t) {
    if (!r)
      throw new Error(m4);
    return r;
  }
  if (t.value === undefined || !t.format)
    throw new Error(m4);
  return ht4(t.format, t.encoding || "UTF8", i)(t.value);
};
var mt4 = function(n, t) {
  return n << t | n >>> 32 - t;
};
var B4 = function(n, t) {
  return n >>> t | n << 32 - t;
};
var Qt4 = function(n, t) {
  return n >>> t;
};
var Lt4 = function(n, t, i) {
  return n ^ t ^ i;
};
var Xt4 = function(n, t, i) {
  return n & t ^ ~n & i;
};
var zt4 = function(n, t, i) {
  return n & t ^ n & i ^ t & i;
};
var fn4 = function(n) {
  return B4(n, 2) ^ B4(n, 13) ^ B4(n, 22);
};
var K3 = function(n, t) {
  let i = (65535 & n) + (65535 & t);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16)) << 16 | 65535 & i;
};
var Hn4 = function(n, t, i, r) {
  let m4 = (65535 & n) + (65535 & t) + (65535 & i) + (65535 & r);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16) + (r >>> 16) + (m4 >>> 16)) << 16 | 65535 & m4;
};
var ut4 = function(n, t, i, r, m4) {
  let c3 = (65535 & n) + (65535 & t) + (65535 & i) + (65535 & r) + (65535 & m4);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16) + (r >>> 16) + (m4 >>> 16) + (c3 >>> 16)) << 16 | 65535 & c3;
};
var ln4 = function(n) {
  return B4(n, 7) ^ B4(n, 18) ^ Qt4(n, 3);
};
var yn4 = function(n) {
  return B4(n, 6) ^ B4(n, 11) ^ B4(n, 25);
};
var Kn4 = function(n) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var _t3 = function(n, t) {
  let i, r, m4, c3, u, I, s, e = [];
  for (i = t[0], r = t[1], m4 = t[2], c3 = t[3], u = t[4], s = 0;s < 80; s += 1)
    e[s] = s < 16 ? n[s] : mt4(e[s - 3] ^ e[s - 8] ^ e[s - 14] ^ e[s - 16], 1), I = s < 20 ? ut4(mt4(i, 5), Xt4(r, m4, c3), u, 1518500249, e[s]) : s < 40 ? ut4(mt4(i, 5), Lt4(r, m4, c3), u, 1859775393, e[s]) : s < 60 ? ut4(mt4(i, 5), zt4(r, m4, c3), u, 2400959708, e[s]) : ut4(mt4(i, 5), Lt4(r, m4, c3), u, 3395469782, e[s]), u = c3, c3 = m4, m4 = mt4(r, 30), r = i, i = I;
  return t[0] = K3(i, t[0]), t[1] = K3(r, t[1]), t[2] = K3(m4, t[2]), t[3] = K3(c3, t[3]), t[4] = K3(u, t[4]), t;
};
var Vn4 = function(n, t, i, r) {
  let m4, c3 = 15 + (t + 65 >>> 9 << 4), u = t + i;
  for (;n.length <= c3; )
    n.push(0);
  for (n[t >>> 5] |= 128 << 24 - t % 32, n[c3] = 4294967295 & u, n[c3 - 1] = u / st4 | 0, m4 = 0;m4 < n.length; m4 += 16)
    r = _t3(n.slice(m4, m4 + 16), r);
  return r;
};
var Mt4 = function(n) {
  let t;
  return t = n == "SHA-224" ? q4.slice() : tt4.slice(), t;
};
var ft4 = function(n, t) {
  let i, r, m4, c3, u, I, s, e, E4, g3, h, Y = [];
  for (i = t[0], r = t[1], m4 = t[2], c3 = t[3], u = t[4], I = t[5], s = t[6], e = t[7], h = 0;h < 64; h += 1)
    Y[h] = h < 16 ? n[h] : Hn4(B4(N2 = Y[h - 2], 17) ^ B4(N2, 19) ^ Qt4(N2, 10), Y[h - 7], ln4(Y[h - 15]), Y[h - 16]), E4 = ut4(e, yn4(u), Xt4(u, I, s), $5[h], Y[h]), g3 = K3(fn4(i), zt4(i, r, m4)), e = s, s = I, I = u, u = K3(c3, E4), c3 = m4, m4 = r, r = i, i = K3(E4, g3);
  var N2;
  return t[0] = K3(i, t[0]), t[1] = K3(r, t[1]), t[2] = K3(m4, t[2]), t[3] = K3(c3, t[3]), t[4] = K3(u, t[4]), t[5] = K3(I, t[5]), t[6] = K3(s, t[6]), t[7] = K3(e, t[7]), t;
};
var Ht4 = function(n, t) {
  let i;
  return t > 32 ? (i = 64 - t, new w5(n.I << t | n.N >>> i, n.N << t | n.I >>> i)) : t !== 0 ? (i = 32 - t, new w5(n.N << t | n.I >>> i, n.I << t | n.N >>> i)) : n;
};
var Q4 = function(n, t) {
  let i;
  return t < 32 ? (i = 32 - t, new w5(n.N >>> t | n.I << i, n.I >>> t | n.N << i)) : (i = 64 - t, new w5(n.I >>> t | n.N << i, n.N >>> t | n.I << i));
};
var Jt4 = function(n, t) {
  return new w5(n.N >>> t, n.I >>> t | n.N << 32 - t);
};
var Un4 = function(n, t, i) {
  return new w5(n.N & t.N ^ n.N & i.N ^ t.N & i.N, n.I & t.I ^ n.I & i.I ^ t.I & i.I);
};
var Gn4 = function(n) {
  let t = Q4(n, 28), i = Q4(n, 34), r = Q4(n, 39);
  return new w5(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var F4 = function(n, t) {
  let i, r;
  i = (65535 & n.I) + (65535 & t.I), r = (n.I >>> 16) + (t.I >>> 16) + (i >>> 16);
  let m4 = (65535 & r) << 16 | 65535 & i;
  return i = (65535 & n.N) + (65535 & t.N) + (r >>> 16), r = (n.N >>> 16) + (t.N >>> 16) + (i >>> 16), new w5((65535 & r) << 16 | 65535 & i, m4);
};
var Zn4 = function(n, t, i, r) {
  let m4, c3;
  m4 = (65535 & n.I) + (65535 & t.I) + (65535 & i.I) + (65535 & r.I), c3 = (n.I >>> 16) + (t.I >>> 16) + (i.I >>> 16) + (r.I >>> 16) + (m4 >>> 16);
  let u = (65535 & c3) << 16 | 65535 & m4;
  return m4 = (65535 & n.N) + (65535 & t.N) + (65535 & i.N) + (65535 & r.N) + (c3 >>> 16), c3 = (n.N >>> 16) + (t.N >>> 16) + (i.N >>> 16) + (r.N >>> 16) + (m4 >>> 16), new w5((65535 & c3) << 16 | 65535 & m4, u);
};
var an4 = function(n, t, i, r, m4) {
  let c3, u;
  c3 = (65535 & n.I) + (65535 & t.I) + (65535 & i.I) + (65535 & r.I) + (65535 & m4.I), u = (n.I >>> 16) + (t.I >>> 16) + (i.I >>> 16) + (r.I >>> 16) + (m4.I >>> 16) + (c3 >>> 16);
  let I = (65535 & u) << 16 | 65535 & c3;
  return c3 = (65535 & n.N) + (65535 & t.N) + (65535 & i.N) + (65535 & r.N) + (65535 & m4.N) + (u >>> 16), u = (n.N >>> 16) + (t.N >>> 16) + (i.N >>> 16) + (r.N >>> 16) + (m4.N >>> 16) + (c3 >>> 16), new w5((65535 & u) << 16 | 65535 & c3, I);
};
var gt4 = function(n, t) {
  return new w5(n.N ^ t.N, n.I ^ t.I);
};
var Fn4 = function(n) {
  let t = Q4(n, 19), i = Q4(n, 61), r = Jt4(n, 6);
  return new w5(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var Bn4 = function(n) {
  let t = Q4(n, 1), i = Q4(n, 8), r = Jt4(n, 7);
  return new w5(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var Qn4 = function(n) {
  let t = Q4(n, 14), i = Q4(n, 18), r = Q4(n, 41);
  return new w5(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var lt4 = function(n) {
  return n === "SHA-384" ? [new w5(3418070365, q4[0]), new w5(1654270250, q4[1]), new w5(2438529370, q4[2]), new w5(355462360, q4[3]), new w5(1731405415, q4[4]), new w5(41048885895, q4[5]), new w5(3675008525, q4[6]), new w5(1203062813, q4[7])] : [new w5(tt4[0], 4089235720), new w5(tt4[1], 2227873595), new w5(tt4[2], 4271175723), new w5(tt4[3], 1595750129), new w5(tt4[4], 2917565137), new w5(tt4[5], 725511199), new w5(tt4[6], 4215389547), new w5(tt4[7], 327033209)];
};
var yt4 = function(n, t) {
  let i, r, m4, c3, u, I, s, e, E4, g3, h, Y, N2 = [];
  for (i = t[0], r = t[1], m4 = t[2], c3 = t[3], u = t[4], I = t[5], s = t[6], e = t[7], h = 0;h < 80; h += 1)
    h < 16 ? (Y = 2 * h, N2[h] = new w5(n[Y], n[Y + 1])) : N2[h] = Zn4(Fn4(N2[h - 2]), N2[h - 7], Bn4(N2[h - 15]), N2[h - 16]), E4 = an4(e, Qn4(u), (v = I, j = s, new w5((x = u).N & v.N ^ ~x.N & j.N, x.I & v.I ^ ~x.I & j.I)), Jn4[h], N2[h]), g3 = F4(Gn4(i), Un4(i, r, m4)), e = s, s = I, I = u, u = F4(c3, E4), c3 = m4, m4 = r, r = i, i = F4(E4, g3);
  var x, v, j;
  return t[0] = F4(i, t[0]), t[1] = F4(r, t[1]), t[2] = F4(m4, t[2]), t[3] = F4(c3, t[3]), t[4] = F4(u, t[4]), t[5] = F4(I, t[5]), t[6] = F4(s, t[6]), t[7] = F4(e, t[7]), t;
};
var Tt4 = function(n) {
  let t, i = [];
  for (t = 0;t < 5; t += 1)
    i[t] = [new w5(0, 0), new w5(0, 0), new w5(0, 0), new w5(0, 0), new w5(0, 0)];
  return i;
};
var Xn4 = function(n) {
  let t, i = [];
  for (t = 0;t < 5; t += 1)
    i[t] = n[t].slice();
  return i;
};
var Nt4 = function(n, t) {
  let i, r, m4, c3, u = [], I = [];
  if (n !== null)
    for (r = 0;r < n.length; r += 2)
      t[(r >>> 1) % 5][(r >>> 1) / 5 | 0] = gt4(t[(r >>> 1) % 5][(r >>> 1) / 5 | 0], new w5(n[r + 1], n[r]));
  for (i = 0;i < 24; i += 1) {
    for (c3 = Tt4(), r = 0;r < 5; r += 1)
      u[r] = (s = t[r][0], e = t[r][1], E4 = t[r][2], g3 = t[r][3], h = t[r][4], new w5(s.N ^ e.N ^ E4.N ^ g3.N ^ h.N, s.I ^ e.I ^ E4.I ^ g3.I ^ h.I));
    for (r = 0;r < 5; r += 1)
      I[r] = gt4(u[(r + 4) % 5], Ht4(u[(r + 1) % 5], 1));
    for (r = 0;r < 5; r += 1)
      for (m4 = 0;m4 < 5; m4 += 1)
        t[r][m4] = gt4(t[r][m4], I[r]);
    for (r = 0;r < 5; r += 1)
      for (m4 = 0;m4 < 5; m4 += 1)
        c3[m4][(2 * r + 3 * m4) % 5] = Ht4(t[r][m4], ni3[r][m4]);
    for (r = 0;r < 5; r += 1)
      for (m4 = 0;m4 < 5; m4 += 1)
        t[r][m4] = gt4(c3[r][m4], new w5(~c3[(r + 1) % 5][m4].N & c3[(r + 2) % 5][m4].N, ~c3[(r + 1) % 5][m4].I & c3[(r + 2) % 5][m4].I));
    t[0][0] = gt4(t[0][0], ti3[i]);
  }
  var s, e, E4, g3, h;
  return t;
};
var qt4 = function(n) {
  let t, i, r = 0, m4 = [0, 0], c3 = [4294967295 & n, n / st4 & 2097151];
  for (t = 6;t >= 0; t--)
    i = c3[t >> 2] >>> 8 * t & 255, i === 0 && r === 0 || (m4[r + 1 >> 2] |= i << 8 * (r + 1), r += 1);
  return r = r !== 0 ? r : 1, m4[0] |= r, { value: r + 1 > 4 ? m4 : [m4[0]], binLen: 8 + 8 * r };
};
var St4 = function(n) {
  return jt4(qt4(n.binLen), n);
};
var Kt4 = function(n, t) {
  let i, r = qt4(t);
  r = jt4(r, n);
  let m4 = t >>> 2, c3 = (m4 - r.value.length % m4) % m4;
  for (i = 0;i < c3; i++)
    r.value.push(0);
  return r.value;
};
var st4 = 4294967296;
var $5 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var q4 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var tt4 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var wt4 = "Chosen SHA variant is not supported";
var tn4 = "Cannot set numRounds with MAC";

class et4 {
  constructor(n, t, i) {
    let r = i || {};
    if (this.t = t, this.i = r.encoding || "UTF8", this.numRounds = r.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = n, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(n) {
    let t, i = 0, r = this.m >>> 5, m4 = this.C(n, this.h, this.u), c3 = m4.binLen, u = m4.value, I = c3 >>> 5;
    for (t = 0;t < I; t += r)
      i + this.m <= c3 && (this.U = this.v(u.slice(t, t + r), this.U), i += this.m);
    return this.A += i, this.h = u.slice(i >>> 5), this.u = c3 % this.m, this.l = true, this;
  }
  getHash(n, t) {
    let i, r, m4 = this.R, c3 = Wt4(t);
    if (this.K) {
      if (c3.outputLen === -1)
        throw new Error("Output length must be specified in options");
      m4 = c3.outputLen;
    }
    let u = ot4(n, m4, this.T, c3);
    if (this.H && this.g)
      return u(this.g(c3));
    for (r = this.F(this.h.slice(), this.u, this.A, this.L(this.U), m4), i = 1;i < this.numRounds; i += 1)
      this.K && m4 % 32 != 0 && (r[r.length - 1] &= 16777215 >>> 24 - m4 % 32), r = this.F(r, m4, 0, this.B(this.o), m4);
    return u(r);
  }
  setHMACKey(n, t, i) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    let r = ht4(t, (i || {}).encoding || "UTF8", this.T);
    this.k(r(n));
  }
  k(n) {
    let t = this.m >>> 3, i = t / 4 - 1, r;
    if (this.numRounds !== 1)
      throw new Error(tn4);
    if (this.H)
      throw new Error("MAC key already set");
    for (t < n.binLen / 8 && (n.value = this.F(n.value, n.binLen, 0, this.B(this.o), this.R));n.value.length <= i; )
      n.value.push(0);
    for (r = 0;r <= i; r += 1)
      this.S[r] = 909522486 ^ n.value[r], this.p[r] = 1549556828 ^ n.value[r];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(n, t) {
    let i = Wt4(t);
    return ot4(n, this.R, this.T, i)(this.Y());
  }
  Y() {
    let n;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    let t = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return n = this.v(this.p, this.B(this.o)), n = this.F(t, this.R, this.m, n, this.R), n;
  }
}
var zn4 = class extends et4 {
  constructor(n, t, i) {
    if (n !== "SHA-1")
      throw new Error(wt4);
    super(n, t, i);
    let r = i || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = ht4(this.t, this.i, this.T), this.v = _t3, this.L = function(m4) {
      return m4.slice();
    }, this.B = Kn4, this.F = Vn4, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, r.hmacKey && this.k(it4("hmacKey", r.hmacKey, this.T));
  }
};
var _n4 = class extends et4 {
  constructor(n, t, i) {
    if (n !== "SHA-224" && n !== "SHA-256")
      throw new Error(wt4);
    super(n, t, i);
    let r = i || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = ht4(this.t, this.i, this.T), this.v = ft4, this.L = function(m4) {
      return m4.slice();
    }, this.B = Mt4, this.F = function(m4, c3, u, I) {
      return function(s, e, E4, g3, h) {
        let Y, N2, x = 15 + (e + 65 >>> 9 << 4), v = e + E4;
        for (;s.length <= x; )
          s.push(0);
        for (s[e >>> 5] |= 128 << 24 - e % 32, s[x] = 4294967295 & v, s[x - 1] = v / st4 | 0, Y = 0;Y < s.length; Y += 16)
          g3 = ft4(s.slice(Y, Y + 16), g3);
        return N2 = h === "SHA-224" ? [g3[0], g3[1], g3[2], g3[3], g3[4], g3[5], g3[6]] : g3, N2;
      }(m4, c3, u, I, n);
    }, this.U = Mt4(n), this.m = 512, this.R = n === "SHA-224" ? 224 : 256, this.K = false, r.hmacKey && this.k(it4("hmacKey", r.hmacKey, this.T));
  }
};

class w5 {
  constructor(n, t) {
    this.N = n, this.I = t;
  }
}
var Jn4 = [new w5($5[0], 3609767458), new w5($5[1], 602891725), new w5($5[2], 3964484399), new w5($5[3], 2173295548), new w5($5[4], 4081628472), new w5($5[5], 3053834265), new w5($5[6], 2937671579), new w5($5[7], 3664609560), new w5($5[8], 2734883394), new w5($5[9], 1164996542), new w5($5[10], 1323610764), new w5($5[11], 3590304994), new w5($5[12], 4068182383), new w5($5[13], 991336113), new w5($5[14], 633803317), new w5($5[15], 3479774868), new w5($5[16], 2666613458), new w5($5[17], 944711139), new w5($5[18], 2341262773), new w5($5[19], 2007800933), new w5($5[20], 1495990901), new w5($5[21], 1856431235), new w5($5[22], 3175218132), new w5($5[23], 2198950837), new w5($5[24], 3999719339), new w5($5[25], 766784016), new w5($5[26], 2566594879), new w5($5[27], 3203337956), new w5($5[28], 1034457026), new w5($5[29], 2466948901), new w5($5[30], 3758326383), new w5($5[31], 168717936), new w5($5[32], 1188179964), new w5($5[33], 1546045734), new w5($5[34], 1522805485), new w5($5[35], 2643833823), new w5($5[36], 2343527390), new w5($5[37], 1014477480), new w5($5[38], 1206759142), new w5($5[39], 344077627), new w5($5[40], 1290863460), new w5($5[41], 3158454273), new w5($5[42], 3505952657), new w5($5[43], 106217008), new w5($5[44], 3606008344), new w5($5[45], 1432725776), new w5($5[46], 1467031594), new w5($5[47], 851169720), new w5($5[48], 3100823752), new w5($5[49], 1363258195), new w5($5[50], 3750685593), new w5($5[51], 3785050280), new w5($5[52], 3318307427), new w5($5[53], 3812723403), new w5($5[54], 2003034995), new w5($5[55], 3602036899), new w5($5[56], 1575990012), new w5($5[57], 1125592928), new w5($5[58], 2716904306), new w5($5[59], 442776044), new w5($5[60], 593698344), new w5($5[61], 3733110249), new w5($5[62], 2999351573), new w5($5[63], 3815920427), new w5(3391569614, 3928383900), new w5(3515267271, 566280711), new w5(3940187606, 3454069534), new w5(4118630271, 4000239992), new w5(116418474, 1914138554), new w5(174292421, 2731055270), new w5(289380356, 3203993006), new w5(460393269, 320620315), new w5(685471733, 587496836), new w5(852142971, 1086792851), new w5(1017036298, 365543100), new w5(1126000580, 2618297676), new w5(1288033470, 3409855158), new w5(1501505948, 4234509866), new w5(1607167915, 987167468), new w5(1816402316, 1246189591)];
var qn3 = class extends et4 {
  constructor(n, t, i) {
    if (n !== "SHA-384" && n !== "SHA-512")
      throw new Error(wt4);
    super(n, t, i);
    let r = i || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = ht4(this.t, this.i, this.T), this.v = yt4, this.L = function(m4) {
      return m4.slice();
    }, this.B = lt4, this.F = function(m4, c3, u, I) {
      return function(s, e, E4, g3, h) {
        let Y, N2, x = 31 + (e + 129 >>> 10 << 5), v = e + E4;
        for (;s.length <= x; )
          s.push(0);
        for (s[e >>> 5] |= 128 << 24 - e % 32, s[x] = 4294967295 & v, s[x - 1] = v / st4 | 0, Y = 0;Y < s.length; Y += 32)
          g3 = yt4(s.slice(Y, Y + 32), g3);
        return N2 = h === "SHA-384" ? [g3[0].N, g3[0].I, g3[1].N, g3[1].I, g3[2].N, g3[2].I, g3[3].N, g3[3].I, g3[4].N, g3[4].I, g3[5].N, g3[5].I] : [g3[0].N, g3[0].I, g3[1].N, g3[1].I, g3[2].N, g3[2].I, g3[3].N, g3[3].I, g3[4].N, g3[4].I, g3[5].N, g3[5].I, g3[6].N, g3[6].I, g3[7].N, g3[7].I], N2;
      }(m4, c3, u, I, n);
    }, this.U = lt4(n), this.m = 1024, this.R = n === "SHA-384" ? 384 : 512, this.K = false, r.hmacKey && this.k(it4("hmacKey", r.hmacKey, this.T));
  }
};
var ti3 = [new w5(0, 1), new w5(0, 32898), new w5(2147483648, 32906), new w5(2147483648, 2147516416), new w5(0, 32907), new w5(0, 2147483649), new w5(2147483648, 2147516545), new w5(2147483648, 32777), new w5(0, 138), new w5(0, 136), new w5(0, 2147516425), new w5(0, 2147483658), new w5(0, 2147516555), new w5(2147483648, 139), new w5(2147483648, 32905), new w5(2147483648, 32771), new w5(2147483648, 32770), new w5(2147483648, 128), new w5(0, 32778), new w5(2147483648, 2147483658), new w5(2147483648, 2147516545), new w5(2147483648, 32896), new w5(0, 2147483649), new w5(2147483648, 2147516424)];
var ni3 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var ii3 = class extends et4 {
  constructor(n, t, i) {
    let r = 6, m4 = 0;
    super(n, t, i);
    let c3 = i || {};
    if (this.numRounds !== 1) {
      if (c3.kmacKey || c3.hmacKey)
        throw new Error(tn4);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = ht4(this.t, this.i, this.T), this.v = Nt4, this.L = Xn4, this.B = Tt4, this.U = Tt4(), this.K = false, n) {
      case "SHA3-224":
        this.m = m4 = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = m4 = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = m4 = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = m4 = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        r = 31, this.m = m4 = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        r = 31, this.m = m4 = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        r = 4, this.m = m4 = 1344, this.X(i), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        r = 4, this.m = m4 = 1088, this.X(i), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = m4 = 1344, r = this.O(i), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = m4 = 1088, r = this.O(i), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(wt4);
    }
    this.F = function(u, I, s, e, E4) {
      return function(g3, h, Y, N2, x, v, j) {
        let S, A2, T4 = 0, d = [], R2 = x >>> 5, P = h >>> 5;
        for (S = 0;S < P && h >= x; S += R2)
          N2 = Nt4(g3.slice(S, S + R2), N2), h -= x;
        for (g3 = g3.slice(S), h %= x;g3.length < R2; )
          g3.push(0);
        for (S = h >>> 3, g3[S >> 2] ^= v << S % 4 * 8, g3[R2 - 1] ^= 2147483648, N2 = Nt4(g3, N2);32 * d.length < j && (A2 = N2[T4 % 5][T4 / 5 | 0], d.push(A2.I), !(32 * d.length >= j)); )
          d.push(A2.N), T4 += 1, 64 * T4 % x == 0 && (Nt4(null, N2), T4 = 0);
        return d;
      }(u, I, 0, e, m4, r, E4);
    }, c3.hmacKey && this.k(it4("hmacKey", c3.hmacKey, this.T));
  }
  O(n, t) {
    let i = function(m4) {
      let c3 = m4 || {};
      return { funcName: it4("funcName", c3.funcName, 1, { value: [], binLen: 0 }), customization: it4("Customization", c3.customization, 1, { value: [], binLen: 0 }) };
    }(n || {});
    t && (i.funcName = t);
    let r = jt4(St4(i.funcName), St4(i.customization));
    if (i.customization.binLen !== 0 || i.funcName.binLen !== 0) {
      let m4 = Kt4(r, this.m >>> 3);
      for (let c3 = 0;c3 < m4.length; c3 += this.m >>> 5)
        this.U = this.v(m4.slice(c3, c3 + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(n) {
    let t = function(r) {
      let m4 = r || {};
      return { kmacKey: it4("kmacKey", m4.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: it4("Customization", m4.customization, 1, { value: [], binLen: 0 }) };
    }(n || {});
    this.O(n, t.funcName);
    let i = Kt4(St4(t.kmacKey), this.m >>> 3);
    for (let r = 0;r < i.length; r += this.m >>> 5)
      this.U = this.v(i.slice(r, r + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(n) {
    let t = jt4({ value: this.h.slice(), binLen: this.u }, function(i) {
      let r, m4, c3 = 0, u = [0, 0], I = [4294967295 & i, i / st4 & 2097151];
      for (r = 6;r >= 0; r--)
        m4 = I[r >> 2] >>> 8 * r & 255, m4 === 0 && c3 === 0 || (u[c3 >> 2] |= m4 << 8 * c3, c3 += 1);
      return c3 = c3 !== 0 ? c3 : 1, u[c3 >> 2] |= c3 << 8 * c3, { value: c3 + 1 > 4 ? u : [u[0]], binLen: 8 + 8 * c3 };
    }(n.outputLen));
    return this.F(t.value, t.binLen, this.A, this.L(this.U), n.outputLen);
  }
};

class nn3 {
  constructor(n, t, i) {
    if (n == "SHA-1")
      this.P = new zn4(n, t, i);
    else if (n == "SHA-224" || n == "SHA-256")
      this.P = new _n4(n, t, i);
    else if (n == "SHA-384" || n == "SHA-512")
      this.P = new qn3(n, t, i);
    else {
      if (n != "SHA3-224" && n != "SHA3-256" && n != "SHA3-384" && n != "SHA3-512" && n != "SHAKE128" && n != "SHAKE256" && n != "CSHAKE128" && n != "CSHAKE256" && n != "KMAC128" && n != "KMAC256")
        throw new Error(wt4);
      this.P = new ii3(n, t, i);
    }
  }
  update(n) {
    return this.P.update(n), this;
  }
  getHash(n, t) {
    return this.P.getHash(n, t);
  }
  setHMACKey(n, t, i) {
    this.P.setHMACKey(n, t, i);
  }
  getHMAC(n, t) {
    return this.P.getHMAC(n, t);
  }
}
var xt4 = function(n, t, i = 0) {
  let r = pt4.default({ ...n, signature: undefined }), m4 = t.noTimeWindow ? 0 : Math.floor(Date.now() / (t.timeWindow ?? hn3)) + i;
  return new nn3("SHA-256", "TEXT", { encoding: "UTF8" }).update(r).update(pt4.default(t)).update(`${m4}`).getHash("B64");
};
function rn4(n, t = {}) {
  return { ...n, signature: xt4(n, t) };
}
var hn3 = 5000;

class kt4 {
  data = [];
  #t = new TextEncoder;
  static payload(n, t, i) {
    return new kt4().payload(n, t, i);
  }
  static blob(n, t) {
    return new kt4().blob(n, t);
  }
  #n(n) {
    let t = this.#t.encode(n), i = new Uint8Array([t.byteLength]);
    this.data.push(i.buffer), this.data.push(t.buffer);
  }
  payload(n, t, i) {
    this.#n(n);
    let r = new Uint8Array([1]);
    this.data.push(r.buffer);
    let m4 = JSON.stringify(i ? rn4(t, { secret: i }) : t), c3 = this.#t.encode(m4), u = new Uint32Array([c3.byteLength]);
    return this.data.push(u.buffer), this.data.push(c3.buffer), this;
  }
  blob(n, t) {
    this.#n(n);
    let i = new Uint8Array([2]);
    this.data.push(i.buffer);
    let r = new Uint32Array([t.size]);
    return this.data.push(r.buffer), this.data.push(t), this;
  }
  build() {
    return new Blob(this.data);
  }
}
var y5 = [];
for (let n = 0;n < 256; ++n)
  y5.push((n + 256).toString(16).slice(1));
function cn4(n, t = 0) {
  return (y5[n[t + 0]] + y5[n[t + 1]] + y5[n[t + 2]] + y5[n[t + 3]] + "-" + y5[n[t + 4]] + y5[n[t + 5]] + "-" + y5[n[t + 6]] + y5[n[t + 7]] + "-" + y5[n[t + 8]] + y5[n[t + 9]] + "-" + y5[n[t + 10]] + y5[n[t + 11]] + y5[n[t + 12]] + y5[n[t + 13]] + y5[n[t + 14]] + y5[n[t + 15]]).toLowerCase();
}
var bt4;
var mi3 = new Uint8Array(16);
function dt4() {
  if (!bt4) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    bt4 = crypto.getRandomValues.bind(crypto);
  }
  return bt4(mi3);
}
var hi3 = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var Ct4 = { randomUUID: hi3 };
function ci3(n, t, i) {
  if (Ct4.randomUUID && !t && !n)
    return Ct4.randomUUID();
  n = n || {};
  let r = n.random ?? n.rng?.() ?? dt4();
  if (r.length < 16)
    throw new Error("Random bytes length must be >= 16");
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    if (i = i || 0, i < 0 || i + 16 > t.length)
      throw new RangeError(`UUID byte range ${i}:${i + 15} is out of buffer bounds`);
    for (let m4 = 0;m4 < 16; ++m4)
      t[i + m4] = r[m4];
    return t;
  }
  return cn4(r);
}
var Ot4 = ci3;
var sn3 = new TextDecoder;
function gi3(n, t) {
  let [i, r] = en4(n, t);
  return [sn3.decode(new Uint8Array(n, r, i)), r + i];
}
function ui3(n, t) {
  let [i, r] = wn4(n, t);
  return [sn3.decode(new Uint8Array(n, r, i)), r + i];
}
function si3(n, t) {
  let [i, r] = wn4(n, t);
  return [new Blob([new Uint8Array(n, r, i)], { type: "application/octet-stream" }), r + i];
}
function wn4(n, t) {
  return [new Uint32Array(n.slice(t, t + Uint32Array.BYTES_PER_ELEMENT), 0, 1)[0], t + Uint32Array.BYTES_PER_ELEMENT];
}
function en4(n, t) {
  return [new Uint8Array(n, t, 1)[0], t + Uint8Array.BYTES_PER_ELEMENT];
}
async function oi3(n) {
  let t = {}, i = {}, r = 0, m4;
  while (r < n.size) {
    m4 = m4 ?? await n.arrayBuffer();
    let [c3, u] = gi3(m4, r);
    r = u;
    let [I, s] = en4(m4, r);
    switch (r = s, I) {
      case 1:
        let [e, E4] = ui3(m4, r);
        r = E4;
        try {
          t[c3] = JSON.parse(e);
        } catch (Y) {
          console.error(`Error parsing JSON for key "${c3}":`, Y);
        }
        break;
      case 2:
        let [g3, h] = si3(m4, r);
        r = h, i[c3] = g3;
        break;
    }
  }
  return { ...t, ...i };
}
function gn3(n, t) {
  if (typeof n === "object" && n instanceof Blob) {
    let r = `{blob:${Ot4()}}`;
    return t[r] = n, r;
  }
  let i = n;
  if (Array.isArray(n))
    n.forEach((r, m4) => {
      let c3 = gn3(r, t);
      if (c3 !== n[m4]) {
        if (n === i)
          n = [...n];
        n[m4] = c3;
      }
    });
  else if (typeof n === "object" && n)
    Object.entries(n).forEach(([r, m4]) => {
      let c3 = gn3(m4, t);
      if (c3 !== n[r]) {
        if (n === i)
          n = { ...n };
        n[r] = c3;
      }
    });
  return n;
}
function un4(n, t) {
  if (typeof n === "string" && n.startsWith("{blobUrl:"))
    return URL.createObjectURL(t[n]);
  if (typeof n === "string" && n.startsWith("{blob:"))
    return t[n];
  let i = n;
  if (Array.isArray(n))
    n.forEach((r, m4) => {
      let c3 = un4(r, t);
      if (c3 !== r) {
        if (n === i)
          n = [...n];
        n[m4] = c3;
      }
    });
  else if (typeof n === "object" && n)
    Object.entries(n).forEach(([r, m4]) => {
      let c3 = un4(m4, t);
      if (c3 !== m4) {
        if (n === i)
          n = { ...n };
        n[r] = c3;
      }
    });
  return n;
}

// ../src/cycles/data-update/blob-utils.ts
function packageUpdates3(updates, blobs, secret) {
  const blobBuilder = kt4.payload("payload", { updates }, secret);
  const addedBlob = new Set;
  for (let key in blobs) {
    if (!addedBlob.has(key)) {
      blobBuilder.blob(key, blobs[key]);
      addedBlob.add(key);
    }
  }
  return blobBuilder.build();
}
async function receiveBlob3(blob) {
  const { payload, ...blobs } = await oi3(blob);
  return { payload, blobs };
}

// ../node_modules/napl/dist/index.js
var KEYS5 = "~{keys}";
var VALUES5 = "~{values}";
var REGEX5 = /~\{([^}]+)\}/;
function commitUpdates5(root, properties, updatedPaths = {}) {
  if (!root || !root.updates?.length) {
    return updatedPaths;
  }
  sortUpdates5(root.updates);
  root.updates?.forEach((update) => {
    if (!update.confirmed) {
      return;
    }
    const parts = update.path.split("/");
    const leaf = getLeafObject5(root, parts, 1, true);
    const prop = parts[parts.length - 1];
    const value = translateValue5(update.value, properties);
    if (update.append) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop], value];
    } else if ((update.insert ?? -1) >= 0) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop].slice(0, update.insert ?? -1), value, ...leaf[prop].slice(update.insert)];
    } else if ((update.delete ?? -1) >= 0) {
      if (Array.isArray(leaf[prop])) {
        leaf[prop] = [...leaf[prop].slice(0, update.delete), ...leaf[prop].slice((update.delete ?? -1) + 1)];
      }
    } else if (value === undefined) {
      delete leaf[prop];
      cleanupRoot5(root, parts, 0);
    } else {
      leaf[prop] = value;
    }
    updatedPaths[update.path] = leaf[prop];
  });
  clearUpdates5(root, updatedPaths);
  return updatedPaths;
}
function cleanupRoot5(root, parts, index) {
  if (!root || typeof root !== "object" || Array.isArray(root)) {
    return false;
  }
  if (cleanupRoot5(root[parts[index]], parts, index + 1)) {
    delete root[parts[index]];
  }
  return Object.keys(root).length === 0;
}
function clearUpdates5(root, updatedPaths) {
  root.updates = root.updates?.filter((update) => !(update.path in updatedPaths));
  if (!root.updates?.length) {
    delete root.updates;
  }
}
function sortUpdates5(updates) {
  updates?.sort((a, b5) => {
    const confirmedA = a.confirmed ?? 0;
    const confirmedB = b5.confirmed ?? 0;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    return a.path.localeCompare(b5.path);
  });
}
function getLeafObject5(obj, parts, offset, autoCreate, properties = {}) {
  let current = obj;
  for (let i = 0;i < parts.length - offset; i++) {
    const prop = parts[i];
    const value = translateProp5(current, prop, properties, autoCreate);
    if (value === undefined) {
      return value;
    }
    current = value;
  }
  return current;
}
function translateValue5(value, properties) {
  if (typeof value !== "string") {
    return value;
  }
  if (value.startsWith("~{") && value.endsWith("}")) {
    switch (value) {
      default:
        const group = value.match(REGEX5);
        if (group) {
          return properties[group[1]];
        }
    }
  }
  return value;
}
function translateProp5(obj, prop, properties, autoCreate) {
  let value;
  if (typeof prop !== "string") {
    value = obj[prop];
  } else if (prop.startsWith("~{") && prop.endsWith("}")) {
    switch (prop) {
      case KEYS5:
        return Object.keys(obj ?? {});
      case VALUES5:
        return Object.values(obj ?? {});
      default:
        return obj[translateValue5(prop, properties)];
    }
  } else {
    value = obj[prop];
  }
  if (value === undefined && autoCreate) {
    value = obj[prop] = {};
  }
  return value;
}
var gt6 = Object.create;
var { defineProperty: Rn6, getPrototypeOf: Yt2, getOwnPropertyNames: wt6 } = Object;
var Et2 = Object.prototype.hasOwnProperty;
var Nt6 = (t, n, h) => {
  h = t != null ? gt6(Yt2(t)) : {};
  let c3 = n || !t || !t.__esModule ? Rn6(h, "default", { value: t, enumerable: true }) : h;
  for (let i of wt6(t))
    if (!Et2.call(c3, i))
      Rn6(c3, i, { get: () => t[i], enumerable: true });
  return c3;
};
var R2 = (t, n) => () => (n || t((n = { exports: {} }).exports, n), n.exports);
var jt6 = R2((t, n) => {
  var h = function(S) {
    throw { name: "SyntaxError", message: S, at: Y, text: P };
  }, c3 = function(S) {
    if (S && S !== m4)
      h("Expected '" + S + "' instead of '" + m4 + "'");
    return m4 = P.charAt(Y), Y += 1, m4;
  }, i = function() {
    var S, T4 = "";
    if (m4 === "-")
      T4 = "-", c3("-");
    while (m4 >= "0" && m4 <= "9")
      T4 += m4, c3();
    if (m4 === ".") {
      T4 += ".";
      while (c3() && m4 >= "0" && m4 <= "9")
        T4 += m4;
    }
    if (m4 === "e" || m4 === "E") {
      if (T4 += m4, c3(), m4 === "-" || m4 === "+")
        T4 += m4, c3();
      while (m4 >= "0" && m4 <= "9")
        T4 += m4, c3();
    }
    if (S = Number(T4), !isFinite(S))
      h("Bad number");
    return S;
  }, g3 = function() {
    var S, T4, v = "", x;
    if (m4 === '"')
      while (c3())
        if (m4 === '"')
          return c3(), v;
        else if (m4 === "\\")
          if (c3(), m4 === "u") {
            x = 0;
            for (T4 = 0;T4 < 4; T4 += 1) {
              if (S = parseInt(c3(), 16), !isFinite(S))
                break;
              x = x * 16 + S;
            }
            v += String.fromCharCode(x);
          } else if (typeof s[m4] === "string")
            v += s[m4];
          else
            break;
        else
          v += m4;
    h("Bad string");
  }, w7 = function() {
    while (m4 && m4 <= " ")
      c3();
  }, I = function() {
    switch (m4) {
      case "t":
        return c3("t"), c3("r"), c3("u"), c3("e"), true;
      case "f":
        return c3("f"), c3("a"), c3("l"), c3("s"), c3("e"), false;
      case "n":
        return c3("n"), c3("u"), c3("l"), c3("l"), null;
      default:
        h("Unexpected '" + m4 + "'");
    }
  }, E4 = function() {
    var S = [];
    if (m4 === "[") {
      if (c3("["), w7(), m4 === "]")
        return c3("]"), S;
      while (m4) {
        if (S.push($7()), w7(), m4 === "]")
          return c3("]"), S;
        c3(","), w7();
      }
    }
    h("Bad array");
  }, j = function() {
    var S, T4 = {};
    if (m4 === "{") {
      if (c3("{"), w7(), m4 === "}")
        return c3("}"), T4;
      while (m4) {
        if (S = g3(), w7(), c3(":"), Object.prototype.hasOwnProperty.call(T4, S))
          h('Duplicate key "' + S + '"');
        if (T4[S] = $7(), w7(), m4 === "}")
          return c3("}"), T4;
        c3(","), w7();
      }
    }
    h("Bad object");
  }, $7 = function() {
    switch (w7(), m4) {
      case "{":
        return j();
      case "[":
        return E4();
      case '"':
        return g3();
      case "-":
        return i();
      default:
        return m4 >= "0" && m4 <= "9" ? i() : I();
    }
  }, Y, m4, s = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, P;
  n.exports = function(S, T4) {
    var v;
    if (P = S, Y = 0, m4 = " ", v = $7(), w7(), m4)
      h("Syntax error");
    return typeof T4 === "function" ? function x(O, C) {
      var D, b5, k = O[C];
      if (k && typeof k === "object") {
        for (D in $7)
          if (Object.prototype.hasOwnProperty.call(k, D))
            if (b5 = x(k, D), typeof b5 === "undefined")
              delete k[D];
            else
              k[D] = b5;
      }
      return T4.call(O, C, k);
    }({ "": v }, "") : v;
  };
});
var $t6 = R2((t, n) => {
  var h = function(j) {
    return i.lastIndex = 0, i.test(j) ? '"' + j.replace(i, function($7) {
      var Y = I[$7];
      return typeof Y === "string" ? Y : "\\u" + ("0000" + $7.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + j + '"';
  }, c3 = function(j, $7) {
    var Y, m4, s, P, S = g3, T4, v = $7[j];
    if (v && typeof v === "object" && typeof v.toJSON === "function")
      v = v.toJSON(j);
    if (typeof E4 === "function")
      v = E4.call($7, j, v);
    switch (typeof v) {
      case "string":
        return h(v);
      case "number":
        return isFinite(v) ? String(v) : "null";
      case "boolean":
      case "null":
        return String(v);
      case "object":
        if (!v)
          return "null";
        if (g3 += w7, T4 = [], Object.prototype.toString.apply(v) === "[object Array]") {
          P = v.length;
          for (Y = 0;Y < P; Y += 1)
            T4[Y] = c3(Y, v) || "null";
          return s = T4.length === 0 ? "[]" : g3 ? `[
` + g3 + T4.join(`,
` + g3) + `
` + S + "]" : "[" + T4.join(",") + "]", g3 = S, s;
        }
        if (E4 && typeof E4 === "object") {
          P = E4.length;
          for (Y = 0;Y < P; Y += 1)
            if (m4 = E4[Y], typeof m4 === "string") {
              if (s = c3(m4, v), s)
                T4.push(h(m4) + (g3 ? ": " : ":") + s);
            }
        } else
          for (m4 in v)
            if (Object.prototype.hasOwnProperty.call(v, m4)) {
              if (s = c3(m4, v), s)
                T4.push(h(m4) + (g3 ? ": " : ":") + s);
            }
        return s = T4.length === 0 ? "{}" : g3 ? `{
` + g3 + T4.join(`,
` + g3) + `
` + S + "}" : "{" + T4.join(",") + "}", g3 = S, s;
      default:
    }
  }, i = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, g3, w7, I = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, E4;
  n.exports = function(j, $7, Y) {
    var m4;
    if (g3 = "", w7 = "", typeof Y === "number")
      for (m4 = 0;m4 < Y; m4 += 1)
        w7 += " ";
    else if (typeof Y === "string")
      w7 = Y;
    if (E4 = $7, $7 && typeof $7 !== "function" && (typeof $7 !== "object" || typeof $7.length !== "number"))
      throw new Error("JSON.stringify");
    return c3("", { "": j });
  };
});
var st6 = R2((t) => {
  t.parse = jt6(), t.stringify = $t6();
});
var It2 = R2((t, n) => {
  var h = {}.toString;
  n.exports = Array.isArray || function(c3) {
    return h.call(c3) == "[object Array]";
  };
});
var fn6 = R2((t, n) => {
  var h = Object.prototype.toString;
  n.exports = function c(i) {
    var g3 = h.call(i), w7 = g3 === "[object Arguments]";
    if (!w7)
      w7 = g3 !== "[object Array]" && i !== null && typeof i === "object" && typeof i.length === "number" && i.length >= 0 && h.call(i.callee) === "[object Function]";
    return w7;
  };
});
var Pt6 = R2((t, n) => {
  var h;
  if (!Object.keys)
    c3 = Object.prototype.hasOwnProperty, i = Object.prototype.toString, g3 = fn6(), w7 = Object.prototype.propertyIsEnumerable, I = !w7.call({ toString: null }, "toString"), E4 = w7.call(function() {}, "prototype"), j = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], $7 = function(P) {
      var S = P.constructor;
      return S && S.prototype === P;
    }, Y = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, m4 = function() {
      if (typeof window === "undefined")
        return false;
      for (var P in window)
        try {
          if (!Y["$" + P] && c3.call(window, P) && window[P] !== null && typeof window[P] === "object")
            try {
              $7(window[P]);
            } catch (S) {
              return true;
            }
        } catch (S) {
          return true;
        }
      return false;
    }(), s = function(P) {
      if (typeof window === "undefined" || !m4)
        return $7(P);
      try {
        return $7(P);
      } catch (S) {
        return false;
      }
    }, h = function P(S) {
      var T4 = S !== null && typeof S === "object", v = i.call(S) === "[object Function]", x = g3(S), O = T4 && i.call(S) === "[object String]", C = [];
      if (!T4 && !v && !x)
        throw new TypeError("Object.keys called on a non-object");
      var D = E4 && v;
      if (O && S.length > 0 && !c3.call(S, 0))
        for (var b5 = 0;b5 < S.length; ++b5)
          C.push(String(b5));
      if (x && S.length > 0)
        for (var k = 0;k < S.length; ++k)
          C.push(String(k));
      else
        for (var f4 in S)
          if (!(D && f4 === "prototype") && c3.call(S, f4))
            C.push(String(f4));
      if (I) {
        var G = s(S);
        for (var U = 0;U < j.length; ++U)
          if (!(G && j[U] === "constructor") && c3.call(S, j[U]))
            C.push(j[U]);
      }
      return C;
    };
  var c3, i, g3, w7, I, E4, j, $7, Y, m4, s;
  n.exports = h;
});
var St6 = R2((t, n) => {
  var h = Array.prototype.slice, c3 = fn6(), i = Object.keys, g3 = i ? function I(E4) {
    return i(E4);
  } : Pt6(), w7 = Object.keys;
  g3.shim = function I() {
    if (Object.keys) {
      var E4 = function() {
        var j = Object.keys(arguments);
        return j && j.length === arguments.length;
      }(1, 2);
      if (!E4)
        Object.keys = function j($7) {
          if (c3($7))
            return w7(h.call($7));
          return w7($7);
        };
    } else
      Object.keys = g3;
    return Object.keys || g3;
  }, n.exports = g3;
});
var vt6 = R2((t, n) => {
  var h = "Function.prototype.bind called on incompatible ", c3 = Object.prototype.toString, i = Math.max, g3 = "[object Function]", w7 = function j($7, Y) {
    var m4 = [];
    for (var s = 0;s < $7.length; s += 1)
      m4[s] = $7[s];
    for (var P = 0;P < Y.length; P += 1)
      m4[P + $7.length] = Y[P];
    return m4;
  }, I = function j($7, Y) {
    var m4 = [];
    for (var s = Y || 0, P = 0;s < $7.length; s += 1, P += 1)
      m4[P] = $7[s];
    return m4;
  }, E4 = function(j, $7) {
    var Y = "";
    for (var m4 = 0;m4 < j.length; m4 += 1)
      if (Y += j[m4], m4 + 1 < j.length)
        Y += $7;
    return Y;
  };
  n.exports = function j($7) {
    var Y = this;
    if (typeof Y !== "function" || c3.apply(Y) !== g3)
      throw new TypeError(h + Y);
    var m4 = I(arguments, 1), s, P = function() {
      if (this instanceof s) {
        var O = Y.apply(this, w7(m4, arguments));
        if (Object(O) === O)
          return O;
        return this;
      }
      return Y.apply($7, w7(m4, arguments));
    }, S = i(0, Y.length - m4.length), T4 = [];
    for (var v = 0;v < S; v++)
      T4[v] = "$" + v;
    if (s = Function("binder", "return function (" + E4(T4, ",") + "){ return binder.apply(this,arguments); }")(P), Y.prototype) {
      var x = function O() {};
      x.prototype = Y.prototype, s.prototype = new x, x.prototype = null;
    }
    return s;
  };
});
var Tn6 = R2((t, n) => {
  var h = vt6();
  n.exports = Function.prototype.bind || h;
});
var Tt6 = R2((t, n) => {
  n.exports = Error;
});
var At6 = R2((t, n) => {
  n.exports = EvalError;
});
var kt6 = R2((t, n) => {
  n.exports = RangeError;
});
var xt6 = R2((t, n) => {
  n.exports = ReferenceError;
});
var Vn6 = R2((t, n) => {
  n.exports = SyntaxError;
});
var An6 = R2((t, n) => {
  n.exports = TypeError;
});
var Ct6 = R2((t, n) => {
  n.exports = URIError;
});
var Ot6 = R2((t, n) => {
  n.exports = function h() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var c3 = {}, i = Symbol("test"), g3 = Object(i);
    if (typeof i === "string")
      return false;
    if (Object.prototype.toString.call(i) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(g3) !== "[object Symbol]")
      return false;
    var w7 = 42;
    c3[i] = w7;
    for (i in c3)
      return false;
    if (typeof Object.keys === "function" && Object.keys(c3).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(c3).length !== 0)
      return false;
    var I = Object.getOwnPropertySymbols(c3);
    if (I.length !== 1 || I[0] !== i)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(c3, i))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var E4 = Object.getOwnPropertyDescriptor(c3, i);
      if (E4.value !== w7 || E4.enumerable !== true)
        return false;
    }
    return true;
  };
});
var yn6 = R2((t, n) => {
  var h = typeof Symbol !== "undefined" && Symbol, c3 = Ot6();
  n.exports = function i() {
    if (typeof h !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof h("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return c3();
  };
});
var on6 = R2((t, n) => {
  var h = { foo: {} }, c3 = Object;
  n.exports = function i() {
    return { __proto__: h }.foo === h.foo && !({ __proto__: null } instanceof c3);
  };
});
var Gn6 = R2((t, n) => {
  var h = Function.prototype.call, c3 = Object.prototype.hasOwnProperty, i = Tn6();
  n.exports = i.call(h, c3);
});
var kn6 = R2((t, n) => {
  var h, c3 = Tt6(), i = At6(), g3 = kt6(), w7 = xt6(), I = Vn6(), E4 = An6(), j = Ct6(), $7 = Function, Y = function(M3) {
    try {
      return $7('"use strict"; return (' + M3 + ").constructor;")();
    } catch (r) {}
  }, m4 = Object.getOwnPropertyDescriptor;
  if (m4)
    try {
      m4({}, "");
    } catch (M3) {
      m4 = null;
    }
  var s = function() {
    throw new E4;
  }, P = m4 ? function() {
    try {
      return arguments.callee, s;
    } catch (M3) {
      try {
        return m4(arguments, "callee").get;
      } catch (r) {
        return s;
      }
    }
  }() : s, S = yn6()(), T4 = on6()(), v = Object.getPrototypeOf || (T4 ? function(M3) {
    return M3.__proto__;
  } : null), x = {}, O = typeof Uint8Array === "undefined" || !v ? h : v(Uint8Array), C = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? h : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? h : ArrayBuffer, "%ArrayIteratorPrototype%": S && v ? v([][Symbol.iterator]()) : h, "%AsyncFromSyncIteratorPrototype%": h, "%AsyncFunction%": x, "%AsyncGenerator%": x, "%AsyncGeneratorFunction%": x, "%AsyncIteratorPrototype%": x, "%Atomics%": typeof Atomics === "undefined" ? h : Atomics, "%BigInt%": typeof BigInt === "undefined" ? h : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? h : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? h : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? h : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": c3, "%eval%": eval, "%EvalError%": i, "%Float32Array%": typeof Float32Array === "undefined" ? h : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? h : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? h : FinalizationRegistry, "%Function%": $7, "%GeneratorFunction%": x, "%Int8Array%": typeof Int8Array === "undefined" ? h : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? h : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? h : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": S && v ? v(v([][Symbol.iterator]())) : h, "%JSON%": typeof JSON === "object" ? JSON : h, "%Map%": typeof Map === "undefined" ? h : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !S || !v ? h : v(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? h : Promise, "%Proxy%": typeof Proxy === "undefined" ? h : Proxy, "%RangeError%": g3, "%ReferenceError%": w7, "%Reflect%": typeof Reflect === "undefined" ? h : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? h : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !S || !v ? h : v(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? h : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": S && v ? v(""[Symbol.iterator]()) : h, "%Symbol%": S ? Symbol : h, "%SyntaxError%": I, "%ThrowTypeError%": P, "%TypedArray%": O, "%TypeError%": E4, "%Uint8Array%": typeof Uint8Array === "undefined" ? h : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? h : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? h : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? h : Uint32Array, "%URIError%": j, "%WeakMap%": typeof WeakMap === "undefined" ? h : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? h : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? h : WeakSet };
  if (v)
    try {
      null.error;
    } catch (M3) {
      D = v(v(M3)), C["%Error.prototype%"] = D;
    }
  var D, b5 = function M(r) {
    var u;
    if (r === "%AsyncFunction%")
      u = Y("async function () {}");
    else if (r === "%GeneratorFunction%")
      u = Y("function* () {}");
    else if (r === "%AsyncGeneratorFunction%")
      u = Y("async function* () {}");
    else if (r === "%AsyncGenerator%") {
      var L = M("%AsyncGeneratorFunction%");
      if (L)
        u = L.prototype;
    } else if (r === "%AsyncIteratorPrototype%") {
      var e = M("%AsyncGenerator%");
      if (e && v)
        u = v(e.prototype);
    }
    return C[r] = u, u;
  }, k = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, f4 = Tn6(), G = Gn6(), U = f4.call(Function.call, Array.prototype.concat), l = f4.call(Function.apply, Array.prototype.splice), hn4 = f4.call(Function.call, String.prototype.replace), a = f4.call(Function.call, String.prototype.slice), K4 = f4.call(Function.call, RegExp.prototype.exec), W = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, d = /\\(\\)?/g, p = function M(r) {
    var u = a(r, 0, 1), L = a(r, -1);
    if (u === "%" && L !== "%")
      throw new I("invalid intrinsic syntax, expected closing `%`");
    else if (L === "%" && u !== "%")
      throw new I("invalid intrinsic syntax, expected opening `%`");
    var e = [];
    return hn4(r, W, function(o, Z, H, X3) {
      e[e.length] = H ? hn4(X3, d, "$1") : Z || o;
    }), e;
  }, V = function M(r, u) {
    var L = r, e;
    if (G(k, L))
      e = k[L], L = "%" + e[0] + "%";
    if (G(C, L)) {
      var o = C[L];
      if (o === x)
        o = b5(L);
      if (typeof o === "undefined" && !u)
        throw new E4("intrinsic " + r + " exists, but is not available. Please file an issue!");
      return { alias: e, name: L, value: o };
    }
    throw new I("intrinsic " + r + " does not exist!");
  };
  n.exports = function M(r, u) {
    if (typeof r !== "string" || r.length === 0)
      throw new E4("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof u !== "boolean")
      throw new E4('"allowMissing" argument must be a boolean');
    if (K4(/^%?[^%]*%?$/, r) === null)
      throw new I("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var L = p(r), e = L.length > 0 ? L[0] : "", o = V("%" + e + "%", u), Z = o.name, H = o.value, X3 = false, nn4 = o.alias;
    if (nn4)
      e = nn4[0], l(L, U([0, 1], nn4));
    for (var z = 1, gn4 = true;z < L.length; z += 1) {
      var _ = L[z], $n4 = a(_, 0, 1), sn4 = a(_, -1);
      if (($n4 === '"' || $n4 === "'" || $n4 === "`" || (sn4 === '"' || sn4 === "'" || sn4 === "`")) && $n4 !== sn4)
        throw new I("property names with quotes must have matching quotes");
      if (_ === "constructor" || !gn4)
        X3 = true;
      if (e += "." + _, Z = "%" + e + "%", G(C, Z))
        H = C[Z];
      else if (H != null) {
        if (!(_ in H)) {
          if (!u)
            throw new E4("base intrinsic for " + r + " exists, but the property is not available.");
          return;
        }
        if (m4 && z + 1 >= L.length) {
          var In4 = m4(H, _);
          if (gn4 = !!In4, gn4 && "get" in In4 && !("originalValue" in In4.get))
            H = In4.get;
          else
            H = H[_];
        } else
          gn4 = G(H, _), H = H[_];
        if (gn4 && !X3)
          C[Z] = H;
      }
    }
    return H;
  };
});
var On6 = R2((t, n) => {
  var h = kn6(), c3 = h("%Object.defineProperty%", true) || false;
  if (c3)
    try {
      c3({}, "a", { value: 1 });
    } catch (i) {
      c3 = false;
    }
  n.exports = c3;
});
var ut6 = R2((t, n) => {
  var h, c3 = SyntaxError, i = Function, g3 = TypeError, w7 = function(K4) {
    try {
      return i('"use strict"; return (' + K4 + ").constructor;")();
    } catch (W) {}
  }, I = Object.getOwnPropertyDescriptor;
  if (I)
    try {
      I({}, "");
    } catch (K4) {
      I = null;
    }
  var E4 = function() {
    throw new g3;
  }, j = I ? function() {
    try {
      return arguments.callee, E4;
    } catch (K4) {
      try {
        return I(arguments, "callee").get;
      } catch (W) {
        return E4;
      }
    }
  }() : E4, $7 = yn6()(), Y = on6()(), m4 = Object.getPrototypeOf || (Y ? function(K4) {
    return K4.__proto__;
  } : null), s = {}, P = typeof Uint8Array === "undefined" || !m4 ? h : m4(Uint8Array), S = { "%AggregateError%": typeof AggregateError === "undefined" ? h : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? h : ArrayBuffer, "%ArrayIteratorPrototype%": $7 && m4 ? m4([][Symbol.iterator]()) : h, "%AsyncFromSyncIteratorPrototype%": h, "%AsyncFunction%": s, "%AsyncGenerator%": s, "%AsyncGeneratorFunction%": s, "%AsyncIteratorPrototype%": s, "%Atomics%": typeof Atomics === "undefined" ? h : Atomics, "%BigInt%": typeof BigInt === "undefined" ? h : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? h : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? h : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? h : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? h : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? h : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? h : FinalizationRegistry, "%Function%": i, "%GeneratorFunction%": s, "%Int8Array%": typeof Int8Array === "undefined" ? h : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? h : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? h : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": $7 && m4 ? m4(m4([][Symbol.iterator]())) : h, "%JSON%": typeof JSON === "object" ? JSON : h, "%Map%": typeof Map === "undefined" ? h : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !$7 || !m4 ? h : m4(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? h : Promise, "%Proxy%": typeof Proxy === "undefined" ? h : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? h : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? h : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !$7 || !m4 ? h : m4(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? h : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": $7 && m4 ? m4(""[Symbol.iterator]()) : h, "%Symbol%": $7 ? Symbol : h, "%SyntaxError%": c3, "%ThrowTypeError%": j, "%TypedArray%": P, "%TypeError%": g3, "%Uint8Array%": typeof Uint8Array === "undefined" ? h : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? h : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? h : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? h : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? h : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? h : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? h : WeakSet };
  if (m4)
    try {
      null.error;
    } catch (K4) {
      T4 = m4(m4(K4)), S["%Error.prototype%"] = T4;
    }
  var T4, v = function K(W) {
    var d;
    if (W === "%AsyncFunction%")
      d = w7("async function () {}");
    else if (W === "%GeneratorFunction%")
      d = w7("function* () {}");
    else if (W === "%AsyncGeneratorFunction%")
      d = w7("async function* () {}");
    else if (W === "%AsyncGenerator%") {
      var p = K("%AsyncGeneratorFunction%");
      if (p)
        d = p.prototype;
    } else if (W === "%AsyncIteratorPrototype%") {
      var V = K("%AsyncGenerator%");
      if (V && m4)
        d = m4(V.prototype);
    }
    return S[W] = d, d;
  }, x = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, O = Tn6(), C = Gn6(), D = O.call(Function.call, Array.prototype.concat), b5 = O.call(Function.apply, Array.prototype.splice), k = O.call(Function.call, String.prototype.replace), f4 = O.call(Function.call, String.prototype.slice), G = O.call(Function.call, RegExp.prototype.exec), U = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, l = /\\(\\)?/g, hn4 = function K(W) {
    var d = f4(W, 0, 1), p = f4(W, -1);
    if (d === "%" && p !== "%")
      throw new c3("invalid intrinsic syntax, expected closing `%`");
    else if (p === "%" && d !== "%")
      throw new c3("invalid intrinsic syntax, expected opening `%`");
    var V = [];
    return k(W, U, function(M3, r, u, L) {
      V[V.length] = u ? k(L, l, "$1") : r || M3;
    }), V;
  }, a = function K(W, d) {
    var p = W, V;
    if (C(x, p))
      V = x[p], p = "%" + V[0] + "%";
    if (C(S, p)) {
      var M3 = S[p];
      if (M3 === s)
        M3 = v(p);
      if (typeof M3 === "undefined" && !d)
        throw new g3("intrinsic " + W + " exists, but is not available. Please file an issue!");
      return { alias: V, name: p, value: M3 };
    }
    throw new c3("intrinsic " + W + " does not exist!");
  };
  n.exports = function K(W, d) {
    if (typeof W !== "string" || W.length === 0)
      throw new g3("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof d !== "boolean")
      throw new g3('"allowMissing" argument must be a boolean');
    if (G(/^%?[^%]*%?$/, W) === null)
      throw new c3("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var p = hn4(W), V = p.length > 0 ? p[0] : "", M3 = a("%" + V + "%", d), r = M3.name, u = M3.value, L = false, e = M3.alias;
    if (e)
      V = e[0], b5(p, D([0, 1], e));
    for (var o = 1, Z = true;o < p.length; o += 1) {
      var H = p[o], X3 = f4(H, 0, 1), nn4 = f4(H, -1);
      if ((X3 === '"' || X3 === "'" || X3 === "`" || (nn4 === '"' || nn4 === "'" || nn4 === "`")) && X3 !== nn4)
        throw new c3("property names with quotes must have matching quotes");
      if (H === "constructor" || !Z)
        L = true;
      if (V += "." + H, r = "%" + V + "%", C(S, r))
        u = S[r];
      else if (u != null) {
        if (!(H in u)) {
          if (!d)
            throw new g3("base intrinsic for " + W + " exists, but the property is not available.");
          return;
        }
        if (I && o + 1 >= p.length) {
          var z = I(u, H);
          if (Z = !!z, Z && "get" in z && !("originalValue" in z.get))
            u = z.get;
          else
            u = u[H];
        } else
          Z = C(u, H), u = u[H];
        if (Z && !L)
          S[r] = u;
      }
    }
    return u;
  };
});
var ln6 = R2((t, n) => {
  var h = ut6(), c3 = h("%Object.getOwnPropertyDescriptor%", true);
  if (c3)
    try {
      c3([], "length");
    } catch (i) {
      c3 = null;
    }
  n.exports = c3;
});
var Rt6 = R2((t, n) => {
  var h = On6(), c3 = Vn6(), i = An6(), g3 = ln6();
  n.exports = function w(I, E4, j) {
    if (!I || typeof I !== "object" && typeof I !== "function")
      throw new i("`obj` must be an object or a function`");
    if (typeof E4 !== "string" && typeof E4 !== "symbol")
      throw new i("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new i("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new i("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new i("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new i("`loose`, if provided, must be a boolean");
    var $7 = arguments.length > 3 ? arguments[3] : null, Y = arguments.length > 4 ? arguments[4] : null, m4 = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : false, P = !!g3 && g3(I, E4);
    if (h)
      h(I, E4, { configurable: m4 === null && P ? P.configurable : !m4, enumerable: $7 === null && P ? P.enumerable : !$7, value: j, writable: Y === null && P ? P.writable : !Y });
    else if (s || !$7 && !Y && !m4)
      I[E4] = j;
    else
      throw new c3("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Dt6 = R2((t, n) => {
  var h = On6(), c3 = function i() {
    return !!h;
  };
  c3.hasArrayLengthDefineBug = function i() {
    if (!h)
      return null;
    try {
      return h([], "length", { value: 1 }).length !== 1;
    } catch (g3) {
      return true;
    }
  }, n.exports = c3;
});
var rt2 = R2((t, n) => {
  var h = kn6(), c3 = Rt6(), i = Dt6()(), g3 = ln6(), w7 = An6(), I = h("%Math.floor%");
  n.exports = function E(j, $7) {
    if (typeof j !== "function")
      throw new w7("`fn` is not a function");
    if (typeof $7 !== "number" || $7 < 0 || $7 > 4294967295 || I($7) !== $7)
      throw new w7("`length` must be a positive 32-bit integer");
    var Y = arguments.length > 2 && !!arguments[2], m4 = true, s = true;
    if ("length" in j && g3) {
      var P = g3(j, "length");
      if (P && !P.configurable)
        m4 = false;
      if (P && !P.writable)
        s = false;
    }
    if (m4 || s || !Y)
      if (i)
        c3(j, "length", $7, true, true);
      else
        c3(j, "length", $7);
    return j;
  };
});
var Zn6 = R2((t, n) => {
  var h = Tn6(), c3 = kn6(), i = rt2(), g3 = An6(), w7 = c3("%Function.prototype.apply%"), I = c3("%Function.prototype.call%"), E4 = c3("%Reflect.apply%", true) || h.call(I, w7), j = On6(), $7 = c3("%Math.max%");
  n.exports = function m(s) {
    if (typeof s !== "function")
      throw new g3("a function is required");
    var P = E4(h, I, arguments);
    return i(P, 1 + $7(0, s.length - (arguments.length - 1)), true);
  };
  var Y = function m() {
    return E4(h, w7, arguments);
  };
  if (j)
    j(n.exports, "apply", { value: Y });
  else
    n.exports.apply = Y;
});
var Wt6 = R2((t, n) => {
  var h = kn6(), c3 = Zn6(), i = c3(h("String.prototype.indexOf"));
  n.exports = function g(w7, I) {
    var E4 = h(w7, !!I);
    if (typeof E4 === "function" && i(w7, ".prototype.") > -1)
      return c3(E4);
    return E4;
  };
});
var bt6 = R2((t, n) => {
  var h = (typeof JSON !== "undefined" ? JSON : st6()).stringify, c3 = It2(), i = St6(), g3 = Zn6(), w7 = Wt6(), I = w7("Array.prototype.join"), E4 = w7("Array.prototype.push"), j = function Y(m4, s) {
    var P = "";
    for (var S = 0;S < m4; S += 1)
      P += s;
    return P;
  }, $7 = function(Y, m4, s) {
    return s;
  };
  n.exports = function Y(m4) {
    var s = arguments.length > 1 ? arguments[1] : undefined, P = s && s.space || "";
    if (typeof P === "number")
      P = j(P, " ");
    var S = !!s && typeof s.cycles === "boolean" && s.cycles, T4 = s && s.replacer ? g3(s.replacer) : $7, v = typeof s === "function" ? s : s && s.cmp, x = v && function(C) {
      var D = v.length > 2 && function b(k) {
        return C[k];
      };
      return function(b5, k) {
        return v({ key: b5, value: C[b5] }, { key: k, value: C[k] }, D ? { __proto__: null, get: D } : undefined);
      };
    }, O = [];
    return function C(D, b5, k, f4) {
      var G = P ? `
` + j(f4, P) : "", U = P ? ": " : ":";
      if (k && k.toJSON && typeof k.toJSON === "function")
        k = k.toJSON();
      if (k = T4(D, b5, k), k === undefined)
        return;
      if (typeof k !== "object" || k === null)
        return h(k);
      if (c3(k)) {
        var K4 = [];
        for (var l = 0;l < k.length; l++) {
          var hn4 = C(k, l, k[l], f4 + 1) || h(null);
          E4(K4, G + P + hn4);
        }
        return "[" + I(K4, ",") + G + "]";
      }
      if (O.indexOf(k) !== -1) {
        if (S)
          return h("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        E4(O, k);
      var a = i(k).sort(x && x(k)), K4 = [];
      for (var l = 0;l < a.length; l++) {
        var b5 = a[l], W = C(k, b5, k[b5], f4 + 1);
        if (!W)
          continue;
        var d = h(b5) + U + W;
        E4(K4, G + P + d);
      }
      return O.splice(O.indexOf(k), 1), "{" + I(K4, ",") + G + "}";
    }({ "": m4 }, "", m4, 0);
  };
});
var Dn6 = Nt6(bt6(), 1);
var rn6 = function(t, n, h, c3) {
  let i, g3, w7, I = n || [0], E4 = (h = h || 0) >>> 3, j = c3 === -1 ? 3 : 0;
  for (i = 0;i < t.length; i += 1)
    w7 = i + E4, g3 = w7 >>> 2, I.length <= g3 && I.push(0), I[g3] |= t[i] << 8 * (j + c3 * (w7 % 4));
  return { value: I, binLen: 8 * t.length + h };
};
var mn3 = function(t, n, h) {
  switch (n) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (t) {
    case "HEX":
      return function(c3, i, g3) {
        return function(w7, I, E4, j) {
          let $7, Y, m4, s;
          if (w7.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          let P = I || [0], S = (E4 = E4 || 0) >>> 3, T4 = j === -1 ? 3 : 0;
          for ($7 = 0;$7 < w7.length; $7 += 2) {
            if (Y = parseInt(w7.substr($7, 2), 16), isNaN(Y))
              throw new Error("String of HEX type contains invalid characters");
            for (s = ($7 >>> 1) + S, m4 = s >>> 2;P.length <= m4; )
              P.push(0);
            P[m4] |= Y << 8 * (T4 + j * (s % 4));
          }
          return { value: P, binLen: 4 * w7.length + E4 };
        }(c3, i, g3, h);
      };
    case "TEXT":
      return function(c3, i, g3) {
        return function(w7, I, E4, j, $7) {
          let Y, m4, s, P, S, T4, v, x, O = 0, C = E4 || [0], D = (j = j || 0) >>> 3;
          if (I === "UTF8")
            for (v = $7 === -1 ? 3 : 0, s = 0;s < w7.length; s += 1)
              for (Y = w7.charCodeAt(s), m4 = [], 128 > Y ? m4.push(Y) : 2048 > Y ? (m4.push(192 | Y >>> 6), m4.push(128 | 63 & Y)) : 55296 > Y || 57344 <= Y ? m4.push(224 | Y >>> 12, 128 | Y >>> 6 & 63, 128 | 63 & Y) : (s += 1, Y = 65536 + ((1023 & Y) << 10 | 1023 & w7.charCodeAt(s)), m4.push(240 | Y >>> 18, 128 | Y >>> 12 & 63, 128 | Y >>> 6 & 63, 128 | 63 & Y)), P = 0;P < m4.length; P += 1) {
                for (T4 = O + D, S = T4 >>> 2;C.length <= S; )
                  C.push(0);
                C[S] |= m4[P] << 8 * (v + $7 * (T4 % 4)), O += 1;
              }
          else
            for (v = $7 === -1 ? 2 : 0, x = I === "UTF16LE" && $7 !== 1 || I !== "UTF16LE" && $7 === 1, s = 0;s < w7.length; s += 1) {
              for (Y = w7.charCodeAt(s), x === true && (P = 255 & Y, Y = P << 8 | Y >>> 8), T4 = O + D, S = T4 >>> 2;C.length <= S; )
                C.push(0);
              C[S] |= Y << 8 * (v + $7 * (T4 % 4)), O += 2;
            }
          return { value: C, binLen: 8 * O + j };
        }(c3, n, i, g3, h);
      };
    case "B64":
      return function(c3, i, g3) {
        return function(w7, I, E4, j) {
          let $7, Y, m4, s, P, S, T4, v = 0, x = I || [0], O = (E4 = E4 || 0) >>> 3, C = j === -1 ? 3 : 0, D = w7.indexOf("=");
          if (w7.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (w7 = w7.replace(/=/g, ""), D !== -1 && D < w7.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (Y = 0;Y < w7.length; Y += 4) {
            for (P = w7.substr(Y, 4), s = 0, m4 = 0;m4 < P.length; m4 += 1)
              $7 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(P.charAt(m4)), s |= $7 << 18 - 6 * m4;
            for (m4 = 0;m4 < P.length - 1; m4 += 1) {
              for (T4 = v + O, S = T4 >>> 2;x.length <= S; )
                x.push(0);
              x[S] |= (s >>> 16 - 8 * m4 & 255) << 8 * (C + j * (T4 % 4)), v += 1;
            }
          }
          return { value: x, binLen: 8 * v + E4 };
        }(c3, i, g3, h);
      };
    case "BYTES":
      return function(c3, i, g3) {
        return function(w7, I, E4, j) {
          let $7, Y, m4, s, P = I || [0], S = (E4 = E4 || 0) >>> 3, T4 = j === -1 ? 3 : 0;
          for (Y = 0;Y < w7.length; Y += 1)
            $7 = w7.charCodeAt(Y), s = Y + S, m4 = s >>> 2, P.length <= m4 && P.push(0), P[m4] |= $7 << 8 * (T4 + j * (s % 4));
          return { value: P, binLen: 8 * w7.length + E4 };
        }(c3, i, g3, h);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (c3) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(c3, i, g3) {
        return function(w7, I, E4, j) {
          return rn6(new Uint8Array(w7), I, E4, j);
        }(c3, i, g3, h);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (c3) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(c3, i, g3) {
        return rn6(c3, i, g3, h);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var Wn6 = function(t, n, h, c3) {
  switch (t) {
    case "HEX":
      return function(i) {
        return function(g3, w7, I, E4) {
          let j, $7, Y = "", m4 = w7 / 8, s = I === -1 ? 3 : 0;
          for (j = 0;j < m4; j += 1)
            $7 = g3[j >>> 2] >>> 8 * (s + I * (j % 4)), Y += "0123456789abcdef".charAt($7 >>> 4 & 15) + "0123456789abcdef".charAt(15 & $7);
          return E4.outputUpper ? Y.toUpperCase() : Y;
        }(i, n, h, c3);
      };
    case "B64":
      return function(i) {
        return function(g3, w7, I, E4) {
          let j, $7, Y, m4, s, P = "", S = w7 / 8, T4 = I === -1 ? 3 : 0;
          for (j = 0;j < S; j += 3)
            for (m4 = j + 1 < S ? g3[j + 1 >>> 2] : 0, s = j + 2 < S ? g3[j + 2 >>> 2] : 0, Y = (g3[j >>> 2] >>> 8 * (T4 + I * (j % 4)) & 255) << 16 | (m4 >>> 8 * (T4 + I * ((j + 1) % 4)) & 255) << 8 | s >>> 8 * (T4 + I * ((j + 2) % 4)) & 255, $7 = 0;$7 < 4; $7 += 1)
              P += 8 * j + 6 * $7 <= w7 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(Y >>> 6 * (3 - $7) & 63) : E4.b64Pad;
          return P;
        }(i, n, h, c3);
      };
    case "BYTES":
      return function(i) {
        return function(g3, w7, I) {
          let E4, j, $7 = "", Y = w7 / 8, m4 = I === -1 ? 3 : 0;
          for (E4 = 0;E4 < Y; E4 += 1)
            j = g3[E4 >>> 2] >>> 8 * (m4 + I * (E4 % 4)) & 255, $7 += String.fromCharCode(j);
          return $7;
        }(i, n, h);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (i) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(i) {
        return function(g3, w7, I) {
          let E4, j = w7 / 8, $7 = new ArrayBuffer(j), Y = new Uint8Array($7), m4 = I === -1 ? 3 : 0;
          for (E4 = 0;E4 < j; E4 += 1)
            Y[E4] = g3[E4 >>> 2] >>> 8 * (m4 + I * (E4 % 4)) & 255;
          return $7;
        }(i, n, h);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (i) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(i) {
        return function(g3, w7, I) {
          let E4, j = w7 / 8, $7 = I === -1 ? 3 : 0, Y = new Uint8Array(j);
          for (E4 = 0;E4 < j; E4 += 1)
            Y[E4] = g3[E4 >>> 2] >>> 8 * ($7 + I * (E4 % 4)) & 255;
          return Y;
        }(i, n, h);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var vn6 = function(t, n) {
  let h, c3, i = t.binLen >>> 3, g3 = n.binLen >>> 3, w7 = i << 3, I = 4 - i << 3;
  if (i % 4 != 0) {
    for (h = 0;h < g3; h += 4)
      c3 = i + h >>> 2, t.value[c3] |= n.value[h >>> 2] << w7, t.value.push(0), t.value[c3 + 1] |= n.value[h >>> 2] >>> I;
    return (t.value.length << 2) - 4 >= g3 + i && t.value.pop(), { value: t.value, binLen: t.binLen + n.binLen };
  }
  return { value: t.value.concat(n.value), binLen: t.binLen + n.binLen };
};
var bn6 = function(t) {
  let n = { outputUpper: false, b64Pad: "=", outputLen: -1 }, h = t || {};
  if (n.outputUpper = h.outputUpper || false, h.b64Pad && (n.b64Pad = h.b64Pad), h.outputLen) {
    if (h.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    n.outputLen = h.outputLen;
  } else if (h.shakeLen) {
    if (h.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    n.outputLen = h.shakeLen;
  }
  if (typeof n.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof n.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return n;
};
var tn6 = function(t, n, h, c3) {
  let i = t + " must include a value and format";
  if (!n) {
    if (!c3)
      throw new Error(i);
    return c3;
  }
  if (n.value === undefined || !n.format)
    throw new Error(i);
  return mn3(n.format, n.encoding || "UTF8", h)(n.value);
};
var cn6 = function(t, n) {
  return t << n | t >>> 32 - n;
};
var B6 = function(t, n) {
  return t >>> n | t << 32 - n;
};
var Un6 = function(t, n) {
  return t >>> n;
};
var Ln6 = function(t, n, h) {
  return t ^ n ^ h;
};
var Fn6 = function(t, n, h) {
  return t & n ^ ~t & h;
};
var Bn6 = function(t, n, h) {
  return t & n ^ t & h ^ n & h;
};
var Lt6 = function(t) {
  return B6(t, 2) ^ B6(t, 13) ^ B6(t, 22);
};
var y7 = function(t, n) {
  let h = (65535 & t) + (65535 & n);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16)) << 16 | 65535 & h;
};
var Mt6 = function(t, n, h, c3) {
  let i = (65535 & t) + (65535 & n) + (65535 & h) + (65535 & c3);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16) + (c3 >>> 16) + (i >>> 16)) << 16 | 65535 & i;
};
var wn6 = function(t, n, h, c3, i) {
  let g3 = (65535 & t) + (65535 & n) + (65535 & h) + (65535 & c3) + (65535 & i);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16) + (c3 >>> 16) + (i >>> 16) + (g3 >>> 16)) << 16 | 65535 & g3;
};
var Ht6 = function(t) {
  return B6(t, 7) ^ B6(t, 18) ^ Un6(t, 3);
};
var pt6 = function(t) {
  return B6(t, 6) ^ B6(t, 11) ^ B6(t, 25);
};
var Kt6 = function(t) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var Qn6 = function(t, n) {
  let h, c3, i, g3, w7, I, E4, j = [];
  for (h = n[0], c3 = n[1], i = n[2], g3 = n[3], w7 = n[4], E4 = 0;E4 < 80; E4 += 1)
    j[E4] = E4 < 16 ? t[E4] : cn6(j[E4 - 3] ^ j[E4 - 8] ^ j[E4 - 14] ^ j[E4 - 16], 1), I = E4 < 20 ? wn6(cn6(h, 5), Fn6(c3, i, g3), w7, 1518500249, j[E4]) : E4 < 40 ? wn6(cn6(h, 5), Ln6(c3, i, g3), w7, 1859775393, j[E4]) : E4 < 60 ? wn6(cn6(h, 5), Bn6(c3, i, g3), w7, 2400959708, j[E4]) : wn6(cn6(h, 5), Ln6(c3, i, g3), w7, 3395469782, j[E4]), w7 = g3, g3 = i, i = cn6(c3, 30), c3 = h, h = I;
  return n[0] = y7(h, n[0]), n[1] = y7(c3, n[1]), n[2] = y7(i, n[2]), n[3] = y7(g3, n[3]), n[4] = y7(w7, n[4]), n;
};
var dt6 = function(t, n, h, c3) {
  let i, g3 = 15 + (n + 65 >>> 9 << 4), w7 = n + h;
  for (;t.length <= g3; )
    t.push(0);
  for (t[n >>> 5] |= 128 << 24 - n % 32, t[g3] = 4294967295 & w7, t[g3 - 1] = w7 / En6 | 0, i = 0;i < t.length; i += 16)
    c3 = Qn6(t.slice(i, i + 16), c3);
  return c3;
};
var Mn6 = function(t) {
  let n;
  return n = t == "SHA-224" ? J2.slice() : q6.slice(), n;
};
var Hn6 = function(t, n) {
  let h, c3, i, g3, w7, I, E4, j, $7, Y, m4, s = [];
  for (h = n[0], c3 = n[1], i = n[2], g3 = n[3], w7 = n[4], I = n[5], E4 = n[6], j = n[7], m4 = 0;m4 < 64; m4 += 1)
    s[m4] = m4 < 16 ? t[m4] : Mt6(B6(P = s[m4 - 2], 17) ^ B6(P, 19) ^ Un6(P, 10), s[m4 - 7], Ht6(s[m4 - 15]), s[m4 - 16]), $7 = wn6(j, pt6(w7), Fn6(w7, I, E4), A2[m4], s[m4]), Y = y7(Lt6(h), Bn6(h, c3, i)), j = E4, E4 = I, I = w7, w7 = y7(g3, $7), g3 = i, i = c3, c3 = h, h = y7($7, Y);
  var P;
  return n[0] = y7(h, n[0]), n[1] = y7(c3, n[1]), n[2] = y7(i, n[2]), n[3] = y7(g3, n[3]), n[4] = y7(w7, n[4]), n[5] = y7(I, n[5]), n[6] = y7(E4, n[6]), n[7] = y7(j, n[7]), n;
};
var pn6 = function(t, n) {
  let h;
  return n > 32 ? (h = 64 - n, new N2(t.I << n | t.N >>> h, t.N << n | t.I >>> h)) : n !== 0 ? (h = 32 - n, new N2(t.N << n | t.I >>> h, t.I << n | t.N >>> h)) : t;
};
var Q6 = function(t, n) {
  let h;
  return n < 32 ? (h = 32 - n, new N2(t.N >>> n | t.I << h, t.I >>> n | t.N << h)) : (h = 64 - n, new N2(t.I >>> n | t.N << h, t.N >>> n | t.I << h));
};
var an6 = function(t, n) {
  return new N2(t.N >>> n, t.I >>> n | t.N << 32 - n);
};
var et6 = function(t, n, h) {
  return new N2(t.N & n.N ^ t.N & h.N ^ n.N & h.N, t.I & n.I ^ t.I & h.I ^ n.I & h.I);
};
var ft6 = function(t) {
  let n = Q6(t, 28), h = Q6(t, 34), c3 = Q6(t, 39);
  return new N2(n.N ^ h.N ^ c3.N, n.I ^ h.I ^ c3.I);
};
var F6 = function(t, n) {
  let h, c3;
  h = (65535 & t.I) + (65535 & n.I), c3 = (t.I >>> 16) + (n.I >>> 16) + (h >>> 16);
  let i = (65535 & c3) << 16 | 65535 & h;
  return h = (65535 & t.N) + (65535 & n.N) + (c3 >>> 16), c3 = (t.N >>> 16) + (n.N >>> 16) + (h >>> 16), new N2((65535 & c3) << 16 | 65535 & h, i);
};
var Vt6 = function(t, n, h, c3) {
  let i, g3;
  i = (65535 & t.I) + (65535 & n.I) + (65535 & h.I) + (65535 & c3.I), g3 = (t.I >>> 16) + (n.I >>> 16) + (h.I >>> 16) + (c3.I >>> 16) + (i >>> 16);
  let w7 = (65535 & g3) << 16 | 65535 & i;
  return i = (65535 & t.N) + (65535 & n.N) + (65535 & h.N) + (65535 & c3.N) + (g3 >>> 16), g3 = (t.N >>> 16) + (n.N >>> 16) + (h.N >>> 16) + (c3.N >>> 16) + (i >>> 16), new N2((65535 & g3) << 16 | 65535 & i, w7);
};
var yt6 = function(t, n, h, c3, i) {
  let g3, w7;
  g3 = (65535 & t.I) + (65535 & n.I) + (65535 & h.I) + (65535 & c3.I) + (65535 & i.I), w7 = (t.I >>> 16) + (n.I >>> 16) + (h.I >>> 16) + (c3.I >>> 16) + (i.I >>> 16) + (g3 >>> 16);
  let I = (65535 & w7) << 16 | 65535 & g3;
  return g3 = (65535 & t.N) + (65535 & n.N) + (65535 & h.N) + (65535 & c3.N) + (65535 & i.N) + (w7 >>> 16), w7 = (t.N >>> 16) + (n.N >>> 16) + (h.N >>> 16) + (c3.N >>> 16) + (i.N >>> 16) + (g3 >>> 16), new N2((65535 & w7) << 16 | 65535 & g3, I);
};
var Yn6 = function(t, n) {
  return new N2(t.N ^ n.N, t.I ^ n.I);
};
var ot6 = function(t) {
  let n = Q6(t, 19), h = Q6(t, 61), c3 = an6(t, 6);
  return new N2(n.N ^ h.N ^ c3.N, n.I ^ h.I ^ c3.I);
};
var Gt6 = function(t) {
  let n = Q6(t, 1), h = Q6(t, 8), c3 = an6(t, 7);
  return new N2(n.N ^ h.N ^ c3.N, n.I ^ h.I ^ c3.I);
};
var lt6 = function(t) {
  let n = Q6(t, 14), h = Q6(t, 18), c3 = Q6(t, 41);
  return new N2(n.N ^ h.N ^ c3.N, n.I ^ h.I ^ c3.I);
};
var Kn6 = function(t) {
  return t === "SHA-384" ? [new N2(3418070365, J2[0]), new N2(1654270250, J2[1]), new N2(2438529370, J2[2]), new N2(355462360, J2[3]), new N2(1731405415, J2[4]), new N2(41048885895, J2[5]), new N2(3675008525, J2[6]), new N2(1203062813, J2[7])] : [new N2(q6[0], 4089235720), new N2(q6[1], 2227873595), new N2(q6[2], 4271175723), new N2(q6[3], 1595750129), new N2(q6[4], 2917565137), new N2(q6[5], 725511199), new N2(q6[6], 4215389547), new N2(q6[7], 327033209)];
};
var dn6 = function(t, n) {
  let h, c3, i, g3, w7, I, E4, j, $7, Y, m4, s, P = [];
  for (h = n[0], c3 = n[1], i = n[2], g3 = n[3], w7 = n[4], I = n[5], E4 = n[6], j = n[7], m4 = 0;m4 < 80; m4 += 1)
    m4 < 16 ? (s = 2 * m4, P[m4] = new N2(t[s], t[s + 1])) : P[m4] = Vt6(ot6(P[m4 - 2]), P[m4 - 7], Gt6(P[m4 - 15]), P[m4 - 16]), $7 = yt6(j, lt6(w7), (T4 = I, v = E4, new N2((S = w7).N & T4.N ^ ~S.N & v.N, S.I & T4.I ^ ~S.I & v.I)), Bt6[m4], P[m4]), Y = F6(ft6(h), et6(h, c3, i)), j = E4, E4 = I, I = w7, w7 = F6(g3, $7), g3 = i, i = c3, c3 = h, h = F6($7, Y);
  var S, T4, v;
  return n[0] = F6(h, n[0]), n[1] = F6(c3, n[1]), n[2] = F6(i, n[2]), n[3] = F6(g3, n[3]), n[4] = F6(w7, n[4]), n[5] = F6(I, n[5]), n[6] = F6(E4, n[6]), n[7] = F6(j, n[7]), n;
};
var Cn6 = function(t) {
  let n, h = [];
  for (n = 0;n < 5; n += 1)
    h[n] = [new N2(0, 0), new N2(0, 0), new N2(0, 0), new N2(0, 0), new N2(0, 0)];
  return h;
};
var Zt6 = function(t) {
  let n, h = [];
  for (n = 0;n < 5; n += 1)
    h[n] = t[n].slice();
  return h;
};
var Pn6 = function(t, n) {
  let h, c3, i, g3, w7 = [], I = [];
  if (t !== null)
    for (c3 = 0;c3 < t.length; c3 += 2)
      n[(c3 >>> 1) % 5][(c3 >>> 1) / 5 | 0] = Yn6(n[(c3 >>> 1) % 5][(c3 >>> 1) / 5 | 0], new N2(t[c3 + 1], t[c3]));
  for (h = 0;h < 24; h += 1) {
    for (g3 = Cn6(), c3 = 0;c3 < 5; c3 += 1)
      w7[c3] = (E4 = n[c3][0], j = n[c3][1], $7 = n[c3][2], Y = n[c3][3], m4 = n[c3][4], new N2(E4.N ^ j.N ^ $7.N ^ Y.N ^ m4.N, E4.I ^ j.I ^ $7.I ^ Y.I ^ m4.I));
    for (c3 = 0;c3 < 5; c3 += 1)
      I[c3] = Yn6(w7[(c3 + 4) % 5], pn6(w7[(c3 + 1) % 5], 1));
    for (c3 = 0;c3 < 5; c3 += 1)
      for (i = 0;i < 5; i += 1)
        n[c3][i] = Yn6(n[c3][i], I[c3]);
    for (c3 = 0;c3 < 5; c3 += 1)
      for (i = 0;i < 5; i += 1)
        g3[i][(2 * c3 + 3 * i) % 5] = pn6(n[c3][i], Xt6[c3][i]);
    for (c3 = 0;c3 < 5; c3 += 1)
      for (i = 0;i < 5; i += 1)
        n[c3][i] = Yn6(g3[c3][i], new N2(~g3[(c3 + 1) % 5][i].N & g3[(c3 + 2) % 5][i].N, ~g3[(c3 + 1) % 5][i].I & g3[(c3 + 2) % 5][i].I));
    n[0][0] = Yn6(n[0][0], at6[h]);
  }
  var E4, j, $7, Y, m4;
  return n;
};
var Xn6 = function(t) {
  let n, h, c3 = 0, i = [0, 0], g3 = [4294967295 & t, t / En6 & 2097151];
  for (n = 6;n >= 0; n--)
    h = g3[n >> 2] >>> 8 * n & 255, h === 0 && c3 === 0 || (i[c3 + 1 >> 2] |= h << 8 * (c3 + 1), c3 += 1);
  return c3 = c3 !== 0 ? c3 : 1, i[0] |= c3, { value: c3 + 1 > 4 ? i : [i[0]], binLen: 8 + 8 * c3 };
};
var xn6 = function(t) {
  return vn6(Xn6(t.binLen), t);
};
var en6 = function(t, n) {
  let h, c3 = Xn6(n);
  c3 = vn6(c3, t);
  let i = n >>> 2, g3 = (i - c3.value.length % i) % i;
  for (h = 0;h < g3; h++)
    c3.value.push(0);
  return c3.value;
};
var En6 = 4294967296;
var A2 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var J2 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var q6 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var Nn6 = "Chosen SHA variant is not supported";
var zn6 = "Cannot set numRounds with MAC";

class jn6 {
  constructor(t, n, h) {
    let c3 = h || {};
    if (this.t = n, this.i = c3.encoding || "UTF8", this.numRounds = c3.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = t, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(t) {
    let n, h = 0, c3 = this.m >>> 5, i = this.C(t, this.h, this.u), g3 = i.binLen, w7 = i.value, I = g3 >>> 5;
    for (n = 0;n < I; n += c3)
      h + this.m <= g3 && (this.U = this.v(w7.slice(n, n + c3), this.U), h += this.m);
    return this.A += h, this.h = w7.slice(h >>> 5), this.u = g3 % this.m, this.l = true, this;
  }
  getHash(t, n) {
    let h, c3, i = this.R, g3 = bn6(n);
    if (this.K) {
      if (g3.outputLen === -1)
        throw new Error("Output length must be specified in options");
      i = g3.outputLen;
    }
    let w7 = Wn6(t, i, this.T, g3);
    if (this.H && this.g)
      return w7(this.g(g3));
    for (c3 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), i), h = 1;h < this.numRounds; h += 1)
      this.K && i % 32 != 0 && (c3[c3.length - 1] &= 16777215 >>> 24 - i % 32), c3 = this.F(c3, i, 0, this.B(this.o), i);
    return w7(c3);
  }
  setHMACKey(t, n, h) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    let c3 = mn3(n, (h || {}).encoding || "UTF8", this.T);
    this.k(c3(t));
  }
  k(t) {
    let n = this.m >>> 3, h = n / 4 - 1, c3;
    if (this.numRounds !== 1)
      throw new Error(zn6);
    if (this.H)
      throw new Error("MAC key already set");
    for (n < t.binLen / 8 && (t.value = this.F(t.value, t.binLen, 0, this.B(this.o), this.R));t.value.length <= h; )
      t.value.push(0);
    for (c3 = 0;c3 <= h; c3 += 1)
      this.S[c3] = 909522486 ^ t.value[c3], this.p[c3] = 1549556828 ^ t.value[c3];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(t, n) {
    let h = bn6(n);
    return Wn6(t, this.R, this.T, h)(this.Y());
  }
  Y() {
    let t;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    let n = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return t = this.v(this.p, this.B(this.o)), t = this.F(n, this.R, this.m, t, this.R), t;
  }
}
var Ut6 = class extends jn6 {
  constructor(t, n, h) {
    if (t !== "SHA-1")
      throw new Error(Nn6);
    super(t, n, h);
    let c3 = h || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = mn3(this.t, this.i, this.T), this.v = Qn6, this.L = function(i) {
      return i.slice();
    }, this.B = Kt6, this.F = dt6, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, c3.hmacKey && this.k(tn6("hmacKey", c3.hmacKey, this.T));
  }
};
var Ft6 = class extends jn6 {
  constructor(t, n, h) {
    if (t !== "SHA-224" && t !== "SHA-256")
      throw new Error(Nn6);
    super(t, n, h);
    let c3 = h || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = mn3(this.t, this.i, this.T), this.v = Hn6, this.L = function(i) {
      return i.slice();
    }, this.B = Mn6, this.F = function(i, g3, w7, I) {
      return function(E4, j, $7, Y, m4) {
        let s, P, S = 15 + (j + 65 >>> 9 << 4), T4 = j + $7;
        for (;E4.length <= S; )
          E4.push(0);
        for (E4[j >>> 5] |= 128 << 24 - j % 32, E4[S] = 4294967295 & T4, E4[S - 1] = T4 / En6 | 0, s = 0;s < E4.length; s += 16)
          Y = Hn6(E4.slice(s, s + 16), Y);
        return P = m4 === "SHA-224" ? [Y[0], Y[1], Y[2], Y[3], Y[4], Y[5], Y[6]] : Y, P;
      }(i, g3, w7, I, t);
    }, this.U = Mn6(t), this.m = 512, this.R = t === "SHA-224" ? 224 : 256, this.K = false, c3.hmacKey && this.k(tn6("hmacKey", c3.hmacKey, this.T));
  }
};

class N2 {
  constructor(t, n) {
    this.N = t, this.I = n;
  }
}
var Bt6 = [new N2(A2[0], 3609767458), new N2(A2[1], 602891725), new N2(A2[2], 3964484399), new N2(A2[3], 2173295548), new N2(A2[4], 4081628472), new N2(A2[5], 3053834265), new N2(A2[6], 2937671579), new N2(A2[7], 3664609560), new N2(A2[8], 2734883394), new N2(A2[9], 1164996542), new N2(A2[10], 1323610764), new N2(A2[11], 3590304994), new N2(A2[12], 4068182383), new N2(A2[13], 991336113), new N2(A2[14], 633803317), new N2(A2[15], 3479774868), new N2(A2[16], 2666613458), new N2(A2[17], 944711139), new N2(A2[18], 2341262773), new N2(A2[19], 2007800933), new N2(A2[20], 1495990901), new N2(A2[21], 1856431235), new N2(A2[22], 3175218132), new N2(A2[23], 2198950837), new N2(A2[24], 3999719339), new N2(A2[25], 766784016), new N2(A2[26], 2566594879), new N2(A2[27], 3203337956), new N2(A2[28], 1034457026), new N2(A2[29], 2466948901), new N2(A2[30], 3758326383), new N2(A2[31], 168717936), new N2(A2[32], 1188179964), new N2(A2[33], 1546045734), new N2(A2[34], 1522805485), new N2(A2[35], 2643833823), new N2(A2[36], 2343527390), new N2(A2[37], 1014477480), new N2(A2[38], 1206759142), new N2(A2[39], 344077627), new N2(A2[40], 1290863460), new N2(A2[41], 3158454273), new N2(A2[42], 3505952657), new N2(A2[43], 106217008), new N2(A2[44], 3606008344), new N2(A2[45], 1432725776), new N2(A2[46], 1467031594), new N2(A2[47], 851169720), new N2(A2[48], 3100823752), new N2(A2[49], 1363258195), new N2(A2[50], 3750685593), new N2(A2[51], 3785050280), new N2(A2[52], 3318307427), new N2(A2[53], 3812723403), new N2(A2[54], 2003034995), new N2(A2[55], 3602036899), new N2(A2[56], 1575990012), new N2(A2[57], 1125592928), new N2(A2[58], 2716904306), new N2(A2[59], 442776044), new N2(A2[60], 593698344), new N2(A2[61], 3733110249), new N2(A2[62], 2999351573), new N2(A2[63], 3815920427), new N2(3391569614, 3928383900), new N2(3515267271, 566280711), new N2(3940187606, 3454069534), new N2(4118630271, 4000239992), new N2(116418474, 1914138554), new N2(174292421, 2731055270), new N2(289380356, 3203993006), new N2(460393269, 320620315), new N2(685471733, 587496836), new N2(852142971, 1086792851), new N2(1017036298, 365543100), new N2(1126000580, 2618297676), new N2(1288033470, 3409855158), new N2(1501505948, 4234509866), new N2(1607167915, 987167468), new N2(1816402316, 1246189591)];
var Qt6 = class extends jn6 {
  constructor(t, n, h) {
    if (t !== "SHA-384" && t !== "SHA-512")
      throw new Error(Nn6);
    super(t, n, h);
    let c3 = h || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = mn3(this.t, this.i, this.T), this.v = dn6, this.L = function(i) {
      return i.slice();
    }, this.B = Kn6, this.F = function(i, g3, w7, I) {
      return function(E4, j, $7, Y, m4) {
        let s, P, S = 31 + (j + 129 >>> 10 << 5), T4 = j + $7;
        for (;E4.length <= S; )
          E4.push(0);
        for (E4[j >>> 5] |= 128 << 24 - j % 32, E4[S] = 4294967295 & T4, E4[S - 1] = T4 / En6 | 0, s = 0;s < E4.length; s += 32)
          Y = dn6(E4.slice(s, s + 32), Y);
        return P = m4 === "SHA-384" ? [Y[0].N, Y[0].I, Y[1].N, Y[1].I, Y[2].N, Y[2].I, Y[3].N, Y[3].I, Y[4].N, Y[4].I, Y[5].N, Y[5].I] : [Y[0].N, Y[0].I, Y[1].N, Y[1].I, Y[2].N, Y[2].I, Y[3].N, Y[3].I, Y[4].N, Y[4].I, Y[5].N, Y[5].I, Y[6].N, Y[6].I, Y[7].N, Y[7].I], P;
      }(i, g3, w7, I, t);
    }, this.U = Kn6(t), this.m = 1024, this.R = t === "SHA-384" ? 384 : 512, this.K = false, c3.hmacKey && this.k(tn6("hmacKey", c3.hmacKey, this.T));
  }
};
var at6 = [new N2(0, 1), new N2(0, 32898), new N2(2147483648, 32906), new N2(2147483648, 2147516416), new N2(0, 32907), new N2(0, 2147483649), new N2(2147483648, 2147516545), new N2(2147483648, 32777), new N2(0, 138), new N2(0, 136), new N2(0, 2147516425), new N2(0, 2147483658), new N2(0, 2147516555), new N2(2147483648, 139), new N2(2147483648, 32905), new N2(2147483648, 32771), new N2(2147483648, 32770), new N2(2147483648, 128), new N2(0, 32778), new N2(2147483648, 2147483658), new N2(2147483648, 2147516545), new N2(2147483648, 32896), new N2(0, 2147483649), new N2(2147483648, 2147516424)];
var Xt6 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var zt6 = class extends jn6 {
  constructor(t, n, h) {
    let c3 = 6, i = 0;
    super(t, n, h);
    let g3 = h || {};
    if (this.numRounds !== 1) {
      if (g3.kmacKey || g3.hmacKey)
        throw new Error(zn6);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = mn3(this.t, this.i, this.T), this.v = Pn6, this.L = Zt6, this.B = Cn6, this.U = Cn6(), this.K = false, t) {
      case "SHA3-224":
        this.m = i = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = i = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = i = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = i = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        c3 = 31, this.m = i = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        c3 = 31, this.m = i = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        c3 = 4, this.m = i = 1344, this.X(h), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        c3 = 4, this.m = i = 1088, this.X(h), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = i = 1344, c3 = this.O(h), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = i = 1088, c3 = this.O(h), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(Nn6);
    }
    this.F = function(w7, I, E4, j, $7) {
      return function(Y, m4, s, P, S, T4, v) {
        let x, O, C = 0, D = [], b5 = S >>> 5, k = m4 >>> 5;
        for (x = 0;x < k && m4 >= S; x += b5)
          P = Pn6(Y.slice(x, x + b5), P), m4 -= S;
        for (Y = Y.slice(x), m4 %= S;Y.length < b5; )
          Y.push(0);
        for (x = m4 >>> 3, Y[x >> 2] ^= T4 << x % 4 * 8, Y[b5 - 1] ^= 2147483648, P = Pn6(Y, P);32 * D.length < v && (O = P[C % 5][C / 5 | 0], D.push(O.I), !(32 * D.length >= v)); )
          D.push(O.N), C += 1, 64 * C % S == 0 && (Pn6(null, P), C = 0);
        return D;
      }(w7, I, 0, j, i, c3, $7);
    }, g3.hmacKey && this.k(tn6("hmacKey", g3.hmacKey, this.T));
  }
  O(t, n) {
    let h = function(i) {
      let g3 = i || {};
      return { funcName: tn6("funcName", g3.funcName, 1, { value: [], binLen: 0 }), customization: tn6("Customization", g3.customization, 1, { value: [], binLen: 0 }) };
    }(t || {});
    n && (h.funcName = n);
    let c3 = vn6(xn6(h.funcName), xn6(h.customization));
    if (h.customization.binLen !== 0 || h.funcName.binLen !== 0) {
      let i = en6(c3, this.m >>> 3);
      for (let g3 = 0;g3 < i.length; g3 += this.m >>> 5)
        this.U = this.v(i.slice(g3, g3 + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(t) {
    let n = function(c3) {
      let i = c3 || {};
      return { kmacKey: tn6("kmacKey", i.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: tn6("Customization", i.customization, 1, { value: [], binLen: 0 }) };
    }(t || {});
    this.O(t, n.funcName);
    let h = en6(xn6(n.kmacKey), this.m >>> 3);
    for (let c3 = 0;c3 < h.length; c3 += this.m >>> 5)
      this.U = this.v(h.slice(c3, c3 + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(t) {
    let n = vn6({ value: this.h.slice(), binLen: this.u }, function(h) {
      let c3, i, g3 = 0, w7 = [0, 0], I = [4294967295 & h, h / En6 & 2097151];
      for (c3 = 6;c3 >= 0; c3--)
        i = I[c3 >> 2] >>> 8 * c3 & 255, i === 0 && g3 === 0 || (w7[g3 >> 2] |= i << 8 * g3, g3 += 1);
      return g3 = g3 !== 0 ? g3 : 1, w7[g3 >> 2] |= g3 << 8 * g3, { value: g3 + 1 > 4 ? w7 : [w7[0]], binLen: 8 + 8 * g3 };
    }(t.outputLen));
    return this.F(n.value, n.binLen, this.A, this.L(this.U), t.outputLen);
  }
};

class _n6 {
  constructor(t, n, h) {
    if (t == "SHA-1")
      this.P = new Ut6(t, n, h);
    else if (t == "SHA-224" || t == "SHA-256")
      this.P = new Ft6(t, n, h);
    else if (t == "SHA-384" || t == "SHA-512")
      this.P = new Qt6(t, n, h);
    else {
      if (t != "SHA3-224" && t != "SHA3-256" && t != "SHA3-384" && t != "SHA3-512" && t != "SHAKE128" && t != "SHAKE256" && t != "CSHAKE128" && t != "CSHAKE256" && t != "KMAC128" && t != "KMAC256")
        throw new Error(Nn6);
      this.P = new zt6(t, n, h);
    }
  }
  update(t) {
    return this.P.update(t), this;
  }
  getHash(t, n) {
    return this.P.getHash(t, n);
  }
  setHMACKey(t, n, h) {
    this.P.setHMACKey(t, n, h);
  }
  getHMAC(t, n) {
    return this.P.getHMAC(t, n);
  }
}
var Sn6 = function(t, n, h = 0) {
  let c3 = Dn6.default({ ...t, signature: undefined }), i = n.noTimeWindow ? 0 : Math.floor(Date.now() / (n.timeWindow ?? nt2)) + h;
  return new _n6("SHA-256", "TEXT", { encoding: "UTF8" }).update(c3).update(Dn6.default(n)).update(`${i}`).getHash("B64");
};
function Jn6(t, n = {}) {
  return { ...t, signature: Sn6(t, n) };
}
var nt2 = 5000;

class un6 {
  data = [];
  #n = new TextEncoder;
  static payload(t, n, h) {
    return new un6().payload(t, n, h);
  }
  static blob(t, n) {
    return new un6().blob(t, n);
  }
  #t(t) {
    let n = this.#n.encode(t), h = new Uint8Array([n.byteLength]);
    this.data.push(h.buffer), this.data.push(n.buffer);
  }
  payload(t, n, h) {
    this.#t(t);
    let c3 = new Uint8Array([1]);
    this.data.push(c3.buffer);
    let i = JSON.stringify(h ? Jn6(n, { secret: h }) : n), g3 = this.#n.encode(i), w7 = new Uint32Array([g3.byteLength]);
    return this.data.push(w7.buffer), this.data.push(g3.buffer), this;
  }
  blob(t, n) {
    this.#t(t);
    let h = new Uint8Array([2]);
    this.data.push(h.buffer);
    let c3 = new Uint32Array([n.size]);
    return this.data.push(c3.buffer), this.data.push(n), this;
  }
  build() {
    return new Blob(this.data);
  }
}
var ct2 = new TextDecoder;
function Jt6(t, n) {
  let [h, c3] = mt6(t, n);
  return [ct2.decode(new Uint8Array(t, c3, h)), c3 + h];
}
function qt6(t, n) {
  let [h, c3] = it6(t, n);
  return [ct2.decode(new Uint8Array(t, c3, h)), c3 + h];
}
function n82(t, n) {
  let [h, c3] = it6(t, n);
  return [new Blob([new Uint8Array(t, c3, h)], { type: "application/octet-stream" }), c3 + h];
}
function it6(t, n) {
  return [new Uint32Array(t.slice(n, n + Uint32Array.BYTES_PER_ELEMENT), 0, 1)[0], n + Uint32Array.BYTES_PER_ELEMENT];
}
function mt6(t, n) {
  return [new Uint8Array(t, n, 1)[0], n + Uint8Array.BYTES_PER_ELEMENT];
}
async function I82(t) {
  let n = {}, h = {}, c3 = 0, i;
  while (c3 < t.size) {
    i = i ?? await t.arrayBuffer();
    let [g3, w7] = Jt6(i, c3);
    c3 = w7;
    let [I, E4] = mt6(i, c3);
    switch (c3 = E4, I) {
      case 1:
        let [j, $7] = qt6(i, c3);
        c3 = $7;
        try {
          n[g3] = JSON.parse(j);
        } catch (s) {
          console.error(`Error parsing JSON for key "${g3}":`, s);
        }
        break;
      case 2:
        let [Y, m4] = n82(i, c3);
        c3 = m4, h[g3] = Y;
        break;
    }
  }
  return { ...n, ...h };
}
async function t82(t) {
  let h = Math.ceil(t.size / 65536), c3 = await crypto.subtle.digest("SHA-256", new Uint8Array(0));
  for (let w7 = 0;w7 < h; w7++) {
    let E4 = await t.slice(w7 * 65536, (w7 + 1) * 65536).arrayBuffer(), j = await crypto.subtle.digest("SHA-256", E4), $7 = new Uint8Array(c3.byteLength + j.byteLength);
    $7.set(new Uint8Array(c3), 0), $7.set(new Uint8Array(j), c3.byteLength), c3 = await crypto.subtle.digest("SHA-256", $7.buffer);
  }
  return Array.from(new Uint8Array(c3)).map((w7) => w7.toString(16).padStart(2, "0")).join("");
}
async function tt6(t, n, h = t82) {
  if (typeof t === "string" && t.startsWith("blob:")) {
    let i = await fetch(t).then((w7) => w7.blob());
    URL.revokeObjectURL(t);
    let g3 = `{blobUrl:${await h(i)}}`;
    return n[g3] = i, g3;
  }
  if (typeof t === "object" && t instanceof Blob) {
    let i = `{blob:${await h(t)}}`;
    return n[i] = t, i;
  }
  let c3 = t;
  if (Array.isArray(t))
    await Promise.all(t.map(async (i, g3) => {
      let w7 = await tt6(i, n, h);
      if (w7 !== t[g3]) {
        if (t === c3)
          t = [...t];
        t[g3] = w7;
      }
    }));
  else if (typeof t === "object" && t)
    await Promise.all(Object.entries(t).map(async ([i, g3]) => {
      let w7 = await tt6(g3, n, h);
      if (w7 !== t[i]) {
        if (t === c3)
          t = { ...t };
        t[i] = w7;
      }
    }));
  return t;
}
function ht6(t, n) {
  if (typeof t === "string" && t.startsWith("{blobUrl:"))
    return URL.createObjectURL(n[t]);
  if (typeof t === "string" && t.startsWith("{blob:"))
    return n[t];
  let h = t;
  if (Array.isArray(t))
    t.forEach((c3, i) => {
      let g3 = ht6(c3, n);
      if (g3 !== c3) {
        if (t === h)
          t = [...t];
        t[i] = g3;
      }
    });
  else if (typeof t === "object" && t)
    Object.entries(t).forEach(([c3, i]) => {
      let g3 = ht6(i, n);
      if (g3 !== i) {
        if (t === h)
          t = { ...t };
        t[c3] = g3;
      }
    });
  return t;
}
function packageUpdates5(updates, blobs, secret) {
  const blobBuilder = un6.payload("payload", { updates }, secret);
  const addedBlob = new Set;
  for (let key in blobs) {
    if (!addedBlob.has(key)) {
      blobBuilder.blob(key, blobs[key]);
      addedBlob.add(key);
    }
  }
  return blobBuilder.build();
}
async function receiveBlob5(blob) {
  const { payload, ...blobs } = await I82(blob);
  return { payload, blobs };
}
var zJ3 = Object.create;
var { defineProperty: Q03, getPrototypeOf: QJ3, getOwnPropertyNames: ZJ3 } = Object;
var UJ3 = Object.prototype.hasOwnProperty;
var XJ3 = (J22, q22, _) => {
  _ = J22 != null ? zJ3(QJ3(J22)) : {};
  const z = q22 || !J22 || !J22.__esModule ? Q03(_, "default", { value: J22, enumerable: true }) : _;
  for (let Q22 of ZJ3(J22))
    if (!UJ3.call(z, Q22))
      Q03(z, Q22, { get: () => J22[Q22], enumerable: true });
  return z;
};
var T4 = (J22, q22) => () => (q22 || J22((q22 = { exports: {} }).exports, q22), q22.exports);
var F03 = T4((p3, G0) => {
  var p = function(J22) {
    throw { name: "SyntaxError", message: J22, at: M1, text: w1 };
  }, x = function(J22) {
    if (J22 && J22 !== R22)
      p("Expected '" + J22 + "' instead of '" + R22 + "'");
    return R22 = w1.charAt(M1), M1 += 1, R22;
  }, U0 = function() {
    var J22, q22 = "";
    if (R22 === "-")
      q22 = "-", x("-");
    while (R22 >= "0" && R22 <= "9")
      q22 += R22, x();
    if (R22 === ".") {
      q22 += ".";
      while (x() && R22 >= "0" && R22 <= "9")
        q22 += R22;
    }
    if (R22 === "e" || R22 === "E") {
      if (q22 += R22, x(), R22 === "-" || R22 === "+")
        q22 += R22, x();
      while (R22 >= "0" && R22 <= "9")
        q22 += R22, x();
    }
    if (J22 = Number(q22), !isFinite(J22))
      p("Bad number");
    return J22;
  }, X0 = function() {
    var J22, q22, _ = "", z;
    if (R22 === '"')
      while (x())
        if (R22 === '"')
          return x(), _;
        else if (R22 === "\\")
          if (x(), R22 === "u") {
            z = 0;
            for (q22 = 0;q22 < 4; q22 += 1) {
              if (J22 = parseInt(x(), 16), !isFinite(J22))
                break;
              z = z * 16 + J22;
            }
            _ += String.fromCharCode(z);
          } else if (typeof Z0[R22] === "string")
            _ += Z0[R22];
          else
            break;
        else
          _ += R22;
    p("Bad string");
  }, y22 = function() {
    while (R22 && R22 <= " ")
      x();
  }, GJ = function() {
    switch (R22) {
      case "t":
        return x("t"), x("r"), x("u"), x("e"), true;
      case "f":
        return x("f"), x("a"), x("l"), x("s"), x("e"), false;
      case "n":
        return x("n"), x("u"), x("l"), x("l"), null;
      default:
        p("Unexpected '" + R22 + "'");
    }
  }, FJ = function() {
    var J22 = [];
    if (R22 === "[") {
      if (x("["), y22(), R22 === "]")
        return x("]"), J22;
      while (R22) {
        if (J22.push(D1()), y22(), R22 === "]")
          return x("]"), J22;
        x(","), y22();
      }
    }
    p("Bad array");
  }, BJ = function() {
    var J22, q22 = {};
    if (R22 === "{") {
      if (x("{"), y22(), R22 === "}")
        return x("}"), q22;
      while (R22) {
        if (J22 = X0(), y22(), x(":"), Object.prototype.hasOwnProperty.call(q22, J22))
          p('Duplicate key "' + J22 + '"');
        if (q22[J22] = D1(), y22(), R22 === "}")
          return x("}"), q22;
        x(","), y22();
      }
    }
    p("Bad object");
  }, D1 = function() {
    switch (y22(), R22) {
      case "{":
        return BJ();
      case "[":
        return FJ();
      case '"':
        return X0();
      case "-":
        return U0();
      default:
        return R22 >= "0" && R22 <= "9" ? U0() : GJ();
    }
  }, M1, R22, Z0 = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, w1;
  G0.exports = function(J22, q22) {
    var _;
    if (w1 = J22, M1 = 0, R22 = " ", _ = D1(), y22(), R22)
      p("Syntax error");
    return typeof q22 === "function" ? function z(Q22, Z) {
      var G, V, U = Q22[Z];
      if (U && typeof U === "object") {
        for (G in D1)
          if (Object.prototype.hasOwnProperty.call(U, G))
            if (V = z(U, G), typeof V === "undefined")
              delete U[G];
            else
              U[G] = V;
      }
      return q22.call(Q22, Z, U);
    }({ "": _ }, "") : _;
  };
});
var V03 = T4((c3, B0) => {
  var m1 = function(J22) {
    return y1.lastIndex = 0, y1.test(J22) ? '"' + J22.replace(y1, function(q22) {
      var _ = VJ[q22];
      return typeof _ === "string" ? _ : "\\u" + ("0000" + q22.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + J22 + '"';
  }, O1 = function(J22, q22) {
    var _, z, Q22, Z, G = b5, V, U = q22[J22];
    if (U && typeof U === "object" && typeof U.toJSON === "function")
      U = U.toJSON(J22);
    if (typeof u === "function")
      U = u.call(q22, J22, U);
    switch (typeof U) {
      case "string":
        return m1(U);
      case "number":
        return isFinite(U) ? String(U) : "null";
      case "boolean":
      case "null":
        return String(U);
      case "object":
        if (!U)
          return "null";
        if (b5 += R1, V = [], Object.prototype.toString.apply(U) === "[object Array]") {
          Z = U.length;
          for (_ = 0;_ < Z; _ += 1)
            V[_] = O1(_, U) || "null";
          return Q22 = V.length === 0 ? "[]" : b5 ? `[
` + b5 + V.join(`,
` + b5) + `
` + G + "]" : "[" + V.join(",") + "]", b5 = G, Q22;
        }
        if (u && typeof u === "object") {
          Z = u.length;
          for (_ = 0;_ < Z; _ += 1)
            if (z = u[_], typeof z === "string") {
              if (Q22 = O1(z, U), Q22)
                V.push(m1(z) + (b5 ? ": " : ":") + Q22);
            }
        } else
          for (z in U)
            if (Object.prototype.hasOwnProperty.call(U, z)) {
              if (Q22 = O1(z, U), Q22)
                V.push(m1(z) + (b5 ? ": " : ":") + Q22);
            }
        return Q22 = V.length === 0 ? "{}" : b5 ? `{
` + b5 + V.join(`,
` + b5) + `
` + G + "}" : "{" + V.join(",") + "}", b5 = G, Q22;
      default:
    }
  }, y1 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b5, R1, VJ = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, u;
  B0.exports = function(J22, q22, _) {
    var z;
    if (b5 = "", R1 = "", typeof _ === "number")
      for (z = 0;z < _; z += 1)
        R1 += " ";
    else if (typeof _ === "string")
      R1 = _;
    if (u = q22, q22 && typeof q22 !== "function" && (typeof q22 !== "object" || typeof q22.length !== "number"))
      throw new Error("JSON.stringify");
    return O1("", { "": J22 });
  };
});
var K03 = T4((KJ) => {
  KJ.parse = F03();
  KJ.stringify = V03();
});
var L03 = T4((h3, H0) => {
  var WJ = {}.toString;
  H0.exports = Array.isArray || function(J22) {
    return WJ.call(J22) == "[object Array]";
  };
});
var g13 = T4((Y3, M0) => {
  var W0 = Object.prototype.toString;
  M0.exports = function J(q22) {
    var _ = W0.call(q22), z = _ === "[object Arguments]";
    if (!z)
      z = _ !== "[object Array]" && q22 !== null && typeof q22 === "object" && typeof q22.length === "number" && q22.length >= 0 && W0.call(q22.callee) === "[object Function]";
    return z;
  };
});
var j03 = T4((d3, N0) => {
  var T0;
  if (!Object.keys)
    z1 = Object.prototype.hasOwnProperty, p1 = Object.prototype.toString, D0 = g13(), c1 = Object.prototype.propertyIsEnumerable, R0 = !c1.call({ toString: null }, "toString"), O0 = c1.call(function() {}, "prototype"), Q1 = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], A1 = function(J22) {
      var q22 = J22.constructor;
      return q22 && q22.prototype === J22;
    }, A0 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, C0 = function() {
      if (typeof window === "undefined")
        return false;
      for (var J22 in window)
        try {
          if (!A0["$" + J22] && z1.call(window, J22) && window[J22] !== null && typeof window[J22] === "object")
            try {
              A1(window[J22]);
            } catch (q22) {
              return true;
            }
        } catch (q22) {
          return true;
        }
      return false;
    }(), x0 = function(J22) {
      if (typeof window === "undefined" || !C0)
        return A1(J22);
      try {
        return A1(J22);
      } catch (q22) {
        return false;
      }
    }, T0 = function J(q22) {
      var _ = q22 !== null && typeof q22 === "object", z = p1.call(q22) === "[object Function]", Q22 = D0(q22), Z = _ && p1.call(q22) === "[object String]", G = [];
      if (!_ && !z && !Q22)
        throw new TypeError("Object.keys called on a non-object");
      var V = O0 && z;
      if (Z && q22.length > 0 && !z1.call(q22, 0))
        for (var U = 0;U < q22.length; ++U)
          G.push(String(U));
      if (Q22 && q22.length > 0)
        for (var K4 = 0;K4 < q22.length; ++K4)
          G.push(String(K4));
      else
        for (var H in q22)
          if (!(V && H === "prototype") && z1.call(q22, H))
            G.push(String(H));
      if (R0) {
        var F22 = x0(q22);
        for (var B22 = 0;B22 < Q1.length; ++B22)
          if (!(F22 && Q1[B22] === "constructor") && z1.call(q22, Q1[B22]))
            G.push(Q1[B22]);
      }
      return G;
    };
  var z1, p1, D0, c1, R0, O0, Q1, A1, A0, C0, x0;
  N0.exports = T0;
});
var S03 = T4((l3, v0) => {
  var MJ = Array.prototype.slice, DJ = g13(), k0 = Object.keys, C1 = k0 ? function J(q22) {
    return k0(q22);
  } : j03(), I0 = Object.keys;
  C1.shim = function J() {
    if (Object.keys) {
      var q22 = function() {
        var _ = Object.keys(arguments);
        return _ && _.length === arguments.length;
      }(1, 2);
      if (!q22)
        Object.keys = function _(z) {
          if (DJ(z))
            return I0(MJ.call(z));
          return I0(z);
        };
    } else
      Object.keys = C1;
    return Object.keys || C1;
  };
  v0.exports = C1;
});
var b03 = T4((o3, P0) => {
  var RJ = "Function.prototype.bind called on incompatible ", OJ = Object.prototype.toString, AJ = Math.max, CJ = "[object Function]", $0 = function J(q22, _) {
    var z = [];
    for (var Q22 = 0;Q22 < q22.length; Q22 += 1)
      z[Q22] = q22[Q22];
    for (var Z = 0;Z < _.length; Z += 1)
      z[Z + q22.length] = _[Z];
    return z;
  }, xJ = function J(q22, _) {
    var z = [];
    for (var Q22 = _ || 0, Z = 0;Q22 < q22.length; Q22 += 1, Z += 1)
      z[Z] = q22[Q22];
    return z;
  }, TJ = function(J22, q22) {
    var _ = "";
    for (var z = 0;z < J22.length; z += 1)
      if (_ += J22[z], z + 1 < J22.length)
        _ += q22;
    return _;
  };
  P0.exports = function J(q22) {
    var _ = this;
    if (typeof _ !== "function" || OJ.apply(_) !== CJ)
      throw new TypeError(RJ + _);
    var z = xJ(arguments, 1), Q22, Z = function() {
      if (this instanceof Q22) {
        var H = _.apply(this, $0(z, arguments));
        if (Object(H) === H)
          return H;
        return this;
      }
      return _.apply(q22, $0(z, arguments));
    }, G = AJ(0, _.length - z.length), V = [];
    for (var U = 0;U < G; U++)
      V[U] = "$" + U;
    if (Q22 = Function("binder", "return function (" + TJ(V, ",") + "){ return binder.apply(this,arguments); }")(Z), _.prototype) {
      var K4 = function H() {};
      K4.prototype = _.prototype, Q22.prototype = new K4, K4.prototype = null;
    }
    return Q22;
  };
});
var Z13 = T4((a3, E0) => {
  var NJ = b03();
  E0.exports = Function.prototype.bind || NJ;
});
var w03 = T4((s3, f0) => {
  f0.exports = Error;
});
var m03 = T4((i3, y0) => {
  y0.exports = EvalError;
});
var p03 = T4((r3, g0) => {
  g0.exports = RangeError;
});
var u03 = T4((t3, c0) => {
  c0.exports = ReferenceError;
});
var u13 = T4((n3, h0) => {
  h0.exports = SyntaxError;
});
var U13 = T4((e3, Y0) => {
  Y0.exports = TypeError;
});
var l03 = T4((q5, d0) => {
  d0.exports = URIError;
});
var a03 = T4((J5, o0) => {
  o0.exports = function J() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var q22 = {}, _ = Symbol("test"), z = Object(_);
    if (typeof _ === "string")
      return false;
    if (Object.prototype.toString.call(_) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(z) !== "[object Symbol]")
      return false;
    var Q22 = 42;
    q22[_] = Q22;
    for (_ in q22)
      return false;
    if (typeof Object.keys === "function" && Object.keys(q22).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(q22).length !== 0)
      return false;
    var Z = Object.getOwnPropertySymbols(q22);
    if (Z.length !== 1 || Z[0] !== _)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(q22, _))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var G = Object.getOwnPropertyDescriptor(q22, _);
      if (G.value !== Q22 || G.enumerable !== true)
        return false;
    }
    return true;
  };
});
var h13 = T4((_5, i0) => {
  var s0 = typeof Symbol !== "undefined" && Symbol, jJ = a03();
  i0.exports = function J() {
    if (typeof s0 !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof s0("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return jJ();
  };
});
var Y13 = T4((z5, t0) => {
  var r0 = { foo: {} }, kJ = Object;
  t0.exports = function J() {
    return { __proto__: r0 }.foo === r0.foo && !({ __proto__: null } instanceof kJ);
  };
});
var d13 = T4((Q5, n0) => {
  var IJ = Function.prototype.call, vJ = Object.prototype.hasOwnProperty, SJ = Z13();
  n0.exports = SJ.call(IJ, vJ);
});
var G13 = T4((Z5, zq) => {
  var A22, $J = w03(), PJ = m03(), bJ = p03(), EJ = u03(), i = u13(), s = U13(), fJ = l03(), _q = Function, l1 = function(J22) {
    try {
      return _q('"use strict"; return (' + J22 + ").constructor;")();
    } catch (q22) {}
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch (J22) {
      h = null;
    }
  var o1 = function() {
    throw new s;
  }, wJ = h ? function() {
    try {
      return arguments.callee, o1;
    } catch (J22) {
      try {
        return h(arguments, "callee").get;
      } catch (q22) {
        return o1;
      }
    }
  }() : o1, o = h13()(), yJ = Y13()(), k = Object.getPrototypeOf || (yJ ? function(J22) {
    return J22.__proto__;
  } : null), a = {}, mJ = typeof Uint8Array === "undefined" || !k ? A22 : k(Uint8Array), Y = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? A22 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? A22 : ArrayBuffer, "%ArrayIteratorPrototype%": o && k ? k([][Symbol.iterator]()) : A22, "%AsyncFromSyncIteratorPrototype%": A22, "%AsyncFunction%": a, "%AsyncGenerator%": a, "%AsyncGeneratorFunction%": a, "%AsyncIteratorPrototype%": a, "%Atomics%": typeof Atomics === "undefined" ? A22 : Atomics, "%BigInt%": typeof BigInt === "undefined" ? A22 : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? A22 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? A22 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? A22 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": $J, "%eval%": eval, "%EvalError%": PJ, "%Float32Array%": typeof Float32Array === "undefined" ? A22 : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? A22 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? A22 : FinalizationRegistry, "%Function%": _q, "%GeneratorFunction%": a, "%Int8Array%": typeof Int8Array === "undefined" ? A22 : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? A22 : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? A22 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": o && k ? k(k([][Symbol.iterator]())) : A22, "%JSON%": typeof JSON === "object" ? JSON : A22, "%Map%": typeof Map === "undefined" ? A22 : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !o || !k ? A22 : k(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? A22 : Promise, "%Proxy%": typeof Proxy === "undefined" ? A22 : Proxy, "%RangeError%": bJ, "%ReferenceError%": EJ, "%Reflect%": typeof Reflect === "undefined" ? A22 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? A22 : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !o || !k ? A22 : k(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? A22 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": o && k ? k(""[Symbol.iterator]()) : A22, "%Symbol%": o ? Symbol : A22, "%SyntaxError%": i, "%ThrowTypeError%": wJ, "%TypedArray%": mJ, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? A22 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? A22 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? A22 : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? A22 : Uint32Array, "%URIError%": fJ, "%WeakMap%": typeof WeakMap === "undefined" ? A22 : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? A22 : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? A22 : WeakSet };
  if (k)
    try {
      null.error;
    } catch (J22) {
      e0 = k(k(J22)), Y["%Error.prototype%"] = e0;
    }
  var e0, gJ = function J(q22) {
    var _;
    if (q22 === "%AsyncFunction%")
      _ = l1("async function () {}");
    else if (q22 === "%GeneratorFunction%")
      _ = l1("function* () {}");
    else if (q22 === "%AsyncGeneratorFunction%")
      _ = l1("async function* () {}");
    else if (q22 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q22 === "%AsyncIteratorPrototype%") {
      var Q22 = J("%AsyncGenerator%");
      if (Q22 && k)
        _ = k(Q22.prototype);
    }
    return Y[q22] = _, _;
  }, qq = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, X1 = Z13(), x1 = d13(), pJ = X1.call(Function.call, Array.prototype.concat), cJ = X1.call(Function.apply, Array.prototype.splice), Jq = X1.call(Function.call, String.prototype.replace), T1 = X1.call(Function.call, String.prototype.slice), uJ = X1.call(Function.call, RegExp.prototype.exec), hJ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, YJ = /\\(\\)?/g, dJ = function J(q22) {
    var _ = T1(q22, 0, 1), z = T1(q22, -1);
    if (_ === "%" && z !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var Q22 = [];
    return Jq(q22, hJ, function(Z, G, V, U) {
      Q22[Q22.length] = V ? Jq(U, YJ, "$1") : G || Z;
    }), Q22;
  }, lJ = function J(q22, _) {
    var z = q22, Q22;
    if (x1(qq, z))
      Q22 = qq[z], z = "%" + Q22[0] + "%";
    if (x1(Y, z)) {
      var Z = Y[z];
      if (Z === a)
        Z = gJ(z);
      if (typeof Z === "undefined" && !_)
        throw new s("intrinsic " + q22 + " exists, but is not available. Please file an issue!");
      return { alias: Q22, name: z, value: Z };
    }
    throw new i("intrinsic " + q22 + " does not exist!");
  };
  zq.exports = function J(q22, _) {
    if (typeof q22 !== "string" || q22.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (uJ(/^%?[^%]*%?$/, q22) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = dJ(q22), Q22 = z.length > 0 ? z[0] : "", Z = lJ("%" + Q22 + "%", _), G = Z.name, V = Z.value, U = false, K4 = Z.alias;
    if (K4)
      Q22 = K4[0], cJ(z, pJ([0, 1], K4));
    for (var H = 1, F22 = true;H < z.length; H += 1) {
      var B22 = z[H], W = T1(B22, 0, 1), L = T1(B22, -1);
      if ((W === '"' || W === "'" || W === "`" || (L === '"' || L === "'" || L === "`")) && W !== L)
        throw new i("property names with quotes must have matching quotes");
      if (B22 === "constructor" || !F22)
        U = true;
      if (Q22 += "." + B22, G = "%" + Q22 + "%", x1(Y, G))
        V = Y[G];
      else if (V != null) {
        if (!(B22 in V)) {
          if (!_)
            throw new s("base intrinsic for " + q22 + " exists, but the property is not available.");
          return;
        }
        if (h && H + 1 >= z.length) {
          var D = h(V, B22);
          if (F22 = !!D, F22 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B22];
        } else
          F22 = x1(V, B22), V = V[B22];
        if (F22 && !U)
          Y[G] = V;
      }
    }
    return V;
  };
});
var j13 = T4((U5, Qq) => {
  var oJ = G13(), N1 = oJ("%Object.defineProperty%", true) || false;
  if (N1)
    try {
      N1({}, "a", { value: 1 });
    } catch (J22) {
      N1 = false;
    }
  Qq.exports = N1;
});
var Bq3 = T4((X5, Fq) => {
  var C, e = SyntaxError, Gq = Function, n = TypeError, a1 = function(J22) {
    try {
      return Gq('"use strict"; return (' + J22 + ").constructor;")();
    } catch (q22) {}
  }, d = Object.getOwnPropertyDescriptor;
  if (d)
    try {
      d({}, "");
    } catch (J22) {
      d = null;
    }
  var s1 = function() {
    throw new n;
  }, aJ = d ? function() {
    try {
      return arguments.callee, s1;
    } catch (J22) {
      try {
        return d(arguments, "callee").get;
      } catch (q22) {
        return s1;
      }
    }
  }() : s1, r = h13()(), sJ = Y13()(), I = Object.getPrototypeOf || (sJ ? function(J22) {
    return J22.__proto__;
  } : null), t = {}, iJ = typeof Uint8Array === "undefined" || !I ? C : I(Uint8Array), l = { "%AggregateError%": typeof AggregateError === "undefined" ? C : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? C : ArrayBuffer, "%ArrayIteratorPrototype%": r && I ? I([][Symbol.iterator]()) : C, "%AsyncFromSyncIteratorPrototype%": C, "%AsyncFunction%": t, "%AsyncGenerator%": t, "%AsyncGeneratorFunction%": t, "%AsyncIteratorPrototype%": t, "%Atomics%": typeof Atomics === "undefined" ? C : Atomics, "%BigInt%": typeof BigInt === "undefined" ? C : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? C : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? C : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? C : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? C : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? C : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? C : FinalizationRegistry, "%Function%": Gq, "%GeneratorFunction%": t, "%Int8Array%": typeof Int8Array === "undefined" ? C : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? C : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? C : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": r && I ? I(I([][Symbol.iterator]())) : C, "%JSON%": typeof JSON === "object" ? JSON : C, "%Map%": typeof Map === "undefined" ? C : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !r || !I ? C : I(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? C : Promise, "%Proxy%": typeof Proxy === "undefined" ? C : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? C : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? C : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !r || !I ? C : I(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? C : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": r && I ? I(""[Symbol.iterator]()) : C, "%Symbol%": r ? Symbol : C, "%SyntaxError%": e, "%ThrowTypeError%": aJ, "%TypedArray%": iJ, "%TypeError%": n, "%Uint8Array%": typeof Uint8Array === "undefined" ? C : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? C : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? C : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? C : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? C : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? C : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? C : WeakSet };
  if (I)
    try {
      null.error;
    } catch (J22) {
      Zq = I(I(J22)), l["%Error.prototype%"] = Zq;
    }
  var Zq, rJ = function J(q22) {
    var _;
    if (q22 === "%AsyncFunction%")
      _ = a1("async function () {}");
    else if (q22 === "%GeneratorFunction%")
      _ = a1("function* () {}");
    else if (q22 === "%AsyncGeneratorFunction%")
      _ = a1("async function* () {}");
    else if (q22 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q22 === "%AsyncIteratorPrototype%") {
      var Q22 = J("%AsyncGenerator%");
      if (Q22 && I)
        _ = I(Q22.prototype);
    }
    return l[q22] = _, _;
  }, Uq = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, F1 = Z13(), k1 = d13(), tJ = F1.call(Function.call, Array.prototype.concat), nJ = F1.call(Function.apply, Array.prototype.splice), Xq = F1.call(Function.call, String.prototype.replace), I1 = F1.call(Function.call, String.prototype.slice), eJ = F1.call(Function.call, RegExp.prototype.exec), q32 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, J3 = /\\(\\)?/g, _3 = function J(q22) {
    var _ = I1(q22, 0, 1), z = I1(q22, -1);
    if (_ === "%" && z !== "%")
      throw new e("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new e("invalid intrinsic syntax, expected opening `%`");
    var Q22 = [];
    return Xq(q22, q32, function(Z, G, V, U) {
      Q22[Q22.length] = V ? Xq(U, J3, "$1") : G || Z;
    }), Q22;
  }, z3 = function J(q22, _) {
    var z = q22, Q22;
    if (k1(Uq, z))
      Q22 = Uq[z], z = "%" + Q22[0] + "%";
    if (k1(l, z)) {
      var Z = l[z];
      if (Z === t)
        Z = rJ(z);
      if (typeof Z === "undefined" && !_)
        throw new n("intrinsic " + q22 + " exists, but is not available. Please file an issue!");
      return { alias: Q22, name: z, value: Z };
    }
    throw new e("intrinsic " + q22 + " does not exist!");
  };
  Fq.exports = function J(q22, _) {
    if (typeof q22 !== "string" || q22.length === 0)
      throw new n("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new n('"allowMissing" argument must be a boolean');
    if (eJ(/^%?[^%]*%?$/, q22) === null)
      throw new e("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = _3(q22), Q22 = z.length > 0 ? z[0] : "", Z = z3("%" + Q22 + "%", _), G = Z.name, V = Z.value, U = false, K4 = Z.alias;
    if (K4)
      Q22 = K4[0], nJ(z, tJ([0, 1], K4));
    for (var H = 1, F22 = true;H < z.length; H += 1) {
      var B22 = z[H], W = I1(B22, 0, 1), L = I1(B22, -1);
      if ((W === '"' || W === "'" || W === "`" || (L === '"' || L === "'" || L === "`")) && W !== L)
        throw new e("property names with quotes must have matching quotes");
      if (B22 === "constructor" || !F22)
        U = true;
      if (Q22 += "." + B22, G = "%" + Q22 + "%", k1(l, G))
        V = l[G];
      else if (V != null) {
        if (!(B22 in V)) {
          if (!_)
            throw new n("base intrinsic for " + q22 + " exists, but the property is not available.");
          return;
        }
        if (d && H + 1 >= z.length) {
          var D = d(V, B22);
          if (F22 = !!D, F22 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B22];
        } else
          F22 = k1(V, B22), V = V[B22];
        if (F22 && !U)
          l[G] = V;
      }
    }
    return V;
  };
});
var i13 = T4((G5, Vq) => {
  var Q32 = Bq3(), v1 = Q32("%Object.getOwnPropertyDescriptor%", true);
  if (v1)
    try {
      v1([], "length");
    } catch (J22) {
      v1 = null;
    }
  Vq.exports = v1;
});
var Wq3 = T4((F5, Lq) => {
  var Kq = j13(), Z3 = u13(), q1 = U13(), Hq = i13();
  Lq.exports = function J(q22, _, z) {
    if (!q22 || typeof q22 !== "object" && typeof q22 !== "function")
      throw new q1("`obj` must be an object or a function`");
    if (typeof _ !== "string" && typeof _ !== "symbol")
      throw new q1("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new q1("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new q1("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new q1("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new q1("`loose`, if provided, must be a boolean");
    var Q22 = arguments.length > 3 ? arguments[3] : null, Z = arguments.length > 4 ? arguments[4] : null, G = arguments.length > 5 ? arguments[5] : null, V = arguments.length > 6 ? arguments[6] : false, U = !!Hq && Hq(q22, _);
    if (Kq)
      Kq(q22, _, { configurable: G === null && U ? U.configurable : !G, enumerable: Q22 === null && U ? U.enumerable : !Q22, value: z, writable: Z === null && U ? U.writable : !Z });
    else if (V || !Q22 && !Z && !G)
      q22[_] = z;
    else
      throw new Z3("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Rq3 = T4((B5, Dq) => {
  var r1 = j13(), Mq = function J() {
    return !!r1;
  };
  Mq.hasArrayLengthDefineBug = function J() {
    if (!r1)
      return null;
    try {
      return r1([], "length", { value: 1 }).length !== 1;
    } catch (q22) {
      return true;
    }
  };
  Dq.exports = Mq;
});
var Tq3 = T4((V5, xq) => {
  var U3 = G13(), Oq = Wq3(), X3 = Rq3()(), Aq = i13(), Cq = U13(), G3 = U3("%Math.floor%");
  xq.exports = function J(q22, _) {
    if (typeof q22 !== "function")
      throw new Cq("`fn` is not a function");
    if (typeof _ !== "number" || _ < 0 || _ > 4294967295 || G3(_) !== _)
      throw new Cq("`length` must be a positive 32-bit integer");
    var z = arguments.length > 2 && !!arguments[2], Q22 = true, Z = true;
    if ("length" in q22 && Aq) {
      var G = Aq(q22, "length");
      if (G && !G.configurable)
        Q22 = false;
      if (G && !G.writable)
        Z = false;
    }
    if (Q22 || Z || !z)
      if (X3)
        Oq(q22, "length", _, true, true);
      else
        Oq(q22, "length", _);
    return q22;
  };
});
var n13 = T4((K5, S1) => {
  var t1 = Z13(), $1 = G13(), F32 = Tq3(), B32 = U13(), kq = $1("%Function.prototype.apply%"), Iq = $1("%Function.prototype.call%"), vq = $1("%Reflect.apply%", true) || t1.call(Iq, kq), Nq = j13(), V3 = $1("%Math.max%");
  S1.exports = function J(q22) {
    if (typeof q22 !== "function")
      throw new B32("a function is required");
    var _ = vq(t1, Iq, arguments);
    return F32(_, 1 + V3(0, q22.length - (arguments.length - 1)), true);
  };
  var jq = function J() {
    return vq(t1, kq, arguments);
  };
  if (Nq)
    Nq(S1.exports, "apply", { value: jq });
  else
    S1.exports.apply = jq;
});
var bq3 = T4((H5, Pq) => {
  var Sq = G13(), $q = n13(), K32 = $q(Sq("String.prototype.indexOf"));
  Pq.exports = function J(q22, _) {
    var z = Sq(q22, !!_);
    if (typeof z === "function" && K32(q22, ".prototype.") > -1)
      return $q(z);
    return z;
  };
});
var mq3 = T4((L5, yq) => {
  var P1 = (typeof JSON !== "undefined" ? JSON : K03()).stringify, H3 = L03(), L3 = S03(), W3 = n13(), wq = bq3(), Eq = wq("Array.prototype.join"), e1 = wq("Array.prototype.push"), fq = function J(q22, _) {
    var z = "";
    for (var Q22 = 0;Q22 < q22; Q22 += 1)
      z += _;
    return z;
  }, M3 = function(J22, q22, _) {
    return _;
  };
  yq.exports = function J(q22) {
    var _ = arguments.length > 1 ? arguments[1] : undefined, z = _ && _.space || "";
    if (typeof z === "number")
      z = fq(z, " ");
    var Q22 = !!_ && typeof _.cycles === "boolean" && _.cycles, Z = _ && _.replacer ? W3(_.replacer) : M3, G = typeof _ === "function" ? _ : _ && _.cmp, V = G && function(K4) {
      var H = G.length > 2 && function F(B22) {
        return K4[B22];
      };
      return function(F22, B22) {
        return G({ key: F22, value: K4[F22] }, { key: B22, value: K4[B22] }, H ? { __proto__: null, get: H } : undefined);
      };
    }, U = [];
    return function K(H, F22, B22, W) {
      var L = z ? `
` + fq(W, z) : "", D = z ? ": " : ":";
      if (B22 && B22.toJSON && typeof B22.toJSON === "function")
        B22 = B22.toJSON();
      if (B22 = Z(H, F22, B22), B22 === undefined)
        return;
      if (typeof B22 !== "object" || B22 === null)
        return P1(B22);
      if (H3(B22)) {
        var S = [];
        for (var O = 0;O < B22.length; O++) {
          var v = K(B22, O, B22[O], W + 1) || P1(null);
          e1(S, L + z + v);
        }
        return "[" + Eq(S, ",") + L + "]";
      }
      if (U.indexOf(B22) !== -1) {
        if (Q22)
          return P1("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        e1(U, B22);
      var N22 = L3(B22).sort(V && V(B22)), S = [];
      for (var O = 0;O < N22.length; O++) {
        var F22 = N22[O], j = K(B22, F22, B22[F22], W + 1);
        if (!j)
          continue;
        var P = P1(F22) + D + j;
        e1(S, L + z + P);
      }
      return U.splice(U.indexOf(B22), 1), "{" + Eq(S, ",") + L + "}";
    }({ "": q22 }, "", q22, 0);
  };
});
var z03 = XJ3(mq3(), 1);
var gq3 = function(J22, q22, _, z) {
  let Q22, Z, G;
  const V = q22 || [0], U = (_ = _ || 0) >>> 3, K4 = z === -1 ? 3 : 0;
  for (Q22 = 0;Q22 < J22.length; Q22 += 1)
    G = Q22 + U, Z = G >>> 2, V.length <= Z && V.push(0), V[Z] |= J22[Q22] << 8 * (K4 + z * (G % 4));
  return { value: V, binLen: 8 * J22.length + _ };
};
var _13 = function(J22, q22, _) {
  switch (q22) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (J22) {
    case "HEX":
      return function(z, Q22, Z) {
        return function(G, V, U, K4) {
          let H, F22, B22, W;
          if (G.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          const L = V || [0], D = (U = U || 0) >>> 3, O = K4 === -1 ? 3 : 0;
          for (H = 0;H < G.length; H += 2) {
            if (F22 = parseInt(G.substr(H, 2), 16), isNaN(F22))
              throw new Error("String of HEX type contains invalid characters");
            for (W = (H >>> 1) + D, B22 = W >>> 2;L.length <= B22; )
              L.push(0);
            L[B22] |= F22 << 8 * (O + K4 * (W % 4));
          }
          return { value: L, binLen: 4 * G.length + U };
        }(z, Q22, Z, _);
      };
    case "TEXT":
      return function(z, Q22, Z) {
        return function(G, V, U, K4, H) {
          let F22, B22, W, L, D, O, v, N22, S = 0;
          const j = U || [0], P = (K4 = K4 || 0) >>> 3;
          if (V === "UTF8")
            for (v = H === -1 ? 3 : 0, W = 0;W < G.length; W += 1)
              for (F22 = G.charCodeAt(W), B22 = [], 128 > F22 ? B22.push(F22) : 2048 > F22 ? (B22.push(192 | F22 >>> 6), B22.push(128 | 63 & F22)) : 55296 > F22 || 57344 <= F22 ? B22.push(224 | F22 >>> 12, 128 | F22 >>> 6 & 63, 128 | 63 & F22) : (W += 1, F22 = 65536 + ((1023 & F22) << 10 | 1023 & G.charCodeAt(W)), B22.push(240 | F22 >>> 18, 128 | F22 >>> 12 & 63, 128 | F22 >>> 6 & 63, 128 | 63 & F22)), L = 0;L < B22.length; L += 1) {
                for (O = S + P, D = O >>> 2;j.length <= D; )
                  j.push(0);
                j[D] |= B22[L] << 8 * (v + H * (O % 4)), S += 1;
              }
          else
            for (v = H === -1 ? 2 : 0, N22 = V === "UTF16LE" && H !== 1 || V !== "UTF16LE" && H === 1, W = 0;W < G.length; W += 1) {
              for (F22 = G.charCodeAt(W), N22 === true && (L = 255 & F22, F22 = L << 8 | F22 >>> 8), O = S + P, D = O >>> 2;j.length <= D; )
                j.push(0);
              j[D] |= F22 << 8 * (v + H * (O % 4)), S += 2;
            }
          return { value: j, binLen: 8 * S + K4 };
        }(z, q22, Q22, Z, _);
      };
    case "B64":
      return function(z, Q22, Z) {
        return function(G, V, U, K4) {
          let H, F22, B22, W, L, D, O, v = 0;
          const N22 = V || [0], S = (U = U || 0) >>> 3, j = K4 === -1 ? 3 : 0, P = G.indexOf("=");
          if (G.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (G = G.replace(/=/g, ""), P !== -1 && P < G.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (F22 = 0;F22 < G.length; F22 += 4) {
            for (L = G.substr(F22, 4), W = 0, B22 = 0;B22 < L.length; B22 += 1)
              H = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(L.charAt(B22)), W |= H << 18 - 6 * B22;
            for (B22 = 0;B22 < L.length - 1; B22 += 1) {
              for (O = v + S, D = O >>> 2;N22.length <= D; )
                N22.push(0);
              N22[D] |= (W >>> 16 - 8 * B22 & 255) << 8 * (j + K4 * (O % 4)), v += 1;
            }
          }
          return { value: N22, binLen: 8 * v + U };
        }(z, Q22, Z, _);
      };
    case "BYTES":
      return function(z, Q22, Z) {
        return function(G, V, U, K4) {
          let H, F22, B22, W;
          const L = V || [0], D = (U = U || 0) >>> 3, O = K4 === -1 ? 3 : 0;
          for (F22 = 0;F22 < G.length; F22 += 1)
            H = G.charCodeAt(F22), W = F22 + D, B22 = W >>> 2, L.length <= B22 && L.push(0), L[B22] |= H << 8 * (O + K4 * (W % 4));
          return { value: L, binLen: 8 * G.length + U };
        }(z, Q22, Z, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (z) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(z, Q22, Z) {
        return function(G, V, U, K4) {
          return gq3(new Uint8Array(G), V, U, K4);
        }(z, Q22, Z, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (z) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(z, Q22, Z) {
        return gq3(z, Q22, Z, _);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var pq3 = function(J22, q22, _, z) {
  switch (J22) {
    case "HEX":
      return function(Q22) {
        return function(Z, G, V, U) {
          let H, F22, B22 = "";
          const W = G / 8, L = V === -1 ? 3 : 0;
          for (H = 0;H < W; H += 1)
            F22 = Z[H >>> 2] >>> 8 * (L + V * (H % 4)), B22 += "0123456789abcdef".charAt(F22 >>> 4 & 15) + "0123456789abcdef".charAt(15 & F22);
          return U.outputUpper ? B22.toUpperCase() : B22;
        }(Q22, q22, _, z);
      };
    case "B64":
      return function(Q22) {
        return function(Z, G, V, U) {
          let K4, H, F22, B22, W, L = "";
          const D = G / 8, O = V === -1 ? 3 : 0;
          for (K4 = 0;K4 < D; K4 += 3)
            for (B22 = K4 + 1 < D ? Z[K4 + 1 >>> 2] : 0, W = K4 + 2 < D ? Z[K4 + 2 >>> 2] : 0, F22 = (Z[K4 >>> 2] >>> 8 * (O + V * (K4 % 4)) & 255) << 16 | (B22 >>> 8 * (O + V * ((K4 + 1) % 4)) & 255) << 8 | W >>> 8 * (O + V * ((K4 + 2) % 4)) & 255, H = 0;H < 4; H += 1)
              L += 8 * K4 + 6 * H <= G ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(F22 >>> 6 * (3 - H) & 63) : U.b64Pad;
          return L;
        }(Q22, q22, _, z);
      };
    case "BYTES":
      return function(Q22) {
        return function(Z, G, V) {
          let U, K4, H = "";
          const F22 = G / 8, B22 = V === -1 ? 3 : 0;
          for (U = 0;U < F22; U += 1)
            K4 = Z[U >>> 2] >>> 8 * (B22 + V * (U % 4)) & 255, H += String.fromCharCode(K4);
          return H;
        }(Q22, q22, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (Q22) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(Q22) {
        return function(Z, G, V) {
          let U;
          const K4 = G / 8, H = new ArrayBuffer(K4), F22 = new Uint8Array(H), B22 = V === -1 ? 3 : 0;
          for (U = 0;U < K4; U += 1)
            F22[U] = Z[U >>> 2] >>> 8 * (B22 + V * (U % 4)) & 255;
          return H;
        }(Q22, q22, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (Q22) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(Q22) {
        return function(Z, G, V) {
          let U;
          const K4 = G / 8, H = V === -1 ? 3 : 0, F22 = new Uint8Array(K4);
          for (U = 0;U < K4; U += 1)
            F22[U] = Z[U >>> 2] >>> 8 * (H + V * (U % 4)) & 255;
          return F22;
        }(Q22, q22, _);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var E13 = function(J22, q22) {
  let _, z;
  const Q22 = J22.binLen >>> 3, Z = q22.binLen >>> 3, G = Q22 << 3, V = 4 - Q22 << 3;
  if (Q22 % 4 != 0) {
    for (_ = 0;_ < Z; _ += 4)
      z = Q22 + _ >>> 2, J22.value[z] |= q22.value[_ >>> 2] << G, J22.value.push(0), J22.value[z + 1] |= q22.value[_ >>> 2] >>> V;
    return (J22.value.length << 2) - 4 >= Z + Q22 && J22.value.pop(), { value: J22.value, binLen: J22.binLen + q22.binLen };
  }
  return { value: J22.value.concat(q22.value), binLen: J22.binLen + q22.binLen };
};
var cq3 = function(J22) {
  const q22 = { outputUpper: false, b64Pad: "=", outputLen: -1 }, _ = J22 || {};
  if (q22.outputUpper = _.outputUpper || false, _.b64Pad && (q22.b64Pad = _.b64Pad), _.outputLen) {
    if (_.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q22.outputLen = _.outputLen;
  } else if (_.shakeLen) {
    if (_.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q22.outputLen = _.shakeLen;
  }
  if (typeof q22.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof q22.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return q22;
};
var c3 = function(J22, q22, _, z) {
  const Q22 = J22 + " must include a value and format";
  if (!q22) {
    if (!z)
      throw new Error(Q22);
    return z;
  }
  if (q22.value === undefined || !q22.format)
    throw new Error(Q22);
  return _13(q22.format, q22.encoding || "UTF8", _)(q22.value);
};
var J13 = function(J22, q22) {
  return J22 << q22 | J22 >>> 32 - q22;
};
var f4 = function(J22, q22) {
  return J22 >>> q22 | J22 << 32 - q22;
};
var iq3 = function(J22, q22) {
  return J22 >>> q22;
};
var uq3 = function(J22, q22, _) {
  return J22 ^ q22 ^ _;
};
var rq3 = function(J22, q22, _) {
  return J22 & q22 ^ ~J22 & _;
};
var tq3 = function(J22, q22, _) {
  return J22 & q22 ^ J22 & _ ^ q22 & _;
};
var D33 = function(J22) {
  return f4(J22, 2) ^ f4(J22, 13) ^ f4(J22, 22);
};
var $7 = function(J22, q22) {
  const _ = (65535 & J22) + (65535 & q22);
  return (65535 & (J22 >>> 16) + (q22 >>> 16) + (_ >>> 16)) << 16 | 65535 & _;
};
var R33 = function(J22, q22, _, z) {
  const Q22 = (65535 & J22) + (65535 & q22) + (65535 & _) + (65535 & z);
  return (65535 & (J22 >>> 16) + (q22 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q22 >>> 16)) << 16 | 65535 & Q22;
};
var V13 = function(J22, q22, _, z, Q22) {
  const Z = (65535 & J22) + (65535 & q22) + (65535 & _) + (65535 & z) + (65535 & Q22);
  return (65535 & (J22 >>> 16) + (q22 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q22 >>> 16) + (Z >>> 16)) << 16 | 65535 & Z;
};
var O33 = function(J22) {
  return f4(J22, 7) ^ f4(J22, 18) ^ iq3(J22, 3);
};
var A33 = function(J22) {
  return f4(J22, 6) ^ f4(J22, 11) ^ f4(J22, 25);
};
var C33 = function(J22) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var nq3 = function(J22, q22) {
  let _, z, Q22, Z, G, V, U;
  const K4 = [];
  for (_ = q22[0], z = q22[1], Q22 = q22[2], Z = q22[3], G = q22[4], U = 0;U < 80; U += 1)
    K4[U] = U < 16 ? J22[U] : J13(K4[U - 3] ^ K4[U - 8] ^ K4[U - 14] ^ K4[U - 16], 1), V = U < 20 ? V13(J13(_, 5), rq3(z, Q22, Z), G, 1518500249, K4[U]) : U < 40 ? V13(J13(_, 5), uq3(z, Q22, Z), G, 1859775393, K4[U]) : U < 60 ? V13(J13(_, 5), tq3(z, Q22, Z), G, 2400959708, K4[U]) : V13(J13(_, 5), uq3(z, Q22, Z), G, 3395469782, K4[U]), G = Z, Z = Q22, Q22 = J13(z, 30), z = _, _ = V;
  return q22[0] = $7(_, q22[0]), q22[1] = $7(z, q22[1]), q22[2] = $7(Q22, q22[2]), q22[3] = $7(Z, q22[3]), q22[4] = $7(G, q22[4]), q22;
};
var x33 = function(J22, q22, _, z) {
  let Q22;
  const Z = 15 + (q22 + 65 >>> 9 << 4), G = q22 + _;
  for (;J22.length <= Z; )
    J22.push(0);
  for (J22[q22 >>> 5] |= 128 << 24 - q22 % 32, J22[Z] = 4294967295 & G, J22[Z - 1] = G / K13 | 0, Q22 = 0;Q22 < J22.length; Q22 += 16)
    z = nq3(J22.slice(Q22, Q22 + 16), z);
  return z;
};
var hq3 = function(J22) {
  let q22;
  return q22 = J22 == "SHA-224" ? m4.slice() : g3.slice(), q22;
};
var Yq3 = function(J22, q22) {
  let _, z, Q22, Z, G, V, U, K4, H, F22, B22;
  const W = [];
  for (_ = q22[0], z = q22[1], Q22 = q22[2], Z = q22[3], G = q22[4], V = q22[5], U = q22[6], K4 = q22[7], B22 = 0;B22 < 64; B22 += 1)
    W[B22] = B22 < 16 ? J22[B22] : R33(f4(L = W[B22 - 2], 17) ^ f4(L, 19) ^ iq3(L, 10), W[B22 - 7], O33(W[B22 - 15]), W[B22 - 16]), H = V13(K4, A33(G), rq3(G, V, U), M3[B22], W[B22]), F22 = $7(D33(_), tq3(_, z, Q22)), K4 = U, U = V, V = G, G = $7(Z, H), Z = Q22, Q22 = z, z = _, _ = $7(H, F22);
  var L;
  return q22[0] = $7(_, q22[0]), q22[1] = $7(z, q22[1]), q22[2] = $7(Q22, q22[2]), q22[3] = $7(Z, q22[3]), q22[4] = $7(G, q22[4]), q22[5] = $7(V, q22[5]), q22[6] = $7(U, q22[6]), q22[7] = $7(K4, q22[7]), q22;
};
var dq3 = function(J22, q22) {
  let _;
  return q22 > 32 ? (_ = 64 - q22, new X3(J22.I << q22 | J22.N >>> _, J22.N << q22 | J22.I >>> _)) : q22 !== 0 ? (_ = 32 - q22, new X3(J22.N << q22 | J22.I >>> _, J22.I << q22 | J22.N >>> _)) : J22;
};
var w7 = function(J22, q22) {
  let _;
  return q22 < 32 ? (_ = 32 - q22, new X3(J22.N >>> q22 | J22.I << _, J22.I >>> q22 | J22.N << _)) : (_ = 64 - q22, new X3(J22.I >>> q22 | J22.N << _, J22.N >>> q22 | J22.I << _));
};
var eq3 = function(J22, q22) {
  return new X3(J22.N >>> q22, J22.I >>> q22 | J22.N << 32 - q22);
};
var j33 = function(J22, q22, _) {
  return new X3(J22.N & q22.N ^ J22.N & _.N ^ q22.N & _.N, J22.I & q22.I ^ J22.I & _.I ^ q22.I & _.I);
};
var k33 = function(J22) {
  const q22 = w7(J22, 28), _ = w7(J22, 34), z = w7(J22, 39);
  return new X3(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var E4 = function(J22, q22) {
  let _, z;
  _ = (65535 & J22.I) + (65535 & q22.I), z = (J22.I >>> 16) + (q22.I >>> 16) + (_ >>> 16);
  const Q22 = (65535 & z) << 16 | 65535 & _;
  return _ = (65535 & J22.N) + (65535 & q22.N) + (z >>> 16), z = (J22.N >>> 16) + (q22.N >>> 16) + (_ >>> 16), new X3((65535 & z) << 16 | 65535 & _, Q22);
};
var I33 = function(J22, q22, _, z) {
  let Q22, Z;
  Q22 = (65535 & J22.I) + (65535 & q22.I) + (65535 & _.I) + (65535 & z.I), Z = (J22.I >>> 16) + (q22.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q22 >>> 16);
  const G = (65535 & Z) << 16 | 65535 & Q22;
  return Q22 = (65535 & J22.N) + (65535 & q22.N) + (65535 & _.N) + (65535 & z.N) + (Z >>> 16), Z = (J22.N >>> 16) + (q22.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q22 >>> 16), new X3((65535 & Z) << 16 | 65535 & Q22, G);
};
var v33 = function(J22, q22, _, z, Q22) {
  let Z, G;
  Z = (65535 & J22.I) + (65535 & q22.I) + (65535 & _.I) + (65535 & z.I) + (65535 & Q22.I), G = (J22.I >>> 16) + (q22.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q22.I >>> 16) + (Z >>> 16);
  const V = (65535 & G) << 16 | 65535 & Z;
  return Z = (65535 & J22.N) + (65535 & q22.N) + (65535 & _.N) + (65535 & z.N) + (65535 & Q22.N) + (G >>> 16), G = (J22.N >>> 16) + (q22.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q22.N >>> 16) + (Z >>> 16), new X3((65535 & G) << 16 | 65535 & Z, V);
};
var B13 = function(J22, q22) {
  return new X3(J22.N ^ q22.N, J22.I ^ q22.I);
};
var S33 = function(J22) {
  const q22 = w7(J22, 19), _ = w7(J22, 61), z = eq3(J22, 6);
  return new X3(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var $33 = function(J22) {
  const q22 = w7(J22, 1), _ = w7(J22, 8), z = eq3(J22, 7);
  return new X3(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var P33 = function(J22) {
  const q22 = w7(J22, 14), _ = w7(J22, 18), z = w7(J22, 41);
  return new X3(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var lq3 = function(J22) {
  return J22 === "SHA-384" ? [new X3(3418070365, m4[0]), new X3(1654270250, m4[1]), new X3(2438529370, m4[2]), new X3(355462360, m4[3]), new X3(1731405415, m4[4]), new X3(41048885895, m4[5]), new X3(3675008525, m4[6]), new X3(1203062813, m4[7])] : [new X3(g3[0], 4089235720), new X3(g3[1], 2227873595), new X3(g3[2], 4271175723), new X3(g3[3], 1595750129), new X3(g3[4], 2917565137), new X3(g3[5], 725511199), new X3(g3[6], 4215389547), new X3(g3[7], 327033209)];
};
var oq3 = function(J22, q22) {
  let _, z, Q22, Z, G, V, U, K4, H, F22, B22, W;
  const L = [];
  for (_ = q22[0], z = q22[1], Q22 = q22[2], Z = q22[3], G = q22[4], V = q22[5], U = q22[6], K4 = q22[7], B22 = 0;B22 < 80; B22 += 1)
    B22 < 16 ? (W = 2 * B22, L[B22] = new X3(J22[W], J22[W + 1])) : L[B22] = I33(S33(L[B22 - 2]), L[B22 - 7], $33(L[B22 - 15]), L[B22 - 16]), H = v33(K4, P33(G), (O = V, v = U, new X3((D = G).N & O.N ^ ~D.N & v.N, D.I & O.I ^ ~D.I & v.I)), b33[B22], L[B22]), F22 = E4(k33(_), j33(_, z, Q22)), K4 = U, U = V, V = G, G = E4(Z, H), Z = Q22, Q22 = z, z = _, _ = E4(H, F22);
  var D, O, v;
  return q22[0] = E4(_, q22[0]), q22[1] = E4(z, q22[1]), q22[2] = E4(Q22, q22[2]), q22[3] = E4(Z, q22[3]), q22[4] = E4(G, q22[4]), q22[5] = E4(V, q22[5]), q22[6] = E4(U, q22[6]), q22[7] = E4(K4, q22[7]), q22;
};
var J03 = function(J22) {
  let q22;
  const _ = [];
  for (q22 = 0;q22 < 5; q22 += 1)
    _[q22] = [new X3(0, 0), new X3(0, 0), new X3(0, 0), new X3(0, 0), new X3(0, 0)];
  return _;
};
var y33 = function(J22) {
  let q22;
  const _ = [];
  for (q22 = 0;q22 < 5; q22 += 1)
    _[q22] = J22[q22].slice();
  return _;
};
var b13 = function(J22, q22) {
  let _, z, Q22, Z;
  const G = [], V = [];
  if (J22 !== null)
    for (z = 0;z < J22.length; z += 2)
      q22[(z >>> 1) % 5][(z >>> 1) / 5 | 0] = B13(q22[(z >>> 1) % 5][(z >>> 1) / 5 | 0], new X3(J22[z + 1], J22[z]));
  for (_ = 0;_ < 24; _ += 1) {
    for (Z = J03(), z = 0;z < 5; z += 1)
      G[z] = (U = q22[z][0], K4 = q22[z][1], H = q22[z][2], F22 = q22[z][3], B22 = q22[z][4], new X3(U.N ^ K4.N ^ H.N ^ F22.N ^ B22.N, U.I ^ K4.I ^ H.I ^ F22.I ^ B22.I));
    for (z = 0;z < 5; z += 1)
      V[z] = B13(G[(z + 4) % 5], dq3(G[(z + 1) % 5], 1));
    for (z = 0;z < 5; z += 1)
      for (Q22 = 0;Q22 < 5; Q22 += 1)
        q22[z][Q22] = B13(q22[z][Q22], V[z]);
    for (z = 0;z < 5; z += 1)
      for (Q22 = 0;Q22 < 5; Q22 += 1)
        Z[Q22][(2 * z + 3 * Q22) % 5] = dq3(q22[z][Q22], w33[z][Q22]);
    for (z = 0;z < 5; z += 1)
      for (Q22 = 0;Q22 < 5; Q22 += 1)
        q22[z][Q22] = B13(Z[z][Q22], new X3(~Z[(z + 1) % 5][Q22].N & Z[(z + 2) % 5][Q22].N, ~Z[(z + 1) % 5][Q22].I & Z[(z + 2) % 5][Q22].I));
    q22[0][0] = B13(q22[0][0], f33[_]);
  }
  var U, K4, H, F22, B22;
  return q22;
};
var qJ3 = function(J22) {
  let q22, _, z = 0;
  const Q22 = [0, 0], Z = [4294967295 & J22, J22 / K13 & 2097151];
  for (q22 = 6;q22 >= 0; q22--)
    _ = Z[q22 >> 2] >>> 8 * q22 & 255, _ === 0 && z === 0 || (Q22[z + 1 >> 2] |= _ << 8 * (z + 1), z += 1);
  return z = z !== 0 ? z : 1, Q22[0] |= z, { value: z + 1 > 4 ? Q22 : [Q22[0]], binLen: 8 + 8 * z };
};
var q03 = function(J22) {
  return E13(qJ3(J22.binLen), J22);
};
var aq3 = function(J22, q22) {
  let _, z = qJ3(q22);
  z = E13(z, J22);
  const Q22 = q22 >>> 2, Z = (Q22 - z.value.length % Q22) % Q22;
  for (_ = 0;_ < Z; _++)
    z.value.push(0);
  return z.value;
};
var K13 = 4294967296;
var M3 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var m4 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var g3 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var H13 = "Chosen SHA variant is not supported";
var sq3 = "Cannot set numRounds with MAC";

class L13 {
  constructor(J22, q22, _) {
    const z = _ || {};
    if (this.t = q22, this.i = z.encoding || "UTF8", this.numRounds = z.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = J22, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(J22) {
    let q22, _ = 0;
    const z = this.m >>> 5, Q22 = this.C(J22, this.h, this.u), Z = Q22.binLen, G = Q22.value, V = Z >>> 5;
    for (q22 = 0;q22 < V; q22 += z)
      _ + this.m <= Z && (this.U = this.v(G.slice(q22, q22 + z), this.U), _ += this.m);
    return this.A += _, this.h = G.slice(_ >>> 5), this.u = Z % this.m, this.l = true, this;
  }
  getHash(J22, q22) {
    let _, z, Q22 = this.R;
    const Z = cq3(q22);
    if (this.K) {
      if (Z.outputLen === -1)
        throw new Error("Output length must be specified in options");
      Q22 = Z.outputLen;
    }
    const G = pq3(J22, Q22, this.T, Z);
    if (this.H && this.g)
      return G(this.g(Z));
    for (z = this.F(this.h.slice(), this.u, this.A, this.L(this.U), Q22), _ = 1;_ < this.numRounds; _ += 1)
      this.K && Q22 % 32 != 0 && (z[z.length - 1] &= 16777215 >>> 24 - Q22 % 32), z = this.F(z, Q22, 0, this.B(this.o), Q22);
    return G(z);
  }
  setHMACKey(J22, q22, _) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    const z = _13(q22, (_ || {}).encoding || "UTF8", this.T);
    this.k(z(J22));
  }
  k(J22) {
    const q22 = this.m >>> 3, _ = q22 / 4 - 1;
    let z;
    if (this.numRounds !== 1)
      throw new Error(sq3);
    if (this.H)
      throw new Error("MAC key already set");
    for (q22 < J22.binLen / 8 && (J22.value = this.F(J22.value, J22.binLen, 0, this.B(this.o), this.R));J22.value.length <= _; )
      J22.value.push(0);
    for (z = 0;z <= _; z += 1)
      this.S[z] = 909522486 ^ J22.value[z], this.p[z] = 1549556828 ^ J22.value[z];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(J22, q22) {
    const _ = cq3(q22);
    return pq3(J22, this.R, this.T, _)(this.Y());
  }
  Y() {
    let J22;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    const q22 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return J22 = this.v(this.p, this.B(this.o)), J22 = this.F(q22, this.R, this.m, J22, this.R), J22;
  }
}
var T33 = class extends L13 {
  constructor(J22, q22, _) {
    if (J22 !== "SHA-1")
      throw new Error(H13);
    super(J22, q22, _);
    const z = _ || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = _13(this.t, this.i, this.T), this.v = nq3, this.L = function(Q22) {
      return Q22.slice();
    }, this.B = C33, this.F = x33, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, z.hmacKey && this.k(c3("hmacKey", z.hmacKey, this.T));
  }
};
var N33 = class extends L13 {
  constructor(J22, q22, _) {
    if (J22 !== "SHA-224" && J22 !== "SHA-256")
      throw new Error(H13);
    super(J22, q22, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _13(this.t, this.i, this.T), this.v = Yq3, this.L = function(Q22) {
      return Q22.slice();
    }, this.B = hq3, this.F = function(Q22, Z, G, V) {
      return function(U, K4, H, F22, B22) {
        let W, L;
        const D = 15 + (K4 + 65 >>> 9 << 4), O = K4 + H;
        for (;U.length <= D; )
          U.push(0);
        for (U[K4 >>> 5] |= 128 << 24 - K4 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K13 | 0, W = 0;W < U.length; W += 16)
          F22 = Yq3(U.slice(W, W + 16), F22);
        return L = B22 === "SHA-224" ? [F22[0], F22[1], F22[2], F22[3], F22[4], F22[5], F22[6]] : F22, L;
      }(Q22, Z, G, V, J22);
    }, this.U = hq3(J22), this.m = 512, this.R = J22 === "SHA-224" ? 224 : 256, this.K = false, z.hmacKey && this.k(c3("hmacKey", z.hmacKey, this.T));
  }
};

class X3 {
  constructor(J22, q22) {
    this.N = J22, this.I = q22;
  }
}
var b33 = [new X3(M3[0], 3609767458), new X3(M3[1], 602891725), new X3(M3[2], 3964484399), new X3(M3[3], 2173295548), new X3(M3[4], 4081628472), new X3(M3[5], 3053834265), new X3(M3[6], 2937671579), new X3(M3[7], 3664609560), new X3(M3[8], 2734883394), new X3(M3[9], 1164996542), new X3(M3[10], 1323610764), new X3(M3[11], 3590304994), new X3(M3[12], 4068182383), new X3(M3[13], 991336113), new X3(M3[14], 633803317), new X3(M3[15], 3479774868), new X3(M3[16], 2666613458), new X3(M3[17], 944711139), new X3(M3[18], 2341262773), new X3(M3[19], 2007800933), new X3(M3[20], 1495990901), new X3(M3[21], 1856431235), new X3(M3[22], 3175218132), new X3(M3[23], 2198950837), new X3(M3[24], 3999719339), new X3(M3[25], 766784016), new X3(M3[26], 2566594879), new X3(M3[27], 3203337956), new X3(M3[28], 1034457026), new X3(M3[29], 2466948901), new X3(M3[30], 3758326383), new X3(M3[31], 168717936), new X3(M3[32], 1188179964), new X3(M3[33], 1546045734), new X3(M3[34], 1522805485), new X3(M3[35], 2643833823), new X3(M3[36], 2343527390), new X3(M3[37], 1014477480), new X3(M3[38], 1206759142), new X3(M3[39], 344077627), new X3(M3[40], 1290863460), new X3(M3[41], 3158454273), new X3(M3[42], 3505952657), new X3(M3[43], 106217008), new X3(M3[44], 3606008344), new X3(M3[45], 1432725776), new X3(M3[46], 1467031594), new X3(M3[47], 851169720), new X3(M3[48], 3100823752), new X3(M3[49], 1363258195), new X3(M3[50], 3750685593), new X3(M3[51], 3785050280), new X3(M3[52], 3318307427), new X3(M3[53], 3812723403), new X3(M3[54], 2003034995), new X3(M3[55], 3602036899), new X3(M3[56], 1575990012), new X3(M3[57], 1125592928), new X3(M3[58], 2716904306), new X3(M3[59], 442776044), new X3(M3[60], 593698344), new X3(M3[61], 3733110249), new X3(M3[62], 2999351573), new X3(M3[63], 3815920427), new X3(3391569614, 3928383900), new X3(3515267271, 566280711), new X3(3940187606, 3454069534), new X3(4118630271, 4000239992), new X3(116418474, 1914138554), new X3(174292421, 2731055270), new X3(289380356, 3203993006), new X3(460393269, 320620315), new X3(685471733, 587496836), new X3(852142971, 1086792851), new X3(1017036298, 365543100), new X3(1126000580, 2618297676), new X3(1288033470, 3409855158), new X3(1501505948, 4234509866), new X3(1607167915, 987167468), new X3(1816402316, 1246189591)];
var E33 = class extends L13 {
  constructor(J22, q22, _) {
    if (J22 !== "SHA-384" && J22 !== "SHA-512")
      throw new Error(H13);
    super(J22, q22, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _13(this.t, this.i, this.T), this.v = oq3, this.L = function(Q22) {
      return Q22.slice();
    }, this.B = lq3, this.F = function(Q22, Z, G, V) {
      return function(U, K4, H, F22, B22) {
        let W, L;
        const D = 31 + (K4 + 129 >>> 10 << 5), O = K4 + H;
        for (;U.length <= D; )
          U.push(0);
        for (U[K4 >>> 5] |= 128 << 24 - K4 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K13 | 0, W = 0;W < U.length; W += 32)
          F22 = oq3(U.slice(W, W + 32), F22);
        return L = B22 === "SHA-384" ? [F22[0].N, F22[0].I, F22[1].N, F22[1].I, F22[2].N, F22[2].I, F22[3].N, F22[3].I, F22[4].N, F22[4].I, F22[5].N, F22[5].I] : [F22[0].N, F22[0].I, F22[1].N, F22[1].I, F22[2].N, F22[2].I, F22[3].N, F22[3].I, F22[4].N, F22[4].I, F22[5].N, F22[5].I, F22[6].N, F22[6].I, F22[7].N, F22[7].I], L;
      }(Q22, Z, G, V, J22);
    }, this.U = lq3(J22), this.m = 1024, this.R = J22 === "SHA-384" ? 384 : 512, this.K = false, z.hmacKey && this.k(c3("hmacKey", z.hmacKey, this.T));
  }
};
var f33 = [new X3(0, 1), new X3(0, 32898), new X3(2147483648, 32906), new X3(2147483648, 2147516416), new X3(0, 32907), new X3(0, 2147483649), new X3(2147483648, 2147516545), new X3(2147483648, 32777), new X3(0, 138), new X3(0, 136), new X3(0, 2147516425), new X3(0, 2147483658), new X3(0, 2147516555), new X3(2147483648, 139), new X3(2147483648, 32905), new X3(2147483648, 32771), new X3(2147483648, 32770), new X3(2147483648, 128), new X3(0, 32778), new X3(2147483648, 2147483658), new X3(2147483648, 2147516545), new X3(2147483648, 32896), new X3(0, 2147483649), new X3(2147483648, 2147516424)];
var w33 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var m33 = class extends L13 {
  constructor(J22, q22, _) {
    let z = 6, Q22 = 0;
    super(J22, q22, _);
    const Z = _ || {};
    if (this.numRounds !== 1) {
      if (Z.kmacKey || Z.hmacKey)
        throw new Error(sq3);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = _13(this.t, this.i, this.T), this.v = b13, this.L = y33, this.B = J03, this.U = J03(), this.K = false, J22) {
      case "SHA3-224":
        this.m = Q22 = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = Q22 = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = Q22 = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = Q22 = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        z = 31, this.m = Q22 = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        z = 31, this.m = Q22 = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        z = 4, this.m = Q22 = 1344, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        z = 4, this.m = Q22 = 1088, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = Q22 = 1344, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = Q22 = 1088, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(H13);
    }
    this.F = function(G, V, U, K4, H) {
      return function(F22, B22, W, L, D, O, v) {
        let N22, S, j = 0;
        const P = [], W1 = D >>> 5, _J = B22 >>> 5;
        for (N22 = 0;N22 < _J && B22 >= D; N22 += W1)
          L = b13(F22.slice(N22, N22 + W1), L), B22 -= D;
        for (F22 = F22.slice(N22), B22 %= D;F22.length < W1; )
          F22.push(0);
        for (N22 = B22 >>> 3, F22[N22 >> 2] ^= O << N22 % 4 * 8, F22[W1 - 1] ^= 2147483648, L = b13(F22, L);32 * P.length < v && (S = L[j % 5][j / 5 | 0], P.push(S.I), !(32 * P.length >= v)); )
          P.push(S.N), j += 1, 64 * j % D == 0 && (b13(null, L), j = 0);
        return P;
      }(G, V, 0, K4, Q22, z, H);
    }, Z.hmacKey && this.k(c3("hmacKey", Z.hmacKey, this.T));
  }
  O(J22, q22) {
    const _ = function(Q22) {
      const Z = Q22 || {};
      return { funcName: c3("funcName", Z.funcName, 1, { value: [], binLen: 0 }), customization: c3("Customization", Z.customization, 1, { value: [], binLen: 0 }) };
    }(J22 || {});
    q22 && (_.funcName = q22);
    const z = E13(q03(_.funcName), q03(_.customization));
    if (_.customization.binLen !== 0 || _.funcName.binLen !== 0) {
      const Q22 = aq3(z, this.m >>> 3);
      for (let Z = 0;Z < Q22.length; Z += this.m >>> 5)
        this.U = this.v(Q22.slice(Z, Z + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(J22) {
    const q22 = function(z) {
      const Q22 = z || {};
      return { kmacKey: c3("kmacKey", Q22.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: c3("Customization", Q22.customization, 1, { value: [], binLen: 0 }) };
    }(J22 || {});
    this.O(J22, q22.funcName);
    const _ = aq3(q03(q22.kmacKey), this.m >>> 3);
    for (let z = 0;z < _.length; z += this.m >>> 5)
      this.U = this.v(_.slice(z, z + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(J22) {
    const q22 = E13({ value: this.h.slice(), binLen: this.u }, function(_) {
      let z, Q22, Z = 0;
      const G = [0, 0], V = [4294967295 & _, _ / K13 & 2097151];
      for (z = 6;z >= 0; z--)
        Q22 = V[z >> 2] >>> 8 * z & 255, Q22 === 0 && Z === 0 || (G[Z >> 2] |= Q22 << 8 * Z, Z += 1);
      return Z = Z !== 0 ? Z : 1, G[Z >> 2] |= Z << 8 * Z, { value: Z + 1 > 4 ? G : [G[0]], binLen: 8 + 8 * Z };
    }(J22.outputLen));
    return this.F(q22.value, q22.binLen, this.A, this.L(this.U), J22.outputLen);
  }
};

class _03 {
  constructor(J22, q22, _) {
    if (J22 == "SHA-1")
      this.P = new T33(J22, q22, _);
    else if (J22 == "SHA-224" || J22 == "SHA-256")
      this.P = new N33(J22, q22, _);
    else if (J22 == "SHA-384" || J22 == "SHA-512")
      this.P = new E33(J22, q22, _);
    else {
      if (J22 != "SHA3-224" && J22 != "SHA3-256" && J22 != "SHA3-384" && J22 != "SHA3-512" && J22 != "SHAKE128" && J22 != "SHAKE256" && J22 != "CSHAKE128" && J22 != "CSHAKE256" && J22 != "KMAC128" && J22 != "KMAC256")
        throw new Error(H13);
      this.P = new m33(J22, q22, _);
    }
  }
  update(J22) {
    return this.P.update(J22), this;
  }
  getHash(J22, q22) {
    return this.P.getHash(J22, q22);
  }
  setHMACKey(J22, q22, _) {
    this.P.setHMACKey(J22, q22, _);
  }
  getHMAC(J22, q22) {
    return this.P.getHMAC(J22, q22);
  }
}
var f13 = function(J22, q22, _ = 0) {
  const z = z03.default({ ...J22, signature: undefined }), Q22 = q22.noTimeWindow ? 0 : Math.floor(Date.now() / (q22.timeWindow ?? JJ3)) + _;
  return new _03("SHA-256", "TEXT", { encoding: "UTF8" }).update(z).update(z03.default(q22)).update(`${Q22}`).getHash("B64");
};
function x53(J22, q22) {
  return (q22.noTimeWindow ? 0 : q22.timeWindow ?? JJ3) ? J22.signature === f13(J22, q22) || J22.signature === f13(J22, q22, -1) : J22.signature === f13(J22, q22);
}
var JJ3 = 5000;

class Processor3 {
  sendUpdate;
  constructor(sendUpdate) {
    this.sendUpdate = sendUpdate;
  }
  performCycle(context) {
    this.sendUpdateBlob(context);
    return commitUpdates5(context.root, context.properties);
  }
  async sendUpdateBlob(context) {
    const blobs = {};
    const outgoingUpdates = context.outgoingUpdates;
    context.outgoingUpdates = [];
    if (outgoingUpdates?.length) {
      for (let update of outgoingUpdates) {
        update.path = this.#fixPath(update.path, context);
        const previous = getLeafObject5(context.root, update.path.split("/"), 0, false);
        update.value = typeof update.value === "function" ? update.value(previous) : update.value;
      }
      const confirmedUpdates = outgoingUpdates.filter((update) => update.confirmed).map((update) => ({ ...update }));
      this.#addIncomingUpdates(confirmedUpdates, context);
      for (let update of outgoingUpdates) {
        update.value = await tt6(update.value, blobs);
      }
      if (outgoingUpdates.length) {
        const blob = packageUpdates5(outgoingUpdates, blobs, context.secret);
        this.sendUpdate(blob, context);
      }
    }
  }
  async processBlob(data, context) {
    const { payload, blobs } = data instanceof Blob ? await receiveBlob5(data) : { payload: typeof data === "string" ? JSON.parse(data) : data, blobs: {} };
    const secret = context.secret ?? payload.secret;
    if (secret) {
      if (!context.skipValidation && !x53(payload, { secret })) {
        console.error("Invalid signature");
        return;
      }
      context.secret = secret;
    }
    const hasBlobs = blobs && Object.keys(blobs).length > 0;
    if (payload?.globalTime) {
      context.localTimeOffset = payload.globalTime - Date.now();
    }
    if (payload?.myClientId) {
      context.clientId = payload.myClientId;
    }
    if (payload?.updates) {
      if (hasBlobs) {
        payload.updates.forEach((update) => {
          update.value = ht6(update.value, blobs);
        });
      }
      this.#addIncomingUpdates(payload.updates, context);
    }
  }
  #addIncomingUpdates(updates, context) {
    context.root.updates = context.root.updates ?? [];
    context.root.updates.push(...updates);
  }
  #fixPath(path, context) {
    const split = path.split("/");
    return split.map((part) => translateValue5(part, {
      self: context.clientId
    })).join("/");
  }
}

// ../src/observer/Observer.ts
class Observer2 {
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
    const newValues = this.paths.map((path, index) => updates && (path in updates) ? updates[path] : getLeafObject5(context.root, this.#partsArrays[index], 0, false, context.properties));
    if (this.#previousValues.every((prev, index) => {
      const newValue = newValues[index];
      if (prev === newValue) {
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
    const newValues = !this.paths.length ? [] : this.#valuesChanged(context, this.initialized ? updates : {});
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
class ObserverManager2 {
  #observers = new Set;
  observe(paths, multi) {
    const observer = new Observer2(paths, this, multi);
    this.#observers.add(observer);
    return observer;
  }
  triggerObservers(context, updates) {
    this.#observers.forEach((o) => o.triggerIfChanged(context, updates));
  }
  removeObserver(observer) {
    this.#observers.delete(observer);
  }
  close() {
    this.#observers.forEach((o) => o.close());
  }
}

// ../node_modules/@dobuki/payload-validator/dist/index.js
var zJ5 = Object.create;
var { defineProperty: Q05, getPrototypeOf: QJ5, getOwnPropertyNames: ZJ5 } = Object;
var UJ5 = Object.prototype.hasOwnProperty;
var XJ5 = (J3, q5, _) => {
  _ = J3 != null ? zJ5(QJ5(J3)) : {};
  const z = q5 || !J3 || !J3.__esModule ? Q05(_, "default", { value: J3, enumerable: true }) : _;
  for (let Q5 of ZJ5(J3))
    if (!UJ5.call(z, Q5))
      Q05(z, Q5, { get: () => J3[Q5], enumerable: true });
  return z;
};
var T6 = (J3, q5) => () => (q5 || J3((q5 = { exports: {} }).exports, q5), q5.exports);
var F05 = T6((p3, G0) => {
  var p = function(J3) {
    throw { name: "SyntaxError", message: J3, at: M1, text: w1 };
  }, x = function(J3) {
    if (J3 && J3 !== R4)
      p("Expected '" + J3 + "' instead of '" + R4 + "'");
    return R4 = w1.charAt(M1), M1 += 1, R4;
  }, U0 = function() {
    var J3, q5 = "";
    if (R4 === "-")
      q5 = "-", x("-");
    while (R4 >= "0" && R4 <= "9")
      q5 += R4, x();
    if (R4 === ".") {
      q5 += ".";
      while (x() && R4 >= "0" && R4 <= "9")
        q5 += R4;
    }
    if (R4 === "e" || R4 === "E") {
      if (q5 += R4, x(), R4 === "-" || R4 === "+")
        q5 += R4, x();
      while (R4 >= "0" && R4 <= "9")
        q5 += R4, x();
    }
    if (J3 = Number(q5), !isFinite(J3))
      p("Bad number");
    return J3;
  }, X0 = function() {
    var J3, q5, _ = "", z;
    if (R4 === '"')
      while (x())
        if (R4 === '"')
          return x(), _;
        else if (R4 === "\\")
          if (x(), R4 === "u") {
            z = 0;
            for (q5 = 0;q5 < 4; q5 += 1) {
              if (J3 = parseInt(x(), 16), !isFinite(J3))
                break;
              z = z * 16 + J3;
            }
            _ += String.fromCharCode(z);
          } else if (typeof Z0[R4] === "string")
            _ += Z0[R4];
          else
            break;
        else
          _ += R4;
    p("Bad string");
  }, y6 = function() {
    while (R4 && R4 <= " ")
      x();
  }, GJ = function() {
    switch (R4) {
      case "t":
        return x("t"), x("r"), x("u"), x("e"), true;
      case "f":
        return x("f"), x("a"), x("l"), x("s"), x("e"), false;
      case "n":
        return x("n"), x("u"), x("l"), x("l"), null;
      default:
        p("Unexpected '" + R4 + "'");
    }
  }, FJ = function() {
    var J3 = [];
    if (R4 === "[") {
      if (x("["), y6(), R4 === "]")
        return x("]"), J3;
      while (R4) {
        if (J3.push(D1()), y6(), R4 === "]")
          return x("]"), J3;
        x(","), y6();
      }
    }
    p("Bad array");
  }, BJ = function() {
    var J3, q5 = {};
    if (R4 === "{") {
      if (x("{"), y6(), R4 === "}")
        return x("}"), q5;
      while (R4) {
        if (J3 = X0(), y6(), x(":"), Object.prototype.hasOwnProperty.call(q5, J3))
          p('Duplicate key "' + J3 + '"');
        if (q5[J3] = D1(), y6(), R4 === "}")
          return x("}"), q5;
        x(","), y6();
      }
    }
    p("Bad object");
  }, D1 = function() {
    switch (y6(), R4) {
      case "{":
        return BJ();
      case "[":
        return FJ();
      case '"':
        return X0();
      case "-":
        return U0();
      default:
        return R4 >= "0" && R4 <= "9" ? U0() : GJ();
    }
  }, M1, R4, Z0 = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, w1;
  G0.exports = function(J3, q5) {
    var _;
    if (w1 = J3, M1 = 0, R4 = " ", _ = D1(), y6(), R4)
      p("Syntax error");
    return typeof q5 === "function" ? function z(Q5, Z) {
      var G, V, U = Q5[Z];
      if (U && typeof U === "object") {
        for (G in D1)
          if (Object.prototype.hasOwnProperty.call(U, G))
            if (V = z(U, G), typeof V === "undefined")
              delete U[G];
            else
              U[G] = V;
      }
      return q5.call(Q5, Z, U);
    }({ "": _ }, "") : _;
  };
});
var V05 = T6((c32, B0) => {
  var m1 = function(J3) {
    return y1.lastIndex = 0, y1.test(J3) ? '"' + J3.replace(y1, function(q5) {
      var _ = VJ[q5];
      return typeof _ === "string" ? _ : "\\u" + ("0000" + q5.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + J3 + '"';
  }, O1 = function(J3, q5) {
    var _, z, Q5, Z, G = b5, V, U = q5[J3];
    if (U && typeof U === "object" && typeof U.toJSON === "function")
      U = U.toJSON(J3);
    if (typeof u === "function")
      U = u.call(q5, J3, U);
    switch (typeof U) {
      case "string":
        return m1(U);
      case "number":
        return isFinite(U) ? String(U) : "null";
      case "boolean":
      case "null":
        return String(U);
      case "object":
        if (!U)
          return "null";
        if (b5 += R1, V = [], Object.prototype.toString.apply(U) === "[object Array]") {
          Z = U.length;
          for (_ = 0;_ < Z; _ += 1)
            V[_] = O1(_, U) || "null";
          return Q5 = V.length === 0 ? "[]" : b5 ? `[
` + b5 + V.join(`,
` + b5) + `
` + G + "]" : "[" + V.join(",") + "]", b5 = G, Q5;
        }
        if (u && typeof u === "object") {
          Z = u.length;
          for (_ = 0;_ < Z; _ += 1)
            if (z = u[_], typeof z === "string") {
              if (Q5 = O1(z, U), Q5)
                V.push(m1(z) + (b5 ? ": " : ":") + Q5);
            }
        } else
          for (z in U)
            if (Object.prototype.hasOwnProperty.call(U, z)) {
              if (Q5 = O1(z, U), Q5)
                V.push(m1(z) + (b5 ? ": " : ":") + Q5);
            }
        return Q5 = V.length === 0 ? "{}" : b5 ? `{
` + b5 + V.join(`,
` + b5) + `
` + G + "}" : "{" + V.join(",") + "}", b5 = G, Q5;
      default:
    }
  }, y1 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b5, R1, VJ = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, u;
  B0.exports = function(J3, q5, _) {
    var z;
    if (b5 = "", R1 = "", typeof _ === "number")
      for (z = 0;z < _; z += 1)
        R1 += " ";
    else if (typeof _ === "string")
      R1 = _;
    if (u = q5, q5 && typeof q5 !== "function" && (typeof q5 !== "object" || typeof q5.length !== "number"))
      throw new Error("JSON.stringify");
    return O1("", { "": J3 });
  };
});
var K05 = T6((KJ) => {
  KJ.parse = F05();
  KJ.stringify = V05();
});
var L05 = T6((h3, H0) => {
  var WJ = {}.toString;
  H0.exports = Array.isArray || function(J3) {
    return WJ.call(J3) == "[object Array]";
  };
});
var g15 = T6((Y3, M0) => {
  var W0 = Object.prototype.toString;
  M0.exports = function J(q5) {
    var _ = W0.call(q5), z = _ === "[object Arguments]";
    if (!z)
      z = _ !== "[object Array]" && q5 !== null && typeof q5 === "object" && typeof q5.length === "number" && q5.length >= 0 && W0.call(q5.callee) === "[object Function]";
    return z;
  };
});
var j05 = T6((d3, N0) => {
  var T0;
  if (!Object.keys)
    z1 = Object.prototype.hasOwnProperty, p1 = Object.prototype.toString, D0 = g15(), c1 = Object.prototype.propertyIsEnumerable, R0 = !c1.call({ toString: null }, "toString"), O0 = c1.call(function() {}, "prototype"), Q1 = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], A1 = function(J3) {
      var q5 = J3.constructor;
      return q5 && q5.prototype === J3;
    }, A0 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, C0 = function() {
      if (typeof window === "undefined")
        return false;
      for (var J3 in window)
        try {
          if (!A0["$" + J3] && z1.call(window, J3) && window[J3] !== null && typeof window[J3] === "object")
            try {
              A1(window[J3]);
            } catch (q5) {
              return true;
            }
        } catch (q5) {
          return true;
        }
      return false;
    }(), x0 = function(J3) {
      if (typeof window === "undefined" || !C0)
        return A1(J3);
      try {
        return A1(J3);
      } catch (q5) {
        return false;
      }
    }, T0 = function J(q5) {
      var _ = q5 !== null && typeof q5 === "object", z = p1.call(q5) === "[object Function]", Q5 = D0(q5), Z = _ && p1.call(q5) === "[object String]", G = [];
      if (!_ && !z && !Q5)
        throw new TypeError("Object.keys called on a non-object");
      var V = O0 && z;
      if (Z && q5.length > 0 && !z1.call(q5, 0))
        for (var U = 0;U < q5.length; ++U)
          G.push(String(U));
      if (Q5 && q5.length > 0)
        for (var K4 = 0;K4 < q5.length; ++K4)
          G.push(String(K4));
      else
        for (var H in q5)
          if (!(V && H === "prototype") && z1.call(q5, H))
            G.push(String(H));
      if (R0) {
        var F5 = x0(q5);
        for (var B5 = 0;B5 < Q1.length; ++B5)
          if (!(F5 && Q1[B5] === "constructor") && z1.call(q5, Q1[B5]))
            G.push(Q1[B5]);
      }
      return G;
    };
  var z1, p1, D0, c1, R0, O0, Q1, A1, A0, C0, x0;
  N0.exports = T0;
});
var S05 = T6((l3, v0) => {
  var MJ = Array.prototype.slice, DJ = g15(), k0 = Object.keys, C1 = k0 ? function J(q5) {
    return k0(q5);
  } : j05(), I0 = Object.keys;
  C1.shim = function J() {
    if (Object.keys) {
      var q5 = function() {
        var _ = Object.keys(arguments);
        return _ && _.length === arguments.length;
      }(1, 2);
      if (!q5)
        Object.keys = function _(z) {
          if (DJ(z))
            return I0(MJ.call(z));
          return I0(z);
        };
    } else
      Object.keys = C1;
    return Object.keys || C1;
  };
  v0.exports = C1;
});
var b05 = T6((o3, P0) => {
  var RJ = "Function.prototype.bind called on incompatible ", OJ = Object.prototype.toString, AJ = Math.max, CJ = "[object Function]", $0 = function J(q5, _) {
    var z = [];
    for (var Q5 = 0;Q5 < q5.length; Q5 += 1)
      z[Q5] = q5[Q5];
    for (var Z = 0;Z < _.length; Z += 1)
      z[Z + q5.length] = _[Z];
    return z;
  }, xJ = function J(q5, _) {
    var z = [];
    for (var Q5 = _ || 0, Z = 0;Q5 < q5.length; Q5 += 1, Z += 1)
      z[Z] = q5[Q5];
    return z;
  }, TJ = function(J3, q5) {
    var _ = "";
    for (var z = 0;z < J3.length; z += 1)
      if (_ += J3[z], z + 1 < J3.length)
        _ += q5;
    return _;
  };
  P0.exports = function J(q5) {
    var _ = this;
    if (typeof _ !== "function" || OJ.apply(_) !== CJ)
      throw new TypeError(RJ + _);
    var z = xJ(arguments, 1), Q5, Z = function() {
      if (this instanceof Q5) {
        var H = _.apply(this, $0(z, arguments));
        if (Object(H) === H)
          return H;
        return this;
      }
      return _.apply(q5, $0(z, arguments));
    }, G = AJ(0, _.length - z.length), V = [];
    for (var U = 0;U < G; U++)
      V[U] = "$" + U;
    if (Q5 = Function("binder", "return function (" + TJ(V, ",") + "){ return binder.apply(this,arguments); }")(Z), _.prototype) {
      var K4 = function H() {};
      K4.prototype = _.prototype, Q5.prototype = new K4, K4.prototype = null;
    }
    return Q5;
  };
});
var Z15 = T6((a3, E0) => {
  var NJ = b05();
  E0.exports = Function.prototype.bind || NJ;
});
var w05 = T6((s3, f0) => {
  f0.exports = Error;
});
var m05 = T6((i3, y0) => {
  y0.exports = EvalError;
});
var p05 = T6((r3, g0) => {
  g0.exports = RangeError;
});
var u05 = T6((t3, c0) => {
  c0.exports = ReferenceError;
});
var u15 = T6((n3, h0) => {
  h0.exports = SyntaxError;
});
var U15 = T6((e3, Y0) => {
  Y0.exports = TypeError;
});
var l05 = T6((q5, d0) => {
  d0.exports = URIError;
});
var a05 = T6((J5, o0) => {
  o0.exports = function J() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var q5 = {}, _ = Symbol("test"), z = Object(_);
    if (typeof _ === "string")
      return false;
    if (Object.prototype.toString.call(_) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(z) !== "[object Symbol]")
      return false;
    var Q5 = 42;
    q5[_] = Q5;
    for (_ in q5)
      return false;
    if (typeof Object.keys === "function" && Object.keys(q5).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(q5).length !== 0)
      return false;
    var Z = Object.getOwnPropertySymbols(q5);
    if (Z.length !== 1 || Z[0] !== _)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(q5, _))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var G = Object.getOwnPropertyDescriptor(q5, _);
      if (G.value !== Q5 || G.enumerable !== true)
        return false;
    }
    return true;
  };
});
var h15 = T6((_5, i0) => {
  var s0 = typeof Symbol !== "undefined" && Symbol, jJ = a05();
  i0.exports = function J() {
    if (typeof s0 !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof s0("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return jJ();
  };
});
var Y15 = T6((z5, t0) => {
  var r0 = { foo: {} }, kJ = Object;
  t0.exports = function J() {
    return { __proto__: r0 }.foo === r0.foo && !({ __proto__: null } instanceof kJ);
  };
});
var d15 = T6((Q5, n0) => {
  var IJ = Function.prototype.call, vJ = Object.prototype.hasOwnProperty, SJ = Z15();
  n0.exports = SJ.call(IJ, vJ);
});
var G15 = T6((Z5, zq) => {
  var A4, $J = w05(), PJ = m05(), bJ = p05(), EJ = u05(), i = u15(), s = U15(), fJ = l05(), _q = Function, l1 = function(J3) {
    try {
      return _q('"use strict"; return (' + J3 + ").constructor;")();
    } catch (q5) {}
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch (J3) {
      h = null;
    }
  var o1 = function() {
    throw new s;
  }, wJ = h ? function() {
    try {
      return arguments.callee, o1;
    } catch (J3) {
      try {
        return h(arguments, "callee").get;
      } catch (q5) {
        return o1;
      }
    }
  }() : o1, o = h15()(), yJ = Y15()(), k = Object.getPrototypeOf || (yJ ? function(J3) {
    return J3.__proto__;
  } : null), a = {}, mJ = typeof Uint8Array === "undefined" || !k ? A4 : k(Uint8Array), Y = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? A4 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? A4 : ArrayBuffer, "%ArrayIteratorPrototype%": o && k ? k([][Symbol.iterator]()) : A4, "%AsyncFromSyncIteratorPrototype%": A4, "%AsyncFunction%": a, "%AsyncGenerator%": a, "%AsyncGeneratorFunction%": a, "%AsyncIteratorPrototype%": a, "%Atomics%": typeof Atomics === "undefined" ? A4 : Atomics, "%BigInt%": typeof BigInt === "undefined" ? A4 : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? A4 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? A4 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? A4 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": $J, "%eval%": eval, "%EvalError%": PJ, "%Float32Array%": typeof Float32Array === "undefined" ? A4 : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? A4 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? A4 : FinalizationRegistry, "%Function%": _q, "%GeneratorFunction%": a, "%Int8Array%": typeof Int8Array === "undefined" ? A4 : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? A4 : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? A4 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": o && k ? k(k([][Symbol.iterator]())) : A4, "%JSON%": typeof JSON === "object" ? JSON : A4, "%Map%": typeof Map === "undefined" ? A4 : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !o || !k ? A4 : k(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? A4 : Promise, "%Proxy%": typeof Proxy === "undefined" ? A4 : Proxy, "%RangeError%": bJ, "%ReferenceError%": EJ, "%Reflect%": typeof Reflect === "undefined" ? A4 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? A4 : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !o || !k ? A4 : k(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? A4 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": o && k ? k(""[Symbol.iterator]()) : A4, "%Symbol%": o ? Symbol : A4, "%SyntaxError%": i, "%ThrowTypeError%": wJ, "%TypedArray%": mJ, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? A4 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? A4 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? A4 : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? A4 : Uint32Array, "%URIError%": fJ, "%WeakMap%": typeof WeakMap === "undefined" ? A4 : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? A4 : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? A4 : WeakSet };
  if (k)
    try {
      null.error;
    } catch (J3) {
      e0 = k(k(J3)), Y["%Error.prototype%"] = e0;
    }
  var e0, gJ = function J(q5) {
    var _;
    if (q5 === "%AsyncFunction%")
      _ = l1("async function () {}");
    else if (q5 === "%GeneratorFunction%")
      _ = l1("function* () {}");
    else if (q5 === "%AsyncGeneratorFunction%")
      _ = l1("async function* () {}");
    else if (q5 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q5 === "%AsyncIteratorPrototype%") {
      var Q5 = J("%AsyncGenerator%");
      if (Q5 && k)
        _ = k(Q5.prototype);
    }
    return Y[q5] = _, _;
  }, qq = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, X1 = Z15(), x1 = d15(), pJ = X1.call(Function.call, Array.prototype.concat), cJ = X1.call(Function.apply, Array.prototype.splice), Jq = X1.call(Function.call, String.prototype.replace), T1 = X1.call(Function.call, String.prototype.slice), uJ = X1.call(Function.call, RegExp.prototype.exec), hJ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, YJ = /\\(\\)?/g, dJ = function J(q5) {
    var _ = T1(q5, 0, 1), z = T1(q5, -1);
    if (_ === "%" && z !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var Q5 = [];
    return Jq(q5, hJ, function(Z, G, V, U) {
      Q5[Q5.length] = V ? Jq(U, YJ, "$1") : G || Z;
    }), Q5;
  }, lJ = function J(q5, _) {
    var z = q5, Q5;
    if (x1(qq, z))
      Q5 = qq[z], z = "%" + Q5[0] + "%";
    if (x1(Y, z)) {
      var Z = Y[z];
      if (Z === a)
        Z = gJ(z);
      if (typeof Z === "undefined" && !_)
        throw new s("intrinsic " + q5 + " exists, but is not available. Please file an issue!");
      return { alias: Q5, name: z, value: Z };
    }
    throw new i("intrinsic " + q5 + " does not exist!");
  };
  zq.exports = function J(q5, _) {
    if (typeof q5 !== "string" || q5.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (uJ(/^%?[^%]*%?$/, q5) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = dJ(q5), Q5 = z.length > 0 ? z[0] : "", Z = lJ("%" + Q5 + "%", _), G = Z.name, V = Z.value, U = false, K4 = Z.alias;
    if (K4)
      Q5 = K4[0], cJ(z, pJ([0, 1], K4));
    for (var H = 1, F5 = true;H < z.length; H += 1) {
      var B5 = z[H], W = T1(B5, 0, 1), L = T1(B5, -1);
      if ((W === '"' || W === "'" || W === "`" || (L === '"' || L === "'" || L === "`")) && W !== L)
        throw new i("property names with quotes must have matching quotes");
      if (B5 === "constructor" || !F5)
        U = true;
      if (Q5 += "." + B5, G = "%" + Q5 + "%", x1(Y, G))
        V = Y[G];
      else if (V != null) {
        if (!(B5 in V)) {
          if (!_)
            throw new s("base intrinsic for " + q5 + " exists, but the property is not available.");
          return;
        }
        if (h && H + 1 >= z.length) {
          var D = h(V, B5);
          if (F5 = !!D, F5 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B5];
        } else
          F5 = x1(V, B5), V = V[B5];
        if (F5 && !U)
          Y[G] = V;
      }
    }
    return V;
  };
});
var j15 = T6((U5, Qq) => {
  var oJ = G15(), N1 = oJ("%Object.defineProperty%", true) || false;
  if (N1)
    try {
      N1({}, "a", { value: 1 });
    } catch (J3) {
      N1 = false;
    }
  Qq.exports = N1;
});
var Bq5 = T6((X5, Fq) => {
  var C, e = SyntaxError, Gq = Function, n = TypeError, a1 = function(J4) {
    try {
      return Gq('"use strict"; return (' + J4 + ").constructor;")();
    } catch (q5) {}
  }, d = Object.getOwnPropertyDescriptor;
  if (d)
    try {
      d({}, "");
    } catch (J4) {
      d = null;
    }
  var s1 = function() {
    throw new n;
  }, aJ = d ? function() {
    try {
      return arguments.callee, s1;
    } catch (J4) {
      try {
        return d(arguments, "callee").get;
      } catch (q5) {
        return s1;
      }
    }
  }() : s1, r = h15()(), sJ = Y15()(), I = Object.getPrototypeOf || (sJ ? function(J4) {
    return J4.__proto__;
  } : null), t = {}, iJ = typeof Uint8Array === "undefined" || !I ? C : I(Uint8Array), l = { "%AggregateError%": typeof AggregateError === "undefined" ? C : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? C : ArrayBuffer, "%ArrayIteratorPrototype%": r && I ? I([][Symbol.iterator]()) : C, "%AsyncFromSyncIteratorPrototype%": C, "%AsyncFunction%": t, "%AsyncGenerator%": t, "%AsyncGeneratorFunction%": t, "%AsyncIteratorPrototype%": t, "%Atomics%": typeof Atomics === "undefined" ? C : Atomics, "%BigInt%": typeof BigInt === "undefined" ? C : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? C : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? C : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? C : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? C : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? C : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? C : FinalizationRegistry, "%Function%": Gq, "%GeneratorFunction%": t, "%Int8Array%": typeof Int8Array === "undefined" ? C : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? C : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? C : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": r && I ? I(I([][Symbol.iterator]())) : C, "%JSON%": typeof JSON === "object" ? JSON : C, "%Map%": typeof Map === "undefined" ? C : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !r || !I ? C : I(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? C : Promise, "%Proxy%": typeof Proxy === "undefined" ? C : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? C : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? C : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !r || !I ? C : I(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? C : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": r && I ? I(""[Symbol.iterator]()) : C, "%Symbol%": r ? Symbol : C, "%SyntaxError%": e, "%ThrowTypeError%": aJ, "%TypedArray%": iJ, "%TypeError%": n, "%Uint8Array%": typeof Uint8Array === "undefined" ? C : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? C : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? C : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? C : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? C : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? C : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? C : WeakSet };
  if (I)
    try {
      null.error;
    } catch (J4) {
      Zq = I(I(J4)), l["%Error.prototype%"] = Zq;
    }
  var Zq, rJ = function J(q5) {
    var _;
    if (q5 === "%AsyncFunction%")
      _ = a1("async function () {}");
    else if (q5 === "%GeneratorFunction%")
      _ = a1("function* () {}");
    else if (q5 === "%AsyncGeneratorFunction%")
      _ = a1("async function* () {}");
    else if (q5 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q5 === "%AsyncIteratorPrototype%") {
      var Q5 = J("%AsyncGenerator%");
      if (Q5 && I)
        _ = I(Q5.prototype);
    }
    return l[q5] = _, _;
  }, Uq = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, F1 = Z15(), k1 = d15(), tJ = F1.call(Function.call, Array.prototype.concat), nJ = F1.call(Function.apply, Array.prototype.splice), Xq = F1.call(Function.call, String.prototype.replace), I1 = F1.call(Function.call, String.prototype.slice), eJ = F1.call(Function.call, RegExp.prototype.exec), q32 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, J3 = /\\(\\)?/g, _3 = function J(q5) {
    var _ = I1(q5, 0, 1), z = I1(q5, -1);
    if (_ === "%" && z !== "%")
      throw new e("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new e("invalid intrinsic syntax, expected opening `%`");
    var Q5 = [];
    return Xq(q5, q32, function(Z, G, V, U) {
      Q5[Q5.length] = V ? Xq(U, J3, "$1") : G || Z;
    }), Q5;
  }, z3 = function J(q5, _) {
    var z = q5, Q5;
    if (k1(Uq, z))
      Q5 = Uq[z], z = "%" + Q5[0] + "%";
    if (k1(l, z)) {
      var Z = l[z];
      if (Z === t)
        Z = rJ(z);
      if (typeof Z === "undefined" && !_)
        throw new n("intrinsic " + q5 + " exists, but is not available. Please file an issue!");
      return { alias: Q5, name: z, value: Z };
    }
    throw new e("intrinsic " + q5 + " does not exist!");
  };
  Fq.exports = function J(q5, _) {
    if (typeof q5 !== "string" || q5.length === 0)
      throw new n("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new n('"allowMissing" argument must be a boolean');
    if (eJ(/^%?[^%]*%?$/, q5) === null)
      throw new e("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = _3(q5), Q5 = z.length > 0 ? z[0] : "", Z = z3("%" + Q5 + "%", _), G = Z.name, V = Z.value, U = false, K4 = Z.alias;
    if (K4)
      Q5 = K4[0], nJ(z, tJ([0, 1], K4));
    for (var H = 1, F5 = true;H < z.length; H += 1) {
      var B5 = z[H], W = I1(B5, 0, 1), L = I1(B5, -1);
      if ((W === '"' || W === "'" || W === "`" || (L === '"' || L === "'" || L === "`")) && W !== L)
        throw new e("property names with quotes must have matching quotes");
      if (B5 === "constructor" || !F5)
        U = true;
      if (Q5 += "." + B5, G = "%" + Q5 + "%", k1(l, G))
        V = l[G];
      else if (V != null) {
        if (!(B5 in V)) {
          if (!_)
            throw new n("base intrinsic for " + q5 + " exists, but the property is not available.");
          return;
        }
        if (d && H + 1 >= z.length) {
          var D = d(V, B5);
          if (F5 = !!D, F5 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B5];
        } else
          F5 = k1(V, B5), V = V[B5];
        if (F5 && !U)
          l[G] = V;
      }
    }
    return V;
  };
});
var i15 = T6((G5, Vq) => {
  var Q32 = Bq5(), v1 = Q32("%Object.getOwnPropertyDescriptor%", true);
  if (v1)
    try {
      v1([], "length");
    } catch (J3) {
      v1 = null;
    }
  Vq.exports = v1;
});
var Wq5 = T6((F5, Lq) => {
  var Kq = j15(), Z3 = u15(), q1 = U15(), Hq = i15();
  Lq.exports = function J(q5, _, z) {
    if (!q5 || typeof q5 !== "object" && typeof q5 !== "function")
      throw new q1("`obj` must be an object or a function`");
    if (typeof _ !== "string" && typeof _ !== "symbol")
      throw new q1("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new q1("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new q1("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new q1("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new q1("`loose`, if provided, must be a boolean");
    var Q5 = arguments.length > 3 ? arguments[3] : null, Z = arguments.length > 4 ? arguments[4] : null, G = arguments.length > 5 ? arguments[5] : null, V = arguments.length > 6 ? arguments[6] : false, U = !!Hq && Hq(q5, _);
    if (Kq)
      Kq(q5, _, { configurable: G === null && U ? U.configurable : !G, enumerable: Q5 === null && U ? U.enumerable : !Q5, value: z, writable: Z === null && U ? U.writable : !Z });
    else if (V || !Q5 && !Z && !G)
      q5[_] = z;
    else
      throw new Z3("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Rq5 = T6((B5, Dq) => {
  var r1 = j15(), Mq = function J() {
    return !!r1;
  };
  Mq.hasArrayLengthDefineBug = function J() {
    if (!r1)
      return null;
    try {
      return r1([], "length", { value: 1 }).length !== 1;
    } catch (q5) {
      return true;
    }
  };
  Dq.exports = Mq;
});
var Tq5 = T6((V5, xq) => {
  var U3 = G15(), Oq = Wq5(), X32 = Rq5()(), Aq = i15(), Cq = U15(), G3 = U3("%Math.floor%");
  xq.exports = function J(q5, _) {
    if (typeof q5 !== "function")
      throw new Cq("`fn` is not a function");
    if (typeof _ !== "number" || _ < 0 || _ > 4294967295 || G3(_) !== _)
      throw new Cq("`length` must be a positive 32-bit integer");
    var z = arguments.length > 2 && !!arguments[2], Q5 = true, Z = true;
    if ("length" in q5 && Aq) {
      var G = Aq(q5, "length");
      if (G && !G.configurable)
        Q5 = false;
      if (G && !G.writable)
        Z = false;
    }
    if (Q5 || Z || !z)
      if (X32)
        Oq(q5, "length", _, true, true);
      else
        Oq(q5, "length", _);
    return q5;
  };
});
var n15 = T6((K5, S1) => {
  var t1 = Z15(), $1 = G15(), F32 = Tq5(), B32 = U15(), kq = $1("%Function.prototype.apply%"), Iq = $1("%Function.prototype.call%"), vq = $1("%Reflect.apply%", true) || t1.call(Iq, kq), Nq = j15(), V3 = $1("%Math.max%");
  S1.exports = function J(q5) {
    if (typeof q5 !== "function")
      throw new B32("a function is required");
    var _ = vq(t1, Iq, arguments);
    return F32(_, 1 + V3(0, q5.length - (arguments.length - 1)), true);
  };
  var jq = function J() {
    return vq(t1, kq, arguments);
  };
  if (Nq)
    Nq(S1.exports, "apply", { value: jq });
  else
    S1.exports.apply = jq;
});
var bq5 = T6((H5, Pq) => {
  var Sq = G15(), $q = n15(), K32 = $q(Sq("String.prototype.indexOf"));
  Pq.exports = function J(q5, _) {
    var z = Sq(q5, !!_);
    if (typeof z === "function" && K32(q5, ".prototype.") > -1)
      return $q(z);
    return z;
  };
});
var mq5 = T6((L5, yq) => {
  var P1 = (typeof JSON !== "undefined" ? JSON : K05()).stringify, H3 = L05(), L3 = S05(), W3 = n15(), wq = bq5(), Eq = wq("Array.prototype.join"), e1 = wq("Array.prototype.push"), fq = function J(q5, _) {
    var z = "";
    for (var Q5 = 0;Q5 < q5; Q5 += 1)
      z += _;
    return z;
  }, M32 = function(J3, q5, _) {
    return _;
  };
  yq.exports = function J(q5) {
    var _ = arguments.length > 1 ? arguments[1] : undefined, z = _ && _.space || "";
    if (typeof z === "number")
      z = fq(z, " ");
    var Q5 = !!_ && typeof _.cycles === "boolean" && _.cycles, Z = _ && _.replacer ? W3(_.replacer) : M32, G = typeof _ === "function" ? _ : _ && _.cmp, V = G && function(K4) {
      var H = G.length > 2 && function F(B5) {
        return K4[B5];
      };
      return function(F5, B5) {
        return G({ key: F5, value: K4[F5] }, { key: B5, value: K4[B5] }, H ? { __proto__: null, get: H } : undefined);
      };
    }, U = [];
    return function K(H, F5, B5, W) {
      var L = z ? `
` + fq(W, z) : "", D = z ? ": " : ":";
      if (B5 && B5.toJSON && typeof B5.toJSON === "function")
        B5 = B5.toJSON();
      if (B5 = Z(H, F5, B5), B5 === undefined)
        return;
      if (typeof B5 !== "object" || B5 === null)
        return P1(B5);
      if (H3(B5)) {
        var S = [];
        for (var O = 0;O < B5.length; O++) {
          var v = K(B5, O, B5[O], W + 1) || P1(null);
          e1(S, L + z + v);
        }
        return "[" + Eq(S, ",") + L + "]";
      }
      if (U.indexOf(B5) !== -1) {
        if (Q5)
          return P1("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        e1(U, B5);
      var N4 = L3(B5).sort(V && V(B5)), S = [];
      for (var O = 0;O < N4.length; O++) {
        var F5 = N4[O], j = K(B5, F5, B5[F5], W + 1);
        if (!j)
          continue;
        var P = P1(F5) + D + j;
        e1(S, L + z + P);
      }
      return U.splice(U.indexOf(B5), 1), "{" + Eq(S, ",") + L + "}";
    }({ "": q5 }, "", q5, 0);
  };
});
var z05 = XJ5(mq5(), 1);
var gq5 = function(J3, q5, _, z) {
  let Q5, Z, G;
  const V = q5 || [0], U = (_ = _ || 0) >>> 3, K4 = z === -1 ? 3 : 0;
  for (Q5 = 0;Q5 < J3.length; Q5 += 1)
    G = Q5 + U, Z = G >>> 2, V.length <= Z && V.push(0), V[Z] |= J3[Q5] << 8 * (K4 + z * (G % 4));
  return { value: V, binLen: 8 * J3.length + _ };
};
var _15 = function(J3, q5, _) {
  switch (q5) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (J3) {
    case "HEX":
      return function(z, Q5, Z) {
        return function(G, V, U, K4) {
          let H, F5, B5, W;
          if (G.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          const L = V || [0], D = (U = U || 0) >>> 3, O = K4 === -1 ? 3 : 0;
          for (H = 0;H < G.length; H += 2) {
            if (F5 = parseInt(G.substr(H, 2), 16), isNaN(F5))
              throw new Error("String of HEX type contains invalid characters");
            for (W = (H >>> 1) + D, B5 = W >>> 2;L.length <= B5; )
              L.push(0);
            L[B5] |= F5 << 8 * (O + K4 * (W % 4));
          }
          return { value: L, binLen: 4 * G.length + U };
        }(z, Q5, Z, _);
      };
    case "TEXT":
      return function(z, Q5, Z) {
        return function(G, V, U, K4, H) {
          let F5, B5, W, L, D, O, v, N4, S = 0;
          const j = U || [0], P = (K4 = K4 || 0) >>> 3;
          if (V === "UTF8")
            for (v = H === -1 ? 3 : 0, W = 0;W < G.length; W += 1)
              for (F5 = G.charCodeAt(W), B5 = [], 128 > F5 ? B5.push(F5) : 2048 > F5 ? (B5.push(192 | F5 >>> 6), B5.push(128 | 63 & F5)) : 55296 > F5 || 57344 <= F5 ? B5.push(224 | F5 >>> 12, 128 | F5 >>> 6 & 63, 128 | 63 & F5) : (W += 1, F5 = 65536 + ((1023 & F5) << 10 | 1023 & G.charCodeAt(W)), B5.push(240 | F5 >>> 18, 128 | F5 >>> 12 & 63, 128 | F5 >>> 6 & 63, 128 | 63 & F5)), L = 0;L < B5.length; L += 1) {
                for (O = S + P, D = O >>> 2;j.length <= D; )
                  j.push(0);
                j[D] |= B5[L] << 8 * (v + H * (O % 4)), S += 1;
              }
          else
            for (v = H === -1 ? 2 : 0, N4 = V === "UTF16LE" && H !== 1 || V !== "UTF16LE" && H === 1, W = 0;W < G.length; W += 1) {
              for (F5 = G.charCodeAt(W), N4 === true && (L = 255 & F5, F5 = L << 8 | F5 >>> 8), O = S + P, D = O >>> 2;j.length <= D; )
                j.push(0);
              j[D] |= F5 << 8 * (v + H * (O % 4)), S += 2;
            }
          return { value: j, binLen: 8 * S + K4 };
        }(z, q5, Q5, Z, _);
      };
    case "B64":
      return function(z, Q5, Z) {
        return function(G, V, U, K4) {
          let H, F5, B5, W, L, D, O, v = 0;
          const N4 = V || [0], S = (U = U || 0) >>> 3, j = K4 === -1 ? 3 : 0, P = G.indexOf("=");
          if (G.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (G = G.replace(/=/g, ""), P !== -1 && P < G.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (F5 = 0;F5 < G.length; F5 += 4) {
            for (L = G.substr(F5, 4), W = 0, B5 = 0;B5 < L.length; B5 += 1)
              H = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(L.charAt(B5)), W |= H << 18 - 6 * B5;
            for (B5 = 0;B5 < L.length - 1; B5 += 1) {
              for (O = v + S, D = O >>> 2;N4.length <= D; )
                N4.push(0);
              N4[D] |= (W >>> 16 - 8 * B5 & 255) << 8 * (j + K4 * (O % 4)), v += 1;
            }
          }
          return { value: N4, binLen: 8 * v + U };
        }(z, Q5, Z, _);
      };
    case "BYTES":
      return function(z, Q5, Z) {
        return function(G, V, U, K4) {
          let H, F5, B5, W;
          const L = V || [0], D = (U = U || 0) >>> 3, O = K4 === -1 ? 3 : 0;
          for (F5 = 0;F5 < G.length; F5 += 1)
            H = G.charCodeAt(F5), W = F5 + D, B5 = W >>> 2, L.length <= B5 && L.push(0), L[B5] |= H << 8 * (O + K4 * (W % 4));
          return { value: L, binLen: 8 * G.length + U };
        }(z, Q5, Z, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (z) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(z, Q5, Z) {
        return function(G, V, U, K4) {
          return gq5(new Uint8Array(G), V, U, K4);
        }(z, Q5, Z, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (z) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(z, Q5, Z) {
        return gq5(z, Q5, Z, _);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var pq5 = function(J3, q5, _, z) {
  switch (J3) {
    case "HEX":
      return function(Q5) {
        return function(Z, G, V, U) {
          let H, F5, B5 = "";
          const W = G / 8, L = V === -1 ? 3 : 0;
          for (H = 0;H < W; H += 1)
            F5 = Z[H >>> 2] >>> 8 * (L + V * (H % 4)), B5 += "0123456789abcdef".charAt(F5 >>> 4 & 15) + "0123456789abcdef".charAt(15 & F5);
          return U.outputUpper ? B5.toUpperCase() : B5;
        }(Q5, q5, _, z);
      };
    case "B64":
      return function(Q5) {
        return function(Z, G, V, U) {
          let K4, H, F5, B5, W, L = "";
          const D = G / 8, O = V === -1 ? 3 : 0;
          for (K4 = 0;K4 < D; K4 += 3)
            for (B5 = K4 + 1 < D ? Z[K4 + 1 >>> 2] : 0, W = K4 + 2 < D ? Z[K4 + 2 >>> 2] : 0, F5 = (Z[K4 >>> 2] >>> 8 * (O + V * (K4 % 4)) & 255) << 16 | (B5 >>> 8 * (O + V * ((K4 + 1) % 4)) & 255) << 8 | W >>> 8 * (O + V * ((K4 + 2) % 4)) & 255, H = 0;H < 4; H += 1)
              L += 8 * K4 + 6 * H <= G ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(F5 >>> 6 * (3 - H) & 63) : U.b64Pad;
          return L;
        }(Q5, q5, _, z);
      };
    case "BYTES":
      return function(Q5) {
        return function(Z, G, V) {
          let U, K4, H = "";
          const F5 = G / 8, B5 = V === -1 ? 3 : 0;
          for (U = 0;U < F5; U += 1)
            K4 = Z[U >>> 2] >>> 8 * (B5 + V * (U % 4)) & 255, H += String.fromCharCode(K4);
          return H;
        }(Q5, q5, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (Q5) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(Q5) {
        return function(Z, G, V) {
          let U;
          const K4 = G / 8, H = new ArrayBuffer(K4), F5 = new Uint8Array(H), B5 = V === -1 ? 3 : 0;
          for (U = 0;U < K4; U += 1)
            F5[U] = Z[U >>> 2] >>> 8 * (B5 + V * (U % 4)) & 255;
          return H;
        }(Q5, q5, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (Q5) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(Q5) {
        return function(Z, G, V) {
          let U;
          const K4 = G / 8, H = V === -1 ? 3 : 0, F5 = new Uint8Array(K4);
          for (U = 0;U < K4; U += 1)
            F5[U] = Z[U >>> 2] >>> 8 * (H + V * (U % 4)) & 255;
          return F5;
        }(Q5, q5, _);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var E15 = function(J3, q5) {
  let _, z;
  const Q5 = J3.binLen >>> 3, Z = q5.binLen >>> 3, G = Q5 << 3, V = 4 - Q5 << 3;
  if (Q5 % 4 != 0) {
    for (_ = 0;_ < Z; _ += 4)
      z = Q5 + _ >>> 2, J3.value[z] |= q5.value[_ >>> 2] << G, J3.value.push(0), J3.value[z + 1] |= q5.value[_ >>> 2] >>> V;
    return (J3.value.length << 2) - 4 >= Z + Q5 && J3.value.pop(), { value: J3.value, binLen: J3.binLen + q5.binLen };
  }
  return { value: J3.value.concat(q5.value), binLen: J3.binLen + q5.binLen };
};
var cq5 = function(J3) {
  const q5 = { outputUpper: false, b64Pad: "=", outputLen: -1 }, _ = J3 || {};
  if (q5.outputUpper = _.outputUpper || false, _.b64Pad && (q5.b64Pad = _.b64Pad), _.outputLen) {
    if (_.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q5.outputLen = _.outputLen;
  } else if (_.shakeLen) {
    if (_.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q5.outputLen = _.shakeLen;
  }
  if (typeof q5.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof q5.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return q5;
};
var c5 = function(J3, q5, _, z) {
  const Q5 = J3 + " must include a value and format";
  if (!q5) {
    if (!z)
      throw new Error(Q5);
    return z;
  }
  if (q5.value === undefined || !q5.format)
    throw new Error(Q5);
  return _15(q5.format, q5.encoding || "UTF8", _)(q5.value);
};
var J15 = function(J3, q5) {
  return J3 << q5 | J3 >>> 32 - q5;
};
var f6 = function(J3, q5) {
  return J3 >>> q5 | J3 << 32 - q5;
};
var iq5 = function(J3, q5) {
  return J3 >>> q5;
};
var uq5 = function(J3, q5, _) {
  return J3 ^ q5 ^ _;
};
var rq5 = function(J3, q5, _) {
  return J3 & q5 ^ ~J3 & _;
};
var tq5 = function(J3, q5, _) {
  return J3 & q5 ^ J3 & _ ^ q5 & _;
};
var D35 = function(J3) {
  return f6(J3, 2) ^ f6(J3, 13) ^ f6(J3, 22);
};
var $8 = function(J3, q5) {
  const _ = (65535 & J3) + (65535 & q5);
  return (65535 & (J3 >>> 16) + (q5 >>> 16) + (_ >>> 16)) << 16 | 65535 & _;
};
var R35 = function(J3, q5, _, z) {
  const Q5 = (65535 & J3) + (65535 & q5) + (65535 & _) + (65535 & z);
  return (65535 & (J3 >>> 16) + (q5 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q5 >>> 16)) << 16 | 65535 & Q5;
};
var V15 = function(J3, q5, _, z, Q5) {
  const Z = (65535 & J3) + (65535 & q5) + (65535 & _) + (65535 & z) + (65535 & Q5);
  return (65535 & (J3 >>> 16) + (q5 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q5 >>> 16) + (Z >>> 16)) << 16 | 65535 & Z;
};
var O35 = function(J3) {
  return f6(J3, 7) ^ f6(J3, 18) ^ iq5(J3, 3);
};
var A35 = function(J3) {
  return f6(J3, 6) ^ f6(J3, 11) ^ f6(J3, 25);
};
var C35 = function(J3) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var nq5 = function(J3, q5) {
  let _, z, Q5, Z, G, V, U;
  const K4 = [];
  for (_ = q5[0], z = q5[1], Q5 = q5[2], Z = q5[3], G = q5[4], U = 0;U < 80; U += 1)
    K4[U] = U < 16 ? J3[U] : J15(K4[U - 3] ^ K4[U - 8] ^ K4[U - 14] ^ K4[U - 16], 1), V = U < 20 ? V15(J15(_, 5), rq5(z, Q5, Z), G, 1518500249, K4[U]) : U < 40 ? V15(J15(_, 5), uq5(z, Q5, Z), G, 1859775393, K4[U]) : U < 60 ? V15(J15(_, 5), tq5(z, Q5, Z), G, 2400959708, K4[U]) : V15(J15(_, 5), uq5(z, Q5, Z), G, 3395469782, K4[U]), G = Z, Z = Q5, Q5 = J15(z, 30), z = _, _ = V;
  return q5[0] = $8(_, q5[0]), q5[1] = $8(z, q5[1]), q5[2] = $8(Q5, q5[2]), q5[3] = $8(Z, q5[3]), q5[4] = $8(G, q5[4]), q5;
};
var x35 = function(J3, q5, _, z) {
  let Q5;
  const Z = 15 + (q5 + 65 >>> 9 << 4), G = q5 + _;
  for (;J3.length <= Z; )
    J3.push(0);
  for (J3[q5 >>> 5] |= 128 << 24 - q5 % 32, J3[Z] = 4294967295 & G, J3[Z - 1] = G / K15 | 0, Q5 = 0;Q5 < J3.length; Q5 += 16)
    z = nq5(J3.slice(Q5, Q5 + 16), z);
  return z;
};
var hq5 = function(J3) {
  let q5;
  return q5 = J3 == "SHA-224" ? m6.slice() : g5.slice(), q5;
};
var Yq5 = function(J3, q5) {
  let _, z, Q5, Z, G, V, U, K4, H, F5, B5;
  const W = [];
  for (_ = q5[0], z = q5[1], Q5 = q5[2], Z = q5[3], G = q5[4], V = q5[5], U = q5[6], K4 = q5[7], B5 = 0;B5 < 64; B5 += 1)
    W[B5] = B5 < 16 ? J3[B5] : R35(f6(L = W[B5 - 2], 17) ^ f6(L, 19) ^ iq5(L, 10), W[B5 - 7], O35(W[B5 - 15]), W[B5 - 16]), H = V15(K4, A35(G), rq5(G, V, U), M5[B5], W[B5]), F5 = $8(D35(_), tq5(_, z, Q5)), K4 = U, U = V, V = G, G = $8(Z, H), Z = Q5, Q5 = z, z = _, _ = $8(H, F5);
  var L;
  return q5[0] = $8(_, q5[0]), q5[1] = $8(z, q5[1]), q5[2] = $8(Q5, q5[2]), q5[3] = $8(Z, q5[3]), q5[4] = $8(G, q5[4]), q5[5] = $8(V, q5[5]), q5[6] = $8(U, q5[6]), q5[7] = $8(K4, q5[7]), q5;
};
var dq5 = function(J3, q5) {
  let _;
  return q5 > 32 ? (_ = 64 - q5, new X5(J3.I << q5 | J3.N >>> _, J3.N << q5 | J3.I >>> _)) : q5 !== 0 ? (_ = 32 - q5, new X5(J3.N << q5 | J3.I >>> _, J3.I << q5 | J3.N >>> _)) : J3;
};
var w8 = function(J3, q5) {
  let _;
  return q5 < 32 ? (_ = 32 - q5, new X5(J3.N >>> q5 | J3.I << _, J3.I >>> q5 | J3.N << _)) : (_ = 64 - q5, new X5(J3.I >>> q5 | J3.N << _, J3.N >>> q5 | J3.I << _));
};
var eq5 = function(J3, q5) {
  return new X5(J3.N >>> q5, J3.I >>> q5 | J3.N << 32 - q5);
};
var j35 = function(J3, q5, _) {
  return new X5(J3.N & q5.N ^ J3.N & _.N ^ q5.N & _.N, J3.I & q5.I ^ J3.I & _.I ^ q5.I & _.I);
};
var k35 = function(J3) {
  const q5 = w8(J3, 28), _ = w8(J3, 34), z = w8(J3, 39);
  return new X5(q5.N ^ _.N ^ z.N, q5.I ^ _.I ^ z.I);
};
var E6 = function(J3, q5) {
  let _, z;
  _ = (65535 & J3.I) + (65535 & q5.I), z = (J3.I >>> 16) + (q5.I >>> 16) + (_ >>> 16);
  const Q5 = (65535 & z) << 16 | 65535 & _;
  return _ = (65535 & J3.N) + (65535 & q5.N) + (z >>> 16), z = (J3.N >>> 16) + (q5.N >>> 16) + (_ >>> 16), new X5((65535 & z) << 16 | 65535 & _, Q5);
};
var I35 = function(J3, q5, _, z) {
  let Q5, Z;
  Q5 = (65535 & J3.I) + (65535 & q5.I) + (65535 & _.I) + (65535 & z.I), Z = (J3.I >>> 16) + (q5.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q5 >>> 16);
  const G = (65535 & Z) << 16 | 65535 & Q5;
  return Q5 = (65535 & J3.N) + (65535 & q5.N) + (65535 & _.N) + (65535 & z.N) + (Z >>> 16), Z = (J3.N >>> 16) + (q5.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q5 >>> 16), new X5((65535 & Z) << 16 | 65535 & Q5, G);
};
var v35 = function(J3, q5, _, z, Q5) {
  let Z, G;
  Z = (65535 & J3.I) + (65535 & q5.I) + (65535 & _.I) + (65535 & z.I) + (65535 & Q5.I), G = (J3.I >>> 16) + (q5.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q5.I >>> 16) + (Z >>> 16);
  const V = (65535 & G) << 16 | 65535 & Z;
  return Z = (65535 & J3.N) + (65535 & q5.N) + (65535 & _.N) + (65535 & z.N) + (65535 & Q5.N) + (G >>> 16), G = (J3.N >>> 16) + (q5.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q5.N >>> 16) + (Z >>> 16), new X5((65535 & G) << 16 | 65535 & Z, V);
};
var B15 = function(J3, q5) {
  return new X5(J3.N ^ q5.N, J3.I ^ q5.I);
};
var S35 = function(J3) {
  const q5 = w8(J3, 19), _ = w8(J3, 61), z = eq5(J3, 6);
  return new X5(q5.N ^ _.N ^ z.N, q5.I ^ _.I ^ z.I);
};
var $35 = function(J3) {
  const q5 = w8(J3, 1), _ = w8(J3, 8), z = eq5(J3, 7);
  return new X5(q5.N ^ _.N ^ z.N, q5.I ^ _.I ^ z.I);
};
var P35 = function(J3) {
  const q5 = w8(J3, 14), _ = w8(J3, 18), z = w8(J3, 41);
  return new X5(q5.N ^ _.N ^ z.N, q5.I ^ _.I ^ z.I);
};
var lq5 = function(J3) {
  return J3 === "SHA-384" ? [new X5(3418070365, m6[0]), new X5(1654270250, m6[1]), new X5(2438529370, m6[2]), new X5(355462360, m6[3]), new X5(1731405415, m6[4]), new X5(41048885895, m6[5]), new X5(3675008525, m6[6]), new X5(1203062813, m6[7])] : [new X5(g5[0], 4089235720), new X5(g5[1], 2227873595), new X5(g5[2], 4271175723), new X5(g5[3], 1595750129), new X5(g5[4], 2917565137), new X5(g5[5], 725511199), new X5(g5[6], 4215389547), new X5(g5[7], 327033209)];
};
var oq5 = function(J3, q5) {
  let _, z, Q5, Z, G, V, U, K4, H, F5, B5, W;
  const L = [];
  for (_ = q5[0], z = q5[1], Q5 = q5[2], Z = q5[3], G = q5[4], V = q5[5], U = q5[6], K4 = q5[7], B5 = 0;B5 < 80; B5 += 1)
    B5 < 16 ? (W = 2 * B5, L[B5] = new X5(J3[W], J3[W + 1])) : L[B5] = I35(S35(L[B5 - 2]), L[B5 - 7], $35(L[B5 - 15]), L[B5 - 16]), H = v35(K4, P35(G), (O = V, v = U, new X5((D = G).N & O.N ^ ~D.N & v.N, D.I & O.I ^ ~D.I & v.I)), b35[B5], L[B5]), F5 = E6(k35(_), j35(_, z, Q5)), K4 = U, U = V, V = G, G = E6(Z, H), Z = Q5, Q5 = z, z = _, _ = E6(H, F5);
  var D, O, v;
  return q5[0] = E6(_, q5[0]), q5[1] = E6(z, q5[1]), q5[2] = E6(Q5, q5[2]), q5[3] = E6(Z, q5[3]), q5[4] = E6(G, q5[4]), q5[5] = E6(V, q5[5]), q5[6] = E6(U, q5[6]), q5[7] = E6(K4, q5[7]), q5;
};
var J05 = function(J3) {
  let q5;
  const _ = [];
  for (q5 = 0;q5 < 5; q5 += 1)
    _[q5] = [new X5(0, 0), new X5(0, 0), new X5(0, 0), new X5(0, 0), new X5(0, 0)];
  return _;
};
var y35 = function(J3) {
  let q5;
  const _ = [];
  for (q5 = 0;q5 < 5; q5 += 1)
    _[q5] = J3[q5].slice();
  return _;
};
var b15 = function(J3, q5) {
  let _, z, Q5, Z;
  const G = [], V = [];
  if (J3 !== null)
    for (z = 0;z < J3.length; z += 2)
      q5[(z >>> 1) % 5][(z >>> 1) / 5 | 0] = B15(q5[(z >>> 1) % 5][(z >>> 1) / 5 | 0], new X5(J3[z + 1], J3[z]));
  for (_ = 0;_ < 24; _ += 1) {
    for (Z = J05(), z = 0;z < 5; z += 1)
      G[z] = (U = q5[z][0], K4 = q5[z][1], H = q5[z][2], F5 = q5[z][3], B5 = q5[z][4], new X5(U.N ^ K4.N ^ H.N ^ F5.N ^ B5.N, U.I ^ K4.I ^ H.I ^ F5.I ^ B5.I));
    for (z = 0;z < 5; z += 1)
      V[z] = B15(G[(z + 4) % 5], dq5(G[(z + 1) % 5], 1));
    for (z = 0;z < 5; z += 1)
      for (Q5 = 0;Q5 < 5; Q5 += 1)
        q5[z][Q5] = B15(q5[z][Q5], V[z]);
    for (z = 0;z < 5; z += 1)
      for (Q5 = 0;Q5 < 5; Q5 += 1)
        Z[Q5][(2 * z + 3 * Q5) % 5] = dq5(q5[z][Q5], w35[z][Q5]);
    for (z = 0;z < 5; z += 1)
      for (Q5 = 0;Q5 < 5; Q5 += 1)
        q5[z][Q5] = B15(Z[z][Q5], new X5(~Z[(z + 1) % 5][Q5].N & Z[(z + 2) % 5][Q5].N, ~Z[(z + 1) % 5][Q5].I & Z[(z + 2) % 5][Q5].I));
    q5[0][0] = B15(q5[0][0], f35[_]);
  }
  var U, K4, H, F5, B5;
  return q5;
};
var qJ5 = function(J3) {
  let q5, _, z = 0;
  const Q5 = [0, 0], Z = [4294967295 & J3, J3 / K15 & 2097151];
  for (q5 = 6;q5 >= 0; q5--)
    _ = Z[q5 >> 2] >>> 8 * q5 & 255, _ === 0 && z === 0 || (Q5[z + 1 >> 2] |= _ << 8 * (z + 1), z += 1);
  return z = z !== 0 ? z : 1, Q5[0] |= z, { value: z + 1 > 4 ? Q5 : [Q5[0]], binLen: 8 + 8 * z };
};
var q05 = function(J3) {
  return E15(qJ5(J3.binLen), J3);
};
var aq5 = function(J3, q5) {
  let _, z = qJ5(q5);
  z = E15(z, J3);
  const Q5 = q5 >>> 2, Z = (Q5 - z.value.length % Q5) % Q5;
  for (_ = 0;_ < Z; _++)
    z.value.push(0);
  return z.value;
};
var K15 = 4294967296;
var M5 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var m6 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var g5 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var H15 = "Chosen SHA variant is not supported";
var sq5 = "Cannot set numRounds with MAC";

class L15 {
  constructor(J3, q5, _) {
    const z = _ || {};
    if (this.t = q5, this.i = z.encoding || "UTF8", this.numRounds = z.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = J3, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(J3) {
    let q5, _ = 0;
    const z = this.m >>> 5, Q5 = this.C(J3, this.h, this.u), Z = Q5.binLen, G = Q5.value, V = Z >>> 5;
    for (q5 = 0;q5 < V; q5 += z)
      _ + this.m <= Z && (this.U = this.v(G.slice(q5, q5 + z), this.U), _ += this.m);
    return this.A += _, this.h = G.slice(_ >>> 5), this.u = Z % this.m, this.l = true, this;
  }
  getHash(J3, q5) {
    let _, z, Q5 = this.R;
    const Z = cq5(q5);
    if (this.K) {
      if (Z.outputLen === -1)
        throw new Error("Output length must be specified in options");
      Q5 = Z.outputLen;
    }
    const G = pq5(J3, Q5, this.T, Z);
    if (this.H && this.g)
      return G(this.g(Z));
    for (z = this.F(this.h.slice(), this.u, this.A, this.L(this.U), Q5), _ = 1;_ < this.numRounds; _ += 1)
      this.K && Q5 % 32 != 0 && (z[z.length - 1] &= 16777215 >>> 24 - Q5 % 32), z = this.F(z, Q5, 0, this.B(this.o), Q5);
    return G(z);
  }
  setHMACKey(J3, q5, _) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    const z = _15(q5, (_ || {}).encoding || "UTF8", this.T);
    this.k(z(J3));
  }
  k(J3) {
    const q5 = this.m >>> 3, _ = q5 / 4 - 1;
    let z;
    if (this.numRounds !== 1)
      throw new Error(sq5);
    if (this.H)
      throw new Error("MAC key already set");
    for (q5 < J3.binLen / 8 && (J3.value = this.F(J3.value, J3.binLen, 0, this.B(this.o), this.R));J3.value.length <= _; )
      J3.value.push(0);
    for (z = 0;z <= _; z += 1)
      this.S[z] = 909522486 ^ J3.value[z], this.p[z] = 1549556828 ^ J3.value[z];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(J3, q5) {
    const _ = cq5(q5);
    return pq5(J3, this.R, this.T, _)(this.Y());
  }
  Y() {
    let J3;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    const q5 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return J3 = this.v(this.p, this.B(this.o)), J3 = this.F(q5, this.R, this.m, J3, this.R), J3;
  }
}
var T35 = class extends L15 {
  constructor(J3, q5, _) {
    if (J3 !== "SHA-1")
      throw new Error(H15);
    super(J3, q5, _);
    const z = _ || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = _15(this.t, this.i, this.T), this.v = nq5, this.L = function(Q5) {
      return Q5.slice();
    }, this.B = C35, this.F = x35, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, z.hmacKey && this.k(c5("hmacKey", z.hmacKey, this.T));
  }
};
var N35 = class extends L15 {
  constructor(J3, q5, _) {
    if (J3 !== "SHA-224" && J3 !== "SHA-256")
      throw new Error(H15);
    super(J3, q5, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _15(this.t, this.i, this.T), this.v = Yq5, this.L = function(Q5) {
      return Q5.slice();
    }, this.B = hq5, this.F = function(Q5, Z, G, V) {
      return function(U, K4, H, F5, B5) {
        let W, L;
        const D = 15 + (K4 + 65 >>> 9 << 4), O = K4 + H;
        for (;U.length <= D; )
          U.push(0);
        for (U[K4 >>> 5] |= 128 << 24 - K4 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K15 | 0, W = 0;W < U.length; W += 16)
          F5 = Yq5(U.slice(W, W + 16), F5);
        return L = B5 === "SHA-224" ? [F5[0], F5[1], F5[2], F5[3], F5[4], F5[5], F5[6]] : F5, L;
      }(Q5, Z, G, V, J3);
    }, this.U = hq5(J3), this.m = 512, this.R = J3 === "SHA-224" ? 224 : 256, this.K = false, z.hmacKey && this.k(c5("hmacKey", z.hmacKey, this.T));
  }
};

class X5 {
  constructor(J3, q5) {
    this.N = J3, this.I = q5;
  }
}
var b35 = [new X5(M5[0], 3609767458), new X5(M5[1], 602891725), new X5(M5[2], 3964484399), new X5(M5[3], 2173295548), new X5(M5[4], 4081628472), new X5(M5[5], 3053834265), new X5(M5[6], 2937671579), new X5(M5[7], 3664609560), new X5(M5[8], 2734883394), new X5(M5[9], 1164996542), new X5(M5[10], 1323610764), new X5(M5[11], 3590304994), new X5(M5[12], 4068182383), new X5(M5[13], 991336113), new X5(M5[14], 633803317), new X5(M5[15], 3479774868), new X5(M5[16], 2666613458), new X5(M5[17], 944711139), new X5(M5[18], 2341262773), new X5(M5[19], 2007800933), new X5(M5[20], 1495990901), new X5(M5[21], 1856431235), new X5(M5[22], 3175218132), new X5(M5[23], 2198950837), new X5(M5[24], 3999719339), new X5(M5[25], 766784016), new X5(M5[26], 2566594879), new X5(M5[27], 3203337956), new X5(M5[28], 1034457026), new X5(M5[29], 2466948901), new X5(M5[30], 3758326383), new X5(M5[31], 168717936), new X5(M5[32], 1188179964), new X5(M5[33], 1546045734), new X5(M5[34], 1522805485), new X5(M5[35], 2643833823), new X5(M5[36], 2343527390), new X5(M5[37], 1014477480), new X5(M5[38], 1206759142), new X5(M5[39], 344077627), new X5(M5[40], 1290863460), new X5(M5[41], 3158454273), new X5(M5[42], 3505952657), new X5(M5[43], 106217008), new X5(M5[44], 3606008344), new X5(M5[45], 1432725776), new X5(M5[46], 1467031594), new X5(M5[47], 851169720), new X5(M5[48], 3100823752), new X5(M5[49], 1363258195), new X5(M5[50], 3750685593), new X5(M5[51], 3785050280), new X5(M5[52], 3318307427), new X5(M5[53], 3812723403), new X5(M5[54], 2003034995), new X5(M5[55], 3602036899), new X5(M5[56], 1575990012), new X5(M5[57], 1125592928), new X5(M5[58], 2716904306), new X5(M5[59], 442776044), new X5(M5[60], 593698344), new X5(M5[61], 3733110249), new X5(M5[62], 2999351573), new X5(M5[63], 3815920427), new X5(3391569614, 3928383900), new X5(3515267271, 566280711), new X5(3940187606, 3454069534), new X5(4118630271, 4000239992), new X5(116418474, 1914138554), new X5(174292421, 2731055270), new X5(289380356, 3203993006), new X5(460393269, 320620315), new X5(685471733, 587496836), new X5(852142971, 1086792851), new X5(1017036298, 365543100), new X5(1126000580, 2618297676), new X5(1288033470, 3409855158), new X5(1501505948, 4234509866), new X5(1607167915, 987167468), new X5(1816402316, 1246189591)];
var E35 = class extends L15 {
  constructor(J3, q5, _) {
    if (J3 !== "SHA-384" && J3 !== "SHA-512")
      throw new Error(H15);
    super(J3, q5, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _15(this.t, this.i, this.T), this.v = oq5, this.L = function(Q5) {
      return Q5.slice();
    }, this.B = lq5, this.F = function(Q5, Z, G, V) {
      return function(U, K4, H, F5, B5) {
        let W, L;
        const D = 31 + (K4 + 129 >>> 10 << 5), O = K4 + H;
        for (;U.length <= D; )
          U.push(0);
        for (U[K4 >>> 5] |= 128 << 24 - K4 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K15 | 0, W = 0;W < U.length; W += 32)
          F5 = oq5(U.slice(W, W + 32), F5);
        return L = B5 === "SHA-384" ? [F5[0].N, F5[0].I, F5[1].N, F5[1].I, F5[2].N, F5[2].I, F5[3].N, F5[3].I, F5[4].N, F5[4].I, F5[5].N, F5[5].I] : [F5[0].N, F5[0].I, F5[1].N, F5[1].I, F5[2].N, F5[2].I, F5[3].N, F5[3].I, F5[4].N, F5[4].I, F5[5].N, F5[5].I, F5[6].N, F5[6].I, F5[7].N, F5[7].I], L;
      }(Q5, Z, G, V, J3);
    }, this.U = lq5(J3), this.m = 1024, this.R = J3 === "SHA-384" ? 384 : 512, this.K = false, z.hmacKey && this.k(c5("hmacKey", z.hmacKey, this.T));
  }
};
var f35 = [new X5(0, 1), new X5(0, 32898), new X5(2147483648, 32906), new X5(2147483648, 2147516416), new X5(0, 32907), new X5(0, 2147483649), new X5(2147483648, 2147516545), new X5(2147483648, 32777), new X5(0, 138), new X5(0, 136), new X5(0, 2147516425), new X5(0, 2147483658), new X5(0, 2147516555), new X5(2147483648, 139), new X5(2147483648, 32905), new X5(2147483648, 32771), new X5(2147483648, 32770), new X5(2147483648, 128), new X5(0, 32778), new X5(2147483648, 2147483658), new X5(2147483648, 2147516545), new X5(2147483648, 32896), new X5(0, 2147483649), new X5(2147483648, 2147516424)];
var w35 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var m35 = class extends L15 {
  constructor(J3, q5, _) {
    let z = 6, Q5 = 0;
    super(J3, q5, _);
    const Z = _ || {};
    if (this.numRounds !== 1) {
      if (Z.kmacKey || Z.hmacKey)
        throw new Error(sq5);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = _15(this.t, this.i, this.T), this.v = b15, this.L = y35, this.B = J05, this.U = J05(), this.K = false, J3) {
      case "SHA3-224":
        this.m = Q5 = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = Q5 = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = Q5 = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = Q5 = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        z = 31, this.m = Q5 = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        z = 31, this.m = Q5 = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        z = 4, this.m = Q5 = 1344, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        z = 4, this.m = Q5 = 1088, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = Q5 = 1344, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = Q5 = 1088, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(H15);
    }
    this.F = function(G, V, U, K4, H) {
      return function(F5, B5, W, L, D, O, v) {
        let N4, S, j = 0;
        const P = [], W1 = D >>> 5, _J = B5 >>> 5;
        for (N4 = 0;N4 < _J && B5 >= D; N4 += W1)
          L = b15(F5.slice(N4, N4 + W1), L), B5 -= D;
        for (F5 = F5.slice(N4), B5 %= D;F5.length < W1; )
          F5.push(0);
        for (N4 = B5 >>> 3, F5[N4 >> 2] ^= O << N4 % 4 * 8, F5[W1 - 1] ^= 2147483648, L = b15(F5, L);32 * P.length < v && (S = L[j % 5][j / 5 | 0], P.push(S.I), !(32 * P.length >= v)); )
          P.push(S.N), j += 1, 64 * j % D == 0 && (b15(null, L), j = 0);
        return P;
      }(G, V, 0, K4, Q5, z, H);
    }, Z.hmacKey && this.k(c5("hmacKey", Z.hmacKey, this.T));
  }
  O(J3, q5) {
    const _ = function(Q5) {
      const Z = Q5 || {};
      return { funcName: c5("funcName", Z.funcName, 1, { value: [], binLen: 0 }), customization: c5("Customization", Z.customization, 1, { value: [], binLen: 0 }) };
    }(J3 || {});
    q5 && (_.funcName = q5);
    const z = E15(q05(_.funcName), q05(_.customization));
    if (_.customization.binLen !== 0 || _.funcName.binLen !== 0) {
      const Q5 = aq5(z, this.m >>> 3);
      for (let Z = 0;Z < Q5.length; Z += this.m >>> 5)
        this.U = this.v(Q5.slice(Z, Z + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(J3) {
    const q5 = function(z) {
      const Q5 = z || {};
      return { kmacKey: c5("kmacKey", Q5.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: c5("Customization", Q5.customization, 1, { value: [], binLen: 0 }) };
    }(J3 || {});
    this.O(J3, q5.funcName);
    const _ = aq5(q05(q5.kmacKey), this.m >>> 3);
    for (let z = 0;z < _.length; z += this.m >>> 5)
      this.U = this.v(_.slice(z, z + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(J3) {
    const q5 = E15({ value: this.h.slice(), binLen: this.u }, function(_) {
      let z, Q5, Z = 0;
      const G = [0, 0], V = [4294967295 & _, _ / K15 & 2097151];
      for (z = 6;z >= 0; z--)
        Q5 = V[z >> 2] >>> 8 * z & 255, Q5 === 0 && Z === 0 || (G[Z >> 2] |= Q5 << 8 * Z, Z += 1);
      return Z = Z !== 0 ? Z : 1, G[Z >> 2] |= Z << 8 * Z, { value: Z + 1 > 4 ? G : [G[0]], binLen: 8 + 8 * Z };
    }(J3.outputLen));
    return this.F(q5.value, q5.binLen, this.A, this.L(this.U), J3.outputLen);
  }
};

class _05 {
  constructor(J3, q5, _) {
    if (J3 == "SHA-1")
      this.P = new T35(J3, q5, _);
    else if (J3 == "SHA-224" || J3 == "SHA-256")
      this.P = new N35(J3, q5, _);
    else if (J3 == "SHA-384" || J3 == "SHA-512")
      this.P = new E35(J3, q5, _);
    else {
      if (J3 != "SHA3-224" && J3 != "SHA3-256" && J3 != "SHA3-384" && J3 != "SHA3-512" && J3 != "SHAKE128" && J3 != "SHAKE256" && J3 != "CSHAKE128" && J3 != "CSHAKE256" && J3 != "KMAC128" && J3 != "KMAC256")
        throw new Error(H15);
      this.P = new m35(J3, q5, _);
    }
  }
  update(J3) {
    return this.P.update(J3), this;
  }
  getHash(J3, q5) {
    return this.P.getHash(J3, q5);
  }
  setHMACKey(J3, q5, _) {
    this.P.setHMACKey(J3, q5, _);
  }
  getHMAC(J3, q5) {
    return this.P.getHMAC(J3, q5);
  }
}
var f15 = function(J3, q5, _ = 0) {
  const z = z05.default({ ...J3, signature: undefined }), Q5 = q5.noTimeWindow ? 0 : Math.floor(Date.now() / (q5.timeWindow ?? JJ5)) + _;
  return new _05("SHA-256", "TEXT", { encoding: "UTF8" }).update(z).update(z05.default(q5)).update(`${Q5}`).getHash("B64");
};
function x55(J3, q5) {
  return (q5.noTimeWindow ? 0 : q5.timeWindow ?? JJ5) ? J3.signature === f15(J3, q5) || J3.signature === f15(J3, q5, -1) : J3.signature === f15(J3, q5);
}
var JJ5 = 5000;

// ../src/core/Processor.ts
class Processor5 {
  sendUpdate;
  #observerManager = new ObserverManager2;
  constructor(sendUpdate) {
    this.sendUpdate = sendUpdate;
  }
  observe(paths) {
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    return this.#observerManager.observe(pathArray, multi);
  }
  removeObserver(observer) {
    this.#observerManager.removeObserver(observer);
  }
  performCycle(context) {
    this.sendUpdateBlob(context);
    const updates = commitUpdates3(context.root, context.properties);
    this.#observerManager.triggerObservers(context, updates);
    return updates;
  }
  sendUpdateBlob(context) {
    if (context.outgoingUpdates?.length) {
      context.outgoingUpdates.forEach((update) => {
        update.path = this.#fixPath(update.path, context);
        const previous = getLeafObject3(context.root, update.path.split("/"), 0, false);
        update.value = typeof update.value === "function" ? update.value(previous) : update.value;
      });
      const confirmedUpdates = context.outgoingUpdates.filter(({ confirmed }) => confirmed).map((update) => ({ ...update }));
      this.#addIncomingUpdates(confirmedUpdates, context);
      const blobs = {};
      context.outgoingUpdates.forEach((update) => update.value = gn3(update.value, blobs));
      this.sendUpdate(packageUpdates3(context.outgoingUpdates, blobs, context.secret), context);
    }
    context.outgoingUpdates.length = 0;
  }
  async receivedBlob(data, context) {
    const { payload, blobs } = data instanceof Blob ? await receiveBlob3(data) : { payload: typeof data === "string" ? JSON.parse(data) : data, blobs: {} };
    const secret = context.secret ?? payload.secret;
    if (secret) {
      if (!context.skipValidation && !x55(payload, { secret })) {
        console.error("Invalid signature", payload);
        return;
      }
      context.secret = secret;
    }
    const hasBlobs = blobs && Object.keys(blobs).length > 0;
    if (payload?.globalTime) {
      context.localTimeOffset = payload.globalTime - Date.now();
    }
    if (payload?.myClientId) {
      context.clientId = payload.myClientId;
    }
    if (payload?.updates) {
      if (hasBlobs) {
        payload.updates.forEach((update) => {
          update.value = un4(update.value, blobs);
        });
      }
      this.#addIncomingUpdates(payload.updates, context);
    }
  }
  #addIncomingUpdates(updates, context) {
    context.root.updates = context.root.updates ?? [];
    context.root.updates.push(...updates);
  }
  #fixPath(path, context) {
    const split = path.split("/");
    return split.map((part) => translateValue3(part, {
      self: context.clientId
    })).join("/");
  }
}
// ../src/cycle/context/Context.ts
function createContext(root, properties = {}) {
  return {
    root,
    properties,
    outgoingUpdates: []
  };
}
// src/index.ts
var root = {};
var context = createContext(root);
function refreshData() {
  const div = document.querySelector("#log-div") ?? document.body.appendChild(document.createElement("div"));
  div.id = "log-div";
  div.style.whiteSpace = "pre";
  div.style.fontFamily = "monospace";
  div.style.fontSize = "20px";
  div.textContent = JSON.stringify(root, null, 2);
  const div2 = document.querySelector("#log-div2") ?? document.body.appendChild(document.createElement("div"));
  div2.id = "log-div2";
  div2.style.whiteSpace = "pre";
  div2.style.fontFamily = "monospace";
  div2.style.fontSize = "12px";
  div2.textContent = JSON.stringify(context.outgoingUpdates, null, 2);
}
var socketClient = provideSocketClient({ host: location.host }, root);
displayUsers(socketClient);
var processor = new Processor5((blob) => {
  console.log("Updates sent out", blob);
});
processor.observe().onChange(refreshData);
function cycle() {
  processor.performCycle(context);
}
function setupGamePlayer() {
  {
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "⏯️";
    button.addEventListener("click", cycle);
  }
  {
    const button = document.body.appendChild(document.createElement("button"));
    button.textContent = "\uD83D\uDD04";
    button.addEventListener("click", () => {
      context.outgoingUpdates = context.outgoingUpdates ?? [];
      context.outgoingUpdates.push({ path: "abc", value: Math.random(), confirmed: 1 });
      refreshData();
    });
  }
}
setupGamePlayer();
export {
  socketClient,
  root
};

//# debugId=46932F942CDCF1BC64756E2164756E21

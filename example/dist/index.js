// node_modules/@dobuki/syncopath/dist/index.js
var KEYS = "~{keys}";
var VALUES = "~{values}";
function commitUpdates(root, properties, updatedPaths) {
  if (!root) {
    return;
  }
  sortUpdates(root.updates);
  root.updates?.forEach((update) => {
    if (!update.confirmed) {
      return;
    }
    saveBlobsFromUpdate(root, update);
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
    updatedPaths?.add(update.path);
  });
  if (root.updates) {
    for (let i = root.updates.length - 1;i >= 0; i--) {
      if (root.updates[i].confirmed) {
        root.updates[i] = root.updates[root.updates.length - 1];
        root.updates.pop();
      }
    }
    if (!root.updates.length) {
      delete root.updates;
    }
  }
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
var REGEX = /~\{([^}]+)\}/;
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
        const group = prop.match(REGEX);
        if (group) {
          value = properties[group[1]];
        } else {
          value = obj[prop];
        }
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
function saveBlobsFromUpdate(data, update) {
  Object.entries(update.blobs ?? {}).forEach(([key, blob]) => {
    const blobs = data.blobs ?? (data.blobs = {});
    blobs[key] = blob;
  });
}

class A {
  data = [];
  #n = new TextEncoder;
  static payload(n, h) {
    return new A().payload(n, h);
  }
  static blob(n, h) {
    return new A().blob(n, h);
  }
  #h(n) {
    let h = this.#n.encode(n), c = new Uint8Array([h.byteLength]);
    this.data.push(c.buffer), this.data.push(h.buffer);
  }
  payload(n, h) {
    this.#h(n);
    let c = new Uint8Array([1]);
    this.data.push(c.buffer);
    let t = JSON.stringify(h), i = this.#n.encode(t), w = new Uint32Array([i.byteLength]);
    return this.data.push(w.buffer), this.data.push(i.buffer), this;
  }
  blob(n, h) {
    this.#h(n);
    let c = new Uint8Array([2]);
    this.data.push(c.buffer);
    let t = new Uint32Array([h.size]);
    return this.data.push(t.buffer), this.data.push(h), this;
  }
  build() {
    return new Blob(this.data);
  }
}
var J = new TextDecoder;
function G(n, h) {
  let [c, t] = T(n, h);
  return [J.decode(new Uint8Array(n, t, c)), t + c];
}
function H(n, h) {
  let [c, t] = E(n, h);
  return [J.decode(new Uint8Array(n, t, c)), t + c];
}
function I(n, h) {
  let [c, t] = E(n, h);
  return [new Blob([new Uint8Array(n, t, c)], { type: "application/octet-stream" }), t + c];
}
function E(n, h) {
  return [new Uint32Array(n.slice(h, h + Uint32Array.BYTES_PER_ELEMENT), 0, 1)[0], h + Uint32Array.BYTES_PER_ELEMENT];
}
function T(n, h) {
  return [new Uint8Array(n, h, 1)[0], h + Uint8Array.BYTES_PER_ELEMENT];
}
async function W(n) {
  let h = {}, c = 0, t;
  while (c < n.size) {
    t = t ?? await n.arrayBuffer();
    let [i, w] = G(t, c);
    c = w;
    let [j, K] = T(t, c);
    switch (c = K, j) {
      case 1:
        try {
          let [m, C] = H(t, c);
          c = C, h[i] = JSON.parse(m);
        } catch (m) {
          console.warn("Failed to parse JSON payload", m);
        }
        break;
      case 2:
        let [g, q] = I(t, c);
        c = q, h[i] = g;
        break;
    }
  }
  return h;
}
async function N(n, h, c = () => globalThis.crypto.randomUUID()) {
  if (typeof n === "string" && n.startsWith("blob:")) {
    let t = await fetch(n).then((w) => w.blob());
    URL.revokeObjectURL(n);
    let i = `{blobUrl:${c()}}`;
    return h[i] = t, i;
  }
  if (typeof n === "object" && n instanceof Blob) {
    let t = `{blob:${c()}}`;
    return h[t] = n, t;
  }
  if (Array.isArray(n))
    await Promise.all(n.map(async (t, i) => {
      n[i] = await N(t, h, c);
    }));
  else if (typeof n === "object" && n)
    await Promise.all(Object.entries(n).map(async ([t, i]) => {
      n[t] = await N(i, h, c);
    }));
  return n;
}
function addMessageReceiver(socket, payloadReceived) {
  socket.on("message", async (message) => {
    if (message instanceof Buffer) {
      const blob = new Blob([message]);
      const { payload, ...blobs } = await W(blob);
      if (payload) {
        payloadReceived(payload, blobs);
      }
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
    case "blobs":
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
var zJ = Object.create;
var { defineProperty: Q0, getPrototypeOf: QJ, getOwnPropertyNames: ZJ } = Object;
var UJ = Object.prototype.hasOwnProperty;
var XJ = (J2, q, _) => {
  _ = J2 != null ? zJ(QJ(J2)) : {};
  const z = q || !J2 || !J2.__esModule ? Q0(_, "default", { value: J2, enumerable: true }) : _;
  for (let Q of ZJ(J2))
    if (!UJ.call(z, Q))
      Q0(z, Q, { get: () => J2[Q], enumerable: true });
  return z;
};
var T2 = (J2, q) => () => (q || J2((q = { exports: {} }).exports, q), q.exports);
var F0 = T2((p3, G0) => {
  var p = function(J2) {
    throw { name: "SyntaxError", message: J2, at: M1, text: w1 };
  }, x = function(J2) {
    if (J2 && J2 !== R)
      p("Expected '" + J2 + "' instead of '" + R + "'");
    return R = w1.charAt(M1), M1 += 1, R;
  }, U0 = function() {
    var J2, q = "";
    if (R === "-")
      q = "-", x("-");
    while (R >= "0" && R <= "9")
      q += R, x();
    if (R === ".") {
      q += ".";
      while (x() && R >= "0" && R <= "9")
        q += R;
    }
    if (R === "e" || R === "E") {
      if (q += R, x(), R === "-" || R === "+")
        q += R, x();
      while (R >= "0" && R <= "9")
        q += R, x();
    }
    if (J2 = Number(q), !isFinite(J2))
      p("Bad number");
    return J2;
  }, X0 = function() {
    var J2, q, _ = "", z;
    if (R === '"')
      while (x())
        if (R === '"')
          return x(), _;
        else if (R === "\\")
          if (x(), R === "u") {
            z = 0;
            for (q = 0;q < 4; q += 1) {
              if (J2 = parseInt(x(), 16), !isFinite(J2))
                break;
              z = z * 16 + J2;
            }
            _ += String.fromCharCode(z);
          } else if (typeof Z0[R] === "string")
            _ += Z0[R];
          else
            break;
        else
          _ += R;
    p("Bad string");
  }, y = function() {
    while (R && R <= " ")
      x();
  }, GJ = function() {
    switch (R) {
      case "t":
        return x("t"), x("r"), x("u"), x("e"), true;
      case "f":
        return x("f"), x("a"), x("l"), x("s"), x("e"), false;
      case "n":
        return x("n"), x("u"), x("l"), x("l"), null;
      default:
        p("Unexpected '" + R + "'");
    }
  }, FJ = function() {
    var J2 = [];
    if (R === "[") {
      if (x("["), y(), R === "]")
        return x("]"), J2;
      while (R) {
        if (J2.push(D1()), y(), R === "]")
          return x("]"), J2;
        x(","), y();
      }
    }
    p("Bad array");
  }, BJ = function() {
    var J2, q = {};
    if (R === "{") {
      if (x("{"), y(), R === "}")
        return x("}"), q;
      while (R) {
        if (J2 = X0(), y(), x(":"), Object.prototype.hasOwnProperty.call(q, J2))
          p('Duplicate key "' + J2 + '"');
        if (q[J2] = D1(), y(), R === "}")
          return x("}"), q;
        x(","), y();
      }
    }
    p("Bad object");
  }, D1 = function() {
    switch (y(), R) {
      case "{":
        return BJ();
      case "[":
        return FJ();
      case '"':
        return X0();
      case "-":
        return U0();
      default:
        return R >= "0" && R <= "9" ? U0() : GJ();
    }
  }, M1, R, Z0 = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, w1;
  G0.exports = function(J2, q) {
    var _;
    if (w1 = J2, M1 = 0, R = " ", _ = D1(), y(), R)
      p("Syntax error");
    return typeof q === "function" ? function z(Q, Z) {
      var G2, V, U = Q[Z];
      if (U && typeof U === "object") {
        for (G2 in D1)
          if (Object.prototype.hasOwnProperty.call(U, G2))
            if (V = z(U, G2), typeof V === "undefined")
              delete U[G2];
            else
              U[G2] = V;
      }
      return q.call(Q, Z, U);
    }({ "": _ }, "") : _;
  };
});
var V0 = T2((c3, B0) => {
  var m1 = function(J2) {
    return y1.lastIndex = 0, y1.test(J2) ? '"' + J2.replace(y1, function(q) {
      var _ = VJ[q];
      return typeof _ === "string" ? _ : "\\u" + ("0000" + q.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + J2 + '"';
  }, O1 = function(J2, q) {
    var _, z, Q, Z, G2 = b, V, U = q[J2];
    if (U && typeof U === "object" && typeof U.toJSON === "function")
      U = U.toJSON(J2);
    if (typeof u === "function")
      U = u.call(q, J2, U);
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
        if (b += R1, V = [], Object.prototype.toString.apply(U) === "[object Array]") {
          Z = U.length;
          for (_ = 0;_ < Z; _ += 1)
            V[_] = O1(_, U) || "null";
          return Q = V.length === 0 ? "[]" : b ? `[
` + b + V.join(`,
` + b) + `
` + G2 + "]" : "[" + V.join(",") + "]", b = G2, Q;
        }
        if (u && typeof u === "object") {
          Z = u.length;
          for (_ = 0;_ < Z; _ += 1)
            if (z = u[_], typeof z === "string") {
              if (Q = O1(z, U), Q)
                V.push(m1(z) + (b ? ": " : ":") + Q);
            }
        } else
          for (z in U)
            if (Object.prototype.hasOwnProperty.call(U, z)) {
              if (Q = O1(z, U), Q)
                V.push(m1(z) + (b ? ": " : ":") + Q);
            }
        return Q = V.length === 0 ? "{}" : b ? `{
` + b + V.join(`,
` + b) + `
` + G2 + "}" : "{" + V.join(",") + "}", b = G2, Q;
      default:
    }
  }, y1 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b, R1, VJ = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, u;
  B0.exports = function(J2, q, _) {
    var z;
    if (b = "", R1 = "", typeof _ === "number")
      for (z = 0;z < _; z += 1)
        R1 += " ";
    else if (typeof _ === "string")
      R1 = _;
    if (u = q, q && typeof q !== "function" && (typeof q !== "object" || typeof q.length !== "number"))
      throw new Error("JSON.stringify");
    return O1("", { "": J2 });
  };
});
var K0 = T2((KJ) => {
  KJ.parse = F0();
  KJ.stringify = V0();
});
var L0 = T2((h3, H0) => {
  var WJ = {}.toString;
  H0.exports = Array.isArray || function(J2) {
    return WJ.call(J2) == "[object Array]";
  };
});
var g1 = T2((Y3, M0) => {
  var W0 = Object.prototype.toString;
  M0.exports = function J(q) {
    var _ = W0.call(q), z = _ === "[object Arguments]";
    if (!z)
      z = _ !== "[object Array]" && q !== null && typeof q === "object" && typeof q.length === "number" && q.length >= 0 && W0.call(q.callee) === "[object Function]";
    return z;
  };
});
var j0 = T2((d3, N0) => {
  var T0;
  if (!Object.keys)
    z1 = Object.prototype.hasOwnProperty, p1 = Object.prototype.toString, D0 = g1(), c1 = Object.prototype.propertyIsEnumerable, R0 = !c1.call({ toString: null }, "toString"), O0 = c1.call(function() {}, "prototype"), Q1 = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], A1 = function(J2) {
      var q = J2.constructor;
      return q && q.prototype === J2;
    }, A0 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, C0 = function() {
      if (typeof window === "undefined")
        return false;
      for (var J2 in window)
        try {
          if (!A0["$" + J2] && z1.call(window, J2) && window[J2] !== null && typeof window[J2] === "object")
            try {
              A1(window[J2]);
            } catch (q) {
              return true;
            }
        } catch (q) {
          return true;
        }
      return false;
    }(), x0 = function(J2) {
      if (typeof window === "undefined" || !C0)
        return A1(J2);
      try {
        return A1(J2);
      } catch (q) {
        return false;
      }
    }, T0 = function J(q) {
      var _ = q !== null && typeof q === "object", z = p1.call(q) === "[object Function]", Q = D0(q), Z = _ && p1.call(q) === "[object String]", G2 = [];
      if (!_ && !z && !Q)
        throw new TypeError("Object.keys called on a non-object");
      var V = O0 && z;
      if (Z && q.length > 0 && !z1.call(q, 0))
        for (var U = 0;U < q.length; ++U)
          G2.push(String(U));
      if (Q && q.length > 0)
        for (var K = 0;K < q.length; ++K)
          G2.push(String(K));
      else
        for (var H2 in q)
          if (!(V && H2 === "prototype") && z1.call(q, H2))
            G2.push(String(H2));
      if (R0) {
        var F = x0(q);
        for (var B = 0;B < Q1.length; ++B)
          if (!(F && Q1[B] === "constructor") && z1.call(q, Q1[B]))
            G2.push(Q1[B]);
      }
      return G2;
    };
  var z1, p1, D0, c1, R0, O0, Q1, A1, A0, C0, x0;
  N0.exports = T0;
});
var S0 = T2((l3, v0) => {
  var MJ = Array.prototype.slice, DJ = g1(), k0 = Object.keys, C1 = k0 ? function J(q) {
    return k0(q);
  } : j0(), I0 = Object.keys;
  C1.shim = function J() {
    if (Object.keys) {
      var q = function() {
        var _ = Object.keys(arguments);
        return _ && _.length === arguments.length;
      }(1, 2);
      if (!q)
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
var b0 = T2((o3, P0) => {
  var RJ = "Function.prototype.bind called on incompatible ", OJ = Object.prototype.toString, AJ = Math.max, CJ = "[object Function]", $0 = function J(q, _) {
    var z = [];
    for (var Q = 0;Q < q.length; Q += 1)
      z[Q] = q[Q];
    for (var Z = 0;Z < _.length; Z += 1)
      z[Z + q.length] = _[Z];
    return z;
  }, xJ = function J(q, _) {
    var z = [];
    for (var Q = _ || 0, Z = 0;Q < q.length; Q += 1, Z += 1)
      z[Z] = q[Q];
    return z;
  }, TJ = function(J2, q) {
    var _ = "";
    for (var z = 0;z < J2.length; z += 1)
      if (_ += J2[z], z + 1 < J2.length)
        _ += q;
    return _;
  };
  P0.exports = function J(q) {
    var _ = this;
    if (typeof _ !== "function" || OJ.apply(_) !== CJ)
      throw new TypeError(RJ + _);
    var z = xJ(arguments, 1), Q, Z = function() {
      if (this instanceof Q) {
        var H2 = _.apply(this, $0(z, arguments));
        if (Object(H2) === H2)
          return H2;
        return this;
      }
      return _.apply(q, $0(z, arguments));
    }, G2 = AJ(0, _.length - z.length), V = [];
    for (var U = 0;U < G2; U++)
      V[U] = "$" + U;
    if (Q = Function("binder", "return function (" + TJ(V, ",") + "){ return binder.apply(this,arguments); }")(Z), _.prototype) {
      var K = function H() {};
      K.prototype = _.prototype, Q.prototype = new K, K.prototype = null;
    }
    return Q;
  };
});
var Z1 = T2((a3, E0) => {
  var NJ = b0();
  E0.exports = Function.prototype.bind || NJ;
});
var w0 = T2((s3, f0) => {
  f0.exports = Error;
});
var m0 = T2((i3, y0) => {
  y0.exports = EvalError;
});
var p0 = T2((r3, g0) => {
  g0.exports = RangeError;
});
var u0 = T2((t3, c0) => {
  c0.exports = ReferenceError;
});
var u1 = T2((n3, h0) => {
  h0.exports = SyntaxError;
});
var U1 = T2((e3, Y0) => {
  Y0.exports = TypeError;
});
var l0 = T2((q5, d0) => {
  d0.exports = URIError;
});
var a0 = T2((J5, o0) => {
  o0.exports = function J() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var q = {}, _ = Symbol("test"), z = Object(_);
    if (typeof _ === "string")
      return false;
    if (Object.prototype.toString.call(_) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(z) !== "[object Symbol]")
      return false;
    var Q = 42;
    q[_] = Q;
    for (_ in q)
      return false;
    if (typeof Object.keys === "function" && Object.keys(q).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(q).length !== 0)
      return false;
    var Z = Object.getOwnPropertySymbols(q);
    if (Z.length !== 1 || Z[0] !== _)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(q, _))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var G2 = Object.getOwnPropertyDescriptor(q, _);
      if (G2.value !== Q || G2.enumerable !== true)
        return false;
    }
    return true;
  };
});
var h1 = T2((_5, i0) => {
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
var Y1 = T2((z5, t0) => {
  var r0 = { foo: {} }, kJ = Object;
  t0.exports = function J() {
    return { __proto__: r0 }.foo === r0.foo && !({ __proto__: null } instanceof kJ);
  };
});
var d1 = T2((Q5, n0) => {
  var IJ = Function.prototype.call, vJ = Object.prototype.hasOwnProperty, SJ = Z1();
  n0.exports = SJ.call(IJ, vJ);
});
var G1 = T2((Z5, zq) => {
  var A2, $J = w0(), PJ = m0(), bJ = p0(), EJ = u0(), i = u1(), s = U1(), fJ = l0(), _q = Function, l1 = function(J2) {
    try {
      return _q('"use strict"; return (' + J2 + ").constructor;")();
    } catch (q) {}
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
      } catch (q) {
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
  var e0, gJ = function J(q) {
    var _;
    if (q === "%AsyncFunction%")
      _ = l1("async function () {}");
    else if (q === "%GeneratorFunction%")
      _ = l1("function* () {}");
    else if (q === "%AsyncGeneratorFunction%")
      _ = l1("async function* () {}");
    else if (q === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q === "%AsyncIteratorPrototype%") {
      var Q = J("%AsyncGenerator%");
      if (Q && k)
        _ = k(Q.prototype);
    }
    return Y[q] = _, _;
  }, qq = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, X1 = Z1(), x1 = d1(), pJ = X1.call(Function.call, Array.prototype.concat), cJ = X1.call(Function.apply, Array.prototype.splice), Jq = X1.call(Function.call, String.prototype.replace), T1 = X1.call(Function.call, String.prototype.slice), uJ = X1.call(Function.call, RegExp.prototype.exec), hJ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, YJ = /\\(\\)?/g, dJ = function J(q) {
    var _ = T1(q, 0, 1), z = T1(q, -1);
    if (_ === "%" && z !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var Q = [];
    return Jq(q, hJ, function(Z, G2, V, U) {
      Q[Q.length] = V ? Jq(U, YJ, "$1") : G2 || Z;
    }), Q;
  }, lJ = function J(q, _) {
    var z = q, Q;
    if (x1(qq, z))
      Q = qq[z], z = "%" + Q[0] + "%";
    if (x1(Y, z)) {
      var Z = Y[z];
      if (Z === a)
        Z = gJ(z);
      if (typeof Z === "undefined" && !_)
        throw new s("intrinsic " + q + " exists, but is not available. Please file an issue!");
      return { alias: Q, name: z, value: Z };
    }
    throw new i("intrinsic " + q + " does not exist!");
  };
  zq.exports = function J(q, _) {
    if (typeof q !== "string" || q.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (uJ(/^%?[^%]*%?$/, q) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = dJ(q), Q = z.length > 0 ? z[0] : "", Z = lJ("%" + Q + "%", _), G2 = Z.name, V = Z.value, U = false, K = Z.alias;
    if (K)
      Q = K[0], cJ(z, pJ([0, 1], K));
    for (var H2 = 1, F = true;H2 < z.length; H2 += 1) {
      var B = z[H2], W2 = T1(B, 0, 1), L = T1(B, -1);
      if ((W2 === '"' || W2 === "'" || W2 === "`" || (L === '"' || L === "'" || L === "`")) && W2 !== L)
        throw new i("property names with quotes must have matching quotes");
      if (B === "constructor" || !F)
        U = true;
      if (Q += "." + B, G2 = "%" + Q + "%", x1(Y, G2))
        V = Y[G2];
      else if (V != null) {
        if (!(B in V)) {
          if (!_)
            throw new s("base intrinsic for " + q + " exists, but the property is not available.");
          return;
        }
        if (h && H2 + 1 >= z.length) {
          var D = h(V, B);
          if (F = !!D, F && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B];
        } else
          F = x1(V, B), V = V[B];
        if (F && !U)
          Y[G2] = V;
      }
    }
    return V;
  };
});
var j1 = T2((U5, Qq) => {
  var oJ = G1(), N1 = oJ("%Object.defineProperty%", true) || false;
  if (N1)
    try {
      N1({}, "a", { value: 1 });
    } catch (J2) {
      N1 = false;
    }
  Qq.exports = N1;
});
var Bq = T2((X5, Fq) => {
  var C, e = SyntaxError, Gq = Function, n = TypeError, a1 = function(J2) {
    try {
      return Gq('"use strict"; return (' + J2 + ").constructor;")();
    } catch (q) {}
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
      } catch (q) {
        return s1;
      }
    }
  }() : s1, r = h1()(), sJ = Y1()(), I2 = Object.getPrototypeOf || (sJ ? function(J2) {
    return J2.__proto__;
  } : null), t = {}, iJ = typeof Uint8Array === "undefined" || !I2 ? C : I2(Uint8Array), l = { "%AggregateError%": typeof AggregateError === "undefined" ? C : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? C : ArrayBuffer, "%ArrayIteratorPrototype%": r && I2 ? I2([][Symbol.iterator]()) : C, "%AsyncFromSyncIteratorPrototype%": C, "%AsyncFunction%": t, "%AsyncGenerator%": t, "%AsyncGeneratorFunction%": t, "%AsyncIteratorPrototype%": t, "%Atomics%": typeof Atomics === "undefined" ? C : Atomics, "%BigInt%": typeof BigInt === "undefined" ? C : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? C : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? C : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? C : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? C : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? C : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? C : FinalizationRegistry, "%Function%": Gq, "%GeneratorFunction%": t, "%Int8Array%": typeof Int8Array === "undefined" ? C : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? C : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? C : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": r && I2 ? I2(I2([][Symbol.iterator]())) : C, "%JSON%": typeof JSON === "object" ? JSON : C, "%Map%": typeof Map === "undefined" ? C : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !r || !I2 ? C : I2(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? C : Promise, "%Proxy%": typeof Proxy === "undefined" ? C : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? C : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? C : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !r || !I2 ? C : I2(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? C : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": r && I2 ? I2(""[Symbol.iterator]()) : C, "%Symbol%": r ? Symbol : C, "%SyntaxError%": e, "%ThrowTypeError%": aJ, "%TypedArray%": iJ, "%TypeError%": n, "%Uint8Array%": typeof Uint8Array === "undefined" ? C : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? C : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? C : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? C : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? C : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? C : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? C : WeakSet };
  if (I2)
    try {
      null.error;
    } catch (J2) {
      Zq = I2(I2(J2)), l["%Error.prototype%"] = Zq;
    }
  var Zq, rJ = function J(q) {
    var _;
    if (q === "%AsyncFunction%")
      _ = a1("async function () {}");
    else if (q === "%GeneratorFunction%")
      _ = a1("function* () {}");
    else if (q === "%AsyncGeneratorFunction%")
      _ = a1("async function* () {}");
    else if (q === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q === "%AsyncIteratorPrototype%") {
      var Q = J("%AsyncGenerator%");
      if (Q && I2)
        _ = I2(Q.prototype);
    }
    return l[q] = _, _;
  }, Uq = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, F1 = Z1(), k1 = d1(), tJ = F1.call(Function.call, Array.prototype.concat), nJ = F1.call(Function.apply, Array.prototype.splice), Xq = F1.call(Function.call, String.prototype.replace), I1 = F1.call(Function.call, String.prototype.slice), eJ = F1.call(Function.call, RegExp.prototype.exec), q3 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, J3 = /\\(\\)?/g, _3 = function J(q) {
    var _ = I1(q, 0, 1), z = I1(q, -1);
    if (_ === "%" && z !== "%")
      throw new e("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new e("invalid intrinsic syntax, expected opening `%`");
    var Q = [];
    return Xq(q, q3, function(Z, G2, V, U) {
      Q[Q.length] = V ? Xq(U, J3, "$1") : G2 || Z;
    }), Q;
  }, z3 = function J(q, _) {
    var z = q, Q;
    if (k1(Uq, z))
      Q = Uq[z], z = "%" + Q[0] + "%";
    if (k1(l, z)) {
      var Z = l[z];
      if (Z === t)
        Z = rJ(z);
      if (typeof Z === "undefined" && !_)
        throw new n("intrinsic " + q + " exists, but is not available. Please file an issue!");
      return { alias: Q, name: z, value: Z };
    }
    throw new e("intrinsic " + q + " does not exist!");
  };
  Fq.exports = function J(q, _) {
    if (typeof q !== "string" || q.length === 0)
      throw new n("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new n('"allowMissing" argument must be a boolean');
    if (eJ(/^%?[^%]*%?$/, q) === null)
      throw new e("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = _3(q), Q = z.length > 0 ? z[0] : "", Z = z3("%" + Q + "%", _), G2 = Z.name, V = Z.value, U = false, K = Z.alias;
    if (K)
      Q = K[0], nJ(z, tJ([0, 1], K));
    for (var H2 = 1, F = true;H2 < z.length; H2 += 1) {
      var B = z[H2], W2 = I1(B, 0, 1), L = I1(B, -1);
      if ((W2 === '"' || W2 === "'" || W2 === "`" || (L === '"' || L === "'" || L === "`")) && W2 !== L)
        throw new e("property names with quotes must have matching quotes");
      if (B === "constructor" || !F)
        U = true;
      if (Q += "." + B, G2 = "%" + Q + "%", k1(l, G2))
        V = l[G2];
      else if (V != null) {
        if (!(B in V)) {
          if (!_)
            throw new n("base intrinsic for " + q + " exists, but the property is not available.");
          return;
        }
        if (d && H2 + 1 >= z.length) {
          var D = d(V, B);
          if (F = !!D, F && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B];
        } else
          F = k1(V, B), V = V[B];
        if (F && !U)
          l[G2] = V;
      }
    }
    return V;
  };
});
var i1 = T2((G5, Vq) => {
  var Q3 = Bq(), v1 = Q3("%Object.getOwnPropertyDescriptor%", true);
  if (v1)
    try {
      v1([], "length");
    } catch (J2) {
      v1 = null;
    }
  Vq.exports = v1;
});
var Wq = T2((F5, Lq) => {
  var Kq = j1(), Z3 = u1(), q1 = U1(), Hq = i1();
  Lq.exports = function J(q, _, z) {
    if (!q || typeof q !== "object" && typeof q !== "function")
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
    var Q = arguments.length > 3 ? arguments[3] : null, Z = arguments.length > 4 ? arguments[4] : null, G2 = arguments.length > 5 ? arguments[5] : null, V = arguments.length > 6 ? arguments[6] : false, U = !!Hq && Hq(q, _);
    if (Kq)
      Kq(q, _, { configurable: G2 === null && U ? U.configurable : !G2, enumerable: Q === null && U ? U.enumerable : !Q, value: z, writable: Z === null && U ? U.writable : !Z });
    else if (V || !Q && !Z && !G2)
      q[_] = z;
    else
      throw new Z3("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Rq = T2((B5, Dq) => {
  var r1 = j1(), Mq = function J() {
    return !!r1;
  };
  Mq.hasArrayLengthDefineBug = function J() {
    if (!r1)
      return null;
    try {
      return r1([], "length", { value: 1 }).length !== 1;
    } catch (q) {
      return true;
    }
  };
  Dq.exports = Mq;
});
var Tq = T2((V5, xq) => {
  var U3 = G1(), Oq = Wq(), X3 = Rq()(), Aq = i1(), Cq = U1(), G3 = U3("%Math.floor%");
  xq.exports = function J(q, _) {
    if (typeof q !== "function")
      throw new Cq("`fn` is not a function");
    if (typeof _ !== "number" || _ < 0 || _ > 4294967295 || G3(_) !== _)
      throw new Cq("`length` must be a positive 32-bit integer");
    var z = arguments.length > 2 && !!arguments[2], Q = true, Z = true;
    if ("length" in q && Aq) {
      var G2 = Aq(q, "length");
      if (G2 && !G2.configurable)
        Q = false;
      if (G2 && !G2.writable)
        Z = false;
    }
    if (Q || Z || !z)
      if (X3)
        Oq(q, "length", _, true, true);
      else
        Oq(q, "length", _);
    return q;
  };
});
var n1 = T2((K5, S1) => {
  var t1 = Z1(), $1 = G1(), F3 = Tq(), B3 = U1(), kq = $1("%Function.prototype.apply%"), Iq = $1("%Function.prototype.call%"), vq = $1("%Reflect.apply%", true) || t1.call(Iq, kq), Nq = j1(), V3 = $1("%Math.max%");
  S1.exports = function J(q) {
    if (typeof q !== "function")
      throw new B3("a function is required");
    var _ = vq(t1, Iq, arguments);
    return F3(_, 1 + V3(0, q.length - (arguments.length - 1)), true);
  };
  var jq = function J() {
    return vq(t1, kq, arguments);
  };
  if (Nq)
    Nq(S1.exports, "apply", { value: jq });
  else
    S1.exports.apply = jq;
});
var bq = T2((H5, Pq) => {
  var Sq = G1(), $q = n1(), K3 = $q(Sq("String.prototype.indexOf"));
  Pq.exports = function J(q, _) {
    var z = Sq(q, !!_);
    if (typeof z === "function" && K3(q, ".prototype.") > -1)
      return $q(z);
    return z;
  };
});
var mq = T2((L5, yq) => {
  var P1 = (typeof JSON !== "undefined" ? JSON : K0()).stringify, H3 = L0(), L3 = S0(), W3 = n1(), wq = bq(), Eq = wq("Array.prototype.join"), e1 = wq("Array.prototype.push"), fq = function J(q, _) {
    var z = "";
    for (var Q = 0;Q < q; Q += 1)
      z += _;
    return z;
  }, M3 = function(J2, q, _) {
    return _;
  };
  yq.exports = function J(q) {
    var _ = arguments.length > 1 ? arguments[1] : undefined, z = _ && _.space || "";
    if (typeof z === "number")
      z = fq(z, " ");
    var Q = !!_ && typeof _.cycles === "boolean" && _.cycles, Z = _ && _.replacer ? W3(_.replacer) : M3, G2 = typeof _ === "function" ? _ : _ && _.cmp, V = G2 && function(K) {
      var H2 = G2.length > 2 && function F(B) {
        return K[B];
      };
      return function(F, B) {
        return G2({ key: F, value: K[F] }, { key: B, value: K[B] }, H2 ? { __proto__: null, get: H2 } : undefined);
      };
    }, U = [];
    return function K(H2, F, B, W2) {
      var L = z ? `
` + fq(W2, z) : "", D = z ? ": " : ":";
      if (B && B.toJSON && typeof B.toJSON === "function")
        B = B.toJSON();
      if (B = Z(H2, F, B), B === undefined)
        return;
      if (typeof B !== "object" || B === null)
        return P1(B);
      if (H3(B)) {
        var S = [];
        for (var O = 0;O < B.length; O++) {
          var v = K(B, O, B[O], W2 + 1) || P1(null);
          e1(S, L + z + v);
        }
        return "[" + Eq(S, ",") + L + "]";
      }
      if (U.indexOf(B) !== -1) {
        if (Q)
          return P1("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        e1(U, B);
      var N2 = L3(B).sort(V && V(B)), S = [];
      for (var O = 0;O < N2.length; O++) {
        var F = N2[O], j = K(B, F, B[F], W2 + 1);
        if (!j)
          continue;
        var P = P1(F) + D + j;
        e1(S, L + z + P);
      }
      return U.splice(U.indexOf(B), 1), "{" + Eq(S, ",") + L + "}";
    }({ "": q }, "", q, 0);
  };
});
var z0 = XJ(mq(), 1);
var gq = function(J2, q, _, z) {
  let Q, Z, G2;
  const V = q || [0], U = (_ = _ || 0) >>> 3, K = z === -1 ? 3 : 0;
  for (Q = 0;Q < J2.length; Q += 1)
    G2 = Q + U, Z = G2 >>> 2, V.length <= Z && V.push(0), V[Z] |= J2[Q] << 8 * (K + z * (G2 % 4));
  return { value: V, binLen: 8 * J2.length + _ };
};
var _1 = function(J2, q, _) {
  switch (q) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (J2) {
    case "HEX":
      return function(z, Q, Z) {
        return function(G2, V, U, K) {
          let H2, F, B, W2;
          if (G2.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          const L = V || [0], D = (U = U || 0) >>> 3, O = K === -1 ? 3 : 0;
          for (H2 = 0;H2 < G2.length; H2 += 2) {
            if (F = parseInt(G2.substr(H2, 2), 16), isNaN(F))
              throw new Error("String of HEX type contains invalid characters");
            for (W2 = (H2 >>> 1) + D, B = W2 >>> 2;L.length <= B; )
              L.push(0);
            L[B] |= F << 8 * (O + K * (W2 % 4));
          }
          return { value: L, binLen: 4 * G2.length + U };
        }(z, Q, Z, _);
      };
    case "TEXT":
      return function(z, Q, Z) {
        return function(G2, V, U, K, H2) {
          let F, B, W2, L, D, O, v, N2, S = 0;
          const j = U || [0], P = (K = K || 0) >>> 3;
          if (V === "UTF8")
            for (v = H2 === -1 ? 3 : 0, W2 = 0;W2 < G2.length; W2 += 1)
              for (F = G2.charCodeAt(W2), B = [], 128 > F ? B.push(F) : 2048 > F ? (B.push(192 | F >>> 6), B.push(128 | 63 & F)) : 55296 > F || 57344 <= F ? B.push(224 | F >>> 12, 128 | F >>> 6 & 63, 128 | 63 & F) : (W2 += 1, F = 65536 + ((1023 & F) << 10 | 1023 & G2.charCodeAt(W2)), B.push(240 | F >>> 18, 128 | F >>> 12 & 63, 128 | F >>> 6 & 63, 128 | 63 & F)), L = 0;L < B.length; L += 1) {
                for (O = S + P, D = O >>> 2;j.length <= D; )
                  j.push(0);
                j[D] |= B[L] << 8 * (v + H2 * (O % 4)), S += 1;
              }
          else
            for (v = H2 === -1 ? 2 : 0, N2 = V === "UTF16LE" && H2 !== 1 || V !== "UTF16LE" && H2 === 1, W2 = 0;W2 < G2.length; W2 += 1) {
              for (F = G2.charCodeAt(W2), N2 === true && (L = 255 & F, F = L << 8 | F >>> 8), O = S + P, D = O >>> 2;j.length <= D; )
                j.push(0);
              j[D] |= F << 8 * (v + H2 * (O % 4)), S += 2;
            }
          return { value: j, binLen: 8 * S + K };
        }(z, q, Q, Z, _);
      };
    case "B64":
      return function(z, Q, Z) {
        return function(G2, V, U, K) {
          let H2, F, B, W2, L, D, O, v = 0;
          const N2 = V || [0], S = (U = U || 0) >>> 3, j = K === -1 ? 3 : 0, P = G2.indexOf("=");
          if (G2.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (G2 = G2.replace(/=/g, ""), P !== -1 && P < G2.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (F = 0;F < G2.length; F += 4) {
            for (L = G2.substr(F, 4), W2 = 0, B = 0;B < L.length; B += 1)
              H2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(L.charAt(B)), W2 |= H2 << 18 - 6 * B;
            for (B = 0;B < L.length - 1; B += 1) {
              for (O = v + S, D = O >>> 2;N2.length <= D; )
                N2.push(0);
              N2[D] |= (W2 >>> 16 - 8 * B & 255) << 8 * (j + K * (O % 4)), v += 1;
            }
          }
          return { value: N2, binLen: 8 * v + U };
        }(z, Q, Z, _);
      };
    case "BYTES":
      return function(z, Q, Z) {
        return function(G2, V, U, K) {
          let H2, F, B, W2;
          const L = V || [0], D = (U = U || 0) >>> 3, O = K === -1 ? 3 : 0;
          for (F = 0;F < G2.length; F += 1)
            H2 = G2.charCodeAt(F), W2 = F + D, B = W2 >>> 2, L.length <= B && L.push(0), L[B] |= H2 << 8 * (O + K * (W2 % 4));
          return { value: L, binLen: 8 * G2.length + U };
        }(z, Q, Z, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (z) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(z, Q, Z) {
        return function(G2, V, U, K) {
          return gq(new Uint8Array(G2), V, U, K);
        }(z, Q, Z, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (z) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(z, Q, Z) {
        return gq(z, Q, Z, _);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var pq = function(J2, q, _, z) {
  switch (J2) {
    case "HEX":
      return function(Q) {
        return function(Z, G2, V, U) {
          let H2, F, B = "";
          const W2 = G2 / 8, L = V === -1 ? 3 : 0;
          for (H2 = 0;H2 < W2; H2 += 1)
            F = Z[H2 >>> 2] >>> 8 * (L + V * (H2 % 4)), B += "0123456789abcdef".charAt(F >>> 4 & 15) + "0123456789abcdef".charAt(15 & F);
          return U.outputUpper ? B.toUpperCase() : B;
        }(Q, q, _, z);
      };
    case "B64":
      return function(Q) {
        return function(Z, G2, V, U) {
          let K, H2, F, B, W2, L = "";
          const D = G2 / 8, O = V === -1 ? 3 : 0;
          for (K = 0;K < D; K += 3)
            for (B = K + 1 < D ? Z[K + 1 >>> 2] : 0, W2 = K + 2 < D ? Z[K + 2 >>> 2] : 0, F = (Z[K >>> 2] >>> 8 * (O + V * (K % 4)) & 255) << 16 | (B >>> 8 * (O + V * ((K + 1) % 4)) & 255) << 8 | W2 >>> 8 * (O + V * ((K + 2) % 4)) & 255, H2 = 0;H2 < 4; H2 += 1)
              L += 8 * K + 6 * H2 <= G2 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(F >>> 6 * (3 - H2) & 63) : U.b64Pad;
          return L;
        }(Q, q, _, z);
      };
    case "BYTES":
      return function(Q) {
        return function(Z, G2, V) {
          let U, K, H2 = "";
          const F = G2 / 8, B = V === -1 ? 3 : 0;
          for (U = 0;U < F; U += 1)
            K = Z[U >>> 2] >>> 8 * (B + V * (U % 4)) & 255, H2 += String.fromCharCode(K);
          return H2;
        }(Q, q, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (Q) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(Q) {
        return function(Z, G2, V) {
          let U;
          const K = G2 / 8, H2 = new ArrayBuffer(K), F = new Uint8Array(H2), B = V === -1 ? 3 : 0;
          for (U = 0;U < K; U += 1)
            F[U] = Z[U >>> 2] >>> 8 * (B + V * (U % 4)) & 255;
          return H2;
        }(Q, q, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (Q) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(Q) {
        return function(Z, G2, V) {
          let U;
          const K = G2 / 8, H2 = V === -1 ? 3 : 0, F = new Uint8Array(K);
          for (U = 0;U < K; U += 1)
            F[U] = Z[U >>> 2] >>> 8 * (H2 + V * (U % 4)) & 255;
          return F;
        }(Q, q, _);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var E1 = function(J2, q) {
  let _, z;
  const Q = J2.binLen >>> 3, Z = q.binLen >>> 3, G2 = Q << 3, V = 4 - Q << 3;
  if (Q % 4 != 0) {
    for (_ = 0;_ < Z; _ += 4)
      z = Q + _ >>> 2, J2.value[z] |= q.value[_ >>> 2] << G2, J2.value.push(0), J2.value[z + 1] |= q.value[_ >>> 2] >>> V;
    return (J2.value.length << 2) - 4 >= Z + Q && J2.value.pop(), { value: J2.value, binLen: J2.binLen + q.binLen };
  }
  return { value: J2.value.concat(q.value), binLen: J2.binLen + q.binLen };
};
var cq = function(J2) {
  const q = { outputUpper: false, b64Pad: "=", outputLen: -1 }, _ = J2 || {};
  if (q.outputUpper = _.outputUpper || false, _.b64Pad && (q.b64Pad = _.b64Pad), _.outputLen) {
    if (_.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q.outputLen = _.outputLen;
  } else if (_.shakeLen) {
    if (_.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q.outputLen = _.shakeLen;
  }
  if (typeof q.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof q.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return q;
};
var c = function(J2, q, _, z) {
  const Q = J2 + " must include a value and format";
  if (!q) {
    if (!z)
      throw new Error(Q);
    return z;
  }
  if (q.value === undefined || !q.format)
    throw new Error(Q);
  return _1(q.format, q.encoding || "UTF8", _)(q.value);
};
var J1 = function(J2, q) {
  return J2 << q | J2 >>> 32 - q;
};
var f = function(J2, q) {
  return J2 >>> q | J2 << 32 - q;
};
var iq = function(J2, q) {
  return J2 >>> q;
};
var uq = function(J2, q, _) {
  return J2 ^ q ^ _;
};
var rq = function(J2, q, _) {
  return J2 & q ^ ~J2 & _;
};
var tq = function(J2, q, _) {
  return J2 & q ^ J2 & _ ^ q & _;
};
var D3 = function(J2) {
  return f(J2, 2) ^ f(J2, 13) ^ f(J2, 22);
};
var $ = function(J2, q) {
  const _ = (65535 & J2) + (65535 & q);
  return (65535 & (J2 >>> 16) + (q >>> 16) + (_ >>> 16)) << 16 | 65535 & _;
};
var R3 = function(J2, q, _, z) {
  const Q = (65535 & J2) + (65535 & q) + (65535 & _) + (65535 & z);
  return (65535 & (J2 >>> 16) + (q >>> 16) + (_ >>> 16) + (z >>> 16) + (Q >>> 16)) << 16 | 65535 & Q;
};
var V1 = function(J2, q, _, z, Q) {
  const Z = (65535 & J2) + (65535 & q) + (65535 & _) + (65535 & z) + (65535 & Q);
  return (65535 & (J2 >>> 16) + (q >>> 16) + (_ >>> 16) + (z >>> 16) + (Q >>> 16) + (Z >>> 16)) << 16 | 65535 & Z;
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
var nq = function(J2, q) {
  let _, z, Q, Z, G2, V, U;
  const K = [];
  for (_ = q[0], z = q[1], Q = q[2], Z = q[3], G2 = q[4], U = 0;U < 80; U += 1)
    K[U] = U < 16 ? J2[U] : J1(K[U - 3] ^ K[U - 8] ^ K[U - 14] ^ K[U - 16], 1), V = U < 20 ? V1(J1(_, 5), rq(z, Q, Z), G2, 1518500249, K[U]) : U < 40 ? V1(J1(_, 5), uq(z, Q, Z), G2, 1859775393, K[U]) : U < 60 ? V1(J1(_, 5), tq(z, Q, Z), G2, 2400959708, K[U]) : V1(J1(_, 5), uq(z, Q, Z), G2, 3395469782, K[U]), G2 = Z, Z = Q, Q = J1(z, 30), z = _, _ = V;
  return q[0] = $(_, q[0]), q[1] = $(z, q[1]), q[2] = $(Q, q[2]), q[3] = $(Z, q[3]), q[4] = $(G2, q[4]), q;
};
var x3 = function(J2, q, _, z) {
  let Q;
  const Z = 15 + (q + 65 >>> 9 << 4), G2 = q + _;
  for (;J2.length <= Z; )
    J2.push(0);
  for (J2[q >>> 5] |= 128 << 24 - q % 32, J2[Z] = 4294967295 & G2, J2[Z - 1] = G2 / K1 | 0, Q = 0;Q < J2.length; Q += 16)
    z = nq(J2.slice(Q, Q + 16), z);
  return z;
};
var hq = function(J2) {
  let q;
  return q = J2 == "SHA-224" ? m.slice() : g.slice(), q;
};
var Yq = function(J2, q) {
  let _, z, Q, Z, G2, V, U, K, H2, F, B;
  const W2 = [];
  for (_ = q[0], z = q[1], Q = q[2], Z = q[3], G2 = q[4], V = q[5], U = q[6], K = q[7], B = 0;B < 64; B += 1)
    W2[B] = B < 16 ? J2[B] : R3(f(L = W2[B - 2], 17) ^ f(L, 19) ^ iq(L, 10), W2[B - 7], O3(W2[B - 15]), W2[B - 16]), H2 = V1(K, A3(G2), rq(G2, V, U), M[B], W2[B]), F = $(D3(_), tq(_, z, Q)), K = U, U = V, V = G2, G2 = $(Z, H2), Z = Q, Q = z, z = _, _ = $(H2, F);
  var L;
  return q[0] = $(_, q[0]), q[1] = $(z, q[1]), q[2] = $(Q, q[2]), q[3] = $(Z, q[3]), q[4] = $(G2, q[4]), q[5] = $(V, q[5]), q[6] = $(U, q[6]), q[7] = $(K, q[7]), q;
};
var dq = function(J2, q) {
  let _;
  return q > 32 ? (_ = 64 - q, new X(J2.I << q | J2.N >>> _, J2.N << q | J2.I >>> _)) : q !== 0 ? (_ = 32 - q, new X(J2.N << q | J2.I >>> _, J2.I << q | J2.N >>> _)) : J2;
};
var w = function(J2, q) {
  let _;
  return q < 32 ? (_ = 32 - q, new X(J2.N >>> q | J2.I << _, J2.I >>> q | J2.N << _)) : (_ = 64 - q, new X(J2.I >>> q | J2.N << _, J2.N >>> q | J2.I << _));
};
var eq = function(J2, q) {
  return new X(J2.N >>> q, J2.I >>> q | J2.N << 32 - q);
};
var j3 = function(J2, q, _) {
  return new X(J2.N & q.N ^ J2.N & _.N ^ q.N & _.N, J2.I & q.I ^ J2.I & _.I ^ q.I & _.I);
};
var k3 = function(J2) {
  const q = w(J2, 28), _ = w(J2, 34), z = w(J2, 39);
  return new X(q.N ^ _.N ^ z.N, q.I ^ _.I ^ z.I);
};
var E2 = function(J2, q) {
  let _, z;
  _ = (65535 & J2.I) + (65535 & q.I), z = (J2.I >>> 16) + (q.I >>> 16) + (_ >>> 16);
  const Q = (65535 & z) << 16 | 65535 & _;
  return _ = (65535 & J2.N) + (65535 & q.N) + (z >>> 16), z = (J2.N >>> 16) + (q.N >>> 16) + (_ >>> 16), new X((65535 & z) << 16 | 65535 & _, Q);
};
var I3 = function(J2, q, _, z) {
  let Q, Z;
  Q = (65535 & J2.I) + (65535 & q.I) + (65535 & _.I) + (65535 & z.I), Z = (J2.I >>> 16) + (q.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q >>> 16);
  const G2 = (65535 & Z) << 16 | 65535 & Q;
  return Q = (65535 & J2.N) + (65535 & q.N) + (65535 & _.N) + (65535 & z.N) + (Z >>> 16), Z = (J2.N >>> 16) + (q.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q >>> 16), new X((65535 & Z) << 16 | 65535 & Q, G2);
};
var v3 = function(J2, q, _, z, Q) {
  let Z, G2;
  Z = (65535 & J2.I) + (65535 & q.I) + (65535 & _.I) + (65535 & z.I) + (65535 & Q.I), G2 = (J2.I >>> 16) + (q.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q.I >>> 16) + (Z >>> 16);
  const V = (65535 & G2) << 16 | 65535 & Z;
  return Z = (65535 & J2.N) + (65535 & q.N) + (65535 & _.N) + (65535 & z.N) + (65535 & Q.N) + (G2 >>> 16), G2 = (J2.N >>> 16) + (q.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q.N >>> 16) + (Z >>> 16), new X((65535 & G2) << 16 | 65535 & Z, V);
};
var B1 = function(J2, q) {
  return new X(J2.N ^ q.N, J2.I ^ q.I);
};
var S3 = function(J2) {
  const q = w(J2, 19), _ = w(J2, 61), z = eq(J2, 6);
  return new X(q.N ^ _.N ^ z.N, q.I ^ _.I ^ z.I);
};
var $3 = function(J2) {
  const q = w(J2, 1), _ = w(J2, 8), z = eq(J2, 7);
  return new X(q.N ^ _.N ^ z.N, q.I ^ _.I ^ z.I);
};
var P3 = function(J2) {
  const q = w(J2, 14), _ = w(J2, 18), z = w(J2, 41);
  return new X(q.N ^ _.N ^ z.N, q.I ^ _.I ^ z.I);
};
var lq = function(J2) {
  return J2 === "SHA-384" ? [new X(3418070365, m[0]), new X(1654270250, m[1]), new X(2438529370, m[2]), new X(355462360, m[3]), new X(1731405415, m[4]), new X(41048885895, m[5]), new X(3675008525, m[6]), new X(1203062813, m[7])] : [new X(g[0], 4089235720), new X(g[1], 2227873595), new X(g[2], 4271175723), new X(g[3], 1595750129), new X(g[4], 2917565137), new X(g[5], 725511199), new X(g[6], 4215389547), new X(g[7], 327033209)];
};
var oq = function(J2, q) {
  let _, z, Q, Z, G2, V, U, K, H2, F, B, W2;
  const L = [];
  for (_ = q[0], z = q[1], Q = q[2], Z = q[3], G2 = q[4], V = q[5], U = q[6], K = q[7], B = 0;B < 80; B += 1)
    B < 16 ? (W2 = 2 * B, L[B] = new X(J2[W2], J2[W2 + 1])) : L[B] = I3(S3(L[B - 2]), L[B - 7], $3(L[B - 15]), L[B - 16]), H2 = v3(K, P3(G2), (O = V, v = U, new X((D = G2).N & O.N ^ ~D.N & v.N, D.I & O.I ^ ~D.I & v.I)), b3[B], L[B]), F = E2(k3(_), j3(_, z, Q)), K = U, U = V, V = G2, G2 = E2(Z, H2), Z = Q, Q = z, z = _, _ = E2(H2, F);
  var D, O, v;
  return q[0] = E2(_, q[0]), q[1] = E2(z, q[1]), q[2] = E2(Q, q[2]), q[3] = E2(Z, q[3]), q[4] = E2(G2, q[4]), q[5] = E2(V, q[5]), q[6] = E2(U, q[6]), q[7] = E2(K, q[7]), q;
};
var J0 = function(J2) {
  let q;
  const _ = [];
  for (q = 0;q < 5; q += 1)
    _[q] = [new X(0, 0), new X(0, 0), new X(0, 0), new X(0, 0), new X(0, 0)];
  return _;
};
var y3 = function(J2) {
  let q;
  const _ = [];
  for (q = 0;q < 5; q += 1)
    _[q] = J2[q].slice();
  return _;
};
var b1 = function(J2, q) {
  let _, z, Q, Z;
  const G2 = [], V = [];
  if (J2 !== null)
    for (z = 0;z < J2.length; z += 2)
      q[(z >>> 1) % 5][(z >>> 1) / 5 | 0] = B1(q[(z >>> 1) % 5][(z >>> 1) / 5 | 0], new X(J2[z + 1], J2[z]));
  for (_ = 0;_ < 24; _ += 1) {
    for (Z = J0(), z = 0;z < 5; z += 1)
      G2[z] = (U = q[z][0], K = q[z][1], H2 = q[z][2], F = q[z][3], B = q[z][4], new X(U.N ^ K.N ^ H2.N ^ F.N ^ B.N, U.I ^ K.I ^ H2.I ^ F.I ^ B.I));
    for (z = 0;z < 5; z += 1)
      V[z] = B1(G2[(z + 4) % 5], dq(G2[(z + 1) % 5], 1));
    for (z = 0;z < 5; z += 1)
      for (Q = 0;Q < 5; Q += 1)
        q[z][Q] = B1(q[z][Q], V[z]);
    for (z = 0;z < 5; z += 1)
      for (Q = 0;Q < 5; Q += 1)
        Z[Q][(2 * z + 3 * Q) % 5] = dq(q[z][Q], w3[z][Q]);
    for (z = 0;z < 5; z += 1)
      for (Q = 0;Q < 5; Q += 1)
        q[z][Q] = B1(Z[z][Q], new X(~Z[(z + 1) % 5][Q].N & Z[(z + 2) % 5][Q].N, ~Z[(z + 1) % 5][Q].I & Z[(z + 2) % 5][Q].I));
    q[0][0] = B1(q[0][0], f3[_]);
  }
  var U, K, H2, F, B;
  return q;
};
var qJ = function(J2) {
  let q, _, z = 0;
  const Q = [0, 0], Z = [4294967295 & J2, J2 / K1 & 2097151];
  for (q = 6;q >= 0; q--)
    _ = Z[q >> 2] >>> 8 * q & 255, _ === 0 && z === 0 || (Q[z + 1 >> 2] |= _ << 8 * (z + 1), z += 1);
  return z = z !== 0 ? z : 1, Q[0] |= z, { value: z + 1 > 4 ? Q : [Q[0]], binLen: 8 + 8 * z };
};
var q0 = function(J2) {
  return E1(qJ(J2.binLen), J2);
};
var aq = function(J2, q) {
  let _, z = qJ(q);
  z = E1(z, J2);
  const Q = q >>> 2, Z = (Q - z.value.length % Q) % Q;
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
  constructor(J2, q, _) {
    const z = _ || {};
    if (this.t = q, this.i = z.encoding || "UTF8", this.numRounds = z.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = J2, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(J2) {
    let q, _ = 0;
    const z = this.m >>> 5, Q = this.C(J2, this.h, this.u), Z = Q.binLen, G2 = Q.value, V = Z >>> 5;
    for (q = 0;q < V; q += z)
      _ + this.m <= Z && (this.U = this.v(G2.slice(q, q + z), this.U), _ += this.m);
    return this.A += _, this.h = G2.slice(_ >>> 5), this.u = Z % this.m, this.l = true, this;
  }
  getHash(J2, q) {
    let _, z, Q = this.R;
    const Z = cq(q);
    if (this.K) {
      if (Z.outputLen === -1)
        throw new Error("Output length must be specified in options");
      Q = Z.outputLen;
    }
    const G2 = pq(J2, Q, this.T, Z);
    if (this.H && this.g)
      return G2(this.g(Z));
    for (z = this.F(this.h.slice(), this.u, this.A, this.L(this.U), Q), _ = 1;_ < this.numRounds; _ += 1)
      this.K && Q % 32 != 0 && (z[z.length - 1] &= 16777215 >>> 24 - Q % 32), z = this.F(z, Q, 0, this.B(this.o), Q);
    return G2(z);
  }
  setHMACKey(J2, q, _) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    const z = _1(q, (_ || {}).encoding || "UTF8", this.T);
    this.k(z(J2));
  }
  k(J2) {
    const q = this.m >>> 3, _ = q / 4 - 1;
    let z;
    if (this.numRounds !== 1)
      throw new Error(sq);
    if (this.H)
      throw new Error("MAC key already set");
    for (q < J2.binLen / 8 && (J2.value = this.F(J2.value, J2.binLen, 0, this.B(this.o), this.R));J2.value.length <= _; )
      J2.value.push(0);
    for (z = 0;z <= _; z += 1)
      this.S[z] = 909522486 ^ J2.value[z], this.p[z] = 1549556828 ^ J2.value[z];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(J2, q) {
    const _ = cq(q);
    return pq(J2, this.R, this.T, _)(this.Y());
  }
  Y() {
    let J2;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    const q = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return J2 = this.v(this.p, this.B(this.o)), J2 = this.F(q, this.R, this.m, J2, this.R), J2;
  }
}
var T3 = class extends L1 {
  constructor(J2, q, _) {
    if (J2 !== "SHA-1")
      throw new Error(H1);
    super(J2, q, _);
    const z = _ || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = _1(this.t, this.i, this.T), this.v = nq, this.L = function(Q) {
      return Q.slice();
    }, this.B = C3, this.F = x3, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, z.hmacKey && this.k(c("hmacKey", z.hmacKey, this.T));
  }
};
var N3 = class extends L1 {
  constructor(J2, q, _) {
    if (J2 !== "SHA-224" && J2 !== "SHA-256")
      throw new Error(H1);
    super(J2, q, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _1(this.t, this.i, this.T), this.v = Yq, this.L = function(Q) {
      return Q.slice();
    }, this.B = hq, this.F = function(Q, Z, G2, V) {
      return function(U, K, H2, F, B) {
        let W2, L;
        const D = 15 + (K + 65 >>> 9 << 4), O = K + H2;
        for (;U.length <= D; )
          U.push(0);
        for (U[K >>> 5] |= 128 << 24 - K % 32, U[D] = 4294967295 & O, U[D - 1] = O / K1 | 0, W2 = 0;W2 < U.length; W2 += 16)
          F = Yq(U.slice(W2, W2 + 16), F);
        return L = B === "SHA-224" ? [F[0], F[1], F[2], F[3], F[4], F[5], F[6]] : F, L;
      }(Q, Z, G2, V, J2);
    }, this.U = hq(J2), this.m = 512, this.R = J2 === "SHA-224" ? 224 : 256, this.K = false, z.hmacKey && this.k(c("hmacKey", z.hmacKey, this.T));
  }
};

class X {
  constructor(J2, q) {
    this.N = J2, this.I = q;
  }
}
var b3 = [new X(M[0], 3609767458), new X(M[1], 602891725), new X(M[2], 3964484399), new X(M[3], 2173295548), new X(M[4], 4081628472), new X(M[5], 3053834265), new X(M[6], 2937671579), new X(M[7], 3664609560), new X(M[8], 2734883394), new X(M[9], 1164996542), new X(M[10], 1323610764), new X(M[11], 3590304994), new X(M[12], 4068182383), new X(M[13], 991336113), new X(M[14], 633803317), new X(M[15], 3479774868), new X(M[16], 2666613458), new X(M[17], 944711139), new X(M[18], 2341262773), new X(M[19], 2007800933), new X(M[20], 1495990901), new X(M[21], 1856431235), new X(M[22], 3175218132), new X(M[23], 2198950837), new X(M[24], 3999719339), new X(M[25], 766784016), new X(M[26], 2566594879), new X(M[27], 3203337956), new X(M[28], 1034457026), new X(M[29], 2466948901), new X(M[30], 3758326383), new X(M[31], 168717936), new X(M[32], 1188179964), new X(M[33], 1546045734), new X(M[34], 1522805485), new X(M[35], 2643833823), new X(M[36], 2343527390), new X(M[37], 1014477480), new X(M[38], 1206759142), new X(M[39], 344077627), new X(M[40], 1290863460), new X(M[41], 3158454273), new X(M[42], 3505952657), new X(M[43], 106217008), new X(M[44], 3606008344), new X(M[45], 1432725776), new X(M[46], 1467031594), new X(M[47], 851169720), new X(M[48], 3100823752), new X(M[49], 1363258195), new X(M[50], 3750685593), new X(M[51], 3785050280), new X(M[52], 3318307427), new X(M[53], 3812723403), new X(M[54], 2003034995), new X(M[55], 3602036899), new X(M[56], 1575990012), new X(M[57], 1125592928), new X(M[58], 2716904306), new X(M[59], 442776044), new X(M[60], 593698344), new X(M[61], 3733110249), new X(M[62], 2999351573), new X(M[63], 3815920427), new X(3391569614, 3928383900), new X(3515267271, 566280711), new X(3940187606, 3454069534), new X(4118630271, 4000239992), new X(116418474, 1914138554), new X(174292421, 2731055270), new X(289380356, 3203993006), new X(460393269, 320620315), new X(685471733, 587496836), new X(852142971, 1086792851), new X(1017036298, 365543100), new X(1126000580, 2618297676), new X(1288033470, 3409855158), new X(1501505948, 4234509866), new X(1607167915, 987167468), new X(1816402316, 1246189591)];
var E3 = class extends L1 {
  constructor(J2, q, _) {
    if (J2 !== "SHA-384" && J2 !== "SHA-512")
      throw new Error(H1);
    super(J2, q, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _1(this.t, this.i, this.T), this.v = oq, this.L = function(Q) {
      return Q.slice();
    }, this.B = lq, this.F = function(Q, Z, G2, V) {
      return function(U, K, H2, F, B) {
        let W2, L;
        const D = 31 + (K + 129 >>> 10 << 5), O = K + H2;
        for (;U.length <= D; )
          U.push(0);
        for (U[K >>> 5] |= 128 << 24 - K % 32, U[D] = 4294967295 & O, U[D - 1] = O / K1 | 0, W2 = 0;W2 < U.length; W2 += 32)
          F = oq(U.slice(W2, W2 + 32), F);
        return L = B === "SHA-384" ? [F[0].N, F[0].I, F[1].N, F[1].I, F[2].N, F[2].I, F[3].N, F[3].I, F[4].N, F[4].I, F[5].N, F[5].I] : [F[0].N, F[0].I, F[1].N, F[1].I, F[2].N, F[2].I, F[3].N, F[3].I, F[4].N, F[4].I, F[5].N, F[5].I, F[6].N, F[6].I, F[7].N, F[7].I], L;
      }(Q, Z, G2, V, J2);
    }, this.U = lq(J2), this.m = 1024, this.R = J2 === "SHA-384" ? 384 : 512, this.K = false, z.hmacKey && this.k(c("hmacKey", z.hmacKey, this.T));
  }
};
var f3 = [new X(0, 1), new X(0, 32898), new X(2147483648, 32906), new X(2147483648, 2147516416), new X(0, 32907), new X(0, 2147483649), new X(2147483648, 2147516545), new X(2147483648, 32777), new X(0, 138), new X(0, 136), new X(0, 2147516425), new X(0, 2147483658), new X(0, 2147516555), new X(2147483648, 139), new X(2147483648, 32905), new X(2147483648, 32771), new X(2147483648, 32770), new X(2147483648, 128), new X(0, 32778), new X(2147483648, 2147483658), new X(2147483648, 2147516545), new X(2147483648, 32896), new X(0, 2147483649), new X(2147483648, 2147516424)];
var w3 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var m3 = class extends L1 {
  constructor(J2, q, _) {
    let z = 6, Q = 0;
    super(J2, q, _);
    const Z = _ || {};
    if (this.numRounds !== 1) {
      if (Z.kmacKey || Z.hmacKey)
        throw new Error(sq);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = _1(this.t, this.i, this.T), this.v = b1, this.L = y3, this.B = J0, this.U = J0(), this.K = false, J2) {
      case "SHA3-224":
        this.m = Q = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = Q = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = Q = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = Q = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        z = 31, this.m = Q = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        z = 31, this.m = Q = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        z = 4, this.m = Q = 1344, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        z = 4, this.m = Q = 1088, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = Q = 1344, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = Q = 1088, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(H1);
    }
    this.F = function(G2, V, U, K, H2) {
      return function(F, B, W2, L, D, O, v) {
        let N2, S, j = 0;
        const P = [], W1 = D >>> 5, _J = B >>> 5;
        for (N2 = 0;N2 < _J && B >= D; N2 += W1)
          L = b1(F.slice(N2, N2 + W1), L), B -= D;
        for (F = F.slice(N2), B %= D;F.length < W1; )
          F.push(0);
        for (N2 = B >>> 3, F[N2 >> 2] ^= O << N2 % 4 * 8, F[W1 - 1] ^= 2147483648, L = b1(F, L);32 * P.length < v && (S = L[j % 5][j / 5 | 0], P.push(S.I), !(32 * P.length >= v)); )
          P.push(S.N), j += 1, 64 * j % D == 0 && (b1(null, L), j = 0);
        return P;
      }(G2, V, 0, K, Q, z, H2);
    }, Z.hmacKey && this.k(c("hmacKey", Z.hmacKey, this.T));
  }
  O(J2, q) {
    const _ = function(Q) {
      const Z = Q || {};
      return { funcName: c("funcName", Z.funcName, 1, { value: [], binLen: 0 }), customization: c("Customization", Z.customization, 1, { value: [], binLen: 0 }) };
    }(J2 || {});
    q && (_.funcName = q);
    const z = E1(q0(_.funcName), q0(_.customization));
    if (_.customization.binLen !== 0 || _.funcName.binLen !== 0) {
      const Q = aq(z, this.m >>> 3);
      for (let Z = 0;Z < Q.length; Z += this.m >>> 5)
        this.U = this.v(Q.slice(Z, Z + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(J2) {
    const q = function(z) {
      const Q = z || {};
      return { kmacKey: c("kmacKey", Q.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: c("Customization", Q.customization, 1, { value: [], binLen: 0 }) };
    }(J2 || {});
    this.O(J2, q.funcName);
    const _ = aq(q0(q.kmacKey), this.m >>> 3);
    for (let z = 0;z < _.length; z += this.m >>> 5)
      this.U = this.v(_.slice(z, z + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(J2) {
    const q = E1({ value: this.h.slice(), binLen: this.u }, function(_) {
      let z, Q, Z = 0;
      const G2 = [0, 0], V = [4294967295 & _, _ / K1 & 2097151];
      for (z = 6;z >= 0; z--)
        Q = V[z >> 2] >>> 8 * z & 255, Q === 0 && Z === 0 || (G2[Z >> 2] |= Q << 8 * Z, Z += 1);
      return Z = Z !== 0 ? Z : 1, G2[Z >> 2] |= Z << 8 * Z, { value: Z + 1 > 4 ? G2 : [G2[0]], binLen: 8 + 8 * Z };
    }(J2.outputLen));
    return this.F(q.value, q.binLen, this.A, this.L(this.U), J2.outputLen);
  }
};

class _0 {
  constructor(J2, q, _) {
    if (J2 == "SHA-1")
      this.P = new T3(J2, q, _);
    else if (J2 == "SHA-224" || J2 == "SHA-256")
      this.P = new N3(J2, q, _);
    else if (J2 == "SHA-384" || J2 == "SHA-512")
      this.P = new E3(J2, q, _);
    else {
      if (J2 != "SHA3-224" && J2 != "SHA3-256" && J2 != "SHA3-384" && J2 != "SHA3-512" && J2 != "SHAKE128" && J2 != "SHAKE256" && J2 != "CSHAKE128" && J2 != "CSHAKE256" && J2 != "KMAC128" && J2 != "KMAC256")
        throw new Error(H1);
      this.P = new m3(J2, q, _);
    }
  }
  update(J2) {
    return this.P.update(J2), this;
  }
  getHash(J2, q) {
    return this.P.getHash(J2, q);
  }
  setHMACKey(J2, q, _) {
    this.P.setHMACKey(J2, q, _);
  }
  getHMAC(J2, q) {
    return this.P.getHMAC(J2, q);
  }
}
var f1 = function(J2, q, _ = 0) {
  const z = z0.default({ ...J2, signature: undefined }), Q = q.noTimeWindow ? 0 : Math.floor(Date.now() / (q.timeWindow ?? JJ)) + _;
  return new _0("SHA-256", "TEXT", { encoding: "UTF8" }).update(z).update(z0.default(q)).update(`${Q}`).getHash("B64");
};
function C5(J2, q = {}) {
  return { ...J2, signature: f1(J2, q) };
}
function x5(J2, q) {
  return (q.noTimeWindow ? 0 : q.timeWindow ?? JJ) ? J2.signature === f1(J2, q) || J2.signature === f1(J2, q, -1) : J2.signature === f1(J2, q);
}
var JJ = 5000;

class SyncRoom {
  room;
  #sockets = new Map;
  state;
  #onRoomChange = new Set;
  static nextClientId = 1;
  constructor(room) {
    this.room = room;
    this.state = {};
    this.state.updates = [];
  }
  addRoomChangeListener(callback) {
    this.#onRoomChange.add(callback);
  }
  #setBlob(key, blob) {
    if (blob) {
      if (!this.state.blobs) {
        this.state.blobs = {};
      }
      this.state.blobs[key] = blob;
    } else if (this.state.blobs) {
      delete this.state.blobs[key];
      if (!Object.keys(this.state.blobs).length) {
        delete this.state.blobs;
      }
    }
  }
  async welcomeClient(client) {
    const now = Date.now();
    const secret = crypto.randomUUID();
    const clientId = `client-${SyncRoom.nextClientId++}`;
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
    addMessageReceiver(client, (payload, blobs) => {
      Object.entries(blobs).forEach(([key, blob]) => this.#setBlob(key, blob));
      if (!payload.updates?.every((update) => x5(update, { secret }))) {
        console.warn("Invalid payload received from ", clientId);
        return;
      }
      payload.updates?.forEach((update) => {
        const blobs2 = update.blobs ?? {};
        Object.keys(blobs2).forEach((key) => {
          if (this.state.blobs?.[key]) {
            blobs2[key] = this.state.blobs[key];
          }
        });
      });
      payload.updates = payload.updates?.filter((update) => !restrictedPath(update.path, clientId));
      this.#shareUpdates(payload.updates, client);
      setImmediate(() => this.#cleanupBlobs());
    });
    client.on("close", () => {
      this.#sockets.delete(client);
      this.#shareUpdates([{
        path: clientPath,
        value: undefined,
        confirmed: Date.now(),
        blobs: {}
      }]);
      console.log(`client ${clientId} disconnected from room ${this.room}`);
      this.#onRoomChange.forEach((callback) => callback(this.state));
    });
    commitUpdates(this.state, {
      now
    });
    const welcomeBlobBuilder = A.payload("payload", {
      myClientId: clientId,
      state: removeRestrictedData({ ...this.state }, clientId),
      serverTime: now,
      secret
    });
    Object.entries(this.state.blobs ?? {}).forEach(([key, blob]) => welcomeBlobBuilder.blob(key, blob));
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
          confirmed: Date.now(),
          blobs: {}
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
    this.#pushUpdates(newUpdates);
    commitUpdates(this.state, {
      now: Date.now()
    });
    this.#broadcastUpdates(newUpdates, (client) => client !== sender);
    this.#broadcastUpdates(updatesForSender, (client) => client === sender);
    this.#cleanupPeers();
  }
  #pushUpdates(newUpdates) {
    if (!this.state.updates) {
      this.state.updates = [];
    }
    newUpdates?.forEach((update) => this.state.updates?.push(update));
  }
  #broadcastUpdates(newUpdates, senderFilter) {
    if (!newUpdates?.length) {
      return;
    }
    this.#sockets.entries().forEach(async ([client, clientId]) => {
      const blobBuilder = A.payload("payload", {
        updates: removeRestrictedPeersFromUpdates(newUpdates, clientId)
      });
      newUpdates.forEach((update) => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => blobBuilder.blob(key, blob)));
      const buffer = await blobBuilder.build().arrayBuffer();
      if (senderFilter && !senderFilter(client)) {
        return;
      }
      client.send(buffer);
    });
  }
  #cleanupBlobs() {
    const blobSet = new Set(Object.keys(this.state.blobs ?? {}));
    this.#findUsedBlobs(this.state, blobSet);
    if (blobSet.size) {
      const updates = [];
      const now = Date.now();
      blobSet.forEach((key) => {
        updates.push({
          path: `blobs/${key}`,
          value: undefined,
          confirmed: now
        });
      });
      this.#shareUpdates(updates);
    }
  }
  #findUsedBlobs(root, blobSet) {
    if (typeof root === "string") {
      if (blobSet.has(root)) {
        blobSet.delete(root);
      }
    } else if (Array.isArray(root)) {
      root.forEach((value) => this.#findUsedBlobs(value, blobSet));
    } else if (root && typeof root === "object") {
      Object.values(root).forEach((value) => this.#findUsedBlobs(value, blobSet));
    }
  }
}

class SyncSocket {
  #rooms = {};
  constructor(server) {
    this.#hookupSocketServer(server);
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
      const parameters = new URLSearchParams(req.url?.split("?")[1]);
      const roomName = parameters.get("room") ?? "default";
      const room = this.#getRoom(roomName);
      const { clientId } = await room.welcomeClient(socket);
      console.log(`client ${clientId} connected in room ${roomName}.`);
    });
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

class Observer {
  socketClient;
  paths;
  observerManagger;
  multiValues;
  #partsArrays;
  #previousValues = [];
  #changeCallbacks = new Set;
  #addedElementsCallback = new Set;
  #deletedElementsCallback = new Set;
  constructor(socketClient, paths, observerManagger, multiValues = false) {
    this.socketClient = socketClient;
    this.paths = paths;
    this.observerManagger = observerManagger;
    this.multiValues = multiValues;
    this.#partsArrays = paths.map((p) => p === undefined ? [] : p.split("/"));
    this.#previousValues = paths.map(() => {
      return;
    });
    requestAnimationFrame(() => this.triggerIfChanged());
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
  #valuesChanged() {
    const newValues = this.#partsArrays.map((parts) => getLeafObject(this.socketClient.state, parts, 0, false, { self: this.socketClient.clientId }));
    if (this.#previousValues.length && this.#previousValues.every((prev, index) => {
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
  triggerIfChanged() {
    const newValues = this.#valuesChanged();
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
  }
  close() {
    this.observerManagger.removeObserver(this);
  }
}

class ObserverManager {
  socketClient;
  #observers = new Set;
  constructor(socketClient) {
    this.socketClient = socketClient;
  }
  observe(paths, multi) {
    const observer = new Observer(this.socketClient, paths, this, multi);
    this.#observers.add(observer);
    return observer;
  }
  triggerObservers() {
    this.#observers.forEach((o) => o.triggerIfChanged());
  }
  removeObserver(observer) {
    this.#observers.delete(observer);
  }
  close() {
    this.#observers.forEach((o) => o.close());
  }
}

class ClientData {
  socketClient;
  id = "";
  #observerManager;
  constructor(socketClient) {
    this.socketClient = socketClient;
    this.#observerManager = new ObserverManager(socketClient);
  }
  #getAbsolutePath(path) {
    return path ? `clients/~{self}/${path}` : "clients/~{self}";
  }
  observe(paths) {
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    const updatedPaths = pathArray.map((path) => this.#getAbsolutePath(path));
    return this.#observerManager.observe(updatedPaths, multi);
  }
  triggerObservers() {
    this.#observerManager.triggerObservers();
  }
  async setData(path, value, options) {
    return this.socketClient.setData(this.#getAbsolutePath(path), value, options);
  }
  get state() {
    return this.socketClient.state.clients?.[this.id] ?? {};
  }
}

class SubData {
  path;
  socketClient;
  #parts = [];
  #observerManager;
  constructor(path, socketClient) {
    this.path = path;
    this.socketClient = socketClient;
    this.#parts = path.split("/");
    this.#observerManager = new ObserverManager(socketClient);
  }
  #getAbsolutePath(path) {
    return path.length ? `${this.path}/${path}` : this.path;
  }
  observe(paths) {
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    const updatedPaths = pathArray.map((path) => this.#getAbsolutePath(path));
    return this.#observerManager.observe(updatedPaths, multi);
  }
  triggerObservers() {
    this.#observerManager.triggerObservers();
  }
  async setData(path, value, options) {
    return this.socketClient.setData(this.#getAbsolutePath(path), value, options);
  }
  get state() {
    return getLeafObject(this.socketClient.state, this.#parts, 0, false, {
      self: this.socketClient.clientId
    }) ?? {};
  }
  close() {
    this.#observerManager.close();
    this.socketClient.removeChildData(this.path);
  }
}

class PeerManager {
  peerId;
  #peerConnection;
  #dataChannel;
  #onData;
  #onClose;
  #onReady;
  connected = false;
  ready = false;
  constructor(peerId, onData, onIce, onClose, onReady) {
    this.peerId = peerId;
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
  send(data) {
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
      this.send({ msg: "hello" });
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
}
var DELAY_TO_DISCONNECT_WEBSOCKET_AFTER_PEER = 3000;
var PEER_OPTIONS = {
  active: true
};
function checkPeerConnections(socketClient) {
  for (const k in socketClient.state.peer) {
    const clients = k.split(":");
    if (clients[0] === socketClient.clientId) {
      if (clients.length >= 2 && !socketClient.state.peer[`${clients[0]}:${clients[1]}:webRTC`]?.[clients[0]]?.offer) {
        if (!socketClient.peerManagers[clients[1]]) {
          createPeerManager(socketClient, `${clients[0]}:${clients[1]}`, clients[1]);
          socketClient.peerManagers[clients[1]].createOffer().then((offer) => {
            socketClient.setData(`peer/${clients[0]}:${clients[1]}:webRTC/${clients[0]}/offer`, offer, PEER_OPTIONS);
          });
        }
      }
      if (socketClient.state.peer[`${clients[0]}:${clients[1]}:webRTC`]?.[clients[1]]?.answer) {
        if (!socketClient.peerManagers[clients[1]].connected) {
          socketClient.peerManagers[clients[1]].acceptAnswer(socketClient.state.peer[`${clients[0]}:${clients[1]}:webRTC`]?.[clients[1]]?.answer).then(() => {
            console.log("Peer connected");
          });
          socketClient.observe(`peer/${clients[0]}:${clients[1]}:webRTC/${clients[1]}/ice/~{keys}`).onElementsAdded((candidates) => {
            candidates?.forEach((candidateName) => {
              const candidate = socketClient.state.peer?.[`${clients[0]}:${clients[1]}:webRTC`]?.[clients[1]]?.ice?.[candidateName];
              socketClient.peerManagers[clients[1]].addIceCandidate(candidate);
              socketClient.setData(`peer/${clients[0]}:${clients[1]}:webRTC/${clients[1]}/ice/${candidateName}`, undefined, PEER_OPTIONS);
            });
          });
          socketClient.setData(`peer/${clients[0]}:${clients[1]}:webRTC/${clients[1]}/answer`, undefined, PEER_OPTIONS);
        }
      }
    } else if (clients[1] === socketClient.clientId) {
      if (socketClient.state.peer[`${clients[0]}:${clients[1]}:webRTC`]?.[clients[0]]?.offer) {
        if (!socketClient.peerManagers[clients[0]]) {
          createPeerManager(socketClient, `${clients[0]}:${clients[1]}`, clients[0]);
          socketClient.peerManagers[clients[0]].acceptOffer(socketClient.state.peer[`${clients[0]}:${clients[1]}:webRTC`]?.[clients[0]]?.offer).then((answer) => {
            socketClient.setData(`peer/${clients[0]}:${clients[1]}:webRTC/${clients[1]}/answer`, answer, PEER_OPTIONS);
            socketClient.observe(`peer/${clients[0]}:${clients[1]}:webRTC/${clients[0]}/ice/~{keys}`).onElementsAdded((candidates) => {
              candidates?.forEach((candidateName) => {
                const candidate = socketClient.state.peer?.[`${clients[0]}:${clients[1]}:webRTC`]?.[clients[0]]?.ice?.[candidateName];
                socketClient.peerManagers[clients[0]].addIceCandidate(candidate);
                socketClient.setData(`peer/${clients[0]}:${clients[1]}:webRTC/${clients[0]}/ice/${candidateName}`, undefined, PEER_OPTIONS);
              });
            });
          });
          socketClient.setData(`peer/${clients[0]}:${clients[1]}:webRTC/${clients[0]}/offer`, undefined, PEER_OPTIONS);
        }
      }
    }
  }
}
function createPeerManager(socketClient, tag, peerId) {
  console.log("Creating peer manager");
  socketClient.peerManagers[peerId] = new PeerManager(socketClient.clientId, (data) => {
    if (data instanceof Blob) {
      socketClient.processDataBlob(data);
    }
  }, (ice) => {
    const candidate = ice.candidate.split(" ")[0];
    socketClient.setData(`peer/${tag}:webRTC/${socketClient.clientId}/ice/${candidate}`, ice, PEER_OPTIONS);
  }, () => {
    delete socketClient.peerManagers[peerId];
    console.log("Peer closed");
  }, () => {
    if (socketClient.state.config?.peerOnly) {
      setTimeout(() => {
        socketClient.closeSocket();
      }, DELAY_TO_DISCONNECT_WEBSOCKET_AFTER_PEER);
    }
  });
}

class SocketClient {
  state;
  #children = new Map;
  #socket;
  #connectionPromise;
  #connectionUrl;
  #outgoingUpdates = [];
  #selfData = new ClientData(this);
  #observerManager = new ObserverManager(this);
  peerManagers = {};
  #serverTimeOffset = 0;
  #nextFrameInProcess = false;
  #secret;
  constructor(host, room, initialState = {}) {
    this.state = initialState;
    const prefix = host.startsWith("ws://") || host.startsWith("wss://") ? "" : globalThis.location.protocol === "https:" ? "wss://" : "ws://";
    this.#connectionUrl = `${prefix}${host}${room ? `?room=${room}` : ""}`;
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
  #fixPath(path) {
    const split = path.split("/");
    return split.map((part) => translateValue(part, {
      self: this.#selfData.id
    })).join("/");
  }
  #usefulUpdate(update) {
    const currentValue = this.getData(update.path);
    return update.value !== currentValue;
  }
  getData(path) {
    const parts = path.split("/");
    return getLeafObject(this.state, parts, 0, false, { self: this.#selfData.id });
  }
  async#convertValue(path, value) {
    if (typeof value === "function") {
      const updater = value;
      value = updater(this.getData(path));
    }
    const payloadBlobs = {};
    value = await N(value, payloadBlobs);
    return [value, payloadBlobs];
  }
  async pushData(path, value, options = {}) {
    const [val, payloadBlobs] = await this.#convertValue(path, value);
    await this.applyUpdate({
      path: this.#fixPath(path),
      value: val,
      append: true,
      blobs: payloadBlobs
    }, options);
  }
  async setData(path, value, options = {}) {
    const [val, payloadBlobs] = await this.#convertValue(path, value);
    await this.applyUpdate({
      path: this.#fixPath(path),
      value: options.delete ? undefined : val,
      append: options.append,
      insert: options.insert,
      blobs: payloadBlobs
    }, options);
  }
  async applyUpdate(update, options = {}) {
    if (!this.#usefulUpdate(update)) {
      return;
    }
    const isPeerUpdate = this.#isPeerUpdate(update);
    if (!isPeerUpdate) {
      await this.#waitForConnection();
    }
    const active = options.active ?? this.state.config?.activeUpdates ?? false;
    if (active || isPeerUpdate) {
      markUpdateConfirmed(update, this.now);
    }
    if (update.confirmed) {
      this.#queueIncomingUpdates(update);
    }
    this.#queueOutgoingUpdates(update);
  }
  get clientId() {
    return this.#selfData.id;
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
    const multi = Array.isArray(paths);
    const pathArray = paths === undefined ? [] : multi ? paths : [paths];
    return this.#observerManager.observe(pathArray, multi);
  }
  async#waitForConnection() {
    if (!this.#socket) {
      this.#connect();
    }
    return this.#connectionPromise;
  }
  async#connect() {
    const socket = this.#socket = new WebSocket(this.#connectionUrl);
    return this.#connectionPromise = new Promise((resolve, reject) => {
      socket.addEventListener("open", () => {
        console.log("Connected to WebSocket server", this.#connectionUrl);
      });
      socket.addEventListener("error", (event) => {
        console.error("Error connecting to WebSocket server", event);
        reject(event);
      });
      socket.addEventListener("message", async (event) => {
        this.processDataBlob(event.data, resolve);
      });
      socket.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server");
        this.#socket = undefined;
      });
    });
  }
  closeSocket() {
    this.#socket?.close();
  }
  async processDataBlob(blob, onClientIdConfirmed) {
    const { payload, ...blobs } = await W(blob);
    if (payload?.secret) {
      this.#secret = payload.secret;
    }
    if (payload?.serverTime) {
      this.#serverTimeOffset = payload.serverTime - Date.now();
    }
    if (payload?.myClientId) {
      this.#selfData.id = payload.myClientId;
      this.#connectionPromise = undefined;
      onClientIdConfirmed?.();
    }
    if (payload?.state) {
      for (const key in payload.state) {
        this.state[key] = payload.state[key];
      }
      if (Object.keys(blobs).length) {
        this.state.blobs = blobs;
      }
    }
    if (payload?.updates) {
      const updates = payload.updates;
      updates.forEach((update) => {
        const updateBlobs = update.blobs ?? {};
        Object.keys(updateBlobs).forEach((key) => updateBlobs[key] = blobs[key]);
      });
      this.#queueIncomingUpdates(...payload.updates);
    }
    this.#observerManager.triggerObservers();
  }
  #prepareNextFrame() {
    if (this.#nextFrameInProcess) {
      return;
    }
    this.#nextFrameInProcess = true;
    requestAnimationFrame(() => this.#processNextFrame());
  }
  #processNextFrame() {
    this.#nextFrameInProcess = false;
    if (this.state.updates?.length) {
      this.#applyUpdates();
    }
    if (this.#outgoingUpdates.length) {
      this.#broadcastUpdates();
    }
  }
  #queueOutgoingUpdates(...updates) {
    this.#prepareNextFrame();
    this.#outgoingUpdates.push(...updates);
  }
  #queueIncomingUpdates(...updates) {
    this.#prepareNextFrame();
    if (!this.state.updates) {
      this.state.updates = [];
    }
    this.state.updates.push(...updates);
  }
  async#broadcastUpdates() {
    this.#outgoingUpdates.forEach((update, index) => {
      if (update?.path?.startsWith("peer/")) {
        const tag = update.path.split("/")[1];
        const clientIds = tag.split(":");
        if (clientIds.length === 2) {
          const peerId = clientIds[0] === this.clientId ? clientIds[1] : clientIds[0];
          if (this.peerManagers[peerId]?.ready) {
            this.peerManagers[peerId].send(this.#packageUpdates([{ ...update }]));
            this.#outgoingUpdates[index] = undefined;
            return false;
          }
        }
      }
    });
    const outUpdates = this.#outgoingUpdates.filter((update) => !!update).map((update) => C5(update, { secret: this.#secret }));
    if (outUpdates.length) {
      await this.#waitForConnection();
      const blob = this.#packageUpdates(outUpdates);
      this.#socket?.send(blob);
    }
    this.#outgoingUpdates.length = 0;
  }
  #packageUpdates(updates) {
    const blobBuilder = A.payload("payload", { updates });
    const addedBlob = new Set;
    updates.forEach((update) => {
      Object.entries(update?.blobs ?? {}).forEach(([key, blob]) => {
        if (!addedBlob.has(key)) {
          blobBuilder.blob(key, blob);
          addedBlob.add(key);
        }
      });
    });
    return blobBuilder.build();
  }
  #saveBlobsFromUpdates(updates) {
    updates?.forEach((update) => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => {
      const blobs = this.state.blobs ?? (this.state.blobs = {});
      blobs[key] = blob;
    }));
  }
  #applyUpdates() {
    this.#saveBlobsFromUpdates(this.state.updates);
    commitUpdates(this.state, {
      now: this.now
    });
    this.triggerObservers();
    checkPeerConnections(this);
  }
  #isPeerUpdate(update) {
    if (update.path?.startsWith("peer/")) {
      const tag = update.path.split("/")[1];
      const clientIds = tag.split(":");
      return clientIds.length === 2 && (clientIds[0] === this.clientId || clientIds[1] === this.clientId);
    }
    return false;
  }
  triggerObservers() {
    this.#observerManager.triggerObservers();
    this.#children.forEach((child) => child.triggerObservers());
  }
  removeObserver(observer) {
    this.#observerManager.removeObserver(observer);
  }
  get now() {
    return Date.now() + this.#serverTimeOffset;
  }
}

// ../src/cycles/data-update/data-update.ts
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
  clearUpdates(root, updatedPaths);
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
function clearUpdates(root, updatedPaths) {
  root.updates = root.updates?.filter((update) => !(update.path in updatedPaths));
  if (!root.updates?.length) {
    delete root.updates;
  }
}
function sortUpdates2(updates) {
  updates?.sort((a, b) => {
    const confirmedA = a.confirmed ?? 0;
    const confirmedB = b.confirmed ?? 0;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    return a.path.localeCompare(b.path);
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
// ../node_modules/@dobuki/data-blob/dist/index.js
var gt = Object.create;
var { defineProperty: Rn, getPrototypeOf: Yt, getOwnPropertyNames: wt } = Object;
var Et = Object.prototype.hasOwnProperty;
var Nt = (t, n, h) => {
  h = t != null ? gt(Yt(t)) : {};
  let c2 = n || !t || !t.__esModule ? Rn(h, "default", { value: t, enumerable: true }) : h;
  for (let i of wt(t))
    if (!Et.call(c2, i))
      Rn(c2, i, { get: () => t[i], enumerable: true });
  return c2;
};
var R = (t, n) => () => (n || t((n = { exports: {} }).exports, n), n.exports);
var jt = R((t, n) => {
  var h = function(S) {
    throw { name: "SyntaxError", message: S, at: Y, text: P };
  }, c2 = function(S) {
    if (S && S !== m2)
      h("Expected '" + S + "' instead of '" + m2 + "'");
    return m2 = P.charAt(Y), Y += 1, m2;
  }, i = function() {
    var S, T4 = "";
    if (m2 === "-")
      T4 = "-", c2("-");
    while (m2 >= "0" && m2 <= "9")
      T4 += m2, c2();
    if (m2 === ".") {
      T4 += ".";
      while (c2() && m2 >= "0" && m2 <= "9")
        T4 += m2;
    }
    if (m2 === "e" || m2 === "E") {
      if (T4 += m2, c2(), m2 === "-" || m2 === "+")
        T4 += m2, c2();
      while (m2 >= "0" && m2 <= "9")
        T4 += m2, c2();
    }
    if (S = Number(T4), !isFinite(S))
      h("Bad number");
    return S;
  }, g2 = function() {
    var S, T4, v = "", x;
    if (m2 === '"')
      while (c2())
        if (m2 === '"')
          return c2(), v;
        else if (m2 === "\\")
          if (c2(), m2 === "u") {
            x = 0;
            for (T4 = 0;T4 < 4; T4 += 1) {
              if (S = parseInt(c2(), 16), !isFinite(S))
                break;
              x = x * 16 + S;
            }
            v += String.fromCharCode(x);
          } else if (typeof s[m2] === "string")
            v += s[m2];
          else
            break;
        else
          v += m2;
    h("Bad string");
  }, w2 = function() {
    while (m2 && m2 <= " ")
      c2();
  }, I2 = function() {
    switch (m2) {
      case "t":
        return c2("t"), c2("r"), c2("u"), c2("e"), true;
      case "f":
        return c2("f"), c2("a"), c2("l"), c2("s"), c2("e"), false;
      case "n":
        return c2("n"), c2("u"), c2("l"), c2("l"), null;
      default:
        h("Unexpected '" + m2 + "'");
    }
  }, E4 = function() {
    var S = [];
    if (m2 === "[") {
      if (c2("["), w2(), m2 === "]")
        return c2("]"), S;
      while (m2) {
        if (S.push($2()), w2(), m2 === "]")
          return c2("]"), S;
        c2(","), w2();
      }
    }
    h("Bad array");
  }, j = function() {
    var S, T4 = {};
    if (m2 === "{") {
      if (c2("{"), w2(), m2 === "}")
        return c2("}"), T4;
      while (m2) {
        if (S = g2(), w2(), c2(":"), Object.prototype.hasOwnProperty.call(T4, S))
          h('Duplicate key "' + S + '"');
        if (T4[S] = $2(), w2(), m2 === "}")
          return c2("}"), T4;
        c2(","), w2();
      }
    }
    h("Bad object");
  }, $2 = function() {
    switch (w2(), m2) {
      case "{":
        return j();
      case "[":
        return E4();
      case '"':
        return g2();
      case "-":
        return i();
      default:
        return m2 >= "0" && m2 <= "9" ? i() : I2();
    }
  }, Y, m2, s = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, P;
  n.exports = function(S, T4) {
    var v;
    if (P = S, Y = 0, m2 = " ", v = $2(), w2(), m2)
      h("Syntax error");
    return typeof T4 === "function" ? function x(O, C) {
      var D, b, k = O[C];
      if (k && typeof k === "object") {
        for (D in $2)
          if (Object.prototype.hasOwnProperty.call(k, D))
            if (b = x(k, D), typeof b === "undefined")
              delete k[D];
            else
              k[D] = b;
      }
      return T4.call(O, C, k);
    }({ "": v }, "") : v;
  };
});
var $t = R((t, n) => {
  var h = function(j) {
    return i.lastIndex = 0, i.test(j) ? '"' + j.replace(i, function($2) {
      var Y = I2[$2];
      return typeof Y === "string" ? Y : "\\u" + ("0000" + $2.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + j + '"';
  }, c2 = function(j, $2) {
    var Y, m2, s, P, S = g2, T4, v = $2[j];
    if (v && typeof v === "object" && typeof v.toJSON === "function")
      v = v.toJSON(j);
    if (typeof E4 === "function")
      v = E4.call($2, j, v);
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
        if (g2 += w2, T4 = [], Object.prototype.toString.apply(v) === "[object Array]") {
          P = v.length;
          for (Y = 0;Y < P; Y += 1)
            T4[Y] = c2(Y, v) || "null";
          return s = T4.length === 0 ? "[]" : g2 ? `[
` + g2 + T4.join(`,
` + g2) + `
` + S + "]" : "[" + T4.join(",") + "]", g2 = S, s;
        }
        if (E4 && typeof E4 === "object") {
          P = E4.length;
          for (Y = 0;Y < P; Y += 1)
            if (m2 = E4[Y], typeof m2 === "string") {
              if (s = c2(m2, v), s)
                T4.push(h(m2) + (g2 ? ": " : ":") + s);
            }
        } else
          for (m2 in v)
            if (Object.prototype.hasOwnProperty.call(v, m2)) {
              if (s = c2(m2, v), s)
                T4.push(h(m2) + (g2 ? ": " : ":") + s);
            }
        return s = T4.length === 0 ? "{}" : g2 ? `{
` + g2 + T4.join(`,
` + g2) + `
` + S + "}" : "{" + T4.join(",") + "}", g2 = S, s;
      default:
    }
  }, i = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, g2, w2, I2 = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, E4;
  n.exports = function(j, $2, Y) {
    var m2;
    if (g2 = "", w2 = "", typeof Y === "number")
      for (m2 = 0;m2 < Y; m2 += 1)
        w2 += " ";
    else if (typeof Y === "string")
      w2 = Y;
    if (E4 = $2, $2 && typeof $2 !== "function" && (typeof $2 !== "object" || typeof $2.length !== "number"))
      throw new Error("JSON.stringify");
    return c2("", { "": j });
  };
});
var st = R((t) => {
  t.parse = jt(), t.stringify = $t();
});
var It = R((t, n) => {
  var h = {}.toString;
  n.exports = Array.isArray || function(c2) {
    return h.call(c2) == "[object Array]";
  };
});
var fn = R((t, n) => {
  var h = Object.prototype.toString;
  n.exports = function c(i) {
    var g2 = h.call(i), w2 = g2 === "[object Arguments]";
    if (!w2)
      w2 = g2 !== "[object Array]" && i !== null && typeof i === "object" && typeof i.length === "number" && i.length >= 0 && h.call(i.callee) === "[object Function]";
    return w2;
  };
});
var Pt = R((t, n) => {
  var h;
  if (!Object.keys)
    c2 = Object.prototype.hasOwnProperty, i = Object.prototype.toString, g2 = fn(), w2 = Object.prototype.propertyIsEnumerable, I2 = !w2.call({ toString: null }, "toString"), E4 = w2.call(function() {}, "prototype"), j = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], $2 = function(P) {
      var S = P.constructor;
      return S && S.prototype === P;
    }, Y = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, m2 = function() {
      if (typeof window === "undefined")
        return false;
      for (var P in window)
        try {
          if (!Y["$" + P] && c2.call(window, P) && window[P] !== null && typeof window[P] === "object")
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
      if (typeof window === "undefined" || !m2)
        return $2(P);
      try {
        return $2(P);
      } catch (S) {
        return false;
      }
    }, h = function P(S) {
      var T4 = S !== null && typeof S === "object", v = i.call(S) === "[object Function]", x = g2(S), O = T4 && i.call(S) === "[object String]", C = [];
      if (!T4 && !v && !x)
        throw new TypeError("Object.keys called on a non-object");
      var D = E4 && v;
      if (O && S.length > 0 && !c2.call(S, 0))
        for (var b = 0;b < S.length; ++b)
          C.push(String(b));
      if (x && S.length > 0)
        for (var k = 0;k < S.length; ++k)
          C.push(String(k));
      else
        for (var f2 in S)
          if (!(D && f2 === "prototype") && c2.call(S, f2))
            C.push(String(f2));
      if (I2) {
        var G2 = s(S);
        for (var U = 0;U < j.length; ++U)
          if (!(G2 && j[U] === "constructor") && c2.call(S, j[U]))
            C.push(j[U]);
      }
      return C;
    };
  var c2, i, g2, w2, I2, E4, j, $2, Y, m2, s;
  n.exports = h;
});
var St = R((t, n) => {
  var h = Array.prototype.slice, c2 = fn(), i = Object.keys, g2 = i ? function I(E4) {
    return i(E4);
  } : Pt(), w2 = Object.keys;
  g2.shim = function I() {
    if (Object.keys) {
      var E4 = function() {
        var j = Object.keys(arguments);
        return j && j.length === arguments.length;
      }(1, 2);
      if (!E4)
        Object.keys = function j($2) {
          if (c2($2))
            return w2(h.call($2));
          return w2($2);
        };
    } else
      Object.keys = g2;
    return Object.keys || g2;
  }, n.exports = g2;
});
var vt = R((t, n) => {
  var h = "Function.prototype.bind called on incompatible ", c2 = Object.prototype.toString, i = Math.max, g2 = "[object Function]", w2 = function j($2, Y) {
    var m2 = [];
    for (var s = 0;s < $2.length; s += 1)
      m2[s] = $2[s];
    for (var P = 0;P < Y.length; P += 1)
      m2[P + $2.length] = Y[P];
    return m2;
  }, I2 = function j($2, Y) {
    var m2 = [];
    for (var s = Y || 0, P = 0;s < $2.length; s += 1, P += 1)
      m2[P] = $2[s];
    return m2;
  }, E4 = function(j, $2) {
    var Y = "";
    for (var m2 = 0;m2 < j.length; m2 += 1)
      if (Y += j[m2], m2 + 1 < j.length)
        Y += $2;
    return Y;
  };
  n.exports = function j($2) {
    var Y = this;
    if (typeof Y !== "function" || c2.apply(Y) !== g2)
      throw new TypeError(h + Y);
    var m2 = I2(arguments, 1), s, P = function() {
      if (this instanceof s) {
        var O = Y.apply(this, w2(m2, arguments));
        if (Object(O) === O)
          return O;
        return this;
      }
      return Y.apply($2, w2(m2, arguments));
    }, S = i(0, Y.length - m2.length), T4 = [];
    for (var v = 0;v < S; v++)
      T4[v] = "$" + v;
    if (s = Function("binder", "return function (" + E4(T4, ",") + "){ return binder.apply(this,arguments); }")(P), Y.prototype) {
      var x = function O() {};
      x.prototype = Y.prototype, s.prototype = new x, x.prototype = null;
    }
    return s;
  };
});
var Tn = R((t, n) => {
  var h = vt();
  n.exports = Function.prototype.bind || h;
});
var Tt = R((t, n) => {
  n.exports = Error;
});
var At = R((t, n) => {
  n.exports = EvalError;
});
var kt = R((t, n) => {
  n.exports = RangeError;
});
var xt = R((t, n) => {
  n.exports = ReferenceError;
});
var Vn = R((t, n) => {
  n.exports = SyntaxError;
});
var An = R((t, n) => {
  n.exports = TypeError;
});
var Ct = R((t, n) => {
  n.exports = URIError;
});
var Ot = R((t, n) => {
  n.exports = function h() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var c2 = {}, i = Symbol("test"), g2 = Object(i);
    if (typeof i === "string")
      return false;
    if (Object.prototype.toString.call(i) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(g2) !== "[object Symbol]")
      return false;
    var w2 = 42;
    c2[i] = w2;
    for (i in c2)
      return false;
    if (typeof Object.keys === "function" && Object.keys(c2).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(c2).length !== 0)
      return false;
    var I2 = Object.getOwnPropertySymbols(c2);
    if (I2.length !== 1 || I2[0] !== i)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(c2, i))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var E4 = Object.getOwnPropertyDescriptor(c2, i);
      if (E4.value !== w2 || E4.enumerable !== true)
        return false;
    }
    return true;
  };
});
var yn = R((t, n) => {
  var h = typeof Symbol !== "undefined" && Symbol, c2 = Ot();
  n.exports = function i() {
    if (typeof h !== "function")
      return false;
    if (typeof Symbol !== "function")
      return false;
    if (typeof h("foo") !== "symbol")
      return false;
    if (typeof Symbol("bar") !== "symbol")
      return false;
    return c2();
  };
});
var on = R((t, n) => {
  var h = { foo: {} }, c2 = Object;
  n.exports = function i() {
    return { __proto__: h }.foo === h.foo && !({ __proto__: null } instanceof c2);
  };
});
var Gn = R((t, n) => {
  var h = Function.prototype.call, c2 = Object.prototype.hasOwnProperty, i = Tn();
  n.exports = i.call(h, c2);
});
var kn = R((t, n) => {
  var h, c2 = Tt(), i = At(), g2 = kt(), w2 = xt(), I2 = Vn(), E4 = An(), j = Ct(), $2 = Function, Y = function(M2) {
    try {
      return $2('"use strict"; return (' + M2 + ").constructor;")();
    } catch (r) {}
  }, m2 = Object.getOwnPropertyDescriptor;
  if (m2)
    try {
      m2({}, "");
    } catch (M2) {
      m2 = null;
    }
  var s = function() {
    throw new E4;
  }, P = m2 ? function() {
    try {
      return arguments.callee, s;
    } catch (M2) {
      try {
        return m2(arguments, "callee").get;
      } catch (r) {
        return s;
      }
    }
  }() : s, S = yn()(), T4 = on()(), v = Object.getPrototypeOf || (T4 ? function(M2) {
    return M2.__proto__;
  } : null), x = {}, O = typeof Uint8Array === "undefined" || !v ? h : v(Uint8Array), C = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? h : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? h : ArrayBuffer, "%ArrayIteratorPrototype%": S && v ? v([][Symbol.iterator]()) : h, "%AsyncFromSyncIteratorPrototype%": h, "%AsyncFunction%": x, "%AsyncGenerator%": x, "%AsyncGeneratorFunction%": x, "%AsyncIteratorPrototype%": x, "%Atomics%": typeof Atomics === "undefined" ? h : Atomics, "%BigInt%": typeof BigInt === "undefined" ? h : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? h : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? h : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? h : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": c2, "%eval%": eval, "%EvalError%": i, "%Float32Array%": typeof Float32Array === "undefined" ? h : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? h : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? h : FinalizationRegistry, "%Function%": $2, "%GeneratorFunction%": x, "%Int8Array%": typeof Int8Array === "undefined" ? h : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? h : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? h : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": S && v ? v(v([][Symbol.iterator]())) : h, "%JSON%": typeof JSON === "object" ? JSON : h, "%Map%": typeof Map === "undefined" ? h : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !S || !v ? h : v(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? h : Promise, "%Proxy%": typeof Proxy === "undefined" ? h : Proxy, "%RangeError%": g2, "%ReferenceError%": w2, "%Reflect%": typeof Reflect === "undefined" ? h : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? h : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !S || !v ? h : v(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? h : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": S && v ? v(""[Symbol.iterator]()) : h, "%Symbol%": S ? Symbol : h, "%SyntaxError%": I2, "%ThrowTypeError%": P, "%TypedArray%": O, "%TypeError%": E4, "%Uint8Array%": typeof Uint8Array === "undefined" ? h : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? h : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? h : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? h : Uint32Array, "%URIError%": j, "%WeakMap%": typeof WeakMap === "undefined" ? h : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? h : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? h : WeakSet };
  if (v)
    try {
      null.error;
    } catch (M2) {
      D = v(v(M2)), C["%Error.prototype%"] = D;
    }
  var D, b = function M(r) {
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
  }, k = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, f2 = Tn(), G2 = Gn(), U = f2.call(Function.call, Array.prototype.concat), l = f2.call(Function.apply, Array.prototype.splice), hn = f2.call(Function.call, String.prototype.replace), a = f2.call(Function.call, String.prototype.slice), K = f2.call(Function.call, RegExp.prototype.exec), W2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, d = /\\(\\)?/g, p = function M(r) {
    var u = a(r, 0, 1), L = a(r, -1);
    if (u === "%" && L !== "%")
      throw new I2("invalid intrinsic syntax, expected closing `%`");
    else if (L === "%" && u !== "%")
      throw new I2("invalid intrinsic syntax, expected opening `%`");
    var e = [];
    return hn(r, W2, function(o, Z, H2, X2) {
      e[e.length] = H2 ? hn(X2, d, "$1") : Z || o;
    }), e;
  }, V = function M(r, u) {
    var L = r, e;
    if (G2(k, L))
      e = k[L], L = "%" + e[0] + "%";
    if (G2(C, L)) {
      var o = C[L];
      if (o === x)
        o = b(L);
      if (typeof o === "undefined" && !u)
        throw new E4("intrinsic " + r + " exists, but is not available. Please file an issue!");
      return { alias: e, name: L, value: o };
    }
    throw new I2("intrinsic " + r + " does not exist!");
  };
  n.exports = function M(r, u) {
    if (typeof r !== "string" || r.length === 0)
      throw new E4("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof u !== "boolean")
      throw new E4('"allowMissing" argument must be a boolean');
    if (K(/^%?[^%]*%?$/, r) === null)
      throw new I2("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var L = p(r), e = L.length > 0 ? L[0] : "", o = V("%" + e + "%", u), Z = o.name, H2 = o.value, X2 = false, nn = o.alias;
    if (nn)
      e = nn[0], l(L, U([0, 1], nn));
    for (var z = 1, gn = true;z < L.length; z += 1) {
      var _ = L[z], $n = a(_, 0, 1), sn = a(_, -1);
      if (($n === '"' || $n === "'" || $n === "`" || (sn === '"' || sn === "'" || sn === "`")) && $n !== sn)
        throw new I2("property names with quotes must have matching quotes");
      if (_ === "constructor" || !gn)
        X2 = true;
      if (e += "." + _, Z = "%" + e + "%", G2(C, Z))
        H2 = C[Z];
      else if (H2 != null) {
        if (!(_ in H2)) {
          if (!u)
            throw new E4("base intrinsic for " + r + " exists, but the property is not available.");
          return;
        }
        if (m2 && z + 1 >= L.length) {
          var In = m2(H2, _);
          if (gn = !!In, gn && "get" in In && !("originalValue" in In.get))
            H2 = In.get;
          else
            H2 = H2[_];
        } else
          gn = G2(H2, _), H2 = H2[_];
        if (gn && !X2)
          C[Z] = H2;
      }
    }
    return H2;
  };
});
var On = R((t, n) => {
  var h = kn(), c2 = h("%Object.defineProperty%", true) || false;
  if (c2)
    try {
      c2({}, "a", { value: 1 });
    } catch (i) {
      c2 = false;
    }
  n.exports = c2;
});
var ut = R((t, n) => {
  var h, c2 = SyntaxError, i = Function, g2 = TypeError, w2 = function(K) {
    try {
      return i('"use strict"; return (' + K + ").constructor;")();
    } catch (W2) {}
  }, I2 = Object.getOwnPropertyDescriptor;
  if (I2)
    try {
      I2({}, "");
    } catch (K) {
      I2 = null;
    }
  var E4 = function() {
    throw new g2;
  }, j = I2 ? function() {
    try {
      return arguments.callee, E4;
    } catch (K) {
      try {
        return I2(arguments, "callee").get;
      } catch (W2) {
        return E4;
      }
    }
  }() : E4, $2 = yn()(), Y = on()(), m2 = Object.getPrototypeOf || (Y ? function(K) {
    return K.__proto__;
  } : null), s = {}, P = typeof Uint8Array === "undefined" || !m2 ? h : m2(Uint8Array), S = { "%AggregateError%": typeof AggregateError === "undefined" ? h : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? h : ArrayBuffer, "%ArrayIteratorPrototype%": $2 && m2 ? m2([][Symbol.iterator]()) : h, "%AsyncFromSyncIteratorPrototype%": h, "%AsyncFunction%": s, "%AsyncGenerator%": s, "%AsyncGeneratorFunction%": s, "%AsyncIteratorPrototype%": s, "%Atomics%": typeof Atomics === "undefined" ? h : Atomics, "%BigInt%": typeof BigInt === "undefined" ? h : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? h : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? h : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? h : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? h : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? h : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? h : FinalizationRegistry, "%Function%": i, "%GeneratorFunction%": s, "%Int8Array%": typeof Int8Array === "undefined" ? h : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? h : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? h : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": $2 && m2 ? m2(m2([][Symbol.iterator]())) : h, "%JSON%": typeof JSON === "object" ? JSON : h, "%Map%": typeof Map === "undefined" ? h : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !$2 || !m2 ? h : m2(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? h : Promise, "%Proxy%": typeof Proxy === "undefined" ? h : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? h : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? h : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !$2 || !m2 ? h : m2(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? h : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": $2 && m2 ? m2(""[Symbol.iterator]()) : h, "%Symbol%": $2 ? Symbol : h, "%SyntaxError%": c2, "%ThrowTypeError%": j, "%TypedArray%": P, "%TypeError%": g2, "%Uint8Array%": typeof Uint8Array === "undefined" ? h : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? h : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? h : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? h : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? h : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? h : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? h : WeakSet };
  if (m2)
    try {
      null.error;
    } catch (K) {
      T4 = m2(m2(K)), S["%Error.prototype%"] = T4;
    }
  var T4, v = function K(W2) {
    var d;
    if (W2 === "%AsyncFunction%")
      d = w2("async function () {}");
    else if (W2 === "%GeneratorFunction%")
      d = w2("function* () {}");
    else if (W2 === "%AsyncGeneratorFunction%")
      d = w2("async function* () {}");
    else if (W2 === "%AsyncGenerator%") {
      var p = K("%AsyncGeneratorFunction%");
      if (p)
        d = p.prototype;
    } else if (W2 === "%AsyncIteratorPrototype%") {
      var V = K("%AsyncGenerator%");
      if (V && m2)
        d = m2(V.prototype);
    }
    return S[W2] = d, d;
  }, x = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, O = Tn(), C = Gn(), D = O.call(Function.call, Array.prototype.concat), b = O.call(Function.apply, Array.prototype.splice), k = O.call(Function.call, String.prototype.replace), f2 = O.call(Function.call, String.prototype.slice), G2 = O.call(Function.call, RegExp.prototype.exec), U = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, l = /\\(\\)?/g, hn = function K(W2) {
    var d = f2(W2, 0, 1), p = f2(W2, -1);
    if (d === "%" && p !== "%")
      throw new c2("invalid intrinsic syntax, expected closing `%`");
    else if (p === "%" && d !== "%")
      throw new c2("invalid intrinsic syntax, expected opening `%`");
    var V = [];
    return k(W2, U, function(M2, r, u, L) {
      V[V.length] = u ? k(L, l, "$1") : r || M2;
    }), V;
  }, a = function K(W2, d) {
    var p = W2, V;
    if (C(x, p))
      V = x[p], p = "%" + V[0] + "%";
    if (C(S, p)) {
      var M2 = S[p];
      if (M2 === s)
        M2 = v(p);
      if (typeof M2 === "undefined" && !d)
        throw new g2("intrinsic " + W2 + " exists, but is not available. Please file an issue!");
      return { alias: V, name: p, value: M2 };
    }
    throw new c2("intrinsic " + W2 + " does not exist!");
  };
  n.exports = function K(W2, d) {
    if (typeof W2 !== "string" || W2.length === 0)
      throw new g2("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof d !== "boolean")
      throw new g2('"allowMissing" argument must be a boolean');
    if (G2(/^%?[^%]*%?$/, W2) === null)
      throw new c2("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var p = hn(W2), V = p.length > 0 ? p[0] : "", M2 = a("%" + V + "%", d), r = M2.name, u = M2.value, L = false, e = M2.alias;
    if (e)
      V = e[0], b(p, D([0, 1], e));
    for (var o = 1, Z = true;o < p.length; o += 1) {
      var H2 = p[o], X2 = f2(H2, 0, 1), nn = f2(H2, -1);
      if ((X2 === '"' || X2 === "'" || X2 === "`" || (nn === '"' || nn === "'" || nn === "`")) && X2 !== nn)
        throw new c2("property names with quotes must have matching quotes");
      if (H2 === "constructor" || !Z)
        L = true;
      if (V += "." + H2, r = "%" + V + "%", C(S, r))
        u = S[r];
      else if (u != null) {
        if (!(H2 in u)) {
          if (!d)
            throw new g2("base intrinsic for " + W2 + " exists, but the property is not available.");
          return;
        }
        if (I2 && o + 1 >= p.length) {
          var z = I2(u, H2);
          if (Z = !!z, Z && "get" in z && !("originalValue" in z.get))
            u = z.get;
          else
            u = u[H2];
        } else
          Z = C(u, H2), u = u[H2];
        if (Z && !L)
          S[r] = u;
      }
    }
    return u;
  };
});
var ln = R((t, n) => {
  var h = ut(), c2 = h("%Object.getOwnPropertyDescriptor%", true);
  if (c2)
    try {
      c2([], "length");
    } catch (i) {
      c2 = null;
    }
  n.exports = c2;
});
var Rt = R((t, n) => {
  var h = On(), c2 = Vn(), i = An(), g2 = ln();
  n.exports = function w(I2, E4, j) {
    if (!I2 || typeof I2 !== "object" && typeof I2 !== "function")
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
    var $2 = arguments.length > 3 ? arguments[3] : null, Y = arguments.length > 4 ? arguments[4] : null, m2 = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : false, P = !!g2 && g2(I2, E4);
    if (h)
      h(I2, E4, { configurable: m2 === null && P ? P.configurable : !m2, enumerable: $2 === null && P ? P.enumerable : !$2, value: j, writable: Y === null && P ? P.writable : !Y });
    else if (s || !$2 && !Y && !m2)
      I2[E4] = j;
    else
      throw new c2("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Dt = R((t, n) => {
  var h = On(), c2 = function i() {
    return !!h;
  };
  c2.hasArrayLengthDefineBug = function i() {
    if (!h)
      return null;
    try {
      return h([], "length", { value: 1 }).length !== 1;
    } catch (g2) {
      return true;
    }
  }, n.exports = c2;
});
var rt = R((t, n) => {
  var h = kn(), c2 = Rt(), i = Dt()(), g2 = ln(), w2 = An(), I2 = h("%Math.floor%");
  n.exports = function E(j, $2) {
    if (typeof j !== "function")
      throw new w2("`fn` is not a function");
    if (typeof $2 !== "number" || $2 < 0 || $2 > 4294967295 || I2($2) !== $2)
      throw new w2("`length` must be a positive 32-bit integer");
    var Y = arguments.length > 2 && !!arguments[2], m2 = true, s = true;
    if ("length" in j && g2) {
      var P = g2(j, "length");
      if (P && !P.configurable)
        m2 = false;
      if (P && !P.writable)
        s = false;
    }
    if (m2 || s || !Y)
      if (i)
        c2(j, "length", $2, true, true);
      else
        c2(j, "length", $2);
    return j;
  };
});
var Zn = R((t, n) => {
  var h = Tn(), c2 = kn(), i = rt(), g2 = An(), w2 = c2("%Function.prototype.apply%"), I2 = c2("%Function.prototype.call%"), E4 = c2("%Reflect.apply%", true) || h.call(I2, w2), j = On(), $2 = c2("%Math.max%");
  n.exports = function m(s) {
    if (typeof s !== "function")
      throw new g2("a function is required");
    var P = E4(h, I2, arguments);
    return i(P, 1 + $2(0, s.length - (arguments.length - 1)), true);
  };
  var Y = function m() {
    return E4(h, w2, arguments);
  };
  if (j)
    j(n.exports, "apply", { value: Y });
  else
    n.exports.apply = Y;
});
var Wt = R((t, n) => {
  var h = kn(), c2 = Zn(), i = c2(h("String.prototype.indexOf"));
  n.exports = function g(w2, I2) {
    var E4 = h(w2, !!I2);
    if (typeof E4 === "function" && i(w2, ".prototype.") > -1)
      return c2(E4);
    return E4;
  };
});
var bt = R((t, n) => {
  var h = (typeof JSON !== "undefined" ? JSON : st()).stringify, c2 = It(), i = St(), g2 = Zn(), w2 = Wt(), I2 = w2("Array.prototype.join"), E4 = w2("Array.prototype.push"), j = function Y(m2, s) {
    var P = "";
    for (var S = 0;S < m2; S += 1)
      P += s;
    return P;
  }, $2 = function(Y, m2, s) {
    return s;
  };
  n.exports = function Y(m2) {
    var s = arguments.length > 1 ? arguments[1] : undefined, P = s && s.space || "";
    if (typeof P === "number")
      P = j(P, " ");
    var S = !!s && typeof s.cycles === "boolean" && s.cycles, T4 = s && s.replacer ? g2(s.replacer) : $2, v = typeof s === "function" ? s : s && s.cmp, x = v && function(C) {
      var D = v.length > 2 && function b(k) {
        return C[k];
      };
      return function(b, k) {
        return v({ key: b, value: C[b] }, { key: k, value: C[k] }, D ? { __proto__: null, get: D } : undefined);
      };
    }, O = [];
    return function C(D, b, k, f2) {
      var G2 = P ? `
` + j(f2, P) : "", U = P ? ": " : ":";
      if (k && k.toJSON && typeof k.toJSON === "function")
        k = k.toJSON();
      if (k = T4(D, b, k), k === undefined)
        return;
      if (typeof k !== "object" || k === null)
        return h(k);
      if (c2(k)) {
        var K = [];
        for (var l = 0;l < k.length; l++) {
          var hn = C(k, l, k[l], f2 + 1) || h(null);
          E4(K, G2 + P + hn);
        }
        return "[" + I2(K, ",") + G2 + "]";
      }
      if (O.indexOf(k) !== -1) {
        if (S)
          return h("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        E4(O, k);
      var a = i(k).sort(x && x(k)), K = [];
      for (var l = 0;l < a.length; l++) {
        var b = a[l], W2 = C(k, b, k[b], f2 + 1);
        if (!W2)
          continue;
        var d = h(b) + U + W2;
        E4(K, G2 + P + d);
      }
      return O.splice(O.indexOf(k), 1), "{" + I2(K, ",") + G2 + "}";
    }({ "": m2 }, "", m2, 0);
  };
});
var Dn = Nt(bt(), 1);
var rn = function(t, n, h, c2) {
  let i, g2, w2, I2 = n || [0], E4 = (h = h || 0) >>> 3, j = c2 === -1 ? 3 : 0;
  for (i = 0;i < t.length; i += 1)
    w2 = i + E4, g2 = w2 >>> 2, I2.length <= g2 && I2.push(0), I2[g2] |= t[i] << 8 * (j + c2 * (w2 % 4));
  return { value: I2, binLen: 8 * t.length + h };
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
      return function(c2, i, g2) {
        return function(w2, I2, E4, j) {
          let $2, Y, m2, s;
          if (w2.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          let P = I2 || [0], S = (E4 = E4 || 0) >>> 3, T4 = j === -1 ? 3 : 0;
          for ($2 = 0;$2 < w2.length; $2 += 2) {
            if (Y = parseInt(w2.substr($2, 2), 16), isNaN(Y))
              throw new Error("String of HEX type contains invalid characters");
            for (s = ($2 >>> 1) + S, m2 = s >>> 2;P.length <= m2; )
              P.push(0);
            P[m2] |= Y << 8 * (T4 + j * (s % 4));
          }
          return { value: P, binLen: 4 * w2.length + E4 };
        }(c2, i, g2, h);
      };
    case "TEXT":
      return function(c2, i, g2) {
        return function(w2, I2, E4, j, $2) {
          let Y, m2, s, P, S, T4, v, x, O = 0, C = E4 || [0], D = (j = j || 0) >>> 3;
          if (I2 === "UTF8")
            for (v = $2 === -1 ? 3 : 0, s = 0;s < w2.length; s += 1)
              for (Y = w2.charCodeAt(s), m2 = [], 128 > Y ? m2.push(Y) : 2048 > Y ? (m2.push(192 | Y >>> 6), m2.push(128 | 63 & Y)) : 55296 > Y || 57344 <= Y ? m2.push(224 | Y >>> 12, 128 | Y >>> 6 & 63, 128 | 63 & Y) : (s += 1, Y = 65536 + ((1023 & Y) << 10 | 1023 & w2.charCodeAt(s)), m2.push(240 | Y >>> 18, 128 | Y >>> 12 & 63, 128 | Y >>> 6 & 63, 128 | 63 & Y)), P = 0;P < m2.length; P += 1) {
                for (T4 = O + D, S = T4 >>> 2;C.length <= S; )
                  C.push(0);
                C[S] |= m2[P] << 8 * (v + $2 * (T4 % 4)), O += 1;
              }
          else
            for (v = $2 === -1 ? 2 : 0, x = I2 === "UTF16LE" && $2 !== 1 || I2 !== "UTF16LE" && $2 === 1, s = 0;s < w2.length; s += 1) {
              for (Y = w2.charCodeAt(s), x === true && (P = 255 & Y, Y = P << 8 | Y >>> 8), T4 = O + D, S = T4 >>> 2;C.length <= S; )
                C.push(0);
              C[S] |= Y << 8 * (v + $2 * (T4 % 4)), O += 2;
            }
          return { value: C, binLen: 8 * O + j };
        }(c2, n, i, g2, h);
      };
    case "B64":
      return function(c2, i, g2) {
        return function(w2, I2, E4, j) {
          let $2, Y, m2, s, P, S, T4, v = 0, x = I2 || [0], O = (E4 = E4 || 0) >>> 3, C = j === -1 ? 3 : 0, D = w2.indexOf("=");
          if (w2.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (w2 = w2.replace(/=/g, ""), D !== -1 && D < w2.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (Y = 0;Y < w2.length; Y += 4) {
            for (P = w2.substr(Y, 4), s = 0, m2 = 0;m2 < P.length; m2 += 1)
              $2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(P.charAt(m2)), s |= $2 << 18 - 6 * m2;
            for (m2 = 0;m2 < P.length - 1; m2 += 1) {
              for (T4 = v + O, S = T4 >>> 2;x.length <= S; )
                x.push(0);
              x[S] |= (s >>> 16 - 8 * m2 & 255) << 8 * (C + j * (T4 % 4)), v += 1;
            }
          }
          return { value: x, binLen: 8 * v + E4 };
        }(c2, i, g2, h);
      };
    case "BYTES":
      return function(c2, i, g2) {
        return function(w2, I2, E4, j) {
          let $2, Y, m2, s, P = I2 || [0], S = (E4 = E4 || 0) >>> 3, T4 = j === -1 ? 3 : 0;
          for (Y = 0;Y < w2.length; Y += 1)
            $2 = w2.charCodeAt(Y), s = Y + S, m2 = s >>> 2, P.length <= m2 && P.push(0), P[m2] |= $2 << 8 * (T4 + j * (s % 4));
          return { value: P, binLen: 8 * w2.length + E4 };
        }(c2, i, g2, h);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (c2) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(c2, i, g2) {
        return function(w2, I2, E4, j) {
          return rn(new Uint8Array(w2), I2, E4, j);
        }(c2, i, g2, h);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (c2) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(c2, i, g2) {
        return rn(c2, i, g2, h);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var Wn = function(t, n, h, c2) {
  switch (t) {
    case "HEX":
      return function(i) {
        return function(g2, w2, I2, E4) {
          let j, $2, Y = "", m2 = w2 / 8, s = I2 === -1 ? 3 : 0;
          for (j = 0;j < m2; j += 1)
            $2 = g2[j >>> 2] >>> 8 * (s + I2 * (j % 4)), Y += "0123456789abcdef".charAt($2 >>> 4 & 15) + "0123456789abcdef".charAt(15 & $2);
          return E4.outputUpper ? Y.toUpperCase() : Y;
        }(i, n, h, c2);
      };
    case "B64":
      return function(i) {
        return function(g2, w2, I2, E4) {
          let j, $2, Y, m2, s, P = "", S = w2 / 8, T4 = I2 === -1 ? 3 : 0;
          for (j = 0;j < S; j += 3)
            for (m2 = j + 1 < S ? g2[j + 1 >>> 2] : 0, s = j + 2 < S ? g2[j + 2 >>> 2] : 0, Y = (g2[j >>> 2] >>> 8 * (T4 + I2 * (j % 4)) & 255) << 16 | (m2 >>> 8 * (T4 + I2 * ((j + 1) % 4)) & 255) << 8 | s >>> 8 * (T4 + I2 * ((j + 2) % 4)) & 255, $2 = 0;$2 < 4; $2 += 1)
              P += 8 * j + 6 * $2 <= w2 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(Y >>> 6 * (3 - $2) & 63) : E4.b64Pad;
          return P;
        }(i, n, h, c2);
      };
    case "BYTES":
      return function(i) {
        return function(g2, w2, I2) {
          let E4, j, $2 = "", Y = w2 / 8, m2 = I2 === -1 ? 3 : 0;
          for (E4 = 0;E4 < Y; E4 += 1)
            j = g2[E4 >>> 2] >>> 8 * (m2 + I2 * (E4 % 4)) & 255, $2 += String.fromCharCode(j);
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
        return function(g2, w2, I2) {
          let E4, j = w2 / 8, $2 = new ArrayBuffer(j), Y = new Uint8Array($2), m2 = I2 === -1 ? 3 : 0;
          for (E4 = 0;E4 < j; E4 += 1)
            Y[E4] = g2[E4 >>> 2] >>> 8 * (m2 + I2 * (E4 % 4)) & 255;
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
        return function(g2, w2, I2) {
          let E4, j = w2 / 8, $2 = I2 === -1 ? 3 : 0, Y = new Uint8Array(j);
          for (E4 = 0;E4 < j; E4 += 1)
            Y[E4] = g2[E4 >>> 2] >>> 8 * ($2 + I2 * (E4 % 4)) & 255;
          return Y;
        }(i, n, h);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var vn = function(t, n) {
  let h, c2, i = t.binLen >>> 3, g2 = n.binLen >>> 3, w2 = i << 3, I2 = 4 - i << 3;
  if (i % 4 != 0) {
    for (h = 0;h < g2; h += 4)
      c2 = i + h >>> 2, t.value[c2] |= n.value[h >>> 2] << w2, t.value.push(0), t.value[c2 + 1] |= n.value[h >>> 2] >>> I2;
    return (t.value.length << 2) - 4 >= g2 + i && t.value.pop(), { value: t.value, binLen: t.binLen + n.binLen };
  }
  return { value: t.value.concat(n.value), binLen: t.binLen + n.binLen };
};
var bn = function(t) {
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
var tn = function(t, n, h, c2) {
  let i = t + " must include a value and format";
  if (!n) {
    if (!c2)
      throw new Error(i);
    return c2;
  }
  if (n.value === undefined || !n.format)
    throw new Error(i);
  return mn(n.format, n.encoding || "UTF8", h)(n.value);
};
var cn = function(t, n) {
  return t << n | t >>> 32 - n;
};
var B = function(t, n) {
  return t >>> n | t << 32 - n;
};
var Un = function(t, n) {
  return t >>> n;
};
var Ln = function(t, n, h) {
  return t ^ n ^ h;
};
var Fn = function(t, n, h) {
  return t & n ^ ~t & h;
};
var Bn = function(t, n, h) {
  return t & n ^ t & h ^ n & h;
};
var Lt = function(t) {
  return B(t, 2) ^ B(t, 13) ^ B(t, 22);
};
var y = function(t, n) {
  let h = (65535 & t) + (65535 & n);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16)) << 16 | 65535 & h;
};
var Mt = function(t, n, h, c2) {
  let i = (65535 & t) + (65535 & n) + (65535 & h) + (65535 & c2);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16) + (c2 >>> 16) + (i >>> 16)) << 16 | 65535 & i;
};
var wn = function(t, n, h, c2, i) {
  let g2 = (65535 & t) + (65535 & n) + (65535 & h) + (65535 & c2) + (65535 & i);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16) + (c2 >>> 16) + (i >>> 16) + (g2 >>> 16)) << 16 | 65535 & g2;
};
var Ht = function(t) {
  return B(t, 7) ^ B(t, 18) ^ Un(t, 3);
};
var pt = function(t) {
  return B(t, 6) ^ B(t, 11) ^ B(t, 25);
};
var Kt = function(t) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var Qn = function(t, n) {
  let h, c2, i, g2, w2, I2, E4, j = [];
  for (h = n[0], c2 = n[1], i = n[2], g2 = n[3], w2 = n[4], E4 = 0;E4 < 80; E4 += 1)
    j[E4] = E4 < 16 ? t[E4] : cn(j[E4 - 3] ^ j[E4 - 8] ^ j[E4 - 14] ^ j[E4 - 16], 1), I2 = E4 < 20 ? wn(cn(h, 5), Fn(c2, i, g2), w2, 1518500249, j[E4]) : E4 < 40 ? wn(cn(h, 5), Ln(c2, i, g2), w2, 1859775393, j[E4]) : E4 < 60 ? wn(cn(h, 5), Bn(c2, i, g2), w2, 2400959708, j[E4]) : wn(cn(h, 5), Ln(c2, i, g2), w2, 3395469782, j[E4]), w2 = g2, g2 = i, i = cn(c2, 30), c2 = h, h = I2;
  return n[0] = y(h, n[0]), n[1] = y(c2, n[1]), n[2] = y(i, n[2]), n[3] = y(g2, n[3]), n[4] = y(w2, n[4]), n;
};
var dt = function(t, n, h, c2) {
  let i, g2 = 15 + (n + 65 >>> 9 << 4), w2 = n + h;
  for (;t.length <= g2; )
    t.push(0);
  for (t[n >>> 5] |= 128 << 24 - n % 32, t[g2] = 4294967295 & w2, t[g2 - 1] = w2 / En | 0, i = 0;i < t.length; i += 16)
    c2 = Qn(t.slice(i, i + 16), c2);
  return c2;
};
var Mn = function(t) {
  let n;
  return n = t == "SHA-224" ? J2.slice() : q.slice(), n;
};
var Hn = function(t, n) {
  let h, c2, i, g2, w2, I2, E4, j, $2, Y, m2, s = [];
  for (h = n[0], c2 = n[1], i = n[2], g2 = n[3], w2 = n[4], I2 = n[5], E4 = n[6], j = n[7], m2 = 0;m2 < 64; m2 += 1)
    s[m2] = m2 < 16 ? t[m2] : Mt(B(P = s[m2 - 2], 17) ^ B(P, 19) ^ Un(P, 10), s[m2 - 7], Ht(s[m2 - 15]), s[m2 - 16]), $2 = wn(j, pt(w2), Fn(w2, I2, E4), A2[m2], s[m2]), Y = y(Lt(h), Bn(h, c2, i)), j = E4, E4 = I2, I2 = w2, w2 = y(g2, $2), g2 = i, i = c2, c2 = h, h = y($2, Y);
  var P;
  return n[0] = y(h, n[0]), n[1] = y(c2, n[1]), n[2] = y(i, n[2]), n[3] = y(g2, n[3]), n[4] = y(w2, n[4]), n[5] = y(I2, n[5]), n[6] = y(E4, n[6]), n[7] = y(j, n[7]), n;
};
var pn = function(t, n) {
  let h;
  return n > 32 ? (h = 64 - n, new N2(t.I << n | t.N >>> h, t.N << n | t.I >>> h)) : n !== 0 ? (h = 32 - n, new N2(t.N << n | t.I >>> h, t.I << n | t.N >>> h)) : t;
};
var Q = function(t, n) {
  let h;
  return n < 32 ? (h = 32 - n, new N2(t.N >>> n | t.I << h, t.I >>> n | t.N << h)) : (h = 64 - n, new N2(t.I >>> n | t.N << h, t.N >>> n | t.I << h));
};
var an = function(t, n) {
  return new N2(t.N >>> n, t.I >>> n | t.N << 32 - n);
};
var et = function(t, n, h) {
  return new N2(t.N & n.N ^ t.N & h.N ^ n.N & h.N, t.I & n.I ^ t.I & h.I ^ n.I & h.I);
};
var ft = function(t) {
  let n = Q(t, 28), h = Q(t, 34), c2 = Q(t, 39);
  return new N2(n.N ^ h.N ^ c2.N, n.I ^ h.I ^ c2.I);
};
var F = function(t, n) {
  let h, c2;
  h = (65535 & t.I) + (65535 & n.I), c2 = (t.I >>> 16) + (n.I >>> 16) + (h >>> 16);
  let i = (65535 & c2) << 16 | 65535 & h;
  return h = (65535 & t.N) + (65535 & n.N) + (c2 >>> 16), c2 = (t.N >>> 16) + (n.N >>> 16) + (h >>> 16), new N2((65535 & c2) << 16 | 65535 & h, i);
};
var Vt = function(t, n, h, c2) {
  let i, g2;
  i = (65535 & t.I) + (65535 & n.I) + (65535 & h.I) + (65535 & c2.I), g2 = (t.I >>> 16) + (n.I >>> 16) + (h.I >>> 16) + (c2.I >>> 16) + (i >>> 16);
  let w2 = (65535 & g2) << 16 | 65535 & i;
  return i = (65535 & t.N) + (65535 & n.N) + (65535 & h.N) + (65535 & c2.N) + (g2 >>> 16), g2 = (t.N >>> 16) + (n.N >>> 16) + (h.N >>> 16) + (c2.N >>> 16) + (i >>> 16), new N2((65535 & g2) << 16 | 65535 & i, w2);
};
var yt = function(t, n, h, c2, i) {
  let g2, w2;
  g2 = (65535 & t.I) + (65535 & n.I) + (65535 & h.I) + (65535 & c2.I) + (65535 & i.I), w2 = (t.I >>> 16) + (n.I >>> 16) + (h.I >>> 16) + (c2.I >>> 16) + (i.I >>> 16) + (g2 >>> 16);
  let I2 = (65535 & w2) << 16 | 65535 & g2;
  return g2 = (65535 & t.N) + (65535 & n.N) + (65535 & h.N) + (65535 & c2.N) + (65535 & i.N) + (w2 >>> 16), w2 = (t.N >>> 16) + (n.N >>> 16) + (h.N >>> 16) + (c2.N >>> 16) + (i.N >>> 16) + (g2 >>> 16), new N2((65535 & w2) << 16 | 65535 & g2, I2);
};
var Yn = function(t, n) {
  return new N2(t.N ^ n.N, t.I ^ n.I);
};
var ot = function(t) {
  let n = Q(t, 19), h = Q(t, 61), c2 = an(t, 6);
  return new N2(n.N ^ h.N ^ c2.N, n.I ^ h.I ^ c2.I);
};
var Gt = function(t) {
  let n = Q(t, 1), h = Q(t, 8), c2 = an(t, 7);
  return new N2(n.N ^ h.N ^ c2.N, n.I ^ h.I ^ c2.I);
};
var lt = function(t) {
  let n = Q(t, 14), h = Q(t, 18), c2 = Q(t, 41);
  return new N2(n.N ^ h.N ^ c2.N, n.I ^ h.I ^ c2.I);
};
var Kn = function(t) {
  return t === "SHA-384" ? [new N2(3418070365, J2[0]), new N2(1654270250, J2[1]), new N2(2438529370, J2[2]), new N2(355462360, J2[3]), new N2(1731405415, J2[4]), new N2(41048885895, J2[5]), new N2(3675008525, J2[6]), new N2(1203062813, J2[7])] : [new N2(q[0], 4089235720), new N2(q[1], 2227873595), new N2(q[2], 4271175723), new N2(q[3], 1595750129), new N2(q[4], 2917565137), new N2(q[5], 725511199), new N2(q[6], 4215389547), new N2(q[7], 327033209)];
};
var dn = function(t, n) {
  let h, c2, i, g2, w2, I2, E4, j, $2, Y, m2, s, P = [];
  for (h = n[0], c2 = n[1], i = n[2], g2 = n[3], w2 = n[4], I2 = n[5], E4 = n[6], j = n[7], m2 = 0;m2 < 80; m2 += 1)
    m2 < 16 ? (s = 2 * m2, P[m2] = new N2(t[s], t[s + 1])) : P[m2] = Vt(ot(P[m2 - 2]), P[m2 - 7], Gt(P[m2 - 15]), P[m2 - 16]), $2 = yt(j, lt(w2), (T4 = I2, v = E4, new N2((S = w2).N & T4.N ^ ~S.N & v.N, S.I & T4.I ^ ~S.I & v.I)), Bt[m2], P[m2]), Y = F(ft(h), et(h, c2, i)), j = E4, E4 = I2, I2 = w2, w2 = F(g2, $2), g2 = i, i = c2, c2 = h, h = F($2, Y);
  var S, T4, v;
  return n[0] = F(h, n[0]), n[1] = F(c2, n[1]), n[2] = F(i, n[2]), n[3] = F(g2, n[3]), n[4] = F(w2, n[4]), n[5] = F(I2, n[5]), n[6] = F(E4, n[6]), n[7] = F(j, n[7]), n;
};
var Cn = function(t) {
  let n, h = [];
  for (n = 0;n < 5; n += 1)
    h[n] = [new N2(0, 0), new N2(0, 0), new N2(0, 0), new N2(0, 0), new N2(0, 0)];
  return h;
};
var Zt = function(t) {
  let n, h = [];
  for (n = 0;n < 5; n += 1)
    h[n] = t[n].slice();
  return h;
};
var Pn = function(t, n) {
  let h, c2, i, g2, w2 = [], I2 = [];
  if (t !== null)
    for (c2 = 0;c2 < t.length; c2 += 2)
      n[(c2 >>> 1) % 5][(c2 >>> 1) / 5 | 0] = Yn(n[(c2 >>> 1) % 5][(c2 >>> 1) / 5 | 0], new N2(t[c2 + 1], t[c2]));
  for (h = 0;h < 24; h += 1) {
    for (g2 = Cn(), c2 = 0;c2 < 5; c2 += 1)
      w2[c2] = (E4 = n[c2][0], j = n[c2][1], $2 = n[c2][2], Y = n[c2][3], m2 = n[c2][4], new N2(E4.N ^ j.N ^ $2.N ^ Y.N ^ m2.N, E4.I ^ j.I ^ $2.I ^ Y.I ^ m2.I));
    for (c2 = 0;c2 < 5; c2 += 1)
      I2[c2] = Yn(w2[(c2 + 4) % 5], pn(w2[(c2 + 1) % 5], 1));
    for (c2 = 0;c2 < 5; c2 += 1)
      for (i = 0;i < 5; i += 1)
        n[c2][i] = Yn(n[c2][i], I2[c2]);
    for (c2 = 0;c2 < 5; c2 += 1)
      for (i = 0;i < 5; i += 1)
        g2[i][(2 * c2 + 3 * i) % 5] = pn(n[c2][i], Xt[c2][i]);
    for (c2 = 0;c2 < 5; c2 += 1)
      for (i = 0;i < 5; i += 1)
        n[c2][i] = Yn(g2[c2][i], new N2(~g2[(c2 + 1) % 5][i].N & g2[(c2 + 2) % 5][i].N, ~g2[(c2 + 1) % 5][i].I & g2[(c2 + 2) % 5][i].I));
    n[0][0] = Yn(n[0][0], at[h]);
  }
  var E4, j, $2, Y, m2;
  return n;
};
var Xn = function(t) {
  let n, h, c2 = 0, i = [0, 0], g2 = [4294967295 & t, t / En & 2097151];
  for (n = 6;n >= 0; n--)
    h = g2[n >> 2] >>> 8 * n & 255, h === 0 && c2 === 0 || (i[c2 + 1 >> 2] |= h << 8 * (c2 + 1), c2 += 1);
  return c2 = c2 !== 0 ? c2 : 1, i[0] |= c2, { value: c2 + 1 > 4 ? i : [i[0]], binLen: 8 + 8 * c2 };
};
var xn = function(t) {
  return vn(Xn(t.binLen), t);
};
var en = function(t, n) {
  let h, c2 = Xn(n);
  c2 = vn(c2, t);
  let i = n >>> 2, g2 = (i - c2.value.length % i) % i;
  for (h = 0;h < g2; h++)
    c2.value.push(0);
  return c2.value;
};
var En = 4294967296;
var A2 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var J2 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var q = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var Nn = "Chosen SHA variant is not supported";
var zn = "Cannot set numRounds with MAC";

class jn {
  constructor(t, n, h) {
    let c2 = h || {};
    if (this.t = n, this.i = c2.encoding || "UTF8", this.numRounds = c2.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = t, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(t) {
    let n, h = 0, c2 = this.m >>> 5, i = this.C(t, this.h, this.u), g2 = i.binLen, w2 = i.value, I2 = g2 >>> 5;
    for (n = 0;n < I2; n += c2)
      h + this.m <= g2 && (this.U = this.v(w2.slice(n, n + c2), this.U), h += this.m);
    return this.A += h, this.h = w2.slice(h >>> 5), this.u = g2 % this.m, this.l = true, this;
  }
  getHash(t, n) {
    let h, c2, i = this.R, g2 = bn(n);
    if (this.K) {
      if (g2.outputLen === -1)
        throw new Error("Output length must be specified in options");
      i = g2.outputLen;
    }
    let w2 = Wn(t, i, this.T, g2);
    if (this.H && this.g)
      return w2(this.g(g2));
    for (c2 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), i), h = 1;h < this.numRounds; h += 1)
      this.K && i % 32 != 0 && (c2[c2.length - 1] &= 16777215 >>> 24 - i % 32), c2 = this.F(c2, i, 0, this.B(this.o), i);
    return w2(c2);
  }
  setHMACKey(t, n, h) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    let c2 = mn(n, (h || {}).encoding || "UTF8", this.T);
    this.k(c2(t));
  }
  k(t) {
    let n = this.m >>> 3, h = n / 4 - 1, c2;
    if (this.numRounds !== 1)
      throw new Error(zn);
    if (this.H)
      throw new Error("MAC key already set");
    for (n < t.binLen / 8 && (t.value = this.F(t.value, t.binLen, 0, this.B(this.o), this.R));t.value.length <= h; )
      t.value.push(0);
    for (c2 = 0;c2 <= h; c2 += 1)
      this.S[c2] = 909522486 ^ t.value[c2], this.p[c2] = 1549556828 ^ t.value[c2];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(t, n) {
    let h = bn(n);
    return Wn(t, this.R, this.T, h)(this.Y());
  }
  Y() {
    let t;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    let n = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return t = this.v(this.p, this.B(this.o)), t = this.F(n, this.R, this.m, t, this.R), t;
  }
}
var Ut = class extends jn {
  constructor(t, n, h) {
    if (t !== "SHA-1")
      throw new Error(Nn);
    super(t, n, h);
    let c2 = h || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = mn(this.t, this.i, this.T), this.v = Qn, this.L = function(i) {
      return i.slice();
    }, this.B = Kt, this.F = dt, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, c2.hmacKey && this.k(tn("hmacKey", c2.hmacKey, this.T));
  }
};
var Ft = class extends jn {
  constructor(t, n, h) {
    if (t !== "SHA-224" && t !== "SHA-256")
      throw new Error(Nn);
    super(t, n, h);
    let c2 = h || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = mn(this.t, this.i, this.T), this.v = Hn, this.L = function(i) {
      return i.slice();
    }, this.B = Mn, this.F = function(i, g2, w2, I2) {
      return function(E4, j, $2, Y, m2) {
        let s, P, S = 15 + (j + 65 >>> 9 << 4), T4 = j + $2;
        for (;E4.length <= S; )
          E4.push(0);
        for (E4[j >>> 5] |= 128 << 24 - j % 32, E4[S] = 4294967295 & T4, E4[S - 1] = T4 / En | 0, s = 0;s < E4.length; s += 16)
          Y = Hn(E4.slice(s, s + 16), Y);
        return P = m2 === "SHA-224" ? [Y[0], Y[1], Y[2], Y[3], Y[4], Y[5], Y[6]] : Y, P;
      }(i, g2, w2, I2, t);
    }, this.U = Mn(t), this.m = 512, this.R = t === "SHA-224" ? 224 : 256, this.K = false, c2.hmacKey && this.k(tn("hmacKey", c2.hmacKey, this.T));
  }
};

class N2 {
  constructor(t, n) {
    this.N = t, this.I = n;
  }
}
var Bt = [new N2(A2[0], 3609767458), new N2(A2[1], 602891725), new N2(A2[2], 3964484399), new N2(A2[3], 2173295548), new N2(A2[4], 4081628472), new N2(A2[5], 3053834265), new N2(A2[6], 2937671579), new N2(A2[7], 3664609560), new N2(A2[8], 2734883394), new N2(A2[9], 1164996542), new N2(A2[10], 1323610764), new N2(A2[11], 3590304994), new N2(A2[12], 4068182383), new N2(A2[13], 991336113), new N2(A2[14], 633803317), new N2(A2[15], 3479774868), new N2(A2[16], 2666613458), new N2(A2[17], 944711139), new N2(A2[18], 2341262773), new N2(A2[19], 2007800933), new N2(A2[20], 1495990901), new N2(A2[21], 1856431235), new N2(A2[22], 3175218132), new N2(A2[23], 2198950837), new N2(A2[24], 3999719339), new N2(A2[25], 766784016), new N2(A2[26], 2566594879), new N2(A2[27], 3203337956), new N2(A2[28], 1034457026), new N2(A2[29], 2466948901), new N2(A2[30], 3758326383), new N2(A2[31], 168717936), new N2(A2[32], 1188179964), new N2(A2[33], 1546045734), new N2(A2[34], 1522805485), new N2(A2[35], 2643833823), new N2(A2[36], 2343527390), new N2(A2[37], 1014477480), new N2(A2[38], 1206759142), new N2(A2[39], 344077627), new N2(A2[40], 1290863460), new N2(A2[41], 3158454273), new N2(A2[42], 3505952657), new N2(A2[43], 106217008), new N2(A2[44], 3606008344), new N2(A2[45], 1432725776), new N2(A2[46], 1467031594), new N2(A2[47], 851169720), new N2(A2[48], 3100823752), new N2(A2[49], 1363258195), new N2(A2[50], 3750685593), new N2(A2[51], 3785050280), new N2(A2[52], 3318307427), new N2(A2[53], 3812723403), new N2(A2[54], 2003034995), new N2(A2[55], 3602036899), new N2(A2[56], 1575990012), new N2(A2[57], 1125592928), new N2(A2[58], 2716904306), new N2(A2[59], 442776044), new N2(A2[60], 593698344), new N2(A2[61], 3733110249), new N2(A2[62], 2999351573), new N2(A2[63], 3815920427), new N2(3391569614, 3928383900), new N2(3515267271, 566280711), new N2(3940187606, 3454069534), new N2(4118630271, 4000239992), new N2(116418474, 1914138554), new N2(174292421, 2731055270), new N2(289380356, 3203993006), new N2(460393269, 320620315), new N2(685471733, 587496836), new N2(852142971, 1086792851), new N2(1017036298, 365543100), new N2(1126000580, 2618297676), new N2(1288033470, 3409855158), new N2(1501505948, 4234509866), new N2(1607167915, 987167468), new N2(1816402316, 1246189591)];
var Qt = class extends jn {
  constructor(t, n, h) {
    if (t !== "SHA-384" && t !== "SHA-512")
      throw new Error(Nn);
    super(t, n, h);
    let c2 = h || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = mn(this.t, this.i, this.T), this.v = dn, this.L = function(i) {
      return i.slice();
    }, this.B = Kn, this.F = function(i, g2, w2, I2) {
      return function(E4, j, $2, Y, m2) {
        let s, P, S = 31 + (j + 129 >>> 10 << 5), T4 = j + $2;
        for (;E4.length <= S; )
          E4.push(0);
        for (E4[j >>> 5] |= 128 << 24 - j % 32, E4[S] = 4294967295 & T4, E4[S - 1] = T4 / En | 0, s = 0;s < E4.length; s += 32)
          Y = dn(E4.slice(s, s + 32), Y);
        return P = m2 === "SHA-384" ? [Y[0].N, Y[0].I, Y[1].N, Y[1].I, Y[2].N, Y[2].I, Y[3].N, Y[3].I, Y[4].N, Y[4].I, Y[5].N, Y[5].I] : [Y[0].N, Y[0].I, Y[1].N, Y[1].I, Y[2].N, Y[2].I, Y[3].N, Y[3].I, Y[4].N, Y[4].I, Y[5].N, Y[5].I, Y[6].N, Y[6].I, Y[7].N, Y[7].I], P;
      }(i, g2, w2, I2, t);
    }, this.U = Kn(t), this.m = 1024, this.R = t === "SHA-384" ? 384 : 512, this.K = false, c2.hmacKey && this.k(tn("hmacKey", c2.hmacKey, this.T));
  }
};
var at = [new N2(0, 1), new N2(0, 32898), new N2(2147483648, 32906), new N2(2147483648, 2147516416), new N2(0, 32907), new N2(0, 2147483649), new N2(2147483648, 2147516545), new N2(2147483648, 32777), new N2(0, 138), new N2(0, 136), new N2(0, 2147516425), new N2(0, 2147483658), new N2(0, 2147516555), new N2(2147483648, 139), new N2(2147483648, 32905), new N2(2147483648, 32771), new N2(2147483648, 32770), new N2(2147483648, 128), new N2(0, 32778), new N2(2147483648, 2147483658), new N2(2147483648, 2147516545), new N2(2147483648, 32896), new N2(0, 2147483649), new N2(2147483648, 2147516424)];
var Xt = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var zt = class extends jn {
  constructor(t, n, h) {
    let c2 = 6, i = 0;
    super(t, n, h);
    let g2 = h || {};
    if (this.numRounds !== 1) {
      if (g2.kmacKey || g2.hmacKey)
        throw new Error(zn);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = mn(this.t, this.i, this.T), this.v = Pn, this.L = Zt, this.B = Cn, this.U = Cn(), this.K = false, t) {
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
        c2 = 31, this.m = i = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        c2 = 31, this.m = i = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        c2 = 4, this.m = i = 1344, this.X(h), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        c2 = 4, this.m = i = 1088, this.X(h), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = i = 1344, c2 = this.O(h), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = i = 1088, c2 = this.O(h), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(Nn);
    }
    this.F = function(w2, I2, E4, j, $2) {
      return function(Y, m2, s, P, S, T4, v) {
        let x, O, C = 0, D = [], b = S >>> 5, k = m2 >>> 5;
        for (x = 0;x < k && m2 >= S; x += b)
          P = Pn(Y.slice(x, x + b), P), m2 -= S;
        for (Y = Y.slice(x), m2 %= S;Y.length < b; )
          Y.push(0);
        for (x = m2 >>> 3, Y[x >> 2] ^= T4 << x % 4 * 8, Y[b - 1] ^= 2147483648, P = Pn(Y, P);32 * D.length < v && (O = P[C % 5][C / 5 | 0], D.push(O.I), !(32 * D.length >= v)); )
          D.push(O.N), C += 1, 64 * C % S == 0 && (Pn(null, P), C = 0);
        return D;
      }(w2, I2, 0, j, i, c2, $2);
    }, g2.hmacKey && this.k(tn("hmacKey", g2.hmacKey, this.T));
  }
  O(t, n) {
    let h = function(i) {
      let g2 = i || {};
      return { funcName: tn("funcName", g2.funcName, 1, { value: [], binLen: 0 }), customization: tn("Customization", g2.customization, 1, { value: [], binLen: 0 }) };
    }(t || {});
    n && (h.funcName = n);
    let c2 = vn(xn(h.funcName), xn(h.customization));
    if (h.customization.binLen !== 0 || h.funcName.binLen !== 0) {
      let i = en(c2, this.m >>> 3);
      for (let g2 = 0;g2 < i.length; g2 += this.m >>> 5)
        this.U = this.v(i.slice(g2, g2 + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(t) {
    let n = function(c2) {
      let i = c2 || {};
      return { kmacKey: tn("kmacKey", i.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: tn("Customization", i.customization, 1, { value: [], binLen: 0 }) };
    }(t || {});
    this.O(t, n.funcName);
    let h = en(xn(n.kmacKey), this.m >>> 3);
    for (let c2 = 0;c2 < h.length; c2 += this.m >>> 5)
      this.U = this.v(h.slice(c2, c2 + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(t) {
    let n = vn({ value: this.h.slice(), binLen: this.u }, function(h) {
      let c2, i, g2 = 0, w2 = [0, 0], I2 = [4294967295 & h, h / En & 2097151];
      for (c2 = 6;c2 >= 0; c2--)
        i = I2[c2 >> 2] >>> 8 * c2 & 255, i === 0 && g2 === 0 || (w2[g2 >> 2] |= i << 8 * g2, g2 += 1);
      return g2 = g2 !== 0 ? g2 : 1, w2[g2 >> 2] |= g2 << 8 * g2, { value: g2 + 1 > 4 ? w2 : [w2[0]], binLen: 8 + 8 * g2 };
    }(t.outputLen));
    return this.F(n.value, n.binLen, this.A, this.L(this.U), t.outputLen);
  }
};

class _n {
  constructor(t, n, h) {
    if (t == "SHA-1")
      this.P = new Ut(t, n, h);
    else if (t == "SHA-224" || t == "SHA-256")
      this.P = new Ft(t, n, h);
    else if (t == "SHA-384" || t == "SHA-512")
      this.P = new Qt(t, n, h);
    else {
      if (t != "SHA3-224" && t != "SHA3-256" && t != "SHA3-384" && t != "SHA3-512" && t != "SHAKE128" && t != "SHAKE256" && t != "CSHAKE128" && t != "CSHAKE256" && t != "KMAC128" && t != "KMAC256")
        throw new Error(Nn);
      this.P = new zt(t, n, h);
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
var Sn = function(t, n, h = 0) {
  let c2 = Dn.default({ ...t, signature: undefined }), i = n.noTimeWindow ? 0 : Math.floor(Date.now() / (n.timeWindow ?? nt)) + h;
  return new _n("SHA-256", "TEXT", { encoding: "UTF8" }).update(c2).update(Dn.default(n)).update(`${i}`).getHash("B64");
};
function Jn(t, n = {}) {
  return { ...t, signature: Sn(t, n) };
}
var nt = 5000;

class un {
  data = [];
  #n = new TextEncoder;
  static payload(t, n, h) {
    return new un().payload(t, n, h);
  }
  static blob(t, n) {
    return new un().blob(t, n);
  }
  #t(t) {
    let n = this.#n.encode(t), h = new Uint8Array([n.byteLength]);
    this.data.push(h.buffer), this.data.push(n.buffer);
  }
  payload(t, n, h) {
    this.#t(t);
    let c2 = new Uint8Array([1]);
    this.data.push(c2.buffer);
    let i = JSON.stringify(h ? Jn(n, { secret: h }) : n), g2 = this.#n.encode(i), w2 = new Uint32Array([g2.byteLength]);
    return this.data.push(w2.buffer), this.data.push(g2.buffer), this;
  }
  blob(t, n) {
    this.#t(t);
    let h = new Uint8Array([2]);
    this.data.push(h.buffer);
    let c2 = new Uint32Array([n.size]);
    return this.data.push(c2.buffer), this.data.push(n), this;
  }
  build() {
    return new Blob(this.data);
  }
}
var ct = new TextDecoder;
function Jt(t, n) {
  let [h, c2] = mt(t, n);
  return [ct.decode(new Uint8Array(t, c2, h)), c2 + h];
}
function qt(t, n) {
  let [h, c2] = it(t, n);
  return [ct.decode(new Uint8Array(t, c2, h)), c2 + h];
}
function n8(t, n) {
  let [h, c2] = it(t, n);
  return [new Blob([new Uint8Array(t, c2, h)], { type: "application/octet-stream" }), c2 + h];
}
function it(t, n) {
  return [new Uint32Array(t.slice(n, n + Uint32Array.BYTES_PER_ELEMENT), 0, 1)[0], n + Uint32Array.BYTES_PER_ELEMENT];
}
function mt(t, n) {
  return [new Uint8Array(t, n, 1)[0], n + Uint8Array.BYTES_PER_ELEMENT];
}
async function I8(t) {
  let n = {}, h = {}, c2 = 0, i;
  while (c2 < t.size) {
    i = i ?? await t.arrayBuffer();
    let [g2, w2] = Jt(i, c2);
    c2 = w2;
    let [I2, E4] = mt(i, c2);
    switch (c2 = E4, I2) {
      case 1:
        let [j, $2] = qt(i, c2);
        c2 = $2;
        try {
          n[g2] = JSON.parse(j);
        } catch (s) {
          console.error(`Error parsing JSON for key "${g2}":`, s);
        }
        break;
      case 2:
        let [Y, m2] = n8(i, c2);
        c2 = m2, h[g2] = Y;
        break;
    }
  }
  return { ...n, ...h };
}
async function t8(t) {
  let h = Math.ceil(t.size / 65536), c2 = await crypto.subtle.digest("SHA-256", new Uint8Array(0));
  for (let w2 = 0;w2 < h; w2++) {
    let E4 = await t.slice(w2 * 65536, (w2 + 1) * 65536).arrayBuffer(), j = await crypto.subtle.digest("SHA-256", E4), $2 = new Uint8Array(c2.byteLength + j.byteLength);
    $2.set(new Uint8Array(c2), 0), $2.set(new Uint8Array(j), c2.byteLength), c2 = await crypto.subtle.digest("SHA-256", $2.buffer);
  }
  return Array.from(new Uint8Array(c2)).map((w2) => w2.toString(16).padStart(2, "0")).join("");
}
async function tt(t, n, h = t8) {
  if (typeof t === "string" && t.startsWith("blob:")) {
    let i = await fetch(t).then((w2) => w2.blob());
    URL.revokeObjectURL(t);
    let g2 = `{blobUrl:${await h(i)}}`;
    return n[g2] = i, g2;
  }
  if (typeof t === "object" && t instanceof Blob) {
    let i = `{blob:${await h(t)}}`;
    return n[i] = t, i;
  }
  let c2 = t;
  if (Array.isArray(t))
    await Promise.all(t.map(async (i, g2) => {
      let w2 = await tt(i, n, h);
      if (w2 !== t[g2]) {
        if (t === c2)
          t = [...t];
        t[g2] = w2;
      }
    }));
  else if (typeof t === "object" && t)
    await Promise.all(Object.entries(t).map(async ([i, g2]) => {
      let w2 = await tt(g2, n, h);
      if (w2 !== t[i]) {
        if (t === c2)
          t = { ...t };
        t[i] = w2;
      }
    }));
  return t;
}
function ht(t, n) {
  if (typeof t === "string" && t.startsWith("{blobUrl:"))
    return URL.createObjectURL(n[t]);
  if (typeof t === "string" && t.startsWith("{blob:"))
    return n[t];
  let h = t;
  if (Array.isArray(t))
    t.forEach((c2, i) => {
      let g2 = ht(c2, n);
      if (g2 !== c2) {
        if (t === h)
          t = [...t];
        t[i] = g2;
      }
    });
  else if (typeof t === "object" && t)
    Object.entries(t).forEach(([c2, i]) => {
      let g2 = ht(i, n);
      if (g2 !== i) {
        if (t === h)
          t = { ...t };
        t[c2] = g2;
      }
    });
  return t;
}

// ../node_modules/@dobuki/payload-validator/dist/index.js
var zJ2 = Object.create;
var { defineProperty: Q02, getPrototypeOf: QJ2, getOwnPropertyNames: ZJ2 } = Object;
var UJ2 = Object.prototype.hasOwnProperty;
var XJ2 = (J3, q2, _) => {
  _ = J3 != null ? zJ2(QJ2(J3)) : {};
  const z = q2 || !J3 || !J3.__esModule ? Q02(_, "default", { value: J3, enumerable: true }) : _;
  for (let Q2 of ZJ2(J3))
    if (!UJ2.call(z, Q2))
      Q02(z, Q2, { get: () => J3[Q2], enumerable: true });
  return z;
};
var T4 = (J3, q2) => () => (q2 || J3((q2 = { exports: {} }).exports, q2), q2.exports);
var F02 = T4((p3, G0) => {
  var p = function(J3) {
    throw { name: "SyntaxError", message: J3, at: M1, text: w1 };
  }, x = function(J3) {
    if (J3 && J3 !== R2)
      p("Expected '" + J3 + "' instead of '" + R2 + "'");
    return R2 = w1.charAt(M1), M1 += 1, R2;
  }, U0 = function() {
    var J3, q2 = "";
    if (R2 === "-")
      q2 = "-", x("-");
    while (R2 >= "0" && R2 <= "9")
      q2 += R2, x();
    if (R2 === ".") {
      q2 += ".";
      while (x() && R2 >= "0" && R2 <= "9")
        q2 += R2;
    }
    if (R2 === "e" || R2 === "E") {
      if (q2 += R2, x(), R2 === "-" || R2 === "+")
        q2 += R2, x();
      while (R2 >= "0" && R2 <= "9")
        q2 += R2, x();
    }
    if (J3 = Number(q2), !isFinite(J3))
      p("Bad number");
    return J3;
  }, X0 = function() {
    var J3, q2, _ = "", z;
    if (R2 === '"')
      while (x())
        if (R2 === '"')
          return x(), _;
        else if (R2 === "\\")
          if (x(), R2 === "u") {
            z = 0;
            for (q2 = 0;q2 < 4; q2 += 1) {
              if (J3 = parseInt(x(), 16), !isFinite(J3))
                break;
              z = z * 16 + J3;
            }
            _ += String.fromCharCode(z);
          } else if (typeof Z0[R2] === "string")
            _ += Z0[R2];
          else
            break;
        else
          _ += R2;
    p("Bad string");
  }, y2 = function() {
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
    var J3 = [];
    if (R2 === "[") {
      if (x("["), y2(), R2 === "]")
        return x("]"), J3;
      while (R2) {
        if (J3.push(D1()), y2(), R2 === "]")
          return x("]"), J3;
        x(","), y2();
      }
    }
    p("Bad array");
  }, BJ = function() {
    var J3, q2 = {};
    if (R2 === "{") {
      if (x("{"), y2(), R2 === "}")
        return x("}"), q2;
      while (R2) {
        if (J3 = X0(), y2(), x(":"), Object.prototype.hasOwnProperty.call(q2, J3))
          p('Duplicate key "' + J3 + '"');
        if (q2[J3] = D1(), y2(), R2 === "}")
          return x("}"), q2;
        x(","), y2();
      }
    }
    p("Bad object");
  }, D1 = function() {
    switch (y2(), R2) {
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
  G0.exports = function(J3, q2) {
    var _;
    if (w1 = J3, M1 = 0, R2 = " ", _ = D1(), y2(), R2)
      p("Syntax error");
    return typeof q2 === "function" ? function z(Q2, Z) {
      var G2, V, U = Q2[Z];
      if (U && typeof U === "object") {
        for (G2 in D1)
          if (Object.prototype.hasOwnProperty.call(U, G2))
            if (V = z(U, G2), typeof V === "undefined")
              delete U[G2];
            else
              U[G2] = V;
      }
      return q2.call(Q2, Z, U);
    }({ "": _ }, "") : _;
  };
});
var V02 = T4((c3, B0) => {
  var m1 = function(J3) {
    return y1.lastIndex = 0, y1.test(J3) ? '"' + J3.replace(y1, function(q2) {
      var _ = VJ[q2];
      return typeof _ === "string" ? _ : "\\u" + ("0000" + q2.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + J3 + '"';
  }, O1 = function(J3, q2) {
    var _, z, Q2, Z, G2 = b, V, U = q2[J3];
    if (U && typeof U === "object" && typeof U.toJSON === "function")
      U = U.toJSON(J3);
    if (typeof u === "function")
      U = u.call(q2, J3, U);
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
        if (b += R1, V = [], Object.prototype.toString.apply(U) === "[object Array]") {
          Z = U.length;
          for (_ = 0;_ < Z; _ += 1)
            V[_] = O1(_, U) || "null";
          return Q2 = V.length === 0 ? "[]" : b ? `[
` + b + V.join(`,
` + b) + `
` + G2 + "]" : "[" + V.join(",") + "]", b = G2, Q2;
        }
        if (u && typeof u === "object") {
          Z = u.length;
          for (_ = 0;_ < Z; _ += 1)
            if (z = u[_], typeof z === "string") {
              if (Q2 = O1(z, U), Q2)
                V.push(m1(z) + (b ? ": " : ":") + Q2);
            }
        } else
          for (z in U)
            if (Object.prototype.hasOwnProperty.call(U, z)) {
              if (Q2 = O1(z, U), Q2)
                V.push(m1(z) + (b ? ": " : ":") + Q2);
            }
        return Q2 = V.length === 0 ? "{}" : b ? `{
` + b + V.join(`,
` + b) + `
` + G2 + "}" : "{" + V.join(",") + "}", b = G2, Q2;
      default:
    }
  }, y1 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b, R1, VJ = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, u;
  B0.exports = function(J3, q2, _) {
    var z;
    if (b = "", R1 = "", typeof _ === "number")
      for (z = 0;z < _; z += 1)
        R1 += " ";
    else if (typeof _ === "string")
      R1 = _;
    if (u = q2, q2 && typeof q2 !== "function" && (typeof q2 !== "object" || typeof q2.length !== "number"))
      throw new Error("JSON.stringify");
    return O1("", { "": J3 });
  };
});
var K02 = T4((KJ) => {
  KJ.parse = F02();
  KJ.stringify = V02();
});
var L02 = T4((h3, H0) => {
  var WJ = {}.toString;
  H0.exports = Array.isArray || function(J3) {
    return WJ.call(J3) == "[object Array]";
  };
});
var g12 = T4((Y3, M0) => {
  var W0 = Object.prototype.toString;
  M0.exports = function J(q2) {
    var _ = W0.call(q2), z = _ === "[object Arguments]";
    if (!z)
      z = _ !== "[object Array]" && q2 !== null && typeof q2 === "object" && typeof q2.length === "number" && q2.length >= 0 && W0.call(q2.callee) === "[object Function]";
    return z;
  };
});
var j02 = T4((d3, N0) => {
  var T0;
  if (!Object.keys)
    z1 = Object.prototype.hasOwnProperty, p1 = Object.prototype.toString, D0 = g12(), c1 = Object.prototype.propertyIsEnumerable, R0 = !c1.call({ toString: null }, "toString"), O0 = c1.call(function() {}, "prototype"), Q1 = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], A1 = function(J3) {
      var q2 = J3.constructor;
      return q2 && q2.prototype === J3;
    }, A0 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, C0 = function() {
      if (typeof window === "undefined")
        return false;
      for (var J3 in window)
        try {
          if (!A0["$" + J3] && z1.call(window, J3) && window[J3] !== null && typeof window[J3] === "object")
            try {
              A1(window[J3]);
            } catch (q2) {
              return true;
            }
        } catch (q2) {
          return true;
        }
      return false;
    }(), x0 = function(J3) {
      if (typeof window === "undefined" || !C0)
        return A1(J3);
      try {
        return A1(J3);
      } catch (q2) {
        return false;
      }
    }, T0 = function J(q2) {
      var _ = q2 !== null && typeof q2 === "object", z = p1.call(q2) === "[object Function]", Q2 = D0(q2), Z = _ && p1.call(q2) === "[object String]", G2 = [];
      if (!_ && !z && !Q2)
        throw new TypeError("Object.keys called on a non-object");
      var V = O0 && z;
      if (Z && q2.length > 0 && !z1.call(q2, 0))
        for (var U = 0;U < q2.length; ++U)
          G2.push(String(U));
      if (Q2 && q2.length > 0)
        for (var K = 0;K < q2.length; ++K)
          G2.push(String(K));
      else
        for (var H2 in q2)
          if (!(V && H2 === "prototype") && z1.call(q2, H2))
            G2.push(String(H2));
      if (R0) {
        var F2 = x0(q2);
        for (var B2 = 0;B2 < Q1.length; ++B2)
          if (!(F2 && Q1[B2] === "constructor") && z1.call(q2, Q1[B2]))
            G2.push(Q1[B2]);
      }
      return G2;
    };
  var z1, p1, D0, c1, R0, O0, Q1, A1, A0, C0, x0;
  N0.exports = T0;
});
var S02 = T4((l3, v0) => {
  var MJ = Array.prototype.slice, DJ = g12(), k0 = Object.keys, C1 = k0 ? function J(q2) {
    return k0(q2);
  } : j02(), I0 = Object.keys;
  C1.shim = function J() {
    if (Object.keys) {
      var q2 = function() {
        var _ = Object.keys(arguments);
        return _ && _.length === arguments.length;
      }(1, 2);
      if (!q2)
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
var b02 = T4((o3, P0) => {
  var RJ = "Function.prototype.bind called on incompatible ", OJ = Object.prototype.toString, AJ = Math.max, CJ = "[object Function]", $0 = function J(q2, _) {
    var z = [];
    for (var Q2 = 0;Q2 < q2.length; Q2 += 1)
      z[Q2] = q2[Q2];
    for (var Z = 0;Z < _.length; Z += 1)
      z[Z + q2.length] = _[Z];
    return z;
  }, xJ = function J(q2, _) {
    var z = [];
    for (var Q2 = _ || 0, Z = 0;Q2 < q2.length; Q2 += 1, Z += 1)
      z[Z] = q2[Q2];
    return z;
  }, TJ = function(J3, q2) {
    var _ = "";
    for (var z = 0;z < J3.length; z += 1)
      if (_ += J3[z], z + 1 < J3.length)
        _ += q2;
    return _;
  };
  P0.exports = function J(q2) {
    var _ = this;
    if (typeof _ !== "function" || OJ.apply(_) !== CJ)
      throw new TypeError(RJ + _);
    var z = xJ(arguments, 1), Q2, Z = function() {
      if (this instanceof Q2) {
        var H2 = _.apply(this, $0(z, arguments));
        if (Object(H2) === H2)
          return H2;
        return this;
      }
      return _.apply(q2, $0(z, arguments));
    }, G2 = AJ(0, _.length - z.length), V = [];
    for (var U = 0;U < G2; U++)
      V[U] = "$" + U;
    if (Q2 = Function("binder", "return function (" + TJ(V, ",") + "){ return binder.apply(this,arguments); }")(Z), _.prototype) {
      var K = function H() {};
      K.prototype = _.prototype, Q2.prototype = new K, K.prototype = null;
    }
    return Q2;
  };
});
var Z12 = T4((a3, E0) => {
  var NJ = b02();
  E0.exports = Function.prototype.bind || NJ;
});
var w02 = T4((s3, f0) => {
  f0.exports = Error;
});
var m02 = T4((i3, y0) => {
  y0.exports = EvalError;
});
var p02 = T4((r3, g0) => {
  g0.exports = RangeError;
});
var u02 = T4((t3, c0) => {
  c0.exports = ReferenceError;
});
var u12 = T4((n3, h0) => {
  h0.exports = SyntaxError;
});
var U12 = T4((e3, Y0) => {
  Y0.exports = TypeError;
});
var l02 = T4((q5, d0) => {
  d0.exports = URIError;
});
var a02 = T4((J5, o0) => {
  o0.exports = function J() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function")
      return false;
    if (typeof Symbol.iterator === "symbol")
      return true;
    var q2 = {}, _ = Symbol("test"), z = Object(_);
    if (typeof _ === "string")
      return false;
    if (Object.prototype.toString.call(_) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(z) !== "[object Symbol]")
      return false;
    var Q2 = 42;
    q2[_] = Q2;
    for (_ in q2)
      return false;
    if (typeof Object.keys === "function" && Object.keys(q2).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(q2).length !== 0)
      return false;
    var Z = Object.getOwnPropertySymbols(q2);
    if (Z.length !== 1 || Z[0] !== _)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(q2, _))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var G2 = Object.getOwnPropertyDescriptor(q2, _);
      if (G2.value !== Q2 || G2.enumerable !== true)
        return false;
    }
    return true;
  };
});
var h12 = T4((_5, i0) => {
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
var Y12 = T4((z5, t0) => {
  var r0 = { foo: {} }, kJ = Object;
  t0.exports = function J() {
    return { __proto__: r0 }.foo === r0.foo && !({ __proto__: null } instanceof kJ);
  };
});
var d12 = T4((Q5, n0) => {
  var IJ = Function.prototype.call, vJ = Object.prototype.hasOwnProperty, SJ = Z12();
  n0.exports = SJ.call(IJ, vJ);
});
var G12 = T4((Z5, zq) => {
  var A4, $J = w02(), PJ = m02(), bJ = p02(), EJ = u02(), i = u12(), s = U12(), fJ = l02(), _q = Function, l1 = function(J3) {
    try {
      return _q('"use strict"; return (' + J3 + ").constructor;")();
    } catch (q2) {}
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
      } catch (q2) {
        return o1;
      }
    }
  }() : o1, o = h12()(), yJ = Y12()(), k = Object.getPrototypeOf || (yJ ? function(J3) {
    return J3.__proto__;
  } : null), a = {}, mJ = typeof Uint8Array === "undefined" || !k ? A4 : k(Uint8Array), Y = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? A4 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? A4 : ArrayBuffer, "%ArrayIteratorPrototype%": o && k ? k([][Symbol.iterator]()) : A4, "%AsyncFromSyncIteratorPrototype%": A4, "%AsyncFunction%": a, "%AsyncGenerator%": a, "%AsyncGeneratorFunction%": a, "%AsyncIteratorPrototype%": a, "%Atomics%": typeof Atomics === "undefined" ? A4 : Atomics, "%BigInt%": typeof BigInt === "undefined" ? A4 : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? A4 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? A4 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? A4 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": $J, "%eval%": eval, "%EvalError%": PJ, "%Float32Array%": typeof Float32Array === "undefined" ? A4 : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? A4 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? A4 : FinalizationRegistry, "%Function%": _q, "%GeneratorFunction%": a, "%Int8Array%": typeof Int8Array === "undefined" ? A4 : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? A4 : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? A4 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": o && k ? k(k([][Symbol.iterator]())) : A4, "%JSON%": typeof JSON === "object" ? JSON : A4, "%Map%": typeof Map === "undefined" ? A4 : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !o || !k ? A4 : k(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? A4 : Promise, "%Proxy%": typeof Proxy === "undefined" ? A4 : Proxy, "%RangeError%": bJ, "%ReferenceError%": EJ, "%Reflect%": typeof Reflect === "undefined" ? A4 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? A4 : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !o || !k ? A4 : k(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? A4 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": o && k ? k(""[Symbol.iterator]()) : A4, "%Symbol%": o ? Symbol : A4, "%SyntaxError%": i, "%ThrowTypeError%": wJ, "%TypedArray%": mJ, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? A4 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? A4 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? A4 : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? A4 : Uint32Array, "%URIError%": fJ, "%WeakMap%": typeof WeakMap === "undefined" ? A4 : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? A4 : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? A4 : WeakSet };
  if (k)
    try {
      null.error;
    } catch (J3) {
      e0 = k(k(J3)), Y["%Error.prototype%"] = e0;
    }
  var e0, gJ = function J(q2) {
    var _;
    if (q2 === "%AsyncFunction%")
      _ = l1("async function () {}");
    else if (q2 === "%GeneratorFunction%")
      _ = l1("function* () {}");
    else if (q2 === "%AsyncGeneratorFunction%")
      _ = l1("async function* () {}");
    else if (q2 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q2 === "%AsyncIteratorPrototype%") {
      var Q2 = J("%AsyncGenerator%");
      if (Q2 && k)
        _ = k(Q2.prototype);
    }
    return Y[q2] = _, _;
  }, qq = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, X1 = Z12(), x1 = d12(), pJ = X1.call(Function.call, Array.prototype.concat), cJ = X1.call(Function.apply, Array.prototype.splice), Jq = X1.call(Function.call, String.prototype.replace), T1 = X1.call(Function.call, String.prototype.slice), uJ = X1.call(Function.call, RegExp.prototype.exec), hJ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, YJ = /\\(\\)?/g, dJ = function J(q2) {
    var _ = T1(q2, 0, 1), z = T1(q2, -1);
    if (_ === "%" && z !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var Q2 = [];
    return Jq(q2, hJ, function(Z, G2, V, U) {
      Q2[Q2.length] = V ? Jq(U, YJ, "$1") : G2 || Z;
    }), Q2;
  }, lJ = function J(q2, _) {
    var z = q2, Q2;
    if (x1(qq, z))
      Q2 = qq[z], z = "%" + Q2[0] + "%";
    if (x1(Y, z)) {
      var Z = Y[z];
      if (Z === a)
        Z = gJ(z);
      if (typeof Z === "undefined" && !_)
        throw new s("intrinsic " + q2 + " exists, but is not available. Please file an issue!");
      return { alias: Q2, name: z, value: Z };
    }
    throw new i("intrinsic " + q2 + " does not exist!");
  };
  zq.exports = function J(q2, _) {
    if (typeof q2 !== "string" || q2.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (uJ(/^%?[^%]*%?$/, q2) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = dJ(q2), Q2 = z.length > 0 ? z[0] : "", Z = lJ("%" + Q2 + "%", _), G2 = Z.name, V = Z.value, U = false, K = Z.alias;
    if (K)
      Q2 = K[0], cJ(z, pJ([0, 1], K));
    for (var H2 = 1, F2 = true;H2 < z.length; H2 += 1) {
      var B2 = z[H2], W2 = T1(B2, 0, 1), L = T1(B2, -1);
      if ((W2 === '"' || W2 === "'" || W2 === "`" || (L === '"' || L === "'" || L === "`")) && W2 !== L)
        throw new i("property names with quotes must have matching quotes");
      if (B2 === "constructor" || !F2)
        U = true;
      if (Q2 += "." + B2, G2 = "%" + Q2 + "%", x1(Y, G2))
        V = Y[G2];
      else if (V != null) {
        if (!(B2 in V)) {
          if (!_)
            throw new s("base intrinsic for " + q2 + " exists, but the property is not available.");
          return;
        }
        if (h && H2 + 1 >= z.length) {
          var D = h(V, B2);
          if (F2 = !!D, F2 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B2];
        } else
          F2 = x1(V, B2), V = V[B2];
        if (F2 && !U)
          Y[G2] = V;
      }
    }
    return V;
  };
});
var j12 = T4((U5, Qq) => {
  var oJ = G12(), N1 = oJ("%Object.defineProperty%", true) || false;
  if (N1)
    try {
      N1({}, "a", { value: 1 });
    } catch (J3) {
      N1 = false;
    }
  Qq.exports = N1;
});
var Bq2 = T4((X5, Fq) => {
  var C, e = SyntaxError, Gq = Function, n = TypeError, a1 = function(J4) {
    try {
      return Gq('"use strict"; return (' + J4 + ").constructor;")();
    } catch (q2) {}
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
      } catch (q2) {
        return s1;
      }
    }
  }() : s1, r = h12()(), sJ = Y12()(), I2 = Object.getPrototypeOf || (sJ ? function(J4) {
    return J4.__proto__;
  } : null), t = {}, iJ = typeof Uint8Array === "undefined" || !I2 ? C : I2(Uint8Array), l = { "%AggregateError%": typeof AggregateError === "undefined" ? C : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? C : ArrayBuffer, "%ArrayIteratorPrototype%": r && I2 ? I2([][Symbol.iterator]()) : C, "%AsyncFromSyncIteratorPrototype%": C, "%AsyncFunction%": t, "%AsyncGenerator%": t, "%AsyncGeneratorFunction%": t, "%AsyncIteratorPrototype%": t, "%Atomics%": typeof Atomics === "undefined" ? C : Atomics, "%BigInt%": typeof BigInt === "undefined" ? C : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? C : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? C : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? C : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? C : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? C : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? C : FinalizationRegistry, "%Function%": Gq, "%GeneratorFunction%": t, "%Int8Array%": typeof Int8Array === "undefined" ? C : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? C : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? C : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": r && I2 ? I2(I2([][Symbol.iterator]())) : C, "%JSON%": typeof JSON === "object" ? JSON : C, "%Map%": typeof Map === "undefined" ? C : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !r || !I2 ? C : I2(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? C : Promise, "%Proxy%": typeof Proxy === "undefined" ? C : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? C : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? C : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !r || !I2 ? C : I2(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? C : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": r && I2 ? I2(""[Symbol.iterator]()) : C, "%Symbol%": r ? Symbol : C, "%SyntaxError%": e, "%ThrowTypeError%": aJ, "%TypedArray%": iJ, "%TypeError%": n, "%Uint8Array%": typeof Uint8Array === "undefined" ? C : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? C : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? C : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? C : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? C : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? C : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? C : WeakSet };
  if (I2)
    try {
      null.error;
    } catch (J4) {
      Zq = I2(I2(J4)), l["%Error.prototype%"] = Zq;
    }
  var Zq, rJ = function J(q2) {
    var _;
    if (q2 === "%AsyncFunction%")
      _ = a1("async function () {}");
    else if (q2 === "%GeneratorFunction%")
      _ = a1("function* () {}");
    else if (q2 === "%AsyncGeneratorFunction%")
      _ = a1("async function* () {}");
    else if (q2 === "%AsyncGenerator%") {
      var z = J("%AsyncGeneratorFunction%");
      if (z)
        _ = z.prototype;
    } else if (q2 === "%AsyncIteratorPrototype%") {
      var Q2 = J("%AsyncGenerator%");
      if (Q2 && I2)
        _ = I2(Q2.prototype);
    }
    return l[q2] = _, _;
  }, Uq = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, F1 = Z12(), k1 = d12(), tJ = F1.call(Function.call, Array.prototype.concat), nJ = F1.call(Function.apply, Array.prototype.splice), Xq = F1.call(Function.call, String.prototype.replace), I1 = F1.call(Function.call, String.prototype.slice), eJ = F1.call(Function.call, RegExp.prototype.exec), q3 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, J3 = /\\(\\)?/g, _3 = function J(q2) {
    var _ = I1(q2, 0, 1), z = I1(q2, -1);
    if (_ === "%" && z !== "%")
      throw new e("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new e("invalid intrinsic syntax, expected opening `%`");
    var Q2 = [];
    return Xq(q2, q3, function(Z, G2, V, U) {
      Q2[Q2.length] = V ? Xq(U, J3, "$1") : G2 || Z;
    }), Q2;
  }, z3 = function J(q2, _) {
    var z = q2, Q2;
    if (k1(Uq, z))
      Q2 = Uq[z], z = "%" + Q2[0] + "%";
    if (k1(l, z)) {
      var Z = l[z];
      if (Z === t)
        Z = rJ(z);
      if (typeof Z === "undefined" && !_)
        throw new n("intrinsic " + q2 + " exists, but is not available. Please file an issue!");
      return { alias: Q2, name: z, value: Z };
    }
    throw new e("intrinsic " + q2 + " does not exist!");
  };
  Fq.exports = function J(q2, _) {
    if (typeof q2 !== "string" || q2.length === 0)
      throw new n("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof _ !== "boolean")
      throw new n('"allowMissing" argument must be a boolean');
    if (eJ(/^%?[^%]*%?$/, q2) === null)
      throw new e("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var z = _3(q2), Q2 = z.length > 0 ? z[0] : "", Z = z3("%" + Q2 + "%", _), G2 = Z.name, V = Z.value, U = false, K = Z.alias;
    if (K)
      Q2 = K[0], nJ(z, tJ([0, 1], K));
    for (var H2 = 1, F2 = true;H2 < z.length; H2 += 1) {
      var B2 = z[H2], W2 = I1(B2, 0, 1), L = I1(B2, -1);
      if ((W2 === '"' || W2 === "'" || W2 === "`" || (L === '"' || L === "'" || L === "`")) && W2 !== L)
        throw new e("property names with quotes must have matching quotes");
      if (B2 === "constructor" || !F2)
        U = true;
      if (Q2 += "." + B2, G2 = "%" + Q2 + "%", k1(l, G2))
        V = l[G2];
      else if (V != null) {
        if (!(B2 in V)) {
          if (!_)
            throw new n("base intrinsic for " + q2 + " exists, but the property is not available.");
          return;
        }
        if (d && H2 + 1 >= z.length) {
          var D = d(V, B2);
          if (F2 = !!D, F2 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B2];
        } else
          F2 = k1(V, B2), V = V[B2];
        if (F2 && !U)
          l[G2] = V;
      }
    }
    return V;
  };
});
var i12 = T4((G5, Vq) => {
  var Q3 = Bq2(), v1 = Q3("%Object.getOwnPropertyDescriptor%", true);
  if (v1)
    try {
      v1([], "length");
    } catch (J3) {
      v1 = null;
    }
  Vq.exports = v1;
});
var Wq2 = T4((F5, Lq) => {
  var Kq = j12(), Z3 = u12(), q1 = U12(), Hq = i12();
  Lq.exports = function J(q2, _, z) {
    if (!q2 || typeof q2 !== "object" && typeof q2 !== "function")
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
    var Q2 = arguments.length > 3 ? arguments[3] : null, Z = arguments.length > 4 ? arguments[4] : null, G2 = arguments.length > 5 ? arguments[5] : null, V = arguments.length > 6 ? arguments[6] : false, U = !!Hq && Hq(q2, _);
    if (Kq)
      Kq(q2, _, { configurable: G2 === null && U ? U.configurable : !G2, enumerable: Q2 === null && U ? U.enumerable : !Q2, value: z, writable: Z === null && U ? U.writable : !Z });
    else if (V || !Q2 && !Z && !G2)
      q2[_] = z;
    else
      throw new Z3("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Rq2 = T4((B5, Dq) => {
  var r1 = j12(), Mq = function J() {
    return !!r1;
  };
  Mq.hasArrayLengthDefineBug = function J() {
    if (!r1)
      return null;
    try {
      return r1([], "length", { value: 1 }).length !== 1;
    } catch (q2) {
      return true;
    }
  };
  Dq.exports = Mq;
});
var Tq2 = T4((V5, xq) => {
  var U3 = G12(), Oq = Wq2(), X3 = Rq2()(), Aq = i12(), Cq = U12(), G3 = U3("%Math.floor%");
  xq.exports = function J(q2, _) {
    if (typeof q2 !== "function")
      throw new Cq("`fn` is not a function");
    if (typeof _ !== "number" || _ < 0 || _ > 4294967295 || G3(_) !== _)
      throw new Cq("`length` must be a positive 32-bit integer");
    var z = arguments.length > 2 && !!arguments[2], Q2 = true, Z = true;
    if ("length" in q2 && Aq) {
      var G2 = Aq(q2, "length");
      if (G2 && !G2.configurable)
        Q2 = false;
      if (G2 && !G2.writable)
        Z = false;
    }
    if (Q2 || Z || !z)
      if (X3)
        Oq(q2, "length", _, true, true);
      else
        Oq(q2, "length", _);
    return q2;
  };
});
var n12 = T4((K5, S1) => {
  var t1 = Z12(), $1 = G12(), F3 = Tq2(), B3 = U12(), kq = $1("%Function.prototype.apply%"), Iq = $1("%Function.prototype.call%"), vq = $1("%Reflect.apply%", true) || t1.call(Iq, kq), Nq = j12(), V3 = $1("%Math.max%");
  S1.exports = function J(q2) {
    if (typeof q2 !== "function")
      throw new B3("a function is required");
    var _ = vq(t1, Iq, arguments);
    return F3(_, 1 + V3(0, q2.length - (arguments.length - 1)), true);
  };
  var jq = function J() {
    return vq(t1, kq, arguments);
  };
  if (Nq)
    Nq(S1.exports, "apply", { value: jq });
  else
    S1.exports.apply = jq;
});
var bq2 = T4((H5, Pq) => {
  var Sq = G12(), $q = n12(), K3 = $q(Sq("String.prototype.indexOf"));
  Pq.exports = function J(q2, _) {
    var z = Sq(q2, !!_);
    if (typeof z === "function" && K3(q2, ".prototype.") > -1)
      return $q(z);
    return z;
  };
});
var mq2 = T4((L5, yq) => {
  var P1 = (typeof JSON !== "undefined" ? JSON : K02()).stringify, H3 = L02(), L3 = S02(), W3 = n12(), wq = bq2(), Eq = wq("Array.prototype.join"), e1 = wq("Array.prototype.push"), fq = function J(q2, _) {
    var z = "";
    for (var Q2 = 0;Q2 < q2; Q2 += 1)
      z += _;
    return z;
  }, M3 = function(J3, q2, _) {
    return _;
  };
  yq.exports = function J(q2) {
    var _ = arguments.length > 1 ? arguments[1] : undefined, z = _ && _.space || "";
    if (typeof z === "number")
      z = fq(z, " ");
    var Q2 = !!_ && typeof _.cycles === "boolean" && _.cycles, Z = _ && _.replacer ? W3(_.replacer) : M3, G2 = typeof _ === "function" ? _ : _ && _.cmp, V = G2 && function(K) {
      var H2 = G2.length > 2 && function F(B2) {
        return K[B2];
      };
      return function(F2, B2) {
        return G2({ key: F2, value: K[F2] }, { key: B2, value: K[B2] }, H2 ? { __proto__: null, get: H2 } : undefined);
      };
    }, U = [];
    return function K(H2, F2, B2, W2) {
      var L = z ? `
` + fq(W2, z) : "", D = z ? ": " : ":";
      if (B2 && B2.toJSON && typeof B2.toJSON === "function")
        B2 = B2.toJSON();
      if (B2 = Z(H2, F2, B2), B2 === undefined)
        return;
      if (typeof B2 !== "object" || B2 === null)
        return P1(B2);
      if (H3(B2)) {
        var S = [];
        for (var O = 0;O < B2.length; O++) {
          var v = K(B2, O, B2[O], W2 + 1) || P1(null);
          e1(S, L + z + v);
        }
        return "[" + Eq(S, ",") + L + "]";
      }
      if (U.indexOf(B2) !== -1) {
        if (Q2)
          return P1("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        e1(U, B2);
      var N4 = L3(B2).sort(V && V(B2)), S = [];
      for (var O = 0;O < N4.length; O++) {
        var F2 = N4[O], j = K(B2, F2, B2[F2], W2 + 1);
        if (!j)
          continue;
        var P = P1(F2) + D + j;
        e1(S, L + z + P);
      }
      return U.splice(U.indexOf(B2), 1), "{" + Eq(S, ",") + L + "}";
    }({ "": q2 }, "", q2, 0);
  };
});
var z02 = XJ2(mq2(), 1);
var gq2 = function(J3, q2, _, z) {
  let Q2, Z, G2;
  const V = q2 || [0], U = (_ = _ || 0) >>> 3, K = z === -1 ? 3 : 0;
  for (Q2 = 0;Q2 < J3.length; Q2 += 1)
    G2 = Q2 + U, Z = G2 >>> 2, V.length <= Z && V.push(0), V[Z] |= J3[Q2] << 8 * (K + z * (G2 % 4));
  return { value: V, binLen: 8 * J3.length + _ };
};
var _12 = function(J3, q2, _) {
  switch (q2) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (J3) {
    case "HEX":
      return function(z, Q2, Z) {
        return function(G2, V, U, K) {
          let H2, F2, B2, W2;
          if (G2.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          const L = V || [0], D = (U = U || 0) >>> 3, O = K === -1 ? 3 : 0;
          for (H2 = 0;H2 < G2.length; H2 += 2) {
            if (F2 = parseInt(G2.substr(H2, 2), 16), isNaN(F2))
              throw new Error("String of HEX type contains invalid characters");
            for (W2 = (H2 >>> 1) + D, B2 = W2 >>> 2;L.length <= B2; )
              L.push(0);
            L[B2] |= F2 << 8 * (O + K * (W2 % 4));
          }
          return { value: L, binLen: 4 * G2.length + U };
        }(z, Q2, Z, _);
      };
    case "TEXT":
      return function(z, Q2, Z) {
        return function(G2, V, U, K, H2) {
          let F2, B2, W2, L, D, O, v, N4, S = 0;
          const j = U || [0], P = (K = K || 0) >>> 3;
          if (V === "UTF8")
            for (v = H2 === -1 ? 3 : 0, W2 = 0;W2 < G2.length; W2 += 1)
              for (F2 = G2.charCodeAt(W2), B2 = [], 128 > F2 ? B2.push(F2) : 2048 > F2 ? (B2.push(192 | F2 >>> 6), B2.push(128 | 63 & F2)) : 55296 > F2 || 57344 <= F2 ? B2.push(224 | F2 >>> 12, 128 | F2 >>> 6 & 63, 128 | 63 & F2) : (W2 += 1, F2 = 65536 + ((1023 & F2) << 10 | 1023 & G2.charCodeAt(W2)), B2.push(240 | F2 >>> 18, 128 | F2 >>> 12 & 63, 128 | F2 >>> 6 & 63, 128 | 63 & F2)), L = 0;L < B2.length; L += 1) {
                for (O = S + P, D = O >>> 2;j.length <= D; )
                  j.push(0);
                j[D] |= B2[L] << 8 * (v + H2 * (O % 4)), S += 1;
              }
          else
            for (v = H2 === -1 ? 2 : 0, N4 = V === "UTF16LE" && H2 !== 1 || V !== "UTF16LE" && H2 === 1, W2 = 0;W2 < G2.length; W2 += 1) {
              for (F2 = G2.charCodeAt(W2), N4 === true && (L = 255 & F2, F2 = L << 8 | F2 >>> 8), O = S + P, D = O >>> 2;j.length <= D; )
                j.push(0);
              j[D] |= F2 << 8 * (v + H2 * (O % 4)), S += 2;
            }
          return { value: j, binLen: 8 * S + K };
        }(z, q2, Q2, Z, _);
      };
    case "B64":
      return function(z, Q2, Z) {
        return function(G2, V, U, K) {
          let H2, F2, B2, W2, L, D, O, v = 0;
          const N4 = V || [0], S = (U = U || 0) >>> 3, j = K === -1 ? 3 : 0, P = G2.indexOf("=");
          if (G2.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (G2 = G2.replace(/=/g, ""), P !== -1 && P < G2.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (F2 = 0;F2 < G2.length; F2 += 4) {
            for (L = G2.substr(F2, 4), W2 = 0, B2 = 0;B2 < L.length; B2 += 1)
              H2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(L.charAt(B2)), W2 |= H2 << 18 - 6 * B2;
            for (B2 = 0;B2 < L.length - 1; B2 += 1) {
              for (O = v + S, D = O >>> 2;N4.length <= D; )
                N4.push(0);
              N4[D] |= (W2 >>> 16 - 8 * B2 & 255) << 8 * (j + K * (O % 4)), v += 1;
            }
          }
          return { value: N4, binLen: 8 * v + U };
        }(z, Q2, Z, _);
      };
    case "BYTES":
      return function(z, Q2, Z) {
        return function(G2, V, U, K) {
          let H2, F2, B2, W2;
          const L = V || [0], D = (U = U || 0) >>> 3, O = K === -1 ? 3 : 0;
          for (F2 = 0;F2 < G2.length; F2 += 1)
            H2 = G2.charCodeAt(F2), W2 = F2 + D, B2 = W2 >>> 2, L.length <= B2 && L.push(0), L[B2] |= H2 << 8 * (O + K * (W2 % 4));
          return { value: L, binLen: 8 * G2.length + U };
        }(z, Q2, Z, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (z) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(z, Q2, Z) {
        return function(G2, V, U, K) {
          return gq2(new Uint8Array(G2), V, U, K);
        }(z, Q2, Z, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (z) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(z, Q2, Z) {
        return gq2(z, Q2, Z, _);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var pq2 = function(J3, q2, _, z) {
  switch (J3) {
    case "HEX":
      return function(Q2) {
        return function(Z, G2, V, U) {
          let H2, F2, B2 = "";
          const W2 = G2 / 8, L = V === -1 ? 3 : 0;
          for (H2 = 0;H2 < W2; H2 += 1)
            F2 = Z[H2 >>> 2] >>> 8 * (L + V * (H2 % 4)), B2 += "0123456789abcdef".charAt(F2 >>> 4 & 15) + "0123456789abcdef".charAt(15 & F2);
          return U.outputUpper ? B2.toUpperCase() : B2;
        }(Q2, q2, _, z);
      };
    case "B64":
      return function(Q2) {
        return function(Z, G2, V, U) {
          let K, H2, F2, B2, W2, L = "";
          const D = G2 / 8, O = V === -1 ? 3 : 0;
          for (K = 0;K < D; K += 3)
            for (B2 = K + 1 < D ? Z[K + 1 >>> 2] : 0, W2 = K + 2 < D ? Z[K + 2 >>> 2] : 0, F2 = (Z[K >>> 2] >>> 8 * (O + V * (K % 4)) & 255) << 16 | (B2 >>> 8 * (O + V * ((K + 1) % 4)) & 255) << 8 | W2 >>> 8 * (O + V * ((K + 2) % 4)) & 255, H2 = 0;H2 < 4; H2 += 1)
              L += 8 * K + 6 * H2 <= G2 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(F2 >>> 6 * (3 - H2) & 63) : U.b64Pad;
          return L;
        }(Q2, q2, _, z);
      };
    case "BYTES":
      return function(Q2) {
        return function(Z, G2, V) {
          let U, K, H2 = "";
          const F2 = G2 / 8, B2 = V === -1 ? 3 : 0;
          for (U = 0;U < F2; U += 1)
            K = Z[U >>> 2] >>> 8 * (B2 + V * (U % 4)) & 255, H2 += String.fromCharCode(K);
          return H2;
        }(Q2, q2, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (Q2) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(Q2) {
        return function(Z, G2, V) {
          let U;
          const K = G2 / 8, H2 = new ArrayBuffer(K), F2 = new Uint8Array(H2), B2 = V === -1 ? 3 : 0;
          for (U = 0;U < K; U += 1)
            F2[U] = Z[U >>> 2] >>> 8 * (B2 + V * (U % 4)) & 255;
          return H2;
        }(Q2, q2, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (Q2) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(Q2) {
        return function(Z, G2, V) {
          let U;
          const K = G2 / 8, H2 = V === -1 ? 3 : 0, F2 = new Uint8Array(K);
          for (U = 0;U < K; U += 1)
            F2[U] = Z[U >>> 2] >>> 8 * (H2 + V * (U % 4)) & 255;
          return F2;
        }(Q2, q2, _);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var E12 = function(J3, q2) {
  let _, z;
  const Q2 = J3.binLen >>> 3, Z = q2.binLen >>> 3, G2 = Q2 << 3, V = 4 - Q2 << 3;
  if (Q2 % 4 != 0) {
    for (_ = 0;_ < Z; _ += 4)
      z = Q2 + _ >>> 2, J3.value[z] |= q2.value[_ >>> 2] << G2, J3.value.push(0), J3.value[z + 1] |= q2.value[_ >>> 2] >>> V;
    return (J3.value.length << 2) - 4 >= Z + Q2 && J3.value.pop(), { value: J3.value, binLen: J3.binLen + q2.binLen };
  }
  return { value: J3.value.concat(q2.value), binLen: J3.binLen + q2.binLen };
};
var cq2 = function(J3) {
  const q2 = { outputUpper: false, b64Pad: "=", outputLen: -1 }, _ = J3 || {};
  if (q2.outputUpper = _.outputUpper || false, _.b64Pad && (q2.b64Pad = _.b64Pad), _.outputLen) {
    if (_.outputLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q2.outputLen = _.outputLen;
  } else if (_.shakeLen) {
    if (_.shakeLen % 8 != 0)
      throw new Error("Output length must be a multiple of 8");
    q2.outputLen = _.shakeLen;
  }
  if (typeof q2.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof q2.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return q2;
};
var c2 = function(J3, q2, _, z) {
  const Q2 = J3 + " must include a value and format";
  if (!q2) {
    if (!z)
      throw new Error(Q2);
    return z;
  }
  if (q2.value === undefined || !q2.format)
    throw new Error(Q2);
  return _12(q2.format, q2.encoding || "UTF8", _)(q2.value);
};
var J12 = function(J3, q2) {
  return J3 << q2 | J3 >>> 32 - q2;
};
var f2 = function(J3, q2) {
  return J3 >>> q2 | J3 << 32 - q2;
};
var iq2 = function(J3, q2) {
  return J3 >>> q2;
};
var uq2 = function(J3, q2, _) {
  return J3 ^ q2 ^ _;
};
var rq2 = function(J3, q2, _) {
  return J3 & q2 ^ ~J3 & _;
};
var tq2 = function(J3, q2, _) {
  return J3 & q2 ^ J3 & _ ^ q2 & _;
};
var D32 = function(J3) {
  return f2(J3, 2) ^ f2(J3, 13) ^ f2(J3, 22);
};
var $2 = function(J3, q2) {
  const _ = (65535 & J3) + (65535 & q2);
  return (65535 & (J3 >>> 16) + (q2 >>> 16) + (_ >>> 16)) << 16 | 65535 & _;
};
var R32 = function(J3, q2, _, z) {
  const Q2 = (65535 & J3) + (65535 & q2) + (65535 & _) + (65535 & z);
  return (65535 & (J3 >>> 16) + (q2 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q2 >>> 16)) << 16 | 65535 & Q2;
};
var V12 = function(J3, q2, _, z, Q2) {
  const Z = (65535 & J3) + (65535 & q2) + (65535 & _) + (65535 & z) + (65535 & Q2);
  return (65535 & (J3 >>> 16) + (q2 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q2 >>> 16) + (Z >>> 16)) << 16 | 65535 & Z;
};
var O32 = function(J3) {
  return f2(J3, 7) ^ f2(J3, 18) ^ iq2(J3, 3);
};
var A32 = function(J3) {
  return f2(J3, 6) ^ f2(J3, 11) ^ f2(J3, 25);
};
var C32 = function(J3) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var nq2 = function(J3, q2) {
  let _, z, Q2, Z, G2, V, U;
  const K = [];
  for (_ = q2[0], z = q2[1], Q2 = q2[2], Z = q2[3], G2 = q2[4], U = 0;U < 80; U += 1)
    K[U] = U < 16 ? J3[U] : J12(K[U - 3] ^ K[U - 8] ^ K[U - 14] ^ K[U - 16], 1), V = U < 20 ? V12(J12(_, 5), rq2(z, Q2, Z), G2, 1518500249, K[U]) : U < 40 ? V12(J12(_, 5), uq2(z, Q2, Z), G2, 1859775393, K[U]) : U < 60 ? V12(J12(_, 5), tq2(z, Q2, Z), G2, 2400959708, K[U]) : V12(J12(_, 5), uq2(z, Q2, Z), G2, 3395469782, K[U]), G2 = Z, Z = Q2, Q2 = J12(z, 30), z = _, _ = V;
  return q2[0] = $2(_, q2[0]), q2[1] = $2(z, q2[1]), q2[2] = $2(Q2, q2[2]), q2[3] = $2(Z, q2[3]), q2[4] = $2(G2, q2[4]), q2;
};
var x32 = function(J3, q2, _, z) {
  let Q2;
  const Z = 15 + (q2 + 65 >>> 9 << 4), G2 = q2 + _;
  for (;J3.length <= Z; )
    J3.push(0);
  for (J3[q2 >>> 5] |= 128 << 24 - q2 % 32, J3[Z] = 4294967295 & G2, J3[Z - 1] = G2 / K12 | 0, Q2 = 0;Q2 < J3.length; Q2 += 16)
    z = nq2(J3.slice(Q2, Q2 + 16), z);
  return z;
};
var hq2 = function(J3) {
  let q2;
  return q2 = J3 == "SHA-224" ? m2.slice() : g2.slice(), q2;
};
var Yq2 = function(J3, q2) {
  let _, z, Q2, Z, G2, V, U, K, H2, F2, B2;
  const W2 = [];
  for (_ = q2[0], z = q2[1], Q2 = q2[2], Z = q2[3], G2 = q2[4], V = q2[5], U = q2[6], K = q2[7], B2 = 0;B2 < 64; B2 += 1)
    W2[B2] = B2 < 16 ? J3[B2] : R32(f2(L = W2[B2 - 2], 17) ^ f2(L, 19) ^ iq2(L, 10), W2[B2 - 7], O32(W2[B2 - 15]), W2[B2 - 16]), H2 = V12(K, A32(G2), rq2(G2, V, U), M2[B2], W2[B2]), F2 = $2(D32(_), tq2(_, z, Q2)), K = U, U = V, V = G2, G2 = $2(Z, H2), Z = Q2, Q2 = z, z = _, _ = $2(H2, F2);
  var L;
  return q2[0] = $2(_, q2[0]), q2[1] = $2(z, q2[1]), q2[2] = $2(Q2, q2[2]), q2[3] = $2(Z, q2[3]), q2[4] = $2(G2, q2[4]), q2[5] = $2(V, q2[5]), q2[6] = $2(U, q2[6]), q2[7] = $2(K, q2[7]), q2;
};
var dq2 = function(J3, q2) {
  let _;
  return q2 > 32 ? (_ = 64 - q2, new X2(J3.I << q2 | J3.N >>> _, J3.N << q2 | J3.I >>> _)) : q2 !== 0 ? (_ = 32 - q2, new X2(J3.N << q2 | J3.I >>> _, J3.I << q2 | J3.N >>> _)) : J3;
};
var w2 = function(J3, q2) {
  let _;
  return q2 < 32 ? (_ = 32 - q2, new X2(J3.N >>> q2 | J3.I << _, J3.I >>> q2 | J3.N << _)) : (_ = 64 - q2, new X2(J3.I >>> q2 | J3.N << _, J3.N >>> q2 | J3.I << _));
};
var eq2 = function(J3, q2) {
  return new X2(J3.N >>> q2, J3.I >>> q2 | J3.N << 32 - q2);
};
var j32 = function(J3, q2, _) {
  return new X2(J3.N & q2.N ^ J3.N & _.N ^ q2.N & _.N, J3.I & q2.I ^ J3.I & _.I ^ q2.I & _.I);
};
var k32 = function(J3) {
  const q2 = w2(J3, 28), _ = w2(J3, 34), z = w2(J3, 39);
  return new X2(q2.N ^ _.N ^ z.N, q2.I ^ _.I ^ z.I);
};
var E4 = function(J3, q2) {
  let _, z;
  _ = (65535 & J3.I) + (65535 & q2.I), z = (J3.I >>> 16) + (q2.I >>> 16) + (_ >>> 16);
  const Q2 = (65535 & z) << 16 | 65535 & _;
  return _ = (65535 & J3.N) + (65535 & q2.N) + (z >>> 16), z = (J3.N >>> 16) + (q2.N >>> 16) + (_ >>> 16), new X2((65535 & z) << 16 | 65535 & _, Q2);
};
var I32 = function(J3, q2, _, z) {
  let Q2, Z;
  Q2 = (65535 & J3.I) + (65535 & q2.I) + (65535 & _.I) + (65535 & z.I), Z = (J3.I >>> 16) + (q2.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q2 >>> 16);
  const G2 = (65535 & Z) << 16 | 65535 & Q2;
  return Q2 = (65535 & J3.N) + (65535 & q2.N) + (65535 & _.N) + (65535 & z.N) + (Z >>> 16), Z = (J3.N >>> 16) + (q2.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q2 >>> 16), new X2((65535 & Z) << 16 | 65535 & Q2, G2);
};
var v32 = function(J3, q2, _, z, Q2) {
  let Z, G2;
  Z = (65535 & J3.I) + (65535 & q2.I) + (65535 & _.I) + (65535 & z.I) + (65535 & Q2.I), G2 = (J3.I >>> 16) + (q2.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q2.I >>> 16) + (Z >>> 16);
  const V = (65535 & G2) << 16 | 65535 & Z;
  return Z = (65535 & J3.N) + (65535 & q2.N) + (65535 & _.N) + (65535 & z.N) + (65535 & Q2.N) + (G2 >>> 16), G2 = (J3.N >>> 16) + (q2.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q2.N >>> 16) + (Z >>> 16), new X2((65535 & G2) << 16 | 65535 & Z, V);
};
var B12 = function(J3, q2) {
  return new X2(J3.N ^ q2.N, J3.I ^ q2.I);
};
var S32 = function(J3) {
  const q2 = w2(J3, 19), _ = w2(J3, 61), z = eq2(J3, 6);
  return new X2(q2.N ^ _.N ^ z.N, q2.I ^ _.I ^ z.I);
};
var $32 = function(J3) {
  const q2 = w2(J3, 1), _ = w2(J3, 8), z = eq2(J3, 7);
  return new X2(q2.N ^ _.N ^ z.N, q2.I ^ _.I ^ z.I);
};
var P32 = function(J3) {
  const q2 = w2(J3, 14), _ = w2(J3, 18), z = w2(J3, 41);
  return new X2(q2.N ^ _.N ^ z.N, q2.I ^ _.I ^ z.I);
};
var lq2 = function(J3) {
  return J3 === "SHA-384" ? [new X2(3418070365, m2[0]), new X2(1654270250, m2[1]), new X2(2438529370, m2[2]), new X2(355462360, m2[3]), new X2(1731405415, m2[4]), new X2(41048885895, m2[5]), new X2(3675008525, m2[6]), new X2(1203062813, m2[7])] : [new X2(g2[0], 4089235720), new X2(g2[1], 2227873595), new X2(g2[2], 4271175723), new X2(g2[3], 1595750129), new X2(g2[4], 2917565137), new X2(g2[5], 725511199), new X2(g2[6], 4215389547), new X2(g2[7], 327033209)];
};
var oq2 = function(J3, q2) {
  let _, z, Q2, Z, G2, V, U, K, H2, F2, B2, W2;
  const L = [];
  for (_ = q2[0], z = q2[1], Q2 = q2[2], Z = q2[3], G2 = q2[4], V = q2[5], U = q2[6], K = q2[7], B2 = 0;B2 < 80; B2 += 1)
    B2 < 16 ? (W2 = 2 * B2, L[B2] = new X2(J3[W2], J3[W2 + 1])) : L[B2] = I32(S32(L[B2 - 2]), L[B2 - 7], $32(L[B2 - 15]), L[B2 - 16]), H2 = v32(K, P32(G2), (O = V, v = U, new X2((D = G2).N & O.N ^ ~D.N & v.N, D.I & O.I ^ ~D.I & v.I)), b32[B2], L[B2]), F2 = E4(k32(_), j32(_, z, Q2)), K = U, U = V, V = G2, G2 = E4(Z, H2), Z = Q2, Q2 = z, z = _, _ = E4(H2, F2);
  var D, O, v;
  return q2[0] = E4(_, q2[0]), q2[1] = E4(z, q2[1]), q2[2] = E4(Q2, q2[2]), q2[3] = E4(Z, q2[3]), q2[4] = E4(G2, q2[4]), q2[5] = E4(V, q2[5]), q2[6] = E4(U, q2[6]), q2[7] = E4(K, q2[7]), q2;
};
var J02 = function(J3) {
  let q2;
  const _ = [];
  for (q2 = 0;q2 < 5; q2 += 1)
    _[q2] = [new X2(0, 0), new X2(0, 0), new X2(0, 0), new X2(0, 0), new X2(0, 0)];
  return _;
};
var y32 = function(J3) {
  let q2;
  const _ = [];
  for (q2 = 0;q2 < 5; q2 += 1)
    _[q2] = J3[q2].slice();
  return _;
};
var b12 = function(J3, q2) {
  let _, z, Q2, Z;
  const G2 = [], V = [];
  if (J3 !== null)
    for (z = 0;z < J3.length; z += 2)
      q2[(z >>> 1) % 5][(z >>> 1) / 5 | 0] = B12(q2[(z >>> 1) % 5][(z >>> 1) / 5 | 0], new X2(J3[z + 1], J3[z]));
  for (_ = 0;_ < 24; _ += 1) {
    for (Z = J02(), z = 0;z < 5; z += 1)
      G2[z] = (U = q2[z][0], K = q2[z][1], H2 = q2[z][2], F2 = q2[z][3], B2 = q2[z][4], new X2(U.N ^ K.N ^ H2.N ^ F2.N ^ B2.N, U.I ^ K.I ^ H2.I ^ F2.I ^ B2.I));
    for (z = 0;z < 5; z += 1)
      V[z] = B12(G2[(z + 4) % 5], dq2(G2[(z + 1) % 5], 1));
    for (z = 0;z < 5; z += 1)
      for (Q2 = 0;Q2 < 5; Q2 += 1)
        q2[z][Q2] = B12(q2[z][Q2], V[z]);
    for (z = 0;z < 5; z += 1)
      for (Q2 = 0;Q2 < 5; Q2 += 1)
        Z[Q2][(2 * z + 3 * Q2) % 5] = dq2(q2[z][Q2], w32[z][Q2]);
    for (z = 0;z < 5; z += 1)
      for (Q2 = 0;Q2 < 5; Q2 += 1)
        q2[z][Q2] = B12(Z[z][Q2], new X2(~Z[(z + 1) % 5][Q2].N & Z[(z + 2) % 5][Q2].N, ~Z[(z + 1) % 5][Q2].I & Z[(z + 2) % 5][Q2].I));
    q2[0][0] = B12(q2[0][0], f32[_]);
  }
  var U, K, H2, F2, B2;
  return q2;
};
var qJ2 = function(J3) {
  let q2, _, z = 0;
  const Q2 = [0, 0], Z = [4294967295 & J3, J3 / K12 & 2097151];
  for (q2 = 6;q2 >= 0; q2--)
    _ = Z[q2 >> 2] >>> 8 * q2 & 255, _ === 0 && z === 0 || (Q2[z + 1 >> 2] |= _ << 8 * (z + 1), z += 1);
  return z = z !== 0 ? z : 1, Q2[0] |= z, { value: z + 1 > 4 ? Q2 : [Q2[0]], binLen: 8 + 8 * z };
};
var q02 = function(J3) {
  return E12(qJ2(J3.binLen), J3);
};
var aq2 = function(J3, q2) {
  let _, z = qJ2(q2);
  z = E12(z, J3);
  const Q2 = q2 >>> 2, Z = (Q2 - z.value.length % Q2) % Q2;
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
  constructor(J3, q2, _) {
    const z = _ || {};
    if (this.t = q2, this.i = z.encoding || "UTF8", this.numRounds = z.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = J3, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(J3) {
    let q2, _ = 0;
    const z = this.m >>> 5, Q2 = this.C(J3, this.h, this.u), Z = Q2.binLen, G2 = Q2.value, V = Z >>> 5;
    for (q2 = 0;q2 < V; q2 += z)
      _ + this.m <= Z && (this.U = this.v(G2.slice(q2, q2 + z), this.U), _ += this.m);
    return this.A += _, this.h = G2.slice(_ >>> 5), this.u = Z % this.m, this.l = true, this;
  }
  getHash(J3, q2) {
    let _, z, Q2 = this.R;
    const Z = cq2(q2);
    if (this.K) {
      if (Z.outputLen === -1)
        throw new Error("Output length must be specified in options");
      Q2 = Z.outputLen;
    }
    const G2 = pq2(J3, Q2, this.T, Z);
    if (this.H && this.g)
      return G2(this.g(Z));
    for (z = this.F(this.h.slice(), this.u, this.A, this.L(this.U), Q2), _ = 1;_ < this.numRounds; _ += 1)
      this.K && Q2 % 32 != 0 && (z[z.length - 1] &= 16777215 >>> 24 - Q2 % 32), z = this.F(z, Q2, 0, this.B(this.o), Q2);
    return G2(z);
  }
  setHMACKey(J3, q2, _) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    const z = _12(q2, (_ || {}).encoding || "UTF8", this.T);
    this.k(z(J3));
  }
  k(J3) {
    const q2 = this.m >>> 3, _ = q2 / 4 - 1;
    let z;
    if (this.numRounds !== 1)
      throw new Error(sq2);
    if (this.H)
      throw new Error("MAC key already set");
    for (q2 < J3.binLen / 8 && (J3.value = this.F(J3.value, J3.binLen, 0, this.B(this.o), this.R));J3.value.length <= _; )
      J3.value.push(0);
    for (z = 0;z <= _; z += 1)
      this.S[z] = 909522486 ^ J3.value[z], this.p[z] = 1549556828 ^ J3.value[z];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(J3, q2) {
    const _ = cq2(q2);
    return pq2(J3, this.R, this.T, _)(this.Y());
  }
  Y() {
    let J3;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    const q2 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return J3 = this.v(this.p, this.B(this.o)), J3 = this.F(q2, this.R, this.m, J3, this.R), J3;
  }
}
var T32 = class extends L12 {
  constructor(J3, q2, _) {
    if (J3 !== "SHA-1")
      throw new Error(H12);
    super(J3, q2, _);
    const z = _ || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = _12(this.t, this.i, this.T), this.v = nq2, this.L = function(Q2) {
      return Q2.slice();
    }, this.B = C32, this.F = x32, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, z.hmacKey && this.k(c2("hmacKey", z.hmacKey, this.T));
  }
};
var N32 = class extends L12 {
  constructor(J3, q2, _) {
    if (J3 !== "SHA-224" && J3 !== "SHA-256")
      throw new Error(H12);
    super(J3, q2, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _12(this.t, this.i, this.T), this.v = Yq2, this.L = function(Q2) {
      return Q2.slice();
    }, this.B = hq2, this.F = function(Q2, Z, G2, V) {
      return function(U, K, H2, F2, B2) {
        let W2, L;
        const D = 15 + (K + 65 >>> 9 << 4), O = K + H2;
        for (;U.length <= D; )
          U.push(0);
        for (U[K >>> 5] |= 128 << 24 - K % 32, U[D] = 4294967295 & O, U[D - 1] = O / K12 | 0, W2 = 0;W2 < U.length; W2 += 16)
          F2 = Yq2(U.slice(W2, W2 + 16), F2);
        return L = B2 === "SHA-224" ? [F2[0], F2[1], F2[2], F2[3], F2[4], F2[5], F2[6]] : F2, L;
      }(Q2, Z, G2, V, J3);
    }, this.U = hq2(J3), this.m = 512, this.R = J3 === "SHA-224" ? 224 : 256, this.K = false, z.hmacKey && this.k(c2("hmacKey", z.hmacKey, this.T));
  }
};

class X2 {
  constructor(J3, q2) {
    this.N = J3, this.I = q2;
  }
}
var b32 = [new X2(M2[0], 3609767458), new X2(M2[1], 602891725), new X2(M2[2], 3964484399), new X2(M2[3], 2173295548), new X2(M2[4], 4081628472), new X2(M2[5], 3053834265), new X2(M2[6], 2937671579), new X2(M2[7], 3664609560), new X2(M2[8], 2734883394), new X2(M2[9], 1164996542), new X2(M2[10], 1323610764), new X2(M2[11], 3590304994), new X2(M2[12], 4068182383), new X2(M2[13], 991336113), new X2(M2[14], 633803317), new X2(M2[15], 3479774868), new X2(M2[16], 2666613458), new X2(M2[17], 944711139), new X2(M2[18], 2341262773), new X2(M2[19], 2007800933), new X2(M2[20], 1495990901), new X2(M2[21], 1856431235), new X2(M2[22], 3175218132), new X2(M2[23], 2198950837), new X2(M2[24], 3999719339), new X2(M2[25], 766784016), new X2(M2[26], 2566594879), new X2(M2[27], 3203337956), new X2(M2[28], 1034457026), new X2(M2[29], 2466948901), new X2(M2[30], 3758326383), new X2(M2[31], 168717936), new X2(M2[32], 1188179964), new X2(M2[33], 1546045734), new X2(M2[34], 1522805485), new X2(M2[35], 2643833823), new X2(M2[36], 2343527390), new X2(M2[37], 1014477480), new X2(M2[38], 1206759142), new X2(M2[39], 344077627), new X2(M2[40], 1290863460), new X2(M2[41], 3158454273), new X2(M2[42], 3505952657), new X2(M2[43], 106217008), new X2(M2[44], 3606008344), new X2(M2[45], 1432725776), new X2(M2[46], 1467031594), new X2(M2[47], 851169720), new X2(M2[48], 3100823752), new X2(M2[49], 1363258195), new X2(M2[50], 3750685593), new X2(M2[51], 3785050280), new X2(M2[52], 3318307427), new X2(M2[53], 3812723403), new X2(M2[54], 2003034995), new X2(M2[55], 3602036899), new X2(M2[56], 1575990012), new X2(M2[57], 1125592928), new X2(M2[58], 2716904306), new X2(M2[59], 442776044), new X2(M2[60], 593698344), new X2(M2[61], 3733110249), new X2(M2[62], 2999351573), new X2(M2[63], 3815920427), new X2(3391569614, 3928383900), new X2(3515267271, 566280711), new X2(3940187606, 3454069534), new X2(4118630271, 4000239992), new X2(116418474, 1914138554), new X2(174292421, 2731055270), new X2(289380356, 3203993006), new X2(460393269, 320620315), new X2(685471733, 587496836), new X2(852142971, 1086792851), new X2(1017036298, 365543100), new X2(1126000580, 2618297676), new X2(1288033470, 3409855158), new X2(1501505948, 4234509866), new X2(1607167915, 987167468), new X2(1816402316, 1246189591)];
var E32 = class extends L12 {
  constructor(J3, q2, _) {
    if (J3 !== "SHA-384" && J3 !== "SHA-512")
      throw new Error(H12);
    super(J3, q2, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _12(this.t, this.i, this.T), this.v = oq2, this.L = function(Q2) {
      return Q2.slice();
    }, this.B = lq2, this.F = function(Q2, Z, G2, V) {
      return function(U, K, H2, F2, B2) {
        let W2, L;
        const D = 31 + (K + 129 >>> 10 << 5), O = K + H2;
        for (;U.length <= D; )
          U.push(0);
        for (U[K >>> 5] |= 128 << 24 - K % 32, U[D] = 4294967295 & O, U[D - 1] = O / K12 | 0, W2 = 0;W2 < U.length; W2 += 32)
          F2 = oq2(U.slice(W2, W2 + 32), F2);
        return L = B2 === "SHA-384" ? [F2[0].N, F2[0].I, F2[1].N, F2[1].I, F2[2].N, F2[2].I, F2[3].N, F2[3].I, F2[4].N, F2[4].I, F2[5].N, F2[5].I] : [F2[0].N, F2[0].I, F2[1].N, F2[1].I, F2[2].N, F2[2].I, F2[3].N, F2[3].I, F2[4].N, F2[4].I, F2[5].N, F2[5].I, F2[6].N, F2[6].I, F2[7].N, F2[7].I], L;
      }(Q2, Z, G2, V, J3);
    }, this.U = lq2(J3), this.m = 1024, this.R = J3 === "SHA-384" ? 384 : 512, this.K = false, z.hmacKey && this.k(c2("hmacKey", z.hmacKey, this.T));
  }
};
var f32 = [new X2(0, 1), new X2(0, 32898), new X2(2147483648, 32906), new X2(2147483648, 2147516416), new X2(0, 32907), new X2(0, 2147483649), new X2(2147483648, 2147516545), new X2(2147483648, 32777), new X2(0, 138), new X2(0, 136), new X2(0, 2147516425), new X2(0, 2147483658), new X2(0, 2147516555), new X2(2147483648, 139), new X2(2147483648, 32905), new X2(2147483648, 32771), new X2(2147483648, 32770), new X2(2147483648, 128), new X2(0, 32778), new X2(2147483648, 2147483658), new X2(2147483648, 2147516545), new X2(2147483648, 32896), new X2(0, 2147483649), new X2(2147483648, 2147516424)];
var w32 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var m32 = class extends L12 {
  constructor(J3, q2, _) {
    let z = 6, Q2 = 0;
    super(J3, q2, _);
    const Z = _ || {};
    if (this.numRounds !== 1) {
      if (Z.kmacKey || Z.hmacKey)
        throw new Error(sq2);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = _12(this.t, this.i, this.T), this.v = b12, this.L = y32, this.B = J02, this.U = J02(), this.K = false, J3) {
      case "SHA3-224":
        this.m = Q2 = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = Q2 = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = Q2 = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = Q2 = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        z = 31, this.m = Q2 = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        z = 31, this.m = Q2 = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        z = 4, this.m = Q2 = 1344, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        z = 4, this.m = Q2 = 1088, this.X(_), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = Q2 = 1344, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = Q2 = 1088, z = this.O(_), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(H12);
    }
    this.F = function(G2, V, U, K, H2) {
      return function(F2, B2, W2, L, D, O, v) {
        let N4, S, j = 0;
        const P = [], W1 = D >>> 5, _J = B2 >>> 5;
        for (N4 = 0;N4 < _J && B2 >= D; N4 += W1)
          L = b12(F2.slice(N4, N4 + W1), L), B2 -= D;
        for (F2 = F2.slice(N4), B2 %= D;F2.length < W1; )
          F2.push(0);
        for (N4 = B2 >>> 3, F2[N4 >> 2] ^= O << N4 % 4 * 8, F2[W1 - 1] ^= 2147483648, L = b12(F2, L);32 * P.length < v && (S = L[j % 5][j / 5 | 0], P.push(S.I), !(32 * P.length >= v)); )
          P.push(S.N), j += 1, 64 * j % D == 0 && (b12(null, L), j = 0);
        return P;
      }(G2, V, 0, K, Q2, z, H2);
    }, Z.hmacKey && this.k(c2("hmacKey", Z.hmacKey, this.T));
  }
  O(J3, q2) {
    const _ = function(Q2) {
      const Z = Q2 || {};
      return { funcName: c2("funcName", Z.funcName, 1, { value: [], binLen: 0 }), customization: c2("Customization", Z.customization, 1, { value: [], binLen: 0 }) };
    }(J3 || {});
    q2 && (_.funcName = q2);
    const z = E12(q02(_.funcName), q02(_.customization));
    if (_.customization.binLen !== 0 || _.funcName.binLen !== 0) {
      const Q2 = aq2(z, this.m >>> 3);
      for (let Z = 0;Z < Q2.length; Z += this.m >>> 5)
        this.U = this.v(Q2.slice(Z, Z + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(J3) {
    const q2 = function(z) {
      const Q2 = z || {};
      return { kmacKey: c2("kmacKey", Q2.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: c2("Customization", Q2.customization, 1, { value: [], binLen: 0 }) };
    }(J3 || {});
    this.O(J3, q2.funcName);
    const _ = aq2(q02(q2.kmacKey), this.m >>> 3);
    for (let z = 0;z < _.length; z += this.m >>> 5)
      this.U = this.v(_.slice(z, z + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(J3) {
    const q2 = E12({ value: this.h.slice(), binLen: this.u }, function(_) {
      let z, Q2, Z = 0;
      const G2 = [0, 0], V = [4294967295 & _, _ / K12 & 2097151];
      for (z = 6;z >= 0; z--)
        Q2 = V[z >> 2] >>> 8 * z & 255, Q2 === 0 && Z === 0 || (G2[Z >> 2] |= Q2 << 8 * Z, Z += 1);
      return Z = Z !== 0 ? Z : 1, G2[Z >> 2] |= Z << 8 * Z, { value: Z + 1 > 4 ? G2 : [G2[0]], binLen: 8 + 8 * Z };
    }(J3.outputLen));
    return this.F(q2.value, q2.binLen, this.A, this.L(this.U), J3.outputLen);
  }
};

class _02 {
  constructor(J3, q2, _) {
    if (J3 == "SHA-1")
      this.P = new T32(J3, q2, _);
    else if (J3 == "SHA-224" || J3 == "SHA-256")
      this.P = new N32(J3, q2, _);
    else if (J3 == "SHA-384" || J3 == "SHA-512")
      this.P = new E32(J3, q2, _);
    else {
      if (J3 != "SHA3-224" && J3 != "SHA3-256" && J3 != "SHA3-384" && J3 != "SHA3-512" && J3 != "SHAKE128" && J3 != "SHAKE256" && J3 != "CSHAKE128" && J3 != "CSHAKE256" && J3 != "KMAC128" && J3 != "KMAC256")
        throw new Error(H12);
      this.P = new m32(J3, q2, _);
    }
  }
  update(J3) {
    return this.P.update(J3), this;
  }
  getHash(J3, q2) {
    return this.P.getHash(J3, q2);
  }
  setHMACKey(J3, q2, _) {
    this.P.setHMACKey(J3, q2, _);
  }
  getHMAC(J3, q2) {
    return this.P.getHMAC(J3, q2);
  }
}
var f12 = function(J3, q2, _ = 0) {
  const z = z02.default({ ...J3, signature: undefined }), Q2 = q2.noTimeWindow ? 0 : Math.floor(Date.now() / (q2.timeWindow ?? JJ2)) + _;
  return new _02("SHA-256", "TEXT", { encoding: "UTF8" }).update(z).update(z02.default(q2)).update(`${Q2}`).getHash("B64");
};
function x52(J3, q2) {
  return (q2.noTimeWindow ? 0 : q2.timeWindow ?? JJ2) ? J3.signature === f12(J3, q2) || J3.signature === f12(J3, q2, -1) : J3.signature === f12(J3, q2);
}
var JJ2 = 5000;

// ../src/cycles/data-update/blob-utils.ts
function packageUpdates(updates, blobs, secret, sender) {
  const blobBuilder = un.payload("payload", { updates, sender }, secret);
  const addedBlob = new Set;
  for (let key in blobs) {
    if (!addedBlob.has(key)) {
      blobBuilder.blob(key, blobs[key]);
      addedBlob.add(key);
    }
  }
  return blobBuilder.build();
}
async function receiveBlob(blob, secret) {
  const { payload, ...blobs } = await I8(blob);
  const thisSecret = secret ?? payload?.secret;
  if (thisSecret && !x52(payload, { secret: thisSecret })) {
    console.error("Failed payload validation.");
    return { payload: undefined, blobs: {} };
  }
  return { payload, blobs, secret: thisSecret };
}

// ../src/core/Processor.ts
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
    const outgoingUpdates = context.root.outgoingUpdates;
    delete context.root.outgoingUpdates;
    if (outgoingUpdates) {
      for (let update of outgoingUpdates) {
        if (update) {
          update.path = this.#fixPath(update.path, context);
          const value = typeof update.value === "function" ? update.value(context.root) : update.value;
          update.value = await tt(value, blobs);
        }
      }
      const blob = packageUpdates(outgoingUpdates, blobs, context.secret, context.clientId);
      this.sendUpdate(blob, context);
    }
  }
  async processBlob(blob, context) {
    const { payload, blobs, secret } = await receiveBlob(blob, context.secret);
    if (secret) {
      context.secret = secret;
    }
    const hasBlobs = blobs && Object.keys(blobs).length > 0;
    if (payload?.globalTime) {
      context.localTimeOffset = payload.globalTime - Date.now();
    }
    if (payload?.myClientId) {
      context.clientId = payload.myClientId;
    }
    if (payload?.state) {
      delete payload.state.signature;
      for (const key in payload.state) {
        context.root[key] = hasBlobs ? ht(payload.state[key], blobs) : payload.state[key];
      }
    }
    if (payload?.updates) {
      if (hasBlobs) {
        payload.updates.forEach((update) => {
          update.value = ht(update.value, blobs);
        });
      }
      context.root.updates = context.root.updates ?? [];
      context.root.updates.push(...payload.updates);
    }
  }
  #fixPath(path, context) {
    const split = path.split("/");
    return split.map((part) => translateValue2(part, {
      self: context.clientId
    })).join("/");
  }
}
// ../src/cycle/context/Context.ts
function createContext(root, properties = {}) {
  return {
    root,
    properties
  };
}
// src/index.ts
var div = document.body.appendChild(document.createElement("div"));
div.style.whiteSpace = "pre";
div.style.fontFamily = "monospace";
div.style.fontSize = "12px";
var root = {
  binding: "~{abc}"
};
var cycleData = createContext(root);
function refreshData() {
  const div2 = document.querySelector("#log-div") ?? document.body.appendChild(document.createElement("div"));
  div2.id = "log-div";
  div2.style.whiteSpace = "pre";
  div2.style.fontFamily = "monospace";
  div2.style.fontSize = "12px";
  div2.textContent = JSON.stringify(root, null, 2);
}
var socketClient = new SocketClient(location.host, undefined, root);
socketClient.observe().onChange(refreshData);
var processor = new Processor((blob) => {
  processor.processBlob(blob, cycleData).then(() => {
    refreshData();
  });
});
function cycle() {
  processor.performCycle(cycleData);
  refreshData();
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
      root.outgoingUpdates = root.outgoingUpdates ?? [];
      root.outgoingUpdates.push({ path: "abc", value: Math.random(), confirmed: 1 });
      refreshData();
    });
  }
}
setupGamePlayer();
export {
  socketClient,
  root
};

//# debugId=28250CD2670EBFF764756E2164756E21

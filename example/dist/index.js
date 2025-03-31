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
var Yn = Object.create;
var { defineProperty: Rt, getPrototypeOf: En, getOwnPropertyNames: In } = Object;
var Nn = Object.prototype.hasOwnProperty;
var xn = (n, t, i) => {
  i = n != null ? Yn(En(n)) : {};
  let r = t || !n || !n.__esModule ? Rt(i, "default", { value: n, enumerable: true }) : i;
  for (let m2 of In(n))
    if (!Nn.call(r, m2))
      Rt(r, m2, { get: () => n[m2], enumerable: true });
  return r;
};
var b = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports);
var jn = b((n, t) => {
  var i = function(x) {
    throw { name: "SyntaxError", message: x, at: g2, text: N2 };
  }, r = function(x) {
    if (x && x !== h)
      i("Expected '" + x + "' instead of '" + h + "'");
    return h = N2.charAt(g2), g2 += 1, h;
  }, m2 = function() {
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
  }, c2 = function() {
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
  }, I2 = function() {
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
        if (x = c2(), u(), r(":"), Object.prototype.hasOwnProperty.call(v, x))
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
        return c2();
      case "-":
        return m2();
      default:
        return h >= "0" && h <= "9" ? m2() : I2();
    }
  }, g2, h, Y = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: `
`, r: "\r", t: "\t" }, N2;
  t.exports = function(x, v) {
    var j;
    if (N2 = x, g2 = 0, h = " ", j = E4(), u(), h)
      i("Syntax error");
    return typeof v === "function" ? function S(A2, T4) {
      var d, R, P = A2[T4];
      if (P && typeof P === "object") {
        for (d in E4)
          if (Object.prototype.hasOwnProperty.call(P, d))
            if (R = S(P, d), typeof R === "undefined")
              delete P[d];
            else
              P[d] = R;
      }
      return v.call(A2, T4, P);
    }({ "": j }, "") : j;
  };
});
var vn = b((n, t) => {
  var i = function(e) {
    return m2.lastIndex = 0, m2.test(e) ? '"' + e.replace(m2, function(E4) {
      var g2 = I2[E4];
      return typeof g2 === "string" ? g2 : "\\u" + ("0000" + E4.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + e + '"';
  }, r = function(e, E4) {
    var g2, h, Y, N2, x = c2, v, j = E4[e];
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
        if (c2 += u, v = [], Object.prototype.toString.apply(j) === "[object Array]") {
          N2 = j.length;
          for (g2 = 0;g2 < N2; g2 += 1)
            v[g2] = r(g2, j) || "null";
          return Y = v.length === 0 ? "[]" : c2 ? `[
` + c2 + v.join(`,
` + c2) + `
` + x + "]" : "[" + v.join(",") + "]", c2 = x, Y;
        }
        if (s && typeof s === "object") {
          N2 = s.length;
          for (g2 = 0;g2 < N2; g2 += 1)
            if (h = s[g2], typeof h === "string") {
              if (Y = r(h, j), Y)
                v.push(i(h) + (c2 ? ": " : ":") + Y);
            }
        } else
          for (h in j)
            if (Object.prototype.hasOwnProperty.call(j, h)) {
              if (Y = r(h, j), Y)
                v.push(i(h) + (c2 ? ": " : ":") + Y);
            }
        return Y = v.length === 0 ? "{}" : c2 ? `{
` + c2 + v.join(`,
` + c2) + `
` + x + "}" : "{" + v.join(",") + "}", c2 = x, Y;
      default:
    }
  }, m2 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c2, u, I2 = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, s;
  t.exports = function(e, E4, g2) {
    var h;
    if (c2 = "", u = "", typeof g2 === "number")
      for (h = 0;h < g2; h += 1)
        u += " ";
    else if (typeof g2 === "string")
      u = g2;
    if (s = E4, E4 && typeof E4 !== "function" && (typeof E4 !== "object" || typeof E4.length !== "number"))
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
  t.exports = function r(m2) {
    var c2 = i.call(m2), u = c2 === "[object Arguments]";
    if (!u)
      u = c2 !== "[object Array]" && m2 !== null && typeof m2 === "object" && typeof m2.length === "number" && m2.length >= 0 && i.call(m2.callee) === "[object Function]";
    return u;
  };
});
var Sn = b((n, t) => {
  var i;
  if (!Object.keys)
    r = Object.prototype.hasOwnProperty, m2 = Object.prototype.toString, c2 = Vt(), u = Object.prototype.propertyIsEnumerable, I2 = !u.call({ toString: null }, "toString"), s = u.call(function() {}, "prototype"), e = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], E4 = function(N2) {
      var x = N2.constructor;
      return x && x.prototype === N2;
    }, g2 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, h = function() {
      if (typeof window === "undefined")
        return false;
      for (var N2 in window)
        try {
          if (!g2["$" + N2] && r.call(window, N2) && window[N2] !== null && typeof window[N2] === "object")
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
      var v = x !== null && typeof x === "object", j = m2.call(x) === "[object Function]", S = c2(x), A2 = v && m2.call(x) === "[object String]", T4 = [];
      if (!v && !j && !S)
        throw new TypeError("Object.keys called on a non-object");
      var d = s && j;
      if (A2 && x.length > 0 && !r.call(x, 0))
        for (var R = 0;R < x.length; ++R)
          T4.push(String(R));
      if (S && x.length > 0)
        for (var P = 0;P < x.length; ++P)
          T4.push(String(P));
      else
        for (var H2 in x)
          if (!(d && H2 === "prototype") && r.call(x, H2))
            T4.push(String(H2));
      if (I2) {
        var U = Y(x);
        for (var a = 0;a < e.length; ++a)
          if (!(U && e[a] === "constructor") && r.call(x, e[a]))
            T4.push(e[a]);
      }
      return T4;
    };
  var r, m2, c2, u, I2, s, e, E4, g2, h, Y;
  t.exports = i;
});
var Tn = b((n, t) => {
  var i = Array.prototype.slice, r = Vt(), m2 = Object.keys, c2 = m2 ? function I(s) {
    return m2(s);
  } : Sn(), u = Object.keys;
  c2.shim = function I() {
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
      Object.keys = c2;
    return Object.keys || c2;
  }, t.exports = c2;
});
var An = b((n, t) => {
  var i = "Function.prototype.bind called on incompatible ", r = Object.prototype.toString, m2 = Math.max, c2 = "[object Function]", u = function e(E4, g2) {
    var h = [];
    for (var Y = 0;Y < E4.length; Y += 1)
      h[Y] = E4[Y];
    for (var N2 = 0;N2 < g2.length; N2 += 1)
      h[N2 + E4.length] = g2[N2];
    return h;
  }, I2 = function e(E4, g2) {
    var h = [];
    for (var Y = g2 || 0, N2 = 0;Y < E4.length; Y += 1, N2 += 1)
      h[N2] = E4[Y];
    return h;
  }, s = function(e, E4) {
    var g2 = "";
    for (var h = 0;h < e.length; h += 1)
      if (g2 += e[h], h + 1 < e.length)
        g2 += E4;
    return g2;
  };
  t.exports = function e(E4) {
    var g2 = this;
    if (typeof g2 !== "function" || r.apply(g2) !== c2)
      throw new TypeError(i + g2);
    var h = I2(arguments, 1), Y, N2 = function() {
      if (this instanceof Y) {
        var A2 = g2.apply(this, u(h, arguments));
        if (Object(A2) === A2)
          return A2;
        return this;
      }
      return g2.apply(E4, u(h, arguments));
    }, x = m2(0, g2.length - h.length), v = [];
    for (var j = 0;j < x; j++)
      v[j] = "$" + j;
    if (Y = Function("binder", "return function (" + s(v, ",") + "){ return binder.apply(this,arguments); }")(N2), g2.prototype) {
      var S = function A() {};
      S.prototype = g2.prototype, Y.prototype = new S, S.prototype = null;
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
    var r = {}, m2 = Symbol("test"), c2 = Object(m2);
    if (typeof m2 === "string")
      return false;
    if (Object.prototype.toString.call(m2) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(c2) !== "[object Symbol]")
      return false;
    var u = 42;
    r[m2] = u;
    for (m2 in r)
      return false;
    if (typeof Object.keys === "function" && Object.keys(r).length !== 0)
      return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(r).length !== 0)
      return false;
    var I2 = Object.getOwnPropertySymbols(r);
    if (I2.length !== 1 || I2[0] !== m2)
      return false;
    if (!Object.prototype.propertyIsEnumerable.call(r, m2))
      return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var s = Object.getOwnPropertyDescriptor(r, m2);
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
  var i = Function.prototype.call, r = Object.prototype.hasOwnProperty, m2 = vt();
  t.exports = m2.call(i, r);
});
var Pt = b((n, t) => {
  var i, r = kn(), m2 = bn(), c2 = dn(), u = Cn(), I2 = Ut(), s = $t(), e = On(), E4 = Function, g2 = function(D) {
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
  }() : Y, x = Gt()(), v = Zt()(), j = Object.getPrototypeOf || (v ? function(D) {
    return D.__proto__;
  } : null), S = {}, A2 = typeof Uint8Array === "undefined" || !j ? i : j(Uint8Array), T4 = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? i : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? i : ArrayBuffer, "%ArrayIteratorPrototype%": x && j ? j([][Symbol.iterator]()) : i, "%AsyncFromSyncIteratorPrototype%": i, "%AsyncFunction%": S, "%AsyncGenerator%": S, "%AsyncGeneratorFunction%": S, "%AsyncIteratorPrototype%": S, "%Atomics%": typeof Atomics === "undefined" ? i : Atomics, "%BigInt%": typeof BigInt === "undefined" ? i : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? i : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": r, "%eval%": eval, "%EvalError%": m2, "%Float32Array%": typeof Float32Array === "undefined" ? i : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? i : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? i : FinalizationRegistry, "%Function%": E4, "%GeneratorFunction%": S, "%Int8Array%": typeof Int8Array === "undefined" ? i : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? i : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": x && j ? j(j([][Symbol.iterator]())) : i, "%JSON%": typeof JSON === "object" ? JSON : i, "%Map%": typeof Map === "undefined" ? i : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !x || !j ? i : j(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? i : Promise, "%Proxy%": typeof Proxy === "undefined" ? i : Proxy, "%RangeError%": c2, "%ReferenceError%": u, "%Reflect%": typeof Reflect === "undefined" ? i : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? i : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !x || !j ? i : j(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": x && j ? j(""[Symbol.iterator]()) : i, "%Symbol%": x ? Symbol : i, "%SyntaxError%": I2, "%ThrowTypeError%": N2, "%TypedArray%": A2, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? i : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? i : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? i : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? i : Uint32Array, "%URIError%": e, "%WeakMap%": typeof WeakMap === "undefined" ? i : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? i : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? i : WeakSet };
  if (j)
    try {
      null.error;
    } catch (D) {
      d = j(j(D)), T4["%Error.prototype%"] = d;
    }
  var d, R = function D(C) {
    var k;
    if (C === "%AsyncFunction%")
      k = g2("async function () {}");
    else if (C === "%GeneratorFunction%")
      k = g2("function* () {}");
    else if (C === "%AsyncGeneratorFunction%")
      k = g2("async function* () {}");
    else if (C === "%AsyncGenerator%") {
      var p = D("%AsyncGeneratorFunction%");
      if (p)
        k = p.prototype;
    } else if (C === "%AsyncIteratorPrototype%") {
      var f2 = D("%AsyncGenerator%");
      if (f2 && j)
        k = j(f2.prototype);
    }
    return T4[C] = k, k;
  }, P = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, H2 = vt(), U = at(), a = H2.call(Function.call, Array.prototype.concat), G2 = H2.call(Function.apply, Array.prototype.splice), rt = H2.call(Function.call, String.prototype.replace), X2 = H2.call(Function.call, String.prototype.slice), L = H2.call(Function.call, RegExp.prototype.exec), O = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, M2 = /\\(\\)?/g, W2 = function D(C) {
    var k = X2(C, 0, 1), p = X2(C, -1);
    if (k === "%" && p !== "%")
      throw new I2("invalid intrinsic syntax, expected closing `%`");
    else if (p === "%" && k !== "%")
      throw new I2("invalid intrinsic syntax, expected opening `%`");
    var f2 = [];
    return rt(C, O, function(V, Z, o, z) {
      f2[f2.length] = o ? rt(z, M2, "$1") : Z || V;
    }), f2;
  }, l = function D(C, k) {
    var p = C, f2;
    if (U(P, p))
      f2 = P[p], p = "%" + f2[0] + "%";
    if (U(T4, p)) {
      var V = T4[p];
      if (V === S)
        V = R(p);
      if (typeof V === "undefined" && !k)
        throw new s("intrinsic " + C + " exists, but is not available. Please file an issue!");
      return { alias: f2, name: p, value: V };
    }
    throw new I2("intrinsic " + C + " does not exist!");
  };
  t.exports = function D(C, k) {
    if (typeof C !== "string" || C.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof k !== "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (L(/^%?[^%]*%?$/, C) === null)
      throw new I2("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var p = W2(C), f2 = p.length > 0 ? p[0] : "", V = l("%" + f2 + "%", k), Z = V.name, o = V.value, z = false, nt = V.alias;
    if (nt)
      f2 = nt[0], G2(p, a([0, 1], nt));
    for (var _ = 1, ct = true;_ < p.length; _ += 1) {
      var J2 = p[_], Yt = X2(J2, 0, 1), Et = X2(J2, -1);
      if ((Yt === '"' || Yt === "'" || Yt === "`" || (Et === '"' || Et === "'" || Et === "`")) && Yt !== Et)
        throw new I2("property names with quotes must have matching quotes");
      if (J2 === "constructor" || !ct)
        z = true;
      if (f2 += "." + J2, Z = "%" + f2 + "%", U(T4, Z))
        o = T4[Z];
      else if (o != null) {
        if (!(J2 in o)) {
          if (!k)
            throw new s("base intrinsic for " + C + " exists, but the property is not available.");
          return;
        }
        if (h && _ + 1 >= p.length) {
          var It = h(o, J2);
          if (ct = !!It, ct && "get" in It && !("originalValue" in It.get))
            o = It.get;
          else
            o = o[J2];
        } else
          ct = U(o, J2), o = o[J2];
        if (ct && !z)
          T4[Z] = o;
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
    } catch (m2) {
      r = false;
    }
  t.exports = r;
});
var pn = b((n, t) => {
  var i, r = SyntaxError, m2 = Function, c2 = TypeError, u = function(L) {
    try {
      return m2('"use strict"; return (' + L + ").constructor;")();
    } catch (O) {}
  }, I2 = Object.getOwnPropertyDescriptor;
  if (I2)
    try {
      I2({}, "");
    } catch (L) {
      I2 = null;
    }
  var s = function() {
    throw new c2;
  }, e = I2 ? function() {
    try {
      return arguments.callee, s;
    } catch (L) {
      try {
        return I2(arguments, "callee").get;
      } catch (O) {
        return s;
      }
    }
  }() : s, E4 = Gt()(), g2 = Zt()(), h = Object.getPrototypeOf || (g2 ? function(L) {
    return L.__proto__;
  } : null), Y = {}, N2 = typeof Uint8Array === "undefined" || !h ? i : h(Uint8Array), x = { "%AggregateError%": typeof AggregateError === "undefined" ? i : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? i : ArrayBuffer, "%ArrayIteratorPrototype%": E4 && h ? h([][Symbol.iterator]()) : i, "%AsyncFromSyncIteratorPrototype%": i, "%AsyncFunction%": Y, "%AsyncGenerator%": Y, "%AsyncGeneratorFunction%": Y, "%AsyncIteratorPrototype%": Y, "%Atomics%": typeof Atomics === "undefined" ? i : Atomics, "%BigInt%": typeof BigInt === "undefined" ? i : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? i : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? i : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? i : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? i : FinalizationRegistry, "%Function%": m2, "%GeneratorFunction%": Y, "%Int8Array%": typeof Int8Array === "undefined" ? i : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? i : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": E4 && h ? h(h([][Symbol.iterator]())) : i, "%JSON%": typeof JSON === "object" ? JSON : i, "%Map%": typeof Map === "undefined" ? i : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !E4 || !h ? i : h(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? i : Promise, "%Proxy%": typeof Proxy === "undefined" ? i : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? i : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? i : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !E4 || !h ? i : h(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": E4 && h ? h(""[Symbol.iterator]()) : i, "%Symbol%": E4 ? Symbol : i, "%SyntaxError%": r, "%ThrowTypeError%": e, "%TypedArray%": N2, "%TypeError%": c2, "%Uint8Array%": typeof Uint8Array === "undefined" ? i : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? i : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? i : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? i : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? i : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? i : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? i : WeakSet };
  if (h)
    try {
      null.error;
    } catch (L) {
      v = h(h(L)), x["%Error.prototype%"] = v;
    }
  var v, j = function L(O) {
    var M2;
    if (O === "%AsyncFunction%")
      M2 = u("async function () {}");
    else if (O === "%GeneratorFunction%")
      M2 = u("function* () {}");
    else if (O === "%AsyncGeneratorFunction%")
      M2 = u("async function* () {}");
    else if (O === "%AsyncGenerator%") {
      var W2 = L("%AsyncGeneratorFunction%");
      if (W2)
        M2 = W2.prototype;
    } else if (O === "%AsyncIteratorPrototype%") {
      var l = L("%AsyncGenerator%");
      if (l && h)
        M2 = h(l.prototype);
    }
    return x[O] = M2, M2;
  }, S = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, A2 = vt(), T4 = at(), d = A2.call(Function.call, Array.prototype.concat), R = A2.call(Function.apply, Array.prototype.splice), P = A2.call(Function.call, String.prototype.replace), H2 = A2.call(Function.call, String.prototype.slice), U = A2.call(Function.call, RegExp.prototype.exec), a = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, G2 = /\\(\\)?/g, rt = function L(O) {
    var M2 = H2(O, 0, 1), W2 = H2(O, -1);
    if (M2 === "%" && W2 !== "%")
      throw new r("invalid intrinsic syntax, expected closing `%`");
    else if (W2 === "%" && M2 !== "%")
      throw new r("invalid intrinsic syntax, expected opening `%`");
    var l = [];
    return P(O, a, function(D, C, k, p) {
      l[l.length] = k ? P(p, G2, "$1") : C || D;
    }), l;
  }, X2 = function L(O, M2) {
    var W2 = O, l;
    if (T4(S, W2))
      l = S[W2], W2 = "%" + l[0] + "%";
    if (T4(x, W2)) {
      var D = x[W2];
      if (D === Y)
        D = j(W2);
      if (typeof D === "undefined" && !M2)
        throw new c2("intrinsic " + O + " exists, but is not available. Please file an issue!");
      return { alias: l, name: W2, value: D };
    }
    throw new r("intrinsic " + O + " does not exist!");
  };
  t.exports = function L(O, M2) {
    if (typeof O !== "string" || O.length === 0)
      throw new c2("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof M2 !== "boolean")
      throw new c2('"allowMissing" argument must be a boolean');
    if (U(/^%?[^%]*%?$/, O) === null)
      throw new r("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var W2 = rt(O), l = W2.length > 0 ? W2[0] : "", D = X2("%" + l + "%", M2), C = D.name, k = D.value, p = false, f2 = D.alias;
    if (f2)
      l = f2[0], R(W2, d([0, 1], f2));
    for (var V = 1, Z = true;V < W2.length; V += 1) {
      var o = W2[V], z = H2(o, 0, 1), nt = H2(o, -1);
      if ((z === '"' || z === "'" || z === "`" || (nt === '"' || nt === "'" || nt === "`")) && z !== nt)
        throw new r("property names with quotes must have matching quotes");
      if (o === "constructor" || !Z)
        p = true;
      if (l += "." + o, C = "%" + l + "%", T4(x, C))
        k = x[C];
      else if (k != null) {
        if (!(o in k)) {
          if (!M2)
            throw new c2("base intrinsic for " + O + " exists, but the property is not available.");
          return;
        }
        if (I2 && V + 1 >= W2.length) {
          var _ = I2(k, o);
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
var Ft = b((n, t) => {
  var i = pn(), r = i("%Object.getOwnPropertyDescriptor%", true);
  if (r)
    try {
      r([], "length");
    } catch (m2) {
      r = null;
    }
  t.exports = r;
});
var Dn = b((n, t) => {
  var i = At(), r = Ut(), m2 = $t(), c2 = Ft();
  t.exports = function u(I2, s, e) {
    if (!I2 || typeof I2 !== "object" && typeof I2 !== "function")
      throw new m2("`obj` must be an object or a function`");
    if (typeof s !== "string" && typeof s !== "symbol")
      throw new m2("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null)
      throw new m2("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null)
      throw new m2("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null)
      throw new m2("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean")
      throw new m2("`loose`, if provided, must be a boolean");
    var E4 = arguments.length > 3 ? arguments[3] : null, g2 = arguments.length > 4 ? arguments[4] : null, h = arguments.length > 5 ? arguments[5] : null, Y = arguments.length > 6 ? arguments[6] : false, N2 = !!c2 && c2(I2, s);
    if (i)
      i(I2, s, { configurable: h === null && N2 ? N2.configurable : !h, enumerable: E4 === null && N2 ? N2.enumerable : !E4, value: e, writable: g2 === null && N2 ? N2.writable : !g2 });
    else if (Y || !E4 && !g2 && !h)
      I2[s] = e;
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
    } catch (c2) {
      return true;
    }
  }, t.exports = r;
});
var Wn = b((n, t) => {
  var i = Pt(), r = Dn(), m2 = on()(), c2 = Ft(), u = $t(), I2 = i("%Math.floor%");
  t.exports = function s(e, E4) {
    if (typeof e !== "function")
      throw new u("`fn` is not a function");
    if (typeof E4 !== "number" || E4 < 0 || E4 > 4294967295 || I2(E4) !== E4)
      throw new u("`length` must be a positive 32-bit integer");
    var g2 = arguments.length > 2 && !!arguments[2], h = true, Y = true;
    if ("length" in e && c2) {
      var N2 = c2(e, "length");
      if (N2 && !N2.configurable)
        h = false;
      if (N2 && !N2.writable)
        Y = false;
    }
    if (h || Y || !g2)
      if (m2)
        r(e, "length", E4, true, true);
      else
        r(e, "length", E4);
    return e;
  };
});
var Bt = b((n, t) => {
  var i = vt(), r = Pt(), m2 = Wn(), c2 = $t(), u = r("%Function.prototype.apply%"), I2 = r("%Function.prototype.call%"), s = r("%Reflect.apply%", true) || i.call(I2, u), e = At(), E4 = r("%Math.max%");
  t.exports = function h(Y) {
    if (typeof Y !== "function")
      throw new c2("a function is required");
    var N2 = s(i, I2, arguments);
    return m2(N2, 1 + E4(0, Y.length - (arguments.length - 1)), true);
  };
  var g2 = function h() {
    return s(i, u, arguments);
  };
  if (e)
    e(t.exports, "apply", { value: g2 });
  else
    t.exports.apply = g2;
});
var Ln = b((n, t) => {
  var i = Pt(), r = Bt(), m2 = r(i("String.prototype.indexOf"));
  t.exports = function c(u, I2) {
    var s = i(u, !!I2);
    if (typeof s === "function" && m2(u, ".prototype.") > -1)
      return r(s);
    return s;
  };
});
var Mn = b((n, t) => {
  var i = (typeof JSON !== "undefined" ? JSON : $n()).stringify, r = Pn(), m2 = Tn(), c2 = Bt(), u = Ln(), I2 = u("Array.prototype.join"), s = u("Array.prototype.push"), e = function g(h, Y) {
    var N2 = "";
    for (var x = 0;x < h; x += 1)
      N2 += Y;
    return N2;
  }, E4 = function(g2, h, Y) {
    return Y;
  };
  t.exports = function g(h) {
    var Y = arguments.length > 1 ? arguments[1] : undefined, N2 = Y && Y.space || "";
    if (typeof N2 === "number")
      N2 = e(N2, " ");
    var x = !!Y && typeof Y.cycles === "boolean" && Y.cycles, v = Y && Y.replacer ? c2(Y.replacer) : E4, j = typeof Y === "function" ? Y : Y && Y.cmp, S = j && function(T4) {
      var d = j.length > 2 && function R(P) {
        return T4[P];
      };
      return function(R, P) {
        return j({ key: R, value: T4[R] }, { key: P, value: T4[P] }, d ? { __proto__: null, get: d } : undefined);
      };
    }, A2 = [];
    return function T(d, R, P, H2) {
      var U = N2 ? `
` + e(H2, N2) : "", a = N2 ? ": " : ":";
      if (P && P.toJSON && typeof P.toJSON === "function")
        P = P.toJSON();
      if (P = v(d, R, P), P === undefined)
        return;
      if (typeof P !== "object" || P === null)
        return i(P);
      if (r(P)) {
        var L = [];
        for (var G2 = 0;G2 < P.length; G2++) {
          var rt = T(P, G2, P[G2], H2 + 1) || i(null);
          s(L, U + N2 + rt);
        }
        return "[" + I2(L, ",") + U + "]";
      }
      if (A2.indexOf(P) !== -1) {
        if (x)
          return i("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        s(A2, P);
      var X2 = m2(P).sort(S && S(P)), L = [];
      for (var G2 = 0;G2 < X2.length; G2++) {
        var R = X2[G2], O = T(P, R, P[R], H2 + 1);
        if (!O)
          continue;
        var M2 = i(R) + a + O;
        s(L, U + N2 + M2);
      }
      return A2.splice(A2.indexOf(P), 1), "{" + I2(L, ",") + U + "}";
    }({ "": h }, "", h, 0);
  };
});
var pt = xn(Mn(), 1);
var Dt = function(n, t, i, r) {
  let m2, c2, u, I2 = t || [0], s = (i = i || 0) >>> 3, e = r === -1 ? 3 : 0;
  for (m2 = 0;m2 < n.length; m2 += 1)
    u = m2 + s, c2 = u >>> 2, I2.length <= c2 && I2.push(0), I2[c2] |= n[m2] << 8 * (e + r * (u % 4));
  return { value: I2, binLen: 8 * n.length + i };
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
      return function(r, m2, c2) {
        return function(u, I2, s, e) {
          let E4, g2, h, Y;
          if (u.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          let N2 = I2 || [0], x = (s = s || 0) >>> 3, v = e === -1 ? 3 : 0;
          for (E4 = 0;E4 < u.length; E4 += 2) {
            if (g2 = parseInt(u.substr(E4, 2), 16), isNaN(g2))
              throw new Error("String of HEX type contains invalid characters");
            for (Y = (E4 >>> 1) + x, h = Y >>> 2;N2.length <= h; )
              N2.push(0);
            N2[h] |= g2 << 8 * (v + e * (Y % 4));
          }
          return { value: N2, binLen: 4 * u.length + s };
        }(r, m2, c2, i);
      };
    case "TEXT":
      return function(r, m2, c2) {
        return function(u, I2, s, e, E4) {
          let g2, h, Y, N2, x, v, j, S, A2 = 0, T4 = s || [0], d = (e = e || 0) >>> 3;
          if (I2 === "UTF8")
            for (j = E4 === -1 ? 3 : 0, Y = 0;Y < u.length; Y += 1)
              for (g2 = u.charCodeAt(Y), h = [], 128 > g2 ? h.push(g2) : 2048 > g2 ? (h.push(192 | g2 >>> 6), h.push(128 | 63 & g2)) : 55296 > g2 || 57344 <= g2 ? h.push(224 | g2 >>> 12, 128 | g2 >>> 6 & 63, 128 | 63 & g2) : (Y += 1, g2 = 65536 + ((1023 & g2) << 10 | 1023 & u.charCodeAt(Y)), h.push(240 | g2 >>> 18, 128 | g2 >>> 12 & 63, 128 | g2 >>> 6 & 63, 128 | 63 & g2)), N2 = 0;N2 < h.length; N2 += 1) {
                for (v = A2 + d, x = v >>> 2;T4.length <= x; )
                  T4.push(0);
                T4[x] |= h[N2] << 8 * (j + E4 * (v % 4)), A2 += 1;
              }
          else
            for (j = E4 === -1 ? 2 : 0, S = I2 === "UTF16LE" && E4 !== 1 || I2 !== "UTF16LE" && E4 === 1, Y = 0;Y < u.length; Y += 1) {
              for (g2 = u.charCodeAt(Y), S === true && (N2 = 255 & g2, g2 = N2 << 8 | g2 >>> 8), v = A2 + d, x = v >>> 2;T4.length <= x; )
                T4.push(0);
              T4[x] |= g2 << 8 * (j + E4 * (v % 4)), A2 += 2;
            }
          return { value: T4, binLen: 8 * A2 + e };
        }(r, t, m2, c2, i);
      };
    case "B64":
      return function(r, m2, c2) {
        return function(u, I2, s, e) {
          let E4, g2, h, Y, N2, x, v, j = 0, S = I2 || [0], A2 = (s = s || 0) >>> 3, T4 = e === -1 ? 3 : 0, d = u.indexOf("=");
          if (u.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (u = u.replace(/=/g, ""), d !== -1 && d < u.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (g2 = 0;g2 < u.length; g2 += 4) {
            for (N2 = u.substr(g2, 4), Y = 0, h = 0;h < N2.length; h += 1)
              E4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(N2.charAt(h)), Y |= E4 << 18 - 6 * h;
            for (h = 0;h < N2.length - 1; h += 1) {
              for (v = j + A2, x = v >>> 2;S.length <= x; )
                S.push(0);
              S[x] |= (Y >>> 16 - 8 * h & 255) << 8 * (T4 + e * (v % 4)), j += 1;
            }
          }
          return { value: S, binLen: 8 * j + s };
        }(r, m2, c2, i);
      };
    case "BYTES":
      return function(r, m2, c2) {
        return function(u, I2, s, e) {
          let E4, g2, h, Y, N2 = I2 || [0], x = (s = s || 0) >>> 3, v = e === -1 ? 3 : 0;
          for (g2 = 0;g2 < u.length; g2 += 1)
            E4 = u.charCodeAt(g2), Y = g2 + x, h = Y >>> 2, N2.length <= h && N2.push(0), N2[h] |= E4 << 8 * (v + e * (Y % 4));
          return { value: N2, binLen: 8 * u.length + s };
        }(r, m2, c2, i);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (r) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(r, m2, c2) {
        return function(u, I2, s, e) {
          return Dt(new Uint8Array(u), I2, s, e);
        }(r, m2, c2, i);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (r) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(r, m2, c2) {
        return Dt(r, m2, c2, i);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var ot = function(n, t, i, r) {
  switch (n) {
    case "HEX":
      return function(m2) {
        return function(c2, u, I2, s) {
          let e, E4, g2 = "", h = u / 8, Y = I2 === -1 ? 3 : 0;
          for (e = 0;e < h; e += 1)
            E4 = c2[e >>> 2] >>> 8 * (Y + I2 * (e % 4)), g2 += "0123456789abcdef".charAt(E4 >>> 4 & 15) + "0123456789abcdef".charAt(15 & E4);
          return s.outputUpper ? g2.toUpperCase() : g2;
        }(m2, t, i, r);
      };
    case "B64":
      return function(m2) {
        return function(c2, u, I2, s) {
          let e, E4, g2, h, Y, N2 = "", x = u / 8, v = I2 === -1 ? 3 : 0;
          for (e = 0;e < x; e += 3)
            for (h = e + 1 < x ? c2[e + 1 >>> 2] : 0, Y = e + 2 < x ? c2[e + 2 >>> 2] : 0, g2 = (c2[e >>> 2] >>> 8 * (v + I2 * (e % 4)) & 255) << 16 | (h >>> 8 * (v + I2 * ((e + 1) % 4)) & 255) << 8 | Y >>> 8 * (v + I2 * ((e + 2) % 4)) & 255, E4 = 0;E4 < 4; E4 += 1)
              N2 += 8 * e + 6 * E4 <= u ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g2 >>> 6 * (3 - E4) & 63) : s.b64Pad;
          return N2;
        }(m2, t, i, r);
      };
    case "BYTES":
      return function(m2) {
        return function(c2, u, I2) {
          let s, e, E4 = "", g2 = u / 8, h = I2 === -1 ? 3 : 0;
          for (s = 0;s < g2; s += 1)
            e = c2[s >>> 2] >>> 8 * (h + I2 * (s % 4)) & 255, E4 += String.fromCharCode(e);
          return E4;
        }(m2, t, i);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (m2) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(m2) {
        return function(c2, u, I2) {
          let s, e = u / 8, E4 = new ArrayBuffer(e), g2 = new Uint8Array(E4), h = I2 === -1 ? 3 : 0;
          for (s = 0;s < e; s += 1)
            g2[s] = c2[s >>> 2] >>> 8 * (h + I2 * (s % 4)) & 255;
          return E4;
        }(m2, t, i);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (m2) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(m2) {
        return function(c2, u, I2) {
          let s, e = u / 8, E4 = I2 === -1 ? 3 : 0, g2 = new Uint8Array(e);
          for (s = 0;s < e; s += 1)
            g2[s] = c2[s >>> 2] >>> 8 * (E4 + I2 * (s % 4)) & 255;
          return g2;
        }(m2, t, i);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var jt = function(n, t) {
  let i, r, m2 = n.binLen >>> 3, c2 = t.binLen >>> 3, u = m2 << 3, I2 = 4 - m2 << 3;
  if (m2 % 4 != 0) {
    for (i = 0;i < c2; i += 4)
      r = m2 + i >>> 2, n.value[r] |= t.value[i >>> 2] << u, n.value.push(0), n.value[r + 1] |= t.value[i >>> 2] >>> I2;
    return (n.value.length << 2) - 4 >= c2 + m2 && n.value.pop(), { value: n.value, binLen: n.binLen + t.binLen };
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
  let m2 = n + " must include a value and format";
  if (!t) {
    if (!r)
      throw new Error(m2);
    return r;
  }
  if (t.value === undefined || !t.format)
    throw new Error(m2);
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
  let m2 = (65535 & n) + (65535 & t) + (65535 & i) + (65535 & r);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16) + (r >>> 16) + (m2 >>> 16)) << 16 | 65535 & m2;
};
var ut = function(n, t, i, r, m2) {
  let c2 = (65535 & n) + (65535 & t) + (65535 & i) + (65535 & r) + (65535 & m2);
  return (65535 & (n >>> 16) + (t >>> 16) + (i >>> 16) + (r >>> 16) + (m2 >>> 16) + (c2 >>> 16)) << 16 | 65535 & c2;
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
  let i, r, m2, c2, u, I2, s, e = [];
  for (i = t[0], r = t[1], m2 = t[2], c2 = t[3], u = t[4], s = 0;s < 80; s += 1)
    e[s] = s < 16 ? n[s] : mt(e[s - 3] ^ e[s - 8] ^ e[s - 14] ^ e[s - 16], 1), I2 = s < 20 ? ut(mt(i, 5), Xt(r, m2, c2), u, 1518500249, e[s]) : s < 40 ? ut(mt(i, 5), Lt(r, m2, c2), u, 1859775393, e[s]) : s < 60 ? ut(mt(i, 5), zt(r, m2, c2), u, 2400959708, e[s]) : ut(mt(i, 5), Lt(r, m2, c2), u, 3395469782, e[s]), u = c2, c2 = m2, m2 = mt(r, 30), r = i, i = I2;
  return t[0] = K(i, t[0]), t[1] = K(r, t[1]), t[2] = K(m2, t[2]), t[3] = K(c2, t[3]), t[4] = K(u, t[4]), t;
};
var Vn = function(n, t, i, r) {
  let m2, c2 = 15 + (t + 65 >>> 9 << 4), u = t + i;
  for (;n.length <= c2; )
    n.push(0);
  for (n[t >>> 5] |= 128 << 24 - t % 32, n[c2] = 4294967295 & u, n[c2 - 1] = u / st | 0, m2 = 0;m2 < n.length; m2 += 16)
    r = _t(n.slice(m2, m2 + 16), r);
  return r;
};
var Mt = function(n) {
  let t;
  return t = n == "SHA-224" ? q.slice() : tt.slice(), t;
};
var ft = function(n, t) {
  let i, r, m2, c2, u, I2, s, e, E4, g2, h, Y = [];
  for (i = t[0], r = t[1], m2 = t[2], c2 = t[3], u = t[4], I2 = t[5], s = t[6], e = t[7], h = 0;h < 64; h += 1)
    Y[h] = h < 16 ? n[h] : Hn(B(N2 = Y[h - 2], 17) ^ B(N2, 19) ^ Qt(N2, 10), Y[h - 7], ln(Y[h - 15]), Y[h - 16]), E4 = ut(e, yn(u), Xt(u, I2, s), $2[h], Y[h]), g2 = K(fn(i), zt(i, r, m2)), e = s, s = I2, I2 = u, u = K(c2, E4), c2 = m2, m2 = r, r = i, i = K(E4, g2);
  var N2;
  return t[0] = K(i, t[0]), t[1] = K(r, t[1]), t[2] = K(m2, t[2]), t[3] = K(c2, t[3]), t[4] = K(u, t[4]), t[5] = K(I2, t[5]), t[6] = K(s, t[6]), t[7] = K(e, t[7]), t;
};
var Ht = function(n, t) {
  let i;
  return t > 32 ? (i = 64 - t, new w2(n.I << t | n.N >>> i, n.N << t | n.I >>> i)) : t !== 0 ? (i = 32 - t, new w2(n.N << t | n.I >>> i, n.I << t | n.N >>> i)) : n;
};
var Q = function(n, t) {
  let i;
  return t < 32 ? (i = 32 - t, new w2(n.N >>> t | n.I << i, n.I >>> t | n.N << i)) : (i = 64 - t, new w2(n.I >>> t | n.N << i, n.N >>> t | n.I << i));
};
var Jt = function(n, t) {
  return new w2(n.N >>> t, n.I >>> t | n.N << 32 - t);
};
var Un = function(n, t, i) {
  return new w2(n.N & t.N ^ n.N & i.N ^ t.N & i.N, n.I & t.I ^ n.I & i.I ^ t.I & i.I);
};
var Gn = function(n) {
  let t = Q(n, 28), i = Q(n, 34), r = Q(n, 39);
  return new w2(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var F = function(n, t) {
  let i, r;
  i = (65535 & n.I) + (65535 & t.I), r = (n.I >>> 16) + (t.I >>> 16) + (i >>> 16);
  let m2 = (65535 & r) << 16 | 65535 & i;
  return i = (65535 & n.N) + (65535 & t.N) + (r >>> 16), r = (n.N >>> 16) + (t.N >>> 16) + (i >>> 16), new w2((65535 & r) << 16 | 65535 & i, m2);
};
var Zn = function(n, t, i, r) {
  let m2, c2;
  m2 = (65535 & n.I) + (65535 & t.I) + (65535 & i.I) + (65535 & r.I), c2 = (n.I >>> 16) + (t.I >>> 16) + (i.I >>> 16) + (r.I >>> 16) + (m2 >>> 16);
  let u = (65535 & c2) << 16 | 65535 & m2;
  return m2 = (65535 & n.N) + (65535 & t.N) + (65535 & i.N) + (65535 & r.N) + (c2 >>> 16), c2 = (n.N >>> 16) + (t.N >>> 16) + (i.N >>> 16) + (r.N >>> 16) + (m2 >>> 16), new w2((65535 & c2) << 16 | 65535 & m2, u);
};
var an = function(n, t, i, r, m2) {
  let c2, u;
  c2 = (65535 & n.I) + (65535 & t.I) + (65535 & i.I) + (65535 & r.I) + (65535 & m2.I), u = (n.I >>> 16) + (t.I >>> 16) + (i.I >>> 16) + (r.I >>> 16) + (m2.I >>> 16) + (c2 >>> 16);
  let I2 = (65535 & u) << 16 | 65535 & c2;
  return c2 = (65535 & n.N) + (65535 & t.N) + (65535 & i.N) + (65535 & r.N) + (65535 & m2.N) + (u >>> 16), u = (n.N >>> 16) + (t.N >>> 16) + (i.N >>> 16) + (r.N >>> 16) + (m2.N >>> 16) + (c2 >>> 16), new w2((65535 & u) << 16 | 65535 & c2, I2);
};
var gt = function(n, t) {
  return new w2(n.N ^ t.N, n.I ^ t.I);
};
var Fn = function(n) {
  let t = Q(n, 19), i = Q(n, 61), r = Jt(n, 6);
  return new w2(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var Bn = function(n) {
  let t = Q(n, 1), i = Q(n, 8), r = Jt(n, 7);
  return new w2(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var Qn = function(n) {
  let t = Q(n, 14), i = Q(n, 18), r = Q(n, 41);
  return new w2(t.N ^ i.N ^ r.N, t.I ^ i.I ^ r.I);
};
var lt = function(n) {
  return n === "SHA-384" ? [new w2(3418070365, q[0]), new w2(1654270250, q[1]), new w2(2438529370, q[2]), new w2(355462360, q[3]), new w2(1731405415, q[4]), new w2(41048885895, q[5]), new w2(3675008525, q[6]), new w2(1203062813, q[7])] : [new w2(tt[0], 4089235720), new w2(tt[1], 2227873595), new w2(tt[2], 4271175723), new w2(tt[3], 1595750129), new w2(tt[4], 2917565137), new w2(tt[5], 725511199), new w2(tt[6], 4215389547), new w2(tt[7], 327033209)];
};
var yt = function(n, t) {
  let i, r, m2, c2, u, I2, s, e, E4, g2, h, Y, N2 = [];
  for (i = t[0], r = t[1], m2 = t[2], c2 = t[3], u = t[4], I2 = t[5], s = t[6], e = t[7], h = 0;h < 80; h += 1)
    h < 16 ? (Y = 2 * h, N2[h] = new w2(n[Y], n[Y + 1])) : N2[h] = Zn(Fn(N2[h - 2]), N2[h - 7], Bn(N2[h - 15]), N2[h - 16]), E4 = an(e, Qn(u), (v = I2, j = s, new w2((x = u).N & v.N ^ ~x.N & j.N, x.I & v.I ^ ~x.I & j.I)), Jn[h], N2[h]), g2 = F(Gn(i), Un(i, r, m2)), e = s, s = I2, I2 = u, u = F(c2, E4), c2 = m2, m2 = r, r = i, i = F(E4, g2);
  var x, v, j;
  return t[0] = F(i, t[0]), t[1] = F(r, t[1]), t[2] = F(m2, t[2]), t[3] = F(c2, t[3]), t[4] = F(u, t[4]), t[5] = F(I2, t[5]), t[6] = F(s, t[6]), t[7] = F(e, t[7]), t;
};
var Tt = function(n) {
  let t, i = [];
  for (t = 0;t < 5; t += 1)
    i[t] = [new w2(0, 0), new w2(0, 0), new w2(0, 0), new w2(0, 0), new w2(0, 0)];
  return i;
};
var Xn = function(n) {
  let t, i = [];
  for (t = 0;t < 5; t += 1)
    i[t] = n[t].slice();
  return i;
};
var Nt = function(n, t) {
  let i, r, m2, c2, u = [], I2 = [];
  if (n !== null)
    for (r = 0;r < n.length; r += 2)
      t[(r >>> 1) % 5][(r >>> 1) / 5 | 0] = gt(t[(r >>> 1) % 5][(r >>> 1) / 5 | 0], new w2(n[r + 1], n[r]));
  for (i = 0;i < 24; i += 1) {
    for (c2 = Tt(), r = 0;r < 5; r += 1)
      u[r] = (s = t[r][0], e = t[r][1], E4 = t[r][2], g2 = t[r][3], h = t[r][4], new w2(s.N ^ e.N ^ E4.N ^ g2.N ^ h.N, s.I ^ e.I ^ E4.I ^ g2.I ^ h.I));
    for (r = 0;r < 5; r += 1)
      I2[r] = gt(u[(r + 4) % 5], Ht(u[(r + 1) % 5], 1));
    for (r = 0;r < 5; r += 1)
      for (m2 = 0;m2 < 5; m2 += 1)
        t[r][m2] = gt(t[r][m2], I2[r]);
    for (r = 0;r < 5; r += 1)
      for (m2 = 0;m2 < 5; m2 += 1)
        c2[m2][(2 * r + 3 * m2) % 5] = Ht(t[r][m2], ni[r][m2]);
    for (r = 0;r < 5; r += 1)
      for (m2 = 0;m2 < 5; m2 += 1)
        t[r][m2] = gt(c2[r][m2], new w2(~c2[(r + 1) % 5][m2].N & c2[(r + 2) % 5][m2].N, ~c2[(r + 1) % 5][m2].I & c2[(r + 2) % 5][m2].I));
    t[0][0] = gt(t[0][0], ti[i]);
  }
  var s, e, E4, g2, h;
  return t;
};
var qt = function(n) {
  let t, i, r = 0, m2 = [0, 0], c2 = [4294967295 & n, n / st & 2097151];
  for (t = 6;t >= 0; t--)
    i = c2[t >> 2] >>> 8 * t & 255, i === 0 && r === 0 || (m2[r + 1 >> 2] |= i << 8 * (r + 1), r += 1);
  return r = r !== 0 ? r : 1, m2[0] |= r, { value: r + 1 > 4 ? m2 : [m2[0]], binLen: 8 + 8 * r };
};
var St = function(n) {
  return jt(qt(n.binLen), n);
};
var Kt = function(n, t) {
  let i, r = qt(t);
  r = jt(r, n);
  let m2 = t >>> 2, c2 = (m2 - r.value.length % m2) % m2;
  for (i = 0;i < c2; i++)
    r.value.push(0);
  return r.value;
};
var st = 4294967296;
var $2 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
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
    let t, i = 0, r = this.m >>> 5, m2 = this.C(n, this.h, this.u), c2 = m2.binLen, u = m2.value, I2 = c2 >>> 5;
    for (t = 0;t < I2; t += r)
      i + this.m <= c2 && (this.U = this.v(u.slice(t, t + r), this.U), i += this.m);
    return this.A += i, this.h = u.slice(i >>> 5), this.u = c2 % this.m, this.l = true, this;
  }
  getHash(n, t) {
    let i, r, m2 = this.R, c2 = Wt(t);
    if (this.K) {
      if (c2.outputLen === -1)
        throw new Error("Output length must be specified in options");
      m2 = c2.outputLen;
    }
    let u = ot(n, m2, this.T, c2);
    if (this.H && this.g)
      return u(this.g(c2));
    for (r = this.F(this.h.slice(), this.u, this.A, this.L(this.U), m2), i = 1;i < this.numRounds; i += 1)
      this.K && m2 % 32 != 0 && (r[r.length - 1] &= 16777215 >>> 24 - m2 % 32), r = this.F(r, m2, 0, this.B(this.o), m2);
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
    this.M = true, this.g = this.Y, this.T = -1, this.C = ht(this.t, this.i, this.T), this.v = _t, this.L = function(m2) {
      return m2.slice();
    }, this.B = Kn, this.F = Vn, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, r.hmacKey && this.k(it("hmacKey", r.hmacKey, this.T));
  }
};
var _n = class extends et {
  constructor(n, t, i) {
    if (n !== "SHA-224" && n !== "SHA-256")
      throw new Error(wt);
    super(n, t, i);
    let r = i || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = ht(this.t, this.i, this.T), this.v = ft, this.L = function(m2) {
      return m2.slice();
    }, this.B = Mt, this.F = function(m2, c2, u, I2) {
      return function(s, e, E4, g2, h) {
        let Y, N2, x = 15 + (e + 65 >>> 9 << 4), v = e + E4;
        for (;s.length <= x; )
          s.push(0);
        for (s[e >>> 5] |= 128 << 24 - e % 32, s[x] = 4294967295 & v, s[x - 1] = v / st | 0, Y = 0;Y < s.length; Y += 16)
          g2 = ft(s.slice(Y, Y + 16), g2);
        return N2 = h === "SHA-224" ? [g2[0], g2[1], g2[2], g2[3], g2[4], g2[5], g2[6]] : g2, N2;
      }(m2, c2, u, I2, n);
    }, this.U = Mt(n), this.m = 512, this.R = n === "SHA-224" ? 224 : 256, this.K = false, r.hmacKey && this.k(it("hmacKey", r.hmacKey, this.T));
  }
};

class w2 {
  constructor(n, t) {
    this.N = n, this.I = t;
  }
}
var Jn = [new w2($2[0], 3609767458), new w2($2[1], 602891725), new w2($2[2], 3964484399), new w2($2[3], 2173295548), new w2($2[4], 4081628472), new w2($2[5], 3053834265), new w2($2[6], 2937671579), new w2($2[7], 3664609560), new w2($2[8], 2734883394), new w2($2[9], 1164996542), new w2($2[10], 1323610764), new w2($2[11], 3590304994), new w2($2[12], 4068182383), new w2($2[13], 991336113), new w2($2[14], 633803317), new w2($2[15], 3479774868), new w2($2[16], 2666613458), new w2($2[17], 944711139), new w2($2[18], 2341262773), new w2($2[19], 2007800933), new w2($2[20], 1495990901), new w2($2[21], 1856431235), new w2($2[22], 3175218132), new w2($2[23], 2198950837), new w2($2[24], 3999719339), new w2($2[25], 766784016), new w2($2[26], 2566594879), new w2($2[27], 3203337956), new w2($2[28], 1034457026), new w2($2[29], 2466948901), new w2($2[30], 3758326383), new w2($2[31], 168717936), new w2($2[32], 1188179964), new w2($2[33], 1546045734), new w2($2[34], 1522805485), new w2($2[35], 2643833823), new w2($2[36], 2343527390), new w2($2[37], 1014477480), new w2($2[38], 1206759142), new w2($2[39], 344077627), new w2($2[40], 1290863460), new w2($2[41], 3158454273), new w2($2[42], 3505952657), new w2($2[43], 106217008), new w2($2[44], 3606008344), new w2($2[45], 1432725776), new w2($2[46], 1467031594), new w2($2[47], 851169720), new w2($2[48], 3100823752), new w2($2[49], 1363258195), new w2($2[50], 3750685593), new w2($2[51], 3785050280), new w2($2[52], 3318307427), new w2($2[53], 3812723403), new w2($2[54], 2003034995), new w2($2[55], 3602036899), new w2($2[56], 1575990012), new w2($2[57], 1125592928), new w2($2[58], 2716904306), new w2($2[59], 442776044), new w2($2[60], 593698344), new w2($2[61], 3733110249), new w2($2[62], 2999351573), new w2($2[63], 3815920427), new w2(3391569614, 3928383900), new w2(3515267271, 566280711), new w2(3940187606, 3454069534), new w2(4118630271, 4000239992), new w2(116418474, 1914138554), new w2(174292421, 2731055270), new w2(289380356, 3203993006), new w2(460393269, 320620315), new w2(685471733, 587496836), new w2(852142971, 1086792851), new w2(1017036298, 365543100), new w2(1126000580, 2618297676), new w2(1288033470, 3409855158), new w2(1501505948, 4234509866), new w2(1607167915, 987167468), new w2(1816402316, 1246189591)];
var qn = class extends et {
  constructor(n, t, i) {
    if (n !== "SHA-384" && n !== "SHA-512")
      throw new Error(wt);
    super(n, t, i);
    let r = i || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = ht(this.t, this.i, this.T), this.v = yt, this.L = function(m2) {
      return m2.slice();
    }, this.B = lt, this.F = function(m2, c2, u, I2) {
      return function(s, e, E4, g2, h) {
        let Y, N2, x = 31 + (e + 129 >>> 10 << 5), v = e + E4;
        for (;s.length <= x; )
          s.push(0);
        for (s[e >>> 5] |= 128 << 24 - e % 32, s[x] = 4294967295 & v, s[x - 1] = v / st | 0, Y = 0;Y < s.length; Y += 32)
          g2 = yt(s.slice(Y, Y + 32), g2);
        return N2 = h === "SHA-384" ? [g2[0].N, g2[0].I, g2[1].N, g2[1].I, g2[2].N, g2[2].I, g2[3].N, g2[3].I, g2[4].N, g2[4].I, g2[5].N, g2[5].I] : [g2[0].N, g2[0].I, g2[1].N, g2[1].I, g2[2].N, g2[2].I, g2[3].N, g2[3].I, g2[4].N, g2[4].I, g2[5].N, g2[5].I, g2[6].N, g2[6].I, g2[7].N, g2[7].I], N2;
      }(m2, c2, u, I2, n);
    }, this.U = lt(n), this.m = 1024, this.R = n === "SHA-384" ? 384 : 512, this.K = false, r.hmacKey && this.k(it("hmacKey", r.hmacKey, this.T));
  }
};
var ti = [new w2(0, 1), new w2(0, 32898), new w2(2147483648, 32906), new w2(2147483648, 2147516416), new w2(0, 32907), new w2(0, 2147483649), new w2(2147483648, 2147516545), new w2(2147483648, 32777), new w2(0, 138), new w2(0, 136), new w2(0, 2147516425), new w2(0, 2147483658), new w2(0, 2147516555), new w2(2147483648, 139), new w2(2147483648, 32905), new w2(2147483648, 32771), new w2(2147483648, 32770), new w2(2147483648, 128), new w2(0, 32778), new w2(2147483648, 2147483658), new w2(2147483648, 2147516545), new w2(2147483648, 32896), new w2(0, 2147483649), new w2(2147483648, 2147516424)];
var ni = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var ii = class extends et {
  constructor(n, t, i) {
    let r = 6, m2 = 0;
    super(n, t, i);
    let c2 = i || {};
    if (this.numRounds !== 1) {
      if (c2.kmacKey || c2.hmacKey)
        throw new Error(tn);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = ht(this.t, this.i, this.T), this.v = Nt, this.L = Xn, this.B = Tt, this.U = Tt(), this.K = false, n) {
      case "SHA3-224":
        this.m = m2 = 1152, this.R = 224, this.M = true, this.g = this.Y;
        break;
      case "SHA3-256":
        this.m = m2 = 1088, this.R = 256, this.M = true, this.g = this.Y;
        break;
      case "SHA3-384":
        this.m = m2 = 832, this.R = 384, this.M = true, this.g = this.Y;
        break;
      case "SHA3-512":
        this.m = m2 = 576, this.R = 512, this.M = true, this.g = this.Y;
        break;
      case "SHAKE128":
        r = 31, this.m = m2 = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "SHAKE256":
        r = 31, this.m = m2 = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "KMAC128":
        r = 4, this.m = m2 = 1344, this.X(i), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "KMAC256":
        r = 4, this.m = m2 = 1088, this.X(i), this.R = -1, this.K = true, this.M = false, this.g = this._;
        break;
      case "CSHAKE128":
        this.m = m2 = 1344, r = this.O(i), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      case "CSHAKE256":
        this.m = m2 = 1088, r = this.O(i), this.R = -1, this.K = true, this.M = false, this.g = null;
        break;
      default:
        throw new Error(wt);
    }
    this.F = function(u, I2, s, e, E4) {
      return function(g2, h, Y, N2, x, v, j) {
        let S, A2, T4 = 0, d = [], R = x >>> 5, P = h >>> 5;
        for (S = 0;S < P && h >= x; S += R)
          N2 = Nt(g2.slice(S, S + R), N2), h -= x;
        for (g2 = g2.slice(S), h %= x;g2.length < R; )
          g2.push(0);
        for (S = h >>> 3, g2[S >> 2] ^= v << S % 4 * 8, g2[R - 1] ^= 2147483648, N2 = Nt(g2, N2);32 * d.length < j && (A2 = N2[T4 % 5][T4 / 5 | 0], d.push(A2.I), !(32 * d.length >= j)); )
          d.push(A2.N), T4 += 1, 64 * T4 % x == 0 && (Nt(null, N2), T4 = 0);
        return d;
      }(u, I2, 0, e, m2, r, E4);
    }, c2.hmacKey && this.k(it("hmacKey", c2.hmacKey, this.T));
  }
  O(n, t) {
    let i = function(m2) {
      let c2 = m2 || {};
      return { funcName: it("funcName", c2.funcName, 1, { value: [], binLen: 0 }), customization: it("Customization", c2.customization, 1, { value: [], binLen: 0 }) };
    }(n || {});
    t && (i.funcName = t);
    let r = jt(St(i.funcName), St(i.customization));
    if (i.customization.binLen !== 0 || i.funcName.binLen !== 0) {
      let m2 = Kt(r, this.m >>> 3);
      for (let c2 = 0;c2 < m2.length; c2 += this.m >>> 5)
        this.U = this.v(m2.slice(c2, c2 + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(n) {
    let t = function(r) {
      let m2 = r || {};
      return { kmacKey: it("kmacKey", m2.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: it("Customization", m2.customization, 1, { value: [], binLen: 0 }) };
    }(n || {});
    this.O(n, t.funcName);
    let i = Kt(St(t.kmacKey), this.m >>> 3);
    for (let r = 0;r < i.length; r += this.m >>> 5)
      this.U = this.v(i.slice(r, r + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(n) {
    let t = jt({ value: this.h.slice(), binLen: this.u }, function(i) {
      let r, m2, c2 = 0, u = [0, 0], I2 = [4294967295 & i, i / st & 2097151];
      for (r = 6;r >= 0; r--)
        m2 = I2[r >> 2] >>> 8 * r & 255, m2 === 0 && c2 === 0 || (u[c2 >> 2] |= m2 << 8 * c2, c2 += 1);
      return c2 = c2 !== 0 ? c2 : 1, u[c2 >> 2] |= c2 << 8 * c2, { value: c2 + 1 > 4 ? u : [u[0]], binLen: 8 + 8 * c2 };
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
  let r = pt.default({ ...n, signature: undefined }), m2 = t.noTimeWindow ? 0 : Math.floor(Date.now() / (t.timeWindow ?? hn)) + i;
  return new nn("SHA-256", "TEXT", { encoding: "UTF8" }).update(r).update(pt.default(t)).update(`${m2}`).getHash("B64");
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
    let m2 = JSON.stringify(i ? rn(t, { secret: i }) : t), c2 = this.#t.encode(m2), u = new Uint32Array([c2.byteLength]);
    return this.data.push(u.buffer), this.data.push(c2.buffer), this;
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
    for (let m2 = 0;m2 < 16; ++m2)
      t[i + m2] = r[m2];
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
  let t = {}, i = {}, r = 0, m2;
  while (r < n.size) {
    m2 = m2 ?? await n.arrayBuffer();
    let [c2, u] = gi(m2, r);
    r = u;
    let [I2, s] = en(m2, r);
    switch (r = s, I2) {
      case 1:
        let [e, E4] = ui(m2, r);
        r = E4;
        try {
          t[c2] = JSON.parse(e);
        } catch (Y) {
          console.error(`Error parsing JSON for key "${c2}":`, Y);
        }
        break;
      case 2:
        let [g2, h] = si(m2, r);
        r = h, i[c2] = g2;
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
    n.forEach((r, m2) => {
      let c2 = gn(r, t);
      if (c2 !== n[m2]) {
        if (n === i)
          n = [...n];
        n[m2] = c2;
      }
    });
  else if (typeof n === "object" && n)
    Object.entries(n).forEach(([r, m2]) => {
      let c2 = gn(m2, t);
      if (c2 !== n[r]) {
        if (n === i)
          n = { ...n };
        n[r] = c2;
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
    n.forEach((r, m2) => {
      let c2 = un(r, t);
      if (c2 !== r) {
        if (n === i)
          n = [...n];
        n[m2] = c2;
      }
    });
  else if (typeof n === "object" && n)
    Object.entries(n).forEach(([r, m2]) => {
      let c2 = un(m2, t);
      if (c2 !== m2) {
        if (n === i)
          n = { ...n };
        n[r] = c2;
      }
    });
  return n;
}

// ../src/cycles/data-update/blob-utils.ts
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

// ../node_modules/napl/dist/index.js
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
  clearUpdates2(root, updatedPaths);
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
function clearUpdates2(root, updatedPaths) {
  root.updates = root.updates?.filter((update) => !(update.path in updatedPaths));
  if (!root.updates?.length) {
    delete root.updates;
  }
}
function sortUpdates3(updates) {
  updates?.sort((a, b2) => {
    const confirmedA = a.confirmed ?? 0;
    const confirmedB = b2.confirmed ?? 0;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    return a.path.localeCompare(b2.path);
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
var gt2 = Object.create;
var { defineProperty: Rn2, getPrototypeOf: Yt, getOwnPropertyNames: wt2 } = Object;
var Et = Object.prototype.hasOwnProperty;
var Nt2 = (t, n, h) => {
  h = t != null ? gt2(Yt(t)) : {};
  let c2 = n || !t || !t.__esModule ? Rn2(h, "default", { value: t, enumerable: true }) : h;
  for (let i of wt2(t))
    if (!Et.call(c2, i))
      Rn2(c2, i, { get: () => t[i], enumerable: true });
  return c2;
};
var R = (t, n) => () => (n || t((n = { exports: {} }).exports, n), n.exports);
var jt2 = R((t, n) => {
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
  }, w4 = function() {
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
      if (c2("["), w4(), m2 === "]")
        return c2("]"), S;
      while (m2) {
        if (S.push($4()), w4(), m2 === "]")
          return c2("]"), S;
        c2(","), w4();
      }
    }
    h("Bad array");
  }, j = function() {
    var S, T4 = {};
    if (m2 === "{") {
      if (c2("{"), w4(), m2 === "}")
        return c2("}"), T4;
      while (m2) {
        if (S = g2(), w4(), c2(":"), Object.prototype.hasOwnProperty.call(T4, S))
          h('Duplicate key "' + S + '"');
        if (T4[S] = $4(), w4(), m2 === "}")
          return c2("}"), T4;
        c2(","), w4();
      }
    }
    h("Bad object");
  }, $4 = function() {
    switch (w4(), m2) {
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
    if (P = S, Y = 0, m2 = " ", v = $4(), w4(), m2)
      h("Syntax error");
    return typeof T4 === "function" ? function x(O, C) {
      var D, b2, k = O[C];
      if (k && typeof k === "object") {
        for (D in $4)
          if (Object.prototype.hasOwnProperty.call(k, D))
            if (b2 = x(k, D), typeof b2 === "undefined")
              delete k[D];
            else
              k[D] = b2;
      }
      return T4.call(O, C, k);
    }({ "": v }, "") : v;
  };
});
var $t2 = R((t, n) => {
  var h = function(j) {
    return i.lastIndex = 0, i.test(j) ? '"' + j.replace(i, function($4) {
      var Y = I2[$4];
      return typeof Y === "string" ? Y : "\\u" + ("0000" + $4.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + j + '"';
  }, c2 = function(j, $4) {
    var Y, m2, s, P, S = g2, T4, v = $4[j];
    if (v && typeof v === "object" && typeof v.toJSON === "function")
      v = v.toJSON(j);
    if (typeof E4 === "function")
      v = E4.call($4, j, v);
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
        if (g2 += w4, T4 = [], Object.prototype.toString.apply(v) === "[object Array]") {
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
  }, i = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, g2, w4, I2 = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, E4;
  n.exports = function(j, $4, Y) {
    var m2;
    if (g2 = "", w4 = "", typeof Y === "number")
      for (m2 = 0;m2 < Y; m2 += 1)
        w4 += " ";
    else if (typeof Y === "string")
      w4 = Y;
    if (E4 = $4, $4 && typeof $4 !== "function" && (typeof $4 !== "object" || typeof $4.length !== "number"))
      throw new Error("JSON.stringify");
    return c2("", { "": j });
  };
});
var st2 = R((t) => {
  t.parse = jt2(), t.stringify = $t2();
});
var It = R((t, n) => {
  var h = {}.toString;
  n.exports = Array.isArray || function(c2) {
    return h.call(c2) == "[object Array]";
  };
});
var fn2 = R((t, n) => {
  var h = Object.prototype.toString;
  n.exports = function c(i) {
    var g2 = h.call(i), w4 = g2 === "[object Arguments]";
    if (!w4)
      w4 = g2 !== "[object Array]" && i !== null && typeof i === "object" && typeof i.length === "number" && i.length >= 0 && h.call(i.callee) === "[object Function]";
    return w4;
  };
});
var Pt2 = R((t, n) => {
  var h;
  if (!Object.keys)
    c2 = Object.prototype.hasOwnProperty, i = Object.prototype.toString, g2 = fn2(), w4 = Object.prototype.propertyIsEnumerable, I2 = !w4.call({ toString: null }, "toString"), E4 = w4.call(function() {}, "prototype"), j = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], $4 = function(P) {
      var S = P.constructor;
      return S && S.prototype === P;
    }, Y = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, m2 = function() {
      if (typeof window === "undefined")
        return false;
      for (var P in window)
        try {
          if (!Y["$" + P] && c2.call(window, P) && window[P] !== null && typeof window[P] === "object")
            try {
              $4(window[P]);
            } catch (S) {
              return true;
            }
        } catch (S) {
          return true;
        }
      return false;
    }(), s = function(P) {
      if (typeof window === "undefined" || !m2)
        return $4(P);
      try {
        return $4(P);
      } catch (S) {
        return false;
      }
    }, h = function P(S) {
      var T4 = S !== null && typeof S === "object", v = i.call(S) === "[object Function]", x = g2(S), O = T4 && i.call(S) === "[object String]", C = [];
      if (!T4 && !v && !x)
        throw new TypeError("Object.keys called on a non-object");
      var D = E4 && v;
      if (O && S.length > 0 && !c2.call(S, 0))
        for (var b2 = 0;b2 < S.length; ++b2)
          C.push(String(b2));
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
  var c2, i, g2, w4, I2, E4, j, $4, Y, m2, s;
  n.exports = h;
});
var St2 = R((t, n) => {
  var h = Array.prototype.slice, c2 = fn2(), i = Object.keys, g2 = i ? function I(E4) {
    return i(E4);
  } : Pt2(), w4 = Object.keys;
  g2.shim = function I() {
    if (Object.keys) {
      var E4 = function() {
        var j = Object.keys(arguments);
        return j && j.length === arguments.length;
      }(1, 2);
      if (!E4)
        Object.keys = function j($4) {
          if (c2($4))
            return w4(h.call($4));
          return w4($4);
        };
    } else
      Object.keys = g2;
    return Object.keys || g2;
  }, n.exports = g2;
});
var vt2 = R((t, n) => {
  var h = "Function.prototype.bind called on incompatible ", c2 = Object.prototype.toString, i = Math.max, g2 = "[object Function]", w4 = function j($4, Y) {
    var m2 = [];
    for (var s = 0;s < $4.length; s += 1)
      m2[s] = $4[s];
    for (var P = 0;P < Y.length; P += 1)
      m2[P + $4.length] = Y[P];
    return m2;
  }, I2 = function j($4, Y) {
    var m2 = [];
    for (var s = Y || 0, P = 0;s < $4.length; s += 1, P += 1)
      m2[P] = $4[s];
    return m2;
  }, E4 = function(j, $4) {
    var Y = "";
    for (var m2 = 0;m2 < j.length; m2 += 1)
      if (Y += j[m2], m2 + 1 < j.length)
        Y += $4;
    return Y;
  };
  n.exports = function j($4) {
    var Y = this;
    if (typeof Y !== "function" || c2.apply(Y) !== g2)
      throw new TypeError(h + Y);
    var m2 = I2(arguments, 1), s, P = function() {
      if (this instanceof s) {
        var O = Y.apply(this, w4(m2, arguments));
        if (Object(O) === O)
          return O;
        return this;
      }
      return Y.apply($4, w4(m2, arguments));
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
    var c2 = {}, i = Symbol("test"), g2 = Object(i);
    if (typeof i === "string")
      return false;
    if (Object.prototype.toString.call(i) !== "[object Symbol]")
      return false;
    if (Object.prototype.toString.call(g2) !== "[object Symbol]")
      return false;
    var w4 = 42;
    c2[i] = w4;
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
      if (E4.value !== w4 || E4.enumerable !== true)
        return false;
    }
    return true;
  };
});
var yn2 = R((t, n) => {
  var h = typeof Symbol !== "undefined" && Symbol, c2 = Ot2();
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
var on2 = R((t, n) => {
  var h = { foo: {} }, c2 = Object;
  n.exports = function i() {
    return { __proto__: h }.foo === h.foo && !({ __proto__: null } instanceof c2);
  };
});
var Gn2 = R((t, n) => {
  var h = Function.prototype.call, c2 = Object.prototype.hasOwnProperty, i = Tn2();
  n.exports = i.call(h, c2);
});
var kn2 = R((t, n) => {
  var h, c2 = Tt2(), i = At2(), g2 = kt2(), w4 = xt2(), I2 = Vn2(), E4 = An2(), j = Ct2(), $4 = Function, Y = function(M2) {
    try {
      return $4('"use strict"; return (' + M2 + ").constructor;")();
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
  }() : s, S = yn2()(), T4 = on2()(), v = Object.getPrototypeOf || (T4 ? function(M2) {
    return M2.__proto__;
  } : null), x = {}, O = typeof Uint8Array === "undefined" || !v ? h : v(Uint8Array), C = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? h : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? h : ArrayBuffer, "%ArrayIteratorPrototype%": S && v ? v([][Symbol.iterator]()) : h, "%AsyncFromSyncIteratorPrototype%": h, "%AsyncFunction%": x, "%AsyncGenerator%": x, "%AsyncGeneratorFunction%": x, "%AsyncIteratorPrototype%": x, "%Atomics%": typeof Atomics === "undefined" ? h : Atomics, "%BigInt%": typeof BigInt === "undefined" ? h : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? h : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? h : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? h : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": c2, "%eval%": eval, "%EvalError%": i, "%Float32Array%": typeof Float32Array === "undefined" ? h : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? h : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? h : FinalizationRegistry, "%Function%": $4, "%GeneratorFunction%": x, "%Int8Array%": typeof Int8Array === "undefined" ? h : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? h : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? h : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": S && v ? v(v([][Symbol.iterator]())) : h, "%JSON%": typeof JSON === "object" ? JSON : h, "%Map%": typeof Map === "undefined" ? h : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !S || !v ? h : v(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? h : Promise, "%Proxy%": typeof Proxy === "undefined" ? h : Proxy, "%RangeError%": g2, "%ReferenceError%": w4, "%Reflect%": typeof Reflect === "undefined" ? h : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? h : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !S || !v ? h : v(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? h : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": S && v ? v(""[Symbol.iterator]()) : h, "%Symbol%": S ? Symbol : h, "%SyntaxError%": I2, "%ThrowTypeError%": P, "%TypedArray%": O, "%TypeError%": E4, "%Uint8Array%": typeof Uint8Array === "undefined" ? h : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? h : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? h : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? h : Uint32Array, "%URIError%": j, "%WeakMap%": typeof WeakMap === "undefined" ? h : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? h : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? h : WeakSet };
  if (v)
    try {
      null.error;
    } catch (M2) {
      D = v(v(M2)), C["%Error.prototype%"] = D;
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
  }, k = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, f2 = Tn2(), G2 = Gn2(), U = f2.call(Function.call, Array.prototype.concat), l = f2.call(Function.apply, Array.prototype.splice), hn2 = f2.call(Function.call, String.prototype.replace), a = f2.call(Function.call, String.prototype.slice), K2 = f2.call(Function.call, RegExp.prototype.exec), W2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, d = /\\(\\)?/g, p = function M(r) {
    var u = a(r, 0, 1), L = a(r, -1);
    if (u === "%" && L !== "%")
      throw new I2("invalid intrinsic syntax, expected closing `%`");
    else if (L === "%" && u !== "%")
      throw new I2("invalid intrinsic syntax, expected opening `%`");
    var e = [];
    return hn2(r, W2, function(o, Z, H2, X2) {
      e[e.length] = H2 ? hn2(X2, d, "$1") : Z || o;
    }), e;
  }, V = function M(r, u) {
    var L = r, e;
    if (G2(k, L))
      e = k[L], L = "%" + e[0] + "%";
    if (G2(C, L)) {
      var o = C[L];
      if (o === x)
        o = b2(L);
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
    if (K2(/^%?[^%]*%?$/, r) === null)
      throw new I2("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var L = p(r), e = L.length > 0 ? L[0] : "", o = V("%" + e + "%", u), Z = o.name, H2 = o.value, X2 = false, nn2 = o.alias;
    if (nn2)
      e = nn2[0], l(L, U([0, 1], nn2));
    for (var z = 1, gn2 = true;z < L.length; z += 1) {
      var _ = L[z], $n2 = a(_, 0, 1), sn2 = a(_, -1);
      if (($n2 === '"' || $n2 === "'" || $n2 === "`" || (sn2 === '"' || sn2 === "'" || sn2 === "`")) && $n2 !== sn2)
        throw new I2("property names with quotes must have matching quotes");
      if (_ === "constructor" || !gn2)
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
          var In2 = m2(H2, _);
          if (gn2 = !!In2, gn2 && "get" in In2 && !("originalValue" in In2.get))
            H2 = In2.get;
          else
            H2 = H2[_];
        } else
          gn2 = G2(H2, _), H2 = H2[_];
        if (gn2 && !X2)
          C[Z] = H2;
      }
    }
    return H2;
  };
});
var On2 = R((t, n) => {
  var h = kn2(), c2 = h("%Object.defineProperty%", true) || false;
  if (c2)
    try {
      c2({}, "a", { value: 1 });
    } catch (i) {
      c2 = false;
    }
  n.exports = c2;
});
var ut2 = R((t, n) => {
  var h, c2 = SyntaxError, i = Function, g2 = TypeError, w4 = function(K2) {
    try {
      return i('"use strict"; return (' + K2 + ").constructor;")();
    } catch (W2) {}
  }, I2 = Object.getOwnPropertyDescriptor;
  if (I2)
    try {
      I2({}, "");
    } catch (K2) {
      I2 = null;
    }
  var E4 = function() {
    throw new g2;
  }, j = I2 ? function() {
    try {
      return arguments.callee, E4;
    } catch (K2) {
      try {
        return I2(arguments, "callee").get;
      } catch (W2) {
        return E4;
      }
    }
  }() : E4, $4 = yn2()(), Y = on2()(), m2 = Object.getPrototypeOf || (Y ? function(K2) {
    return K2.__proto__;
  } : null), s = {}, P = typeof Uint8Array === "undefined" || !m2 ? h : m2(Uint8Array), S = { "%AggregateError%": typeof AggregateError === "undefined" ? h : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? h : ArrayBuffer, "%ArrayIteratorPrototype%": $4 && m2 ? m2([][Symbol.iterator]()) : h, "%AsyncFromSyncIteratorPrototype%": h, "%AsyncFunction%": s, "%AsyncGenerator%": s, "%AsyncGeneratorFunction%": s, "%AsyncIteratorPrototype%": s, "%Atomics%": typeof Atomics === "undefined" ? h : Atomics, "%BigInt%": typeof BigInt === "undefined" ? h : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? h : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? h : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? h : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? h : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? h : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? h : FinalizationRegistry, "%Function%": i, "%GeneratorFunction%": s, "%Int8Array%": typeof Int8Array === "undefined" ? h : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? h : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? h : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": $4 && m2 ? m2(m2([][Symbol.iterator]())) : h, "%JSON%": typeof JSON === "object" ? JSON : h, "%Map%": typeof Map === "undefined" ? h : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !$4 || !m2 ? h : m2(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? h : Promise, "%Proxy%": typeof Proxy === "undefined" ? h : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? h : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? h : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !$4 || !m2 ? h : m2(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? h : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": $4 && m2 ? m2(""[Symbol.iterator]()) : h, "%Symbol%": $4 ? Symbol : h, "%SyntaxError%": c2, "%ThrowTypeError%": j, "%TypedArray%": P, "%TypeError%": g2, "%Uint8Array%": typeof Uint8Array === "undefined" ? h : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? h : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? h : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? h : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? h : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? h : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? h : WeakSet };
  if (m2)
    try {
      null.error;
    } catch (K2) {
      T4 = m2(m2(K2)), S["%Error.prototype%"] = T4;
    }
  var T4, v = function K(W2) {
    var d;
    if (W2 === "%AsyncFunction%")
      d = w4("async function () {}");
    else if (W2 === "%GeneratorFunction%")
      d = w4("function* () {}");
    else if (W2 === "%AsyncGeneratorFunction%")
      d = w4("async function* () {}");
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
  }, x = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, O = Tn2(), C = Gn2(), D = O.call(Function.call, Array.prototype.concat), b2 = O.call(Function.apply, Array.prototype.splice), k = O.call(Function.call, String.prototype.replace), f2 = O.call(Function.call, String.prototype.slice), G2 = O.call(Function.call, RegExp.prototype.exec), U = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, l = /\\(\\)?/g, hn2 = function K(W2) {
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
    var p = hn2(W2), V = p.length > 0 ? p[0] : "", M2 = a("%" + V + "%", d), r = M2.name, u = M2.value, L = false, e = M2.alias;
    if (e)
      V = e[0], b2(p, D([0, 1], e));
    for (var o = 1, Z = true;o < p.length; o += 1) {
      var H2 = p[o], X2 = f2(H2, 0, 1), nn2 = f2(H2, -1);
      if ((X2 === '"' || X2 === "'" || X2 === "`" || (nn2 === '"' || nn2 === "'" || nn2 === "`")) && X2 !== nn2)
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
var ln2 = R((t, n) => {
  var h = ut2(), c2 = h("%Object.getOwnPropertyDescriptor%", true);
  if (c2)
    try {
      c2([], "length");
    } catch (i) {
      c2 = null;
    }
  n.exports = c2;
});
var Rt2 = R((t, n) => {
  var h = On2(), c2 = Vn2(), i = An2(), g2 = ln2();
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
    var $4 = arguments.length > 3 ? arguments[3] : null, Y = arguments.length > 4 ? arguments[4] : null, m2 = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : false, P = !!g2 && g2(I2, E4);
    if (h)
      h(I2, E4, { configurable: m2 === null && P ? P.configurable : !m2, enumerable: $4 === null && P ? P.enumerable : !$4, value: j, writable: Y === null && P ? P.writable : !Y });
    else if (s || !$4 && !Y && !m2)
      I2[E4] = j;
    else
      throw new c2("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Dt2 = R((t, n) => {
  var h = On2(), c2 = function i() {
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
  var h = kn2(), c2 = Rt2(), i = Dt2()(), g2 = ln2(), w4 = An2(), I2 = h("%Math.floor%");
  n.exports = function E(j, $4) {
    if (typeof j !== "function")
      throw new w4("`fn` is not a function");
    if (typeof $4 !== "number" || $4 < 0 || $4 > 4294967295 || I2($4) !== $4)
      throw new w4("`length` must be a positive 32-bit integer");
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
        c2(j, "length", $4, true, true);
      else
        c2(j, "length", $4);
    return j;
  };
});
var Zn2 = R((t, n) => {
  var h = Tn2(), c2 = kn2(), i = rt(), g2 = An2(), w4 = c2("%Function.prototype.apply%"), I2 = c2("%Function.prototype.call%"), E4 = c2("%Reflect.apply%", true) || h.call(I2, w4), j = On2(), $4 = c2("%Math.max%");
  n.exports = function m(s) {
    if (typeof s !== "function")
      throw new g2("a function is required");
    var P = E4(h, I2, arguments);
    return i(P, 1 + $4(0, s.length - (arguments.length - 1)), true);
  };
  var Y = function m() {
    return E4(h, w4, arguments);
  };
  if (j)
    j(n.exports, "apply", { value: Y });
  else
    n.exports.apply = Y;
});
var Wt2 = R((t, n) => {
  var h = kn2(), c2 = Zn2(), i = c2(h("String.prototype.indexOf"));
  n.exports = function g(w4, I2) {
    var E4 = h(w4, !!I2);
    if (typeof E4 === "function" && i(w4, ".prototype.") > -1)
      return c2(E4);
    return E4;
  };
});
var bt2 = R((t, n) => {
  var h = (typeof JSON !== "undefined" ? JSON : st2()).stringify, c2 = It(), i = St2(), g2 = Zn2(), w4 = Wt2(), I2 = w4("Array.prototype.join"), E4 = w4("Array.prototype.push"), j = function Y(m2, s) {
    var P = "";
    for (var S = 0;S < m2; S += 1)
      P += s;
    return P;
  }, $4 = function(Y, m2, s) {
    return s;
  };
  n.exports = function Y(m2) {
    var s = arguments.length > 1 ? arguments[1] : undefined, P = s && s.space || "";
    if (typeof P === "number")
      P = j(P, " ");
    var S = !!s && typeof s.cycles === "boolean" && s.cycles, T4 = s && s.replacer ? g2(s.replacer) : $4, v = typeof s === "function" ? s : s && s.cmp, x = v && function(C) {
      var D = v.length > 2 && function b(k) {
        return C[k];
      };
      return function(b2, k) {
        return v({ key: b2, value: C[b2] }, { key: k, value: C[k] }, D ? { __proto__: null, get: D } : undefined);
      };
    }, O = [];
    return function C(D, b2, k, f2) {
      var G2 = P ? `
` + j(f2, P) : "", U = P ? ": " : ":";
      if (k && k.toJSON && typeof k.toJSON === "function")
        k = k.toJSON();
      if (k = T4(D, b2, k), k === undefined)
        return;
      if (typeof k !== "object" || k === null)
        return h(k);
      if (c2(k)) {
        var K2 = [];
        for (var l = 0;l < k.length; l++) {
          var hn2 = C(k, l, k[l], f2 + 1) || h(null);
          E4(K2, G2 + P + hn2);
        }
        return "[" + I2(K2, ",") + G2 + "]";
      }
      if (O.indexOf(k) !== -1) {
        if (S)
          return h("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      } else
        E4(O, k);
      var a = i(k).sort(x && x(k)), K2 = [];
      for (var l = 0;l < a.length; l++) {
        var b2 = a[l], W2 = C(k, b2, k[b2], f2 + 1);
        if (!W2)
          continue;
        var d = h(b2) + U + W2;
        E4(K2, G2 + P + d);
      }
      return O.splice(O.indexOf(k), 1), "{" + I2(K2, ",") + G2 + "}";
    }({ "": m2 }, "", m2, 0);
  };
});
var Dn2 = Nt2(bt2(), 1);
var rn2 = function(t, n, h, c2) {
  let i, g2, w4, I2 = n || [0], E4 = (h = h || 0) >>> 3, j = c2 === -1 ? 3 : 0;
  for (i = 0;i < t.length; i += 1)
    w4 = i + E4, g2 = w4 >>> 2, I2.length <= g2 && I2.push(0), I2[g2] |= t[i] << 8 * (j + c2 * (w4 % 4));
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
        return function(w4, I2, E4, j) {
          let $4, Y, m2, s;
          if (w4.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          let P = I2 || [0], S = (E4 = E4 || 0) >>> 3, T4 = j === -1 ? 3 : 0;
          for ($4 = 0;$4 < w4.length; $4 += 2) {
            if (Y = parseInt(w4.substr($4, 2), 16), isNaN(Y))
              throw new Error("String of HEX type contains invalid characters");
            for (s = ($4 >>> 1) + S, m2 = s >>> 2;P.length <= m2; )
              P.push(0);
            P[m2] |= Y << 8 * (T4 + j * (s % 4));
          }
          return { value: P, binLen: 4 * w4.length + E4 };
        }(c2, i, g2, h);
      };
    case "TEXT":
      return function(c2, i, g2) {
        return function(w4, I2, E4, j, $4) {
          let Y, m2, s, P, S, T4, v, x, O = 0, C = E4 || [0], D = (j = j || 0) >>> 3;
          if (I2 === "UTF8")
            for (v = $4 === -1 ? 3 : 0, s = 0;s < w4.length; s += 1)
              for (Y = w4.charCodeAt(s), m2 = [], 128 > Y ? m2.push(Y) : 2048 > Y ? (m2.push(192 | Y >>> 6), m2.push(128 | 63 & Y)) : 55296 > Y || 57344 <= Y ? m2.push(224 | Y >>> 12, 128 | Y >>> 6 & 63, 128 | 63 & Y) : (s += 1, Y = 65536 + ((1023 & Y) << 10 | 1023 & w4.charCodeAt(s)), m2.push(240 | Y >>> 18, 128 | Y >>> 12 & 63, 128 | Y >>> 6 & 63, 128 | 63 & Y)), P = 0;P < m2.length; P += 1) {
                for (T4 = O + D, S = T4 >>> 2;C.length <= S; )
                  C.push(0);
                C[S] |= m2[P] << 8 * (v + $4 * (T4 % 4)), O += 1;
              }
          else
            for (v = $4 === -1 ? 2 : 0, x = I2 === "UTF16LE" && $4 !== 1 || I2 !== "UTF16LE" && $4 === 1, s = 0;s < w4.length; s += 1) {
              for (Y = w4.charCodeAt(s), x === true && (P = 255 & Y, Y = P << 8 | Y >>> 8), T4 = O + D, S = T4 >>> 2;C.length <= S; )
                C.push(0);
              C[S] |= Y << 8 * (v + $4 * (T4 % 4)), O += 2;
            }
          return { value: C, binLen: 8 * O + j };
        }(c2, n, i, g2, h);
      };
    case "B64":
      return function(c2, i, g2) {
        return function(w4, I2, E4, j) {
          let $4, Y, m2, s, P, S, T4, v = 0, x = I2 || [0], O = (E4 = E4 || 0) >>> 3, C = j === -1 ? 3 : 0, D = w4.indexOf("=");
          if (w4.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (w4 = w4.replace(/=/g, ""), D !== -1 && D < w4.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (Y = 0;Y < w4.length; Y += 4) {
            for (P = w4.substr(Y, 4), s = 0, m2 = 0;m2 < P.length; m2 += 1)
              $4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(P.charAt(m2)), s |= $4 << 18 - 6 * m2;
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
        return function(w4, I2, E4, j) {
          let $4, Y, m2, s, P = I2 || [0], S = (E4 = E4 || 0) >>> 3, T4 = j === -1 ? 3 : 0;
          for (Y = 0;Y < w4.length; Y += 1)
            $4 = w4.charCodeAt(Y), s = Y + S, m2 = s >>> 2, P.length <= m2 && P.push(0), P[m2] |= $4 << 8 * (T4 + j * (s % 4));
          return { value: P, binLen: 8 * w4.length + E4 };
        }(c2, i, g2, h);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (c2) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(c2, i, g2) {
        return function(w4, I2, E4, j) {
          return rn2(new Uint8Array(w4), I2, E4, j);
        }(c2, i, g2, h);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (c2) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(c2, i, g2) {
        return rn2(c2, i, g2, h);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var Wn2 = function(t, n, h, c2) {
  switch (t) {
    case "HEX":
      return function(i) {
        return function(g2, w4, I2, E4) {
          let j, $4, Y = "", m2 = w4 / 8, s = I2 === -1 ? 3 : 0;
          for (j = 0;j < m2; j += 1)
            $4 = g2[j >>> 2] >>> 8 * (s + I2 * (j % 4)), Y += "0123456789abcdef".charAt($4 >>> 4 & 15) + "0123456789abcdef".charAt(15 & $4);
          return E4.outputUpper ? Y.toUpperCase() : Y;
        }(i, n, h, c2);
      };
    case "B64":
      return function(i) {
        return function(g2, w4, I2, E4) {
          let j, $4, Y, m2, s, P = "", S = w4 / 8, T4 = I2 === -1 ? 3 : 0;
          for (j = 0;j < S; j += 3)
            for (m2 = j + 1 < S ? g2[j + 1 >>> 2] : 0, s = j + 2 < S ? g2[j + 2 >>> 2] : 0, Y = (g2[j >>> 2] >>> 8 * (T4 + I2 * (j % 4)) & 255) << 16 | (m2 >>> 8 * (T4 + I2 * ((j + 1) % 4)) & 255) << 8 | s >>> 8 * (T4 + I2 * ((j + 2) % 4)) & 255, $4 = 0;$4 < 4; $4 += 1)
              P += 8 * j + 6 * $4 <= w4 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(Y >>> 6 * (3 - $4) & 63) : E4.b64Pad;
          return P;
        }(i, n, h, c2);
      };
    case "BYTES":
      return function(i) {
        return function(g2, w4, I2) {
          let E4, j, $4 = "", Y = w4 / 8, m2 = I2 === -1 ? 3 : 0;
          for (E4 = 0;E4 < Y; E4 += 1)
            j = g2[E4 >>> 2] >>> 8 * (m2 + I2 * (E4 % 4)) & 255, $4 += String.fromCharCode(j);
          return $4;
        }(i, n, h);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (i) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(i) {
        return function(g2, w4, I2) {
          let E4, j = w4 / 8, $4 = new ArrayBuffer(j), Y = new Uint8Array($4), m2 = I2 === -1 ? 3 : 0;
          for (E4 = 0;E4 < j; E4 += 1)
            Y[E4] = g2[E4 >>> 2] >>> 8 * (m2 + I2 * (E4 % 4)) & 255;
          return $4;
        }(i, n, h);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (i) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(i) {
        return function(g2, w4, I2) {
          let E4, j = w4 / 8, $4 = I2 === -1 ? 3 : 0, Y = new Uint8Array(j);
          for (E4 = 0;E4 < j; E4 += 1)
            Y[E4] = g2[E4 >>> 2] >>> 8 * ($4 + I2 * (E4 % 4)) & 255;
          return Y;
        }(i, n, h);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var vn2 = function(t, n) {
  let h, c2, i = t.binLen >>> 3, g2 = n.binLen >>> 3, w4 = i << 3, I2 = 4 - i << 3;
  if (i % 4 != 0) {
    for (h = 0;h < g2; h += 4)
      c2 = i + h >>> 2, t.value[c2] |= n.value[h >>> 2] << w4, t.value.push(0), t.value[c2 + 1] |= n.value[h >>> 2] >>> I2;
    return (t.value.length << 2) - 4 >= g2 + i && t.value.pop(), { value: t.value, binLen: t.binLen + n.binLen };
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
var tn2 = function(t, n, h, c2) {
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
var Mt2 = function(t, n, h, c2) {
  let i = (65535 & t) + (65535 & n) + (65535 & h) + (65535 & c2);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16) + (c2 >>> 16) + (i >>> 16)) << 16 | 65535 & i;
};
var wn2 = function(t, n, h, c2, i) {
  let g2 = (65535 & t) + (65535 & n) + (65535 & h) + (65535 & c2) + (65535 & i);
  return (65535 & (t >>> 16) + (n >>> 16) + (h >>> 16) + (c2 >>> 16) + (i >>> 16) + (g2 >>> 16)) << 16 | 65535 & g2;
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
  let h, c2, i, g2, w4, I2, E4, j = [];
  for (h = n[0], c2 = n[1], i = n[2], g2 = n[3], w4 = n[4], E4 = 0;E4 < 80; E4 += 1)
    j[E4] = E4 < 16 ? t[E4] : cn2(j[E4 - 3] ^ j[E4 - 8] ^ j[E4 - 14] ^ j[E4 - 16], 1), I2 = E4 < 20 ? wn2(cn2(h, 5), Fn2(c2, i, g2), w4, 1518500249, j[E4]) : E4 < 40 ? wn2(cn2(h, 5), Ln2(c2, i, g2), w4, 1859775393, j[E4]) : E4 < 60 ? wn2(cn2(h, 5), Bn2(c2, i, g2), w4, 2400959708, j[E4]) : wn2(cn2(h, 5), Ln2(c2, i, g2), w4, 3395469782, j[E4]), w4 = g2, g2 = i, i = cn2(c2, 30), c2 = h, h = I2;
  return n[0] = y2(h, n[0]), n[1] = y2(c2, n[1]), n[2] = y2(i, n[2]), n[3] = y2(g2, n[3]), n[4] = y2(w4, n[4]), n;
};
var dt2 = function(t, n, h, c2) {
  let i, g2 = 15 + (n + 65 >>> 9 << 4), w4 = n + h;
  for (;t.length <= g2; )
    t.push(0);
  for (t[n >>> 5] |= 128 << 24 - n % 32, t[g2] = 4294967295 & w4, t[g2 - 1] = w4 / En2 | 0, i = 0;i < t.length; i += 16)
    c2 = Qn2(t.slice(i, i + 16), c2);
  return c2;
};
var Mn2 = function(t) {
  let n;
  return n = t == "SHA-224" ? J2.slice() : q2.slice(), n;
};
var Hn2 = function(t, n) {
  let h, c2, i, g2, w4, I2, E4, j, $4, Y, m2, s = [];
  for (h = n[0], c2 = n[1], i = n[2], g2 = n[3], w4 = n[4], I2 = n[5], E4 = n[6], j = n[7], m2 = 0;m2 < 64; m2 += 1)
    s[m2] = m2 < 16 ? t[m2] : Mt2(B2(P = s[m2 - 2], 17) ^ B2(P, 19) ^ Un2(P, 10), s[m2 - 7], Ht2(s[m2 - 15]), s[m2 - 16]), $4 = wn2(j, pt2(w4), Fn2(w4, I2, E4), A2[m2], s[m2]), Y = y2(Lt2(h), Bn2(h, c2, i)), j = E4, E4 = I2, I2 = w4, w4 = y2(g2, $4), g2 = i, i = c2, c2 = h, h = y2($4, Y);
  var P;
  return n[0] = y2(h, n[0]), n[1] = y2(c2, n[1]), n[2] = y2(i, n[2]), n[3] = y2(g2, n[3]), n[4] = y2(w4, n[4]), n[5] = y2(I2, n[5]), n[6] = y2(E4, n[6]), n[7] = y2(j, n[7]), n;
};
var pn2 = function(t, n) {
  let h;
  return n > 32 ? (h = 64 - n, new N2(t.I << n | t.N >>> h, t.N << n | t.I >>> h)) : n !== 0 ? (h = 32 - n, new N2(t.N << n | t.I >>> h, t.I << n | t.N >>> h)) : t;
};
var Q2 = function(t, n) {
  let h;
  return n < 32 ? (h = 32 - n, new N2(t.N >>> n | t.I << h, t.I >>> n | t.N << h)) : (h = 64 - n, new N2(t.I >>> n | t.N << h, t.N >>> n | t.I << h));
};
var an2 = function(t, n) {
  return new N2(t.N >>> n, t.I >>> n | t.N << 32 - n);
};
var et2 = function(t, n, h) {
  return new N2(t.N & n.N ^ t.N & h.N ^ n.N & h.N, t.I & n.I ^ t.I & h.I ^ n.I & h.I);
};
var ft2 = function(t) {
  let n = Q2(t, 28), h = Q2(t, 34), c2 = Q2(t, 39);
  return new N2(n.N ^ h.N ^ c2.N, n.I ^ h.I ^ c2.I);
};
var F2 = function(t, n) {
  let h, c2;
  h = (65535 & t.I) + (65535 & n.I), c2 = (t.I >>> 16) + (n.I >>> 16) + (h >>> 16);
  let i = (65535 & c2) << 16 | 65535 & h;
  return h = (65535 & t.N) + (65535 & n.N) + (c2 >>> 16), c2 = (t.N >>> 16) + (n.N >>> 16) + (h >>> 16), new N2((65535 & c2) << 16 | 65535 & h, i);
};
var Vt2 = function(t, n, h, c2) {
  let i, g2;
  i = (65535 & t.I) + (65535 & n.I) + (65535 & h.I) + (65535 & c2.I), g2 = (t.I >>> 16) + (n.I >>> 16) + (h.I >>> 16) + (c2.I >>> 16) + (i >>> 16);
  let w4 = (65535 & g2) << 16 | 65535 & i;
  return i = (65535 & t.N) + (65535 & n.N) + (65535 & h.N) + (65535 & c2.N) + (g2 >>> 16), g2 = (t.N >>> 16) + (n.N >>> 16) + (h.N >>> 16) + (c2.N >>> 16) + (i >>> 16), new N2((65535 & g2) << 16 | 65535 & i, w4);
};
var yt2 = function(t, n, h, c2, i) {
  let g2, w4;
  g2 = (65535 & t.I) + (65535 & n.I) + (65535 & h.I) + (65535 & c2.I) + (65535 & i.I), w4 = (t.I >>> 16) + (n.I >>> 16) + (h.I >>> 16) + (c2.I >>> 16) + (i.I >>> 16) + (g2 >>> 16);
  let I2 = (65535 & w4) << 16 | 65535 & g2;
  return g2 = (65535 & t.N) + (65535 & n.N) + (65535 & h.N) + (65535 & c2.N) + (65535 & i.N) + (w4 >>> 16), w4 = (t.N >>> 16) + (n.N >>> 16) + (h.N >>> 16) + (c2.N >>> 16) + (i.N >>> 16) + (g2 >>> 16), new N2((65535 & w4) << 16 | 65535 & g2, I2);
};
var Yn2 = function(t, n) {
  return new N2(t.N ^ n.N, t.I ^ n.I);
};
var ot2 = function(t) {
  let n = Q2(t, 19), h = Q2(t, 61), c2 = an2(t, 6);
  return new N2(n.N ^ h.N ^ c2.N, n.I ^ h.I ^ c2.I);
};
var Gt2 = function(t) {
  let n = Q2(t, 1), h = Q2(t, 8), c2 = an2(t, 7);
  return new N2(n.N ^ h.N ^ c2.N, n.I ^ h.I ^ c2.I);
};
var lt2 = function(t) {
  let n = Q2(t, 14), h = Q2(t, 18), c2 = Q2(t, 41);
  return new N2(n.N ^ h.N ^ c2.N, n.I ^ h.I ^ c2.I);
};
var Kn2 = function(t) {
  return t === "SHA-384" ? [new N2(3418070365, J2[0]), new N2(1654270250, J2[1]), new N2(2438529370, J2[2]), new N2(355462360, J2[3]), new N2(1731405415, J2[4]), new N2(41048885895, J2[5]), new N2(3675008525, J2[6]), new N2(1203062813, J2[7])] : [new N2(q2[0], 4089235720), new N2(q2[1], 2227873595), new N2(q2[2], 4271175723), new N2(q2[3], 1595750129), new N2(q2[4], 2917565137), new N2(q2[5], 725511199), new N2(q2[6], 4215389547), new N2(q2[7], 327033209)];
};
var dn2 = function(t, n) {
  let h, c2, i, g2, w4, I2, E4, j, $4, Y, m2, s, P = [];
  for (h = n[0], c2 = n[1], i = n[2], g2 = n[3], w4 = n[4], I2 = n[5], E4 = n[6], j = n[7], m2 = 0;m2 < 80; m2 += 1)
    m2 < 16 ? (s = 2 * m2, P[m2] = new N2(t[s], t[s + 1])) : P[m2] = Vt2(ot2(P[m2 - 2]), P[m2 - 7], Gt2(P[m2 - 15]), P[m2 - 16]), $4 = yt2(j, lt2(w4), (T4 = I2, v = E4, new N2((S = w4).N & T4.N ^ ~S.N & v.N, S.I & T4.I ^ ~S.I & v.I)), Bt2[m2], P[m2]), Y = F2(ft2(h), et2(h, c2, i)), j = E4, E4 = I2, I2 = w4, w4 = F2(g2, $4), g2 = i, i = c2, c2 = h, h = F2($4, Y);
  var S, T4, v;
  return n[0] = F2(h, n[0]), n[1] = F2(c2, n[1]), n[2] = F2(i, n[2]), n[3] = F2(g2, n[3]), n[4] = F2(w4, n[4]), n[5] = F2(I2, n[5]), n[6] = F2(E4, n[6]), n[7] = F2(j, n[7]), n;
};
var Cn2 = function(t) {
  let n, h = [];
  for (n = 0;n < 5; n += 1)
    h[n] = [new N2(0, 0), new N2(0, 0), new N2(0, 0), new N2(0, 0), new N2(0, 0)];
  return h;
};
var Zt2 = function(t) {
  let n, h = [];
  for (n = 0;n < 5; n += 1)
    h[n] = t[n].slice();
  return h;
};
var Pn2 = function(t, n) {
  let h, c2, i, g2, w4 = [], I2 = [];
  if (t !== null)
    for (c2 = 0;c2 < t.length; c2 += 2)
      n[(c2 >>> 1) % 5][(c2 >>> 1) / 5 | 0] = Yn2(n[(c2 >>> 1) % 5][(c2 >>> 1) / 5 | 0], new N2(t[c2 + 1], t[c2]));
  for (h = 0;h < 24; h += 1) {
    for (g2 = Cn2(), c2 = 0;c2 < 5; c2 += 1)
      w4[c2] = (E4 = n[c2][0], j = n[c2][1], $4 = n[c2][2], Y = n[c2][3], m2 = n[c2][4], new N2(E4.N ^ j.N ^ $4.N ^ Y.N ^ m2.N, E4.I ^ j.I ^ $4.I ^ Y.I ^ m2.I));
    for (c2 = 0;c2 < 5; c2 += 1)
      I2[c2] = Yn2(w4[(c2 + 4) % 5], pn2(w4[(c2 + 1) % 5], 1));
    for (c2 = 0;c2 < 5; c2 += 1)
      for (i = 0;i < 5; i += 1)
        n[c2][i] = Yn2(n[c2][i], I2[c2]);
    for (c2 = 0;c2 < 5; c2 += 1)
      for (i = 0;i < 5; i += 1)
        g2[i][(2 * c2 + 3 * i) % 5] = pn2(n[c2][i], Xt2[c2][i]);
    for (c2 = 0;c2 < 5; c2 += 1)
      for (i = 0;i < 5; i += 1)
        n[c2][i] = Yn2(g2[c2][i], new N2(~g2[(c2 + 1) % 5][i].N & g2[(c2 + 2) % 5][i].N, ~g2[(c2 + 1) % 5][i].I & g2[(c2 + 2) % 5][i].I));
    n[0][0] = Yn2(n[0][0], at2[h]);
  }
  var E4, j, $4, Y, m2;
  return n;
};
var Xn2 = function(t) {
  let n, h, c2 = 0, i = [0, 0], g2 = [4294967295 & t, t / En2 & 2097151];
  for (n = 6;n >= 0; n--)
    h = g2[n >> 2] >>> 8 * n & 255, h === 0 && c2 === 0 || (i[c2 + 1 >> 2] |= h << 8 * (c2 + 1), c2 += 1);
  return c2 = c2 !== 0 ? c2 : 1, i[0] |= c2, { value: c2 + 1 > 4 ? i : [i[0]], binLen: 8 + 8 * c2 };
};
var xn2 = function(t) {
  return vn2(Xn2(t.binLen), t);
};
var en2 = function(t, n) {
  let h, c2 = Xn2(n);
  c2 = vn2(c2, t);
  let i = n >>> 2, g2 = (i - c2.value.length % i) % i;
  for (h = 0;h < g2; h++)
    c2.value.push(0);
  return c2.value;
};
var En2 = 4294967296;
var A2 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
var J2 = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
var q2 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
var Nn2 = "Chosen SHA variant is not supported";
var zn2 = "Cannot set numRounds with MAC";

class jn2 {
  constructor(t, n, h) {
    let c2 = h || {};
    if (this.t = n, this.i = c2.encoding || "UTF8", this.numRounds = c2.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = t, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(t) {
    let n, h = 0, c2 = this.m >>> 5, i = this.C(t, this.h, this.u), g2 = i.binLen, w4 = i.value, I2 = g2 >>> 5;
    for (n = 0;n < I2; n += c2)
      h + this.m <= g2 && (this.U = this.v(w4.slice(n, n + c2), this.U), h += this.m);
    return this.A += h, this.h = w4.slice(h >>> 5), this.u = g2 % this.m, this.l = true, this;
  }
  getHash(t, n) {
    let h, c2, i = this.R, g2 = bn2(n);
    if (this.K) {
      if (g2.outputLen === -1)
        throw new Error("Output length must be specified in options");
      i = g2.outputLen;
    }
    let w4 = Wn2(t, i, this.T, g2);
    if (this.H && this.g)
      return w4(this.g(g2));
    for (c2 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), i), h = 1;h < this.numRounds; h += 1)
      this.K && i % 32 != 0 && (c2[c2.length - 1] &= 16777215 >>> 24 - i % 32), c2 = this.F(c2, i, 0, this.B(this.o), i);
    return w4(c2);
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
      throw new Error(zn2);
    if (this.H)
      throw new Error("MAC key already set");
    for (n < t.binLen / 8 && (t.value = this.F(t.value, t.binLen, 0, this.B(this.o), this.R));t.value.length <= h; )
      t.value.push(0);
    for (c2 = 0;c2 <= h; c2 += 1)
      this.S[c2] = 909522486 ^ t.value[c2], this.p[c2] = 1549556828 ^ t.value[c2];
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
    let c2 = h || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = mn(this.t, this.i, this.T), this.v = Qn2, this.L = function(i) {
      return i.slice();
    }, this.B = Kt2, this.F = dt2, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, c2.hmacKey && this.k(tn2("hmacKey", c2.hmacKey, this.T));
  }
};
var Ft2 = class extends jn2 {
  constructor(t, n, h) {
    if (t !== "SHA-224" && t !== "SHA-256")
      throw new Error(Nn2);
    super(t, n, h);
    let c2 = h || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = mn(this.t, this.i, this.T), this.v = Hn2, this.L = function(i) {
      return i.slice();
    }, this.B = Mn2, this.F = function(i, g2, w4, I2) {
      return function(E4, j, $4, Y, m2) {
        let s, P, S = 15 + (j + 65 >>> 9 << 4), T4 = j + $4;
        for (;E4.length <= S; )
          E4.push(0);
        for (E4[j >>> 5] |= 128 << 24 - j % 32, E4[S] = 4294967295 & T4, E4[S - 1] = T4 / En2 | 0, s = 0;s < E4.length; s += 16)
          Y = Hn2(E4.slice(s, s + 16), Y);
        return P = m2 === "SHA-224" ? [Y[0], Y[1], Y[2], Y[3], Y[4], Y[5], Y[6]] : Y, P;
      }(i, g2, w4, I2, t);
    }, this.U = Mn2(t), this.m = 512, this.R = t === "SHA-224" ? 224 : 256, this.K = false, c2.hmacKey && this.k(tn2("hmacKey", c2.hmacKey, this.T));
  }
};

class N2 {
  constructor(t, n) {
    this.N = t, this.I = n;
  }
}
var Bt2 = [new N2(A2[0], 3609767458), new N2(A2[1], 602891725), new N2(A2[2], 3964484399), new N2(A2[3], 2173295548), new N2(A2[4], 4081628472), new N2(A2[5], 3053834265), new N2(A2[6], 2937671579), new N2(A2[7], 3664609560), new N2(A2[8], 2734883394), new N2(A2[9], 1164996542), new N2(A2[10], 1323610764), new N2(A2[11], 3590304994), new N2(A2[12], 4068182383), new N2(A2[13], 991336113), new N2(A2[14], 633803317), new N2(A2[15], 3479774868), new N2(A2[16], 2666613458), new N2(A2[17], 944711139), new N2(A2[18], 2341262773), new N2(A2[19], 2007800933), new N2(A2[20], 1495990901), new N2(A2[21], 1856431235), new N2(A2[22], 3175218132), new N2(A2[23], 2198950837), new N2(A2[24], 3999719339), new N2(A2[25], 766784016), new N2(A2[26], 2566594879), new N2(A2[27], 3203337956), new N2(A2[28], 1034457026), new N2(A2[29], 2466948901), new N2(A2[30], 3758326383), new N2(A2[31], 168717936), new N2(A2[32], 1188179964), new N2(A2[33], 1546045734), new N2(A2[34], 1522805485), new N2(A2[35], 2643833823), new N2(A2[36], 2343527390), new N2(A2[37], 1014477480), new N2(A2[38], 1206759142), new N2(A2[39], 344077627), new N2(A2[40], 1290863460), new N2(A2[41], 3158454273), new N2(A2[42], 3505952657), new N2(A2[43], 106217008), new N2(A2[44], 3606008344), new N2(A2[45], 1432725776), new N2(A2[46], 1467031594), new N2(A2[47], 851169720), new N2(A2[48], 3100823752), new N2(A2[49], 1363258195), new N2(A2[50], 3750685593), new N2(A2[51], 3785050280), new N2(A2[52], 3318307427), new N2(A2[53], 3812723403), new N2(A2[54], 2003034995), new N2(A2[55], 3602036899), new N2(A2[56], 1575990012), new N2(A2[57], 1125592928), new N2(A2[58], 2716904306), new N2(A2[59], 442776044), new N2(A2[60], 593698344), new N2(A2[61], 3733110249), new N2(A2[62], 2999351573), new N2(A2[63], 3815920427), new N2(3391569614, 3928383900), new N2(3515267271, 566280711), new N2(3940187606, 3454069534), new N2(4118630271, 4000239992), new N2(116418474, 1914138554), new N2(174292421, 2731055270), new N2(289380356, 3203993006), new N2(460393269, 320620315), new N2(685471733, 587496836), new N2(852142971, 1086792851), new N2(1017036298, 365543100), new N2(1126000580, 2618297676), new N2(1288033470, 3409855158), new N2(1501505948, 4234509866), new N2(1607167915, 987167468), new N2(1816402316, 1246189591)];
var Qt2 = class extends jn2 {
  constructor(t, n, h) {
    if (t !== "SHA-384" && t !== "SHA-512")
      throw new Error(Nn2);
    super(t, n, h);
    let c2 = h || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = mn(this.t, this.i, this.T), this.v = dn2, this.L = function(i) {
      return i.slice();
    }, this.B = Kn2, this.F = function(i, g2, w4, I2) {
      return function(E4, j, $4, Y, m2) {
        let s, P, S = 31 + (j + 129 >>> 10 << 5), T4 = j + $4;
        for (;E4.length <= S; )
          E4.push(0);
        for (E4[j >>> 5] |= 128 << 24 - j % 32, E4[S] = 4294967295 & T4, E4[S - 1] = T4 / En2 | 0, s = 0;s < E4.length; s += 32)
          Y = dn2(E4.slice(s, s + 32), Y);
        return P = m2 === "SHA-384" ? [Y[0].N, Y[0].I, Y[1].N, Y[1].I, Y[2].N, Y[2].I, Y[3].N, Y[3].I, Y[4].N, Y[4].I, Y[5].N, Y[5].I] : [Y[0].N, Y[0].I, Y[1].N, Y[1].I, Y[2].N, Y[2].I, Y[3].N, Y[3].I, Y[4].N, Y[4].I, Y[5].N, Y[5].I, Y[6].N, Y[6].I, Y[7].N, Y[7].I], P;
      }(i, g2, w4, I2, t);
    }, this.U = Kn2(t), this.m = 1024, this.R = t === "SHA-384" ? 384 : 512, this.K = false, c2.hmacKey && this.k(tn2("hmacKey", c2.hmacKey, this.T));
  }
};
var at2 = [new N2(0, 1), new N2(0, 32898), new N2(2147483648, 32906), new N2(2147483648, 2147516416), new N2(0, 32907), new N2(0, 2147483649), new N2(2147483648, 2147516545), new N2(2147483648, 32777), new N2(0, 138), new N2(0, 136), new N2(0, 2147516425), new N2(0, 2147483658), new N2(0, 2147516555), new N2(2147483648, 139), new N2(2147483648, 32905), new N2(2147483648, 32771), new N2(2147483648, 32770), new N2(2147483648, 128), new N2(0, 32778), new N2(2147483648, 2147483658), new N2(2147483648, 2147516545), new N2(2147483648, 32896), new N2(0, 2147483649), new N2(2147483648, 2147516424)];
var Xt2 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var zt2 = class extends jn2 {
  constructor(t, n, h) {
    let c2 = 6, i = 0;
    super(t, n, h);
    let g2 = h || {};
    if (this.numRounds !== 1) {
      if (g2.kmacKey || g2.hmacKey)
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
        throw new Error(Nn2);
    }
    this.F = function(w4, I2, E4, j, $4) {
      return function(Y, m2, s, P, S, T4, v) {
        let x, O, C = 0, D = [], b2 = S >>> 5, k = m2 >>> 5;
        for (x = 0;x < k && m2 >= S; x += b2)
          P = Pn2(Y.slice(x, x + b2), P), m2 -= S;
        for (Y = Y.slice(x), m2 %= S;Y.length < b2; )
          Y.push(0);
        for (x = m2 >>> 3, Y[x >> 2] ^= T4 << x % 4 * 8, Y[b2 - 1] ^= 2147483648, P = Pn2(Y, P);32 * D.length < v && (O = P[C % 5][C / 5 | 0], D.push(O.I), !(32 * D.length >= v)); )
          D.push(O.N), C += 1, 64 * C % S == 0 && (Pn2(null, P), C = 0);
        return D;
      }(w4, I2, 0, j, i, c2, $4);
    }, g2.hmacKey && this.k(tn2("hmacKey", g2.hmacKey, this.T));
  }
  O(t, n) {
    let h = function(i) {
      let g2 = i || {};
      return { funcName: tn2("funcName", g2.funcName, 1, { value: [], binLen: 0 }), customization: tn2("Customization", g2.customization, 1, { value: [], binLen: 0 }) };
    }(t || {});
    n && (h.funcName = n);
    let c2 = vn2(xn2(h.funcName), xn2(h.customization));
    if (h.customization.binLen !== 0 || h.funcName.binLen !== 0) {
      let i = en2(c2, this.m >>> 3);
      for (let g2 = 0;g2 < i.length; g2 += this.m >>> 5)
        this.U = this.v(i.slice(g2, g2 + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(t) {
    let n = function(c2) {
      let i = c2 || {};
      return { kmacKey: tn2("kmacKey", i.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: tn2("Customization", i.customization, 1, { value: [], binLen: 0 }) };
    }(t || {});
    this.O(t, n.funcName);
    let h = en2(xn2(n.kmacKey), this.m >>> 3);
    for (let c2 = 0;c2 < h.length; c2 += this.m >>> 5)
      this.U = this.v(h.slice(c2, c2 + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(t) {
    let n = vn2({ value: this.h.slice(), binLen: this.u }, function(h) {
      let c2, i, g2 = 0, w4 = [0, 0], I2 = [4294967295 & h, h / En2 & 2097151];
      for (c2 = 6;c2 >= 0; c2--)
        i = I2[c2 >> 2] >>> 8 * c2 & 255, i === 0 && g2 === 0 || (w4[g2 >> 2] |= i << 8 * g2, g2 += 1);
      return g2 = g2 !== 0 ? g2 : 1, w4[g2 >> 2] |= g2 << 8 * g2, { value: g2 + 1 > 4 ? w4 : [w4[0]], binLen: 8 + 8 * g2 };
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
  let c2 = Dn2.default({ ...t, signature: undefined }), i = n.noTimeWindow ? 0 : Math.floor(Date.now() / (n.timeWindow ?? nt)) + h;
  return new _n2("SHA-256", "TEXT", { encoding: "UTF8" }).update(c2).update(Dn2.default(n)).update(`${i}`).getHash("B64");
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
    let c2 = new Uint8Array([1]);
    this.data.push(c2.buffer);
    let i = JSON.stringify(h ? Jn2(n, { secret: h }) : n), g2 = this.#n.encode(i), w4 = new Uint32Array([g2.byteLength]);
    return this.data.push(w4.buffer), this.data.push(g2.buffer), this;
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
function Jt2(t, n) {
  let [h, c2] = mt2(t, n);
  return [ct.decode(new Uint8Array(t, c2, h)), c2 + h];
}
function qt2(t, n) {
  let [h, c2] = it2(t, n);
  return [ct.decode(new Uint8Array(t, c2, h)), c2 + h];
}
function n8(t, n) {
  let [h, c2] = it2(t, n);
  return [new Blob([new Uint8Array(t, c2, h)], { type: "application/octet-stream" }), c2 + h];
}
function it2(t, n) {
  return [new Uint32Array(t.slice(n, n + Uint32Array.BYTES_PER_ELEMENT), 0, 1)[0], n + Uint32Array.BYTES_PER_ELEMENT];
}
function mt2(t, n) {
  return [new Uint8Array(t, n, 1)[0], n + Uint8Array.BYTES_PER_ELEMENT];
}
async function I8(t) {
  let n = {}, h = {}, c2 = 0, i;
  while (c2 < t.size) {
    i = i ?? await t.arrayBuffer();
    let [g2, w4] = Jt2(i, c2);
    c2 = w4;
    let [I2, E4] = mt2(i, c2);
    switch (c2 = E4, I2) {
      case 1:
        let [j, $4] = qt2(i, c2);
        c2 = $4;
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
  for (let w4 = 0;w4 < h; w4++) {
    let E4 = await t.slice(w4 * 65536, (w4 + 1) * 65536).arrayBuffer(), j = await crypto.subtle.digest("SHA-256", E4), $4 = new Uint8Array(c2.byteLength + j.byteLength);
    $4.set(new Uint8Array(c2), 0), $4.set(new Uint8Array(j), c2.byteLength), c2 = await crypto.subtle.digest("SHA-256", $4.buffer);
  }
  return Array.from(new Uint8Array(c2)).map((w4) => w4.toString(16).padStart(2, "0")).join("");
}
async function tt2(t, n, h = t8) {
  if (typeof t === "string" && t.startsWith("blob:")) {
    let i = await fetch(t).then((w4) => w4.blob());
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
      let w4 = await tt2(i, n, h);
      if (w4 !== t[g2]) {
        if (t === c2)
          t = [...t];
        t[g2] = w4;
      }
    }));
  else if (typeof t === "object" && t)
    await Promise.all(Object.entries(t).map(async ([i, g2]) => {
      let w4 = await tt2(g2, n, h);
      if (w4 !== t[i]) {
        if (t === c2)
          t = { ...t };
        t[i] = w4;
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
    t.forEach((c2, i) => {
      let g2 = ht2(c2, n);
      if (g2 !== c2) {
        if (t === h)
          t = [...t];
        t[i] = g2;
      }
    });
  else if (typeof t === "object" && t)
    Object.entries(t).forEach(([c2, i]) => {
      let g2 = ht2(i, n);
      if (g2 !== i) {
        if (t === h)
          t = { ...t };
        t[c2] = g2;
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
var zJ2 = Object.create;
var { defineProperty: Q02, getPrototypeOf: QJ2, getOwnPropertyNames: ZJ2 } = Object;
var UJ2 = Object.prototype.hasOwnProperty;
var XJ2 = (J22, q22, _) => {
  _ = J22 != null ? zJ2(QJ2(J22)) : {};
  const z = q22 || !J22 || !J22.__esModule ? Q02(_, "default", { value: J22, enumerable: true }) : _;
  for (let Q22 of ZJ2(J22))
    if (!UJ2.call(z, Q22))
      Q02(z, Q22, { get: () => J22[Q22], enumerable: true });
  return z;
};
var T4 = (J22, q22) => () => (q22 || J22((q22 = { exports: {} }).exports, q22), q22.exports);
var F02 = T4((p3, G0) => {
  var p = function(J22) {
    throw { name: "SyntaxError", message: J22, at: M1, text: w1 };
  }, x = function(J22) {
    if (J22 && J22 !== R2)
      p("Expected '" + J22 + "' instead of '" + R2 + "'");
    return R2 = w1.charAt(M1), M1 += 1, R2;
  }, U0 = function() {
    var J22, q22 = "";
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
    if (J22 = Number(q22), !isFinite(J22))
      p("Bad number");
    return J22;
  }, X0 = function() {
    var J22, q22, _ = "", z;
    if (R2 === '"')
      while (x())
        if (R2 === '"')
          return x(), _;
        else if (R2 === "\\")
          if (x(), R2 === "u") {
            z = 0;
            for (q22 = 0;q22 < 4; q22 += 1) {
              if (J22 = parseInt(x(), 16), !isFinite(J22))
                break;
              z = z * 16 + J22;
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
    var J22 = [];
    if (R2 === "[") {
      if (x("["), y22(), R2 === "]")
        return x("]"), J22;
      while (R2) {
        if (J22.push(D1()), y22(), R2 === "]")
          return x("]"), J22;
        x(","), y22();
      }
    }
    p("Bad array");
  }, BJ = function() {
    var J22, q22 = {};
    if (R2 === "{") {
      if (x("{"), y22(), R2 === "}")
        return x("}"), q22;
      while (R2) {
        if (J22 = X0(), y22(), x(":"), Object.prototype.hasOwnProperty.call(q22, J22))
          p('Duplicate key "' + J22 + '"');
        if (q22[J22] = D1(), y22(), R2 === "}")
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
  G0.exports = function(J22, q22) {
    var _;
    if (w1 = J22, M1 = 0, R2 = " ", _ = D1(), y22(), R2)
      p("Syntax error");
    return typeof q22 === "function" ? function z(Q22, Z) {
      var G2, V, U = Q22[Z];
      if (U && typeof U === "object") {
        for (G2 in D1)
          if (Object.prototype.hasOwnProperty.call(U, G2))
            if (V = z(U, G2), typeof V === "undefined")
              delete U[G2];
            else
              U[G2] = V;
      }
      return q22.call(Q22, Z, U);
    }({ "": _ }, "") : _;
  };
});
var V02 = T4((c3, B0) => {
  var m1 = function(J22) {
    return y1.lastIndex = 0, y1.test(J22) ? '"' + J22.replace(y1, function(q22) {
      var _ = VJ[q22];
      return typeof _ === "string" ? _ : "\\u" + ("0000" + q22.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + J22 + '"';
  }, O1 = function(J22, q22) {
    var _, z, Q22, Z, G2 = b2, V, U = q22[J22];
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
        if (b2 += R1, V = [], Object.prototype.toString.apply(U) === "[object Array]") {
          Z = U.length;
          for (_ = 0;_ < Z; _ += 1)
            V[_] = O1(_, U) || "null";
          return Q22 = V.length === 0 ? "[]" : b2 ? `[
` + b2 + V.join(`,
` + b2) + `
` + G2 + "]" : "[" + V.join(",") + "]", b2 = G2, Q22;
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
` + G2 + "}" : "{" + V.join(",") + "}", b2 = G2, Q22;
      default:
    }
  }, y1 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b2, R1, VJ = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, u;
  B0.exports = function(J22, q22, _) {
    var z;
    if (b2 = "", R1 = "", typeof _ === "number")
      for (z = 0;z < _; z += 1)
        R1 += " ";
    else if (typeof _ === "string")
      R1 = _;
    if (u = q22, q22 && typeof q22 !== "function" && (typeof q22 !== "object" || typeof q22.length !== "number"))
      throw new Error("JSON.stringify");
    return O1("", { "": J22 });
  };
});
var K02 = T4((KJ) => {
  KJ.parse = F02();
  KJ.stringify = V02();
});
var L02 = T4((h3, H0) => {
  var WJ = {}.toString;
  H0.exports = Array.isArray || function(J22) {
    return WJ.call(J22) == "[object Array]";
  };
});
var g12 = T4((Y3, M0) => {
  var W0 = Object.prototype.toString;
  M0.exports = function J(q22) {
    var _ = W0.call(q22), z = _ === "[object Arguments]";
    if (!z)
      z = _ !== "[object Array]" && q22 !== null && typeof q22 === "object" && typeof q22.length === "number" && q22.length >= 0 && W0.call(q22.callee) === "[object Function]";
    return z;
  };
});
var j02 = T4((d3, N0) => {
  var T0;
  if (!Object.keys)
    z1 = Object.prototype.hasOwnProperty, p1 = Object.prototype.toString, D0 = g12(), c1 = Object.prototype.propertyIsEnumerable, R0 = !c1.call({ toString: null }, "toString"), O0 = c1.call(function() {}, "prototype"), Q1 = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], A1 = function(J22) {
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
      var _ = q22 !== null && typeof q22 === "object", z = p1.call(q22) === "[object Function]", Q22 = D0(q22), Z = _ && p1.call(q22) === "[object String]", G2 = [];
      if (!_ && !z && !Q22)
        throw new TypeError("Object.keys called on a non-object");
      var V = O0 && z;
      if (Z && q22.length > 0 && !z1.call(q22, 0))
        for (var U = 0;U < q22.length; ++U)
          G2.push(String(U));
      if (Q22 && q22.length > 0)
        for (var K2 = 0;K2 < q22.length; ++K2)
          G2.push(String(K2));
      else
        for (var H2 in q22)
          if (!(V && H2 === "prototype") && z1.call(q22, H2))
            G2.push(String(H2));
      if (R0) {
        var F22 = x0(q22);
        for (var B22 = 0;B22 < Q1.length; ++B22)
          if (!(F22 && Q1[B22] === "constructor") && z1.call(q22, Q1[B22]))
            G2.push(Q1[B22]);
      }
      return G2;
    };
  var z1, p1, D0, c1, R0, O0, Q1, A1, A0, C0, x0;
  N0.exports = T0;
});
var S02 = T4((l3, v0) => {
  var MJ = Array.prototype.slice, DJ = g12(), k0 = Object.keys, C1 = k0 ? function J(q22) {
    return k0(q22);
  } : j02(), I0 = Object.keys;
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
var b02 = T4((o3, P0) => {
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
        var H2 = _.apply(this, $0(z, arguments));
        if (Object(H2) === H2)
          return H2;
        return this;
      }
      return _.apply(q22, $0(z, arguments));
    }, G2 = AJ(0, _.length - z.length), V = [];
    for (var U = 0;U < G2; U++)
      V[U] = "$" + U;
    if (Q22 = Function("binder", "return function (" + TJ(V, ",") + "){ return binder.apply(this,arguments); }")(Z), _.prototype) {
      var K2 = function H() {};
      K2.prototype = _.prototype, Q22.prototype = new K2, K2.prototype = null;
    }
    return Q22;
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
      var G2 = Object.getOwnPropertyDescriptor(q22, _);
      if (G2.value !== Q22 || G2.enumerable !== true)
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
  var A22, $J = w02(), PJ = m02(), bJ = p02(), EJ = u02(), i = u12(), s = U12(), fJ = l02(), _q = Function, l1 = function(J22) {
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
  }() : o1, o = h12()(), yJ = Y12()(), k = Object.getPrototypeOf || (yJ ? function(J22) {
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
  }, qq = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, X1 = Z12(), x1 = d12(), pJ = X1.call(Function.call, Array.prototype.concat), cJ = X1.call(Function.apply, Array.prototype.splice), Jq = X1.call(Function.call, String.prototype.replace), T1 = X1.call(Function.call, String.prototype.slice), uJ = X1.call(Function.call, RegExp.prototype.exec), hJ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, YJ = /\\(\\)?/g, dJ = function J(q22) {
    var _ = T1(q22, 0, 1), z = T1(q22, -1);
    if (_ === "%" && z !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var Q22 = [];
    return Jq(q22, hJ, function(Z, G2, V, U) {
      Q22[Q22.length] = V ? Jq(U, YJ, "$1") : G2 || Z;
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
    var z = dJ(q22), Q22 = z.length > 0 ? z[0] : "", Z = lJ("%" + Q22 + "%", _), G2 = Z.name, V = Z.value, U = false, K2 = Z.alias;
    if (K2)
      Q22 = K2[0], cJ(z, pJ([0, 1], K2));
    for (var H2 = 1, F22 = true;H2 < z.length; H2 += 1) {
      var B22 = z[H2], W2 = T1(B22, 0, 1), L = T1(B22, -1);
      if ((W2 === '"' || W2 === "'" || W2 === "`" || (L === '"' || L === "'" || L === "`")) && W2 !== L)
        throw new i("property names with quotes must have matching quotes");
      if (B22 === "constructor" || !F22)
        U = true;
      if (Q22 += "." + B22, G2 = "%" + Q22 + "%", x1(Y, G2))
        V = Y[G2];
      else if (V != null) {
        if (!(B22 in V)) {
          if (!_)
            throw new s("base intrinsic for " + q22 + " exists, but the property is not available.");
          return;
        }
        if (h && H2 + 1 >= z.length) {
          var D = h(V, B22);
          if (F22 = !!D, F22 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B22];
        } else
          F22 = x1(V, B22), V = V[B22];
        if (F22 && !U)
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
    } catch (J22) {
      N1 = false;
    }
  Qq.exports = N1;
});
var Bq2 = T4((X5, Fq) => {
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
  }() : s1, r = h12()(), sJ = Y12()(), I2 = Object.getPrototypeOf || (sJ ? function(J22) {
    return J22.__proto__;
  } : null), t = {}, iJ = typeof Uint8Array === "undefined" || !I2 ? C : I2(Uint8Array), l = { "%AggregateError%": typeof AggregateError === "undefined" ? C : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? C : ArrayBuffer, "%ArrayIteratorPrototype%": r && I2 ? I2([][Symbol.iterator]()) : C, "%AsyncFromSyncIteratorPrototype%": C, "%AsyncFunction%": t, "%AsyncGenerator%": t, "%AsyncGeneratorFunction%": t, "%AsyncIteratorPrototype%": t, "%Atomics%": typeof Atomics === "undefined" ? C : Atomics, "%BigInt%": typeof BigInt === "undefined" ? C : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? C : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? C : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? C : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? C : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? C : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? C : FinalizationRegistry, "%Function%": Gq, "%GeneratorFunction%": t, "%Int8Array%": typeof Int8Array === "undefined" ? C : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? C : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? C : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": r && I2 ? I2(I2([][Symbol.iterator]())) : C, "%JSON%": typeof JSON === "object" ? JSON : C, "%Map%": typeof Map === "undefined" ? C : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !r || !I2 ? C : I2(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? C : Promise, "%Proxy%": typeof Proxy === "undefined" ? C : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? C : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? C : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !r || !I2 ? C : I2(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? C : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": r && I2 ? I2(""[Symbol.iterator]()) : C, "%Symbol%": r ? Symbol : C, "%SyntaxError%": e, "%ThrowTypeError%": aJ, "%TypedArray%": iJ, "%TypeError%": n, "%Uint8Array%": typeof Uint8Array === "undefined" ? C : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? C : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? C : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? C : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? C : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? C : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? C : WeakSet };
  if (I2)
    try {
      null.error;
    } catch (J22) {
      Zq = I2(I2(J22)), l["%Error.prototype%"] = Zq;
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
      if (Q22 && I2)
        _ = I2(Q22.prototype);
    }
    return l[q22] = _, _;
  }, Uq = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, F1 = Z12(), k1 = d12(), tJ = F1.call(Function.call, Array.prototype.concat), nJ = F1.call(Function.apply, Array.prototype.splice), Xq = F1.call(Function.call, String.prototype.replace), I1 = F1.call(Function.call, String.prototype.slice), eJ = F1.call(Function.call, RegExp.prototype.exec), q3 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, J3 = /\\(\\)?/g, _3 = function J(q22) {
    var _ = I1(q22, 0, 1), z = I1(q22, -1);
    if (_ === "%" && z !== "%")
      throw new e("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new e("invalid intrinsic syntax, expected opening `%`");
    var Q22 = [];
    return Xq(q22, q3, function(Z, G2, V, U) {
      Q22[Q22.length] = V ? Xq(U, J3, "$1") : G2 || Z;
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
    var z = _3(q22), Q22 = z.length > 0 ? z[0] : "", Z = z3("%" + Q22 + "%", _), G2 = Z.name, V = Z.value, U = false, K2 = Z.alias;
    if (K2)
      Q22 = K2[0], nJ(z, tJ([0, 1], K2));
    for (var H2 = 1, F22 = true;H2 < z.length; H2 += 1) {
      var B22 = z[H2], W2 = I1(B22, 0, 1), L = I1(B22, -1);
      if ((W2 === '"' || W2 === "'" || W2 === "`" || (L === '"' || L === "'" || L === "`")) && W2 !== L)
        throw new e("property names with quotes must have matching quotes");
      if (B22 === "constructor" || !F22)
        U = true;
      if (Q22 += "." + B22, G2 = "%" + Q22 + "%", k1(l, G2))
        V = l[G2];
      else if (V != null) {
        if (!(B22 in V)) {
          if (!_)
            throw new n("base intrinsic for " + q22 + " exists, but the property is not available.");
          return;
        }
        if (d && H2 + 1 >= z.length) {
          var D = d(V, B22);
          if (F22 = !!D, F22 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B22];
        } else
          F22 = k1(V, B22), V = V[B22];
        if (F22 && !U)
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
    } catch (J22) {
      v1 = null;
    }
  Vq.exports = v1;
});
var Wq2 = T4((F5, Lq) => {
  var Kq = j12(), Z3 = u12(), q1 = U12(), Hq = i12();
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
    var Q22 = arguments.length > 3 ? arguments[3] : null, Z = arguments.length > 4 ? arguments[4] : null, G2 = arguments.length > 5 ? arguments[5] : null, V = arguments.length > 6 ? arguments[6] : false, U = !!Hq && Hq(q22, _);
    if (Kq)
      Kq(q22, _, { configurable: G2 === null && U ? U.configurable : !G2, enumerable: Q22 === null && U ? U.enumerable : !Q22, value: z, writable: Z === null && U ? U.writable : !Z });
    else if (V || !Q22 && !Z && !G2)
      q22[_] = z;
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
    } catch (q22) {
      return true;
    }
  };
  Dq.exports = Mq;
});
var Tq2 = T4((V5, xq) => {
  var U3 = G12(), Oq = Wq2(), X3 = Rq2()(), Aq = i12(), Cq = U12(), G3 = U3("%Math.floor%");
  xq.exports = function J(q22, _) {
    if (typeof q22 !== "function")
      throw new Cq("`fn` is not a function");
    if (typeof _ !== "number" || _ < 0 || _ > 4294967295 || G3(_) !== _)
      throw new Cq("`length` must be a positive 32-bit integer");
    var z = arguments.length > 2 && !!arguments[2], Q22 = true, Z = true;
    if ("length" in q22 && Aq) {
      var G2 = Aq(q22, "length");
      if (G2 && !G2.configurable)
        Q22 = false;
      if (G2 && !G2.writable)
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
var n12 = T4((K5, S1) => {
  var t1 = Z12(), $1 = G12(), F3 = Tq2(), B3 = U12(), kq = $1("%Function.prototype.apply%"), Iq = $1("%Function.prototype.call%"), vq = $1("%Reflect.apply%", true) || t1.call(Iq, kq), Nq = j12(), V3 = $1("%Math.max%");
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
var bq2 = T4((H5, Pq) => {
  var Sq = G12(), $q = n12(), K3 = $q(Sq("String.prototype.indexOf"));
  Pq.exports = function J(q22, _) {
    var z = Sq(q22, !!_);
    if (typeof z === "function" && K3(q22, ".prototype.") > -1)
      return $q(z);
    return z;
  };
});
var mq2 = T4((L5, yq) => {
  var P1 = (typeof JSON !== "undefined" ? JSON : K02()).stringify, H3 = L02(), L3 = S02(), W3 = n12(), wq = bq2(), Eq = wq("Array.prototype.join"), e1 = wq("Array.prototype.push"), fq = function J(q22, _) {
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
    var Q22 = !!_ && typeof _.cycles === "boolean" && _.cycles, Z = _ && _.replacer ? W3(_.replacer) : M3, G2 = typeof _ === "function" ? _ : _ && _.cmp, V = G2 && function(K2) {
      var H2 = G2.length > 2 && function F(B22) {
        return K2[B22];
      };
      return function(F22, B22) {
        return G2({ key: F22, value: K2[F22] }, { key: B22, value: K2[B22] }, H2 ? { __proto__: null, get: H2 } : undefined);
      };
    }, U = [];
    return function K(H2, F22, B22, W2) {
      var L = z ? `
` + fq(W2, z) : "", D = z ? ": " : ":";
      if (B22 && B22.toJSON && typeof B22.toJSON === "function")
        B22 = B22.toJSON();
      if (B22 = Z(H2, F22, B22), B22 === undefined)
        return;
      if (typeof B22 !== "object" || B22 === null)
        return P1(B22);
      if (H3(B22)) {
        var S = [];
        for (var O = 0;O < B22.length; O++) {
          var v = K(B22, O, B22[O], W2 + 1) || P1(null);
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
        var F22 = N22[O], j = K(B22, F22, B22[F22], W2 + 1);
        if (!j)
          continue;
        var P = P1(F22) + D + j;
        e1(S, L + z + P);
      }
      return U.splice(U.indexOf(B22), 1), "{" + Eq(S, ",") + L + "}";
    }({ "": q22 }, "", q22, 0);
  };
});
var z02 = XJ2(mq2(), 1);
var gq2 = function(J22, q22, _, z) {
  let Q22, Z, G2;
  const V = q22 || [0], U = (_ = _ || 0) >>> 3, K2 = z === -1 ? 3 : 0;
  for (Q22 = 0;Q22 < J22.length; Q22 += 1)
    G2 = Q22 + U, Z = G2 >>> 2, V.length <= Z && V.push(0), V[Z] |= J22[Q22] << 8 * (K2 + z * (G2 % 4));
  return { value: V, binLen: 8 * J22.length + _ };
};
var _12 = function(J22, q22, _) {
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
        return function(G2, V, U, K2) {
          let H2, F22, B22, W2;
          if (G2.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          const L = V || [0], D = (U = U || 0) >>> 3, O = K2 === -1 ? 3 : 0;
          for (H2 = 0;H2 < G2.length; H2 += 2) {
            if (F22 = parseInt(G2.substr(H2, 2), 16), isNaN(F22))
              throw new Error("String of HEX type contains invalid characters");
            for (W2 = (H2 >>> 1) + D, B22 = W2 >>> 2;L.length <= B22; )
              L.push(0);
            L[B22] |= F22 << 8 * (O + K2 * (W2 % 4));
          }
          return { value: L, binLen: 4 * G2.length + U };
        }(z, Q22, Z, _);
      };
    case "TEXT":
      return function(z, Q22, Z) {
        return function(G2, V, U, K2, H2) {
          let F22, B22, W2, L, D, O, v, N22, S = 0;
          const j = U || [0], P = (K2 = K2 || 0) >>> 3;
          if (V === "UTF8")
            for (v = H2 === -1 ? 3 : 0, W2 = 0;W2 < G2.length; W2 += 1)
              for (F22 = G2.charCodeAt(W2), B22 = [], 128 > F22 ? B22.push(F22) : 2048 > F22 ? (B22.push(192 | F22 >>> 6), B22.push(128 | 63 & F22)) : 55296 > F22 || 57344 <= F22 ? B22.push(224 | F22 >>> 12, 128 | F22 >>> 6 & 63, 128 | 63 & F22) : (W2 += 1, F22 = 65536 + ((1023 & F22) << 10 | 1023 & G2.charCodeAt(W2)), B22.push(240 | F22 >>> 18, 128 | F22 >>> 12 & 63, 128 | F22 >>> 6 & 63, 128 | 63 & F22)), L = 0;L < B22.length; L += 1) {
                for (O = S + P, D = O >>> 2;j.length <= D; )
                  j.push(0);
                j[D] |= B22[L] << 8 * (v + H2 * (O % 4)), S += 1;
              }
          else
            for (v = H2 === -1 ? 2 : 0, N22 = V === "UTF16LE" && H2 !== 1 || V !== "UTF16LE" && H2 === 1, W2 = 0;W2 < G2.length; W2 += 1) {
              for (F22 = G2.charCodeAt(W2), N22 === true && (L = 255 & F22, F22 = L << 8 | F22 >>> 8), O = S + P, D = O >>> 2;j.length <= D; )
                j.push(0);
              j[D] |= F22 << 8 * (v + H2 * (O % 4)), S += 2;
            }
          return { value: j, binLen: 8 * S + K2 };
        }(z, q22, Q22, Z, _);
      };
    case "B64":
      return function(z, Q22, Z) {
        return function(G2, V, U, K2) {
          let H2, F22, B22, W2, L, D, O, v = 0;
          const N22 = V || [0], S = (U = U || 0) >>> 3, j = K2 === -1 ? 3 : 0, P = G2.indexOf("=");
          if (G2.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (G2 = G2.replace(/=/g, ""), P !== -1 && P < G2.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (F22 = 0;F22 < G2.length; F22 += 4) {
            for (L = G2.substr(F22, 4), W2 = 0, B22 = 0;B22 < L.length; B22 += 1)
              H2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(L.charAt(B22)), W2 |= H2 << 18 - 6 * B22;
            for (B22 = 0;B22 < L.length - 1; B22 += 1) {
              for (O = v + S, D = O >>> 2;N22.length <= D; )
                N22.push(0);
              N22[D] |= (W2 >>> 16 - 8 * B22 & 255) << 8 * (j + K2 * (O % 4)), v += 1;
            }
          }
          return { value: N22, binLen: 8 * v + U };
        }(z, Q22, Z, _);
      };
    case "BYTES":
      return function(z, Q22, Z) {
        return function(G2, V, U, K2) {
          let H2, F22, B22, W2;
          const L = V || [0], D = (U = U || 0) >>> 3, O = K2 === -1 ? 3 : 0;
          for (F22 = 0;F22 < G2.length; F22 += 1)
            H2 = G2.charCodeAt(F22), W2 = F22 + D, B22 = W2 >>> 2, L.length <= B22 && L.push(0), L[B22] |= H2 << 8 * (O + K2 * (W2 % 4));
          return { value: L, binLen: 8 * G2.length + U };
        }(z, Q22, Z, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (z) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(z, Q22, Z) {
        return function(G2, V, U, K2) {
          return gq2(new Uint8Array(G2), V, U, K2);
        }(z, Q22, Z, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (z) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(z, Q22, Z) {
        return gq2(z, Q22, Z, _);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var pq2 = function(J22, q22, _, z) {
  switch (J22) {
    case "HEX":
      return function(Q22) {
        return function(Z, G2, V, U) {
          let H2, F22, B22 = "";
          const W2 = G2 / 8, L = V === -1 ? 3 : 0;
          for (H2 = 0;H2 < W2; H2 += 1)
            F22 = Z[H2 >>> 2] >>> 8 * (L + V * (H2 % 4)), B22 += "0123456789abcdef".charAt(F22 >>> 4 & 15) + "0123456789abcdef".charAt(15 & F22);
          return U.outputUpper ? B22.toUpperCase() : B22;
        }(Q22, q22, _, z);
      };
    case "B64":
      return function(Q22) {
        return function(Z, G2, V, U) {
          let K2, H2, F22, B22, W2, L = "";
          const D = G2 / 8, O = V === -1 ? 3 : 0;
          for (K2 = 0;K2 < D; K2 += 3)
            for (B22 = K2 + 1 < D ? Z[K2 + 1 >>> 2] : 0, W2 = K2 + 2 < D ? Z[K2 + 2 >>> 2] : 0, F22 = (Z[K2 >>> 2] >>> 8 * (O + V * (K2 % 4)) & 255) << 16 | (B22 >>> 8 * (O + V * ((K2 + 1) % 4)) & 255) << 8 | W2 >>> 8 * (O + V * ((K2 + 2) % 4)) & 255, H2 = 0;H2 < 4; H2 += 1)
              L += 8 * K2 + 6 * H2 <= G2 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(F22 >>> 6 * (3 - H2) & 63) : U.b64Pad;
          return L;
        }(Q22, q22, _, z);
      };
    case "BYTES":
      return function(Q22) {
        return function(Z, G2, V) {
          let U, K2, H2 = "";
          const F22 = G2 / 8, B22 = V === -1 ? 3 : 0;
          for (U = 0;U < F22; U += 1)
            K2 = Z[U >>> 2] >>> 8 * (B22 + V * (U % 4)) & 255, H2 += String.fromCharCode(K2);
          return H2;
        }(Q22, q22, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (Q22) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(Q22) {
        return function(Z, G2, V) {
          let U;
          const K2 = G2 / 8, H2 = new ArrayBuffer(K2), F22 = new Uint8Array(H2), B22 = V === -1 ? 3 : 0;
          for (U = 0;U < K2; U += 1)
            F22[U] = Z[U >>> 2] >>> 8 * (B22 + V * (U % 4)) & 255;
          return H2;
        }(Q22, q22, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (Q22) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(Q22) {
        return function(Z, G2, V) {
          let U;
          const K2 = G2 / 8, H2 = V === -1 ? 3 : 0, F22 = new Uint8Array(K2);
          for (U = 0;U < K2; U += 1)
            F22[U] = Z[U >>> 2] >>> 8 * (H2 + V * (U % 4)) & 255;
          return F22;
        }(Q22, q22, _);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var E12 = function(J22, q22) {
  let _, z;
  const Q22 = J22.binLen >>> 3, Z = q22.binLen >>> 3, G2 = Q22 << 3, V = 4 - Q22 << 3;
  if (Q22 % 4 != 0) {
    for (_ = 0;_ < Z; _ += 4)
      z = Q22 + _ >>> 2, J22.value[z] |= q22.value[_ >>> 2] << G2, J22.value.push(0), J22.value[z + 1] |= q22.value[_ >>> 2] >>> V;
    return (J22.value.length << 2) - 4 >= Z + Q22 && J22.value.pop(), { value: J22.value, binLen: J22.binLen + q22.binLen };
  }
  return { value: J22.value.concat(q22.value), binLen: J22.binLen + q22.binLen };
};
var cq2 = function(J22) {
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
var c2 = function(J22, q22, _, z) {
  const Q22 = J22 + " must include a value and format";
  if (!q22) {
    if (!z)
      throw new Error(Q22);
    return z;
  }
  if (q22.value === undefined || !q22.format)
    throw new Error(Q22);
  return _12(q22.format, q22.encoding || "UTF8", _)(q22.value);
};
var J12 = function(J22, q22) {
  return J22 << q22 | J22 >>> 32 - q22;
};
var f2 = function(J22, q22) {
  return J22 >>> q22 | J22 << 32 - q22;
};
var iq2 = function(J22, q22) {
  return J22 >>> q22;
};
var uq2 = function(J22, q22, _) {
  return J22 ^ q22 ^ _;
};
var rq2 = function(J22, q22, _) {
  return J22 & q22 ^ ~J22 & _;
};
var tq2 = function(J22, q22, _) {
  return J22 & q22 ^ J22 & _ ^ q22 & _;
};
var D32 = function(J22) {
  return f2(J22, 2) ^ f2(J22, 13) ^ f2(J22, 22);
};
var $4 = function(J22, q22) {
  const _ = (65535 & J22) + (65535 & q22);
  return (65535 & (J22 >>> 16) + (q22 >>> 16) + (_ >>> 16)) << 16 | 65535 & _;
};
var R32 = function(J22, q22, _, z) {
  const Q22 = (65535 & J22) + (65535 & q22) + (65535 & _) + (65535 & z);
  return (65535 & (J22 >>> 16) + (q22 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q22 >>> 16)) << 16 | 65535 & Q22;
};
var V12 = function(J22, q22, _, z, Q22) {
  const Z = (65535 & J22) + (65535 & q22) + (65535 & _) + (65535 & z) + (65535 & Q22);
  return (65535 & (J22 >>> 16) + (q22 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q22 >>> 16) + (Z >>> 16)) << 16 | 65535 & Z;
};
var O32 = function(J22) {
  return f2(J22, 7) ^ f2(J22, 18) ^ iq2(J22, 3);
};
var A32 = function(J22) {
  return f2(J22, 6) ^ f2(J22, 11) ^ f2(J22, 25);
};
var C32 = function(J22) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var nq2 = function(J22, q22) {
  let _, z, Q22, Z, G2, V, U;
  const K2 = [];
  for (_ = q22[0], z = q22[1], Q22 = q22[2], Z = q22[3], G2 = q22[4], U = 0;U < 80; U += 1)
    K2[U] = U < 16 ? J22[U] : J12(K2[U - 3] ^ K2[U - 8] ^ K2[U - 14] ^ K2[U - 16], 1), V = U < 20 ? V12(J12(_, 5), rq2(z, Q22, Z), G2, 1518500249, K2[U]) : U < 40 ? V12(J12(_, 5), uq2(z, Q22, Z), G2, 1859775393, K2[U]) : U < 60 ? V12(J12(_, 5), tq2(z, Q22, Z), G2, 2400959708, K2[U]) : V12(J12(_, 5), uq2(z, Q22, Z), G2, 3395469782, K2[U]), G2 = Z, Z = Q22, Q22 = J12(z, 30), z = _, _ = V;
  return q22[0] = $4(_, q22[0]), q22[1] = $4(z, q22[1]), q22[2] = $4(Q22, q22[2]), q22[3] = $4(Z, q22[3]), q22[4] = $4(G2, q22[4]), q22;
};
var x32 = function(J22, q22, _, z) {
  let Q22;
  const Z = 15 + (q22 + 65 >>> 9 << 4), G2 = q22 + _;
  for (;J22.length <= Z; )
    J22.push(0);
  for (J22[q22 >>> 5] |= 128 << 24 - q22 % 32, J22[Z] = 4294967295 & G2, J22[Z - 1] = G2 / K12 | 0, Q22 = 0;Q22 < J22.length; Q22 += 16)
    z = nq2(J22.slice(Q22, Q22 + 16), z);
  return z;
};
var hq2 = function(J22) {
  let q22;
  return q22 = J22 == "SHA-224" ? m2.slice() : g2.slice(), q22;
};
var Yq2 = function(J22, q22) {
  let _, z, Q22, Z, G2, V, U, K2, H2, F22, B22;
  const W2 = [];
  for (_ = q22[0], z = q22[1], Q22 = q22[2], Z = q22[3], G2 = q22[4], V = q22[5], U = q22[6], K2 = q22[7], B22 = 0;B22 < 64; B22 += 1)
    W2[B22] = B22 < 16 ? J22[B22] : R32(f2(L = W2[B22 - 2], 17) ^ f2(L, 19) ^ iq2(L, 10), W2[B22 - 7], O32(W2[B22 - 15]), W2[B22 - 16]), H2 = V12(K2, A32(G2), rq2(G2, V, U), M2[B22], W2[B22]), F22 = $4(D32(_), tq2(_, z, Q22)), K2 = U, U = V, V = G2, G2 = $4(Z, H2), Z = Q22, Q22 = z, z = _, _ = $4(H2, F22);
  var L;
  return q22[0] = $4(_, q22[0]), q22[1] = $4(z, q22[1]), q22[2] = $4(Q22, q22[2]), q22[3] = $4(Z, q22[3]), q22[4] = $4(G2, q22[4]), q22[5] = $4(V, q22[5]), q22[6] = $4(U, q22[6]), q22[7] = $4(K2, q22[7]), q22;
};
var dq2 = function(J22, q22) {
  let _;
  return q22 > 32 ? (_ = 64 - q22, new X2(J22.I << q22 | J22.N >>> _, J22.N << q22 | J22.I >>> _)) : q22 !== 0 ? (_ = 32 - q22, new X2(J22.N << q22 | J22.I >>> _, J22.I << q22 | J22.N >>> _)) : J22;
};
var w4 = function(J22, q22) {
  let _;
  return q22 < 32 ? (_ = 32 - q22, new X2(J22.N >>> q22 | J22.I << _, J22.I >>> q22 | J22.N << _)) : (_ = 64 - q22, new X2(J22.I >>> q22 | J22.N << _, J22.N >>> q22 | J22.I << _));
};
var eq2 = function(J22, q22) {
  return new X2(J22.N >>> q22, J22.I >>> q22 | J22.N << 32 - q22);
};
var j32 = function(J22, q22, _) {
  return new X2(J22.N & q22.N ^ J22.N & _.N ^ q22.N & _.N, J22.I & q22.I ^ J22.I & _.I ^ q22.I & _.I);
};
var k32 = function(J22) {
  const q22 = w4(J22, 28), _ = w4(J22, 34), z = w4(J22, 39);
  return new X2(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var E4 = function(J22, q22) {
  let _, z;
  _ = (65535 & J22.I) + (65535 & q22.I), z = (J22.I >>> 16) + (q22.I >>> 16) + (_ >>> 16);
  const Q22 = (65535 & z) << 16 | 65535 & _;
  return _ = (65535 & J22.N) + (65535 & q22.N) + (z >>> 16), z = (J22.N >>> 16) + (q22.N >>> 16) + (_ >>> 16), new X2((65535 & z) << 16 | 65535 & _, Q22);
};
var I32 = function(J22, q22, _, z) {
  let Q22, Z;
  Q22 = (65535 & J22.I) + (65535 & q22.I) + (65535 & _.I) + (65535 & z.I), Z = (J22.I >>> 16) + (q22.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q22 >>> 16);
  const G2 = (65535 & Z) << 16 | 65535 & Q22;
  return Q22 = (65535 & J22.N) + (65535 & q22.N) + (65535 & _.N) + (65535 & z.N) + (Z >>> 16), Z = (J22.N >>> 16) + (q22.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q22 >>> 16), new X2((65535 & Z) << 16 | 65535 & Q22, G2);
};
var v32 = function(J22, q22, _, z, Q22) {
  let Z, G2;
  Z = (65535 & J22.I) + (65535 & q22.I) + (65535 & _.I) + (65535 & z.I) + (65535 & Q22.I), G2 = (J22.I >>> 16) + (q22.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q22.I >>> 16) + (Z >>> 16);
  const V = (65535 & G2) << 16 | 65535 & Z;
  return Z = (65535 & J22.N) + (65535 & q22.N) + (65535 & _.N) + (65535 & z.N) + (65535 & Q22.N) + (G2 >>> 16), G2 = (J22.N >>> 16) + (q22.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q22.N >>> 16) + (Z >>> 16), new X2((65535 & G2) << 16 | 65535 & Z, V);
};
var B12 = function(J22, q22) {
  return new X2(J22.N ^ q22.N, J22.I ^ q22.I);
};
var S32 = function(J22) {
  const q22 = w4(J22, 19), _ = w4(J22, 61), z = eq2(J22, 6);
  return new X2(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var $32 = function(J22) {
  const q22 = w4(J22, 1), _ = w4(J22, 8), z = eq2(J22, 7);
  return new X2(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var P32 = function(J22) {
  const q22 = w4(J22, 14), _ = w4(J22, 18), z = w4(J22, 41);
  return new X2(q22.N ^ _.N ^ z.N, q22.I ^ _.I ^ z.I);
};
var lq2 = function(J22) {
  return J22 === "SHA-384" ? [new X2(3418070365, m2[0]), new X2(1654270250, m2[1]), new X2(2438529370, m2[2]), new X2(355462360, m2[3]), new X2(1731405415, m2[4]), new X2(41048885895, m2[5]), new X2(3675008525, m2[6]), new X2(1203062813, m2[7])] : [new X2(g2[0], 4089235720), new X2(g2[1], 2227873595), new X2(g2[2], 4271175723), new X2(g2[3], 1595750129), new X2(g2[4], 2917565137), new X2(g2[5], 725511199), new X2(g2[6], 4215389547), new X2(g2[7], 327033209)];
};
var oq2 = function(J22, q22) {
  let _, z, Q22, Z, G2, V, U, K2, H2, F22, B22, W2;
  const L = [];
  for (_ = q22[0], z = q22[1], Q22 = q22[2], Z = q22[3], G2 = q22[4], V = q22[5], U = q22[6], K2 = q22[7], B22 = 0;B22 < 80; B22 += 1)
    B22 < 16 ? (W2 = 2 * B22, L[B22] = new X2(J22[W2], J22[W2 + 1])) : L[B22] = I32(S32(L[B22 - 2]), L[B22 - 7], $32(L[B22 - 15]), L[B22 - 16]), H2 = v32(K2, P32(G2), (O = V, v = U, new X2((D = G2).N & O.N ^ ~D.N & v.N, D.I & O.I ^ ~D.I & v.I)), b32[B22], L[B22]), F22 = E4(k32(_), j32(_, z, Q22)), K2 = U, U = V, V = G2, G2 = E4(Z, H2), Z = Q22, Q22 = z, z = _, _ = E4(H2, F22);
  var D, O, v;
  return q22[0] = E4(_, q22[0]), q22[1] = E4(z, q22[1]), q22[2] = E4(Q22, q22[2]), q22[3] = E4(Z, q22[3]), q22[4] = E4(G2, q22[4]), q22[5] = E4(V, q22[5]), q22[6] = E4(U, q22[6]), q22[7] = E4(K2, q22[7]), q22;
};
var J02 = function(J22) {
  let q22;
  const _ = [];
  for (q22 = 0;q22 < 5; q22 += 1)
    _[q22] = [new X2(0, 0), new X2(0, 0), new X2(0, 0), new X2(0, 0), new X2(0, 0)];
  return _;
};
var y32 = function(J22) {
  let q22;
  const _ = [];
  for (q22 = 0;q22 < 5; q22 += 1)
    _[q22] = J22[q22].slice();
  return _;
};
var b12 = function(J22, q22) {
  let _, z, Q22, Z;
  const G2 = [], V = [];
  if (J22 !== null)
    for (z = 0;z < J22.length; z += 2)
      q22[(z >>> 1) % 5][(z >>> 1) / 5 | 0] = B12(q22[(z >>> 1) % 5][(z >>> 1) / 5 | 0], new X2(J22[z + 1], J22[z]));
  for (_ = 0;_ < 24; _ += 1) {
    for (Z = J02(), z = 0;z < 5; z += 1)
      G2[z] = (U = q22[z][0], K2 = q22[z][1], H2 = q22[z][2], F22 = q22[z][3], B22 = q22[z][4], new X2(U.N ^ K2.N ^ H2.N ^ F22.N ^ B22.N, U.I ^ K2.I ^ H2.I ^ F22.I ^ B22.I));
    for (z = 0;z < 5; z += 1)
      V[z] = B12(G2[(z + 4) % 5], dq2(G2[(z + 1) % 5], 1));
    for (z = 0;z < 5; z += 1)
      for (Q22 = 0;Q22 < 5; Q22 += 1)
        q22[z][Q22] = B12(q22[z][Q22], V[z]);
    for (z = 0;z < 5; z += 1)
      for (Q22 = 0;Q22 < 5; Q22 += 1)
        Z[Q22][(2 * z + 3 * Q22) % 5] = dq2(q22[z][Q22], w32[z][Q22]);
    for (z = 0;z < 5; z += 1)
      for (Q22 = 0;Q22 < 5; Q22 += 1)
        q22[z][Q22] = B12(Z[z][Q22], new X2(~Z[(z + 1) % 5][Q22].N & Z[(z + 2) % 5][Q22].N, ~Z[(z + 1) % 5][Q22].I & Z[(z + 2) % 5][Q22].I));
    q22[0][0] = B12(q22[0][0], f32[_]);
  }
  var U, K2, H2, F22, B22;
  return q22;
};
var qJ2 = function(J22) {
  let q22, _, z = 0;
  const Q22 = [0, 0], Z = [4294967295 & J22, J22 / K12 & 2097151];
  for (q22 = 6;q22 >= 0; q22--)
    _ = Z[q22 >> 2] >>> 8 * q22 & 255, _ === 0 && z === 0 || (Q22[z + 1 >> 2] |= _ << 8 * (z + 1), z += 1);
  return z = z !== 0 ? z : 1, Q22[0] |= z, { value: z + 1 > 4 ? Q22 : [Q22[0]], binLen: 8 + 8 * z };
};
var q02 = function(J22) {
  return E12(qJ2(J22.binLen), J22);
};
var aq2 = function(J22, q22) {
  let _, z = qJ2(q22);
  z = E12(z, J22);
  const Q22 = q22 >>> 2, Z = (Q22 - z.value.length % Q22) % Q22;
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
  constructor(J22, q22, _) {
    const z = _ || {};
    if (this.t = q22, this.i = z.encoding || "UTF8", this.numRounds = z.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = J22, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(J22) {
    let q22, _ = 0;
    const z = this.m >>> 5, Q22 = this.C(J22, this.h, this.u), Z = Q22.binLen, G2 = Q22.value, V = Z >>> 5;
    for (q22 = 0;q22 < V; q22 += z)
      _ + this.m <= Z && (this.U = this.v(G2.slice(q22, q22 + z), this.U), _ += this.m);
    return this.A += _, this.h = G2.slice(_ >>> 5), this.u = Z % this.m, this.l = true, this;
  }
  getHash(J22, q22) {
    let _, z, Q22 = this.R;
    const Z = cq2(q22);
    if (this.K) {
      if (Z.outputLen === -1)
        throw new Error("Output length must be specified in options");
      Q22 = Z.outputLen;
    }
    const G2 = pq2(J22, Q22, this.T, Z);
    if (this.H && this.g)
      return G2(this.g(Z));
    for (z = this.F(this.h.slice(), this.u, this.A, this.L(this.U), Q22), _ = 1;_ < this.numRounds; _ += 1)
      this.K && Q22 % 32 != 0 && (z[z.length - 1] &= 16777215 >>> 24 - Q22 % 32), z = this.F(z, Q22, 0, this.B(this.o), Q22);
    return G2(z);
  }
  setHMACKey(J22, q22, _) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    const z = _12(q22, (_ || {}).encoding || "UTF8", this.T);
    this.k(z(J22));
  }
  k(J22) {
    const q22 = this.m >>> 3, _ = q22 / 4 - 1;
    let z;
    if (this.numRounds !== 1)
      throw new Error(sq2);
    if (this.H)
      throw new Error("MAC key already set");
    for (q22 < J22.binLen / 8 && (J22.value = this.F(J22.value, J22.binLen, 0, this.B(this.o), this.R));J22.value.length <= _; )
      J22.value.push(0);
    for (z = 0;z <= _; z += 1)
      this.S[z] = 909522486 ^ J22.value[z], this.p[z] = 1549556828 ^ J22.value[z];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(J22, q22) {
    const _ = cq2(q22);
    return pq2(J22, this.R, this.T, _)(this.Y());
  }
  Y() {
    let J22;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    const q22 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return J22 = this.v(this.p, this.B(this.o)), J22 = this.F(q22, this.R, this.m, J22, this.R), J22;
  }
}
var T32 = class extends L12 {
  constructor(J22, q22, _) {
    if (J22 !== "SHA-1")
      throw new Error(H12);
    super(J22, q22, _);
    const z = _ || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = _12(this.t, this.i, this.T), this.v = nq2, this.L = function(Q22) {
      return Q22.slice();
    }, this.B = C32, this.F = x32, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, z.hmacKey && this.k(c2("hmacKey", z.hmacKey, this.T));
  }
};
var N32 = class extends L12 {
  constructor(J22, q22, _) {
    if (J22 !== "SHA-224" && J22 !== "SHA-256")
      throw new Error(H12);
    super(J22, q22, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _12(this.t, this.i, this.T), this.v = Yq2, this.L = function(Q22) {
      return Q22.slice();
    }, this.B = hq2, this.F = function(Q22, Z, G2, V) {
      return function(U, K2, H2, F22, B22) {
        let W2, L;
        const D = 15 + (K2 + 65 >>> 9 << 4), O = K2 + H2;
        for (;U.length <= D; )
          U.push(0);
        for (U[K2 >>> 5] |= 128 << 24 - K2 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K12 | 0, W2 = 0;W2 < U.length; W2 += 16)
          F22 = Yq2(U.slice(W2, W2 + 16), F22);
        return L = B22 === "SHA-224" ? [F22[0], F22[1], F22[2], F22[3], F22[4], F22[5], F22[6]] : F22, L;
      }(Q22, Z, G2, V, J22);
    }, this.U = hq2(J22), this.m = 512, this.R = J22 === "SHA-224" ? 224 : 256, this.K = false, z.hmacKey && this.k(c2("hmacKey", z.hmacKey, this.T));
  }
};

class X2 {
  constructor(J22, q22) {
    this.N = J22, this.I = q22;
  }
}
var b32 = [new X2(M2[0], 3609767458), new X2(M2[1], 602891725), new X2(M2[2], 3964484399), new X2(M2[3], 2173295548), new X2(M2[4], 4081628472), new X2(M2[5], 3053834265), new X2(M2[6], 2937671579), new X2(M2[7], 3664609560), new X2(M2[8], 2734883394), new X2(M2[9], 1164996542), new X2(M2[10], 1323610764), new X2(M2[11], 3590304994), new X2(M2[12], 4068182383), new X2(M2[13], 991336113), new X2(M2[14], 633803317), new X2(M2[15], 3479774868), new X2(M2[16], 2666613458), new X2(M2[17], 944711139), new X2(M2[18], 2341262773), new X2(M2[19], 2007800933), new X2(M2[20], 1495990901), new X2(M2[21], 1856431235), new X2(M2[22], 3175218132), new X2(M2[23], 2198950837), new X2(M2[24], 3999719339), new X2(M2[25], 766784016), new X2(M2[26], 2566594879), new X2(M2[27], 3203337956), new X2(M2[28], 1034457026), new X2(M2[29], 2466948901), new X2(M2[30], 3758326383), new X2(M2[31], 168717936), new X2(M2[32], 1188179964), new X2(M2[33], 1546045734), new X2(M2[34], 1522805485), new X2(M2[35], 2643833823), new X2(M2[36], 2343527390), new X2(M2[37], 1014477480), new X2(M2[38], 1206759142), new X2(M2[39], 344077627), new X2(M2[40], 1290863460), new X2(M2[41], 3158454273), new X2(M2[42], 3505952657), new X2(M2[43], 106217008), new X2(M2[44], 3606008344), new X2(M2[45], 1432725776), new X2(M2[46], 1467031594), new X2(M2[47], 851169720), new X2(M2[48], 3100823752), new X2(M2[49], 1363258195), new X2(M2[50], 3750685593), new X2(M2[51], 3785050280), new X2(M2[52], 3318307427), new X2(M2[53], 3812723403), new X2(M2[54], 2003034995), new X2(M2[55], 3602036899), new X2(M2[56], 1575990012), new X2(M2[57], 1125592928), new X2(M2[58], 2716904306), new X2(M2[59], 442776044), new X2(M2[60], 593698344), new X2(M2[61], 3733110249), new X2(M2[62], 2999351573), new X2(M2[63], 3815920427), new X2(3391569614, 3928383900), new X2(3515267271, 566280711), new X2(3940187606, 3454069534), new X2(4118630271, 4000239992), new X2(116418474, 1914138554), new X2(174292421, 2731055270), new X2(289380356, 3203993006), new X2(460393269, 320620315), new X2(685471733, 587496836), new X2(852142971, 1086792851), new X2(1017036298, 365543100), new X2(1126000580, 2618297676), new X2(1288033470, 3409855158), new X2(1501505948, 4234509866), new X2(1607167915, 987167468), new X2(1816402316, 1246189591)];
var E32 = class extends L12 {
  constructor(J22, q22, _) {
    if (J22 !== "SHA-384" && J22 !== "SHA-512")
      throw new Error(H12);
    super(J22, q22, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _12(this.t, this.i, this.T), this.v = oq2, this.L = function(Q22) {
      return Q22.slice();
    }, this.B = lq2, this.F = function(Q22, Z, G2, V) {
      return function(U, K2, H2, F22, B22) {
        let W2, L;
        const D = 31 + (K2 + 129 >>> 10 << 5), O = K2 + H2;
        for (;U.length <= D; )
          U.push(0);
        for (U[K2 >>> 5] |= 128 << 24 - K2 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K12 | 0, W2 = 0;W2 < U.length; W2 += 32)
          F22 = oq2(U.slice(W2, W2 + 32), F22);
        return L = B22 === "SHA-384" ? [F22[0].N, F22[0].I, F22[1].N, F22[1].I, F22[2].N, F22[2].I, F22[3].N, F22[3].I, F22[4].N, F22[4].I, F22[5].N, F22[5].I] : [F22[0].N, F22[0].I, F22[1].N, F22[1].I, F22[2].N, F22[2].I, F22[3].N, F22[3].I, F22[4].N, F22[4].I, F22[5].N, F22[5].I, F22[6].N, F22[6].I, F22[7].N, F22[7].I], L;
      }(Q22, Z, G2, V, J22);
    }, this.U = lq2(J22), this.m = 1024, this.R = J22 === "SHA-384" ? 384 : 512, this.K = false, z.hmacKey && this.k(c2("hmacKey", z.hmacKey, this.T));
  }
};
var f32 = [new X2(0, 1), new X2(0, 32898), new X2(2147483648, 32906), new X2(2147483648, 2147516416), new X2(0, 32907), new X2(0, 2147483649), new X2(2147483648, 2147516545), new X2(2147483648, 32777), new X2(0, 138), new X2(0, 136), new X2(0, 2147516425), new X2(0, 2147483658), new X2(0, 2147516555), new X2(2147483648, 139), new X2(2147483648, 32905), new X2(2147483648, 32771), new X2(2147483648, 32770), new X2(2147483648, 128), new X2(0, 32778), new X2(2147483648, 2147483658), new X2(2147483648, 2147516545), new X2(2147483648, 32896), new X2(0, 2147483649), new X2(2147483648, 2147516424)];
var w32 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var m32 = class extends L12 {
  constructor(J22, q22, _) {
    let z = 6, Q22 = 0;
    super(J22, q22, _);
    const Z = _ || {};
    if (this.numRounds !== 1) {
      if (Z.kmacKey || Z.hmacKey)
        throw new Error(sq2);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = _12(this.t, this.i, this.T), this.v = b12, this.L = y32, this.B = J02, this.U = J02(), this.K = false, J22) {
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
        throw new Error(H12);
    }
    this.F = function(G2, V, U, K2, H2) {
      return function(F22, B22, W2, L, D, O, v) {
        let N22, S, j = 0;
        const P = [], W1 = D >>> 5, _J = B22 >>> 5;
        for (N22 = 0;N22 < _J && B22 >= D; N22 += W1)
          L = b12(F22.slice(N22, N22 + W1), L), B22 -= D;
        for (F22 = F22.slice(N22), B22 %= D;F22.length < W1; )
          F22.push(0);
        for (N22 = B22 >>> 3, F22[N22 >> 2] ^= O << N22 % 4 * 8, F22[W1 - 1] ^= 2147483648, L = b12(F22, L);32 * P.length < v && (S = L[j % 5][j / 5 | 0], P.push(S.I), !(32 * P.length >= v)); )
          P.push(S.N), j += 1, 64 * j % D == 0 && (b12(null, L), j = 0);
        return P;
      }(G2, V, 0, K2, Q22, z, H2);
    }, Z.hmacKey && this.k(c2("hmacKey", Z.hmacKey, this.T));
  }
  O(J22, q22) {
    const _ = function(Q22) {
      const Z = Q22 || {};
      return { funcName: c2("funcName", Z.funcName, 1, { value: [], binLen: 0 }), customization: c2("Customization", Z.customization, 1, { value: [], binLen: 0 }) };
    }(J22 || {});
    q22 && (_.funcName = q22);
    const z = E12(q02(_.funcName), q02(_.customization));
    if (_.customization.binLen !== 0 || _.funcName.binLen !== 0) {
      const Q22 = aq2(z, this.m >>> 3);
      for (let Z = 0;Z < Q22.length; Z += this.m >>> 5)
        this.U = this.v(Q22.slice(Z, Z + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(J22) {
    const q22 = function(z) {
      const Q22 = z || {};
      return { kmacKey: c2("kmacKey", Q22.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: c2("Customization", Q22.customization, 1, { value: [], binLen: 0 }) };
    }(J22 || {});
    this.O(J22, q22.funcName);
    const _ = aq2(q02(q22.kmacKey), this.m >>> 3);
    for (let z = 0;z < _.length; z += this.m >>> 5)
      this.U = this.v(_.slice(z, z + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(J22) {
    const q22 = E12({ value: this.h.slice(), binLen: this.u }, function(_) {
      let z, Q22, Z = 0;
      const G2 = [0, 0], V = [4294967295 & _, _ / K12 & 2097151];
      for (z = 6;z >= 0; z--)
        Q22 = V[z >> 2] >>> 8 * z & 255, Q22 === 0 && Z === 0 || (G2[Z >> 2] |= Q22 << 8 * Z, Z += 1);
      return Z = Z !== 0 ? Z : 1, G2[Z >> 2] |= Z << 8 * Z, { value: Z + 1 > 4 ? G2 : [G2[0]], binLen: 8 + 8 * Z };
    }(J22.outputLen));
    return this.F(q22.value, q22.binLen, this.A, this.L(this.U), J22.outputLen);
  }
};

class _02 {
  constructor(J22, q22, _) {
    if (J22 == "SHA-1")
      this.P = new T32(J22, q22, _);
    else if (J22 == "SHA-224" || J22 == "SHA-256")
      this.P = new N32(J22, q22, _);
    else if (J22 == "SHA-384" || J22 == "SHA-512")
      this.P = new E32(J22, q22, _);
    else {
      if (J22 != "SHA3-224" && J22 != "SHA3-256" && J22 != "SHA3-384" && J22 != "SHA3-512" && J22 != "SHAKE128" && J22 != "SHAKE256" && J22 != "CSHAKE128" && J22 != "CSHAKE256" && J22 != "KMAC128" && J22 != "KMAC256")
        throw new Error(H12);
      this.P = new m32(J22, q22, _);
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
var f12 = function(J22, q22, _ = 0) {
  const z = z02.default({ ...J22, signature: undefined }), Q22 = q22.noTimeWindow ? 0 : Math.floor(Date.now() / (q22.timeWindow ?? JJ2)) + _;
  return new _02("SHA-256", "TEXT", { encoding: "UTF8" }).update(z).update(z02.default(q22)).update(`${Q22}`).getHash("B64");
};
function x52(J22, q22) {
  return (q22.noTimeWindow ? 0 : q22.timeWindow ?? JJ2) ? J22.signature === f12(J22, q22) || J22.signature === f12(J22, q22, -1) : J22.signature === f12(J22, q22);
}
var JJ2 = 5000;

class Processor {
  sendUpdate;
  constructor(sendUpdate) {
    this.sendUpdate = sendUpdate;
  }
  performCycle(context) {
    this.sendUpdateBlob(context);
    return commitUpdates3(context.root, context.properties);
  }
  async sendUpdateBlob(context) {
    const blobs = {};
    const outgoingUpdates = context.outgoingUpdates;
    context.outgoingUpdates = [];
    if (outgoingUpdates?.length) {
      for (let update of outgoingUpdates) {
        update.path = this.#fixPath(update.path, context);
        const previous = getLeafObject3(context.root, update.path.split("/"), 0, false);
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
      if (!context.skipValidation && !x52(payload, { secret })) {
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
    return split.map((part) => translateValue3(part, {
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
    const newValues = this.paths.map((path, index) => updates && (path in updates) ? updates[path] : getLeafObject3(context.root, this.#partsArrays[index], 0, false, context.properties));
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
var zJ3 = Object.create;
var { defineProperty: Q03, getPrototypeOf: QJ3, getOwnPropertyNames: ZJ3 } = Object;
var UJ3 = Object.prototype.hasOwnProperty;
var XJ3 = (J3, q3, _) => {
  _ = J3 != null ? zJ3(QJ3(J3)) : {};
  const z = q3 || !J3 || !J3.__esModule ? Q03(_, "default", { value: J3, enumerable: true }) : _;
  for (let Q3 of ZJ3(J3))
    if (!UJ3.call(z, Q3))
      Q03(z, Q3, { get: () => J3[Q3], enumerable: true });
  return z;
};
var T6 = (J3, q3) => () => (q3 || J3((q3 = { exports: {} }).exports, q3), q3.exports);
var F03 = T6((p3, G0) => {
  var p = function(J3) {
    throw { name: "SyntaxError", message: J3, at: M1, text: w1 };
  }, x = function(J3) {
    if (J3 && J3 !== R2)
      p("Expected '" + J3 + "' instead of '" + R2 + "'");
    return R2 = w1.charAt(M1), M1 += 1, R2;
  }, U0 = function() {
    var J3, q3 = "";
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
    if (J3 = Number(q3), !isFinite(J3))
      p("Bad number");
    return J3;
  }, X0 = function() {
    var J3, q3, _ = "", z;
    if (R2 === '"')
      while (x())
        if (R2 === '"')
          return x(), _;
        else if (R2 === "\\")
          if (x(), R2 === "u") {
            z = 0;
            for (q3 = 0;q3 < 4; q3 += 1) {
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
    var J3 = [];
    if (R2 === "[") {
      if (x("["), y4(), R2 === "]")
        return x("]"), J3;
      while (R2) {
        if (J3.push(D1()), y4(), R2 === "]")
          return x("]"), J3;
        x(","), y4();
      }
    }
    p("Bad array");
  }, BJ = function() {
    var J3, q3 = {};
    if (R2 === "{") {
      if (x("{"), y4(), R2 === "}")
        return x("}"), q3;
      while (R2) {
        if (J3 = X0(), y4(), x(":"), Object.prototype.hasOwnProperty.call(q3, J3))
          p('Duplicate key "' + J3 + '"');
        if (q3[J3] = D1(), y4(), R2 === "}")
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
  G0.exports = function(J3, q3) {
    var _;
    if (w1 = J3, M1 = 0, R2 = " ", _ = D1(), y4(), R2)
      p("Syntax error");
    return typeof q3 === "function" ? function z(Q3, Z) {
      var G2, V, U = Q3[Z];
      if (U && typeof U === "object") {
        for (G2 in D1)
          if (Object.prototype.hasOwnProperty.call(U, G2))
            if (V = z(U, G2), typeof V === "undefined")
              delete U[G2];
            else
              U[G2] = V;
      }
      return q3.call(Q3, Z, U);
    }({ "": _ }, "") : _;
  };
});
var V03 = T6((c3, B0) => {
  var m1 = function(J3) {
    return y1.lastIndex = 0, y1.test(J3) ? '"' + J3.replace(y1, function(q3) {
      var _ = VJ[q3];
      return typeof _ === "string" ? _ : "\\u" + ("0000" + q3.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + J3 + '"';
  }, O1 = function(J3, q3) {
    var _, z, Q3, Z, G2 = b2, V, U = q3[J3];
    if (U && typeof U === "object" && typeof U.toJSON === "function")
      U = U.toJSON(J3);
    if (typeof u === "function")
      U = u.call(q3, J3, U);
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
` + G2 + "]" : "[" + V.join(",") + "]", b2 = G2, Q3;
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
` + G2 + "}" : "{" + V.join(",") + "}", b2 = G2, Q3;
      default:
    }
  }, y1 = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, b2, R1, VJ = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': "\\\"", "\\": "\\\\" }, u;
  B0.exports = function(J3, q3, _) {
    var z;
    if (b2 = "", R1 = "", typeof _ === "number")
      for (z = 0;z < _; z += 1)
        R1 += " ";
    else if (typeof _ === "string")
      R1 = _;
    if (u = q3, q3 && typeof q3 !== "function" && (typeof q3 !== "object" || typeof q3.length !== "number"))
      throw new Error("JSON.stringify");
    return O1("", { "": J3 });
  };
});
var K03 = T6((KJ) => {
  KJ.parse = F03();
  KJ.stringify = V03();
});
var L03 = T6((h3, H0) => {
  var WJ = {}.toString;
  H0.exports = Array.isArray || function(J3) {
    return WJ.call(J3) == "[object Array]";
  };
});
var g13 = T6((Y3, M0) => {
  var W0 = Object.prototype.toString;
  M0.exports = function J(q3) {
    var _ = W0.call(q3), z = _ === "[object Arguments]";
    if (!z)
      z = _ !== "[object Array]" && q3 !== null && typeof q3 === "object" && typeof q3.length === "number" && q3.length >= 0 && W0.call(q3.callee) === "[object Function]";
    return z;
  };
});
var j03 = T6((d3, N0) => {
  var T0;
  if (!Object.keys)
    z1 = Object.prototype.hasOwnProperty, p1 = Object.prototype.toString, D0 = g13(), c1 = Object.prototype.propertyIsEnumerable, R0 = !c1.call({ toString: null }, "toString"), O0 = c1.call(function() {}, "prototype"), Q1 = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], A1 = function(J3) {
      var q3 = J3.constructor;
      return q3 && q3.prototype === J3;
    }, A0 = { $applicationCache: true, $console: true, $external: true, $frame: true, $frameElement: true, $frames: true, $innerHeight: true, $innerWidth: true, $onmozfullscreenchange: true, $onmozfullscreenerror: true, $outerHeight: true, $outerWidth: true, $pageXOffset: true, $pageYOffset: true, $parent: true, $scrollLeft: true, $scrollTop: true, $scrollX: true, $scrollY: true, $self: true, $webkitIndexedDB: true, $webkitStorageInfo: true, $window: true }, C0 = function() {
      if (typeof window === "undefined")
        return false;
      for (var J3 in window)
        try {
          if (!A0["$" + J3] && z1.call(window, J3) && window[J3] !== null && typeof window[J3] === "object")
            try {
              A1(window[J3]);
            } catch (q3) {
              return true;
            }
        } catch (q3) {
          return true;
        }
      return false;
    }(), x0 = function(J3) {
      if (typeof window === "undefined" || !C0)
        return A1(J3);
      try {
        return A1(J3);
      } catch (q3) {
        return false;
      }
    }, T0 = function J(q3) {
      var _ = q3 !== null && typeof q3 === "object", z = p1.call(q3) === "[object Function]", Q3 = D0(q3), Z = _ && p1.call(q3) === "[object String]", G2 = [];
      if (!_ && !z && !Q3)
        throw new TypeError("Object.keys called on a non-object");
      var V = O0 && z;
      if (Z && q3.length > 0 && !z1.call(q3, 0))
        for (var U = 0;U < q3.length; ++U)
          G2.push(String(U));
      if (Q3 && q3.length > 0)
        for (var K2 = 0;K2 < q3.length; ++K2)
          G2.push(String(K2));
      else
        for (var H2 in q3)
          if (!(V && H2 === "prototype") && z1.call(q3, H2))
            G2.push(String(H2));
      if (R0) {
        var F3 = x0(q3);
        for (var B3 = 0;B3 < Q1.length; ++B3)
          if (!(F3 && Q1[B3] === "constructor") && z1.call(q3, Q1[B3]))
            G2.push(Q1[B3]);
      }
      return G2;
    };
  var z1, p1, D0, c1, R0, O0, Q1, A1, A0, C0, x0;
  N0.exports = T0;
});
var S03 = T6((l3, v0) => {
  var MJ = Array.prototype.slice, DJ = g13(), k0 = Object.keys, C1 = k0 ? function J(q3) {
    return k0(q3);
  } : j03(), I0 = Object.keys;
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
var b03 = T6((o3, P0) => {
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
  }, TJ = function(J3, q3) {
    var _ = "";
    for (var z = 0;z < J3.length; z += 1)
      if (_ += J3[z], z + 1 < J3.length)
        _ += q3;
    return _;
  };
  P0.exports = function J(q3) {
    var _ = this;
    if (typeof _ !== "function" || OJ.apply(_) !== CJ)
      throw new TypeError(RJ + _);
    var z = xJ(arguments, 1), Q3, Z = function() {
      if (this instanceof Q3) {
        var H2 = _.apply(this, $0(z, arguments));
        if (Object(H2) === H2)
          return H2;
        return this;
      }
      return _.apply(q3, $0(z, arguments));
    }, G2 = AJ(0, _.length - z.length), V = [];
    for (var U = 0;U < G2; U++)
      V[U] = "$" + U;
    if (Q3 = Function("binder", "return function (" + TJ(V, ",") + "){ return binder.apply(this,arguments); }")(Z), _.prototype) {
      var K2 = function H() {};
      K2.prototype = _.prototype, Q3.prototype = new K2, K2.prototype = null;
    }
    return Q3;
  };
});
var Z13 = T6((a3, E0) => {
  var NJ = b03();
  E0.exports = Function.prototype.bind || NJ;
});
var w03 = T6((s3, f0) => {
  f0.exports = Error;
});
var m03 = T6((i3, y0) => {
  y0.exports = EvalError;
});
var p03 = T6((r3, g0) => {
  g0.exports = RangeError;
});
var u03 = T6((t3, c0) => {
  c0.exports = ReferenceError;
});
var u13 = T6((n3, h0) => {
  h0.exports = SyntaxError;
});
var U13 = T6((e3, Y0) => {
  Y0.exports = TypeError;
});
var l03 = T6((q5, d0) => {
  d0.exports = URIError;
});
var a03 = T6((J5, o0) => {
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
      var G2 = Object.getOwnPropertyDescriptor(q3, _);
      if (G2.value !== Q3 || G2.enumerable !== true)
        return false;
    }
    return true;
  };
});
var h13 = T6((_5, i0) => {
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
var Y13 = T6((z5, t0) => {
  var r0 = { foo: {} }, kJ = Object;
  t0.exports = function J() {
    return { __proto__: r0 }.foo === r0.foo && !({ __proto__: null } instanceof kJ);
  };
});
var d13 = T6((Q5, n0) => {
  var IJ = Function.prototype.call, vJ = Object.prototype.hasOwnProperty, SJ = Z13();
  n0.exports = SJ.call(IJ, vJ);
});
var G13 = T6((Z5, zq) => {
  var A4, $J = w03(), PJ = m03(), bJ = p03(), EJ = u03(), i = u13(), s = U13(), fJ = l03(), _q = Function, l1 = function(J3) {
    try {
      return _q('"use strict"; return (' + J3 + ").constructor;")();
    } catch (q3) {}
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
      } catch (q3) {
        return o1;
      }
    }
  }() : o1, o = h13()(), yJ = Y13()(), k = Object.getPrototypeOf || (yJ ? function(J3) {
    return J3.__proto__;
  } : null), a = {}, mJ = typeof Uint8Array === "undefined" || !k ? A4 : k(Uint8Array), Y = { __proto__: null, "%AggregateError%": typeof AggregateError === "undefined" ? A4 : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? A4 : ArrayBuffer, "%ArrayIteratorPrototype%": o && k ? k([][Symbol.iterator]()) : A4, "%AsyncFromSyncIteratorPrototype%": A4, "%AsyncFunction%": a, "%AsyncGenerator%": a, "%AsyncGeneratorFunction%": a, "%AsyncIteratorPrototype%": a, "%Atomics%": typeof Atomics === "undefined" ? A4 : Atomics, "%BigInt%": typeof BigInt === "undefined" ? A4 : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? A4 : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? A4 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? A4 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": $J, "%eval%": eval, "%EvalError%": PJ, "%Float32Array%": typeof Float32Array === "undefined" ? A4 : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? A4 : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? A4 : FinalizationRegistry, "%Function%": _q, "%GeneratorFunction%": a, "%Int8Array%": typeof Int8Array === "undefined" ? A4 : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? A4 : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? A4 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": o && k ? k(k([][Symbol.iterator]())) : A4, "%JSON%": typeof JSON === "object" ? JSON : A4, "%Map%": typeof Map === "undefined" ? A4 : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !o || !k ? A4 : k(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? A4 : Promise, "%Proxy%": typeof Proxy === "undefined" ? A4 : Proxy, "%RangeError%": bJ, "%ReferenceError%": EJ, "%Reflect%": typeof Reflect === "undefined" ? A4 : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? A4 : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !o || !k ? A4 : k(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? A4 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": o && k ? k(""[Symbol.iterator]()) : A4, "%Symbol%": o ? Symbol : A4, "%SyntaxError%": i, "%ThrowTypeError%": wJ, "%TypedArray%": mJ, "%TypeError%": s, "%Uint8Array%": typeof Uint8Array === "undefined" ? A4 : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? A4 : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? A4 : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? A4 : Uint32Array, "%URIError%": fJ, "%WeakMap%": typeof WeakMap === "undefined" ? A4 : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? A4 : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? A4 : WeakSet };
  if (k)
    try {
      null.error;
    } catch (J3) {
      e0 = k(k(J3)), Y["%Error.prototype%"] = e0;
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
  }, qq = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, X1 = Z13(), x1 = d13(), pJ = X1.call(Function.call, Array.prototype.concat), cJ = X1.call(Function.apply, Array.prototype.splice), Jq = X1.call(Function.call, String.prototype.replace), T1 = X1.call(Function.call, String.prototype.slice), uJ = X1.call(Function.call, RegExp.prototype.exec), hJ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, YJ = /\\(\\)?/g, dJ = function J(q3) {
    var _ = T1(q3, 0, 1), z = T1(q3, -1);
    if (_ === "%" && z !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var Q3 = [];
    return Jq(q3, hJ, function(Z, G2, V, U) {
      Q3[Q3.length] = V ? Jq(U, YJ, "$1") : G2 || Z;
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
    var z = dJ(q3), Q3 = z.length > 0 ? z[0] : "", Z = lJ("%" + Q3 + "%", _), G2 = Z.name, V = Z.value, U = false, K2 = Z.alias;
    if (K2)
      Q3 = K2[0], cJ(z, pJ([0, 1], K2));
    for (var H2 = 1, F3 = true;H2 < z.length; H2 += 1) {
      var B3 = z[H2], W2 = T1(B3, 0, 1), L = T1(B3, -1);
      if ((W2 === '"' || W2 === "'" || W2 === "`" || (L === '"' || L === "'" || L === "`")) && W2 !== L)
        throw new i("property names with quotes must have matching quotes");
      if (B3 === "constructor" || !F3)
        U = true;
      if (Q3 += "." + B3, G2 = "%" + Q3 + "%", x1(Y, G2))
        V = Y[G2];
      else if (V != null) {
        if (!(B3 in V)) {
          if (!_)
            throw new s("base intrinsic for " + q3 + " exists, but the property is not available.");
          return;
        }
        if (h && H2 + 1 >= z.length) {
          var D = h(V, B3);
          if (F3 = !!D, F3 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B3];
        } else
          F3 = x1(V, B3), V = V[B3];
        if (F3 && !U)
          Y[G2] = V;
      }
    }
    return V;
  };
});
var j13 = T6((U5, Qq) => {
  var oJ = G13(), N1 = oJ("%Object.defineProperty%", true) || false;
  if (N1)
    try {
      N1({}, "a", { value: 1 });
    } catch (J3) {
      N1 = false;
    }
  Qq.exports = N1;
});
var Bq3 = T6((X5, Fq) => {
  var C, e = SyntaxError, Gq = Function, n = TypeError, a1 = function(J4) {
    try {
      return Gq('"use strict"; return (' + J4 + ").constructor;")();
    } catch (q4) {}
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
      } catch (q4) {
        return s1;
      }
    }
  }() : s1, r = h13()(), sJ = Y13()(), I2 = Object.getPrototypeOf || (sJ ? function(J4) {
    return J4.__proto__;
  } : null), t = {}, iJ = typeof Uint8Array === "undefined" || !I2 ? C : I2(Uint8Array), l = { "%AggregateError%": typeof AggregateError === "undefined" ? C : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? C : ArrayBuffer, "%ArrayIteratorPrototype%": r && I2 ? I2([][Symbol.iterator]()) : C, "%AsyncFromSyncIteratorPrototype%": C, "%AsyncFunction%": t, "%AsyncGenerator%": t, "%AsyncGeneratorFunction%": t, "%AsyncIteratorPrototype%": t, "%Atomics%": typeof Atomics === "undefined" ? C : Atomics, "%BigInt%": typeof BigInt === "undefined" ? C : BigInt, "%BigInt64Array%": typeof BigInt64Array === "undefined" ? C : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array === "undefined" ? C : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView === "undefined" ? C : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": typeof Float32Array === "undefined" ? C : Float32Array, "%Float64Array%": typeof Float64Array === "undefined" ? C : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? C : FinalizationRegistry, "%Function%": Gq, "%GeneratorFunction%": t, "%Int8Array%": typeof Int8Array === "undefined" ? C : Int8Array, "%Int16Array%": typeof Int16Array === "undefined" ? C : Int16Array, "%Int32Array%": typeof Int32Array === "undefined" ? C : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": r && I2 ? I2(I2([][Symbol.iterator]())) : C, "%JSON%": typeof JSON === "object" ? JSON : C, "%Map%": typeof Map === "undefined" ? C : Map, "%MapIteratorPrototype%": typeof Map === "undefined" || !r || !I2 ? C : I2(new Map()[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise === "undefined" ? C : Promise, "%Proxy%": typeof Proxy === "undefined" ? C : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": typeof Reflect === "undefined" ? C : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set === "undefined" ? C : Set, "%SetIteratorPrototype%": typeof Set === "undefined" || !r || !I2 ? C : I2(new Set()[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? C : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": r && I2 ? I2(""[Symbol.iterator]()) : C, "%Symbol%": r ? Symbol : C, "%SyntaxError%": e, "%ThrowTypeError%": aJ, "%TypedArray%": iJ, "%TypeError%": n, "%Uint8Array%": typeof Uint8Array === "undefined" ? C : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? C : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array === "undefined" ? C : Uint16Array, "%Uint32Array%": typeof Uint32Array === "undefined" ? C : Uint32Array, "%URIError%": URIError, "%WeakMap%": typeof WeakMap === "undefined" ? C : WeakMap, "%WeakRef%": typeof WeakRef === "undefined" ? C : WeakRef, "%WeakSet%": typeof WeakSet === "undefined" ? C : WeakSet };
  if (I2)
    try {
      null.error;
    } catch (J4) {
      Zq = I2(I2(J4)), l["%Error.prototype%"] = Zq;
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
      if (Q3 && I2)
        _ = I2(Q3.prototype);
    }
    return l[q4] = _, _;
  }, Uq = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, F1 = Z13(), k1 = d13(), tJ = F1.call(Function.call, Array.prototype.concat), nJ = F1.call(Function.apply, Array.prototype.splice), Xq = F1.call(Function.call, String.prototype.replace), I1 = F1.call(Function.call, String.prototype.slice), eJ = F1.call(Function.call, RegExp.prototype.exec), q3 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, J3 = /\\(\\)?/g, _3 = function J(q4) {
    var _ = I1(q4, 0, 1), z = I1(q4, -1);
    if (_ === "%" && z !== "%")
      throw new e("invalid intrinsic syntax, expected closing `%`");
    else if (z === "%" && _ !== "%")
      throw new e("invalid intrinsic syntax, expected opening `%`");
    var Q3 = [];
    return Xq(q4, q3, function(Z, G2, V, U) {
      Q3[Q3.length] = V ? Xq(U, J3, "$1") : G2 || Z;
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
    var z = _3(q4), Q3 = z.length > 0 ? z[0] : "", Z = z3("%" + Q3 + "%", _), G2 = Z.name, V = Z.value, U = false, K2 = Z.alias;
    if (K2)
      Q3 = K2[0], nJ(z, tJ([0, 1], K2));
    for (var H2 = 1, F3 = true;H2 < z.length; H2 += 1) {
      var B3 = z[H2], W2 = I1(B3, 0, 1), L = I1(B3, -1);
      if ((W2 === '"' || W2 === "'" || W2 === "`" || (L === '"' || L === "'" || L === "`")) && W2 !== L)
        throw new e("property names with quotes must have matching quotes");
      if (B3 === "constructor" || !F3)
        U = true;
      if (Q3 += "." + B3, G2 = "%" + Q3 + "%", k1(l, G2))
        V = l[G2];
      else if (V != null) {
        if (!(B3 in V)) {
          if (!_)
            throw new n("base intrinsic for " + q4 + " exists, but the property is not available.");
          return;
        }
        if (d && H2 + 1 >= z.length) {
          var D = d(V, B3);
          if (F3 = !!D, F3 && "get" in D && !("originalValue" in D.get))
            V = D.get;
          else
            V = V[B3];
        } else
          F3 = k1(V, B3), V = V[B3];
        if (F3 && !U)
          l[G2] = V;
      }
    }
    return V;
  };
});
var i13 = T6((G5, Vq) => {
  var Q3 = Bq3(), v1 = Q3("%Object.getOwnPropertyDescriptor%", true);
  if (v1)
    try {
      v1([], "length");
    } catch (J3) {
      v1 = null;
    }
  Vq.exports = v1;
});
var Wq3 = T6((F5, Lq) => {
  var Kq = j13(), Z3 = u13(), q1 = U13(), Hq = i13();
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
    var Q3 = arguments.length > 3 ? arguments[3] : null, Z = arguments.length > 4 ? arguments[4] : null, G2 = arguments.length > 5 ? arguments[5] : null, V = arguments.length > 6 ? arguments[6] : false, U = !!Hq && Hq(q3, _);
    if (Kq)
      Kq(q3, _, { configurable: G2 === null && U ? U.configurable : !G2, enumerable: Q3 === null && U ? U.enumerable : !Q3, value: z, writable: Z === null && U ? U.writable : !Z });
    else if (V || !Q3 && !Z && !G2)
      q3[_] = z;
    else
      throw new Z3("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var Rq3 = T6((B5, Dq) => {
  var r1 = j13(), Mq = function J() {
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
var Tq3 = T6((V5, xq) => {
  var U3 = G13(), Oq = Wq3(), X3 = Rq3()(), Aq = i13(), Cq = U13(), G3 = U3("%Math.floor%");
  xq.exports = function J(q3, _) {
    if (typeof q3 !== "function")
      throw new Cq("`fn` is not a function");
    if (typeof _ !== "number" || _ < 0 || _ > 4294967295 || G3(_) !== _)
      throw new Cq("`length` must be a positive 32-bit integer");
    var z = arguments.length > 2 && !!arguments[2], Q3 = true, Z = true;
    if ("length" in q3 && Aq) {
      var G2 = Aq(q3, "length");
      if (G2 && !G2.configurable)
        Q3 = false;
      if (G2 && !G2.writable)
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
var n13 = T6((K5, S1) => {
  var t1 = Z13(), $1 = G13(), F3 = Tq3(), B3 = U13(), kq = $1("%Function.prototype.apply%"), Iq = $1("%Function.prototype.call%"), vq = $1("%Reflect.apply%", true) || t1.call(Iq, kq), Nq = j13(), V3 = $1("%Math.max%");
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
var bq3 = T6((H5, Pq) => {
  var Sq = G13(), $q = n13(), K3 = $q(Sq("String.prototype.indexOf"));
  Pq.exports = function J(q3, _) {
    var z = Sq(q3, !!_);
    if (typeof z === "function" && K3(q3, ".prototype.") > -1)
      return $q(z);
    return z;
  };
});
var mq3 = T6((L5, yq) => {
  var P1 = (typeof JSON !== "undefined" ? JSON : K03()).stringify, H3 = L03(), L3 = S03(), W3 = n13(), wq = bq3(), Eq = wq("Array.prototype.join"), e1 = wq("Array.prototype.push"), fq = function J(q3, _) {
    var z = "";
    for (var Q3 = 0;Q3 < q3; Q3 += 1)
      z += _;
    return z;
  }, M3 = function(J3, q3, _) {
    return _;
  };
  yq.exports = function J(q3) {
    var _ = arguments.length > 1 ? arguments[1] : undefined, z = _ && _.space || "";
    if (typeof z === "number")
      z = fq(z, " ");
    var Q3 = !!_ && typeof _.cycles === "boolean" && _.cycles, Z = _ && _.replacer ? W3(_.replacer) : M3, G2 = typeof _ === "function" ? _ : _ && _.cmp, V = G2 && function(K2) {
      var H2 = G2.length > 2 && function F(B3) {
        return K2[B3];
      };
      return function(F3, B3) {
        return G2({ key: F3, value: K2[F3] }, { key: B3, value: K2[B3] }, H2 ? { __proto__: null, get: H2 } : undefined);
      };
    }, U = [];
    return function K(H2, F3, B3, W2) {
      var L = z ? `
` + fq(W2, z) : "", D = z ? ": " : ":";
      if (B3 && B3.toJSON && typeof B3.toJSON === "function")
        B3 = B3.toJSON();
      if (B3 = Z(H2, F3, B3), B3 === undefined)
        return;
      if (typeof B3 !== "object" || B3 === null)
        return P1(B3);
      if (H3(B3)) {
        var S = [];
        for (var O = 0;O < B3.length; O++) {
          var v = K(B3, O, B3[O], W2 + 1) || P1(null);
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
      var N4 = L3(B3).sort(V && V(B3)), S = [];
      for (var O = 0;O < N4.length; O++) {
        var F3 = N4[O], j = K(B3, F3, B3[F3], W2 + 1);
        if (!j)
          continue;
        var P = P1(F3) + D + j;
        e1(S, L + z + P);
      }
      return U.splice(U.indexOf(B3), 1), "{" + Eq(S, ",") + L + "}";
    }({ "": q3 }, "", q3, 0);
  };
});
var z03 = XJ3(mq3(), 1);
var gq3 = function(J3, q3, _, z) {
  let Q3, Z, G2;
  const V = q3 || [0], U = (_ = _ || 0) >>> 3, K2 = z === -1 ? 3 : 0;
  for (Q3 = 0;Q3 < J3.length; Q3 += 1)
    G2 = Q3 + U, Z = G2 >>> 2, V.length <= Z && V.push(0), V[Z] |= J3[Q3] << 8 * (K2 + z * (G2 % 4));
  return { value: V, binLen: 8 * J3.length + _ };
};
var _13 = function(J3, q3, _) {
  switch (q3) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (J3) {
    case "HEX":
      return function(z, Q3, Z) {
        return function(G2, V, U, K2) {
          let H2, F3, B3, W2;
          if (G2.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          const L = V || [0], D = (U = U || 0) >>> 3, O = K2 === -1 ? 3 : 0;
          for (H2 = 0;H2 < G2.length; H2 += 2) {
            if (F3 = parseInt(G2.substr(H2, 2), 16), isNaN(F3))
              throw new Error("String of HEX type contains invalid characters");
            for (W2 = (H2 >>> 1) + D, B3 = W2 >>> 2;L.length <= B3; )
              L.push(0);
            L[B3] |= F3 << 8 * (O + K2 * (W2 % 4));
          }
          return { value: L, binLen: 4 * G2.length + U };
        }(z, Q3, Z, _);
      };
    case "TEXT":
      return function(z, Q3, Z) {
        return function(G2, V, U, K2, H2) {
          let F3, B3, W2, L, D, O, v, N4, S = 0;
          const j = U || [0], P = (K2 = K2 || 0) >>> 3;
          if (V === "UTF8")
            for (v = H2 === -1 ? 3 : 0, W2 = 0;W2 < G2.length; W2 += 1)
              for (F3 = G2.charCodeAt(W2), B3 = [], 128 > F3 ? B3.push(F3) : 2048 > F3 ? (B3.push(192 | F3 >>> 6), B3.push(128 | 63 & F3)) : 55296 > F3 || 57344 <= F3 ? B3.push(224 | F3 >>> 12, 128 | F3 >>> 6 & 63, 128 | 63 & F3) : (W2 += 1, F3 = 65536 + ((1023 & F3) << 10 | 1023 & G2.charCodeAt(W2)), B3.push(240 | F3 >>> 18, 128 | F3 >>> 12 & 63, 128 | F3 >>> 6 & 63, 128 | 63 & F3)), L = 0;L < B3.length; L += 1) {
                for (O = S + P, D = O >>> 2;j.length <= D; )
                  j.push(0);
                j[D] |= B3[L] << 8 * (v + H2 * (O % 4)), S += 1;
              }
          else
            for (v = H2 === -1 ? 2 : 0, N4 = V === "UTF16LE" && H2 !== 1 || V !== "UTF16LE" && H2 === 1, W2 = 0;W2 < G2.length; W2 += 1) {
              for (F3 = G2.charCodeAt(W2), N4 === true && (L = 255 & F3, F3 = L << 8 | F3 >>> 8), O = S + P, D = O >>> 2;j.length <= D; )
                j.push(0);
              j[D] |= F3 << 8 * (v + H2 * (O % 4)), S += 2;
            }
          return { value: j, binLen: 8 * S + K2 };
        }(z, q3, Q3, Z, _);
      };
    case "B64":
      return function(z, Q3, Z) {
        return function(G2, V, U, K2) {
          let H2, F3, B3, W2, L, D, O, v = 0;
          const N4 = V || [0], S = (U = U || 0) >>> 3, j = K2 === -1 ? 3 : 0, P = G2.indexOf("=");
          if (G2.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (G2 = G2.replace(/=/g, ""), P !== -1 && P < G2.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (F3 = 0;F3 < G2.length; F3 += 4) {
            for (L = G2.substr(F3, 4), W2 = 0, B3 = 0;B3 < L.length; B3 += 1)
              H2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(L.charAt(B3)), W2 |= H2 << 18 - 6 * B3;
            for (B3 = 0;B3 < L.length - 1; B3 += 1) {
              for (O = v + S, D = O >>> 2;N4.length <= D; )
                N4.push(0);
              N4[D] |= (W2 >>> 16 - 8 * B3 & 255) << 8 * (j + K2 * (O % 4)), v += 1;
            }
          }
          return { value: N4, binLen: 8 * v + U };
        }(z, Q3, Z, _);
      };
    case "BYTES":
      return function(z, Q3, Z) {
        return function(G2, V, U, K2) {
          let H2, F3, B3, W2;
          const L = V || [0], D = (U = U || 0) >>> 3, O = K2 === -1 ? 3 : 0;
          for (F3 = 0;F3 < G2.length; F3 += 1)
            H2 = G2.charCodeAt(F3), W2 = F3 + D, B3 = W2 >>> 2, L.length <= B3 && L.push(0), L[B3] |= H2 << 8 * (O + K2 * (W2 % 4));
          return { value: L, binLen: 8 * G2.length + U };
        }(z, Q3, Z, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (z) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(z, Q3, Z) {
        return function(G2, V, U, K2) {
          return gq3(new Uint8Array(G2), V, U, K2);
        }(z, Q3, Z, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (z) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(z, Q3, Z) {
        return gq3(z, Q3, Z, _);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var pq3 = function(J3, q3, _, z) {
  switch (J3) {
    case "HEX":
      return function(Q3) {
        return function(Z, G2, V, U) {
          let H2, F3, B3 = "";
          const W2 = G2 / 8, L = V === -1 ? 3 : 0;
          for (H2 = 0;H2 < W2; H2 += 1)
            F3 = Z[H2 >>> 2] >>> 8 * (L + V * (H2 % 4)), B3 += "0123456789abcdef".charAt(F3 >>> 4 & 15) + "0123456789abcdef".charAt(15 & F3);
          return U.outputUpper ? B3.toUpperCase() : B3;
        }(Q3, q3, _, z);
      };
    case "B64":
      return function(Q3) {
        return function(Z, G2, V, U) {
          let K2, H2, F3, B3, W2, L = "";
          const D = G2 / 8, O = V === -1 ? 3 : 0;
          for (K2 = 0;K2 < D; K2 += 3)
            for (B3 = K2 + 1 < D ? Z[K2 + 1 >>> 2] : 0, W2 = K2 + 2 < D ? Z[K2 + 2 >>> 2] : 0, F3 = (Z[K2 >>> 2] >>> 8 * (O + V * (K2 % 4)) & 255) << 16 | (B3 >>> 8 * (O + V * ((K2 + 1) % 4)) & 255) << 8 | W2 >>> 8 * (O + V * ((K2 + 2) % 4)) & 255, H2 = 0;H2 < 4; H2 += 1)
              L += 8 * K2 + 6 * H2 <= G2 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(F3 >>> 6 * (3 - H2) & 63) : U.b64Pad;
          return L;
        }(Q3, q3, _, z);
      };
    case "BYTES":
      return function(Q3) {
        return function(Z, G2, V) {
          let U, K2, H2 = "";
          const F3 = G2 / 8, B3 = V === -1 ? 3 : 0;
          for (U = 0;U < F3; U += 1)
            K2 = Z[U >>> 2] >>> 8 * (B3 + V * (U % 4)) & 255, H2 += String.fromCharCode(K2);
          return H2;
        }(Q3, q3, _);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (Q3) {
        throw new Error("ARRAYBUFFER not supported by this environment");
      }
      return function(Q3) {
        return function(Z, G2, V) {
          let U;
          const K2 = G2 / 8, H2 = new ArrayBuffer(K2), F3 = new Uint8Array(H2), B3 = V === -1 ? 3 : 0;
          for (U = 0;U < K2; U += 1)
            F3[U] = Z[U >>> 2] >>> 8 * (B3 + V * (U % 4)) & 255;
          return H2;
        }(Q3, q3, _);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (Q3) {
        throw new Error("UINT8ARRAY not supported by this environment");
      }
      return function(Q3) {
        return function(Z, G2, V) {
          let U;
          const K2 = G2 / 8, H2 = V === -1 ? 3 : 0, F3 = new Uint8Array(K2);
          for (U = 0;U < K2; U += 1)
            F3[U] = Z[U >>> 2] >>> 8 * (H2 + V * (U % 4)) & 255;
          return F3;
        }(Q3, q3, _);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
};
var E13 = function(J3, q3) {
  let _, z;
  const Q3 = J3.binLen >>> 3, Z = q3.binLen >>> 3, G2 = Q3 << 3, V = 4 - Q3 << 3;
  if (Q3 % 4 != 0) {
    for (_ = 0;_ < Z; _ += 4)
      z = Q3 + _ >>> 2, J3.value[z] |= q3.value[_ >>> 2] << G2, J3.value.push(0), J3.value[z + 1] |= q3.value[_ >>> 2] >>> V;
    return (J3.value.length << 2) - 4 >= Z + Q3 && J3.value.pop(), { value: J3.value, binLen: J3.binLen + q3.binLen };
  }
  return { value: J3.value.concat(q3.value), binLen: J3.binLen + q3.binLen };
};
var cq3 = function(J3) {
  const q3 = { outputUpper: false, b64Pad: "=", outputLen: -1 }, _ = J3 || {};
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
var c3 = function(J3, q3, _, z) {
  const Q3 = J3 + " must include a value and format";
  if (!q3) {
    if (!z)
      throw new Error(Q3);
    return z;
  }
  if (q3.value === undefined || !q3.format)
    throw new Error(Q3);
  return _13(q3.format, q3.encoding || "UTF8", _)(q3.value);
};
var J13 = function(J3, q3) {
  return J3 << q3 | J3 >>> 32 - q3;
};
var f4 = function(J3, q3) {
  return J3 >>> q3 | J3 << 32 - q3;
};
var iq3 = function(J3, q3) {
  return J3 >>> q3;
};
var uq3 = function(J3, q3, _) {
  return J3 ^ q3 ^ _;
};
var rq3 = function(J3, q3, _) {
  return J3 & q3 ^ ~J3 & _;
};
var tq3 = function(J3, q3, _) {
  return J3 & q3 ^ J3 & _ ^ q3 & _;
};
var D33 = function(J3) {
  return f4(J3, 2) ^ f4(J3, 13) ^ f4(J3, 22);
};
var $6 = function(J3, q3) {
  const _ = (65535 & J3) + (65535 & q3);
  return (65535 & (J3 >>> 16) + (q3 >>> 16) + (_ >>> 16)) << 16 | 65535 & _;
};
var R33 = function(J3, q3, _, z) {
  const Q3 = (65535 & J3) + (65535 & q3) + (65535 & _) + (65535 & z);
  return (65535 & (J3 >>> 16) + (q3 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q3 >>> 16)) << 16 | 65535 & Q3;
};
var V13 = function(J3, q3, _, z, Q3) {
  const Z = (65535 & J3) + (65535 & q3) + (65535 & _) + (65535 & z) + (65535 & Q3);
  return (65535 & (J3 >>> 16) + (q3 >>> 16) + (_ >>> 16) + (z >>> 16) + (Q3 >>> 16) + (Z >>> 16)) << 16 | 65535 & Z;
};
var O33 = function(J3) {
  return f4(J3, 7) ^ f4(J3, 18) ^ iq3(J3, 3);
};
var A33 = function(J3) {
  return f4(J3, 6) ^ f4(J3, 11) ^ f4(J3, 25);
};
var C33 = function(J3) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
};
var nq3 = function(J3, q3) {
  let _, z, Q3, Z, G2, V, U;
  const K2 = [];
  for (_ = q3[0], z = q3[1], Q3 = q3[2], Z = q3[3], G2 = q3[4], U = 0;U < 80; U += 1)
    K2[U] = U < 16 ? J3[U] : J13(K2[U - 3] ^ K2[U - 8] ^ K2[U - 14] ^ K2[U - 16], 1), V = U < 20 ? V13(J13(_, 5), rq3(z, Q3, Z), G2, 1518500249, K2[U]) : U < 40 ? V13(J13(_, 5), uq3(z, Q3, Z), G2, 1859775393, K2[U]) : U < 60 ? V13(J13(_, 5), tq3(z, Q3, Z), G2, 2400959708, K2[U]) : V13(J13(_, 5), uq3(z, Q3, Z), G2, 3395469782, K2[U]), G2 = Z, Z = Q3, Q3 = J13(z, 30), z = _, _ = V;
  return q3[0] = $6(_, q3[0]), q3[1] = $6(z, q3[1]), q3[2] = $6(Q3, q3[2]), q3[3] = $6(Z, q3[3]), q3[4] = $6(G2, q3[4]), q3;
};
var x33 = function(J3, q3, _, z) {
  let Q3;
  const Z = 15 + (q3 + 65 >>> 9 << 4), G2 = q3 + _;
  for (;J3.length <= Z; )
    J3.push(0);
  for (J3[q3 >>> 5] |= 128 << 24 - q3 % 32, J3[Z] = 4294967295 & G2, J3[Z - 1] = G2 / K13 | 0, Q3 = 0;Q3 < J3.length; Q3 += 16)
    z = nq3(J3.slice(Q3, Q3 + 16), z);
  return z;
};
var hq3 = function(J3) {
  let q3;
  return q3 = J3 == "SHA-224" ? m4.slice() : g3.slice(), q3;
};
var Yq3 = function(J3, q3) {
  let _, z, Q3, Z, G2, V, U, K2, H2, F3, B3;
  const W2 = [];
  for (_ = q3[0], z = q3[1], Q3 = q3[2], Z = q3[3], G2 = q3[4], V = q3[5], U = q3[6], K2 = q3[7], B3 = 0;B3 < 64; B3 += 1)
    W2[B3] = B3 < 16 ? J3[B3] : R33(f4(L = W2[B3 - 2], 17) ^ f4(L, 19) ^ iq3(L, 10), W2[B3 - 7], O33(W2[B3 - 15]), W2[B3 - 16]), H2 = V13(K2, A33(G2), rq3(G2, V, U), M3[B3], W2[B3]), F3 = $6(D33(_), tq3(_, z, Q3)), K2 = U, U = V, V = G2, G2 = $6(Z, H2), Z = Q3, Q3 = z, z = _, _ = $6(H2, F3);
  var L;
  return q3[0] = $6(_, q3[0]), q3[1] = $6(z, q3[1]), q3[2] = $6(Q3, q3[2]), q3[3] = $6(Z, q3[3]), q3[4] = $6(G2, q3[4]), q3[5] = $6(V, q3[5]), q3[6] = $6(U, q3[6]), q3[7] = $6(K2, q3[7]), q3;
};
var dq3 = function(J3, q3) {
  let _;
  return q3 > 32 ? (_ = 64 - q3, new X3(J3.I << q3 | J3.N >>> _, J3.N << q3 | J3.I >>> _)) : q3 !== 0 ? (_ = 32 - q3, new X3(J3.N << q3 | J3.I >>> _, J3.I << q3 | J3.N >>> _)) : J3;
};
var w6 = function(J3, q3) {
  let _;
  return q3 < 32 ? (_ = 32 - q3, new X3(J3.N >>> q3 | J3.I << _, J3.I >>> q3 | J3.N << _)) : (_ = 64 - q3, new X3(J3.I >>> q3 | J3.N << _, J3.N >>> q3 | J3.I << _));
};
var eq3 = function(J3, q3) {
  return new X3(J3.N >>> q3, J3.I >>> q3 | J3.N << 32 - q3);
};
var j33 = function(J3, q3, _) {
  return new X3(J3.N & q3.N ^ J3.N & _.N ^ q3.N & _.N, J3.I & q3.I ^ J3.I & _.I ^ q3.I & _.I);
};
var k33 = function(J3) {
  const q3 = w6(J3, 28), _ = w6(J3, 34), z = w6(J3, 39);
  return new X3(q3.N ^ _.N ^ z.N, q3.I ^ _.I ^ z.I);
};
var E6 = function(J3, q3) {
  let _, z;
  _ = (65535 & J3.I) + (65535 & q3.I), z = (J3.I >>> 16) + (q3.I >>> 16) + (_ >>> 16);
  const Q3 = (65535 & z) << 16 | 65535 & _;
  return _ = (65535 & J3.N) + (65535 & q3.N) + (z >>> 16), z = (J3.N >>> 16) + (q3.N >>> 16) + (_ >>> 16), new X3((65535 & z) << 16 | 65535 & _, Q3);
};
var I33 = function(J3, q3, _, z) {
  let Q3, Z;
  Q3 = (65535 & J3.I) + (65535 & q3.I) + (65535 & _.I) + (65535 & z.I), Z = (J3.I >>> 16) + (q3.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q3 >>> 16);
  const G2 = (65535 & Z) << 16 | 65535 & Q3;
  return Q3 = (65535 & J3.N) + (65535 & q3.N) + (65535 & _.N) + (65535 & z.N) + (Z >>> 16), Z = (J3.N >>> 16) + (q3.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q3 >>> 16), new X3((65535 & Z) << 16 | 65535 & Q3, G2);
};
var v33 = function(J3, q3, _, z, Q3) {
  let Z, G2;
  Z = (65535 & J3.I) + (65535 & q3.I) + (65535 & _.I) + (65535 & z.I) + (65535 & Q3.I), G2 = (J3.I >>> 16) + (q3.I >>> 16) + (_.I >>> 16) + (z.I >>> 16) + (Q3.I >>> 16) + (Z >>> 16);
  const V = (65535 & G2) << 16 | 65535 & Z;
  return Z = (65535 & J3.N) + (65535 & q3.N) + (65535 & _.N) + (65535 & z.N) + (65535 & Q3.N) + (G2 >>> 16), G2 = (J3.N >>> 16) + (q3.N >>> 16) + (_.N >>> 16) + (z.N >>> 16) + (Q3.N >>> 16) + (Z >>> 16), new X3((65535 & G2) << 16 | 65535 & Z, V);
};
var B13 = function(J3, q3) {
  return new X3(J3.N ^ q3.N, J3.I ^ q3.I);
};
var S33 = function(J3) {
  const q3 = w6(J3, 19), _ = w6(J3, 61), z = eq3(J3, 6);
  return new X3(q3.N ^ _.N ^ z.N, q3.I ^ _.I ^ z.I);
};
var $33 = function(J3) {
  const q3 = w6(J3, 1), _ = w6(J3, 8), z = eq3(J3, 7);
  return new X3(q3.N ^ _.N ^ z.N, q3.I ^ _.I ^ z.I);
};
var P33 = function(J3) {
  const q3 = w6(J3, 14), _ = w6(J3, 18), z = w6(J3, 41);
  return new X3(q3.N ^ _.N ^ z.N, q3.I ^ _.I ^ z.I);
};
var lq3 = function(J3) {
  return J3 === "SHA-384" ? [new X3(3418070365, m4[0]), new X3(1654270250, m4[1]), new X3(2438529370, m4[2]), new X3(355462360, m4[3]), new X3(1731405415, m4[4]), new X3(41048885895, m4[5]), new X3(3675008525, m4[6]), new X3(1203062813, m4[7])] : [new X3(g3[0], 4089235720), new X3(g3[1], 2227873595), new X3(g3[2], 4271175723), new X3(g3[3], 1595750129), new X3(g3[4], 2917565137), new X3(g3[5], 725511199), new X3(g3[6], 4215389547), new X3(g3[7], 327033209)];
};
var oq3 = function(J3, q3) {
  let _, z, Q3, Z, G2, V, U, K2, H2, F3, B3, W2;
  const L = [];
  for (_ = q3[0], z = q3[1], Q3 = q3[2], Z = q3[3], G2 = q3[4], V = q3[5], U = q3[6], K2 = q3[7], B3 = 0;B3 < 80; B3 += 1)
    B3 < 16 ? (W2 = 2 * B3, L[B3] = new X3(J3[W2], J3[W2 + 1])) : L[B3] = I33(S33(L[B3 - 2]), L[B3 - 7], $33(L[B3 - 15]), L[B3 - 16]), H2 = v33(K2, P33(G2), (O = V, v = U, new X3((D = G2).N & O.N ^ ~D.N & v.N, D.I & O.I ^ ~D.I & v.I)), b33[B3], L[B3]), F3 = E6(k33(_), j33(_, z, Q3)), K2 = U, U = V, V = G2, G2 = E6(Z, H2), Z = Q3, Q3 = z, z = _, _ = E6(H2, F3);
  var D, O, v;
  return q3[0] = E6(_, q3[0]), q3[1] = E6(z, q3[1]), q3[2] = E6(Q3, q3[2]), q3[3] = E6(Z, q3[3]), q3[4] = E6(G2, q3[4]), q3[5] = E6(V, q3[5]), q3[6] = E6(U, q3[6]), q3[7] = E6(K2, q3[7]), q3;
};
var J03 = function(J3) {
  let q3;
  const _ = [];
  for (q3 = 0;q3 < 5; q3 += 1)
    _[q3] = [new X3(0, 0), new X3(0, 0), new X3(0, 0), new X3(0, 0), new X3(0, 0)];
  return _;
};
var y33 = function(J3) {
  let q3;
  const _ = [];
  for (q3 = 0;q3 < 5; q3 += 1)
    _[q3] = J3[q3].slice();
  return _;
};
var b13 = function(J3, q3) {
  let _, z, Q3, Z;
  const G2 = [], V = [];
  if (J3 !== null)
    for (z = 0;z < J3.length; z += 2)
      q3[(z >>> 1) % 5][(z >>> 1) / 5 | 0] = B13(q3[(z >>> 1) % 5][(z >>> 1) / 5 | 0], new X3(J3[z + 1], J3[z]));
  for (_ = 0;_ < 24; _ += 1) {
    for (Z = J03(), z = 0;z < 5; z += 1)
      G2[z] = (U = q3[z][0], K2 = q3[z][1], H2 = q3[z][2], F3 = q3[z][3], B3 = q3[z][4], new X3(U.N ^ K2.N ^ H2.N ^ F3.N ^ B3.N, U.I ^ K2.I ^ H2.I ^ F3.I ^ B3.I));
    for (z = 0;z < 5; z += 1)
      V[z] = B13(G2[(z + 4) % 5], dq3(G2[(z + 1) % 5], 1));
    for (z = 0;z < 5; z += 1)
      for (Q3 = 0;Q3 < 5; Q3 += 1)
        q3[z][Q3] = B13(q3[z][Q3], V[z]);
    for (z = 0;z < 5; z += 1)
      for (Q3 = 0;Q3 < 5; Q3 += 1)
        Z[Q3][(2 * z + 3 * Q3) % 5] = dq3(q3[z][Q3], w33[z][Q3]);
    for (z = 0;z < 5; z += 1)
      for (Q3 = 0;Q3 < 5; Q3 += 1)
        q3[z][Q3] = B13(Z[z][Q3], new X3(~Z[(z + 1) % 5][Q3].N & Z[(z + 2) % 5][Q3].N, ~Z[(z + 1) % 5][Q3].I & Z[(z + 2) % 5][Q3].I));
    q3[0][0] = B13(q3[0][0], f33[_]);
  }
  var U, K2, H2, F3, B3;
  return q3;
};
var qJ3 = function(J3) {
  let q3, _, z = 0;
  const Q3 = [0, 0], Z = [4294967295 & J3, J3 / K13 & 2097151];
  for (q3 = 6;q3 >= 0; q3--)
    _ = Z[q3 >> 2] >>> 8 * q3 & 255, _ === 0 && z === 0 || (Q3[z + 1 >> 2] |= _ << 8 * (z + 1), z += 1);
  return z = z !== 0 ? z : 1, Q3[0] |= z, { value: z + 1 > 4 ? Q3 : [Q3[0]], binLen: 8 + 8 * z };
};
var q03 = function(J3) {
  return E13(qJ3(J3.binLen), J3);
};
var aq3 = function(J3, q3) {
  let _, z = qJ3(q3);
  z = E13(z, J3);
  const Q3 = q3 >>> 2, Z = (Q3 - z.value.length % Q3) % Q3;
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
  constructor(J3, q3, _) {
    const z = _ || {};
    if (this.t = q3, this.i = z.encoding || "UTF8", this.numRounds = z.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
      throw new Error("numRounds must a integer >= 1");
    this.o = J3, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
  }
  update(J3) {
    let q3, _ = 0;
    const z = this.m >>> 5, Q3 = this.C(J3, this.h, this.u), Z = Q3.binLen, G2 = Q3.value, V = Z >>> 5;
    for (q3 = 0;q3 < V; q3 += z)
      _ + this.m <= Z && (this.U = this.v(G2.slice(q3, q3 + z), this.U), _ += this.m);
    return this.A += _, this.h = G2.slice(_ >>> 5), this.u = Z % this.m, this.l = true, this;
  }
  getHash(J3, q3) {
    let _, z, Q3 = this.R;
    const Z = cq3(q3);
    if (this.K) {
      if (Z.outputLen === -1)
        throw new Error("Output length must be specified in options");
      Q3 = Z.outputLen;
    }
    const G2 = pq3(J3, Q3, this.T, Z);
    if (this.H && this.g)
      return G2(this.g(Z));
    for (z = this.F(this.h.slice(), this.u, this.A, this.L(this.U), Q3), _ = 1;_ < this.numRounds; _ += 1)
      this.K && Q3 % 32 != 0 && (z[z.length - 1] &= 16777215 >>> 24 - Q3 % 32), z = this.F(z, Q3, 0, this.B(this.o), Q3);
    return G2(z);
  }
  setHMACKey(J3, q3, _) {
    if (!this.M)
      throw new Error("Variant does not support HMAC");
    if (this.l)
      throw new Error("Cannot set MAC key after calling update");
    const z = _13(q3, (_ || {}).encoding || "UTF8", this.T);
    this.k(z(J3));
  }
  k(J3) {
    const q3 = this.m >>> 3, _ = q3 / 4 - 1;
    let z;
    if (this.numRounds !== 1)
      throw new Error(sq3);
    if (this.H)
      throw new Error("MAC key already set");
    for (q3 < J3.binLen / 8 && (J3.value = this.F(J3.value, J3.binLen, 0, this.B(this.o), this.R));J3.value.length <= _; )
      J3.value.push(0);
    for (z = 0;z <= _; z += 1)
      this.S[z] = 909522486 ^ J3.value[z], this.p[z] = 1549556828 ^ J3.value[z];
    this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
  }
  getHMAC(J3, q3) {
    const _ = cq3(q3);
    return pq3(J3, this.R, this.T, _)(this.Y());
  }
  Y() {
    let J3;
    if (!this.H)
      throw new Error("Cannot call getHMAC without first setting MAC key");
    const q3 = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
    return J3 = this.v(this.p, this.B(this.o)), J3 = this.F(q3, this.R, this.m, J3, this.R), J3;
  }
}
var T33 = class extends L13 {
  constructor(J3, q3, _) {
    if (J3 !== "SHA-1")
      throw new Error(H13);
    super(J3, q3, _);
    const z = _ || {};
    this.M = true, this.g = this.Y, this.T = -1, this.C = _13(this.t, this.i, this.T), this.v = nq3, this.L = function(Q3) {
      return Q3.slice();
    }, this.B = C33, this.F = x33, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, z.hmacKey && this.k(c3("hmacKey", z.hmacKey, this.T));
  }
};
var N33 = class extends L13 {
  constructor(J3, q3, _) {
    if (J3 !== "SHA-224" && J3 !== "SHA-256")
      throw new Error(H13);
    super(J3, q3, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _13(this.t, this.i, this.T), this.v = Yq3, this.L = function(Q3) {
      return Q3.slice();
    }, this.B = hq3, this.F = function(Q3, Z, G2, V) {
      return function(U, K2, H2, F3, B3) {
        let W2, L;
        const D = 15 + (K2 + 65 >>> 9 << 4), O = K2 + H2;
        for (;U.length <= D; )
          U.push(0);
        for (U[K2 >>> 5] |= 128 << 24 - K2 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K13 | 0, W2 = 0;W2 < U.length; W2 += 16)
          F3 = Yq3(U.slice(W2, W2 + 16), F3);
        return L = B3 === "SHA-224" ? [F3[0], F3[1], F3[2], F3[3], F3[4], F3[5], F3[6]] : F3, L;
      }(Q3, Z, G2, V, J3);
    }, this.U = hq3(J3), this.m = 512, this.R = J3 === "SHA-224" ? 224 : 256, this.K = false, z.hmacKey && this.k(c3("hmacKey", z.hmacKey, this.T));
  }
};

class X3 {
  constructor(J3, q3) {
    this.N = J3, this.I = q3;
  }
}
var b33 = [new X3(M3[0], 3609767458), new X3(M3[1], 602891725), new X3(M3[2], 3964484399), new X3(M3[3], 2173295548), new X3(M3[4], 4081628472), new X3(M3[5], 3053834265), new X3(M3[6], 2937671579), new X3(M3[7], 3664609560), new X3(M3[8], 2734883394), new X3(M3[9], 1164996542), new X3(M3[10], 1323610764), new X3(M3[11], 3590304994), new X3(M3[12], 4068182383), new X3(M3[13], 991336113), new X3(M3[14], 633803317), new X3(M3[15], 3479774868), new X3(M3[16], 2666613458), new X3(M3[17], 944711139), new X3(M3[18], 2341262773), new X3(M3[19], 2007800933), new X3(M3[20], 1495990901), new X3(M3[21], 1856431235), new X3(M3[22], 3175218132), new X3(M3[23], 2198950837), new X3(M3[24], 3999719339), new X3(M3[25], 766784016), new X3(M3[26], 2566594879), new X3(M3[27], 3203337956), new X3(M3[28], 1034457026), new X3(M3[29], 2466948901), new X3(M3[30], 3758326383), new X3(M3[31], 168717936), new X3(M3[32], 1188179964), new X3(M3[33], 1546045734), new X3(M3[34], 1522805485), new X3(M3[35], 2643833823), new X3(M3[36], 2343527390), new X3(M3[37], 1014477480), new X3(M3[38], 1206759142), new X3(M3[39], 344077627), new X3(M3[40], 1290863460), new X3(M3[41], 3158454273), new X3(M3[42], 3505952657), new X3(M3[43], 106217008), new X3(M3[44], 3606008344), new X3(M3[45], 1432725776), new X3(M3[46], 1467031594), new X3(M3[47], 851169720), new X3(M3[48], 3100823752), new X3(M3[49], 1363258195), new X3(M3[50], 3750685593), new X3(M3[51], 3785050280), new X3(M3[52], 3318307427), new X3(M3[53], 3812723403), new X3(M3[54], 2003034995), new X3(M3[55], 3602036899), new X3(M3[56], 1575990012), new X3(M3[57], 1125592928), new X3(M3[58], 2716904306), new X3(M3[59], 442776044), new X3(M3[60], 593698344), new X3(M3[61], 3733110249), new X3(M3[62], 2999351573), new X3(M3[63], 3815920427), new X3(3391569614, 3928383900), new X3(3515267271, 566280711), new X3(3940187606, 3454069534), new X3(4118630271, 4000239992), new X3(116418474, 1914138554), new X3(174292421, 2731055270), new X3(289380356, 3203993006), new X3(460393269, 320620315), new X3(685471733, 587496836), new X3(852142971, 1086792851), new X3(1017036298, 365543100), new X3(1126000580, 2618297676), new X3(1288033470, 3409855158), new X3(1501505948, 4234509866), new X3(1607167915, 987167468), new X3(1816402316, 1246189591)];
var E33 = class extends L13 {
  constructor(J3, q3, _) {
    if (J3 !== "SHA-384" && J3 !== "SHA-512")
      throw new Error(H13);
    super(J3, q3, _);
    const z = _ || {};
    this.g = this.Y, this.M = true, this.T = -1, this.C = _13(this.t, this.i, this.T), this.v = oq3, this.L = function(Q3) {
      return Q3.slice();
    }, this.B = lq3, this.F = function(Q3, Z, G2, V) {
      return function(U, K2, H2, F3, B3) {
        let W2, L;
        const D = 31 + (K2 + 129 >>> 10 << 5), O = K2 + H2;
        for (;U.length <= D; )
          U.push(0);
        for (U[K2 >>> 5] |= 128 << 24 - K2 % 32, U[D] = 4294967295 & O, U[D - 1] = O / K13 | 0, W2 = 0;W2 < U.length; W2 += 32)
          F3 = oq3(U.slice(W2, W2 + 32), F3);
        return L = B3 === "SHA-384" ? [F3[0].N, F3[0].I, F3[1].N, F3[1].I, F3[2].N, F3[2].I, F3[3].N, F3[3].I, F3[4].N, F3[4].I, F3[5].N, F3[5].I] : [F3[0].N, F3[0].I, F3[1].N, F3[1].I, F3[2].N, F3[2].I, F3[3].N, F3[3].I, F3[4].N, F3[4].I, F3[5].N, F3[5].I, F3[6].N, F3[6].I, F3[7].N, F3[7].I], L;
      }(Q3, Z, G2, V, J3);
    }, this.U = lq3(J3), this.m = 1024, this.R = J3 === "SHA-384" ? 384 : 512, this.K = false, z.hmacKey && this.k(c3("hmacKey", z.hmacKey, this.T));
  }
};
var f33 = [new X3(0, 1), new X3(0, 32898), new X3(2147483648, 32906), new X3(2147483648, 2147516416), new X3(0, 32907), new X3(0, 2147483649), new X3(2147483648, 2147516545), new X3(2147483648, 32777), new X3(0, 138), new X3(0, 136), new X3(0, 2147516425), new X3(0, 2147483658), new X3(0, 2147516555), new X3(2147483648, 139), new X3(2147483648, 32905), new X3(2147483648, 32771), new X3(2147483648, 32770), new X3(2147483648, 128), new X3(0, 32778), new X3(2147483648, 2147483658), new X3(2147483648, 2147516545), new X3(2147483648, 32896), new X3(0, 2147483649), new X3(2147483648, 2147516424)];
var w33 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
var m33 = class extends L13 {
  constructor(J3, q3, _) {
    let z = 6, Q3 = 0;
    super(J3, q3, _);
    const Z = _ || {};
    if (this.numRounds !== 1) {
      if (Z.kmacKey || Z.hmacKey)
        throw new Error(sq3);
      if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
        throw new Error("Cannot set numRounds for CSHAKE variants");
    }
    switch (this.T = 1, this.C = _13(this.t, this.i, this.T), this.v = b13, this.L = y33, this.B = J03, this.U = J03(), this.K = false, J3) {
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
        throw new Error(H13);
    }
    this.F = function(G2, V, U, K2, H2) {
      return function(F3, B3, W2, L, D, O, v) {
        let N4, S, j = 0;
        const P = [], W1 = D >>> 5, _J = B3 >>> 5;
        for (N4 = 0;N4 < _J && B3 >= D; N4 += W1)
          L = b13(F3.slice(N4, N4 + W1), L), B3 -= D;
        for (F3 = F3.slice(N4), B3 %= D;F3.length < W1; )
          F3.push(0);
        for (N4 = B3 >>> 3, F3[N4 >> 2] ^= O << N4 % 4 * 8, F3[W1 - 1] ^= 2147483648, L = b13(F3, L);32 * P.length < v && (S = L[j % 5][j / 5 | 0], P.push(S.I), !(32 * P.length >= v)); )
          P.push(S.N), j += 1, 64 * j % D == 0 && (b13(null, L), j = 0);
        return P;
      }(G2, V, 0, K2, Q3, z, H2);
    }, Z.hmacKey && this.k(c3("hmacKey", Z.hmacKey, this.T));
  }
  O(J3, q3) {
    const _ = function(Q3) {
      const Z = Q3 || {};
      return { funcName: c3("funcName", Z.funcName, 1, { value: [], binLen: 0 }), customization: c3("Customization", Z.customization, 1, { value: [], binLen: 0 }) };
    }(J3 || {});
    q3 && (_.funcName = q3);
    const z = E13(q03(_.funcName), q03(_.customization));
    if (_.customization.binLen !== 0 || _.funcName.binLen !== 0) {
      const Q3 = aq3(z, this.m >>> 3);
      for (let Z = 0;Z < Q3.length; Z += this.m >>> 5)
        this.U = this.v(Q3.slice(Z, Z + (this.m >>> 5)), this.U), this.A += this.m;
      return 4;
    }
    return 31;
  }
  X(J3) {
    const q3 = function(z) {
      const Q3 = z || {};
      return { kmacKey: c3("kmacKey", Q3.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: c3("Customization", Q3.customization, 1, { value: [], binLen: 0 }) };
    }(J3 || {});
    this.O(J3, q3.funcName);
    const _ = aq3(q03(q3.kmacKey), this.m >>> 3);
    for (let z = 0;z < _.length; z += this.m >>> 5)
      this.U = this.v(_.slice(z, z + (this.m >>> 5)), this.U), this.A += this.m;
    this.H = true;
  }
  _(J3) {
    const q3 = E13({ value: this.h.slice(), binLen: this.u }, function(_) {
      let z, Q3, Z = 0;
      const G2 = [0, 0], V = [4294967295 & _, _ / K13 & 2097151];
      for (z = 6;z >= 0; z--)
        Q3 = V[z >> 2] >>> 8 * z & 255, Q3 === 0 && Z === 0 || (G2[Z >> 2] |= Q3 << 8 * Z, Z += 1);
      return Z = Z !== 0 ? Z : 1, G2[Z >> 2] |= Z << 8 * Z, { value: Z + 1 > 4 ? G2 : [G2[0]], binLen: 8 + 8 * Z };
    }(J3.outputLen));
    return this.F(q3.value, q3.binLen, this.A, this.L(this.U), J3.outputLen);
  }
};

class _03 {
  constructor(J3, q3, _) {
    if (J3 == "SHA-1")
      this.P = new T33(J3, q3, _);
    else if (J3 == "SHA-224" || J3 == "SHA-256")
      this.P = new N33(J3, q3, _);
    else if (J3 == "SHA-384" || J3 == "SHA-512")
      this.P = new E33(J3, q3, _);
    else {
      if (J3 != "SHA3-224" && J3 != "SHA3-256" && J3 != "SHA3-384" && J3 != "SHA3-512" && J3 != "SHAKE128" && J3 != "SHAKE256" && J3 != "CSHAKE128" && J3 != "CSHAKE256" && J3 != "KMAC128" && J3 != "KMAC256")
        throw new Error(H13);
      this.P = new m33(J3, q3, _);
    }
  }
  update(J3) {
    return this.P.update(J3), this;
  }
  getHash(J3, q3) {
    return this.P.getHash(J3, q3);
  }
  setHMACKey(J3, q3, _) {
    this.P.setHMACKey(J3, q3, _);
  }
  getHMAC(J3, q3) {
    return this.P.getHMAC(J3, q3);
  }
}
var f13 = function(J3, q3, _ = 0) {
  const z = z03.default({ ...J3, signature: undefined }), Q3 = q3.noTimeWindow ? 0 : Math.floor(Date.now() / (q3.timeWindow ?? JJ3)) + _;
  return new _03("SHA-256", "TEXT", { encoding: "UTF8" }).update(z).update(z03.default(q3)).update(`${Q3}`).getHash("B64");
};
function x53(J3, q3) {
  return (q3.noTimeWindow ? 0 : q3.timeWindow ?? JJ3) ? J3.signature === f13(J3, q3) || J3.signature === f13(J3, q3, -1) : J3.signature === f13(J3, q3);
}
var JJ3 = 5000;

// ../src/core/Processor.ts
class Processor2 {
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
    const updates = commitUpdates2(context.root, context.properties);
    this.#observerManager.triggerObservers(context, updates);
    return updates;
  }
  sendUpdateBlob(context) {
    if (context.outgoingUpdates?.length) {
      context.outgoingUpdates.forEach((update) => {
        update.path = this.#fixPath(update.path, context);
        const previous = getLeafObject2(context.root, update.path.split("/"), 0, false);
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
      if (!context.skipValidation && !x53(payload, { secret })) {
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
    return split.map((part) => translateValue2(part, {
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
var div = document.body.appendChild(document.createElement("div"));
div.style.whiteSpace = "pre";
div.style.fontFamily = "monospace";
div.style.fontSize = "12px";
var root = {};
var cycleData = createContext(root);
function refreshData() {
  const div2 = document.querySelector("#log-div") ?? document.body.appendChild(document.createElement("div"));
  div2.id = "log-div";
  div2.style.whiteSpace = "pre";
  div2.style.fontFamily = "monospace";
  div2.style.fontSize = "20px";
  div2.textContent = JSON.stringify(root, null, 2);
  const div22 = document.querySelector("#log-div2") ?? document.body.appendChild(document.createElement("div"));
  div22.id = "log-div2";
  div22.style.whiteSpace = "pre";
  div22.style.fontFamily = "monospace";
  div22.style.fontSize = "12px";
  div22.textContent = JSON.stringify(cycleData.outgoingUpdates, null, 2);
}
var socketClient = new SocketClient(location.host, undefined, root);
var processor = new Processor2((blob) => {
  console.log("Updates sent out", blob);
});
processor.observe().onChange(refreshData);
function cycle() {
  processor.performCycle(cycleData);
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
      cycleData.outgoingUpdates = cycleData.outgoingUpdates ?? [];
      cycleData.outgoingUpdates.push({ path: "abc", value: Math.random(), confirmed: 1 });
      refreshData();
    });
  }
}
setupGamePlayer();
export {
  socketClient,
  root
};

//# debugId=A5092C78C8524DAC64756E2164756E21

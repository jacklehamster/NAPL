// ../dist/index.js
function h(t, e, i) {
  let r = Date.now(), n = e?.filter((s) => s.confirmed);
  n?.sort((s, a) => {
    let o = s.confirmed ?? r, c = a.confirmed ?? r;
    if (o !== c)
      return o - c;
    let f = Array.isArray(s.path) ? s.path.join("/") : s.path, y = Array.isArray(a.path) ? a.path.join("/") : a.path;
    return f.localeCompare(y);
  }), n?.forEach((s) => {
    let { path: a, value: o, deleted: c } = s, f = Array.isArray(a) ? a : a.split("/");
    if (i)
      i.add(f);
    let y = l(t, f, 1, true), d = f[f.length - 1];
    if (c)
      delete y[d];
    else if (o !== undefined)
      y[d] = o;
  });
}
function l(t, e, i, r, n) {
  let s = t;
  for (let a = 0;a < e.length - i; a++) {
    let o = n && e[a] === "{self}" ? n : e[a];
    if (o === "{keys}")
      return Object.keys(s);
    if (s[o] === undefined)
      if (r)
        s[o] = {};
      else
        return;
    s = s[o];
  }
  return s;
}
async function C(t) {
  let e;
  if (t instanceof Buffer)
    e = t.toString();
  else if (t instanceof ArrayBuffer)
    e = Buffer.from(t).toString();
  else if (t instanceof Blob)
    e = await t.text();
  else
    throw new Error("Unsupported data type");
  try {
    return JSON.parse(e);
  } catch (i) {
    return console.log(i), null;
  }
}
function b(t, { payloadReceived: e }) {
  t.on("message", async (i) => {
    let r = await C(i);
    if (r)
      e(r);
  });
}

class p {
  room;
  #t = new Map;
  #r;
  #e = [];
  #s = new Set;
  constructor(t) {
    this.room = t;
    this.#r = { clients: {} };
  }
  addRoomChangeListener(t) {
    this.#s.add(t);
  }
  welcomeClient(t) {
    let e = crypto.randomUUID(), i = {};
    this.#t.set(t, i);
    let r = [{ path: ["clients", e], value: i, confirmed: Date.now() }];
    this.shareUpdates(r, t), b(t, { payloadReceived: (s) => {
      if (s.updates)
        this.shareUpdates(s.updates, t);
    } }), t.on("close", () => {
      this.#t.delete(t), this.shareUpdates([{ path: ["clients", e], deleted: true, confirmed: Date.now() }]), console.log(`client ${e} disconnected`), this.#s.forEach((s) => s(this.#r));
    }), h(this.#r, this.#e), this.#e = this.#e.filter((s) => !s.confirmed);
    let n = { myClientId: e, state: this.#r, updates: this.#e };
    return t.send(JSON.stringify(n)), { clientId: e };
  }
  shareUpdates(t, e) {
    let i = t.filter((r) => !r.confirmed);
    this.#a(t), this.#n(t), h(this.#r, Object.values(this.#e)), this.#e = this.#e.filter((r) => !r.confirmed), this.#i(t, (r) => r !== e), this.#i(i, (r) => r === e);
  }
  #n(t) {
    if (t)
      t.forEach((e) => this.#e.push(e));
  }
  #i(t, e) {
    if (!t?.length)
      return;
    let i = JSON.stringify({ updates: t });
    this.#t.keys().forEach((r) => {
      if (e && !e(r))
        return;
      r.send(i);
    });
  }
  #a(t) {
    t.forEach((e) => {
      if ((Array.isArray(e.path) ? e.path : e.path.split("/"))[0] !== "clients")
        e.confirmed = Date.now();
    });
  }
}

class u {
  #t = {};
  constructor(t) {
    this.#r(t);
  }
  #r(t) {
    t.on("listening", () => {
      let e = t.address();
      if (typeof e === "string")
        console.log(`WebSocket server listening on ${e}`);
      else if (e && typeof e === "object") {
        let i = e.address === "::" ? "localhost" : e.address;
        console.log(`WebSocket server listening on ws://${i}:${e.port}`);
      }
    }), t.on("connection", (e, i) => {
      let n = new URLSearchParams(i.url?.split("?")[1]).get("room") ?? "default", s = this.#e(n), { clientId: a } = s.welcomeClient(e);
      console.log(`client ${a} connected in room ${n}.`);
    });
  }
  #e(t) {
    if (!this.#t[t])
      this.#t[t] = new p(t), this.#t[t].addRoomChangeListener((e) => {
        setTimeout(() => {
          if (!Object.values(e.clients).length)
            console.log("closing room", t), delete this.#t[t];
        }, 1e4);
      });
    return this.#t[t];
  }
}

class m {
  socketClient;
  id = "";
  constructor(t) {
    this.socketClient = t;
  }
  observe(t, e) {
    let i = t.map((r) => {
      return ["clients", "self", ...Array.isArray(r) ? r : r.split("/")];
    });
    return this.socketClient.observe(i, e);
  }
  async setData(t, e, i) {
    await this.socketClient.waitForConnection();
    let r = Array.isArray(t) ? t : t.split("/");
    return this.socketClient.setData(["clients", this.id ?? "", ...r], e, i);
  }
  get state() {
    return this.socketClient.state.clients?.[this.id] ?? {};
  }
}

class v {
  socketClient;
  parts;
  constructor(t, e) {
    this.socketClient = e;
    this.parts = Array.isArray(t) ? t : t.split("/");
  }
  observe(t, e) {
    let i = t.map((r) => {
      let n = r === undefined ? [] : Array.isArray(r) ? r : r.split("/");
      return [...this.parts, ...n];
    });
    return this.socketClient.observe(i, e);
  }
  async setData(t, e, i) {
    await this.socketClient.waitForConnection();
    let r = t === undefined ? [] : Array.isArray(t) ? t : t.split("/");
    return this.socketClient.setData([...this.parts, ...r], e, i);
  }
  get state() {
    return l(this.socketClient.state, this.parts, 0, false) ?? {};
  }
}

class g {
  socketClient;
  callback;
  pathArrays;
  observations;
  constructor(t, e, i) {
    this.socketClient = t;
    this.callback = i;
    this.pathArrays = e.map((r) => r === undefined ? [] : Array.isArray(r) ? r : r.split("/")), this.observations = e.map(() => {
      return { previous: undefined, value: undefined };
    });
  }
  triggerCallbackIfChanged() {
    let t = this.pathArrays.map((e) => {
      return l(this.socketClient.state, e, 0, false, this.socketClient.selfData.id);
    });
    if (this.observations.length && this.observations.every((e, i) => {
      let r = t[i];
      if (e.value === r)
        return true;
      if (Array.isArray(e.value) && Array.isArray(r) && e.value.length === r.length && e.value.every((n, s) => n === r[s]))
        return true;
      return false;
    }))
      return;
    this.observations.forEach((e, i) => {
      e.previous = e.value, e.value = t[i];
    }), this.callback(...this.observations);
  }
  close() {
    this.socketClient.removeObserver(this);
  }
}

class A {
  state = {};
  #t;
  #r;
  #e = new Set;
  #s;
  #n = [];
  #i = [];
  selfData = new m(this);
  #a = new Set;
  constructor(t, e) {
    let i = globalThis.location.protocol === "https:";
    this.#s = `${i ? "wss" : "ws"}://${t}${e ? `?room=${e}` : ""}`, this.#o(), globalThis.addEventListener("focus", () => {
      if (!this.#t)
        this.#o();
    });
  }
  async setData(t, e, i = {}) {
    await this.waitForConnection();
    let r = { path: t, value: e, confirmed: i.passive ? undefined : Date.now() };
    if (!i.passive)
      this.#f(r);
    this.#h(r);
  }
  get self() {
    return this.selfData;
  }
  access(t) {
    return new v(t, this);
  }
  observe(t, e) {
    let i = new g(this, t, e);
    return this.#a.add(i), i.triggerCallbackIfChanged(), i;
  }
  async waitForConnection() {
    if (!this.#t)
      this.#o();
    return this.#r;
  }
  async#o() {
    let t = this.#t = new WebSocket(this.#s);
    return this.#r = new Promise((e, i) => {
      t.addEventListener("open", (r) => {
        console.log("Connected to WebSocket server", this.#s);
      }), t.addEventListener("error", (r) => {
        console.error("Error connecting to WebSocket server", r), i(r);
      }), t.addEventListener("message", (r) => {
        let n = JSON.parse(r.data.toString());
        if (n.myClientId)
          this.selfData.id = n.myClientId, this.#r = undefined, e();
        if (n.state)
          this.state = n.state;
        if (n.updates)
          this.#f(...n.updates);
        this.triggerObservers();
      }), t.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server"), this.#t = undefined, this.selfData.id = "";
      });
    });
  }
  #h(...t) {
    if (!this.#n.length)
      requestAnimationFrame(() => this.#l());
    this.#n.push(...t);
  }
  #f(...t) {
    if (!this.#i.length)
      requestAnimationFrame(() => this.#c());
    this.#i.push(...t);
  }
  async#l() {
    await this.waitForConnection();
    let t = { updates: this.#n };
    this.#t?.send(JSON.stringify(t)), this.#n.length = 0;
  }
  async#c() {
    await this.waitForConnection(), this.#e.clear(), h(this.state, this.#i, this.#e), this.#i.length = 0, this.state.lastUpdated = Date.now(), this.triggerObservers();
  }
  triggerObservers() {
    this.#a.forEach((t) => t.triggerCallbackIfChanged());
  }
  removeObserver(t) {
    this.#a.delete(t);
  }
}
// node_modules/json-stringify-pretty-compact/index.js
var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;
function stringify(passedObj, options = {}) {
  const indent = JSON.stringify([1], undefined, options.indent === undefined ? 2 : options.indent).slice(2, -3);
  const maxLength = indent === "" ? Infinity : options.maxLength === undefined ? 80 : options.maxLength;
  let { replacer } = options;
  return function _stringify(obj, currentIndent, reserved) {
    if (obj && typeof obj.toJSON === "function") {
      obj = obj.toJSON();
    }
    const string = JSON.stringify(obj, replacer);
    if (string === undefined) {
      return string;
    }
    const length = maxLength - currentIndent.length - reserved;
    if (string.length <= length) {
      const prettified = string.replace(stringOrChar, (match, stringLiteral) => {
        return stringLiteral || `${match} `;
      });
      if (prettified.length <= length) {
        return prettified;
      }
    }
    if (replacer != null) {
      obj = JSON.parse(string);
      replacer = undefined;
    }
    if (typeof obj === "object" && obj !== null) {
      const nextIndent = currentIndent + indent;
      const items = [];
      let index = 0;
      let start;
      let end;
      if (Array.isArray(obj)) {
        start = "[";
        end = "]";
        const { length: length2 } = obj;
        for (;index < length2; index++) {
          items.push(_stringify(obj[index], nextIndent, index === length2 - 1 ? 0 : 1) || "null");
        }
      } else {
        start = "{";
        end = "}";
        const keys = Object.keys(obj);
        const { length: length2 } = keys;
        for (;index < length2; index++) {
          const key = keys[index];
          const keyPart = `${JSON.stringify(key)}: `;
          const value = _stringify(obj[key], nextIndent, keyPart.length + (index === length2 - 1 ? 0 : 1));
          if (value !== undefined) {
            items.push(keyPart + value);
          }
        }
      }
      if (items.length > 0) {
        return [start, indent + items.join(`,
${nextIndent}`), end].join(`
${currentIndent}`);
      }
    }
    return string;
  }(passedObj, "", 0);
}

// src/index.ts
var name;
function randomName() {
  return name ?? (name = "napl-" + Math.random().toString(36).substring(7));
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
var emoji;
function randomEmoji(forceRandom) {
  return (forceRandom ? null : emoji) ?? (emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
}
export {
  stringify,
  randomName,
  randomEmoji,
  h as commitUpdates,
  A as SocketClient
};

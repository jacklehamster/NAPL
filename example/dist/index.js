// ../dist/index.js
function h(t, e, r) {
  C(e)?.forEach((n) => {
    let { path: s, value: a, deleted: f, push: A, insert: u } = n, d = Array.isArray(s) ? s : s.split("/");
    if (r)
      r.add(d);
    let o = c(t, d, 1, true), l = d[d.length - 1];
    if (f)
      delete o[l];
    else if (a !== undefined)
      if (A) {
        if (!Array.isArray(o[l]))
          o[l] = [];
        o[l] = [...o[l], a];
      } else if (u !== undefined) {
        if (!Array.isArray(o[l]))
          o[l] = [];
        o[l] = [...o[l].slice(0, u), a, ...o[l].slice(u)];
      } else
        o[l] = a;
  });
}
function C(t) {
  let e = t.filter((r) => r.confirmed);
  return e?.sort((r, i) => {
    let n = r.confirmed ?? 0, s = i.confirmed ?? 0;
    if (n !== s)
      return n - s;
    let a = Array.isArray(r.path) ? r.path.join("/") : r.path, f = Array.isArray(i.path) ? i.path.join("/") : i.path;
    return a.localeCompare(f);
  }), e;
}
function c(t, e, r, i, n) {
  let s = t;
  for (let a = 0;a < e.length - r; a++) {
    let f = n && e[a] === "{self}" ? n : e[a];
    if (f === "{keys}")
      return Object.keys(s);
    if (s[f] === undefined)
      if (i)
        s[f] = {};
      else
        return;
    s = s[f];
  }
  return s;
}
async function O(t) {
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
  } catch (r) {
    return console.log(r), null;
  }
}
function b(t, { payloadReceived: e }) {
  t.on("message", async (r) => {
    let i = await O(r);
    if (i)
      e(i);
  });
}

class y {
  room;
  #t = new Map;
  #r;
  #s = new Set;
  #e = [];
  constructor(t) {
    this.room = t;
    this.#r = { clients: {} };
  }
  addRoomChangeListener(t) {
    this.#s.add(t);
  }
  welcomeClient(t) {
    let e = crypto.randomUUID(), r = {};
    this.#t.set(t, r);
    let i = [{ path: ["clients", e], value: r, confirmed: Date.now() }];
    this.#i(i, t), b(t, { payloadReceived: (s) => {
      if (s.updates)
        this.#i(s.updates, t);
    } }), t.on("close", () => {
      this.#t.delete(t), this.#i([{ path: ["clients", e], deleted: true, confirmed: Date.now() }]), console.log(`client ${e} disconnected`), this.#s.forEach((s) => s(this.#r));
    }), h(this.#r, this.#e), this.#e = this.#e.filter((s) => !s.confirmed);
    let n = { myClientId: e, state: this.#r, updates: this.#e };
    return t.send(JSON.stringify(n)), { clientId: e };
  }
  #i(t, e) {
    let r = t.filter((i) => !i.confirmed);
    this.#o(t), this.#a(t), h(this.#r, this.#e), this.#e = this.#e.filter((i) => !i.confirmed), this.#n(t, (i) => i !== e), this.#n(r, (i) => i === e);
  }
  #a(t) {
    if (t)
      t.forEach((e) => this.#e.push(e));
  }
  #n(t, e) {
    if (!t?.length)
      return;
    let r = JSON.stringify({ updates: t });
    this.#t.keys().forEach((i) => {
      if (e && !e(i))
        return;
      i.send(r);
    });
  }
  #o(t) {
    t.forEach((e) => {
      if ((Array.isArray(e.path) ? e.path : e.path.split("/"))[0] !== "clients")
        e.confirmed = Date.now();
    });
  }
}

class p {
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
        let r = e.address === "::" ? "localhost" : e.address;
        console.log(`WebSocket server listening on ws://${r}:${e.port}`);
      }
    }), t.on("connection", (e, r) => {
      let n = new URLSearchParams(r.url?.split("?")[1]).get("room") ?? "default", s = this.#s(n), { clientId: a } = s.welcomeClient(e);
      console.log(`client ${a} connected in room ${n}.`);
    });
  }
  #s(t) {
    if (!this.#t[t])
      this.#t[t] = new y(t), this.#t[t].addRoomChangeListener((e) => {
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
  observe(t) {
    let e = t.map((r) => {
      return ["clients", "self", ...Array.isArray(r) ? r : r.split("/")];
    });
    return this.socketClient.observe(e);
  }
  async setData(t, e, r) {
    await this.socketClient.waitForConnection();
    let i = Array.isArray(t) ? t : t.split("/");
    return this.socketClient.setData(["clients", this.id ?? "", ...i], e, r);
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
  observe(t) {
    let e = t.map((r) => {
      let i = r === undefined ? [] : Array.isArray(r) ? r : r.split("/");
      return [...this.parts, ...i];
    });
    return this.socketClient.observe(e);
  }
  async setData(t, e, r) {
    await this.socketClient.waitForConnection();
    let i = t === undefined ? [] : Array.isArray(t) ? t : t.split("/");
    return this.socketClient.setData([...this.parts, ...i], e, r);
  }
  get state() {
    return c(this.socketClient.state, this.parts, 0, false) ?? {};
  }
}

class g {
  socketClient;
  pathArrays;
  observations;
  changeCallback;
  addedElementsCallback;
  deletedElementsCallback;
  constructor(t, e) {
    this.socketClient = t;
    this.pathArrays = e.map((r) => r === undefined ? [] : Array.isArray(r) ? r : r.split("/")), this.observations = e.map(() => {
      return { previous: undefined, value: undefined };
    }), requestAnimationFrame(() => {
      this.triggerIfChanged();
    });
  }
  onChange(t) {
    return this.changeCallback = t, this;
  }
  onElementsAdded(t) {
    return this.addedElementsCallback = t, this;
  }
  onElementsDeleted(t) {
    return this.deletedElementsCallback = t, this;
  }
  #t() {
    let t = this.pathArrays.map((e) => {
      return c(this.socketClient.state, e, 0, false, this.socketClient.clientId);
    });
    if (this.observations.length && this.observations.every((e, r) => {
      let i = t[r];
      if (e.value === i)
        return true;
      if (Array.isArray(e.value) && Array.isArray(i) && e.value.length === i.length && e.value.every((n, s) => n === i[s]))
        return true;
      return false;
    }))
      return false;
    return this.observations.forEach((e, r) => {
      e.previous = e.value, e.value = t[r];
    }), true;
  }
  triggerIfChanged() {
    if (!this.#t())
      return;
    if (this.changeCallback?.(...this.observations), this.addedElementsCallback && this.observations.some((t) => Array.isArray(t.value))) {
      let t = false, e = this.observations.map((r) => {
        if (Array.isArray(r.value)) {
          let i = new Set(Array.isArray(r.previous) ? r.previous : []), n = r.value.filter((s) => !i.has(s));
          if (n.length)
            t = true;
          return n;
        }
      });
      if (t)
        this.addedElementsCallback(...e);
    }
    if (this.deletedElementsCallback && this.observations.some((t) => Array.isArray(t.previous))) {
      let t = false, e = this.observations.map((r) => {
        if (Array.isArray(r.previous)) {
          let i = new Set(Array.isArray(r.value) ? r.value : []), n = r.previous.filter((s) => !i.has(s));
          if (n.length)
            t = true;
          return n;
        }
      });
      if (t)
        this.deletedElementsCallback(...e);
    }
  }
  close() {
    this.socketClient.removeObserver(this);
  }
}

class D {
  state = {};
  #t;
  #r;
  #s = new Set;
  #e;
  #i = [];
  #a = [];
  #n = new m(this);
  #o = new Set;
  constructor(t, e) {
    let r = globalThis.location.protocol === "https:";
    this.#e = `${r ? "wss" : "ws"}://${t}${e ? `?room=${e}` : ""}`, this.#l(), globalThis.addEventListener("focus", () => {
      if (!this.#t)
        this.#l();
    });
  }
  async setData(t, e, r = {}) {
    await this.waitForConnection();
    let i = { path: t, value: e, confirmed: r.passive ? undefined : Date.now(), push: r.push, insert: r.insert };
    if (!r.passive)
      this.#f(i);
    this.#h(i);
  }
  get clientId() {
    return this.#n.id;
  }
  get self() {
    return this.#n;
  }
  access(t) {
    return new v(t, this);
  }
  observe(t) {
    let e = new g(this, t);
    return this.#o.add(e), e;
  }
  async waitForConnection() {
    if (!this.#t)
      this.#l();
    return this.#r;
  }
  async#l() {
    let t = this.#t = new WebSocket(this.#e);
    return this.#r = new Promise((e, r) => {
      t.addEventListener("open", () => {
        console.log("Connected to WebSocket server", this.#e);
      }), t.addEventListener("error", (i) => {
        console.error("Error connecting to WebSocket server", i), r(i);
      }), t.addEventListener("message", (i) => {
        let n = JSON.parse(i.data.toString());
        if (n.myClientId)
          this.#n.id = n.myClientId, this.#r = undefined, e();
        if (n.state)
          this.state = n.state;
        if (n.updates)
          this.#f(...n.updates);
        this.triggerObservers();
      }), t.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server"), this.#t = undefined, this.#n.id = "";
      });
    });
  }
  #h(...t) {
    if (!this.#i.length)
      requestAnimationFrame(() => this.#c());
    this.#i.push(...t);
  }
  #f(...t) {
    if (!this.#a.length)
      requestAnimationFrame(() => this.#d());
    this.#a.push(...t);
  }
  async#c() {
    await this.waitForConnection();
    let t = { updates: this.#i };
    this.#t?.send(JSON.stringify(t)), this.#i.length = 0;
  }
  async#d() {
    await this.waitForConnection(), this.#s.clear(), h(this.state, this.#a, this.#s), this.#a.length = 0, this.state.lastUpdated = Date.now(), this.triggerObservers();
  }
  triggerObservers() {
    this.#o.forEach((t) => t.triggerIfChanged());
  }
  removeObserver(t) {
    this.#o.delete(t);
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
var config = await fetch("../config.json").then((response) => response.json());
function getSocketClient() {
  const urlVars = new URLSearchParams(location.search);
  const room = urlVars.get("room") ?? undefined;
  return new D(config.websocketHost ?? location.host, room);
}
var socketClient = getSocketClient();
window.socketClient = socketClient;
export {
  stringify,
  socketClient,
  randomName,
  randomEmoji,
  h as commitUpdates,
  D as SocketClient
};

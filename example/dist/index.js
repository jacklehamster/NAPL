// ../dist/index.js
function f(i, o) {
  let n = Date.now(), t = o?.filter((r) => r.confirmed);
  return t?.sort((r, e) => (r.timestamp ?? n) - (e.timestamp ?? n)), t?.forEach((r) => {
    let { path: e, value: a, deleted: c } = r, s = Array.isArray(e) ? e : e.split("/"), m = y(i, s), l = s[s.length - 1];
    if (c)
      delete m[l];
    else if (a !== undefined)
      m[l] = a;
  }), o?.filter((r) => !r.confirmed);
}
function y(i, o) {
  let n = i;
  for (let t = 0;t < o.length - 1; t++)
    n = n[o[t]] ?? (n[o[t]] = {});
  return n;
}
async function g(i) {
  let o;
  if (i instanceof Buffer)
    o = i.toString();
  else if (i instanceof ArrayBuffer)
    o = Buffer.from(i).toString();
  else if (i instanceof Blob)
    o = await i.text();
  else
    throw new Error("Unsupported data type");
  try {
    return JSON.parse(o);
  } catch (n) {
    return console.log(n), null;
  }
}
function h(i, { payloadReceived: o }) {
  i.on("message", async (n) => {
    let t = await g(n);
    if (t)
      o(t);
  });
}

class b {
  #i = new Map;
  #t = { clients: {} };
  #o = [];
  constructor(i) {
    this.#s(i);
  }
  shareUpdates(i, o) {
    let n = i.filter((t) => !t.confirmed);
    this.#e(i), this.#n(i), this.#o = f(this.#t, Object.values(this.#o)), this.#r(i, (t) => t !== o), this.#r(n, (t) => t === o);
  }
  #n(i) {
    if (i)
      i.forEach((o) => {
        let n = Array.isArray(o.path) ? o.path.join("/") : o.path;
        this.#o.push(o);
      });
  }
  #r(i, o) {
    if (!i?.length)
      return;
    let n = JSON.stringify({ updates: i });
    this.#i.keys().forEach((t) => {
      if (o && !o(t))
        return;
      t.send(n);
    });
  }
  #e(i) {
    i.forEach((o) => {
      if ((Array.isArray(o.path) ? o.path : o.path.split("/"))[0] !== "clients")
        o.confirmed = true;
    });
  }
  #s(i) {
    i.on("connection", (o, n) => {
      let t = new URLSearchParams(n.url?.split("?")[1]);
      console.log("client connected", t);
      let r = crypto.randomUUID(), e = { owner: r };
      this.#i.set(o, e);
      let a = [{ path: ["clients", r], value: e, confirmed: true }];
      this.shareUpdates(a, o), h(o, { payloadReceived: (s) => {
        if (s.updates)
          this.shareUpdates(s.updates, o);
      } }), o.on("close", () => {
        this.#i.delete(o), this.shareUpdates([{ path: ["clients", r], deleted: true, confirmed: true }]), console.log(`client ${r} disconnected`);
      }), this.#o = f(this.#t, this.#o);
      let c = { myClientId: r, state: this.#t, updates: this.#o };
      o.send(JSON.stringify(c));
    });
  }
}

class v {
  clientId = "";
  state = {};
  socket;
  connectionUrl;
  pendingUpdates = [];
  #i;
  constructor(i, o = "default") {
    let n = globalThis.location.protocol === "https:";
    this.connectionUrl = `${n ? "wss" : "ws"}://${i}?room=${o}`, this.#o(), globalThis.addEventListener("focus", () => {
      if (!this.socket)
        this.#o();
    });
  }
  async#t() {
    if (!this.socket)
      this.#o();
    return this.#i;
  }
  async#o() {
    let i = this.socket = new WebSocket(this.connectionUrl);
    return this.#i = new Promise((o, n) => {
      i.addEventListener("open", (t) => {
        console.log("Connected to WebSocket server");
      }), i.addEventListener("error", (t) => {
        console.error("Error connecting to WebSocket server", t), n(t);
      }), i.addEventListener("message", (t) => {
        let r = JSON.parse(t.data.toString());
        if (r.myClientId)
          this.clientId = r.myClientId, this.#i = undefined, o();
        if (r.state)
          this.state = r.state;
        if (r.updates)
          f(this.state, r.updates);
      }), i.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server"), this.socket = undefined;
      });
    });
  }
  async setSelfData(i, o) {
    await this.#t();
    let n = Array.isArray(i) ? i : i.split("/");
    return this.setData(["clients", this.clientId, ...n], o);
  }
  async setData(i, o, n = {}) {
    await this.#t();
    let t = { timestamp: Date.now(), path: i, value: o, confirmed: !n.passive };
    if (!n.passive)
      f(this.state, [t]);
    if (!this.pendingUpdates.length)
      requestAnimationFrame(() => {
        this.#n();
      });
    this.pendingUpdates.push(t);
  }
  async#n() {
    await this.#t();
    let i = { updates: this.pendingUpdates };
    this.socket?.send(JSON.stringify(i)), this.pendingUpdates.length = 0;
  }
}

// src/index.ts
function randomName() {
  return "napl-" + Math.random().toString(36).substring(7);
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
function randomEmoji() {
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  return emoji;
}
export {
  randomName,
  randomEmoji,
  f as commitUpdates,
  v as SocketClient
};

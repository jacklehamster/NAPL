// ../dist/index.js
function n(o, r) {
  let e = Date.now(), t = r?.filter((s) => s.confirmed);
  return t?.sort((s, i) => (s.timestamp ?? e) - (i.timestamp ?? e)), t?.forEach((s) => {
    let { path: i, value: c, deleted: y } = s, f = Array.isArray(i) ? i : i.split("/"), a = g(o, f), h = f[f.length - 1];
    if (y)
      delete a[h];
    else if (c !== undefined)
      a[h] = c;
  }), r?.filter((s) => !s.confirmed);
}
function g(o, r) {
  let e = o;
  for (let t = 0;t < r.length - 1; t++)
    e = e[r[t]] ?? (e[r[t]] = {});
  return e;
}
async function v(o) {
  let r;
  if (o instanceof Buffer)
    r = o.toString();
  else if (o instanceof ArrayBuffer)
    r = Buffer.from(o).toString();
  else if (o instanceof Blob)
    r = await o.text();
  else
    throw new Error("Unsupported data type");
  try {
    return JSON.parse(r);
  } catch (e) {
    return console.log(e), null;
  }
}
function l(o, { payloadReceived: r }) {
  o.on("message", async (e) => {
    let t = await v(e);
    if (t)
      r(t);
  });
}

class m {
  room;
  #o = new Map;
  #r;
  #t = [];
  #e = new Set;
  constructor(o) {
    this.room = o;
    this.#r = { clients: {} };
  }
  addRoomChangeListener(o) {
    this.#e.add(o);
  }
  welcomeClient(o) {
    let r = crypto.randomUUID(), e = {};
    this.#o.set(o, e);
    let t = [{ path: ["clients", r], value: e, confirmed: true }];
    this.shareUpdates(t, o), l(o, { payloadReceived: (i) => {
      if (i.updates)
        this.shareUpdates(i.updates, o);
    } }), o.on("close", () => {
      this.#o.delete(o), this.shareUpdates([{ path: ["clients", r], deleted: true, confirmed: true }]), console.log(`client ${r} disconnected`), this.#e.forEach((i) => i(this.#r));
    }), this.#t = n(this.#r, this.#t);
    let s = { myClientId: r, state: this.#r, updates: this.#t };
    o.send(JSON.stringify(s));
  }
  shareUpdates(o, r) {
    let e = o.filter((t) => !t.confirmed);
    this.#n(o), this.#i(o), this.#t = n(this.#r, Object.values(this.#t)), this.#s(o, (t) => t !== r), this.#s(e, (t) => t === r);
  }
  #i(o) {
    if (o)
      o.forEach((r) => {
        let e = Array.isArray(r.path) ? r.path.join("/") : r.path;
        this.#t.push(r);
      });
  }
  #s(o, r) {
    if (!o?.length)
      return;
    let e = JSON.stringify({ updates: o });
    this.#o.keys().forEach((t) => {
      if (r && !r(t))
        return;
      t.send(e);
    });
  }
  #n(o) {
    o.forEach((r) => {
      if ((Array.isArray(r.path) ? r.path : r.path.split("/"))[0] !== "clients")
        r.confirmed = true;
    });
  }
}

class p {
  #o = {};
  constructor(o) {
    this.#r(o);
  }
  #r(o) {
    o.on("connection", (r, e) => {
      let t = new URLSearchParams(e.url?.split("?")[1]), s = t.get("room") ?? "default";
      if (console.log("client connected", t, " room", s), !this.#o[s]) {
        this.#o[s] = new m(s);
        let i;
        this.#o[s].addRoomChangeListener((c) => {
          if (Object.values(c.clients).length)
            clearTimeout(i);
          else
            i = setTimeout(() => {
              console.log("closing room", s), delete this.#o[s];
            }, 1e4);
        });
      }
      this.#o[s].welcomeClient(r);
    });
  }
}

class S {
  clientId = "";
  state = {};
  socket;
  connectionUrl;
  pendingUpdates = [];
  #o;
  constructor(o, r = "default") {
    let e = globalThis.location.protocol === "https:";
    this.connectionUrl = `${e ? "wss" : "ws"}://${o}?room=${r}`, this.#t(), globalThis.addEventListener("focus", () => {
      if (!this.socket)
        this.#t();
    });
  }
  async#r() {
    if (!this.socket)
      this.#t();
    return this.#o;
  }
  async#t() {
    let o = this.socket = new WebSocket(this.connectionUrl);
    return this.#o = new Promise((r, e) => {
      o.addEventListener("open", (t) => {
        console.log(`Connected to WebSocket server ${this.connectionUrl}`);
      }), o.addEventListener("error", (t) => {
        console.error("Error connecting to WebSocket server", t), e(t);
      }), o.addEventListener("message", (t) => {
        let s = JSON.parse(t.data.toString());
        if (s.myClientId)
          this.clientId = s.myClientId, this.#o = undefined, r();
        if (s.state)
          this.state = s.state;
        if (s.updates)
          n(this.state, s.updates);
      }), o.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server"), this.socket = undefined;
      });
    });
  }
  async setSelfData(o, r) {
    await this.#r();
    let e = Array.isArray(o) ? o : o.split("/");
    return this.setData(["clients", this.clientId, ...e], r);
  }
  async setData(o, r, e = {}) {
    await this.#r();
    let t = { timestamp: Date.now(), path: o, value: r, confirmed: !e.passive };
    if (!e.passive)
      n(this.state, [t]);
    if (!this.pendingUpdates.length)
      requestAnimationFrame(() => {
        this.#e();
      });
    this.pendingUpdates.push(t);
  }
  async#e() {
    await this.#r();
    let o = { updates: this.pendingUpdates };
    this.socket?.send(JSON.stringify(o)), this.pendingUpdates.length = 0;
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
  n as commitUpdates,
  S as SocketClient
};

// ../dist/index.js
function a(t, i, n) {
  let r = Date.now(), o = i?.filter((s) => s.confirmed);
  return o?.sort((s, f) => {
    let e = s.confirmed ?? r, y = f.confirmed ?? r;
    if (e !== y)
      return e - y;
    let h = Array.isArray(s.path) ? s.path.join("/") : s.path, c = Array.isArray(f.path) ? f.path.join("/") : f.path;
    return h.localeCompare(c);
  }), o?.forEach((s) => {
    let { path: f, value: e, deleted: y } = s;
    if (n)
      n.add(Array.isArray(f) ? f.join("/") : f);
    let h = Array.isArray(f) ? f : f.split("/"), c = A(t, h), p = h[h.length - 1];
    if (y)
      delete c[p];
    else if (e !== undefined)
      c[p] = e;
  }), { remainingUpdates: i?.filter((s) => !s.confirmed) };
}
function A(t, i) {
  let n = t;
  for (let r = 0;r < i.length - 1; r++)
    n = n[i[r]] ?? (n[i[r]] = {});
  return n;
}
async function u(t) {
  let i;
  if (t instanceof Buffer)
    i = t.toString();
  else if (t instanceof ArrayBuffer)
    i = Buffer.from(t).toString();
  else if (t instanceof Blob)
    i = await t.text();
  else
    throw new Error("Unsupported data type");
  try {
    return JSON.parse(i);
  } catch (n) {
    return console.log(n), null;
  }
}
function m(t, { payloadReceived: i }) {
  t.on("message", async (n) => {
    let r = await u(n);
    if (r)
      i(r);
  });
}

class g {
  room;
  #t = new Map;
  #n;
  #i = [];
  #r = new Set;
  constructor(t) {
    this.room = t;
    this.#n = { clients: {} };
  }
  addRoomChangeListener(t) {
    this.#r.add(t);
  }
  welcomeClient(t) {
    let i = crypto.randomUUID(), n = {};
    this.#t.set(t, n);
    let r = [{ path: ["clients", i], value: n, confirmed: Date.now() }];
    this.shareUpdates(r, t), m(t, { payloadReceived: (s) => {
      if (s.updates)
        this.shareUpdates(s.updates, t);
    } }), t.on("close", () => {
      this.#t.delete(t), this.shareUpdates([{ path: ["clients", i], deleted: true, confirmed: Date.now() }]), console.log(`client ${i} disconnected`), this.#r.forEach((s) => s(this.#n));
    }), this.#i = a(this.#n, this.#i).remainingUpdates;
    let o = { myClientId: i, state: this.#n, updates: this.#i };
    return t.send(JSON.stringify(o)), { clientId: i };
  }
  shareUpdates(t, i) {
    let n = t.filter((r) => !r.confirmed);
    this.#f(t), this.#o(t), this.#i = a(this.#n, Object.values(this.#i)).remainingUpdates, this.#s(t, (r) => r !== i), this.#s(n, (r) => r === i);
  }
  #o(t) {
    if (t)
      t.forEach((i) => {
        let n = Array.isArray(i.path) ? i.path.join("/") : i.path;
        this.#i.push(i);
      });
  }
  #s(t, i) {
    if (!t?.length)
      return;
    let n = JSON.stringify({ updates: t });
    this.#t.keys().forEach((r) => {
      if (i && !i(r))
        return;
      r.send(n);
    });
  }
  #f(t) {
    t.forEach((i) => {
      if ((Array.isArray(i.path) ? i.path : i.path.split("/"))[0] !== "clients")
        i.confirmed = Date.now();
    });
  }
}

class l {
  #t = {};
  constructor(t) {
    this.#n(t);
  }
  #n(t) {
    t.on("listening", () => {
      let i = t.address();
      if (typeof i === "string")
        console.log(`WebSocket server listening on ${i}`);
      else if (i && typeof i === "object") {
        let n = i.address === "::" ? "localhost" : i.address;
        console.log(`WebSocket server listening on ws://${n}:${i.port}`);
      }
    }), t.on("connection", (i, n) => {
      let o = new URLSearchParams(n.url?.split("?")[1]).get("room") ?? "default", s = this.#i(o), { clientId: f } = s.welcomeClient(i);
      console.log(`client ${f} connected in room ${o}.`);
    });
  }
  #i(t) {
    if (!this.#t[t]) {
      this.#t[t] = new g(t);
      let i;
      this.#t[t].addRoomChangeListener((n) => {
        if (Object.values(n.clients).length)
          clearTimeout(i);
        else
          i = setTimeout(() => {
            console.log("closing room", t), delete this.#t[t];
          }, 1e4);
      });
    }
    return this.#t[t];
  }
}

class x {
  clientId = "";
  state = {};
  #t;
  #n;
  pathsUpdated = new Set;
  #i;
  #r = [];
  #o = [];
  constructor(t, i) {
    let n = globalThis.location.protocol === "https:";
    this.#i = `${n ? "wss" : "ws"}://${t}${i ? `?room=${i}` : ""}`, this.#f(), globalThis.addEventListener("focus", () => {
      if (!this.#t)
        this.#f();
    });
  }
  async#s() {
    if (!this.#t)
      this.#f();
    return this.#n;
  }
  async#f() {
    let t = this.#t = new WebSocket(this.#i);
    return this.#n = new Promise((i, n) => {
      t.addEventListener("open", (r) => {
        console.log("Connected to WebSocket server", this.#i);
      }), t.addEventListener("error", (r) => {
        console.error("Error connecting to WebSocket server", r), n(r);
      }), t.addEventListener("message", (r) => {
        let o = JSON.parse(r.data.toString());
        if (o.myClientId)
          this.clientId = o.myClientId, this.#n = undefined, i();
        if (o.state)
          this.state = o.state;
        if (o.updates)
          this.#e(...o.updates);
      }), t.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server"), this.#t = undefined, this.clientId = "";
      });
    });
  }
  async setSelfData(t, i) {
    await this.#s();
    let n = Array.isArray(t) ? t : t.split("/");
    return this.setData(["clients", this.clientId, ...n], i);
  }
  async setData(t, i, n = {}) {
    await this.#s();
    let r = { path: t, value: i, confirmed: n.passive ? undefined : Date.now() };
    if (!n.passive)
      this.#e(r);
    this.#h(r);
  }
  #h(...t) {
    if (!this.#r.length)
      requestAnimationFrame(() => this.#a());
    this.#r.push(...t);
  }
  #e(...t) {
    if (!this.#o.length)
      requestAnimationFrame(() => this.#y());
    this.#o.push(...t);
  }
  async#a() {
    await this.#s();
    let t = { updates: this.#r };
    this.#t?.send(JSON.stringify(t)), this.#r.length = 0;
  }
  async#y() {
    await this.#s(), this.pathsUpdated.clear(), a(this.state, this.#o, this.pathsUpdated), this.#o.length = 0, this.state.lastUpdated = Date.now();
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
  a as commitUpdates,
  x as SocketClient
};

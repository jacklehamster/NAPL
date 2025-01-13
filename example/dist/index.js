// ../dist/index.js
function commitUpdates(root, updates) {
  const confirmedUpdates = getConfirmedUpdates(updates);
  confirmedUpdates?.forEach((update) => {
    const parts = update.path.split("/");
    const leaf = getLeafObject(root, parts, 1, true);
    const prop = parts[parts.length - 1];
    if (update.push) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop], update.value];
    } else if (update.insert !== undefined) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop].slice(0, update.insert), update.value, ...leaf[prop].slice(update.insert)];
    } else if (update.delete !== undefined) {
      if (Array.isArray(leaf[prop])) {
        leaf[prop] = [...leaf[prop].slice(0, update.delete), ...leaf[prop].slice(update.delete + 1)];
      }
    } else if (update.value === undefined) {
      delete leaf[prop];
    } else {
      leaf[prop] = update.value;
    }
  });
}
function getConfirmedUpdates(updates) {
  const confirmedUpdates = updates.filter((update) => update.confirmed);
  confirmedUpdates?.sort((a, b) => {
    const confirmedA = a.confirmed ?? 0;
    const confirmedB = b.confirmed ?? 0;
    if (confirmedA !== confirmedB) {
      return confirmedA - confirmedB;
    }
    return a.path.localeCompare(b.path);
  });
  return confirmedUpdates;
}
function getLeafObject(obj, path, offset, autoCreate, selfId) {
  const parts = Array.isArray(path) ? path : path.split("/");
  let current = obj;
  for (let i = 0;i < parts.length - offset; i++) {
    let prop = selfId && parts[i] === "{self}" ? selfId : parts[i];
    if (prop === "{keys}") {
      return Object.keys(current);
    }
    if (prop === "{values}") {
      return Object.values(current);
    }
    if (current[prop] === undefined) {
      if (autoCreate) {
        current[prop] = {};
      } else {
        return;
      }
    }
    current = current[prop];
  }
  return current;
}

class a {
  data = [];
  encoder = new TextEncoder;
  static payload(r) {
    return new a().payload(r);
  }
  static blob(r) {
    return new a().blob(r);
  }
  payload(r) {
    let n = new Uint8Array([1]);
    this.data.push(n.buffer);
    let e = JSON.stringify(r), t = this.encoder.encode(e), s = new Uint32Array([t.byteLength]);
    return this.data.push(s.buffer), this.data.push(t.buffer), this;
  }
  blob(r) {
    let n = new Uint8Array([2]);
    this.data.push(n.buffer);
    let e = new Uint32Array([r.size]);
    return this.data.push(e.buffer), this.data.push(r), this;
  }
  build() {
    return new Blob(this.data);
  }
}
async function c(r) {
  let n = [], e = 0, t;
  while (e < r.size) {
    t = t ?? await r.arrayBuffer();
    let s = new Uint8Array(t, e, 1);
    e += Uint8Array.BYTES_PER_ELEMENT;
    let o = new Uint32Array(t.slice(e, e + Uint32Array.BYTES_PER_ELEMENT), 0, 1);
    switch (e += Uint32Array.BYTES_PER_ELEMENT, s[0]) {
      case 1:
        n.push(f(t, e, o[0]));
        break;
      case 2:
        n.push(new Blob([t.slice(e, e + o[0])]));
        break;
    }
    e += o[0];
  }
  return n;
}
function f(r, n, e) {
  let t = new TextDecoder().decode(new Uint8Array(r, n, e));
  return JSON.parse(t);
}
function addMessageReceiver(socket, {
  payloadReceived
}) {
  socket.on("message", async (message) => {
    if (message instanceof Buffer) {
      const blob = new Blob([message]);
      const result = await c(blob);
      if (result[0]) {
        payloadReceived(result[0]);
      }
    }
  });
}

class SyncRoom {
  room;
  #sockets = new Map;
  #state;
  #onRoomChange = new Set;
  #updates = [];
  constructor(room) {
    this.room = room;
    this.#state = {
      clients: {}
    };
  }
  addRoomChangeListener(callback) {
    this.#onRoomChange.add(callback);
  }
  async welcomeClient(client) {
    const clientId = crypto.randomUUID();
    const clientPath = `clients/${clientId}`;
    const clientState = {};
    this.#sockets.set(client, clientState);
    const newUpdates = [
      {
        path: clientPath,
        value: clientState,
        confirmed: Date.now()
      }
    ];
    this.#shareUpdates(newUpdates, client);
    addMessageReceiver(client, {
      payloadReceived: (payload) => {
        if (payload.updates) {
          this.#shareUpdates(payload.updates, client);
        }
      }
    });
    client.on("close", () => {
      this.#sockets.delete(client);
      this.#shareUpdates([
        {
          path: clientPath,
          value: undefined,
          confirmed: Date.now()
        }
      ]);
      console.log(`client ${clientId} disconnected`);
      this.#onRoomChange.forEach((callback) => callback(this.#state));
    });
    commitUpdates(this.#state, this.#updates);
    this.#updates = this.#updates.filter((update) => !update.confirmed);
    const clientPayload = {
      myClientId: clientId,
      state: this.#state,
      updates: this.#updates
    };
    client.send(await a.payload(clientPayload).build().arrayBuffer());
    return { clientId };
  }
  #shareUpdates(newUpdates, sender) {
    const updatesForSender = newUpdates.filter((update) => !update.confirmed);
    this.#markCommonUpdatesConfirmed(newUpdates);
    this.#pushUpdates(newUpdates);
    commitUpdates(this.#state, this.#updates);
    this.#updates = this.#updates.filter((update) => !update.confirmed);
    this.#broadcastUpdates(newUpdates, (client) => client !== sender);
    this.#broadcastUpdates(updatesForSender, (client) => client === sender);
  }
  #pushUpdates(newUpdates) {
    if (newUpdates) {
      newUpdates.forEach((update) => this.#updates.push(update));
    }
  }
  async#broadcastUpdates(newUpdates, senderFilter) {
    if (!newUpdates?.length) {
      return;
    }
    const blob = a.payload({ updates: newUpdates }).build();
    const buffer = await blob.arrayBuffer();
    this.#sockets.keys().forEach((client) => {
      if (senderFilter && !senderFilter(client)) {
        return;
      }
      client.send(buffer);
    });
  }
  #markCommonUpdatesConfirmed(updates) {
    updates.forEach((update) => {
      const parts = Array.isArray(update.path) ? update.path : update.path.split("/");
      if (parts[0] !== "clients") {
        update.confirmed = Date.now();
      }
    });
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
          if (!Object.values(roomState.clients).length) {
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
  socketClient;
  id = "";
  constructor(socketClient) {
    this.socketClient = socketClient;
  }
  #getAbsolutePath(path) {
    return path ? `clients/{self}/${path}` : "clients/{self}";
  }
  observe(...paths) {
    const updatedPaths = paths.map((path) => this.#getAbsolutePath(path));
    return this.socketClient.observe(...updatedPaths);
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
  parts = [];
  constructor(path, socketClient) {
    this.path = path;
    this.socketClient = socketClient;
    this.parts = path.split("/");
  }
  #getAbsolutePath(path) {
    return path ? `${this.path}/${path}` : this.path;
  }
  observe(...paths) {
    const updatedPaths = paths.map((path) => this.#getAbsolutePath(path));
    return this.socketClient.observe(...updatedPaths);
  }
  async setData(path, value, options) {
    return this.socketClient.setData(this.#getAbsolutePath(path), value, options);
  }
  get state() {
    return getLeafObject(this.socketClient.state, this.parts, 0, false) ?? {};
  }
}

class Observer {
  socketClient;
  pathArrays;
  observations;
  changeCallback;
  #addedElementsCallback;
  #deletedElementsCallback;
  constructor(socketClient, paths) {
    this.socketClient = socketClient;
    this.pathArrays = paths.map((p) => p === undefined ? [] : p.split("/"));
    this.observations = paths.map(() => {
      const observation = {
        previous: undefined,
        value: undefined
      };
      return observation;
    });
    requestAnimationFrame(() => {
      this.triggerIfChanged();
    });
  }
  onChange(callback) {
    this.changeCallback = callback;
    return this;
  }
  onElementsAdded(callback) {
    this.#addedElementsCallback = callback;
    return this;
  }
  onElementsDeleted(callback) {
    this.#deletedElementsCallback = callback;
    return this;
  }
  #updatedObservations() {
    const newValues = this.pathArrays.map((p) => getLeafObject(this.socketClient.state, p, 0, false, this.socketClient.clientId));
    if (this.observations.length && this.observations.every((ob, index) => {
      const newValue = newValues[index];
      if (ob.value === newValue) {
        return true;
      }
      if (Array.isArray(ob.value) && Array.isArray(newValue) && ob.value.length === newValue.length && ob.value.every((elem, idx) => elem === newValue[idx])) {
        return true;
      }
      return false;
    })) {
      return false;
    }
    this.observations.forEach((observation, index) => {
      observation.previous = observation.value;
      observation.value = newValues[index];
    });
    return true;
  }
  triggerIfChanged() {
    if (!this.#updatedObservations()) {
      return;
    }
    this.changeCallback?.(...this.observations);
    if (this.#addedElementsCallback && this.observations.some((observation) => Array.isArray(observation.value))) {
      let hasNewElements = false;
      const newElementsArray = this.observations.map((observation) => {
        if (Array.isArray(observation.value)) {
          const previousSet = new Set(Array.isArray(observation.previous) ? observation.previous : []);
          const newElements = observation.value.filter((clientId) => !previousSet.has(clientId));
          if (newElements.length) {
            hasNewElements = true;
          }
          return newElements;
        }
      });
      if (hasNewElements) {
        this.#addedElementsCallback(...newElementsArray);
      }
    }
    if (this.#deletedElementsCallback && this.observations.some((observation) => Array.isArray(observation.previous))) {
      let hasDeletedElements = false;
      const deletedElementsArray = this.observations.map((observation) => {
        if (Array.isArray(observation.previous)) {
          const currentSet = new Set(Array.isArray(observation.value) ? observation.value : []);
          const deletedElements = observation.previous.filter((clientId) => !currentSet.has(clientId));
          if (deletedElements.length) {
            hasDeletedElements = true;
          }
          return deletedElements;
        }
      });
      if (hasDeletedElements) {
        this.#deletedElementsCallback(...deletedElementsArray);
      }
    }
  }
  close() {
    console.log("Closed observer " + this.pathArrays.join("/"));
    this.socketClient.removeObserver(this);
  }
}

class SocketClient {
  state = {};
  #socket;
  #connectionPromise;
  #connectionUrl;
  #outgoingUpdates = [];
  #incomingUpdates = [];
  #selfData = new ClientData(this);
  #observers = new Set;
  constructor(host, room) {
    const secure = globalThis.location.protocol === "https:";
    this.#connectionUrl = `${secure ? "wss" : "ws"}://${host}${room ? `?room=${room}` : ""}`;
    this.#connect();
    globalThis.addEventListener("focus", () => {
      if (!this.#socket) {
        this.#connect();
      }
    });
  }
  fixPath(path) {
    const split = path.split("/");
    return split.map((part) => part === "{self}" ? this.#selfData.id : part).join("/");
  }
  usefulUpdate(update) {
    const currentValue = getLeafObject(this.state, update.path, 0, false, this.#selfData.id);
    return update.value !== currentValue;
  }
  async setData(path, value, options = {}) {
    await this.#waitForConnection();
    const update = {
      path: this.fixPath(path),
      value: options.delete ? undefined : value,
      confirmed: options.passive ? undefined : Date.now(),
      push: options.push,
      insert: options.insert
    };
    if (!this.usefulUpdate(update)) {
      return;
    }
    if (!options.passive) {
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
    return new SubData(path, this);
  }
  observe(...paths) {
    const observer = new Observer(this, paths);
    this.#observers.add(observer);
    return observer;
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
        const [payload] = await c(event.data);
        if (payload.myClientId) {
          this.#selfData.id = payload.myClientId;
          this.#connectionPromise = undefined;
          resolve();
        }
        if (payload.state) {
          this.state = payload.state;
        }
        if (payload.updates) {
          this.#queueIncomingUpdates(...payload.updates);
        }
        this.triggerObservers();
      });
      socket.addEventListener("close", () => {
        console.log("Disconnected from WebSocket server");
        this.#socket = undefined;
        this.#selfData.id = "";
      });
    });
  }
  #queueOutgoingUpdates(...updates) {
    if (!this.#outgoingUpdates.length) {
      requestAnimationFrame(() => this.#broadcastUpdates());
    }
    this.#outgoingUpdates.push(...updates);
  }
  #queueIncomingUpdates(...updates) {
    if (!this.#incomingUpdates.length) {
      requestAnimationFrame(() => this.#applyUpdates());
    }
    this.#incomingUpdates.push(...updates);
  }
  async#broadcastUpdates() {
    await this.#waitForConnection();
    this.#socket?.send(a.payload({ updates: this.#outgoingUpdates }).build());
    this.#outgoingUpdates.length = 0;
  }
  async#applyUpdates() {
    await this.#waitForConnection();
    commitUpdates(this.state, this.#incomingUpdates);
    this.#incomingUpdates.length = 0;
    this.state.lastUpdated = Date.now();
    this.triggerObservers();
  }
  triggerObservers() {
    this.#observers.forEach((o) => o.triggerIfChanged());
  }
  removeObserver(observer) {
    this.#observers.delete(observer);
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
  return new SocketClient(config.websocketHost ?? location.host, room);
}
var socketClient = getSocketClient();
window.socketClient = socketClient;
export {
  stringify,
  socketClient,
  randomName,
  randomEmoji,
  commitUpdates,
  SocketClient
};

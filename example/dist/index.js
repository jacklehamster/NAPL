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
    } else if ((update.insert ?? -1) >= 0) {
      if (!Array.isArray(leaf[prop])) {
        leaf[prop] = [];
      }
      leaf[prop] = [...leaf[prop].slice(0, update.insert ?? -1), update.value, ...leaf[prop].slice(update.insert)];
    } else if ((update.delete ?? -1) >= 0) {
      if (Array.isArray(leaf[prop])) {
        leaf[prop] = [...leaf[prop].slice(0, update.delete), ...leaf[prop].slice((update.delete ?? -1) + 1)];
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

class SyncRoom {
  room;
  #sockets = new Map;
  #state;
  #onRoomChange = new Set;
  #updates = [];
  constructor(room) {
    this.room = room;
    this.#state = {
      clients: {},
      blobs: {}
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
    const newUpdates = [{
      path: clientPath,
      value: clientState,
      confirmed: Date.now(),
      blobs: {}
    }];
    this.#shareUpdates(newUpdates, client);
    addMessageReceiver(client, (payload, blobs) => {
      Object.entries(blobs).forEach(([key, blob]) => this.#state.blobs[key] = blob);
      payload.updates?.forEach((update) => {
        const blobs2 = update.blobs ?? {};
        Object.keys(blobs2).forEach((key) => blobs2[key] = this.#state.blobs[key]);
      });
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
      this.#onRoomChange.forEach((callback) => callback(this.#state));
    });
    commitUpdates(this.#state, this.#updates);
    this.#updates = this.#updates.filter((update) => !update.confirmed);
    const blobBuilder = A.payload("payload", {
      myClientId: clientId,
      state: { ...this.#state, blobs: undefined },
      updates: this.#updates
    });
    Object.entries(this.#state.blobs).forEach(([key, blob]) => blobBuilder.blob(key, blob));
    this.#updates.forEach((update) => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => blobBuilder.blob(key, blob)));
    client.send(await blobBuilder.build().arrayBuffer());
    return { clientId };
  }
  #shareUpdates(newUpdates, sender) {
    if (!newUpdates?.length) {
      return;
    }
    const updatesForSender = newUpdates.filter((update) => !update.confirmed);
    this.#markCommonUpdatesConfirmed(newUpdates);
    this.#pushUpdates(newUpdates);
    commitUpdates(this.#state, this.#updates);
    this.#updates = this.#updates.filter((update) => !update.confirmed);
    this.#broadcastUpdates(newUpdates, (client) => client !== sender);
    this.#broadcastUpdates(updatesForSender, (client) => client === sender);
  }
  #pushUpdates(newUpdates) {
    newUpdates?.forEach((update) => this.#updates.push(update));
  }
  async#broadcastUpdates(newUpdates, senderFilter) {
    if (!newUpdates?.length) {
      return;
    }
    const blobBuilder = A.payload("payload", { updates: newUpdates });
    newUpdates.forEach((update) => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => blobBuilder.blob(key, blob)));
    const buffer = await blobBuilder.build().arrayBuffer();
    this.#sockets.keys().forEach((client) => {
      if (senderFilter && !senderFilter(client)) {
        return;
      }
      client.send(buffer);
    });
  }
  #markCommonUpdatesConfirmed(updates) {
    updates.forEach((update) => {
      if (!this.#restrictedPath(update.path)) {
        update.confirmed = Date.now();
      }
    });
  }
  #restrictedPath(path) {
    return path.startsWith("clients/") || path.startsWith("blobs/");
  }
  #cleanupBlobs() {
    const blobSet = new Set(Object.keys(this.#state.blobs));
    this.#findUsedBlobs(this.#state, blobSet);
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
  #parts = [];
  constructor(path, socketClient) {
    this.path = path;
    this.socketClient = socketClient;
    this.#parts = path.split("/");
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
    return getLeafObject(this.socketClient.state, this.#parts, 0, false) ?? {};
  }
}

class Observer {
  socketClient;
  paths;
  #partsArrays;
  #observations;
  #changeCallbacks = new Set;
  #addedElementsCallback = new Set;
  #deletedElementsCallback = new Set;
  constructor(socketClient, paths) {
    this.socketClient = socketClient;
    this.paths = paths;
    this.#partsArrays = paths.map((p) => p === undefined ? [] : p.split("/"));
    this.#observations = paths.map(() => {
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
  #updatedObservations() {
    const newValues = this.#partsArrays.map((p) => getLeafObject(this.socketClient.state, p, 0, false, this.socketClient.clientId));
    if (this.#observations.length && this.#observations.every((ob, index) => {
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
    this.#observations.forEach((observation, index) => {
      observation.previous = observation.value;
      observation.value = newValues[index];
    });
    return true;
  }
  triggerIfChanged() {
    if (!this.#updatedObservations()) {
      return;
    }
    this.#changeCallbacks.forEach((callback) => callback(...this.#observations));
    if (this.#addedElementsCallback && this.#observations.some((observation) => Array.isArray(observation.value))) {
      let hasNewElements = false;
      const newElementsArray = this.#observations.map((observation) => {
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
        this.#addedElementsCallback.forEach((callback) => callback(...newElementsArray));
      }
    }
    if (this.#deletedElementsCallback && this.#observations.some((observation) => Array.isArray(observation.previous))) {
      let hasDeletedElements = false;
      const deletedElementsArray = this.#observations.map((observation) => {
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
        this.#deletedElementsCallback.forEach((callback) => callback(...deletedElementsArray));
      }
    }
  }
  close() {
    console.log("Closed observer " + this.#partsArrays.join("/"));
    this.socketClient.removeObserver(this);
  }
}

class ObserverManager {
  socketClient;
  #observers = new Set;
  constructor(socketClient) {
    this.socketClient = socketClient;
  }
  observe(...paths) {
    const observer = new Observer(this.socketClient, paths);
    this.#observers.add(observer);
    this.#updateState();
    return observer;
  }
  triggerObservers() {
    this.#observers.forEach((o) => o.triggerIfChanged());
  }
  removeObserver(observer) {
    this.#observers.delete(observer);
  }
  #updateState() {
    this.socketClient.localState.observers = Array.from(new Set(Array.from(this.#observers).map((o) => o.paths).flat()));
    this.socketClient.localState.observers.sort();
  }
}
var LOCAL_TAG = "#local";

class SocketClient {
  state = {
    [LOCAL_TAG]: {}
  };
  #socket;
  #connectionPromise;
  #connectionUrl;
  #outgoingUpdates = [];
  #incomingUpdates = [];
  #selfData = new ClientData(this);
  #observerManager = new ObserverManager(this);
  constructor(host, room) {
    const prefix = host.startsWith("ws://") || host.startsWith("wss://") ? "" : globalThis.location.protocol === "https:" ? "wss://" : "ws://";
    this.#connectionUrl = `${prefix}${host}${room ? `?room=${room}` : ""}`;
    this.#connect();
    globalThis.addEventListener("focus", () => {
      if (!this.#socket) {
        this.#connect();
      }
    });
  }
  #fixPath(path) {
    const split = path.split("/");
    return split.map((part) => part === "{self}" ? this.#selfData.id : part).join("/");
  }
  #usefulUpdate(update) {
    const currentValue = getLeafObject(this.state, update.path, 0, false, this.#selfData.id);
    return update.value !== currentValue;
  }
  async setData(path, value, options) {
    await this.#waitForConnection();
    const payloadBlobs = {};
    value = await N(value, payloadBlobs);
    const update = {
      path: this.#fixPath(path),
      value: options?.delete ? undefined : value,
      confirmed: options?.passive ? undefined : Date.now(),
      push: options?.push,
      insert: options?.insert,
      blobs: payloadBlobs
    };
    if (!this.#usefulUpdate(update)) {
      return;
    }
    if (!options?.passive) {
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
    return this.#observerManager.observe(...paths);
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
        const { payload, ...blobs } = await W(event.data);
        if (payload?.myClientId) {
          this.#selfData.id = payload.myClientId;
          this.#connectionPromise = undefined;
          this.localState.id = payload.myClientId;
          resolve();
        }
        if (payload?.state) {
          this.state = { ...payload.state, [LOCAL_TAG]: this.state[LOCAL_TAG] };
          this.state.blobs = blobs;
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
    const blobBuilder = A.payload("payload", { updates: this.#outgoingUpdates });
    const addedBlob = new Set;
    this.#outgoingUpdates.forEach((update) => {
      Object.entries(update.blobs ?? {}).forEach(([key, blob]) => {
        if (!addedBlob.has(key)) {
          blobBuilder.blob(key, blob);
          addedBlob.add(key);
        }
      });
    });
    this.#socket?.send(blobBuilder.build());
    this.#outgoingUpdates.length = 0;
  }
  #saveBlobsFromUpdates(updates) {
    updates.forEach((update) => Object.entries(update.blobs ?? {}).forEach(([key, blob]) => {
      this.state.blobs[key] = blob;
    }));
  }
  #applyUpdates() {
    this.#saveBlobsFromUpdates(this.#incomingUpdates);
    commitUpdates(this.state, this.#incomingUpdates);
    this.#incomingUpdates.length = 0;
    this.#observerManager.triggerObservers();
  }
  removeObserver(observer) {
    this.#observerManager.removeObserver(observer);
  }
  get localState() {
    return this.state[LOCAL_TAG];
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

// node_modules/aseprite-sheet/dist/index.js
class p {
  spriteSheet;
  frames;
  spriteDefinitions;
  onFrameChange;
  constructor(e, i) {
    this.spriteSheet = e;
    this.frames = i;
    this.spriteDefinitions = e.spriteDefinitions;
  }
  getSpriteDefinition(e = 0) {
    return this.spriteDefinitions[this.frames[e % this.frames.length]];
  }
  draw(e, i, t, n = 0, r = 1) {
    let o = this.getSpriteDefinition(n), { x: s, y: m, w: a, h } = o.frame;
    e.drawImage(this.spriteSheet.getImage(), s, m, a, h, i, t, a * r, h * r);
  }
  makeCanvas(e = 0, i = 1) {
    let { w: t, h: n } = this.getSpriteDefinition(e).frame, r = document.createElement("canvas"), o = r.getContext("2d");
    if (r.classList.add("sprite-canvas"), r.width = t * i, r.height = n * i, this.draw(o, 0, 0, e, i), this.onFrameChange?.(e), this.frames.length > 1) {
      let s = performance.now(), m = this.spriteDefinitions[this.frames[e]], a = () => {
        let c = performance.now() - s, f = Math.floor(c / m.duration) % this.frames.length;
        o.clearRect(0, 0, r.width, r.height), this.draw(o, 0, 0, f, i), this.onFrameChange?.(f), requestAnimationFrame(a);
      };
      a();
    }
    return r;
  }
  async makeBlob(e, i = 1) {
    return new Promise((t) => {
      this.makeCanvas(e, i).toBlob((n) => t(n));
    });
  }
  generateDiv(e = 0) {
    let i = this.getSpriteDefinition(e), t = document.createElement("div");
    if (t.classList.add("sprite"), t.style.backgroundImage = `url(${this.spriteSheet.definition.meta.image})`, t.style.backgroundPosition = `-${i.frame.x}px -${i.frame.y}px`, t.style.minWidth = `${i.frame.w}px`, t.style.minHeight = `${i.frame.h}px`, t.style.backgroundSize = `${this.spriteSheet.definition.meta.size.w}px ${this.spriteSheet.definition.meta.size.h}px`, this.frames.length > 1) {
      let n = 0, r = "@keyframes animateSprite {";
      for (let s = 0;s < this.frames.length; s++) {
        let m = this.frames[s], a = this.spriteDefinitions[m], h = s / this.frames.length * 100;
        r += `${h}% { background-position: -${a.frame.x}px -${a.frame.y}px; } `, n += a.duration;
      }
      r += "}";
      let o = document.createElement("style");
      o.innerText = r, document.head.appendChild(o), t.style.animation = `animateSprite ${n}ms steps(1) infinite`;
    }
    return t;
  }
}

class d {
  definition;
  image = new Image;
  loadPromise;
  spriteDefinitions = [];
  sprites = [];
  taggedSprites = {};
  loaded = false;
  get count() {
    return this.spriteDefinitions.length;
  }
  constructor(e) {
    this.definition = e;
    Object.entries(e.frames).forEach(([i, t]) => {
      let [, n] = i.match(g) ?? [];
      this.spriteDefinitions[parseInt(n)] = t;
    });
  }
  getImage() {
    return this.image;
  }
  getSprite(e) {
    return this.sprites[e] ?? (this.sprites[e] = new p(this, [e]));
  }
  getTaggedSprite(e) {
    if (this.taggedSprites[e])
      return this.taggedSprites[e];
    let i = this.definition.meta.frameTags.find((t) => t.name === e);
    if (i) {
      let { from: t, to: n } = i, r = Math.sign(n - t) || 1, o = [];
      for (let s = t;s <= n; s += r)
        o.push(s);
      return this.taggedSprites[e] = new p(this, this.calculateFrames(o, i.direction));
    }
    return;
  }
  calculateFrames(e, i) {
    let t = [...e];
    switch (i) {
      case "reverse":
        t.reverse();
        break;
      case "pingpong":
        for (let n = e.length - 2;n >= 1; n--)
          t.push(e[n]);
        break;
      case "pingpong_reverse":
        t.reverse();
        for (let n = 1;n < e.length - 1; n++)
          t.push(e[n]);
        break;
    }
    return t;
  }
  getTags() {
    return this.definition.meta.frameTags;
  }
  async load() {
    if (!this.loadPromise && !this.loaded)
      this.loadPromise = new Promise(async (e, i) => {
        await new Promise((t, n) => {
          this.image = new Image, this.image.onload = () => t(), this.image.onerror = n, this.image.src = this.definition.meta.image;
        }), e(), this.loadPromise = undefined;
      });
    return await this.loadPromise, this;
  }
}
var g = /.*\s(\d+).aseprite/;
async function S(e) {
  return await fetch(e).then((t) => t.json());
}

// src/iso-test/iso-utils.ts
var scaleX = 70;
var scaleY = 40;
function gridPositionToView(x, y) {
  return [(x + y) * scaleX / 2, (-x + y) * scaleY / 2];
}
function viewPositionToGrid(x, y) {
  return [Math.round(x / scaleX - y / scaleY), Math.round(x / scaleX + y / scaleY)];
}
async function displayIsoUI(path) {
  function getDraggedItem(clientId) {
    let div = document.getElementById(`drag-${clientId}`);
    if (!div) {
      div = document.body.appendChild(document.createElement("div"));
      div.id = `drag-${clientId}`;
      div.style.position = "absolute";
      div.style.pointerEvents = "none";
      div.style.top = "0";
      div.style.left = "0";
      div.style.opacity = "0.5";
      div.style.transform = "scale(0.15)";
      div.style.transformOrigin = "top left";
    }
    return div;
  }
  let selectedTime = 0;
  const spriteSheet = await getSpriteSheet(path);
  const ui = document.body.appendChild(document.createElement("div"));
  ui.style.display = "flex";
  ui.style.flexWrap = "wrap";
  ui.style.zoom = "0.05";
  for (let i = 0;i < spriteSheet.count; i++) {
    const sprite = spriteSheet.getSprite(i);
    const div = sprite.generateDiv();
    div.id = `sprite-${i}`;
    div.style.border = "20px solid #00000000";
    div.addEventListener("mousedown", () => {
      socketClient.self.setData("selected", i);
      selectedTime = Date.now();
    });
    ui.appendChild(div);
  }
  for (let tag of spriteSheet.getTags()) {
    const sprite = spriteSheet.getTaggedSprite(tag.name);
    const div = sprite.generateDiv();
    div.style.border = "20px solid #00000000";
    div.id = `sprite-${tag.name}`;
    div.addEventListener("mousedown", () => {
      socketClient.self.setData("selected", tag.name);
      selectedTime = Date.now();
    });
    ui.appendChild(div);
  }
  document.addEventListener("mouseup", (event) => {
    const selected = socketClient.self.state.selected;
    if (selected !== undefined && socketClient.self.state.isoCursor && Date.now() - selectedTime > 300) {
      insertInIsoWorld(selected, socketClient.self.state.isoCursor[0], socketClient.self.state.isoCursor[1]);
      socketClient.self.setData("selected", undefined);
    }
  });
  handleUsersChanged((clientId, _isSelf, observers) => {
    observers.add(socketClient.observe(`clients/${clientId}/selected`).onChange((selected) => {
      const previousSelected = document.getElementById(`sprite-${selected.previous}`);
      if (previousSelected) {
        previousSelected.style.border = "20px solid #00000000";
      }
      const selectedDiv = document.getElementById(`sprite-${selected.value}`);
      if (selectedDiv) {
        const selectedBySelf = socketClient.self.state.selected === selected.value;
        const color = selectedBySelf ? "red" : "gray";
        const dashed = !selectedBySelf ? "dashed" : "solid";
        selectedDiv.style.border = `20px ${dashed} ${color}`;
        const sprite = isNaN(selected.value) ? spriteSheet.getTaggedSprite(selected.value) : spriteSheet.getSprite(parseInt(selected.value));
        getDraggedItem(clientId).replaceChildren(sprite.generateDiv());
      }
    })).add(trackCursorObserver(clientId, (cursor, selected) => {
      const draggedItem = getDraggedItem(clientId);
      if (!cursor || selected === undefined) {
        socketClient.self.setData("isoCursor", undefined);
        return;
      }
      const [x, y] = cursor;
      socketClient.self.setData("isoCursor", viewPositionToGrid(x, y));
      draggedItem.style.display = "";
    }, [`clients/${clientId}/selected`])).add(trackIsoCursorObserver(clientId, (cursor) => {
      const draggedItem = getDraggedItem(clientId);
      if (!cursor) {
        draggedItem.style.display = "none";
        return;
      }
      draggedItem.style.display = "";
      const [x, y] = gridPositionToView(cursor[0], cursor[1]);
      draggedItem.style.left = `${x - 40}px`;
      draggedItem.style.top = `${y - 40}px`;
    }));
  }, (clientId) => {
    const client = document.querySelector(`#client-${clientId}`);
    if (client) {
      client.style.transition = "opacity 0.3s";
      client.style.opacity = "0";
      setTimeout(() => {
        client.remove();
      }, 300);
    }
  });
  function trackIsoWorldObserver() {
    socketClient.observe("iso/world/{keys}").onElementsAdded((keys) => {
      keys?.forEach((uid) => {
        const { type, x, y } = socketClient.state.iso.world[uid];
        const sprite = spriteSheet.getTaggedSprite(type) ?? spriteSheet.getSprite(type);
        const div = sprite.generateDiv();
        const [viewX, viewY] = gridPositionToView(x, y);
        div.id = `elem-${uid}`;
        div.style.position = "absolute";
        div.style.left = `${viewX - 40}px`;
        div.style.top = `${viewY - 40}px`;
        div.style.transform = "scale(0.15)";
        div.style.transformOrigin = "top left";
        div.addEventListener("mousedown", () => {
          socketClient.self.setData("selected", type);
          selectedTime = Date.now();
          socketClient.self.setData("cursor", [x, y]);
          socketClient.setData(`iso/world/${uid}`, undefined);
        });
        document.body.appendChild(div);
      });
    }).onElementsDeleted((keys) => {
      keys?.forEach((uid) => {
        const div = document.getElementById(`elem-${uid}`);
        if (div) {
          div.remove();
        }
      });
    });
  }
  trackIsoWorldObserver();
}
function insertInIsoWorld(type, x, y) {
  const uid = Math.random().toString(36).substring(3);
  socketClient.setData(`iso/world/${uid}`, { type, x, y });
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
async function getSpriteSheet(path) {
  const spritesheetDefinition = await S(path);
  return new d(spritesheetDefinition);
}
function introduceName() {
  socketClient.observe("clients/{self}").onChange(() => {
    socketClient.self.setData("name", randomName());
    socketClient.self.setData("emoji", randomEmoji());
  });
}
function displayUsers(userDiv) {
  handleUsersChanged((clientId, isSelf, observers) => {
    observers.add(socketClient.observe(`clients/${clientId}/name`, `clients/${clientId}/emoji`).onChange((name2, emoji2) => {
      client.textContent = `${emoji2.value} ${name2.value}`;
    }));
    const client = document.createElement("div");
    client.id = `client-${clientId}`;
    client.textContent = clientId;
    if (isSelf) {
      client.style.fontWeight = "bold";
      client.style.backgroundColor = "yellow";
      userDiv.prepend(client);
    } else {
      userDiv.appendChild(client);
    }
  }, (clientId) => {
    const client = document.querySelector(`#client-${clientId}`);
    if (client) {
      client.style.transition = "opacity 0.3s";
      client.style.opacity = "0";
      setTimeout(() => {
        client.remove();
      }, 300);
    }
  });
}
function trackCursor({ exclude = [] } = {}) {
  document.addEventListener("mousemove", ({ pageX, pageY, target }) => {
    if (exclude.indexOf(target?.id ?? "") >= 0) {
      socketClient.self.setData("cursor", undefined);
      return;
    }
    socketClient.self.setData("cursor", [pageX, pageY]);
  });
  document.addEventListener("mouseout", ({ target }) => {
    socketClient.self.setData("cursor", undefined);
  });
}
function handleUsersChanged(onUserAdded, onUserRemoved) {
  return socketClient.observe("clients/{keys}").onElementsAdded((clientIds) => {
    clientIds?.forEach((clientId) => {
      const isSelf = clientId === socketClient.clientId;
      const observers = new Set;
      onUserAdded(clientId, isSelf, observers);
      observers.add(socketClient.observe(`clients/${clientId}`).onChange((client) => {
        if (client.value === undefined) {
          observers.forEach((observer) => observer.close());
        }
      }));
    });
  }).onElementsDeleted((clientIds) => {
    clientIds?.forEach((clientId) => onUserRemoved?.(clientId));
  });
}
function trackCursorObserver(clientId, callback, extraObservations = []) {
  return socketClient.observe(...[`clients/${clientId}/cursor`, ...extraObservations]).onChange((cursor, ...extra) => {
    if (!cursor.value) {
      callback();
      return;
    }
    callback(cursor.value, ...extra.map((e) => e.value));
  });
}
function trackIsoCursorObserver(clientId, callback, extraObservations = []) {
  return socketClient.observe(...[`clients/${clientId}/isoCursor`, ...extraObservations]).onChange((cursor, ...extra) => {
    if (!cursor.value) {
      callback();
      return;
    }
    callback(cursor.value, ...extra.map((e) => e.value));
  });
}
export {
  trackIsoCursorObserver,
  trackCursorObserver,
  trackCursor,
  stringify,
  socketClient,
  randomName,
  randomEmoji,
  introduceName,
  insertInIsoWorld,
  handleUsersChanged,
  getSpriteSheet,
  displayUsers,
  displayIsoUI,
  commitUpdates,
  SocketClient
};

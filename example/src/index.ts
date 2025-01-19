// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

export { commitUpdates, SocketClient } from "napl";
import stringify from "json-stringify-pretty-compact";
import { SocketClient } from "napl";
import { SpriteSheet, loadSpriteSheet } from "aseprite-sheet";
import { Observer } from "../../dist/client/Observer";

let name: string;
export function randomName() {
  return name ?? (name = "napl-" + Math.random().toString(36).substring(7));
}

const EMOJIS = [
  "🐵", "🐒", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺",
  "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴",
  "🫎", "🫏", "🐎", "🦄", "🦓", "🦌", "🦬", "🐮", "🐂", "🐃",
  "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫",
  "🦙", "🦒", "🐘", "🦣", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹",
  "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼",
  "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣",
  "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉", "🦤",
  "🪶", "🦩", "🦚", "🦜", "🪽", "🐦‍⬛", "🪿", "🐦‍🔥", "🪹", "🪺",
  "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳",
  "🐋", "🐬", "🦭", "🐟", "🐠", "🐡", "🦈", "🐙", "🐚", "🪸",
  "🪼", "🦀", "🦞", "🦐", "🦑", "🦪", "🐌", "🦋", "🐛", "🐜",
  "🐝", "🪲", "🐞", "🦗", "🪳", "🕷️", "🕸️", "🦂", "🦟", "🪰",
  "🪱", "🦠", "💐", "🌸", "💮", "🪷", "🏵️", "🌹", "🥀", "🌺",
  "🌻", "🌼", "🌷", "🪻", "🌱", "🪴", "🌲", "🌳", "🌴", "🌵",
  "🌾", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃", "🍄", "🪨", "🪵"
];

let emoji: string;
export function randomEmoji(forceRandom?: boolean) {
  return (forceRandom ? null : emoji) ?? (emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
}


const config = await fetch("../config.json").then((response) =>
  response.json()
);

function getSocketClient() {
  const urlVars = new URLSearchParams(location.search);
  const room = urlVars.get("room") ?? undefined;
  return new SocketClient(config.websocketHost ?? location.host, room);
}

export const socketClient = getSocketClient();
(window as any).socketClient = socketClient;

export { stringify };

export async function getSpriteSheet(path: string) {
  const spritesheetDefinition = await loadSpriteSheet(path);
  return new SpriteSheet(spritesheetDefinition!);
}

function insertInIsoWorld(type: string, x: number, y: number) {
  const uid = Math.random().toString(36).substring(3);
  socketClient.setData(`iso/world/${uid}`, { type, x, y });
}

export async function displayIsoUI(path: string) {
  function getDraggedItem(clientId: string) {
    let div = document.getElementById(`drag-${clientId}`) as HTMLDivElement;
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


  const spriteSheet = await getSpriteSheet(path);
  const ui = document.body.appendChild(document.createElement("div"));
  ui.style.display = "flex";
  ui.style.flexWrap = "wrap";
  ui.style.zoom = "0.05";
  for (let i = 0; i < spriteSheet.count; i++) {
    const sprite = spriteSheet.getSprite(i);
    const div = sprite.generateDiv();
    div.id = `sprite-${i}`;
    div.style.border = "20px solid #00000000";
    div.addEventListener("mousedown", () => socketClient.self.setData("selected", i));
    ui.appendChild(div);
  }
  for (let tag of spriteSheet.getTags()) {
    const sprite = spriteSheet.getTaggedSprite(tag.name)!;
    const div = sprite.generateDiv();
    div.style.border = "20px solid #00000000";
    div.id = `sprite-${tag.name}`;
    div.addEventListener("mousedown", () => socketClient.self.setData("selected", tag.name));
    ui.appendChild(div);
  }

  //  On mouse down, if an item is selected, drop it
  document.addEventListener("mouseup", (event) => {
    const selected = socketClient.self.state.selected;
    if (selected !== undefined && socketClient.self.state.cursor) {
      insertInIsoWorld(selected, socketClient.self.state.cursor[0], socketClient.self.state.cursor[1]);
      socketClient.self.setData("selected", undefined);
    }
  });

  handleUsersChanged((clientId, _isSelf, observers) => {
    observers.add(
      socketClient
        .observe(`clients/${clientId}/selected`)
        .onChange((selected) => {
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
            const sprite = isNaN(selected.value) ? spriteSheet.getTaggedSprite(selected.value)! : spriteSheet.getSprite(parseInt(selected.value));
            getDraggedItem(clientId).replaceChildren(sprite.generateDiv());
          }
        })
    );
    observers.add(trackCursorObserver(clientId, (cursor) => {
      const draggedItem = getDraggedItem(clientId);
      const selected = socketClient.state.clients[clientId].selected;
      if (!cursor || selected === undefined) {
        draggedItem.style.display = "none"
        return;
      }
      draggedItem.style.display = "";
      const [x, y] = cursor;
      draggedItem.style.left = `${x - 40}px`;
      draggedItem.style.top = `${y - 40}px`;
    }));
  }, (clientId) => {
    const client = document.querySelector(`#client-${clientId}`) as HTMLDivElement;
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
        console.log(type, x, y);
        const sprite = spriteSheet.getTaggedSprite(type) ?? spriteSheet.getSprite(type);
        const div = sprite.generateDiv();
        div.id = `elem-${uid}`;
        div.style.position = "absolute";
        div.style.left = `${x - 40}px`;
        div.style.top = `${y - 40}px`;
        div.style.transform = "scale(0.15)";
        div.style.transformOrigin = "top left";
        div.addEventListener("mousedown", () => {
          socketClient.self.setData("selected", type);
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

export function introduceName() {
  socketClient.observe("clients/{self}").onChange(() => {
    socketClient.self.setData("name", randomName());
    socketClient.self.setData("emoji", randomEmoji());
  });
}

export function displayUsers(userDiv: HTMLDivElement) {
  handleUsersChanged((clientId, isSelf, observers) => {
    observers.add(
      socketClient
        .observe(
          `clients/${clientId}/name`,
          `clients/${clientId}/emoji`
        )
        .onChange((name, emoji) => {
          client.textContent = `${emoji.value} ${name.value}`;
        })
    );

    // new client
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
    const client = document.querySelector(`#client-${clientId}`) as HTMLDivElement;
    if (client) {
      client.style.transition = "opacity 0.3s";
      client.style.opacity = "0";
      setTimeout(() => {
        client.remove();
      }, 300);
    }
  });
}

export function trackCursor({ exclude = [] }: { exclude?: string[] } = {}) {
  document.addEventListener("mousemove", ({ pageX, pageY, target }) => {
    if (exclude.indexOf((target as any)?.id ?? "") >= 0) {
      socketClient.self.setData("cursor", undefined);
      return;
    }
    socketClient.self.setData("cursor", [pageX, pageY]);
  });
  document.addEventListener("mouseout", ({ target }) => {
    socketClient.self.setData("cursor", undefined);
  });
}

export function handleUsersChanged(onUserAdded: (clientId: string, isSelf: boolean, observers: Set<Observer>) => void, onUserRemoved?: (clientId: string) => void) {
  socketClient
    .observe("clients/{keys}")
    .onElementsAdded((clientIds) => {
      clientIds?.forEach((clientId) => {
        const isSelf = clientId === socketClient.clientId;
        const observers = new Set<Observer>();
        onUserAdded(clientId, isSelf, observers);
        observers.add(
          socketClient.observe(`clients/${clientId}`).onChange((client) => {
            if (!client.value) {
              observers.forEach((observer) => observer.close());
            }
          })
        );
      });
    })
    .onElementsDeleted((clientIds) => {
      clientIds?.forEach((clientId) => onUserRemoved?.(clientId));
    });
}

export function trackCursorObserver(clientId: string, callback: (cursor?: [number, number]) => void) {
  //  cursor observer
  return socketClient
    .observe(`clients/${clientId}/cursor`)
    .onChange((cursor) => {
      if (!cursor.value) {
        callback();
        return;
      }
      callback(cursor.value);
    })
}

// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

export { commitUpdates, SocketClient } from "napl";
import stringify from "json-stringify-pretty-compact";
import { SocketClient } from "napl";

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

async function start() {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = "0px";
  div.style.left = "0px";
  div.style.backgroundColor = "silver";
  div.style.width = "100vw";
  div.style.padding = "5px";
  div.style.margin = "0px";
  div.style.opacity = ".8";
  div.style.cursor = "pointer";
  div.addEventListener("mousedown", () => document.body.removeChild(div));
  div.innerText = "❌ hello world";
  document.body.appendChild(div);
}

document.addEventListener('DOMContentLoaded', () => {
  start();
});

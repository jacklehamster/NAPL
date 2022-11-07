import Auxiliaries from './engine/auxiliary-loader';
import Engine from './engine/engine';

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
    div.style.whiteSpace = "pre";
    div.style.fontFamily = "monospace";
    div.addEventListener("mousedown", () => document.body.removeChild(div));
    console.log(Auxiliaries);
    // div.innerText = JSON.stringify(Auxiliaries, null, "  ");
    document.body.appendChild(div);

    const engine = new Engine();
    const result = await engine.load();
    div.innerText = JSON.stringify(result, null, "  ");
    engine.process(result);
}

document.addEventListener('DOMContentLoaded', start);

import { gameUI } from "./game/gameUI.js";

const container = document.getElementById("app");

export function Init() {
    gameUI(container);
}

Init();
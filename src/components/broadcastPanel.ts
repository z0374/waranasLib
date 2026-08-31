import { style } from "../../globals";
import type { HTMLElementW } from "../core/interface/intenface.index";
import {
  append,
  doItElement,
  setAttr,
} from "../core/parseHTML/parseHTML.index";

export function broadcastPanel(id: string, children: HTMLElementW | string) {
  const panelElement = doItElement("div");

  setAttr(panelElement, "id", id);
  panelElement.classes.add("broadcast-panel");

  if (typeof children === "string") {
    panelElement.textContent = children;
  } else {
    append(panelElement, children);
  }

  style.add(`
    .broadcast-panel {

    }
  `);

  return panelElement;
}

import type { HTMLElementW } from "../interface/parseHTML/generalHTMLElement";
import { doItElement } from "./createElement";

export function getChildren(
  element: HTMLElementW,
  index: number = 0,
): HTMLElementW {
  if (
    element.endTag &&
    element.children[index]
  ) {
    return element.children[index];
  }

  return doItElement("div");
}

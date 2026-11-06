import type { HTMLElementW } from "../../interface.index";
import { doItElement } from "../../main.index";

export function textBlock(text: string): HTMLElementW {
  const paragraf: HTMLElementW = doItElement("p");
  paragraf.textContent = text;

  return paragraf;
}

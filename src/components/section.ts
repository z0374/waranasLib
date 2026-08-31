import type { HTMLElementW } from "../core/interface/intenface.index";
import { doItElement } from "../core/parseHTML/parseHTML.index";

export function section(): HTMLElementW {
  return doItElement("section");
}

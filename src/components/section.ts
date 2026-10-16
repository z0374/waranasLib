import type { HTMLElementW, NormalElementW } from "../core/interface/intenface.index";
import { doItElement } from "../core/parseHTML/parseHTML.index";

export function section(): NormalElementW<string> {
  return doItElement("section");
}

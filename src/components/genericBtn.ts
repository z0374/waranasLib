import type { NormalElementW } from "../../interface.index";
import { doItElement } from "../core/parseHTML/parseHTML.index";

export function genericBtn(btnAtrb: [string, string]): NormalElementW<string> {
  const btn: NormalElementW<string> = doItElement("button");
  btn.setAttr("onclick", btnAtrb[0]);
  btn.textContent = btnAtrb[1];
  return btn;
}

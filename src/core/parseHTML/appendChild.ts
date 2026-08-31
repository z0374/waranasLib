// src/core/parseHTML/appendChild.ts

import type {
  HTMLElementW,
  NormalElementW,
} from "../interface/intenface.index";

export function appendChild<T extends string>(
  node: NormalElementW<T>,
  child: HTMLElementW,
): NormalElementW<T> {
  node.children.push(child);

  return node;
}

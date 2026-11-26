// src/core/parseHTML/unsetAttribute.ts

import type { HTMLElementW } from "../interface/intenface.index";
import type { FluentHTMLElementW } from "../type/type.index";

export function unsetAttr(
  node: HTMLElementW,
  key: string = "",
): HTMLElementW {
  const trimmedKey = key.trim();

  if (!trimmedKey) {
    throw new Error(
      "[Core - unsetAttribute Failure]: A chave (key) não pode estar vazia.",
    );
  }

  delete node.attrs[trimmedKey];

  return node;
}

export function refUnsetAttr(
  this: FluentHTMLElementW,
  key: string = "",
): FluentHTMLElementW {
  unsetAttr(this, key);

  return this;
}

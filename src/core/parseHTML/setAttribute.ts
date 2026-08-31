// src/core/parseHTML/setAttribute.ts

import type { HTMLElementW } from "../interface/intenface.index";
import type { FluentHTMLElementW } from "../type/type.index";

export function setAttr(
  node: HTMLElementW,
  key: string = "",
  value: string = "",
): HTMLElementW {
  const trimmedKey = key.trim();
  const trimmedValue = value.trim();

  if (!trimmedKey && !trimmedValue) {
    throw new Error(
      "[Core - setAttribute Failure]: A chave (key) e o valor (value) não podem ser ambos vazios.",
    );
  }

  if (!trimmedKey) {
    const attrsIndex = "qybfkW" + (Object.keys(node.attrs).length + 1);

    if (!node.attrs[attrsIndex]) {
      node.attrs[attrsIndex] = trimmedValue;
    } else {
      node.attrs[attrsIndex + attrsIndex] = trimmedValue;
    }
  } else {
    node.attrs[trimmedKey] = trimmedValue;
  }

  return node;
}

export function refSetAttr(
  this: FluentHTMLElementW,
  key: string = "",
  value: string = "",
): FluentHTMLElementW {
  setAttr(this, key, value);

  return this;
}

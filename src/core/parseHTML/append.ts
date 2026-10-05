// src/core/parseHTML/append.ts

import type {
  HTMLElementW,
  NormalElementW,
} from "../interface/intenface.index";

/**
 * Adiciona múltiplos elementos filhos ao nó pai.
 *
 * Os elementos são apenas referenciados.
 * Nenhum elemento é clonado ou copiado.
 */
export function append<T extends string>(
  node: NormalElementW<T>,
  ...children: HTMLElementW[]
): NormalElementW<T> {
  if (children.length === 0) {
    throw new Error(
      "[Core - append Failure]: Nenhum elemento filho foi fornecido.",
    );
  }

  for (let i = 0; i < children.length; i++) {
    node.children.push(children[i]);
  }

  return node;
}

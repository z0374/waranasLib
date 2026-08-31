// src/core/parseHTML/compiler.ts

import type { HTMLElementW } from "../interface/intenface.index";

export function htmlCompiler(node: HTMLElementW | string): string {
  // ==========================================
  // 0. Conteúdo bruto
  // ==========================================
  if (typeof node === "string") {
    return node;
  }

  // ==========================================
  // 1. Atributos
  // ==========================================
  const attrEntries = Object.entries(node.attrs);

  let attrsString = "";

  if (attrEntries.length > 0) {
    attrsString = attrEntries
      .map(([key, val]) => {
        // qybfkW* é reservado para atributos sem chave.
        // Exemplo:
        // qybfkW1 = "required"
        // => required
        if (key.startsWith("qybfkW")) {
          return val;
        }

        // Valor vazio representa atributo booleano.
        // Exemplo:
        // disabled = ""
        // => disabled
        if (val === "") {
          return key;
        }

        // Atributo normal.
        return `${key}="${val}"`;
      })
      .join(" ");
  }

  // ==========================================
  // 1.1. Classes
  // ==========================================
  if (node.classes.size > 0) {
    const classAttr = `class="${[...node.classes].join(" ")}"`;

    attrsString = attrsString ? `${classAttr} ${attrsString}` : classAttr;
  }

  // ==========================================
  // 1.2. Espaçamento
  // ==========================================
  const finalAttrsString = attrsString ? ` ${attrsString}` : "";

  // ==========================================
  // 2. Elemento único
  // ==========================================
  if (!node.endTag) {
    return `<${node.tag}${finalAttrsString}/>`;
  }

  // ==========================================
  // 3. Conteúdo
  // ==========================================
  const textContent = node.textContent;

  const childrenContent =
    node.children.length > 0 ? node.children.map(htmlCompiler).join("") : "";

  // textContent e children são independentes.
  const content = textContent + childrenContent;

  return `<${node.tag}${finalAttrsString}>${content}</${node.tag}>`;
}

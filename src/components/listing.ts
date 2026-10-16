import { append, type HTMLElementW, doItElement, style } from "waranas";

export interface ListingItem {
  tag: string;
  property?: string;
  content: string;
}

export function listing(array: ListingItem[]): HTMLElementW {
  // Cria o elemento <ul> com o id 'listing'
  const ul: HTMLElementW = doItElement("ul");
  ul.setAttr("id", "listing");

  // Aplica os estilos no elemento (equivalente ao css do PHP)
  style.add(`
    #listing {
      display: "flex",
      flexDirection: "column",
      fontSize: "120%"
      }
  `);

  // Percorre o array e monta cada <li>
  array.forEach((item, v) => {
    const li: HTMLElementW = doItElement("li");
    const childTag: HTMLElementW = doItElement(item.tag);

    childTag.setAttr("id", `a${v}`);

    if (item.property) {
      childTag.setAttr(item.property);
    }

    childTag.textContent = item.content;

    append(li, childTag);
    append(ul, li);
  });

  return ul;
}

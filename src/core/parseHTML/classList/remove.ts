import type { HTMLElementW } from "../../interface/intenface.index";
import { getClassesAsSet } from "./get";

/**
 * Remove uma ou mais classes do elemento.
 */
export function removeClassList(
  element: HTMLElementW,
  ...arr: string[]
): HTMLElementW {
  const classes = getClassesAsSet(element);

  arr.forEach((cls) => {
    // Caso a string enviada venha com várias classes (ex: "btn-primary active")
    const toRemove = cls.split(/\s+/).filter(Boolean);

    toRemove.forEach((c) => {
      classes.delete(c); // Remove a classe do Set em tempo constante O(1)
    });
  });

  element.classes = classes;
  return element;
}

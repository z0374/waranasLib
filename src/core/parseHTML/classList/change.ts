import type { HTMLElementW } from "../../interface/intenface.index";
import { getClassesAsSet } from "./get";

/**
 * Substitui uma classe por outra.
 */
export function changeClassList(
  element: HTMLElementW,
  class1: string,
  class2: string,
): HTMLElementW {
  const classes = getClassesAsSet(element);

  // Se a classe antiga existir no Set:
  if (classes.has(class1)) {
    classes.delete(class1); // Remove a antiga
    classes.add(class2); // Adiciona a nova
  }

  element.classes = classes;
  return element;
}

import type { HTMLElementW } from "../../interface/intenface.index";
import { getClassesAsSet } from "./get";

/**
 * Adiciona uma ou mais classes ao elemento.
 */
export function addClassList(
  element: HTMLElementW,
  ...arr: string[]
): HTMLElementW {
  // 1. Pega o Set higienizado
  const currentClasses = getClassesAsSet(element);

  // 2. Insere as novas classes enviadas
  arr.forEach((cls) => {
    const newClasses = cls.split(/\s+/).filter(Boolean);
    newClasses.forEach((c) => currentClasses.add(c));
  });

  // 3. Atualiza a referência no elemento
  element.classes = currentClasses;

  return element;
}

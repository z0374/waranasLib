import type { HTMLElementW } from "../../interface/intenface.index";

/**
 * Normaliza o Set de classes atual, garantindo que não existam
 * strings com espaços internos (ex: "btn btn-primary" vira "btn" e "btn-primary")
 * e remove valores nulos ou vazios.
 */
export function getClassesAsSet(element: HTMLElementW): Set<string> {
  // Garantia de segurança caso element.classes venha undefined
  const currentClasses = element.classes || new Set<string>();

  const normalizedClasses = new Set<string>();

  currentClasses.forEach((cls) => {
    // Separa por espaços e remove vazios
    const parts = cls.split(/\s+/).filter(Boolean);
    parts.forEach((part) => normalizedClasses.add(part));
  });

  return normalizedClasses;
}

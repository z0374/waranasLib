export function normalize(string: string): string {
  if (!string) return "";

  return string
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")      // Remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")         // Remove caracteres especiais
    .trim()
    .replace(/[\s_]+/g, "-")              // Substitui espaços e underscores por hífens
    .replace(/-+/g, "-")                  // Remove hífens duplicados
    .replace(/^-+|-+$/g, "");             // Trim de hífens nas pontas
}

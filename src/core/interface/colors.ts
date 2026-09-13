//PATH: src/core/interface/colors.ts

import type { COLOR } from "../type/color";

// Interface para definir um conjunto/paleta de cores
export interface Colors {
  primary?: COLOR;
  secondary?: COLOR;
  detail?: COLOR;
  accent?: COLOR;
  background?: COLOR;
  text?: COLOR;
  success?: COLOR;
  warning?: COLOR;
  error?: COLOR;
  [key: string]: COLOR | undefined; // Permite chaves dinâmicas extras se necessário
}

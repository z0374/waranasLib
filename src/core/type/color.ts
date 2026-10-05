//PATH: src/core/type/color.ts

export type COLOR =
  | `#${string}` // Cores HEX (ex: #FF0000, #FFF)
  | `rgb(${number}, ${number}, ${number})` // Cores RGB
  | `rgba(${number}, ${number}, ${number}, ${number})` // Cores RGBA (com opacidade)
  | `hsl(${number}, ${number}%, ${number}%)` // Cores HSL
  | `hsla(${number}, ${number}%, ${number}%, ${number})`;

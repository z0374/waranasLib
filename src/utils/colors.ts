export function colorTone(
  hex: string,
  percent: number,
  mode: "darken" | "lighten" = "darken",
): string {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  let red = r;
  let green = g;
  let blue = b;

  switch (mode.toLowerCase()) {
    case "lighten":
      red = Math.min(255, r + (r * percent) / 100);
      green = Math.min(255, g + (g * percent) / 100);
      blue = Math.min(255, b + (b * percent) / 100);
      break;

    case "darken":
    default:
      red = Math.max(0, r - (r * percent) / 100);
      green = Math.max(0, g - (g * percent) / 100);
      blue = Math.max(0, b - (b * percent) / 100);
      break;
  }

  return `#${Math.round(red).toString(16).padStart(2, "0")}${Math.round(green)
    .toString(16)
    .padStart(2, "0")}${Math.round(blue).toString(16).padStart(2, "0")}`;
}

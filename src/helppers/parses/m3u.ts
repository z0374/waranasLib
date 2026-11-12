export function parseM3U(
  m3u: string,
): string | null {
  const lines = m3u
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines[0] !== "#EXTM3U") {
    throw new Error(
      "O conteúdo informado não é um M3U válido.",
    );
  }

  return (
    lines.find(
      (line) => !line.startsWith("#"),
    ) ?? null
  );
}

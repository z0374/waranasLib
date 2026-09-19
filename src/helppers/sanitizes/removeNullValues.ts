export function cleanNullValues(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (
      value === null ||
      value === undefined ||
      value === 0 ||
      value === ""
    ) {
      continue;
    }

    if (
      typeof value === "number" &&
      Number.isNaN(value)
    ) {
      continue;
    }

    result[key] = value;
  }

  return result;
}
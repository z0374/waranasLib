export async function hash16(value: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );

  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  const step = Math.floor(hash.length / 16);

  let result = "";

  for (let i = 0; i < 16; i++) {
    result += hash[i * step];
  }

  return result;
}

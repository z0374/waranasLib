import { signWithHmac } from "../signWithHmac";

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifyHashPage(
  token: string,
  validKey: string,
  maxAgeMs?: number
): Promise<boolean> {
  if (!token || !validKey) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [baseHash, issuedAtStr, signature] = parts;
  const issuedAt = Number(issuedAtStr);

  if (!baseHash || !signature || !Number.isFinite(issuedAt) || issuedAt <= 0) {
    return false;
  }

  if (typeof maxAgeMs === "number" && maxAgeMs > 0) {
    if (Date.now() - issuedAt > maxAgeMs) {
      return false;
    }
  }

  const expectedSignature = await signWithHmac(`${baseHash}:${issuedAt}`, validKey);
  return timingSafeEqual(signature, expectedSignature);
}

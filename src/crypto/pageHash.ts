import { headAssets, script } from "../../globals";
import { signWithHmac } from "./signWithHmac";


export async function hashPage(seed: string, validKey: string): Promise<string> {
  const encoder = new TextEncoder();
  const nonce = crypto.randomUUID();
  const issuedAt = Date.now();
  const rawBase = `${seed}:${nonce}:${issuedAt}`;

  const baseBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(rawBase));
  const baseHash = Array.from(new Uint8Array(baseBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  const signature = await signWithHmac(`${baseHash}:${issuedAt}`, validKey);
  const verifiableHash = `${baseHash}.${issuedAt}.${signature}`;

  headAssets.hashPage = verifiableHash;
  script.add(`
    (() => {
      const d = new Date();
      const normalizedDate = Number(
        \`\${d.getFullYear()}\${String(d.getMonth() + 1).padStart(2, "0")}\${String(d.getDate()).padStart(2, "0")}\${String(d.getHours()).padStart(2, "0")}\${String(d.getMinutes()).padStart(2, "0")}\${String(d.getSeconds()).padStart(2, "0")}\`
      );

      localStorage.setItem("hashPage", JSON.stringify({
        hash: "${verifiableHash}",
        date: normalizedDate
      }));
    })();
  `);

  return verifiableHash;
}

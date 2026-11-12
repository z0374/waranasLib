import { hash16 } from "../../crypto/crypto.index";
import { contentTypeForExt } from "../../utils/utils.index";

export async function requestSaveKV(
  assets: KVNamespace,
  response: Response,
): Promise<string> {
  const contentType =
    response.headers.get("content-type") ?? "application/octet-stream";

  const extension = contentTypeForExt(contentType);
  const contentArq = await response.arrayBuffer();

  while (true) {
    const filename = await hash16(
      `${Math.random()}-${Date.now()}-${performance.now()}.${extension}`,
    );

    const key = `${extension}/${filename}`;

    const exists = await assets.get(key);

    if (exists !== null) {
      continue;
    }

    await assets.put(key, contentArq, {
      metadata: {
        contentType,
      },
    });

    return key;
  }
}

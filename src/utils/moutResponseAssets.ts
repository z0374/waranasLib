import { recoveryKV } from "../database/kv/recoveryKV";
import { contentTypes } from "../maps/maps.index";

export async function mountResponseAssets(
  assets: KVNamespace,
  key: string,
): Promise<Response> {
  const contentArq = await recoveryKV(assets, key);

  if (contentArq === null) {
    return new Response(null, {
      status: 404,
    });
  }

  const ext = key.split("/")[0];

  const contentType = contentTypes[ext] ?? "application/octet-stream";

  return new Response(contentArq, {
    status: 200,
    headers: {
      "Content-Type": contentType,
    },
  });
}

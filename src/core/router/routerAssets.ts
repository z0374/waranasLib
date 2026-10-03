import { responseAssets } from "../../api/response/responseAssets";
import { contentTypes } from "../../maps/maps.index";
import { recoveryKV } from "../../database/kv/recoveryKV";

export async function routerAssets(
  assets: KVNamespace,
  request: Request,
): Promise<Response | undefined> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const prefix = "/assets/";

  const key = pathname.startsWith(prefix)
    ? pathname.slice(prefix.length)
    : pathname.slice(1);

  if (!key) {
    return;
  }

  const [ext, filename] = key.split("/");

  if (!ext || !filename || !contentTypes[ext]) {
    return;
  }

  const dotIndex = filename.lastIndexOf(".");

  if (dotIndex !== -1) {
    const fileExt = filename.substring(dotIndex + 1).toLowerCase();

    if (fileExt !== ext.toLowerCase()) {
      return;
    }
  }

  let assetKey = key;

  const content = await recoveryKV(assets, assetKey);

  if (content === null && dotIndex === -1) {
    assetKey = `${key}.${ext}`;
  }

  return await responseAssets(assets, assetKey);
}

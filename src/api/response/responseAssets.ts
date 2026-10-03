import { mountResponseAssets } from "../../utils/utils.index";

export async function responseAssets(
  assets: KVNamespace,
  key: string,
): Promise<Response> {
  return await mountResponseAssets(assets, key);
}

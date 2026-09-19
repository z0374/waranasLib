export async function recoveryKV(
  assets: KVNamespace,
  key: string,
): Promise<ArrayBuffer> {
  const result = await assets.get(key, "arrayBuffer");
  if (!result) return new ArrayBuffer(0);
  return result;
}

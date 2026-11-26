export async function verifyKV(
  assets: KVNamespace,
  key: string,
): Promise<boolean> {
  const value = await assets.get(key);

  return value !== null;
}

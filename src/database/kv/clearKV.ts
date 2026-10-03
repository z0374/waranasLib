export async function clearKV(assets: KVNamespace): Promise<void> {
  let cursor: string | undefined = undefined;

  do {
    const result: KVNamespaceListResult<unknown> = await assets.list({
      cursor,
      limit: 1000,
    });

    await Promise.all(result.keys.map((key) => assets.delete(key.name)));

    if (result.list_complete) {
      break;
    }

    cursor = result.cursor;
  } while (true);
}

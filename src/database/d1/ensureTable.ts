/**
 * Cria uma tabela no Cloudflare D1 caso ela ainda não exista.
 */
export async function ensureTableExists(
  db: D1Database,
  tableName: string,
  schema: string,
): Promise<void> {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${schema});`;
  await db.prepare(query).run();
}

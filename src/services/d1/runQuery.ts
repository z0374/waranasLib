// Se estiver usando Cloudflare D1, essa é a tipagem do banco.
// Caso seja outro banco (ex: Postgres, MySQL), basta trocar o tipo de `db`.
export async function runQuery<T>(
  query: string,
  db: any, // Troque `any` pelo tipo real do seu banco, ex: `D1Database`
  params: any[] = []
): Promise<T[]> {
  try {
    // 1. Prepara a query e faz o bind dos parâmetros (Prepared Statement)
    // Isso é vital para segurança (evita SQL Injection)
    const statement = db.prepare(query).bind(...params);

    // 2. Executa a query e pega os resultados
    // O .all() retorna todas as linhas encontradas
    const { results, success, error } = await statement.all();

    if (!success) {
      throw new Error(`Erro no banco de dados: ${error}`);
    }

    // 3. Retorna os resultados já tipados como um array de T
    return results as T[];

  } catch (error) {
    // Aqui você pode integrar com um serviço de log (ex: Sentry, Datadog)
    console.error(`[runQuery Error] Falha ao executar: ${query}`, error);

    // Repassa o erro para ser tratado pela rota/controller que chamou a função
    throw error;
  }
}

/**
 * Lê um dado de um KV Namespace do Cloudflare e o retorna como string.
 * 
 * @param kvBinding O namespace do KV injetado no ambiente (ex: env.ASSETS ou env.CORE)
 * @param key A chave identificadora do dado que você deseja buscar
 * @returns Uma Promise com a string armazenada ou null se a chave não for encontrada
 */
export async function readKV(
    kvBinding: KVNamespace, 
    key: string
): Promise<string> {
    try {
        if (!kvBinding) {
            console.error("[readFromKV] Erro: KVBinding não fornecido.");
            return "";
        }

        // O método get() sem parâmetros extras já retorna o valor como string (texto)
        const value = await kvBinding.get(key);
        
        if(value) return value;
return "";
    } catch (error) {
        console.error(`[readFromKV] Falha ao ler a chave '${key}' do KV:`, error);
        return "";
    }
}

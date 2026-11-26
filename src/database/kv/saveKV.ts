/**
 * Salva dados de forma assíncrona em um KV Namespace do Cloudflare.
 * 
 * @param kvBinding O namespace do KV injetado no ambiente (ex: env.ASSETS ou env.CORE)
 * @param key A chave identificadora do dado
 * @param data O dado a ser salvo (pode ser string, número ou objeto/array que será convertido para JSON)
 * @returns boolean indicando o sucesso da operação
 */
export async function saveToKV(
    kvBinding: KVNamespace, 
    key: string, 
    data: string
): Promise<boolean> {
    try {
        if (!kvBinding) {
            console.error("[saveToKV] Erro: KVBinding não fornecido.");
            return false;
        }

        // Se o dado for um objeto ou array, converte para string JSON. Caso contrário, usa o valor como string.
        const valueToStore = typeof data === 'object' && data !== null 
            ? JSON.stringify(data) 
            : String(data);

        // Salva utilizando o método nativo do Cloudflare KV
        await kvBinding.put(key, valueToStore);

        return true;
    } catch (error) {
        console.error(`[saveToKV] Falha ao salvar a chave '${key}' no KV:`, error);
        return false;
    }
}

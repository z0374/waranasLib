// Assumindo que typeValidators e ValidatorKey já existem no seu projeto
// export type ValidatorKey = 'string' | 'number' | 'float' | 'bool';

/**
 * Aplica um schema de tipagem em um objeto bruto de dados utilizando funções externas.
 * Ideal para higienizar retornos do banco antes de injetá-los na interface.
 * 
 * @param data O objeto com dados brutos (linha do banco de dados).
 * @param schema Mapeamento das chaves do objeto para os tipos (ValidatorKey).
 */
export function parseTypes<T>(
    data: string | number, 
    schema: Record<keyof T, ValidatorKey>
): T {
    // Se o dado bruto for nulo ou não for um objeto válido, retorna um objeto vazio tipado
    if (!data) {
        return {} as T;
    }

    const result: any = {};

    // Itera diretamente sobre as chaves definidas no schema
    for (const key in schema) {
        if (Object.prototype.hasOwnProperty.call(schema, key)) {
            const typeKey = schema[key];
            const converter = typeValidators[typeKey]; // Busca a função externa mapeada
            
            const rawValue = data[key];

            // Aplica a conversão. Se o conversor não existir, mantém o dado original por segurança.
            result[key] = converter ? converter(rawValue) : rawValue;
        }
    }

    return result as T;
}

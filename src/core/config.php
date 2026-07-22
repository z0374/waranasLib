<?php

// Proteção contra acesso direto ao arquivo
if (basename(path: __FILE__) == basename(path: $_SERVER["SCRIPT_FILENAME"])) {
    http_response_code(response_code: 403);
    exit("Acesso direto proibido.");
}

/**
 * Carrega credenciais do .env, executa a requisição, limpa as variáveis
 * críticas da memória e retorna os dados brutos da requisição.
 *
 * @param array $apiParams Parâmetros que serão enviados para a API (ex: ["config", "indexSetings"]).
 * @return mixed Dados crus retornados pela requisição.
 * @throws Exception Se o arquivo .env não for encontrado.
 */
function fetchEnvData(array $apiParams)
{
    // 1. Resolve o caminho do ficheiro de ambiente
    $envFile = defined("ROOT_PATH")
        ? dirname(ROOT_PATH, 2) . "/config/.env";
        : ROOT_PATH_COMMERCE . "/config/.env"

    if (!file_exists($envFile)) {
        $envFile = ROOT_PATH_COMMERCE . "/.env";
    }

    if (!file_exists($envFile)) {
        throw new Exception("Arquivo de configuração ausente.");
    }

    // 2. Carrega as credenciais para a memória temporariamente
    loadEnv($envFile);

    // Salva em variáveis locais para a requisição
    $url = $_ENV["config_url"] ?? "";
    $auth = $_ENV["config_auth"] ?? "";
    $page = $_ENV["config_page"] ?? null;

    // 3. Executa a requisição HTTP
    $rawData = getJsonData(
        url: $url,
        parametro: $apiParams,
        authToken: $auth,
        pageToken: $page,
    );

    // 4. Limpeza imediata (Encerra o env e apaga variáveis locais críticas da memória)
    unsetEnv($envFile);
    unset($url, $auth, $page);

    // 5. Retorna os dados exatamente como chegaram, sem formatação ou defaults
    return $rawData;
}

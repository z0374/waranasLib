<?php // ROOT_PATH_WARANAS_LIB . "/src/service/registerAPI.php"

/**
 * Registra uma API no manifest BIN.
 *
 * @param string $term Nome da API.
 * @param string $path Caminho absoluto do arquivo da API.
 *
 * @return void
 */
function registerAPI(string $term, string $path): void
{
    if (!file_exists(API_ROUTERS_FILE)) {
        createManifestBIN(API_ROUTERS_FILE);
    }

    $line = indexBIN($term);

    $record = packerBIN([$term, $path]);

    writeBIN(API_ROUTERS_FILE, $line, $record);
}

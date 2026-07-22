<?php // ROOT_PATH_WARANAS_LIB . "/src/core/router.php"

/**
 * Roteador das APIs da Waranas Library.
 *
 * Fluxo:
 * 1. Obtém o termo entre "/" e "?Wr";
 * 2. Converte o camelCase para caminho;
 * 3. Tenta carregar a API interna da biblioteca;
 * 4. Caso não exista, procura no manifest BIN.
 *
 * @return void
 */
function apiRouter(): void
{
    $uri = (string) $_SERVER["REQUEST_URI"];

    if (!preg_match('/\/([^\/]+)\?Wr/i', $uri, $matches)) {
        return;
    }

    $term = $matches[1];

    //ex.: chatApi -> chat/api
    $actionPath = strtolower(
        preg_replace('/([A-Z])/', '/$1', $term)
    );

    $fileRouter =
        ROOT_PATH_WARANAS_LIB .
        "/public/api/" .
        $actionPath .
        ".php";

    // API interna da biblioteca
    if (is_file($fileRouter)) {
        require_once $fileRouter;
        return;
    }

    // API registrada no manifest BIN
    loadingAPI($term);
}
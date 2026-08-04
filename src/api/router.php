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

    // =========================================================================
    // 1. EXTRAÇÃO DO TERMO (Substitui o preg_match)
    // =========================================================================

    // Procura a posição de "?Wr" na string ignorando maiúsculas/minúsculas (case-insensitive)
    $posWr = stripos($uri, "?Wr");

    if ($posWr === false) {
        return;
    }

    // Isola tudo que vem ANTES de "?Wr" (ex: "/api/v1/chatApi")
    $beforeWr = substr($uri, 0, $posWr);

    // Encontra a posição da ÚLTIMA barra "/" antes do "?Wr"
    $lastSlashPos = strrpos($beforeWr, "/");

    if ($lastSlashPos === false) {
        return;
    }

    // Extrai exatamente o que está entre a última "/" e o "?Wr"
    $term = substr($beforeWr, $lastSlashPos + 1);

    // Se não sobrar nada, interrompe
    if ($term === "") {
        return;
    }

    // =========================================================================
    // 2. CONVERSÃO DE CAMELCASE PARA CAMINHO (Substitui o preg_replace)
    // =========================================================================

    $actionPath = "";

    // Quebra a string em um array de letras e itera sobre cada uma
    foreach (str_split($term) as $char) {
        // Se a letra for maiúscula, adiciona uma barra "/" e converte pra minúscula
        if (ctype_upper($char)) {
            $actionPath .= "/" . strtolower($char);
        } else {
            // Se for minúscula, só adiciona a letra normalmente
            $actionPath .= $char;
        }
    }

    // =========================================================================
    // 3. ROTEAMENTO
    // =========================================================================

    $fileRouter = ROOT_PATH_WARANAS_LIB . "/public/api/" . $actionPath . ".php";

    // API interna da biblioteca
    if (is_file($fileRouter)) {
        require_once $fileRouter;
        return;
    }

    // API registrada no manifest BIN
    loaderAPI($term);
}

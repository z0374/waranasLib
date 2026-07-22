<?php // ROOT_PATH_WARANAS_LIB . "/src/service/loaderApi.php"

/**
 * Carrega uma API registrada no manifest BIN.
 *
 * @param string $term Nome da API.
 *
 * @return bool
 */
function loaderAPI(string $term): bool
{
    if (!file_exists(API_ROUTERS_FILE)) {
        return false;
    }

    $line = indexBIN($term);

    $buffer = readBIN(
        API_ROUTERS_FILE,
        $line
    );

    if ($buffer === false) {
        return false;
    }

    $path = findBIN(
        $term,
        $buffer
    );

    if ($path === false) {
        return false;
    }

    if (!is_file($path)) {
        return false;
    }

    require_once $path;

    return true;
}
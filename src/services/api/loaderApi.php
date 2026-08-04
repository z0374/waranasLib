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
    // echo "<pre>";
    // echo "=============== LOADER API ===============\n";
    // echo "Term.............: {$term}\n";
    // echo "Manifest.........: " . API_ROUTERS_FILE . "\n";

    if (!file_exists(API_ROUTERS_FILE)) {
        // echo "ERRO: Manifest não encontrado.\n";
        // echo "==========================================\n";
        // echo "</pre>";
        return false;
    }

    // echo "Manifest existe..: SIM\n";
    // echo "Manifest size....: " . filesize(API_ROUTERS_FILE) . " bytes\n";

    /*
    |--------------------------------------------------------------------------
    | Linha
    |--------------------------------------------------------------------------
    */

    $line = indexBIN($term);

    // echo "Linha calculada..: {$line}\n";

    /*
    |--------------------------------------------------------------------------
    | Buffer
    |--------------------------------------------------------------------------
    */

    $buffer = readBIN(API_ROUTERS_FILE, $line);

    if ($buffer === false) {
        // echo "ERRO: readBIN retornou FALSE.\n";
        // echo "==========================================\n";
        // echo "</pre>";
        return false;
    }

    // echo "Buffer size......: " . strlen($buffer) . " bytes\n";
    // echo "Primeiro byte....: " . ord($buffer[0]) . "\n";

    // echo "\nPrimeiros 128 bytes (HEX)\n";
    // echo implode(
    //     " ",
    //     str_split(strtoupper(bin2hex(substr($buffer, 0, 128))), 2),
    // );
    // echo "\n\n";

    /*
    |--------------------------------------------------------------------------
    | Busca do caminho
    |--------------------------------------------------------------------------
    */

    // echo "ANTES findBIN<br>";

    $path = findBIN($term, $buffer);

    // echo "DEPOIS findBIN<br>";

    // echo "=============== PATH =====================\n";
    // echo "Valor bruto......: ";
    // var_dump($path);

    if ($path === false) {
        // echo "ERRO: findBIN não encontrou o termo.\n";
        // echo "==========================================\n";
        // echo "</pre>";
        return false;
    }

    // echo "Comprimento......: " . strlen($path) . "\n";
    // echo "HEX..............: " . strtoupper(bin2hex($path)) . "\n";
    // echo "Trim.............: [" . trim($path) . "]\n";

    // echo "Realpath.........: ";
    // var_dump(realpath(trim($path)));

    // echo "file_exists......: ";
    // var_dump(file_exists(trim($path)));

    // echo "is_file..........: ";
    // var_dump(is_file(trim($path)));

    // echo "is_readable......: ";
    // var_dump(is_readable(trim($path)));

    /*
    |--------------------------------------------------------------------------
    | Normalização
    |--------------------------------------------------------------------------
    */

    $path = str_replace("\0", "", $path);
    $path = rtrim($path);

    // echo "\n=============== PATH NORMALIZADO =========\n";
    // echo "Path.............: {$path}\n";
    // echo "Comprimento......: " . strlen($path) . "\n";
    // echo "HEX..............: " . strtoupper(bin2hex($path)) . "\n";

    // echo "Realpath.........: ";
    // var_dump(realpath($path));

    // echo "file_exists......: ";
    // var_dump(file_exists($path));

    // echo "is_file..........: ";
    // var_dump(is_file($path));

    // echo "is_readable......: ";
    // var_dump(is_readable($path));

    // if (file_exists($path)) {
    //     echo "filesize.........: " . filesize($path) . " bytes\n";
    // }

    /*
    |--------------------------------------------------------------------------
    | Carregamento
    |--------------------------------------------------------------------------
    */

    if (!is_file($path)) {
        // echo "\nERRO: Arquivo não encontrado.\n";
        // echo "==========================================\n";
        // echo "</pre>";
        return false;
    }

    // echo "\nCarregando.......: {$path}\n";

    try {
        require_once $path;
        // echo "API carregada com sucesso.\n";
    } catch (Throwable $e) {
        // echo "\nERRO AO CARREGAR API\n";
        // echo "Mensagem.........: " . $e->getMessage() . "\n";
        // echo "Arquivo..........: " . $e->getFile() . "\n";
        // echo "Linha............: " . $e->getLine() . "\n";
        // echo "\nStack Trace:\n";
        // echo $e->getTraceAsString();
        // echo "\n==========================================\n";
        // echo "</pre>";
        return false;
    }

    // echo "==========================================\n";
    // echo "</pre>";

    return true;
}

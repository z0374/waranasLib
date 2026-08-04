<?php // ROOT_PATH_WARANAS_LIB . "/src/service/registerAPI.php"

/**
 * Registra uma API no manifest BIN.
 *
 * @param string $term Nome da API.
 * @param string $path Caminho relativo ou absoluto da API.
 *
 * @return string
 */
function registerAPI(string $term, string $path)
{
    // echo "<pre>";
    // echo "=============== REGISTER API ===============\n";
    // echo "Term..............: {$term}\n";
    // echo "Path..............: {$path}\n";

    /*
    |--------------------------------------------------------------------------
    | Manifest
    |--------------------------------------------------------------------------
    */

    // echo "\nManifest..........: " . API_ROUTERS_FILE . "\n";

    if (!file_exists(API_ROUTERS_FILE)) {
        // echo "Manifest..........: NÃO EXISTE\n";
        // echo "Criando manifest...\n";

        createManifestBIN(API_ROUTERS_FILE);
    }
    // else {
    //     echo "Manifest..........: EXISTE\n";
    //     echo "Tamanho...........: " . filesize(API_ROUTERS_FILE) . " bytes\n";
    // }

    /*
    |--------------------------------------------------------------------------
    | Normalização
    |--------------------------------------------------------------------------
    */

    $normalTerm = normAlphaNum($term);

    // echo "\nTerm original.....: {$term}\n";
    // echo "Term normalizado..: {$normalTerm}\n";

    /*
    |--------------------------------------------------------------------------
    | Linha
    |--------------------------------------------------------------------------
    */

    $line = indexBIN($normalTerm);

    // echo "\nLinha calculada...: {$line}\n";

    /*
    |--------------------------------------------------------------------------
    | Registro
    |--------------------------------------------------------------------------
    */

    $record = packerBIN([$normalTerm, $path]);

    // echo "\nRecord size.......: " . strlen($record) . " bytes\n";
    // echo "Status............: " . ord($record[0]) . "\n";
    // echo "\nPrimeiros 128 bytes (HEX)\n";
    // echo implode(" ", str_split(strtoupper(bin2hex(substr($record, 0, 128))), 2));
    // echo "\n";

    /*
    |--------------------------------------------------------------------------
    | Escrita
    |--------------------------------------------------------------------------
    */

    // echo "\nGravando registro...\n";

    $written = writeBIN(API_ROUTERS_FILE, $line, $record);

    // echo "Resultado write...: ";
    // var_dump($written);

    /*
    |--------------------------------------------------------------------------
    | Verificação
    |--------------------------------------------------------------------------
    */

    // echo "\nRelendo linha.....\n";

    $buffer = readBIN(API_ROUTERS_FILE, $line);

    // if ($buffer === false) {
    //     echo "ERRO: readBIN retornou FALSE.\n";
    // } else {
    //     echo "Buffer size.......: " . strlen($buffer) . " bytes\n";
    // }

    $storedPath = findBIN($normalTerm, $buffer);

    // echo "Registro lido.....: ";
    // var_dump($storedPath);

    // if ($storedPath !== null) {
    //     echo "Arquivo existe....: ";
    //     var_dump(file_exists($storedPath));
    //     echo "Realpath..........: ";
    //     var_dump(realpath($storedPath));
    // }

    /*
    |--------------------------------------------------------------------------
    | Final
    |--------------------------------------------------------------------------
    */

    $route = "/" . $normalTerm . "?Wr";

    // echo "\nRota..............: {$route}\n";
    // echo "=============== REGISTER API END ===============\n";
    // echo "</pre>";

    return $route;
}

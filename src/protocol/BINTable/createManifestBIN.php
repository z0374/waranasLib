<?php // ROOT_PATH_WARANAS_LIB . /src/protocol/BINTable/createManifestBIN.php

/**
 * Cria um arquivo BINPACK vazio.
 *
 * Cada registro é inicializado com o byte de controle
 * BYTE_STATUS_EMPTY seguido de bytes nulos.
 *
 * O arquivo já nasce com seu tamanho definitivo.
 *
 * @param string $file Caminho do arquivo BINPACK.
 *
 * @return bool
 */
function createManifestBIN(string $file): bool
{
    $directory = dirname($file);

    if (!is_dir($directory) && !mkdir($directory, 0777, true)) {
        return false;
    }

    $handle = fopen($file, "wb");

    if ($handle === false) {
        return false;
    }

    // Registro vazio do protocolo
    $record = BYTE_STATUS_EMPTY . str_repeat("\0", BINPACK_RECORD_SIZE - 1);

    // Linha vazia composta por BINPACK_LEVELS registros
    $line = str_repeat($record, BINPACK_LEVELS);

    // Escreve todas as linhas do manifest
    for ($i = 0; $i < BINPACK_LINES; $i++) {
        if (fwrite($handle, $line) !== BIN_LINE_SIZE) {
            fclose($handle);
            return false;
        }
    }

    fflush($handle);
    fclose($handle);

    return true;
}

<?php // ROOT_PATH_WARANAS_LIB . /src/protocol/BINTable/readBIN.php

/**
 * Lê uma linha lógica de um arquivo BINPACK.
 *
 * Cada linha é composta por BINPACK_LEVELS registros consecutivos
 * de BINPACK_RECORD_SIZE bytes.
 *
 * O protocolo garante que apenas a linha solicitada será lida.
 *
 * @param string $file Caminho do arquivo BINPACK.
 * @param int    $line Índice da linha.
 *
 * @return string|false Buffer contendo a linha ou false em caso de erro.
 */
function readBIN(string $file, int $line): string|false
{
    if (!is_file($file)) {
        return false;
    }

    $handle = fopen($file, "rb");

    if ($handle === false) {
        return false;
    }

    $lineSize = BINPACK_LEVELS * BINPACK_RECORD_SIZE;

    $offset = $line * $lineSize;

    if (fseek($handle, $offset) !== 0) {
        fclose($handle);
        return false;
    }

    $buffer = fread($handle, $lineSize);

    fclose($handle);

    return $buffer;
}

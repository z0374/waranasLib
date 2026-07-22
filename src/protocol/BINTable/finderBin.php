<?php // ROOT_PATH_WARANAS_LIB . /src/protocol/BINTable/findBIN.php

/**
 * Procura um registro BINPACK v1 dentro de um buffer.
 *
 * O buffer pode conter um ou mais registros consecutivos.
 * A busca percorre os níveis até encontrar um registro vazio
 * (BYTE_STATUS_EMPTY) ou um termo correspondente.
 *
 * Estrutura do registro:
 *
 * Byte 0        -> Status
 * Bytes 1..32   -> Termo
 * Bytes 33..255 -> Conteúdo
 *
 * @param string $term
 * @param string $buffer
 *
 * @return string|null Conteúdo encontrado ou null.
 */
function findBIN(string $term, string $buffer): ?string
{
    $compare = $term . "\0";

    $compareLength = strlen($compare);
    $bufferLength = strlen($buffer);

    for (
        $offset = 0;
        $offset + BINPACK_RECORD_SIZE <= $bufferLength;
        $offset += BINPACK_RECORD_SIZE
    ) {
        // Primeiro registro vazio encerra a busca.
        if ($buffer[$offset] === BYTE_STATUS_EMPTY) {
            break;
        }

        // Compara diretamente o termo armazenado.
        if (
            substr_compare($buffer, $compare, $offset + 1, $compareLength) === 0
        ) {
            return rtrim(
                substr(
                    $buffer,
                    $offset + 1 + BINPACK_TERM_SIZE,
                    BINPACK_PATH_SIZE,
                ),
                "\0",
            );
        }
    }

    return null;
}

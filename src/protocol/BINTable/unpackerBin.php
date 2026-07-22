<?php // ROOT_PATH_WARANAS_LIB/src/protocol/BINTable/unpackerBIN.php

/**
 * Desempacota um ou mais registros BINPACK v1.
 *
 * Estrutura do registro (256 bytes):
 *
 * Byte 0        -> Status
 * Bytes 1..32   -> Termo
 * Bytes 33..255 -> Conteúdo
 *
 * O retorno é indexado pelo termo para permitir
 * busca direta sem percorrer o array.
 *
 * @param string $buffer Buffer contendo um ou mais registros BINPACK.
 *
 * @return array<string,array{
 *     status:string,
 *     content:string
 * }>
 */
function unpackerBIN(string $buffer): array
{
    $records = [];

    $length = strlen($buffer);

    for (
        $offset = 0;
        $offset + BINPACK_RECORD_SIZE <= $length;
        $offset += BINPACK_RECORD_SIZE
    ) {
        $record = substr($buffer, $offset, BINPACK_RECORD_SIZE);

        $status = $record[0];

        // Primeiro registro vazio encerra a leitura
        if ($status === BYTE_STATUS_EMPTY) {
            break;
        }

        $term = rtrim(substr($record, 1, BINPACK_TERM_SIZE), "\0");

        $records[$term] = [
            "status" => $status,
            "content" => rtrim(
                substr($record, 1 + BINPACK_TERM_SIZE, BINPACK_PATH_SIZE),
                "\0",
            ),
        ];
    }

    return $records;
}

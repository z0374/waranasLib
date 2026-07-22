<?php // ROOT_PATH_WARANAS_LIB/src/protocol/BINTable/packerBIN.php

/**
 * Serializa um registro BIN.
 *
 * Estrutura:
 *
 * Byte 0        -> Status (BYTE_STATUS_USED)
 * Byte 1..32    -> Termo
 * Byte 33..255  -> Conteúdo
 *
 * @param array{0:string,1:string} $value
 *
 * @return string
 */
function packerBIN(array $value): string
{
    [$term, $content] = $value;

    $buffer = BYTE_STATUS_USED;

    $buffer .= str_pad(
        substr($term, 0, BIN_TERM_SIZE),
        BIN_TERM_SIZE,
        "\0",
        STR_PAD_RIGHT,
    );

    $buffer .= str_pad(
        substr($content, 0, BIN_CONTENT_SIZE),
        BIN_CONTENT_SIZE,
        "\0",
        STR_PAD_RIGHT,
    );

    return str_pad(
        substr($buffer, 0, BINPACK_RECORD_SIZE),
        BINPACK_RECORD_SIZE,
        "\0",
        STR_PAD_RIGHT,
    );
}

<?php // ROOT_PATH_WARANAS_LIB . /src/protocol/BINTable/writeBIN.php

/**
 * Escreve um registro em uma linha do BINPACK.
 *
 * O protocolo:
 *  - verifica se o registro já existe;
 *  - procura automaticamente o primeiro nível livre;
 *  - grava o registro informado.
 *
 * @param string $file   Caminho do arquivo BINPACK.
 * @param int    $line   Índice da linha.
 * @param string $record Registro binário de BINPACK_RECORD_SIZE bytes.
 *
 * @return bool
 */
function writeBIN(string $file, int $line, string $record): bool
{
    if (strlen($record) !== BINPACK_RECORD_SIZE) {
        return false;
    }

    $buffer = readBIN($file, $line);

    if ($buffer === false) {
        return false;
    }

    // Primeiros 33 bytes (status + termo)
    $identity = substr($record, 0, BIN_TERM_SIZE + 1);

    for ($level = 0; $level < BINPACK_LEVELS; $level++) {
        $offset = $level * BINPACK_RECORD_SIZE;

        // Registro vazio: grava aqui
        if ($buffer[$offset] === BYTE_STATUS_EMPTY) {
            $buffer = substr_replace(
                $buffer,
                $record,
                $offset,
                BINPACK_RECORD_SIZE,
            );

            $handle = fopen($file, "r+b");

            if ($handle === false) {
                return false;
            }

            $lineOffset = $line * BIN_LINE_SIZE;

            if (fseek($handle, $lineOffset) !== 0) {
                fclose($handle);
                return false;
            }

            $written = fwrite($handle, $buffer);

            fflush($handle);
            fclose($handle);

            return $written === BIN_LINE_SIZE;
        }

        // Registro já existe
        if (substr($buffer, $offset, BIN_TERM_SIZE + 1) === $identity) {
            return true;
        }
    }

    // Todos os níveis ocupados.
    return false;
}

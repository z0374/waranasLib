<?php // ROOT_PATH_WARANAS_LIB . /src/protocol/BINTable/writeBIN.php

/**
 * Escreve um registro em uma linha do BINPACK.
 *
 * O protocolo:
 * - verifica se o registro já existe;
 * - procura automaticamente o primeiro nível livre;
 * - grava o registro informado.
 *
 * @param string $file   Caminho do arquivo BINPACK.
 * @param int    $line   Índice da linha.
 * @param string $record Registro binário de BINPACK_RECORD_SIZE bytes.
 *
 * @return bool
 */
function writeBIN(string $file, int $line, string $record): bool
{
    // echo "<pre>";
    // echo "================ WRITE BIN ================\n";
    // echo "Arquivo : {$file}\n";
    // echo "Linha   : {$line}\n";
    // echo "Existe  : " . (file_exists($file) ? "SIM" : "NÃO") . "\n";
    // echo "Tamanho : " . (file_exists($file) ? filesize($file) : 0) . "\n";
    // echo "Record  : " . strlen($record) . " bytes\n";

    if (strlen($record) !== BINPACK_RECORD_SIZE) {
        // echo "ERRO: Tamanho do registro inválido.\n";
        // echo "</pre>";
        return false;
    }

    // echo "\nRegistro (HEX):\n";
    // echo strtoupper(bin2hex($record)) . "\n";

    $buffer = readBIN($file, $line);

    if ($buffer === false) {
        // echo "\nERRO: readBIN retornou FALSE.\n";
        // echo "</pre>";
        return false;
    }

    // echo "\nBuffer lido:\n";
    // echo "Bytes : " . strlen($buffer) . "\n";
    // echo "HEX   : " . strtoupper(bin2hex(substr($buffer, 0, 128))) . "...\n";

    $identity = substr($record, 0, BIN_TERM_SIZE + 1);

    // echo "\nIdentity:\n";
    // echo strtoupper(bin2hex($identity)) . "\n";

    for ($level = 0; $level < BINPACK_LEVELS; $level++) {
        $offset = $level * BINPACK_RECORD_SIZE;

        // echo "\n----------------------------------------\n";
        // echo "LEVEL  : {$level}\n";
        // echo "OFFSET : {$offset}\n";

        $status = ord($buffer[$offset]);

        // echo "STATUS : {$status} (0x" . strtoupper(dechex($status)) . ")\n";

        if ($buffer[$offset] === BYTE_STATUS_EMPTY) {
            // echo "Registro vazio. Gravando...\n";

            $buffer = substr_replace(
                $buffer,
                $record,
                $offset,
                BINPACK_RECORD_SIZE,
            );

            // echo "Novo buffer (primeiros 128 bytes):\n";
            // echo strtoupper(bin2hex(substr($buffer, 0, 128))) . "...\n";

            $handle = fopen($file, "r+b");

            if ($handle === false) {
                // echo "ERRO: fopen falhou.\n";
                // echo "</pre>";
                return false;
            }

            $lineOffset = $line * BIN_LINE_SIZE;

            // echo "File Offset: {$lineOffset}\n";

            if (fseek($handle, $lineOffset) !== 0) {
                // echo "ERRO: fseek falhou.\n";
                fclose($handle);
                // echo "</pre>";
                return false;
            }

            $written = fwrite($handle, $buffer);

            // echo "Bytes escritos: {$written}\n";

            fflush($handle);
            fclose($handle);

            // echo "Resultado: " . ($written === BIN_LINE_SIZE ? "SUCESSO" : "FALHOU") . "\n";
            // echo "=========================================\n";
            // echo "</pre>";

            return $written === BIN_LINE_SIZE;
        }

        $currentIdentity = substr($buffer, $offset, BIN_TERM_SIZE + 1);

        // echo "Identity atual:\n";
        // echo strtoupper(bin2hex($currentIdentity)) . "\n";

        if ($currentIdentity === $identity) {
            // echo "Registro já existe.\n";
            // echo "=========================================\n";
            // echo "</pre>";
            return true;
        }
    }

    // echo "\nTodos os níveis estão ocupados.\n";
    // echo "=========================================\n";
    // echo "</pre>";

    return false;
}

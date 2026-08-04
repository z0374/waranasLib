<?php // ROOT_PATH_WARANAS_LIB . /src/protocol/BINTable/findBIN.php

/**
 * Procura um registro BINPACK v1 dentro de um buffer.
 *
 * @param string $term
 * @param string $buffer
 *
 * @return string|null
 */
function findBIN(string $term, string $buffer): ?string
{
    // echo "<pre>";
    // echo "=============== FINDBIN ===============\n";
    // echo "Term...............: {$term}\n";

    $compare = $term . "\0";

    $compareLength = strlen($compare);
    $bufferLength = strlen($buffer);

    // echo "Compare Length.....: {$compareLength}\n";
    // echo "Buffer Length......: {$bufferLength}\n";
    // echo "Record Size........: " . BINPACK_RECORD_SIZE . "\n";
    // echo "Levels.............: " . BINPACK_LEVELS . "\n";
    // echo "\n";

    for (
        $offset = 0;
        $offset + BINPACK_RECORD_SIZE <= $bufferLength;
        $offset += BINPACK_RECORD_SIZE
    ) {
        // echo "--------------------------------------\n";
        // echo "Offset.............: {$offset}\n";
        // echo "Status.............: " . ord($buffer[$offset]) . "\n";

        // Registro vazio
        if ($buffer[$offset] === BYTE_STATUS_EMPTY) {
            // echo "Registro vazio. Encerrando busca.\n";
            break;
        }

        $storedTerm = rtrim(substr($buffer, $offset + 1, BIN_TERM_SIZE), "\0");

        // echo "Stored Term........: {$storedTerm}\n";

        $compareResult = substr_compare(
            $buffer,
            $compare,
            $offset + 1,
            $compareLength,
        );

        // echo "Compare Result.....: {$compareResult}\n";

        if ($compareResult === 0) {
            // echo ">>> TERMO ENCONTRADO <<<\n";

            $rawPath = substr(
                $buffer,
                $offset + 1 + BIN_TERM_SIZE,
                BIN_CONTENT_SIZE,
            );

            // echo "Raw Path Length....: " . strlen($rawPath) . "\n";
            // echo "Raw Path (HEX).....:\n";
            // echo strtoupper(bin2hex($rawPath)) . "\n";

            $path = rtrim($rawPath, "\0");

            // echo "Path...............: {$path}\n";
            // echo "Path Length........: " . strlen($path) . "\n";

            // echo "file_exists........: ";
            // var_dump(file_exists($path));

            // echo "is_file............: ";
            // var_dump(is_file($path));

            // echo "realpath...........: ";
            // var_dump(realpath($path));

            // echo "=============== FINDBIN END ===============\n";
            // echo "</pre>";

            return $path;
        }
    }

    // echo "Nenhum registro encontrado.\n";
    // echo "=============== FINDBIN END ===============\n";
    // echo "</pre>";

    return null;
}

<?php
// ROOT_PATH_WARANAS_LIB/src/protocol/hashBIN/hashBIN.php

/**
 * Gera índice de 0 até 255 usando XXH3-64.
 *
 * @param string $term
 *
 * @return int
 */
function hashBIN(string $term): int
{
    $hash = hash("xxh3", $term, true);

    /*
        Primeiro byte do hash = 8 bits

        0..255
    */
    return ord($hash[0]);
}

<?php
// ROOT_PATH_WARANAS_LIB/src/protocol/hashBIN/indexBin.php

/**
 * Gera índice absoluto dentro do BINPACK.
 *
 * hashBIN gera posições de 0..255.
 * Quando necessário, cria páginas adicionais.
 *
 * @param string $term
 *
 * @return int
 */
function indexBIN(string $term): int
{
    /*
        BINPACK menor ou igual a uma página
    */
    if (BINPACK_LINES <= 256) {
        return hashBIN($term);
    }

    /*
        Quantidade de páginas necessárias
    */
    $pageRange = ceil(BINPACK_LINES / 256);

    /*
        posição dentro da página
    */
    $position = hashBIN($term);

    /*
        página calculada pelo segundo hash
    */
    $pageIndex = hashBIN($term . "_page");

    $page = $pageIndex % $pageRange;

    /*
        índice absoluto
    */
    $index = $page * 256 + $position;

    /*
        proteção para última página incompleta
    */
    return $index < BINPACK_LINES ? $index : $index % BINPACK_LINES;
}

<?php
// 1. Esconde todos os avisos e erros da tela (saída do navegador/API)
ini_set("display_errors", 0);
ini_set("display_startup_errors", 0);

// 2. Desativa completamente o relatório de erros do PHP para a tela
error_reporting(0);
// Define o caminho raiz do projeto para facilitar a inclusão de arquivos.
define("ROOT_PATH_WARANAS_LIB", __DIR__);

require_once ROOT_PATH_WARANAS_LIB . "/src/core/bootstrap.php";

if (isset($GLOBALS["WARANAS_INTERNAL_REQ"])) {
    return;
}

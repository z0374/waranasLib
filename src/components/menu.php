<?php

/**
 * Gera a estrutura HTML e injeta os estilos de um menu de navegação.
 * * Este componente suporta dois tipos de itens de menu baseados nas chaves do array fornecido:
 * 1. Links simples: Utilizam as chaves 'content' e 'url' para gerar uma tag <a>.
 * 2. Labels/Toggles: Utilizam as chaves 'content' e 'for' para gerar uma tag <label>
 * e injetam um CSS dinâmico para controle de visibilidade (checkbox hack).
 *
 * @param array[] $array Array multidimensional contendo os itens do menu.
 * Estrutura esperada de cada item (associativo):
 * - Para Links: ['content' => 'Texto', 'url' => 'https://...']
 * - Para Menus Expansíveis: ['content' => 'Texto', 'for' => 'IdDoCheckbox']
 * @param string  $bg    Cor de fundo da barra de navegação (ex: '#304d57', 'rgba(0,0,0,0.5)', 'red').
 * * @return string Retorna o HTML finalizado encapsulado na tag <nav>.
 */
function menu($array, $bg)
{
    global $style, $css_files;

    // Proteção estrita do PHP 8 contra variáveis nulas nos arrays globais
    if (!is_array($css_files)) {
        $css_files = [];
    }
    if (!is_array($style)) {
        $style = [];
    }

    $nav = [];

    // Estilo base dinâmico do menu
    $style[] = "
        .navegation {
            background-color: {$bg};
        }
    ";

    // Carregamento do CSS estático do componente
    $component_css = ROOT_PATH_WARANAS_LIB . "/assets/css/components/menu.css";
    if (!in_array($component_css, $css_files)) {
        $css_files[] = $component_css;
    }

    // Processamento dos itens do menu
    foreach ($array as $item) {
        // Renderiza um link tradicional (<a>)
        if (
            array_key_exists("content", $item) &&
            array_key_exists("url", $item)
        ) {
            $nav[] = "<a class='menuButton' href='{$item["url"]}'>{$item["content"]}</a>";
        }
        // Renderiza um label (checkbox hack) para menus dropdown ou mobile
        elseif (
            array_key_exists("content", $item) &&
            array_key_exists("for", $item)
        ) {
            $nav[] = "<label class='menuLabel' id='menuLabel{$item["content"]}' for='menu{$item["for"]}'>{$item["content"]}</label>";
            // Injeta o CSS dinâmico que liga o estado :checked ao conteúdo visível
            $style[] = "#menu{$item["for"]}:checked ~ #menuContent{$item["for"]} { visibility:visible; display:flex; }";
        }
    }

    return "<nav class='navegation'>" . implode("", $nav) . "</nav>";
}

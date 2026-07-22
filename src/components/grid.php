<?php
function grid($id, $grids, $title)
{
    global $script,
        $script_files,
        $css_files,
        $media_mobile_portrait_geral,
        $media_mobile_landscape_geral;
    $section = [];

    $component_script = ROOT_PATH_WARANAS_LIB . "/assets/js/components/grid.js";
    if (!in_array($component_script, $script_files)) {
        $script_files[] = $component_script;
    }

    $component_style =
        ROOT_PATH_WARANAS_LIB . "/assets/css/components/grid.css";
    if (!in_array($component_style, $css_files)) {
        $css_files[] = $component_style;
    }

    $component_style_mobileP = file_get_contents(
        ROOT_PATH_WARANAS_LIB . "/assets/css/components/mobileP/grid.css",
    );
    if (!in_array($component_style_mobileP, $media_mobile_portrait_geral)) {
        $media_mobile_portrait_geral[] = $component_style_mobileP;
    }

    $component_style_mobileL = file_get_contents(
        ROOT_PATH_WARANAS_LIB . "/assets/css/components/mobileL/grid.css",
    );
    if (!in_array($component_style_mobileL, $media_mobile_landscape_geral)) {
        $media_mobile_landscape_geral[] = $component_style_mobileL;
    }

    $script[] = "document.addEventListener('DOMContentLoaded', () => gridInit('{$id}'));";

    // Supondo que $grids seja um array para configurar os itens, mas o loop original era fixo para 6
    for ($i = 0; $i < 8; $i++) {
        $section[] = "<div><figure id='img{$id}{$i}' ></figure><h2><button class='vr'>ver mais...</button></h2><p></p></div>";
    }

    return "<section id='{$id}' class='gridComponent'><h1>{$title}</h1>" .
        implode("", $section) .
        "</section>";
}

<?php
function minifyCSS($css)
{
    // 1. Remove comentários (/* ... */) SEM usar expressões regulares
    $partes = explode("/*", $css);
    $cssLimpo = $partes[0];
    for ($i = 1; $i < count($partes); $i++) {
        $fimComentario = strpos($partes[$i], "*/");
        if ($fimComentario !== false) {
            $cssLimpo .= substr($partes[$i], $fimComentario + 2);
        }
    }
    $css = $cssLimpo;

    // 2. Remove quebras de linha e tabs
    $css = str_replace(["\r\n", "\r", "\n", "\t"], " ", $css);

    // 3. Achata múltiplos espaços num só
    while (strpos($css, "  ") !== false) {
        $css = str_replace("  ", " ", $css);
    }

    // 4. Limpa espaços ao redor da pontuação vital do CSS
    $removerEspacos = [
        " {" => "{",
        "{ " => "{",
        " }" => "}",
        "} " => "}",
        " :" => ":",
        ": " => ":",
        " ;" => ";",
        "; " => ";",
        " ," => ",",
        ", " => ",",
        " >" => ">",
        "> " => ">",
    ];

    $css = strtr($css, $removerEspacos);

    return trim($css);
}

function minifyHTML(string $html): string
{
    $output = "";
    $length = strlen($html);

    $inTag = false;
    $inPre = false;
    $inTextarea = false;
    $inScript = false;
    $inStyle = false;
    $lastWasSpace = false;

    for ($i = 0; $i < $length; $i++) {
        $char = $html[$i];

        // Detecta início de tag
        if ($char === "<") {
            // Descobre o nome da tag
            $tagContent = "";

            for ($j = $i + 1; $j < $length; $j++) {
                $c = $html[$j];

                if ($c === ">" || ctype_space($c)) {
                    break;
                }

                $tagContent .= $c;
            }

            $tagName = strtolower(trim($tagContent, "/"));

            // Controle de contexto
            if ($tagName === "pre") {
                $inPre = $tagContent[0] !== "/";
            }

            if ($tagName === "textarea") {
                $inTextarea = $tagContent[0] !== "/";
            }

            if ($tagName === "script") {
                $inScript = $tagContent[0] !== "/";
            }

            if ($tagName === "style") {
                $inStyle = $tagContent[0] !== "/";
            }

            $inTag = true;
            $lastWasSpace = false;

            $output .= $char;
            continue;
        }

        // Detecta fim de tag
        if ($char === ">") {
            $inTag = false;
            $output .= $char;
            continue;
        }

        // Preserva conteúdo bruto
        if ($inPre || $inTextarea || $inScript || $inStyle) {
            $output .= $char;
            continue;
        }

        // Dentro da tag
        if ($inTag) {
            // Compacta espaços em atributos
            if (ctype_space($char)) {
                if (!$lastWasSpace) {
                    $output .= " ";
                    $lastWasSpace = true;
                }
            } else {
                $output .= $char;
                $lastWasSpace = false;
            }

            continue;
        }

        // Fora da tag → compacta whitespace
        if (ctype_space($char)) {
            if (!$lastWasSpace) {
                $output .= " ";
                $lastWasSpace = true;
            }
        } else {
            $output .= $char;
            $lastWasSpace = false;
        }
    }

    // Remove espaços entre tags
    $final = "";
    $length = strlen($output);

    for ($i = 0; $i < $length; $i++) {
        if (
            $output[$i] === " " &&
            $i > 0 &&
            $i < $length - 1 &&
            $output[$i - 1] === ">" &&
            $output[$i + 1] === "<"
        ) {
            continue;
        }

        $final .= $output[$i];
    }

    return trim($final);
}

function minifyJS(string $js): string
{
    $output = "";

    $length = strlen($js);

    $inString = false;
    $stringChar = "";
    $inSingleComment = false;
    $inMultiComment = false;
    $lastWasSpace = false;

    for ($i = 0; $i < $length; $i++) {
        $char = $js[$i];
        $next = $i + 1 < $length ? $js[$i + 1] : "";

        if (!$inString && !$inMultiComment && $char === "/" && $next === "/") {
            $inSingleComment = true;
            $i++;
            continue;
        }

        if ($inSingleComment) {
            if ($char === "\n" || $char === "\r") {
                $inSingleComment = false;
            }

            continue;
        }

        if (!$inString && !$inSingleComment && $char === "/" && $next === "*") {
            $inMultiComment = true;
            $i++;
            continue;
        }

        if ($inMultiComment) {
            if ($char === "*" && $next === "/") {
                $inMultiComment = false;
                $i++;
            }

            continue;
        }

        if (
            ($char === '"' || $char === "'" || $char === "`") &&
            ($i === 0 || $js[$i - 1] !== "\\")
        ) {
            if (!$inString) {
                $inString = true;
                $stringChar = $char;
            } elseif ($stringChar === $char) {
                $inString = false;
            }

            $output .= $char;
            $lastWasSpace = false;

            continue;
        }

        if ($inString) {
            $output .= $char;
            continue;
        }

        if (
            $char === "\n" ||
            $char === "\r" ||
            $char === "\t" ||
            $char === " "
        ) {
            if (!$lastWasSpace) {
                $output .= " ";
                $lastWasSpace = true;
            }

            continue;
        }

        $output .= $char;
        $lastWasSpace = false;
    }

    $symbols = [
        ";",
        "{",
        "}",
        "(",
        ")",
        "[",
        "]",
        ",",
        ":",
        "+",
        "-",
        "*",
        "/",
        "=",
        "<",
        ">",
        "?",
    ];

    $final = "";
    $length = strlen($output);

    for ($i = 0; $i < $length; $i++) {
        $char = $output[$i];

        if (
            $char === " " &&
            (($i > 0 && in_array($output[$i - 1], $symbols, true)) ||
                ($i < $length - 1 && in_array($output[$i + 1], $symbols, true)))
        ) {
            continue;
        }

        $final .= $char;
    }

    return trim($final);
}

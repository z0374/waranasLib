<?php

/**
 * Envia dados via POST em formato JSON para um Cloudflare Worker.
 *
 * Quando $debug = true, retorna todas as informações da requisição
 * em vez de apenas o JSON da resposta.
 *
 * @param string $endpoint
 * @param array|object $data
 * @param string $configUrl
 * @param string $authToken
 * @param bool $debug
 *
 * @return array|false
 */
function postJsonData($endpoint, $data, $configUrl, $authToken, $debug = false)
{
    /*
    |--------------------------------------------------------------------------
    | URL
    |--------------------------------------------------------------------------
    */

    $url = "https://" . rtrim($configUrl, "/") . "/" . ltrim($endpoint, "/");

    /*
    |--------------------------------------------------------------------------
    | Payload
    |--------------------------------------------------------------------------
    */

    $jsonData = json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES,
    );

    /*
    |--------------------------------------------------------------------------
    | Headers
    |--------------------------------------------------------------------------
    */

    $headers = [
        "Content-Type: application/json",
        "Content-Length: " . strlen($jsonData),
        "Authorization: Bearer " . $authToken,
    ];

    /*
    |--------------------------------------------------------------------------
    | cURL
    |--------------------------------------------------------------------------
    */

    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $jsonData,
        CURLOPT_HTTPHEADER => $headers,

        CURLOPT_HEADER => true,

        CURLOPT_FOLLOWLOCATION => false,

        CURLOPT_TIMEOUT => 30,

        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Execução
    |--------------------------------------------------------------------------
    */

    $rawResponse = curl_exec($ch);

    $info = curl_getinfo($ch);

    $curlError = curl_error($ch);
    $curlErrno = curl_errno($ch);

    $headerSize = $info["header_size"] ?? 0;

    $responseHeaders = substr($rawResponse, 0, $headerSize);
    $responseBody = substr($rawResponse, $headerSize);

    curl_close($ch);

    /*
    |--------------------------------------------------------------------------
    | Debug
    |--------------------------------------------------------------------------
    */

    if ($debug) {
        return [
            "request" => [
                "url" => $url,
                "method" => "POST",
                "headers" => $headers,
                "payload" => json_decode($jsonData, true),
                "payloadRaw" => $jsonData,
            ],

            "curl" => [
                "errno" => $curlErrno,
                "error" => $curlError,
            ],

            "response" => [
                "httpCode" => $info["http_code"] ?? 0,
                "headers" => $responseHeaders,
                "body" => $responseBody,
                "json" => json_decode($responseBody, true),
            ],

            "info" => $info,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Erro cURL
    |--------------------------------------------------------------------------
    */

    if ($curlErrno !== 0) {
        return false;
    }

    /*
    |--------------------------------------------------------------------------
    | HTTP
    |--------------------------------------------------------------------------
    */

    if (($info["http_code"] ?? 0) >= 200 && ($info["http_code"] ?? 0) < 300) {
        return json_decode($responseBody, true);
    }

    return false;
}

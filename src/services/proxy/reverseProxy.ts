/**
 * Executa um proxy reverso transparente.
 */
export async function reverseProxy(
  request: Request,
  destiny: string
): Promise<Response> {
  try {
    const current = new URL(request.url);
    const target = new URL(destiny);

    // Ajusta o pathname e mantém a query string
    target.pathname =
      target.pathname.replace(/\/$/, "") +
      current.pathname.replace(/^\/nestreaming/, "");

    target.search = current.search;

    // Clona os headers para evitar mutações indesejadas
    const headers = new Headers(request.headers);
    
    // Opcional: Atualiza o Host para o destino, se necessário
    headers.set("Host", target.host);

    // Prepara as opções da nova requisição
    const init: RequestInit = {
      method: request.method,
      headers: headers,
      redirect: "follow",
    };

    // Métodos que suportam corpo (body)
    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body;
    }

    const modifiedRequest = new Request(target.toString(), init);

    return await fetch(modifiedRequest);
  } catch (error: any) {
    // Retorna uma resposta amigável ou o erro tratado para depuração nos logs
    return new Response(`Proxy Error: ${error.message || error}`, {
      status: 500,
    });
  }
}

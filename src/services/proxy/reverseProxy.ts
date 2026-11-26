/**
 * Executa um proxy reverso transparente e genérico.
 * Encaminha a requisição para `destiny`, preservando caminho, query string,
 * método, cabeçalhos e corpo (quando aplicável).
 */
export async function reverseProxy(
  request: Request,
  destiny: string,
  controls?: { stripPrefix?: string }
): Promise<Response> {
  const current = new URL(request.url);
  const target = new URL(destiny);

  let incomingPath = current.pathname;
  if (controls?.stripPrefix) {
    const normalizedPrefix = controls.stripPrefix.replace(/\/$/, "");
    if (incomingPath.startsWith(normalizedPrefix)) {
      incomingPath = incomingPath.slice(normalizedPrefix.length) || "/";
    }
  }

  const basePath = target.pathname.replace(/\/$/, "");
  const cleanIncoming = incomingPath.startsWith("/")
    ? incomingPath
    : `/${incomingPath}`;

  target.pathname = `${basePath}${cleanIncoming === "/" && basePath ? "" : cleanIncoming}`;
  target.search = current.search;

  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  const forwardedRequest = new Request(target.toString(), {
    method: request.method,
    headers: request.headers,
    body: hasBody ? request.body : null,
    redirect: "manual",
  });

  return fetch(forwardedRequest);
}

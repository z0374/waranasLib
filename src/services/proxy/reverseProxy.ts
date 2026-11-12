/**
 * Executa um proxy reverso transparente.
 */
export async function reverseProxy(
  request: Request,
  destiny: string
): Promise<Response> {
  const current = new URL(request.url);
  const target = new URL(destiny);

  target.pathname =
    target.pathname.replace(/\/$/, "") +
    current.pathname.replace(/^\/nestreaming/, "");

  target.search = current.search;

  return fetch(new Request(target.toString(), request));
}
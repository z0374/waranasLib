/**
 * Executa um redirecionamento HTTP padrão com status opcional (padrão 302).
 */
export function redirectTo(
  destiny: string,
  status?: 301 | 302 | 307 | 308
): Response {
  const target = new URL(destiny);
  return Response.redirect(target.toString(), status ?? 302);
}

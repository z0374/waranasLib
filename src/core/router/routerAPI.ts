import type { RouterApiControls, WrApiHandler } from "../../../interface/apiRouter";
import { normalizeContextPath } from "./normalizeContextPath";

export async function routerAPI<TEnv = unknown>(
  request: Request,
  env: TEnv,
  controls: RouterApiControls = {}
): Promise<Response> {
  const url = new URL(request.url);
  const contextPrefix = normalizeContextPath(controls?.contextPath ?? "");

  let effectivePath = url.pathname;

  if (contextPrefix) {
    if (
      effectivePath !== contextPrefix &&
      !effectivePath.startsWith(`${contextPrefix}/`)
    ) {
      return genericErrorResponse(404, "Recurso não encontrado.");
    }
    effectivePath = effectivePath.slice(contextPrefix.length) || "/";
  }

  const targetSegment = effectivePath.replace(/^\/+|\/+$/g, "").split("/")[0] ?? "";

  if (!targetSegment.endsWith("_Wrs")) {
    return genericErrorResponse(404, "Recurso não encontrado.");
  }

  const handler = (env as Record<string, unknown> | undefined)?.[targetSegment];
  if (typeof handler !== "function") {
    return genericErrorResponse(404, "Recurso não encontrado.");
  }

  try {
    return await (handler as WrApiHandler<TEnv>)(request, env);
  } catch {
    return genericErrorResponse(500, "Erro ao processar a solicitação.");
  }
}

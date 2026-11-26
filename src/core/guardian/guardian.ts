import type {
  GuardianCondition,
  GuardianControls,
} from "../../interfaces/guardian";
import { resolveControls } from "../../utils/guardian/resolveControls";

export async function guardian<
  TContext = unknown,
  TValidPage = unknown,
  TInvalidPage = unknown
>(
  request: Request,
  condition: GuardianCondition<TContext>,
  controls: GuardianControls<TValidPage, TInvalidPage> = {},
  context?: TContext
): Promise<Response> {
  const ctrl = resolveControls<TValidPage, TInvalidPage>(controls ?? {});
  const defaultRefuseStatus =
    typeof ctrl.statusCode === "number" &&
    Number.isInteger(ctrl.statusCode) &&
    ctrl.statusCode >= 400 &&
    ctrl.statusCode <= 599
      ? ctrl.statusCode
      : 404;

  const terminateWithError = async (reason: string): Promise<Response> => {
    let customResponse: Response | undefined;
    if (ctrl.recuseResponse) {
      customResponse =
        typeof ctrl.recuseResponse === "function"
          ? await ctrl.recuseResponse(request, controls)
          : ctrl.recuseResponse;
    }

    let invalidPageResult: TInvalidPage | undefined;
    if (typeof ctrl.invalidPage === "function") {
      try {
        invalidPageResult = await ctrl.invalidPage(request, controls);
      } catch {
        invalidPageResult = undefined;
      }
    }

    if (customResponse instanceof Response) return customResponse;
    if (invalidPageResult instanceof Response) return invalidPageResult;

    const status =
      typeof ctrl.statusCode === "number" &&
      Number.isInteger(ctrl.statusCode) &&
      ctrl.statusCode >= 400 &&
      ctrl.statusCode <= 599
        ? ctrl.statusCode
        : 404;

    const body =
      typeof invalidPageResult === "string"
        ? invalidPageResult
        : (ctrl.reason ?? reason);

    return new Response(body, {
      status,
      headers:
        typeof invalidPageResult === "string"
          ? { "Content-Type": "text/html; charset=UTF-8" }
          : { "Content-Type": "text/plain; charset=UTF-8" },
    });
  };

  if (!request) {
    return terminateWithError("Requisição ausente.");
  }

  if (condition === undefined || condition === null) {
    return terminateWithError("Condição de validação ausente.");
  }

  let isValid = false;
  try {
    isValid =
      typeof condition === "function"
        ? Boolean(await condition(request, controls, context))
        : Boolean(condition);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao validar condição.";
    return terminateWithError(message);
  }

  if (!isValid) {
    return terminateWithError("Condição não satisfeita.");
  }

  // Se validPage não for informada, apenas permite continuar o fluxo
  if (typeof ctrl.validPage !== "function") {
    return new Response(null, { status: 204 });
  }

  let validPageResult: TValidPage;
  try {
    validPageResult = await ctrl.validPage(request, controls);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao executar validPage.";
    return terminateWithError(message);
  }

  if (validPageResult instanceof Response) {
    return validPageResult;
  }

  if (typeof validPageResult === "string") {
    return new Response(validPageResult, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=UTF-8" },
    });
  }

  return new Response(null, { status: 204 });
}

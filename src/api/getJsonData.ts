import { baseURI } from "../../globals";
import type { Env } from "../core/bootstrap";
import { requestSaveKV } from "../database/kv/requestSaveKV";

export async function getJsonData(
  url: string,
  parametro: [string, string | number],
  authToken: string,
  env: Env,
  pageToken: string | null = null,
): Promise<string> {
  if (!Array.isArray(parametro) || parametro.length !== 2) {
    return 'error: "Parâmetro inválido"';
  }

  const [tabela, idOuTipo] = parametro;

  const identKey =
    typeof idOuTipo === "number" || !isNaN(Number(idOuTipo)) ? "id" : "tipo";

  const query = new URLSearchParams({
    tbl: tabela,
    [identKey]: String(idOuTipo),
  });

  const fullUrl = `${url}?${query.toString()}`;

  const headers = new Headers({
    Authorization: authToken,
    Origin: baseURI,
    Accept: "application/json",
  });

  if (pageToken) {
    headers.set("X-Page-Token", pageToken);
  }

  const response = await fetch(fullUrl, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    return "";
  }

  const contentType = response.headers.get("content-type") ?? "";

  /*
   * JSON permanece sendo retornado diretamente.
   */
  if (contentType.includes("application/json")) {
    return await response.json();
  }

  /*
   * Todo conteúdo não-JSON é delegado ao saveKV.
   *
   * O saveKV é responsável por:
   * - identificar o tipo;
   * - gerar filename único;
   * - salvar no ASSETS;
   * - salvar metadata;
   * - retornar o caminho /assets/...
   */
  return await requestSaveKV(env.ASSETS, response);
}

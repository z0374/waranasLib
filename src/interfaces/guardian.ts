export type GuardianCondition<TContext = unknown> =
  | boolean
  | ((
      request: Request,
      controls: GuardianControls,
      context?: TContext
    ) => boolean | Promise<boolean>);

export type GuardianRecuseResponse =
  | Response
  | ((request: Request, controls: GuardianControls) => Response | Promise<Response>);

export type GuardianPageHandler<TPage = unknown> =
  | ((
      request: Request,
      controls: GuardianControls
    ) => TPage | Promise<TPage>);

export interface GuardianControlsObject<
  TValidPage = unknown,
  TInvalidPage = unknown
> {
  /** Resposta HTTP customizada (ou fábrica de Response) caso a validação falhe */
  recuseResponse?: GuardianRecuseResponse;
  /** Função que retorna ou executa o cofre / página final quando a validação é aceita */
  validPage?: GuardianPageHandler<TValidPage>;
  /** Função que retorna ou executa a página alternativa quando a validação falha */
  invalidPage?: GuardianPageHandler<TInvalidPage>;
  /** Código HTTP de recusa opcional (padrão: 403) */
  statusCode?: number;
  /** Motivo opcional da recusa */
  reason?: string;
  /** Outros dados de controle adicionais */
  items?: unknown[];
  [key: string]: unknown;
}

export type GuardianControls<
  TValidPage = unknown,
  TInvalidPage = unknown
> = unknown[] | GuardianControlsObject<TValidPage, TInvalidPage>;

export interface GuardianResult<
  TValidPage = unknown,
  TInvalidPage = unknown
> {
  valid: boolean;
  status: number;
  reason?: string;
  response?: Response;
  validPageResult?: TValidPage;
  invalidPageResult?: TInvalidPage;
}

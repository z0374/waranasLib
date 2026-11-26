export type WrApiHandler<TEnv = unknown> = (
  request: Request,
  env: TEnv
) => Promise<Response> | Response;

export interface WrComponentEndpoint<TEnv = unknown> {
  fnName: string;
  route: string;
  handler: WrApiHandler<TEnv>;
}

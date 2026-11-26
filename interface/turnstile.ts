export type TurnstileTheme = "light" | "dark" | "auto";

export interface TurnstileComponentOptions {
  /** Chave pública do widget Turnstile (sitekey) */
  siteKey: string;
  /** Tema visual do widget */
  theme?: TurnstileTheme;
  /** Mensagem opcional acima do desafio */
  label?: string;
}

export interface TurnstileVerifyInput {
  /** Valor do secret ou token/string passado diretamente para validação */
  secretOrToken: string;
  /** Token do desafio do Turnstile (quando secretOrToken for o secret) */
  token?: string;
}

export interface TurnstileSiteverifyResult {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}
import { doItElement, head } from "waranas";

const TURNSTILE_SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js";
let scriptInjected = false;

export function loadTurnstileScript(): void {
  if (scriptInjected) return;

  const scriptEl = doItElement("script");
  scriptEl.setAttr("src", TURNSTILE_SCRIPT_URL);
  scriptEl.setAttr("async", "true");
  scriptEl.setAttr("defer", "true");

  head.add(scriptEl);
  scriptInjected = true;
}

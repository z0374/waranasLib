import { script } from "waranas";

export function bindTurnstileClientVerify(widgetId: string, statusId: string): void {
  const safeWidgetId = JSON.stringify(widgetId);
  const safeStatusId = JSON.stringify(statusId);

  script.add(`
    (() => {
      const route = "/turnstile_Wrs";
      const widgetId = ${safeWidgetId};
      const statusId = ${safeStatusId};
      const callbackName = "onWaranasTurnstileSuccess_" + widgetId.replace(/[^a-zA-Z0-9_]/g, "_");

      window[callbackName] = async (token) => {
        const statusEl = document.getElementById(statusId);
        if (statusEl) statusEl.textContent = "Validando...";

        try {
          const res = await fetch(route, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const result = await res.json();
          if (statusEl) {
            statusEl.textContent = result.success ? "Verificado com sucesso." : "Falha na verificação.";
          }
          window.dispatchEvent(new CustomEvent("waranas:turnstile:verified", { detail: result }));
        } catch {
          if (statusEl) statusEl.textContent = "Erro ao validar desafio.";
        }
      };

      const mountWidget = () => {
        const el = document.getElementById(widgetId);
        if (!el || el.dataset.waranasTurnstileMounted === "1") return;
        if (!window.turnstile || typeof window.turnstile.render !== "function") return;

        el.dataset.waranasTurnstileMounted = "1";
        window.turnstile.render(el, {
          sitekey: el.dataset.sitekey,
          theme: el.dataset.theme || "auto",
          callback: callbackName,
        });
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mountWidget, { once: true });
      } else {
        mountWidget();
      }
      window.addEventListener("load", mountWidget, { once: true });
    })();
  `);
}

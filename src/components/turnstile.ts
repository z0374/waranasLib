import { addClassList, append, doItElement, main, type HTMLElementW } from "waranas";
import { turnstile_Wrs } from "../../API/turnstile_Wrs";
import type { TurnstileComponentOptions } from "../../interface/turnstile";
import { rfrs } from "../helppers/dummy/rfrs";
import { bindTurnstileClientVerify } from "../script/bindTurnstileClientVerify";
import { loadTurnstileSdk } from "../script/loadTurnstileSdk";
import { stylesTurnstile } from "../styles/stylesTurnstile";

let turnstileSequence = 0;

export function turnstile(options: TurnstileComponentOptions): HTMLElementW {
  // Mantém a referência de turnstile_Wrs no bundle sem executá-la
  rfrs(turnstile_Wrs);

  turnstileSequence += 1;
  const widgetId = `waranas-turnstile-${turnstileSequence}`;
  const statusId = `${widgetId}-status`;

  loadTurnstileSdk();
  stylesTurnstile();

  const theme = options.theme ?? "auto";

    const wrapper = doItElement("div");
    addClassList(wrapper, "waranasTurnstileContainer");
    wrapper.setAttr("data-wrs-route", "/turnstile_Wrs");

    if (options.label) {
      const labelEl = doItElement("span");
      addClassList(labelEl, "waranasTurnstileLabel");
      labelEl.textContent = options.label;
      append(wrapper, labelEl);
    }

    const widgetEl = doItElement("div");
    addClassList(widgetEl, "cf-turnstile");
    widgetEl.setAttr("id", widgetId);
    widgetEl.setAttr("data-sitekey", options.siteKey);
    widgetEl.setAttr("data-theme", theme);

    const statusEl = doItElement("span");
    addClassList(statusEl, "waranasTurnstileStatus");
    statusEl.setAttr("id", statusId);

  append(wrapper, widgetEl, statusEl);

  bindTurnstileClientVerify(widgetId, statusId);

  main.push(wrapper);
  return wrapper;
}

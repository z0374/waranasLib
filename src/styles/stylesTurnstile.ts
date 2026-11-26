import { style } from "waranas";

let stylesInjected = false;

export function stylesTurnstile(): void {
  if (stylesInjected) return;

  style.add(`
    .waranasTurnstileContainer {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
    }
    .waranasTurnstileLabel {
      font-size: 0.9rem;
      font-weight: 500;
    }
    .waranasTurnstileStatus {
      font-size: 0.85rem;
      min-height: 1.2em;
    }
  `);

  stylesInjected = true;
}

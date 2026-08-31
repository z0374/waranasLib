import { style } from "../../globals";
import type { HTMLElementW } from "../core/interface/intenface.index";
import {
  append,
  doItElement,
  setAttr,
} from "../core/parseHTML/parseHTML.index";

export function cardBtn(
  id: string,
  action: string,
  content: HTMLElementW,
): HTMLElementW<"button"> {
  const btnElement = doItElement("button");
  setAttr(btnElement, "aria-label", id);
  setAttr(btnElement, "onclick", action);
  content.classes.add("cardBtnContent");
  btnElement.classes.add("cardBtn");
  append(btnElement, content);

  const btnStyle = `
    .cardBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      aspect-ratio: 4 / 3;
      background-color: var(--color-secondary);
      border-radius: 1.5rem;
      border: 0.2rem solid var(--color-primary);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .cardBtnContent {
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .cardBtn:hover,
    .cardBtn:focus-visible {
      transform: translateY(-0.6rem) scale(1.02);
      border-color: var(--color-primary);
      box-shadow:
        0 1.5rem 3rem -1rem #000,
        0 1rem 2.5rem -0.6rem var(--color-primary);
    }
    .cardBtn:hover .cardBtnContent,
    .cardBtn:focus-visible .cardBtnContent {
      transform: scale(1.15);
    }
    .cardBtn:focus {
      outline: none;
    }
    .cardBtn:focus-visible {
      outline: 0.3rem solid var(--color-primary);
      outline-offset: 0.5rem;
    }
  `;
  style.add(btnStyle);
  return btnElement;
}

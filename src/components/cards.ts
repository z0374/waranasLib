import { style } from "../../globals";
import type { HTMLElementW } from "../core/interface/intenface.index";
import {
  append,
  doItElement,
  setAttr,
} from "../core/parseHTML/parseHTML.index";
import { generateUniqueToken } from "../crypto/crypto.index";

export function card(
  content: HTMLElementW,
): HTMLElementW<"article"> {

  const cardElement = doItElement("article");
  const id = `card${generateUniqueToken()}`;
  setAttr(cardElement, "id", id);
  content.classes.add("cardContent");
  cardElement.classes.add("card");
  append(cardElement, content);

  const cardStyle = `
    #${id}.card {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      aspect-ratio: 4 / 3;
      background-color: var(--color-secondary);
      border-radius: 1.5rem;
      border: 0.2rem solid var(--color-primary);
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }
    #${id} .cardContent {
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }
    #${id}.card:hover {
      transform: translateY(-0.6rem) scale(1.02);
      border-color: var(--color-primary);
      box-shadow:
        0 1.5rem 3rem -1rem #000,
        0 1rem 2.5rem -0.6rem var(--color-primary);
    }
    #${id}.card:hover .cardContent {
      transform: scale(1.15);
    }
  `;
  style.add(cardStyle);
  return cardElement;
}

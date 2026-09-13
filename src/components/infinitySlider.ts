import { style } from "../../globals";
import type { HTMLElementW } from "../core/interface/intenface.index";
import {
  append,
  doItElement,
  setAttr,
} from "../core/parseHTML/parseHTML.index";
import { generateUniqueToken } from "../crypto/uniqueToken";

export function infinitySlider(array: HTMLElementW[]) {
  const sliderElement = doItElement("span");

  let num = 0;
  array.forEach((item, index) => {
    // 1. Impede que o item encolha
    item.attrs = item.attrs || {};

    // Se você usa o manipulador de classes do Set:
    item.classes.add("infiniteSlider-item");
    const id = `infiniteSlider_${generateUniqueToken()}`;
    setAttr(item, "id", id + "_" + num);
    num++;
  });
  sliderElement.classes.add("infiniteSlider");
  setAttr(sliderElement, "role", "region");
  setAttr(sliderElement, "aria-labelledby", "infiniteSlider");
  append(sliderElement, ...array);

  const sliderStyle: string = `
  .infiniteSlider {
    width: 100%;
    gap: 3rem;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    scrollbar-width: none;
    scrollbar-color: var(--color-primary) var(--color-secondary);
  }

  .infiniteSlider-item {
    flex-shrink: 0;
    scroll-snap-align: start;
  }
  `;

  style.add(sliderStyle);
  return sliderElement;
}

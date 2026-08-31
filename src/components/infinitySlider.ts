import { style } from "../../globals";
import type { HTMLElementW } from "../core/interface/intenface.index";
import {
  append,
  doItElement,
  setAttr,
} from "../core/parseHTML/parseHTML.index";

export function infinitySlider(id: string, array: HTMLElementW[]) {
  const sliderElement = doItElement("span");

  let num = 0;
  array.forEach((item) => {
    // 1. Impede que o item encolha
    item.attrs = item.attrs || {};

    // Se você usa o manipulador de classes do Set:
    item.classes.add("infiniteSlider-item");
    setAttr(item, "id", id + "_" + num);
    num++;
  });
  sliderElement.classes.add("infiniteSlider");
  setAttr(sliderElement, "id", id);
  setAttr(sliderElement, "role", "region");
  setAttr(sliderElement, "aria-label", id);
  setAttr(sliderElement, "aria-labelledby", "infiniteSlider");
  append(sliderElement, ...array);

  const sliderStyle: string = `
  .infiniteSlider {
    width: 100%;
    padding-bottom: 3rem;
    gap: 3rem;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    scrollbar-width: thin;
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

import type { HTMLElementW } from "../core/interface/intenface.index";

import { cardBtn } from "./cardBtn";
import { card } from "./cards";
import { grid, type GridResponsiveMode } from "./grid";

export interface GridCardItem {
  action?: string;
  content: HTMLElementW;
}

export function gridCards(
  items: GridCardItem[] | HTMLElementW[],
  ratio: [number, number] = [1, 3],
  responsiveMode: GridResponsiveMode = "slide",
  typeCard: number = 0
): HTMLElementW {
  const cardElements: HTMLElementW[] = items.map((item) => {
    if ("content" in item) {
      if (typeCard === 1 && item.action) {
        return cardBtn(item.action, item.content);
      }
      return card(item.content);
    }
    return item as HTMLElementW;
  });

  return grid(cardElements, ratio, responsiveMode);
}

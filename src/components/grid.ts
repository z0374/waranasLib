import { style } from "../../globals";
import type { HTMLElementW } from "../core/interface/intenface.index";
import {
  append,
  doItElement,
  setAttr,
} from "../core/parseHTML/parseHTML.index";
import { generateUniqueToken } from "../crypto/crypto.index";

export type GridResponsiveMode = "slide" | "stack" | "shrink";

export function grid(
  array: HTMLElementW[],
  ratio: [number, number] = [1, 3],
  responsiveMode: GridResponsiveMode = "slide"
): HTMLElementW {
  const gridElement = doItElement("div");
  const id = `grid${generateUniqueToken()}`;
  setAttr(gridElement, "id", id);
  gridElement.classes.add("waranasGrid");

  let num = 0;
  array.forEach((item) => {
    item.attrs = item.attrs || {};
    item.classes.add("waranasGrid-item");
    setAttr(item, "id", `${id}_item_${num}`);
    num++;
  });

  append(gridElement, ...array);

  const [rows, cols] = ratio;

  // Regras de responsividade automáticas (sem argumento fixo de breakpoint)
  let responsiveCSS = "";
  const defaultBreakpoint = "768px";
  console.log(responsiveMode);
  if (responsiveMode === "slide") {
    responsiveCSS = `
      @media (max-width: ${defaultBreakpoint}) {
        #${id}.waranasGrid {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          flex-wrap: nowrap;
          gap: 1.5rem;
          padding-bottom: 1.5rem;
        }
        #${id}.waranasGrid .waranasGrid-item {
          flex: 0 0 80%;
          scroll-snap-align: start;
        }
      }
    `;
  } else if (responsiveMode === "stack") {
    responsiveCSS = `
      @media (max-width: ${defaultBreakpoint}) {
        #${id}.waranasGrid {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: auto;
        }
      }
    `;
  } else if (responsiveMode === "shrink") {
    console.log("esta correto: ", responsiveMode);
    responsiveCSS = `
      @media (max-width: ${defaultBreakpoint}) {
            #${id}.waranasGrid {
              /* Mantém as colunas originais, não altera a formatação visual */
              grid-template-columns: repeat(${cols}, minmax(0, 1fr));
              gap: 0.5rem; /* Reduz o espaço para caber melhor */
            }
            #${id}.waranasGrid .waranasGrid-item {
              font-size: 0.75rem; /* Diminui a fonte */
              overflow: hidden; /* Evita que o conteúdo interno quebre o grid */
              word-break: break-word; /* Quebra palavras longas se necessário */
            }
          }
    `;
  }

  // Estilo principal injetado no gerenciador global da biblioteca
  const gridStyle = `
    #${id}.waranasGrid {
      display: grid;
      grid-template-columns: repeat(${cols}, minmax(0, 1fr));
      grid-template-rows: repeat(${rows}, auto);
      gap: 2rem;
      width: 100%;
    }
    .waranasGrid-item {
      width: 100%;
      height: 100%;
    }
    ${responsiveCSS}
  `;

  style.add(gridStyle);

  return gridElement;
}

import type { HTMLElementW } from "../core/interface/intenface.index";
import { append, doItElement } from "../core/parseHTML/parseHTML.index";
import { style } from "../../globals";

export function titleSubtitle(
  id: string,
  title?: string,
  subtitle?: string,
): HTMLElementW<"hgroup"> {
  const containerElement = doItElement("hgroup").setAttr("id", id);
  containerElement.classes.add("titleSubtitle");

  if (title) {
    const titleElement = doItElement("h1");
    titleElement.textContent = title;
    append(containerElement, titleElement);
    style.add(`
    .titleSubtitle h1{
      font-weight: bold;
      font-size: 3rem;
    }`);
  }

  if (subtitle) {
    const subtitleElement = doItElement("h2");
    subtitleElement.textContent = subtitle;
    append(containerElement, subtitleElement);
    style.add(`
      .titleSubtitle h2{
      font-weight: normal;
      font-size: 1.5rem;
    }
  `);
  }

  return containerElement;
}

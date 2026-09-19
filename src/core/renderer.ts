import {
  headAssets,
  style,
  head,
  styleVar,
  fonts,
  body,
  header,
  main,
  footer,
  script,
  resetGlobals,
} from "../../globals";
import type { HTMLElementW } from "../core/interface/intenface.index";
import { append, doItElement, htmlCompiler } from "./parseHTML/parseHTML.index";

export function html() {
  const cacheTitle: string = headAssets.title ? headAssets.title : "index";
  /*
  if (time === "cache") {
    cachePage({ title: cacheTitle, mode: 2 });
    }
    */

  const favPath = headAssets.favicon
    ? headAssets.favicon
    : "https://assets.victormacedo.dev.br/png/favicon/waranas.ico";
  const ext: string = favPath
    .substring(favPath.lastIndexOf(".") + 1)
    .toLowerCase();

  const mimeMap: Record<string, string> = {
    svg: "image/svg+xml",
    ico: "image/x-icon",
    png: "image/png",
    gif: "image/gif",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
  };

  const mimeType: string = mimeMap[ext] ?? "image/svg+xml";
  const titleElement: HTMLElementW = doItElement("title");
  titleElement.textContent = cacheTitle;
  const headWaranas = [];
  headWaranas.unshift(
    doItElement("meta", false).setAttr("charset", "UTF-8"),
    doItElement("meta", false)
      .setAttr("name", "viewport")
      .setAttr("content", "width=device-width, initial-scale=1.0"),
    titleElement,
    doItElement("link", false)
      .setAttr("rel", "icon")
      .setAttr("type", mimeType)
      .setAttr("href", favPath),
    doItElement("link", false)
      .setAttr("rel", "stylesheet")
      .setAttr("type", "text/css")
      .setAttr("href", "https://assets.victormacedo.dev.br/css/reset.css"),
  );

  const styleRoot: string = `:root{ ${styleVar.join("\n")} }`;
  const styleFonts: string = fonts.join("\n");
  const styleGeneral: string = [...style].join("\n");
  const styleElement: HTMLElementW = doItElement("style");
  styleElement.textContent = `
      ${styleRoot}
      ${styleFonts}
      ${styleGeneral}`;

  const headElement = doItElement("head");
  append(headElement, ...headWaranas, ...head, styleElement);

  const bodyElement = doItElement("body");

  if (header.length > 0) {
    const headerElement = doItElement("header");
    append(headerElement, ...header);
    append(bodyElement, headerElement);
  }
  if (main.length > 0) {
    const mainElement = doItElement("main");
    append(mainElement, ...main);
    append(bodyElement, mainElement);
  }
  if (footer.length > 0) {
    const footerElement = doItElement("footer");
    append(footerElement, ...footer);
    append(bodyElement, footerElement);
  }

  const jsElement = doItElement("script");
  jsElement.textContent = `
  ${[...script].join("")}
`;
  append(bodyElement, ...body, jsElement);

  const html = doItElement("html");
  const lang: string = headAssets.lang ? headAssets.lang : "PT-BR";
  html.setAttr("lang", lang);

  append(html, headElement, bodyElement);

  const finalElement = `<!DOCTYPE html>${htmlCompiler(html)}`;
  resetGlobals();
  return new Response(finalElement, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
    },
  });
}

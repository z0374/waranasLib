import { appendChild, doItElement } from "../../main.index";
import type {
  HTMLElementW,
  NormalElementW,
} from "../core/interface/intenface.index";

export function linkLogo(image: string, isSvg: boolean = false): HTMLElementW {
  const logoElement: NormalElementW<"a"> = doItElement("a");
  logoElement.setAttr("href", "./");
  logoElement.setAttr("id", "logo");
  logoElement.setAttr("title", "Logo do site, volta para a página inicial");
  logoElement.setAttr("alt", "Logo do site, volta para a página inicial");

  if (isSvg) {
    logoElement.textContent = image;
  } else {
    const imageElement = doItElement("img", false);
    imageElement.setAttr("src", image);
    imageElement.setAttr("loading", "lazy");

    appendChild(logoElement, imageElement);
  }

  return logoElement;
}

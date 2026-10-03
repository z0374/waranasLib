import type { HTMLElementW } from "../../interface.index";
import { doItElement } from "../../main.index";


export function videoPlayer(
  src: string,
): HTMLElementW<"video"> {
  const video = doItElement("video");

  video.setAttr("src", src);
  video.setAttr("controls", "");
  video.setAttr("playsinline", "");
  video.setAttr("preload", "metadata");

  return video;
}

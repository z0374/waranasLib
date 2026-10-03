import {
  head,
  script,
} from "../../globals";

import type {
  HTMLElementW,
} from "../../interface.index";

import { doItElement, unsetAttr } from "../../main.index";

import {
  parseM3U,
} from "../helppers/helppers.index";

import {
  videoPlayer,
} from "./videoPlayer";

export function m3uPlayer(
  m3u: string,
): HTMLElementW<"video"> {
  const url = parseM3U(m3u);

  if (!url) {
    throw new Error(
      "Nenhuma URL de vídeo encontrada no M3U.",
    );
  }

  const player = videoPlayer("");

  const playerID = "m3uPlayer";

  player.setAttr(
    "id",
    playerID,
  );

  player.setAttr(
    "autoplay",
    "",
  );

  unsetAttr(
    player,
    "controls"
  );

  const cdnHLS = doItElement(
    "script",
  );

  cdnHLS.setAttr(
    "src",
    "https://cdn.jsdelivr.net/npm/hls.js@latest",
  );

  cdnHLS.setAttr(
    "defer",
    "",
  );

  head.add(cdnHLS);

  script.add(`
    const video = document.getElementById("${playerID}");

    if (video && window.Hls) {
      const hls = new Hls();

      hls.loadSource("${url}");
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    }
  `);

  return player;
}

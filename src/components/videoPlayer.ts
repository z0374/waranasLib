import type { HTMLElementW } from "../../interface.index";

import {
  append,
  doItElement,
  style,
} from "../../main.index";

import {
  script,
} from "../../globals";

import {
  generateUniqueToken,
} from "../crypto/uniqueToken";

export function videoPlayer(
  src: string,
): HTMLElementW<"span"> {

  const playerID =
    "videoPlayer_" +
    generateUniqueToken();

  const logID =
    "videoPlayerLog_" +
    generateUniqueToken();

  const muteID =
    "videoMute_" +
    generateUniqueToken();

  const video =
    doItElement("video");

  video.setAttr(
    "id",
    playerID,
  );

  video.setAttr(
    "src",
    src,
  );

  video.setAttr(
    "controls",
    "",
  );

  video.setAttr(
    "playsinline",
    "",
  );

  video.setAttr(
    "preload",
    "metadata",
  );

  const infoPlayer =
    doItElement("p");

  infoPlayer.setAttr(
    "id",
    muteID,
  );

  infoPlayer.setAttr(
    "class",
    "muteIcon",
  );

  const logPlayer =
    doItElement("button");

  /* Adicionado aspas simples ao redor do logID para não quebrar o JS inline */
  logPlayer.setAttr(
    "onclick",
    `closeLogPlayer('${logID}')`,
  );

  logPlayer.setAttr(
    "id",
    logID,
  );

  logPlayer.setAttr(
    "class",
    "logPlayer",
  );

  const _videoPlayer =
    doItElement("span");

  _videoPlayer.setAttr(
    "class",
    "videoPlayer",
  );

  /*
   * ORDEM CORRETA:
   * 0 -> video
   * 1 -> infoPlayer
   * 2 -> logPlayer (Necessário para o m3uPlayer!)
   */
  append(
    _videoPlayer,
    video,
    infoPlayer,
    logPlayer,
  );

  style.add(
    `.videoPlayer {
      position: relative;
      display: block;
      width: 100%;
      overflow: hidden;
    }

    .videoPlayer video {
      display: block;
      width: 100%;
      height: auto;
      min-height: 200px;
      background: #000;
    }

    .videoPlayer .muteIcon {
      position: absolute;
      top: 1rem;
      z-index: 3;

      display: none;
      align-items: center;
      justify-content: center;

      margin: 0;
      border-radius: 50%;

      background: rgba(0, 0, 0, 0.65);
      color: #fff;
      font-size: 1.2rem;

      pointer-events: none;
      backdrop-filter: blur(8px);
    }

    /* A classe is-muted será controlada pelo JS */
    .videoPlayer .muteIcon.is-muted {
      display: flex !important;
    }

    .videoPlayer .logPlayer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;

      z-index: 999;

      margin: 0;
      padding: 0.5rem 0.75rem;

      color: #fff;
      background: rgba(0, 0, 0, 0.65);

      font-size: 0.9rem;
      font-weight: 500;
      text-align: center;

      cursor: pointer;

      pointer-events: auto;

      user-select: none;

      touch-action: manipulation;

      backdrop-filter: blur(8px);

      border: none;
      font-family: inherit;
    }

    .videoPlayer .logPlayer:empty {
      display: none;
    }`,
  );

  script.add(`
    if (typeof window.closeLogPlayer !== "function") {
      window.closeLogPlayer = function(logId) {
        const log = document.getElementById(logId);
        if (log) {
          log.textContent = "";
        }
      };
    }

    (() => {

      function init() {
        const video = document.getElementById("${playerID}");
        const muteIcon = document.getElementById("${muteID}");


        /*
         * A função e o loop precisam estar AQUI DENTRO,
         * onde as variáveis "video" e "muteIcon" existem.
         */
        function syncMuteIcon() {
          const isMuted =
            video.muted ||
            video.volume === 0 ||
            video.defaultMuted ||
            video.hasAttribute("muted");

          if (isMuted) {
            muteIcon.classList.add("is-muted");
            muteIcon.textContent = "🔇";
          } else {
            muteIcon.classList.remove("is-muted");
            muteIcon.textContent = "";
          }
        }

        video.addEventListener("volumechange", syncMuteIcon);
        video.addEventListener("play", syncMuteIcon);
        video.addEventListener("pause", syncMuteIcon);

        /* Executa 9 vezes, com intervalo de 1 segundo (1000ms) entre elas */
        (async () => {
          for (let i = 0; i < 9; i++) {
            syncMuteIcon();
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        })();
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
      } else {
        init();
      }

    })();
  `);

  return _videoPlayer;
}

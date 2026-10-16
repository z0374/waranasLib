import {
  head,
  script,
} from "../../globals";

import type {
  HTMLElementW,
} from "../../interface.index";

import {
  doItElement,
  getChildren,
  unsetAttr,
  videoPlayer,
} from "../../main.index";

import {
  generateUniqueToken,
} from "../crypto/uniqueToken";

import {
  parseM3U,
} from "../helppers/helppers.index";

export function m3uPlayer(
  m3u: string,
): HTMLElementW<"span"> {

  const initialURL =
    parseM3U(m3u);

  if (!initialURL) {
    throw new Error(
      "Nenhuma URL de vídeo encontrada no M3U.",
    );
  }

  const _player =
    videoPlayer("");

  const player =
    getChildren(
      _player,
      0,
    );

  const logPlayer =
    getChildren(
      _player,
      2,
    );

  const playerID =
    "m3uWaranas_" +
    generateUniqueToken();

  const logID =
    logPlayer.attrs.id ||
    "m3uLog_" + generateUniqueToken();

  player.setAttr(
    "id",
    playerID,
  );

  logPlayer.setAttr(
    "id",
    logID,
  );

  player.setAttr(
    "autoplay",
    "",
  );

  unsetAttr(
    player,
    "controls",
  );

  const cdnHLS =
    doItElement(
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

  head.add(
    cdnHLS,
  );

  script.add(`
    (() => {

      const video =
        document.getElementById(
          "${playerID}"
        );

      if (!video) {
        return;
      }

      /* Pega o elemento do ícone de mudo gerado pelo videoPlayer (índice 1) */
      const muteIcon =
        video.parentElement.querySelector(".muteIcon");


      function syncMuteIcon() {
        if (!muteIcon) return;

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


      /* Executa o loop assíncrono para verificar o estado de mudo 9 vezes (a cada 1s) */
      (async () => {
        for (let i = 0; i < 9; i++) {
          syncMuteIcon();
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      })();


      video.addEventListener("volumechange", syncMuteIcon);
      video.addEventListener("play", syncMuteIcon);
      video.addEventListener("pause", syncMuteIcon);


      let hls =
        null;

      let requestID =
        0;

      let logTimeout =
        null;


      function uiLog(
        msg,
        isError
      ) {

        const logEl =
          document.getElementById(
            "${logID}"
          );

        if (logEl) {
          logEl.textContent = msg;
        }

        if (logTimeout) {
          clearTimeout(logTimeout);
          logTimeout = null;
        }

        if (!isError) {

          logTimeout = setTimeout(
            () => {
              const currentLog =
                document.getElementById(
                  "${logID}"
                );

              if (currentLog) {
                currentLog.textContent = "";
              }
            },
            6000
          );

        }

      }


      function destroy() {

        if (hls) {

          try { hls.stopLoad(); } catch (e) {}
          try { hls.detachMedia(); } catch (e) {}
          try { hls.destroy(); } catch (e) {}

          hls = null;

        }

        video.pause();

        video.removeAttribute(
          "src"
        );

        video.load();

      }


      async function play() {

        try {

          await video.play();

        } catch (e) {

          video.muted =
            true;

          syncMuteIcon();

          try {

            await video.play();

          } catch (err) {

            uiLog(
              "Não foi possível iniciar a reprodução.",
              true
            );

          }

        }

      }


      video.addEventListener(
        "click",
        () => {

          if (!video.muted) {
            return;
          }

          video.muted =
            false;

          syncMuteIcon();

          video.play().then(
            () => {
              uiLog("Áudio ativado.");
            }
          ).catch(
            () => {
              video.muted = true;
              syncMuteIcon();
              uiLog(
                "Não foi possível ativar o áudio.",
                true
              );
            }
          );

        }
      );

      video.addEventListener(
        "waiting",
        () => uiLog("Aguardando transmissão...")
      );

      video.addEventListener(
        "playing",
        () => uiLog(
          video.muted
            ? "Reproduzindo sem áudio. Clique no vídeo para ativar o som."
            : "Reproduzindo."
        )
      );

      video.addEventListener(
        "stalled",
        () => uiLog(
          "Transmissão interrompida temporariamente.",
          true
        )
      );


      function startHLS(
        url,
        generation
      ) {

        if (
          generation !== requestID ||
          !url ||
          !url.startsWith("http")
        ) {
          return;
        }


        if (!window.Hls) {

          uiLog("Aguardando player...");

          setTimeout(
            () => {
              startHLS(url, generation);
            },
            100
          );

          return;

        }


        if (
          !window.Hls.isSupported()
        ) {
          uiLog(
            "Navegador não suportado.",
            true
          );
          return;
        }


        uiLog("Conectando...");


        hls =
          new window.Hls();


        hls.on(
          window.Hls.Events.ERROR,
          (event, data) => {

            if (generation !== requestID || !data?.fatal) {
              return;
            }

            switch (data.type) {

              case window.Hls.ErrorTypes.NETWORK_ERROR:
                uiLog(
                  "Erro de rede. Tentando recuperar...",
                  true
                );
                hls.startLoad();
                break;

              case window.Hls.ErrorTypes.MEDIA_ERROR:
                uiLog(
                  "Erro de mídia. Tentando recuperar...",
                  true
                );
                hls.recoverMediaError();
                break;

              default:
                uiLog(
                  "Erro fatal na transmissão.",
                  true
                );
                hls.destroy();
                hls = null;
                break;

            }

          }
        );


        hls.on(
          window.Hls.Events.MEDIA_ATTACHED,
          () => {
            if (generation === requestID) {
              hls.loadSource(url);
            }
          }
        );


        hls.on(
          window.Hls.Events.MANIFEST_PARSED,
          () => {
            if (generation === requestID) {
              play();
            }
          }
        );


        hls.attachMedia(
          video
        );

      }


      window.m3uWaranasChange =
        function(url) {

          if (
            !url ||
            typeof url !== "string" ||
            !url.startsWith("http")
          ) {
            return;
          }

          uiLog("Trocando transmissão...");

          const generation = ++requestID;

          destroy();

          startHLS(
            url,
            generation
          );

        };


      window.m3uWaranasDestroy =
        destroy;


      window.m3uWaranasPlay =
        play;


      startHLS(
        ${JSON.stringify(initialURL)},
        requestID
      );

    })();
  `);

  return _player;
}

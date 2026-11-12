
import {
  head,
  script,
} from "../../globals";

import type {
  HTMLElementW,
} from "../../interface.index";

import {
  append,
  doItElement,
  getChildren,
  style,
  unsetAttr,
  videoPlayer,
} from "../../main.index";

import {
  generateUniqueToken,
} from "../crypto/uniqueToken";

import {
  parseM3U,
} from "../helppers/helppers.index";


interface M3UPlayerError {
  channelID: number | null;
  playerID: string;
  data_id: string | null;
  streamURL: string | null;
  payload: Record<string, unknown>;
}

interface M3UPlayerControls {
  data_id?: string;
  channel_id?: number | string;

  onError?: (
    report: M3UPlayerError
  ) => void;
}


export function m3uPlayer(
  m3u: string,
  controls?: M3UPlayerControls,
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

  const fsBtnID =
    "m3uFSBtn_" + generateUniqueToken();

  const channelID =
    controls?.channel_id !== undefined
      ? Number(controls.channel_id)
      : null;

  const onErrorCode =
    controls?.onError
      ? `(${controls.onError.toString()})`
      : "null";


  player
    .setAttr(
      "id",
      playerID,
    )
    .setAttr(
      "data-id",
      controls?.data_id ?? playerID
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


  /* Botão de tela cheia */

  const fullscreenBtn =
    doItElement("button");

  fullscreenBtn.setAttr(
    "id",
    fsBtnID,
  );

  fullscreenBtn.setAttr(
    "class",
    "fullscreenBtn",
  );

  fullscreenBtn.setAttr(
    "title",
    "Tela cheia",
  );

  fullscreenBtn.textContent = `
    <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" stroke="#000" stroke-width="1" stroke-linejoin="round">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
    </svg>
  `;

  append(
    _player,
    fullscreenBtn,
  );


  style.add(`
    .videoPlayer .fullscreenBtn {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      z-index: 10;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0.4rem;
      border: none;
      background: transparent;
      cursor: pointer;

      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.3s ease, transform 0.1s ease;
    }

    @media (hover: none) and (pointer: coarse) {
      .videoPlayer .fullscreenBtn {
        opacity: 0.6;
      }
    }

    .videoPlayer .fullscreenBtn.is-visible {
      opacity: 1;
      pointer-events: auto;
    }

    .videoPlayer .fullscreenBtn:hover {
      transform: scale(1.15);
    }

    .videoPlayer .fullscreenBtn:active {
      transform: scale(0.95);
    }

    .videoPlayer:fullscreen,
    .videoPlayer:fullscreen video,
    .videoPlayer:-webkit-full-screen,
    .videoPlayer:-webkit-full-screen video {
      border-radius: 0 !important;
    }
  `);


  /* CDN HLS.js */

  const cdnHLS =
    doItElement("script");

  cdnHLS.setAttr(
    "src",
    "https://cdn.jsdelivr.net/npm/hls.js@latest",
  );

  cdnHLS.setAttr(
    "defer",
    "",
  );

  head.add(cdnHLS);


  /* Captura de erro nativo do vídeo */

  const videoErrorListener =
    controls?.onError
      ? `
        video.addEventListener(
          "error",
          () => {

            if (!video.error || !currentStreamURL) {
              return;
            }

            reportError(
              {
                source: "VIDEO",
                type: "MEDIA_ERROR",
                code: video.error.code,
                message: video.error.message || "Erro no elemento de vídeo.",
                fatal: true,
              },
              requestID
            );

            uiLog(
              "Erro na reprodução do vídeo.",
              true
            );
          }
        );
      `
      : "";


  /* Captura de erro fatal do HLS.js */

  const hlsErrorReport =
    controls?.onError
      ? `
        reportError(
          {
            source: "HLS",
            type: data.type,
            details: data.details,
            fatal: data.fatal,
            reason: data.reason || null,
            responseStatus: data.response?.code || null,
            errorURL: data.url || url,
          },
          generation
        );
      `
      : "";


  script.add(`
    (() => {

      const video =
        document.getElementById(
          "${playerID}"
        );

      if (!video) {
        return;
      }

      const fsBtn =
        document.getElementById(
          "${fsBtnID}"
        );

      const playerContainer =
        video.parentElement;

      const channelID =
        ${JSON.stringify(channelID)};

      const playerID =
        "${playerID}";

      const onErrorCallback =
        ${onErrorCode};


      /*
       * Tela cheia e controles.
       */

      if (fsBtn && playerContainer) {

        let hideTimeout = null;

        function showControls() {

          fsBtn.classList.add("is-visible");

          if (hideTimeout) {
            clearTimeout(hideTimeout);
          }

          hideTimeout = setTimeout(() => {
            fsBtn.classList.remove("is-visible");
          }, 3000);
        }

        playerContainer.addEventListener(
          "mousemove",
          showControls
        );

        playerContainer.addEventListener(
          "mouseenter",
          showControls
        );

        playerContainer.addEventListener(
          "mouseleave",
          () => {

            if (hideTimeout) {
              clearTimeout(hideTimeout);
            }

            fsBtn.classList.remove("is-visible");
          }
        );

        fsBtn.addEventListener(
          "click",
          (e) => {

            e.stopPropagation();

            const target =
              playerContainer || video;

            if (!document.fullscreenElement) {

              if (target.requestFullscreen) {
                target.requestFullscreen();

              } else if (target.webkitRequestFullscreen) {
                target.webkitRequestFullscreen();

              } else if (target.msRequestFullscreen) {
                target.msRequestFullscreen();
              }

            } else {

              if (document.exitFullscreen) {
                document.exitFullscreen();

              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              }
            }
          }
        );
      }


      /*
       * Ícone de mudo.
       */

      const muteIcon =
        video.parentElement.querySelector(".muteIcon");

      function syncMuteIcon() {

        if (!muteIcon) {
          return;
        }

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


      /*
       * Verificação inicial do estado de mudo.
       */

      (async () => {

        for (let i = 0; i < 9; i++) {

          syncMuteIcon();

          await new Promise(
            resolve => setTimeout(resolve, 1000)
          );
        }

      })();

      video.addEventListener(
        "volumechange",
        syncMuteIcon
      );

      video.addEventListener(
        "play",
        syncMuteIcon
      );

      video.addEventListener(
        "pause",
        syncMuteIcon
      );


      let hls = null;

      let requestID = 0;

      let logTimeout = null;

      let currentStreamURL = null;

      let reportedGeneration = -1;


      /*
       * Callback de erro.
       *
       * O callback pertence à aplicação que criou
       * o player e é executado no navegador.
       */

      function reportError(payload, generation) {

        if (generation !== requestID) {
          return;
        }

        if (reportedGeneration === generation) {
          return;
        }

        reportedGeneration = generation;

        if (typeof onErrorCallback !== "function") {
          return;
        }

        const report = {
          channelID,
          playerID,
          data_id: video.dataset.id || null,
          streamURL: currentStreamURL,
          payload,
        };

        try {

          Promise.resolve(
            onErrorCallback(report)
          ).catch(error => {

            console.error(
              "[M3U Player] Callback de erro:",
              error
            );

          });

        } catch (error) {

          console.error(
            "[M3U Player] Callback de erro:",
            error
          );
        }
      }


      /*
       * Mensagens do player.
       */

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


      /*
       * Destrói a instância HLS atual.
       */

      function destroy() {

        currentStreamURL = null;

        if (hls) {

          try {
            hls.stopLoad();
          } catch (e) {}

          try {
            hls.detachMedia();
          } catch (e) {}

          try {
            hls.destroy();
          } catch (e) {}

          hls = null;
        }

        video.pause();

        video.removeAttribute("src");

        video.load();
      }


      /*
       * Reprodução.
       */

      async function play() {

        try {

          await video.play();

        } catch (e) {

          video.muted = true;

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


      /*
       * Clique para ativar áudio.
       */

      video.addEventListener(
        "click",
        () => {

          if (!video.muted) {
            return;
          }

          video.muted = false;

          syncMuteIcon();

          video.play()
            .then(() => {

              uiLog("Áudio ativado.");

            })
            .catch(() => {

              video.muted = true;

              syncMuteIcon();

              uiLog(
                "Não foi possível ativar o áudio.",
                true
              );
            });
        }
      );


      /*
       * Eventos de reprodução.
       */

      video.addEventListener(
        "waiting",
        () => {
          uiLog("Aguardando transmissão...");
        }
      );

      video.addEventListener(
        "playing",
        () => {

          uiLog(
            video.muted
              ? "Reproduzindo sem áudio. Clique no vídeo para ativar o som."
              : "Reproduzindo."
          );
        }
      );

      video.addEventListener(
        "stalled",
        () => {

          uiLog(
            "Transmissão interrompida temporariamente.",
            true
          );
        }
      );


      /*
       * Erro nativo do vídeo.
       */

      ${videoErrorListener}


      /*
       * Inicialização HLS.
       */

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

        currentStreamURL = url;

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

        if (!window.Hls.isSupported()) {

          uiLog(
            "Navegador não suportado.",
            true
          );

          reportError(
            {
              source: "HLS",
              type: "UNSUPPORTED_BROWSER",
              message: "O navegador não suporta HLS.js.",
              fatal: true,
            },
            generation
          );

          return;
        }

        uiLog("Conectando...");

        hls =
          new window.Hls();


        /*
         * Tratamento de erros HLS.
         */

        hls.on(
          window.Hls.Events.ERROR,
          (event, data) => {

            if (
              generation !== requestID ||
              !data?.fatal
            ) {
              return;
            }

            ${hlsErrorReport}

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


        /*
         * HLS conectado ao vídeo.
         */

        hls.on(
          window.Hls.Events.MEDIA_ATTACHED,
          () => {

            if (generation === requestID) {
              hls.loadSource(url);
            }
          }
        );


        /*
         * Manifesto carregado.
         */

        hls.on(
          window.Hls.Events.MANIFEST_PARSED,
          () => {

            if (generation === requestID) {
              play();
            }
          }
        );

        hls.attachMedia(video);
      }


      /*
       * Troca de transmissão.
       */

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

          const generation =
            ++requestID;

          destroy();

          startHLS(
            url,
            generation
          );
        };


      /*
       * API pública do player.
       */

      window.m3uWaranasDestroy =
        destroy;

      window.m3uWaranasPlay =
        play;


      /*
       * Inicialização.
       */

      startHLS(
        ${JSON.stringify(initialURL)},
        requestID
      );

    })();
  `);

  return _player;
}

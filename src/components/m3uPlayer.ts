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

  const fsBtnID =
    "m3uFSBtn_" + generateUniqueToken();

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

  /* Botão de tela cheia sem fundo e com ícone customizado (mais grosso e stroke preto) */
  const fullscreenBtn = doItElement("button");
  fullscreenBtn.setAttr("id", fsBtnID);
  fullscreenBtn.setAttr("class", "fullscreenBtn");
  fullscreenBtn.setAttr("title", "Tela cheia");
  fullscreenBtn.textContent = `
    <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" stroke="#000" stroke-width="1" stroke-linejoin="round">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
    </svg>
  `;

  append(_player, fullscreenBtn);

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

      /* Padrão para desktop: totalmente visível por padrão */
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.3s ease, transform 0.1s ease;
    }

    /* Regra específica para Dispositivos Móveis (Touch): Ativa opacity 0.6 inicialmente */
    @media (hover: none) and (pointer: coarse) {
      .videoPlayer .fullscreenBtn {
        opacity: 0.6;
      }
    }

    /* Classe ativada quando há movimento do mouse ou interação */
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

    /* Remove o border-radius globalmente ao entrar em tela cheia */
    .videoPlayer:fullscreen,
    .videoPlayer:fullscreen video,
    .videoPlayer:-webkit-full-screen,
    .videoPlayer:-webkit-full-screen video {
      border-radius: 0 !important;
    }
  `);

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

      const fsBtn =
        document.getElementById(
          "${fsBtnID}"
        );

      const playerContainer = video.parentElement;

      /* Lógica de auto-ocultar o botão no movimento do mouse */
      if (fsBtn && playerContainer) {
        let hideTimeout = null;

        function showControls() {
          fsBtn.classList.add("is-visible");

          if (hideTimeout) {
            clearTimeout(hideTimeout);
          }

          /* Oculta o botão após 3 segundos sem movimento */
          hideTimeout = setTimeout(() => {
            fsBtn.classList.remove("is-visible");
          }, 3000);
        }

        playerContainer.addEventListener("mousemove", showControls);
        playerContainer.addEventListener("mouseenter", showControls);
        playerContainer.addEventListener("mouseleave", () => {
          if (hideTimeout) clearTimeout(hideTimeout);
          fsBtn.classList.remove("is-visible");
        });

        fsBtn.addEventListener("click", (e) => {
          e.stopPropagation();

          const target = playerContainer || video;

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
        });
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

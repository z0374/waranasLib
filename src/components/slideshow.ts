import {
    script,
    style,
} from "../../globals";

import type {
    HTMLElementW,
} from "../../interface.index";

import {
    addClassList,
    append,
    doItElement,
} from "../../main.index";
import { generateUniqueToken } from "../crypto/uniqueToken";

export interface SlideItem {
    src: string;
    url: string;
}

export function slideshow(
    array: SlideItem[],
    auto: number = 0,
    element: string = "default",
): HTMLElementW {
    const container = doItElement("div");
    const id = generateUniqueToken();
    const containerID = `d${id}`;
    const itemsID = `items${id}`;
    const prevID = `prev${id}`;
    const nextID = `next${id}`;

    container.setAttr("id", containerID);
    addClassList(container, "slideshow");

    const itemsContainer = doItElement("div");
    itemsContainer.setAttr("id", itemsID);
    itemsContainer.setAttr("data-index", "0");
    addClassList(itemsContainer, "items_slideshow");

    array.forEach((item, index) => {
        const slideWrapper = doItElement("div");
        addClassList(slideWrapper, "slide-wrapper");

        // 1. Elemento do Fundo Borrado (Backdrop)
        // Movido para FORA da tag <a>, aplicado diretamente no wrapper
        const blurBg = doItElement("div");
        addClassList(blurBg, "slide-blur");
        // Uso de aspas simples para evitar quebra do atributo style
        blurBg.setAttr("style", `background-image: url('${item.src}');`);
        append(slideWrapper, blurBg);

        // 2. Elemento do Conteúdo Principal (Foreground Link)
        const anchor = doItElement("a");
        anchor.setAttr("href", item.url);
        anchor.setAttr("target", "_blank");
        anchor.setAttr("rel", "noopener noreferrer");
        addClassList(anchor, "slide-link");

        switch (element) {
            case "image": {
                const image = doItElement("img");
                image.setAttr("src", item.src);
                image.setAttr("alt", `Slide ${index + 1}`);
                image.setAttr("loading", "lazy");
                addClassList(image, "slide-media");

                append(anchor, image);
                break;
            }

            case "video": {
                const video = doItElement("video");
                video.setAttr("src", item.src);
                video.setAttr("autoplay", "");
                video.setAttr("muted", "");
                video.setAttr("loop", "");
                video.setAttr("playsinline", "");
                addClassList(video, "slide-media");

                append(anchor, video);
                break;
            }

            case "audio": {
                const audio = doItElement("audio");
                audio.setAttr("src", item.src);
                audio.setAttr("controls", "");
                addClassList(audio, "slide-media-audio");

                append(anchor, audio);
                break;
            }

            case "iframe":
            case "embed": {
                const iframe = doItElement("iframe");
                iframe.setAttr("src", item.src);
                iframe.setAttr("title", `Slide ${index + 1}`);
                iframe.setAttr("loading", "lazy");
                iframe.setAttr("allowfullscreen", "");
                addClassList(iframe, "slide-media-iframe");

                append(anchor, iframe);
                break;
            }

            case "default":
            default: {
                const defaultImg = doItElement("div");
                addClassList(defaultImg, "slide-media-default");
                defaultImg.setAttr("style", `background-image: url('${item.src}');`);
                append(anchor, defaultImg);
                break;
            }
        }

        // Adiciona a âncora (com a mídia) sobre o fundo borrado
        append(slideWrapper, anchor);
        append(itemsContainer, slideWrapper);
    });

    const prevBtn = doItElement("button");
    prevBtn.setAttr("id", prevID);
    prevBtn.setAttr("type", "button");
    prevBtn.setAttr("aria-label", "Slide anterior");
    addClassList(prevBtn, "nav-bt");
    addClassList(prevBtn, "nav-bt-prev");
    prevBtn.textContent = "❮";

    const nextBtn = doItElement("button");
    nextBtn.setAttr("id", nextID);
    nextBtn.setAttr("type", "button");
    nextBtn.setAttr("aria-label", "Próximo slide");
    addClassList(nextBtn, "nav-bt");
    addClassList(nextBtn, "nav-bt-next");
    nextBtn.textContent = "❯";

    append(
        container,
        prevBtn,
        itemsContainer,
        nextBtn,
    );

    script.add(`
        (() => {
            const containerID = ${JSON.stringify(containerID)};
            const itemsID = ${JSON.stringify(itemsID)};
            const prevID = ${JSON.stringify(prevID)};
            const nextID = ${JSON.stringify(nextID)};
            const auto = ${Number(auto) || 0};

            function initializeSlideshow() {
                const container = document.getElementById(containerID);
                const items = document.getElementById(itemsID);
                const prevBtn = document.getElementById(prevID);
                const nextBtn = document.getElementById(nextID);

                if (!container || !items || !prevBtn || !nextBtn) return;
                if (container.dataset.slideshowInitialized === "true") return;

                container.dataset.slideshowInitialized = "true";

                const slides = Array.from(items.children);
                let currentIndex = 0;
                let autoplayID = null;

                function showSlide(index) {
                    if (slides.length === 0) return;

                    currentIndex = ((index % slides.length) + slides.length) % slides.length;
                    items.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
                    items.dataset.index = String(currentIndex);

                    slides.forEach((slide, slideIndex) => {
                        slide.classList.toggle("active", slideIndex === currentIndex);
                        slide.setAttribute("aria-hidden", String(slideIndex !== currentIndex));
                    });
                }

                function moveSlide(direction) {
                    showSlide(currentIndex + direction);
                }

                prevBtn.addEventListener("click", () => moveSlide(-1));
                nextBtn.addEventListener("click", () => moveSlide(1));

                window[${JSON.stringify(`moveSlide${id}`)}] = moveSlide;

                showSlide(0);

                if (auto > 0 && slides.length > 1) {
                    autoplayID = window.setInterval(() => {
                        if (!container.isConnected) {
                            window.clearInterval(autoplayID);
                            return;
                        }
                        moveSlide(1);
                    }, auto * 1000);
                }
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initializeSlideshow, { once: true });
            } else {
                initializeSlideshow();
            }
        })();
    `);

    style.add(`
        .slideshow {
            width: 30rem;
            aspect-ratio: 16/9;
            container-type: inline-size;
            position: relative;
            isolation: isolate;
            overflow: hidden;
            border: solid 0.06rem black;
            border-radius: 1rem;
            background-color: #050505;
        }

        .items_slideshow {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: stretch;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            transition: transform 0.5s ease-in-out;
            will-change: transform;
        }

        .slide-wrapper {
            flex: 0 0 100%;
            width: 100%;
            height: 100%;
            min-width: 0;
            position: relative;
            box-sizing: border-box;
            overflow: hidden; /* Mantém o blur contido */
        }

        /* --- Fundo Desfocado Atualizado --- */
        .slide-blur {
            position: absolute;
            top: -15%;
            left: -15%;
            width: 130%; /* Tamanhos aumentados para evitar bordas brancas/cortadas no blur */
            height: 130%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            /* Compatibilidade de Blur */
            -webkit-filter: blur(25px) brightness(0.4);
            filter: blur(25px) brightness(0.4);

            z-index: 1;
            pointer-events: none;

            /* Aceleração de GPU para corrigir fundo preto ou falhas de renderização */
            transform: translateZ(0);
            will-change: filter;
        }

        /* --- Mídia Frente Atualizada --- */
        .slide-link {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 10; /* Garante que ficará ACIMA do blur */
            text-decoration: none;
        }

        .slide-media {
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
            object-fit: contain;
            border: none;
            /* Uma leve sombra para fazer a imagem frontal se destacar contra o blur */
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
        }

        .slide-media-default {
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        .slide-media-audio {
            position: relative;
            z-index: 10;
            width: 90%;
        }

        .slide-media-iframe {
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
            border: 0;
        }

        .slideshow .nav-bt {
            position: absolute;
            top: 0;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 10%;
            min-width: 36px;
            height: 100%;
            padding: 0;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            opacity: 0;
            background-color: transparent;
            transition: opacity 0.3s ease, background-color 0.3s ease;
        }

        .slideshow:hover .nav-bt,
        .slideshow:focus-within .nav-bt {
            opacity: 1;
        }

        .slideshow .nav-bt:hover {
            background-color: rgba(0, 0, 0, 0.3);
        }

        .slideshow .nav-bt-prev {
            left: 0;
            background: linear-gradient(to right, rgba(0, 0, 0, 0.5), transparent);
        }

        .slideshow .nav-bt-next {
            right: 0;
            background: linear-gradient(to left, rgba(0, 0, 0, 0.5), transparent);
        }

        @media (hover: none) {
            .slideshow .nav-bt {
                opacity: 1;
            }
        }
    `);

    return container;
}

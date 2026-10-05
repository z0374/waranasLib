import { style, script } from "../../globals";
import type { HTMLElementW } from "../../interface.index";
import { append, doItElement, setAttr } from "../core/parseHTML/parseHTML.index";



/* ======================================================
   TYPES
====================================================== */

export interface ImageViewerImage {
    src: string;
    thumbnail?: string;
    alt?: string;
}


export interface ImageViewerOptions {
    images: ImageViewerImage[];
    height?: string;
    className?: string;
}


/* ======================================================
   COMPONENT
====================================================== */

export function imageViewer(
    options: ImageViewerOptions
): HTMLElementW {

    const {
        images,
        height = "600px",
        className = "",
    } = options;


    /* ==================================================
       CONTAINER
    ================================================== */

    const viewer =
        doItElement(
            "div"
        ) as HTMLElementW;


    const single =
        images.length === 1;


    setAttr(
        viewer,
        "class",
        `imageViewer ${
            single
                ? "imageViewer-single"
                : ""
        } ${className}`.trim()
    );


    setAttr(
        viewer,
        "tabindex",
        "0"
    );


    /* ==================================================
       ALBUM
    ================================================== */

    let album:
        HTMLElementW | null = null;


    if (images.length > 1) {

        album =
            doItElement(
                "aside"
            ) as HTMLElementW;


        setAttr(
            album,
            "class",
            "imageViewer-album"
        );


        images.forEach(
            (item, index) => {

                const thumbnail =
                    doItElement(
                        "button"
                    ) as HTMLElementW;


                setAttr(
                    thumbnail,
                    "class",
                    `imageViewer-thumbnail${
                        index === 0
                            ? " active"
                            : ""
                    }`
                );


                setAttr(
                    thumbnail,
                    "type",
                    "button"
                );


                setAttr(
                    thumbnail,
                    "data-image",
                    item.src
                );


                setAttr(
                    thumbnail,
                    "data-index",
                    String(index)
                );


                const thumbnailImage =
                    doItElement(
                        "img"
                    ) as HTMLElementW;


                setAttr(
                    thumbnailImage,
                    "src",
                    item.thumbnail ?? item.src
                );


                setAttr(
                    thumbnailImage,
                    "alt",
                    item.alt ?? ""
                );


                append(
                    thumbnail,
                    thumbnailImage
                );


                append(
                    album,
                    thumbnail
                );

            }
        );

    }


    /* ==================================================
       MAIN
    ================================================== */

    const main =
        doItElement(
            "main"
        ) as HTMLElementW;


    setAttr(
        main,
        "class",
        "imageViewer-main"
    );


    /* ==================================================
       IMAGE CONTAINER
    ================================================== */

    const imageContainer =
        doItElement(
            "div"
        ) as HTMLElementW;


    setAttr(
        imageContainer,
        "class",
        "imageViewer-image"
    );


    /* ==================================================
       IMAGE
    ================================================== */

    const image =
        doItElement(
            "img"
        ) as HTMLElementW;


    const firstImage =
        images[0];


    if (firstImage) {

        setAttr(
            image,
            "src",
            firstImage.src
        );


        setAttr(
            image,
            "alt",
            firstImage.alt ?? ""
        );

    }


    setAttr(
        image,
        "draggable",
        "false"
    );


    append(
        imageContainer,
        image
    );


    /* ==================================================
       MENU
    ================================================== */

    const menu =
        doItElement(
            "nav"
        ) as HTMLElementW;


    setAttr(
        menu,
        "class",
        "imageViewer-menu"
    );


    setAttr(
        menu,
        "aria-label",
        "Controles da imagem"
    );


    /* ==================================================
       ZOOM / GRAB
    ================================================== */

    const zoomButton =
        doItElement(
            "button"
        ) as HTMLElementW;


    setAttr(
        zoomButton,
        "class",
        "imageViewer-action imageViewer-zoom"
    );


    setAttr(
        zoomButton,
        "type",
        "button"
    );


    append(
        zoomButton,
        "Zoom / Grab"
    );


    /* ==================================================
       OPEN
    ================================================== */

    const openButton =
        doItElement(
            "button"
        ) as HTMLElementW;


    setAttr(
        openButton,
        "class",
        "imageViewer-action imageViewer-open"
    );


    setAttr(
        openButton,
        "type",
        "button"
    );


    append(
        openButton,
        "Open"
    );


    /* ==================================================
       FULLSCREEN
    ================================================== */

    const fullscreenButton =
        doItElement(
            "button"
        ) as HTMLElementW;


    setAttr(
        fullscreenButton,
        "class",
        "imageViewer-action imageViewer-fullscreen"
    );


    setAttr(
        fullscreenButton,
        "type",
        "button"
    );


    append(
        fullscreenButton,
        "FullScreen"
    );


    /* ==================================================
       MENU
    ================================================== */

    append(
        menu,
        zoomButton,
        openButton,
        fullscreenButton
    );


    /* ==================================================
       MAIN
    ================================================== */

    append(
        main,
        imageContainer,
        menu
    );


    /* ==================================================
       VIEWER CONTENT
    ================================================== */

    if (album) {

        append(
            viewer,
            album,
            main
        );

    } else {

        append(
            viewer,
            main
        );

    }


    /* ==================================================
       MODAL
    ================================================== */

    const modal =
        createImageViewerModal();


    append(
        viewer,
        modal
    );


    /* ==================================================
       STYLE
    ================================================== */

    addImageViewerStyle(
        height
    );


    /* ==================================================
       SCRIPT
    ================================================== */

    addImageViewerScript();


    return viewer;
}


/* ======================================================
   MODAL
====================================================== */

function createImageViewerModal(): HTMLElementW {

    const modal =
        doItElement(
            "div"
        ) as HTMLElementW;


    setAttr(
        modal,
        "class",
        "imageViewer-modal"
    );


    setAttr(
        modal,
        "aria-hidden",
        "true"
    );


    const content =
        doItElement(
            "div"
        ) as HTMLElementW;


    setAttr(
        content,
        "class",
        "imageViewer-modal-content"
    );


    const image =
        doItElement(
            "img"
        ) as HTMLElementW;


    setAttr(
        image,
        "class",
        "imageViewer-modal-image"
    );


    setAttr(
        image,
        "alt",
        ""
    );


    const close =
        doItElement(
            "button"
        ) as HTMLElementW;


    setAttr(
        close,
        "class",
        "imageViewer-modal-close"
    );


    setAttr(
        close,
        "type",
        "button"
    );


    setAttr(
        close,
        "aria-label",
        "Fechar"
    );


    append(
        close,
        "×"
    );


    append(
        content,
        image,
        close
    );


    append(
        modal,
        content
    );


    return modal;
}


/* ======================================================
   STYLE
====================================================== */

function addImageViewerStyle(
    height: string
): void {

    style.add(`

        /* ==============================================
           VIEWER
        ============================================== */

        .imageViewer {
            width: 100%;
            height: ${height};

            display: grid;
            grid-template-columns:
                100px minmax(0, 1fr);

            overflow: hidden;

            background: #18181b;

            border-radius: 22px;
        }


        /* ==============================================
           SINGLE IMAGE
        ============================================== */

        .imageViewer.imageViewer-single {
            grid-template-columns:
                minmax(0, 1fr);
        }


        /* ==============================================
           ALBUM
        ============================================== */

        .imageViewer-album {
            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: column;

            gap: 10px;

            padding: 10px;

            overflow-x: hidden;
            overflow-y: auto;

            box-sizing: border-box;
        }


        /* ==============================================
           THUMBNAIL
        ============================================== */

        .imageViewer-thumbnail {
            position: relative;

            width: 80px;
            height: 80px;

            flex: 0 0 80px;

            padding: 0;

            border: 2px solid transparent;
            border-radius: 14px;

            overflow: hidden;

            background: transparent;

            cursor: pointer;

            box-sizing: border-box;

            transition:
                border-color 150ms ease,
                opacity 150ms ease,
                transform 150ms ease;
        }


        .imageViewer-thumbnail:hover {
            opacity: 0.8;
        }


        .imageViewer-thumbnail.active {
            border-color: #e11d48;
        }


        .imageViewer-thumbnail:active {
            transform: scale(0.96);
        }


        .imageViewer-thumbnail img {
            width: 100%;
            height: 100%;

            display: block;

            object-fit: cover;
        }


        /* ==============================================
           MAIN
        ============================================== */

        .imageViewer-main {
            position: relative;

            width: 100%;
            height: 100%;

            min-width: 0;
            min-height: 0;

            overflow: hidden;

            background: #fafaf9;

            outline: none;
        }


        /* ==============================================
           IMAGE AREA
        ============================================== */

        .imageViewer-image {
            width: 100%;
            height: 100%;

            display: flex;

            align-items: center;
            justify-content: center;

            overflow: hidden;

            user-select: none;
            -webkit-user-select: none;
        }


        .imageViewer-image img {
            width: 100%;
            height: 100%;

            display: block;

            object-fit: contain;

            transform:
                translate3d(0, 0, 0)
                scale(1);

            transform-origin:
                center center;

            user-select: none;

            -webkit-user-drag: none;
            -webkit-user-select: none;

            transition:
                transform 180ms ease;

            will-change: transform;
        }


        /* ==============================================
           ZOOM
        ============================================== */

        .imageViewer-main.zoom-active
        .imageViewer-image img {

            cursor: grab;

            transition: none;
        }


        .imageViewer-main.zoom-active
        .imageViewer-image img.grabbing {

            cursor: grabbing;
        }


        /* ==============================================
           MENU
        ============================================== */

        .imageViewer-menu {
            position: absolute;

            left: 50%;
            bottom: 20px;

            display: flex;
            align-items: center;

            gap: 6px;

            padding: 6px;

            border-radius: 14px;

            background:
                rgb(24 24 27 / 85%);

            backdrop-filter:
                blur(10px);

            -webkit-backdrop-filter:
                blur(10px);

            opacity: 0;

            pointer-events: none;

            transform:
                translate(-50%, 8px);

            transition:
                opacity 180ms ease,
                transform 180ms ease;
        }


        .imageViewer-main:hover
        .imageViewer-menu {

            opacity: 1;

            pointer-events: auto;

            transform:
                translate(-50%, 0);
        }


        /* ==============================================
           ACTIONS
        ============================================== */

        .imageViewer-action {
            height: 38px;

            display: flex;

            align-items: center;
            justify-content: center;

            padding: 0 14px;

            border: 0;
            border-radius: 10px;

            background: transparent;

            color: #fafaf9;

            font-family: inherit;

            font-size: 13px;
            font-weight: 500;

            white-space: nowrap;

            cursor: pointer;

            transition:
                background 150ms ease,
                color 150ms ease;
        }


        .imageViewer-action:hover {
            background:
                rgb(250 250 249 / 12%);
        }


        .imageViewer-action:active {
            background:
                rgb(250 250 249 / 20%);
        }


        .imageViewer-action.active {
            background: #e11d48;
        }


        /* ==============================================
           ACTION SEPARATORS
        ============================================== */

        .imageViewer-action + .imageViewer-action {
            position: relative;
        }


        .imageViewer-action
        + .imageViewer-action::before {

            content: "";

            position: absolute;

            left: -3px;
            top: 8px;

            width: 1px;
            height: 22px;

            background:
                rgb(250 250 249 / 15%);
        }


        /* ==============================================
           ALBUM SCROLLBAR
        ============================================== */

        .imageViewer-album::-webkit-scrollbar {
            width: 5px;
        }


        .imageViewer-album::-webkit-scrollbar-track {
            background: transparent;
        }


        .imageViewer-album::-webkit-scrollbar-thumb {

            background:
                rgb(250 250 249 / 20%);

            border-radius: 10px;
        }


        /* ==============================================
           MODAL
        ============================================== */

        .imageViewer-modal {
            position: fixed;

            inset: 0;

            z-index: 9999;

            display: flex;

            align-items: center;
            justify-content: center;

            padding: 30px;

            box-sizing: border-box;

            background:
                rgb(0 0 0 / 88%);

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

            transition:
                opacity 180ms ease,
                visibility 180ms ease;
        }


        .imageViewer-modal.active {

            opacity: 1;

            visibility: visible;

            pointer-events: auto;
        }


        .imageViewer-modal-content {
            position: relative;

            width: 100%;
            height: 100%;

            display: flex;

            align-items: center;
            justify-content: center;

            overflow: hidden;
        }


        .imageViewer-modal-image {

            max-width: 100%;
            max-height: 100%;

            display: block;

            object-fit: contain;

            user-select: none;

            -webkit-user-drag: none;
        }


        /* ==============================================
           MODAL CLOSE
        ============================================== */

        .imageViewer-modal-close {

            position: absolute;

            top: 15px;
            right: 15px;

            width: 42px;
            height: 42px;

            display: flex;

            align-items: center;
            justify-content: center;

            border: 0;

            border-radius: 50%;

            background:
                rgb(24 24 27 / 80%);

            color: #fafaf9;

            font-size: 22px;

            cursor: pointer;

            transition:
                background 150ms ease,
                transform 150ms ease;
        }


        .imageViewer-modal-close:hover {

            background:
                rgb(24 24 27 / 100%);

            transform:
                scale(1.05);
        }


        /* ==============================================
           FULLSCREEN
        ============================================== */

        .imageViewer:fullscreen {

            width: 100vw;
            height: 100vh;

            border-radius: 0;
        }


        .imageViewer:-webkit-full-screen {

            width: 100vw;
            height: 100vh;

            border-radius: 0;
        }


        /* ==============================================
           RESPONSIVE
        ============================================== */

        @media (max-width: 600px) {

            .imageViewer {

                grid-template-columns:
                    76px minmax(0, 1fr);

                border-radius: 16px;
            }


            .imageViewer.imageViewer-single {

                grid-template-columns:
                    minmax(0, 1fr);
            }


            .imageViewer-album {

                gap: 8px;

                padding: 8px;
            }


            .imageViewer-thumbnail {

                width: 60px;
                height: 60px;

                flex-basis: 60px;

                border-radius: 10px;
            }


            .imageViewer-menu {

                left: auto;

                right: 10px;
                bottom: 10px;

                transform:
                    translateY(8px);
            }


            .imageViewer-main:hover
            .imageViewer-menu {

                transform:
                    translateY(0);
            }


            .imageViewer-action {

                width: 38px;
                height: 38px;

                padding: 0;

                font-size: 0;
            }


            .imageViewer-action::after {

                font-size: 16px;
            }


            .imageViewer-zoom::after {
                content: "⌕";
            }


            .imageViewer-open::after {
                content: "↗";
            }


            .imageViewer-fullscreen::after {
                content: "⛶";
            }


            .imageViewer-action
            + .imageViewer-action::before {

                display: none;
            }


            .imageViewer-modal {

                padding: 10px;
            }

        }

    `);

}


/* ======================================================
   SCRIPT
====================================================== */

function addImageViewerScript(): void {

    script.add(`

        document
        .querySelectorAll(".imageViewer")
        .forEach(viewer => {

            const main =
                viewer.querySelector(
                    ".imageViewer-main"
                );


            const image =
                viewer.querySelector(
                    ".imageViewer-image img"
                );


            const thumbnails =
                [
                    ...viewer.querySelectorAll(
                        ".imageViewer-thumbnail"
                    )
                ];


            const zoomButton =
                viewer.querySelector(
                    ".imageViewer-zoom"
                );


            const openButton =
                viewer.querySelector(
                    ".imageViewer-open"
                );


            const fullscreenButton =
                viewer.querySelector(
                    ".imageViewer-fullscreen"
                );


            const modal =
                viewer.querySelector(
                    ".imageViewer-modal"
                );


            const modalImage =
                viewer.querySelector(
                    ".imageViewer-modal-image"
                );


            const modalClose =
                viewer.querySelector(
                    ".imageViewer-modal-close"
                );


            let currentIndex = 0;

            let zoomActive = false;

            let zoom = 1;

            let translateX = 0;

            let translateY = 0;

            let dragging = false;

            let startX = 0;

            let startY = 0;

            let startTranslateX = 0;

            let startTranslateY = 0;


            const MIN_ZOOM = 1;

            const MAX_ZOOM = 5;

            const ZOOM_STEP = 0.25;


            /* ==========================================
               TRANSFORM
            ========================================== */

            function updateTransform() {

                image.style.transform =
                    "translate3d(" +
                    translateX +
                    "px, " +
                    translateY +
                    "px, 0) " +
                    "scale(" +
                    zoom +
                    ")";

            }


            /* ==========================================
               RESET
            ========================================== */

            function resetZoom() {

                zoom = 1;

                translateX = 0;

                translateY = 0;

                updateTransform();

            }


            /* ==========================================
               LIMIT POSITION
            ========================================== */

            function limitPosition() {

                if (zoom <= 1) {

                    translateX = 0;

                    translateY = 0;

                    return;

                }


                const rect =
                    main.getBoundingClientRect();


                const maxX =
                    (
                        rect.width *
                        (zoom - 1)
                    ) / 2;


                const maxY =
                    (
                        rect.height *
                        (zoom - 1)
                    ) / 2;


                translateX =
                    Math.max(
                        -maxX,
                        Math.min(
                            maxX,
                            translateX
                        )
                    );


                translateY =
                    Math.max(
                        -maxY,
                        Math.min(
                            maxY,
                            translateY
                        )
                    );

            }


            /* ==========================================
               SET ZOOM
            ========================================== */

            function setZoom(value) {

                zoom =
                    Math.max(
                        MIN_ZOOM,
                        Math.min(
                            MAX_ZOOM,
                            value
                        )
                    );


                if (zoom === 1) {

                    translateX = 0;

                    translateY = 0;

                }


                limitPosition();

                updateTransform();

            }


            /* ==========================================
               TOGGLE ZOOM
            ========================================== */

            function toggleZoom() {

                zoomActive =
                    !zoomActive;


                main.classList.toggle(
                    "zoom-active",
                    zoomActive
                );


                zoomButton.classList.toggle(
                    "active",
                    zoomActive
                );


                if (!zoomActive) {

                    resetZoom();

                }

            }


            /* ==========================================
               SELECT IMAGE
            ========================================== */

            function selectImage(index) {

                if (
                    index < 0 ||
                    index >= thumbnails.length
                ) {

                    return;

                }


                currentIndex = index;


                const thumbnail =
                    thumbnails[index];


                const source =
                    thumbnail.dataset.image;


                const thumbImage =
                    thumbnail.querySelector(
                        "img"
                    );


                image.src = source;


                image.alt =
                    thumbImage?.alt ?? "";


                thumbnails.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                thumbnail.classList.add(
                    "active"
                );


                resetZoom();

            }


            /* ==========================================
               THUMBNAILS
            ========================================== */

            thumbnails.forEach(
                (thumbnail, index) => {

                    thumbnail.addEventListener(
                        "click",
                        () => {

                            selectImage(index);

                        }
                    );

                }
            );


            /* ==========================================
               ZOOM BUTTON
            ========================================== */

            zoomButton.addEventListener(
                "click",
                toggleZoom
            );


            /* ==========================================
               SCROLL ZOOM
            ========================================== */

            main.addEventListener(
                "wheel",
                event => {

                    if (!zoomActive) {

                        return;

                    }


                    event.preventDefault();


                    setZoom(
                        zoom +
                        (
                            event.deltaY < 0
                                ? ZOOM_STEP
                                : -ZOOM_STEP
                        )
                    );

                },
                {
                    passive: false
                }
            );


            /* ==========================================
               GRAB START
            ========================================== */

            image.addEventListener(
                "mousedown",
                event => {

                    if (
                        !zoomActive ||
                        zoom <= 1
                    ) {

                        return;

                    }


                    event.preventDefault();


                    dragging = true;


                    startX =
                        event.clientX;


                    startY =
                        event.clientY;


                    startTranslateX =
                        translateX;


                    startTranslateY =
                        translateY;


                    image.classList.add(
                        "grabbing"
                    );

                }
            );


            /* ==========================================
               GRAB MOVE
            ========================================== */

            window.addEventListener(
                "mousemove",
                event => {

                    if (!dragging) {

                        return;

                    }


                    translateX =
                        startTranslateX +
                        (
                            event.clientX -
                            startX
                        );


                    translateY =
                        startTranslateY +
                        (
                            event.clientY -
                            startY
                        );


                    limitPosition();

                    updateTransform();

                }
            );


            /* ==========================================
               GRAB END
            ========================================== */

            window.addEventListener(
                "mouseup",
                () => {

                    if (!dragging) {

                        return;

                    }


                    dragging = false;


                    image.classList.remove(
                        "grabbing"
                    );

                }
            );


            /* ==========================================
               DOUBLE CLICK RESET
            ========================================== */

            image.addEventListener(
                "dblclick",
                () => {

                    if (zoomActive) {

                        resetZoom();

                    }

                }
            );


            /* ==========================================
               OPEN MODAL
            ========================================== */

            openButton.addEventListener(
                "click",
                () => {

                    modalImage.src =
                        image.src;


                    modalImage.alt =
                        image.alt;


                    modal.classList.add(
                        "active"
                    );


                    modal.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );


            /* ==========================================
               CLOSE MODAL
            ========================================== */

            function closeModal() {

                modal.classList.remove(
                    "active"
                );


                modal.setAttribute(
                    "aria-hidden",
                    "true"
                );


                document.body.style.overflow =
                    "";

            }


            modalClose.addEventListener(
                "click",
                closeModal
            );


            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        closeModal();

                    }

                }
            );


            /* ==========================================
               FULLSCREEN
            ========================================== */

            fullscreenButton.addEventListener(
                "click",
                async () => {

                    try {

                        if (
                            !document.fullscreenElement
                        ) {

                            await viewer.requestFullscreen();

                        } else {

                            await document.exitFullscreen();

                        }

                    } catch (error) {

                        console.error(
                            "Fullscreen error:",
                            error
                        );

                    }

                }
            );


            /* ==========================================
               FULLSCREEN STATE
            ========================================== */

            document.addEventListener(
                "fullscreenchange",
                () => {

                    fullscreenButton.classList.toggle(
                        "active",
                        document.fullscreenElement === viewer
                    );

                }
            );


            /* ==========================================
               KEYBOARD
            ========================================== */

            viewer.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "ArrowRight" &&
                        thumbnails.length > 0
                    ) {

                        event.preventDefault();


                        selectImage(
                            Math.min(
                                currentIndex + 1,
                                thumbnails.length - 1
                            )
                        );

                    }


                    if (
                        event.key === "ArrowLeft" &&
                        thumbnails.length > 0
                    ) {

                        event.preventDefault();


                        selectImage(
                            Math.max(
                                currentIndex - 1,
                                0
                            )
                        );

                    }


                    if (
                        event.key === "Escape"
                    ) {

                        if (
                            modal.classList.contains(
                                "active"
                            )
                        ) {

                            closeModal();

                            return;

                        }


                        if (
                            document.fullscreenElement ===
                            viewer
                        ) {

                            document.exitFullscreen();

                            return;

                        }


                        if (zoomActive) {

                            toggleZoom();

                        }

                    }

                }
            );


        });

    `);

}

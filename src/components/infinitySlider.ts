import { style, script } from "../../globals";
import type { HTMLElementW } from "../core/interface/intenface.index";
import {
  append,
  doItElement,
  setAttr,
} from "../core/parseHTML/parseHTML.index";
import { generateUniqueToken } from "../crypto/uniqueToken";

export function infinitySlider(array: HTMLElementW[]) {
  const container = doItElement("div");
  const sliderElement = doItElement("span");

  const sliderId = `infiniteSlider_${generateUniqueToken()}`;

  // ============================================================
  // Slider
  // ============================================================

  sliderElement.classes.add("infiniteSlider");

  setAttr(sliderElement, "id", sliderId);
  setAttr(sliderElement, "role", "region");
  setAttr(sliderElement, "aria-label", "Slider");

  let num = 0;

  array.forEach((item) => {
    item.attrs = item.attrs || {};

    item.classes.add("infiniteSlider-item");

    const id =
      `infiniteSlider_item_${generateUniqueToken()}`;

    setAttr(item, "id", id + "_" + num);

    num++;
  });

  append(sliderElement, ...array);

  // ============================================================
  // Controller
  // ============================================================

  const controller = doItElement("div");

  controller.classes.add("infiniteSlider-controller");

  // Previous
  const previousButton = doItElement("button");

  previousButton.classes.add(
    "infiniteSlider-controller-button"
  );

  previousButton.classes.add(
    "infiniteSlider-controller-previous"
  );

  setAttr(previousButton, "type", "button");
  setAttr(previousButton, "aria-label", "Anterior");

  previousButton.textContent = "‹";

  // Next
  const nextButton = doItElement("button");

  nextButton.classes.add(
    "infiniteSlider-controller-button"
  );

  nextButton.classes.add(
    "infiniteSlider-controller-next"
  );

  setAttr(nextButton, "type", "button");
  setAttr(nextButton, "aria-label", "Próximo");

  nextButton.textContent = "›";

  append(
    controller,
    previousButton,
    nextButton
  );

  // ============================================================
  // Container
  // ============================================================

  container.classes.add(
    "infiniteSlider-container"
  );

  append(
    container,
    sliderElement,
    controller
  );

  // ============================================================
  // CSS
  // ============================================================

  const sliderStyle: string = `
    .infiniteSlider-container {
      position: relative;
      width: 100%;
      border-bottom: solid 0.03rem #6663;
    }

    /* ========================================================
       Slider
       ======================================================== */

    .infiniteSlider {
      width: 100%;
      gap: 3rem;
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      scrollbar-width: none;
      cursor: grab;
      user-select: none;;
    }

    .infiniteSlider::-webkit-scrollbar {
      display: none;
    }

    .infiniteSlider:active {
      cursor: grabbing;
    }

    .infiniteSlider.is-dragging {
      cursor: grabbing;

      scroll-behavior: auto;
      scroll-snap-type: none;
    }

    .infiniteSlider-item {
      flex-shrink: 0;

      scroll-snap-align: start;

      user-select: none;
      -webkit-user-drag: none;
    }

    /* ========================================================
       Controller
       ======================================================== */

    .infiniteSlider-controller {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;

      transform: translateY(-.25rem);

      transition:
        opacity .2s ease,
        visibility .2s ease,
        transform .2s ease;
    }

    .infiniteSlider-container:hover
    .infiniteSlider-controller {
      opacity: 1;
      visibility: visible;

      transform: translateY(0);
    }

    /* ========================================================
       Controller buttons
       ======================================================== */

    .infiniteSlider-controller-button {
      width: 3rem;
      height: 2rem;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0;

      border: 0;
      background: transparent;

      color: var(
        --color-secondary,
        #000
      );

      -webkit-text-stroke: .04rem #999;

      cursor: pointer;

      font-size: 2rem;
      line-height: 1;

      transition:
        transform .15s ease,
        opacity .15s ease;
    }

    .infiniteSlider-controller-button:hover {
      transform: scale(1.15);
    }

    .infiniteSlider-controller-button:active {
      transform: scale(.95);
    }

    /* ========================================================
       Touch
       ======================================================== */

    @media (hover: none) {
      .infiniteSlider-controller {
        opacity: 1;
        visibility: visible;

        transform: translateY(0);
      }
    }
  `;

  style.add(sliderStyle);

  // ============================================================
  // JavaScript
  // ============================================================

  script.add(`
    (() => {
      const slider =
        document.getElementById("${sliderId}");

      if (!slider) return;

      const container =
        slider.parentElement;

      if (!container) return;

      const previous =
        container.querySelector(
          ".infiniteSlider-controller-previous"
        );

      const next =
        container.querySelector(
          ".infiniteSlider-controller-next"
        );

      if (!previous || !next) return;

      // ========================================================
      // Move
      // ========================================================

      const move = (direction) => {
        const item =
          slider.querySelector(
            ".infiniteSlider-item"
          );

        if (!item) return;

        const styles =
          getComputedStyle(slider);

        const gap =
          parseFloat(
            styles.columnGap ||
            styles.gap ||
            "0"
          );

        const distance =
          item.getBoundingClientRect().width +
          gap;

        slider.scrollBy({
          left: distance * direction,
          behavior: "smooth"
        });
      };

      // ========================================================
      // Buttons
      // ========================================================

      previous.addEventListener(
        "click",
        () => {
          move(-1);
        }
      );

      next.addEventListener(
        "click",
        () => {
          move(1);
        }
      );

      // ========================================================
      // Grab / Drag
      // ========================================================

      let isDragging = false;
      let startX = 0;
      let startScrollLeft = 0;
      let moved = false;

      const dragStart = (x) => {
        isDragging = true;
        moved = false;

        startX = x;
        startScrollLeft =
          slider.scrollLeft;

        slider.classList.add(
          "is-dragging"
        );
      };

      const dragMove = (x) => {
        if (!isDragging) return;

        const distance =
          x - startX;

        if (Math.abs(distance) > 5) {
          moved = true;
        }

        slider.scrollLeft =
          startScrollLeft -
          distance;
      };

      const dragEnd = () => {
        if (!isDragging) return;

        isDragging = false;

        slider.classList.remove(
          "is-dragging"
        );

        requestAnimationFrame(() => {
          slider.style.scrollSnapType = "";
          slider.style.scrollBehavior = "";
        });
      };

      // ========================================================
      // Mouse
      // ========================================================

      slider.addEventListener(
        "mousedown",
        (event) => {
          if (event.button !== 0) return;

          dragStart(event.pageX);

          event.preventDefault();
        }
      );

      slider.addEventListener(
        "mousemove",
        (event) => {
          dragMove(event.pageX);
        }
      );

      slider.addEventListener(
        "mouseup",
        () => {
          dragEnd();
        }
      );

      slider.addEventListener(
        "mouseleave",
        () => {
          dragEnd();
        }
      );

      // ========================================================
      // Touch
      // ========================================================

      slider.addEventListener(
        "touchstart",
        (event) => {
          if (!event.touches.length) return;

          dragStart(
            event.touches[0].pageX
          );
        },
        {
          passive: true
        }
      );

      slider.addEventListener(
        "touchmove",
        (event) => {
          if (!event.touches.length) return;

          dragMove(
            event.touches[0].pageX
          );
        },
        {
          passive: true
        }
      );

      slider.addEventListener(
        "touchend",
        () => {
          dragEnd();
        }
      );

      // ========================================================
      // Avoid click after drag
      // ========================================================

      slider.addEventListener(
        "click",
        (event) => {
          if (moved) {
            event.preventDefault();
            event.stopPropagation();

            moved = false;
          }
        },
        true
      );
    })();
  `);

  return container;
}

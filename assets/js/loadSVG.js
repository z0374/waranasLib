(() => {
  "use strict";

  const SVG_SHEET_URL = "https://assets.victormacedo.dev.br/svg/svgsheet.svg";

  const SHEET_ID = "waranas-svg-sheet";

  function isSheetLoaded() {
    return document.getElementById(SHEET_ID) !== null;
  }

  function parseSVG(svgText) {
    const parser = new DOMParser();

    const svgDocument = parser.parseFromString(svgText, "image/svg+xml");

    const parserError = svgDocument.querySelector("parsererror");

    if (parserError) {
      throw new Error("SVG Sheet inválido: " + parserError.textContent);
    }

    const svg = svgDocument.documentElement;

    if (!svg || svg.tagName.toLowerCase() !== "svg") {
      throw new Error("O recurso não possui um SVG válido.");
    }

    return svg;
  }

  function injectSheet(svg) {
    if (isSheetLoaded()) {
      return;
    }

    svg.setAttribute("id", SHEET_ID);

    svg.style.display = "none";

    document.body.insertBefore(svg, document.body.firstChild);
  }

  async function loadSVGSheet() {
    if (isSheetLoaded()) {
      return;
    }

    const response = await fetch(SVG_SHEET_URL, {
      method: "GET",
      credentials: "omit",
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Falha ao carregar SVG Sheet: HTTP ${response.status}`);
    }

    const svgText = await response.text();

    if (!svgText.trim()) {
      throw new Error("O SVG Sheet retornou vazio.");
    }

    const svg = parseSVG(svgText);

    injectSheet(svg);
  }

  async function init() {
    try {
      await loadSVGSheet();

      console.debug("[Waranas SVG] Sheet carregado:", SVG_SHEET_URL);
    } catch (error) {
      console.error("[Waranas SVG] Erro:", error);
    }
  }

  window.WaranasSVG = {
    load: loadSVGSheet,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

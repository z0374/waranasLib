import type { Colors, HeadAssets, HTMLElementW } from "./interface.index";
export * from "./private/private.index";
export * from "./config";
//DOM HTML Semantics Elements
export const header: HTMLElementW[] = [];
export const main: HTMLElementW[] = [];
export const footer: HTMLElementW[] = [];
export const body: HTMLElementW[] = [];
export const head: Set<HTMLElementW> = new Set();

export const headAssets: HeadAssets = {};
// Antes: export const style: string[] = [];
export const style = new Set<string>();
export const styleVar: string[] = [];
export const fonts: string[] = [];
export const script = new Set<string>();

export const css_files: string[] = [];
export const script_files: string[] = [];

export const COLORS: Colors = {};
export const iframesheet: Record<string, string> = {};

export const SITE_ENTRY_POINT: string = "";
export const baseURI: string = "";
/*
// Verifica se o request existe de forma segura
const hasRequest = typeof request !== "undefined" && request !== null;

// Declarações globais permitidas pelo ES Modules
export const LOCAL_URL = hasRequest ? new URL(request.url) : null;
export const LOCAL_URI: string = LOCAL_URL ? LOCAL_URL.origin : "";
export const protocol: string = LOCAL_URL
  ? LOCAL_URL.protocol.replace(":", "")
  : "";*/

export function resetGlobals(): void {
  // Elementos da página
  header.length = 0;
  main.length = 0;
  footer.length = 0;
  body.length = 0;
  head.clear();

  // Assets do head
  for (const key in headAssets) {
    delete headAssets[key as keyof HeadAssets];
  }

  // CSS
  style.clear();
  styleVar.length = 0;

  // Recursos
  fonts.length = 0;
  script.clear();

  // Arquivos externos
  css_files.length = 0;
  script_files.length = 0;

  // Cores
  for (const key in COLORS) {
    delete COLORS[key];
  }

  // Iframes
  for (const key in iframesheet) {
    delete iframesheet[key];
  }
}

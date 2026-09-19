// src/core/interface/parseHTML/generalHTMLElement.ts

interface BaseHTMLElementW<T extends string> {
  tag: T;

  attrs: Record<string, string>;

  classes: Set<string>;

  setAttr(key?: string, value?: string): this;
}

export interface NormalElementW<T extends string> extends BaseHTMLElementW<T> {
  endTag: true;

  children: HTMLElementW[];

  textContent: string;
}

export interface VoidElementW<T extends string> extends BaseHTMLElementW<T> {
  endTag: false;
}

export type HTMLElementW<T extends string = string> =
  NormalElementW<T> | VoidElementW<T>;

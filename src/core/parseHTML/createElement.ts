// src/core/parseHTML/createElement.ts

import type {
  HTMLElementW,
  NormalElementW,
  VoidElementW,
} from "../interface/intenface.index";

import { refSetAttr } from "./setAttribute";

export function doItElement<T extends string>(tag: T): NormalElementW<T>;

export function doItElement<T extends string>(
  tag: T,
  endTag: true,
): NormalElementW<T>;

export function doItElement<T extends string>(
  tag: T,
  endTag: false,
): VoidElementW<T>;

export function doItElement<T extends string>(
  tag: T,
  endTag: boolean = true,
): HTMLElementW<T> {
  const element = {
    tag,
    attrs: {},
    classes: new Set<string>(),

    endTag,

    ...(endTag
      ? {
          children: [] as HTMLElementW[],
          textContent: "",
        }
      : {}),

    setAttr: refSetAttr,
  };

  return element as HTMLElementW<T>;
}

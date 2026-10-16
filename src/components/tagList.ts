import { style, styleVar } from "../../globals";
import {
  addClassList,
  append,
  appendChild,
  doItElement,
} from "../core/parseHTML/parseHTML.index";

export interface tagListProps {
  media: string;
  text: string;
  url: string;
}

export function tagList(id: string, array: tagListProps[], order: number) {
  const tagList = doItElement("ul");
  addClassList(tagList, "tagList").setAttr("id", id);
  array.forEach((item, key) => {
    const tagItem = doItElement("li");
    addClassList(tagItem, "tagItem");

    const tagA = doItElement("a");
    tagA.setAttr("href", item.url);
    addClassList(tagA, "tagLink");

    const tagImg = doItElement("img");
    tagImg
      .setAttr("src", item.media)
      .setAttr("class", "tagLink")
      .setAttr("aria-label", item.text)
      .setAttr("data-bg", "url(" + item.media + ")");
    addClassList(tagImg, "tagImg");
    const tagP = doItElement("p");
    tagP
      .setAttr("readonly", "")
      .setAttr("rows", "12")
      .setAttr("aria-label", "Descrição").textContent = item.text;
    addClassList(tagP, "tagP");

    if (order === 0) {
      const tagOrder = doItElement("h1");
      tagOrder.textContent = String(key);
      addClassList(tagOrder, "tagOrder");
      appendChild(tagA, tagOrder);
    }
    append(tagA, tagImg, tagP);
    if (order === 1) {
      const tagOrder = doItElement("h1");
      tagOrder.textContent = String(key);
      addClassList(tagOrder, "tagOrder");
      appendChild(tagA, tagOrder);
    }

    append(tagItem, tagA);
    append(tagList, tagItem);
  });
  const tagStyle: string = `
    .tagList {
        padding: 0 12%;
        overflow-y: auto;
    }
    .tagList .tagItem {
        width: 100%;
        height: 9rem;
        display: inline-block;
        padding: 3%;
        border-top: var(--border-tagList);
    }
    .tagList .tagItem .tagLink {
        width: 90%;
        height: 96%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .tagList .tagItem .tagLink .tagImg {
        height: 72%;
        aspect-ratio: 1 / 1;
    }
    .tagList .tagItem .tagLink .tagP {
      width: 60%;
      font-size: 3rem;
    }

    .tagList .tagItem .tagLink .tagOrder {

    font-size: 3rem;
    }
  `;

  style.add(tagStyle);
  styleVar.push(`--border-tagList:solid 0.06rem;`);

  return tagList;
}

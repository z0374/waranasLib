import type { HTMLElementW } from "../../interface.index";
import { addClassList, append, doItElement, style } from "../../main.index";
import { generateUniqueToken } from "../crypto/uniqueToken";

export type TabTuple = [string, string | HTMLElementW];

export function tabs(tabsArray: TabTuple[]): HTMLElementW {
    const tabsContainer = doItElement("article");
    if (!tabsArray || tabsArray.length === 0) return tabsContainer;
    addClassList(tabsContainer, "waranasTabsContainer");

    const navContainer = doItElement("section");
    addClassList(navContainer, "waranasTabsNav");

    const contentContainer = doItElement("section");
    addClassList(contentContainer, "waranasTabsContent");

    let dynamicStyles = "";

    const id = `tabsComponent${generateUniqueToken()}`;
    tabsArray.forEach((tuple, index) => {
        const [tabTitle, tabContent] = tuple;
        const tabId = `tab-${id}-${index}`;

        const radioInput = doItElement("input");
        radioInput.setAttr("type", "radio");
        radioInput.setAttr("name", `waranas-tab-group-${id}`); // Atenção: o name deve ser igual para todos do mesmo grupo!
        radioInput.setAttr("id", tabId);
        if (index === 0) radioInput.setAttr("checked", "true");
        addClassList(radioInput, "waranasTabRadio");

        const tabLabel = doItElement("label");
        tabLabel.setAttr("for", tabId);
        addClassList(tabLabel, "waranasTabLabel");
        tabLabel.textContent = tabTitle;

        const tabPane = doItElement("div");
        addClassList(tabPane, "waranasTabPane");
        tabPane.setAttr("id", `pane-${tabId}`);

        if (typeof tabContent === "string") {
            tabPane.textContent = tabContent;
        } else if (tabContent && typeof tabContent === "object") {
            append(tabPane, tabContent);
        }

        append(navContainer, tabLabel);
        append(contentContainer, radioInput, tabPane);

        // CSS Dinâmico para vincular a Label correta ao Input em containers separados
        dynamicStyles += `
            .waranasTabsContainer:has(#${tabId}:checked) .waranasTabLabel[for="${tabId}"] {
            opacity: 0.3;
            }
        `;
    });

    append(tabsContainer, navContainer, contentContainer);

    style.add(`
    .waranasTabsContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 15px 0;
    }

    .waranasTabsNav {
        display: flex;
        overflow-x: auto;
        gap: 0.6rem;
        scrollbar-width: none;
    }
    .waranasTabsNav::-webkit-scrollbar {
        display: none;
    }

    .waranasTabsNav .waranasTabLabel {
        padding: 10px 16px;
        background-color: var(--surface-color, #161214);
        color: var(--text-muted, #999);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 3rem;
        border: 1px solid var(--border-color, #2a2225);
        white-space: nowrap;
        transition: all 0.3s ease;
    }

    .waranasTabsNav .waranasTabLabel:hover {
        color: var(--text-light, #f3f3f3);
    }

    .waranasTabsContent {
        position: relative;
        background-color: var(--surface-color, #FFF);
        padding: 20px;
        min-height: 100px;
    }

    /* Esconde TODOS os painéis e inputs nativos por padrão */
    .waranasTabsContent .waranasTabRadio,
    .waranasTabsContent .waranasTabPane {
        display: none;
    }

    /* MÁGICA DO CSS: Exibe o painel correspondente ao radio (Irmão Adjacente) */
    .waranasTabsContent .waranasTabRadio:checked + .waranasTabPane {
        display: block;
    }

    ${dynamicStyles}
    `);

    return tabsContainer;
}

import type { HTMLElementW } from "../../interface.index";
import { addClassList, append, doItElement, style } from "../../main.index";

/**
 * Interface para um item de menu que funciona como Link Simples (<a>).
 */
export interface MenuLinkItem {
  content: string;
  url: string;
  blank: boolean
}

/**
 * Interface para um item de menu que funciona como Label (Toggle/Checkbox Hack).
 */
export interface MenuLabelItem {
    content: string;
    for: string;
}

// União dos tipos para o array do menu
export type MenuItem = MenuLinkItem | MenuLabelItem;

/**
 * Gera a estrutura HTML de um menu de navegação dinâmico encapsulado em uma tag <nav>.
 * Injeta via CSS puro a lógica de visibilidade (checkbox hack) para menus expansíveis.
 *
 * @param array - Array contendo os itens do menu (Links simples ou Labels).
 * @returns A estrutura HTML mapeada em elementos da Waranas.
 */
export function menu(array: MenuItem[]): HTMLElementW {
    if (!array || array.length === 0) return doItElement("nav");

    // Cria a tag encapsuladora <nav>
    const navContainer = doItElement("nav");
    addClassList(navContainer, "navegation");

    let dynamicStyles = "";

    array.forEach(item => {
        // Verifica se é um Link (possui a propriedade 'url')
        if ('url' in item) {
            const aElement = doItElement("a");
            addClassList(aElement, "menuButton");
            aElement.setAttr("href", item.url);
            aElement.textContent = item.content;
          if (item.blank) aElement.setAttr("target","_blank");
            append(navContainer, aElement);
        }
        // Verifica se é um Label/Dropdown (possui a propriedade 'for')
        else if ('for' in item) {
            const labelElement = doItElement("label");
            addClassList(labelElement, "menuLabel");

            // Removemos os espaços do "content" para evitar IDs inválidos no HTML,
            // mantendo a ideia original do PHP id='menuLabel{$item["content"]}'
            const sanitizedIdContent = item.content.replace(/\s+/g, '');
            labelElement.setAttr("id", `menuLabel${sanitizedIdContent}`);
            labelElement.setAttr("for", `menu${item.for}`);
            labelElement.textContent = item.content;

            append(navContainer, labelElement);

            // Injeta a lógica CSS do "checkbox hack" específica para este item
            dynamicStyles += `
                #menu${item.for}:checked ~ #menuContent${item.for} {
                    visibility: visible;
                    display: flex;
                }
            `;
        }
    });

    // Se houve labels gerados, adiciona a folha de estilos dinâmica globalmente[cite: 2]
    if (dynamicStyles) {
        style.add(dynamicStyles);
    }

    return navContainer;
}

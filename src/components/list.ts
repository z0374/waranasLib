import type { HTMLElementW, NormalElementW } from "../../interface.index";
import { addClassList, append, doItElement } from "../core/parseHTML/parseHTML.index";

/**
 * Interface para itens de listas simples (unorder e order).
 * Aceita strings, números ou objetos que possuam um texto descritivo.
 */
export type SimpleListItem = string | number | { text?: string; [key: string]: any };

/**
 * Interface específica para itens de listas descritivas (descript / <dl>).
 */
export interface DescriptListItem {
    term?: string;
    name?: string;
    description?: string;
    value?: string;
    [key: string]: any;
}

/**
 * Constrói uma lista estruturada baseada no tipo de ordenação.
 *
 * @param array - Os itens que comporão a lista (strings/números para unorder/order ou objetos para 'descript').
 * @param order - Define o formato: 'unorder' (ul), 'order' (ol) ou 'descript' (dl).
 * @returns A estrutura HTML mapeada em elementos.
 */
export function list(array: DescriptListItem[], order: 'unorder' | 'order' | 'descript' = 'unorder'): NormalElementW<string> {
    if (!array || array.length === 0) return doItElement("div");

    let listElement: NormalElementW<string>;

    switch (order) {
        case 'order':
            listElement = doItElement("ol");
            addClassList(listElement, "waranasListOrder");
            (array as SimpleListItem[]).forEach(item => {
                const li = doItElement("li");
                // Trata caso o item seja um objeto com propriedade text ou valor primitivo
                const content = typeof item === 'object' && item !== null && 'text' in item ? item.text : item;
                li.textContent = String(content ?? '');
                append(listElement, li);
            });
            break;

        case 'descript':
            listElement = doItElement("dl");
            addClassList(listElement, "waranasListDescript");
            (array as DescriptListItem[]).forEach(item => {
                const term = item?.term ?? item?.name ?? 'Item';
                const description = item?.description ?? item?.value ?? String(item);

                const dt = doItElement("dt");
                const strong = doItElement("strong");
                strong.textContent = term;
                append(dt, strong);

                const dd = doItElement("dd");
                dd.textContent = description;

                append(listElement, dt);
                append(listElement, dd);
            });
            break;

        case 'unorder':
        default:
            listElement = doItElement("ul");
            addClassList(listElement, "waranasListUnorder");
            (array as SimpleListItem[]).forEach(item => {
                const li = doItElement("li");
                const content = typeof item === 'object' && item !== null && 'text' in item ? item.text : item;
                li.textContent = String(content ?? '');
                append(listElement, li);
            });
            break;
    }

    return listElement;
}

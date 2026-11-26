export type RefFunction = (...args: any[]) => any;

/**
 * Helper fantasma para manter referências a funções no bundle
 * sem executá-las.
 */
export function rfrs(...targets: Array<RefFunction | unknown>): void {
  void targets;
}

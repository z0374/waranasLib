export function currencyNorm(valor: number): string {
  // Guarda o sinal caso o número seja negativo e trabalha com o valor absoluto
  const ehNegativo = valor < 0;
  const valorAbsoluto = Math.abs(valor).toString();

  // Separa o número entre o que vem antes do ponto (inteiro) e depois (decimal)
  const [parteInteira, parteDecimal = ""] = valorAbsoluto.split(".");

  // Regra 1: Antes da vírgula, no mínimo 2 dígitos (preenche com '0' à esquerda se faltar)
  const inteiroFormatado = parteInteira.padStart(2, "0");

  // Regra 2: Depois da vírgula, exatamente 2 dígitos
  // Preenche com '0' à direita se faltar e corta no segundo dígito se sobrar
  const decimalFormatado = parteDecimal.padEnd(2, "0").slice(0, 2);

  // Remonta a string final com a vírgula (e o sinal de menos, se aplicável)
  const prefixo = ehNegativo ? "-" : "";
  return `${prefixo}${inteiroFormatado},${decimalFormatado}`;
}

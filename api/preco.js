const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatarPreco(valor) {
  return moeda.format(Number(valor)).replace(/\u00a0/g, ' ');
}

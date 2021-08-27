export function formatPrice(price: number | string) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(typeof price === 'string' ? Number(price) : price);
}

export function noOp() {}

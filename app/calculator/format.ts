export function formatPrice(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₸`;
}

export function formatPriceLine(price: number | null, priceFrom?: number): string {
  if (price !== null) return formatPrice(price);
  if (priceFrom !== undefined) return `от ${formatPrice(priceFrom)}`;
  return "по запросу";
}

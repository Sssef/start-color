const ruNumberFormatter = new Intl.NumberFormat("ru-RU");

export function formatNumberRu(value) {
  return ruNumberFormatter.format(Math.round(value));
}

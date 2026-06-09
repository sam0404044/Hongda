export function formatDate(value: Date | string | null | undefined) {
  return value
    ? new Intl.DateTimeFormat("zh-TW", { dateStyle: "medium" }).format(new Date(value))
    : "-";
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

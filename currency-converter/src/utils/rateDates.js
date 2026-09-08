export function getPreviousDate() {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

export function getDateRange(range) {
  const end = new Date();
  const start = new Date(end);
  if (range === "1D" || range === "1W") {
    start.setUTCDate(start.getUTCDate() - (range === "1D" ? 1 : 7));
  } else {
    const day = start.getUTCDate();
    start.setUTCDate(1);
    start.setUTCMonth(start.getUTCMonth() - ({ "1M": 1, "3M": 3, "1Y": 12, "5Y": 60 }[range] ?? 1));
    const lastDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0)).getUTCDate();
    start.setUTCDate(Math.min(day, lastDay));
  }
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
}

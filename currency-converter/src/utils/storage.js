export function readStoredList(key, validate) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value.filter(validate) : [];
  } catch {
    return [];
  }
}

export function writeStoredList(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function isCurrencyPair(value) {
  return Boolean(value && /^[A-Z]{3}$/.test(value.from) && /^[A-Z]{3}$/.test(value.to));
}

export function isConversion(value) {
  return isCurrencyPair(value) && typeof value.id === "string" &&
    Number.isFinite(value.amount) && value.amount >= 0 &&
    Number.isFinite(value.rate) && value.rate > 0 &&
    value.result !== "" && value.result != null && Number.isFinite(Number(value.result)) && Number(value.result) >= 0 &&
    typeof value.date === "string" && Number.isFinite(Date.parse(value.date));
}

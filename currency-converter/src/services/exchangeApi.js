const API = "https://api.frankfurter.dev/v2";

async function request(path, params, signal) {
  const response = await fetch(`${API}/${path}?${new URLSearchParams(params)}`, { signal });
  if (!response.ok) throw new Error("Could not load exchange rates. Please try again.");
  return response.json();
}

function ratesMap(data, base) {
  if (!Array.isArray(data)) throw new Error("Invalid exchange rate response.");
  return data.reduce((rates, item) => {
    if (typeof item.quote === "string" && Number.isFinite(item.rate) && item.rate > 0) {
      rates[item.quote] = item.rate;
    }
    return rates;
  }, { [base]: 1 });
}

export async function getExchangeRates(base, signal) {
  return ratesMap(await request("rates", { base }, signal), base);
}

export async function getHistoricalRates(base, date, signal) {
  return ratesMap(await request("rates", { base, date }, signal), base);
}

export async function getExchangeRate(base, quote, signal) {
  if (base === quote) return 1;
  const data = await request(`rate/${encodeURIComponent(base)}/${encodeURIComponent(quote)}`, {}, signal);
  if (!Number.isFinite(data.rate) || data.rate <= 0) throw new Error("Rate unavailable for this pair.");
  return data.rate;
}

export async function getHistoricalExchangeRate(base, quote, date, signal) {
  const rates = await getHistoricalRates(base, date, signal);
  if (!Number.isFinite(rates[quote])) throw new Error("Historical rate unavailable for this pair.");
  return rates[quote];
}

export async function getHistoricalRange(base, quote, startDate, endDate, signal) {
  if (base === quote) return [{ date: startDate, rate: 1 }, { date: endDate, rate: 1 }];
  const data = await request("rates", { base, quotes: quote, from: startDate, to: endDate }, signal);
  if (!Array.isArray(data)) throw new Error("Invalid history response.");
  return data
    .filter((item) => /^\d{4}-\d{2}-\d{2}$/.test(item.date) && Number.isFinite(item.rate) && item.rate > 0)
    .map(({ date, rate }) => ({ date, rate }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getCurrencies(signal) {
  const data = await request("currencies", {}, signal);
  if (!Array.isArray(data)) throw new Error("Invalid currency list.");
  const currencies = data
    .filter((item) => /^[A-Z]{3}$/.test(item.iso_code) && typeof item.name === "string")
    .map((item) => ({ code: item.iso_code, name: item.name, symbol: item.symbol, flag: "" }));
  if (!currencies.length) throw new Error("No currencies available. Please try again.");
  return currencies;
}

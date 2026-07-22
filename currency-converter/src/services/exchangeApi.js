export async function getExchangeRates(baseCurrency) {
  const url = `https://api.frankfurter.dev/v2/rates?base=${baseCurrency}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }

  const data = await response.json();

  return data.reduce((acc, rate) => {
    acc[rate.quote] = rate.rate;
    return acc;
  }, {});
}

export async function getHistoricalRates(baseCurrency, date) {
  const url = `https://api.frankfurter.dev/v2/rates?base=${baseCurrency}&date=${date}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch historical exchange rates");
  }

  const data = await response.json();

  return data.reduce((acc, rate) => {
    acc[rate.quote] = rate.rate;
    return acc;
  }, {});
}

export async function getExchangeRate(baseCurrency, quoteCurrency) {
  const url = `https://api.frankfurter.dev/v2/rate/${baseCurrency}/${quoteCurrency}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${baseCurrency}/${quoteCurrency} rate`
    );
  }

  const data = await response.json();

  return data.rate;
}

export async function getHistoricalExchangeRate(
  baseCurrency,
  quoteCurrency,
  date
) {
  const url = `https://api.frankfurter.dev/v2/rate/${baseCurrency}/${quoteCurrency}?date=${date}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch historical ${baseCurrency}/${quoteCurrency} rate`
    );
  }

  const data = await response.json();

  return data.rate;
}
export async function getHistoricalRange(
  baseCurrency,
  quoteCurrency,
  startDate,
  endDate
) {
  const url =
    `https://api.frankfurter.dev/v2/rates` +
    `?base=${baseCurrency}` +
    `&quotes=${quoteCurrency}` +
    `&from=${startDate}` +
    `&to=${endDate}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rate history");
  }

  const data = await response.json();

  return data.map((item) => ({
    date: item.date,
    rate: item.rate,
  }));
}
export async function getCurrencies() {
  const response = await fetch(
    "https://api.frankfurter.dev/v2/currencies"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }

  const data = await response.json();

  return data.map((currency) => ({
    code: currency.iso_code,
    name: currency.name,
    symbol: currency.symbol,
    flag: "",
  }));
}
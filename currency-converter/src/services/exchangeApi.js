export async function getExchangeRates(baseCurrency) {
  const url = `https://api.frankfurter.dev/v2/rates?base=${baseCurrency}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }

  const data = await response.json();

  const ratesObject = data.reduce((acc, rate) => {
  acc[rate.quote] = rate.rate;
  return acc;
}, {});
return ratesObject;


}
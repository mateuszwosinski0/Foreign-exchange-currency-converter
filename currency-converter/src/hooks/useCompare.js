import { useEffect, useMemo, useState } from "react";

const MAJOR_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "PLN",
  "CHF",
  "CAD",
  "AUD",
];

export default function useCompare({
  fromCurrency, 
  toCurrency,
}) {


  const [exchangeRate, setExchangeRate] = useState(null);
  const [comparisonRates, setComparisonRates] = useState({});
  const [previousRates, setPreviousRates] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const comparisonCurrencies = useMemo(() => {
    return MAJOR_CURRENCIES
      .filter((currency) => currency !== fromCurrency)
      .slice(0, 6);
  }, [fromCurrency]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchExchangeRates() {
      try {
        setIsLoading(true);
        setError("");

        const quotes = Array.from(
          new Set([
           toCurrency,
            ...comparisonCurrencies,
          ])
        ).join(",");

        const latestResponse = await fetch(
          `https://api.frankfurter.dev/v2/rates?base=${fromCurrency}&quotes=${quotes}`,
          {
            signal: controller.signal,
          }
        );

        if (!latestResponse.ok) {
          throw new Error("Failed to fetch latest exchange rates");
        }

        const latestData = await latestResponse.json();

        const latestRates = convertRatesArrayToObject(latestData);

        setExchangeRate(latestRates[toCurrency] ?? null);
        setComparisonRates(latestRates);

        const previousDate = getPreviousDate();

        const previousResponse = await fetch(
          `https://api.frankfurter.dev/v2/rates?date=${previousDate}&base=${fromCurrency}&quotes=${comparisonCurrencies.join(",")}`,
          {
            signal: controller.signal,
          }
        );

        if (!previousResponse.ok) {
          throw new Error("Failed to fetch previous exchange rates");
        }

        const previousData = await previousResponse.json();

        setPreviousRates(
          convertRatesArrayToObject(previousData)
        );
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error(error);

        setError("Unable to fetch exchange rates.");
        setExchangeRate(null);
        setComparisonRates({});
        setPreviousRates({});
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchExchangeRates();

    return () => controller.abort();
  }, [
    fromCurrency,
    toCurrency,
    comparisonCurrencies,
  ]);


  function getPercentageChange(currency) {
    const currentRate = comparisonRates[currency];
    const previousRate = previousRates[currency];

    if (
      currentRate === undefined ||
      previousRate === undefined ||
      previousRate === 0
    ) {
      return null;
    }

    return (
      ((currentRate - previousRate) / previousRate) *
      100
    );
  }

  return {
    exchangeRate,
    comparisonRates,
    comparisonCurrencies,
    isLoading,
    error,
    getPercentageChange,
}
}
function convertRatesArrayToObject(rates) {
  if (!Array.isArray(rates)) {
    return {};
  }

  return rates.reduce((result, item) => {
    result[item.quote] = item.rate;
    return result;
  }, {});
}

function getPreviousDate() {
  const date = new Date();

  date.setDate(date.getDate() - 1);

  return date.toISOString().split("T")[0];
}

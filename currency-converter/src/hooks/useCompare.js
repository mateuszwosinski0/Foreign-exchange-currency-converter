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

export default function useCompare() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");

  const [exchangeRate, setExchangeRate] = useState(null);
  const [comparisonRates, setComparisonRates] = useState({});
  const [previousRates, setPreviousRates] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const comparisonCurrencies = useMemo(() => {
    return MAJOR_CURRENCIES
      .filter((currency) => currency !== baseCurrency)
      .slice(0, 6);
  }, [baseCurrency]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchExchangeRates() {
      try {
        setIsLoading(true);
        setError("");

        const quotes = Array.from(
          new Set([
            targetCurrency,
            ...comparisonCurrencies,
          ])
        ).join(",");

        const latestResponse = await fetch(
          `https://api.frankfurter.dev/v2/rates?base=${baseCurrency}&quotes=${quotes}`,
          {
            signal: controller.signal,
          }
        );

        if (!latestResponse.ok) {
          throw new Error("Failed to fetch latest exchange rates");
        }

        const latestData = await latestResponse.json();

        const latestRates = convertRatesArrayToObject(latestData);

        setExchangeRate(latestRates[targetCurrency] ?? null);
        setComparisonRates(latestRates);

        const previousDate = getPreviousDate();

        const previousResponse = await fetch(
          `https://api.frankfurter.dev/v2/rates?date=${previousDate}&base=${baseCurrency}&quotes=${comparisonCurrencies.join(",")}`,
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
    baseCurrency,
    targetCurrency,
    comparisonCurrencies,
  ]);

  function handleBaseCurrencyChange(newCurrency) {
    if (newCurrency === targetCurrency) {
      setTargetCurrency(baseCurrency);
    }

    setBaseCurrency(newCurrency);
  }

  function handleTargetCurrencyChange(newCurrency) {
    if (newCurrency === baseCurrency) {
      setBaseCurrency(targetCurrency);
    }

    setTargetCurrency(newCurrency);
  }

  function handleSwap() {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  }

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
    baseCurrency,
    targetCurrency,
    exchangeRate,
    comparisonRates,
    comparisonCurrencies,
    isLoading,
    error,
    getPercentageChange,
    handleBaseCurrencyChange,
    handleTargetCurrencyChange,
    handleSwap,
  };
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


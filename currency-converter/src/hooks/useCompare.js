import useAsyncResource from "@/hooks/useAsyncResource";
import { getExchangeRates, getHistoricalRates } from "@/services/exchangeApi";
import { getPreviousDate } from "@/utils/rateDates";

const MAJOR_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "PLN", "CHF", "CAD", "AUD"];

export default function useCompare({ fromCurrency, toCurrency }) {
  const { data, isLoading, error } = useAsyncResource(fromCurrency, async (signal) => {
    const [current, previous] = await Promise.all([
      getExchangeRates(fromCurrency, signal),
      getHistoricalRates(fromCurrency, getPreviousDate(), signal),
    ]);
    return { current, previous };
  });
  const comparisonRates = data?.current ?? {};
  const comparisonCurrencies = MAJOR_CURRENCIES.filter((currency) => currency !== fromCurrency).slice(0, 6);
  function getPercentageChange(currency) {
    const rate = comparisonRates[currency];
    const previous = data?.previous[currency];
    return Number.isFinite(rate) && Number.isFinite(previous) && previous > 0
      ? ((rate - previous) / previous) * 100 : null;
  }
  return {
    exchangeRate: comparisonRates[toCurrency] ?? null,
    comparisonRates, comparisonCurrencies, isLoading, error, getPercentageChange,
  };
}

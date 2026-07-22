import { useEffect, useState } from "react";
import {
  getExchangeRates,
  getHistoricalRates,
} from "@/services/exchangeApi";

export default function useExchangeRates(baseCurrency) {
  const [exchangeRates, setExchangeRates] = useState({});
  const [previousRates, setPreviousRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
  async function loadExchangeRates() {
    setIsLoading(true);
    setError(null);

    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayString = yesterday.toISOString().split("T")[0];

      const [rates, historicalRates] = await Promise.all([
        getExchangeRates(baseCurrency),
        getHistoricalRates(baseCurrency, yesterdayString),
      ]);

      setExchangeRates(rates);
      setPreviousRates(historicalRates);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  loadExchangeRates();
}, [baseCurrency]);

  return {
    exchangeRates,
    previousRates,
    isLoading,
    error,
  };
}
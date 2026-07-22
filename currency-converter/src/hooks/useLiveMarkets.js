import { useEffect, useState } from "react";

import { getExchangeRate } from "@/services/exchangeApi";
import { getHistoricalExchangeRate } from "@/services/exchangeApi";
const marketPairs = [
  ["USD", "JPY"],
  ["GBP", "USD"],
  ["USD", "CHF"],
  ["EUR", "GBP"],
  ["AUD", "USD"],
  ["USD", "CAD"],
];

export default function useLiveMarkets() {
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isFirstLoad = true;

    async function loadMarkets() {
      if (isFirstLoad) {
        setIsLoading(true);
      }

      setError(null);

      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const yesterdayString = yesterday
          .toISOString()
          .split("T")[0];

        const marketData = await Promise.all(
          marketPairs.map(async ([base, quote]) => {
            const [currentRate, previousRate] = await Promise.all([
              getExchangeRate(base, quote),
              getHistoricalExchangeRate(
                base,
                quote,
                yesterdayString
              ),
            ]);

            const change =
              ((currentRate - previousRate) / previousRate) * 100;

            return {
              base,
              quote,
              rate: currentRate,
              change,
            };
          })
        );

        setMarkets(marketData);
      } catch (error) {
        setError(error.message);
      } finally {
        if (isFirstLoad) {
          setIsLoading(false);
          isFirstLoad = false;
        }
      }
    }

    loadMarkets();

    const intervalId = setInterval(loadMarkets, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    markets,
    isLoading,
    error,
  };
}
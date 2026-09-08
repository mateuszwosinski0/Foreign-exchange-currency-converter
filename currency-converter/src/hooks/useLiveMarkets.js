import useAsyncResource from "@/hooks/useAsyncResource";
import { getExchangeRate, getHistoricalExchangeRate } from "@/services/exchangeApi";
import { getPreviousDate } from "@/utils/rateDates";

const marketPairs = [["USD", "JPY"], ["GBP", "USD"], ["USD", "CHF"], ["EUR", "GBP"], ["AUD", "USD"], ["USD", "CAD"]];

export default function useLiveMarkets() {
  const { data, ...status } = useAsyncResource("markets", (signal) =>
    Promise.all(marketPairs.map(async ([base, quote]) => {
      const [rate, previous] = await Promise.all([
        getExchangeRate(base, quote, signal),
        getHistoricalExchangeRate(base, quote, getPreviousDate(), signal),
      ]);
      return { base, quote, rate, change: ((rate - previous) / previous) * 100 };
    })), 60000
  );
  return { markets: data ?? [], ...status };
}

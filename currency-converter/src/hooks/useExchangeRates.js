import useAsyncResource from "@/hooks/useAsyncResource";
import { getExchangeRates } from "@/services/exchangeApi";

export default function useExchangeRates(baseCurrency) {
  const { data, ...status } = useAsyncResource(baseCurrency, (signal) => getExchangeRates(baseCurrency, signal));
  return { exchangeRates: data ?? {}, ...status };
}

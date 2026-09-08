import useAsyncResource from "@/hooks/useAsyncResource";
import { getExchangeRate } from "@/services/exchangeApi";

export default function useFavoriteRates(favorites) {
  const { data, isLoading, error } = useAsyncResource(JSON.stringify(favorites), (signal) =>
    Promise.all(favorites.map(async ({ from, to }) => ({
      from, to, rate: await getExchangeRate(from, to, signal), updatedAt: Date.now(),
    })))
  );
  return { rates: data ?? [], loading: isLoading, error };
}

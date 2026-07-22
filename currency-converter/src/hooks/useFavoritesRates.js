import { useEffect, useState } from "react";

import {
  getExchangeRate,

 
} from "@/services/exchangeApi";
export default function useFavoriteRates(favorites) {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

   useEffect(() => {
  async function fetchFavoriteRates() {
    try {
      setLoading(true);
      setError(null);
        if (favorites.length === 0) {
    setRates([]);
    return;
  }

      
  const results = await Promise.all(
  favorites.map(async ({ from, to }) => {
  const rate = await getExchangeRate(from, to);

return {
  from,
  to,
  rate,
  updatedAt: Date.now(),
};
  })
);

      setRates(results);
   } catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
}
  }

  fetchFavoriteRates();
}, [favorites]);

  return {
    rates,
    loading,
    error,
  };

 }

 
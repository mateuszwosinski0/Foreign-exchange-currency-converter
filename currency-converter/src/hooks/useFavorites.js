import { readStoredList, writeStoredList, isCurrencyPair } from "@/utils/storage";
import { useEffect, useState } from "react";

const STORAGE_KEY = "favorite-currency-pairs";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() =>
    readStoredList(STORAGE_KEY, isCurrencyPair)
  );

  useEffect(() => {
    writeStoredList(STORAGE_KEY, favorites);
  }, [favorites]);


function isFavorite(from, to) {
  return favorites.some(
    (pair) =>
      (pair.from === from && pair.to === to) ||
      (pair.from === to && pair.to === from)
  );
}

   function toggleFavorite(from, to) {
  if (isFavorite(from, to)) {
    setFavorites((previous) =>
      previous.filter(
        (pair) =>
          !(
            (pair.from === from && pair.to === to) ||
            (pair.from === to && pair.to === from)
          )
      )
    );

    return;
  }

  setFavorites((previous) => [
    ...previous,
    {
      from,
      to,
    },
  ]);
}

    return {
        favorites, 
        isFavorite,
        toggleFavorite,
    };
}
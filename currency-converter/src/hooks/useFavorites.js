import { useEffect, useState } from "react";

const STORAGE_KEY = "favorite-currency-pairs";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem(STORAGE_KEY);

  if (!savedFavorites) {
    return [];
  }

  return JSON.parse(savedFavorites);
});


    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(favorites)
        );
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





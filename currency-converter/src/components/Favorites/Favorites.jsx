import { useState, useMemo } from "react";
import useFavoriteRates from "@/hooks/useFavoritesRates";
import FavoriteCard from "@/components/Favorites/FavoriteCard";
import { useToast } from "@/hooks/useToast";
export default function Favorites({
  favorites,
  toggleFavorite,
  onSelectPair,
}) {
const {showToast} = useToast();
function handleRemoveFavorite(from, to) {
  toggleFavorite(from, to);

  showToast(
    `${from}/${to} removed from favorites`,
    "info"
  );
}
  const { rates, loading, error } =
    useFavoriteRates(favorites);

  const [search, setSearch] = useState("");

const filteredRates = useMemo(() => {
  const query = search.trim().toLowerCase();  

  if (!query) {
    return rates;
  }

  return rates.filter((rates) => {
    const from = rates.from.toLowerCase();
    const to = rates.to.toLowerCase();

    return (
      from.includes(query) ||
      to.includes(query)
    );
  });
}, [rates, search]);


  if (loading) {
    return <p>Loading favorite rates...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

 if (favorites.length === 0) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-8 text-center">
      <h3 className="text-lg font-semibold">
        No favorite pairs yet
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Add a currency pair from the converter to see it here.
      </p>
    </div>
  );
}

 return (
  <section>
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          Favorite currency pairs
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {favorites.length} saved{" "}
          {favorites.length === 1 ? "pair" : "pairs"}
        </p>
         <input    
              type="text"
            placeholder="Search Pairs..."
                        value={search}
                         onChange={(e) => setSearch(e.target.value)}
               className="w-full rounded-lg border border-border bg-card  px-3 py-2 text-sm  outline-none focus:border-accent"
            />
      </div>
    </div>

    <div className="flex flex-wrap gap-4">
      {filteredRates.map((item) => (
        <FavoriteCard
          key={`${item.from}-${item.to}`}
          item={item}
          toggleFavorite={handleRemoveFavorite}
          onSelectPair={onSelectPair}
        />
      ))}
    </div>
  </section>
);
}
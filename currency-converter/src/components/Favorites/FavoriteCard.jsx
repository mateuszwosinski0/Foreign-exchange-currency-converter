import getFlagUrl from "@/utils/getFlagUrl";
import iconDelete from "@/assets/images/icon-delete-filled.svg";

export default function FavoriteCard({
  item,
  toggleFavorite,
  onSelectPair,
}) {
  return (
 <div  onClick={() => onSelectPair(item.from, item.to)} className="w-full max-w-[550px] rounded-2xl border border-white/10 bg-card p-5 transition-all duration-200 hover:border-accent hover:-translate-y-0.5 hover:cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <img
              src={getFlagUrl(item.from)}
              alt={item.from}
              className="h-10 w-10 rounded-full border-2 border-card object-cover"
            />

            <img
              src={getFlagUrl(item.to)}
              alt={item.to}
              className="h-10 w-10 rounded-full border-2 border-card object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold">
              {item.from} → {item.to}
            </h3>

            <p className="text-sm text-gray-400">
              Currency pair
            </p>
          </div>
        </div>

        <button
    onClick={(event) => {
    event.stopPropagation();
    toggleFavorite(item.from, item.to);
  }}
         
        >
          <img src={iconDelete} alt="icon delete" className="transition hover:opacity-70 hover:cursor-pointer"/>
        </button>
      </div>

      <div className="mt-6">    
        <p className="text-sm text-gray-400">
          Current rate
        </p>

        <p className="mt-1 text-xl font-semibold">
          1 {item.from} ={" "}
          {item.rate ? item.rate.toFixed(4) : "-"}{" "}
          {item.to}
        </p>
      </div>

      <p className="mt-4 text-xs text-gray-400">
       Updated •{" "}
        {new Date(item.updatedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
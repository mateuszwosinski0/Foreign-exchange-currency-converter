import iconDelete from "@/assets/images/icon-delete-filled.svg";

export default function LogItem({
  conversion,
  removeConversion,
}) {
  const {
    id,
    amount,
    from,
    to,
    rate,
    result,
    date,
  } = conversion;

  const formattedDate = new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
  <div  className="w-full max-w-[350px] rounded-xl border border-white/10 bg-card px-3 py-3 transition-colors hover:border-white/20">
       <div className="flex items-start justify-between">
        
         <div className="flex items-center gap-3">
           
 
           <div>
             <h3 className="font-semibold">
              {amount} {from} → {result} {to}
             </h3>
 
             <p className="text-sm text-gray-400">
               1 {from} = {rate} {to}
             </p>
           </div>
         </div>
          <button
        type="button"
        onClick={() => removeConversion(id)}
        aria-label={`Delete conversion from ${from} to ${to}`}
        className="shrink-0 rounded-lg p-2 opacity-60 transition hover:bg-white/5 hover:opacity-100"
      >
        <img
          src={iconDelete}
          alt=""
          className="h-4 w-4"
        />
      </button>
 
      
       </div>
 
       <div className="mt-3">    
         <p className="text-sm text-gray-400">
            {formattedDate}
         </p>
 
        
     </div>
     </div>
  );
}

    
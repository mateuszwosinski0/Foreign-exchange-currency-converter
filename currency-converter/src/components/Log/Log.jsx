import { useMemo, useState } from "react";
import LogItem from "@/components/Log/LogItem";
import { exportCsv } from "../../utils/exportCsv";

export default function Log({
  logs,
  removeConversion,
  clearLog,
}) {

  const [search, setSearch] = useState("");

const filteredLogs = useMemo(() => {
  const query = search.trim().toLowerCase();

  if (!query) {
    return logs;
  }

  return logs.filter((conversion) => {
    const from = conversion.from.toLowerCase();
    const to = conversion.to.toLowerCase();

    return (
      from.includes(query) ||
      to.includes(query)
    );
  });
}, [logs, search]);
  return (
    <section className="rounded-2xl  p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Conversion log
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Your latest currency conversions
          </p>
         
            <input    
              type="text"
            placeholder="Search Log..."
                        value={search}
                         onChange={(e) => setSearch(e.target.value)}
               className="w-full rounded-lg border border-border bg-card  px-3 py-2 text-sm  outline-none focus:border-accent"
            />
         
        </div>
         <div className="flex items-center gap-3">
  <button
  onClick={() => exportCsv(logs)}
    type="button"
    className="rounded-lg border border-accent/60  px-3   py-2  text-xs  font-semibold  uppercase  tracking-wide  text-accent   transition   hover:border-accent  hover:bg-accent/10">
    Export CSV
  </button>

  {logs.length > 0 && (
    <button
      type="button"
      onClick={clearLog}
      className=" rounded-lg border border-red-500/40  px-3 py-2  text-xs  font-semibold  uppercase tracking-wide    text-red-400   transition  hover:border-red-500 hover:bg-red-500/10 hover:text-red-300">
        Clear all
    </button>
  )}
</div>
       
      </div>

      {logs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-400">
            No conversions saved yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredLogs.map((conversion) => (
            <LogItem
              key={conversion.id}
              conversion={conversion}
              removeConversion={removeConversion}
            />
          ))}
        </div>
      )}
    </section>
  );
}
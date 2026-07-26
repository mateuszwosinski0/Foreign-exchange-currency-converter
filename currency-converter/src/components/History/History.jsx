import { useEffect, useState } from "react";

import { getHistoricalRange } from "@/services/exchangeApi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function History({
  fromCurrency,
  toCurrency,
}) {
  const [selectedRange, setSelectedRange] = useState("1M");
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const { startDate, endDate } = getDateRange(selectedRange);

        const data = await getHistoricalRange(
          fromCurrency,
          toCurrency,
          startDate,
          endDate
        );

        setHistoryData(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadHistory();
  }, [selectedRange, fromCurrency, toCurrency]);
const ranges = ["1D", "1W", "1M", "3M", "1Y", "5Y"];
    function getDateRange(range) {
  const endDate = new Date();
  const startDate = new Date();

  switch (range) {
    case "1D":
      startDate.setDate(startDate.getDate() - 1);
      break;

    case "1W":
      startDate.setDate(startDate.getDate() - 7);
      break;

    case "1M":
      startDate.setMonth(startDate.getMonth() - 1);
      break;

    case "3M":
      startDate.setMonth(startDate.getMonth() - 3);
      break;

    case "1Y":
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;

    case "5Y":
      startDate.setFullYear(startDate.getFullYear() - 5);
      break;

    default:
      startDate.setMonth(startDate.getMonth() - 1);
  }

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
}



  return (
  <section className="rounded-xl border border-border bg-container p-6">
    <div className="mb-5 flex md:flex-row md:items-end md:justify-between gap-4 flex-col items-start">
  <div>
    

    <h2 className="text-xl md:text-2xl font-bold">
      {fromCurrency} / {toCurrency}
    </h2>
  </div>

  <div className="flex gap-2 rounded-lg bg-white/5 p-1 w-full overflow-x-auto md:w-auto">
    {ranges.map((range) => (
      <button
        key={range}
        onClick={() => setSelectedRange(range)}
        className={
          selectedRange === range
            ? "rounded-md bg-lime-300 px-3 py-1.5 text-sm font-medium text-black"
            : "rounded-md px-3 py-1.5 text-sm text-gray-400 transition hover:text-white hover:cursor-pointer"
        }
      >
        {range}
      </button>
    ))}
  </div>
</div>
<div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
  <div className="rounded-xl border border-border bg-white/[0.03] p-4">
    <p className="text-xs uppercase tracking-wider text-gray-500">
      Open
    </p>
    <p className="mt-2 text-xl font-semibold">
      {historyData[0]?.rate?.toFixed(4) ?? "—"}
    </p>
  </div>

  <div className="rounded-xl border border-border bg-white/[0.03] p-4">
    <p className="text-xs uppercase tracking-wider text-gray-500">
      Last
    </p>
    <p className="mt-2 text-xl font-semibold">
      {historyData.at(-1)?.rate?.toFixed(4) ?? "—"}
    </p>
  </div>

  <div className="rounded-xl border border-border bg-white/[0.03] p-4">
    <p className="text-xs uppercase tracking-wider text-gray-500">
      Change
    </p>
    <p className="mt-2 text-xl font-semibold text-lime-300">
      {historyData.length >= 2
        ? (
            historyData.at(-1).rate -
            historyData[0].rate
          ).toFixed(4)
        : "—"}
    </p>
  </div>

  <div className="rounded-xl border border-border bg-white/[0.03] p-4">
    <p className="text-xs uppercase tracking-wider text-gray-500">
      % Change
    </p>
    <p className="mt-2 text-xl font-semibold text-lime-300">
      {historyData.length >= 2
        ? `${(
            ((historyData.at(-1).rate - historyData[0].rate) /
              historyData[0].rate) *
            100
          ).toFixed(2)}%`
        : "—"}
    </p>
  </div>
</div>

   <div className="h-[340px] w-full rounded-xl border border-border bg-black/10 p-3">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={historyData}
      margin={{
        top: 10,
        right: 20,
        left: 0,
        bottom: 0,
      }}
      style={{ outline: "none" }}
    >
      <defs>
        <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="#cfff45"
            stopOpacity={0.45}
          />
          <stop
            offset="100%"
            stopColor="#cfff45"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>

      <CartesianGrid
        strokeDasharray="3 3"
        vertical={false}
        stroke="#2f3038"
      />

      <XAxis
        dataKey="date"
        tickFormatter={(date) =>
          new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          })
        }
        interval="preserveStartEnd"
        minTickGap={50}
        tickLine={false}
        axisLine={false}
      />

      <YAxis
        domain={["auto", "auto"]}
        tickLine={false}
        axisLine={false}
        width={55}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: "#18181b",
          border: "1px solid #2f3038",
          borderRadius: "10px",
          color: "#ffffff",
        }}
        labelStyle={{
          color: "#9ca3af",
        }}
        itemStyle={{
          color: "#cfff45",
        }}
        formatter={(value) => [
          Number(value).toFixed(4),
          "Rate",
        ]}
      />

      <Area
        type="monotone"
        dataKey="rate"
        stroke="#cfff45"
        strokeWidth={2}
        fill="url(#rateGradient)"
        dot={false}
        activeDot={{
          r: 6,
          fill: "#cfff45",
          stroke: "#111111",
          strokeWidth: 2,
        }}
      />
    </AreaChart>
  </ResponsiveContainer>
</div>
  </section>
);
}
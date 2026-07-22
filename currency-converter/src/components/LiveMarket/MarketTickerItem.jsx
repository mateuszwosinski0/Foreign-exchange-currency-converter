export default function MarketTickerItem({ market }) {
  const isPositive = market.change >= 0;

  return (
    <div className="flex shrink-0 items-center gap-3 border-r border-border px-5 py-3">
      <span className="text-text-secondary">
        {market.base}/{market.quote}
      </span>

      <span className="font-semibold text-text">
        {market.rate.toFixed(4)}
      </span>

      <span className={isPositive ? "text-green-500" : "text-red-500"}>
        {isPositive ? "▲" : "▼"} {Math.abs(market.change).toFixed(2)}%
      </span>
    </div>
  );
}
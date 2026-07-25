import MarketTickerItem from "@/components/LiveMarket/MarketTickerItem";

export default function LiveMarkets({
  markets,
  isLoading,
  error,
}) {
  if (isLoading) {
    return <div>Loading markets...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const duplicatedMarkets = [...markets, ...markets];

  return (
<section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-border bg-surface">
  <div className="flex w-full items-stretch">

   
    <div className="z-10 flex shrink-0 items-center gap-2 bg-accent px-4 py-3 text-xs font-semibold tracking-wide text-black sm:px-5 sm:text-sm">
      <span>•</span>
      <span>LIVE MARKETS</span>
    </div>

    
  <div className="min-w-0 flex-1 overflow-hidden">
    <div className="flex w-max items-stretch animate-market-ticker">
  {duplicatedMarkets.map((market, index) => (
    <MarketTickerItem
      key={`${market.base}-${market.quote}-${index}`}
      market={market}
    />
  ))}
</div>
    </div>

  </div>
</section>
  );
}
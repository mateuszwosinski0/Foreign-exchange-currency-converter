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
  <section className="overflow-hidden border-y border-border bg-container">
  <div className="flex items-stretch">

   
    <div className="flex shrink-0 items-center gap-2 bg-accent px-5 py-3 font-bold text-black">
      <span>•</span>
      <span>LIVE MARKETS</span>
    </div>

    
    <div className="overflow-hidden flex-1">
     <div className="flex min-w-max items-stretch animate-market-ticker">
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
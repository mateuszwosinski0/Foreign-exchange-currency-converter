export default function LiveMarkets({
  baseCurrency,
  exchangeRates,
  isLoading,
  error,
}) {
  const marketCurrencies = ["EUR", "PLN", "GBP"];

  if (isLoading) {
    return <p>Loading markets...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Live Markets</h2>

      <div>
        {marketCurrencies.map((currencyCode) => (
          <div key={currencyCode}>
            <span>
              {baseCurrency}/{currencyCode}
            </span>

            <span>
              {exchangeRates[currencyCode]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

import useCompare from "@/hooks/useCompare";
import getCurrencyIcon from "@/utils/getCurrencyIcon";
export default function Compare({
  currencies,
  currenciesLoading,
  amount,
  fromCurrency,
  toCurrency,
}) {
const {
  
  exchangeRate,
  comparisonRates,
  comparisonCurrencies,
  isLoading,
  error,
  getPercentageChange,

} = useCompare({
  fromCurrency,
  toCurrency,
});


  if (currenciesLoading) {
    return (
      <section className="mx-auto max-w-[1050px] rounded-2xl bg-container p-6">
        <p className="text-center text-text-secondary">
          Loading currencies...
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1050px] rounded-2xl bg-container p-6">
      <div>
        <p className="text-sm uppercase tracking-widest text-text-secondary">
          Compare
        </p>

        <h2 className="mt-2 text-2xl font-bold text-text">
          Compare currencies
        </h2>

        <p className="mt-2 text-text-secondary">
          Check the current exchange rate between two currencies.
        </p>
      </div>

      

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-center">
        {isLoading && (
          <p className="text-text-secondary">
            Loading exchange rate...
          </p>
        )}

        {!isLoading && error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        {!isLoading && !error && exchangeRate !== null && (
          <>
            <p className="text-sm uppercase tracking-widest text-text-secondary">
              Current rate
            </p>

            <p className="mt-3 text-3xl font-bold text-text">
              {amount} {fromCurrency}
              <span className="mx-3 text-text-secondary">=</span>
              <span className="text-accent">
               {(Number(amount) * exchangeRate).toFixed(2)} {toCurrency}
              </span>
            </p>

            <p className="mt-4 text-text-secondary">
              1 {fromCurrency} ={" "}
              {(1 / exchangeRate).toFixed(4)} {toCurrency}
            </p>
          </>
        )}
      </div>
      <div className="mt-6">
  <div className="mb-4 flex items-end justify-between gap-4">
    <div>
      <p className="text-sm uppercase tracking-widest text-text-secondary">
        Market comparison
      </p>

      <h3 className="mt-2 text-xl font-bold text-text">
        {fromCurrency} against major currencies
      </h3>
    </div>

    <p className="text-sm text-text-secondary">
      Rates for 1 {fromCurrency}
    </p>
  </div>

  {isLoading && (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-center text-text-secondary">
        Loading comparison rates...
      </p>
    </div>
  )}

  {!isLoading && error && (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-center text-red-500">
        {error}
      </p>
    </div>
  )}

  {!isLoading && !error && (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
  {comparisonCurrencies.map((currency) => {
  const rate = comparisonRates[currency];
  const percentageChange = getPercentageChange(currency);
  const icon = getCurrencyIcon(currency);

  const isPositive =
    percentageChange !== null && percentageChange >= 0;

  return (
    <div
      key={currency}
      className="
        rounded-2xl border border-border bg-card p-5
        transition-all duration-200
        hover:-translate-y-1 hover:border-accent
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-text-secondary">
            {fromCurrency} / {currency}
          </p>

          <p className="mt-3 text-2xl font-bold text-text">
            {rate !== undefined ? rate.toFixed(4) : "—"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {icon.type === "flag" && (
            <img
              src={icon.value}
              alt={`${currency} flag`}
              className="h-5 w-7 rounded-sm object-cover"
            />
          )}

          {icon.type === "emoji" && (
            <span
              role="img"
              aria-label={`${currency} icon`}
              className="text-xl leading-none"
            >
              {icon.value}
            </span>
          )}

          {icon.type === "text" && (
            <div
              className="
                flex h-5 w-7 items-center justify-center
                rounded-sm bg-container
                text-[9px] font-semibold text-text-secondary
              "
            >
              {icon.value}
            </div>
          )}

          <span className="text-lg font-bold text-accent">
            {currency}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-text-secondary">
          1 {fromCurrency} ={" "}
          {rate !== undefined ? rate.toFixed(4) : "—"}{" "}
          {currency}
        </p>

        {percentageChange !== null && (
          <span
            className={
              isPositive
                ? "text-sm font-semibold text-green-500"
                : "text-sm font-semibold text-red-500"
            }
          >
            {isPositive ? "▲" : "▼"}{" "}
            {Math.abs(percentageChange).toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
})}
</div>
  )}
</div>
    </section>
  );
}
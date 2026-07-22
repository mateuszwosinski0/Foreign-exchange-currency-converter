import exchangeIcon from "@/assets/images/icon-exchange.svg";
import starIcon from "@/assets/images/icon-star.svg"; 
import CurrencyDropdown from "@/components/Dropdown/CurrencyDropdown";
import useConverter from "@/hooks/useConverter";
import useFavorites from "@/hooks/useFavorites";

export default function Converter({
  currencies,
  currenciesLoading,
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  exchangeRates,
  isLoading,
  error,
  isFavorite,
  toggleFavorite,
  addConversion,
  removeConversion,
  clearLog,
  logs,
  
}) {
  const {
    exchangeRate,
    formattedResult,
    handleAmountChange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    handleSwap,
  } = useConverter({
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    exchangeRates,
  });


const favorite = isFavorite(
    fromCurrency,
    toCurrency
);



function handleLogConversion() {
  addConversion({
    id: crypto.randomUUID(),
    amount: Number(amount),
    from: fromCurrency,
    to: toCurrency,
    rate: exchangeRate,
    result: formattedResult,
    date: new Date().toISOString(),
});
}

  if (currenciesLoading) {
    return (
      <section className="mx-auto max-w-[1050px] rounded-2xl bg-container p-4">
        <p className="text-center text-text-secondary">
          Loading currencies...
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1050px] rounded-2xl bg-container p-4">
      <div className="flex items-center justify-center gap-4">
       
        <div className="w-[460px] rounded-2xl border border-border bg-card px-5 py-5 text-text">
          <p className="text-sm uppercase tracking-widest text-text-secondary">
            Send
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <label htmlFor="amount" className="sr-only">
              Amount to convert
            </label>

            <input
              id="amount"
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={handleAmountChange}
              className="
                min-w-0 flex-1 bg-transparent
                text-3xl font-bold text-text outline-none
              "
            />

            <CurrencyDropdown
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              currencies={currencies}
            />
          </div>
        </div>

       
        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap currencies"
          className="
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-lg border border-border bg-card
            transition-all duration-200
            hover:scale-110 hover:border-accent
            active:scale-95
          "
        >
          <img
            src={exchangeIcon}
            alt=""
            className="h-6 w-6"
          />
        </button>

        <div className="w-[460px] rounded-2xl border border-border bg-card px-5 py-5 text-text">
          <p className="text-sm uppercase tracking-widest text-text-secondary">
            Receive
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <label htmlFor="result" className="sr-only">
              Converted amount
            </label>

            <input
              id="result"
              value={isLoading ? "Loading..." : formattedResult}
              readOnly
              className="
                min-w-0 flex-1 bg-transparent
                text-3xl font-bold text-accent outline-none
              "
            />

            <CurrencyDropdown
              value={toCurrency}
              onChange={handleToCurrencyChange}
              currencies={currencies}
            />
          </div>
        </div>
      </div>

      <div
        className="
          mt-6 flex flex-col gap-4
          border-t border-divider pt-4
          md:flex-row md:items-center md:justify-between
        "
      >
        <div className="text-text-secondary">
          {isLoading
            ? "Loading rate..."
            : error
              ? error
              : exchangeRate !== undefined
                ? `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`
                : "Rate unavailable"}
        </div>

        <div className="flex items-center gap-3">
          <button
          onClick={() =>
    toggleFavorite(
        fromCurrency,
        toCurrency
    )
}
            type="button"
            className="
              flex items-center gap-2 rounded-lg
              bg-accent px-4 py-2
              font-semibold text-black
            "
          >
            <img
              src={starIcon}
              alt=""
              className="h-4 w-4"
            />

           {favorite ? "Favorited" : "Favorite"}
          </button>

          <button
  onClick={handleLogConversion}
  className="border-accent border px-4 py-2 rounded-lg font-semibold"
>
  LOG CONVERSION
</button>
        </div>
      </div>
    </section>
  );
}
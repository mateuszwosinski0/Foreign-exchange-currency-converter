import exchangeIcon from "@/assets/images/icon-exchange.svg";

import CurrencyDropdown from "@/components/Dropdown/CurrencyDropdown";
import useConverter from "@/hooks/useConverter";

import { useToast } from "@/hooks/useToast";
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
  onRetry,
  amountInputRef,
  
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




const { showToast } = useToast();

function handleToggleFavorite() {
  showToast(
    favorite
      ? `${fromCurrency}/${toCurrency} removed from favorites`
      : `${fromCurrency}/${toCurrency} added to favorites`,
    favorite ? "info" : "success"
  );

  toggleFavorite(fromCurrency, toCurrency);
}

const canLog = !isLoading && !error && amount !== "" &&
  Number.isFinite(Number(amount)) && Number(amount) >= 0 &&
  Number.isFinite(exchangeRate) && exchangeRate > 0 && formattedResult !== "";

function handleLogConversion() {
  if (!canLog) return;
  addConversion({
    id: crypto.randomUUID(),
    amount: Number(amount),
    from: fromCurrency,
    to: toCurrency,
    rate: exchangeRate,
    result: formattedResult,
    date: new Date().toISOString(),
  });

  showToast(
    "Conversion saved",
    "success"
  );
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
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-center">
       
        <div className="w-full rounded-2xl border border-border bg-card px-4 py-5 text-text sm:px-5 md:w-[460px]">
          <p className="text-sm uppercase tracking-widest text-text-secondary">
            Send
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <label htmlFor="amount" className="sr-only">
              Amount to convert
            </label>

            <input
            ref={amountInputRef}
              id="amount"
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={handleAmountChange}
              className="
                min-w-0 flex-1 bg-transparent
                text-2xl sm:text-3xl font-bold text-text outline-none
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
  mx-auto flex h-12 w-12 shrink-0 items-center justify-center
  rounded-lg border border-border bg-card
  transition-all duration-200
  hover:scale-110 hover:border-accent
  active:scale-95
  md:mx-0 hover:cursor-pointer
"
        >
          <img
            src={exchangeIcon}
            alt=""
            className="h-6 w-6 rotate-90 md:rotate-0"
          />
        </button>

        <div className="w-full rounded-2xl border border-border bg-card px-4 py-5 text-text sm:px-5 md:w-[460px]">
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
                text-2xl sm:text-3xl font-bold text-accent outline-none
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

      {error && <p role="alert" className="mt-3 text-red-300">{error} <button type="button" onClick={onRetry} className="underline">Retry rates</button></p>}
      <div
  className="
    mt-6 flex flex-col items-center gap-4
    border-t border-divider pt-4
    md:flex-row md:justify-between
  "
>
        <div className="text-center text-sm text-text-secondary md:text-left">
          {isLoading
            ? "Loading rate..."
            : error
              ? error
              : exchangeRate !== undefined
                ? `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`
                : "Rate unavailable"}
        </div>

       <div className="flex w-full items-center justify-center gap-3 md:w-auto">
          <button
  onClick={handleToggleFavorite}
  type="button"
  className="
  flex flex-1 items-center justify-center gap-2 rounded-lg
  bg-accent px-3 py-2
  text-sm font-semibold text-black transition-all duration-200
  sm:flex-none sm:px-4 hover:cursor-pointer hover:-translate-y-0.5 active:scale-95
"
>
 
  {favorite ? "Favorited" : "Favorite"}
</button>

          <button
  onClick={handleLogConversion}
  type="button"
  disabled={!canLog}
 className="
  flex-1 rounded-lg border border-accent disabled:cursor-not-allowed disabled:opacity-40
  px-3 py-2 text-sm font-semibold
  sm:flex-none sm:px-4 hover:cursor-pointer transition-all
duration-200
hover:-translate-y-0.5 active:scale-95
"
>
  LOG CONVERSION
</button>
        </div>
      </div>
    </section>
  );
}

import { lazy, Suspense, useState, useEffect, useRef } from "react";

import Converter from "@/components/Converter/Converter";
import Header from "@/components/Header/Header";
import LiveMarkets from "@/components/LiveMarket/LiveMarkets";
import Tabs from "@/components/Tabs/Tabs";
import Compare from "@/components/Compare/Compare";
import Favorites from "@/components/Favorites/Favorites";
import useExchangeRates from "@/hooks/useExchangeRates";
import useLiveMarkets from "@/hooks/useLiveMarkets";
import useFavorites from "@/hooks/useFavorites";
import { getCurrencies } from "@/services/exchangeApi";
import useConversionLog from "@/hooks/useConversionLog";
import Log from "@/components/Log/Log";
import ToastContainer from "@/components/Toast/ToastContainer";

import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
const History = lazy(() => import("@/components/History/History"));
function App() {
  const [amount, setAmount] = useState("1");
 const [fromCurrency, setFromCurrency] = useState(() => {
  const params = new URLSearchParams(window.location.search);

  const value = params.get("from")?.toUpperCase();
  return /^[A-Z]{3}$/.test(value) ? value : "USD";
});
const [toCurrency, setToCurrency] = useState(() => {
  const params = new URLSearchParams(window.location.search);

  const value = params.get("to")?.toUpperCase();
  return /^[A-Z]{3}$/.test(value) ? value : "EUR";
});
const amountInputRef = useRef(null);
  const {
    exchangeRates,
    isLoading,
    error,
    retry: retryRates,
  } = useExchangeRates(fromCurrency);

  
  const {
  markets,
  isLoading: marketsLoading,
  error: marketsError,
} = useLiveMarkets();

  const [activeTab, setActiveTab] = useState("history");
   useKeyboardShortcuts({
    setActiveTab,
    handleSwap,
    amountInputRef,
   })

   
   function handleSwap() {
  setFromCurrency(toCurrency);
  setToCurrency(fromCurrency);
}

  const [currencies, setCurrencies] = useState([]);
const [currenciesLoading, setCurrenciesLoading] = useState(true);
const [currenciesError, setCurrenciesError] = useState("");
const [currencyAttempt, setCurrencyAttempt] = useState(0);
useEffect(() => {
  const controller = new AbortController();
  async function loadCurrencies() {
    try {
      const data = await getCurrencies(controller.signal);
      if (controller.signal.aborted) return;
      setCurrencies(data);
      const valid = (code) => data.some((currency) => currency.code === code);
      setFromCurrency((code) => valid(code) ? code : (valid("USD") ? "USD" : data[0].code));
      setToCurrency((code) => valid(code) ? code : (valid("EUR") ? "EUR" : data[0].code));
      setCurrenciesError("");
    } catch (error) {
      if (!controller.signal.aborted) setCurrenciesError(error.message);
    } finally {
      if (!controller.signal.aborted) setCurrenciesLoading(false);
    }
  }
  loadCurrencies();
  return () => controller.abort();
}, [currencyAttempt]);

function retryCurrencies() {
  setCurrenciesLoading(true);
  setCurrenciesError("");
  setCurrencyAttempt((value) => value + 1);
}
const {
  favorites,
  isFavorite,
  toggleFavorite,
} = useFavorites();
function handleSelectFavorite(from, to) {
  setFromCurrency(from);
  setToCurrency(to);
}
const {
    logs,
    addConversion,
    removeConversion,
    clearLog,
} = useConversionLog();


useEffect(() => {
  const params = new URLSearchParams();

  params.set("from", fromCurrency);
  params.set("to", toCurrency);

  window.history.replaceState(
    {},
    "",
    `?${params.toString()}`
  );
}, [fromCurrency, toCurrency])


  return (
  <div className="min-h-screen bg-background text-text font-main overflow-hidden">
    <div className="mx-auto w-full max-w-[1980px] px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8 lg:pt-5">
      <Header currencyCount={currencies.length} />
    </div>

    <div className="mt-8 sm:mt-10 lg:mt-12">
      <LiveMarkets
        markets={markets}
        isLoading={marketsLoading}
        error={marketsError}
      />
    </div>

    <main className="mx-auto w-full max-w-[1040px] px-4 pt-6 sm:px-6 sm:pt-10 lg:px-0">
      <h1 className="mb-5 text-xl font-medium tracking-[0.14em] text-white sm:text-2xl">
        CHECK THE RATE
      </h1>

      {currenciesError ? (
        <div role="alert" className="rounded-xl border border-red-400/40 p-4 text-red-300">
          <p>{currenciesError}</p>
          <button type="button" onClick={retryCurrencies} className="mt-2 underline">Retry currencies</button>
        </div>
      ) : <Converter
        currencies={currencies}
        currenciesLoading={currenciesLoading}
        amount={amount}
        setAmount={setAmount}
        fromCurrency={fromCurrency}
        setFromCurrency={setFromCurrency}
        toCurrency={toCurrency}
        setToCurrency={setToCurrency}
        exchangeRates={exchangeRates}
        isLoading={isLoading}
        error={error}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        addConversion={addConversion}
        amountInputRef={amountInputRef}
        onRetry={retryRates}
      />}

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="pb-8 sm:pb-10">
        {activeTab === "history" && (
          <Suspense fallback={<p role="status">Loading history...</p>}>
          <History
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
          </Suspense>
        )}

        {activeTab === "compare" && (
          <Compare
            currenciesLoading={currenciesLoading}
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
        )}

        {activeTab === "favorites" && (
          <Favorites
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onSelectPair={handleSelectFavorite}
          />
        )}

        {activeTab === "log" && (
          <Log
            logs={logs}
            removeConversion={removeConversion}
            clearLog={clearLog}
          />
        )}
      </div>
    </main>

    <ToastContainer />
  </div>
);
}

export default App;

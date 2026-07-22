import { useState, useEffect } from "react";

import Converter from "@/components/Converter/Converter";
import Header from "@/components/Header/Header";
import LiveMarkets from "@/components/LiveMarket/LiveMarkets";
import Tabs from "@/components/Tabs/Tabs";
import History from "@/components/History/History";
import Compare from "@/components/Compare/Compare";
import Favorites from "@/components/Favorites/Favorites";
import useExchangeRates from "@/hooks/useExchangeRates";
import useLiveMarkets from "@/hooks/useLiveMarkets";
import useFavorites from "@/hooks/useFavorites";
import { getCurrencies } from "@/services/exchangeApi";
import useConversionLog from "@/hooks/useConversionLog";
import Log from "@/components/Log/Log";
function App() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const {
    exchangeRates,
    previousRates,
    isLoading,
    error,
  } = useExchangeRates(fromCurrency);

  const {
  markets,
  isLoading: marketsLoading,
  error: marketsError,
} = useLiveMarkets();

  const [activeTab, setActiveTab] = useState("history");

  const [currencies, setCurrencies] = useState([]);
const [currenciesLoading, setCurrenciesLoading] = useState(true);
useEffect(() => {
  async function loadCurrencies() {
    try {
      const data = await getCurrencies();

      setCurrencies(data);
    } catch (error) {
      console.error("Currency loading error:", error);
    } finally {
      setCurrenciesLoading(false);
    }
  }

  loadCurrencies();
}, []);
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
  return (
    <div className="min-h-screen bg-background text-text font-main">
      <div className="max-w-[1300px] mx-auto px-6 pt-10">
        <Header currencyCount={currencies.length} />

        <main className="mt-24">
          <LiveMarkets
  markets={markets}
  isLoading={marketsLoading}
  error={marketsError}
/>
    
<Converter
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
/>

<Tabs
  activeTab={activeTab}
  setActiveTab={setActiveTab}
/>

<div className="mx-auto w-full max-w-6xl px-4 pb-8">
  {activeTab === "history" && (
    <History
      fromCurrency={fromCurrency}
      toCurrency={toCurrency}
    />
  )}

  {activeTab === "compare" && (
    <Compare
      currencies={currencies}
      currenciesLoading={currenciesLoading}
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
      </div>
    </div>
  );
}

export default App;
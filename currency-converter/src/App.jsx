import { useState, useEffect } from "react";
import Converter from "./components/Converter";
import currencies from "./data/currencies";
import { getExchangeRates } from "./services/exchangeApi";
import Header from "./components/Header";
import LiveMarkets from "./sections/LiveMarkets";
function App() {
const [amount, setAmount] = useState("1");
const [fromCurrency, setFromCurrency] = useState("USD");
const [toCurrency, setToCurrency] = useState("EUR");
const [exchangeRates, setExchangeRates] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
useEffect(() => {
  async function loadExchangeRates() {
    setIsLoading(true);
    setError(null);

    try {
      const rates = await getExchangeRates(fromCurrency);
      setExchangeRates(rates);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  loadExchangeRates();
}, [fromCurrency]);
 return (

<div className="min-h-screen bg-background text-text font-main">
  <div className="max-w-[1300px] mx-auto px-6 pt-10">

<Header currencyCount={currencies.length} />

<main className="mt-24">
  <LiveMarkets
  currencies={currencies}
  baseCurrency={fromCurrency}
  exchangeRates={exchangeRates}
  isLoading={isLoading}
  error={error}
  />

  <div className="mt-10">
  <Converter
    currencies={currencies}
    amount={amount}
    setAmount={setAmount}
    fromCurrency={fromCurrency}
    setFromCurrency={setFromCurrency}
    toCurrency={toCurrency}
    setToCurrency={setToCurrency}
    exchangeRates={exchangeRates}
    isLoading={isLoading}
    error={error}
  />
  </div>
</main>
</div>
</div>
 )
}

export default App;
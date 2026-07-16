import { useState, useEffect } from "react";
import Converter from "./components/Converter";
import currencies from "./data/currencies";
import { getExchangeRates } from "./services/exchangeApi";
function App() {
const [amount, setAmount] = useState("1");
const [fromCurrency, setFromCurrency] = useState("USD");
const [toCurrency, setToCurrency] = useState("EUR");
const [exchangeRates, setExchangeRates] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
useEffect(() => {
  getExchangeRates(fromCurrency);
}, [fromCurrency]);
 return (

<div className="min-h-screen bg-background text-text font-main px-6 pt-30">
  <Converter
    currencies={currencies}
    amount={amount}
    setAmount={setAmount}
    fromCurrency={fromCurrency}
    setFromCurrency={setFromCurrency}
    toCurrency={toCurrency}
    setToCurrency={setToCurrency}
  />
</div>
 )
}

export default App;
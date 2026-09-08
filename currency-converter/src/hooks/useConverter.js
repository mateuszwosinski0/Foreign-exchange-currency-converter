import { useMemo } from "react";

export default function useConverter({
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  exchangeRates,
}) {
  function handleFromCurrencyChange(newCurrency) {
    if (newCurrency === toCurrency) {
      setToCurrency(fromCurrency);
    }

    setFromCurrency(newCurrency);
  }

  function handleToCurrencyChange(newCurrency) {
    if (newCurrency === fromCurrency) {
      setFromCurrency(toCurrency);
    }

    setToCurrency(newCurrency);
  }

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  function handleAmountChange(event) {
    const newValue = event.target.value;

    if (newValue === "") {
      setAmount("");
      return;
    }

    if (Number.isFinite(Number(newValue)) && Number(newValue) >= 0) {
      setAmount(newValue);
    }
  }

  const exchangeRate = fromCurrency === toCurrency ? 1 : exchangeRates?.[toCurrency];

  const formattedResult = useMemo(() => {
    if (amount === "" || exchangeRate === undefined) {
      return "";
    }

    const result = Number(amount) * exchangeRate;

    if (!Number.isFinite(result)) {
      return "";
    }

    return result.toFixed(2);
  }, [amount, exchangeRate]);

  return {
    exchangeRate,
    formattedResult,
    handleAmountChange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    handleSwap,
  };
}
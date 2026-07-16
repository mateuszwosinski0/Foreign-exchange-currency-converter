import exchangeIcon from "../assets/images/icon-exchange.svg";
import starIcon from "../assets/images/icon-star.svg";
import CurrencyDropdown from "./CurrencyDropdown";
export default function Converter ({
  currencies,
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,

})
{ 
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
  const temporaryCurrency = fromCurrency;

  setFromCurrency(toCurrency);
  setToCurrency(temporaryCurrency);
}

function handleAmountChange(event) {
  const newValue = event.target.value;

  if(newValue === "") {
    setAmount("");
    return;
  }
  if (Number(newValue) >=0){
    setAmount(newValue);
  }
}
const exchangeRate = 0.95;

const numericAmount = Number(amount);
const result = numericAmount * exchangeRate;
const formattedResult = Number.isFinite(result)
? result.toFixed(2)
: "";

return (

   <section className="max-w-[1300px] mx-auto  bg-container rounded-2xl  p-5">

    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <div className="bg-card text-text px-5 py-5 rounded-2xl border border-border">
         <p className="text-text-secondary uppercase text-sm tracking-widest">Send</p>
         <div className="mt-4 flex items-center justify-between gap-4">
        <label htmlFor="amount"></label>
        <input className="min-w-0 flex-1 bg-transparent text-3xl font-bold text-text outline-none" type="number" id="amount"min={0} step={"any"} onChange={handleAmountChange} value={amount}
  onChange={(event) => setAmount(event.target.value)} />

  <CurrencyDropdown
  value={fromCurrency}
  onChange={handleFromCurrencyChange}
  currencies={currencies}
/>
</div>
      </div>

      <button onClick={handleSwap} className="w-12 h-12 flex items-center justify-center rounded-lg bg-card border border-border">
        <img src={exchangeIcon} alt="swap currencies" className="w-12 h-12 flex items-center justify-center rounded-lg bg-card border border-border transition-all duration-200 hover:scale-110 hover:border-accent active:scale-95"/>
      </button>

      <div className="text-text bg-card text-text px-5 py-5 rounded-2xl border border-border">
      <p className="text-text-secondary uppercase text-sm tracking-widest">Receive</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <label htmlFor="result"></label>
        <input
  id="result"
  value={formattedResult}
  readOnly
  className="min-w-0 flex-1 bg-transparent text-3xl font-bold text-accent outline-none"
/>

 <CurrencyDropdown
  value={toCurrency}
  onChange={handleToCurrencyChange}
  currencies={currencies}
/>
      </div>
      </div>
      </div>
      <div className="mt-6 border-t border-divider pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          1 {fromCurrency} = {exchangeRate} {toCurrency}
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-lg font-semibold">
            <img src={starIcon} alt="favorite" className="w-4 h-4"/>
            Favorited</button>
          <button className="border-accent border px-4 py-2 rounded-lg font-semibold">LOG CONVERSION</button>
        </div>
      </div>
    </section>
  );
}

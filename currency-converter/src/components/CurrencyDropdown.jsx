import { useState, useRef } from "react";
import chevronDown from "../assets/images/icon-chevron-down.svg"
import useClickOutside from "../hooks/useClickOutside";
export default function CurrencyDropdown({
  value,
  onChange,
  currencies,
}) {
  const selectedCurrency = currencies.find(
    (currency) => currency.code === value
  );
  const dropdown = useRef(null);
  const [isOpen,setIsOpen] = useState(false);
 
  useClickOutside(dropdown, () => {
    if (isOpen) {
      setIsOpen(false);
    }

  });
 return (
  <div ref={dropdown} className="relative">
  <button
  type="button"
  onClick={() => setIsOpen((prev) => !prev)}
  className="flex items-center gap-2 bg-dropdown border border-border rounded-lg px-3 py-2"
>
  <img
    src={selectedCurrency.flag}
    alt={selectedCurrency.code}
    className="w-6 h-6 rounded-full object-cover"
  />

  <span>{selectedCurrency.code}</span>

  <img
    src={chevronDown}
    alt=""
    className={`w-3 h-3 transition-transform duration-200 
    ${isOpen ? "rotate-180" : ""}
    `} 
  />
</button>

    {isOpen && (
      <div
  className="
    absolute right-0 top-full mt-2 z-50 min-w-52
    bg-dropdown border border-border rounded-xl
    overflow-hidden shadow-xl
    origin-top-right
    animate-[dropdownOpen_150ms_ease-out]
  "
>
              
  
  
{currencies.map((currency) => (
  <button
    type="button"
    key={currency.code}
    onClick={() => {
      onChange(currency.code);
      setIsOpen(false);
    }}
    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
  ${
    currency.code === value
      ? "bg-card text-accent"
      : "hover:bg-card"
  }
`}
  >
    <img
      src={currency.flag}
      alt={currency.code}
      className="w-6 h-6 rounded-full object-cover"
    />

    <span className="font-semibold">
      {currency.code}
    </span>

    <span className="text-sm text-text-secondary">
      {currency.name}
    </span>
  </button>
))}

      </div>
    )}
  </div>
);
}
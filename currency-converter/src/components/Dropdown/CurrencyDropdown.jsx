import { useRef } from "react";

import chevronDown from "@/assets/images/icon-chevron-down.svg";

import getCurrencyIcon from "@/utils/getCurrencyIcon";

import useClickOutside from "@/hooks/useClickOutside";
import useCurrencyDropdown from "@/hooks/useCurrencyDropdown";

import CurrencyOption from "@/components/Dropdown/CurrencyOption";
import searchIcon from "@/assets/images/icon-search.svg"
export default function CurrencyDropdown({
  value,
  onChange,
  currencies = [],
}) {
  const dropdownRef = useRef(null);

  const {
    inputRef,
    isOpen,
    search,
    setSearch,
    highlightedIndex,
    setHighlightedIndex,
    filteredCurrencies,
    toggleDropdown,
    closeDropdown,
    selectCurrency,
    handleKeyDown,
  } = useCurrencyDropdown({
    currencies,
    onChange,
  });

  useClickOutside(dropdownRef, closeDropdown);

  const selectedCurrency = currencies.find(
    (currency) => currency.code === value
  );

  if (!selectedCurrency) {
    return (
      <button
        type="button"
        disabled
        className="
          flex items-center gap-2 rounded-lg
          border border-border bg-dropdown px-3 py-2
        "
      >
        Loading...
      </button>
    );
  }

  const selectedIcon = getCurrencyIcon(selectedCurrency.code);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        className="
          flex items-center gap-2 rounded-lg
          border border-border bg-dropdown px-3 py-2
        "
      >
        {selectedIcon.type === "flag" && (
          <img
            src={selectedIcon.value}
            alt={`${selectedCurrency.code} flag`}
            className="h-6 w-6 rounded-full object-cover"
          />
        )}

        {selectedIcon.type === "emoji" && (
          <span
            role="img"
            aria-label={`${selectedCurrency.code} icon`}
            className="
              flex h-6 w-6 items-center justify-center
              text-lg leading-none
            "
          >
            {selectedIcon.value}
          </span>
        )}

        {selectedIcon.type === "text" && (
          <div
            className="
              flex h-6 w-6 items-center justify-center
              rounded-full bg-card
              text-[10px] font-semibold
              text-text-secondary
            "
          >
            {selectedIcon.value}
          </div>
        )}

        <span className="font-semibold">
          {selectedCurrency.code}
        </span>

        <img
          src={chevronDown}
          alt=""
          className={`
            h-3 w-3 transition-transform duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {isOpen && (
        <div
          className="
            currency-scroll
            absolute right-0 top-full z-50 mt-2
            max-h-80 w-72 overflow-y-auto
            origin-top-right rounded-xl
            border border-border bg-dropdown
            shadow-xl
            animate-[dropdownOpen_150ms_ease-out]
          "
        >
          <div
            className="
              sticky top-0 z-10
              border-b border-border bg-dropdown p-3
            "
          >
            <input
              ref={inputRef}
              type="text"
              value={search}
              placeholder="Search currency..."
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleKeyDown}
              className="
                w-full rounded-lg
                border border-border bg-card
                px-3 py-2 text-sm
                outline-none focus:border-accent
              "
            />
          </div>

          {filteredCurrencies.length > 0 ? (
            filteredCurrencies.map((currency, index) => (
              <CurrencyOption
                key={currency.code}
                currency={currency}
                icon={getCurrencyIcon(currency.code)}
                isSelected={currency.code === value}
                isHighlighted={index === highlightedIndex}
                onMouseEnter={() => setHighlightedIndex(index)}
                onSelect={() => selectCurrency(currency.code)}
              />
            ))
          ) : (
            <p
              className="
                px-4 py-6 text-center
                text-sm text-text-secondary
              "
            >
              No currencies found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
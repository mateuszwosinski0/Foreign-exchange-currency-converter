import { useEffect, useMemo, useRef, useState } from "react";

export default function useCurrencyDropdown({
  currencies = [],
  onChange,
}) {
  const inputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return currencies.filter((currency) => {
      const code = currency.code?.toLowerCase() ?? "";
      const name = currency.name?.toLowerCase() ?? "";                        

      return code.includes(query) || name.includes(query);
    });
  }, [currencies, search]);

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();
  }, [isOpen]);

  function handleSearch(value) {
    setSearch(value);
    setHighlightedIndex(0);
  }

  function openDropdown() {
    setHighlightedIndex(0);
    setIsOpen(true);
  }

  function closeDropdown() {
    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(0);
  }

  function toggleDropdown() {
    if (isOpen) {
      closeDropdown();
      return;
    }

    openDropdown();
  }

  function selectCurrency(currencyCode) {
    onChange(currencyCode);
    closeDropdown();
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setHighlightedIndex((previousIndex) => {
        if (filteredCurrencies.length === 0) {
          return 0;
        }

        if (previousIndex >= filteredCurrencies.length - 1) {
          return 0;
        }

        return previousIndex + 1;
      });
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((previousIndex) => {
        if (filteredCurrencies.length === 0) {
          return 0;
        }

        if (previousIndex <= 0) {
          return filteredCurrencies.length - 1;
        }

        return previousIndex - 1;
      });
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const selectedCurrency =
        filteredCurrencies[highlightedIndex];

      if (!selectedCurrency) return;

      selectCurrency(selectedCurrency.code);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
    }
  }

  return {
    inputRef,
    isOpen,
    search,
    setSearch: handleSearch,
    highlightedIndex,
    setHighlightedIndex,
    filteredCurrencies,
    toggleDropdown,
    closeDropdown,
    selectCurrency,
    handleKeyDown,
  };
}
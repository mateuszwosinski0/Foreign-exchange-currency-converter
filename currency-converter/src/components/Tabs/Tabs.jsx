import { useEffect, useRef, useState } from "react";
import chevronDown from "@/assets/images/icon-chevron-down.svg";

export default function Tabs({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const tabs = [
    { id: "history", label: "History" },
    { id: "compare", label: "Compare" },
    { id: "favorites", label: "Favorites" },
    { id: "log", label: "Log" },
  ];

  const activeTabLabel =
    tabs.find((tab) => tab.id === activeTab)?.label ?? "History";

  function handleSelectTab(tabId) {
    setActiveTab(tabId);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="w-full py-6 md:py-8">

      <div
        ref={dropdownRef}
        className="relative md:hidden"
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={`
            flex w-full items-center justify-between
            border px-4 py-4
            text-sm font-semibold uppercase
            tracking-[0.14em] text-text
            transition-all duration-200
            ${
              isOpen
                ? "rounded-t-xl border-accent bg-card"
                : "rounded-xl border-border bg-card"
            }
          `}
        >
          <span>{activeTabLabel}</span>

          <img
            src={chevronDown}
            alt=""
            className={`
              h-4 w-4 transition-transform duration-200
              ${isOpen ? "rotate-180" : "rotate-0"}
            `}
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            className="
              absolute left-0 top-full z-30
              w-full overflow-hidden
              rounded-b-xl border border-t-0
              border-accent bg-card
              shadow-xl
            "
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`
                    flex w-full items-center
                    px-4 py-3
                    text-left text-sm font-medium
                    uppercase tracking-[0.12em]
                    transition
                    ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-text-secondary hover:bg-surface hover:text-text"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

   
      <div className="hidden border-b border-border md:flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-3 font-medium transition ${
              activeTab === tab.id
                ? "text-accent"
                : "text-gray-500 hover:text-white"
            }`}
          >
            {tab.label}

            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
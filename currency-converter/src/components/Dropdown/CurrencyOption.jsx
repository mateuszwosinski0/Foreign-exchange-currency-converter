export default function CurrencyOption({
  currency,
  icon,
  isSelected,
  isHighlighted,
  onMouseEnter,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      className={`
        flex w-full items-center gap-3 px-4 py-3 text-left
        transition-colors
        ${
          isHighlighted
            ? "bg-accent/10"
            : "hover:bg-card"
        }
        ${isSelected ? "text-accent" : "text-text"}
      `}
    >
      {icon.type === "flag" && (
        <img
          src={icon.value}
          alt={`${currency.code} flag`}
          className="h-6 w-6 shrink-0 rounded-full object-cover"
        />
      )}

      {icon.type === "emoji" && (
        <span
          role="img"
          aria-label={`${currency.code} icon`}
          className="
            flex h-6 w-6 shrink-0
            items-center justify-center
            text-lg leading-none
          "
        >
          {icon.value}
        </span>
      )}

      {icon.type === "text" && (
        <span
          className="
            flex h-6 w-6 shrink-0
            items-center justify-center
            rounded-full bg-card
            text-[10px] font-semibold
            text-text-secondary
          "
        >
          {icon.value}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="font-semibold">
          {currency.code}
        </p>

        <p className="truncate text-sm text-text-secondary">
          {currency.name}
        </p>
      </div>

      {isSelected && (
        <span className="text-accent">
          ✓
        </span>
      )}
    </button>
  );
}
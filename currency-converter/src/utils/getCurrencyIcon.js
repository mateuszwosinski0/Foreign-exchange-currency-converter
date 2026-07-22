import getFlagUrl from "@/utils/getFlagUrl";

const specialCurrencyIcons = {
  XAU: "🥇",
  XAG: "🥈",
  XPT: "⚪",
  XPD: "⚫",
  XDR: "🌍",
};

export default function getCurrencyIcon(currencyCode) {
  const specialIcon = specialCurrencyIcons[currencyCode];

  if (specialIcon) {
    return {
      type: "emoji",
      value: specialIcon,
    };
  }

  const flagUrl = getFlagUrl(currencyCode);

  if (flagUrl) {
    return {
      type: "flag",
      value: flagUrl,
    };
  }

  return {
    type: "text",
    value: currencyCode.slice(0, 2),
  };
}
import { currencyCountries } from "@/data/currencyCountries";

export default function getFlagUrl(currencyCode) {
  const countryCode = currencyCountries[currencyCode];

  if (!countryCode) {
    return null;
  }

  return `https://flagcdn.com/w40/${countryCode}.png`;
}
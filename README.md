# Currency Converter

Aplikacja do przeliczania walut i przeglądania historii kursów, zbudowana w React.

## Funkcje

- Przeliczanie kwot i zamiana waluty źródłowej z docelową.
- Wyszukiwanie walut w dropdownach oraz obsługa klawiaturą.
- Historia kursów na wykresie: 1 dzień, tydzień, miesiąc, 3 miesiące, rok i 5 lat.
- Porównanie waluty bazowej z głównymi walutami.
- Ulubione pary i dziennik ostatnich 20 przeliczeń zapisane lokalnie.
- Eksport dziennika do CSV.
- Wybrana para walut w adresie URL.
- Stany ładowania, błędów i pustych wyników.

## Technologie

React 19, JavaScript, Vite, Tailwind CSS, Recharts, Lucide React, Frankfurter API.

## Uruchomienie

Polecenia uruchamiaj w folderze `currency-converter`, w którym znajduje się `package.json`.

```bash
npm install
npm run dev
```

## Sprawdzenie i build

```bash
npm run lint
npm run build
npm run preview
```

## Dane

Źródło: [Frankfurter](https://frankfurter.dev/). API udostępnia dzienne kursy referencyjne, a nie notowania giełdowe w czasie rzeczywistym. Pasek kursów odświeża zapytanie co minutę; w dni bez publikacji kurs może pozostać niezmieniony. Klucz API nie jest wymagany.

Ulubione i dziennik są przechowywane w localStorage na danym urządzeniu. Gdy pamięć przeglądarki jest niedostępna, aplikacja działa w bieżącej sesji.

## Skróty klawiaturowe

- Alt + H: historia; Alt + C: porównanie.
- Alt + F: ulubione; Alt + L: dziennik.
- Alt + S: zamiana walut; Alt + K: pole kwoty.

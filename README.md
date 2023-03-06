# Test task to choosing date of birth

## Úloha:

Implementujte input pre výber dátumu narodenia (niečo podobné ako [Date Picker](https://mui.com/x/react-date-pickers/date-picker/#basic-usage) )

Ako kalendár použi komponent [Calendar](https://hypeserver.github.io/react-date-range/#calendar)

Výsledok má byť textový input, ktorý pri focuse otvorí kalendár a umožní:

1. výber dátumu cez kalendár a následne vyplenenie inputu vybraným dátumom
2. zadanie dátumu napísaním textu do inputu a v prípade validného dátumu, posunie kalendárik na daný dátum

Pri strate focusu alebo vyplnení validného dátumu sa kalendár zavrie

Extra points:

- internacionalizácia => validovanie vpísaného dátumu na základe vybratého locale
- performance optimalizácie => debounce vpísaného textu
- => rerender kalendár komponentu iba validnom dátume
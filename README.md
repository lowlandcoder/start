# Start

Startpagina van het Lab023-platform (`start.lab023.nl`). Toont een kaart per
pagina van het platform, met zoekfilter, sneltoetsen en een volgorde die
meebeweegt met de meest gebruikte pagina.

## Onderdelen

- `index.html` — de webpagina (laadt `huisstijl.css` en `style.css`).
- `huisstijl.css` — de gedeelde Lab023-huisstijl.
- `style.css` — pagina-eigen opmaak: kop, zoekbalk en kaartrooster.
- `script.js` — bouwt het rooster op uit de lijst `PAGINAS`, verzorgt de
  zoekfilter, de sneltoetsen, de begroeting en de klok.

## Pagina's aanpassen

De lijst `PAGINAS` bovenin `script.js` is de enige plek die aangepast hoeft te
worden bij een nieuwe pagina, een gewijzigd domein of een andere omschrijving.
Elke pagina heeft een `id`, `naam` (thema-woord), `domein`, `omschrijving`, een
`icoon` (sleutel in `ICONEN`) en optioneel een `badge`, `extern` en `lokaal`.

`zigbee2mqtt` staat met `extern: true` in de lijst: de kaart toont alleen
"Zigbee2MQTT" zonder het voorvoegsel "Mijn", omdat de beheerpagina de eigen
interface van zigbee2mqtt is en niet de Lab023-huisstijl volgt. De pagina
staat achter een wachtwoord (badge "Afgeschermd"), zie `mijnhuis/HANDLEIDING.md`.

`lokaal: true` is voor een onderdeel zonder publieke pagina (geen `domein`);
de kaart krijgt dan geen link. Op dit moment gebruikt geen enkele pagina dit.

`mijnradar`, `mijnwijn` en `polderlicht` volgen de gedeelde huisstijl nog niet
volledig (zie `OVERZICHT.md`); de kaarten linken al wel naar hun subdomein.

## Interactie

- Zoekveld filtert de kaarten direct op naam en omschrijving.
- Sneltoets `/` focust het zoekveld, `Escape` maakt het weer leeg.
- Cijfertoetsen 1–9 openen de bijbehorende kaart (in de getoonde volgorde).
- De volgorde van de kaarten volgt de meest recent bezochte pagina
  (`localStorage`, per apparaat).

## Databron

Geen externe databron. De inhoud staat vast in `PAGINAS` in `script.js`.

## Publiceren

1. Wijziging lokaal vastleggen en naar GitHub pushen (`git push origin main`).
2. Op de server `~/publiceer-start.sh` uitvoeren.

## Geheimen

Geen geheimen in deze map.

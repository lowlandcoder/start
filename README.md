# Start

Startpagina van het Lab023-platform (`start.lab023.nl`). Toont een kaart per
pagina van het platform, met zoekfilter, een sneltoets voor het zoekveld en een volgorde die
meebeweegt met de meest gebruikte pagina.

## Onderdelen

- `index.html` — de webpagina (laadt `huisstijl.css` en `style.css`).
- `huisstijl.css` — de gedeelde Lab023-huisstijl.
- `style.css` — pagina-eigen opmaak: kop, zoekbalk en kaartrooster.
- `script.js` — bouwt het rooster op uit de lijst `PAGINAS`, verzorgt de
  zoekfilter, de sneltoets voor het zoekveld, de begroeting en de klok.

## Pagina's aanpassen

De lijst `PAGINAS` bovenin `script.js` is de enige plek die aangepast hoeft te
worden bij een nieuwe pagina, een gewijzigd domein of een andere omschrijving.
Elke pagina heeft een `id`, `naam` (thema-woord), `domein`, `omschrijving`, een
`icoon` (sleutel in `ICONEN`) en optioneel een `badge`, `extern`, `lokaal` en
`categorie`.

## Groepen

De lijst `CATEGORIEEN` in `script.js` bepaalt de groepen. Elke groep heeft een
`id`, een `naam`, een `omschrijving` en een `icoon`. Een pagina hoort bij een groep
via `categorie` met het `id` van de groep.

Op de startpagina is een groep één kaart, "Mijn" plus de naam, met het aantal
pagina's als label. Bij aanklikken opent de groep in dezelfde pagina
(`start.lab023.nl/#<id>`), met een kop, een link "Alle pagina's" en de kaarten van de
groep. De terugknop van de browser werkt. Een pagina zonder `categorie` staat zelf
op de startpagina. De adressen van de sites blijven ongewijzigd.

Zoeken blijft over alle pagina's gaan, ook die in een groep, en ook op de naam van
de groep ("weerstation" toont de drie kaarten).

Op dit moment zijn er drie groepen:

- `weerstation`: Weer, Radar en Onweer.
- `homeautomation`: HomeAssistant, Thuis, Verbruik, Eufy, EPaper en Zigbee.
- `muziek`: Radio, MusicGrabber, Mornye en NowPlaying.

## Interactie

- Zoekveld filtert de kaarten direct op naam en omschrijving.
- Sneltoets `/` focust het zoekveld, `Escape` maakt het weer leeg.
- De volgorde van de kaarten volgt de meest recent bezochte pagina
  (`localStorage`, per apparaat). Een groepskaart telt mee als een van de
  kaarten uit de groep is bezocht.

## Databron

Geen externe databron. De inhoud staat vast in `PAGINAS` in `script.js`.

## Cache

`index.html` laadt `style.css` en `script.js` met `?v=<datum>`. Verhoog die datum bij elke
wijziging in een van die twee bestanden, anders kan een browser de oude opmaak met het
nieuwe script combineren.

## Publiceren

1. Wijziging lokaal vastleggen en naar GitHub pushen (`git push origin main`).
2. Op de server `~/publiceer-start.sh` uitvoeren.

## Geheimen

Geen geheimen in deze map.

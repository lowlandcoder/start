// Werking van de Lab023-startpagina: rooster opbouwen, zoeken, sneltoetsen,
// begroeting en volgorde op laatst bezocht.

/* ================================================================
   PAGINALIJST — hier een pagina toevoegen, aanpassen of verwijderen.
   Elke pagina heeft: id, naam (thema-woord, komt na "Mijn" op de kaart),
   domein (volledige URL), omschrijving, icoon (sleutel in ICONEN) en
   eventueel badge ("Afgeschermd" e.d.), extern (true = geen "Mijn"-voorvoegsel,
   voor een pagina die niet de eigen huisstijl gebruikt, zoals zigbee2mqtt)
   en lokaal (true = geen directe link, alleen bereikbaar binnen het eigen
   netwerk).
   ================================================================ */
const PAGINAS = [
  { id: "weer",      naam: "Weer",      domein: "https://mijnweer.lab023.nl",      omschrijving: "Persoonlijke weersite op basis van locatie.", icoon: "weer" },
  { id: "radio",     naam: "Radio",     domein: "https://mijnradio.lab023.nl",     omschrijving: "Twaalf favoriete internetradiostations.", icoon: "radio" },
  { id: "verbruik",  naam: "Verbruik",  domein: "https://mijnverbruik.lab023.nl",  omschrijving: "Energieverbruik per uur, dag en maand.", icoon: "verbruik" },
  { id: "server",    naam: "Server",    domein: "https://mijnserver.lab023.nl",    omschrijving: "Serverprestaties: belasting, geheugen, schijf.", icoon: "server", badge: "Afgeschermd" },
  { id: "radar",     naam: "Radar",     domein: "https://mijnradar.lab023.nl",     omschrijving: "Neerslagradar voor Nederland.", icoon: "radar" },
  { id: "wijn",      naam: "Wijn",      domein: "https://mijnwijn.lab023.nl",      omschrijving: "Overzicht van favoriete wijnen.", icoon: "wijn" },
  { id: "polderlicht", naam: "Polderlicht", domein: "https://polderlicht.lab023.nl", omschrijving: "Prototype van een bespreekomgeving.", icoon: "licht" },
  { id: "homeassistant", naam: "HomeAssistant", domein: "https://mijnhomeassistant.lab023.nl", omschrijving: "Bediening van de slimme stekkers en sensoren, met eigen inlog en app.", icoon: "homeassistant", badge: "Eigen inlog" },
  { id: "zigbee",    naam: "Zigbee",    domein: "https://zigbee2mqtt.lab023.nl",   omschrijving: "Directe ingang naar de Zigbee2MQTT-beheerpagina.", icoon: "zigbee", badge: "Afgeschermd" },
  { id: "pihole",    naam: "Pihole",    domein: "https://mijnpihole.lab023.nl",    omschrijving: "Blokkeert advertenties en volgers via DNS, voor het hele netwerk.", icoon: "pihole", badge: "Afgeschermd" },
  { id: "verkeer",   naam: "Verkeer",   domein: "https://mijnverkeer.lab023.nl",   omschrijving: "Realtime dashboard van het websiteverkeer (GoAccess).", icoon: "verkeer", badge: "Afgeschermd" },
  { id: "agenda",    naam: "Agenda",    domein: "https://mijnagenda.lab023.nl",    omschrijving: "Foto-opdrachten met overzicht per mail.", icoon: "agenda", badge: "Afgeschermd" },
  { id: "portainer", naam: "Portainer", domein: "https://mijnportainer.lab023.nl", omschrijving: "Containerbeheer voor de servers lab023 en sdr.", icoon: "portainer", badge: "Afgeschermd" },
  { id: "sdr",       naam: "SDR",       domein: "https://mijnsdr.lab023.nl",       omschrijving: "Overzicht van de SDR-experimenten op de sdr-server.", icoon: "sdr", badge: "Afgeschermd" },
  { id: "recepten",  naam: "Recepten",  domein: "https://mijnrecepten.lab023.nl",  omschrijving: "Favoriete recepten en recepten om uit te proberen, met filter op ingrediënten.", icoon: "recept" },
  { id: "syncthing", naam: "Syncthing", domein: "https://mijnsyncthing.lab023.nl", omschrijving: "Synchroniseert de notitiekluis tussen server, pc en telefoon.", icoon: "syncthing", badge: "Afgeschermd" },
  { id: "ah",        naam: "AH",        domein: "https://mijnah.lab023.nl",        omschrijving: "Koppeling met het Albert Heijn-account voor de AI-assistent.", icoon: "boodschappen", badge: "Afgeschermd" },
  { id: "ais",       naam: "AIS",       domein: "https://mijnais.lab023.nl",       omschrijving: "Scheepsradar op basis van AIS-ontvangst met een RTL-SDR stick.", icoon: "ais", badge: "Afgeschermd" },
  { id: "retrogames", naam: "Retrogames", domein: "https://mijnretrogames.lab023.nl", omschrijving: "Verzameling retrospellen, speelbaar in de browser.", icoon: "retrogames", badge: "Afgeschermd" },
  { id: "snake",     naam: "Snake",     domein: "https://mijnsnake.lab023.nl",     omschrijving: "Het spel Snake met een gedeelde ranglijst.", icoon: "snake" }
];

/* Lijnicoontjes, 24×24, zelfde stijl als de rest van het platform. */
const ICONEN = {
  weer: '<circle cx="9" cy="15" r="4"></circle><path d="M13 15h4a3 3 0 0 0 0-6 5 5 0 0 0-9.6-1.5"></path>',
  radio: '<circle cx="12" cy="15" r="2"></circle><path d="M7 11a7 7 0 0 1 10 0M4 8a11 11 0 0 1 16 0"></path>',
  verbruik: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"></path>',
  server: '<rect x="4" y="4" width="16" height="6" rx="1.5"></rect><rect x="4" y="14" width="16" height="6" rx="1.5"></rect><circle cx="8" cy="7" r=".6" fill="currentColor"></circle><circle cx="8" cy="17" r=".6" fill="currentColor"></circle>',
  radar: '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.2" fill="currentColor"></circle><path d="M12 3v3M21 12h-3"></path>',
  wijn: '<path d="M8 3h8l-1 7a3 3 0 0 1-6 0L8 3z"></path><path d="M12 13v6M9 21h6"></path>',
  licht: '<path d="M9 18h6M10 21h4"></path><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.44 1 1.15 1 1.9V16h5v-.2c0-.75.4-1.46 1-1.9A6 6 0 0 0 12 3z"></path>',
  homeassistant: '<path d="M4 11 12 4l8 7"></path><path d="M6 10v9h12v-9"></path><circle cx="12" cy="13.5" r="1.1" fill="currentColor"></circle><path d="M12 13.5 9.3 16.6M12 13.5l2.7 3.1"></path><circle cx="9.3" cy="16.9" r=".7" fill="currentColor"></circle><circle cx="14.7" cy="16.9" r=".7" fill="currentColor"></circle>',
  zigbee: '<circle cx="6" cy="18" r="2"></circle><circle cx="12" cy="6" r="2"></circle><circle cx="18" cy="18" r="2"></circle><path d="M7.5 16.5 10.5 7.5M13.5 7.5 16.5 16.5M8 18h8"></path>',
  pihole: '<path d="M12 3l7 3v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z"></path><path d="M9 12h6"></path>',
  verkeer: '<path d="M3 13h3l2-6 4 12 3-9 2 3h4"></path>',
  agenda: '<rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path><circle cx="12" cy="15" r=".8" fill="currentColor"></circle>',
  portainer: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"></path><path d="M4 7.5l8 4.5 8-4.5M12 12v9"></path>',
  ais: '<path d="M4 16h16l-2.2 4H6.2L4 16z"></path><path d="M7.5 16v-4h5.5l3.5 4"></path><path d="M12 12V8"></path><circle cx="12" cy="7.4" r=".9" fill="currentColor"></circle><path d="M9.7 5.6a3.2 3.2 0 0 1 4.6 0"></path><path d="M7.9 3.6a5.8 5.8 0 0 1 8.2 0"></path>',
  sdr: '<path d="M12 12v9"></path><circle cx="12" cy="11" r="1.2" fill="currentColor"></circle><path d="M8.5 14.5a5 5 0 0 1 0-7M15.5 7.5a5 5 0 0 1 0 7"></path><path d="M6 17a9 9 0 0 1 0-12M18 5a9 9 0 0 1 0 12"></path>',
  recept: '<path d="M6 3v7a3 3 0 0 0 6 0V3M9 3v18"></path><path d="M17 3c-1.5 1-2.5 3-2.5 5.5S15.5 13 17 14v7"></path>',
  syncthing: '<path d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3"></path><path d="M19.5 12a7.5 7.5 0 0 1-12.8 5.3"></path><path d="M17.5 3.2v3.5H14M6.5 20.8v-3.5H10"></path>',
  boodschappen: '<path d="M4 8h16l-1.4 11.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 8z"></path><path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2"></path><path d="M9.5 12v4M14.5 12v4"></path>',
  retrogames: '<rect x="2.5" y="7" width="19" height="10" rx="5"></rect><path d="M7 10v4M5 12h4"></path><circle cx="16" cy="11" r=".9" fill="currentColor"></circle><circle cx="18.5" cy="13.5" r=".9" fill="currentColor"></circle>',
  snake: '<path d="M5 6h5.5a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h5"></path><circle cx="15.5" cy="18" r="2.2"></circle><circle cx="16.4" cy="17.4" r=".55" fill="currentColor"></circle><circle cx="19" cy="6.5" r="1.4" fill="currentColor"></circle>'
};

const OPSLAG_BEZOCHT = "start.laatstbezocht";
const $ = (id) => document.getElementById(id);

/* Begroeting op basis van het tijdstip van de dag */
function zetGroet() {
  const uur = new Date().getHours();
  let groet;
  if (uur < 6) groet = "Goedenacht";
  else if (uur < 12) groet = "Goedemorgen";
  else if (uur < 18) groet = "Goedemiddag";
  else groet = "Goedenavond";
  $("groet").textContent = groet + " — overzicht van alle pagina's op het platform.";
}

/* Klok bovenin, elke minuut bijgewerkt */
function zetKlok() {
  const nu = new Date();
  $("klok").textContent = nu.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })
    + " · " + nu.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

/* Bezoek onthouden, voor de volgorde van het rooster */
function laadBezocht() {
  try { return JSON.parse(localStorage.getItem(OPSLAG_BEZOCHT)) || {}; }
  catch (e) { return {}; }
}
function bewaarBezoek(id) {
  const bezocht = laadBezocht();
  bezocht[id] = Date.now();
  try { localStorage.setItem(OPSLAG_BEZOCHT, JSON.stringify(bezocht)); } catch (e) {}
}
function gesorteerdeLijst() {
  const bezocht = laadBezocht();
  return [...PAGINAS].sort((a, b) => (bezocht[b.id] || 0) - (bezocht[a.id] || 0));
}

/* Eén kaart opbouwen */
function maakKaart(pagina, index) {
  const kaart = document.createElement(pagina.lokaal ? "div" : "a");
  kaart.className = "kaart pagina-kaart" + (pagina.lokaal ? " uitgeschakeld" : "");
  if (!pagina.lokaal) {
    kaart.href = pagina.domein;
    kaart.target = "_blank";
    kaart.rel = "noopener";
    kaart.dataset.id = pagina.id;
  }
  kaart.dataset.naam = pagina.naam.toLowerCase();
  kaart.dataset.omschrijving = pagina.omschrijving.toLowerCase();

  const kop = document.createElement("div");
  kop.className = "pagina-kop";

  const icoon = document.createElement("div");
  icoon.className = "pagina-icoon";
  icoon.innerHTML = `<svg viewBox="0 0 24 24">${ICONEN[pagina.icoon] || ""}</svg>`;

  const sneltoets = document.createElement("span");
  sneltoets.className = "sneltoets";
  sneltoets.textContent = index < 9 ? String(index + 1) : "";

  kop.appendChild(icoon);
  if (index < 9) kop.appendChild(sneltoets);

  const naam = document.createElement("div");
  naam.className = "pagina-naam";
  naam.innerHTML = pagina.extern ? `<em>${pagina.naam}</em>` : `Mijn<em>${pagina.naam}</em>`;

  const omschrijving = document.createElement("div");
  omschrijving.className = "pagina-omschrijving";
  omschrijving.textContent = pagina.omschrijving;

  kaart.appendChild(kop);
  kaart.appendChild(naam);
  kaart.appendChild(omschrijving);

  if (pagina.badge) {
    const badge = document.createElement("span");
    badge.className = "badge" + (pagina.badge === "Lokaal" ? " badge-lokaal" : "");
    badge.textContent = pagina.badge;
    kaart.appendChild(badge);
  }

  if (!pagina.lokaal) {
    kaart.addEventListener("click", () => bewaarBezoek(pagina.id));
  }
  return kaart;
}

/* Rooster opbouwen, in volgorde van laatst bezocht */
let volgordeVoorSneltoetsen = [];
function bouwRooster() {
  const rooster = $("rooster");
  rooster.innerHTML = "";
  const lijst = gesorteerdeLijst();
  volgordeVoorSneltoetsen = lijst;
  lijst.forEach((pagina, i) => rooster.appendChild(maakKaart(pagina, i)));
}

/* Zoekfilter: typen filtert de kaarten direct op naam en omschrijving */
function filterRooster() {
  const term = $("zoekveld").value.trim().toLowerCase();
  const kaarten = document.querySelectorAll(".pagina-kaart");
  let zichtbaar = 0;
  kaarten.forEach((kaart) => {
    const treft = !term
      || kaart.dataset.naam.includes(term)
      || kaart.dataset.omschrijving.includes(term);
    kaart.classList.toggle("verborgen", !treft);
    if (treft) zichtbaar++;
  });
  $("geenResultaat").hidden = zichtbaar !== 0;
}

/* Sneltoetsen: cijfers 1–8 openen de bijbehorende pagina, "/" focust het zoekveld */
function zetSneltoetsen() {
  document.addEventListener("keydown", (e) => {
    if (e.target === $("zoekveld")) {
      if (e.key === "Escape") { $("zoekveld").value = ""; filterRooster(); $("zoekveld").blur(); }
      return;
    }
    if (e.key === "/") {
      e.preventDefault();
      $("zoekveld").focus();
      return;
    }
    const cijfer = Number(e.key);
    if (cijfer >= 1 && cijfer <= 9) {
      const pagina = volgordeVoorSneltoetsen[cijfer - 1];
      if (pagina && !pagina.lokaal) {
        bewaarBezoek(pagina.id);
        window.open(pagina.domein, "_blank", "noopener");
      }
    }
  });
}

/* Opbouwen */
zetGroet();
zetKlok();
setInterval(zetKlok, 60000);
bouwRooster();
$("zoekveld").addEventListener("input", filterRooster);
zetSneltoetsen();

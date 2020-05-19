# CityBike
Læring ifbm bruk av Oslos åpne API for info om de ulike bysykkelstasjonene.

Lister ut alle Oslos stasjoner for bysykkel og viser hvor mange sykler og ledige plasser det er "akkurat nå" per stasjon.

## Hvordan starte applikasjonen
1. Last ned  / klon repo'et
2. Fra et "command-prompt", gå til mappen "CityBike" og kjør:
    *   npm install
    *   npm start
3. Da bør en nettleser åpne seg for deg på adressen: http://localhost:3000/

## App'n tar utgangspunkt i "create-react-app"
* Alle filer og npm-pakker ang testing er fjernet
* ServiceWorker er fjernet
* App.* i rot er fjernet (index.js laster inn CityBike fra Components)

## Strukturen
1. Selve "Applikasjonen" er "CityBike"
    * Laster data
    * Viser de andre hovedelementent
        * Header
        * Søk og visningsmodus
        * Resultat
    * Filtrerer lokasjonslisten ved et evt søk
2. StationList
    * Kobler sammen data fra stasjonslisten og statuslisten
    * Vis enten tabell eller kort-visning
3. StationRow
    * En tabell-rad med info per stasjon
4. StationCard
    * Et LI-element med info per stasjon

## TODO / Tanker om ting å evt jobbe videre med
* Kartvisning
    * Fokus på der bruker er nå, om lokasjon er kjent
    * Kart ved siden av listen og fokus på kartets statsjon når det klikkes i listen
* Oppdatering av data i bakgrunnen
* Varsel når en stasjon får nye sykler / blir full
* Vis stasjoner med feil (der sykler + plasser != kapasitet)
* Favoritstasjoner
* Bakgrunnsbilde på 
    * Her kan man leke og la brukerne selv ta vakre bilder til lokasjonene, mange idéer her..
* Penere tabellvisning
* Foreslå nærmeste stasjoner dersom ingen treff (når lokasjon er kjent)
* Lagre ønsket visningsmodus i localstorage til bruk ved senere besøk
*  "Sticky" header/søk når man skroller listen
    * "Til toppen"-knapp
*  La betalingsabonnement knyttes til oslonøkkelen slik at man kan låse opp en sykkel med den
    * Integrer denne Appen med Oslonøkkelen ;-) og lag "Sist besøkte"-stasjoner
* Språkstøtte, i18n
* Config per bygg-miljø

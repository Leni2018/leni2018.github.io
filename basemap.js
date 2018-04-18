
let myMap = L.map('mapdiv');
// Variable heißt myMap; L verweist auf Leaflet-Bibliothek/spricht die Leaflet-Bib an > über map wird neue Karte erstellt; ihr wird mit "mapdiv" die id der div zugewiesen, die im html-File schon vorhanden ist > verlrtet die Karte auf htmlSeite >> Verbindung zw .js und .html-File
let myLayers = {
    osm: L.tileLayer (
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        ),
        geolandbasemap: L.tileLayer(
            "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png"
        ),
         // geolandbasemap aus Name des Links unten, Link von oben
        bmapoverlay: L.tileLayer(
            "https://maps.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png"
        ),
        bmapgrau: L.tileLayer (
            "https://maps.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png"
        ),
        bmaphidpi: L.tileLayer(
            "https://maps.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jepg"
        ),
        bmaporthofoto30cm: L.tileLayer(
            "https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jepg"
        )
};

myMap.addLayer(myLayers.bmapgrau); // hier werden die beiden vorher definierten Variablen kombiniert > Layer wird an Karte angehängt
myMap.setView([47.267,11.383], 11); //Eckige Klammern > für Koordinaten (Zentrum der Karte), Zahl dahinter: Zoomgröße;

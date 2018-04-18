
let myMap = L.map('mapdiv');
// Variable heißt myMap; L verweist auf Leaflet-Bibliothek/spricht die Leaflet-Bib an > über map wird neue Karte erstellt; ihr wird mit "mapdiv" die id der div zugewiesen, die im html-File schon vorhanden ist > verlrtet die Karte auf htmlSeite >> Verbindung zw .js und .html-File
let myLayers = {
    osm: L.tileLayer (
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        ),
        geolandbasemap: L.tileLayer(
            "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
                subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], //= Optionenopjekt; sagt Leafmap, dass statt Platzhalter {s} "maps", "maps1", "maps2", etc eingesetzt werden soll
                attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" // zeigt unten rechts diesen Quellentext an
            }
        ),
         // geolandbasemap aus Name des Links unten, Link von oben
        bmapoverlay: L.tileLayer(
            "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
                subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
                attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
            }
        ),
        bmapgrau: L.tileLayer (
            "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
                subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
                attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
            }
        ),
        bmaphidpi: L.tileLayer(
            "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
                attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
            }
        ),
        bmaporthofoto30cm: L.tileLayer(
            "https://{s].wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
                attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
            }
        )
};

myMap.addLayer(myLayers.geolandbasemap); // hier werden die beiden vorher definierten Variablen kombiniert > Layer wird an Karte angehängt

let myMapControl = L.control.layers({
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    
    "basemap.at grau"  : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
    //fügt Controlkasten oben rechts in HTML-Seite auf Karte ein > Umschalten auf OpenStreetMap möglich
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
}); 

myMap.addControl(myMapControl);

myMap.setView([47.267,11.383], 11); //Eckige Klammern > für Koordinaten (Zentrum der Karte), Zahl dahinter: Zoomgröße;
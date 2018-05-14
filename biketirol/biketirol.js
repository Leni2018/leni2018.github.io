/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren

// >> Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/ >> Punkt über Koordinaten definieren?

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen >> nee, aus gpx > wie wien stadtspaziergang einbinden
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen

let myMap = L.map("mapdiv");
let myLayers = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            subdomains: ["a", "b", "c"],
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>",
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    
    eKartesommer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.jpeg80",
        {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>elektronische Karte Tirol Sommer</a>"
        }
    ),
    eKartewinter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.jpeg80",
        {
            attribution: "Datenquelle: <a href='http://wmts.kartetirol.at/wmts/gdi_base_winter/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.jpeg80'>elektronische Karte Tirol Winter</a>"
        }
    ),
    eKarteorthofoto: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.jpeg80",
        {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>elektronische Karte Tirol Orthophoto</a>"
        }
    ),
    eKartebeschriftung: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png8",
        {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol/resource/062d55d0-4533-4d3f-b507-106bb44285b7'>elektronische Karte Tirol</a>"
        }
    )
};
let eKartesommergruppe = L.featureGroup(
    [
        myLayers.eKartesommer,
        myLayers.eKartebeschriftung,
    ]
)
let eKartewintergruppe = L.featureGroup(
    [
        myLayers.eKartewinter,
        myLayers.eKartebeschriftung,
    ]
)
let eKarteorthogruppe = L.featureGroup(
    [
        myLayers.eKarteorthofoto,
        myLayers.eKartebeschriftung,
    ]
);

myMap.addLayer(myLayers.osm);

let myMapControl = L.control.layers({

    "Openstreetmap": myLayers.osm,
    "basemap.at Gundkarte": myLayers.geolandbasemap,
    "basemap.at Orthofoto": myLayers.bmaporthofoto30cm,
    "eKarte Tirol Sommer": eKartesommergruppe,
    "eKarte Tirol Winter": eKartewintergruppe,
    "eKarte Tirol Sommer": eKarteorthogruppe,

},

    { "collapsed": false });

myMap.addControl(myMapControl);

L.control.scale({
    maxWidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft",
}).addTo(myMap);

//myMap.fitBounds(linie.getBounds()); 
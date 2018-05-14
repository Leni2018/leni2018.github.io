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

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen >> mit leaflet line??
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen

let myMap = L.map("mapdiv"); 
const myLayer = L.featuregroup ([]) 
/*
   [
        osm: L.tileLayer (
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                subdomains : ["a", "b", "c"], 
                attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>",
            }
        ),
        geolandbasemap: L.tileLayer(
            "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
            {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
            }
        ),
        bmaporthofoto30cm: L.tileLayer (
            "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
            {
                subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
                attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
            }
        ),
        eKarte: L.tileLayer (
            " http://wmts.kartetirol.at/wmts",
            {
              subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
              attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol/resource/062d55d0-4533-4d3f-b507-106bb44285b7'>elektronische Karte Tirol</a>" 
            }
        )
    ]
)
)};
*/
        
myMap.addLayer(myLayers); 
    
    let myMapControl = L.control.layers ({ // doclink: 
        
        "Openstreetmap" :myLayers.osm,
        "basemap.at Gundkarte":myLayers.geolandbasemap,
        "basemap.at Orthofoto":myLayers.bmaporthofoto30cm,
        "eKarte Tirol": myLayers.eKarte,
},
//{  "Baselayer Control" : markerGroup,
  // "Overlay Control" : markerGroup,
//},

{"collapsed":false}); 

myMap.addControl (myMapControl); 


L.control.scale({ 
    maxWidth: 200, 
    metric: true, 
    imperial: false, 
    position: "bottomleft",
}).addTo(myMap);

myMap.fitBounds(linie.getBounds()); 
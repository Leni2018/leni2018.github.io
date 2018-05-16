/* übersicht von Klaus & Bernd: https://github.com/webmapping/webmapping.github.io/commit/f324350817fdd43c8ebbc7cb885ab04dd9364f68

Ein paar Auszüge:
Layer für Track und Marker hinzufügen  
let overlayTrack = L.featureGroup().addTo(karte);  <-- addTo direkt hier


Auf Reihenfolge achten (bei Error: XY is not defined: Variablen (let/const) müssen immer vor Aufruf definiert werden
L. verweist auf Leaflet-Dokumentation, gelb geschriebenes ruft dort hinterlegte Befehle ab
myMap.addLayer(), nicht vergessen
*/

let myMap = L.map("map"); // ! Abgleichen mit Name in html-File <div id="map"></div>
let etappeGroup = L.featureGroup(); // =^Marker-Gruppe
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
    eKartesommer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80",
        {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>elektronische Karte Tirol Sommer</a>"
        }
    ),
    eKartewinter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80",
        {
            attribution: "Datenquelle: <a href='http://wmts.kartetirol.at/wmts/gdi_base_winter/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.jpeg80'>elektronische Karte Tirol Winter</a>"
        }
    ),
    eKarteorthofoto: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80",
        {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>elektronische Karte Tirol Orthophoto</a>"
        }
    ),
    eKartebeschriftung: L.tileLayer( // Ortsnamen
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8",
        {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol/resource/062d55d0-4533-4d3f-b507-106bb44285b7'>elektronische Karte Tirol</a>"
        }
    ),

};

let eKartesommergruppe = L.featureGroup([ // fügt die Beschriftung zum Sommerlayer, Winterlayer und Ortophotolayer dazu

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

myMap.addLayer(myLayers.osm); // Website startet mit eKartesommergruppe (Sommerfoto inkl Beschriftung)

const geojsonLayer = L.geoJSON (geojson, { //Einbindung der gpx-Datei, die als const geojson in eigener Datei (etappe31.geojson.js) definiert wurde. geojsonLayer ist die Variable, die hier definiert wird, geoJSON der Leaflet-Befehl, geojson bezieht sich auf die const geojson aus der etappe31.geojson.js-Datei
    style: function (feature) {
        return { color: "#ff0000" }}
});
myMap.addLayer(geojsonLayer);

let myMapControl = L.control.layers ({ // muss unterhalb der ganzen Variablen stehen (!!geojsonLayer)

    "Openstreetmap": myLayers.osm,
    "basemap.at Gundkarte": myLayers.geolandbasemap,
    "eKarte Tirol Sommer": eKartesommergruppe,
    "eKarte Tirol Winter": eKartewintergruppe,
    "eKarte Tirol Ortho": eKarteorthogruppe,
   // "basemap.at Orthofoto": myLayers.bmaporthofoto30cm,
},
{   
   "Start- & Endpunkte" : etappeGroup,
   "Route" : geojsonLayer,
},
{
collapsed: false 
});
myMap.addControl(myMapControl);

L.control.scale({
    maxWidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft",
}).addTo(myMap);

//etappeGroup.addLayer(geojson);

myMap.addLayer(etappeGroup);
const start = [47.123786, 10.247623]
const finish = [47.241426, 10.292558]

L.marker(start).addTo(etappeGroup).bindPopup("<p>Startpunkt</p><a href='https://de.wikipedia.org/wiki/St._Anton_am_Arlberg'>Wikipedia Link</a>"); //Marker-Definition, durch bondPopup ist das Popup direkt dran

L.marker(finish).addTo(etappeGroup).bindPopup("<p>Endpunkt</p><a href='https://de.wikipedia.org/wiki/Steeg_(Tirol)'>Wikipedia Link</a>");

myMap.fitBounds(etappeGroup.getBounds());


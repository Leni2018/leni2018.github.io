// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/ 

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen

let myMap = L.map("map");
let etappeGroup = L.featureGroup();
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
    eKartebeschriftung: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8",
        {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol/resource/062d55d0-4533-4d3f-b507-106bb44285b7'>elektronische Karte Tirol</a>"
        }
    ),

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



const geojsonLayer = L.geoJSON (geojson, {
    style: function (feature) {
        return { color: "#ff0000" }}
});
myMap.addLayer(geojsonLayer);

let myMapControl = L.control.layers ({

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

L.marker(start).addTo(etappeGroup).bindPopup("<p>Startpunkt</p><a href='https://de.wikipedia.org/wiki/St._Anton_am_Arlberg'>Wikipedia Link</a>");

L.marker(finish).addTo(etappeGroup).bindPopup("<p>Endpunkt</p><a href='https://de.wikipedia.org/wiki/Steeg_(Tirol)'>Wikipedia Link</a>");


//L.marker(start).addTo(etappeGroup);
//L.marker(finish).addTo(etappeGroup);

myMap.fitBounds(etappeGroup.getBounds());


//myMap.fitBounds(etappeGroup.getBounds()); 

/*const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD";

addGeojson(url);
*/


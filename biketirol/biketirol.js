/*
Readme: https://github.com/webmapping/webmapping.github.io/blob/master/biketirol/readme.md
Auf Reihenfolge achten (bei Error: XY is not defined: Variablen (let/const) müssen immer vor Aufruf definiert werden
L. verweist auf Leaflet-Dokumentation, gelb geschriebenes ruft dort hinterlegte Befehle ab
myMap.addLayer(), nicht vergessen
*/

let myMap = L.map("map", {
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: 'topleft'
    }
}); 
let etappeGroup = L.featureGroup(); // =^Marker-Gruppe
let trackGroup = L.featureGroup().addTo(myMap);
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
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol/resource/062d55d0-4533-4d3f-b507-106bb44285b7'>elektronische Karte Tirol</a>",
            pane: "overlayPane", // angeben, damit die Stapelordnung auch funktioniert
        }
    ),

};
let eKartesommergruppe = L.featureGroup( // fügt Basemaps zusammen: zum einen Orthophoto, zum anderen zugehörige Beschriftung
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


myMap.addLayer(myLayers.osm); // Website startet mit eKartesommergruppe (Sommerfoto inkl Beschriftung)



//const geojsonLayer = L.geoJSON (geojson, { //Einbindung der gpx-Datei, die als const geojson in eigener Datei (etappe31.geojson.js) definiert wurde. geojsonLayer ist die Variable, die hier definiert wird, geoJSON der Leaflet-Befehl, geojson bezieht sich auf die const geojson aus der etappe31.geojson.js-Datei// wird jetzt nicht mehr gebraucht, da wir ein gpx.-Plugin einbinden
//   style: function (feature) {
//       return { color: "#ff8922" }}
//});
//myMap.addLayer(geojsonLayer);

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
   "GPS-Track" : trackGroup,
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
const start = [47.123786, 10.247623];
const finish = [47.241426, 10.292558];

// icon wird automatisch an linker oberer Ecke der Parzelle angeteigt. !! Popup startet auch dort, deswegen muss es noch hochgeschoben werden

L.marker(start, {icon: L.icon({iconUrl: 'icons/start.png', iconAnchor: [15, 35],}) 
}).addTo(etappeGroup).bindPopup("<p>Startpunkt</p><a href='https://de.wikipedia.org/wiki/St._Anton_am_Arlberg'>Wikipedia Link</a>"); //Marker-Definition, durch bondPopup ist das Popup direkt dran + icon geändert

L.marker(finish, {icon: L.icon({iconUrl: 'icons/finish.png', iconAnchor: [15, 35],}) 
}).addTo(etappeGroup).bindPopup("<p>Endpunkt</p><a href='https://de.wikipedia.org/wiki/Steeg_(Tirol)'>Wikipedia Link</a>");

// show GPX track length in HTML page > wird oberhalb der Karte als Text angezeigt.  https://github.com/webmapping/webmapping.github.io/commit/ca028181a327414ee044ad7081392fe15f7fc275
//Einbindung in html.Datei nötig <p><strong>Tourdaten</strong>: Gesamtlänge <span id ="laenge"></span>m, tiefster Punkt <span id ="tiefster"></span>m, höchster Punkt <span id ="hoechster"></span>m, Aufstieg <span id ="aufstieg"></span>m, Abstieg <span id ="abstieg"></span>m</p> <!-- span id verweist auf Abfrage in js-Datei zur gesamten Tourlänge (laenge) etc-->


let gpxTrack = new L.GPX("data/etappe31.gpx", {
    async : true,
}).addTo(trackGroup);
gpxTrack.on("loaded", function(evt) {
    console.log("get_distance",evt.target.get_distance().toFixed(0)) //Abfrage vom Track; toFixed (0) = rundet Dezimalstellen auf/ab
    console.log("get_elevation_min",evt.target.get_elevation_min().toFixed(0))
    console.log("get_elevation_max",evt.target.get_elevation_max().toFixed(0))
    console.log("get_elevation_gain",evt.target.get_elevation_gain().toFixed(0))
    console.log("get_elevation_loss",evt.target.get_elevation_loss().toFixed(0))
    let laenge = evt.target.get_distance().toFixed(0);//Variable erstellen
    document.getElementById("laenge").innerHTML = laenge;
    let tiefster = evt.target.get_elevation_min().toFixed(0);//Ändern
    document.getElementById("tiefster").innerHTML = tiefster;//Ändern
    let hoechster = evt.target.get_elevation_max().toFixed(0);
    document.getElementById("hoechster").innerHTML = hoechster;
    let aufstieg = evt.target.get_elevation_gain().toFixed(0);
    document.getElementById("aufstieg").innerHTML = aufstieg;
    let abstieg = evt.target.get_elevation_loss().toFixed(0);
    document.getElementById("abstieg").innerHTML = abstieg;
    myMap.fitBounds(evt.target.getBounds());
})


let myMap = L.map("mapdiv"); // doclink: http://leafletjs.com/reference-1.3.0.html#map-l-map
let markerGroup = L.featureGroup();
let myLayers= {
    osm: L.tileLayer // doclink tileLayer: http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
    (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { //Objekt mit den Optionen subdomains und attribution wie unten hinzugefügt
            subdomains : ["a", "b", "c"], // doclink:http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>", // doclink: http://leafletjs.com/reference-1.3.0.html#layer-attribution
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
        {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
        }
    ),
    bmapoverlay: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
        }
    ),
    bmapgrau: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
        }
    ),
    bmaphidpi: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg",
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
    )
};


myMap.addLayer(myLayers.osm); // doclink: http://leafletjs.com/reference-1.3.0.html#map-addlayer
// hiermit wird Layer zur Karte hinzugefügt (zusammenführen der vorher gesetzten Variablen)
myMap.addLayer(markerGroup);

let myMapControl = L.control.layers ({ // doclink: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    
    "Openstreetmap" :myLayers.osm,
    "basemap.at Gundkarte":myLayers.geolandbasemap,
    "basemap.at grau":myLayers.bmapgrau,
    "basemap.at highdpi":myLayers.bmaphidpi,
    "basemap.at Orthofoto":myLayers.bmaporthofoto30cm,
    
},
{   "basemap.at Overlay": myLayers.bmapoverlay,
    "Marker" : markerGroup,
},


{"collapsed":false}); // doclink für collapse: http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
//! false bewirkt, dass Liste gleich ausgeklappt geöffnet wird (bei :true > mousover öffnet Liste)


myMap.addControl (myMapControl); // doclink: http://leafletjs.com/reference-1.3.0.html#map-addcontrol

myMap.setView([47.267,11.383],11) // doclink: http://leafletjs.com/reference-1.3.0.html#map-setview
// damit wird Zentrum der Karte gesetzt


// Maßstabsleiste/Scale einfügen:
L.control.scale({ // doclink Scale: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    // doclink Optionen: http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    maxWidth: 200, //doclink http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric: true, // doclink http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false, // doclink http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    position: "bottomleft", // doclink http://leafletjs.com/reference-1.3.0.html#control-scale-position
}).addTo(myMap);

const uni = [47.264, 11.385];
const usi = [47.257, 11.356];
const technik = [47.263, 11.343];
myMap.addLayer(markerGroup);
const markerOptions = {
    title: "Universität Innsbruck",
    opacity: 0.7,
    draggable: true,
}
const igls = [47.234, 11.409];
const patschakofel = [47.218, 11.467]; 

L.marker(uni, markerOptions).addTo(markerGroup);
L.marker(usi, markerOptions).addTo(markerGroup);
L.marker(technik, markerOptions).addTo(markerGroup);
L.marker(igls, markerOptions).addTo(markerGroup);
L.marker(patschakofel, markerOptions).addTo(markerGroup).bindPopup ("<p>Patschakofel im Herbst</p><img style = 'width:200px' src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Patscherkofel_vm01.jpg' alt='Patscherkofl' />");

var latlngs = [
    [47.234, 11.409],
    [47.218, 11.467],
];
var polyline = L.polyline(latlngs, {color: 'red'}).addTo(myMap);

let uniPolygon = L.polygon ([uni, usi, technik]);
myMap.addLayer(uniPolygon);
uniPolygon.binPopup("Ende im Gelände!");

myMap.fitBounds(markerGroup.getBounds());myMap.fitBounds(markerGroup.getBounds());


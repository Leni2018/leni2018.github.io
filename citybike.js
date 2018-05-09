let myMap = L.map("mapdiv"); // doclink: http://leafletjs.com/reference-1.3.0.html#map-l-map
const citybikeGroup = L.markerClusterGroup();
const myIcon = L.icon({
    iconUrl: 'icons/citybikewien.png',
    iconSize: [20, 20],
    iconAnchor: [0, 0],
    popupAnchor: [3, -76],
});
//shadowUrl: 'my-icon-shadow.png',
//shadowSize: [68, 95],
//shadowAnchor: [22, 94]
let myLayers = {
    osm: L.tileLayer // doclink tileLayer: http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
    (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { //Objekt mit den Optionen subdomains und attribution wie unten hinzugefügt
            subdomains: ["a", "b", "c"], // doclink:http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>", // doclink: http://leafletjs.com/reference-1.3.0.html#layer-attribution
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg",
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
    )
};


myMap.addLayer(myLayers.osm); // doclink: http://leafletjs.com/reference-1.3.0.html#map-addlayer
// hiermit wird Layer zur Karte hinzugefügt (zusammenführen der vorher gesetzten Variablen)


let myMapControl = L.control.layers({ // doclink: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers

    "Openstreetmap": myLayers.osm,
    "basemap.at Gundkarte": myLayers.geolandbasemap,
    "basemap.at grau": myLayers.bmapgrau,
    "basemap.at highdpi": myLayers.bmaphidpi,
    "basemap.at Orthofoto": myLayers.bmaporthofoto30cm,

},
    {
        "basemap.at Overlay": myLayers.bmapoverlay,
        "Citybike Stationen": citybikeGroup,
    },


    { "collapsed": false }); // doclink für collapse: http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
//! false bewirkt, dass Liste gleich ausgeklappt geöffnet wird (bei :true > mousover öffnet Liste)


myMap.addControl(myMapControl); // doclink: http://leafletjs.com/reference-1.3.0.html#map-addcontrol
//myMap.setView([47.266100, 11.401104], 11);


// Maßstabsleiste/Scale einfügen:
L.control.scale({ // doclink Scale: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    // doclink Optionen: http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    maxWidth: 200, //doclink http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric: true, // doclink http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false, // doclink http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    position: "bottomleft", // doclink http://leafletjs.com/reference-1.3.0.html#control-scale-position
}).addTo(myMap);

//let geojson = L.geoJSON(cbstandorte).addTo(myMap);
//geojson.bindPopup(function(layer) {
//    const popupText = `<h1>${layer.feature.properties.STATION}</h1>`;
//   return popupText;
//});


async function addGeojson(url) {
    console.log("Url wird geladen: ", url);
    const response = await fetch(url);
    console.log("Response: ", response);
    const wiendata = await response.json();
    console.log("GeoJson: ", wiendata);
    const geojson = L.geoJSON(wiendata, {
        style: function (feature) {
            return { color: "#ff0000" };
        },
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.marker(latlng, {
                icon: myIcon
            });
        }
    });
    const hash = new L.Hash(myMap);
    myMap.addControl(new L.Control.Search({
        layer: citybikeGroup,
        propertyName: 'STATION'
    }));



    citybikeGroup.addLayer(geojson);
    myMap.fitBounds(citybikeGroup.getBounds()); //setboundaries muss hier eingebaut werden anstatt am Ende der Seite, weil es sonst zu spät abgerufen wird >> asynchrone Funktion!
}
// async gibt was an, was läd, aber ein bisschen dauern kann

const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json"; // durch await in der async function kann die url auch erst unter der Funktion definiert werden

addGeojson(url);

myMap.addLayer(citybikeGroup);
    //let geojson = L.geoJSON(stadtspaziergang).addTo(wienGroup);
    //geojson.bindPopup(function(layer) {
    //  const props = layer.feature.properties;
    //const popupText = `<h1>${props.NAME}</h1>`;
    //return popupText;
    //});
    //myMap.fitBounds(wienGroup.getBounds());

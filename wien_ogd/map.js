// Leaflet Karte initialisieren
let karte = L.map("divKarte");

// Gruppe für GeoJSON Layer definieren
let geojsonGruppe = L.featureGroup().addTo(karte);

// Grundkartenlayer definieren
const grundkartenLayer = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
}

// Map control mit Grundkarten und GeoJSON Overlay definieren
let kartenAuswahl = L.control.layers({
    "Openstreetmap": grundkartenLayer.osm,
    "basemap.at Grundkarte": grundkartenLayer.geolandbasemap,
    "basemap.at grau": grundkartenLayer.bmapgrau,
    "basemap.at Orthofoto": grundkartenLayer.bmaporthofoto30cm,
}, {
        "GeoJSON Layer": geojsonGruppe,
    });
karte.addControl(kartenAuswahl); //wird hinzugefügt

// Grundkarte "grau" laden
karte.addLayer(grundkartenLayer.bmapgrau)

// Maßstabsleiste metrisch hinzufügen
L.control.scale({
    maxWidth: 200,
    imperial: false,
}).addTo(karte);

// asynchrone Funktion zum Laden eines GeoJSON Layers
async function ladeGeojsonLayer(datenAttribute) { //datenAttribute wird hier als neue Variable definiert. Geht immer, wenn man eine Funktion schreibt
    const response = await fetch(datenAttribute.json);
    const response_json = await response.json();

    if (datenAttribute.icon){
        console.log("Pause")
    }

    // GeoJSON Geometrien hinzufügen und auf Ausschnitt zoomen
    const geojsonObjekt = L.geoJSON(response_json, {
        onEachFeature: function (feature, layer) {
            let popup = "<h3>Attribute</h3>";


            for (attribut in feature.properties) { //attribut hier als Variable
                let wert = feature.properties[attribut];
                if (wert && wert.toString().startsWith("http:")) {
                    popup += `${attribut}: <a href="${wert}">Weblink</a></br>`; // wert hier als Abkürzung für feature.properties[attribut]
                } else {

                    popup += `${attribut}: ${wert}<br>`; // + zählt hier immer eins weiter = einen Markereintrag weiter
                } //bis hierhin geht die Schleife 
                // console.log(popup)
                layer.bindPopup(popup, {
                    maxWidth: 600,
                }); //damit wird Popuptext aus der Konsole in Popup am Marker ermöglicht!!! :D YUHUUU
            }
        },
        pointToLayer : function(geoJsonPoint, latlng) {
            if (datenAttribute.icon) {
                return L.marker(latlng, {
                    icon : L.icon({//l.icon wird hier neu festgelegt
                        iconUrl : datenAttribute.icon,
                        iconAnchor : [16, 32], // Größe der icons = 32*32, und Anchor wird immer am link oberen Eck gesetzt
                        popupAnchor : [0, -32], //immer ausgehend vom iconAnchor
                    }) 
                })
            } else {
                return L.marker(latlng); //wenn kein Icon hinterlegt ist, einfach ein normaler Marker an der Stelle latlbng
            }
        }
    });
    geojsonGruppe.addLayer(geojsonObjekt);
    karte.fitBounds(geojsonGruppe.getBounds());
}

wienDatensaetze.sort(function (a, b) {
    if (a.titel < b.titel) {
        return -1;
    } else if (a.titel > b.titel) {
        return 1;
    } else {
        return 0;
    }
}
)
// den GeoJSON Layer für Grillplätze laden
ladeGeojsonLayer(wienDatensaetze[0]);

let layerAuswahl = document.getElementById("layerAuswahl"); // > Zugriff auf das Select, das in HTML festgelegt wurde
for (let i=0; i<wienDatensaetze.length; i++) {
    layerAuswahl.innerHTML += `<option value="${i}">${wienDatensaetze[i].titel}</option>`
    console.log(i,wienDatensaetze[i].titel)
}
layerAuswahl.onchange = function (evt) {
    geojsonGruppe.clearLayers();
    let i = evt.target.value; //codiert anderes i wie oben!
   // console.log(i,wienDatensaetze[i])
    ladeGeojsonLayer(wienDatensaetze[i]);
}

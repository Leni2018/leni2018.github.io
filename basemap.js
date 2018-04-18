
let myMap = L.map('mapdiv');
// Variable heißt myMap; L verweist auf Leaflet-Bibliothek > über map wird neue Karte gemacht; ihr wird mit "mapdiv" die div zugewiesen, die im html-File schon vorhanden ist
let myLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'); // Link in dem Fall händisch eingegeben
myMap.addLayer(myLayer); // hier werden die beiden vorher definierten Variablen kombiniert > Layer wird an Karte angehängt
myMap.setView([47.267,11.383], 11); //Eckige Klammern > für Koordinaten, Zahl dahinter: Zoomgröße
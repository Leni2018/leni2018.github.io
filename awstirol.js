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
    "basemap.at Orthofoto":myLayers.bmaporthofoto30cm,
    
},
{  "Marker" : markerGroup,
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

const markerOptions = {
    opacity: 1.0,
} 
//const bindPopup = {
  //  maxWidth: 300,
   // maxHight: 0.7,
//}

// Methode. Copy & Paste. Habe versucht, das eleganter zu lösen, hat aber nicht geklappt - ich hoff, wir schauen uns das in der VL noch mal an :)
const Gehrenspitze = [47.387131, 11.133717]; 
L.marker(Gehrenspitze, markerOptions).addTo(markerGroup).bindPopup ("<p>Gehrenspitze</p><p>Temperatur : 0.6, am 2018-04-26</p><a href = 'https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png'> Link zur Grafik </a>");

const Hafelekar = [47.312079, 11.383623];
L.marker(Hafelekar, markerOptions).addTo(markerGroup).bindPopup ("<p>Hafelekar</p><p>Temperatur : 1.6, am 2018-04-26</p><a href = 'https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png'> Link zur Grafik </a>");

const HoheMundeGipfel = [47.346295, 11.080385];
L.marker(HoheMundeGipfel, markerOptions).addTo(markerGroup).bindPopup ("<p>Hohe Munde Gipfel</p><p>Temperatur : 1.6, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png> Link zu Grafik </a>");

const HoheMundeWindstation = [47.346612, 11.083694];
L.marker(HoheMundeWindstation, markerOptions).addTo(markerGroup).bindPopup ("<p>Hohe Munde Windstation</p><p>Temperatur : -4.1, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png> Link zu Grafik </a>");

const NassereithWannig = [47.336922, 10.862333];
L.marker(NassereithWannig, markerOptions).addTo(markerGroup).bindPopup ("<p>Nassereith Wannig</p><p>Temperatur : -1.2, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png> Link zu Grafik </a>");

const NassereithAlm = [47.344376, 10.849554];
L.marker(NassereithAlm, markerOptions).addTo(markerGroup).bindPopup ("<p>Nassereither Alm</p><p>Temperatur : 4, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png> Link zu Grafik </a>");

const Puitegg = [47.394844, 11.152817];
L.marker(Puitegg, markerOptions).addTo(markerGroup).bindPopup ("<p>Puitegg</p><p>Temperatur : 5.3, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png> Link zu Grafik </a>");

const Rauthhütte = [47.345909, 11.104943];
L.marker(Rauthhütte, markerOptions).addTo(markerGroup).bindPopup ("<p>Rauthhütte</p><p>Temperatur : 11.7, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png> Link zu Grafik </a>");

const RosshütteWindstation = [47.342025, 11.227903];
L.marker(RosshütteWindstation, markerOptions).addTo(markerGroup).bindPopup ("<p>Rosshütte Windstation</p><p>Temperatur : 4.1, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rosshuette.png> Link zu Grafik </a>");

const Seegrube = [47.3063819943737, 11.3779335010812];
L.marker(Seegrube, markerOptions).addTo(markerGroup).bindPopup ("<p>Seegrube</p><p>Temperatur : 3.1, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png> Link zu Grafik </a>");

const Dalfazkamm = [47.448514, 11.751511];
L.marker(Dalfazkamm, markerOptions).addTo(markerGroup).bindPopup ("<p>Dalfazkamm</p><p>Temperatur : 0.4, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png> Link zu Grafik </a>");

const Erfurterhütte = [47.441861, 11.762127];
L.marker(Erfurterhütte, markerOptions).addTo(markerGroup).bindPopup ("<p>Erfurterhütte</p><p>Temperatur : 2.4, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png> Link zu Grafik </a>");

const Agetwoad = [47.069889, 10.862306];
L.marker(Agetwoad, markerOptions).addTo(markerGroup).bindPopup ("<p>Agetwoad</p><p>Temperatur : 1.5, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/agetwoad.png> Link zu Grafik </a>");

const BreiterGrieskogelSchneestation = [47.0839527777778, 11.0273833333333];
L.marker(BreiterGrieskogelSchneestation, markerOptions).addTo(markerGroup).bindPopup ("<p>Breiter Grieskogel Schneestation</p><p>Temperatur : 1.1, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png> Link zu Grafik </a>");

const BreiterGrieskogelWindstation = [47.1010555555556, 11.0230388888889];
L.marker(BreiterGrieskogelWindstation, markerOptions).addTo(markerGroup).bindPopup ("<p>Breiter Grieskogel Windstation</p><p>Temperatur : -3.4, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png> Link zu Grafik </a>");

const Falkaunsalpe = [47.071488, 11.76282];
L.marker(Falkaunsalpe, markerOptions).addTo(markerGroup).bindPopup ("<p>Falkaunsalpe</p><p>Temperatur : 2.2, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png> Link zu Grafik </a>");

const FranzSennHütteHorntalerSpitzl = [47.099611, 11.15541667];
L.marker(FranzSennHütteHorntalerSpitzl, markerOptions).addTo(markerGroup).bindPopup ("<p>Franz-Senn-Hütte Horntaler Spitzl</p><p>Temperatur : 4.3, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png> Link zu Grafik </a>");

const FranzSennHütteKlHorntal = [47.0960000187559, 11.1623888694066];
L.marker(FranzSennHütteKlHorntal, markerOptions).addTo(markerGroup).bindPopup ("<p>Franz-Senn-Hütte Kl Horntal</p><p>Temperatur : 5.5, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png> Link zu Grafik </a>");

const LampsenspitzeSchneestation = [47.153491, 11.120722];
L.marker(LampsenspitzeSchneestation, markerOptions).addTo(markerGroup).bindPopup ("<p>Lampsenspitze Schneestation</p><p>Temperatur : 1.7, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png> Link zu Grafik </a>");

const LampsenspitzeWindstation = [47.156075, 11.095642];
L.marker(LampsenspitzeWindstation, markerOptions).addTo(markerGroup).bindPopup ("<p>Lampsenspitze Windstation</p><p>Temperatur : -0.8, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png> Link zu Grafik </a>");

const RoterSchrofen = [47.04, 11.7181];
L.marker(RoterSchrofen, markerOptions).addTo(markerGroup).bindPopup ("<p>Roter Schrofen</p><p>Temperatur : -1, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png> Link zu Grafik </a>");

const SchlickerAlm = [47.154432, 11.303207];
L.marker(SchlickerAlm, markerOptions).addTo(markerGroup).bindPopup("<p>Schlicker Alm</p><p>Temperatur : 6.5, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png> Link zur Grafik </a>");

const SeirlöcherKogel = [47.0339, 11.8528];
L.marker(SeirlöcherKogel, markerOptions).addTo(markerGroup).bindPopup("<p>Seirlöcher Kogel</p><p>Temperatur : 0, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seirloecherkogel.png> Link zur Grafik </a>");

const Lämmerbichlalm = [47.181266, 11.751717];
L.marker(Lämmerbichlalm, markerOptions).addTo(markerGroup).bindPopup ("<p>Lämmerbichlalm</p><p>Temperatur : 3, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png> Link zu Grafik </a>");

const RastkogelWindstation = [47.192132, 11.767481];
L.marker(RastkogelWindstation, markerOptions).addTo(markerGroup).bindPopup ("<p>Rastkogel Windstation</p><p>Temperatur : 0.1, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png> Link zu Grafik </a>");

const Sonntagskoepfl = [47.2750109996958, 11.7520860028295];
L.marker(Sonntagskoepfl, markerOptions).addTo(markerGroup).bindPopup ("<p>Rastkogel Sonntagsköpfl</p><p>Temperatur : 1.2, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png> Link zu Grafik </a>");

const SonntagskoepflWindstation = [47.271989, 11.755802];
L.marker(SonntagskoepflWindstation, markerOptions).addTo(markerGroup).bindPopup ("<p>Rastkogel Sonntagsköpfl Windstation</p><p>Temperatur : 3.3, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png> Link zu Grafik </a>");

const TuxerjochSchneestation = [47.093149, 11.648053];
L.marker(TuxerjochSchneestation, markerOptions).addTo(markerGroup).bindPopup ("<p>Tuxerjoch Schneestation</p><p>Temperatur : 6, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png> Link zu Grafik </a>");

const TuxerjochWindstation = [47.089717, 11.648987];
L.marker(TuxerjochWindstation, markerOptions).addTo(markerGroup).bindPopup ("<p>Tuxerjoch Windstation</p><p>Temperatur : 1.5, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png> Link zu Grafik </a>");

const WandspitzeSchneestation = [47.121858, 11.661969];
L.marker(WandspitzeSchneestation, markerOptions).addTo(markerGroup).bindPopup ("<p>Wandspitze Schneestation</p><p>Temperatur : 1.3, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png> Link zu Grafik </a>");

const WandspitzeWindstation = [47.120752, 11.658062];
L.marker(WandspitzeWindstation, markerOptions).addTo(markerGroup).bindPopup ("<p>Wandspitze Windstation</p><p>Temperatur : -0.3, am 2018-04-26</p><a href = https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png> Link zu Grafik </a>");


myMap.addLayer(markerGroup);

myMap.fitBounds(markerGroup.getBounds());myMap.fitBounds(markerGroup.getBounds());


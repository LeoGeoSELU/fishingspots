var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
    thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    osmAttrib = 'LeoGeo' + '&copy; ' + osmLink + ' Contributors',
    landUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
    thunAttrib = '&copy; ' + osmLink + ' Contributors & ' + thunLink;

var osmMap = L.tileLayer(osmUrl, {
        attribution: osmAttrib
    }),
    landMap = L.tileLayer(landUrl, {
        attribution: thunAttrib
    });

function wmpaFeatureControl(feature, layer) {
    layer.bindPopup("<b>Location:</b>" + feature.properties.Type + '<br><b>Coordinates:</b> ' + layer.feature.geometry.coordinates[0] + ', ' + layer.feature.geometry.coordinates[1]);
};

function marinaFeatureControl(feature, layer) {
    layer.bindPopup("<b>Location:</b>" + feature.properties.name + '<br><b>Coordinates:</b> ' + layer.feature.geometry.coordinates[0] + ', ' + layer.feature.geometry.coordinates[1]);
};
//var city = L.OWM.current({type:'city',appId:'3f2e6b6d74818078d935342ad0ca9325',popup: true,temperatureUnit: 'C'});
var WMAPpoints = new L.layerGroup();
var MarinasPoints = new L.layerGroup();
var wmapLayer = L.geoJson(mapData, {
    onEachFeature: wmpaFeatureControl
}).addTo(WMAPpoints);
var MarinaLayer = L.geoJson(MarinaData, {
    onEachFeature: marinaFeatureControl
}).addTo(MarinasPoints);

var mymap = L.map('mapid', {
    layers: [osmMap]
}).setView([30.13919, -89.6527], 11);
var baseLayers = {
    "OSM": osmMap,
    "landscape": landMap
};
var overlays = {
    "Wildlife Management Area": WMAPpoints,
    "Marina": MarinasPoints
        //"City": city
};
L.control.layers(baseLayers, overlays).addTo(mymap);


//var coords = [30.17, -89.6838];
//var marker = L.marker(coords).addTo(mymap);

$(document).ready(function () {

    $.ajax({
        url: "http://localhost:8000/api/basescore/?format=json",
        type: 'GET',
        dataType: "json",
        crossDomain: true,
        success: function (data) {
            handleGeoJson(data.results.features);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error with ajax...running faker data now.");

            var features = [

                {
                "type": "Feature",
                "properties": {
                    "name": "Lake Saint Catherine",
                    "score": 11.57
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-89.732208251952, 30.133781433107]
                }
            }, {
                "type": "Feature",
                "properties": {
                    "name": "Lake Borgne",
                    "score": 10
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-89.58869934082, 30.081939697266]
                },
            }, {
                "type": "Feature",
                "properties": {
                    "name": "Rabbit Island",
                    "score": 16
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-89.669381529094, 30.139716491105]
                },

            }];




            handleGeoJson(features);
        }
    });
})

function handleGeoJson(data) {

    var geojsonMarkerOptions = {

        radius: 8,
        weight: 1,
        opacity: 1,
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
    };

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.name + '<br><b>Score: </b>' + layer.feature.properties.score + '<br><b>Coordinates:</b> ' + layer.feature.geometry.coordinates[0] + ', ' + layer.feature.geometry.coordinates[1] + '<br><a href="https://twitter.com/intent/tweet?text= Hi, ' + layer.feature.properties.name + " has a score of " + layer.feature.properties.score + " with coordinates " + layer.feature.geometry.coordinates[0] + "," + layer.feature.geometry.coordinates[1] + '">Tweet</a>';
    }).addTo(mymap);
    L.easyPrint({
        title: 'Print Map',
        elementsToHide: '#fsmenu',
        position: 'topleft'
    }).addTo(mymap);
    var drawnItems = new L.FeatureGroup();
    mymap.addLayer(drawnItems);

    var drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
            polygon: {
                shapeOptions: {
                    color: 'purple'
                },
            },
            polyline: {
                shapeOptions: {
                    color: 'red'
                },
            },
            rect: {
                shapeOptions: {
                    color: 'green'
                },
            },
            circle: {
                shapeOptions: {
                    color: 'steelblue'
                },
            },
        },


        edit: {
            featureGroup: drawnItems
        }
    });
    mymap.addControl(drawControl);

    mymap.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;
        drawnItems.addLayer(layer);
    });
    lc = L.control.locate({

        strings: {
            title: "Show me where I am, yo!"
        },
        position: 'topleft'
    }).addTo(mymap);

    function createButton(msg) {

        var tweetDiv = document.querySelector(".twitter-share-button");
        var link = document.createElement("a");

        link.setAttribute("href", "https://twitter.com/share");
        link.setAttribute("class", "twitter-share-button");
        link.setAttribute('id', 'twitter');
        link.setAttribute("data-text", "" + msg + "");
        link.setAttribute("data-size", "large");
        tweetDiv.parentNode.replaceChild(link, tweetDiv);
        twttr.widgets.load();
    }


    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        var p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + '://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    })(document, 'script', 'twitter-wjs');

    //    L.geoJSON(data, {
    //        style: function (feature) {
    //            return {color: feature.properties.color};
    //        }
    //    }).bindPopup(function (layer) {
    //        return layer.feature.properties.description;
    //    }).addTo(mymap);

    $(data).each(function (key, data) {
        // do stuff
        console.log(data.properties.name);

        var fsid = "fs" + $("#fsmenu").children("li").length;
        //        $("#" + fsid).click(function(){
        //            alert(data.properties.name);
        //        });
        console.log(fsid);
        L.marker(data.geometry.coordinates).addTo(mymap);

        $("#fsmenu").append("<li id=\"" + fsid + " class=\"collection-item\"><button class=\"waves-effect waves-cyan btn-flat\" disabled>" + data.properties.name + "</button></li>");
    })

}

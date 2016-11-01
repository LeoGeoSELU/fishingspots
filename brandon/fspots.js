var mymap = L.map('mapid').setView([30.17, -89.6838], 13); 

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'LionGIS'
}).addTo(mymap);

var circle = L.circle([30.17, -89.6838], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);
circle.bindPopup("Location");

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

$(document).ready(function() {

    $.ajax({
        url: "http://localhost:8000/api/basescore/?format=json",
        type: 'GET',
        dataType: "json",
        crossDomain: true,
        success: function(data) {
            handleGeoJson(data.results.features);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error with ajax...running faker data now.");

            var features = [{
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
                }
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
        return layer.feature.properties.name
            + '<br>Score: ' + layer.feature.properties.score
            + '<br>Coordinates: ' + layer.feature.geometry.coordinates[0]
            + ', ' + layer.feature.geometry.coordinates[1];
    }).addTo(mymap);
//    L.geoJSON(data, {
//        style: function (feature) {
//            return {color: feature.properties.color};
//        }
//    }).bindPopup(function (layer) {
//        return layer.feature.properties.description;
//    }).addTo(mymap);

    $(data).each(function(key, data){
     // do stuff
        console.log(data.properties.name);

        var fsid = "fs" + $("#fsmenu").children("li").length;
        console.log(fsid);
//        marker = L.marker(data.geometry.coordinates).addTo(mymap);
//        marker.bindPopup(data.properties.name);
        var circle = L.circle(data.geometry.coordinates, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(mymap);
        circle.bindPopup("Location");
        
        $("#fsmenu").append("<li id=\"" + fsid + " class=\"collection-item\"><a class=\"waves-effect waves-cyan btn-flat\">" + data.properties.name + "</a></li>");
    })
}

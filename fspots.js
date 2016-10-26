var mymap = L.map('mapid').setView([30.17, -89.6838], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'LeoGeo'
}).addTo(mymap);

var coords = [30.17, -89.6838];
var marker = L.marker(coords).addTo(mymap);

$(document).ready(function() {

    $.ajax({
        url: "http://localhost:8000/api/basescore/?format=json",
        type: 'GET',
        dataType: "json",
        crossDomain: true,
        success: function(data) {

            L.geoJSON(data.results, {
                style: function (feature) {
                    return {color: feature.properties.color};
                }
            }).bindPopup(function (layer) {
                return layer.feature.properties.description;
            }).addTo(mymap);

            $(data.results.features).each(function(key, data){
             // do stuff
                console.log(data.properties.name);


                var fsid = "fs" + $("#fsmenu").children("li").length;
                console.log(fsid);
                L.marker(data.geometry.coordinates).addTo(mymap);
                // alert($("#fsmenu").children("li"));
                $("#fsmenu").append("<li id=\"" + fsid + " class=\"collection-item\"><a class=\"waves-effect waves-cyan btn-flat\">" + data.properties.name + "</a></li>");
    //                 console.log(data.properties.name);
    //                 console.log(data.properties.lat);
    //                 console.log(data.properties.lon);
    //                 console.log(data.properties.score);
    //                 console.log(data.geometry.coordinates);
        });
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error with ajax...running faker data now.")
//             alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');
//
//             $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
//             console.log('jqXHR:');
//             console.log(jqXHR);
//             console.log('textStatus:');
//             console.log(textStatus);
//             console.log('errorThrown:');
//             console.log(errorThrown);

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

            L.geoJSON(features, {
                style: function (feature) {
                    return {color: feature.properties.color};
                }
            }).bindPopup(function (layer) {
                return layer.feature.properties.description;
            }).addTo(mymap);

             $(features).each(function(key, data){
                 // do stuff
                 console.log(data.properties.name);


                 var fsid = "fs" + $("#fsmenu").children("li").length;
                 console.log(fsid);
                 L.marker(data.geometry.coordinates).addTo(mymap);
                 // alert($("#fsmenu").children("li"));
                 $("#fsmenu").append("<li id=\"" + fsid + " class=\"collection-item\"><a class=\"waves-effect waves-cyan btn-flat\">" + data.properties.name + "</a></li>");

             });


        }

    });
})

var mymap = L.map('mapid').setView([30.17, -89.6838], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'LeoGeo'
}).addTo(mymap);

var coords = [30.17, -89.6838];
var marker = L.marker(coords).addTo(mymap);

//
// var getData(function(data)){
//   var Fspots = data.Fspots;
//   var spot;
//   for (spot in Fspots){
//     var marker = L.marker(coords).addTo(mymap);
//   }
// }



//
// for (var i = 0; i < data.length; i++ )
// {
//   document.write("<br><br>array index: " + i);
//   var obj = data[i];
//   for (var key in obj)
//   {
//     var value = obj[key];
//     document.write("<br> -" key + ": " + value);
//   }
// }
$(document).ready(function() {

    // $.ajax({
    //     dataType: "json",
    //     type: 'GET',
    //     crossDomain: false,
    //     url: "http://localhost:8000/api/basescore/1/?format=json",
    //     success: function(data) {
    //         $(data).each(function(key, data){
    //             // do stuff
    //             var fsid = "fs" + $("#fsmenu").children("li").length;
    //             console.log(fsid);
    //             // alert($("#fsmenu").children("li"));
    //             $("#fsmenu").append("<li id=\"" + fsid + " class=\"collection-item\"><a class=\"waves-effect waves-cyan btn-flat\">" + data.properties.name + "</a></li>");
    //             console.log(data.properties.name);
    //             console.log(data.properties.lat);
    //             console.log(data.properties.lon);
    //             console.log(data.properties.score);
    //             console.log(data.geometry.coordinates);
    //         });
    //     },
    //     error: function(jqXHR, textStatus, errorThrown) {
    //         alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

    //         $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
    //         console.log('jqXHR:');
    //         console.log(jqXHR);
    //         console.log('textStatus:');
    //         console.log(textStatus);
    //         console.log('errorThrown:');
    //         console.log(errorThrown);
    //     },
    // });

});

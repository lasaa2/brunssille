
var map;
var marker;
var jsonUrl = "aineisto.json"; // define material
var jsonResult;
var infowindow;

var center = {lat: 64.496618, lng: 22.874146};

var centerKempele = {lat: 64.912832, lng: 25.505908}
var tampereCoord = {lat: 61.517940, lng: 23.755373};
var helsinkiCoord = {lat: 60.169889, lng: 24.938628}
var mapTypeId = 'terrain';

function initMap() {

    var mapProperties = {
        center: centerKempele,
        zoom: 5,
        mapTypeId: mapTypeId,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false

    }


    // Define map object
    map = new google.maps.Map(document.getElementById('map'), mapProperties);

    // call markers function
    markers();

    var tampere = document.getElementById('tampere');
    var helsinki = document.getElementById('helsinki');
    var home = document.getElementById('home');

    google.maps.event.addDomListener(tampere, 'click', function() {
        map.setZoom(10);
        map.setCenter(tampereCoord);
    });
    google.maps.event.addDomListener(helsinki, 'click', function() {
        map.setZoom(10);
        map.setCenter(helsinkiCoord);
    });
    google.maps.event.addDomListener(home, 'click', function() {
        map.setZoom(5);
        map.setCenter(center);
    });

}

function setTampere() {
    map.setZoom(10);
}


function markers() {

    // Read GeoJSON and put info to marker

    $(document).ready(function() {

        console.log("ready");

        // getJSON funktio, json annetaan metodille json muuttujalla osoite jossa tiedostot
        // result muuttujalla annetaan funktiolle metodista tulevat tulokset käyttöön

        $.getJSON(jsonUrl, function(result){

            jsonResult = result;

            // console.log(result); // toimii

            // console.log(result.length); // toimii: 52

            // console.log(result[0].LAT, result[0].LON);

            // console.log(new google.maps.LatLng(result[0].LAT, result[0].LON));

            // Käydään foreach lauseella result json muuttuja läpi
            for (let i = 0; i < result.length; i++) {
                
                var latlng = new google.maps.LatLng(result[i].LAT, result[i].LON);
                var title = result[i].KARTTA;

                //var latlng = new google.maps.LatLng(result[i]);

                // console.log(latlng);

                var contentInfowindow = '<div id="infowindow"><h3>' + result[i].KARTTA + '</h3><p>' + result[i].KUNTA + '</p><p>' + result[i].LISAA + '</p><p><a target="_blank" href="' + result[i].WEB + '">' + result[i].WEB + '</a></p></div>'; // Define marker content.


                var markerProperties = { // Make marker preferences
                    position: latlng,
                    map: map,
                    title: title,
                    infoString: contentInfowindow
                }

                infowindow = new google.maps.InfoWindow({
                    content: contentInfowindow, // Define infowindow
                    maxWidth: 200 // Define window to maxwidth
                });

                var marker = new google.maps.Marker(markerProperties);

                marker.addListener('click', function() {
                    infowindow.setContent(this.infoString); // mihin "this" viittaa?
                    infowindow.open(map, this);
                    map.setCenter(this.getPosition());
                    map.setZoom(14);
                });

                google.maps.event.addListener(map, 'click', function() {
                    infowindow.close();
                });

                // console.log(markerProperties);
            }
        });
    });
}

/* TODO: Add enter function to searchbox */

/* search json data "KARTTA", recenter and rezoom if finded */ 
function searchJSON() {

    var searchBox = document.getElementById('searchBox').value;

        for (let i = 0; i < jsonResult.length; i++) {
            if (searchBox === jsonResult[i].KARTTA) {
                var newCenter = {lat: jsonResult[i].LAT, lng: jsonResult[i].LON};
                map.setCenter(newCenter);
                map.setZoom(14);
                break;
            }
        }
}
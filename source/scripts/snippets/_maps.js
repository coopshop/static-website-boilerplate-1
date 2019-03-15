import L from "leaflet";
import {GestureHandling} from "leaflet-gesture-handling";

L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

// Fix from here: https://github.com/KoRiGaN/Vue2Leaflet/issues/28
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.imagePath = wp_theme_url + '/assets/images/';
L.Icon.Default.mergeOptions({
    iconUrl:        L.Icon.Default.imagePath + 'pin.svg',
    iconRetinaUrl:  L.Icon.Default.imagePath + 'pin.svg',
    shadowUrl:      false,
    iconSize:       [37, 48],
    iconAnchor:     [18.5, 48],
    popupAnchor:    [0, -48],
});

var mapBoxToken = 'pk.eyJ1IjoiMTNncmFkIiwiYSI6ImNqdDVmM2d5ajA1Y2wzenJ1YjJ0cjJ2MDQifQ.pHhKf75zy1cfXxoRh8fY3Q',
    mapBoxStyle = '13grad/cjpxwcndg0lke2sqigckii6do',
    mapBoxUrl   = 'https://api.mapbox.com/styles/v1/{mapBoxStyle}/tiles/256/{z}/{x}/{y}?access_token={accessToken}';

document.querySelectorAll('.bulding-map').forEach(function(mapElement){

    var locations   = mapElement.querySelectorAll('.bulding-map-location'),
        coordsArray = [];

    let map = L.map(mapElement, {
        zoomControl: false,
        gestureHandling: true
    });

    L.tileLayer(mapBoxUrl, {
        attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a> | <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/" target="_blank">Karte verbessern</a>',
        accessToken: mapBoxToken,
        mapBoxStyle: mapBoxStyle,
    }).addTo(map);

    locations.forEach(function(locationElement){

        var location        = JSON.parse(locationElement.dataset.location),
            locationCoords  = L.latLng(location.latitude, location.longitude),
            locationContent = '<h6>' + location.title + '</h6><p><a href="' + location.url + '" title="' + location.title + '">mehr</a></p>';

            coordsArray.push(locationCoords);

        L.marker(locationCoords).bindPopup(locationContent, {
            className: 'map-marker-popup'
        }).addTo(map);

    });

    map.fitBounds(new L.LatLngBounds(coordsArray), {
        maxZoom: 15
    });

});

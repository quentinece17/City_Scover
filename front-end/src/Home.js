
/** @jsxImportSource @emotion/react */
var platform = new H.service.Platform({
    'apikey': 'uEPKsGh4MqeMDColZwJ8PdS-GPfGKYx03_A4SbyB0_I'
  });

var myPosition = {lat:52.53086, lng:13.38374};

var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        zoom: 10,
        center: myPosition
});

var mapEvents = new H.mapevents.MapEvents(map);

var behavior = new H.mapevents.Behavior(mapEvents);

map.getViewModel().setLookAtData({
    tilt: 60,
    heading: 90
});

function getBrowserLocation(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords);
            let browserPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
            let marker = new H.map.Marker(browserPosition);
            map.addObject(marker);
        });
    } else {
        alert("Geolocation is not supported by this browser!");
    }
}

getBrowserLocation();

map.addEventListener('tap', function(evt) {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type); 
});
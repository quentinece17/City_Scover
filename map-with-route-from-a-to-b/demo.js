/**
 * This function allows to convert the start address into coordinates
 * @param {H.service.Platform} platform 
 * @param {startPosition} position 
 */
 function geocodeStart(platform, position) {
  var geocoder = platform.getSearchService(),
      geocodingParameters = {
        q: position,
       
      };
  
  geocoder.geocode(
    geocodingParameters,
    onSuccessGeoStart,
    onError
  );
}

/**
 * This function allows to convert the destination address into coordinates
 * @param {H.service.Platform} platform 
 * @param {endPosition} position 
 */
function geocodeEnd(platform, position) {
  var geocoder = platform.getSearchService(),
      geocodingParameters = {
        q: position,
      };

  geocoder.geocode(
    geocodingParameters,
    onSuccessGeoEnd,
    onError
  );
}

var startPosition, endPosition
let startLat, startLong, endLat, endLong

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

//make sure the queries are limited to paris

var latbounds = [48.821974,48.892040];
var lngbounds =[2.264675,2.413204];

var interestArray = new Array ()


/**
 * This function is called when the Geocoder REST API provides a response
 * @param {Object} result 
 */
function onSuccessGeoStart(result) {

  var locations = result.items;
  startLat = locations[0].position.lat
  startLong = locations[0].position.lng
  
  if(startLat < latbounds[0] || startLat > latbounds[1] || startLong < lngbounds[0] || startLong > lngbounds[1])
  {
    alert("départ pas à Paris !")
  }
  else{
    geocodeEnd(platform, endPosition);
  }
  
  }

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

/**
 * This function is called when the Geocoder REST API provides a response
 * @param {Object} result 
 */
async function onSuccessGeoEnd(result) {

  var locations = result.items;
  endLat = locations[0].position.lat
  endLong = locations[0].position.lng

  if(endLat < latbounds[0] || endLat > latbounds[1] || endLong < lngbounds[0] || endLong > lngbounds[1])
  {
    alert("arrivée pas à Paris !")
  }
  else{
    //Recherche des lieux d'intérêts à proximité à inclure comme étape dans le calcul d'itinéraire
    map.removeObjects(map.getObjects())
    placesSearch(platform);
    await sleep(2000);
    calculateRouteFromAtoB(platform);
  }
}

/**
 * Calculates and displays a route from the starting point to the destination point
 * @param {H.service.Platform} platform A stub class to access HERE services
 */
function calculateRouteFromAtoB(platform) {

  //Find the Transport Mode
  var car = document.getElementById('car').checked;
  var pedestrian = document.getElementById('pedestrian').checked;
  var bicycle = document.getElementById('bicycle').checked;

  var modeTransport;

  if (car==true) {modeTransport="car"}
  else if (pedestrian==true) {modeTransport="pedestrian"}
  else if (bicycle==true) {modeTransport="bicycle"}

  //Find the Route type
  var fastest = document.getElementById('fastest').checked;
  var shortest = document.getElementById('shortest').checked;

  var typeTransport;

  if (fastest==true) {typeTransport="fast"}
  else if (shortest==true) {typeTransport="short"}

  console.log(interestArray)

  var waypoints = [
    `${interestArray[0].coords.lat},${interestArray[0].coords.lng}`,
    `${interestArray[1].coords.lat},${interestArray[1].coords.lng}`,
    `${interestArray[2].coords.lat},${interestArray[2].coords.lng}`,
    `${interestArray[3].coords.lat},${interestArray[3].coords.lng}`
  ];

  //Sending the request to calculate the route
  var router = platform.getRoutingService(null, 8),
  routeRequestParams = {
    lang:'fr-fr',
    routingMode: `${typeTransport}`,
    transportMode: `${modeTransport}`,
    origin: `${startLat},${startLong}`, 
    via: new H.service.Url.MultiValueQueryParameter( waypoints ),
    destination: `${endLat},${endLong}`, 
    return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
  };

  router.calculateRoute(
  routeRequestParams,
  onSuccess,
  onError
  );
}

/**
 * This function will be called once the Routing REST API provides a response
 * @param {Object} result A JSONP object representing the calculated route
 *
 */
function onSuccess(result) {

  var route = result.routes[0];

  addRouteShapeToMap(route);
  addManueversToMap(route);
  addWaypointsToPanel(route);
  addManueversToPanel(route);
  addSummaryToPanel(route);
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param {Object} error The error message received.
 */
function onError(error) {
  alert('Can\'t reach the remote server');
}

/**
 * The map initialization code starts below:
 */

// set up container for the routing info
var infoContainer = document.getElementById('info');

// set up containers for the map + panel
var mapContainer = document.getElementById('map'),
  routeInstructionsContainer = document.getElementById('panel');

// Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: '8eA9P7gXzL-xr9fntkk5Cje9sTdQuK2XPuM9EJj_aGw'
});

var defaultLayers = platform.createDefaultLayers({
  lg:'fr'
});

// Step 2: initialize a map - this map is centered over Paris
var map = new H.Map(mapContainer,
  defaultLayers.vector.normal.map, {
  center: {lat: 48.8588897, lng: 2.320041},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

var gpsIcon = new H.map.Icon("https://cdn0.iconfinder.com/data/icons/interface-solid-1/48/Gps_navigation_location-512.png", { size: { w: 30, h: 30}});
//var gpsIcon = new H.map.Icon('https://picfiles.alphacoders.com/517/517442.png', { size: { w: 52, h: 52}});
//var intervalId = window.setInterval(function(){
navigator.geolocation.getCurrentPosition(success, error, options);
//}, 10000);

// Hold a reference to any infobubble opened
var bubble;

/**
 * Open/Close an info bubble for the current position
 * @param {H.geo.Point} position The location on the map.
 * @param {String} text          The contents of the infobubble.
 */
function openBubble(position, text) {
  if (!bubble) {
    bubble = new H.ui.InfoBubble(
      position,
      // The FO property holds the province name.
      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}

/**
 * Creates a H.map.Polyline from the shape of the route and adds it to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addRouteShapeToMap(route) {
  route.sections.forEach((section) => {
   
    // decode LineString from the flexible polyline
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    // Create a polyline to display the route:
    let polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(0, 128, 255, 0.7)'
      }
    });

    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    map.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox()
    });
  });
 
}

/**
 * Creates a series of marker points (representing different steps of the route) from the route and adds them to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addManueversToMap(route) {

  // var svgMarkup = '<svg width="18" height="18" ' +
  //   'xmlns="http://www.w3.org/2000/svg">' +
  //   '<circle cx="8" cy="8" r="8" ' +
  //     'fill="#1b468d" stroke="white" stroke-width="1" />' +
  //   '</svg>',
  //   dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
  //   group = new H.map.Group(),
  //   i,
  //   j;

  var startMarkLoc = { lat: startLat, lng: startLong};
  var endMarkLoc = { lat: endLat, lng: endLong};

  var startIcon = new H.map.Icon("https://cdn1.iconfinder.com/data/icons/zoldo-miscellaneous-005/64/start_marker_flag-1024.png", { size: { w: 52, h: 52}});
  var endIcon = new H.map.Icon("https://cdn0.iconfinder.com/data/icons/basic-uses-symbol-vol-2/100/Flag_Mission_Start_Finish_Goal-1024.png", { size: { w: 52, h: 52}});

  var startMarkeur = new H.map.Marker(startMarkLoc, { icon: startIcon});
  var endMarkeur = new H.map.Marker(endMarkLoc, { icon: endIcon});

  var group = new H.map.Group();
  group.addObjects([startMarkeur, endMarkeur]);
  map.addObject(group);

  // route.sections.forEach((section) => {
  //   let poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();

  //   let actions = section.actions;
  //   // Add a marker for each maneuver
  //   for (i = 0; i < actions.length; i += 1) {
  //     let action = actions[i];
  //     var marker = new H.map.Marker({
  //       lat: poly[action.offset * 3],
  //       lng: poly[action.offset * 3 + 1]},
  //       {icon: dotIcon});
  //     marker.instruction = action.instruction;
  //     group.addObject(marker);
  //   }

  //   //Open a bubble if thte user clik on the marker
  //   group.addEventListener('tap', function (evt) {
  //     map.setCenter(evt.target.getGeometry());
  //     openBubble(evt.target.getGeometry(), evt.target.instruction);
  //   }, false);

  //   // Add the maneuvers group to the map
  //   map.addObject(group);
  // });
}

/**
 * Display the waypoints to the panel (start, destination, waypoints...)
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addWaypointsToPanel(route) {
  var nodeH3 = document.createElement('h3'),
    labels = [];

  labels.push(startPosition);
  
  for(let i = 0; i < interestArray.length; i += 1) {
    labels.push(interestArray[i].name);
  }

  labels.push(endPosition);

  nodeH3.textContent = labels.join(' - ');
  routeInstructionsContainer.innerHTML = '';
  routeInstructionsContainer.appendChild(nodeH3);
}

/**
 * Display the differents steps of the route to the panel
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addSummaryToPanel(route) {
  let duration = 0,
    distance = 0;

  route.sections.forEach((section) => {
    distance += section.travelSummary.length;
    duration += section.travelSummary.duration;
  });

  var summaryDiv = document.createElement('div'),
    content = '<b>Distance totale</b>: ' + distance + 'm. <br />' +
      '<b>Durée du trajet</b>: ' + toMMSS(duration) + ' (avec le traffic actuel)';

  summaryDiv.style.fontSize = 'small';
  summaryDiv.style.marginLeft = '5%';
  summaryDiv.style.marginRight = '5%';
  summaryDiv.innerHTML = content;
  routeInstructionsContainer.appendChild(summaryDiv);
}

/**
 * Display the total distance and the travel time to the panel
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addManueversToPanel(route) {
  var nodeOL = document.createElement('ol');

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';
  nodeOL.className = 'directions';

  route.sections.forEach((section) => {
    section.actions.forEach((action, idx) => {
      var li = document.createElement('li'),
        spanArrow = document.createElement('span'),
        spanInstruction = document.createElement('span');

      spanArrow.className = 'arrow ' + (action.direction || '') + action.action;
      spanInstruction.innerHTML = section.actions[idx].instruction;
      li.appendChild(spanArrow);
      li.appendChild(spanInstruction);

      nodeOL.appendChild(li);
    });
  });

  routeInstructionsContainer.appendChild(nodeOL);
}

function toMMSS(duration) {
  return Math.floor(duration / 60) + ' minutes et ' + (duration % 60) + ' secondes';
}

// /*
//  * This function allows to find some places around a position
//  * @param {H.service.Platform} platform A stub class to access HERE services
//  */
function placesSearch (platform) {

  //Récupération du centre d'intérêt de l'utilisateur
  interestArray = new Array()

  // test avec multiple center of interest
  var interestList = new Array();
  if(document.getElementById("coffee-tea").checked){interestList.push("coffee-tea")}
  if(document.getElementById("eat-drink").checked){interestList.push("eat-drink")}
  if(document.getElementById("snacks-fast-food").checked){interestList.push("snacks-fast-food")}
  if(document.getElementById("restaurant").checked){interestList.push("restaurant")}
  if(document.getElementById("leisure-outdoor").checked){interestList.push("leisure-outdoor")}
  if(document.getElementById("sights-museums").checked){interestList.push("sights-museums")}
  if(document.getElementById("going-out").checked){interestList.push("going-out")}

  var coords = [[startLat, startLong], [endLat, endLong]]

  for (let i=0; i < coords.length; i += 1) {
    var placesService= platform.getPlacesService(),
    parameters = {
      at: `${coords[i][0]},${coords[i][1]}`,
      cat: `${interestList}`};

    placesService.explore(parameters,
      function (result) {

        console.log(result)

        var newMarker1 = new H.map.Marker({lat:result.results.items[0].position[0], lng:result.results.items[0].position[1]});
        newMarker1.instruction = result.results.items[0].title;

        interestArray.push({
          name: result.results.items[0].title,
          coords: {
            lat: result.results.items[0].position[0],
            lng: result.results.items[0].position[1]
          },
          distance: result.results.items[0].distance
        })

        var newMarker2 = new H.map.Marker({lat:result.results.items[1].position[0], lng:result.results.items[1].position[1]});
        newMarker2.instruction = result.results.items[1].title;

        interestArray.push({
          name: result.results.items[1].title,
          coords: {
            lat: result.results.items[1].position[0],
            lng: result.results.items[1].position[1]
          },
          distance: result.results.items[1].distance
        })

        interestArray.sort(function compare(a, b) {
          return a.distance - b.distance;
        });

        var group = new H.map.Group();
        group.addObjects([newMarker1, newMarker2]);
        map.addObject(group);

        group.addEventListener('tap', function (evt) {
          //map.setCenter(evt.target.getGeometry());
          openBubble(evt.target.getGeometry(), evt.target.instruction);
        }, false);

      }, function (error) {
        alert(error);
      });
  }

}


function success(pos) {
  var crd = pos.coords;

  console.log('Votre position actuelle est :');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude : ${crd.longitude}`);
  var gpsMarker = new H.map.Marker({ lat: crd.latitude, lng: crd.longitude }, { icon: gpsIcon });
  //gpsMarker.setPositon({ lat: crd.latitude, lng: crd.longitude });
  map.addObject(gpsMarker)
  console.log(`La précision est de ${crd.accuracy} mètres.`);
}

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

// START OF THE PROCESS

let buttonRoute = document.querySelector('.route');

buttonRoute.addEventListener('click', function(e){

  var startPoint = document.getElementById("start");
  var endPoint = document.getElementById("finish");

  startPosition = startPoint.value
  endPosition = endPoint.value

  geocodeStart(platform, startPosition);
});

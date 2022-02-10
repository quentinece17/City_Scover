
<template>
  <div class="here-map">
    <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
    <ol v-bind:style="{ width: (100 - width - 5) + '%'}" style="float: right; min-height: 530px; margin-left: 20px; margin-top: 0">
        <li></li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  props: {
    center: Object
    // center object { lat: 40.730610, lng: -73.935242 }
  },
  data() {
    return {
      platform: null,
      router: {},
      geocoder: {},
      directions: [],
      apikey: "UDt4n9nVUB8lTqZ8WT-14iwMBPbvmYeWLczDPaUUwpU"
      // You can get the API KEY from developer.here.com
    };
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
    this.getLocation();
    this.initializeHereMap();
    this.router = this.platform.getRoutingService();
    this.geocoder = this.platform.getGeocodingService();
    console.log(this.geocode("Modesto, CA"));
    // this.drawRoute(
    //   {
    //     lat: "37",
    //     lng: "-121",
    //   },
    //   {
    //     lat: "38",
    //     lng: "-122"
    //   }
    // )

  },
  methods: {
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position =>  {
                //console.log(position.coords.latitude);
                //console.log(position.coords.longitude);
                this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
                console.log(this.center)
            },
            error => {
                console.log(error.message)
            }
            );
        } else {
            console.log("Your browser does not support geolocation API");
            this.center = { lat: 48.856614, lng: 2.3522219 };
        }
    },

    // drawRoute(start, finish) {
    //   this.router.calculateRoute(
    //     {
    //       "mode":"fastest;car;traffic:enabled",
    //       "waypoint0":`${start.lat},${start.lng}`,
    //       "waypoint1":`${finish.lat},${finish.lng}`,
    //       "representation":"display"
    //     },
    //     data => {
    //       // console.log(data);
    //       if(data.response.route.length > 0) {
    //         let lineString = new window.H.geo.lineString();
    //         data.response.route[0].shape.forEach(point => {
    //           let [lat, lng] = point.split(","); 
    //           lineString.pushPoint({lat: lat, lng: lng});
    //         });
    //         let polyline = new window.H.map.Polyline(
    //           lineString,
    //           {
    //             style: {
    //               lineWidth: 5
    //             }
    //           }
    //         );
    //         this.map.addObject(polyline);
    //       }
    //     },
    //     error => {
    //       console.error(error);
    //     }
    //   );
    // },
    initializeHereMap() { // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      this.getLocation();
      console.log(this.center);
      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 4,
        center: this.center
        // center object { lat: 40.730610, lng: -73.935242 }
      });
      

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map
    },
    geocode(query) {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode({ searchText: query }, data => {
                if(data.Response.View[0].Result.length > 0) {
                    data = data.Response.View[0].Result.map(location => {
                        return {
                            lat: location.Location.DisplayPosition.Latitude,
                            lng: location.Location.DisplayPosition.Longitude
                        };
                    });
                    resolve(data);
                } else {
                    reject({ "message": "No data found" });
                }
            }, error => {
                reject(error);
            });
        });
    },
    route(start, finish) {
        var params = {
            "mode": "fastest;car",
            "representation": "display"
        }
        var waypoints = [];
        this.map.removeObjects(this.map.getObjects());
        this.directions = [];
        waypoints = [this.geocode(start), this.geocode(finish)];
        Promise.all(waypoints).then(result => {
            var markers = [];
            for(var i = 0; i < result.length; i++) {
                params["waypoint" + i] = result[i][0].lat + "," + result[i][0].lng;
                markers.push(new window.H.map.Marker(result[i][0]));
            }
            this.router.calculateRoute(params, data => {
                if(data.response) {
                    for(var i = 0; i < data.response.route[0].leg.length; i++) {
                        this.directions = this.directions.concat(data.response.route[0].leg[i].maneuver);
                    }
                    data = data.response.route[0];
                    var lineString = new window.H.geo.LineString();
                    data.shape.forEach(point => {
                        var parts = point.split(",");
                        lineString.pushLatLngAlt(parts[0], parts[1]);
                    });
                    var routeLine = new window.H.map.Polyline(lineString, {
                        style: { strokeColor: "blue", lineWidth: 5 }
                    });
                    this.map.addObjects([routeLine, ...markers]);
                    this.map.setViewBounds(routeLine.getBounds());
                }
            }, error => {
                console.error(error);
            });
        });
    }
  }
};
</script>

<style scoped>
.here-map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>
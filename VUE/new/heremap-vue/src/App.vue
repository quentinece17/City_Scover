<template>
<div id="app">
        <div style="padding: 10px 0">
            <div>
                <label style="display: inline-block; width: 60px; color: #FFF">Start</label>
                <input type="text" v-model="start" />
            </div>
            <div>
                <label style="display: inline-block; width: 60px; color: #FFF">Finish</label>
                <input type="text" v-model="finish" />
            </div>
            <button type="button" v-on:click="route()">Route</button>
        </div>
        <HereMap  :center="center" />
</div>

</template>

<script>
import HereMap from './components/HereMap'
export default {
  name: 'app',
  components: {
    HereMap
    // Remove the HelloWorld.vue 
  },
  data() {
    return {
          // we are this as prop to the HereMap component 
        center:{ 
          lat: 25.730610, 
          lng: 0.935242
          },
          start: "",
          finish: ""
    }
  },
  methods: {
      route() {
          this.$refs.map.route(this.start, this.finish);
      }
  }
}
</script>

<style>
 body {
        margin: 20px;
        background-color: #1d232d;
    }
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

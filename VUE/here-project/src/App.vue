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
        <HereMap ref="map" apiKey="GFWk0kE1c3iFwNqATG4_k_w-neLk8UaOwZbjAZmqz_g" lat="37.7397" lng="-121.4252" width="60" height="530px" />
    </div>
</template>

<script>
    import HereMap from "./components/HereMap.vue"

    export default {
        name: 'app',
        components: {
            HereMap
        },
        data() {
            return {
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
</style>

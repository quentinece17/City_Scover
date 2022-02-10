<template>
    <div id="app">
        <HereMap
            appId="XerC0BPxj3nAfCEkk18t"
            apiKey="hBm-zCh7Zb5L3zHDdz9qxMcaIR5rlzFqlFiH9V0SWLo"
            lat="37.7397"
            lng="-121.4252"
            width="100%"
            height="835px" />
    </div>
</template>

<script>
    import HereMap from "./components/HereMap.vue"

    export default {
        name: 'app',
        components: {
            HereMap
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
<script>

export default {
    methods: {
        locatorButtonPressed() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position =>  {
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                },
                error => {
                    console.log(error.message)
                }
                );
            } else {
                console.log("Your browser does not support geolocation API")
            }
        }
        
    }
}
</script>

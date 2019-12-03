<template>
  <div class="map" id="allmap">
    <!-- vue2-google-maps declaration -->
    <!--
    <GmapMap
      :center="{lat: lat, lng: lng}"
      :zoom="zoom"
      map-type-id="roadmap"
      style="width: 100%; height: 100%"
    ></GmapMap>
    -->
  </div>
</template>

<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPS_API_KEY}&callback=initMap">
</script>

<script>
export default {
  name: "Home",
  data() {
    return {
      map: null,
      lat: 35.6055588,
      lng: 139.6838682,
      zoom: 16,
      maxZoom: 18,
      minZoom: 10
    }
  },
  mounted() {
    try {
      this.initMap()
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById("allmap"), {
        center: {lat: this.lat, lng: this.lng},
        zoom: this.zoom,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        mapTypeControl: false,
        fullscreenControl: false
      })
    }
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0
}
.map {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0
}
</style>

<template>
  <div class="map-container">
    <div class="google-map" id="allmap">
      <GmapMap
        :center="{lat: lat, lng: lng}"
        :zoom="zoom"
        map-type-id="terrain"
        style="width: 100%; height: 100%"
      ></GmapMap>
    </div>
  </div>
</template>

<script async defer
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB85tjhl9s8iy04nKQRRh3qswN9h7GXJ4E&callback=initMap">
</script>

<script>
export default {
  name: "Home",
  data() {
    return {
      map: null,
      lat: 35.6055588,
      lng: 139.6838682,
      zoom: 16
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document,getElementById("allmap"), {
        center: {lat: this.lat, lng: this.lng},
        zoom: this.zoom,
        maxZoom: 18,
        minZoom: 10
      })
    }
  }
}
</script>

<style scoped>
.map-container {
  margin-left: 0px;
}
.google-map {
  width: 100%;
  height: 700px;
  margin-left: 0%;
  margin-bottom: 0%;
}
</style>
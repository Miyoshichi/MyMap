<template>
  <div class="container">
    Google Map
    <div class="google-map" id="allmap"></div>
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
      lat: 35.6048718,
      lng: 139.6738334
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document,getElementById("allmap"), {
        center: {lat: this.lat, lng: this.lng},
        zoom: 16,
        maxZoom: 18,
        minZoom: 10
      })
    }
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 600px;
}
</style>
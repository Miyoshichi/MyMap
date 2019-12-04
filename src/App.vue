<template>
  <v-app id="app">
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->
    <router-view/>
  </v-app>
</template>

<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPS_API_KEY}&callback=initMap">
</script>

<script>
export default { }
</script>

<style>
html,
body {
  margin: 0;
  padding: 0
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

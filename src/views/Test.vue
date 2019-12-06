<template>
  <v-app id="inspire">

    <!-- Navigation drawer on the left -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
        <v-list>
          <v-list-item
            v-for="item in items2"
            :key="item.text"
            link
          >
            <v-list-item-avatar>
              <img
                :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list>
        <v-list-item
          class="mt-4"
          link
        >
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Bar on the top -->
    <!-- For mobile devices -->
    <template v-if="isMobile == true">
      <v-app-bar
        class="mobileBar"
        app
        height="60px"
        elevation="0"
        clipped-left
        color="rgba(255, 255, 255, 0.75)"
      >
        <v-card
          class="mobileToolBar"
          outlined
          height="45px"
        >
          <v-toolbar 
            lass="mobileToolBar"
            flat
            dense
            color="rgba(255, 0, 255, 0)"
          >
            <v-app-bar-nav-icon small @click.stop="drawer = !drawer" />
            <v-btn icon small>
              <v-icon>my_location</v-icon>
            </v-btn>
            <v-text-field
              solo
              flat
              placeholder="Search the place"
              single-line
              hide-details
              dense
            />
            <v-btn icon small>
              <v-icon>fas fa-user-circle</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-app-bar>
    </template>
    <!-- For desktop and tablet devices -->
    <template v-else>
      <v-app-bar
        class="bar"
        app
        elevation="0"
        clipped-left
        color="rgba(255, 0, 0, 0)"
        dense
      >
        <v-card
          color="rgba(0, 255, 0, 0)"
        >
          <v-toolbar
            dense
            light
          >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-text-field
              solo
              flat
              placeholder="Search the place"
              hide-details
              append-icon="search"
              single-line
            />
            <v-divider
              inset
              vertical>
            </v-divider>
            <v-btn icon>
              <v-icon>my_location</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
        <v-spacer />
        <!-- Login or user button -->
        <!-- Not login -->
        <template v-if="debug == false">
          <v-btn
            color="primary"
            large
            @click="login"
          >Login</v-btn>
        </template>
        <!-- Logged in -->
        <template v-else>
          <v-menu
            close-on-click
            offset-y
            transition="slide-y-transition"
            bottom
            nudge-bottom="15px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                color="pink"
                v-on="on"
              >
                <v-icon>fas fa-user-circle</v-icon>
              </v-btn>
            </template>
            <v-card
              width="400px"
              height="200px"
            >email
            </v-card>
          </v-menu>
        </template>
      </v-app-bar>
    </template>

    <!-- Cavas of the map -->
    <v-card
      class="map"
      id="allmap"
      color="rgba(255, 255, 255, 1)"
      flat
      tile
    />

    <!-- Floating button for upping -->
    <v-footer
      app
      class="bar"
      height="72px"
      elevation="0"
      color="rgba(0, 0, 0, 0)"
    >
      <v-speed-dial
        v-model="fab"
        absolute
        right
        bottom
        direction="top"
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="pink lighten-2"
            dark
            fab
          >
            <v-icon v-if="fab">fas fa-times</v-icon>
            <v-icon v-else>fas fa-feather</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="orange"
        >
          <v-icon>fas fa-images</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="purple"
        >
          <v-icon>fas fa-newspaper</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-footer>

  </v-app>
</template>

<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPS_API_KEY}&callback=initMap">
</script>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'trending_up', text: 'Most Popular' },
        { icon: 'subscriptions', text: 'Subscriptions' },
        { icon: 'history', text: 'History' },
        { icon: 'featured_play_list', text: 'Playlists' },
        { icon: 'watch_later', text: 'Watch Later' },
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
      debug: true,
      isMobile: null,
      map: null,
      fab: false,
      lat: 35.6055588,
      lng: 139.6838682,
      zoom: 16,
      maxZoom: 18,
      minZoom: 10
    }),
    mounted() {
      try {
        this.initMap()
      } catch (error) {
        console.error(error)
      }
      console.log(device.type)
      if(this.whichTypeOfDevice()) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
      // console.log(this.isMobile)
    },
    methods: {
      initMap() {
        this.map = new google.maps.Map(document.getElementById("allmap"), {
          center: {lat: this.lat, lng: this.lng},
          zoom: this.zoom,
          maxZoom: this.maxZoom,
          minZoom: this.minZoom,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl:false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
          },
          streetViewControl: false,
          streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
          }
        })
      },
      whichTypeOfDevice() {
        // console.log('executed')
        var isMobile = null
        if (device.type == "mobile") {
          // console.log('if')
          isMobile = true
          // console.log('if is executed')
        } else {
          // console.log('else')
          isMobile = false
          // console.log('else is executed')
        }
        return isMobile
      },
      login: function() {
        this.$router.replace('/about')
        console.log('replaced')
      }
    },
    created () {
      this.$vuetify.theme.dark = false
    },
  }
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0
}
.bar {
  margin: 0;
  padding-top: 15px;
  padding-bottom: 15px
}
.mobileBar {
  width: 100vw;
  margin: 0;
  padding: 0
}
.mobileToolBar {
  width: 100vw;
  margin: 0;
  padding: 0
}
.map {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0
}
#create .v-speed-dial {
  position: absolute;
}
#create .v-btn--floating {
  position: relative;
}
</style>

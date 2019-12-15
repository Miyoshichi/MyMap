<template>
  <v-app id="inspire">

    <!-- Navigation drawer on the left -->
    <v-navigation-drawer
      v-model="drawer"
      class="navigation"
      app
      roun
      temporary
    >
      <v-list rounded>

        <v-list-item>
          <v-img
            :src="require('../../public/logo_hd.png')"
            alt="logo"
            max-height="50"
            max-width="200"
          ></v-img>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              MyMap
            </v-list-item-title>
            <v-list-item-subtitle class="subtitle">
              Places recorded for you.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item>
        <v-list-group
          color="orange darken-4"
          prepend-icon="fas fa-star"
          no-action
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>
              Recommand
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="item in recommandations"
            :key="item.ganre"
            class=""
            link
            dense
          >
            <v-list-item-title v-text="item.ganre" />
            <v-list-item-avatar :color="item.color">
              <v-icon :dark="item.dark" small>{{ item.icon }}</v-icon>
            </v-list-item-avatar>
          </v-list-item>
          <!--
          <v-list-item-icon>
            <v-btn icon v-on="on"><v-icon>fas fa-plus-circle</v-icon></v-btn>
          </v-list-item-icon>
          -->
        </v-list-group>
        <v-list-group
          color="orange darken-4"
          prepend-icon="fas fa-user-friends"
          no-action
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>
              Groups
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="item in groups"
            :key="item.name"
            class=""
            link
            dense
          >
            <v-list-item-title v-text="item.name" />
            <v-list-item-avatar>
              <img
                v-if="item.id"
                :src="`https://randomuser.me/api/portraits/men/${item.id}.jpg`"
                alt=""
              >
              <v-icon
                v-else
                small
                v-text="item.icon"
              ></v-icon>
            </v-list-item-avatar>
          </v-list-item>
          <!--
          <v-list-item-icon>
            <v-btn icon v-on="on"><v-icon>fas fa-plus-circle</v-icon></v-btn>
          </v-list-item-icon>
          -->
        </v-list-group>
      </v-list>

      <template v-slot:append>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Settings</v-list-item-title>
        </v-list-item>
      </template>
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
        <!-- Logged in -->
        <template v-if="user">
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
              class="loginCard"
            >
              <h3>You has been logged in as</h3>
              <p>: {{ user }}</p>
              <v-btn
                color="amber"
                @click="signOut"
              >
                Sign Out
              </v-btn>
            </v-card>
          </v-menu>
        </template>
        <!-- Not login -->
        <template v-else>
          <v-btn
            color="orange"
            large
            @click="signIn"
          >Sign In</v-btn>
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

          @click="push_ID"
          
        >
          <v-icon small>fas fa-images</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="purple"
        >
          <v-icon small>fas fa-newspaper</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-footer>

  </v-app>
</template>

<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPS_API_KEY}&callback=initMap">
</script>

<script>
import firebase from 'firebase'

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    recommandations: [
      {color: 'orange', ganre: 'Restaurants', icon: 'fas fa-utensils', dark: true},
      {color: 'brown', ganre: 'Coffee', icon: 'fas fa-coffee', dark: true},
      {color: 'blue-grey', ganre: 'Cinemas', icon: 'fas fa-video', dark: true},
      {color: 'green', ganre: 'Parks', icon: 'fas fa-tree', dark: true},
      {color: '', ganre: 'More...', icon: 'fas fa-ellipsis-h', dark: false},
    ],
    groups: [
      {name: 'Mitsubishi', id: 36},
      {name: 'Mitsui', id: 63},
      {name: 'Mizuho', id: 27},
      {name: 'Resona', id: 72},
      {name: 'More...', icon: 'fas fa-ellipsis-h'}
    ],
    debug: false,
    user: 'default',
    //user: firebase.auth().currentUser.username,
    isMobile: null,
    map: null,
    fab: false,
    lat: 35.6055588,
    lng: 139.6838682,
    zoom: 16,
    maxZoom: 18,
    minZoom: 10
  }),
  
  created() {
    console.log("created", this.$route)
    this.user = this.$route.query.id
    this.$vuetify.theme.dark = false
  },

  mounted() {
    try {
      this.initMap()
    } catch (error) {
      console.error(error)
    }
    console.log(this.user)
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
    signIn: function() {
      this.$router.push('/signin')
      // console.log('replaced')
    },
    signOut: function() {
      firebase.auth().signOut()
      this.$router.replace('/')
    },
    push_ID:function() {
      this.$router.push({
        path: '/upload',
        query: {
          id: this.user
        }
      }


      )
    }

  },
  

}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0
}
.navigation {
  text-align: left
}
.title {
  text-align: left;
  font-size: 200%
}
.subtitle {
  text-align: left
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
.loginCard {
  padding: 20px
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

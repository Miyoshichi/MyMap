<template>
  <v-app id="inspire">

    <!-- Welcome -->
    <template v-if="!user">
      <v-overlay :value="welcome">
        <v-card light class="mx-auto" :style="{width: isMobile?'80vw':'50vw'}">
          <v-img
            :src="require('../../public/logo_welcome.png')"
          ></v-img>
          <v-card-text class="headline">
            Welcome to MyMap alpha
          </v-card-text>
          <v-card-text>
            You cannot pin your spot without an account.<br>
            * Note that some features are unusable.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              color="amber accent-4"
              @click="welcome = false"
            >Not Now
            </v-btn>
            <v-btn
              text
              color="orange"
              @click="signIn"
            >Sign In
            </v-btn>
          </v-card-actions>        
        </v-card>
      </v-overlay>
    </template>

    <!-- Navigation drawer on the left -->
    <v-navigation-drawer
      v-model="drawer"
      class="navigation"
      app
      roun
      temporary
    >
      <v-list rounded disabled>

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
          <v-list-item-title to="/">
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
              Recommend
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="item in recommendations"
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
            <v-text-field
              solo
              flat
              placeholder="Search the place"
              single-line
              hide-details
              dense
            />
            <v-btn icon small @click="search">
              <v-icon>fas fa-search</v-icon>
            </v-btn>
            <template v-if="user">
              <v-btn icon small @click="overlay = !overlay">
                <v-icon>fas fa-filter</v-icon>
              </v-btn>
              <v-spacer />
              <v-divider inset vertical />
              <v-spacer />
              <v-menu
                close-on-click
                close-on-content-click
                offset-y
                transition="slide-y-transition"
                bottom
                nudge-bottom="15px"
              >
                <template v-slot:activator="{ on }">
                  <v-avatar
                    icon
                    size="30"
                    v-on="on"
                  >
                    <v-icon color="red">fas fa-smile</v-icon>
                  </v-avatar>
                </template>
                <v-card
                  class="mx-auto"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline">
                        You has been logged in as
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ user }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      text
                      color="amber darken-4"
                      @click="signOut"
                    >
                      Sign Out
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
            <template v-else>
              <v-btn icon small @click="signIn">
                <v-icon>fas fa-user-circle</v-icon>
              </v-btn>
            </template>           
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
              single-line
            />
            <v-btn icon @click="search">
              <v-icon small>fas fa-search</v-icon>
            </v-btn>
            <template v-if="user">
              <v-divider
                inset
                vertical>
              </v-divider>
              <v-btn icon @click="overlay = !overlay">
                <v-icon small>fas fa-filter</v-icon>
              </v-btn>
            </template>
          </v-toolbar>
        </v-card>
        <v-spacer />
        <!-- Login or user button -->
        <!-- Logged in -->
        <template v-if="user">
          <v-menu
            close-on-click
            close-on-content-click
            offset-y
            transition="slide-y-transition"
            bottom
            nudge-bottom="15px"
          >
            <template v-slot:activator="{ on }">
              <v-avatar
                icon
                v-on="on"
              >
                <v-icon color="red">fas fa-smile</v-icon>
              </v-avatar>
            </template>
            <v-card
              class="mx-auto"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline">
                    You has been logged in as
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  color="amber darken-4"
                  @click="signOut"
                >
                  Sign Out
                </v-btn>
                <v-spacer />
              </v-card-actions>
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
    <template v-if="user">
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
            @click="plusPin"
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
    </template>

    <!-- Overlay pin filter -->
    <v-overlay :value="overlay">
      <v-card light class="mx-auto" :style="{width: isMobile?'80vw':'50vw'}">
        <v-card-text class="headline">
          Select the category of pins
        </v-card-text>
        <v-list-item>
          <v-chip
            v-for="(item, i) in selectedCategory"
            :key="i"
            class="ma-1"
            close
            @click:close="selectedCategory.splice(i, 1)"
          >{{ item }}
          </v-chip>
        </v-list-item>
        <v-spacer />
        <v-list>
          <v-list-item-group
            v-model="selectedCategory"
            multiple
          >
            <v-list-item
              v-for="(item, i) in category"
              :key="i"
              :value="item"
              active-class="amber--text text--accent-4"
            >
              <template v-slot:default="{ active, toggle }">
                <v-list-item-content v-text="item" />
                <v-list-item-action>
                  <v-checkbox
                    color="amber accent-4"
                    :input-value="active"
                    :true-value="item"
                    @click="toggle"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="amber accent-4"
            @click="filter"
          >Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
    <v-row justify="center" v-if="!!dialogPin">
    <v-dialog
      v-model="alert_triger"
    >
      <v-card>
        <v-card-title class="headline">{{ dialogPin.place }}</v-card-title>

        <v-card-text>
          <span>{{ dialogPin.tags.map((tag) => tag.text).join(', ') }}</span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="alert_triger = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="alert_triger = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-app>
</template>

<script async defer
  src="https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPS_API_KEY}&callback=initMap">
</script>

<script>
import firebase from 'firebase'
import localStorage from '../utils/localstorage'

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    recommendations: [
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
    category: [
      'Restaurants',
      'Bars',
      'Parks',
      'Museums',
      'Landmarks'
    ],
    selectedCategory: [
      'Restaurants',
      'Bars',
      'Parks',
      'Museums',
      'Landmarks'
    ],
    debug: false,
    overlay: false,
    welcome: true,
    user: null,
    uid: 0,
    isMobile: null,
    map: null,
    fab: false,
    lat: 35.73353,
    lng: 139.712118,
    zoom: 16,
    maxZoom: 18,
    minZoom: 10,
    restaurantsLocation: [
      {lat: 35.6080668, lng: 139.6824988}
    ],
    alert_triger: false,
    dialogPin: null,
    pin:[]
  }),
  created() {
    console.log("created", this.$route)
    if(!!localStorage.get('user')) {
      this.user = localStorage.get('user')["user"]["email"]
      this.uid = localStorage.get('user')["user"]["uid"]
    }
    this.$vuetify.theme.dark = false
  },
  mounted() {
    try {
      this.initMap()
    } catch (error) {
      console.error(error)
    }
    console.log(device.type)
    if (this.whichTypeOfDevice()) {
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
      const pins = !localStorage.get("pins") ? [] : localStorage.get("pins")
      const openDialog = this.openDialog
      pins.forEach( pin => {
        if (pin.pinUser["user"]["uid"] == this.uid) {
          if (this.selectedCategory.indexOf(pin.selectedCategory) >= 0) {
            console.log(this.selectedCategory.indexOf(pin.selectedCategory))
            const marker = new google.maps.Marker({
              position: {lat: Number(pin.latitude), lng: Number(pin.longitude)},
              map: this.map
            })
            marker.addListener( "click", function ( argument ) {        
          openDialog(pin)
        } )
          }
        }
        console.log(pin)
      })
    },
    openDialog(pin) {
      this.alert_triger = true
      this.dialogPin = pin
    },
    whichTypeOfDevice() {
      var isMobile = null
      if (device.type == "mobile") {
        isMobile = true
      } else {
        isMobile = false
      }
      return isMobile
    },
    signIn: function() {
      this.$router.push('/signin')
    },
    signOut: function() {
      firebase.auth().signOut()
      localStorage.set('user', null)
      this.$router.replace('/dev')
    },
    search: function() {
      this.$router.push('/search')
    },
    plusPin: function() {
      this.$router.push({
        path: '/upload',
        query: {
          //id: this.user
        }
      })
    },
    filter: function() {
      this.overlay = false
      this.initMap()
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

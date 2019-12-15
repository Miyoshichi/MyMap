<template>
  <v-app id="inspire">

    <!-- Navigation bar -->
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

    <!-- Search bar-->
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
          rounded
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
              placeholder="Input the place or spot"
              single-line
              hide-details
              dense
            />
            <!--<v-btn icon small>
              <v-icon>fas fa-user-circle</v-icon>
            </v-btn>-->
          </v-toolbar>
        </v-card>
      </v-app-bar>
    </template>
    <!-- For desktop and tablet devices -->
    <template v-else>
      <v-app-bar
        class="desktopBar"
        app
        height="60px"
        clipped-left
        color="rgba(255, 255, 255, 1)"
      >
        <v-app-bar-nav-icon small @click.stop="drawer = !drawer" />
        <v-spacer />
        <v-text-field
          rounded
          outlined
          placeholder="Input the place or spot"
          color="amber"
          single-line
          hide-details
          dense
        />
        <v-btn icon>
          <v-icon @click="search">fas fa-search</v-icon>
        </v-btn>
        <v-spacer />
        <!--<v-btn icon small>
          <v-icon>fas fa-user-circle</v-icon>
        </v-btn>-->
      </v-app-bar>
    </template>



    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        
        <!-- Alternative search options -->
        <v-row
          align="start"
          justify="center"
        >
          <v-col
            cols="20"
            sm="15"
            md="10"
          >
            <v-card
              class="mx-auto"
            >
              <v-card-text class="headline">
                Search options
              </v-card-text>
              <v-card-text class="">
                Selected category
              </v-card-text>
              <v-col
                cols="90vw"
              >
                <v-combobox
                  v-model="selectedCategory"
                  :items="category"
                  small-chips
                  dense
                >
                </v-combobox>
              </v-col>
              <v-card-text class="">
                Selected tags
              </v-card-text>
              <v-col
                cols="90vw"
              >
                <v-combobox
                  v-model="selectedTag"
                  :items="tag"
                  item-text="tag"
                  hide-selected
                  multiple
                  small-chips
                  dense
                >
                </v-combobox>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-spacer />

        <!-- Category and tag selection -->
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="20"
            sm="15"
            md="10"
          >
            <v-expansion-panels accordion>
              <v-expansion-panel>
                <v-expansion-panel-header>Restaurants</v-expansion-panel-header>
                <v-expansion-panel-content align="left">
                  <v-chip
                    v-for="item in categories.Restaurants"
                    :key="item.tag"
                    class="ma-2"
                    :color="item.color"
                    outlined
                    label
                    absolute
                  >
                    <v-avatar left>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-avatar>
                    {{ item.tag }}
                  </v-chip>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Bars</v-expansion-panel-header>
                <v-expansion-panel-content align="left">
                  <v-chip
                    v-for="item in categories.Bars"
                    :key="item.tag"
                    class="ma-2"
                    :color="item.color"
                    label
                    outlined
                  >
                    <v-avatar left>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-avatar>
                    {{ item.tag }}
                  </v-chip>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Parks</v-expansion-panel-header>
                <v-expansion-panel-content align="left">
                  <v-chip
                    v-for="item in categories.Parks"
                    :key="item.tag"
                    class="ma-2"
                    :color="item.color"
                    outlined
                    label
                  >
                    <v-avatar left>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-avatar>
                    {{ item.tag }}
                  </v-chip>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Museums</v-expansion-panel-header>
                <v-expansion-panel-content align="left">
                  <v-chip
                    v-for="item in categories.Museums"
                    :key="item.tag"
                    class="ma-2"
                    :color="item.color"
                    outlined
                    label
                  >
                    <v-avatar left>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-avatar>
                    {{ item.tag }}
                  </v-chip>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Landmarks</v-expansion-panel-header>
                <v-expansion-panel-content align="left">
                  <v-chip
                    v-for="item in categories.Landmarks"
                    :key="item.tag"
                    class="ma-2"
                    :color="item.color"
                    outlined
                    label
                  >
                    <v-avatar left>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-avatar>
                    {{ item.tag }}
                  </v-chip>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

  </v-app>
</template>

<script src="https://unpkg.com/current-device/umd/current-device.min.js"></script>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    isMobile: null,
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
    category: [
      'Restaurants',
      'Bars',
      'Parks',
      'Museums',
      'Landmarks'
    ],
    selectedCategory: '',
    tag: [ ],
    selectedTag: [],
    categories: {
      Restaurants: [
        {tag: 'Chinese', color: 'red', icon: 'fas fa-pepper-hot'},
        {tag: 'Western', color: 'orange', icon: 'fas fa-utensils'},
        {tag: 'Japanese', color: 'blue darken-4', icon: 'fas fa-fish'},
        {tag: 'Fastfood', color: 'amber', icon: 'fas fa-hamburger'}
      ],
      Bars: [
        {tag: 'Beer', color: 'yellow', icon: 'fas fa-beer'},
        {tag: 'Wine', color: 'red darken-4', icon: 'fas fa-wine-glass'},
        {tag: 'Martini', color: 'black', icon: 'fas fa-glass-martini'},
        {tag: 'Cocktail', color: 'lime', icon: 'fas fa-cocktail'},
      ],
      Parks: [
        {tag: 'Forest', color: 'green', icon: 'fas fa-tree'},
        {tag: 'Camp', color: 'lime darken-4', icon: 'fas fa-campground'}
      ],
      Museums: [
        {tag: 'Art', color: 'indigo', icon: 'fas fa-portrait'},
        {tag: 'Science', color: 'light-blue', icon: 'fas fa-atom'},
        {tag: 'Music', color: 'orange lighten-4', icon: 'fas fa-music'},
      ],
      Landmarks: [
        {tag: 'Japanese', color: 'red', icon: 'fas fa-torii-gate'},
        {tag: 'Western', color: 'brown', icon: 'fas fa-church'},
        {tag: 'Mosque', color: 'green darken-3', icon: 'fas fa-mosque'},
        {tag: 'Graves', color: 'black', icon: 'fas fa-dungeon'}
      ]
    },
  }),
  mounted() {
    console.log(device.type)
    if (this.whichTypeOfDevice()) {
      this.isMobile = true
    } else {
      this.isMobile = false
    }
  },
  methods: {
    search: function() {
      this.$router.push('/')
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
  },
  watch: {
    selectedCategory: function(newCategory, oldCategory) {
      console.log(newCategory, oldCategory)
      this.tag = this.categories[newCategory]
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
.desktopBar {
  padding-left: 10px;
  padding-right: 10px
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
</style>
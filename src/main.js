import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from './plugins/vuetify'
import firebase from 'firebase'

// import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

/*
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB85tjhl9s8iy04nKQRRh3qswN9h7GXJ4E',
    libraries: 'places'
  },
  installComponents: true
})
*/

Vue.use(vuetify);

var firebaseConfig = {
  apiKey: "AIzaSyB85tjhl9s8iy04nKQRRh3qswN9h7GXJ4E",
  authDomain: "mymap-sample-1575260179332.firebaseapp.com",
  databaseURL: "https://mymap-sample-1575260179332.firebaseio.com",
  projectId: "mymap-sample-1575260179332",
  storageBucket: "mymap-sample-1575260179332.appspot.com",
  messagingSenderId: "173340410058",
  appId: "1:173340410058:web:f13ba4ed8031e0c39f7433",
  measurementId: "G-KJW4EWBVDC"
}
firebase.initializeApp(firebaseConfig)
firebase.analytics()

new Vue({
  el: "#app",
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

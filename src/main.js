import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(vuetify);

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
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

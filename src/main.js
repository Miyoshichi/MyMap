import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from './plugins/vuetify'

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

new Vue({
  el: "#app",
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

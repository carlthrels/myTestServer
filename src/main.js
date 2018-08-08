import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './Store'
import DateFilter from './Filters/date.js'
import * as firebase from './firebaseConfig'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VCarousel,
  VCard,
  VTextField,
  VDatePicker,
  VTimePicker
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCarousel,
    VCard,
    VTextField,
    VDatePicker,
    VTimePicker
  }
})

Vue.config.productionTip = false

Vue.prototype.$firebase = firebase

Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

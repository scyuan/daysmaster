// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(VueMomentJS,moment)

Vue.config.productionTip = false
Vue.config.devtools = true
import Datetime from 'vue-datetime'
Vue.use(Datetime)

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios
/* eslint-disable no-new */
import store from './vuex/store'
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App)
})

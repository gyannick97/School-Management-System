import Vue from 'vue'
import axios from 'axios'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import BootstrapVue from 'bootstrap-vue'
import VueMask from 'v-mask'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import db from '@/services'
import store from './store'
import router from './router'
import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

moment.locale('fr')
Vue.use(BootstrapVue)
Vue.use(VueMask)

Vue.prototype.$db = db

store.dispatch('initUser').then(logged => {
  store.dispatch('initStudent')
  store.dispatch('initDepartment')
  store.dispatch('initLevel')
  store.dispatch('initAdmission')
  store.dispatch('initStatistic')

  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
  }).$mount('#app')
}).catch(err => {
  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
  }).$mount('#app')
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

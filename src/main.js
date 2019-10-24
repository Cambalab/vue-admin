import '@babel/polyfill'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './styles/main.sass'
import './assets/fonts/Montserrat/Montserrat.css'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import vueChartist from '@plugins/chartist'
import vuetify from '@plugins/vuetify'
import '@plugins/material'

Vue.config.productionTip = false

Vue.use(vueChartist)

Vue.use(VueRouter)
const routes = [{}]
const router = new VueRouter(routes)

import App from '@demo/App.vue'

Vue.use(Vuex)
const store = new Vuex.Store({})

const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')

if (window.Cypress) {
  // exposes the app, only available during E2E tests
  window.app = app
}

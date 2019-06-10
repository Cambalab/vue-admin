import "@babel/polyfill"
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/fonts/Montserrat/Montserrat.css'
import Vue from "vue"
import "@plugins/vuetify"
import VueRouter from "vue-router"

Vue.use(VueRouter)
const routes = [{}]
const router = new VueRouter(routes)

import App from "@demo/App.vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({})

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

if (window.Cypress) {
  // exposes the app, only available during E2E tests
  window.app = app
}

import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{}]
const router = new VueRouter(routes)

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

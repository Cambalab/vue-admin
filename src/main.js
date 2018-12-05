import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [{}];
export const router = new VueRouter(routes);

import App from "./App.vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

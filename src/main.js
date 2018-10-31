import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [{}];
const router = new VueRouter(routes);

import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

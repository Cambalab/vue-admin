<template>
  <div>
    <div v-if="!isAuthenticated">
      <component :is="authLayout" :va="va"/>
    </div>
    <div v-else>
      <Core
        v-bind:appLayout="appLayout"
        :title="title"
        :sidebar="sidebar"
        :va="va"
      >
        <router-view />
      </Core>
      <slot />
    </div>
  </div>
</template>

<script>
import Core from "@components/Core";

import resourceModule from "@store/modules/resource";
import entitiesModule from "@store/modules/entities"
import requestsModule from "@store/modules/requests"

import createAuthModule from '@va-auth/store'
import AuthActionTypes from '@va-auth/types'

import defaults from './defaults'

export default {
  name: "Admin",
  props: {
    appLayout: {
      type: Object,
      default: () => defaults().props.appLayout
    },
    authLayout: {
      type: Object,
      default: () => defaults().props.authLayout
    },
    authProvider: {
      type: Function,
      default: defaults().props.authProvider
    },
    title: {
      type: String,
      default: defaults().props.title
    },
    sidebar: {
      type: Object,
      default: () => defaults().props.sidebar
    },
    unauthorized: {
      type: Object,
      default: () => defaults().props.unauthorized
    }
  },
  components: {
    Core
  },
  data() {
    const va = {
      login: this.login,
      logout: this.logout,
      getUser: this.getUser
    }
    return {
      va
    }
  },
  created() {
    this.$store.registerModule('resources', resourceModule)
    this.$store.registerModule('entities', entitiesModule)
    this.$store.registerModule('requests', requestsModule)
    this.registerUnauthorizedIfAny(this.unauthorized);
    this.registerStoreModule()
  },
  mounted: function() {
    this.loadAuthRoutes()
    this.$store.dispatch(`auth/${AuthActionTypes.AUTH_CHECK_REQUEST}`)
  },
  methods: {
    logout() {
      this.$store.dispatch(`auth/${AuthActionTypes.AUTH_LOGOUT_REQUEST}`)
    },
    registerStoreModule() {
      createAuthModule({
        client: this.authProvider,
        moduleName: 'auth',
        store: this.$store,
      })
    },
    loadAuthRoutes() {
      const routes = []
      const route = {
        path: '/login',
        name: 'login',
        component: this.authLayout,
        props: {}
      }
      routes.push(route)
      this.$router.addRoutes(routes)
    },
    registerUnauthorizedIfAny(unauthorizedComponent) {
      const routeForUnauthorized = {
        path: '/unauthorized',
        name: 'unauthorized',
        component: unauthorizedComponent
      }
      this.$router.addRoutes([routeForUnauthorized]);
    },
    login: function (username, password) {
      const params = { username, password }
      this.$store.dispatch(`auth/${AuthActionTypes.AUTH_LOGIN_REQUEST}`, params)
    },
    getUser: function () {
      return this.$store.getters['auth/getUser']
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters[`auth/isAuthenticated`]
    }
  },
  render() {
    return null
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

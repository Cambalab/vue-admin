<template>
  <div>
    <div v-if="!isAuthenticated">
      <Auth />
    </div>
    <div v-else>
      <Core
        v-bind:appLayout="appLayout"
        :title="title"
        :sidebar="sidebar"
        :va="va"
      >
        <router-view></router-view>
      </Core>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Core from "@components/Core";
import Ui from "@components/Ui";
import Unauthorized from '@components/Unauthorized'
import resourceModule from "@store/modules/resource";
import entitiesModule from "@store/modules/entities"
import requestsModule from "@store/modules/requests"
import createAuthModule from '@va-auth/store'
import UI_CONTENT from '@constants/ui.content.default'
import Auth from '@components/Auth'
import AuthActionTypes from '@va-auth/types'
import { DefaultSidebar } from '@components/UiComponents';

export default {
  name: "Admin",
  props: {
    appLayout: {
      default: () => Ui
    },
    authLayout: {
      default: () => Auth
    },
    authProvider: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      default: UI_CONTENT.MAIN_TOOLBAR_TITLE
    },
    sidebar: {
      default: () => DefaultSidebar
    },
    unauthorized: {
      type: Object
    }
  },
  components: {
    Auth,
    Core,
    Ui
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
        component: Auth,
        props: {}
      }
      routes.push(route)
      this.$router.addRoutes(routes)
    },
    registerUnauthorizedIfAny(unauthorizedComponent) {
      const routeForUnauthorized = {
        path: '/unauthorized',
        name: 'unauthorized',
        component: unauthorizedComponent || Unauthorized
      }
      this.$router.addRoutes([routeForUnauthorized]);
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters[`auth/isAuthenticated`]
    }
  },
  data() {
    const va = {
      logout: this.logout
    }
    return {
      va
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

<template>
  <div>
    <Core
      v-bind:appLayout="appLayout"
      :title="title"
    >
      <router-view></router-view>
    </Core>
    <slot></slot>
  </div>
</template>

<script>
import Core from "@components/Core";
import Ui from "@components/Ui";
import resourceModule from "@store/modules/resource";
import entitiesModule from "@store/modules/entities"
import createAuthModule from '@va-auth/store'
import UI_CONTENT from '@constants/ui.content.default'
import Auth from '@components/Auth'

export default {
  name: "Admin",
  props: {
    appLayout: {
      default: () => Ui
    },
    title: {
      type: String,
      default: UI_CONTENT.MAIN_TOOLBAR_TITLE
    },
    authProvider: {
      type: Function,
      required: true
    }
  },
  components: {
    Core,
    Ui
  },
  created() {
    this.$store.registerModule('resources', resourceModule)
    this.$store.registerModule('entities', entitiesModule)
    this.registerStoreModule()
  },
  mounted: function() {
    this.loadAuthRoutes()
  },
  methods: {
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

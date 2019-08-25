<script>
import Unauthenticated from './Unauthenticated'
import Authenticated from './Authenticated'

import entitiesModule from '@store/modules/entities'
import requestsModule from '@store/modules/requests'

import createAuthModule from '@va-auth/store'
import AuthActionTypes from '@va-auth/types'

import defaults from './defaults'

export default {
  name: 'Admin',
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
    Authenticated,
    Unauthenticated
  },
  beforeCreate() {
    this.$store.registerModule('entities', entitiesModule)
    this.$store.registerModule('requests', requestsModule)
  },
  created() {
    this.registerStoreModule({
      client: this.authProvider,
      moduleName: 'auth',
      store: this.$store
    })
  },
  mounted: function() {
    const { namespace, AUTH_CHECK_REQUEST } = AuthActionTypes
    this.$store.dispatch(`${namespace}/${AUTH_CHECK_REQUEST}`)
  },
  methods: {
    registerStoreModule(args) {
      createAuthModule(args)
    },
    loadRoute(args) {
      this.$router.addRoutes([args])
    }
  },
  computed: {
    isAuthenticated() {
      const { namespace } = AuthActionTypes
      return this.$store.getters[`${namespace}/isAuthenticated`]
    }
  },
  render(createElement) {
    return this.isAuthenticated
    ? createElement(Authenticated, {
      props: {
        layout: this.appLayout,
        title: this.title,
        sidebar: this.sidebar,
        unauthorized: this.unauthorized,
      }
    }, this.$slots.default)
    : createElement(Unauthenticated, {
      props: {
        layout: this.authLayout
      }
    })
  }
}
</script>

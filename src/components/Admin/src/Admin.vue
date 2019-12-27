<script>
import AuthTypes from '@va-auth/types'
import Unauthenticated from './Unauthenticated'
import Authenticated from './Authenticated'
import defaults from './defaults'

const {
  props,
  args: {
    alertsModule,
    createSiteRoutes,
    createUnauthenticatedRoutes,
    entitiesModule,
    requestsModule,
    resourceModule,
    unauthorizedRoutes,
  },
} = defaults()

export default {
  name: 'Admin',
  props: {
    appLayout: {
      type: Object,
      default: () => props.appLayout,
    },
    authLayout: {
      type: Object,
      default: () => props.authLayout,
    },
    homeLayout: {
      type: Object,
      default: () => props.homeLayout,
    },
    options: {
      type: Object,
    },
    sidebar: {
      type: Object,
      default: () => props.sidebar,
    },
    title: {
      type: String,
      default: props.title,
    },
    unauthorized: {
      type: Object,
      default: () => props.unauthorized,
    },
  },
  components: {
    Authenticated,
    Unauthenticated,
  },
  beforeCreate() {
    this.$store.registerModule('alerts', alertsModule)
    this.$store.registerModule('entities', entitiesModule)
    this.$store.registerModule('requests', requestsModule)
    this.$store.registerModule('resources', resourceModule)
  },
  created() {
    const { namespace } = AuthTypes
    const { authModule } = this.options
    const unauthenticatedRoutes = createUnauthenticatedRoutes(this.authLayout)
    const siteRoutes = createSiteRoutes({ homeLayout: this.homeLayout })

    this.$store.registerModule(namespace, authModule)
    this.$router.addRoutes([
      ...siteRoutes,
      ...unauthenticatedRoutes,
      ...unauthorizedRoutes,
    ])
  },
  mounted: function() {
    const { namespace, AUTH_CHECK_REQUEST } = AuthTypes
    this.$store.dispatch(`${namespace}/${AUTH_CHECK_REQUEST}`)
  },
  computed: {
    isAuthenticated() {
      const { namespace, AUTH_IS_AUTHENTICATED } = AuthTypes
      return this.$store.getters[`${namespace}/${AUTH_IS_AUTHENTICATED}`]
    },
  },
  render(createElement) {
    return this.isAuthenticated
      ? createElement(
          Authenticated,
          {
            props: {
              layout: this.appLayout,
              title: this.title,
              sidebar: this.sidebar,
              unauthorized: this.unauthorized,
            },
          },
          this.$slots.default
        )
      : createElement(Unauthenticated, {
          props: {
            layout: this.authLayout,
          },
        })
  },
}
</script>

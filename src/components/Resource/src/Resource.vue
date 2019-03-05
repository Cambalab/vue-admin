<script>
import { List, Show, Create, Edit } from '@components/Actions'
import createCrudModule from '@store/utils/modules'
import createRouteBindings from '@router/route-bindings'
import defaults from './defaults'

export default {
  name: "Resource",
  props: {
    name: {
      type: String,
      required: true,
      default: defaults().props.name
    },
    list: {
      type: [Array, Object],
      required: true,
      default: defaults().props.list
    },
    show: [Array, Object],
    create: [Array, Object],
    edit: [Array, Object],
    resourceIdName: {
      type: String,
      default: defaults().props.resourceIdName
    },
    apiUrl: {
      type: String,
      required: true,
      default: defaults().props.apiUrl
    },
    redirect: {
      type: Object,
      default: defaults().props.redirect,
      validator: defaults().validate.redirect
    },
    parseResponses: {
      type: Object,
      default: defaults().props.parseResponses
    }
  },
  created: function() {
    createCrudModule({
      apiUrl: this.apiUrl,
      resourceName: this.name,
      resourceIdName: this.resourceIdName,
      parseResponses: this.parseResponses,
      store: this.$store
    })
  },
  methods: {
    addRoute: function(path, name) {
      const resourceName = "resources/addRoute"
      this.$store.commit(resourceName, { path, name })
    },
    loadRoutes() {
      const resourcePath = `/${this.name}`
      const routes = []
      // Adds the 'resourceName' path, mainly used for the drawer
      this.addRoute(resourcePath, this.name)
      // Initialises bindings to create the navigation routes
      const bind = createRouteBindings({
        list: this.list,
        show: this.show,
        create: this.create,
        edit: this.edit,
        resourceName: this.name,
        resourceIdName: this.resourceIdName,
        redirection: this.redirect,
        router: this.$router,
        store: this.$store,
        parseResponses: this.parseResponses
      })
      // Adds binded components to routes
      routes.push(bind.list({ wrapper: List }))
      routes.push(bind.show({ wrapper: Show }))
      routes.push(bind.create({ wrapper: Create }))
      routes.push(bind.edit({ wrapper: Edit }))
      // Adds the routes to the global router
      this.$router.addRoutes(routes)
    }
  },
  mounted: function() {
    this.loadRoutes()
  },
  render() {
    return null
  }
}
</script>

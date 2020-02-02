<script>
import createRouteBindings from '@router/route.bindings'
import defaults from './defaults'
import { createCrudModule } from '@store/modules'
import { Types as ResourcesTypes } from '@store/modules/resources'

export default {
  name: 'Resource',
  props: {
    name: {
      type: String,
      required: true,
      default: defaults().props.name,
    },
    list: {
      type: Object,
      required: true,
      default: defaults().props.list,
    },
    show: Object,
    create: Object,
    edit: Object,
    resourceIdName: {
      type: String,
      default: defaults().props.resourceIdName,
    },
    userPermissionsField: {
      type: String,
      default: defaults().props.userPermissionsField,
    },
    apiUrl: {
      type: String,
      required: true,
      default: defaults().props.apiUrl,
    },
    redirect: {
      type: Object,
      default: defaults().props.redirect,
      validator: defaults().validate.redirect,
    },
    parseResponses: {
      type: Object,
      default: defaults().props.parseResponses,
    },
    subscriptions: {
      type: Function,
      default: defaults().props.subscriptions,
    },
  },
  created: function() {
    if (!this.storeHasModule(this.name)) {
      createCrudModule({
        apiUrl: this.apiUrl,
        resourceName: this.name,
        resourceIdName: this.resourceIdName,
        parseResponses: this.parseResponses,
        store: this.$store,
        ...this.subscriptions(this.$store, this.name),
      })
    }
  },
  methods: {
    addRoute: function(path, name, addedRouteCallback) {
      const { namespace, RESOURCES_ADD_ROUTE } = ResourcesTypes
      const resourceName = `${namespace}/${RESOURCES_ADD_ROUTE}`

      return this.$store.commit(resourceName, {
        path,
        name,
        addedRouteCallback,
      })
    },
    bindComponentsOnRoutes: function() {
      const routes = []
      // Initialises bindings to create the navigation routes
      const bind = createRouteBindings({
        list: this.list,
        show: this.show,
        create: this.create,
        edit: this.edit,
        resourceName: this.name,
        resourceIdName: this.resourceIdName,
        userPermissionsField: this.userPermissionsField,
        redirection: this.redirect,
        router: this.$router,
        parseResponses: this.parseResponses,
      })
      // Adds binded components to routes
      routes.push(bind.list())
      routes.push(bind.show())
      routes.push(bind.create())
      routes.push(bind.edit())
      // Adds the routes to the global router
      this.$router.addRoutes(routes)
    },
    loadRoutes() {
      const resourcePath = `/${this.name}`
      // Adds the 'resourceName' path, mainly used for the drawer
      // and if the route was successfully added then it bind the components with their route
      this.addRoute(resourcePath, this.name, this.bindComponentsOnRoutes)
    },
    storeHasModule(moduleName) {
      return !!this.$store.state[moduleName]
    },
  },
  mounted: function() {
    this.loadRoutes()
  },
  render() {
    return null
  },
}
</script>

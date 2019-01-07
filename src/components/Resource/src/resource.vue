<template>
  <div></div>
</template>

<script>
import { List, Show, Create, Edit } from '../../Actions';
import createCrudModule from '../../../store/utils/modules';
import createRouteBindings from './binding.utils'

export default {
  name: "Resource",
  props: {
    name: String,
    list: Array,
    show: [Array, Object],
    create: [Array, Object],
    edit: [Array, Object],
    customCreate: Object,
    customEdit: Object,
    resourceIdName: {
      type: String,
      default: 'id'
    },
    apiUrl: {
      type: String,
      required: true
    },
    redirect: {
      type: Object,
      default: () => ({
        views: {
          create: 'list',
          edit: 'show'
        }
      })
    },
    parseResponses: {
      type: Object,
      default: () => ({
        single: null,
        list: null
      })
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
      const resourceName = "resources/addRoute";
      this.$store.commit(resourceName, { path, name });
    },
    loadRoutes() {
      const resourcePath = `/${this.name}`
      const routes = [];

      this.addRoute(resourcePath, this.name);

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

      routes.push(bind.list({ wrapper: List }))
      routes.push(bind.show({ wrapper: Show }))
      routes.push(bind.create({ wrapper: Create }))
      routes.push(bind.edit({ wrapper: Edit }));

      this.$router.addRoutes(routes);
    }
  },
  mounted: function() {
    this.loadRoutes();
  }
};
</script>

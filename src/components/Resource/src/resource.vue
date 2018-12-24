<template>
  <div></div>
</template>

<script>
import { List, Show, Create, Edit } from "../../Actions";
import createCrudModule from "vuex-crud";
import createUtils from '../../../store/utils/create.utils'

export default {
  name: "Resource",
  props: {
    name: String,
    list: Array,
    show: Array,
    create: Array,
    edit: Array,
    customCreate: Object,
    resourceId: {
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
  data() {
    return {
      fullRoute: null
    };
  },
  created: function() {
    const customUrlFn = (id) => {
      const rootUrl =`${this.apiUrl}${this.name}/`
      return id ? `${rootUrl}${id}` : rootUrl
    }
    let module = createCrudModule({
      resource: this.name,
      customUrlFn,
      idAttribute: this.resourceId,
      ...this.parseResponses
    });
    this.$store.registerModule(this.name, module);
  },
  methods: {
    addRoute: function(path, name) {
      const resourceName = "resources/addRoute";
      this.$store.commit(resourceName, { path, name });
    },
    loadRoutes() {
      this.fullRoute = "/" + this.name;
      const path = this.fullRoute;
      const routes = [];

      this.addRoute(path, this.name);

      routes.push(this.bindList(path));
      routes.push(this.bindShow(path));
      routes.push(this.bindCreate(path));
      routes.push(this.bindEdit(path));
      routes.push(this.bindNewCreateView(path));

      this.$router.addRoutes(routes);
    },

    bindNewCreateView(path) {
      const resourceName = this.name
      const resourceIdName = this.resourceId
      const utils = createUtils({
        redirectView: this.redirect.views.create,
        resourceIdName,
        resourceName,
        router: this.$router,
        store: this.$store
      })
      return {
        path: `${path}/test`,
        name: `${this.name}/test`,
        component: this.customCreate,
        props: {
          va: {
            resourceName,
            ...utils
          }
        }
      }
    },

    bindList(path) {
      const hasShow = this.show.length !== 0;
      const hasCreate = this.create.length !== 0;

      return this.list ? { path: path, name: `${this.name}/list`, component: List, props: { name: this.name, fields: this.list, hasShow, hasCreate, resourceId: this.resourceId }} : []
    },

    bindShow(path) {
      return this.show ? { path: `${path}/show/:id`, name: `${this.name}/show`, component: Show, props: { name: this.name, fields: this.show }} : []
    },

    bindCreate(path) {
      const redirect = { idField: this.resourceId, view: this.redirect.views.create }
      return this.create ? { path: `${path}/create`, name: `${this.name}/create`, component: Create, props: { name: this.name, fields: this.create, redirect }} : []
    },

    bindEdit(path) {
      const redirect = { idField: this.resourceId, view: this.redirect.views.edit }
      return this.edit ? { path: `${path}/edit/:id`, name: `${this.name}/edit`, component: Edit, props: { name: this.name, fields: this.edit, redirect }} : []
    }

  },
  mounted: function() {
    this.loadRoutes();
  }
};
</script>

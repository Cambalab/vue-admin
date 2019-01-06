<template>
  <div></div>
</template>

<script>
import { List, Show, Create, Edit } from "../../Actions";
import createCrudModule from "../../../store/utils/modules";
import createUtils from '../../../store/utils/create.utils'
import editUtils from '../../../store/utils/edit.utils'

export default {
  name: "Resource",
  props: {
    name: String,
    list: Array,
    show: Array,
    create: [Array, Object],
    edit: [Array, Object],
    customCreate: Object,
    customEdit: Object,
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
  created: function() {
    createCrudModule({
      apiUrl: this.apiUrl,
      resourceName: this.name,
      resourceIdName: this.resourceId,
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
      this.fullRoute = "/" + this.name;
      const path = this.fullRoute;
      const routes = [];

      this.addRoute(path, this.name);

      routes.push(this.bindList(path));
      routes.push(this.bindShow(path));
      routes.push(this.bindCreate(path));
      routes.push(this.bindEdit(path));

      this.$router.addRoutes(routes);
    },

    bindCustomCreateView() {
      const view = 'create'

      const resourceName = this.name
      const resourceIdName = this.resourceId
      const utils = createUtils({
        redirectView: this.redirect.views[view],
        resourceIdName,
        resourceName,
        router: this.$router,
        store: this.$store,
        parseResponses: this.parseResponses
      })
      return {
        path: `${this.fullRoute}/create`,
        name: `${this.name}/create`,
        component: this.create,
        props: {
          va: {
            resourceName,
            ...utils
          }
        }
      }
    },

    bindCustomEditView() {
      const view = 'edit'

      const resourceName = this.name
      const resourceIdName = this.resourceId
      const utils = editUtils({
        redirectView: this.redirect.views[view],
        resourceIdName,
        resourceName,
        router: this.$router,
        store: this.$store,
        parseResponses: this.parseResponses
      })
      return {
        path: `${this.fullRoute}/edit/:id`,
        name: `${this.name}/edit`,
        component: this.edit,
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
      const create = this.create
      if (create instanceof Array) {
        const redirect = { idField: this.resourceId, view: this.redirect.views.create }
        return create ? { path: `${path}/create`, name: `${this.name}/create`, component: Create, props: { name: this.name, fields: create, redirect }} : []
      }
      else return this.bindCustomCreateView()
    },

    bindEdit(path) {
      const edit = this.edit
      if (edit instanceof Array) {
        const redirect = { idField: this.resourceId, view: this.redirect.views.edit }
        return edit ? { path: `${path}/edit/:id`, name: `${this.name}/edit`, component: Edit, props: { name: this.name, fields: edit, redirect }} : []
      }
      else return this.bindCustomEditView()
    }

  },
  mounted: function() {
    this.loadRoutes();
  }
};
</script>

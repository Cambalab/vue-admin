<template>
  <div></div>
</template>

<script>
import List from "../../List";
import Show from "../../Show";
import Create from "../../Create";
import createCrudModule from "vuex-crud";

export default {
  name: "Resource",
  props: {
    name: String,
    list: Array,
    show: Array,
    create: Array,
    redirect: {
      type: Object,
      default: () => ({
        idField: 'id',
        views: {
          create: 'list',
          update: 'show'
        }
      })
    }
  },
  data() {
    return {
      fullRoute: null
    };
  },
  created: function() {
    let module = createCrudModule({
      resource: this.name,
      customUrlFn(id) {
        const rootUrl = 'http://localhost:8080/api/articles/' // TODO: usar una constante para http://localhost:8081 - santiago
        return id ? `${rootUrl}${id}` : rootUrl
      }
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

      routes.push(this.bindList(routes, path));
      routes.push(this.bindShow(routes, path));
      routes.push(this.bindCreate(routes, path));

      this.$router.addRoutes(routes);
    },

    bindList(routes, path) {
      const hasShow = this.show.length !== 0;
      const hasCreate = this.create.length !== 0;

      return this.list ? { path: path, name: `${this.name}/list`, component: List, props: { name: this.name, fields: this.list, hasShow, hasCreate }} : []
    },

    bindShow(routes, path) {
      return this.show ? { path: `${path}/:id`, name: `${this.name}/show`, component: Show, props: { name: this.name, fields: this.show }} : []
    },

    bindCreate(routes, path) {
      const redirect = { idField: this.redirect.idField, view: this.redirect.views.create }
      return this.create ? { path: `${path}/create`, name: `${this.name}/create`, component: Create, props: { name: this.name, fields: this.create, redirect }} : []
    }
  },
  mounted: function() {
    this.loadRoutes();
  }
};
</script>

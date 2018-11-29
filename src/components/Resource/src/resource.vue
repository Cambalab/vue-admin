<template>
  <div></div>
</template>

<script>
import List from "../../List";
import Show from "../../Show";
import Create from "../../Create";
import Edit from "../../Edit";
import createCrudModule from "vuex-crud";

export default {
  name: "Resource",
  props: {
    name: String,
    list: Array,
    show: Array,
    create: Array,
    edit: Array,
    resourceId: {
      type: String,
      default: 'id'
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

      routes.push(this.bindList(path));
      routes.push(this.bindShow(path));
      routes.push(this.bindCreate(path));
      routes.push(this.bindEdit(path));

      this.$router.addRoutes(routes);
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
      return this.create ? { path: `${path}/create`, name: `${this.name}/create`, component: Create, props: { name: this.name, fields: this.create }} : []
    },

    bindEdit(path) {
      return this.edit ? { path: `${path}/edit/:id`, name: `${this.name}/edit`, component: Edit, props: { name: this.name, fields: this.edit }} : []
    }

  },
  mounted: function() {
    this.loadRoutes();
  }
};
</script>

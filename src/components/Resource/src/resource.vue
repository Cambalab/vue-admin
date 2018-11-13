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
    views: Array,
    fields: Array
  },
  data() {
    return {
      fullRoute: null
    };
  },
  created: function() {
    let module = createCrudModule({
      resource: this.name,
      idAttribute: 'id',
      customUrlFn(id) {
        // TODO: usar una constante para http://localhost:8080 - santiago
        // TODO: verificar que el puerto sea el que esté usando feathers
        const rootUrl = 'http://localhost:8080/api/articles/'
        return id ? `${rootUrl}${id}` : rootUrl
      },
      parseList(response) {
        const { data } = response;
        return Object.assign({}, response, {
          data: data.data // expecting array of objects with IDs
        });
      },
      parseSingle(response) {
        const { data } = response;
        return Object.assign({}, response, {
          data // expecting object with ID
        });
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
      const hasShow = this.views.some(v => v === 'show');
      const hasCreate = this.views.some(v => v === 'create')
      const routes = [];
      this.views.forEach((view) => {
        switch(view) {
          case "list":
            this.addRoute(path, this.name);
            routes.push({ path: path, name: `${this.name}/list`, component: List, props: { name: this.name, fields: this.fields, hasShow, hasCreate }});
            break;
          case "show":
            // Es solo un ejemplo que agrega un link al Drawer para obtener el article con id '1'. Solamente la list debería agregarse por ahora. - santiago
            // this.addRoute(`${path}/1`, this.name);

            // Agrega una ruta para Ver un articulo
            routes.push({ path: `${path}/:id`, name: `${this.name}/show`, component: Show, props: { name: this.name, fields: this.fields }});
            break;
          case "create":
            routes.push({ path: `${path}/create`, name: `${this.name}/create`, component: Create, props: { name: this.name }});
            break;
          default:
            break;
        }
      });

      this.$router.addRoutes(routes);
    }
  },
  mounted: function() {
    this.loadRoutes();
  }
};
</script>

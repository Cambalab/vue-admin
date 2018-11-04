<template>
  <div></div>
</template>

<script>
import List from "../../List";
import Show from "../../Show";
import createCrudModule from "vuex-crud";

export default {
  name: "Resource",
  props: {
    name: String,
    views: Array
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
        const rootUrl = 'http://localhost:8081/api/articles/' // TODO: usar una constante para http://localhost:8081 - santiago
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
      const hasShow = this.views.some(v => v === 'show');
      const routes = [];
      this.views.forEach((view) => {
        switch(view) {
          case "list":
            this.addRoute(path, this.name);
            routes.push({ path: path, name: `${this.name}/list`, component: List, props: { name: this.name, hasShow }});
            break;
          case "show":
            // Es solo un ejemplo que agrega un link al Drawer para obtener el article con id '1'. Solamente la list debería agregarse por ahora. - santiago
            // this.addRoute(`${path}/1`, this.name);

            // Agrega una ruta para Ver un articulo
            routes.push({ path: `${path}/:id`, name: `${this.name}/show`, component: Show, props: { name: this.name }});
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

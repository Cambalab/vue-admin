<template>
  <div></div>
</template>

<script>
import List from "../../List";
import createCrudModule from "vuex-crud";

export default {
  name: "Resource",
  props: {
    name: String
  },
  data() {
    return {
      fullRoute: null
    };
  },
  created: function() {
    let module = createCrudModule({
      resource: this.name,
      urlRoot: "http://localhost:8080/api/" + this.name
    });
    this.$store.registerModule(this.name, module);
  },
  methods: {
    addRoute: function() {
      const resourceName = "resources/addRoute";
      this.$store.commit(resourceName, { path: this.fullRoute, name: this.name });
    },
    loadRoutes() {
      this.fullRoute = "/" + this.name + "/list";
      this.addRoute();
      this.$router.addRoutes([
        { path: this.fullRoute, component: List, props: { name: this.name } }
      ]);
    }
  },
  mounted: function() {
    this.loadRoutes();
  }
};
</script>

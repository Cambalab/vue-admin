<template>
  
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
    loadRoutes() {
      this.fullRoute = "/" + this.name + "/list";

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
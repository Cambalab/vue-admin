<template>
  <div>
    <h1>Resource component</h1>   
  </div>
</template>

<script>
import List from "../../List";

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
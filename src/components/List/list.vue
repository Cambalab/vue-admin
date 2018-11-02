<template>
  <div>
    <h1> {{name}} resource: list operation </h1>
    <div v-for="resource in resourceList" :key="resource.id">
      <h1>{{ resource.id }}</h1>
      <h1>{{ resource.title }}</h1>
      <p>{{ resource.content }}</p>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "List",

  props: {
    name: {
      type: String,
      default: null
    }
  },

  computed: {
    resourceList: function() {
      const resourceName = this.name + "/list";
      return this.$store.getters[resourceName];
    },

    ...mapState([
      "route" // vuex-router-sync
    ])
  },

  methods: {
    fetchResource: function() {
      const resourceName = this.name + "/fetchList";
      return this.$store.dispatch(resourceName);
    },

    fetchData() {
      return this.fetchResource();
    }
  },

  watch: {
    $route: "fetchData"
  },

  created() {
    this.fetchData();
  }
};
</script>





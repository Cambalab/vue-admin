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
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "List",

  props: {
    name: String
  },

  computed: {
    ...mapGetters("articles", {
      resourceList: "list"
    }),

    ...mapState([
      "route" // vuex-router-sync
    ])
  },

  methods: {
    ...mapActions("articles", {
      fetchResource: "fetchList"
    }),

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





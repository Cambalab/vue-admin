<template>
  <div>
    <h1> {{name}} resource: list operation </h1>
    <div>
      <h1>{{ resourceShow.id }}</h1>
      <h1>{{ resourceShow.title }}</h1>
      <p>{{ resourceShow.content }}</p>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "Show",

  props: {
    name: {
      type: String,
      default: null
    }
  },

  computed: {
    resourceShow: function() {
      const resourceName = this.name + "/byId";
      return this.$store.getters[resourceName](this.$route.params.id);
    },

    ...mapState([
      "route" // vuex-router-sync
    ])
  },

  methods: {
    fetchResource: function() {
      const resourceName = this.name + "/fetchSingle";
      return this.$store.dispatch(resourceName, { id: this.$route.params.id });
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

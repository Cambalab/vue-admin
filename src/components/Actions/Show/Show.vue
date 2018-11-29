<template>
  <div>
    <h1> {{name}} resource: show operation </h1>
    <div>
      <component
        :name="field.label"
        v-for="field in fields"
        :key="field.id"
        :is="field.type"
        v-bind:content="resourceShow[field.label]"
        v-bind="field">
      </component>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import { Input, TextField } from "../../UiComponents"

export default {
  name: "Show",

  props: {
    name: {
      type: String,
      default: null
    },
    fields: {
      type: Array
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

  components: {
    Input: Input,
    TextField: TextField
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

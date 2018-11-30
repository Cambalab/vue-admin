<template>
  <div>
    <h1> {{name}} resource: show operation </h1>
    <div>
      <component
        :name="label(field)"
        v-for="field in fields"
        :key="key(field)"
        :is="type(field.type)"
        v-bind:content="resourceShow[label(field)]"
        v-bind="args(field)">
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
    },

    type(type) {
      return type || 'TextField'
    },

    key() {
      return Math.random()
    },

    label(field) {
      return field.label || field
    },

    args(field) {
      const args = typeof(field) === 'string' ? { 'label': field } : field
      return args
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

<template>
  <div>
    <h1> {{name}} resource: create operation </h1>
    <div>
      <component
        :name="label(field)"
        v-for="field in fields"
        :key="key(field)"
        :is="type(field.type)"
        v-bind="args(field)"
        v-on:change="saveValue($event, label(field))">
      </component>
      <button v-on:click="submit">Save</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Input from "../Input"

export default {
  name: "Create",

  props: {
    name: {
      type: String,
      default: null
    },
    fields: {
      type: Array
    }
  },
  data() {
    return {
      resource: {}
    }
  },
  computed: {
    ...mapState([
      "route" // vuex-router-sync
    ])
  },

  components: {
    Input: Input
  },

  methods: {
    saveValue(event, field) {
      this.resource[field] = event.target.value;
    },

    submit() {
      const resourceName = this.name + "/create";
      return this.$store.dispatch(resourceName, { data: this.resource });
    },

    type(type) {
      return type || 'Input'
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

  created() {

  }
};
</script>

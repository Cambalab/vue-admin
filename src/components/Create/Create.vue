<template>
  <div>
    <h1> {{name}} resource: create operation </h1>
    <div>
      <component
        :name="field.label"
        v-for="field in fields"
        :key="field.id"
        :is="field.type"
        v-bind="field"
        v-on:change="saveValue($event, field.label)">
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
    }
  },

  created() {

  }
};
</script>

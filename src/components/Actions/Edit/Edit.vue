<template>
  <div>
    <component
      :name="label(field)"
      v-for="field in fields"
      :key="key(label(field))"
      :is="type(field.type)"
      v-bind="args(field)"
      :value="resource[label(field)]"
      v-on:change="saveValue($event, label(field))">
    </component>
    <button v-on:click="submit">Save</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Input, TextField } from "../../UiComponents"

export default {
  name: "Edit",
  components: {
    Input: Input,
    TextField: TextField
  },
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
    const resourceName = this.name + "/byId";
    const resource = JSON.parse(JSON.stringify(this.$store.getters[resourceName](this.$route.params.id)))
    return {
      resource
    }
  },
  computed: {
    ...mapState([
      "route" // vuex-router-sync
    ])

  },

  methods: {
    saveValue(event, fieldName) {
      this.resource[fieldName] = event.target.value;
    },

    submit() {
      const resourceName = this.name + "/update";
      return this.$store.dispatch(resourceName, { id: this.$route.params.id , data: this.resource });
    },

    type(type) {
      return type || 'Input'
    },

    key(label) {
      return `${this.name}_${label}`
    },

    label(field) {
      return field.label || field
    },

    args(field) {
      const args = typeof(field) === 'string' ? { 'label': field } : field
      return args
    }
  }

};
</script>

<template>
  <div>
    <component
      :name="field.label"
      v-for="field in fields"
      :key="field.id"
      :is="field.type"
      v-bind="field"
      :value="resource[field.label]"
      v-on:change="saveValue($event, field.label)">
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
    }
  }

};
</script>

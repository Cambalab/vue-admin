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
import Router from "../../../router"

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
    },
    redirect: {
      type: Object,
      default: () => ({
        idField: 'id',
        view: 'show'
      })
    },
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
      // TODO: The then, catch could possibly be moved to the store using vuex-crud callbacks. Read #34 for docs - sgobotta
      this.$store.dispatch(resourceName, { id: this.$route.params.id , data: this.resource })
        .then((res) => {
          if (this.redirect && res.status === 200) {
            Router.redirect({ resource: this.name, view: this.redirect.view, id: res.data[this.redirect.idField] })
            return res
          }
        })
        .catch((err) => {
          // eslint-disable-next-line 
          console.error(err)
        })
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

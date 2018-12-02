<template>
  <div>
    <h1> {{name}} resource: create operation </h1>
    <div>
      <component
        :name="label(field)"
        v-for="field in fields"
        :key="key(label(field))"
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
import { Input, TextField } from "../../UiComponents"
import Router from '../../../router'

export default {
  name: "Create",
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
    return {
      resource: {}
    }
  },
  computed: {
    ...mapState([
      "route" // vuex-router-sync
    ])
  },

  methods: {
    saveValue(event, field) {
      this.resource[field] = event.target.value;
    },

    submit() {
      const resourceName = this.name + "/create";
      // TODO: The then, catch could possibly be moved to the store using vuex-crud callbacks. Read #34 for docs - sgobotta
      this.$store.dispatch(resourceName, { data: this.resource })
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
  },

  created() {

  }
};
</script>

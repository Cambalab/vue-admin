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
          console.error(err)
        })
    }
  },

  created() {

  }
};
</script>

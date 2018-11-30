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
import Input from "../Input"
import Router from "../../router"

export default {
  name: "Edit",

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

  components: {
    Input: Input
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
          console.error(err)
          return err
        })
    }
  }

};
</script>

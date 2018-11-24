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
    },
    redirect: {
      type: Object
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

  components: {
    Input: Input
  },

  methods: {
    saveValue(event, field) {
      this.resource[field] = event.target.value;
    },

    submit() {
      const resourceName = this.name + "/create";
      this.$store.dispatch(resourceName, { data: this.resource })
        .then((res) => {
          if (this.redirect && res.status === 200) {
            this.redirectRouter(res.data[this.redirect.idField])
            return res
          }
        })
        .catch((err) => {
          console.error(err)
          return err
        })
    },

    redirectRouter(id) {
      switch (this.redirect.view) {
        case 'list':
          this.$router.push({ name: `${this.name}/${this.redirect.view}` })
          break
        case 'show':
          this.$router.push({ name: `${this.name}/${this.redirect.view}`, params: { id } })
          break
      }
    }
  },

  created() {

  }
};
</script>

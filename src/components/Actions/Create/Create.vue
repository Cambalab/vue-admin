<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0 text-capitalize">{{name}}</h3>
    </v-card-title>
    <v-form>
      <v-card-text>
        <v-layout wrap>
          <v-flex xs8>
            <component
              :name="label(field)"
              v-for="field in fields"
              :key="key(label(field))"
              :is="type(field.type)"
              v-bind="args(field)"
              :value="resource[label(field)]"
              @change="saveValue($event, label(field))">
            </component>
          </v-flex>
          <v-flex xs12>
            <v-btn color="success" v-on:click="submit">Save</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-form>
  </v-card>
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
    saveValue(newValue, fieldName) {
      this.resource[fieldName] = newValue;
    },

    submit() {
      const resourceName = this.name + "/create";
      // TODO: The then, catch could possibly be moved to the store using vuex-crud callbacks. Read #34 for docs - sgobotta
      this.$store.dispatch(resourceName, { data: this.resource })
        .then((res) => {
          if (this.redirect && res.status === 200) {
            Router.redirect({ router: this.$router, resource: this.name, view: this.redirect.view, id: res.data[this.redirect.idField] })
            return res
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
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
      const args = typeof(field) === 'string' ? { 'label': field, 'placeHolder': field } : field
      return args
    }
  }
};
</script>

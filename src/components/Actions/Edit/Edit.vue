<template>
  <v-card :name="editViewContainer()">
    <v-card-title primary-title :name="titleContainer()">
      <h3 class="headline mb-0 text-capitalize">{{titleContent()}}</h3>
    </v-card-title>
    <v-form>
      <v-card-text :name="fieldsContainer()">
        <v-layout wrap>
          <v-flex xs8>
            <component
              :name="fieldName(field)"
              v-for="field in fields"
              :key="key(label(field))"
              :is="type(field.type)"
              v-bind="args(field)"
              :value="resource[label(field)]"
              @change="saveValue($event, label(field))">
            </component>
          </v-flex>
          <v-flex xs12>
            <v-btn :name="submitButtonName()" color="success" v-on:click="submit">Save</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import UI_CONTENT from '../../../constants/ui.content.default'
import UI_NAMES from '../../../constants/ui.element.names'
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
    return {
      resource: {},
      resourceName: this.name,
      view: 'edit'
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
      const resourceName = this.name + "/update";
      // TODO: The then, catch could possibly be moved to the store using vuex-crud callbacks. Read #34 for docs - sgobotta
      this.$store.dispatch(resourceName, { id: this.$route.params.id , data: this.resource })
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
    },

    getResource() {
      const resourceName = this.name + "/byId";
      return this.$store.getters[resourceName](this.$route.params.id)
    },

    editViewContainer() {
      return UI_NAMES.RESOURCE_VIEW_CONTAINER.with({ resourceName: this.resourceName, view: this.view })
    },

    titleContainer() {
      return UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({ resourceName: this.resourceName, view: this.view })
    },

    titleContent() {
      return UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName: this.resourceName })
    },

    fieldName(field) {
      return UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({ resourceName: this.resourceName, view: this.view, field: this.label(field) })
    },

    fieldsContainer() {
      return UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({ resourceName: this.resourceName, view: this.view })
    },

    submitButtonName() {
      return UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({ resourceName: this.resourceName, view: this.view })
    }

  },

  created() {
    this.resource = this.getResource();
  }

};
</script>

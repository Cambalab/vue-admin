<template>
  <v-card :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER.with({ resourceName, view })}`">
    <v-card-title primary-title :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({ resourceName, view })}`">
      <h3 class="headline mb-0 text-capitalize">
        {{UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName, view })}}
      </h3>
    </v-card-title>
    <v-form>
      <v-card-text>
        <v-layout wrap>
          <v-flex xs8>
            <component
              :name="`${UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field: label(field) })}`"
              v-for="field in fields"
              :key="key(label(field))"
              :is="type(field.type)"
              v-bind="args(field)"
              :value="resource[label(field)]"
              @change="saveValue($event, label(field))">
            </component>
          </v-flex>
          <v-flex xs12>
            <v-btn
              :name="`${UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({ resourceName, view })}`"
              color="success"
              v-on:click="submit">
              {{UI_CONTENT.CREATE_SUBMIT_BUTTON}}
            </v-btn>
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
import Router from '../../../router'

export default {
  name: "Create",
  components: {
    Input: Input,
    TextField: TextField
  },
  props: {
    resourceName: {
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
      view: 'create',
      UI_CONTENT,
      UI_NAMES
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
      const resourceName = this.resourceName + "/create";
      // TODO: The then, catch could possibly be moved to the store using vuex-crud callbacks. Read #34 for docs - @sgobotta
      this.$store.dispatch(resourceName, { data: this.resource })
        .then((res) => {
          const { status } = res
          if ([200, 201].indexOf(status) !== -1) {
            // FIXME: looking for 'data' in res could cause conflicts depending on how the user api responds - @sgobotta
            Router.redirect({ router: this.$router, resource: this.resourceName, view: this.redirect.view, id: res.data[this.redirect.idField] })
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
      return `${this.resourceName}_${label}`
    },

    label(field) {
      return field.label || field
    },

    args(field) {
      const args = typeof(field) === 'string' ? { label: field, placeHolder: field } : field
      return args
    }
  }
};
</script>

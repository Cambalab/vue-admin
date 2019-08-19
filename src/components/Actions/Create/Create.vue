<template>
  <v-card :name="names.viewContainer">
    <Spinner :spin="isLoading"></Spinner>
    <v-card-title primary-title :name="names.titleContainer">
      <h3 class="headline mb-0 text-capitalize">
        {{content.title}}
      </h3>
    </v-card-title>
    <v-form>
      <v-card-text>
        <v-layout wrap>
          <v-flex xs8>
            <component
              :name="names.containerField(label(field))"
              :ref="names.containerField(label(field))"
              v-for="field in fields"
              :key="names.containerField(label(field))"
              :is="type(field)"
              v-bind="args(field)"
              @change="storeValue($event, label(field))">
            </component>
          </v-flex>
          <v-flex xs12>
            <v-btn
              :name="names.submitButton"
              color="success"
              v-on:click="submit">
              {{content.submitButton}}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import { mapState } from "vuex";
import { Input, TextField, Spinner, DateInput } from "../../UiComponents"

export default {
  name: "Create",
  components: {
    Input: Input,
    TextField: TextField,
    Spinner: Spinner,
    DateInput
  },
  props: {
    resourceName: {
      type: String,
      require: true
    },
    fields: {
      type: Array,
      required: true
    },
    va: {
      type: Object,
      required: true
    }
  },
  data() {
    const resourceName = this.resourceName
    const view = 'create'
    const content = {
      submitButton: UI_CONTENT.CREATE_SUBMIT_BUTTON,
      title: UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName, view })
    }
    const names = {
      containerField: (field) => UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
        resourceName,
        view,
        field
      }),
      submitButton: UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({
        resourceName,
        view
      }),
      titleContainer: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
        resourceName,
        view
      }),
      viewContainer: UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
        resourceName,
        view
      })
    }
    return { content, names }
  },

  computed: {
    ...mapState([
      "route" // vuex-router-sync
    ]),
    isLoading() {
      return this.$store.getters['requests/isLoading']
    }
  },

  mounted: function() {
    this.va.initEntity()
  },

  methods: {
    storeValue(value, resourceKey) {
      this.va.updateEntity({ resourceKey, value })
    },

    submit() {
      this.va.submitEntity()
    },

    type(field) {
      return field.type || 'Input'
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

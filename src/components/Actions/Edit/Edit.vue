<template>
  <v-card :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER.with({ resourceName, view })}`">
    <Spinner :spin="isLoading"></Spinner>
    <v-card-title primary-title :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({ resourceName, view })}`">
      <h3 class="headline mb-0 text-capitalize">{{UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName })}}</h3>
    </v-card-title>
    <v-form>
      <v-card-text :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({ resourceName, view })}`">
        <v-layout wrap>
          <v-flex xs8>
            <component
              :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({ resourceName, view, field: label(field) })}`"
              v-if="entity"
              v-for="field in fields"
              :key="key(label(field))"
              :is="type(field.type)"
              v-bind="args(field)"
              :value="entity[label(field)]"
              @change="storeValue($event, label(field))">
            </component>
          </v-flex>
          <v-flex xs12>
            <v-btn :name="`${UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({ resourceName, view })}`" color="success" v-on:click="submit">{{UI_CONTENT.EDIT_SUBMIT_BUTTON}}</v-btn>
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
  name: "Edit",
  components: {
    Input: Input,
    TextField: TextField,
    Spinner: Spinner,
    DateInput
  },
  props: {
    resourceName: {
      type: String,
      default: null
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
    return {
      view: 'edit',
      UI_CONTENT,
      UI_NAMES
    }
  },
  computed: {
    ...mapState([
      "route" // vuex-router-sync
    ]),
    entity() {
      return this.va.getEntity()
    },
    isLoading() {
      return this.$store.getters['requests/isLoading'];
    }
  },

  methods: {
    storeValue(value, resourceKey) {
      this.va.updateEntity({ resourceKey, value })
    },

    storeValues() {
      this.fields.forEach(field => {
        const label = this.label(field)
        this.storeValue(this.entity[label], label)
      })
    },

    submit() {
      this.va.submitEntity()
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
      const args = typeof(field) === 'string' ? { 'label': field, 'placeHolder': field } : field
      return args
    }
  },

  created() {
    this.va.fetchEntity().then(this.storeValues)
  }

};
</script>

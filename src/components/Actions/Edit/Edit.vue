<template>
  <v-card :name="names.viewContainer">
    <Spinner :spin="isLoading"></Spinner>
    <v-card-title primary-title :name="names.titleContainer">
      <h3 class="headline mb-0 text-capitalize">
        {{ content.title }}
      </h3>
    </v-card-title>
    <v-form>
      <v-card-text md4 :name="names.containerFields">
        <v-layout wrap>
          <v-flex xs8>
            <span v-if="entity">
              <component
                :name="names.containerField(label(field))"
                v-for="field in fields"
                :key="names.containerField(label(field))"
                :is="type(field)"
                v-bind="args(field)"
                :value="entity[label(field)]"
                @change="storeValue($event, label(field))"
              >
              </component>
            </span>
          </v-flex>
          <v-flex xs12>
            <v-btn
              :name="names.submitButton"
              color="success"
              v-on:click="submit"
            >
              {{ content.submitButton }}
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
import { mapState } from 'vuex'
import { Input, TextField, Spinner, DateInput } from '../../UiComponents'

export default {
  name: 'Edit',
  props: {
    resourceName: {
      type: String,
      default: null,
    },
    fields: {
      type: Array,
      required: true,
    },
    title: {
      type: [String, Object],
    },
    va: {
      type: Object,
      required: true,
    },
  },
  components: {
    Input,
    TextField,
    Spinner,
    DateInput,
  },
  data() {
    const resourceName = this.resourceName
    const view = 'edit'
    const content = {
      submitButton: UI_CONTENT.EDIT_SUBMIT_BUTTON,
      title:
        this.title ||
        UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName, view }),
    }
    const names = {
      containerField: field =>
        UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({
          resourceName,
          view,
          field,
        }),
      containerFields: UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({
        resourceName,
        view,
      }),
      submitButton: UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({
        resourceName,
        view,
      }),
      titleContainer: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
        resourceName,
        view,
      }),
      viewContainer: UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
        resourceName,
        view,
      }),
    }
    return { content, names }
  },
  computed: {
    ...mapState([
      'route', // vuex-router-sync
    ]),
    entity() {
      return this.va.getEntity()
    },
    isLoading() {
      return this.$store.getters['requests/isLoading']
    },
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
      const args =
        typeof field === 'string' ? { label: field, placeHolder: field } : field
      return args
    },
  },
  created() {
    this.va.fetchEntity().then(this.storeValues)
  },
}
</script>

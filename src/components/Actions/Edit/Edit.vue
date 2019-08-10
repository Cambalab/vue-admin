<template>
  <v-card :name="names.viewContainer">
    <Spinner :spin="isLoading"></Spinner>
    <v-form>
      <v-card-text :name="names.containerFields">
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
                @change="storeValue($event, label(field))">
              </component>
            </span>
          </v-flex>
          <v-flex xs12>
            <v-btn
              :name="names.submitButton"
              color="success"
              v-on:click="submit"
            >
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
  name: "Edit",
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
  components: {
    Input,
    TextField,
    Spinner,
    DateInput
  },
  data() {
    const resourceName = this.resourceName
    const view = 'edit'
    const content = {
      submitButton: UI_CONTENT.EDIT_SUBMIT_BUTTON
    }
    const names = {
      containerField: (field) => UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({
        resourceName,
        view,
        field
      }),
      containerFields: UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({
        resourceName,
        view
      }),
      submitButton: UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({
        resourceName,
        view
      }),
      viewContainer: UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
        resourceName,
        view
      })
    }
    return {
      content,
      names
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
    type(field) {
      return field.field || 'Input'
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

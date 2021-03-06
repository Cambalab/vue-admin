<template>
  <v-card :name="names.viewContainer">
    <Spinner :isLoading="isLoading"></Spinner>
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
                v-for="field in fields"
                :name="names.containerField(field.label)"
                :key="names.containerField(field.label)"
                :is="field.tag"
                v-bind="field"
                :value="entity[field.label]"
                @change="storeValue($event, field.label)"
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
import {
  TextField,
  SimpleText,
  Spinner,
  DateField,
} from '@components/UiComponents'
import { Types as RequestsTypes } from '@store/modules/requests'

export default {
  name: 'Edit',
  props: {
    resourceName: {
      type: String,
      required: true,
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
    TextField,
    SimpleText,
    Spinner,
    DateField,
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
      const { namespace, REQUESTS_IS_LOADING } = RequestsTypes
      return this.$store.getters[`${namespace}/${REQUESTS_IS_LOADING}`]
    },
  },
  methods: {
    storeValue(value, resourceKey) {
      this.va.updateEntity({ resourceKey, value })
    },
    storeValues() {
      this.fields.forEach(field => {
        const { label } = field
        this.storeValue(this.entity[label], label)
      })
    },
    submit() {
      this.va.submitEntity()
    },
  },
  created() {
    this.va.fetchEntity().then(this.storeValues)
  },
}
</script>

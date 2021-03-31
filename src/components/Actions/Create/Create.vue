<template>
  <v-card :name="names.viewContainer">
    <Spinner :isLoading="isLoading"></Spinner>
    <v-card-title primary-title :name="names.titleContainer">
      <h3 class="headline mb-0 text-capitalize">
        {{ content.title }}
      </h3>
    </v-card-title>
    <v-form>
      <v-card-text :name="names.containerFields">
        <v-layout wrap>
          <v-flex xs8>
            <component
              :name="names.containerField(field.label)"
              :ref="names.containerField(field.label)"
              v-for="field in fields"
              :key="names.containerField(field.label)"
              :is="field.tag"
              v-bind="field"
              @change="storeValue($event, field.label)"
            >
            </component>
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
  name: 'Create',
  components: {
    TextField,
    SimpleText,
    Spinner,
    DateField,
  },
  props: {
    resourceName: {
      type: String,
      require: true,
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
  data() {
    const resourceName = this.resourceName
    const view = 'create'
    const content = {
      submitButton: UI_CONTENT.CREATE_SUBMIT_BUTTON,
      title:
        this.title ||
        UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName, view }),
    }
    const names = {
      containerField: field =>
        UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
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
    isLoading() {
      const { namespace, REQUESTS_IS_LOADING } = RequestsTypes
      return this.$store.getters[`${namespace}/${REQUESTS_IS_LOADING}`]
    },
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
  },
}
</script>

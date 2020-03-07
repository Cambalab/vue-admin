<template>
  <v-layout>
    <v-flex lg12 xs12 sm12>
      <v-card :name="names.viewContainer">
        <Spinner :isLoading="isLoading"></Spinner>
        <v-toolbar color="white" :name="names.viewActionsContainer">
          <v-card-title primary-title :name="names.titleContainer">
            <h3 class="headline mb-0 text-capitalize">
              {{ content.title }}
            </h3>
          </v-card-title>
          <v-spacer />
          <EditButton
            :name="names.editButton"
            :resourceId="$route.params.id"
            :resourceName="resourceName"
          />
          <DeleteButton
            :name="names.deleteButton"
            :resourceId="$route.params.id"
            :resourceIdName="resourceIdName"
            :resourceName="resourceName"
          />
        </v-toolbar>
        <v-card-text
          :name="names.containerFields"
          v-if="resourceShow !== undefined"
        >
          <component
            :name="names.containerField(field.label)"
            v-for="field in fields"
            :key="names.containerField(field.label)"
            :is="field.tag"
            v-bind:value="resourceShow[field.label]"
            v-bind="field"
          />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import UI_NAMES from '@constants/ui.element.names'
import UI_CONTENT from '@constants/ui.content.default'
import { mapState } from 'vuex'
import {
  DeleteButton,
  EditButton,
  TextField,
  SimpleText,
  Spinner,
} from '@components/UiComponents'
import { Types as RequestsTypes } from '@store/modules/requests'

export default {
  name: 'Show',
  props: {
    resourceIdName: {
      type: String,
      required: true,
    },
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
    DeleteButton,
    EditButton,
    Spinner,
  },
  data() {
    const resourceName = this.resourceName
    const view = 'show'
    const content = {
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
      deleteButton: UI_NAMES.RESOURCE_VIEW_ACTIONS_DELETE_BUTTON.with({
        resourceName,
        view,
      }),
      editButton: UI_NAMES.RESOURCE_VIEW_ACTIONS_EDIT_BUTTON.with({
        resourceName,
        view,
      }),
      titleContainer: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
        resourceName,
        view,
      }),
      viewActionsContainer: UI_NAMES.RESOURCE_VIEW_ACTIONS_CONTAINER.with({
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
    resourceShow: function() {
      return this.va.getEntity()
    },
    ...mapState([
      'route', // vuex-router-sync
    ]),
    isLoading() {
      const { namespace, REQUESTS_IS_LOADING } = RequestsTypes
      return this.$store.getters[`${namespace}/${REQUESTS_IS_LOADING}`]
    },
  },
  methods: {
    fetchData() {
      return this.va.fetchEntity()
    },
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData()
  },
}
</script>

<template>
  <v-card :name="names.viewContainer">
    <Spinner :spin="isLoading"></Spinner>
    <v-toolbar
      flat
      color="white"
      :name="names.viewActionsContainer"
    >
      <v-spacer />
      <EditButton
        :resourceId="$route.params.id"
        :resourceName="resourceName"
      />
      <Delete
        :resourceId="$route.params.id"
        :resourceName="resourceName"
      />
    </v-toolbar>
    <v-card-text :name="names.containerFields"
      v-if="resourceShow !== undefined"
    >
      <component
        :name="names.containerField(label(field))"
        v-for="field in fields"
        :key="names.containerField(label(field))"
        :is="type(field)"
        v-bind:value="resourceShow[label(field)]"
        v-bind="args(field)"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import UI_NAMES from '@constants/ui.element.names'
import { mapState } from "vuex"
import { Input, TextField, Spinner } from "../../UiComponents"
import { EditButton, Delete } from "../../Actions"

export default {
  name: "Show",
  props: {
    resourceName: {
      type: String,
      required: true
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
    Delete,
    EditButton,
    Spinner
  },
  data() {
    const resourceName = this.resourceName
    const view = 'show'
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
      viewActionsContainer: UI_NAMES.RESOURCE_VIEW_ACTIONS_CONTAINER.with({
        resourceName,
        view
      }),
      viewContainer: UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
        resourceName,
        view
      })
    }
    return {
      names
    }
  },
  computed: {
    resourceShow: function() {
      return this.va.getEntity()
    },
    ...mapState([
      "route" // vuex-router-sync
    ]),
    isLoading() {
      return this.$store.getters['requests/isLoading']
    }
  },
  methods: {
    fetchData() {
      return this.va.fetchEntity()
    },
    type(field) {
      return field.type || 'TextField'
    },
    label(field) {
      return field.label || field
    },
    args(field) {
      const args = typeof(field) === 'string' ? { 'label': field } : field
      return args
    }
  },
  watch: {
    $route: "fetchData"
  },
  created() {
    this.fetchData()
  }
}
</script>

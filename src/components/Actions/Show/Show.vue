<template>
  <v-card :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER.with({ resourceName, view })}`">
    <Spinner :spin="isLoading"></Spinner>
    <div class="text-xs-center d-flex right" :name="`${UI_NAMES.RESOURCE_VIEW_ACTIONS_CONTAINER.with({ resourceName, view })}`">
        <EditButton
          :resourceId="$route.params.id"
          :resourceName="resourceName">
        </EditButton>
        <Delete
          :resourceId="$route.params.id"
          :resourceName="resourceName">
        </Delete>
    </div>
    <v-card-title primary-title :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({ resourceName, view })}`">
      <h3 class="headline mb-0 text-capitalize">
        {{UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName, view })}}
      </h3>
    </v-card-title>
    <v-card-text :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({ resourceName, view })}`">
      <component
        :name="componentName(field)"
        v-for="field in fields"
        v-if="resourceShow !== undefined"
        :key="key(label(field))"
        :is="type(field.type)"
        v-bind:value="resourceShow[label(field)]"
        v-bind="args(field)">
      </component>
    </v-card-text>
  </v-card>
</template>


<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import { mapState } from "vuex";
import { Input, TextField, Spinner } from "../../UiComponents"
import { EditButton, Delete } from "../../Actions";

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

  data() {
    return {
      view: 'show',
      UI_CONTENT,
      UI_NAMES
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

  components: {
    Input: Input,
    TextField: TextField,
    Delete: Delete,
    EditButton: EditButton,
    Spinner
  },

  methods: {
    fetchData() {
      return this.va.fetchEntity()
    },

    type(type) {
      return type || 'TextField'
    },

    key(label) {
      return `${this.resourceName}_${label}`
    },

    label(field) {
      return field.label || field
    },

    args(field) {
      const args = typeof(field) === 'string' ? { 'label': field } : field
      return args
    },

    componentName(field) {
      return UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({ resourceName: this.resourceName, view: this.view, field: this.label(field) })
    }
  },

  watch: {
    $route: "fetchData"
  },

  created() {
    this.fetchData();
  }
};
</script>

<template>
  <v-card :name="UI_NAMES.RESOURCE_VIEW_CONTAINER.with({ resourceName, view })">
    <div class="text-xs-center d-flex right">
      <router-link
        :name="`${UI_NAMES.RESOURCE_CREATE_BUTTON.with({ resourceName })}`"
        v-if="hasCreate"
        :to="{ name: `${resourceName}/create` }">
        <v-tooltip bottom>
          <v-btn
            icon
            absolute
            right
            color="success"
            slot="activator"
            style="top:20px;">
            <i class="v-icon material-icons">{{UI_CONTENT.RESOURCE_CREATE_BUTTON}}</i>
          </v-btn>
          <span>Create {{resourceName}}</span>
        </v-tooltip>
      </router-link>
    </div>
    <v-card-title
      :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({ resourceName, view })}`"
      primary-title>
      <h3 class="headline mb-0 text-capitalize">{{resourceName}}</h3>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="resourceList"
      class="elevation-1">
      <template
        slot="items"
        slot-scope="props"
        >
        <td class="text-xs-left"
          v-for="field in fields"
          :key="key(label(field))"
          >
          <router-link
            :name="`${UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field: resourceIdName, index: props.index })}`"
            v-if="label(field) === resourceIdName && hasShow"
            :to="{ name: `${resourceName}/show`, params: { id: props.item[resourceIdName] } }">
            <component
              :name="`${UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field: label(field), index: props.index })}`"
              :is="type(field.type)"
              v-bind:content="props.item[label(field)]"
              v-bind="args(field)">
            </component>
          </router-link>
          <span v-else>
            <component
              :name="`${UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field: label(field), index: props.index })}`"
              :is="type(field.type)"
              v-bind:content="props.item[label(field)]"
              v-bind="args(field)">
            </component>
          </span>
        </td>
        <td>
          <EditButton
            :resourceId="props.item[resourceIdName]"
            :resourceName="resourceName">
          </EditButton>
        </td>
        <td class="text-xs-right">
          <Delete
            :resourceId="props.item[resourceIdName]"
            :resourceName="resourceName">
          </Delete>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
import UI_CONTENT from '../../../constants/ui.content.default'
import UI_NAMES from '../../../constants/ui.element.names'
import { mapState } from "vuex";
import { Input, TextField } from "../../UiComponents";
import { EditButton, Delete } from "../../Actions";

export default {
  name: "List",
  props: {
    resourceName: {
      type: String,
      default: null
    },
    hasShow: {
      type: Boolean
    },
    hasCreate: {
      type: Boolean
    },
    fields: {
      type: Array
    },
    resourceIdName:{
      type: String
    }
  },
  data() {
    return {
      view: 'list',
      UI_CONTENT,
      UI_NAMES
    }
  },
  computed: {
    headers: function () {
      const newHeaders = []
      this.fields.forEach((field) => {
        newHeaders.push({
          text: this.label(field),
          align: field.align || 'left',
          sortable: field.sortable || false,
          value: this.label(field)
        })
      })
      newHeaders.push({
        text: "Edit",
        align: 'center',
        sortable: false,
        width: 10
      });
      newHeaders.push({
        text: "Delete",
        align: 'center',
        sortable: false,
        width: 10
      });
      return newHeaders;
    },
    resourceList: function() {
      const resourceName = this.resourceName + "/list";
      return this.$store.getters[resourceName];
    },
    ...mapState([
      "route" // vuex-router-sync
    ])
  },

  components: {
    Input: Input,
    TextField: TextField,
    Delete: Delete,
    EditButton: EditButton
  },

  methods: {
    fetchResource: function() {
      const resourceName = this.resourceName + "/fetchList";
      return this.$store.dispatch(resourceName);
    },

    fetchData() {
      return this.fetchResource();
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

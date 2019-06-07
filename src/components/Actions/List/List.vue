<template>
  <v-card :name="UI_NAMES.RESOURCE_VIEW_CONTAINER.with({ resourceName, view })">
    <Spinner :spin="isLoading"></Spinner>
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
      class="elevation-1"
      disable-initial-sort
      :pagination.sync="pagination"
      >
      <template
        slot="items"
        slot-scope="props"
        >
        <td class="text-xs-left"
          v-for="field in fields"
          :key="key(label(field))"
          :name="`${UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field: label(field), index: props.index })}`"
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
        <td v-if="hasEdit">
          <EditButton
            :resourceId="props.item[resourceIdName]"
            :resourceName="resourceName"
            :index="props.index">
          </EditButton>
        </td>
        <td>
          <Delete
            :resourceId="props.item[resourceIdName]"
            :resourceName="resourceName"
            :index="props.index"
            >
          </Delete>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import UI_ELEMENTS from '@constants/ui.elements.props'
import { Input, TextField, Spinner } from "../../UiComponents";
import { EditButton, Delete } from "../../Actions";

export default {
  name: "List",
  props: {
    resourceName: {
      type: String,
      required: true,
    },
    hasShow: {
      type: Boolean
    },
    hasCreate: {
      type: Boolean
    },
    hasEdit: {
      type: Boolean
    },
    fields: {
      type: Array,
      required: true
    },
    resourceIdName: {
      type: String,
      required: true
    },
    va: {
      type: Object,
      required: true
    }
  },
  data() {
    const { rowsPerPage } = UI_ELEMENTS
    return {
      view: 'list',
      UI_CONTENT,
      UI_NAMES,
      pagination: {
        page: 1,
        rowsPerPage
      }
    }
  },
  computed: {
    headers: function () {
      const newHeaders = []
      this.fields.forEach((field) => {
        newHeaders.push({
          text: field.headerText || this.label(field),
          align: field.alignHeader || 'left',
          sortable: field.sortable || false,
          value: this.label(field)
        })
      })
      this.hasEdit && newHeaders.push({
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
      return this.va.getList()
    },
    isLoading() {
      return this.$store.getters['requests/isLoading']
    }
  },

  components: {
    Input: Input,
    TextField: TextField,
    Delete: Delete,
    EditButton: EditButton,
    Spinner: Spinner
  },

  methods: {
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

  created() {
    this.va.fetchList()
  }
};
</script>

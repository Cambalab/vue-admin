<template>
  <v-card :name="names.viewContainer">
    <Spinner :spin="isLoading"></Spinner>

    <v-data-table
      :headers="headers"
      :items="resourceList"
      class="elevation-1"
      :options.sync="options"
      dense
    >

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title
            :name="names.viewContainerTitle"
            class="headline mb-0 text-capitalize"
          >
            {{resourceName}}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer/>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="hasCreate"
                v-on="on"
                :name="names.createButton"
                @click="onCreateClick()"
                icon
              >
                <v-icon color="teal">{{content.createButton}}</v-icon>
              </v-btn>
            </template>
            <span>Create</span>
          </v-tooltip>
        </v-toolbar>
      </template>

      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="(item, index) in items"
            :key="keys.containerFields(item.id)"
            :name="names.containerFields(index)"
          >
            <td class="text-xs-left"
              v-for="field in fields"
              :key="keys.elementField(label(field), index)"
              :name="names.elementField(label(field), index)"
            >
                <v-chip
                  :name="names.elementField(resourceIdName, index)"
                  v-if="label(field) === resourceIdName && hasShow"
                  @click="onIdClick(item[resourceIdName])"
                >
                  <component
                    :name="names.elementField(label(field))"
                    :is="type(field)"
                    v-bind:value="item[label(field)]"
                    v-bind="args(field)"
                  />
                </v-chip>
              <span v-else>
                <component
                  :name="names.elementField(label(field), index)"
                  :is="type(field)"
                  v-bind:value="item[label(field)]"
                  v-bind="args(field)"
                />
              </span>
            </td>
            <td>
              <EditButton
                :name="names.editButton(index)"
                :resourceId="item[resourceIdName]"
                :resourceName="resourceName"
              />
              <Delete
                :name="names.deleteButton(index)"
                :resourceId="item[resourceIdName]"
                :resourceName="resourceName"
              />
            </td>
          </tr>
        </tbody>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import UI_ELEMENTS from '@constants/ui.elements.props'
import { Input, TextField, Spinner, DateInput } from "@components/UiComponents"
import { EditButton, Delete } from "@components/Actions"

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
  components: {
    DateInput,
    Delete,
    EditButton,
    Input,
    TextField,
    Spinner
  },
  data() {
    const { rowsPerPage } = UI_ELEMENTS
    const resourceName = this.resourceName
    const view = 'list'
    const content = {
      createButton: UI_CONTENT.RESOURCE_CREATE_BUTTON
    }
    const keys = {
      containerFields: (index) => UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({ resourceName, view, index }),
      elementField: (field, index) => UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field, index })
    }
    const names = {
      containerFields: (index) => UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({ resourceName, view, index }),
      createButton: UI_NAMES.RESOURCE_CREATE_BUTTON.with({ resourceName }),
      deleteButton: (index) => UI_NAMES.RESOURCE_DELETE_BUTTON.with({ resourceName, index }),
      editButton: (index) => UI_NAMES.RESOURCE_EDIT_BUTTON.with({ resourceName, index }),
      elementField: (field, index) => UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field, index }),
      viewContainer: UI_NAMES.RESOURCE_VIEW_CONTAINER.with({ resourceName, view }),
      viewContainerTitle: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({ resourceName, view }),
    }
    return {
      content,
      keys,
      names,
      options: {
        pagination: {
          itemsPerPage: rowsPerPage
        }
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
          value: this.label(field),
          width: field.label === 'id' ? '70px' : ''
        })
      })
      newHeaders.push({
        text: "Actions",
        align: 'center',
        sortable: false,
        value: 'action',
        width: '150px'
      })
      return newHeaders
    },
    resourceList: function() {
      return this.va.getList()
    },
    isLoading() {
      return this.$store.getters['requests/isLoading']
    }
  },
  methods: {
    type(field) {
      return field.type || 'TextField'
    },
    label(field) {
      return field.label || field
    },
    args(field) {
      const args = typeof(field) === 'string' ? { 'label': field } : field
      return args
    },
    onCreateClick() {
      this.$router.push({ name: `${this.resourceName}/create` })
    },
    onIdClick(id) {
      this.$router.push({ name: `${this.resourceName}/show`, params: { id } })
    }
  },
  created() {
    this.va.fetchList()
  }
}
</script>

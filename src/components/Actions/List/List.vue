<template>
  <v-card :name="UI_NAMES.RESOURCE_VIEW_CONTAINER.with({ resourceName, view })">
    <Spinner :spin="isLoading"></Spinner>

    <v-data-table
      :headers="headers"
      :items="resourceList"
      class="elevation-1"
      :options.sync="options"
    >

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title :name="`${UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({ resourceName, view })}`">
            <h3 class="headline mb-0 text-capitalize">{{resourceName}}</h3>
          </v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer/>
          <div class="text-xs-center d-flex right">
            <router-link
              :name="`${UI_NAMES.RESOURCE_CREATE_BUTTON.with({ resourceName })}`"
              v-if="hasCreate"
              :to="{ name: `${resourceName}/create` }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon color="teal">
                      {{UI_CONTENT.RESOURCE_CREATE_BUTTON}}
                    </v-icon>
                  </v-btn>
                </template>
                <span>Create</span>
              </v-tooltip>
            </router-link>
          </div>
        </v-toolbar>
      </template>

      <template v-slot:body="{ items }">
        <tbody>
           <tr v-for="(item, index) in items">
             <td class="text-xs-left"
               v-for="field in fields"
               :key="key(label(field))"
               :name="UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field: label(field), index })"
               >
               <router-link
                 :name="UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field: resourceIdName, index })"
                 v-if="label(field) === resourceIdName && hasShow"
                 :to="{ name: `${resourceName}/show`, params: { id: item[resourceIdName] } }"
               >
                 <component
                   :name="UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field: label(field), index })"
                   :is="type(field.type)"
                   v-bind:value="item[label(field)]"
                   v-bind="args(field)"
                 />
               </router-link>
               <span v-else>
                 <component
                   :name="UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({ resourceName, view, field: label(field), index })"
                   :is="type(field.type)"
                   v-bind:value="item[label(field)]"
                   v-bind="args(field)"
                 />
               </span>
             </td>
             <td>
               <EditButton
                 :resourceId="item[resourceIdName]"
                 :resourceName="resourceName"
                 :index="index"
               />
               <Delete
                 :resourceId="item[resourceIdName]"
                 :resourceName="resourceName"
                 :index="index"
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
import { Input, TextField, Spinner, DateInput } from "../../UiComponents";
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
      options: {
        pagination: {
          page: 1,
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
    DateInput,
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

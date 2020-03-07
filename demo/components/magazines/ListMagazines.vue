<template>
  <v-card class="extra-margin">
    <v-img src="banner.png" aspect-ratio="4" max-height="300px" />

    <v-data-table
      :headers="headers"
      :items="magazines"
      class="elevation-1"
      :footer-props="footerProps"
      :options.sync="options"
      :dark="true"
    >
      <template v-slot:top>
        <v-toolbar dark>
          <v-toolbar-title>Magazines</v-toolbar-title>
          <v-spacer />
          <router-link :to="{ name: `magazines/create` }" class="no-decoration">
            <v-btn color="orange" dark class="mb-2">New Magazine</v-btn>
          </router-link>
        </v-toolbar>
      </template>

      <template slot="no-data">
        <v-alert :value="true" color="warning" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>

      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="names.containerFields(item.id)"
            :name="names.containerFields(index)"
          >
            <td :name="names.elementField('id', index)">{{ item.id }}</td>
            <td :name="names.elementField('name', index)" class="text-xs-left">
              {{ item.name }}
            </td>
            <td
              :name="names.elementField('issue', index)"
              class="text-xs-center"
            >
              {{ item.issue }}
            </td>
            <td
              :name="names.elementField('publisher', index)"
              class="text-xs-right"
            >
              {{ item.publisher }}
            </td>
            <td class="text-xs-center">
              <EditButton
                :vBtnProps="buttonProps"
                :vIconProps="iconProps"
                :name="names.editButtonName(index)"
                :resourceId="item.id"
                resourceName="magazines"
              />
              <DeleteButton
                :vBtnProps="buttonProps"
                :vIconProps="iconProps"
                :name="names.deleteButtonName(index)"
                :resourceId="item.id"
                :resourceIdName="resourceIdName"
                resourceName="magazines"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import UI_NAMES from '@constants/ui.element.names'
import { rowsPerPage } from '../../constants'
import { DeleteButton, EditButton } from '@components/UiComponents'
import { resourceIdName } from '../../App'

export default {
  name: 'ListMagazines',
  props: {
    // This prop will be assigned by Vue Admin for you to use the functions
    // shown below.
    va: {
      type: Object,
      required: true,
    },
  },
  components: {
    DeleteButton,
    EditButton,
  },
  data() {
    // This is only needed for e2e demo tests
    const resourceName = 'magazines'
    const view = 'list'
    const names = {
      containerFields: index =>
        UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({
          resourceName,
          view,
          index,
        }),
      elementField: (field, index) =>
        UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
          resourceName,
          view,
          field,
          index,
        }),
      editButtonName: index =>
        UI_NAMES.RESOURCE_EDIT_BUTTON.with({
          resourceName,
          index,
        }),
      deleteButtonName: index =>
        UI_NAMES.RESOURCE_DELETE_BUTTON.with({
          resourceName,
          index,
        }),
    }
    return {
      names,
      footerProps: {
        itemsPerPageText: 'Magazines per page',
      },
      options: {
        pagination: {
          itemsPerPage: rowsPerPage,
        },
      },
      buttonProps: {
        small: true,
      },
      iconProps: {
        small: true,
      },
      resourceIdName,
    }
  },
  computed: {
    headers: function() {
      return [
        { text: 'ID', align: 'left', sortable: true, value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Issue', value: 'issue' },
        { text: 'Publisher', value: 'publisher' },
        { text: 'Actions', value: 'action', sortable: false, width: '160px' },
      ]
    },
    magazines: function() {
      return this.va.getList()
    },
  },
  created() {
    this.va.fetchList()
  },
}
</script>

<style>
.no-decoration {
  text-decoration: none;
}

.extra-margin {
  margin-bottom: 10px;
}
</style>

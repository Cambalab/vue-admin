<template>
  <v-card class="extra-margin">

    <v-img
      src="banner.png"
      aspect-ratio="4"
    />

    <v-data-table
      :headers="headers"
      :items="magazines"
      class="elevation-1"
      :footer-props="footerProps"
      :options.sync="options"
      :dark="true"
    >

      <template v-slot:top>
        <v-toolbar dark flat>
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
          <tr v-for="(item, index) in items">
            <td :name="idRowName(index)">{{ item.id }}</td>
            <td :name="nameRowName(index)" class="text-xs-left">
              {{ item.name }}
            </td>
            <td :name="issueRowName(index)" class="text-xs-center">
              {{ item.issue }}
            </td>
            <td :name="publisherRowName(index)" class="text-xs-right">
              {{ item.publisher }}
            </td>
            <td class="text-xs-center">
              <EditButton
                :iconProps="iconProps"
                :name="editButtonName(index)"
                :resourceId="item.id"
                resourceName="magazines"
              />
              <Delete
                :iconProps="iconProps"
                :name="deleteButtonName(index)"
                :resourceId="item.id"
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
  import { EditButton, Delete } from '@components/Actions'

  export default {
    name: 'ListMagazines',
    props: {
      // This prop will be assigned by Vue Admin for you to use the functions
      // shown below.
      va: {
        type: Object,
        required: true
      }
    },
    components: {
      EditButton,
      Delete
    },
    data() {
      // This is only needed for e2e demo tests
      const resourceName = 'magazines'
      const view = 'list'
      const buildName = (field, index) => UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
        resourceName,
        view,
        field,
        index
      })
      return {
        idRowName: (index) => buildName('id', index),
        nameRowName: (index) => buildName('name', index),
        issueRowName: (index) => buildName('issue', index),
        publisherRowName: (index) => buildName('publisher', index),
        editButtonName: (index) => UI_NAMES.RESOURCE_EDIT_BUTTON.with({
          resourceName,
          index
        }),
        deleteButtonName: (index) => UI_NAMES.RESOURCE_DELETE_BUTTON.with({
          resourceName,
          index
        }),
        footerProps: {
          itemsPerPageText: 'Magazines per page'
        },
        options: {
          pagination: {
            itemsPerPage: rowsPerPage
          }
        },
        iconProps: {
          small: true
        }
      }
    },
    computed: {
      headers: function() {
        return [
          { text: 'ID', align: 'left', sortable: true, value: 'id' },
          { text: 'Name', value: 'name' },
          { text: 'Issue', value: 'issue' },
          { text: 'Publisher', value: 'publisher' },
          { text: 'Actions', align: 'center', value: 'action', sortable: false, width: '160px' }
        ]
      },
      magazines: function() {
        return this.va.getList()
      }
    },
    created() {
      this.va.fetchList()
    }
  }
</script>

<style>
.no-decoration {
  text-decoration: none
}

.extra-margin {
  margin-bottom: 10px
}
</style>

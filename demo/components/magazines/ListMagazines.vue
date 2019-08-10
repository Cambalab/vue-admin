<template>
  <v-card class="extra-margin">

    <v-img
      src="banner.png"
      aspect-ratio="4"
    />

    <v-data-table
      :headers="headers"
      :items="desserts"
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

      <template slot="items" slot-scope="props">
        <td :name="idRowName(props.index)">{{ props.item.id }}</td>
        <td :name="nameRowName(props.index)" class="text-xs-left">{{ props.item.name }}</td>
        <td :name="issueRowName(props.index)" class="text-xs-center">{{ props.item.issue }}</td>
        <td :name="publisherRowName(props.index)" class="text-xs-right">{{ props.item.publisher }}</td>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
  import UI_NAMES from '@constants/ui.element.names'
  import { rowsPerPage } from '../../constants'

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
        footerProps: {
          itemsPerPageText: 'Magazines per page'
        },
        options: {
          pagination: {
            itemsPerPage: rowsPerPage
          }
        }
      }
    },
    computed: {
      headers: function() {
        return [
          { text: 'ID', align: 'left', sortable: true, value: 'id' },
          { text: 'Name', value: 'name' },
          { text: 'Issue', value: 'issue' },
          { text: 'Publisher', value: 'publisher' }
        ]
      },
      desserts: function() {
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

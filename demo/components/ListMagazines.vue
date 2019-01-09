<template>
  <v-card>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
      aspect-ratio="2.75"
    />

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-2">This is a Custom List Form</h3>
        <p>
          Although we provide default components for List views, Vue Admin
          ships with a <i>kind of injected</i> set of functions for those
          components declared in <b>Resource</b> as a view, that can be used
          for fetching a list of a resource, getting a single element, etc.
        </p>
        <p>
          The Vuex store is the middleware where data is saved until a
          submit action is triggered. This seems to be the easiest way to
          save data and call actions from <b>any</b> custom component, such
          as inputs, textfields, buttons, etc...
        </p>
        <p>
          This is one of the two proposals when we thought about user
          customization:
          <ul>
            <li>
              letting a user build their own components with any UI
              frameworkand provide a simple API for updating and storing
            </li>
            <li>
              build our own UI components with a single framework (possibly
              Vuetify) and expose them to the user in the form of Buttons,
              Inputs, TextFields, DataTables, ..., as fixed templates.
            </li>
          </ul>
        </p>
      </div>
    </v-card-title>

    <v-toolbar flat color="white">
      <v-toolbar-title>My Magazines List</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      />
      <v-spacer></v-spacer>
      <div max-width="500px">
        <router-link
          :to="{ name: `magazines/create` }">
          <v-btn color="primary" dark class="mb-2">New Magazine</v-btn>
        </router-link>
      </div>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template slot="no-data">
        <v-alert :value="true" color="warning" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>

      <template slot="items" slot-scope="props">
        <td :name="idRowName(props.index)">{{ props.item.id }}</td>
        <td :name="issueRowName(props.index)" class="text-xs-right">{{ props.item.issue }}</td>
        <td :name="publisherRowName(props.index)" class="text-xs-right">{{ props.item.publisher }}</td>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
  import UI_NAMES from '@constants/ui.element.names'

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
        issueRowName: (index) => buildName('issue', index),
        publisherRowName: (index) => buildName('publisher', index)
      }
    },
    computed: {
      headers: function() {
        return [
          { text: 'ID', align: 'left', sortable: true, value: 'id' },
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

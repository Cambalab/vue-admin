<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0 text-capitalize">{{name}}</h3>
    </v-card-title>
    <v-card-actions>
      <router-link v-if="hasCreate" :to="{ name: `${name}/create` }">
        <v-btn icon="true" absolute  right color="success" style="top:30px !important;">+</v-btn>
      </router-link>
    </v-card-actions>
    <v-data-table
      :headers="headers"
      :items="resourceList"
      class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item[resourceId] }}</td>
        <td class="text-xs-left"
          v-for="field in fields"
          v-bind="field">
          <component
            :name="label(field)"
            :is="type(field.type)"
            :key="key(label(field))"
            v-bind:content="props.item[label(field)]"
            v-bind="args(field)">
          </component>
        </td>
        <td>
          <EditButton
            :resourceId="resource[resourceId]"
            :resourceName="name">
          </EditButton>
        </td>
        <td class="text-xs-right">
          <Delete
            :resourceId="resource[resourceId]"
            :resourceName="name">
          </Delete>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
import { mapState } from "vuex";
import { Input, TextField } from "../../UiComponents";
import { EditButton, Delete } from "../../Actions";

export default {
  name: "List",

  props: {
    name: {
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
    resourceId:{
      type: String
    }
  },

  computed: {
    resourceList: function() {
      const resourceName = this.name + "/list";
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
      const resourceName = this.name + "/fetchList";
      return this.$store.dispatch(resourceName);
    },

    fetchData() {
      return this.fetchResource();
    },

    type(type) {
      return type || 'TextField'
    },

    key(label) {
      return `${this.name}_${label}`
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

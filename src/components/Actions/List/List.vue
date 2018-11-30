<template>
  <v-card>
    <div class="text-xs-center d-flex right">
        <router-link v-if="hasCreate" :to="{ name: `${name}/create` }">
          <v-tooltip bottom>
            <v-btn icon slot="activator" absolute  right color="success" style="top:20px;">+</v-btn>
            <span>Create {{name}}</span>
          </v-tooltip>
        </router-link>
    </div>
    <v-card-title primary-title>
      <h3 class="headline mb-0 text-capitalize">{{name}}</h3>
    </v-card-title>

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
            :resourceId="props.item.id"
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
    headers: function () {
      let newHeaders = [
        {
          text: "ID",
          align: 'left',
          sortable: true,
          width: 10
        }
      ];
      this.fields.forEach((field) => {
        newHeaders.push({
          text: field.label,
          align: field.align || 'left',
          sortable: field.sortable || false,
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
        align: 'right',
        sortable: false,
        width: 10
      });
      return newHeaders;
    },
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

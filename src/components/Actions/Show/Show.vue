<template>
  <v-card>
    <div class="text-xs-center d-flex right">
        <EditButton
          :resourceId="$route.params.id"
          :resourceName="name">
        </EditButton>
        <Delete
          :resourceId="$route.params.id"
          :resourceName="name">
        </Delete>
    </div>
    <v-card-title primary-title>
      <h3 class="headline mb-0 text-capitalize">{{name}} #{{$route.params.id}}</h3>
    </v-card-title>
    <v-card-text>
      <component
        :name="label(field)"
        v-for="field in fields"
        v-if="resourceShow !== undefined"
        :key="key(label(field))"
        :is="type(field.type)"
        v-bind:content="resourceShow[label(field)]"
        v-bind="args(field)">
      </component>
    </v-card-text>
  </v-card>
</template>


<script>
import { mapState } from "vuex";
import { Input, TextField } from "../../UiComponents"
import { EditButton, Delete } from "../../Actions";

export default {
  name: "Show",

  props: {
    name: {
      type: String,
      default: null
    },
    fields: {
      type: Array
    }
  },

  computed: {
    resourceShow: function() {
      const resourceName = this.name + "/byId";
      return this.$store.getters[resourceName](this.$route.params.id);
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
      const resourceName = this.name + "/fetchSingle";
      return this.$store.dispatch(resourceName, { id: this.$route.params.id });
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

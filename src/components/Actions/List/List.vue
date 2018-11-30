<template>
  <div>
    <h1> {{name}} resource: list operation </h1>
    <div>
      <router-link v-if="hasCreate" :to="{ name: `${name}/create` }">
        <button>Create {{name}}</button>
      </router-link>
    </div>
    <div v-for="resource in resourceList" :key="resource[resourceId]">
      <router-link v-if="hasShow" :to="{ name: `${name}/show`, params: { id: resource.id } }">
        <h3>{{ resource.id }}</h3>
      </router-link>
      <h3 v-else>{{ resource.id }}</h3>
      <Delete
      :resourceId="resource[resourceId]"
      :resourceName="name">
      </Delete>
      <EditButton
        :resourceId="resource[resourceId]"
        :resourceName="name">
      </EditButton>
      <component
        :name="label(field)"
        v-for="field in fields"
        :key="key(label(field))"
        :is="type(field.type)"
        v-bind:content="resource[label(field)]"
        v-bind="args(field)">
      </component>
    </div>
  </div>
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

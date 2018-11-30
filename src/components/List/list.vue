<template>
  <div>
    <h1> {{name}} resource: list operation </h1>
    <div>
      <router-link v-if="hasCreate" :to="{ name: `${name}/create` }">
        <button>Create {{name}}</button>
      </router-link>
    </div>
    <div v-for="resource in resourceList" :key="resource.id">
      <router-link v-if="hasShow" :to="{ name: `${name}/show`, params: { id: resource.id } }">
        <h1>{{ resource.id }}</h1>
      </router-link>
      <h1 v-else>{{ resource.id }}</h1>
      <Delete
      :resourceId="resource[resourceId]"
      :resourceName="name">
      </Delete>
      <EditButton
        :resourceId="resource[resourceId]"
        :resourceName="name">
      </EditButton>
      <component
        :name="field.label"
        v-for="field in fields"
        :key="field.id"
        :is="field.type"
        v-bind:content="resource[field.label]"
        v-bind="field">
      </component>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import TextField from "../TextField";
import Delete from "../Delete";
import EditButton from "../EditButton";

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

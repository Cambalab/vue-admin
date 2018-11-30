<template>
  <div>
    <v-tooltip bottom>
      <v-btn
        @click="onDelete()"
        slot="activator"
        icon>
        <i class="v-icon material-icons">delete</i>
      </v-btn>
      <span>Delete</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "Delete",

  props: {
    name: {
      type: String,
      default: null
    },
    resourceId: {
      type: Number
    },
    resourceName: {
      type: String,
      default: null
    }
  },

  data() {
    return {}
  },

  methods: {
    onDelete() {
      const resourceName = this.resourceName + "/destroy";
      this.$store.dispatch(resourceName, { id: this.resourceId });
      return this.$router.push({ path: `/${this.resourceName}`});
    }
  },
};
</script>

<template>
  <div>
    <button @click="onDelete()">
      <i class="v-icon material-icons">delete</i>
    </button>
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
      return this.$store.dispatch(resourceName, { id: this.resourceId });
    }
  },
};
</script>

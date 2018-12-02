<template>
  <router-link :to="{ name: `${resourceName}/edit`, params: { id: this.resourceId } }">
    <i class='v-icon material-icons'>edit</i>
  </router-link>
</template>

<script>
export default {
  name: "EditButton",

  props: {
    name: {
      type: String,
      default: null
    },
    resourceId: {
      type: [Number, String]
    },
    resourceName: {
      type: String
    }
  },
  data() {
    return {}
  }
};
</script>

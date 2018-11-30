<template>
  <v-tooltip bottom>
    <v-btn
      @click="onEdit()"
      slot="activator"
      icon>
      <i class="v-icon material-icons">edit</i>
    </v-btn>
    <span>Edit</span>
  </v-tooltip>
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
      type: Number
    },
    resourceName: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    onEdit() {
      this.$router.push({ name: `${this.resourceName}/edit`, params: { id: this.resourceId } });
    }
  },
};
</script>

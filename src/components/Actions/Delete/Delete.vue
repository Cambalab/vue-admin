<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        :name="name"
        @click="onDelete()"
        icon
        v-on="on"
      >
        <v-icon v-bind="iconProps">
          {{UI_CONTENT.RESOURCE_DELETE_BUTTON}}
        </v-icon>
      </v-btn>
    </template>
    Delete
  </v-tooltip>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'

export default {
  name: "Delete",

  props: {
    name: {
      type: String,
      default: 'va-delete-button'
    },
    resourceId: {
      type: [Number, String]
    },
    resourceName: {
      type: String,
      default: null
    },
    iconProps: {
      type: Object
    }
  },

  data() {
    return {
      UI_CONTENT,
      UI_NAMES
    }
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

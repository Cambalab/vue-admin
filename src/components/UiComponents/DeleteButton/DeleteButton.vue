<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        v-bind="buttonProps"
        :name="names.deleteButton"
        @click.stop="onDelete()"
        icon
        v-on="on"
      >
        <v-icon v-bind="iconProps">
          {{ content.deleteButton }}
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
  name: 'DeleteButton',
  props: {
    name: {
      type: String,
      default: 'va-delete-button',
    },
    resourceId: {
      type: [Number, String],
    },
    resourceName: {
      type: String,
      default: null,
    },
    buttonProps: {
      type: Object,
    },
    iconProps: {
      type: Object,
    },
  },

  data() {
    const resourceName = this.resourceName
    const names = {
      deleteButton: UI_NAMES.RESOURCE_DELETE_BUTTON.with({ resourceName }),
    }
    const content = {
      deleteButton: UI_CONTENT.RESOURCE_DELETE_BUTTON,
    }
    return { content, names }
  },

  methods: {
    onDelete() {
      const resourceName = this.resourceName + '/destroy'
      this.$store.dispatch(resourceName, { id: this.resourceId })
      return this.$router.push({ path: `/${this.resourceName}` })
    },
  },
}
</script>

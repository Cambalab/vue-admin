<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        v-bind="vProps"
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
export const defaults = () => {
  return {
    props: {
      name: 'va-delete-button',
    },
  }
}

import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'

export default {
  name: 'DeleteButton',
  props: {
    name: {
      type: String,
      default: defaults().props.name,
    },
    resourceId: {
      type: [Number, String],
      required: true,
    },
    resourceName: {
      type: String,
      required: true,
    },
    vBtnProps: {
      type: Object,
    },
    vIconProps: {
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

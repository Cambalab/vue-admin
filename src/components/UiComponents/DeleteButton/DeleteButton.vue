<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        v-bind="vBtnProps"
        :name="names.deleteButton"
        @click.stop="onDelete()"
        icon
        v-on="on"
      >
        <v-icon v-bind="vIconProps">
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
import { Types as CrudTypes } from '@store/modules/crud'

export const defaults = () => {
  return {
    props: {
      name: UI_NAMES.DELETE_BUTTON,
      vBtnProps: {},
      vIconProps: {},
      resourceIdName: 'id',
    },
  }
}

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
    resourceIdName: {
      type: String,
      default: defaults().props.resourceIdName,
    },
    resourceName: {
      type: String,
      required: true,
    },
    vBtnProps: {
      type: Object,
      default: () => defaults().props.vBtnProps,
    },
    vIconProps: {
      type: Object,
      default: () => defaults().props.vIconProps,
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
      const { VUEX_CRUD_DELETE } = CrudTypes
      const actionName = `${this.resourceName}/${VUEX_CRUD_DELETE}`
      const { resourceIdName } = this
      this.$store.dispatch(actionName, { [resourceIdName]: this.resourceId })
      return this.$router.push({ path: `/${this.resourceName}` })
    },
  },
}
</script>

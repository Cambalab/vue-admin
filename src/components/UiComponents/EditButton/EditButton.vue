<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        v-bind="vBtnProps"
        :name="name"
        @click.stop="onEdit()"
        icon
        v-on="on"
      >
        <v-icon v-bind="vIconProps">{{
          UI_CONTENT.RESOURCE_EDIT_BUTTON
        }}</v-icon>
      </v-btn>
    </template>
    Edit
  </v-tooltip>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'

export const defaults = () => {
  return {
    props: {
      name: UI_NAMES.EDIT_BUTTON,
      vBtnProps: {},
      vIconProps: {},
      resourceIdName: 'id',
    },
  }
}

export default {
  name: 'EditButton',
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
    return {
      UI_CONTENT,
      UI_NAMES,
    }
  },
  methods: {
    onEdit() {
      this.$router.push({
        name: `${this.resourceName}/edit`,
        params: { id: this.resourceId },
      })
    },
  },
}
</script>

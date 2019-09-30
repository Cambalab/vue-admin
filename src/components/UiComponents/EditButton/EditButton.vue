<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-bind="buttonProps" :name="name" @click="onEdit()" icon v-on="on">
        <v-icon v-bind="iconProps">{{
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

export default {
  name: 'EditButton',

  props: {
    name: {
      type: String,
      default: 'va-edit-button',
    },
    resourceId: {
      type: [Number, String],
    },
    resourceName: {
      type: String,
    },
    buttonProps: {
      type: Object,
    },
    iconProps: {
      type: Object,
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

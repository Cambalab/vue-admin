<template>
  <v-list-item :to="path"
    :name="names.resourceTitle"
  >
    <v-list-item-action>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        {{ title }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import UI_NAMES from '@constants/ui.element.names'

export default {
  name: "SidebarLink",
  props: {
    title: String,
    path: String,
    icon: String
  },
  data() {
    const { DRAWER_RESOURCE_TILE } = UI_NAMES
    const names = {
      resourceTitle: DRAWER_RESOURCE_TILE.with({
        resourceName: this.title.toLowerCase()
      })
    }
    return { names }
  }
}
</script>

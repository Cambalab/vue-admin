<template>
  <v-list-item :to="path"
    :name="NAME_DRAWER_RESOURCE_TILE">
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
    return {
      NAME_DRAWER_RESOURCE_TILE: DRAWER_RESOURCE_TILE.with({
        resourceName: this.title.toLowerCase()
      })
    }
  }
}
</script>

<template>
  <v-list-tile :to="path"
    :name="NAME_DRAWER_RESOURCE_TILE">
    <v-list-tile-action>
      <v-icon>{{ icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ title }}
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
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

<template>
  <v-list-tile :to="path"
    :name="`${DRAWER_RESOURCE_TILE.with({ resourceName: title })}`">
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
      DRAWER_RESOURCE_TILE
    }
  }
}
</script>

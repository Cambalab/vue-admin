<template>
  <v-list-tile @click="action()">
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
export default {
  name: "SidebarAction",
  props: {
    title: String,
    action: Function,
    icon: String
  }
}
</script>

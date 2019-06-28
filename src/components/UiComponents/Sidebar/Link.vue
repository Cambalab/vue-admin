<template>
  <v-list-tile :to="path">
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
  name: "Link",
  props: {
    title: String,
    path: String,
    icon: String
  }
}
</script>

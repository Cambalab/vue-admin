<template>
  <v-list-item @click="action()">
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
export default {
  name: "SidebarAction",
  props: {
    title: String,
    action: Function,
    icon: String
  }
}
</script>

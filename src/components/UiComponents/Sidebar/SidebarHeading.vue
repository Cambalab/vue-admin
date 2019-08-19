<template>

  <v-list-item two-line>
    <v-list-item-avatar>
      <img :src="avatar">
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ heading }}</v-list-item-title>
      <v-list-item-subtitle>{{ heading }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>

</template>
<script>
export default {
  name: "SidebarHeading",
  props: {
    avatar: String,
    heading: String,
    href: {
      type: String,
      default: '/'
    }
  }
}
</script>

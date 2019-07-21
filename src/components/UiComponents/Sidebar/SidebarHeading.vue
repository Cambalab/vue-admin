<template>
  <v-layout row
    align-center
    :key="heading"
  >
    <v-flex xs12>
      <v-subheader>
        {{ heading }}
      </v-subheader>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "SidebarHeading",
  props: {
    heading: String,
    href: {
      type: String,
      default: '/'
    }
  }
}
</script>

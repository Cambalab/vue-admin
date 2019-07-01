<template>
  <v-layout row
    align-center
    :key="heading"
  >
    <v-flex xs6>
      <v-subheader>
        {{ heading }}
      </v-subheader>
    </v-flex>
    <v-flex xs6 class="text-xs-center">
      <a :href="href" class="body-2 black--text">EDIT</a>
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

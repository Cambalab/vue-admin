<template>
  <v-list-group
    :key="title"
    v-model="model"
    no-action
    :prepend-icon="model ? icon : iconAlt"
    append-icon=""
    :value="value">
    <v-list-tile slot="activator">
      <v-list-tile-content>
        <v-list-tile-title>
          {{ title }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <slot></slot>
  </v-list-group>
</template>
<script>
export default {
  name: "Node",
  props: {
    title: String,
    icon: String,
    iconAlt: String
  },
  data() {
    return {
      value: true,
      model: {}
    }
  }
}
</script>

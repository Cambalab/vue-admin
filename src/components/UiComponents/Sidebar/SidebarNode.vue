<template>
  <v-list-group
    :key="title"
    v-model="model"
    no-action
    :prepend-icon="model ? icon : iconAlt"
    append-icon=""
    :value="value">
    <v-list-item slot="activator">
      <v-list-item-content>
        <v-list-item-title>
          {{ title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <slot></slot>
  </v-list-group>
</template>
<script>
export default {
  name: "SidebarNode",
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

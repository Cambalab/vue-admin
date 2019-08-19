<template>
  <v-list-item two-line>
    <component :is="avatar" v-bind="avatarProps" />
    <v-list-item-content>
      <v-list-item-title class="va-heading-title">
        {{ title }}
      </v-list-item-title>
      <v-list-item-subtitle class="va-heading-subtitle">
        {{ subTitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>

</template>
<script>
import defaults from './defaults'

export default {
  name: "SidebarHeading",
  props: {
    avatar: {
      type: Object,
      default: () => defaults().props.avatar
    },
    avatarProps: {
      type: Object,
      default: () => defaults().props.avatarProps
    },
    title: {
      type: String,
      default: 'Menu'
    },
    subTitle: {
      type: String,
      default: defaults().props.subTitle
    }
  }
}
</script>

<style>
.va-heading-title {
  font-weight: bold !important
}

.va-heading-subtitle {
  font-style: italic;
}
</style>

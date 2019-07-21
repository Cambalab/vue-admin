<template>
  <div>
    <component
      :is="appLayout"
      :title="title"
      :sidebar="sidebar"
      :va="va"
    >
      <slot></slot>
    </component>
  </div>
</template>

<script>
export default {
  name: "Core",
  props: {
    appLayout: {},
    title: String,
    sidebar: Object,
    va: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

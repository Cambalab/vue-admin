<template>
  <div>
    <component
      :is="appLayout"
      :title="title"
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
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

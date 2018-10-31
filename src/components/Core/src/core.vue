<template>
    <div>
        <component :is="appLayout">
          <slot></slot>
        </component>
    </div>
</template>

<script>
export default {
  name: "Core",
  props: {
    appLayout: {}
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

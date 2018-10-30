<template>
    <div>
        <Core v-bind:appLayout="appLayout"></Core>
        <slot></slot>
    </div>
</template>

<script>
import Core from "../../Core";
import Ui from "../../Ui";

export default {
  name: "Admin",
  props: {
    appLayout: {
      default: () => Ui
    }
  },
  components: {
    Core,
    Ui
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

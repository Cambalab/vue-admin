<template>
    <div>
        <Core v-bind:appLayout="appLayout">
        <router-view></router-view>
        </Core>
        <slot></slot>

    </div>
</template>

<script>
import Core from "../../Core";
import Ui from "../../Ui";
import resource from "./resource";


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
  },
  created() {
    this.$store.registerModule('resources', resource)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

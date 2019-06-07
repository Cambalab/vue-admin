<template>
  <div v-if="loading">
    <v-container :id="UI_NAMES.SPINNER_CONTAINER" pos-absolute fill-height progress-bar-container>
      <v-progress-circular
        class="progress-bar text-xs-center"
        indeterminate
        color="green"
      ></v-progress-circular>
      <div class="bg fill-height pos-absolute bg-progress-bar"></div>
    </v-container>
  </div>
</template>
<script>
import UI_NAMES from '@constants/ui.element.names'

export default {
  name: "Spinner",
  props: {
    spin: Boolean
  },
  computed: {
    loading() {
      return this.spin
    }
  },
  data() {
    return {
      UI_NAMES
    }
  }
}
</script>
<style scoped>
  .bg{
    background: #fff;
    opacity: 0.75;
    height: 100%;
    width: 100%;
  }
  .pos-absolute {
    position: absolute;
  }
  .progress-bar {
    z-index: 2;
    margin-left: auto;
    margin-right: auto;
  }
  .bg-progress-bar {
    z-index: 1;
  }
  .progress-bar-container {
    padding: 0;
  }
</style>

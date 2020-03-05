<template>
  <v-container
    :id="name"
    pos-absolute
    fill-height
    progress-bar-container
    v-if="loading"
  >
    <v-progress-circular class="progress-bar text-xs-center" v-bind="vProps" />
    <div class="bg fill-height pos-absolute bg-progress-bar"></div>
  </v-container>
</template>
<script>
import UI_NAMES from '@constants/ui.element.names'

export const defaults = () => {
  return {
    props: {
      isLoading: false,
      name: UI_NAMES.SPINNER_CONTAINER,
      vProps: {
        color: 'success',
        indeterminate: true,
      },
    },
  }
}

export default {
  name: 'Spinner',
  props: {
    name: {
      type: String,
      default: defaults().props.name,
    },
    isLoading: {
      type: Boolean,
      default: defaults().props.isLoading,
    },
    vProps: {
      type: Object,
      default: () => defaults().props.vProps,
    },
  },
  computed: {
    loading() {
      // return true
      return this.isLoading
    },
  },
}
</script>
<style scoped>
.bg {
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

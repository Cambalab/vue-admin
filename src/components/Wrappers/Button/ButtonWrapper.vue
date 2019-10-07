<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ButtonWrapper',
  props: {
    source: {
      type: String,
    },
  },
  data() {
    return {}
  },
}
</script>

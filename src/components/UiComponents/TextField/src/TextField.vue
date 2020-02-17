<template>
  <div>
    <component :is="tag">
      {{ parsedContent }}
    </component>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: [String, Number],
      default: 'Empty content',
    },
    tag: {
      type: String,
      default: 'p',
    },
    parse: {
      type: Function,
      default: value => value,
    },
  },
  data() {
    return {
      parsedContent: this.parse(this.value),
    }
  },
}
</script>

<template>
  <div>
    <component :is="type">
      {{ parsedContent }}
    </component>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    parse: {
      type: Function,
      default: value => value,
    },
    type: {
      type: String,
      default: 'p',
    },
    value: {
      type: [String, Number],
      default: 'Empty content',
    },
  },
  data() {
    return {
      parsedContent: this.parse(this.value),
    }
  },
}
</script>

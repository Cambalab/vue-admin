<template>
  <div>
    <component :is="type">
      {{ parsedContent }}
    </component>
  </div>
</template>

<script>
export default {
  name: 'SimpleText',
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
      default: '',
    },
  },
  data() {
    return {
      parsedContent: this.parse(this.value),
    }
  },
}
</script>

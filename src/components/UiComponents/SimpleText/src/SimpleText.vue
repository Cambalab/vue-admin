<template>
  <div>
    <component :is="type">
      {{ parsedContent }}
    </component>
  </div>
</template>

<script>
export const defaults = () => {
  return {
    props: {
      parse: value => value,
      type: 'p',
      value: '',
    },
  }
}

export default {
  name: 'SimpleText',
  props: {
    parse: {
      type: Function,
      default: defaults().props.parse,
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

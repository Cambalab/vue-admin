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
      default: defaults().props.type,
    },
    value: {
      type: [String, Number],
      default: defaults().props.value,
    },
  },
  data() {
    return {
      parsedContent: this.parse(this.value),
    }
  },
}
</script>

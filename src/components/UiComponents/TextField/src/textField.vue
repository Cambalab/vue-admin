<template>
  <div>
    <component
      :is="tag">
      {{ content }}
    </component>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props:{
    content: {
      type: [String, Number],
      default: 'This is a default content'
    },
      tag: {
        type: String,
        default: 'p'
      }
  },
  data() {
    return {}
  }
};
</script>

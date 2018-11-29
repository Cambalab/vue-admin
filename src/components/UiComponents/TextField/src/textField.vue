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
    content: [String, Number],
    label: String,
    tag: String
  },
  data() {
    return {}
  },
  computed:{
  }
};
</script>

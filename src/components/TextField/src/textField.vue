<template>
  <div>{{ content }}</div>
</template>

<script>
export default {
  name: "TextField",
  props:{
    content: String,
    label: String
  },
  data() {
    return {}
  },
  computed:{
  }
};
</script>


<script>
export default {
  functional: true,
  name: "SimpleFormWrapper",
  props:{
    source: {
      type: String
    }
  },
  render(createElement, context) {
    return createElement('div', context.children)
  }
};
</script>

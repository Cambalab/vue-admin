
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
    console.log('SimpleFormWrapper', 'Im wrapping and rendering the create form...')
    return createElement('div', context.children)
  }
};
</script>

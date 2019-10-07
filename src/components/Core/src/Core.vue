<script>
export default {
  functional: true,
  name: 'Core',
  props: {
    layout: {},
    title: String,
    sidebar: Object,
    va: Object,
  },
  render: function(createElement, context) {
    const {
      props: { layout, title, sidebar, va },
    } = context

    return createElement(
      layout,
      {
        props: {
          title,
          sidebar,
          va,
        },
      },
      [createElement('router-view'), ...context.slots().default]
    )
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

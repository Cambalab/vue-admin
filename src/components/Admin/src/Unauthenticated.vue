<script>
export default {
  functional: true,
  name: 'Unauthenticated',
  props: {
    layout: {
      type: Object,
      required: true
    },
    login: {
      type: Function,
      required: true
    }
  },
  render: function(createElement, context) {
    const { props: { layout, login } } = context
    const va = { login }
    return createElement(layout, { props: { va } })
  }
}
</script>

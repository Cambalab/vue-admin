<script>
import Resource from './Resource'

export default {
  functional: true,
  render(createElement, context) {
    const { props } = context
    const slots = context.slots()
    const isEmpty = Object.keys(slots).length === 0
    // If the context has slots, we build a map with the name of the view and
    // the associated component to it
    if (!isEmpty) {
      Object.keys(slots).reduce((prevValue, nextValue) => {
        return Object.assign(prevValue, {
          [nextValue]: prevValue[nextValue][0].data.attrs.component
        })
      }, slots)
      Object.assign(props, slots)
    }
    // Resource is rendered with props, either having slots or not.
    return createElement(Resource, { props })
  }
}
</script>

<script>
import Show from './Show'

export default {
  name: 'ShowComposer',
  functional: true,
  render(createElement, context) {
    // TODO: this should be the right place to handle Show component misusing.
    // Use case: a user instance it as a component in a template without passing
    // any children with a source property - @sgobotta

    // If Show is being used in a user template it should contain children with
    // a source property, then they are processed and passed as props to the
    // Show view component
    if (context.children) {
      // Gets the list component associated by Resource during the binding.
      const { children, parent: { $attrs } } = context
      // Gets the props that should be passed to List
      const {
        resourceName,
        va
      } = $attrs

      // Composes the Show children into an array of elements
      // TODO: this could probably be done in the future by passing components
      // instead of building an array for Show
      const fields = children.map(child => {
        const { data: { attrs }, tag } = child
        const {
          source
        } = attrs

        return {
          label: source,
          tag
        }
      })

      const props = {
        name: resourceName,
        fields,
        va
      }
      return createElement(Show, { props })
    }
    // Show is already being instanced by Resource as an Array
    return createElement(Show, context)
  }
}
</script>

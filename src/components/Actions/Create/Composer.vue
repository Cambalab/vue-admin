<script>
import Create from './Create'

export default {
  name: 'CreateComposer',
  functional: true,
  render(createElement, context) {
    // TODO: this should be the right place to handle Create component misusing.
    // Use case: a user instance it as a component in a template without passing
    // any children with a source property - @sgobotta

    // If Create is being used in a user template it should contain children with
    // a source property, then they are processed and passed as props to the
    // Create view component
    if (context.children) {
      // Gets the list component associated by Resource during the binding.
      const { children, parent: { $attrs } } = context
      // Gets the props that should be passed to Create
      const {
        resourceName,
        redirect,
        va
      } = $attrs

      // Composes the Create children into an array of elements
      // TODO: this could probably be done in the future by passing components
      // instead of building an array for Edit
      const fields = children.map(child => {
        const { data: { attrs }, tag } = child
        const {
          source,
          placeHolder
        } = attrs

        return {
          label: source,
          placeHolder,
          tag
        }
      })

      const props = {
        name: resourceName,
        fields,
        redirect,
        va
      }
      return createElement(Create, { props })
    }
    // Create is already being instanced by Resource as an Array
    return createElement(Create, context)
  }
}
</script>

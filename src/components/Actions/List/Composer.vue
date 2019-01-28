<script>
import List from './List'

export default {
  name: 'ListComposer',
  functional: true,
  render(createElement, context) {
    // TODO: this should be the right place to handle List component misusing.
    // Use case: a user instance it as a component in a template without passing
    // any children with a source property - @sgobotta

    // If List is being used in a user template it should contain children with
    // a source property, then they are processed and passed as props to the
    // List view component
    if (context.children) {
      // Gets the list component associated by Resource during the binding.
      const { children, parent: { $attrs } } = context
      // Gets the props that should be passed to List
      const {
        resourceName,
        resourceIdName,
        hasCreate,
        hasShow,
        hasEdit,
        va
      } = $attrs

      // Composes the List children into an array of elements
      // TODO: this could probably be done in the future by passing components
      // instead of building an array for List
      const fields = children.map(child => {
        const { data: { attrs }, tag } = child
        const {
          alignContent,
          alignHeader,
          headerText,
          source,
          sortable,
        } = attrs

        return {
          align: alignContent,
          alignHeader,
          headerText,
          label: source,
          sortable,
          tag,
        }
      })

      const props = {
        resourceName,
        resourceIdName,
        hasCreate,
        hasShow,
        hasEdit,
        fields,
        va
      }
      return createElement(List, { props })
    }
    // List is already being instanced by Resource as an Array
    return createElement(List, context)
  }
}
</script>

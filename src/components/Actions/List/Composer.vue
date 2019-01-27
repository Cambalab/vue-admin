<script>
import List from './List'

export default {
  name: 'ListComposer',
  functional: true,
  render(createElement, context) {
    // If List is being used in a user template it should contain View
    // children, then they are processed and passed as props to the List
    if (context.children) {
      const { parent } = context
      const { hasCreate, hasShow, $attrs } = parent
      const { resourceName, resourceIdName } = $attrs

      const reducedChildren = context.children.map(child => {
        return { label: child.data.attrs.source, tag: child.tag }
      })
      const props = {
        resourceName,
        hasCreate,
        hasShow,
        resourceIdName,
        fields: reducedChildren
      }
      return createElement(List, { props })
    }
    // List is already being instanced by Resource as an Array
    return createElement(List, context)
  }
}
</script>

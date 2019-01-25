
<script>
import List from './List'

export default {
  name: 'ListComposer',
  functional: true,
  render(createElement, context) {
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
}

</script>

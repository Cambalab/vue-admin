<script>
import Edit from './Edit'
import composeView from '../compose'

export default {
  name: 'EditComposer',
  functional: true,
  render(createElement, context) {
    return composeView(createElement, context, { component: Edit })
  },
}
</script>

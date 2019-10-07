<script>
import Show from './Show'
import composeView from '../compose'

export default {
  name: 'ShowComposer',
  functional: true,
  render(createElement, context) {
    return composeView(createElement, context, { component: Show })
  },
}
</script>

<script>
import Create from './Create'
import composeView from '../compose'

export default {
  name: 'CreateComposer',
  functional: true,
  render(createElement, context) {
    return composeView(createElement, context, { component: Create, view: 'create' })
  }
}
</script>

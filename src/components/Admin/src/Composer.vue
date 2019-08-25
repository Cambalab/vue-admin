<script>
import Admin from './Admin'

import createAuthModule from '@va-auth/store'

export default {
  functional: true,
  render(createElement, context) {
    const { props: { authProvider, options: _options = {} } } = context
    const options = Object.assign({}, {
      authModule: createAuthModule({ client: authProvider })
    }, _options)
    const props = Object.assign({}, context.props, { options })
    return createElement(Admin, { props }, context.slots().default)
  }
}
</script>

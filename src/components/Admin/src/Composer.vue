<script>
import Admin from './Admin'

import createAuthModule from '@va-auth/store'

export default {
  functional: true,
  props: {
    authProvider: {
      type: Function
    },
    sidebar: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  render(createElement, context) {
    // One of authProvider or an authModule are strictly required
    const {
      props: {
        authProvider = () => {},
        sidebar,
        options: _options = {}
      }
    } = context

    const options = Object.assign({}, {
      authModule: createAuthModule({ client: authProvider })
    }, _options)
    const props = Object.assign({}, context.props, { sidebar, options })

    return createElement(Admin, { props }, context.slots().default)
  }
}
</script>

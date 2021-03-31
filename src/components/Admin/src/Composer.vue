<script>
import { VApp } from 'vuetify/lib'
import AlertsWrapper from './Alerts'
import Admin from './Admin'
import createAuthModule from '@va-auth/store'

export default {
  functional: true,
  props: {
    authLayout: {
      type: Object,
    },
    authProvider: {
      type: Function,
    },
    homeLayout: {
      type: Object,
    },
    sidebar: {
      type: Object,
    },
    options: {
      type: Object,
    },
    unauthorized: {
      type: Object,
    },
  },
  render(createElement, context) {
    // One of authProvider or an authModule are strictly required
    const {
      props: { authProvider = () => {}, options: _options = {} },
    } = context

    const options = Object.assign(
      {},
      {
        authModule: createAuthModule({ client: authProvider }),
      },
      _options
    )
    const props = Object.assign({}, context.props, { options })
    const admin = createElement(Admin, { props }, context.slots().default)
    const alerts = createElement(AlertsWrapper)

    return createElement(VApp, {}, [admin, alerts])
  },
}
</script>

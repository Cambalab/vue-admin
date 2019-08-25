<script>
import AuthActionTypes from '@va-auth/types'
import { unauthenticatedDefaults } from './defaults'

export default {
  name: 'Unauthenticated',
  props: {
    layout: {
      type: Object,
      required: true
    }
  },
  created() {
    const { args: { createUnauthenticatedRoutes } } = unauthenticatedDefaults
    const unauthenticatedRoutes = createUnauthenticatedRoutes(this.layout)
    this.$router.addRoutes(unauthenticatedRoutes)
  },
  methods: {
    login: function (username, password) {
      const params = { username, password }
      const { namespace, AUTH_LOGIN_REQUEST } = AuthActionTypes
      this.$store.dispatch(`${namespace}/${AUTH_LOGIN_REQUEST}`, params)
    }
  },
  render: function (createElement) {
    const props = {
      va: { login: this.login }
    }
    return createElement(this.layout, { props })
  }
}
</script>

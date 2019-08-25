<script>
import AuthActionTypes from '@va-auth/types'

export default {
  name: 'Unauthenticated',
  props: {
    layout: {
      type: Object,
      required: true
    }
  },
  created() {
    this.loadRoute({
      path: '/login',
      name: 'login',
      component: this.authLayout,
      props: {}
    })
  },
  methods: {
    loadRoute(args) {
      this.$router.addRoutes([args])
    },
    login: function (username, password) {
      const params = { username, password }
      this.$store.dispatch(`auth/${AuthActionTypes.AUTH_LOGIN_REQUEST}`, params)
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

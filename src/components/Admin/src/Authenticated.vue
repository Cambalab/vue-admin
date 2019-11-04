<script>
import AuthTypes from '@va-auth/types'
import Core from '@components/Core'

export default {
  name: 'Authenticated',
  props: {
    layout: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    sidebar: {
      type: Object,
      required: true,
    },
    unauthorized: {
      type: Object,
      required: true,
    },
  },
  methods: {
    logout: function() {
      const { namespace, AUTH_LOGOUT_REQUEST } = AuthTypes
      this.$store
        .dispatch(`${namespace}/${AUTH_LOGOUT_REQUEST}`)
        .then(() => this.$router.push('/'))
    },
    getUser: function() {
      const { namespace, AUTH_GET_USER } = AuthTypes
      return this.$store.getters[`${namespace}/${AUTH_GET_USER}`]
    },
  },
  render: function(createElement) {
    const props = {
      layout: this.layout,
      title: this.title,
      sidebar: this.sidebar,
      unauthorized: this.unauthorized,
      va: {
        getUser: this.getUser,
        logout: this.logout,
      },
    }

    return createElement(Core, { props }, this.$slots.default)
  },
}
</script>

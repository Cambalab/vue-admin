<script>
import AuthTypes from '@va-auth/types'

export default {
  name: 'Unauthenticated',
  props: {
    layout: {
      type: Object,
      required: true,
    },
  },
  methods: {
    login: function(username, password) {
      const params = { username, password }
      const { namespace, AUTH_LOGIN_REQUEST, AUTH_GET_ERROR } = AuthTypes
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(`${namespace}/${AUTH_LOGIN_REQUEST}`, params)
          .then(() =>
            resolve(this.$store.getters[`${namespace}/${AUTH_GET_ERROR}`])
          )
          .catch(err => reject(err))
      })
    },
  },
  render: function(createElement) {
    const props = {
      va: { login: this.login },
    }
    return createElement(this.layout, { props })
  },
}
</script>

import AuthTypes from '@va-auth/types'

export default (client, options = {}) => {
  return (type, params) => {
    const {
      AUTH_LOGIN_REQUEST,
      AUTH_LOGOUT_REQUEST,
    } = AuthTypes

    const {
      authUrl,
      storageKey,
      userFields,
    } = Object.assign({
      storageKey: 'token',
      userFields: { username: 'username', password: 'password' },
    }, options);

    switch (type) {
      case AUTH_LOGIN_REQUEST:
        return new Promise((resolve, reject) => {
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            [userFields.username]: params.username,
            [userFields.password]: params.password
          }
          const method = 'post'
          const url = authUrl

          client({ url, headers, method })
            .then(response => {
              const { data } = response
              const { [storageKey]: token, user } = data
              // something more secure maybe?
              localStorage.setItem(storageKey, token)
              client.defaults.headers.common['Authorization'] = token
              resolve(user)
            })
            .catch(error => {
              localStorage.removeItem(storageKey)
              reject(error)
            })
        })

      case AUTH_LOGOUT_REQUEST:
        return new Promise(resolve => {
          localStorage.removeItem(storageKey)
          delete client.defaults.headers.common['Authorization']
          resolve()
        })
      default:
        return Promise.reject(`Unsupported @va-auth action type: ${type}`);
    }
  }
}

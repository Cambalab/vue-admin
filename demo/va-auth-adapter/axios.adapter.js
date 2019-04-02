import AuthActionTypes from '@va-auth/types'

export default (client, options = {}) => {
  return (type, params) => {
    const {
      AUTH_LOGIN_REQUEST,
      AUTH_LOGOUT_REQUEST,
      AUTH_CHECK_REQUEST,
    } = AuthActionTypes

    const {
      authFields,
      authUrl,
      storageKey,
      userField,
    } = Object.assign({
      authFields: { username: 'username', password: 'password' },
      storageKey: 'token',
      userField: 'user',
    }, options);

    switch (type) {
      case AUTH_LOGIN_REQUEST:
        return new Promise((resolve, reject) => {
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            [authFields.username]: params.username,
            [authFields.password]: params.password
          }
          const method = 'post'
          const url = authUrl

          client({ url, headers, method })
            .then(response => {
              const { data } = response
              const { [storageKey]: token, [userField]: user } = data
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

      case AUTH_CHECK_REQUEST:
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem(storageKey)
        if (token) {
          const url = authUrl
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            token,
          }
          const method = 'get'
          client({ url, headers, method })
            .then(response => {
              const { data } = response
              const { [userField]: user } = data
              resolve(user)
            })
            .catch(error => {
              reject(error)
            })
        } else {
          reject('Authentication failed.')
        }
      })

      default:
        return Promise.reject(`Unsupported @va-auth action type: ${type}`);
    }
  }
}

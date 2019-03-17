/**
 * Create Auth Module Actions - Given a set of data, creates the actions for an
 * auth store module
 *
 * @param {String}   accessTokenField The name of the token in localStorage
 * @param {String}   authUrl          The authentication url
 * @param {Object}   client           An http client (axios by default)
 * @param {Object}   types            An object containing all the auth Types
 * @param {Object}   userFields       An object with the username and password field names
 * @param {String}   usersUrl         The url to fetch a user by a token
 *
 * @return {Object} The actions for the auth store
 */
export default ({
  accessTokenField,
  authUrl,
  client,
  types,
  userFields,
  usersUrl,
}) => {

  return {
    [types.AUTH_LOGIN_REQUEST]: ({ commit, dispatch }, user) => {
      // TODO: should move to adapter implementation

      const url = authUrl
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        username: user[userFields.username],
        password: user[userFields.password]
      }
      const method = 'post'
      // The Promise used for router redirect in login
      return new Promise((resolve, reject) => {
        commit(types.AUTH_LOGIN_REQUEST)

        client({ url, headers, method })
          .then(response => {
            const token = response.data.token || ''
            // store the token in localstorage
            localStorage.setItem(accessTokenField, token)
            client.defaults.headers.common['Authorization'] = token
            commit(types.AUTH_LOGIN_SUCCESS, token)
            // you have your token, now log in your user :)
            dispatch(types.USER_REQUEST, { token })
            resolve(response)
          })
          .catch(error => {
            commit(types.AUTH_LOGIN_FAILURE, error)
            // if the request fails, remove any possible user token if possible

            // TODO: should move to adapter implementation
            localStorage.removeItem(accessTokenField)
            reject(error)
          })

      })
    },
    [types.AUTH_LOGIN_FAILURE]: ({ commit }) => {
      commit(types.AUTH_LOGIN_FAILURE)
      // if the request fails, remove any possible user token if possible

      // TODO: should move to adapter implementation
      localStorage.removeItem(accessTokenField)
    },
    [types.AUTH_LOGOUT_REQUEST]: ({ commit }) => {
      commit(types.AUTH_LOGOUT_REQUEST)
      try {
        return new Promise((resolve) => {
          localStorage.removeItem(accessTokenField)
          delete client.defaults.headers.common['Authorization']
          commit(types.AUTH_LOGOUT_SUCCESS)
          resolve()
        })
      }
      catch (error) {
        commit(types.AUTH_LOGIN_FAILURE, error)
      }
    },
    [types.USER_REQUEST]: ({ commit }, payload) => {
      commit(types.USER_REQUEST)
      const { token } = payload
      const url = usersUrl
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        token,
      }
      const method = 'get'
      return new Promise((resolve, reject) => {
        client({ url, headers, method })
          .then(response => {
            const { data: { user } } = response
            commit(types.USER_SUCCESS, user)
            resolve(response)
          })
          .catch(error => {
            commit(types.USER_FAILURE, error)
            reject(error)
          })
      })
    }
  }
}

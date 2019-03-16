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
    [types.AUTH_REQUEST]: (context, user) => {
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
        context.commit(types.AUTH_REQUEST)
        client({ url, headers, method })
          .then(response => {
            const token = response.data.token || ''
            // store the token in localstorage
            localStorage.setItem(accessTokenField, token)
            client.defaults.headers.common['Authorization'] = token
            context.commit(types.AUTH_SUCCESS, token)
            // you have your token, now log in your user :)
            context.dispatch(types.USER_REQUEST, { token })
            resolve(response)
          })
          .catch(error => {
            context.commit(types.AUTH_ERROR, error)
            // if the request fails, remove any possible user token if possible

            // TODO: should move to adapter implementation
            localStorage.removeItem(accessTokenField)
            reject(error)
          })
      })
    },
    [types.AUTH_ERROR]: ({ commit }) => {
      commit(types.AUTH_ERROR)
      // if the request fails, remove any possible user token if possible

      // TODO: should move to adapter implementation
      localStorage.removeItem(accessTokenField)
    },
    [types.AUTH_LOGOUT]: ({ commit }) => {
      return new Promise((resolve) => {
        commit(types.AUTH_LOGOUT)
        // clear your user's token from localstorage

        // TODO: should move to adapter implementation
        localStorage.removeItem(accessTokenField)
        delete client.defaults.headers.common['Authorization']
        resolve()
      })
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
            commit(types.AUTH_ERROR, error)
            commit(types.USER_FAILURE, error)
            reject(error)
          })
      })
    }
  }
}

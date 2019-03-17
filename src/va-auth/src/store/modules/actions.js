/**
 * Create Auth Module Actions - Given a set of data, creates the actions for an
 * auth store module
 *
 * @param {Object}   client   An http client
 * @param {Object}   types    An object containing all the auth Types
 *
 * @return {Object} The actions for the auth store
 */
export default ({
  client,
  types,
}) => {

  return {
    [types.AUTH_LOGIN_REQUEST]: ({ commit }, user) => {
      commit(types.AUTH_LOGIN_REQUEST)
      client(types.AUTH_LOGIN_REQUEST, { ...user })
        .then(response => {
          commit(types.AUTH_LOGIN_SUCCESS, response)
        })
        .catch(error => {
          commit(types.AUTH_LOGIN_FAILURE, error)
        })
    },
    [types.AUTH_LOGIN_FAILURE]: ({ commit }) => {
      commit(types.AUTH_LOGIN_FAILURE)
    },
    [types.AUTH_LOGOUT_REQUEST]: ({ commit }) => {
      commit(types.AUTH_LOGOUT_REQUEST)
      client(types.AUTH_LOGOUT_REQUEST)
        .then(() => {
          commit(types.AUTH_LOGOUT_SUCCESS)
        })
        .catch(error => {
          commit(types.AUTH_LOGIN_FAILURE, error)
        })
    },
    // [types.USER_REQUEST]: ({ commit }, payload) => {
    //   commit(types.USER_REQUEST)
    //   const { token } = payload
    //   const url = usersUrl
    //   const headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     token,
    //   }
    //   const method = 'get'
    //   return new Promise((resolve, reject) => {
    //     axios({ url, headers, method })
    //       .then(response => {
    //         const { data: { user } } = response
    //         commit(types.USER_SUCCESS, user)
    //         resolve(response)
    //       })
    //       .catch(error => {
    //         commit(types.USER_FAILURE, error)
    //         reject(error)
    //       })
    //   })
    // }
  }
}

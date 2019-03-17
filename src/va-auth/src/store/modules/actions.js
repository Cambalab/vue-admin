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

    [types.AUTH_CHECK_REQUEST]: ({ commit }) => {
      commit(types.AUTH_CHECK_REQUEST)
      client(types.AUTH_CHECK_REQUEST)
        .then((response) => {
          commit(types.AUTH_CHECK_SUCCESS, response)
        })
        .catch((error) => {
          commit(types.AUTH_CHECK_FAILURE, error)
        })
    }
  }
}

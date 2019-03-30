/**
 * Create Auth Module Mutations - Given a set of data, creates the mutations
 * for an auth store module
 *
 * @param {Object} types An object containing all the auth Types
 *
 * @return {Object} The mutations for the auth store
 */
export default({
  types,
}) => {
  return {
    [types.AUTH_LOGIN_REQUEST]: (state) => {
      state.error = ''
      state.status = 'running'
    },
    [types.AUTH_LOGIN_SUCCESS]: (state, user) => {
      state.isAuthenticated = true
      state.status = 'idle'
      state.user  = user
    },
    [types.AUTH_LOGIN_FAILURE]: (state, error) => {
      state.isAuthenticated = false
      state.error  = error
      state.status = 'idle'
    },

    [types.AUTH_LOGOUT_REQUEST]: (state) => {
      state.error = ''
      state.status = 'running'
    },
    [types.AUTH_LOGOUT_SUCCESS]: (state) => {
      state.isAuthenticated = false
      state.status = 'idle'
      state.user   = {}
    },
    [types.AUTH_LOGOUT_FAILURE]: (state, error) => {
      state.error  = error
      state.status = 'idle'
    },

    [types.AUTH_CHECK_REQUEST]: (state) => {
      state.error = ''
      state.status = 'running'
    },
    [types.AUTH_CHECK_SUCCESS]: (state, user) => {
      state.isAuthenticated = true
      state.status = 'idle'
      state.user = user
    },
    [types.AUTH_CHECK_FAILURE]: (state, error) => {
      state.error = error
      state.isAuthenticated = false
      state.status = 'idle'
    },
  }
}

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
      state.status = 'running'
    },
    [types.AUTH_LOGIN_SUCCESS]: (state, user) => {
      state.status = 'idle'
      state.user  = user
    },
    [types.AUTH_LOGIN_FAILURE]: (state, error) => {
      state.error  = error
      state.status = 'idle'
    },
    [types.AUTH_LOGOUT_REQUEST]: (state) => {
      state.status = 'running'
    },
    [types.AUTH_LOGOUT_SUCCESS]: (state) => {
      state.status = 'idle'
      state.user   = {}
    },
    [types.AUTH_LOGOUT_FAILURE]: (state, error) => {
      state.error  = error
      state.status = 'idle'
    },
    [types.USER_REQUEST]: (state) => {
      state.status = 'running'
    },
    [types.USER_SUCCESS]: (state, user) => {
      state.status = 'idle'
      state.user   = user
    },
    [types.USER_FAILURE]: (state, error) => {
      state.status = 'idle'
      state.error  = error
    },
  }
}

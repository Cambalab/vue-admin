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
    [types.AUTH_REQUEST]: (state) => {
      state.status = 'running'
    },
    [types.AUTH_SUCCESS]: (state, token) => {
      state.status = 'idle'
      state.token  = token
    },
    [types.AUTH_ERROR]: (state, error) => {
      state.status = 'idle'
      state.token  = ''
      state.error  = error
    },
    [types.AUTH_LOGOUT]: (state) => {
      state.token = ''
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

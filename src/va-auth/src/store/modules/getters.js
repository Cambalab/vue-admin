/**
 * Create Auth Module Getters - Creates the getters for an auth store module
 *
 * @return {Object} The getters for the auth store
 */
export default ({ types }) => {
  return {
    [types.AUTH_GET_STATUS]: state => state.status,
    [types.AUTH_IS_AUTHENTICATED]: state => state.isAuthenticated,
    [types.AUTH_GET_USER]: state => state.user,
    [types.AUTH_GET_ERROR]: state => state.error,
  }
}

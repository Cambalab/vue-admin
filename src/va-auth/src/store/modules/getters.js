/**
 * Create Auth Module Getters - Creates the getters for an auth store module
 *
 * @return {Object} The getters for the auth store
 */
export default () => {
  return {
    authStatus: state => state.status,
    isAuthenticated: state => state.isAuthenticated,
    getUser: state => state.user,
  }
}

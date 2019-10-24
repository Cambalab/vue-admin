/**
 * Auth Utils - A function used to create utilities
 *
 * @param {Object} store The global Vuex store variable
 *
 * @return {Object} A set of functions to be used for Authentication
 */
export default ({ store, types }) => {
  const { namespace, AUTH_IS_AUTHENTICATED, AUTH_GET_USER } = types
  return {
    /**
     * checkAuthentication - Indicates whether the user is authenticated or not.
     *
     * @return {Boolean}
     */
    isAuthenticated() {
      return store.getters[`${namespace}/${AUTH_IS_AUTHENTICATED}`]
    },

    /**
     * getUser - Returns the user object from the store
     *
     * @return {Object} The current logged user object
     */
    getUser() {
      return store.getters[`${namespace}/${AUTH_GET_USER}`]
    },
  }
}

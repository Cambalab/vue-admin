/**
 * Auth Utils - A function used to create utilities
 *
 * @param {Object} store          The global Vuex store variable
 *
 * @return {Object} A set of functions to be used in an Edit form.
 */
export default ({
  store
}) => {
  return {

    /**
     * checkAuthentication - Indicates whether the user is authenticated or not.
     *
     * @return {Boolean}
     */
    isAuthenticated() {
      return store.getters['auth/isAuthenticated']
    },

    /**
     * getUser - Returns the user object from the store
     *
     * @return {Object} The current logged user object
     */
    getUser() {
      return store.getters['auth/getUser']
    },
  }
}

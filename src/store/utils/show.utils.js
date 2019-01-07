import { fetchEntity } from './common.utils'

/**
 * Show View Utils - A function used to create utilities
 *
 * @param {String} resourceName   The name of the resource
 * @param {Object} store          The global Vuex store variable
 * @param {Object} router         The global Vue router variable
 *
 * @return {Object} A set of functions to be used in a Show form.
 */
export default ({
  resourceName,
  store,
  router
}) => {
  return {
    /**
     * fetchEntity - Fetchs a 'resourceName' entity from the store
     *
     * @return {Object} The fetched entity.
     */
    fetchEntity() {
      return fetchEntity({ router, resourceName, store })
    }
  }
}

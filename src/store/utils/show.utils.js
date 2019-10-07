import { fetchEntity, getEntity } from './common.utils'

/**
 * Show View Utils - A function used to create utilities
 *
 * @param {String} resourceName   The name of the resource
 * @param {Object} store          The global Vuex store variable
 * @param {Object} router         The global Vue router variable
 *
 * @return {Object} A set of functions to be used in a Show form.
 */
export default ({ resourceName, store, router }) => {
  return {
    /**
     * getEntity - Gets a 'resourceName' entity from the store.
     *
     * @return {Object} A 'resourceName' entity.
     */
    getEntity() {
      return getEntity({ router, resourceName, store })
    },

    /**
     * fetchEntity - Fetchs a single 'resourceName' element from the store.
     *
     * @return {Object} A fetched 'resourceName' entity.
     */
    fetchEntity() {
      return fetchEntity({ resourceName, router, store })
    },
  }
}

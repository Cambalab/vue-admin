import { fetchList, getList } from './common.utils'

/**
 * List View Utils - A function used to create utilities
 *
 * @param {String} resourceName   The name of the resource
 * @param {Object} store          The global Vuex store variable
 *
 * @return {Object} A set of functions to be used in an Edit form.
 */
export default ({ resourceName, store }) => {
  return {
    /**
     * fetchList - Fetchs a set of 'resourceName' using the Vuex Crud getters
     *
     * @return {Array} An array of 'resourceName' elements
     */
    fetchList() {
      return fetchList({ resourceName, store })
    },

    /**
     * getList - Gets a set of 'resourceName' elements from the store
     *
     * @return {Array} An array of 'resourceName' elements
     */
    getList() {
      return getList({ resourceName, store })
    },
  }
}

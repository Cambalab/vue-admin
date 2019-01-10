import { submitEntity, updateEntity, fetchEntity, getEntity } from './common.utils'

/**
 * Edit View Utils - A function used to create utilities
 *
 * @param {String} redirectView   A view the router will redirect to on submit
 * @param {String} resourceIdName The name of the id of a resource
 * @param {String} resourceName   The name of the resource
 * @param {Object} store          The global Vuex store variable
 * @param {Object} router         The global Vue router variable
 * @param {Object} parseResponses An object containing a parseSingle function
 * and a parseList function to be used on submit actions.
 *
 * @return {Object} A set of functions to be used in an Edit form.
 */
export default ({
  redirectView,
  resourceIdName,
  resourceName,
  store,
  router,
  parseResponses
}) => {
  return {
    /**
     * getEntity - Gets the current 'resourceName' entity. The value does not
     * exist until a user inputs data using 'updateEntity'.
     *
     * @return {Object} a 'resourceName' object with updated data from the form.
     */
    getEntity() {
      const formType = 'editForm'
      return getEntity({ store, resourceName, formType })
    },

    /**
     * fetchEntity - Fetchs a 'resourceName' entity from the store
     *
     * @return {Object} The fetched entity.
     */
    fetchEntity() {
      return fetchEntity({ router, resourceName, store })
    },

    /**
     * updateEntity - Given a key and a value, updates the 'resourceName' entity
     * in the store.
     *
     * @param {String} resourceKey A 'resourceName' attribute key
     * @param {String} value       A given value to be stored
     */
    updateEntity({ resourceKey, value }) {
      const formType = 'editForm'
      updateEntity({
        resourceKey,
        value,
        store,
        resourceName,
        formType
      })
    },

    /**
     * submitEntity - Dispatchs an update request
     *
     * @return {Promise} A pending promise.
     */
    submitEntity() {
      const { id } = router.history.current.params
      const actionType = 'update'
      const actionTypeParams = { data: this.getEntity(), id }
      submitEntity({
        resourceName,
        actionType,
        actionTypeParams,
        store,
        router,
        redirectView,
        resourceIdName,
        parseResponses
      })
    }
  }
}

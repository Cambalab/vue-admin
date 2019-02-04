import { submitEntity, updateEntity, getEntityForm } from './common.utils'

/**
 * Create View Utils - A function used to create utilities
 *
 * @param {String} redirectView   A view the router will redirect to on submit
 * @param {String} resourceIdName The name of the id of a resource
 * @param {String} resourceName   The name of the resource
 * @param {Object} store          The global Vuex store variable
 * @param {Object} router         The global Vue router variable
 * @param {Object} parseResponses An object containing a parseSingle function
 * and a parseList function to be used on submit actions.
 *
 * @return {Object} A set of functions to be used in a Create form.
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
     * getEntityForm - Gets the current 'resourceName' entity. The value does not
     * exist until a user inputs data using 'updateEntity'.
     *
     * @return {Object} a 'resourceName' object with updated data from the form.
     */
    getEntityForm() {
      const formType = 'createForm'
      return getEntityForm({ store, resourceName, formType })
    },

    /**
     * updateEntity - Given a key and a value, updates the 'resourceName' entity
     * in the store.
     *
     * @param {String} resourceKey A 'resourceName' attribute key
     * @param {String} value       A given value to be stored
     */
    updateEntity({ resourceKey, value }) {
      const formType = 'createForm'
      updateEntity({
        resourceKey,
        value,
        store,
        resourceName,
        formType
      })
    },

    /**
     * submitEntity - Dispatchs a create request
     *
     * @return {Promise} A pending promise.
     */
    submitEntity() {
      const actionType = 'create'
      const actionTypeParams = { data : this.getEntityForm() }
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

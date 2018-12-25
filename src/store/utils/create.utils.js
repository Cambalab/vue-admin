import Router from '../../router'

/**
 * Create View Utils - A function used to create utilities
 *
 * @param {String} redirectView   A view the router will redirect to on submit
 * @param {String} resourceIdName The name of the id of a resource
 * @param {String} resourceName   The name of the resource
 * @param {Object} store          The global Vuex store variable
 * @param {Object} router         The global Vue router variable
 *
 * @return {Object} A set of functions to be used in a Create form.
 */
export default ({
  redirectView,
  resourceIdName,
  resourceName,
  store,
  router
}) => {
  return {
    /**
     * getEntity - Gets the current 'resourceName' entity. The value does not
     * exist until a user inputs data using 'updateEntity'.
     *
     * @return {Object} a 'resourceName' object with updated data from the form.
     */
    getEntity() {
      return store.state.entities.createForm[resourceName]
    },

    /**
     * updateEntity - Given a key and a value, updates the 'resourceName' entity
     * in the store.
     *
     * @param {String} resourceKey A 'resourceName' attribute key
     * @param {String} value       A given value to be stored
     */
    updateEntity({ resourceKey, value }) {
      const moduleName = 'entities/updateForm';
      store.commit(moduleName, { formType: 'createForm', value, resourceKey, entity: resourceName });
    },

    /**
     * submitEntity - Given a 'resourceName' object, calls the store to dispatch
     * a create request
     *
     * @param {Object} data A 'resourceName' object
     *
     * @return {Promise} A pending promise.
     */
    submitEntity({ data }) {
      const moduleName = `${resourceName}/create`
      return store.dispatch(moduleName, { data })
        .then(res => {
          const { status } = res
          // NOTE - Maybe in the future we want to delete the remaining data in the
          // store if the creation went Ok, though it could be useful to keep it
          // if we want to implement an Undo feature - @sgobotta
          if (redirectView && [200, 201].indexOf(status) !== -1) {
            // FIXME: looking for 'data' in res could cause conflicts depending on how the user api responds - @sgobotta
            Router.redirect({ router, resource: resourceName, view: redirectView, id: res.data[resourceIdName] })
          }
          return res
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err)
        })
    }
  }
}

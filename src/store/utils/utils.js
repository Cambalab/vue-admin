import Router from '../../router'

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
 */

/**
* getEntity - Gets the current 'resourceName' entity. The value does not
* exist until a user inputs data using 'updateEntity'.
*
* @param {String} resourceName   The name of the resource
* @param {Object} store          The global Vuex store variable
* @param {String} formType     The form type in the entities state (createForm, editForm)
*
* @return {Object} a 'resourceName' object with updated data from the form.
*/
export const getEntity = ({ store, resourceName, formType }) => {
  return store.state.entities[formType][resourceName]
}

/**
* fetchEntity - Fetchs a 'resourceName' entity from the given apiUrl
*
* @param {String} resourceName   The name of the resource
* @param {Object} store          The global Vuex store variable
* @param {Object} router         The global Vue router variable
*
* @return {Object} The fetched entity.
*/
export const fetchEntity = ({ router, resourceName, store }) => {
  const id = router.history.current.params.id
  const moduleName = `${resourceName}/byId`;
  return store.getters[moduleName](id)
}

/**
* updateEntity - Given a key and a value, updates the 'resourceName' entity
* in the store.
*
* @param {String} resourceKey  A 'resourceName' attribute key
* @param {String} value        A given value to be stored
* @param {Object} store        The global Vuex store variable
* @param {String} resourceName The name of the resource
* @param {String} formType     The form type in the entities state (createForm, editForm)
*/

export const updateEntity = ({
  resourceKey,
  value,
  store,
  resourceName,
  formType
}) => {
  const moduleName = 'entities/updateForm'
  store.commit(moduleName, { formType, value, resourceKey, entity: resourceName });
}

/**
* submitEntity - Given a 'resourceName' object, calls the store to dispatch
* an update request
*
* @param {String} resourceName      The name of the resource
* @param {String} actionType        The type of the vuex-crud action (ex: create, update)
* @param {Object} actionTypeParams  The vuex-crud dispatch params
* @param {Object} store             The global Vuex store variable
* @param {Object} router            The global Vue router variable
* @param {String} redirectView      (optional) A view the router will redirectto on submit
* @param {String} resourceIdName    The name of the id of a resource
* @param {Object} parseResponses    An object containing a parseSingle function
* and a parseList function to be used on submit actions.
*
* @return {Promise} A pending promise.
*/

export const submitEntity = ({
  resourceName,
  actionType,
  actionTypeParams,
  store,
  router,
  redirectView,
  resourceIdName,
  parseResponses
}) => {
  const moduleName = `${resourceName}/${actionType}`
  return store.dispatch(moduleName, actionTypeParams)
  .then(res => {
    const { status } = res
    // NOTE - Maybe in the future we want to delete the remaining data in
    // the store if the creation went Ok, though it could be useful to
    // keep it if we want to implement an Undo feature - @sgobotta
    if (redirectView && [200, 201].indexOf(status) !== -1) {
      const parsedResponse = parseResponses.parseSingle
        ? parseResponses.parseSingle(res)
        : res
      const id = parsedResponse.data[resourceIdName]
      Router.redirect({ router, resource: resourceName, view: redirectView, id })
    }
    return res
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err)
  })
}

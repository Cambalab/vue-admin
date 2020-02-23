import Router from '@router'
import { Types as EntitiesTypes } from '@store/modules/entities'
import { Types as CrudTypes } from '@store/modules/crud'

const { VUEX_CRUD_FETCH_SINGLE, VUEX_CRUD_GET_RESOURCE_BY_ID } = CrudTypes

/**
 * getEntityForm - Given a resource name and a form type, calls the store to get the
 * current 'resourceName' entity. The value does not exist until a user inputs
 * data using 'updateEntity'.
 *
 * @param {String} resourceName   The name of the resource
 * @param {String} formType       The form type in the entities state (createForm, editForm)
 * @param {Object} store          The global Vuex store variable
 *
 * @return {Object} a 'resourceName' object with updated data from the form.
 */
export const getEntityForm = ({ resourceName, formType, store }) => {
  return store.state.entities[formType][resourceName]
}

/**
 * getEntity - Given a resource name, calls the store to get a single element.
 *
 * @param {String} resourceName   The name of the resource
 * @param {Object} store          The global Vuex store variable
 * @param {Object} router         The global Vue router variable
 *
 * @return {Object} A 'resourceName' entity.
 */
export const getEntity = ({ resourceName, store, router }) => {
  const { id } = router.history.current.params // isnt't this too coupled to 'id'? - @sgobotta
  const moduleName = `${resourceName}/${VUEX_CRUD_GET_RESOURCE_BY_ID}`
  return store.getters[moduleName](id)
}

/**
 * fetchEntity - Given a resource name, calls the store to dispatch a single get
 * request
 *
 * @param {String} resourceName   The name of the resource
 * @param {Object} store          The global Vuex store variable
 * @param {Object} router         The global Vue router variable
 *
 * @return {Object} The fetched entity.
 */
export const fetchEntity = ({ resourceName, store, router }) => {
  const { id } = router.history.current.params // isnt't this too coupled to 'id'? - @sgobotta
  const moduleName = `${resourceName}/${VUEX_CRUD_FETCH_SINGLE}`
  return store.dispatch(moduleName, { id })
}

/**
 * fetchList - Given a resource name, calls the store to dispatch a get request
 *
 * @param {String}  resourceName The name of the resource
 * @param {Object}  store        The global Vuex store variable
 *
 * @return {Array} A 'resourceName' list from the Vuex Crud store
 */
export const fetchList = ({ resourceName, store }) => {
  const moduleName = `${resourceName}/fetchList`
  return store.dispatch(moduleName)
}

/**
 * getList - Given a resource name, calls the store to get the current
 * list of 'resourceName' elements
 *
 * @param {String} resourceName The name of the resource
 * @param {Object} store        The global Vuex store variable
 *
 * @return {Array} A 'resourceName' list from the Vuex Crud store
 */
export const getList = ({ resourceName, store }) => {
  const moduleName = `${resourceName}/list`
  return store.getters[moduleName]
}

/**
 * updateEntity - Given a key and a value, calls the store to update the
 * 'resourceName' entity.
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
  formType,
}) => {
  const { namespace, ENTITIES_UPDATE_FORM } = EntitiesTypes
  const moduleName = `${namespace}/${ENTITIES_UPDATE_FORM}`
  const entity = resourceName
  store.commit(moduleName, { formType, value, resourceKey, entity })
}

/**
 * initEntity - Calls the store to init the 'resourceName' entity.
 *
 * @param {Object} store        The global Vuex store variable
 * @param {String} resourceName The name of the resource
 * @param {String} formType     The form type in the entities state (createForm, editForm)
 */

export const initEntity = ({ store, resourceName, formType }) => {
  const { namespace, ENTITIES_CREATE_FORM } = EntitiesTypes
  const moduleName = `${namespace}/${ENTITIES_CREATE_FORM}`
  const entity = resourceName
  store.commit(moduleName, { formType, entity })
}

/**
 * submitEntity - Given an object with params, calls the store to dispatch
 * an 'actionType' request
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
  parseResponses,
}) => {
  const moduleName = `${resourceName}/${actionType}`
  return store
    .dispatch(moduleName, actionTypeParams)
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
        const resource = resourceName
        const view = redirectView
        Router.redirect({ router, resource, view, id })
      }
      return res
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

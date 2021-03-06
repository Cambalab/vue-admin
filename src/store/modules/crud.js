import createCrudModule from 'vuex-crud'

export const Types = {
  VUEX_CRUD_FETCH_LIST: 'fetchList',
  VUEX_CRUD_FETCH_SINGLE: 'fetchSingle',
  VUEX_CRUD_GET_RESOURCE_BY_ID: 'byId',
  VUEX_CRUD_PUT: 'create',
  VUEX_CRUD_UPDATE: 'update',
  VUEX_CRUD_DELETE: 'destroy',
}

/**
 * Crud Module - Given a set of data, creates a vuex crud module and calls
 * the store to get it registered.
 *
 * @param {String} apiUrl The api url for a 'resourceName' resource
 * @param {String} resourceName The name of the resource
 * @param {String} resourceIdName The name of the id property of a resource
 * @param {Object} parseResponses An object containing a parseSingle function
 * and a parseList function to be used by Vuex Crud.
 * @param {Object} state A representation of an initial state
 * @param {Function} onFetchListStart Callback for collection GET start
 * @param {Function} onFetchListSuccess Callback for collection GET success
 * @param {Function} onFetchListError Callback for collection GET error
 * @param {Function} onFetchSingleStart Callback for single GET start
 * @param {Function} onFetchSingleSuccess Callback for single GET success
 * @param {Function} onFetchSingleError Callback for single GET error
 * @param {Function} onCreateStart  Callback for POST start
 * @param {Function} onCreateSuccess  Callback for POST success
 * @param {Function} onCreateError  Callback for POST error
 * @param {Function} onUpdateStart  Callback for PATCH start
 * @param {Function} onUpdateSuccess  Callback for PATCH success
 * @param {Function} onUpdateError  Callback for PATCH error
 * @param {Function} onReplaceStart Callback for PUT start
 * @param {Function} onReplaceSuccess Callback for PUT success
 * @param {Function} onReplaceError Callback for PUT error
 * @param {Function} onDestroyStart Callback for DELETE start
 * @param {Function} onDestroySuccess Callback for DELETE success
 * @param {Function} onDestroyError Callback for DELETE error
 */
export default ({
  apiUrl,
  resourceName,
  resourceIdName,
  parseResponses,
  state = {},
  onFetchListStart = () => {},
  onFetchListSuccess = () => {},
  onFetchListError = () => {},
  onFetchSingleStart = () => {},
  onFetchSingleSuccess = () => {},
  onFetchSingleError = () => {},
  onCreateStart = () => {},
  onCreateSuccess = () => {},
  onCreateError = () => {},
  onUpdateStart = () => {},
  onUpdateSuccess = () => {},
  onUpdateError = () => {},
  onReplaceStart = () => {},
  onReplaceSuccess = () => {},
  onReplaceError = () => {},
  onDestroyStart = () => {},
  onDestroySuccess = () => {},
  onDestroyError = () => {},
}) => {
  const customUrlFn = id => {
    const rootUrl = `${apiUrl}${resourceName}/`
    return id ? `${rootUrl}${id}` : rootUrl
  }

  const module = createCrudModule({
    resource: resourceName,
    customUrlFn,
    idAttribute: resourceIdName,
    state,
    // Store mutation callbacks
    onFetchListStart,
    onFetchListSuccess,
    onFetchListError,
    onFetchSingleStart,
    onFetchSingleSuccess,
    onFetchSingleError,
    onCreateStart,
    onCreateSuccess,
    onCreateError,
    onUpdateStart,
    onUpdateSuccess,
    onUpdateError,
    onReplaceStart,
    onReplaceSuccess,
    onReplaceError,
    onDestroyStart,
    onDestroySuccess,
    onDestroyError,
    // Parse response callbacks
    ...parseResponses,
  })
  return { namespace: resourceName, module }
}

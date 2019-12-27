import createCrudModule, { client } from 'vuex-crud'
import { Types as RequestsTypes } from '@store/modules/requests'

/**
 * Crud Module - Given a set of data, creates a vuex crud module and calls
 * the store to get it registered.
 *
 * @param {String} apiUrl         The api url for a 'resourceName' resource
 * @param {String} resourceName   The name of the resource
 * @param {String} resourceIdName The name of the id property of a resource
 * @param {Object} parseResponses An object containing a parseSingle function
 * and a parseList function to be used by Vuex Crud.
 * @param {Object} store          The global Vuex store variable
 */
export default ({
  apiUrl,
  resourceName,
  resourceIdName,
  parseResponses,
  store,
}) => {
  const customUrlFn = id => {
    const rootUrl = `${apiUrl}${resourceName}/`
    return id ? `${rootUrl}${id}` : rootUrl
  }
  const { namespace: requestsNamespace, REQUESTS_SET_LOADING } = RequestsTypes
  const mutation = `${requestsNamespace}/${REQUESTS_SET_LOADING}`
  const setLoading = isLoading => () => store.commit(mutation, { isLoading })

  // Requests Interceptors
  const successCall = injectedLogic => requestOrResponse => {
    injectedLogic()
    return requestOrResponse
  }
  const errorCall = injectedLogic => error => {
    injectedLogic()
    return Promise.reject(error)
  }

  client.interceptors.request.use(successCall(setLoading(true)))
  client.interceptors.response.use(
    successCall(setLoading(false)),
    errorCall(setLoading(false))
  )

  const module = createCrudModule({
    resource: resourceName,
    customUrlFn,
    idAttribute: resourceIdName,
    ...parseResponses,
  })
  store.registerModule(resourceName, module)
}

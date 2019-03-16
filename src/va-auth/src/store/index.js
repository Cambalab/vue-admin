import AuthModule from './modules/auth'
import UserModule from './modules/user'

/**
 * Create Auth Module - Given a set of data, creates a vuex auth module and
 * calls the store to get it registered.
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
  store
}) => {

  const module = {}

  store.registerModule(resourceName, module);
}

export const authModule = AuthModule
export const userModule = UserModule

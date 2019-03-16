import axios from 'axios'
import createActions from './modules/actions'
import createGetters from './modules/getters'
import createMutations  from './modules/mutations'
import createState from './modules/state'
import Types from '../types'

/**
 * Create Auth Module - Given a set of data, creates a vuex auth module and
 * calls the store to get it registered.
 *
 * @param {String}  accessTokenField  The name of the token in localStorage
 * @param {String}  authUrl           The authentication url
 * @param {Object}  client            An http client (axios by default)
 * @param {String}  moduleName        The name of the auth module
 * @param {Object}  store             The global Vuex store variable
 * @param {Object}  userFields        An object with the username and password field names
 * @param {String}  usersUrl          The url to fetch a user by a token
 */
export default ({
  accessTokenField,
  authUrl,
  client = axios,
  moduleName,
  store,
  userFields,
  usersUrl,
}) => {
  const types = Types

  const module = {
    namespaced: true,

    state: createState({
      accessTokenField
    }),

    actions: createActions({
      accessTokenField,
      authUrl,
      client,
      types,
      userFields,
      usersUrl,
    }),

    mutations: createMutations({
      types
    }),

    getters: createGetters(),
  }
  store.registerModule(moduleName, module)
}

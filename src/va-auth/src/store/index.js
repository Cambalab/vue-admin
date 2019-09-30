import createActions from './modules/actions'
import createGetters from './modules/getters'
import createMutations from './modules/mutations'
import createState from './modules/state'
import Types from '../types'

/**
 * Create Auth Module - Given a set of data, creates a vuex auth module and
 * calls the store to get it registered.
 *
 * @param {Function}  client            An http client
 * @param {String}    moduleName        The name of the auth module
 * @param {Object}    store             The global Vuex store variable
 */
export default ({ client }) => {
  const types = Types

  return {
    namespaced: true,

    state: createState(),

    actions: createActions({
      client,
      types,
    }),

    mutations: createMutations({
      types,
    }),

    getters: createGetters(),
  }
}

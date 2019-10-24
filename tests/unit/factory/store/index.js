import createInitialStateWith from './initial.state'
import createInitialGettersWith from './initial.getters'
import createInitialMutationsWith from './initial.mutations'

// Initial vuex crud resources should be added here
const _initialResources = ['articles', 'magazines']

/**
 * Annonymous Function - Creates a simualtion of initial vuex crud store
 *
 * @param {String} snapshot         The name of a component the store should
 *                                  be initialised for
 * @param {Array}  initialResources A list of resources to initialise the store
 *
 * @return {type} The expected Vuex Crud mocked store for a snapshot
 */
export default ({
  snapshot = 'default',
  initialResources = _initialResources,
}) => {
  return {
    state: createInitialStateWith({ snapshot, initialResources }),
    getters: createInitialGettersWith({ snapshot, initialResources }),
    mutations: createInitialMutationsWith({ snapshot }),
  }
}

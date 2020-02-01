import { Types as ResourcesTypes } from '@store/modules/resources'

/**
 * Annonymous Function - Creates a simualtion of initial vuex crud mutations
 *
 * @param {String} snapshot The name of a component the mutations should be
 *                          initialised for
 *
 * @return {Object} The expected Vuex Crud mocked mutations
 */
export default ({ snapshot = 'default' }) => {
  // New custom mutations configurations should be added here
  const snapshots = {
    default: initDefaultMutations,
    Resource: initMutationsForResource,
  }

  // Vuex initial resources mutations should be added here
  const { namespace: resourcesNamespace, RESOURCES_ADD_ROUTE } = ResourcesTypes
  const resourcesMutations = {
    [`${resourcesNamespace}/${RESOURCES_ADD_ROUTE}`]: (state, args) => {
      args.addedRouteCallback && args.addedRouteCallback()
    },
  }

  // Initialises default mutations
  function initDefaultMutations() {
    return {
      ...resourcesMutations,
    }
  }
  // Initialises mutations for a Resource component
  function initMutationsForResource() {
    return {
      ...resourcesMutations,
    }
  }

  return snapshots[snapshot]()
}

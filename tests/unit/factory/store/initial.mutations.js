
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
    Resource: initMutationsForResource
  }
  const resourcesMutations = {
    'resources/addRoute': () => {}
  }

  // Initialises default mutations
  function initDefaultMutations() {
    return {
      ...resourcesMutations
    }
  }
  // Initialises mutations for a Resource component
  function initMutationsForResource() {
    return {
      ...resourcesMutations
    }
  }

  return snapshots[snapshot]()
}

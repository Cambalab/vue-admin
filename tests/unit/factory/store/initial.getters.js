import { initialResourcesRoutes } from './common.utils'

/**
 * Annonymous Function - Creates a simualtion of initial vuex crud getters
 *
 * @param {String} snapshot         The name of a component the getters should
 *                                  be initialised for
 * @param {Array}  initialResources A list of resources to initialise getters
 *
 * @return {Object} The expected Vuex Crud mocked getters
 */
export default ({ snapshot = 'default', initialResources }) => {
  // New custom getters configurations should be added here
  const snapshots = {
    default: initDefaultGetters,
    Resource: initGettersForResource,
  }

  // Vuex initial entities getters should be added here
  const entitiesCrud = {
    'entities/getEntity': () => {},
  }
  // Vuex initial resources getters should be added here
  const resourcesGetters = {
    'resources/all': () => initialResourcesRoutes(initialResources),
  }

  /**
   * initResourcesCrud - Given a list of resources, creates mocked vuex crud
   * methods for each of them
   *
   * @param {Array} resources An array of strings
   *
   * @return {Object} An object with mocked vuex crud methods
   */
  function initResourcesGetters(resources) {
    const crud = {}
    resources.forEach(resource => {
      ;(crud[`${resource}/byId`] = id => id),
        (crud[`${resource}/isError`] = () => false),
        (crud[`${resource}/isLoading`] = () => false),
        (crud[`${resource}/list`] = () => [])
    })
    return crud
  }
  // Initialises default getters
  function initDefaultGetters() {
    return {
      ...initResourcesGetters(initialResources),
      ...entitiesCrud,
      ...resourcesGetters,
    }
  }
  // Initialises getters for a Resource component
  function initGettersForResource() {
    return {
      ...initResourcesGetters(initialResources),
    }
  }

  return snapshots[snapshot]()
}

import { initialResourcesRoutes } from './common.utils'

/**
 * Anonymous Function - Creates a simualtion of initial vuex crud getters
 *
 * @return {Object} The expected Vuex Crud mocked getters
 */
export default () => {
  // Initial vuex crud resources should be added here
  const initialResources = [
    'articles',
    'magazines'
  ]
  // Vuex initial entities getters should be added here
  const entitiesCrud = {
    'entities/getEntity': {}
  }
  // Vuex initial resources getters should be added here
  const resourcesGetters = {
    'resources/all': initialResourcesRoutes(initialResources)
  }

  // Vuex auth getters
  const authGetters = {
    'auth/authStatus': 'idle',
    'auth/getUser': '',
    'auth/isAuthenticated': false
  }
  /**
   * initResourcesCrud - Given a list of resources, creates mocked vuex crud
   * methods for each of them
   *
   * @param {Array} resources An array of strings
   *
   * @return {Object} An object with mocked vuex crud methods
   */
  function initResourcesCrud(resources) {
    const crud = {}
    resources.forEach(resource => {
      crud[`${resource}/byId`] = (id) => id,
      crud[`${resource}/isError`] = false,
      crud[`${resource}/isLoading`] = false,
      crud[`${resource}/list`] = []
    })
    return crud
  }

  return {
    ...authGetters,
    ...initResourcesCrud(initialResources),
    ...entitiesCrud,
    ...resourcesGetters
  }
}

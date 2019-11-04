import { initialResourcesRoutes } from './common.utils'
import AuthTypes from '../../../../src/va-auth/src/types'

/**
 * Anonymous Function - Creates a simualtion of initial vuex crud getters
 *
 * @return {Object} The expected Vuex Crud mocked getters
 */
export default () => {
  // Initial vuex crud resources should be added here
  const initialResources = ['articles', 'magazines', 'authors']
  // Vuex initial entities getters should be added here
  const entitiesCrud = {
    'entities/getEntity': {},
  }
  // Vuex initial resources getters should be added here
  const resourcesGetters = {
    'resources/all': initialResourcesRoutes(initialResources),
  }

  // Vuex auth getters
  const {
    namespace,
    AUTH_GET_STATUS,
    AUTH_GET_USER,
    AUTH_IS_AUTHENTICATED,
    AUTH_GET_ERROR,
  } = AuthTypes
  const authGetters = {
    [`${namespace}/${AUTH_GET_STATUS}`]: 'idle',
    [`${namespace}/${AUTH_GET_USER}`]: '',
    [`${namespace}/${AUTH_IS_AUTHENTICATED}`]: false,
    [`${namespace}/${AUTH_GET_ERROR}`]: {
      response: {
        status: '401',
        message: 'Invalid user or password',
      },
    },
  }

  // Vuex ui getters
  const requestGetters = {
    'requests/isLoading': false,
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
      ;(crud[`${resource}/byId`] = id => id),
        (crud[`${resource}/isError`] = false),
        (crud[`${resource}/isLoading`] = false),
        (crud[`${resource}/list`] = [])
    })
    return crud
  }

  return {
    ...authGetters,
    ...initResourcesCrud(initialResources),
    ...entitiesCrud,
    ...resourcesGetters,
    ...requestGetters,
  }
}

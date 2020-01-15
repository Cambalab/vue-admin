import { initialResourcesRoutes } from './common.utils'
import AuthTypes from '../../../../src/va-auth/src/types'
import { Types as AlertTypes } from '../../../../src/store/modules/alerts'
import { Types as EntitiesTypes } from '../../../../src/store/modules/entities'
import { Types as RequestsTypes } from '../../../../src/store/modules/requests'
import { Types as ResourcesTypes } from '../../../../src/store/modules/resources'

/**
 * Anonymous Function - Creates a simualtion of initial vuex crud getters
 *
 * @return {Object} The expected Vuex Crud mocked getters
 */
export default () => {
  // Initial vuex crud resources should be added here
  const initialResources = ['articles', 'magazines', 'authors']

  // Vuex initial entities getters should be added here
  const { namespace: entitiesNamespace, ENTITIES_GET_ENTITY } = EntitiesTypes
  const entitiesCrud = {
    [`${entitiesNamespace}/${ENTITIES_GET_ENTITY}`]: {},
  }

  // Vuex initial resources getters should be added here
  const {
    namespace: resourcesNamespace,
    RESOURCES_GET_ALL_ROUTES,
  } = ResourcesTypes
  const resourcesGetters = {
    [`${resourcesNamespace}/${RESOURCES_GET_ALL_ROUTES}`]: initialResourcesRoutes(
      initialResources
    ),
  }

  // Vuex auth getters
  const {
    namespace: authNamespace,
    AUTH_GET_STATUS,
    AUTH_GET_USER,
    AUTH_IS_AUTHENTICATED,
    AUTH_GET_ERROR,
  } = AuthTypes
  const authGetters = {
    [`${authNamespace}/${AUTH_GET_STATUS}`]: 'idle',
    [`${authNamespace}/${AUTH_GET_USER}`]: '',
    [`${authNamespace}/${AUTH_IS_AUTHENTICATED}`]: false,
    [`${authNamespace}/${AUTH_GET_ERROR}`]: {
      response: {
        status: 401,
        message: 'Invalid user or password',
      },
    },
  }

  // Vuex alert getters
  const { namespace: alertsNamespace, ALERTS_GET_SNACKBAR_STATUS } = AlertTypes
  const alertsGetters = {
    [`${alertsNamespace}/${ALERTS_GET_SNACKBAR_STATUS}`]: {
      color: '',
      isVisible: false,
      text: '',
    },
  }

  // Vuex ui getters
  const { namespace: requestsNamespace, REQUESTS_IS_LOADING } = RequestsTypes
  const requestGetters = {
    [`${requestsNamespace}/${REQUESTS_IS_LOADING}`]: false,
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
    ...alertsGetters,
    ...authGetters,
    ...initResourcesCrud(initialResources),
    ...entitiesCrud,
    ...resourcesGetters,
    ...requestGetters,
  }
}

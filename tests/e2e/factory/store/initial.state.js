import { initialResourcesRoutes } from './common.utils'

/**
 * Anonymous Function - Creates a simualtion of initial vuex crud state
 *
 * @return {Object} The expected Vuex Crud mocked state
 */
export default () => {
  // Initial vuex crud resources should be added here
  const initialResources = [
    'articles',
    'magazines',
    'authors'
  ]
  // Vuex Crud Initial State for a resource
  const initialResourceState = {
    createError: null,
    destroyError: null,
    entities: {},
    fetchListError: null,
    fetchSingleError: null,
    isCreating: false,
    isDestroying: false,
    isFetchingList: false,
    isFetchingSingle: false,
    isReplacing: false,
    isUpdating: false,
    list: [],
    replaceError: null,
    updateError: null
  }
  // Vuex Initial State for auth
  const initialAuthState = {
    error: '',
    isAuthenticated: false,
    status: 'idle',
    user: {}
  }

  // Vuex Initial State for request
  const initialRequestState = {
    isLoading: false
  }
  // Vuex Initial State for entities
  const initialEntitiesState = {}
  // Vuex Initial State for resource routes
  const initialResourcesState = {
    routes: initialResourcesRoutes(initialResources)
  }

  /**
   * initResourcesCrud - Given a list of resources, creates mocked vuex crud
   * state for each of them
   *
   * @param {Array} resources An array of strings
   *
   * @return {Object} An object with mocked vuex crud state
   */
  function initResourcesState(resources) {
    const _resources = {}
    resources.forEach(resource => {
      _resources[resource] = initialResourceState
    })
    return _resources
  }

  return {
    ...initResourcesState(initialResources),
    auth: initialAuthState,
    entities: initialEntitiesState,
    resources: initialResourcesState,
    requests: initialRequestState
  }
}

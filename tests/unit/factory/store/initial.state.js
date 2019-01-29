import { initialResourcesRoutes } from './common.utils'

/**
 * Annonymous Function - Creates a simualtion of initial vuex crud state
 *
 * @param {String} snapshot          The name of a component the state should be
 *                                   initialised for
 * @param {Array}  initialResources  A list of resources to initialise the state
 *
 * @return {Object} The expected Vuex Crud mocked state
 */
export default ({
  snapshot = 'default',
  initialResources
}) => {
  // New custom mutations configurations should be added here
  const snapshots = {
    default: initDefaultState,
    Resource: initStateForResource
  }
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
  // Initialises default state
  function initDefaultState() {
    return {
      ...initResourcesState(initialResources),
      entities: initialEntitiesState,
      resources: initialResourcesState
    }
  }
  // Initialises state for a Resource component
  function initStateForResource() {
    return {}
  }

  snapshots[snapshot]()
}

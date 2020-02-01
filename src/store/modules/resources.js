export const Types = {
  namespace: 'resources',

  RESOURCES_ADD_ROUTE: 'RESOURCES_ADD_ROUTE',

  RESOURCES_GET_ALL_ROUTES: 'RESOURCES_GET_ALL_ROUTES',
}

export default {
  namespaced: true,
  state: {
    routes: [],
  },
  mutations: {
    [Types.RESOURCES_ADD_ROUTE](
      { routes },
      { path, name, addedRouteCallback }
    ) {
      let matchingPathRouteIndex
      let newRoute = { path, name }
      routes.forEach(
        (route, index) =>
          route.name === name && (matchingPathRouteIndex = index)
      )
      if (matchingPathRouteIndex !== undefined) {
        routes[matchingPathRouteIndex] = newRoute
      } else {
        routes.push(newRoute)
        addedRouteCallback()
      }
    },
  },
  getters: {
    [Types.RESOURCES_GET_ALL_ROUTES]: state => state.routes,
  },
}

export default {
  namespaced: true,
  state: {
    routes: [],
  },
  mutations: {
    addRoute({ routes }, { path, name, addedRouteCallback }) {
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
    all: state => state.routes,
  },
}

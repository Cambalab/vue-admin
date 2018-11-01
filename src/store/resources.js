export default {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    addRoute({ routes }, payload) {
      routes.push({
        path: payload.path,
        name: payload.name
      })
    },
    removeRoute: ({ routes }, route) => {
      routes.splice(routes.indexOf(route), 1)
    }
  },
  getters: {
    all: state => state.routes
  }
}

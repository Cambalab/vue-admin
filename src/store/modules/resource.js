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
      });
    }
  },
  getters: {
    all: state => state.routes
  }
};

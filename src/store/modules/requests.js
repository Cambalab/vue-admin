export default {
  namespaced: true,
  state: {
    isLoading: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload.isLoading
    },
  },
  getters: {
    isLoading: state => state.isLoading,
  },
}

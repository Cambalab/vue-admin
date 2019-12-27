export const Types = {
  namespace: 'requests',

  REQUESTS_SET_LOADING: 'REQUESTS_SET_LOADING',

  REQUESTS_IS_LOADING: 'REQUESTS_IS_LOADING',
}

export default {
  namespaced: true,
  state: {
    isLoading: false,
  },
  mutations: {
    [`${Types.REQUESTS_SET_LOADING}`](state, payload) {
      state.isLoading = payload.isLoading
    },
  },
  getters: {
    [`${Types.REQUESTS_IS_LOADING}`]: state => state.isLoading,
  },
}

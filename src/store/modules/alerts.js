export const Types = {
  namespace: 'alerts',

  ALERTS_HIDE_SNACKBAR: 'ALERTS_HIDE_SNACKBAR',
  ALERTS_SHOW_SNACKBAR: 'ALERTS_SHOW_SNACKBAR',

  ALERTS_GET_STATUS: 'ALERTS_GET_STATUS',
}

export default {
  namespaced: true,
  state: {
    isVisible: false,
  },
  mutations: {
    [Types.ALERTS_HIDE_SNACKBAR](state) {
      state.isVisible = false
    },
    [Types.ALERTS_SHOW_SNACKBAR](state) {
      state.isVisible = true
    },
  },
  getters: {
    [Types.ALERTS_GET_STATUS]: state => state.isVisible,
  },
}

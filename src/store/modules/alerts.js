export const Types = {
  namespace: 'alerts',

  ALERTS_HIDE_SNACKBAR: 'ALERTS_HIDE_SNACKBAR',
  ALERTS_SHOW_SNACKBAR: 'ALERTS_SHOW_SNACKBAR',

  ALERTS_GET_SNACKBAR_STATUS: 'ALERTS_GET_SNACKBAR_STATUS',
}

export default {
  namespaced: true,
  state: {
    snackbar: {
      color: '',
      isVisible: false,
      text: '',
    },
  },
  mutations: {
    [Types.ALERTS_HIDE_SNACKBAR](state) {
      state.snackbar.color = ''
      state.snackbar.text = ''
      state.isVisible = false
    },
    [Types.ALERTS_SHOW_SNACKBAR](state, { color, text }) {
      state.snackbar.color = color
      state.snackbar.text = text
      state.snackbar.isVisible = true
    },
  },
  getters: {
    [Types.ALERTS_GET_SNACKBAR_STATUS]: state => state.snackbar,
  },
}

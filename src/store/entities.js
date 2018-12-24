export const entities = {
  namespaced: true,
  state: {
    createForm: {}
  },
  mutations: {
    updateCreateForm({ createForm }, payload) {
      createForm[payload.entity] = createForm[payload.entity] || {}
      createForm[payload.entity][payload.key] = payload.value
    }
  },
  getters: {
    getEntity: state => state
  }
}

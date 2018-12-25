export const entities = {
  namespaced: true,
  state: {
    createForm: {},
    editForm: {}
  },
  mutations: {
    updateForm(state, { formType, entity, resourceKey, value }) {
      state[formType][entity] = state[formType][entity] || {}
      state[formType][entity][resourceKey] = value
    }
  },
  getters: {
    getEntity: state => state
  }
}

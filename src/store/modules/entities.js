export default {
  namespaced: true,
  state: {},
  mutations: {
    updateForm(state, { formType, entity, resourceKey, value }) {
      state[formType] = state[formType] || {}
      state[formType][entity] = state[formType][entity] || {}
      state[formType][entity][resourceKey] = value
    }
  },
  getters: {
    getEntity: state => state
  }
}

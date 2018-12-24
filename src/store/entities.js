export const entities = {
  namespaced: true,
  state: {
    createForm: {}
  },
  mutations: {
    updateCreateForm({ createForm }, { entity, resourceKey, value }) {
      createForm[entity] = createForm[entity] || {}
      createForm[entity][resourceKey] = value
    }
  },
  getters: {
    getEntity: state => state
  }
}

const initForm = (state, { formType, entity }) => {
  state[formType] = state[formType] || {}
  state[formType][entity] = state[formType][entity] || {}
}

export default {
  namespaced: true,
  state: {},
  mutations: {
    updateForm(state, { formType, entity, resourceKey, value }) {
      initForm(state, { formType, entity })
      state[formType][entity][resourceKey] = value
    },
    initForm,
  },
  getters: {
    getEntity: state => state,
  },
}

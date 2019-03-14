import axios from 'axios'

const USER_REQUEST = 'USER_REQUEST'
const USER_SUCCESS = 'USER_SUCCESS'
const USER_FAILURE = 'USER_FAILURE'
const AUTH_ERROR   = 'AUTH_ERROR'


export default {
  namespaced: true,
  state: {
    status: 'idle',
    user: {},
    error: ''
  },
  mutations: {
    [USER_REQUEST]: (state) => {
      state.status = 'running'
    },
    [USER_SUCCESS]: (state, user) => {
      state.status = 'idle'
      state.user   = user
    },
    [USER_FAILURE]: (state, error) => {
      state.status = 'idle'
      state.error  = error
    },
  },
  getters: {
    user: state => state.user,
    userStatus: state => state.status,
  },
  actions: {
    [USER_REQUEST]: ({ commit }, payload) => {
      commit(USER_REQUEST)
      const { token } = payload
      const url = 'http://localhost:8888/api/auth'
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        token,
      }
      const method = 'get'
      return new Promise((resolve, reject) => {
        axios({ url, headers, method })
          .then(response => {
            const { data: { user } } = response
            commit(USER_SUCCESS, user)
            resolve(response)
          })
          .catch(error => {
            commit(`auth/${AUTH_ERROR}`, error, { root: true })
            commit(USER_FAILURE, error)
            reject(error)
          })
      })
    }
  }
}

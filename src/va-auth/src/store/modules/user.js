import axios from 'axios'
import { AuthTypes, UserTypes } from '../../types'

export default {
  namespaced: true,
  state: {
    status: 'idle',
    user: {},
    error: '',
  },
  mutations: {
    [UserTypes.USER_REQUEST]: (state) => {
      state.status = 'running'
    },
    [UserTypes.USER_SUCCESS]: (state, user) => {
      state.status = 'idle'
      state.user   = user
    },
    [UserTypes.USER_FAILURE]: (state, error) => {
      state.status = 'idle'
      state.error  = error
    },
  },
  getters: {
    user: state => state.user,
    userStatus: state => state.status,
  },
  actions: {
    [UserTypes.USER_REQUEST]: ({ commit }, payload) => {
      commit(UserTypes.USER_REQUEST)
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
            commit(UserTypes.USER_SUCCESS, user)
            resolve(response)
          })
          .catch(error => {
            commit(`auth/${AuthTypes.AUTH_ERROR}`, error, { root: true })
            commit(UserTypes.USER_FAILURE, error)
            reject(error)
          })
      })
    }
  }
}

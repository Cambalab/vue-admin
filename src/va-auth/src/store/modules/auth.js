import axios from 'axios'
import { AuthTypes, UserTypes } from '../../types'

const accessTokenField = 'userToken'
const authUrl = 'http://localhost:8888/api/auth'
const userFields = { username: 'email', password: 'password' }

export default {
  namespaced: true,
  state: {
    status: 'idle',
    token: localStorage.getItem(accessTokenField) || '',
    error: '',
  },
  mutations: {
    [AuthTypes.AUTH_REQUEST]: (state) => {
      state.status = 'running'
    },
    [AuthTypes.AUTH_SUCCESS]: (state, token) => {
      state.status = 'idle'
      state.token  = token
    },
    [AuthTypes.AUTH_ERROR]: (state, error) => {
      state.status = 'idle'
      state.token  = ''
      state.error  = error
    },
    [AuthTypes.AUTH_LOGOUT]: (state) => {
      state.token = ''
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getToken: state => state.token,
  },
  actions: {
    [AuthTypes.AUTH_REQUEST]: (context, user) => {
      // TODO: should move to adapter implementation

      const url = authUrl
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        username: user[userFields.username],
        password: user[userFields.password]
      }
      const method = 'post'
      // The Promise used for router redirect in login
      return new Promise((resolve, reject) => {
        context.commit(AuthTypes.AUTH_REQUEST)
        axios({ url, headers, method })
          .then(response => {
            const token = response.data.token || ''
            // store the token in localstorage
            localStorage.setItem(accessTokenField, token)
            axios.defaults.headers.common['Authorization'] = token
            context.commit(AuthTypes.AUTH_SUCCESS, token)
            // you have your token, now log in your user :)
            context.dispatch(`user/${UserTypes.USER_REQUEST}`, { token }, { root: true })
            resolve(response)
          })
          .catch(error => {
            context.commit(AuthTypes.AUTH_ERROR, error)
            // if the request fails, remove any possible user token if possible

            // TODO: should move to adapter implementation
            localStorage.removeItem(accessTokenField)
            reject(error)
          })
      })
    },
    [AuthTypes.AUTH_ERROR]: ({ commit }) => {
      commit(AuthTypes.AUTH_ERROR)
      // if the request fails, remove any possible user token if possible

      // TODO: should move to adapter implementation
      localStorage.removeItem(accessTokenField)
    },
    [AuthTypes.AUTH_LOGOUT]: ({ commit }) => {
      return new Promise((resolve) => {
        commit(AuthTypes.AUTH_LOGOUT)
        // clear your user's token from localstorage

        // TODO: should move to adapter implementation
        localStorage.removeItem(accessTokenField)
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  }
}

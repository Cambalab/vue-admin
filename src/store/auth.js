import axios from 'axios'

const AUTH_REQUEST = 'AUTH_REQUEST'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_ERROR   = 'AUTH_ERROR'
const AUTH_LOGOUT  = 'AUTH_LOGOUT'
const USER_REQUEST = 'USER_REQUEST'

export default {
  namespaced: true,
  state: {
    status: 'idle',
    token: localStorage.getItem('userToken') || '',
    error: '',
  },
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'running'
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'idle'
      state.token  = token
    },
    [AUTH_ERROR]: (state, error) => {
      state.status = 'idle'
      state.token  = ''
      state.error  = error
    },
    [AUTH_LOGOUT]: (state) => {
      state.token = ''
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getToken: state => state.token,
  },
  actions: {
    [AUTH_REQUEST]: (context, user) => {
      const url = 'http://localhost:8888/api/auth'
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        username: user.email,
        password: user.password
      }
      const method = 'post'
      // The Promise used for router redirect in login
      return new Promise((resolve, reject) => {
        context.commit(AUTH_REQUEST)
        axios({ url, headers, method })
          .then(response => {
            const token = response.data.token || ''
            // store the token in localstorage
            localStorage.setItem('userToken', token)
            axios.defaults.headers.common['Authorization'] = token
            context.commit(AUTH_SUCCESS, token)
            // you have your token, now log in your user :)
            context.dispatch(`user/${USER_REQUEST}`, { token }, { root: true })
            resolve(response)
          })
          .catch(error => {
            context.commit(AUTH_ERROR, error)
            // if the request fails, remove any possible user token if possible
            localStorage.removeItem('userToken')
            reject(error)
          })
      })
    },
    [AUTH_ERROR]: ({ commit }) => {
      commit(AUTH_ERROR)
      // if the request fails, remove any possible user token if possible
      localStorage.removeItem('userToken')
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      return new Promise((resolve) => {
        commit(AUTH_LOGOUT)
        // clear your user's token from localstorage
        localStorage.removeItem('userToken')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  }
}

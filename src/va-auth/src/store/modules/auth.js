import axios from 'axios'
import Types from '../../types'

const accessTokenField = 'userToken'
const authUrl = 'http://localhost:8888/api/auth'
const usersUrl = 'http://localhost:8888/api/auth'
const userFields = { username: 'email', password: 'password' }

export default {
  namespaced: true,

  state: {
    error: '',
    status: 'idle',
    token: localStorage.getItem(accessTokenField) || '',
    user: {},
  },

  mutations: {
    [Types.AUTH_REQUEST]: (state) => {
      state.status = 'running'
    },
    [Types.AUTH_SUCCESS]: (state, token) => {
      state.status = 'idle'
      state.token  = token
    },
    [Types.AUTH_ERROR]: (state, error) => {
      state.status = 'idle'
      state.token  = ''
      state.error  = error
    },
    [Types.AUTH_LOGOUT]: (state) => {
      state.token = ''
    },
    [Types.USER_REQUEST]: (state) => {
      state.status = 'running'
    },
    [Types.USER_SUCCESS]: (state, user) => {
      state.status = 'idle'
      state.user   = user
    },
    [Types.USER_FAILURE]: (state, error) => {
      state.status = 'idle'
      state.error  = error
    },
  },

  getters: {
    authStatus: state => state.status,
    isAuthenticated: state => !!state.token,
    getToken: state => state.token,
    getUser: state => state.user,
  },

  actions: {
    [Types.AUTH_REQUEST]: (context, user) => {
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
        context.commit(Types.AUTH_REQUEST)
        axios({ url, headers, method })
          .then(response => {
            const token = response.data.token || ''
            // store the token in localstorage
            localStorage.setItem(accessTokenField, token)
            axios.defaults.headers.common['Authorization'] = token
            context.commit(Types.AUTH_SUCCESS, token)
            // you have your token, now log in your user :)
            context.dispatch(Types.USER_REQUEST, { token })
            resolve(response)
          })
          .catch(error => {
            context.commit(Types.AUTH_ERROR, error)
            // if the request fails, remove any possible user token if possible

            // TODO: should move to adapter implementation
            localStorage.removeItem(accessTokenField)
            reject(error)
          })
      })
    },
    [Types.AUTH_ERROR]: ({ commit }) => {
      commit(Types.AUTH_ERROR)
      // if the request fails, remove any possible user token if possible

      // TODO: should move to adapter implementation
      localStorage.removeItem(accessTokenField)
    },
    [Types.AUTH_LOGOUT]: ({ commit }) => {
      return new Promise((resolve) => {
        commit(Types.AUTH_LOGOUT)
        // clear your user's token from localstorage

        // TODO: should move to adapter implementation
        localStorage.removeItem(accessTokenField)
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    [Types.USER_REQUEST]: ({ commit }, payload) => {
      commit(Types.USER_REQUEST)
      const { token } = payload
      const url = usersUrl
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        token,
      }
      const method = 'get'
      return new Promise((resolve, reject) => {
        axios({ url, headers, method })
          .then(response => {
            const { data: { user } } = response
            commit(Types.USER_SUCCESS, user)
            resolve(response)
          })
          .catch(error => {
            commit(Types.AUTH_ERROR, error)
            commit(Types.USER_FAILURE, error)
            reject(error)
          })
      })
    }
  }
}

import { createUser } from '../users'

export const createAuthResponse = (args = {}) => {
  const status = 200
  const user = createUser()
  const _args = {
    status,
    user,
  }
  return Object.assign({}, _args, args)
}

export const createCredentials = (args = {}) => {
  const username = 'dev@camba.coop'
  const password = '123456'
  const _args = {
    username,
    password,
  }
  return Object.assign({}, _args, args)
}

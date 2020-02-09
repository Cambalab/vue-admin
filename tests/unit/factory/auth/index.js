/**
 * Creates fake credentials for an Auth component
 *
 * @return {Object} An object with fake credentials
 */
export const createCredentials = args => {
  const _args = {
    username: 'dev@camba.coop',
    password: '123456',
  }
  return Object.assign({}, _args, args)
}

/**
 * Creates fake credentials for an Auth component
 *
 * @return {Object} An object with fake credentials
 */
export const createUser = args => {
  const _args = {
    username: 'dev@camba.coop',
    id: '234567',
    permissions: ['admin']
  }
  return Object.assign({}, _args, args)
}

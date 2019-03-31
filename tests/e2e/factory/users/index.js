export const createUser = (args = {}) => {
  const id = 234567
  const email = 'dev@camba.coop'
  const permissions = ['admin']
  const _args = {
    id,
    email,
    permissions,
  }
  return Object.assign({}, _args, args)
}

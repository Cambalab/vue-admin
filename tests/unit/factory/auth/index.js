
/**
 * Creates fake credentials for an Auth component
 *
 * @return {Object} An object with fake credentials
 */
export default (args) => {
  const _args = {
    username: 'dev@camba.coop',
    password: '123456'
  }
  return Object.assign({}, _args, args)
}

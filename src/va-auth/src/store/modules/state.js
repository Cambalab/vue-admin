/**
 * Create Auth Module State - Given a set of data, creates the state for an
 * auth store module
 *
 * @return {Object} The state for the auth store
 */
export default() => {
  return {
    error: '',
    status: 'idle',
    user: {},
  }
}

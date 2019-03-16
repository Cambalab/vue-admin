/**
 * Create Auth Module State - Given a set of data, creates the state for an
 * auth store module
 *
 * @param {String}   accessTokenField The name of the token in localStorage
 *
 * @return {Object} The state for the auth store
 */
export default({
  accessTokenField,
}) => {
  return {
    error: '',
    status: 'idle',
    token: localStorage.getItem(accessTokenField) || '',
    user: {},
  }
}

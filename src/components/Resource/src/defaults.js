import { handleEmptyProp } from '@handlers/error/src'

/**
 * Anonymous - Default attributes for the Resource component
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  function _parseResponse(response) {
    const { data } = response;
    return Object.assign({}, response, { data });
  }

  function _parseResponses() {
    return {
      set parseList(response) { return _parseResponse(response) },
      set parseSingle(response) { return _parseResponse(response) }
    }
  }

  function _redirect() {
    return { views: { create: 'list', edit: 'show' } }
  }

  const apiUrl         = handleEmptyProp({ prop: 'apiUrl', at: 'Resource' })
  const list           = handleEmptyProp({ prop: 'list', at: 'Resource' })
  const name           = handleEmptyProp({ prop: 'name', at: 'Resource' })
  const parseResponses = () => _parseResponses()
  const redirect       = () => _redirect()
  const resourceIdName = 'id'

  return {
    props: {
      name,
      list,
      resourceIdName,
      apiUrl,
      redirect,
      parseResponses
    }
  }
}

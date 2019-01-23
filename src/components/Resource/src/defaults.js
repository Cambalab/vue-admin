import {
  handleEmptyProp,
  handleSchemaValidation
} from '@handlers/error/src'

/**
 * Defaults - Default attributes for the Resource component
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  const component = 'Resource'

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
    return {
      views: {
        create: 'list',
        edit: 'show'
      }
    }
  }

  /**
   * Resource default props
   */
  const apiUrl         = handleEmptyProp({ prop: 'apiUrl', at: component })
  const list           = handleEmptyProp({ prop: 'list', at: component })
  const name           = handleEmptyProp({ prop: 'name', at: component })
  const parseResponses = _parseResponses
  const redirect       = _redirect
  const resourceIdName = 'id'

  /**
   * Resource default validations
   */
  function validateRedirect(redirect) {
    return handleSchemaValidation({
      schema: redirect,
      prop: 'redirect',
      at: component
    })
  }

  return {
    props: {
      name,
      list,
      resourceIdName,
      apiUrl,
      redirect,
      parseResponses
    },
    validate: {
      redirect: validateRedirect
    }
  }
}

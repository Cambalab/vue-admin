import { handleEmptyProp, handleSchemaValidation } from '@handlers/error/src'
import { Types as AlertTypes } from '@store/modules/alerts'
import UI_CONTENT from '@constants/ui.content.default'

/**
 * Defaults - Default attributes for the Resource component
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  const component = 'Resource'

  function _parseResponse(response) {
    const { data } = response
    return Object.assign({}, response, { data })
  }

  function _parseResponses() {
    return {
      set parseList(response) {
        return _parseResponse(response)
      },
      set parseSingle(response) {
        return _parseResponse(response)
      },
    }
  }

  function _redirect() {
    return {
      views: {
        create: 'list',
        edit: 'show',
      },
    }
  }

  const _subscriptions = store => {
    const { namespace: alertsNamespace, ALERTS_SHOW_SNACKBAR } = AlertTypes
    return {
      onCreateSuccess: () => {
        const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
        store.commit(mutationCommit, {
          color: UI_CONTENT.SNACKBAR_SUCCESS_COLOR,
          text: UI_CONTENT.SNACKBAR_CREATE_ELEMENT_SUCCESS_TEXT,
        })
      },
      onDestroySuccess: () => {
        const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
        store.commit(mutationCommit, {
          color: UI_CONTENT.SNACKBAR_SUCCESS_COLOR,
          text: UI_CONTENT.SNACKBAR_DELETE_ELEMENT_SUCCESS_TEXT,
        })
      },
      onUpdateSuccess: () => {
        const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
        store.commit(mutationCommit, {
          color: UI_CONTENT.SNACKBAR_SUCCESS_COLOR,
          text: UI_CONTENT.SNACKBAR_UPDATE_ELEMENT_SUCCESS_TEXT,
        })
      },
      onCreateError: () => {
        const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
        store.commit(mutationCommit, {
          color: UI_CONTENT.SNACKBAR_ERROR_COLOR,
          text: UI_CONTENT.SNACKBAR_CREATE_ELEMENT_ERROR_TEXT,
        })
      },
      onDestroyError: () => {
        const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
        store.commit(mutationCommit, {
          color: UI_CONTENT.SNACKBAR_ERROR_COLOR,
          text: UI_CONTENT.SNACKBAR_DELETE_ELEMENT_ERROR_TEXT,
        })
      },
      onFetchListError: () => {
        const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
        store.commit(mutationCommit, {
          color: UI_CONTENT.SNACKBAR_ERROR_COLOR,
          text: UI_CONTENT.SNACKBAR_FETCH_LIST_ERROR_TEXT,
        })
      },
      onFetchSingleError: () => {
        const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
        store.commit(mutationCommit, {
          color: UI_CONTENT.SNACKBAR_INFO_COLOR,
          text: UI_CONTENT.SNACKBAR_FETCH_SINGLE_ERROR_TEXT,
        })
      },
      onUpdateError: () => {
        const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
        store.commit(mutationCommit, {
          color: UI_CONTENT.SNACKBAR_ERROR_COLOR,
          text: UI_CONTENT.SNACKBAR_UPDATE_ELEMENT_ERROR_TEXT,
        })
      },
    }
  }

  /**
   * Resource default props
   */
  const apiUrl = handleEmptyProp({ prop: 'apiUrl', at: component })
  const list = handleEmptyProp({ prop: 'list', at: component })
  const name = handleEmptyProp({ prop: 'name', at: component })
  const parseResponses = _parseResponses
  const redirect = _redirect
  const resourceIdName = 'id'
  const userPermissionsField = 'permissions'
  const subscriptions = _subscriptions

  /**
   * Resource default validations
   */
  function validateRedirect(redirect) {
    return handleSchemaValidation({
      schema: redirect,
      prop: 'redirect',
      at: component,
    })
  }

  return {
    props: {
      name,
      list,
      resourceIdName,
      userPermissionsField,
      apiUrl,
      redirect,
      parseResponses,
      subscriptions,
    },
    validate: {
      redirect: validateRedirect,
    },
  }
}

import AuthTypes from '@va-auth/types'
import { Types as AlertTypes } from '@store/modules/alerts'
import UI_CONTENT from '@constants/ui.content.default'

const loginAlert = store => mutation => {
  const { namespace: authNamespace, AUTH_LOGIN_SUCCESS } = AuthTypes
  const mutationSubscription = `${authNamespace}/${AUTH_LOGIN_SUCCESS}`

  if (mutation.type === mutationSubscription) {
    const { namespace: alertsNamespace, ALERTS_SHOW_SNACKBAR } = AlertTypes
    const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
    const args = {
      color: UI_CONTENT.AUTH_SNACKBAR_SUCCESS_COLOR,
      text: username =>
        UI_CONTENT.AUTH_SNACKBAR_LOGIN_SUCCESS.with({ username }),
    }
    const { email: username } = mutation.payload
    const text = args.text(username)
    store.commit(mutationCommit, { ...args, text })
  }
}

const failedAuthentication = store => mutation => {
  const { namespace: authNamespace, AUTH_LOGIN_FAILURE } = AuthTypes
  const mutationSubscription = `${authNamespace}/${AUTH_LOGIN_FAILURE}`

  if (mutation.type === mutationSubscription) {
    const { namespace: alertsNamespace, ALERTS_SHOW_SNACKBAR } = AlertTypes
    const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
    const args = {
      color: UI_CONTENT.AUTH_SNACKBAR_FAILURE_COLOR,
      text: UI_CONTENT.AUTH_SNACKBAR_INVALID_USER_PASSWORD,
    }
    store.commit(mutationCommit, args)
  }
}

export const subscriptions = [failedAuthentication, loginAlert]

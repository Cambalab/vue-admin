import AuthTypes from '@va-auth/types'
import { Types as AlertTypes } from '@store/modules/alerts'
import UI_CONTENT from '@constants/ui.content.default'

const {
  namespace: authNamespace,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
} = AuthTypes
const { namespace: alertsNamespace, ALERTS_SHOW_SNACKBAR } = AlertTypes

const loginAlert = store => mutation => {
  const mutationSubscription = `${authNamespace}/${AUTH_LOGIN_SUCCESS}`
  if (mutation.type === mutationSubscription) {
    const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
    const args = {
      color: UI_CONTENT.SNACKBAR_SUCCESS_COLOR,
      text: username =>
        UI_CONTENT.AUTH_SNACKBAR_LOGIN_SUCCESS.with({ username }),
    }
    const { email: username } = mutation.payload
    const text = args.text(username)
    store.commit(mutationCommit, { ...args, text })
  }
}

const failedAuthentication = store => mutation => {
  const mutationSubscription = `${authNamespace}/${AUTH_LOGIN_FAILURE}`
  if (mutation.type === mutationSubscription) {
    const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
    const args = {
      color: UI_CONTENT.SNACKBAR_ERROR_COLOR,
      text: UI_CONTENT.AUTH_SNACKBAR_INVALID_USER_PASSWORD,
    }
    store.commit(mutationCommit, args)
  }
}

export const subscriptions = [failedAuthentication, loginAlert]

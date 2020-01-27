import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import Alerts from '@components/Admin/src/Alerts'
import { subscriptionsPlugin } from '@plugins/vuex'
import alertsStore, { Types as AlertTypes } from '@store/modules/alerts'
import AuthTypes from '@va-auth/types'
import authStore from '@va-auth/store'
import Factory from '@unit/factory'
import { findRef } from '@unit/lib/utils/wrapper'
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'

describe('Alerts.vue', () => {
  Vue.config.silent = true
  Vue.use(Vuetify)
  Vue.use(Vuex)

  // subject
  let subjectWrapper
  // mocks
  let mockedStore
  let mocks
  // spies
  let storeSpy
  // props
  let propsData

  function mountSubject() {
    subjectWrapper = shallowMount(Alerts, {
      mocks,
      propsData,
      store: mockedStore,
      sync: true,
    })
  }

  beforeEach(() => {
    mockedStore = new Vuex.Store({
      modules: {
        alerts: alertsStore,
        auth: authStore(() => new Promise()),
      },
      plugins: [subscriptionsPlugin],
    })
    mocks = { $store: mockedStore }
    storeSpy = {
      commit: jest.spyOn(mocks.$store, 'commit'),
    }
  })

  it('when a user logs in an alert is visible', () => {
    mountSubject()

    // Login excercise
    const { username } = Factory.createCredentials()
    commitSuccesfulLoginMutation(username)
    const expectedSnackbarText = UI_CONTENT.AUTH_SNACKBAR_LOGIN_SUCCESS.with({
      username,
    })
    const expectedSnackbarButtonText = UI_CONTENT.AUTH_SNACKBAR_CLOSE

    // Gets the alert's store values
    const {
      namespace: alertsNamespace,
      ALERTS_GET_SNACKBAR_STATUS,
      ALERTS_SHOW_SNACKBAR,
    } = AlertTypes
    const getter = `${alertsNamespace}/${ALERTS_GET_SNACKBAR_STATUS}`
    const alertState = subjectWrapper.vm.$store.getters[getter]

    const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
    const args = {
      color: UI_CONTENT.AUTH_SNACKBAR_SUCCESS_COLOR,
      text: UI_CONTENT.AUTH_SNACKBAR_LOGIN_SUCCESS.with({ username }),
    }

    // Finds the alert elements
    const alertButton = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.AUTH_SNACKBAR_BUTTON,
    })
    const snackbarText = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.SNACKBAR_TEXT,
    })

    // Assertions
    expect(snackbarText.text()).toBe(expectedSnackbarText)
    expect(alertButton.text()).toBe(expectedSnackbarButtonText)
    expect(alertState.color).toBe(UI_CONTENT.AUTH_SNACKBAR_SUCCESS_COLOR)
    expect(alertState.isVisible).toBe(true)
    expect(alertState.text).toBe(expectedSnackbarText)
    expect(storeSpy.commit).toHaveBeenCalledTimes(2)
    expect(storeSpy.commit).toHaveBeenNthCalledWith(2, mutationCommit, args)
  })

  it('when a user clicks the close button a snackbar disappears', async () => {
    mountSubject()

    // Login excercise
    const { username } = Factory.createCredentials()
    commitSuccesfulLoginMutation(username)

    // Gets the alert's store values
    const {
      namespace: alertsNamespace,
      ALERTS_GET_SNACKBAR_STATUS,
      ALERTS_HIDE_SNACKBAR,
    } = AlertTypes
    const getter = `${alertsNamespace}/${ALERTS_GET_SNACKBAR_STATUS}`
    const hideSnackbarMutation = `${alertsNamespace}/${ALERTS_HIDE_SNACKBAR}`
    const alertState = subjectWrapper.vm.$store.getters[getter]

    // Finds the alert elements
    const alertButton = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.AUTH_SNACKBAR_BUTTON,
    })

    await alertButton.vm.$emit('click')

    expect(alertState.color).toBe('')
    expect(alertState.text).toBe('')
    expect(alertState.isVisible).toBe(false)
    expect(storeSpy.commit).toHaveBeenCalledTimes(3)
    expect(storeSpy.commit).toHaveBeenNthCalledWith(3, hideSnackbarMutation)
  })

  function commitSuccesfulLoginMutation(username) {
    const { namespace, AUTH_LOGIN_SUCCESS } = AuthTypes
    subjectWrapper.vm.$store.commit(`${namespace}/${AUTH_LOGIN_SUCCESS}`, {
      email: username,
    })
  }
})

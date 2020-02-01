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
  // Declares alert constants
  const {
    namespace: alertsNamespace,
    ALERTS_GET_SNACKBAR_STATUS,
    ALERTS_SHOW_SNACKBAR,
    ALERTS_HIDE_SNACKBAR,
  } = AlertTypes
  // Configures Vue instance
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

  function commitSuccesfulLoginMutation(username) {
    const { namespace, AUTH_LOGIN_SUCCESS } = AuthTypes
    subjectWrapper.vm.$store.commit(`${namespace}/${AUTH_LOGIN_SUCCESS}`, {
      email: username,
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
    // Setup
    const { username } = Factory.createCredentials()
    const expectedSnackbarText = UI_CONTENT.AUTH_SNACKBAR_LOGIN_SUCCESS.with({
      username,
    })
    const expectedSnackbarButtonText = UI_CONTENT.AUTH_SNACKBAR_CLOSE
    // Login excercise
    commitSuccesfulLoginMutation(username)
    // Finds the alert elements
    const alert = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.AUTH_SNACKBAR,
    })
    const alertButton = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.AUTH_SNACKBAR_BUTTON,
    })
    const snackbarText = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.SNACKBAR_TEXT,
    })
    // Assertions
    expect(alert.props('value')).toBe(true)
    expect(snackbarText.text()).toBe(expectedSnackbarText)
    expect(alertButton.text()).toBe(expectedSnackbarButtonText)
  })

  it('when a user click the close button an alert is hidden', async () => {
    mountSubject()
    // Setup
    const { username } = Factory.createCredentials()
    const expectedSnackbarText = ''
    const expectedSnackbarButtonText = UI_CONTENT.AUTH_SNACKBAR_CLOSE
    // Login excercise
    commitSuccesfulLoginMutation(username)
    // Finds the alert elements
    const alert = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.AUTH_SNACKBAR,
    })
    const alertButton = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.AUTH_SNACKBAR_BUTTON,
    })
    const snackbarText = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.SNACKBAR_TEXT,
    })
    await alertButton.vm.$emit('click')
    // Assertions
    expect(alert.props('value')).toBe(false)
    expect(alertButton.text()).toBe(expectedSnackbarButtonText)
    expect(snackbarText.text()).toBe(expectedSnackbarText)
  })

  it('when a user logs in an [AUTH_SHOW_SNACKBAR] action is triggered', () => {
    mountSubject()
    // Setup
    const { username } = Factory.createCredentials()
    const expectedSnackbarText = UI_CONTENT.AUTH_SNACKBAR_LOGIN_SUCCESS.with({
      username,
    })
    // Login excercise
    commitSuccesfulLoginMutation(username)
    // Gets the alert's store values
    const getter = `${alertsNamespace}/${ALERTS_GET_SNACKBAR_STATUS}`
    const alertState = subjectWrapper.vm.$store.getters[getter]
    const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
    const args = {
      color: UI_CONTENT.AUTH_SNACKBAR_SUCCESS_COLOR,
      text: UI_CONTENT.AUTH_SNACKBAR_LOGIN_SUCCESS.with({ username }),
    }
    // Assertions
    expect(alertState.color).toBe(UI_CONTENT.AUTH_SNACKBAR_SUCCESS_COLOR)
    expect(alertState.isVisible).toBe(true)
    expect(alertState.text).toBe(expectedSnackbarText)
    expect(storeSpy.commit).toHaveBeenCalledTimes(2)
    expect(storeSpy.commit).toHaveBeenNthCalledWith(2, mutationCommit, args)
  })

  it('when a user closes a snackbar an [AUTH_HIDE_SNACKBAR] action is triggered', async () => {
    mountSubject()
    // Login excercise
    const { username } = Factory.createCredentials()
    commitSuccesfulLoginMutation(username)
    // Gets the alert's store values
    const getter = `${alertsNamespace}/${ALERTS_GET_SNACKBAR_STATUS}`
    const hideSnackbarMutation = `${alertsNamespace}/${ALERTS_HIDE_SNACKBAR}`
    const alertState = subjectWrapper.vm.$store.getters[getter]
    // Finds the alert elements
    const alertButton = findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.AUTH_SNACKBAR_BUTTON,
    })
    // Closes the snackbar
    await alertButton.vm.$emit('click')
    // Assertions
    expect(alertState.color).toBe('')
    expect(alertState.text).toBe('')
    expect(alertState.isVisible).toBe(false)
    expect(storeSpy.commit).toHaveBeenCalledTimes(3)
    expect(storeSpy.commit).toHaveBeenNthCalledWith(3, hideSnackbarMutation)
  })
})

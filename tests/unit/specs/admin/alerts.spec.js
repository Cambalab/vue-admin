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
  const {
    namespace: authNamespace,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
  } = AuthTypes
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

  function commitAuthMutation(mutation, args) {
    subjectWrapper.vm.$store.commit(mutation, { email: args })
  }

  function findSnackbar() {
    return findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.AUTH_SNACKBAR,
    })
  }

  function findSnackbarButton() {
    return findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.AUTH_SNACKBAR_BUTTON,
    })
  }

  function findSnackbarText() {
    return findRef({
      wrapper: subjectWrapper,
      ref: UI_NAMES.SNACKBAR_TEXT,
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
    commitAuthMutation(`${authNamespace}/${AUTH_LOGIN_SUCCESS}`, username)
    // Finds the alert elements
    const snackbar = findSnackbar()
    const snackbarButton = findSnackbarButton()
    const snackbarText = findSnackbarText()
    // Assertions
    expect(snackbar.props('value')).toBe(true)
    expect(snackbarText.text()).toBe(expectedSnackbarText)
    expect(snackbarButton.text()).toBe(expectedSnackbarButtonText)
  })

  it('when a user authenticates with wrong credentials an alert is visible', () => {
    mountSubject()
    // Setup
    const { username } = Factory.createCredentials()
    const expectedSnackbarText = UI_CONTENT.AUTH_SNACKBAR_INVALID_USER_PASSWORD
    const expectedSnackbarButtonText = UI_CONTENT.AUTH_SNACKBAR_CLOSE
    // Login excercise
    commitAuthMutation(`${authNamespace}/${AUTH_LOGIN_FAILURE}`, username)
    // Finds the alert elements
    const snackbar = findSnackbar()
    const snackbarButton = findSnackbarButton()
    const snackbarText = findSnackbarText()
    // Assertions
    expect(snackbar.props('value')).toBe(true)
    expect(snackbarText.text()).toBe(expectedSnackbarText)
    expect(snackbarButton.text()).toBe(expectedSnackbarButtonText)
  })

  it('when a user clicks the alert close button an alert is hidden', async () => {
    mountSubject()
    // Setup
    const { username } = Factory.createCredentials()
    const expectedSnackbarText = ''
    const expectedSnackbarButtonText = UI_CONTENT.AUTH_SNACKBAR_CLOSE
    // Login excercise
    commitAuthMutation(`${authNamespace}/${AUTH_LOGIN_SUCCESS}`, username)
    // Finds the alert elements
    const snackbar = findSnackbar()
    const snackbarButton = findSnackbarButton()
    const snackbarText = findSnackbarText()
    // Excercise, clicks the close button
    await snackbarButton.vm.$emit('click')
    // Assertions
    expect(snackbar.props('value')).toBe(false)
    expect(snackbarButton.text()).toBe(expectedSnackbarButtonText)
    expect(snackbarText.text()).toBe(expectedSnackbarText)
  })

  it('[Vuex] when a user logs in an [AUTH_SHOW_SNACKBAR] action is triggered', () => {
    mountSubject()
    // Setup
    const { username } = Factory.createCredentials()
    const expectedSnackbarText = UI_CONTENT.AUTH_SNACKBAR_LOGIN_SUCCESS.with({
      username,
    })
    // Login excercise
    commitAuthMutation(`${authNamespace}/${AUTH_LOGIN_SUCCESS}`, username)
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

  it('[Vuex] when a user clicks the alert close button an [AUTH_HIDE_SNACKBAR] action is triggered', async () => {
    mountSubject()
    // Login excercise
    const { username } = Factory.createCredentials()
    commitAuthMutation(`${authNamespace}/${AUTH_LOGIN_SUCCESS}`, username)
    // Gets the alert's store values
    const getter = `${alertsNamespace}/${ALERTS_GET_SNACKBAR_STATUS}`
    const hideSnackbarMutation = `${alertsNamespace}/${ALERTS_HIDE_SNACKBAR}`
    const alertState = subjectWrapper.vm.$store.getters[getter]
    // Finds the alert elements
    const snackbarButton = findSnackbarButton()
    // Excercise, clicks the close button
    await snackbarButton.vm.$emit('click')
    // Assertions
    expect(alertState.color).toBe('')
    expect(alertState.text).toBe('')
    expect(alertState.isVisible).toBe(false)
    expect(storeSpy.commit).toHaveBeenCalledTimes(3)
    expect(storeSpy.commit).toHaveBeenNthCalledWith(3, hideSnackbarMutation)
  })
})

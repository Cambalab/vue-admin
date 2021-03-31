import Vue from 'vue'
import Vuetify from 'vuetify'
import { AuthLayout } from '@components/Layouts'
import Factory from '@unit/factory'
import { mount } from '@vue/test-utils'
import UI_NAMES from '@constants/ui.element.names'
import UI_CONTENT from '@constants/ui.content.default'
import UNIT_CONSTANTS from '@unit/lib/constants'
import authFixture from '@unit/fixtures/auth'
import { findElemByName, findRef, nextTick } from '@unit/lib/utils/wrapper'

describe('AuthLayout.vue', () => {
  const subject = 'AuthLayout'
  Vue.use(Vuetify)

  let propsData
  let wrapper
  let vaPropSpy
  let vuetify

  const { username, password } = Factory.createCredentials()

  const {
    VUETIFY_TEXT_FIELD_LABEL_DETAILS_CLASS: TEXT_FIELD_LABEL,
  } = UNIT_CONSTANTS

  const _mount = ({ propsData }) => {
    wrapper = mount(AuthLayout, {
      propsData,
      sync: false,
    })
  }

  beforeEach(() => {
    AuthLayout.install(Vue)
    propsData = authFixture({ username, password }).props
    vuetify = new Vuetify()
    vaPropSpy = {
      login: jest.spyOn(propsData.va, 'login'),
    }

    _mount({ propsData, vuetify })
  })

  afterEach(() => {
    wrapper = {}
  })

  it('should have default props', () => {
    const props = wrapper.props()
    expect(wrapper.name()).toMatch(subject)
    expect(props.authFormTitle).toMatchObject(propsData.authFormTitle)
    expect(props.authFooter).toMatchObject(propsData.authFooter)
    expect(props.authMainContent).toMatchObject(propsData.authMainContent)
    expect(props.usernameRules).toMatchObject(propsData.usernameRules)
    expect(props.passwordRules).toMatchObject(propsData.passwordRules)
  })

  it('should have non default props', () => {
    const props = wrapper.props()
    expect(props.va).toMatchObject(propsData.va)
  })

  it('should render a text field with a username text label', () => {
    const textFieldText = UI_CONTENT.AUTH_LABEL_USERNAME
    const textFieldName = UI_NAMES.AUTH_USERNAME_INPUT
    const textField = findRef({ wrapper, ref: textFieldName })

    expect(textField.text()).toBe(textFieldText)
  })

  it('should render a text field with a password text label', () => {
    const textFieldText = UI_CONTENT.AUTH_LABEL_PASSWORD
    const textFieldName = UI_NAMES.AUTH_PASSWORD_INPUT
    const textField = findRef({ wrapper, ref: textFieldName })

    expect(textField.text()).toBe(textFieldText)
  })

  it('should render a submit button with a submit text label', () => {
    const buttonText = UI_CONTENT.AUTH_LABEL_SIGN_IN_BUTTON
    const buttonName = UI_NAMES.AUTH_SIGN_IN_BUTTON
    const button = findElemByName({ wrapper, el: 'button', name: buttonName })

    expect(button.text()).toBe(buttonText)
  })

  it('should show a username text when the username input is filled', async () => {
    const value = username
    const textFieldName = UI_NAMES.AUTH_USERNAME_INPUT
    const textField = findRef({ wrapper, ref: textFieldName })

    textField.vm.$emit('input', value)
    await nextTick(wrapper)

    expect(textField.vm.value).toEqual(value)
  })

  it('should show a hidden password text when the password input is filled', async () => {
    const value = password
    const textFieldName = UI_NAMES.AUTH_USERNAME_INPUT
    const textField = findRef({ wrapper, ref: textFieldName })

    textField.vm.$emit('input', value)
    await nextTick(wrapper)

    expect(textField.vm.value).toEqual(value)
  })

  it('should show a warning message when username field is empty', async () => {
    const value = ''
    const textFieldName = UI_NAMES.AUTH_USERNAME_INPUT
    const buttonName = UI_NAMES.AUTH_SIGN_IN_BUTTON
    const errorMessage = UI_CONTENT.AUTH_ALERT_EMAIL_REQUIRED
    const button = findElemByName({ wrapper, el: 'button', name: buttonName })
    const textField = findRef({ wrapper, ref: textFieldName })

    await textField.vm.focus()
    await nextTick(wrapper)
    await textField.vm.blur()
    await nextTick(wrapper)
    const textFieldLabel = wrapper.find(TEXT_FIELD_LABEL)

    expect(textField.vm.value).toEqual(value)
    expect(textFieldLabel.text()).toBe(errorMessage)
    expect(wrapper.vm.valid).toBe(false)
    expect(button.vm.disabled).toBe(true)
  })

  it('should show a warning message when password field is empty', async () => {
    const value = ''
    const textFieldName = UI_NAMES.AUTH_PASSWORD_INPUT
    const buttonName = UI_NAMES.AUTH_SIGN_IN_BUTTON
    const errorMessage = UI_CONTENT.AUTH_ALERT_PASSWORD_REQUIRED
    const button = findElemByName({ wrapper, el: 'button', name: buttonName })
    const textField = findRef({ wrapper, ref: textFieldName })

    await textField.vm.focus()
    await nextTick(wrapper)
    await textField.vm.blur()
    await nextTick(wrapper)
    const textFieldLabel = wrapper.find(TEXT_FIELD_LABEL)

    expect(textField.vm.value).toEqual(value)
    expect(textFieldLabel.text()).toBe(errorMessage)
    expect(wrapper.vm.valid).toBe(false)
    expect(button.vm.disabled).toBe(true)
  })

  it('should show an error message on invalid email input', async () => {
    const value = 'a'
    const textFieldName = UI_NAMES.AUTH_USERNAME_INPUT
    const buttonName = UI_NAMES.AUTH_SIGN_IN_BUTTON
    const errorMessage = UI_CONTENT.AUTH_ALERT_INVALID_EMAIL
    const button = findElemByName({ wrapper, el: 'button', name: buttonName })
    const textField = findRef({ wrapper, ref: textFieldName })

    textField.vm.$emit('input', value)
    await nextTick(wrapper)
    await nextTick(wrapper)

    const textFieldLabel = wrapper.find(TEXT_FIELD_LABEL)

    expect(textFieldLabel.text()).toBe(errorMessage)
    expect(textField.vm.value).toEqual(value)
    expect(wrapper.vm.valid).toBe(false)
    expect(button.vm.disabled).toBe(true)
  })

  it('should login on button submit', async () => {
    const usernameTextFieldName = UI_NAMES.AUTH_USERNAME_INPUT
    const passwordTextFieldName = UI_NAMES.AUTH_PASSWORD_INPUT
    const buttonName = UI_NAMES.AUTH_SIGN_IN_BUTTON
    const usernameTextField = findRef({ wrapper, ref: usernameTextFieldName })
    const passwordTextField = findRef({ wrapper, ref: passwordTextFieldName })
    const button = findRef({ wrapper, ref: buttonName })

    usernameTextField.vm.$emit('input', username)
    await nextTick(wrapper)
    passwordTextField.vm.$emit('input', password)
    await nextTick(wrapper)
    button.vm.$emit('click')
    await nextTick(wrapper)

    expect(vaPropSpy.login).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.valid).toBe(true)
    expect(button.vm.disabled).toBe(false)
  })
})

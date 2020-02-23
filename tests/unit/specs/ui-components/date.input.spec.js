import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import DateField from '@components/UiComponents/DateField'
import ERROR_MESSAGES from '@constants/error.messages'
import dateInputFixture from '@unit/fixtures/ui-components/date.input.js'

describe('DateField.vue', () => {
  const subject = 'DateField'
  // Initialises the vue instance and DateField dependencies
  Vue.use(Vuetify)
  Vue.config.silent = true

  let vuetify
  let subjectWrapper
  let propsData

  beforeEach(() => {
    // Configures the subject props
    propsData = {
      ...dateInputFixture.props,
    }
    vuetify = new Vuetify()
  })

  it('should have default props', () => {
    // Exercise: mounts the subject instance
    mountSubject()
    const props = subjectWrapper.props()
    expect(subjectWrapper.name()).toMatch(subject)
    expect(props.disabled).toBe(false)
    expect(props.format).toBeDefined()
    expect(props.name).toMatch(dateInputFixture.props.name)
    expect(props.parse).toBeDefined()
    expect(props.readonly).toBe(true)
    expect(props.vDatePickerProps).toMatchObject(
      dateInputFixture.props.vDatePickerProps
    )
    expect(props.vMenuProps).toMatchObject(dateInputFixture.props.vMenuProps)
  })

  it('should have non default props', () => {
    mountSubject()
    const props = subjectWrapper.props()
    expect(props.placeholder).toBe(dateInputFixture.props.placeholder)
  })

  it('throws Error when the {format} property is missing', () => {
    const prop = 'format'
    shouldThrowOnMissingProp({ prop, subject })
  })

  it('throws Error when the {parse} proprty is missing', () => {
    const prop = 'parse'
    shouldThrowOnMissingProp({ prop, subject })
  })

  it('throws Error when the {valid} property is missing', () => {
    const prop = 'valid'
    shouldThrowOnMissingProp({ prop, subject })
  })

  /**
   * Helper functions
   */

  function shouldThrowOnMissingProp({ prop, subject }) {
    // Setup: deletes the list prop before mounting
    delete propsData[prop]
    const { UNDEFINED_PROPERTY } = ERROR_MESSAGES
    const at = subject
    const message = UNDEFINED_PROPERTY.with({ prop, at })
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

    try {
      // Exercise: mounts the subject instance
      mountSubject()
    } catch (error) {
      expect(error.message).toBe(message)
    } finally {
      spy.mockRestore()
    }
  }

  // Mounts the component
  function mountSubject() {
    subjectWrapper = mount(DateField, {
      propsData,
      vuetify,
    })
  }
})

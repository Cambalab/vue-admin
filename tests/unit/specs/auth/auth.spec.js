import Vue from 'vue'
import Vuetify from 'vuetify'
import Auth from '@components/Auth/src/Auth'
import { mount } from '@vue/test-utils'
import UI_NAMES from '@constants/ui.element.names'
import UI_CONTENT from '@constants/ui.content.default'

describe('Auth.vue', () => {
  let subjectWrapper

  Vue.use(Vuetify)

  it('should render a submit button with a text label', () => {
    mountSubject()

    const buttonText = UI_CONTENT.AUTH_LABEL_SIGN_IN_BUTTON
    const buttonName = UI_NAMES.AUTH_SIGN_IN_BUTTON
    const submitButton = subjectWrapper.find(`[name="${buttonName}"]`)
    expect(submitButton.text()).toBe(buttonText)
  })

  // Mounts the component
  function mountSubject() {
    subjectWrapper = mount(Auth, {
      // mocks,
      propsData: {
        va: {}
      }
    })
  }
})

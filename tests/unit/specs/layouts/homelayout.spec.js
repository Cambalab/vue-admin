import Vue from 'vue'
import Vuetify from 'vuetify'
import HomeLayout from '@components/Layouts/src/HomeLayout'
import { mount } from '@vue/test-utils'

describe('HomeLayout', () => {
  Vue.use(Vuetify)

  let subjectWrapper
  // stubs
  let propsData
  let vuetify

  // Mounts the component
  function mountSubject() {
    subjectWrapper = mount(HomeLayout, {
      propsData,
      vuetify,
    })
  }

  beforeEach(() => {
    HomeLayout.install(Vue)
    vuetify = new Vuetify()
  })

  it('should have props', () => {
    mountSubject()

    expect(subjectWrapper.text()).toMatch('Welcome to Vue-Admin')
  })
})

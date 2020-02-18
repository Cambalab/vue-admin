import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import UnauthorizedLayout from '@components/Layouts/src/UnauthorizedLayout'
import { shallowMount } from '@vue/test-utils'
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import { TextField } from '@components/UiComponents'
import { findRef } from '@unit/lib/utils/wrapper'

describe('Unauthorized.vue', () => {
  Vue.use(Vuetify)

  const {
    UNAUTHORIZED_HEADER_CONTAINER,
    UNAUTHORIZED_MESSAGE_CONTAINER,
    BUTTON_GO_BACK: BUTTON_GO_BACK_NAME,
  } = UI_NAMES
  const {
    UNAUTHORIZED_HEADER,
    UNAUTHORIZED_MESSAGE,
    BUTTON_GO_BACK: BUTTON_GO_BACK_CONTENT,
  } = UI_CONTENT

  // subject
  let subjectWrapper
  // mocks
  let mockedRouter
  let mocks
  // slots
  let slots
  // spies
  let routerSpy
  // stubs
  let vuetify
  let _window

  function mountSubject() {
    subjectWrapper = shallowMount(UnauthorizedLayout, {
      mocks,
      slots,
      vuetify,
    })
  }

  const findSubmitButton = () => {
    return findRef({
      wrapper: subjectWrapper,
      ref: BUTTON_GO_BACK_NAME,
    })
  }

  beforeEach(() => {
    UnauthorizedLayout.install(Vue)
    const routes = [{}]
    mockedRouter = new VueRouter(routes)
    mocks = { $router: mockedRouter }
    routerSpy = {
      push: jest.spyOn(mocks.$router, 'push'),
      go: jest.spyOn(mocks.$router, 'go'),
    }
    slots = {
      title: {
        render: createElement => {
          return createElement(TextField, {
            type: 'h5',
            name: UNAUTHORIZED_HEADER_CONTAINER,
            value: UNAUTHORIZED_HEADER,
          })
        },
      },
      text: {
        render: createElement => {
          return createElement(TextField, {
            type: 'h5',
            name: UNAUTHORIZED_MESSAGE_CONTAINER,
            value: UNAUTHORIZED_MESSAGE,
          })
        },
      },
    }
    vuetify = new Vuetify()
    _window = Object.create(window)
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should render a [title] named slot', () => {
    mountSubject()

    expect(subjectWrapper.contains(slots.title)).toBe(true)
  })

  it('should render a [text] named slot', () => {
    mountSubject()

    expect(subjectWrapper.contains(slots.text)).toBe(true)
  })

  it('should render an action button', () => {
    mountSubject()

    const actionButton = findSubmitButton()

    expect(actionButton.text()).toMatch(BUTTON_GO_BACK_CONTENT)
  })

  it('should call router [push] action on button click', () => {
    mountSubject()

    const actionButton = findSubmitButton()
    actionButton.vm.$emit('click')

    expect(routerSpy.push).toHaveBeenCalledTimes(1)
    expect(routerSpy.push).toHaveBeenCalledWith('/')
  })

  it('should call router [go] action on button click', () => {
    mountSubject()

    const actionButton = findSubmitButton()
    _window.history.pushState({}, 'aTitle', '')
    actionButton.vm.$emit('click')

    expect(routerSpy.go).toHaveBeenCalledTimes(1)
    expect(routerSpy.go).toHaveBeenCalledWith(-1)
  })
})

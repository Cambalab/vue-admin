import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import AppLayout from '@components/Layouts/src/AppLayout'
import SimpleSidebar from '@components/UiComponents/Sidebar/SimpleSidebar'
import AuthTypes from '@va-auth/types'
import { mount } from '@vue/test-utils'

describe('AppLayout', () => {
  Vue.use(Vuetify)
  Vue.use(Vuex)

  let subjectWrapper
  // stubs
  let propsData
  let vuetify
  // mocks
  let mocks
  let mockedStore

  // Mounts the component
  function mountSubject() {
    subjectWrapper = mount(AppLayout, {
      mocks,
      propsData,
      vuetify,
    })
  }

  beforeEach(() => {
    AppLayout.install(Vue)
    // Configures the subject props
    propsData = {
      sidebar: SimpleSidebar,
      title: 'My AppLayout title',
      va: {
        getUser: () => {
          const { namespace, AUTH_GET_USER } = AuthTypes
          return this.$store.getters[`${namespace}/${AUTH_GET_USER}`]
        },
        logout: () => {
          const { namespace: authNamespace, AUTH_LOGOUT_REQUEST } = AuthTypes
          const actionName = `${authNamespace}/${AUTH_LOGOUT_REQUEST}`
          mockedStore.dispatch(actionName)
        },
      },
    }
    vuetify = new Vuetify()
    mockedStore = new Vuex.Store({})
    mocks = {
      $store: mockedStore,
    }
  })

  it('should have props', () => {
    mountSubject()
    const appLayoutProps = subjectWrapper.props()

    expect(appLayoutProps.sidebar).toBe(propsData.sidebar)
    expect(appLayoutProps.title).toMatch(propsData.title)
    expect(appLayoutProps.va).toBe(propsData.va)
  })
})

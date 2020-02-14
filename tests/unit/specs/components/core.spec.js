import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Core from '@components/Core'
import AppLayout from '@components/Layouts/src/AppLayout'
import Resource from '@components/Resource/src/Resource'
import SimpleSidebar from '@components/UiComponents/Sidebar/SimpleSidebar'
import resourceFixture from '@unit/fixtures/resource/magazines'
import AuthTypes from '@va-auth/types'
import { shallowMount } from '@vue/test-utils'

describe('Core', () => {
  Vue.use(VueRouter)
  Vue.use(Vuetify)
  Vue.use(Vuex)
  Vue.config.silent = true

  let subjectWrapper
  // stubs
  let stubs
  let propsData
  let vuetify
  // mocks
  let mocks
  let mockedStore
  // wrappers
  let resourceWrapper

  // Mounts the component
  function mountSubject() {
    subjectWrapper = shallowMount(Core, {
      mocks,
      propsData,
      stubs,
      vuetify,
      slots: {
        default: [resourceWrapper]
      }
    })
  }

  beforeEach(() => {
    Core.install(Vue)
    // Configures the subject props
    mockedStore = new Vuex.Store({})
    mocks = {
      $store: mockedStore,
    }
    propsData = {
      layout: AppLayout,
      sidebar: SimpleSidebar,
      title: 'Vue Admin!',
      va: {
        getUser: () => {
          const { namespace, AUTH_GET_USER } = AuthTypes
          return this.$store.getters[`${namespace}/${AUTH_GET_USER}`]
        },
        logout: () => {
          const { namespace: authNamespace, AUTH_LOGOUT_REQUEST } = AuthTypes
          const actionName = `${authNamespace}/${AUTH_LOGOUT_REQUEST}`
          mockedStore.dispatch(actionName)
        }
      }
    }
    stubs = ['router-view']
    vuetify = new Vuetify()

    // Stubs wrapper
    resourceWrapper = {
      render(createElement) {
        return createElement(
          Resource, {
            props: {
              name: resourceFixture.props.name,
              apiUrl: resourceFixture.props.apiUrl,
              create: resourceFixture.props.create,
              edit: resourceFixture.props.edit,
              list: resourceFixture.props.list,
              show: resourceFixture.props.show,
              subscriptions: resourceFixture.props.subscriptions,
            }
          }
        )
      }
    }
  })

  it('should have rendered the app layout', () => {
    mountSubject()

    expect(subjectWrapper.is(propsData.layout)).toBe(true)
  })

  it('should have props', () => {
    mountSubject()

    const subjectWrapperProps = subjectWrapper.props()

    expect(subjectWrapperProps.title).toMatch(propsData.title)
    expect(subjectWrapperProps.sidebar).toBe(propsData.sidebar)
    expect(subjectWrapperProps.va).toMatchObject(propsData.va)
  })

  it('should have rendered children', () => {
    mountSubject()

    const resourceChild = subjectWrapper.find(Resource)

    expect(resourceChild.exists()).toBe(true)
    expect(resourceChild.is(Resource)).toBe(true)
  })
})

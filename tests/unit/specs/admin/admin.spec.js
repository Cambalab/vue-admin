import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import ERROR_MESSAGES from '@constants/error.messages'
import Admin from '@components/Admin/src/Admin'
// import { findButtonByName, findRef, nextTick } from '@unit/lib/utils/wrapper'
import Factory from '../../factory'
import adminFixture from '../../fixtures/admin'

describe('Admin.vue', () => {
  const subject = 'Admin'

  Vue.config.silent = true

  Vue.use(VueRouter)
  Vue.use(Vuex)

  let mockedRouter
  let mockedStore
  let mocks
  let propsData
  let routerSpy
  let stubs
  let subjectWrapper

  function mountSubject() {
    subjectWrapper = shallowMount(Admin, {
      mocks, propsData, router: mockedRouter, stubs,
      sync: true
    })
  }

  beforeEach(() => {
    const routes = [{}]
    mockedRouter = new VueRouter(routes)
    mockedStore = new Vuex.Store({})
    mockedRouter['app'] = {}
    mocks = { $store: mockedStore }
    propsData = {
      authProvider: Factory.createAuthProvider()
    }
    stubs = ['router-view']
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should have default props', () => {
    mountSubject()

    const props = subjectWrapper.props()

    expect(subjectWrapper.name()).toMatch(subject)
    expect(props.appLayout).toMatchObject(adminFixture.props.appLayout)
    expect(props.authLayout).toMatchObject(adminFixture.props.authLayout)
    expect(props.sidebar).toMatchObject(adminFixture.props.sidebar)
    expect(props.title).toMatch(adminFixture.props.title)
    expect(props.unauthorized).toMatchObject(adminFixture.props.unauthorized)
  })

  it('should throw an error when the {authProvider} property is missing', () => {
    const prop = 'authProvider'
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
      // Exercise: mounts the subject instance
      expect(mountSubject).toThrow(message)
      // Cannot hide second error throw.
      // In fact, why is it throwing errors twice?
      // Is Admin endering twice?- @sgobotta
    }
})

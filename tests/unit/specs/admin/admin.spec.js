import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from 'vuex'

import Admin from '@components/Admin/src/Admin'
import AuthActionTypes from '@va-auth/types'
import createAuthModule from '@va-auth/store'
import entitiesModule from '@store/modules/entities'
import requestsModule from '@store/modules/requests'
import { shallowMount } from '@vue/test-utils'

import Factory from '../../factory'
import adminFixture from '../../fixtures/admin'

describe('Admin.vue', () => {
  const subject = 'Admin'

  Vue.config.silent = true

  Vue.use(VueRouter)
  Vue.use(Vuex)

  // subject
  let subjectWrapper
  // mocks
  let mockedRouter
  let mockedStore
  let mocks
  // spies
  let storeSpy
  // stubs
  let stubs
  // props
  let propsData
  let authProvider
  let options

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
    authProvider = Factory.createAuthProvider()
    options = {
      authModule: createAuthModule({ client: authProvider })
    }
    propsData = {
      authProvider,
      options
    }
    storeSpy = {
      registerModule: jest.spyOn(mocks.$store, 'registerModule'),
      dispatch: jest.spyOn(mocks.$store, 'dispatch')
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

  it('[Entities Module] should call registerModule on initialisation', () => {
    mountSubject()

    expect(storeSpy.registerModule).toHaveBeenNthCalledWith(1, 'entities', entitiesModule)
  })

  it('[Entities Module] should call registerModule on initialisation', () => {
    mountSubject()

    expect(storeSpy.registerModule).toHaveBeenNthCalledWith(2, 'requests', requestsModule)
  })

  it('[Auth Module] - should call registerModule on initialisation', () => {
    const { authModule } = options
    mountSubject()

    expect(storeSpy.registerModule).toHaveBeenNthCalledWith(3, 'auth', authModule)
  })

  it('[Auth Check Request] - should call dispach', () => {
    mountSubject()
    const { namespace, AUTH_CHECK_REQUEST } = AuthActionTypes

    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(`${namespace}/${AUTH_CHECK_REQUEST}`)
  })
})

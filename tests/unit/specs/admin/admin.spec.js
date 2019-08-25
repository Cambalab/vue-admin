import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from 'vuex'
import Admin from '@components/Admin/src/Admin'
import Authenticated from '@components/Admin/src/Authenticated'
import Unauthenticated from '@components/Admin/src/Unauthenticated'
import AuthActionTypes from '@va-auth/types'
import createAuthModule from '@va-auth/store'
import entitiesModule from '@store/modules/entities'
import requestsModule from '@store/modules/requests'
import { shallowMount } from '@vue/test-utils'
import { nextTick } from '@unit/lib/utils/wrapper'

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
      mocks,
      propsData,
      router: mockedRouter,
      stubs,
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

  it('[Entities Module] - store should call registerModule on beforeCreate', () => {
    mountSubject()

    expect(storeSpy.registerModule).toHaveBeenNthCalledWith(1, 'entities', entitiesModule)
  })

  it('[Entities Module] - store should call registerModule on beforeCreate', () => {
    mountSubject()

    expect(storeSpy.registerModule).toHaveBeenNthCalledWith(2, 'requests', requestsModule)
  })

  it('[Auth Module] - store should call registerModule on created', () => {
    const { authModule } = options
    mountSubject()

    expect(storeSpy.registerModule).toHaveBeenNthCalledWith(3, 'auth', authModule)
  })

  it('[Auth Check Request] - store should call dispach on mounted', () => {
    const { namespace, AUTH_CHECK_REQUEST } = AuthActionTypes
    mountSubject()

    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(`${namespace}/${AUTH_CHECK_REQUEST}`)
  })

  it('[Unauthenticated] - component is rendered when isAuthenticated returns false', () => {
    const { namespace } = AuthActionTypes
    const getter = `${namespace}/isAuthenticated`

    mountSubject()

    const isAuthenticated = subjectWrapper.vm.$store.getters[getter]
    const unauthenticatedLayout = subjectWrapper.find(Unauthenticated)

    expect(isAuthenticated).toBe(false)
    expect(unauthenticatedLayout.exists()).toBe(true)
  })

  it('[Authenticated] - component is rendered when isAuthenticated returns true', async () => {
    const { namespace, AUTH_LOGIN_SUCCESS } = AuthActionTypes
    const getter = `${namespace}/isAuthenticated`

    mountSubject()

    // Sets an authenticated scenario
    subjectWrapper.vm.$store.commit[`${namespace}/${AUTH_LOGIN_SUCCESS}`]
    await nextTick(subjectWrapper)

    const authenticatedLayout = subjectWrapper.find(Authenticated)
    const isAuthenticated = subjectWrapper.vm.$store.getters[getter]

    expect(isAuthenticated).toBe(true)
    expect(authenticatedLayout.exists()).toBe(true)
  })
})

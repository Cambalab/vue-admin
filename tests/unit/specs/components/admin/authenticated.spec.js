import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Authenticated from '@components/Admin/src/Authenticated'
import Factory from '@unit/factory'
import AuthTypes from '@va-auth/types'
import authStore from '@va-auth/store'
import { shallowMount } from '@vue/test-utils'
import { Authenticated as authenticatedFixture } from '@unit/fixtures/admin'

describe('Authenticated.vue', () => {
  const subject = 'Authenticated'

  Vue.config.silent = true
  Vue.use(Vuex)

  // subject
  let subjectWrapper
  // mocks
  let mockedRouter
  let mockedStore
  let mocks
  // spies
  let storeSpy
  // props
  let propsData
  // stubs
  let user

  function mountSubject() {
    subjectWrapper = shallowMount(Authenticated, {
      mocks,
      propsData,
      router: mockedRouter,
      sync: true,
    })
  }

  beforeEach(() => {
    const routes = [{}]
    user = Factory.createUser()
    mockedRouter = new VueRouter(routes)
    mockedStore = new Vuex.Store({
      modules: {
        auth: Object.assign(
          {},
          authStore({ client: () => new Promise(()=> {}) }),
          {
            state: {
              error: '',
              isAuthenticated: true,
              status: 'idle',
              user,
            }
          }
        ),
      }
    })
    mocks = { $store: mockedStore, $router: mockedRouter }
    propsData = {
      layout: authenticatedFixture.props.layout,
      sidebar: authenticatedFixture.props.sidebar,
      title: authenticatedFixture.props.title,
      unauthorized: authenticatedFixture.props.unauthorized,
    }
    storeSpy = {
      dispatch: jest.spyOn(mocks.$store, 'dispatch'),
    }
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should have props', () => {
    mountSubject()

    const props = subjectWrapper.props()

    expect(subjectWrapper.name()).toMatch(subject)
    expect(props.layout).toMatchObject(authenticatedFixture.props.layout)
    expect(props.sidebar).toMatchObject(authenticatedFixture.props.sidebar)
    expect(props.title).toMatch(authenticatedFixture.props.title)
    expect(props.unauthorized).toMatchObject(
      authenticatedFixture.props.unauthorized
    )
  })

  it('[Core] - component is rendered', async () => {
    mountSubject()

    const coreComponent = subjectWrapper.find(authenticatedFixture.args.Core)

    expect(coreComponent.exists()).toBe(true)
  })

  it('when the logout method is called an [AUTH_LOGOUT_REQUEST] action is dispatched', () => {
    mountSubject()

    subjectWrapper.vm.logout()

    const { namespace, AUTH_LOGOUT_REQUEST } = AuthTypes
    const args = `${namespace}/${AUTH_LOGOUT_REQUEST}`

    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(args)
  })

  it('when the getUser method is called an [AUTH_GET_USER] getter is triggered', () => {
    mountSubject()

    const userFromState = subjectWrapper.vm.getUser()

    expect(userFromState).toMatchObject(user)
  })
})

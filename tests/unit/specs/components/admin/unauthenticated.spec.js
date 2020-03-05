import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Unauthenticated from '@components/Admin/src/Unauthenticated'
import Factory from '@unit/factory'
import AuthTypes from '@va-auth/types'
import authStore from '@va-auth/store'
import { shallowMount } from '@vue/test-utils'
import { Unauthenticated as unauthenticatedFixture } from '@unit/fixtures/admin'

describe('Unauthenticated.vue', () => {
  const subject = 'Unauthenticated'

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

  function mountSubject() {
    subjectWrapper = shallowMount(Unauthenticated, {
      mocks,
      propsData,
      router: mockedRouter,
      sync: true,
    })
  }

  beforeEach(() => {
    const routes = [{}]
    mockedRouter = new VueRouter(routes)
    mockedStore = new Vuex.Store({
      modules: {
        auth: authStore({ client: () => new Promise(() => {}) }),
      },
    })
    mocks = { $store: mockedStore, $router: mockedRouter }
    propsData = {
      layout: unauthenticatedFixture.props.layout,
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
    expect(props.layout).toMatchObject(unauthenticatedFixture.props.layout)
  })

  it('[Auth] - component is rendered', async () => {
    mountSubject()

    const {
      props: { layout },
    } = unauthenticatedFixture
    const authComponent = subjectWrapper.find(layout)

    expect(authComponent.exists()).toBe(true)
  })

  it('when the login method is called an [AUTH_LOGIN_REQUEST] action is dispatched', () => {
    mountSubject()

    const { namespace, AUTH_LOGIN_REQUEST } = AuthTypes
    const action = `${namespace}/${AUTH_LOGIN_REQUEST}`
    const { username, password } = Factory.createCredentials()

    subjectWrapper.vm.login(username, password)

    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(action, {
      username,
      password,
    })
  })
})

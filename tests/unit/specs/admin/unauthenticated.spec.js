import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from 'vuex'
import Unauthenticated from '@components/Admin/src/Unauthenticated'
import { shallowMount } from '@vue/test-utils'
import { Unauthenticated as unauthenticatedFixture } from '../../fixtures/admin'

describe('Unauthenticated.vue', () => {
  const subject = 'Unauthenticated'

  Vue.config.silent = true
  Vue.use(Vuex)

  // subject
  let subjectWrapper
  // mocks
  let mockedRouter
  let mockedStore
  let mocks
  // spies
  let routerSpy
  // props
  let propsData

  function mountSubject() {
    subjectWrapper = shallowMount(Unauthenticated, {
      mocks,
      propsData,
      router: mockedRouter,
      sync: true
    })
  }

  beforeEach(() => {
    const routes = [{}]
    mockedRouter = new VueRouter(routes)
    mockedStore = new Vuex.Store({})
    mocks = { $store: mockedStore, $router: mockedRouter }
    propsData = {
      layout: unauthenticatedFixture.props.layout,
    }
    routerSpy = {
      addRoutes: jest.spyOn(mocks.$router, 'addRoutes')
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

  it('[Auth View] - router should call addRoutes on created', () => {
    mountSubject()

    const {
      args: { createUnauthenticatedRoutes },
      props: { layout }
    } = unauthenticatedFixture
    const unauthenticatedRoutes = createUnauthenticatedRoutes(layout)
    expect(routerSpy.addRoutes).toHaveBeenCalledTimes(1)
    expect(routerSpy.addRoutes).toHaveBeenCalledWith(unauthenticatedRoutes)
  })

  it('[Auth] - component is rendered when isAuthenticated returns true', async () => {
    mountSubject()

    const { props: { layout } } = unauthenticatedFixture
    const authComponent = subjectWrapper.find(layout)

    expect(authComponent.exists()).toBe(true)
  })
})

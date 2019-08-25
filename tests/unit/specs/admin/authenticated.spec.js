import Vue from 'vue'
import VueRouter from "vue-router"
import Vuex from 'vuex'
import Authenticated from '@components/Admin/src/Authenticated'
import { shallowMount } from '@vue/test-utils'
import { Authenticated as authenticatedFixture } from '../../fixtures/admin'

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
  let routerSpy
  let storeSpy
  // props
  let propsData

  function mountSubject() {
    subjectWrapper = shallowMount(Authenticated, {
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
      layout: authenticatedFixture.props.layout,
      sidebar: authenticatedFixture.props.sidebar,
      title: authenticatedFixture.props.title,
      unauthorized: authenticatedFixture.props.unauthorized,
    }
    storeSpy = {
      registerModule: jest.spyOn(mocks.$store, 'registerModule'),
      dispatch: jest.spyOn(mocks.$store, 'dispatch')
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
    expect(props.layout).toMatchObject(authenticatedFixture.props.layout)
    expect(props.sidebar).toMatchObject(authenticatedFixture.props.sidebar)
    expect(props.title).toMatch(authenticatedFixture.props.title)
    expect(props.unauthorized).toMatchObject(authenticatedFixture.props.unauthorized)
  })

  it('[Resource Module] - store should call registerModule on beforeCreate', () => {
    mountSubject()
    const { args: { resourceModule } } = authenticatedFixture

    expect(storeSpy.registerModule).toHaveBeenCalledTimes(1)
    expect(storeSpy.registerModule).toHaveBeenCalledWith('resources', resourceModule)
  })

  it('[Unauthorized View] - router should call addRoutes on created', () => {
    mountSubject()

    const { args: { unauthorizedRoutes } } = authenticatedFixture

    expect(routerSpy.addRoutes).toHaveBeenCalledTimes(1)
    expect(routerSpy.addRoutes).toHaveBeenCalledWith(unauthorizedRoutes)
  })

  it('[Core] - component is rendered', async () => {
    mountSubject()

    const coreComponent = subjectWrapper.find(authenticatedFixture.args.Core)

    expect(coreComponent.exists()).toBe(true)
  })
})

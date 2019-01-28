import Factory from '../factory'
import resoureFixture from '../fixtures/resource/magazines'
import Resource from '@/components/Resource'
import VueRouter from "vue-router"
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('Resource.vue', () => {
  const subject = 'Resource'
  const initialResources = [resoureFixture.props.name]
  // Initialises the vue instance and Resource dependencies
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  // Initialises a vuex store
  const dummyStore = Factory.createStoreWith({
    snapshot: subject,
    initialResources
  })

  let mockedStore
  let mockedRouter
  let subjectWrapper
  let mocks
  let propsData
  let routerSpy
  let storeSpy

  beforeEach(() => {
    // Configures a Vue Router instance
    const routes = [{}]
    mockedRouter = new VueRouter(routes)
    // Configures a Vuex Store instance
    mockedStore = new Vuex.Store({ mutations: dummyStore.mutations })
    // Configures mocks for the subject
    mocks = { $store: mockedStore, $router: mockedRouter }
    // Configures the subject props
    propsData = {
      name: resoureFixture.props.name,
      apiUrl: resoureFixture.props.apiUrl,
      create: resoureFixture.props.create,
      edit: resoureFixture.props.edit,
      list: resoureFixture.props.list,
      show: resoureFixture.props.show
    }
    // Configures subject spy methods
    routerSpy = {
      addRoutes: jest.spyOn(mocks.$router, 'addRoutes')
    }
    storeSpy = {
      addRoute: jest.spyOn(mocks.$store, 'commit')
    }
    // Mounts the subject instance
    subjectWrapper = shallowMount(Resource, {
      mocks,
      propsData
    })
  })

  it('should have default props', () => {
    const props = subjectWrapper.props()
    expect(subjectWrapper.name()).toMatch(subject)
    expect(props.resourceIdName).toMatch(resoureFixture.props.resourceIdName)
    expect(props.redirect).toMatchObject(resoureFixture.props.redirect)
    expect(props.parseResponses).toMatchObject(resoureFixture.props.parseResponses)
  })

  it('should have non default props', () => {
    const props = subjectWrapper.props()
    expect(props.name).toMatch(resoureFixture.props.name)
    expect(props.create).toMatchObject(resoureFixture.props.create)
    expect(props.edit).toMatchObject(resoureFixture.props.edit)
    expect(props.list).toMatchObject(resoureFixture.props.list)
    expect(props.show).toMatchObject(resoureFixture.props.show)
    expect(props.apiUrl).toMatch(resoureFixture.props.apiUrl)
  })

  it('should call router addRoutes', () => {
    expect(routerSpy.addRoutes).toHaveBeenCalledTimes(1)
  })

  it('should call store commit', () => {
    const methodName = 'resources/addRoute'
    const { storeMethods } = resoureFixture.methods
    const { params } = storeMethods[methodName]
    expect(storeSpy.addRoute).toHaveBeenCalledTimes(1)
    expect(storeSpy.addRoute).toHaveBeenCalledWith(methodName, params)
  })

  it('should have the store initialised with {initialResources} getters', () => {
    const { getters } = mocks.$store
    const expectedGetters = dummyStore.getters
    const expectedGettersKeys = Object.keys(expectedGetters)
    expectedGettersKeys.forEach(expectedKey => {
      expect(getters).toHaveProperty(expectedKey)
    })
  })
})

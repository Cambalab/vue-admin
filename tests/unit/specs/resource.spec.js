import Factory from '../factory'
import resourceFixture from '../fixtures/resource/magazines'
import Resource from '@components/Resource/src/Resource'
import VueRouter from "vue-router"
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ERROR_MESSAGES from '@constants/error.messages'
import { validateSchema } from '@validators'

describe('Resource.vue', () => {
  const subject = 'Resource'
  const initialResources = [resourceFixture.props.name]
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
      name: resourceFixture.props.name,
      apiUrl: resourceFixture.props.apiUrl,
      create: resourceFixture.props.create,
      edit: resourceFixture.props.edit,
      list: resourceFixture.props.list,
      show: resourceFixture.props.show
    }
    // Configures subject spy methods
    routerSpy = {
      addRoutes: jest.spyOn(mocks.$router, 'addRoutes')
    }
    storeSpy = {
      addRoute: jest.spyOn(mocks.$store, 'commit')
    }
  })

  it('should have default props', () => {
    // Exercise: mounts the subject instance
    mountSubject()
    const props = subjectWrapper.props()
    expect(subjectWrapper.name()).toMatch(subject)
    expect(props.resourceIdName).toMatch(resourceFixture.props.resourceIdName)
    expect(props.redirect).toMatchObject(resourceFixture.props.redirect)
    expect(props.parseResponses).toMatchObject(resourceFixture.props.parseResponses)
  })

  it('should have non default props', () => {
    // Exercise: mounts the subject instance
    mountSubject()
    const props = subjectWrapper.props()
    expect(props.name).toMatch(resourceFixture.props.name)
    expect(props.create).toMatchObject(resourceFixture.props.create)
    expect(props.edit).toMatchObject(resourceFixture.props.edit)
    expect(props.list).toMatchObject(resourceFixture.props.list)
    expect(props.show).toMatchObject(resourceFixture.props.show)
    expect(props.apiUrl).toMatch(resourceFixture.props.apiUrl)
  })

  it('should call router addRoutes', () => {
    // Exercise: mounts the subject instance
    mountSubject()
    expect(routerSpy.addRoutes).toHaveBeenCalledTimes(1)
  })

  it('should call store commit', () => {
    // Exercise: mounts the subject instance
    mountSubject()
    const methodName = 'resources/addRoute'
    const { storeMethods } = resourceFixture.methods
    const { params } = storeMethods[methodName]
    expect(storeSpy.addRoute).toHaveBeenCalledTimes(1)
    expect(storeSpy.addRoute).toHaveBeenCalledWith(methodName, params)
  })

  it('should have the store initialised with {initialResources} getters', () => {
    // Exercise: mounts the subject instance
    mountSubject()
    const { getters } = mocks.$store
    const expectedGetters = dummyStore.getters
    const expectedGettersKeys = Object.keys(expectedGetters)
    expectedGettersKeys.forEach(expectedKey => {
      expect(getters).toHaveProperty(expectedKey)
    })
  })

  it('should throw error when the {name} property is missing', () => {
    const prop = 'name'
    shouldThrowOnMissingProp({ prop, subject })
  })

  it('should throw error when the {apiUrl} property is missing', () => {
    const prop = 'apiUrl'
    shouldThrowOnMissingProp({ prop, subject })
  })

  it('should throw an error when the {list} property is missing', () => {
    const prop = 'list'
    shouldThrowOnMissingProp({ prop, subject })
  })

  it('should throw an error when the {redirect} component is invalid', () => {
    const prop = 'redirect'
    const invalidProp = { invalidKey: { create: 'list', edit: 'show' } }
    const validate = validateSchema
    shouldThrowOnInvalidProp({ prop, subject, invalidProp, validate })
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
    expect(mountSubject).toThrowError(message)
  }

  function shouldThrowOnInvalidProp({ prop, subject, invalidProp, validate }) {
    // Setup: corrupts the redirect prop
    propsData[prop] = invalidProp
    const { error } = validate(prop, invalidProp)
    const { details } = error
    const { INVALID_SCHEMA } = ERROR_MESSAGES
    const at = subject
    const message = INVALID_SCHEMA.with({ prop, at, details })
    expect(error.name).toMatch('ValidationError')
    expect(mountSubject).toThrowError(message)
  }

  // Mounts the component
  function mountSubject() {
    subjectWrapper = shallowMount(Resource, {
      mocks,
      propsData
    })
  }
})

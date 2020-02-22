import Factory from '@unit/factory'
import resourceFixture from '@unit/fixtures/resource/magazines'
import Resource from '@components/Resource/src/Resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import ERROR_MESSAGES from '@constants/error.messages'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { validateSchema } from '@validators'
import { Types as ResourcesTypes } from '@store/modules/resources'
import alertsModule, { Types as AlertTypes } from '@store/modules/alerts'
import UI_CONTENT from '@constants/ui.content.default'

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
    initialResources,
  })

  let mockedStore
  let mockedRouter
  let subjectWrapper
  let mocks
  let propsData
  let routerSpy
  let storeSpy

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

  function shouldCallSubscriptionWith(subscription, color, text) {
    const { namespace: alertsNamespace, ALERTS_SHOW_SNACKBAR } = AlertTypes

    mountSubject()
    const props = subjectWrapper.props()

    props.subscriptions(mockedStore)[subscription]()

    const mutationCommit = `${alertsNamespace}/${ALERTS_SHOW_SNACKBAR}`
    const mutationCommitArgs = { color, text }
    const args = [mutationCommit, mutationCommitArgs]

    expect(storeSpy.commit).toHaveBeenCalledWith(...args)
  }

  // Mounts the component
  function mountSubject() {
    subjectWrapper = shallowMount(Resource, {
      mocks,
      propsData,
    })
  }

  beforeEach(() => {
    // Configures a Vue Router instance
    const routes = [{}]
    mockedRouter = new VueRouter(routes)
    // Configures a Vuex Store instance
    mockedStore = new Vuex.Store({
      modules: {
        alerts: alertsModule,
      },
      mutations: dummyStore.mutations,
    })
    // Configures Router app dependency with the Store as used in the
    // route.bindings module
    mockedRouter['app'] = {}
    mockedRouter.app['$store'] = mockedStore
    // Configures mocks for the subject
    mocks = { $store: mockedStore, $router: mockedRouter }
    // Configures the subject props
    propsData = {
      name: resourceFixture.props.name,
      apiUrl: resourceFixture.props.apiUrl,
      create: resourceFixture.props.create,
      edit: resourceFixture.props.edit,
      list: resourceFixture.props.list,
      show: resourceFixture.props.show,
      subscriptions: resourceFixture.props.subscriptions,
    }
    // Configures subject spy methods
    routerSpy = {
      addRoutes: jest.spyOn(mocks.$router, 'addRoutes'),
    }
    storeSpy = {
      commit: jest.spyOn(mocks.$store, 'commit'),
      registerModule: jest.spyOn(mocks.$store, 'registerModule'),
    }
  })

  it('should have default props', () => {
    // Exercise: mounts the subject instance
    mountSubject()
    const props = subjectWrapper.props()
    expect(subjectWrapper.name()).toMatch(subject)
    expect(props.resourceIdName).toMatch(resourceFixture.props.resourceIdName)
    expect(props.userPermissionsField).toMatch(
      resourceFixture.props.userPermissionsField
    )
    expect(props.redirect).toMatchObject(resourceFixture.props.redirect)
    expect(props.parseResponses).toMatchObject(
      resourceFixture.props.parseResponses
    )
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

  describe('subscriptions prop', () => {
    it('when (onCreateSuccess) is called an [ALERTS_SHOW_SNACKBAR] is triggered', () => {
      shouldCallSubscriptionWith(
        'onCreateSuccess',
        UI_CONTENT.SNACKBAR_SUCCESS_COLOR,
        UI_CONTENT.SNACKBAR_CREATE_ELEMENT_SUCCESS_TEXT
      )
    })

    it('when (onDestroySuccess) is called an [ALERTS_SHOW_SNACKBAR] is triggered', () => {
      shouldCallSubscriptionWith(
        'onDestroySuccess',
        UI_CONTENT.SNACKBAR_SUCCESS_COLOR,
        UI_CONTENT.SNACKBAR_DELETE_ELEMENT_SUCCESS_TEXT
      )
    })

    it('when (onUpdateSuccess) is called an [ALERTS_SHOW_SNACKBAR] is triggered', () => {
      shouldCallSubscriptionWith(
        'onUpdateSuccess',
        UI_CONTENT.SNACKBAR_SUCCESS_COLOR,
        UI_CONTENT.SNACKBAR_UPDATE_ELEMENT_SUCCESS_TEXT
      )
    })

    it('when (onCreateError) is called an [ALERTS_SHOW_SNACKBAR] is triggered', () => {
      shouldCallSubscriptionWith(
        'onCreateError',
        UI_CONTENT.SNACKBAR_ERROR_COLOR,
        UI_CONTENT.SNACKBAR_CREATE_ELEMENT_ERROR_TEXT
      )
    })

    it('when (onDestroyError) is called an [ALERTS_SHOW_SNACKBAR] is triggered', () => {
      shouldCallSubscriptionWith(
        'onDestroyError',
        UI_CONTENT.SNACKBAR_ERROR_COLOR,
        UI_CONTENT.SNACKBAR_DELETE_ELEMENT_ERROR_TEXT
      )
    })

    it('when (onFetchListError) is called an [ALERTS_SHOW_SNACKBAR] is triggered', () => {
      shouldCallSubscriptionWith(
        'onFetchListError',
        UI_CONTENT.SNACKBAR_ERROR_COLOR,
        UI_CONTENT.SNACKBAR_FETCH_LIST_ERROR_TEXT
      )
    })

    it('when (onFetchSingleError) is called an [ALERTS_SHOW_SNACKBAR] is triggered', () => {
      shouldCallSubscriptionWith(
        'onFetchSingleError',
        UI_CONTENT.SNACKBAR_INFO_COLOR,
        UI_CONTENT.SNACKBAR_FETCH_SINGLE_ERROR_TEXT
      )
    })

    it('when (onUpdateError) is called an [ALERTS_SHOW_SNACKBAR] is triggered', () => {
      shouldCallSubscriptionWith(
        'onUpdateError',
        UI_CONTENT.SNACKBAR_ERROR_COLOR,
        UI_CONTENT.SNACKBAR_UPDATE_ELEMENT_ERROR_TEXT
      )
    })
  })

  it('should call registerModule on created', () => {
    mountSubject()
    expect(storeSpy.registerModule).toHaveBeenCalledTimes(1)
  })

  it('should skip registerModule on created when the module exists', async () => {
    mountSubject()
    mountSubject()

    expect(storeSpy.registerModule).toHaveBeenCalledTimes(1)
  })

  it('should call router addRoutes on mounted', () => {
    // Exercise: mounts the subject instance
    mountSubject()
    expect(routerSpy.addRoutes).toHaveBeenCalledTimes(1)
  })

  it('should commit a [RESOURCES_ADD_ROUTE] mutation on mounted', () => {
    // Exercise: mounts the subject instance
    mountSubject()
    const { namespace, RESOURCES_ADD_ROUTE } = ResourcesTypes
    const mutation = `${namespace}/${RESOURCES_ADD_ROUTE}`
    const { storeMethods } = resourceFixture.methods
    const { params } = storeMethods[mutation]
    expect(storeSpy.commit).toHaveBeenCalledTimes(1)
    const addedRouteCallbackExpectation = {
      addedRouteCallback: expect.any(Function),
    }
    expect(storeSpy.commit).toHaveBeenCalledWith(mutation, {
      ...params,
      ...addedRouteCallbackExpectation,
    })
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
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Create from '@components/Actions/Create/Create'
import resourceDefaults from '@components/Resource/src/defaults'
import UI_NAMES from '@constants/ui.element.names'
import UI_CONTENT from '@constants/ui.content.default'
import { Types as CrudTypes } from '@store/modules/crud'
import { Types as EntitiesTypes } from '@store/modules/entities'
import entitiesModule from '@store/modules/entities'
import requestsModule from '@store/modules/requests'
import createUtils from '@store/utils/create.utils'
import Factory from '@unit/factory'
import { createFixture } from '@unit/fixtures/actions'
import { findElemByName } from '@unit/lib/utils/wrapper'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('Show.vue', () => {
  const localVue = createLocalVue()

  localVue.use(VueRouter)
  localVue.use(Vuex)
  Vue.use(Vuetify)
  const vuetify = new Vuetify()

  const view = 'create'
  // subject
  let subjectWrapper
  // mocks
  let mockedRouter
  let mockedState
  let mockedStore
  let mocks
  // spies
  let storeSpy
  // props
  let propsData
  let resourceName

  function mountSubject() {
    subjectWrapper = shallowMount(Create, {
      localVue,
      mocks,
      propsData,
      router: mockedRouter,
      sync: true,
      vuetify,
    })
  }

  function findTitleCard() {
    const titleName = UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
      resourceName: propsData.resourceName,
      view,
    })
    return findElemByName({
      wrapper: subjectWrapper,
      el: 'v-card-title-stub',
      name: titleName,
    })
  }

  function findFieldsContainer() {
    const fieldsContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({
      resourceName,
      view,
    })
    return findElemByName({
      wrapper: subjectWrapper,
      el: 'v-card-text-stub',
      name: fieldsContainerName,
    })
  }

  function findField(field) {
    const fieldName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
      resourceName,
      view,
      field,
    })
    return findElemByName({
      wrapper: findFieldsContainer(),
      el: 'textfield-stub',
      name: fieldName,
    })
  }

  function findSubmitButton() {
    const buttonName = UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({
      resourceName,
      view,
    })
    return findElemByName({
      wrapper: findFieldsContainer(),
      el: 'v-btn-stub',
      name: buttonName,
    })
  }

  beforeEach(() => {
    // mocks
    mockedState = createFixture().state()
    mockedStore = new Vuex.Store({
      modules: {
        entities: entitiesModule,
        requests: requestsModule,
      },
    })
    const { namespace, module } = Factory.createCrudModule({
      state: mockedState,
      store: mockedStore,
    })
    mockedStore.registerModule(namespace, module)
    mockedRouter = new VueRouter({ routes: [] })
    mocks = {
      $store: mockedStore,
      router: mockedRouter,
    }

    // props
    resourceName = 'resource'
    const { parseResponses } = resourceDefaults().props
    const redirectView = 'show'
    const utils = createUtils({
      parseResponses,
      redirectView,
      resourceName,
      resourceIdName: 'id',
      router: mockedRouter,
      store: mockedStore,
    })
    propsData = createFixture().props({ resourceName, utils })

    const routes = [
      {
        path: '/resource/create/',
        name: 'resource/create',
        component: Create,
        props: propsData,
      },
    ]
    mockedRouter.addRoutes(routes)

    // spies
    storeSpy = {
      dispatch: jest.spyOn(mocks.$store, 'dispatch'),
      commit: jest.spyOn(mocks.$store, 'commit'),
    }
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should have props', () => {
    mountSubject()

    const props = subjectWrapper.props()

    expect(props.fields).toMatchObject(propsData.fields)
    expect(props.resourceName).toMatch(propsData.resourceName)
    expect(props.title).toMatch(propsData.title)
    expect(props.va).toMatchObject(propsData.va)
  })

  it('[Store] - should call commit on created', () => {
    mountSubject()

    const { namespace, ENTITIES_CREATE_FORM } = EntitiesTypes
    const mutation = `${namespace}/${ENTITIES_CREATE_FORM}`
    const mutationArgs = { formType: 'createForm', entity: resourceName }

    expect(storeSpy.commit).toHaveBeenCalledTimes(1)
    expect(storeSpy.commit).toHaveBeenCalledWith(mutation, mutationArgs)
  })

  it('should use a default title if no (title) prop was provided', () => {
    delete propsData.title
    mountSubject()

    const titleName = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName })
    const { title: dataTitle } = subjectWrapper.vm.$data.content
    const titleCard = findTitleCard()

    expect(dataTitle).toMatch(titleName)
    expect(titleCard.text()).toMatch(titleName)
  })

  it('should use a given title', () => {
    mountSubject()

    const titleName = propsData.title
    const { title: dataTitle } = subjectWrapper.vm.$data.content
    const titleCard = findTitleCard()

    expect(dataTitle).toMatch(titleName)
    expect(titleCard.text()).toMatch(titleName)
  })

  it('should render fields with empty values', () => {
    mountSubject()

    const { fields } = propsData

    fields.forEach(f => {
      const field = findField(f.label)
      const { value } = field.props()
      expect(field.exists()).toBe(true)
      expect(value).toMatch('')
    })
  })

  it('should commit mutations on storeValue when a text field is updated', () => {
    mountSubject()

    const { fields } = propsData

    // It's necessary to count the mutation triggered during the Create mounted
    // life cycle hook
    const onMountedMutation = 1
    fields.forEach((f, index) => {
      const field = findField(f.label)
      const { entities } = createFixture().state()
      const newValue = entities['1'][f.label]
      field.vm.$emit('change', newValue)

      const { namespace, ENTITIES_UPDATE_FORM } = EntitiesTypes
      const mutation = `${namespace}/${ENTITIES_UPDATE_FORM}`
      const mutationArgs = {
        formType: 'createForm',
        entity: resourceName,
        value: newValue,
        resourceKey: f.label,
      }
      const times = onMountedMutation + (index + 1)

      expect(storeSpy.commit).toHaveBeenCalledTimes(times)
      expect(storeSpy.commit).toHaveBeenNthCalledWith(
        times,
        mutation,
        mutationArgs
      )
    })
  })

  it('should render a submit button', () => {
    mountSubject()

    const submitButton = findSubmitButton()
    const submitButtonText = UI_CONTENT.CREATE_SUBMIT_BUTTON

    expect(submitButton.exists()).toBe(true)
    expect(submitButton.text()).toMatch(submitButtonText)
  })

  it('should dispatch an action when the submit button is clicked', () => {
    mountSubject()

    const submitButton = findSubmitButton()
    const currentEntity =
      subjectWrapper.vm.$store.state.entities['createForm'][resourceName]
    const { VUEX_CRUD_PUT } = CrudTypes
    const action = `${resourceName}/${VUEX_CRUD_PUT}`
    const actionArgs = { data: currentEntity }

    submitButton.vm.$emit('click')

    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(action, actionArgs)
  })
})

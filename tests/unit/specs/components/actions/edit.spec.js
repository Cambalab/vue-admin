import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Edit from '@components/Actions/Edit/Edit'
import resourceDefaults from '@components/Resource/src/defaults'
import UI_NAMES from '@constants/ui.element.names'
import UI_CONTENT from '@constants/ui.content.default'
import { Types as CrudTypes } from '@store/modules/crud'
import { Types as EntitiesTypes } from '@store/modules/entities'
import entitiesModule from '@store/modules/entities'
import requestsModule from '@store/modules/requests'
import editUtils from '@store/utils/edit.utils'
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

  const view = 'edit'
  // subject
  let subjectWrapper
  // mocks
  let mockedRouterPushParams
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
    subjectWrapper = shallowMount(Edit, {
      localVue,
      mocks,
      propsData,
      router: mockedRouter,
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
    const fieldName = UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({
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
    mockedRouterPushParams = { id: 1 }
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
    const utils = editUtils({
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
        path: '/resource/edit/:id',
        name: 'resource/edit',
        component: Edit,
        props: propsData,
      },
    ]
    mockedRouter.addRoutes(routes)
    mockedRouter.push({
      name: 'resource/edit',
      params: { ...mockedRouterPushParams },
    })

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
    expect(props.title).toMatch(propsData.title)
    expect(props.fields).toMatchObject(propsData.fields)
    expect(props.resourceName).toMatch(propsData.resourceName)
    expect(props.va).toMatchObject(propsData.va)
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

  it('[Store] - should call dispatch on created', () => {
    mountSubject()

    const { VUEX_CRUD_FETCH_SINGLE } = CrudTypes
    const actionName = `${propsData.resourceName}/${VUEX_CRUD_FETCH_SINGLE}`
    const { id } = mockedRouterPushParams
    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(actionName, { id })
  })

  it('[Store] should have an initial state', () => {
    mountSubject()

    const { id } = mockedRouterPushParams
    const currentEntity = subjectWrapper.vm.$store.state.resource.entities[id]
    const { fields } = propsData

    fields.forEach(f => {
      const {
        entities: { [id]: entities },
      } = mockedState
      expect(currentEntity[f.label]).toMatch(entities[f.label])
    })
  })

  it('should render fields with an initial state', async () => {
    mountSubject()

    const { id } = mockedRouterPushParams
    const { fields } = propsData

    fields.forEach(f => {
      const field = findField(f.label)
      const {
        entities: { [id]: entities },
      } = mockedState
      expect(field.vm.value).toMatch(entities[f.label])
    })
  })

  it('should commit mutations on fields change', () => {
    mountSubject()

    const { id } = mockedRouterPushParams
    const { fields } = propsData

    const onMountedMutation = 1
    fields.forEach((f, index) => {
      const field = findField(f.label)
      const { entities } = createFixture().state()
      const newValue = entities[id][f.label]
      field.vm.$emit('change', newValue)

      const { namespace, ENTITIES_UPDATE_FORM } = EntitiesTypes
      const mutation = `${namespace}/${ENTITIES_UPDATE_FORM}`
      const mutationArgs = {
        formType: 'editForm',
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
    const submitButtonText = UI_CONTENT.EDIT_SUBMIT_BUTTON

    expect(submitButton.exists()).toBe(true)
    expect(submitButton.text()).toMatch(submitButtonText)
  })

  it('should dispatch an action when the submit button is clicked', () => {
    mountSubject()

    const { id } = mockedRouterPushParams
    const submitButton = findSubmitButton()
    const currentEntity =
      subjectWrapper.vm.$store.state.entities['editForm'][resourceName]
    const { VUEX_CRUD_UPDATE } = CrudTypes
    const action = `${resourceName}/${VUEX_CRUD_UPDATE}`
    const actionArgs = { data: currentEntity, id }

    submitButton.vm.$emit('click')

    expect(storeSpy.dispatch).toHaveBeenCalledTimes(2)
    expect(storeSpy.dispatch).toHaveBeenNthCalledWith(2, action, actionArgs)
  })
})

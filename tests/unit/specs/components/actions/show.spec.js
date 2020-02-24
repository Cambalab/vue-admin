import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Show from '@components/Actions/Show/Show'
import UI_NAMES from '@constants/ui.element.names'
import UI_CONTENT from '@constants/ui.content.default'
import { Types as CrudTypes } from '@store/modules/crud'
import requestsModule from '@store/modules/requests'
import showUtils from '@store/utils/show.utils'
import Factory from '@unit/factory'
import { showFixture } from '@unit/fixtures/actions'
import { findElemByName } from '@unit/lib/utils/wrapper'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('Show.vue', () => {
  const localVue = createLocalVue()

  localVue.use(VueRouter)
  localVue.use(Vuex)
  Vue.use(Vuetify)
  const vuetify = new Vuetify()

  const view = 'show'
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
    subjectWrapper = shallowMount(Show, {
      localVue,
      mocks,
      propsData,
      router: mockedRouter,
      sync: true,
      vuetify,
    })
  }

  function findActionsContainer() {
    const actionsContainerName = UI_NAMES.RESOURCE_VIEW_ACTIONS_CONTAINER.with({
      resourceName,
      view,
    })
    return findElemByName({
      wrapper: subjectWrapper,
      el: 'v-toolbar-stub',
      name: actionsContainerName,
    })
  }

  function findTitleCard() {
    const titleName = UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
      resourceName: propsData.resourceName,
      view,
    })
    return findElemByName({
      wrapper: findActionsContainer(),
      el: 'v-card-title-stub',
      name: titleName,
    })
  }

  function findDeleteButton() {
    const deleteButtonName = UI_NAMES.RESOURCE_VIEW_ACTIONS_DELETE_BUTTON.with({
      resourceName,
      view,
    })
    return findElemByName({
      wrapper: findActionsContainer(),
      el: 'deletebutton-stub',
      name: deleteButtonName,
    })
  }

  function findEditButton() {
    const editButtonName = UI_NAMES.RESOURCE_VIEW_ACTIONS_EDIT_BUTTON.with({
      resourceName,
      view,
    })
    return findElemByName({
      wrapper: findActionsContainer(),
      el: 'editbutton-stub',
      name: editButtonName,
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
      el: 'simpletext-stub',
      name: fieldName,
    })
  }

  beforeEach(() => {
    // mocks
    mockedRouterPushParams = { id: 1 }
    mockedState = showFixture().state()
    mockedStore = new Vuex.Store({
      modules: {
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
    const utils = showUtils({
      resourceName,
      router: mockedRouter,
      store: mockedStore,
    })
    propsData = showFixture().props({ resourceName, utils })

    const routes = [
      {
        path: '/resource/show/:id',
        name: 'resource/show',
        component: Show,
        props: propsData,
      },
    ]
    mockedRouter.addRoutes(routes)
    mockedRouter.push({
      name: 'resource/show',
      params: { ...mockedRouterPushParams },
    })

    // spies
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
    expect(props.title).toMatch(propsData.title)
    expect(props.fields).toMatchObject(propsData.fields)
    expect(props.resourceName).toMatch(propsData.resourceName)
    expect(props.va).toMatchObject(propsData.va)
  })

  it('[Store] - should call dispatch on created', () => {
    mountSubject()

    const { VUEX_CRUD_FETCH_SINGLE } = CrudTypes
    const actionName = `${propsData.resourceName}/${VUEX_CRUD_FETCH_SINGLE}`
    const { id } = mockedRouterPushParams
    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(actionName, { id })
  })

  it('should receive computed (resourceShow) property', () => {
    mountSubject()

    const { VUEX_CRUD_GET_RESOURCE_BY_ID } = CrudTypes
    const getter = `${propsData.resourceName}/${VUEX_CRUD_GET_RESOURCE_BY_ID}`
    const { id } = mockedRouterPushParams
    const entityState = subjectWrapper.vm.$store.getters[getter](id)

    expect(subjectWrapper.vm.resourceShow).toMatchObject(entityState)
  })

  it('should use a default title', () => {
    delete propsData.title
    mountSubject()

    const titleName = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName })
    const { title: dataTitle } = subjectWrapper.vm.$data.content
    const titleCard = findTitleCard()

    expect(dataTitle).toMatch(titleName)
    expect(titleCard.text()).toMatch(titleName)
  })

  it('should contain an actions toolbar', () => {
    mountSubject()

    const actionsContainer = findActionsContainer()

    expect(actionsContainer.exists()).toBe(true)
  })

  it('should render an actions toolbar with a title', () => {
    mountSubject()

    const titleCard = findTitleCard()
    expect(titleCard.text()).toMatch(propsData.title)
  })

  it('should render an actions toolbar with an edit button', () => {
    mountSubject()

    const editButton = findEditButton()

    expect(editButton.exists()).toBe(true)
  })

  it('should render an actions toolbar with a delete button', () => {
    mountSubject()

    const deleteButton = findDeleteButton()

    expect(deleteButton.exists()).toBe(true)
  })

  it('should render fields', () => {
    mountSubject()

    const { fields } = propsData
    const state = mockedState.entities[mockedRouterPushParams.id]

    fields.forEach(f => {
      const field = findField(f.label)
      const { type, value } = field.props()
      expect(field.exists()).toBe(true)
      expect(type).toMatch(f.type)
      expect(value).toMatch(state[f.label])
    })
  })
})

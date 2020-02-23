import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Show from '@components/Actions/Show/Show'
import UI_NAMES from '@constants/ui.element.names'
// import UI_CONTENT from '@constants/ui.content.default'
import { Types as CrudTypes } from '@store/modules/crud'
import requestsModule from '@store/modules/requests'
import showUtils from '@store/utils/show.utils'
import Factory from '@unit/factory'
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
  let mockedStore
  let mocks
  // stubs
  // let stubs
  // spies
  // let routerSpy
  let storeSpy
  // props
  let propsData

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

  beforeEach(() => {
    // mocks
    mockedStore = new Vuex.Store({
      modules: {
        requests: requestsModule,
      },
    })
    const { namespace, module } = Factory.createCrudModule({
      state: {
        entities: {
          '1': {
            resourceName: 'the name of a resource',
            fields: 'children nodes used in the Show component',
            va: 'an object containing methods',
          },
        },
      },
      store: mockedStore,
    })
    mockedStore.registerModule(namespace, module)
    mockedRouter = new VueRouter({ routes: [] })
    mocks = {
      $store: mockedStore,
      router: mockedRouter,
    }

    // props
    const resourceName = 'resource'
    const utils = showUtils({
      resourceName,
      router: mockedRouter,
      store: mockedStore,
    })
    propsData = {
      fields: [
        {
          placeHolder: 'a resource name',
          label: 'resourceName',
          type: 'h2',
          tag: 'SimpleText',
        },
        {
          placeHolder: 'a fields array',
          label: 'fields',
          type: 'h3',
          tag: 'SimpleText',
        },
        {
          placeHolder: 'a va object',
          label: 'va',
          type: 'p',
          tag: 'SimpleText',
        },
      ],
      resourceName,
      title: 'My Resource',
      va: {
        ...utils,
      },
    }

    const routes = [
      {
        path: '/resource/show/:id',
        name: 'resource/show',
        component: Show,
        props: propsData,
      },
    ]
    mockedRouter.addRoutes(routes)
    mockedRouterPushParams = { id: 1 }
    mockedRouter.push({
      name: 'resource/show',
      params: { ...mockedRouterPushParams },
    })

    // spies
    // routerSpy = {
    //   addRoutes: jest.spyOn(mocks.router, 'addRoutes'),
    // }
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

  it('should contain an actions toolbar', () => {
    mountSubject()

    const actionsContainerName = UI_NAMES.RESOURCE_VIEW_ACTIONS_CONTAINER.with({
      resourceName: propsData.resourceName,
      view,
    })
    const actionsContainer = findElemByName({
      wrapper: subjectWrapper,
      el: 'v-toolbar-stub',
      name: actionsContainerName,
    })

    expect(actionsContainer.exists()).toBe(true)
  })

  it('should render an actions toolbar with a title', () => {
    mountSubject()

    const actionsContainerName = UI_NAMES.RESOURCE_VIEW_ACTIONS_CONTAINER.with({
      resourceName: propsData.resourceName,
      view,
    })
    const actionsContainer = findElemByName({
      wrapper: subjectWrapper,
      el: 'v-toolbar-stub',
      name: actionsContainerName,
    })
    const titleName = UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
      resourceName: propsData.resourceName,
      view,
    })
    // const title = findRef({ wrapper: subjectWrapper, ref: titleName})
    const titleCard = findElemByName({
      wrapper: actionsContainer,
      el: 'v-card-title-stub',
      name: titleName,
    })
    expect(titleCard.text()).toMatch(propsData.title)
  })
})

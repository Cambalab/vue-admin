import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import List from '@components/Actions/List/List'
import { Types as CrudTypes } from '@store/modules/crud'
import requestsModule from '@store/modules/requests'
import listUtils from '@store/utils/list.utils'
import Factory from '@unit/factory'
import { listFixture } from '@unit/fixtures/actions'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('List.vue', () => {
  const localVue = createLocalVue()

  localVue.use(VueRouter)
  localVue.use(Vuex)
  Vue.use(Vuetify)
  const vuetify = new Vuetify()

  const view = 'list'
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
    subjectWrapper = shallowMount(List, {
      localVue,
      mocks,
      propsData,
      router: mockedRouter,
      vuetify,
    })
  }

  beforeEach(() => {
    // mocks
    mockedRouterPushParams = { id: 1 }
    mockedState = listFixture().state()
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
    const utils = listUtils({
      resourceName,
      store: mockedStore,
    })
    propsData = listFixture().props({ resourceName, utils })

    const routes = [
      {
        path: `/${resourceName}/${view}/`,
        name: `${resourceName}/${view}`,
        component: List,
        props: propsData,
      },
      {
        path: `/${resourceName}/create/`,
        name: `${resourceName}/create`,
        component: {
          name: 'Create',
          render: h => h('div'),
        },
      },
      {
        path: `/${resourceName}/show/:id`,
        name: `${resourceName}/show`,
        component: {
          name: 'Show',
          render: h => h('div'),
        },
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
    expect(props.resourceName).toMatch(propsData.resourceName)
    expect(props.hasShow).toBe(propsData.hasShow)
    expect(props.hasCreate).toBe(propsData.hasCreate)
    expect(props.hasEdit).toBe(propsData.hasEdit)
    expect(props.fields).toMatchObject(propsData.fields)
    expect(props.resourceIdName).toMatch(propsData.resourceIdName)
    expect(props.title).toMatch(propsData.title)
    expect(props.va).toMatchObject(propsData.va)
  })

  it('should use a default title if no (title) prop was provided', () => {
    delete propsData.title
    mountSubject()

    subjectWrapper.vm.$nextTick()

    const titleName = resourceName
    const dataTitle = subjectWrapper.vm.$data.toolbarTitle

    expect(dataTitle).toMatch(titleName)
  })

  it('should use a given (title)', () => {
    mountSubject()

    subjectWrapper.vm.$nextTick()

    const titleName = propsData.title
    const dataTitle = subjectWrapper.vm.$data.toolbarTitle

    expect(dataTitle).toMatch(titleName)
  })

  it('[Store] - should call dispatch on created', () => {
    mountSubject()

    const { VUEX_CRUD_FETCH_LIST } = CrudTypes
    const actionName = `${propsData.resourceName}/${VUEX_CRUD_FETCH_LIST}`

    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(actionName)
  })

  it('should redirect to a create view when the create action button is clicked', () => {
    mountSubject()

    const routerSpy = {
      push: jest.spyOn(subjectWrapper.vm.$router, 'push'),
    }
    const routerArgs = {
      name: `${resourceName}/create`,
      params: {},
      path: `/${resourceName}/create`,
    }

    // FIXME: This should be replaced by triggering a click event from the
    // create button, when Vuetify2's table supports the Vue Wrapper - @sgobotta
    subjectWrapper.vm.onCreateClick()

    expect(routerSpy.push).toHaveBeenCalledTimes(1)
    expect(routerSpy.push).toHaveBeenCalledWith(routerArgs)
  })

  it('should redirect to a show view when a table row is clicked', () => {
    mountSubject()

    const { id } = mockedRouterPushParams
    const routerSpy = {
      push: jest.spyOn(subjectWrapper.vm.$router, 'push'),
    }
    const routerArgs = {
      name: `${resourceName}/show`,
      params: { id },
      path: `/${resourceName}/show/${id}`,
    }

    // FIXME: This should be replaced by triggering a click event from a
    // selected row, when Vuetify2's table supports the Vue Wrapper - @sgobotta
    subjectWrapper.vm.onRowClicked(id)

    expect(routerSpy.push).toHaveBeenCalledTimes(1)
    expect(routerSpy.push).toHaveBeenCalledWith(routerArgs)
  })

  it('should not redirect to a show view when a table row is clicked', () => {
    propsData.hasShow = false
    mountSubject()

    const routerSpy = {
      push: jest.spyOn(subjectWrapper.vm.$router, 'push'),
    }

    // FIXME: This should be replaced by triggering a click event from a
    // selected row, when Vuetify2's table supports the Vue Wrapper - @sgobotta
    subjectWrapper.vm.onRowClicked()

    expect(routerSpy.push).toHaveBeenCalledTimes(0)
  })
})

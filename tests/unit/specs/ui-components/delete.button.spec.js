import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { DeleteButton } from '@components/UiComponents'
import { defaults } from '@components/UiComponents/DeleteButton/DeleteButton'
import { Types as CrudTypes } from '@store/modules/crud'
import Factory from '@unit/factory'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('DeleteButton.vue', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  Vue.use(Vuetify)
  const vuetify = new Vuetify()

  let defaultProps
  let mockedRouter
  let mockedStore
  let mocks
  let propsData
  let resourceId
  let resourceIdName
  let resourceName
  let storeSpy
  let subjectWrapper

  function mountSubject() {
    subjectWrapper = shallowMount(DeleteButton, {
      localVue,
      mocks,
      propsData,
      router: mockedRouter,
      vuetify,
    })
  }

  beforeEach(() => {
    DeleteButton.install(Vue)

    defaultProps = defaults().props
    resourceIdName = 'id'
    resourceId = '1'
    resourceName = 'myResource'

    propsData = {
      name: 'a-custom-name',
      resourceId,
      resourceIdName,
      resourceName,
      vBtnProps: {
        small: true,
      },
      vIconProps: {
        small: true,
      },
    }
    const routes = [
      {
        path: `/${resourceName}/`,
        name: `${resourceName}`,
        component: {
          name: 'ListView',
          render: h => h('div'),
        },
        props: propsData,
      },
    ]
    mockedRouter = new VueRouter({ routes })
    mockedStore = new Vuex.Store({})
    const { namespace, module } = Factory.createCrudModule({
      resourceName,
      store: mockedStore,
    })
    mockedStore.registerModule(namespace, module)
    mocks = {
      $store: mockedStore,
      router: mockedRouter,
    }
    storeSpy = {
      dispatch: jest.spyOn(mocks.$store, 'dispatch'),
    }
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should have props', () => {
    mountSubject()

    const {
      name,
      resourceId,
      resourceIdName,
      resourceName,
      vBtnProps,
      vIconProps,
    } = propsData
    const props = subjectWrapper.props()

    expect(props.name).toMatch(name)
    expect(props.resourceId).toMatch(resourceId)
    expect(props.resourceIdName).toMatch(resourceIdName)
    expect(props.resourceName).toMatch(resourceName)
    expect(props.vBtnProps).toMatchObject(vBtnProps)
    expect(props.vIconProps).toMatchObject(vIconProps)
  })

  it('should have default props', () => {
    delete propsData.name
    delete propsData.resourceIdName
    delete propsData.vBtnProps
    delete propsData.vIconProps
    mountSubject()

    const { resourceId, resourceName } = propsData
    const { name, resourceIdName, vBtnProps, vIconProps } = defaultProps
    const props = subjectWrapper.props()

    // Given props were received
    expect(props.resourceId).toMatch(resourceId)
    expect(props.resourceName).toMatch(resourceName)
    // Default props exists
    expect(props.name).toMatch(name)
    expect(props.resourceIdName).toMatch(resourceIdName)
    expect(props.vBtnProps).toMatchObject(vBtnProps)
    expect(props.vIconProps).toMatchObject(vIconProps)
  })

  it('when onEdit is called an action is dispatched', () => {
    mountSubject()

    const routerSpy = {
      push: jest.spyOn(subjectWrapper.vm.$router, 'push'),
    }

    subjectWrapper.vm.onDelete()
    const { VUEX_CRUD_DELETE } = CrudTypes
    const actionName = `${resourceName}/${VUEX_CRUD_DELETE}`

    const routerArgs = {
      path: `/${resourceName}`,
    }

    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(actionName, {
      [resourceIdName]: resourceId,
    })
    expect(routerSpy.push).toHaveBeenCalledTimes(1)
    expect(routerSpy.push).toHaveBeenCalledWith(routerArgs)
  })
})

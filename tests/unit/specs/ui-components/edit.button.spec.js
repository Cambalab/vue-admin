import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { EditButton } from '@components/UiComponents'
import { defaults } from '@components/UiComponents/EditButton/EditButton'
import Factory from '@unit/factory'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('EditButton.vue', () => {
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
  let subjectWrapper
  let view = 'edit'

  function mountSubject() {
    subjectWrapper = shallowMount(EditButton, {
      localVue,
      mocks,
      propsData,
      router: mockedRouter,
      vuetify,
    })
  }

  beforeEach(() => {
    EditButton.install(Vue)

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
        path: `/${resourceName}/${view}/`,
        name: `${resourceName}/${view}`,
        component: {
          name: 'EditView',
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

  it('when onEdit is called a router action is triggered', () => {
    mountSubject()

    const routerSpy = {
      push: jest.spyOn(subjectWrapper.vm.$router, 'push'),
    }

    subjectWrapper.vm.onEdit()
    const routerArgs = {
      name: `${resourceName}/${view}`,
      params: { [resourceIdName]: resourceId },
      path: `/${resourceName}/${view}`,
    }

    expect(routerSpy.push).toHaveBeenCalledTimes(1)
    expect(routerSpy.push).toHaveBeenCalledWith(routerArgs)
  })
})

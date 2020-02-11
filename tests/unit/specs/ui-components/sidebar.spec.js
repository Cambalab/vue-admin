import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import createAuthModule from '@va-auth/store'
import resourcesModule, {
  Types as ResourcesTypes,
} from '@store/modules/resources'
import defaults from '@components/UiComponents/Sidebar/defaults'
import DefaultSidebar from '@components/UiComponents/Sidebar/DefaultSidebar'
import {
  Sidebar,
  SidebarNode,
  SidebarLink,
  SidebarAction,
} from '@components/UiComponents/Sidebar'
import Factory from '@unit/factory'
import AuthTypes from '@va-auth/types'
import { nextTick } from '@unit/lib/utils/wrapper'
import { mount } from '@vue/test-utils'

describe('Sidebar', () => {

  Vue.use(Vuetify)
  Vue.use(Vuex)
  Vue.config.silent = true

  let subjectWrapper
  // stubs
  let vuetify
  // mocks
  let mocks
  let mockedStore
  // spies
  let storeSpy

  // Mounts the component
  function mountSubject() {
    const { namespace: authNamespace, AUTH_LOGOUT_REQUEST } = AuthTypes
    const actionName = `${authNamespace}/${AUTH_LOGOUT_REQUEST}`

    subjectWrapper = mount(DefaultSidebar, {
      mocks,
      propsData: {
        va: {
          logout: () => mockedStore.dispatch(actionName)
        }
      },
      vuetify,
    })
  }

  beforeEach(() => {
    // Configures the subject props
    vuetify = new Vuetify()
    const authProvider = Factory.createAuthProvider()
    mockedStore = new Vuex.Store({
      modules: {
        auth: createAuthModule({ client: authProvider }),
        resources: resourcesModule,
      }
    })
    mocks = {
      $store: mockedStore,
    }
    storeSpy = {
      dispatch: jest.spyOn(mocks.$store, 'dispatch'),
      subscribe: jest.spyOn(mocks.$store, 'subscribe'),
    }
  })

  it('should render the Sidebar children', async () => {
    mountSubject()

    const sidebarLayout = subjectWrapper.find(Sidebar)
    const sidebarNodeLayout = sidebarLayout.find(SidebarNode)
    const sidebarActionLayout = sidebarLayout.find(SidebarAction)

    await nextTick(subjectWrapper)

    expect(sidebarLayout.exists()).toBe(true)
    expect(sidebarNodeLayout.exists()).toBe(true)
    expect(sidebarActionLayout.exists()).toBe(true)
  })

  it('should render SidebarLink when children are present in menuItems', () => {
    mountSubject()

    const menuItemsWithChildren = defaults().data.menuItems
    menuItemsWithChildren[0].children.push({
      icon: 'list',
      title: 'magazines',
      link: '/magazines'
    })

    subjectWrapper.setData({
      menuItems: [
        ...menuItemsWithChildren,
        {
          click: () => {},
          icon: 'power_settings_new',
          title: 'Sign Out',
        },
      ],
    })

    const sidebarLayout = subjectWrapper.find(Sidebar)
    const sidebarNodeLayout = sidebarLayout.find(SidebarNode)
    const sidebarLinkLayout = sidebarNodeLayout.find(SidebarLink)
    const sidebarActionLayout = sidebarLayout.find(SidebarAction)

    expect(sidebarLayout.exists()).toBe(true)
    expect(sidebarNodeLayout.exists()).toBe(true)
    expect(sidebarLinkLayout.exists()).toBe(true)
    expect(sidebarActionLayout.exists()).toBe(true)
  })

  it('when the click property on the logout menuItem is clicked an [AUTH_LOGOUT_REQUEST] action is dispatched', async () => {
    mountSubject()

    const sidebarLayout = subjectWrapper.find(Sidebar)
    const sidebarActionLayout = sidebarLayout.find(SidebarAction)

    const logoutAction = subjectWrapper.vm.menuItems[1]
    logoutAction.click()

    await nextTick(subjectWrapper)

    const { namespace, AUTH_LOGOUT_REQUEST } = AuthTypes
    const actionName = `${namespace}/${AUTH_LOGOUT_REQUEST}`

    expect(sidebarLayout.exists()).toBe(true)
    expect(sidebarActionLayout.exists()).toBe(true)
    expect(storeSpy.dispatch).toHaveBeenCalledTimes(1)
    expect(storeSpy.dispatch).toHaveBeenCalledWith(actionName)
  })

  it('no item is added to [menuItems] in Sidebar when [RESOURCES_ADD_ROUTE] is not called', () => {
    mountSubject()

    expect(subjectWrapper.vm.menuItems[0].children).toHaveLength(0)
    expect(storeSpy.subscribe).toHaveBeenCalledTimes(1)
  })

  it('whenever a [RESOURCE_ADD_ROUTE] mutation is triggered an item is added to [menuItems] in Sidebar', () => {
    mountSubject()

    const { namespace, RESOURCES_ADD_ROUTE } = ResourcesTypes
    const mutationName = `${namespace}/${RESOURCES_ADD_ROUTE}`

    mockedStore.commit(mutationName, {
      path: '/magazines',
      name: 'magazines',
      addedRouteCallback: () => {}
    })

    expect(subjectWrapper.vm.menuItems[0].children).toHaveLength(1)
    expect(storeSpy.subscribe).toHaveBeenCalledTimes(1)
  })
})

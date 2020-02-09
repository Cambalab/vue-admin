import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import DefaultSidebar from '@components/UiComponents/Sidebar/DefaultSidebar'
import {
  Sidebar,
  SidebarNode,
  SidebarLink,
  SidebarAction,
} from '@components/UiComponents/Sidebar'
import { nextTick } from '@unit/lib/utils/wrapper'
import { mount, shallowMount } from '@vue/test-utils'

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

  // Mounts the component
  function mountSubject() {
    subjectWrapper = mount(DefaultSidebar, {
      mocks,
      propsData: {
        va: {
          logout: () => {}
        }
      },
      vuetify,
    })
  }

  beforeEach(() => {
    // Configures the subject props
    vuetify = new Vuetify()
    mockedStore = new Vuex.Store({})
    mocks = { $store: mockedStore }
  })

  it('should render the Sidebar children', async () => {
    mountSubject()

    subjectWrapper.setData({
      menuItems: [
        {
          click: () => {},
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          title: 'Resources',
          children: [
            { icon: 'list', title: 'magazines', link: '/magazines' }
          ],
          model: {},
          value: true,
        },
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

    await nextTick(subjectWrapper)

    // console.log(sidebarLinkLayout)

    expect(sidebarLayout.exists()).toBe(true)
    expect(sidebarNodeLayout.exists()).toBe(true)
    expect(sidebarLinkLayout.exists()).toBe(true)
    expect(sidebarActionLayout.exists()).toBe(true)
  })
})
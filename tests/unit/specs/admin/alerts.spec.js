import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Alerts from '@components/Admin/src/Alerts'
import { shallowMount } from '@vue/test-utils'

describe('Alerts.vue', () => {
  Vue.config.silent = true
  Vue.use(Vuex)

  // mocks
  let mockedRouter
  let mockedStore
  let mocks
  // spies
  let storeSpy
  // props
  let propsData

  function mountSubject() {
    shallowMount(Alerts, {
      mocks,
      propsData,
      router: mockedRouter,
      sync: true,
    })
  }

  beforeEach(() => {
    const routes = [{}]
    mockedRouter = new VueRouter(routes)
    mockedStore = new Vuex.Store({})
    mocks = { $store: mockedStore, $router: mockedRouter }
    storeSpy = {
      subscribe: jest.spyOn(mocks.$store, 'subscribe'),
    }
  })

  it('[Alerts Module] - store should call subscribe on beforeCreate', () => {
    mountSubject()

    expect(storeSpy.subscribe).toHaveBeenCalledTimes(1)
  })
})

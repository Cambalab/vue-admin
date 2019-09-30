import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Authenticated from '@components/Admin/src/Authenticated'
import { shallowMount } from '@vue/test-utils'
import { Authenticated as authenticatedFixture } from '../../fixtures/admin'

describe('Authenticated.vue', () => {
  const subject = 'Authenticated'

  Vue.config.silent = true
  Vue.use(Vuex)

  // subject
  let subjectWrapper
  // mocks
  let mockedRouter
  let mockedStore
  let mocks
  // props
  let propsData

  function mountSubject() {
    subjectWrapper = shallowMount(Authenticated, {
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
    propsData = {
      layout: authenticatedFixture.props.layout,
      sidebar: authenticatedFixture.props.sidebar,
      title: authenticatedFixture.props.title,
      unauthorized: authenticatedFixture.props.unauthorized,
    }
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should have props', () => {
    mountSubject()

    const props = subjectWrapper.props()

    expect(subjectWrapper.name()).toMatch(subject)
    expect(props.layout).toMatchObject(authenticatedFixture.props.layout)
    expect(props.sidebar).toMatchObject(authenticatedFixture.props.sidebar)
    expect(props.title).toMatch(authenticatedFixture.props.title)
    expect(props.unauthorized).toMatchObject(
      authenticatedFixture.props.unauthorized
    )
  })

  it('[Core] - component is rendered', async () => {
    mountSubject()

    const coreComponent = subjectWrapper.find(authenticatedFixture.args.Core)

    expect(coreComponent.exists()).toBe(true)
  })
})

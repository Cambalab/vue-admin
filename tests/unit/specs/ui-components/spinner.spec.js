import Vue from 'vue'
import Vuetify from 'vuetify'
import { Spinner } from '@components/UiComponents'
import { defaults } from '@components/UiComponents/Spinner/Spinner'
import { findElemByName } from '@unit/lib/utils/wrapper'
import { shallowMount } from '@vue/test-utils'

describe('Spinner.vue', () => {
  Vue.use(Vuetify)
  const vuetify = new Vuetify()

  let defaultProps
  let propsData
  let subjectWrapper

  function mountSubject() {
    subjectWrapper = shallowMount(Spinner, {
      propsData,
      vuetify,
    })
  }

  function findSpinnerContainer({ name }) {
    return findElemByName({
      wrapper: subjectWrapper,
      el: 'v-container-stub',
      name: name,
      prop: 'id',
    })
  }

  beforeEach(() => {
    Spinner.install(Vue)
    defaultProps = defaults().props

    propsData = {
      isLoading: true,
      name: 'a-custom-name',
      vProps: {
        color: 'warning',
        indeterminate: true,
      },
    }
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should have props', () => {
    mountSubject()

    const { isLoading, name, vProps } = propsData
    const props = subjectWrapper.props()

    expect(props.isLoading).toBe(isLoading)
    expect(props.name).toMatch(name)
    expect(props.vProps).toMatchObject(vProps)
  })

  it('should have default props', () => {
    delete propsData.isLoading
    delete propsData.name
    delete propsData.vProps
    mountSubject()

    const { isLoading, name, vProps } = defaultProps
    const props = subjectWrapper.props()

    expect(props.isLoading).toBe(isLoading)
    expect(props.name).toMatch(name)
    expect(props.vProps).toMatchObject(vProps)
  })

  it('should exists when isLoading is true', () => {
    mountSubject()
    subjectWrapper.setProps({ isLoading: true })

    const container = findSpinnerContainer({ name: propsData.name })

    expect(container.exists()).toBe(true)
  })

  it('should not exist when isLoading is false', () => {
    mountSubject()
    subjectWrapper.setProps({ isLoading: false })

    const container = findSpinnerContainer({ name: defaultProps.name })

    expect(container.exists()).toBe(false)
  })
})

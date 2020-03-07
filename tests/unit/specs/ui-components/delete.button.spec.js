import Vue from 'vue'
import Vuetify from 'vuetify'
import { DeleteButton } from '@components/UiComponents'
import { defaults } from '@components/UiComponents/DeleteButton/DeleteButton'
// import { findElemByName } from '@unit/lib/utils/wrapper'
import { shallowMount } from '@vue/test-utils'

describe('DeleteButton.vue', () => {
  Vue.use(Vuetify)
  const vuetify = new Vuetify()

  let defaultProps
  let propsData
  let subjectWrapper

  function mountSubject() {
    subjectWrapper = shallowMount(DeleteButton, {
      propsData,
      vuetify,
    })
  }

  // function findDeleteButton({ name }) {
  //   return findElemByName({
  //     wrapper: subjectWrapper,
  //     el: 'v-container-stub',
  //     name: name,
  //   })
  // }

  beforeEach(() => {
    DeleteButton.install(Vue)
    defaultProps = defaults().props

    propsData = {
      name: 'a-custom-name',
      resourceId: '1',
      resourceName: 'myResource',
      vBtnProps: {
        small: true,
      },
      vIconProps: {
        small: true,
      },
    }
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should have props', () => {
    mountSubject()

    const { name, resourceId, resourceName, vBtnProps, vIconProps } = propsData
    const props = subjectWrapper.props()

    expect(props.name).toMatch(name)
    expect(props.resourceId).toMatch(resourceId)
    expect(props.resourceName).toMatch(resourceName)
    expect(props.vBtnProps).toMatchObject(vBtnProps)
    expect(props.vIconProps).toMatchObject(vIconProps)
  })

  it('should have default props', () => {
    delete propsData.name
    delete propsData.vBtnProps
    delete propsData.vIconProps
    mountSubject()

    const { resourceId, resourceName } = propsData
    const { name, vBtnProps, vIconProps } = defaultProps
    const props = subjectWrapper.props()

    // Given props were received
    expect(props.resourceId).toMatch(resourceId)
    expect(props.resourceName).toMatch(resourceName)
    // Default props exists
    expect(props.name).toMatch(name)
    expect(props.vBtnProps).toMatchObject(vBtnProps)
    expect(props.vIconProps).toMatchObject(vIconProps)
  })
})

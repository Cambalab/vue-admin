import Vue from 'vue'
import Vuetify from 'vuetify'
import { TextField } from '@components/UiComponents'
import { defaults } from '@components/UiComponents/TextField/src/TextField'
import { findElemByName } from '@unit/lib/utils/wrapper'
import { shallowMount } from '@vue/test-utils'

describe('TextField.vue', () => {
  Vue.use(Vuetify)
  const vuetify = new Vuetify()

  let defaultProps
  let propsData
  let subjectWrapper

  function mountSubject() {
    subjectWrapper = shallowMount(TextField, {
      propsData,
      vuetify,
    })
  }

  beforeEach(() => {
    TextField.install(Vue)
    defaultProps = defaults().props

    propsData = {
      name: 'my-text-field-name',
      placeHolder: 'write your content here',
      value: 'Im an empty content',
    }
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should have props', () => {
    mountSubject()

    const props = subjectWrapper.props()

    expect(props.name).toMatch(propsData.name)
    expect(props.placeHolder).toMatch(propsData.placeHolder)
    expect(props.value).toMatch(propsData.value)
  })

  it('should use default props when none were provided', () => {
    delete propsData.name
    delete propsData.placeHolder
    delete propsData.value
    mountSubject()

    // Asserts to the post-mounting generated props by default
    const { name, placeHolder, value } = defaultProps

    expect(subjectWrapper.vm._props.name).toMatch(name)
    expect(subjectWrapper.vm._props.placeHolder).toMatch(placeHolder)
    expect(subjectWrapper.vm._props.value).toMatch(value)
  })

  it('should render a parsed content', () => {
    mountSubject()

    const textField = findElemByName({
      wrapper: subjectWrapper,
      el: 'v-text-field-stub',
      name: propsData.name,
    })
    const textFieldSpy = {
      emit: jest.spyOn(textField.vm, '$emit'),
    }

    subjectWrapper.vm.$nextTick()

    const newValue = 'a new val'
    textField.vm.inputValue = newValue

    expect(textFieldSpy.emit).toHaveBeenCalledTimes(1)
    expect(textFieldSpy.emit).toHaveBeenCalledWith('change', newValue)
  })
})

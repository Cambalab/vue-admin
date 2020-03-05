import Vue from 'vue'
import Vuetify from 'vuetify'
import { SimpleText } from '@components/UiComponents'
import { defaults } from '@components/UiComponents/SimpleText/src/SimpleText'
import Factory from '@unit/factory'
import { shallowMount } from '@vue/test-utils'

describe('SimpleText.vue', () => {
  Vue.use(Vuetify)
  const vuetify = new Vuetify()

  let defaultProps
  let propsData
  let subjectWrapper

  function mountSubject() {
    subjectWrapper = shallowMount(SimpleText, {
      propsData,
      vuetify,
    })
  }

  beforeEach(() => {
    SimpleText.install(Vue)
    defaultProps = defaults().props

    propsData = {
      parse: value => value,
      type: 'p',
      value: 'Im an empty content',
    }
  })

  afterEach(() => {
    subjectWrapper = {}
  })

  it('should have props', () => {
    mountSubject()

    const props = subjectWrapper.props()

    expect(props.type).toMatch(propsData.type)
    expect(props.value).toMatch(propsData.value)
  })

  it('should use default props when none were provided', () => {
    delete propsData.type
    delete propsData.parse
    delete propsData.value
    mountSubject()

    // Asserts to the post-mounting generated props by default
    const { parse, type, value } = defaultProps

    const response = Factory.resource.responses.getSingle()

    expect(subjectWrapper.vm._props.parse(response)).toMatchObject(
      parse(response)
    )
    expect(subjectWrapper.vm._props.type).toMatch(type)
    expect(subjectWrapper.vm._props.value).toMatch(value)
  })

  it('should render a parsed content', () => {
    mountSubject()

    const value = subjectWrapper.vm.parse(propsData.value)

    expect(subjectWrapper.text()).toMatch(value)
  })
})

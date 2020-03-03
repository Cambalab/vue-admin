import Vue from 'vue'
import { SimpleText } from '@components/UiComponents'
import { defaults } from '@components/UiComponents/SimpleText/src/SimpleText'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'

describe('SimpleText.vue', () => {
  Vue.use(Vuetify)
  const vuetify = new Vuetify()

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
    const { parse, type } = defaults().props
    propsData = {
      parse,
      type,
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
    delete propsData.value
    mountSubject()

    // Asserts to the post-mounting generated props by default
    expect(subjectWrapper.vm._props.type).toMatch('p')
    expect(subjectWrapper.vm._props.value).toMatch('')
  })

  it('should render a parsed content', () => {
    mountSubject()

    const value = subjectWrapper.vm.parse(propsData.value)

    expect(subjectWrapper.text()).toMatch(value)
  })
})

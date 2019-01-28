import { shallowMount } from '@vue/test-utils'
import Resource from '@/components/Resource'

describe('Resource.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Resource, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

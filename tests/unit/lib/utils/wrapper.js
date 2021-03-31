const nextTick = wrapper => {
  return new Promise(resolve => wrapper.vm.$nextTick(resolve))
}

const findElemByName = ({ wrapper, el, name, prop = 'name' }) => {
  return wrapper.find(`${el}[${prop}="${name}"]`)
}

const findRef = ({ wrapper, ref }) => wrapper.find({ ref })

export { findElemByName, findRef, nextTick }

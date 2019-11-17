const nextTick = wrapper => {
  return new Promise(resolve => wrapper.vm.$nextTick(resolve))
}

const findElemByName = ({ wrapper, el, name }) => {
  return wrapper.find(`${el}[name="${name}"]`)
}

const findRef = ({ wrapper, ref }) => wrapper.find({ ref })

export { findElemByName, findRef, nextTick }

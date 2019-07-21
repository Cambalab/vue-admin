
const nextTick = (wrapper) => {
  return new Promise(resolve => wrapper.vm.$nextTick(resolve));
}

const findButtonByName = ({ wrapper, name }) => {
  return wrapper.find(`button[name="${name}"]`)
}

const findRef = ({ wrapper, ref }) => wrapper.find({ ref })

export {
  findButtonByName,
  findRef,
  nextTick
}

import Core from './src/Core'

Core.install = function(Vue) {
  Vue.component(Core.name, Core)
}

export default Core

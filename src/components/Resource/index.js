import Resource from './src/Composer'

Resource.install = function(Vue) {
  Vue.component(Resource.name, Resource)
}

export default Resource

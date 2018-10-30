import Resource from "./src/resource";

Resource.install = function(Vue) {
  Vue.component(Resource.name, Resource);
};

export default Resource;

import Create from "./Composer";

Create.install = function(Vue) {
  Vue.component(Create.name, Create);
};

export default Create;

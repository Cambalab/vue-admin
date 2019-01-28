import Show from "./Composer";

Show.install = function(Vue) {
  Vue.component(Show.name, Show);
};

export default Show;

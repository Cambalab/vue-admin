import List from "./list";

List.install = function(Vue) {
  Vue.component(List.name, List);
};

export default List;

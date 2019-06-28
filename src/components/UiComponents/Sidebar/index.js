import Sidebar from './Sidebar.vue'
import Link from './Link.vue'
import Node from './Node.vue'
import Action from './Action.vue'
import Heading from './Heading.vue'

[Sidebar, Link, Node, Action, Heading].forEach(component => {
  component.install = function(Vue) {
    Vue.component(component.name, component);
  };
})

export {
    Sidebar,
    Link,
    Node,
    Action,
    Heading
}
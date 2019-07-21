import Sidebar        from './Sidebar.vue'
import SidebarLink    from './SidebarLink.vue'
import SidebarNode    from './SidebarNode.vue'
import SidebarAction  from './SidebarAction.vue'
import SidebarHeading from './SidebarHeading.vue'

[Sidebar, SidebarLink, SidebarNode, SidebarAction, SidebarHeading].forEach(component => {
  component.install = function(Vue) {
    Vue.component(component.name, component);
  };
})

export {
    Sidebar,
    SidebarLink,
    SidebarNode,
    SidebarAction,
    SidebarHeading
}
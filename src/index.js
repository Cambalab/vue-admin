import { Create, Edit, List, Show } from '@components/Actions'
import {
  DeleteButton,
  EditButton,
  Sidebar,
  SidebarLink,
  SidebarNode,
  SidebarAction,
  SidebarHeading,
} from '@components/UiComponents'
import Admin from '@components/Admin'
import AuthTypes from '@va-auth/types'
import Resource from '@components/Resource'
import { UnauthorizedLayout } from '@components/Layouts'
import { name, description, version } from '../package.json'

const components = [
  Admin,
  Resource,
  Create,
  DeleteButton,
  Edit,
  EditButton,
  List,
  Show,
  Sidebar,
  SidebarLink,
  SidebarNode,
  SidebarAction,
  SidebarHeading,
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  // Package data
  name,
  description,
  version,
  // Exports Actions components
  Create,
  DeleteButton,
  Edit,
  EditButton,
  List,
  Show,
  // Exports Core components
  Admin,
  Resource,
  // Exports Layouts
  UnauthorizedLayout,
  // Exports Ui Components
  Sidebar,
  SidebarLink,
  SidebarNode,
  SidebarAction,
  SidebarHeading,
  // Exports Types
  AuthTypes,
}

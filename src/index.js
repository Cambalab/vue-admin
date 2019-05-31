import {
  Create,
  Delete,
  Edit,
  EditButton,
  List,
  Show
} from '@components/Actions'
import Admin from '@components/Admin'
import AuthTypes from '@va-auth/types'
import Resource from '@components/Resource'
import Unauthorized from '@components/Unauthorized'
import { name, description, version } from '../package.json'

const components = [
  Admin, Resource,
  Create, Delete, Edit, EditButton, List, Show,
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
  Delete,
  Edit,
  EditButton,
  List,
  Show,
  // Exports Core components
  Admin,
  Resource,
  Unauthorized,
  // Exports Types
  AuthTypes,
}

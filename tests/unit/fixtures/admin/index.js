import AppLayout from '@components/Ui'
import Core from '@components/Core'
import Unauthorized from '@components/Unauthorized'
import defaults from '@components/Admin/src/defaults'
import resourceModule from '@store/modules/resource'
import { DefaultSidebar } from '@components/UiComponents';

export default {
  props: {
    ...defaults().props
  }
}

const unauthorizedRoutes = [{
  path: '/unauthorized',
  name: 'unauthorized',
  component: Unauthorized
}]

export const Authenticated = {
  props: {
    layout: AppLayout,
    sidebar: DefaultSidebar,
    title: 'A toolbar text',
    unauthorized: Unauthorized
  },
  args: {
    Core,
    resourceModule,
    unauthorizedRoutes
  }
}

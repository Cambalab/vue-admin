import AppLayout from '@components/AppLayout'
import AuthLayout from '@components/Auth'
import Core from '@components/Core'
import Unauthorized from '@components/Unauthorized'
import defaults, {
  authenticatedDefaults,
  unauthenticatedDefaults
} from '@components/Admin/src/defaults'
import { DefaultSidebar } from '@components/UiComponents';

export default {
  props: {
    ...defaults().props
  }
}

export const Authenticated = {
  props: {
    layout: AppLayout,
    sidebar: DefaultSidebar,
    title: 'A toolbar text',
    unauthorized: Unauthorized
  },
  args: {
    Core,
    ...authenticatedDefaults.args
  }
}

export const Unauthenticated = {
  props: {
    layout: AuthLayout
  },
  args: {
    ...unauthenticatedDefaults.args
  }
}

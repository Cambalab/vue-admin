import { AppLayout, AuthLayout, UnauthorizedLayout } from '@components/Layouts'
import Core from '@components/Core'
import defaults, {
  authenticatedDefaults,
  unauthenticatedDefaults
} from '@components/Admin/src/defaults'
import { DefaultSidebar } from '@components/UiComponents';

export default {
  props: {
    ...defaults().props
  },
  args: {
    ...defaults().args
  }
}

export const Authenticated = {
  props: {
    layout: AppLayout,
    sidebar: DefaultSidebar,
    title: 'A toolbar text',
    unauthorized: UnauthorizedLayout
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

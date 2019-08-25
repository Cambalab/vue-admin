import AppLayout from '@components/Ui'
import Core from '@components/Core'
import Unauthorized from '@components/Unauthorized'
import defaults, {
  authenticatedDefaults
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

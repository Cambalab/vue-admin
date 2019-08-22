import UI_CONTENT from '@constants/ui.content.default'
import AuthLayout from '@components/Auth'
import AppLayout from "@components/Ui";
import Unauthorized from '@components/Unauthorized'
import { DefaultSidebar } from '@components/UiComponents';
import {
  handleEmptyProp,
} from '@handlers/error/src'

/**
 * Defaults - Default attributes for the Admin component
 *
 * @return {Object} An object containing default attributes
 */
export default () => {
  const component = 'Admin'

  const appLayout = AppLayout
  const authLayout = AuthLayout
  const authProvider = handleEmptyProp({ prop: 'authProvider', at: component })
  const sidebar = DefaultSidebar
  const title = UI_CONTENT.MAIN_TOOLBAR_TITLE
  const unauthorized = Unauthorized

  return {
    props: {
      authProvider,
      appLayout,
      authLayout,
      sidebar,
      title,
      unauthorized
    }
  }
}

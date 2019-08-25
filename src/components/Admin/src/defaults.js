import UI_CONTENT from '@constants/ui.content.default'
import AuthLayout from '@components/Auth'
import AppLayout from "@components/Ui";
import Unauthorized from '@components/Unauthorized'
import { DefaultSidebar } from '@components/UiComponents';

/**
 * Defaults - Default attributes for the Admin component
 *
 * @return {Object} An object containing default attributes
 */
export default () => {

  const appLayout = AppLayout
  const authLayout = AuthLayout
  const sidebar = DefaultSidebar
  const title = UI_CONTENT.MAIN_TOOLBAR_TITLE
  const unauthorized = Unauthorized

  return {
    props: {
      appLayout,
      authLayout,
      sidebar,
      title,
      unauthorized
    }
  }
}

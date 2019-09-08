import UI_CONTENT from '@constants/ui.content.default'
import {
  AppLayout,
  AuthLayout,
  HomeLayout,
  UnauthorizedLayout
} from '@components/Layouts'
import { DefaultSidebar } from '@components/UiComponents'
import entitiesModule from '@store/modules/entities'
import requestsModule from '@store/modules/requests'
import resourceModule from '@store/modules/resource'

/**
 * Defaults - Default attributes for the Admin component
 *
 * @return {Object} An object containing default attributes
 */
export default () => {

  const appLayout = AppLayout
  const authLayout = AuthLayout
  const homeLayout = HomeLayout
  const sidebar = DefaultSidebar
  const title = UI_CONTENT.MAIN_TOOLBAR_TITLE
  const unauthorized = UnauthorizedLayout

  const createUnauthenticatedRoutes = (authLayout) => [{
    path: '/login',
    name: 'login',
    component: authLayout || AuthLayout,
    props: {}
  }]

  const unauthorizedRoutes = [{
    path: '/unauthorized',
    name: 'unauthorized',
    component: UnauthorizedLayout
  }]

  const createSiteRoutes = ({ homeLayout }) => [{
    path: '/',
    name: 'home',
    component: homeLayout || HomeLayout,
    props: {}
  }]

  return {
    props: {
      appLayout,
      authLayout,
      homeLayout,
      sidebar,
      title,
      unauthorized
    },
    args: {
      createSiteRoutes,
      createUnauthenticatedRoutes,
      entitiesModule,
      requestsModule,
      resourceModule,
      unauthorizedRoutes
    }
  }
}

/**
 * Defaults - Default attributes for the Authenticated component
 *
 * @return {Object} An object containing default attributes
 */

export const authenticatedDefaults = {
  args: {

  }
}

/**
 * Defaults - Default attributes for the Unauthenticated component
 *
 * @return {Object} An object containing default attributes
 */


export const unauthenticatedDefaults = {
  args: {

  }
}

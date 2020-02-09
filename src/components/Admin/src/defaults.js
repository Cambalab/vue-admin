import UI_CONTENT from '@constants/ui.content.default'
import {
  AppLayout,
  AuthLayout,
  HomeLayout,
  UnauthorizedLayout,
} from '@components/Layouts'
import { DefaultSidebar } from '@components/UiComponents'
import alertsModule from '@store/modules/alerts'
import entitiesModule from '@store/modules/entities'
import requestsModule from '@store/modules/requests'
import resourceModule from '@store/modules/resources'

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
  const unauthorizedLayout = UnauthorizedLayout

  const createUnauthenticatedRoutes = anAuthLayout => [
    {
      path: '/login',
      name: 'login',
      component: anAuthLayout || authLayout,
      props: {},
    },
  ]

  const createUnauthorizedRoutes = anUnauthorizedLayout => {
    return [
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: anUnauthorizedLayout || unauthorizedLayout,
    },
  ]}

  const createSiteRoutes = ({ homeLayout: aHomeLayout }) => [
    {
      path: '/',
      name: 'home',
      component: aHomeLayout || homeLayout,
      props: {},
    },
  ]

  return {
    props: {
      appLayout,
      authLayout,
      homeLayout,
      sidebar,
      title,
      unauthorizedLayout,
    },
    args: {
      alertsModule,
      createSiteRoutes,
      createUnauthenticatedRoutes,
      entitiesModule,
      requestsModule,
      resourceModule,
      createUnauthorizedRoutes,
    },
  }
}

/**
 * Defaults - Default attributes for the Authenticated component
 *
 * @return {Object} An object containing default attributes
 */

export const authenticatedDefaults = {
  args: {},
}

/**
 * Defaults - Default attributes for the Unauthenticated component
 *
 * @return {Object} An object containing default attributes
 */

export const unauthenticatedDefaults = {
  args: {},
}

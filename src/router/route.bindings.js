import listUtils from '@store/utils/list.utils'
import showUtils from '@store/utils/show.utils'
import createUtils from '@store/utils/create.utils'
import editUtils from '@store/utils/edit.utils'
import createAuthUtils from '@va-auth/utils'
import createRouteHooks from './route.hooks'

/**
 * Create Route Bindings - A function used to bind components to routes.
 *
 * @param {Object}   list                   The component for the list route
 * @param {Object}   show                   The component for the show route
 * @param {Object}   create                 The component for the create route
 * @param {Object}   edit                   The component for the edit route
 * @param {String}   resourceName           The name of a resource
 * @param {String}   resourceIdName         The name of the id field
 * @param {String}   userPermissionsField   The name of the permissions field
 * @param {Object}   redirection            An object with redirection route names
 * @param {Object}   router                 The Router object
 * @param {Object}   parseResponses         An object with a parseSingle and parseList functions
 *
 * @return {Object} An object with binding functions
 */
export default ({
  list,
  show,
  create,
  edit,
  resourceName,
  resourceIdName,
  userPermissionsField,
  redirection,
  router,
  parseResponses,
}) => {
  const store = router.app.$store
  const hasShow = !!show
  const hasCreate = !!create
  const hasEdit = !!edit
  const resourcePath = `/${resourceName}`
  const authUtils = createAuthUtils({ store })
  return {
    list: () => {
      const name = `${resourceName}/list`
      const utils = listUtils({
        resourceName,
        store,
      })
      const { component, isPublic, permissions } = list
      const routeHooks = createRouteHooks({
        isPublic,
        permissions,
        store: authUtils,
        userPermissionsField,
      })
      return {
        path: resourcePath,
        name,
        component,
        props: {
          resourceName,
          hasShow,
          hasCreate,
          hasEdit,
          resourceIdName,
          // This could be refactored into a vue mixin, check #52 - @sgobotta
          va: {
            ...utils,
          },
        },
        meta: {
          isPublic,
          permissions,
        },
        ...routeHooks,
      }
    },

    show: () => {
      const name = `${resourceName}/show`
      const utils = showUtils({
        resourceName,
        router,
        store,
      })
      const { component, isPublic, permissions } = show
      const routeHooks = createRouteHooks({
        isPublic,
        permissions,
        store: authUtils,
        userPermissionsField,
      })
      return {
        path: `${resourcePath}/show/:id`,
        name,
        component,
        props: {
          resourceName,
          // This could be refactored into a vue mixin, check #52 - @sgobotta
          va: {
            ...utils,
          },
        },
        meta: {
          isPublic,
          permissions,
        },
        ...routeHooks,
      }
    },

    create: () => {
      const name = `${resourceName}/create`
      const redirectView = redirection.views.create
      const utils = createUtils({
        redirectView,
        resourceIdName,
        resourceName,
        router,
        store,
        parseResponses,
      })
      const { component, isPublic, permissions } = create
      const routeHooks = createRouteHooks({
        isPublic,
        permissions,
        store: authUtils,
        userPermissionsField,
      })
      return {
        path: `${resourcePath}/create`,
        name,
        component,
        props: {
          // This could be refactored into a vue mixin, check #52 - @sgobotta
          resourceName,
          va: {
            ...utils,
          },
        },
        meta: {
          isPublic,
          permissions,
        },
        ...routeHooks,
      }
    },

    edit: () => {
      const name = `${resourceName}/edit`
      const redirectView = redirection.views.edit
      const utils = editUtils({
        redirectView,
        resourceIdName,
        resourceName,
        router,
        store,
        parseResponses,
      })
      const { component, isPublic, permissions } = edit
      const routeHooks = createRouteHooks({
        isPublic,
        permissions,
        store: authUtils,
        userPermissionsField,
      })
      return {
        path: `${resourcePath}/edit/:id`,
        name,
        component,
        // This could be refactored into a vue mixin, check #52 - @sgobotta
        props: {
          resourceName,
          va: {
            ...utils,
          },
        },
        meta: {
          isPublic,
          permissions,
        },
        ...routeHooks,
      }
    },
  }
}

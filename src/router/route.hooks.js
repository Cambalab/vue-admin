/**
 * Create Route Hooks - A function used to create route hooks
 *
 * @param {Boolean}   isPublic               Indicates whether or not a route needs authentication to be visited
 * @param {Array}     permissions            An array of route permissions as Strings
 * @param {Object}    store                  A group of store auth actions
 * @param {String}    userPermissionsField   The name of the permissions field in a user object
 * @return {type} An object with hook functions
 */
export default({
  isPublic,
  permissions,
  store,
  userPermissionsField
}) => {
  const requiresAuth = !isPublic

  const beforeEnter = (to, from, next) => {
    if (requiresAuth) {
      // It's a private route

      const isAuthenticated = store.isAuthenticated()
      if (!isAuthenticated) {
        // User is not authenticated
        next({
            path: '/login',
            params: { nextUrl: to.fullPath }
        })
      } else {
        // User is authenticated
        if (permissions.length > 0) {
          // Route has permissions restriction

          const user = store.getUser()
          const { [userPermissionsField]: userPermissions } = user
          const userHasPermissions = permissions.some(permission => {
            return userPermissions.indexOf(permission) > -1
          })
          if (userHasPermissions) {
            // User is authenticated and has route permissions
            next()
          } else {
            // User is authenticated but does not have route permissions
            // TODO: Should redirect to an Anauthorized page - #90 - @sgobotta
            next({
              path: '/'
            })
          }
        } else {
          // Route has no permissions restriction
          next()
        }
      }
    } else {
      // It's a public route
      next()
    }
  }

  return {
    beforeEnter
  }
}

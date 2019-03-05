import listUtils from '@store/utils/list.utils'
import showUtils from '@store/utils/show.utils'
import createUtils from '@store/utils/create.utils'
import editUtils from '@store/utils/edit.utils'

export default ({
  list,
  show,
  create,
  edit,
  resourceName,
  resourceIdName,
  redirection,
  router,
  store,
  parseResponses
}) => {
  const hasShow = !!show
  const hasCreate = !!create
  const hasEdit = !!edit
  const resourcePath = `/${resourceName}`
  return {

    list: ({ wrapper }) => {
      const name = `${resourceName}/list`
      const utils = listUtils({
        resourceName,
        store
      })
      if (list instanceof Array) {
        // list should be an array based component
        return {
          path: resourcePath,
          name,
          component: wrapper,
          props: {
            resourceName,
            fields: list,
            hasShow,
            hasCreate,
            hasEdit,
            resourceIdName,
            // This could be refactored into a vue mixin, check #52 - @sgobotta
            va: {
              ...utils
            }
          }
        }
      } else {
        // list is an Object
        const { component, permissions } = list
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
              ...utils
            }
          },
          beforeEnter: (to, from, next) => {
            console.log('List Permissions', permissions)
            next()
          }
        }
      }
    },

    show: ({ wrapper }) => {
      const name = `${resourceName}/show`
      const utils = showUtils({
        resourceName,
        router,
        store
      })
      if (show instanceof Array) {
        // show should be a VA default component
        return {
          path: `${resourcePath}/show/:id`,
          name,
          component: wrapper,
          props: {
            resourceName,
            fields: show,
            // This could be refactored into a vue mixin, check #52 - @sgobotta
            va: {
              ...utils
            }
          }
        }
      } else {
        // show is an Object
        const { component, permissions } = show
        return {
          path: `${resourcePath}/show/:id`,
          name,
          component,
          props: {
            resourceName,
            // This could be refactored into a vue mixin, check #52 - @sgobotta
            va: {
              ...utils
            }
          },
          beforeEnter: (to, from, next) => {
            console.log('Show Permissions', permissions)
            next()
          }
        }
      }
    },

    create: ({ wrapper }) => {
      const name = `${resourceName}/create`
      const redirectView = redirection.views.create
      const utils = createUtils({
        redirectView,
        resourceIdName,
        resourceName,
        router,
        store,
        parseResponses
      })
      if (create instanceof Array) {
        // create should be a VA default component
        return {
          path: `${resourcePath}/create`,
          name,
          component: wrapper,
          props: {
            resourceName,
            fields: create,
            va: {
              ...utils
            }
          }
        }
      } else {
        // create is an Object
        const { component, permissions } = create
        return {
          path: `${resourcePath}/create`,
          name,
          component,
          props: {
            // This could be refactored into a vue mixin, check #52 - @sgobotta
            resourceName,
            va: {
              ...utils
            }
          },
          beforeEnter: (to, from, next) => {
            console.log('Create Permissions', permissions)
            next()
          }
        }
      }
    },

    edit: ({ wrapper }) => {
      const name = `${resourceName}/edit`
      const redirectView = redirection.views.edit
      const utils = editUtils({
        redirectView,
        resourceIdName,
        resourceName,
        router,
        store,
        parseResponses
      })
      if (edit instanceof Array) {
        // edit should be a VA default component
        return {
          path: `${resourcePath}/edit/:id`,
          name,
          component: wrapper,
          props: {
            resourceName,
            fields: edit,
            va: {
              ...utils
            }
          }
        }
      } else {
        // edit is an Object
        const { component, permissions } = edit
        return {
          path: `${resourcePath}/edit/:id`,
          name,
          component,
          // This could be refactored into a vue mixin, check #52 - @sgobotta
          props: {
            resourceName,
            va: {
              ...utils
            }
          },
          beforeEnter: (to, from, next) => {
            console.log('Edit Permissions', permissions)
            next()
          }
        }
      }
    }
  }
}

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
        // list is a Component
        return {
          path: resourcePath,
          name,
          component: list,
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
        // show is a user's custom component
        return {
          path: `${resourcePath}/show/:id`,
          name,
          component: show,
          props: {
            resourceName,
            // This could be refactored into a vue mixin, check #52 - @sgobotta
            va: {
              ...utils
            }
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
        // create is a user's custom component
        return {
          path: `${resourcePath}/create`,
          name,
          component: create,
          props: {
            // This could be refactored into a vue mixin, check #52 - @sgobotta
            resourceName,
            va: {
              ...utils
            }
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
        // edit is a user's custom component
        return {
          path: `${resourcePath}/edit/:id`,
          name,
          component: edit,
          // This could be refactored into a vue mixin, check #52 - @sgobotta
          props: {
            resourceName,
            va: {
              ...utils
            }
          }
        }
      }
    }
  }
}

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
  const resourcePath = `/${resourceName}`
  return {

    list: ({ wrapper }) => {
      const name = `${resourceName}/list`
      if (list instanceof Array) {
        // list should be a VA default component
        return {
          path: resourcePath,
          name,
          component: wrapper,
          props: {
            name: resourceName,
            fields: list,
            hasShow,
            hasCreate,
            resourceId: resourceIdName
          }
        }
      } else {
        // list is a user's custom component
        const utils = listUtils({
          resourceName,
          router,
          store
        })
        return {
          path: resourcePath,
          name,
          component: list,
          props: {
            // This could be refactored into a vue mixin, check #52 - @sgobotta
            va: {
              resourceName,
              ...utils
            }
          }
        }
      }
    },

    show: ({ wrapper }) => {
      const name = `${resourceName}/show`
      if (show instanceof Array) {
        // show should be a VA default component
        return {
          path: `${resourcePath}/show/:id`,
          name,
          component: wrapper,
          props: {
            name: resourceName,
            fields: show
          }
        }
      } else {
        // show is a user's custom component
        const utils = showUtils({
          resourceName,
          router,
          store
        })
        return {
          path: `${resourcePath}/show/:id`,
          name,
          component: show,
          props: {
            // This could be refactored into a vue mixin, check #52 - @sgobotta
            va: {
              resourceName,
              ...utils
            }
          }
        }
      }
    },

    create: ({ wrapper }) => {
      const name = `${resourceName}/create`
      const redirectView = redirection.views.create
      if (create instanceof Array) {
        // create should be a VA default component
        const redirect = { idField: resourceIdName, view: redirectView }
        return {
          path: `${resourcePath}/create`,
          name,
          component: wrapper,
          props: {
            name: resourceName,
            fields: create,
            redirect
          }
        }
      } else {
        // create is a user's custom component
        const utils = createUtils({
          redirectView,
          resourceIdName,
          resourceName,
          router,
          store,
          parseResponses
        })
        return {
          path: `${resourcePath}/create`,
          name,
          component: create,
          props: {
            // This could be refactored into a vue mixin, check #52 - @sgobotta
            va: {
              resourceName,
              ...utils
            }
          }
        }
      }
    },

    edit: ({ wrapper }) => {
      const name = `${resourceName}/edit`
      const redirectView = redirection.views.edit
      if (edit instanceof Array) {
        // edit should be a VA default component
        const redirect = { idField: resourceIdName, view: redirectView }
        return {
          path: `${resourcePath}/edit/:id`,
          name,
          component: wrapper,
          props: {
            name: resourceName,
            fields: edit,
            redirect
          }
        }
      } else {
        // edit is a user's custom component
        const utils = editUtils({
          redirectView,
          resourceIdName,
          resourceName,
          router,
          store,
          parseResponses
        })
        return {
          path: `${resourcePath}/edit/:id`,
          name,
          component: edit,
          // This could be refactored into a vue mixin, check #52 - @sgobotta
          props: {
            va: {
              resourceName,
              ...utils
            }
          }
        }
      }
    }
  }
}

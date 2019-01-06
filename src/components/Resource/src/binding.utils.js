import createUtils from '../../../store/utils/create.utils'
import editUtils from '../../../store/utils/edit.utils'


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
      return list ? {
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
      } : []
    },

    show: ({ wrapper }) => {
      const name = `${resourceName}/show`
      return show ? {
        path: `${resourcePath}/show/:id`,
        name,
        component: wrapper,
        props: {
          name: resourceName,
          fields: show
        }
      } : []
    },

    create: ({ wrapper }) => {
      const name = `${resourceName}/create`
      const redirectView = redirection.views.create
      if (create instanceof Array) {
        const redirect = { idField: resourceIdName, view: redirectView }
        return create ? {
          path: `${resourcePath}/create`,
          name,
          component: wrapper,
          props: {
            name: resourceName,
            fields: create,
            redirect
          }
        } : []
      } else {
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
        const redirect = { idField: resourceIdName, view: redirectView }
        return edit ? {
          path: `${resourcePath}/edit/:id`,
          name,
          component: wrapper,
          props: {
            name: resourceName,
            fields: edit,
            redirect
          }
        } : []
      } else {
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

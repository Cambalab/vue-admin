import Router from '../router'

export const getEntity = ({ store, resourceName }) => {
  return store.state.entities.createForm[resourceName]
}

export const updateEntity = ({ store, value, key, resourceName }) => {
  const moduleName = 'entities/updateCreateForm';
  return store.commit(moduleName, { value, key, entity: resourceName });
}

export const submitEntity = ({ store, resourceName, data, redirect }) => {
  const moduleName = `${resourceName}/create`
  return store.dispatch(moduleName, { data })
    .then((res) => {
      const { status } = res
      if (redirect !== undefined && [200, 201].indexOf(status) !== -1) {
        Router.redirect({ router: redirect.router, resource: resourceName, view: redirect.view, id: 'id' })
        return res
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
}

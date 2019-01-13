
export default () => {
  return {
    articles: initialEntityState,
    magazines: initialEntityState,
    entities: {},
    resources: initialResources
  }
}

// Vuex Crud Initial State for a resource
const initialEntityState = {
  createError: null,
  destroyError: null,
  entities: {},
  fetchListError: null,
  fetchSingleError: null,
  isCreating: false,
  isDestroying: false,
  isFetchingList: false,
  isFetchingSingle: false,
  isReplacing: false,
  isUpdating: false,
  list: [],
  replaceError: null,
  updateError: null
}

const initialResources = {
  routes: [
    {
      path: '/articles',
      name: 'articles'
    },
    {
      path: '/magazines',
      name: 'magazines'
    }
  ]
}

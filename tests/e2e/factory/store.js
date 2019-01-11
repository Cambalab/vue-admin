
export const store = {
  createVuexCrudInitialState: () => {
    return {
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
  }
}

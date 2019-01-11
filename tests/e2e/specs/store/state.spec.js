describe('Vuex Store State', () => {
  const getStore = () => cy.window().its('app.$store')

  before('Initialises the store', () => {
    cy.visit('/#/')
    cy.reload()
  })

  it('Should have attributes on initialisation', () => {
    const attribute = 'state'
    getStore().its(attribute).should('have.keys', [
      'articles',
      'entities',
      'magazines',
      'resources'
    ])
  })

  it('Attribute {articles} should have the vuex crud intitial configuration', () => {
    const attribute = 'state.articles'
    getStore().its(attribute).should('deep.equal', {
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
    })
  })

  it('Attribute {magazines} should have the vuex crud initial configuration', () => {
    const attribute = 'state.magazines'
    getStore().its(attribute).should('deep.equal', {
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
    })
  })

  it('Attribute {entities} should be empty', () => {
    const attribute = 'state.entities'
    getStore().its(attribute).should('be.empty')
  })

  it('Attribute {resources} should have attributes initialised', () => {
    const attribute = 'state.resources'
    getStore().its(attribute).should('have.keys', [
      'routes'
    ])
  })

  it('Attribute {routes} should have routes initialised', () => {
    const attribute = 'state.resources.routes'
    getStore().its(attribute).should('deep.equal', [
      {
        path: '/articles',
        name: 'articles'
      },
      {
        path: '/magazines',
        name: 'magazines'
      }
    ])
  })

})

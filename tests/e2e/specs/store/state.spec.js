import Factory from '../../factory'

describe('Vuex Store State', () => {
  const getStore = () => cy.getStore()
  const initialState = {}

  before('Initialises the store', () => {
    const _initialState = Factory.createInitialVuexStoreState()
    Object.assign(initialState, _initialState)
    cy.visit('/#/')
    cy.reload()
  })

  it('Should have attributes on initialisation', () => {
    const state = 'state'
    getStore().its(state).should('have.keys', Object.keys(initialState))
  })

  it('Attribute {auth} should have an intitial configuration', () => {
    const attribute = 'auth'
    const state = `state.${attribute}`
    getStore().its(state).should('deep.equal', initialState[attribute])
  })

  it('Attribute {articles} should have the vuex crud intitial configuration', () => {
    const attribute = 'articles'
    const state = `state.${attribute}`
    getStore().its(state).should('deep.equal', initialState[attribute])
  })

  it('Attribute {magazines} should have the vuex crud initial configuration', () => {
    const attribute = 'magazines'
    const state = `state.${attribute}`
    getStore().its(state).should('deep.equal', initialState[attribute])
  })

  it('Attribute {entities} should be empty', () => {
    const attribute = 'entities'
    const state = `state.${attribute}`
    getStore().its(state).should('eql', initialState[attribute])
    getStore().its(state).should('be.empty')
  })

  it('Attribute {resources} should have attributes initialised', () => {
    const attribute = 'resources'
    const state = `state.${attribute}`
    getStore().its(state).should('have.keys', [
      'routes'
    ])
  })

  it('Attribute {resources} should have routes initialised', () => {
    const attribute = 'resources'
    const state = `state.${attribute}`
    getStore().its(state).should('deep.equal', initialState[attribute])
  })
})

describe('Vuex Store Getters', () => {
  const getStore = () => cy.window().its('app.$store')

  before('Initialises the store', () => {
    cy.visit('/#/')
    cy.reload()
  })

  it('Should have attributes on initialisation', () => {
    const attribute = 'getters'
    getStore().its(attribute).should('have.keys', [
      'articles/byId',
      'articles/isError',
      'articles/isLoading',
      'articles/list',
      'magazines/byId',
      'magazines/isError',
      'magazines/isLoading',
      'magazines/list',
      'entities/getEntity',
      'resources/all'
    ])
  })

  it('Attribute {resources/all} should be initialised', () => {
    const attribute = 'getters.resources/all'
    getStore().its(attribute).should('deep.equal', [
      {
        name: 'articles',
        path: '/articles'
      },
      {
        name: 'magazines',
        path: '/magazines'
      }
    ])
  })

  it('{Articles} getters should be initialised', () => {
    const attribute = 'getters'
    getStore().its(attribute).should((getters) => {
      assert.isFunction(getters['articles/byId'])
      expect(getters['articles/isError']).to.equal(false)
      expect(getters['articles/isLoading']).to.equal(false)
      expect(getters['articles/list']).to.be.empty
    })
  })

  it('{Magazines} getters should be initialised', () => {
    const attribute = 'getters'
    getStore().its(attribute).should((getters) => {
      assert.isFunction(getters['magazines/byId'])
      expect(getters['magazines/isError']).to.equal(false)
      expect(getters['magazines/isLoading']).to.equal(false)
      expect(getters['articles/list']).to.be.empty
    })
  })

  it('{Entities} getters should be initialised', () => {
    const attribute = 'getters'
    getStore().its(attribute).should((getters) => {
      expect(getters['entities/getEntity']).to.be.empty
    })
  })
})

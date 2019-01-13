import Factory from '../../factory'

describe('Vuex Store Getters', () => {
  const getStore = () => cy.getStore()
  const initialGetters = {}

  before('Initialises the store', () => {
    const _initialGetters = Factory.createInitialVuexStoreGetters()
    Object.assign(initialGetters, _initialGetters)
    cy.visit('/#/')
    cy.reload()
  })

  it('Should have attributes on initialisation', () => {
    getStore().its('getters').should('have.keys', Object.keys(initialGetters))
  })

  it('Attribute {resources/all} should be initialised', () => {
    const attribute = 'resources/all'
    const getters = `getters.${attribute}`
    getStore().its(getters).should('deep.equal', initialGetters[attribute])
  })

  it('{Articles} getters should be initialised', () => {
    const resource = 'articles'
    gettersShouldBeInitialised(resource)
  })

  it('{Magazines} getters should be initialised', () => {
    const resource = 'magazines'
    gettersShouldBeInitialised(resource)
  })

  it('{Entities} getters should be initialised', () => {
    getStore().its('getters').should((getters) => {
      expect(getters['entities/getEntity']).to.be.empty
    })
  })

  /**
   * gettersShouldBeInitialised - Given a resource, asserts the current store
   * getters are properly initialised
   *
   * @param {String} resource The name of a resource
   */
  function gettersShouldBeInitialised(resource) {
    const byId = `${resource}/byId`
    const isError = `${resource}/isError`
    const isLoading = `${resource}/isLoading`
    const list = `${resource}/list`
    getStore().its('getters').should(getters => {
      assert.isFunction(getters[byId])
      expect(getters[isError]).to.equal(initialGetters[isError])
      expect(getters[isLoading]).to.equal(initialGetters[isLoading])
      expect(getters[list]).to.be.empty
    })
  }
})

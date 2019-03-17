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

  it('Attribute {resources/all} should have been initialised', () => {
    const attribute = 'resources/all'
    const getters = `getters.${attribute}`
    getStore().its(getters).should('deep.equal', initialGetters[attribute])
  })

  it('{Auth} getters should have been initialised', () => {
    const resource = 'auth'
    authGettersShouldHaveBeenInitialised(resource)
  })

  it('{Articles} vuex crud getters should have been initialised', () => {
    const resource = 'articles'
    vuexCrudGettersShouldHaveBeenInitialised(resource)
  })

  it('{Magazines} vuex crud getters should have been initialised', () => {
    const resource = 'magazines'
    vuexCrudGettersShouldHaveBeenInitialised(resource)
  })

  it('{Entities} getters should have been initialised', () => {
    getStore().its('getters').should((getters) => {
      expect(getters['entities/getEntity']).to.be.empty
    })
  })

  /**
   * authGettersShouldHaveBeenInitialised - Given a resource, asserts the
   * auth getters were properly initialised for the store
   *
   * @param {String} resource The name of a resource
   */
  function authGettersShouldHaveBeenInitialised(resource) {
    const authStatus = `${resource}/authStatus`
    const getUser = `${resource}/getUser`
    const isAuthenticated = `${resource}/isAuthenticated`
    getStore().its('getters').should(getters => {
      expect(getters[authStatus]).to.equal(initialGetters[authStatus])
      expect(getters[getUser]).to.be.empty
      expect(getters[isAuthenticated]).to.equal(initialGetters[isAuthenticated])
    })
  }

  /**
   * vuexCrudGettersShouldHaveBeenInitialised - Given a resource, asserts the
   * crud getters were properly initialised for the store
   *
   * @param {String} resource The name of a resource
   */
  function vuexCrudGettersShouldHaveBeenInitialised(resource) {
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

import Factory from '../../factory'
import AuthTypes from '../../../../src/va-auth/src/types'

describe('Vuex Store Getters', () => {
  const getStore = () => cy.getStore()
  const initialGetters = {}
  let isUserAuthenticated = false

  before('Initialises the store', () => {
    const _initialGetters = Factory.createInitialVuexStoreGetters()
    Object.assign(initialGetters, _initialGetters)
  })

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
      .then(authResponse => {
        const {
          response: {
            body: { user },
          },
          status,
        } = authResponse
        if (status === 200) {
          const { namespace, AUTH_GET_USER } = AuthTypes
          isUserAuthenticated = true
          Object.assign(initialGetters, {
            [`${namespace}/${AUTH_GET_USER}`]: user,
          })
        }
      })
      .visit('/#/')
  })

  it('Should have attributes on initialisation', () => {
    getStore()
      .its('getters')
      .should('have.keys', Object.keys(initialGetters))
  })

  it('Attribute {resources/all} should have been initialised', () => {
    const attribute = 'resources/all'
    const getters = `getters.${attribute}`
    getStore()
      .its(getters)
      .should('deep.equal', initialGetters[attribute])
  })

  it('{Auth} getters should have been initialised', () => {
    authGettersShouldHaveBeenInitialised()
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
    getStore()
      .its('getters')
      .should(getters => {
        expect(getters['entities/getEntity']).to.be.empty
      })
  })

  /**
   * authGettersShouldHaveBeenInitialised - Given a resource, asserts the
   * auth getters were properly initialised for the store
   *
   * @param {String} resource The name of a resource
   */
  function authGettersShouldHaveBeenInitialised() {
    const {
      namespace,
      AUTH_GET_STATUS,
      AUTH_GET_USER,
      AUTH_IS_AUTHENTICATED,
    } = AuthTypes
    const authStatus = `${namespace}/${AUTH_GET_STATUS}`
    const getUser = `${namespace}/${AUTH_GET_USER}`
    const isAuthenticated = `${namespace}/${AUTH_IS_AUTHENTICATED}`
    getStore()
      .its('getters')
      .should(getters => {
        expect(getters[authStatus]).to.equal(initialGetters[authStatus])
        expect(getters[getUser]).to.deep.equal(initialGetters[getUser])
        expect(getters[isAuthenticated]).to.equal(isUserAuthenticated)
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
    getStore()
      .its('getters')
      .should(getters => {
        assert.isFunction(getters[byId])
        expect(getters[isError]).to.equal(initialGetters[isError])
        expect(getters[isLoading]).to.equal(initialGetters[isLoading])
        expect(getters[list]).to.be.empty
      })
  }
})

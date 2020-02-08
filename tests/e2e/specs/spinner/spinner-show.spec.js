import UI_NAMES from '../../../../src/constants/ui.element.names'
import { Types as RequestsTypes } from '../../../../src/store/modules/requests'

describe('Spinner on a Show View Test', () => {
  const resourceName = 'articles'
  const view = 'show'
  const article = {}

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Search an article to show', () => {
    cy.fixture(resourceName).then(fixture => {
      // Takes the first element of the fixture to use as subject
      Object.assign(article, fixture[0])
    })
  })

  before('Initialises the server', () => {
    // Inits the server with a stubbed get endpoint
    const routes = [{ name: view, response: article }]
    cy.InitServer({ resourceName, routes })
  })

  before('Visit the show url', () => {
    cy.visit(`/#/${resourceName}/${view}/${article.id}`)
  })

  it('The spinner should not be visualized when the store property isLoading is set to false', () => {
    const { namespace, REQUESTS_SET_LOADING } = RequestsTypes
    const mutation = `${namespace}/${REQUESTS_SET_LOADING}`
    const isLoading = false
    cy.getStore().invoke('commit', mutation, { isLoading })

    const spinnerContainer = cy.getElement({
      constant: UI_NAMES.SPINNER_CONTAINER,
      elementType: 'div',
      elementProp: 'id',
    })

    spinnerContainer.should('not.be.visible')
  })

  it('The spinner should be visualized when the store property isLoading is set to true', () => {
    const { namespace, REQUESTS_SET_LOADING } = RequestsTypes
    const mutation = `${namespace}/${REQUESTS_SET_LOADING}`
    const isLoading = true
    cy.getStore().invoke('commit', mutation, { isLoading })

    const spinnerContainer = cy.getElement({
      constant: UI_NAMES.SPINNER_CONTAINER,
      elementType: 'div',
      elementProp: 'id',
    })

    spinnerContainer.should('be.visible')
  })
})

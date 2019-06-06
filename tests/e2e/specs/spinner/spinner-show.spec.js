const Factory = require('../../factory')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

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
    const isLoading = false
    cy.getStore().invoke('commit', 'requests/setLoading', { isLoading })

    const spinnerContainer = cy.getElement({
      constant: UI_NAMES.SPINNER_CONTAINER,
      elementType: 'div',
      elementProp: 'id'
    })

    spinnerContainer.should('not.be.visible')
  })

  it('The spinner should be visualized when the store property isLoading is set to true', () => {
    const isLoading = true
    cy.getStore().invoke('commit', 'requests/setLoading', { isLoading })

    const spinnerContainer = cy.getElement({
      constant: UI_NAMES.SPINNER_CONTAINER,
      elementType: 'div',
      elementProp: 'id'
    })

    spinnerContainer.should('be.visible')
  })

})

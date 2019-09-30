const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Spinner on a List View Test', () => {
  const resourceName = 'articles'
  const view = 'list'

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Visit the list url', () => {
    const routes = [{ name: view }]
    cy.InitServer({ resourceName, routes })
    cy.visit(`/#/${resourceName}/`)
  })

  it('The spinner should not be visualized when the store property isLoading is set to false', () => {
    const isLoading = false
    cy.getStore().invoke('commit', 'requests/setLoading', { isLoading })

    const spinnerContainer = cy.getElement({
      constant: UI_NAMES.SPINNER_CONTAINER,
      elementType: 'div',
      elementProp: 'id',
    })

    spinnerContainer.should('not.be.visible')
  })

  it('The spinner should be visualized when the store property isLoading is set to true', () => {
    const isLoading = true
    cy.getStore().invoke('commit', 'requests/setLoading', { isLoading })

    const spinnerContainer = cy.getElement({
      constant: UI_NAMES.SPINNER_CONTAINER,
      elementType: 'div',
      elementProp: 'id',
    })

    spinnerContainer.should('be.visible')
  })
})

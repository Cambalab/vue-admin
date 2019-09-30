const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Spinner on a Create View Test', () => {
  const testResourceName = 'articles'
  const view = 'create'

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Visits the create url', () => {
    cy.visit(`/#/${testResourceName}/${view}`)
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

import UI_NAMES from '../../../../src/constants/ui.element.names'
import { Types as RequestsTypes } from '../../../../src/store/modules/requests'

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

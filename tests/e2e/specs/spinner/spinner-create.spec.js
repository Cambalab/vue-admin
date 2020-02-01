const UI_NAMES = require('../../../../src/constants/ui.element.names')
import { Types as RequestsTypes } from '../../../../src/store/modules/requests'

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

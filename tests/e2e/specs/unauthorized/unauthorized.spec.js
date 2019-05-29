const Factory = require('../../factory')
const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Unauthorized User Test', () => {
  const testResourceName = 'articles'
  const unauthorizedPath = 'unauthorized'
  const userWithoutPermissions = Factory.createUser({ permissions: []})
  const userWithPermissions    = Factory.createUser({ permissions: ['admin']})
  const createAuthResponse = (user) => Factory.createAuthResponse({ user })
  const authResponseWithUserWithoutPermissions = createAuthResponse(userWithoutPermissions)
  const authResponseWithUserWithPermissions = createAuthResponse(userWithPermissions)

  it('A user without admin privileges should be redirected when trying to access an unauthorized view', () => {
    cy.InitAuthenticatedUser({ authResponse: authResponseWithUserWithoutPermissions })
    cy.visit(`/#/${testResourceName}/`)
    cy.url().should('include', `/#/${unauthorizedPath}`)
  })

  it('A user with admin privileges should not be redirected when trying to access an unauthorized view', () => {
    cy.InitAuthenticatedUser({ authResponse: authResponseWithUserWithPermissions })
    cy.visit(`/#/${testResourceName}/`)
    cy.url().should('include', `/#/${testResourceName}`)
  })

  it('Default unauthorized view should have a title', () => {
    const defaultHeader = UI_CONTENT.UNAUTHORIZED_DEFAULT_HEADER;
    cy.InitAuthenticatedUser({ authResponse: authResponseWithUserWithoutPermissions })
    cy.visit(`/#/${testResourceName}/`)
    cy.getElement({
      constant: UI_NAMES.UNAUTHORIZED_DEFAULT_CONTAINER_HEADER_DEFAULT,
      elementType: 'h2',
      elementProp: 'name'
    }).should('contain', defaultHeader)
  })

  it('Default unauthorized view should have a text', () => {
    const defaultMessage = UI_CONTENT.UNAUTHORIZED_DEFAULT_MESSAGE;
    cy.InitAuthenticatedUser({ authResponse: authResponseWithUserWithoutPermissions })
    cy.visit(`/#/${testResourceName}/`)
    cy.getElement({
      constant: UI_NAMES.UNAUTHORIZED_DEFAULT_CONTAINER_MESSAGE_DEFAULT,
      elementType: 'p',
      elementProp: 'name'
    }).should('contain', defaultMessage)
  })
})
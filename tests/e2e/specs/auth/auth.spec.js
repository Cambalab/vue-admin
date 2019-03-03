const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Auth Test', () => {
  const view = 'login'
  const user = {
    username: 'vue-admin@camba.coop',
    password: '123456'
  }

  beforeEach('Visits the auth url', () => {
    cy.visit(`/#/${view}`)
  })

  it('The url path should be /login', () => {
    cy.url().should('include', `/${view}`)
  })

  it('Login View should render a title: Sign In', () => {
    const createViewTitleText = UI_CONTENT.AUTH_CONTAINER_TITLE
    const createViewTitleContainer = cy.getElement({
      constant: UI_NAMES.AUTH_CONTAINER_TITLE,
      elementType: 'div',
      elementProp: 'name'
    })

    createViewTitleContainer.should('contain', createViewTitleText)
  })

  it('The {username} input is filled when a user types in', () => {
    const input = cy.getElement({
      constant: UI_NAMES.AUTH_USERNAME_INPUT,
      elementType: 'input',
      elementProp: 'name'
    })

    input.type(user.username)
    input.should('have.value', user.username)
  })

  it('The {username} input is filled when a user types in', () => {
    const input = cy.getElement({
      constant: UI_NAMES.AUTH_PASSWORD_INPUT,
      elementType: 'input',
      elementProp: 'name'
    })

    input.type(user.password)
    input.should('have.value', user.password)
  })

  it('The Sign In button is disabled when no username and password were given', () => {
    const button = cy.getElement({
      constant: UI_NAMES.AUTH_SIGN_IN_BUTTON,
      elementType: 'button',
      elementProp: 'name'
    })
    button.click()
    button.should('be.disabled')
  })
})

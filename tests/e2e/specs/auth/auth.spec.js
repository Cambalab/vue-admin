const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Auth Test', () => {
  const view = 'login'
  const user = {
    username: 'dev@camba.coop',
    password: '123456'
  }

  const findInput = ({ constant }) => (
    cy.getElement({ constant, elementType: 'input', elementProp: 'name' })
  )

  const findButton = ({ constant }) => (
    cy.getElement({ constant, elementType: 'button', elementProp: 'name' })
  )

  const findTypeAndAssert = ({ element, value, condition }) => {
    const input = findInput({ constant: element })
    input.type(value)
    input.should(condition, value)
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
    findTypeAndAssert({
      element: UI_NAMES.AUTH_USERNAME_INPUT,
      value: user.username,
      condition: 'have.value'
    })
  })

  it('The {password} input is filled when a user types in', () => {
    findTypeAndAssert({
      element: UI_NAMES.AUTH_PASSWORD_INPUT,
      value: user.password,
      condition: 'have.value'
    })
  })

  it('The Sign In button is disabled when no username and password were given', () => {
    const button = findButton({ constant: UI_NAMES.AUTH_SIGN_IN_BUTTON })
    button.should('be.disabled')
  })

  it('When a user types a valid username and password, the button is enabled', () => {
    findTypeAndAssert({
      element: UI_NAMES.AUTH_USERNAME_INPUT,
      value: user.username,
      condition: 'have.value'
    })
    findTypeAndAssert({
      element: UI_NAMES.AUTH_PASSWORD_INPUT,
      value: user.password,
      condition: 'have.value'
    })
    const button = findButton({ constant: UI_NAMES.AUTH_SIGN_IN_BUTTON })
    button.should('be.enabled')
  })
})

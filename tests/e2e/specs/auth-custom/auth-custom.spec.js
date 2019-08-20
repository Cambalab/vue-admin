const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Custom Auth Test', () => {
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

  /**
   * At the moment, in order to test the custom auth component,
   * it is needed to provide it in the demo app and set this boolean to true
   */
  let hasCustomAuth = true

  function skipIfCustomAuth (testAction) {
    if (hasCustomAuth) {
      testAction()
    }
  }

  beforeEach('Visits the auth url', () => {
    cy.visit(`/#/${view}`)
  })

  it('The url path should be /login', () => {
    skipIfCustomAuth(() =>
      cy.url().should('include', `/${view}`)
    )
  })

  it('Login View should render a title: Sign In', () => {
    skipIfCustomAuth(() => {
      const createViewTitleText = UI_CONTENT.CUSTOM_AUTH_CONTAINER_TITLE
      const createViewTitleContainer = cy.getElement({
        constant: UI_NAMES.CUSTOM_AUTH_CONTAINER_TITLE,
        elementType: 'div',
        elementProp: 'name'
      })

      createViewTitleContainer.should('contain', createViewTitleText)
    })
  })

  it('The {username} input is filled when a user types in', () => {
    skipIfCustomAuth(() => {
      findTypeAndAssert({
        element: UI_NAMES.CUSTOM_AUTH_USERNAME_INPUT,
        value: user.username,
        condition: 'have.value'
      })
    })
  })

  it('The {password} input is filled when a user types in', () => {
    skipIfCustomAuth(() => {
      findTypeAndAssert({
        element: UI_NAMES.CUSTOM_AUTH_PASSWORD_INPUT,
        value: user.username,
        condition: 'have.value'
      })
    })
  })

  it('The Sign In button is disabled when no username and password were given', () => {
    skipIfCustomAuth(() => {
      const button = findButton({ constant: UI_NAMES.CUSTOM_AUTH_SIGN_IN_BUTTON })
      button.should('be.disabled')
    })
  })

  it('When a user types a valid username and password, the button is enabled', () => {
    findTypeAndAssert({
      element: UI_NAMES.CUSTOM_AUTH_USERNAME_INPUT,
      value: user.username,
      condition: 'have.value'
    })
    findTypeAndAssert({
      element: UI_NAMES.CUSTOM_AUTH_PASSWORD_INPUT,
      value: user.password,
      condition: 'have.value'
    })
    const button = findButton({ constant: UI_NAMES.CUSTOM_AUTH_SIGN_IN_BUTTON })
    button.should('be.enabled')
  })
})

const Factory = require('../../factory')
const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Articles: Create Test', () => {
  const resourceName = 'articles'
  const view = 'create'
  const article = {}

  before('Generate an article to create', () => {
    cy.visit(`/#/${resourceName}/${view}`)
    const credentials = Factory.createCredentials()
    cy.authenticate(credentials)
    Object.assign(article, Factory.createArticle())
  })

  it('The url path should be articles/create', () => {
    cy.url().should('include', `${resourceName}/${view}`)
  })

  it('Articles Create View should render title: Articles', () => {
    const createViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName, view })
    const createViewTitleContainer = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE,
      constantParams: { resourceName, view },
      elementType: 'div',
      elementProp: 'name'
    })

    createViewTitleContainer.should('contain', createViewTitleText)
  })

  it('The {Title} input is filled when an user types in', () => {
    theFieldInputIsFilledWhenAnUserTypesIn('title')
  })

  it('The {Content} input is filled when an user types in', () => {
    theFieldInputIsFilledWhenAnUserTypesIn('content')
  })

  it('Articles Create View should redirect to the List View on a create submit', () => {
    const routes = [ { name: view, response: article }, { name: 'list' } ]
    cy.InitServer({ resourceName, routes, response: article })

    const submitButtonText = UI_CONTENT.CREATE_SUBMIT_BUTTON
    const submitButton = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON,
      constantParams: { resourceName, view },
      elementType: 'button',
      elementProp: 'name'
    })

    submitButton.should('contain', submitButtonText).click()

    cy.server({ enable: false })

    cy.url().should('include', '/articles')
  })

  function theFieldInputIsFilledWhenAnUserTypesIn(field) {
    const input = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD,
      constantParams: { resourceName, view, field },
      elementType: 'input',
      elementProp: 'name'
    })

    input.type(article[field])
    input.should('have.value', article[field])
  }
})

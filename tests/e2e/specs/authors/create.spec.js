const Factory = require('../../factory')
const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Authors: Create Test', () => {
  const resourceName = 'authors'
  const view = 'create'
  const author = {}

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Visits the create url', () => {
    cy.visit(`/#/${resourceName}/${view}`)
  })

  before('Generate an author to create', () => {
    Object.assign(author, Factory.createAuthor())
  })

  it('The url path should be authors/create', () => {
    cy.url().should('include', `${resourceName}/${view}`)
  })

  it('Authors Create View should render title: Authors', () => {
    const createViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName, view })
    const createViewTitleContainer = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE,
      constantParams: { resourceName, view },
      elementType: 'div',
      elementProp: 'name'
    })

    createViewTitleContainer.should('contain', createViewTitleText)
  })

  it('The {Name} input is filled when an user types in', () => {
    theFieldInputIsFilledWhenAnUserTypesIn('name')
  })

  it('The {LastName} input is filled when an user types in', () => {
    theFieldInputIsFilledWhenAnUserTypesIn('lastname')
  })

  it('The {Birthdate} input is filled when an user types in', () => {
    theFieldInputIsFilledWhenAnUserTypesIn('birthdate').click()
  })

  it('Authors Create View should redirect to the List View on a create submit', () => {
    const routes = [ { name: view, response: author }, { name: 'list' } ]
    cy.InitServer({ resourceName, routes, response: author })

    const submitButtonText = UI_CONTENT.CREATE_SUBMIT_BUTTON
    const submitButton = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON,
      constantParams: { resourceName, view },
      elementType: 'button',
      elementProp: 'name'
    })

    submitButton.should('contain', submitButtonText).click()

    cy.server({ enable: false })

    cy.url().should('include', '/authors')
  })

  function theFieldInputIsFilledWhenAnUserTypesIn(field) {
    const input = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD,
      constantParams: { resourceName, view, field },
      elementType: 'input',
      elementProp: 'name'
    })

    input.type(author[field])
    input.should('have.value', author[field])

    return input
  }
})

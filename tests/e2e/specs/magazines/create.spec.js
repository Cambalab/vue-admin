const Factory = require('../../factory')
const { queryElementByProp } = require('../../helpers')

const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Magazines: Create Action Test', () => {
  const magazine = Factory.createMagazine()

  before('Visits the app root url', () => {
    cy.visit('/#/magazines/create')
  })

  it('The url path should be magazines/create', () => {
    cy.url().should('include', 'magazines/create')
  })

  it('The Name input is filled when a user types in', () => {
    // Generates the name property value
    const nameInputName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
      resourceName: 'magazines',
      view: 'create',
      field: 'name'
    })
    // Generates the cypress query
    const inputElement = queryElementByProp({
      type: 'input',
      prop: 'name',
      value: nameInputName
    })
    // Gets the input element
    const input = cy.get(inputElement)
    // Types in the magazine name
    input.type(magazine.name)
    // Asserts the input contains the name
    input.should('have.value', magazine.name)
  })

  it('The Issue input is filled when user types in', () => {
    // Generates the name property value
    const issueInputName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
      resourceName: 'magazines',
      view: 'create',
      field: 'issue'
    })
    // Generates the cypress query
    const inputElement = queryElementByProp({
      type: 'input',
      prop: 'name',
      value: issueInputName
    })
    // Gets the input element
    const input = cy.get(inputElement)
    // Types in the magazine issue
    input.type(magazine.issue)
    // Asserts the input contains the issue
    input.should('have.value', magazine.issue)
  })

  it('The Publisher input is filled when user types in', () => {
    // Generates the name property value
    const publisherInputName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
      resourceName: 'magazines',
      view: 'create',
      field: 'publisher'
    })
    // Generates the cypress query
    const inputElement = queryElementByProp({
      type: 'input',
      prop: 'name',
      value: publisherInputName
    })
    // Gets the input element
    const input = cy.get(inputElement)
    // Types in the magazine publisher
    input.type(magazine.publisher)
    // Asserts the input contains the publisher
    input.should('have.value', magazine.publisher)
  })

  it('A magazine is created when the user submits the form', () => {
    // Generates the name property value
    const submitButtonName = UI_NAMES.RESOURCE_CREATE_SUBMIT_BUTTON.with({
      resourceName: 'magazines',
      view: 'create'
    })
    // Generates the cypress query
    const buttonElement = queryElementByProp({
      type: 'button',
      prop: 'name',
      value: submitButtonName
    })
    // Gets the button element
    cy.get(buttonElement).click()
    // Asserts the router redirected to /magazines
    cy.url().should('include', '/magazines')
  })
})

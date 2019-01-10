const Factory = require('../../factory')

const { InitEntityUtils } = require('../../lib/commands')

describe('Magazines: Create Action Test', () => {
  const resourceName = 'magazines'
  const view = 'create'
  const magazine = Factory.createMagazine()
  const utils = InitEntityUtils({
    resourceName,
    view
  })

  before('Visits the magazines create url', () => {
    cy.visit(`/#/${resourceName}/${view}`)
  })

  it('The url path should be magazines/create', () => {
    cy.url().should('include', `${resourceName}/${view}`)
  })

  it('The {Name} input is filled when a user types in', () => {
    // Setup: Gets the 'name' input element
    const input = utils.getInputBy({ field: 'name' })
    // Excersice: Types in the magazine name
    input.type(magazine.name)
    // Assertion: the input contains the magazine issue content
    input.should('have.value', magazine.name)
  })

  it('The {Issue} input is filled when user types in', () => {
    // Setup: Gets the 'issue' input element
    const input = utils.getInputBy({ field: 'issue' })
    // Excersice: Types in the magazine issue
    input.type(magazine.issue)
    // Assertion: the input contains the magazine issue content
    input.should('have.value', magazine.issue)
  })

  it('The {Publisher} input is filled when user types in', () => {
    // Setup: Gets the 'publisher' input element
    const input = utils.getInputBy({ field: 'publisher' })
    // Excersice: Types in the magazine publisher
    input.type(magazine.publisher)
    // Assertion: the input contains the magazine publisher content
    input.should('have.value', magazine.publisher)
  })

  it('A magazine is created when the user submits the form', () => {
    // Setup: Gets the submit button element
    const button = utils.getSubmitButton({ submitType: 'create' })
    // Excersice: Creates a new magazine
    button.click()
    // Assertion: The router redirects to /magazines
    cy.url().should('include', `/${resourceName}`)
  })
})

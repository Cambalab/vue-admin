const Factory = require('../../factory')

const { InitEntityUtils } = require('../../lib/commands')

describe('Magazines: Edit Action Test', () => {
  const resourceName = 'magazines'
  const view = 'edit'
  let magazine
  const updatedMagazine = Factory.createMagazine()
  const utils = InitEntityUtils({
    resourceName,
    view
  })

  before('Creates a new magazine', () => {
    const url = Factory.apiUrl({ route: `api/${resourceName}/` })
    cy.request('POST', url, Factory.createMagazine())
      .then((res) => { magazine = res.body })
  })

  before('Visits the magazines list', () => {
    // FIXME: Workaround until we fix the edit path push when the store is empty
    cy.visit(`/#/${resourceName}/`)
  })

  it('Visits the magazines edit url and the path should be magazines/edit', () => {
    cy.visit(`/#/${resourceName}/${view}/${magazine.id}`)
    cy.url().should('include', `${resourceName}/${view}`)
  })

  it('The {Name} input should match the created magazine {name}', () => {
    // Setup: Gets the 'name' input element
    const input = utils.getInputBy({ field: 'name' })
    // Assertion: the input contains the magazine issue content
    input.should('have.value', magazine.name)
  })

  it('The {Name} input is updated when a user types in', () => {
    // Setup: Gets the 'name' input element
    const input = utils.getInputBy({ field: 'name' })
    // Excersice: Clears the input and types in the magazine name
    input.clear().type(updatedMagazine.name)
    // Assertion: the input contains the magazine issue content
    input.should('have.value', updatedMagazine.name)
  })

  it('The {Issue} input should match the created magazine {issue}', () => {
    // Setup: Gets the 'issue' input element
    const input = utils.getInputBy({ field: 'issue' })
    // Assertion: the input contains the magazine issue content
    input.should('have.value', magazine.issue)
  })

  it('The {Issue} input is updated when user types in', () => {
    // Setup: Gets the 'issue' input element
    const input = utils.getInputBy({ field: 'issue' })
    // Clears the input and types in the magazine issue
    input.focus()
    input.clear().type(updatedMagazine.issue)
    // Assertion: the input contains the magazine issue content
    input.should('have.value', updatedMagazine.issue)
  })

  it('The {Publisher} input should match the created magazine {publisher}', () => {
    // Setup: Gets the 'publisher' input element
    const input = utils.getInputBy({ field: 'publisher' })
    // Assertion: the input contains the magazine publisher content
    input.should('have.value', magazine.publisher)
  })

  it('The {Publisher} input is updated when user types in', () => {
    // Setup: Gets the 'publisher' input element
    const input = utils.getInputBy({ field: 'publisher' })
    // Clears the input and types in the magazine publisher
    input.clear().type(updatedMagazine.publisher)
    // Assertion: the input contains the magazine publisher content
    input.should('have.value', updatedMagazine.publisher)
  })

  it('A magazine is updated when the user submits the form', () => {
    // Setup: Gets the submit button element
    const button = utils.getSubmitButton({ submitType: 'edit' })
    // Excersice: Updates a magazine
    button.click()
    // Assertion: The router redirects to /magazines
    cy.url().should('include', `/${resourceName}`)
  })
})

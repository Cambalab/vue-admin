const Factory = require('../../factory')

const { InitEntityUtils } = require('../../lib/commands')

describe('Magazines: Show Action Test', () => {
  const resourceName = 'magazines'
  const view = 'show'
  let magazine
  const utils = InitEntityUtils({
    resourceName,
    view
  })

  before('Creates a new magazine', () => {
    const url = Factory.apiUrl({ route: `api/${resourceName}/` })
    cy.request('POST', url, Factory.createMagazine()).
    then((res) => { magazine = res.body })
  })

  before('Visits the magazines list', () => {
    // FIXME: Workaround until we fix the edit path push when the store is empty
    cy.visit(`/#/${resourceName}/`)
  })

  it('Visits the magazines show url and the path should be magazines/show', () => {
    cy.visit(`/#/${resourceName}/${view}/${magazine.id}`)
    cy.url().should('include', `${resourceName}/${view}`)
  })

  it('The {Name} input should match the created magazine {name}', () => {
    // Setup: Gets the 'name' input element
    const input = utils.getInputBy({ field: 'name' })
    // Assertion: the input contains the magazine issue content
    input.should('have.value', magazine.name)
  })

  it('The {Issue} input should match the created magazine {issue}', () => {
    // Setup: Gets the 'issue' input element
    const input = utils.getInputBy({ field: 'issue' })
    // Assertion: the input contains the magazine issue content
    input.should('have.value', magazine.issue)
  })

  it('The {Publisher} input should match the created magazine {publisher}', () => {
    // Setup: Gets the 'publisher' input element
    const input = utils.getInputBy({ field: 'publisher' })
    // Assertion: the input contains the magazine publisher content
    input.should('have.value', magazine.publisher)
  })
})

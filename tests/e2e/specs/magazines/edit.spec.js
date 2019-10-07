const Factory = require('../../factory')

const { InitEntityUtils } = require('../../lib/commands')

describe('Magazines: Edit Action Test', () => {
  const resourceName = 'magazines'
  const view = 'edit'
  const magazine = {}
  const newMagazine = Factory.createMagazine()
  const utils = InitEntityUtils({
    resourceName,
    view,
  })

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Search a magazine to edit', () => {
    cy.fixture(resourceName).then(fixture => {
      Object.assign(magazine, fixture[0])
      newMagazine.id = magazine.id
    })
  })

  before('Initialises the mocked server and visits the edit url', () => {
    const response = magazine
    const routes = [{ name: 'edit', response }, { name: 'show', response }]

    cy.InitServer({ resourceName, routes })
    cy.visit(`/#/${resourceName}/edit/${magazine.id}`)
    cy.server({ enable: false })
  })

  it('Visits the magazines edit url and the path should be magazines/edit', () => {
    // Assertion: the url should match the edit view url
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
    // Exercise: Clears the input and types in the magazine name
    input.clear().type(newMagazine.name)
    // Assertion: the input contains the magazine issue content
    input.should('have.value', newMagazine.name)
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
    input.clear().type(newMagazine.issue)
    // Assertion: the input contains the magazine issue content
    input.should('have.value', newMagazine.issue)
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
    input.clear().type(newMagazine.publisher)
    // Assertion: the input contains the magazine publisher content
    input.should('have.value', newMagazine.publisher)
  })

  it('A magazine is updated when the user submits the form', () => {
    const routes = [
      { name: view, response: newMagazine },
      { name: 'show', response: newMagazine },
    ]
    cy.InitServer({ resourceName, routes })
    // Setup: Gets the submit button element
    const button = utils.getSubmitButton({ submitType: 'edit' })
    // Exercise: Updates a magazine
    button.click()
    // Waits for API response
    cy.wait(`@${resourceName}/update`).then(xmlHttpRequest => {
      const _newMagazine = xmlHttpRequest.response.body
      // Assertion: The updated magazine is equal to the setup magazine
      expect(_newMagazine).to.deep.equal(newMagazine)
      // Assertion: The view is redirected to magazines/show
      cy.url().should('include', `/${resourceName}/show/${_newMagazine.id}`)
    })
    cy.server({ enable: false })
  })
})

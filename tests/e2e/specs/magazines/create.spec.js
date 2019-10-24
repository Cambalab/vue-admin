const Factory = require('../../factory')

const { InitEntityUtils } = require('../../lib/commands')

describe('Magazines: Create Action Test', () => {
  const resourceName = 'magazines'
  const view = 'create'
  const magazine = Factory.createMagazine()
  const utils = InitEntityUtils({
    resourceName,
    view,
  })

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Visits the magazines create url', () => {
    cy.visit(`/#/${resourceName}/${view}`)
  })

  after('Shuts down the server', () => {
    cy.server({ enable: false })
  })

  it('The url path should be magazines/create', () => {
    cy.url().should('include', `${resourceName}/${view}`)
  })

  it('The {Name} input is filled when a user types in', () => {
    // Setup: Gets the 'name' input element
    const input = utils.getInputBy({ field: 'name' })
    // Exercise: Types in the magazine name
    input.type(magazine.name)
    // Assertion: the input contains the magazine issue content
    input.should('have.value', magazine.name)
  })

  it('The {Issue} input is filled when user types in', () => {
    // Setup: Gets the 'issue' input element
    const input = utils.getInputBy({ field: 'issue' })
    // Exercise: Types in the magazine issue
    input.type(magazine.issue)
    // Assertion: the input contains the magazine issue content
    input.should('have.value', magazine.issue)
  })

  it('The {Publisher} input is filled when user types in', () => {
    // Setup: Gets the 'publisher' input element
    const input = utils.getInputBy({ field: 'publisher' })
    // Exercise: Types in the magazine publisher
    input.type(magazine.publisher)
    // Assertion: the input contains the magazine publisher content
    input.should('have.value', magazine.publisher)
  })

  it('A magazine is created when the user submits the form', () => {
    // Setup: Initialises the server before the create request request
    const routes = [{ name: 'create', response: magazine }, { name: 'list' }]
    cy.InitServer({ resourceName, routes, response: magazine })
    // Setup: Gets the submit button element
    const button = utils.getSubmitButton({ submitType: 'create' })
    // Exercise: Creates a new magazine
    button.click()
    // Assertion: The router redirects to /magazines
    cy.wait(`@${resourceName}/${view}`).then(xmlHttpRequest => {
      const newMagazine = xmlHttpRequest.response.body
      expect(xmlHttpRequest.status).to.equal(201)
      expect(newMagazine).to.deep.equal(magazine)
    })
    // Assertion: The magazine exists in the list
    cy.wait(`@${resourceName}/list`).then(xmlHttpRequest => {
      const newMagazine = xmlHttpRequest.response.body.find(_magazine => {
        return _magazine.id === magazine.id
      })
      // Assertion: The updated magazine is equal to the setup magazine
      expect(newMagazine).to.deep.equal(magazine)
      // Assertion: The view is redirected to the list
      cy.url().should('include', `/${resourceName}`)
    })
  })
})

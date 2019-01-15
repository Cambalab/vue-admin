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

  before('Initialises the server', () => {
    const routes = [{ name: 'list' }]
    cy.InitServer({ resourceName, routes })
  })

  before('Visits the magazines list', () => {
    // FIXME: Workaround until we can access the edit route without going to /{resourceName}/
    cy.visit(`/#/${resourceName}/`)
    cy.wait(`@${resourceName}/list`).then(xmlHttpRequest => {
      // Takes the first element of the list to edit
      magazine = xmlHttpRequest.response.body[0]
      // Sets the original id to the new magazine to redirect on edition submit
      updatedMagazine.id = magazine.id
    })
    cy.server({ enable: false })
  })

  it('Visits the magazines edit url and the path should be magazines/edit', () => {
    // Exercise: visits the edit view
    cy.visit(`/#/${resourceName}/${view}/${magazine.id}`)
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
    const routes = [{ name: view, response: updatedMagazine }]
    cy.InitServer({ resourceName, routes })
    // Setup: Gets the submit button element
    const button = utils.getSubmitButton({ submitType: 'edit' })
    // Exercise: Updates a magazine
    button.click()
    // Waits for API response
    cy.wait(`@${resourceName}/update`).then(xmlHttpRequest => {
      const _updatedMagazine = xmlHttpRequest.response.body
      // Assertion: The updated magazine is equal to the setup magazine
      expect(_updatedMagazine).to.deep.equal(updatedMagazine)
      // Assertion: The view is redirected to magazines/show
      cy.url().should('include', `/${resourceName}`)
    })
  })
})

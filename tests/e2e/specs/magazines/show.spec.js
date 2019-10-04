const { InitEntityUtils } = require('../../lib/commands')

describe('Magazines: Show Action Test', () => {
  const resourceName = 'magazines'
  const view = 'show'
  const magazine = {}
  const utils = InitEntityUtils({
    resourceName,
    view,
  })

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Search a magazine to show', () => {
    cy.fixture(resourceName).then(fixture => {
      // Takes the first element of the fixture to use as subject
      Object.assign(magazine, fixture[0])
    })
  })

  before('Initialises the server', () => {
    // Inits the server with a stubbed get endpoint
    const routes = [{ name: view, response: magazine }]
    cy.InitServer({ resourceName, routes })
  })

  it('Visits the magazines show url and the path should be magazines/show/:id', () => {
    // Exercise: visits the show view
    cy.visit(`/#/${resourceName}/${view}/${magazine.id}`)
    cy.server({ enable: false })
    // Assertion: the url should match the show view url
    cy.url().should('include', `${resourceName}/${view}/${magazine.id}`)
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

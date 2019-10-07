const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Articles: Delete Test', () => {
  const resourceName = 'articles'
  const article = {}

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Search an article to delete', () => {
    cy.fixture(resourceName).then(fixture => {
      Object.assign(article, fixture[0])
    })
  })

  before('Initialises the server', () => {
    const routes = [{ name: 'show', response: article }]
    cy.InitServer({ resourceName, routes })
  })

  before('Visits the Show view url', () => {
    const showUrl = `${resourceName}/show/${article.id}`
    cy.visit(`/#/${showUrl}`)
    cy.url().should('include', showUrl)
    cy.server({ enable: false })
  })

  it('Press the delete button in the Show view', () => {
    const routes = [{ name: 'delete', response: article }, { name: 'list' }]
    cy.InitServer({ resourceName, routes })
    const deleteButton = cy.getElement({
      constant: UI_NAMES.RESOURCE_DELETE_BUTTON,
      constantParams: { resourceName },
      elementType: 'button',
      elementProp: 'name',
    })

    deleteButton.click()
    cy.server({ enable: false })

    cy.wait(`@${resourceName}/delete/${article.id}`).then(xmlHttpRequest => {
      expect(xmlHttpRequest.status).equal(202)
      cy.url().should('include', `/${resourceName}`)
    })
  })
})

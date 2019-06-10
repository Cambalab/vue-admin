const Factory = require('../../factory')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Spinner on a Edit View Test', () => {

  const resourceName = 'articles'
  const view = 'edit'
  const article = {}
  const newArticle = Factory.createArticle()

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Search an article to edit', () => {
    cy.fixture(resourceName).then(fixture => {
      Object.assign(article, fixture[0])
      newArticle.id = article.id
    })
  })

  before('Initialises the mocked serve and visits the edit url', () => {
    const response = article
    const routes = [
      { name: 'edit', response },
      { name: 'show', response }
    ]

    cy.InitServer({ resourceName, routes })
    cy.visit(`/#/${resourceName}/${view}/${article.id}`)
    cy.server({ enable: false })
  })

  it('The spinner should not be visualized when the store property isLoading is set to false', () => {
    const isLoading = false
    cy.getStore().invoke('commit', 'requests/setLoading', { isLoading })

    const spinnerContainer = cy.getElement({
      constant: UI_NAMES.SPINNER_CONTAINER,
      elementType: 'div',
      elementProp: 'id'
    })

    spinnerContainer.should('not.be.visible')
  })

  it('The spinner should be visualized when the store property isLoading is set to true', () => {
    const isLoading = true
    cy.getStore().invoke('commit', 'requests/setLoading', { isLoading })

    const spinnerContainer = cy.getElement({
      constant: UI_NAMES.SPINNER_CONTAINER,
      elementType: 'div',
      elementProp: 'id'
    })

    spinnerContainer.should('be.visible')
  })

})

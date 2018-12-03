// https://docs.cypress.io/api/introduction/api.html

const Factory = require('../factory')
const UI_CONTENT = require('../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../src/constants/ui.element.names')

describe('Create Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/#/articles/create')
  })

  it('Articles Create View should render title: articles resource: create operation', () => {
    const createViewContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
      resourceName: 'articles',
      view: 'create'
    })
    cy.get(`div[name=${createViewContainerName}]`).should((createViewContainer) => {
      const createViewTitleContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
        resourceName: 'articles',
        view: 'create'
      })
      const createViewTitleContainer = createViewContainer.find(`[name=${createViewTitleContainerName}]`)
      const createViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({
        resourceName: 'articles',
        view: 'create'
      })

      expect(createViewTitleContainer).to.contain(createViewTitleText)
    })
  })

  it('Articles Create View should redirect to the List View on an create submit', () => {
    // Creates an article
    const article = Factory.createArticle({ id: 4 })
    {
      // Inputs the article title
      const titleInputName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
        resourceName: 'articles',
        view: 'create',
        field: 'title'
      })
      cy.get(`input[name=${titleInputName}]`).type(article.title)
    }
    {
      // Inputs the article content
      const contentInputName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
        resourceName: 'articles',
        view: 'create',
        field: 'content'
      })
      cy.get(`input[name=${contentInputName}]`).type(article.content)
    }
  })
})

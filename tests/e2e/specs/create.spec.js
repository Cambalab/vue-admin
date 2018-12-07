// https://docs.cypress.io/api/introduction/api.html

const Factory = require('../factory')
const UI_CONTENT = require('../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../src/constants/ui.element.names')

describe('Create Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/#/articles/create')
  })

  it('Articles Create View should render title: Articles', () => {
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
        resourceName: 'articles'
      })

      expect(createViewTitleContainer).to.contain(createViewTitleText)
    })
  })

  it('Articles Create View should redirect to the List View on an create submit', () => {
    // Creates an article
    const article = Factory.createArticle()
    {
      // Inputs the article title
      const titleInputName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
        resourceName: 'articles',
        view: 'create',
        field: 'title'
      })
      const input = cy.get(`input[name=${titleInputName}]`)

      // Types in the article title
      input.type(article.title)
      // Asserts the input contains the content
      input.should('have.value', article.title)
    }
    {
      // Inputs the article content
      const contentInputName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
        resourceName: 'articles',
        view: 'create',
        field: 'content'
      })
      const input = cy.get(`input[name=${contentInputName}]`)

      // Types in the article content
      input.type(article.content)
      // Asserts the input contains the content
      input.should('have.value', article.content)
    }
    {
      const submitButtonName = UI_NAMES.RESOURCE_CREATE_SUBMIT_BUTTON.with({
        resourceName: 'articles',
        view: 'create'
      })

      cy.get(`button[name=${submitButtonName}]`).should((submitButton) => {
        const submitButtonText = UI_CONTENT.CREATE_SUBMIT_BUTTON

        expect(submitButton).to.contain(submitButtonText)
      }).click()

      cy.url().should('eq', 'http://localhost:8081/#/articles')
    }
  })
})

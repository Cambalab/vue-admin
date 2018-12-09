// https://docs.cypress.io/api/introduction/api.html

const UI_CONTENT = require('../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../src/constants/ui.element.names')

describe('List Test', () => {
  it('Visits the List View', () => {
    cy.visit('/#/articles')

    cy.url().should('include', '/articles')
  })

  it('Articles List View should render title', () => {
    const listViewContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
      resourceName: 'articles',
      view: 'list'
    })
    cy.get(`div[name=${listViewContainerName}]`).should((listViewContainer) => {
      const listViewTitleContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
        resourceName: 'articles',
        view: 'list'
      })
      const listViewTitleContainer = listViewContainer.find(`[name=${listViewTitleContainerName}]`)
      const listViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({
        resourceName: 'articles'
      })

      expect(listViewTitleContainer).to.contain(listViewTitleText)
    })
  })

  it('Articles List View should render a create button', () => {
    const createButtonName = UI_NAMES.RESOURCE_CREATE_BUTTON.with({
      resourceName: 'articles'
    })
    cy.get(`a[name="${createButtonName}"]`).should((createButtonLink) => {
      const createButtonText = UI_CONTENT.RESOURCE_CREATE_BUTTON

      expect(createButtonLink).to.contain(createButtonText)
    })
  })

  it('Articles List View should render three articles links with ids', () => {
    const articlesIndexes = [0, 1, 2];
    articlesIndexes.forEach((articleIndex) => {
      const listContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
        resourceName: 'articles',
        view: 'list'
      })
      cy.get(`div[name=${listContainerName}]`).should((listElementContainer) => {
        const listElementFieldName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
          resourceName: 'articles',
          view: 'list',
          field: 'id',
          index: articleIndex
        })
        const listElementFieldId = listElementContainer.find(`a[name=${listElementFieldName}]`)
        const listElementFieldIdText = articleIndex + 1

        expect(listElementFieldId).to.contain(listElementFieldIdText)
      })
    })
  })

  it('Articles List View should go to the Create View when the Create button is clicked', () => {
    const createButtonName = UI_NAMES.RESOURCE_CREATE_BUTTON.with({
      resourceName: 'articles'
    })

    cy.get(`a[name="${createButtonName}"]`).should((createButtonLink) => {
      const createButtonText = UI_CONTENT.RESOURCE_CREATE_BUTTON

      expect(createButtonLink).to.contain(createButtonText)
      // We force click the button because it's width is 0 - santiago
    }).click({ force: true })

    cy.url().should('include', '/articles/create')
  })
})

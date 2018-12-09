// https://docs.cypress.io/api/introduction/api.html

const { queryElementByProp } = require('../helpers')

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
    const listViewContainerElement = queryElementByProp({
      type: 'div',
      prop: 'name',
      value: listViewContainerName
    })

    const expectedListViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({
      resourceName: 'articles'
    })

    cy.get(listViewContainerElement).should((listViewContainer) => {
      const listViewTitleContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
        resourceName: 'articles',
        view: 'list'
      })
      const listViewTitleContainerElement = queryElementByProp({
        prop: 'name',
        value: listViewTitleContainerName
      })
      const listViewTitleContainer = listViewContainer.find(listViewTitleContainerElement)

      expect(listViewTitleContainer).to.contain(expectedListViewTitleText)
    })
  })

  it('Articles List View should render a create button', () => {
    const createButtonName = UI_NAMES.RESOURCE_CREATE_BUTTON.with({
      resourceName: 'articles'
    })
    const createButtonElement = queryElementByProp({
      type: 'a',
      prop: 'name',
      value: createButtonName
    })

    const expectedCreateButtonText = UI_CONTENT.RESOURCE_CREATE_BUTTON

    cy.get(createButtonElement).should((createButtonLink) => {
      expect(createButtonLink).to.contain(expectedCreateButtonText)
    })
  })

  it('Articles List View should render three articles links with ids', () => {
    const articlesIndexes = [0, 1, 2];
    articlesIndexes.forEach((articleIndex) => {
      const listContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
        resourceName: 'articles',
        view: 'list'
      })
      const listContainerElement = queryElementByProp({
        type: 'div',
        prop: 'name',
        value: listContainerName
      })

      const expectedListElementFieldIdText = articleIndex + 1

      cy.get(listContainerElement).should((listElementContainer) => {
        const listElementFieldName = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
          resourceName: 'articles',
          view: 'list',
          field: 'id',
          index: articleIndex
        })
        const listElementFieldElement = queryElementByProp({
          type: 'a',
          prop: 'name',
          value: listElementFieldName
        })
        const listElementFieldId = listElementContainer.find(listElementFieldElement)

        expect(listElementFieldId).to.contain(expectedListElementFieldIdText)
      })
    })
  })

  it('Articles List View should go to the Create View when the Create button is clicked', () => {
    const createButtonName = UI_NAMES.RESOURCE_CREATE_BUTTON.with({
      resourceName: 'articles'
    })

    const createButtonElement = queryElementByProp({
      type: 'a',
      prop: 'name',
      value: createButtonName
    })

    const expectedCreateButtonText = UI_CONTENT.RESOURCE_CREATE_BUTTON

    cy.get(createButtonElement).should((createButtonLink) => {

      expect(createButtonLink).to.contain(expectedCreateButtonText)
      // We force click the button because it's width is 0 - santiago
    }).click({ force: true })

    cy.url().should('include', '/articles/create')
  })
})

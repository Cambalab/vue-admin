// https://docs.cypress.io/api/introduction/api.html

const { queryElementByProp } = require('../helpers')

const UI_CONTENT = require('../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../src/constants/ui.element.names')

let article = {}
let fieldsContainer = ''

describe('Show Test', () => {

  it('Search the Show view url', () => {
    cy.request('POST', 'http://localhost:8080/api/articles/', { title: "Article's title", content: "Article's content"}).then((res) => {
      article = res.body
    })
  })

  it('Visits the Show view url', () => {
    const url = `articles/show/${article.id}`

    cy.visit(`/#/${url}`)

    cy.url().should('include', url)
  })

  it('Articles Show View should render title: Articles', () => {
    const showViewContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
      resourceName: 'articles',
      view: 'show'
    })

    const showViewContainerElement = queryElementByProp({
      type: 'div',
      prop: 'name',
      value: showViewContainerName
    })

    cy.get(showViewContainerElement).should((showViewContainer) => {
      const showViewTitleContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE.with({
        resourceName: 'articles',
        view: 'show'
      })
      const showViewTitleContainerElement = queryElementByProp({
        prop: 'name',
        value: showViewTitleContainerName
      })

      const showViewTitleContainer = showViewContainer.find(showViewTitleContainerElement)
      const showViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({
        resourceName: 'articles'
      })

      expect(showViewTitleContainer).to.contain(showViewTitleText)
    })
  })

  it('Articles Show View should contain a fields container', () => {
    const fieldsContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELDS.with({
      resourceName: 'articles',
      view: 'show'
    })

    fieldsContainer = queryElementByProp({
      type: 'div',
      prop: 'name',
      value: fieldsContainerName
    })

    expect(fieldsContainer).to.not.empty
  })

  it('Articles Show View should contain the id field', () => {
    cy.get(fieldsContainer).should((fieldsContainer) => {
      const idFieldContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({
        resourceName: 'articles',
        view: 'show',
        field: 'id'
      })
      const idContainerElement = queryElementByProp({
        prop: 'name',
        value: idFieldContainerName
      })

      const idContainer = fieldsContainer.find(idContainerElement)

      expect(idContainer).to.contain(article.id)
    })
  })

  it('Articles Show View should contain the title field', () => {
    cy.get(fieldsContainer).should((fieldsContainer) => {
      const titleFieldContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({
        resourceName: 'articles',
        view: 'show',
        field: 'title'
      })
      const titleContainerElement = queryElementByProp({
        prop: 'name',
        value: titleFieldContainerName
      })

      const titleContainer = fieldsContainer.find(titleContainerElement)

      expect(titleContainer).to.contain(article.title)
    })
  })

  it('Articles Show View should contain the content field', () => {
    cy.get(fieldsContainer).should((fieldsContainer) => {
      const contentFieldContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({
        resourceName: 'articles',
        view: 'show',
        field: 'content'
      })
      const contentContainerElement = queryElementByProp({
        prop: 'name',
        value: contentFieldContainerName
      })

      const contentContainer = fieldsContainer.find(contentContainerElement)

      expect(contentContainer).to.contain(article.content)
    })
  })

})

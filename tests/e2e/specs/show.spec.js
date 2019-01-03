// https://docs.cypress.io/api/introduction/api.html

const Factory = require('../factory')
const { queryElementByProp } = require('../helpers')

const UI_CONTENT = require('../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../src/constants/ui.element.names')

describe('Show Test', () => {
  let article = {}

  before('Search the Show view url', () => {
    cy.request('POST', Factory.apiUrl(), Factory.createArticle()).
    then((res) => { article = res.body })
  })

  it('Visits the Show view url', () => {
    const url = `articles/show/${article.id}`
    cy.visit(`/#/${url}`)
    cy.url().should('include', url)
  })

  it('Articles Show View should render title: Articles', () => {
    cy.get(queryToElement('RESOURCE_VIEW_CONTAINER')).should((showViewContainer) => {
      const showViewTitleContainer = showViewContainer.find(queryToElement('RESOURCE_VIEW_CONTAINER_TITLE'))
      const showViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName: 'articles' })
      expect(showViewTitleContainer).to.contain(showViewTitleText)
    })
  })

  it('Articles Show View should contain the id field', () => {
    articlesShowViewShouldContainTheField('id')
  })

  it('Articles Show View should contain the title field', () => {
    articlesShowViewShouldContainTheField('title')
  })

  it('Articles Show View should contain the content field', () => {
    articlesShowViewShouldContainTheField('content')
  })

  /**
  * Helper functions
  **/
  function queryToElementWith(containerType, containerParams){
    const containerName = UI_NAMES[containerType].with(containerParams)
    return queryElementByProp({
      type: 'div',
      prop: 'name',
      value: containerName
    })
  }

  function queryToElement(containerType) {
    return queryToElementWith(containerType, {
      resourceName: 'articles',
      view: 'show'
    })
  }

  function articlesShowViewShouldContainTheField(field) {
    cy.get(queryToElement('RESOURCE_VIEW_CONTAINER_FIELDS')).
    should((fieldsContainerRes) => {
      const fieldContainerElement = queryToElementWith('RESOURCE_VIEW_CONTAINER_FIELD', {
        resourceName: 'articles',
        view: 'show',
        field: field
      })
      const fieldContainer = fieldsContainerRes.find(fieldContainerElement)
      expect(fieldContainer).to.contain(article[field])
    })
  }
})

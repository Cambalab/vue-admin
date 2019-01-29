const { queryElementByProp } = require('../../helpers')
const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Articles: Show Test', () => {
  const resourceName = 'articles'
  const view = 'show'
  const article = {}

  before('Search an article to show', () => {
    cy.fixture(resourceName).then(fixture => {
      Object.assign(article, fixture[0])
    })
  })

  before('Initialises the server', () => {
    const routes = [{ name: view, response: article }]
    cy.InitServer({ resourceName, routes })
  })

  it('Visits the articles show', () => {
    cy.visit(`/#/${resourceName}/${view}/${article.id}`)
    cy.server({ enable: false })
    cy.url().should('include', `${resourceName}/${view}/${article.id}`)
  })

  it('Articles Show View should render title: Articles', () => {
    const showViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName })

    cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE,
      constantParams: { resourceName, view },
      elementType: 'div',
      elementProp: 'name'
    }).should('contain', showViewTitleText)
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
    return queryToElementWith(containerType, { resourceName, view })
  }

  function articlesShowViewShouldContainTheField(field) {
    cy.get(queryToElement('RESOURCE_VIEW_CONTAINER_FIELDS'))
      .should((fieldsContainerRes) => {
        const fieldContainerElement = queryToElementWith('RESOURCE_VIEW_CONTAINER_FIELD', {
          resourceName,
          view,
          field
        })
        const fieldContainer = fieldsContainerRes.find(fieldContainerElement)
        expect(fieldContainer).to.contain(article[field])
      })
  }
})

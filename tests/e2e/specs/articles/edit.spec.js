const Factory = require('../../factory')
const { InitEntityUtils } = require('../../lib/commands')

const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Articles: Edit Test', () => {
  const resourceName = 'articles'
  const view = 'edit'
  const article = {}
  const newArticle = Factory.createArticle()
  const utils = InitEntityUtils({ resourceName, view })

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
    const routes = [{ name: 'edit', response }, { name: 'show', response }]

    cy.InitServer({ resourceName, routes })
    cy.visit(`/#/${resourceName}/edit/${article.id}`)
    cy.server({ enable: false })
  })

  it('Articles Edit should render title: Edit Article', () => {
    const editViewTitleText = 'Edit Article'
    const editViewTitleContainer = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE,
      constantParams: { resourceName, view },
      elementType: 'div',
      elementProp: 'name',
    })

    editViewTitleContainer.should('contain', editViewTitleText)
  })

  it('Articles Edit view should contain a title field', () => {
    articlesEditViewShouldContainsTheField('title', article.title)
  })

  it('Articles Edit view should contain a content field', () => {
    articlesEditViewShouldContainsTheField('content', article.content)
  })

  it('Articles Edit view should edit a title field', () => {
    editField('title', newArticle.title)
    articlesEditViewShouldContainsTheField('title', newArticle.title)
  })

  it('Articles Edit view should edit a content field', () => {
    editField('content', newArticle.content)
    articlesEditViewShouldContainsTheField('content', newArticle.content)
  })

  it('An article is updated when the user submits the form', () => {
    const routes = [
      { name: view, response: newArticle },
      { name: 'show', response: newArticle },
    ]
    cy.InitServer({ resourceName, routes })

    const button = utils.getSubmitButton({ submitType: view })
    button.click()

    cy.wait(`@${resourceName}/update`).then(xmlHttpRequest => {
      const _newArticle = xmlHttpRequest.response.body
      expect(_newArticle).to.deep.equal(newArticle)
      cy.url().should('include', `/${resourceName}/show/${_newArticle.id}`)
    })
    cy.server({ enable: false })
  })

  /**
   * Helper functions
   **/

  function editField(field, content) {
    queryToField(field)
      .focus()
      .clear()
      .type(content)
  }

  function queryToField(field) {
    return cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD,
      constantParams: { resourceName, view, field },
      elementType: 'input',
      elementProp: 'name',
    })
  }

  function articlesEditViewShouldContainsTheField(field, expectedContent) {
    queryToField(field).should('have.value', expectedContent)
  }
})

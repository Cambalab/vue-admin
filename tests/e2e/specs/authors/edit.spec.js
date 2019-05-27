const Factory = require('../../factory')
const { InitEntityUtils } = require('../../lib/commands')

const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')

describe('Authors: Edit Test', () => {

  const resourceName = 'authors'
  const view = 'edit'
  const author = {}
  const newAuthor = Factory.createAuthor()
  const utils = InitEntityUtils({ resourceName, view })

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Search an author to edit', () => {
    cy.fixture(resourceName).then(fixture => {
      Object.assign(author, fixture[0])
      newAuthor.id = author.id
    })
  })

  before('Initialises the mocked serve and visits the edit url', () => {
    const response = author
    const routes = [
      { name: 'edit', response },
      { name: 'show', response }
    ]

    cy.InitServer({ resourceName, routes })
    cy.visit(`/#/${resourceName}/edit/${author.id}`)
    cy.server({ enable: false })
  })

  it('Authors Edit should render title: Authors', () => {
    const editViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName, view })
    const editViewTitleContainer = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE,
      constantParams: { resourceName, view },
      elementType: 'div',
      elementProp: 'name'
    })

    editViewTitleContainer.should('contain', editViewTitleText)
  })

  it('Authors Edit view should contain a name field', () => {
    articlesEditViewShouldContainsTheField('name', author.name)
  })

  it('Authors Edit view should contain a lastname field', () => {
    articlesEditViewShouldContainsTheField('lastname', author.lastname)
  })

  it('Authors Edit view should contain a birthdate field', () => {
    articlesEditViewShouldContainsTheField('birthdate', author.birthdate)
  })

  it('Authors Edit view should edit a name field', () => {
    editField('name', newAuthor.name)
    articlesEditViewShouldContainsTheField('name', newAuthor.name)
  })

  it('Authors Edit view should edit a lastname field', () => {
    editField('lastname', newAuthor.lastname)
    articlesEditViewShouldContainsTheField('lastname', newAuthor.lastname)
  })

  it('Authors Edit view should edit a birthdate field', () => {
    editField('birthdate', newAuthor.birthdate)
    articlesEditViewShouldContainsTheField('birthdate', newAuthor.birthdate)
  })

  it('An author is updated when the user submits the form', () => {
    const routes = [
      { name: view, response: newAuthor },
      { name: 'show', response: newAuthor }
    ]
    cy.InitServer({ resourceName, routes })

    const button = utils.getSubmitButton({ submitType: view })
    button.click()

    cy.wait(`@${resourceName}/update`).then(xmlHttpRequest => {
      const _newArticle = xmlHttpRequest.response.body
      expect(_newArticle).to.deep.equal(newAuthor)
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
      elementProp: 'name'
    })
  }

  function articlesEditViewShouldContainsTheField(field, expectedContent) {
    queryToField(field).should('have.value', expectedContent)
  }
})

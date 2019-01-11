// https://docs.cypress.io/api/introduction/api.html

const Factory = require('../../factory')
const { queryElementByProp } = require('../../helpers')

const UI_NAMES = require('../../../../src/constants/ui.element.names')
const UI_CONTENT = require('../../../../src/constants/ui.content.default')

describe('Articles: Delete Test', () => {
  let article = {}

  before('Search the Show view url', () => {
    const url = Factory.apiUrl({ route: 'api/articles/' })
    cy.request('POST',url , Factory.createArticle())
      .then((res) => { article = res.body })
    cy.visit('/#/articles')
    cy.wait(2000)
  })

  before('Visits the Show view url', () => {
    const url = `articles/show/${article.id}`
    cy.visit(`/#/${url}`)
    cy.url().should('include', url)
  })

  it('Press the delete button in the Show view', () => {
    const deleteButtonName = UI_NAMES.RESOURCE_ID_DELETE_BUTTON.with({
      resourceName: 'articles',
    })
    const deleteButtonElement = queryElementByProp({
      type: 'button',
      prop: 'name',
      value: deleteButtonName
    })
    cy.get(deleteButtonElement).should((deleteButton) => {
     expect(deleteButton).to.contain(UI_CONTENT.RESOURCE_DELETE_BUTTON)
   }).click()
  })
})

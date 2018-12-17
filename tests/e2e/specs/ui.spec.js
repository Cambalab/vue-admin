// https://docs.cypress.io/api/introduction/api.html

const { queryElementByProp } = require('../helpers')

const UI_CONTENT = require('../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../src/constants/ui.element.names')


describe('UI Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
  })

  it('Title should be vue-admin', () => {
    cy.title().should('eq', UI_CONTENT.MAIN_TITLE)
  })

  it('Toolbar title should be Vue Admin', () => {
    const mainToolbarTitleName = UI_NAMES.MAIN_TOOLBAR_TITLE
    const mainToolbarTitleElement = queryElementByProp({
      type: 'div',
      prop: 'name',
      value: mainToolbarTitleName
    })

    const expectedMainToolbarTitleText = UI_CONTENT.MAIN_TOOLBAR_TITLE

    cy.get(mainToolbarTitleElement).should((mainToolbarTitle) => {
      expect(mainToolbarTitle).to.contain(expectedMainToolbarTitleText)
    })
  })

  it('Toolbar hamburger button should open drawer on click', () => {
    const mainToolbarTitleName = UI_NAMES.MAIN_TOOLBAR_TITLE

    const mainToolbarTitleElement = queryElementByProp({
      type: 'div',
      prop: 'name',
      value: mainToolbarTitleName
    })
    cy.get(`${mainToolbarTitleElement} button`).click()
  })

  it('Drawer should redirect to Articles list view on article tile click', () => {
    const drawerArticlesTileName = UI_NAMES.DRAWER_RESOURCE_TILE.with({
      resourceName: 'articles'
    })

    const drawerArticlesTileElement = queryElementByProp({
      type: 'a',
      prop: 'name',
      value: drawerArticlesTileName
    })
    cy.get(drawerArticlesTileElement).click()

    cy.url().should('include', '/articles')
  })
})

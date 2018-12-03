// https://docs.cypress.io/api/introduction/api.html

const UI_CONTENT = require('../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../src/constants/ui.element.names')

describe('UI Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
  })

  it('Title should be vue-admin', () => {
    cy.title().should('eq', UI_CONTENT.MAIN_TITLE)
  })

  it('Toolbar title should be Vue Admin XXX', () => {
    const mainToolbarTitleName = UI_NAMES.MAIN_TOOLBAR_TITLE
    cy.get(`div[name=${mainToolbarTitleName}]`).should((mainToolbarTitle) => {
      const mainToolbarTitleText = UI_CONTENT.MAIN_TOOLBAR_TITLE

      expect(mainToolbarTitle).to.contain(mainToolbarTitleText)
    })
  })

  it('Toolbar Avatar should show default user name JUAN', () => {
    const mainToolbarUserAvatarName = UI_NAMES.MAIN_TOOLBAR_USER_AVATAR
    cy.get(`div[name=${mainToolbarUserAvatarName}]`).should((div) => {
      const mainToolbarUserAvatarNameText = UI_CONTENT.MAIN_TOOLBAR_USER_AVATAR_NAME

      expect(div).to.contain(mainToolbarUserAvatarNameText)
    })
  })

  it('Toolbar hamburger button should open drawer on click', () => {
    const mainToolbarTitleName = UI_NAMES.MAIN_TOOLBAR_TITLE
    cy.get(`div[name=${mainToolbarTitleName}] button`).click()
  })

  it('Drawer should redirect to Articles list view on article tile click', () => {
    const drawerArticlesTileName = UI_NAMES.DRAWER_RESOURCE_TILE.with({
      resourceName: 'articles'
    })
    cy.get(`a[name=${drawerArticlesTileName}]`).click()

    cy.url().should('eq', 'http://localhost:8081/#/articles')
  })
})

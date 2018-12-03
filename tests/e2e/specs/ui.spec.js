// https://docs.cypress.io/api/introduction/api.html

const UI_CONTENT = require('../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../src/constants/ui.element.names')

describe('End to end Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
  })

  it('Title should be vue-admin', () => {
    cy.title().should('eq', UI_CONTENT.MAIN_TITLE)
  })

  it('Toolbar title should be Vue Admin XXX', () => {
    const mainToolbarTitleName = UI_NAMES.MAIN_TOOLBAR_TITLE
    cy.get(`div[name=${mainToolbarTitleName}]`).should((div) => {
      const mainToolbarTitleText = UI_CONTENT.MAIN_TOOLBAR_TITLE

      expect(div).to.contain(mainToolbarTitleText)
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
  })

  it('Articles View should render title: articles resource: list operation', () => {
    const listViewTitleName = UI_NAMES.RESOURCE_VIEW_CONTAINER.with({
      resourceName: 'articles',
      view: 'list'
    })
    cy.get(`div[name=${listViewTitleName}]`).should((div) => {
      const listViewTitleText = UI_CONTENT.RESOURCE_VIEW.with({
        resourceName: 'articles',
        view: 'list'
      })

      expect(div).to.contain(listViewTitleText)
    })
  })

  it('Articles View should render a create button', () => {
    const createButtonName = UI_NAMES.RESOURCE_CREATE_BUTTON.with({
      resourceName: 'articles'
    })
    cy.get(`a[name="${createButtonName}"]`).should((anchor) => {
      const createButtonText = UI_CONTENT.RESOURCE_CREATE_BUTTON.with({
        resourceName: 'articles'
      })

      expect(anchor).to.contain(createButtonText)
    })
  })

  it('Articles View should render three articles links with ids: 1, 2, 3', () => {
    const articlesIndexes = [0, 1, 2];
    articlesIndexes.forEach((articleIndex) => {
      const listElementContainerName = UI_NAMES.RESOURCE_VIEW_ELEMENT_CONTAINER.with({
        resourceName: 'articles',
        view: 'list',
        index: articleIndex
      })
      cy.get(`div[name=${listElementContainerName}]`).should((div) => {
        const listElementField = UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
          resourceName: 'articles',
          view: 'list',
          field: 'id',
          index: articleIndex
        })
        const anchor = div.find(`a[name=${listElementField}]`)
        const anchorIdText = articleIndex + 1

        expect(anchor).to.contain(anchorIdText)
      })
    })
  })
})

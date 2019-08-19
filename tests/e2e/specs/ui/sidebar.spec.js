// https://docs.cypress.io/api/introduction/api.html

const { queryElementByProp } = require('../../helpers')

const UI_NAMES = require('../../../../src/constants/ui.element.names')


describe('UI Test', () => {
  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  it('Visits the app root url', () => {
    cy.visit('/#/')
  })

  beforeEach('Open drawer on toolbar hamburger button click', () => {
    const drawerButtonName = UI_NAMES.DRAWER_BUTTON

    const drawerButton = queryElementByProp({
      type: 'button',
      prop: 'name',
      value: drawerButtonName
    })
    cy.get(drawerButton).click()
  })

  it('Drawer should redirect to Articles list view on article tile click', () => {
    const routes = [{ name: 'list' }]
    cy.InitServer({ resourceName: 'articles', routes })
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

  it('Drawer should redirect to Magazines list view on magazine tile click', () => {
    const routes = [{ name: 'list' }]
    cy.InitServer({ resourceName: 'magazines', routes })
    const drawerMagazinesTileName = UI_NAMES.DRAWER_RESOURCE_TILE.with({
      resourceName: 'magazines'
    })

    const drawerMagazinesTileElement = queryElementByProp({
      type: 'a',
      prop: 'name',
      value: drawerMagazinesTileName
    })
    cy.get(drawerMagazinesTileElement).click()

    cy.url().should('include', '/magazines')
  })

  it('Drawer should redirect to Authors list view on authors tile click', () => {
    const routes = [{ name: 'list' }]
    cy.InitServer({ resourceName: 'authors', routes })
    const drawerAuthorsTileName = UI_NAMES.DRAWER_RESOURCE_TILE.with({
      resourceName: 'authors'
    })

    const drawerAuthorsTileElement = queryElementByProp({
      type: 'a',
      prop: 'name',
      value: drawerAuthorsTileName
    })
    cy.get(drawerAuthorsTileElement).click()

    cy.url().should('include', '/authors')
  })

  it('Drawer should redirect to Authors list view on authors tile click', () => {
    const routes = [{ name: 'list' }]
    cy.InitServer({ resourceName: 'authors', routes })
    const drawerAuthorsTileName = UI_NAMES.DRAWER_RESOURCE_TILE.with({
      resourceName: 'authors'
    })

    const drawerAuthorsTileElement = queryElementByProp({
      type: 'a',
      prop: 'name',
      value: drawerAuthorsTileName
    })
    cy.get(drawerAuthorsTileElement).click()

    cy.url().should('include', '/authors')
  })
})

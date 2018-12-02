// https://docs.cypress.io/api/introduction/api.html

describe('End to end Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
  })

  it('Title should be vue-admin', () => {
    cy.title().should('eq', 'vue-admin')
  })

  it('Toolbar title should be Vue Admin XXX', () => {
    cy.get('div[name=main-toolbar-title]').should((div) => {
      expect(div).to.contain('Admin XXX')
    })
  })

  it('Toolbar Avatar should show default user name JUAN', () => {
    cy.get('div[name=main-toolbar-user-avatar]').should((div) => {
      expect(div).to.contain('Juan')
    })
  })

  it('Toolbar hamburger button should open drawer on click', () => {
    cy.get('div[name=main-toolbar-title] button').click()
  })

  it('Drawer should redirect to Articles list view on article tile click', () => {
    cy.get('a[name=drawer-articles-tile]').click()
  })

  it('Articles View should render title: articles resource: list operation', () => {
    cy.get('div[name=articles-list-container]').should((div) => {
      expect(div).to.contain('articles resource: list operation')
    })
  })

  it('Articles View should render a create button', () => {
    cy.get('a[name="articles-create-button"]').should((anchor) => {
      expect(anchor).to.contain('Create articles')
    })
  })

  it('Articles View should render three articles links with ids: 1, 2, 3', () => {
    const articlesIndexes = [0, 1, 2];
    articlesIndexes.forEach((articleIndex) => {
      cy.get(`div[name=articles-list-element-container-${articleIndex}]`).should((div) => {
        const anchor = div.find(`a[name="articles-list-element-${articleIndex}-id"]`)
        const anchorIdText = articleIndex + 1
        expect(anchor).to.contain(anchorIdText)
      })
    })
  })
})

const Factory = require('../../factory')

const { InitEntityUtils } = require('../../lib/commands')

describe('Magazines: List Action Test', () => {
  const resourceName = 'magazines'
  const view = 'list'
  let magazines
  const utils = InitEntityUtils({
    resourceName,
    view
  })

  let timesNavigatedToNextPage = 0

  before('Creates a new magazine', () => {
    const url = Factory.apiUrl({ route: `api/${resourceName}/` })
    cy.request('GET', url).
    then((res) => { magazines = res.body })
  })

  beforeEach('Visits the magazines list', () => {
    cy.visit(`/#/${resourceName}/`)
  })

  it('The url should be /magazines', () => {
    cy.url().should('include', resourceName)
  })

  it('The list should contain magazines with an {id} attribute', () => {
    const field = 'id'

    magazines.forEach((magazine, index) => {
      // Navigates to next page if necessary
      navigateToNextPage(index)
      // Setup: Gets the 'index' id row
      const row = utils.getTableRowBy({ field, index: index  % 5 })
      // Assertion: the input contains the magazine issue content
      row.should('contain', magazine[field])
    })
  })

  it('The list should contain magazines with an {issue} attribute', () => {
    const field = 'issue'

    magazines.forEach((magazine, index) => {
      // Navigates to next page if necessary
      navigateToNextPage(index)
      // Setup: Gets the 'index' issue row
      const row = utils.getTableRowBy({ field, index: index % 5 })
      // Assertion: the input contains the magazine issue content
      row.should('contain', magazine[field])
    })
  })

  it('The list should contain magazines with a {publisher} attribute', () => {
    const field = 'publisher'

    magazines.forEach((magazine, index) => {
      // Navigates to next page if necessary
      navigateToNextPage(index)
      // Setup: Gets the 'index' publisher row
      const row = utils.getTableRowBy({ field, index: index % 5 })
      // Assertion: the input contains the magazine issue content
      row.should('contain', magazine[field])
    })
  })

  const navigateToNextPage = (index) => {
    if (index && (index % 5 === 0)) {
      const nextPageButton = cy.getElement({
        constant: '"Next page"',
        elementType: 'button',
        elementProp: 'aria-label'
      })
      nextPageButton.click()
      timesNavigatedToNextPage = timesNavigatedToNextPage + 1
    }
  }
})

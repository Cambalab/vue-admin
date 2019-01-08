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

  before('Visits the magazines list', () => {
    cy.visit(`/#/${resourceName}/`)
  })

  afterEach('Returns to the first table page', () => {
    const previousPageButton = cy.getElement({
      constant: '"Previous page"',
      elementType: 'button',
      elementProp: 'aria-label'
    })

    while (timesNavigatedToNextPage !== 0) {
      previousPageButton.click()
      timesNavigatedToNextPage = timesNavigatedToNextPage - 1
    }
  })

  it('The url should be /magazines', () => {
    cy.url().should('include', resourceName)
  })

  it('The list should contain magazines with an {id} attribute', () => {
    const field = 'id'

    magazines.forEach((magazine, index) => {
      let _index = index
      // Navigates to next page if necessary
      navigateToNextPage(index)
      // Resets index if navigated at least once
      _index = shouldResetIndex(_index)
      // Setup: Gets the 'name' input element
      const row = utils.getTableRowBy({ field, index: _index })
      // Assertion: the input contains the magazine issue content
      row.should('contain', magazine[field])
    })
  })

  it('The list should contain magazines with an {issue} attribute', () => {
    const field = 'issue'

    magazines.forEach((magazine, index) => {
      let _index = index
      // Navigates to next page if necessary
      navigateToNextPage(index)
      // Resets index if navigated at least once
      _index = shouldResetIndex(_index)
      // Setup: Gets the 'name' input element
      const row = utils.getTableRowBy({ field, index: _index })
      // Assertion: the input contains the magazine issue content
      row.should('contain', magazine[field])
    })
  })

  it('The list should contain magazines with a {publisher} attribute', () => {
    const field = 'publisher'

    magazines.forEach((magazine, index) => {
      let _index = index
      // Navigates to next page if necessary
      navigateToNextPage(index)
      // Resets index if navigated at least once
      _index = shouldResetIndex(_index)
      // Setup: Gets the 'name' input element
      const row = utils.getTableRowBy({ field, index: _index })
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

  const shouldResetIndex = (index) => {
    if (timesNavigatedToNextPage > 0) {
      return parseInt(index) - (5 * timesNavigatedToNextPage)
    }
    return index
  }
})

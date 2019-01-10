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

  const rowsPerPage = 5
  let timesNavigatedToNextPage = 0

  before('Gets a list of magazines', () => {
    const url = Factory.apiUrl({ route: `api/${resourceName}/` })
    cy.request('GET', url).
    then((res) => { magazines = res.body })
  })

  beforeEach('Visits the magazines list', () => {
    cy.visit(`/#/${resourceName}/`)
  })

  it('The url should be /magazines', () => {
    const url = utils.getUrlByResource({ resourceName })
    cy.url().should('eq', url)
  })

  it('The list should contain magazines with an {id} attribute', () => {
    const field = 'id'
    assertListElementsByField(magazines, field, rowsPerPage)
  })

  it('The list should contain magazines with an {issue} attribute', () => {
    const field = 'issue'
    assertListElementsByField(magazines, field, rowsPerPage)
  })

  it('The list should contain magazines with a {publisher} attribute', () => {
    const field = 'publisher'
    assertListElementsByField(magazines, field, rowsPerPage)
  })

  /**
   * assertListElementsByField - Given an list of elements, a 'field' and a
   * number, iterates through the array, finds an element field in a table row,
   * and asserts a cell's value is equal to the current elements's 'field'.
   *
   * @param {Array}  list        A list of elements
   * @param {String} field       A property name of list elements
   * @param {Number} rowsPerPage A quantity representing the rows per page of a
   * table.
   */
  const assertListElementsByField = (list, field, rowsPerPage) => {
    list.forEach((element, index) => {
      // Navigates to next page if necessary
      navigateToNextPage(index)
      // Setup: Gets the 'index' publisher row
      const row = utils.getTableRowBy({ field, index: index % rowsPerPage })
      // Assertion: the input contains the magazine issue content
      row.should('contain', element[field])
    })
  }

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

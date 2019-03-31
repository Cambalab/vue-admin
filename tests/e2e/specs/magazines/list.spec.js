import { InitEntityUtils } from '../../lib/commands'
import { rowsPerPage } from '../../../../demo/constants'

describe('Magazines: List Action Test', () => {
  const resourceName = 'magazines'
  const view = 'list'
  const utils = InitEntityUtils({
    resourceName,
    view
  })

  let magazines
  let timesNavigatedToNextPage = 0

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Sets the magazines fixture', () => {
    cy.fixture(resourceName).then(fixture => {
      magazines = fixture
    })
  })

  afterEach('Visits the magazines list', () => {
    navigateToFirstPage()
  })

  it('{GET} - When a resource / path is visited, a list of elements is returned in response', () => {
    // Setup: the stubbed route it set
    const routes = [{ name: 'list' }]
    cy.InitServer({ resourceName, routes })
    // Exercise: visits the /#/{resourceName}/ url
    cy.visit(`/#/${resourceName}/`)
    // Assertion: a list of magazines is returned
    cy.wait(`@${resourceName}/${view}`).then(xmlHttpRequest => {
      magazines = xmlHttpRequest.response.body
      const responseData = xmlHttpRequest.response.body
      expect(responseData).not.to.be.empty
      expect(magazines.length).to.equal(responseData.length)
      expect(magazines).to.deep.equal(responseData)
    })
    cy.server({ enable: false })
  })

  it('The url should be /magazines', () => {
    const url = utils.getUrlByResource({ resourceName })
    cy.url().should('eq', url)
  })

  it('The list should contain magazines with an {id} attribute', () => {
    const field = 'id'
    assertListElementsByField(magazines, field, rowsPerPage)
  })

  it('The list should contain magazines with a {name} attribute', () => {
    const field = 'name'
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
    if (index && (index % rowsPerPage === 0)) {
      const nextPageButton = cy.getElement({
        constant: '"Next page"',
        elementType: 'button',
        elementProp: 'aria-label'
      })
      nextPageButton.click()
      timesNavigatedToNextPage = timesNavigatedToNextPage + 1
    }
  }

  const navigateToFirstPage = () => {
    if (timesNavigatedToNextPage) {
      const previousPageButton = cy.getElement({
        constant: '"Previous page"',
        elementType: 'button',
        elementProp: 'aria-label'
      })
      while (timesNavigatedToNextPage > 0) {
        previousPageButton.click({ multiple: true })
        timesNavigatedToNextPage--
      }
    }
  }
})
